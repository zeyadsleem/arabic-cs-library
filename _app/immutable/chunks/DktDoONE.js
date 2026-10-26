const s="kinney",n="react-typescript",a="React مع TypeScript",t="tsconfig-deep-dive-react",p="غوص أعمق في tsconfig.json",l=[{depth:2,id:"الضبط-الكامل",text:"الضبط الكامل"},{depth:2,id:"ضبط-الهدف-والمكتبات",text:"ضبط الهدف والمكتبات"},{depth:3,id:"quottargetquot-quotes2022quot",text:"&quot;target&quot;: &quot;ES2022&quot;"},{depth:3,id:"quotlibquot-quotdomquot-quotdomiterablequot-quotes2022quot",text:"&quot;lib&quot;: [&quot;DOM&quot;, &quot;DOM.Iterable&quot;, &quot;ES2022&quot;]"},{depth:3,id:"quotmodulequot-quotesnextquot",text:"&quot;module&quot;: &quot;ESNext&quot;"},{depth:3,id:"quotmoduleresolutionquot-quotbundlerquot",text:"&quot;moduleResolution&quot;: &quot;bundler&quot;"},{depth:3,id:"quotallowimportingtsextensionsquot-true",text:"&quot;allowImportingTsExtensions&quot;: true"},{depth:2,id:"دعم-javascript",text:"دعم JavaScript"},{depth:3,id:"quotallowjsquot-true",text:"&quot;allowJs&quot;: true"},{depth:3,id:"quotcheckjsquot-false",text:"&quot;checkJs&quot;: false"},{depth:2,id:"ضبط-الإخراج-emit",text:"ضبط الإخراج (Emit)"},{depth:3,id:"quotnoemitquot-true",text:"&quot;noEmit&quot;: true"},{depth:3,id:"quotsourcemapquot-true",text:"&quot;sourceMap&quot;: true"},{depth:3,id:"quotjsxquot-quotreact-jsxquot",text:"&quot;jsx&quot;: &quot;react-jsx&quot;"},{depth:2,id:"عائلة-الصرامة",text:"عائلة الصرامة"},{depth:3,id:"quotstrictquot-true",text:"&quot;strict&quot;: true"},{depth:3,id:"quotnoimplicitoverridequot-true",text:"&quot;noImplicitOverride&quot;: true"},{depth:3,id:"quotnopropertyaccessfromindexsignaturequot-false",text:"&quot;noPropertyAccessFromIndexSignature&quot;: false"},{depth:3,id:"quotexactoptionalpropertytypesquot-false",text:"&quot;exactOptionalPropertyTypes&quot;: false"},{depth:3,id:"quotnofallthroughcasesinswitchquot-true",text:"&quot;noFallthroughCasesInSwitch&quot;: true"},{depth:2,id:"فحوص-جودة-الشيفرة",text:"فحوص جودة الشيفرة"},{depth:3,id:"quotnounusedlocalsquot-false-quotnounusedparametersquot-false",text:"&quot;noUnusedLocals&quot;: false / &quot;noUnusedParameters&quot;: false"},{depth:3,id:"quotnoimplicitreturnsquot-true",text:"&quot;noImplicitReturns&quot;: true"},{depth:3,id:"quotallowunreachablecodequot-false",text:"&quot;allowUnreachableCode&quot;: false"},{depth:2,id:"خيارات-حل-الوحدات",text:"خيارات حلّ الوحدات"},{depth:3,id:"quotesmoduleinteropquot-true",text:"&quot;esModuleInterop&quot;: true"},{depth:3,id:"quotallowsyntheticdefaultimportsquot-true",text:"&quot;allowSyntheticDefaultImports&quot;: true"},{depth:3,id:"quotresolvejsonmodulequot-true",text:"&quot;resolveJsonModule&quot;: true"},{depth:3,id:"quotisolatedmodulesquot-true",text:"&quot;isolatedModules&quot;: true"},{depth:3,id:"quotmoduledetectionquot-quotforcequot",text:"&quot;moduleDetection&quot;: &quot;force&quot;"},{depth:3,id:"quotverbatimmodulesyntaxquot-true",text:"&quot;verbatimModuleSyntax&quot;: true"},{depth:2,id:"خرائط-المسارات",text:"خرائط المسارات"},{depth:3,id:"quotbaseurlquot-quotquot",text:"&quot;baseUrl&quot;: &quot;.&quot;"},{depth:3,id:"quotpathsquot",text:"&quot;paths&quot;"},{depth:2,id:"الأداء",text:"الأداء"},{depth:3,id:"quotskiplibcheckquot-true",text:"&quot;skipLibCheck&quot;: true"},{depth:3,id:"quotincrementalquot-true",text:"&quot;incremental&quot;: true"},{depth:3,id:"quottsbuildinfofilequot",text:"&quot;tsBuildInfoFile&quot;"},{depth:2,id:"أنواع-البيئة",text:"أنواع البيئة"},{depth:3,id:"quottypesquot-quotviteclientquot",text:"&quot;types&quot;: [&quot;vite/client&quot;]"},{depth:2,id:"متقدم-استراتيجية-الضبط-المتعدد",text:"متقدّم: استراتيجية الضبط المتعدّد"},{depth:3,id:"الضبط-الأساسي-tsconfigjson",text:"الضبط الأساسي (tsconfig.json)"},{depth:3,id:"ضبط-node-tsconfignodejson",text:"ضبط Node (tsconfig.node.json)"},{depth:3,id:"ضبط-البناء-tsconfigbuildjson",text:"ضبط البناء (tsconfig.build.json)"},{depth:3,id:"ضبط-مكونات-الخادم-tsconfigserverjson",text:"ضبط مكوّنات الخادم (tsconfig.server.json)"},{depth:3,id:"إعدادات-التطوير-مقابل-الإنتاج",text:"إعدادات التطوير مقابل الإنتاج"},{depth:2,id:"حيث-اخترنا-تجربة-المطور-على-الصرامة",text:"حيث اخترنا تجربة المطور على الصرامة"},{depth:3,id:"nouncheckedindexedaccess-غير-مضمن",text:"noUncheckedIndexedAccess (غير مُضمَّن)"},{depth:3,id:"nopropertyaccessfromindexsignature-false",text:"noPropertyAccessFromIndexSignature: false"},{depth:3,id:"exactoptionalpropertytypes-false",text:"exactOptionalPropertyTypes: false"},{depth:3,id:"nounusedlocalsparameters-false",text:"noUnusedLocals/Parameters: false"},{depth:2,id:"إطار-القرار",text:"إطار القرار"},{depth:2,id:"الأخطاء-الشائعة",text:"الأخطاء الشائعة"},{depth:2,id:"فحص-ضبطك",text:"فحص ضبطك"},{depth:2,id:"react-19-وميزات-react-الحديثة",text:"React 19 وميزات React الحديثة"},{depth:3,id:"دعم-خطاف-use",text:"دعم خُطّاف use"},{depth:3,id:"أمان-أنواع-الميزات-المتزامنة",text:"أمان أنواع الميزات المتزامنة"},{depth:2,id:"التحقق-من-ضبطك",text:"التحقق من ضبطك"},{depth:2,id:"إبقاء-ضبطك-محدثا",text:"إبقاء ضبطك محدَّثًا"}],o=`<p>كما رأينا في <a href="https://stevekinney.com/courses/react-typescript/setting-up-react-and-typescript">القسم السابق</a>، فإن ملف <code>tsconfig.json</code> هو مركز القيادة لـ TypeScript في مشروعك. وهو يخبر TypeScript:</p>
<ul>
<li>كيف يُترجم شيفرتك — أو في حالة React — كيف يفحص أنواعها.</li>
<li>أي الملفات يجب تضمينها أو استبعادها.</li>
<li>مدى صرامة فحص الأنواع.</li>
<li>كيف يحلّ الوحدات والمسارات.</li>
</ul>
<p>في مشروع React + Vite، لا يترجم TypeScript شيفرتك فعليًا — بل يتولّى ذلك Vite. وبدلًا من ذلك، يوفّر TypeScript فحص الأنواع فقط. ولهذا نستخدم <code>noEmit: true</code>.</p>
<h2 id="الضبط-الكامل">الضبط الكامل</h2>
<p>لنبنِ ملف <code>tsconfig.json</code> الأمثل خطوة بخطوة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-comment">// Target and Library Settings</span>
    <span class="hljs-attr">&quot;target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ES2022&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lib&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;DOM&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;DOM.Iterable&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;ES2022&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;module&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ESNext&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;moduleResolution&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;bundler&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;allowImportingTsExtensions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>

    <span class="hljs-comment">// JavaScript Support</span>
    <span class="hljs-attr">&quot;allowJs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;checkJs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>

    <span class="hljs-comment">// Emit Configuration</span>
    <span class="hljs-attr">&quot;noEmit&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;sourceMap&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;jsx&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;react-jsx&quot;</span><span class="hljs-punctuation">,</span>

    <span class="hljs-comment">// Type Checking - Strict Settings</span>
    <span class="hljs-attr">&quot;strict&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noImplicitOverride&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noPropertyAccessFromIndexSignature&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;exactOptionalPropertyTypes&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noFallthroughCasesInSwitch&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>

    <span class="hljs-comment">// Type Checking - Code Quality</span>
    <span class="hljs-attr">&quot;noUnusedLocals&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noUnusedParameters&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noImplicitReturns&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;allowUnreachableCode&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;allowUnusedLabels&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>

    <span class="hljs-comment">// Module Resolution</span>
    <span class="hljs-attr">&quot;esModuleInterop&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;allowSyntheticDefaultImports&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;resolveJsonModule&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;isolatedModules&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;moduleDetection&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;force&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;verbatimModuleSyntax&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>

    <span class="hljs-comment">// Path Mapping</span>
    <span class="hljs-attr">&quot;baseUrl&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;.&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;paths&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;@/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;@components/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/components/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;@hooks/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/hooks/*&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;@utils/*&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/utils/*&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>

    <span class="hljs-comment">// Performance</span>
    <span class="hljs-attr">&quot;skipLibCheck&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;incremental&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tsBuildInfoFile&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./node_modules/.cache/typescript/tsconfig.tsbuildinfo&quot;</span><span class="hljs-punctuation">,</span>

    <span class="hljs-comment">// Consistency</span>
    <span class="hljs-attr">&quot;forceConsistentCasingInFileNames&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>

    <span class="hljs-comment">// Environment Types</span>
    <span class="hljs-attr">&quot;types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;vite/client&quot;</span><span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;include&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/**/*&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;vite.config.ts&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exclude&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;node_modules&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;dist&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;build&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;coverage&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="ضبط-الهدف-والمكتبات">ضبط الهدف والمكتبات</h2>
<h3 id="quottargetquot-quotes2022quot"><code>&quot;target&quot;: &quot;ES2022&quot;</code></h3>
<p><strong>ما الذي يفعله:</strong> يحدّد إصدار JavaScript الذي يترجم إليه TypeScript.</p>
<p><strong>لماذا ES2022؟</strong></p>
<ul>
<li>يشمل ميزات حديثة مثل <code>await</code> على المستوى الأعلى وحقول الأصناف وتابع <code>.at()</code></li>
<li>جميع المتصفحات الحديثة تدعم ES2022</li>
<li>يتولّى Vite أي تحويل إضافي مطلوب للمتصفحات الأقدم</li>
</ul>
<p><strong>البدائل:</strong></p>
<ul>
<li><code>&quot;ESNext&quot;</code>: أحدث الميزات دائمًا (أقلّ قابلية للتنبّؤ)</li>
<li>\`&quot;ES2020&quot;: أكثر تحفّظًا، لكنه يفوّت ميزات جميلة</li>
</ul>
<h3 id="quotlibquot-quotdomquot-quotdomiterablequot-quotes2022quot"><code>&quot;lib&quot;: [&quot;DOM&quot;, &quot;DOM.Iterable&quot;, &quot;ES2022&quot;]</code></h3>
<p><strong>ما الذي يفعله:</strong> يخبر TypeScript بواجهات API المدمجة المتاحة.</p>
<p><strong>تفصيله:</strong></p>
<ul>
<li><code>&quot;DOM&quot;</code>: واجهات المتصفح (document، window، HTMLElement)</li>
<li><code>&quot;DOM.Iterable&quot;</code>: يجعل مجموعات DOM قابلة للتكرار (حلقات for…of على NodeLists)</li>
<li><code>&quot;ES2022&quot;</code>: ميزات لغة JavaScript المطابقة لهدفنا</li>
</ul>
<p><strong>يمكن إضافة:</strong> <code>&quot;WebWorker&quot;</code> إذا كنت تستخدم web workers، و<code>&quot;ES2022.Array&quot;</code> لميزات محدّدة</p>
<h3 id="quotmodulequot-quotesnextquot"><code>&quot;module&quot;: &quot;ESNext&quot;</code></h3>
<p><strong>ما الذي يفعله:</strong> يحدّد نظام الوحدات للشيفرة الناتجة.</p>
<p><strong>لماذا ESNext؟</strong> نستخدم وحدات ES الأصلية، ويتولّى Vite تحويل الوحدات فعليًا. وهذا يمنحنا:</p>
<ul>
<li>استيرادات ديناميكية</li>
<li><code>await</code> على المستوى الأعلى</li>
<li>تأكيدات الاستيراد</li>
</ul>
<h3 id="quotmoduleresolutionquot-quotbundlerquot"><code>&quot;moduleResolution&quot;: &quot;bundler&quot;</code></h3>
<p><strong>ما الذي يفعله:</strong> كيف يحلّ TypeScript عبارات الاستيراد.</p>
<p><strong>لماذا bundler؟</strong> جديد في TS 5.0+، ومصمَّم لأدوات مثل Vite:</p>
<ul>
<li>يسمح بالاستيراد بلا امتدادات</li>
<li>يدعم حقل <code>exports</code> في package.json</li>
<li>أكثر تسامحًا من <code>&quot;node16&quot;</code> لكن أكثر أمانًا من <code>&quot;node&quot;</code> القديمة</li>
</ul>
<p><strong>الخيار القديم:</strong> <code>&quot;node&quot;</code> - لا يزال شائعًا لكنه أقل دقّة مع أدوات التجميع الحديثة</p>
<h3 id="quotallowimportingtsextensionsquot-true"><code>&quot;allowImportingTsExtensions&quot;: true</code></h3>
<p><strong>ما الذي يفعله:</strong> يتيح لك استيراد ملفات TypeScript بامتدادات صريحة.</p>
<p><strong>لماذا تفعّله؟</strong> يسمح بالاستيرادات الصريحة التي تفضّلها بعض أدوات التجميع:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Now you can be explicit about imports</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">UserSchema</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./schemas/user.schema.ts&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Button</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../components/Button.tsx&#x27;</span>;
</code></pre>
<p>وهذا ذو قيمة خاصة في المستودعات الأحادية حيث قد تكون مخرجات البناء مختلفة لكل حزمة</p>
<h2 id="دعم-javascript">دعم JavaScript</h2>
<h3 id="quotallowjsquot-true"><code>&quot;allowJs&quot;: true</code></h3>
<p><strong>ما الذي يفعله:</strong> يتيح لـ TypeScript معالجة ملفات JavaScript.</p>
<p><strong>لماذا تفعّله؟</strong></p>
<ul>
<li>ترحيل تدريجي من JS إلى TS</li>
<li>شيفرة JS من طرف ثالث في مصدرك</li>
<li>ملفات الضبط غالبًا بصيغة JS</li>
</ul>
<h3 id="quotcheckjsquot-false"><code>&quot;checkJs&quot;: false</code></h3>
<p><strong>ما الذي يفعله:</strong> يفحص أنواع ملفات JavaScript.</p>
<p><strong>لماذا تعطّله؟</strong></p>
<ul>
<li>قد تكون ملفات JS بأنماط أرخى</li>
<li>تجنّب الأخطاء في ملفات الضبط</li>
<li>يمكنك تفعيله لكل ملف عبر <code>// @ts-check</code></li>
</ul>
<p><strong>🔒 خيار أكثر صرامة:</strong> اضبطه على <code>true</code> لفحص أنواع كامل في ملفات JS</p>
<h2 id="ضبط-الإخراج-emit">ضبط الإخراج (Emit)</h2>
<h3 id="quotnoemitquot-true"><code>&quot;noEmit&quot;: true</code></h3>
<p><strong>ما الذي يفعله:</strong> يمنع TypeScript من توليد ملفات الإخراج.</p>
<p><strong>حاسم لـ React:</strong> يتولّى Vite/esbuild عملية الترجمة، وTypeScript يفحص الأنواع فقط. وهذا يمنع:</p>
<ul>
<li>ازدواج ملفات الإخراج</li>
<li>تعارضات الترجمة</li>
<li>عمليات بناء أبطأ</li>
</ul>
<h3 id="quotsourcemapquot-true"><code>&quot;sourceMap&quot;: true</code></h3>
<p><strong>ما الذي يفعله:</strong> يولّد خرائط المصدر (source maps) لأغراض التصحيح.</p>
<p><strong>لماذا تفعّله؟</strong> تجربة تصحيح أفضل - ترى شيفرة TS الأصلية في أدوات مطوّر المتصفح</p>
<p><strong>ملاحظة:</strong> لا يهم إلا إذا كان <code>noEmit: false</code></p>
<h3 id="quotjsxquot-quotreact-jsxquot"><code>&quot;jsx&quot;: &quot;react-jsx&quot;</code></h3>
<p><strong>ما الذي يفعله:</strong> كيف يُحوَّل JSX.</p>
<p><strong>الخيارات مشروحة:</strong></p>
<ul>
<li><code>&quot;react-jsx&quot;</code>: التحويل الجديد (React 17+)، ولا حاجة إلى استيراد React</li>
<li><code>&quot;react&quot;</code>: القديم، ويتطلّب <code>import React from 'react'</code></li>
<li><code>&quot;preserve&quot;</code>: يترك JSX دون تغيير (لتتولّاه أدوات أخرى)</li>
</ul>
<h2 id="عائلة-الصرامة">عائلة الصرامة</h2>
<h3 id="quotstrictquot-true"><code>&quot;strict&quot;: true</code></h3>
<p><strong>ما الذي يفعله:</strong> يفعّل جميع خيارات فحص الأنواع الصارمة:</p>
<ul>
<li><code>strictNullChecks</code>: يجب أن يكون null/undefined صريحًا</li>
<li><code>strictFunctionTypes</code>: توافق صارم للدوال</li>
<li><code>strictBindCallApply</code>: فحص أنواع .bind() و.call() و.apply()</li>
<li><code>strictPropertyInitialization</code>: يجب تهيئة خصائص الأصناف</li>
<li><code>noImplicitAny</code>: لا أنواع any ضمنية</li>
<li><code>noImplicitThis</code>: يجب أن يكون لـ ‘this’ نوع صريح</li>
<li><code>alwaysStrict</code>: إصدار “use strict”</li>
<li><code>useUnknownInCatchVariables</code>: متغيّرات بند catch من نوع ‘unknown’</li>
</ul>
<p><strong>هذا غير قابل للتفاوض</strong> في أي مشروع TypeScript جاد.</p>
<h3 id="quotnoimplicitoverridequot-true"><code>&quot;noImplicitOverride&quot;: true</code></h3>
<p><strong>ما الذي يفعله:</strong> يتطلّب كلمة المفتاح <code>override</code> عند تجاوز توابع الصنف الأساسي.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Without this flag - silent bugs possible</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">Dog</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Animal</span> {
  <span class="hljs-title function_">speak</span>(<span class="hljs-params"></span>) {} <span class="hljs-comment">// Did we mean to override? Typo?</span>
}

<span class="hljs-comment">// With flag - explicit intent</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">Dog</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Animal</span> {
  <span class="hljs-keyword">override</span> <span class="hljs-title function_">speak</span>(<span class="hljs-params"></span>) {} <span class="hljs-comment">// Clear we&#x27;re overriding</span>
}
</code></pre>
<h3 id="quotnopropertyaccessfromindexsignaturequot-false"><code>&quot;noPropertyAccessFromIndexSignature&quot;: false</code></h3>
<p><strong>ما الذي يفعله:</strong> عند تفعيله، يفرض استخدام صيغة الأقواس المربّعة لتوقيعات الفهرسة.</p>
<p><strong>لماذا نعطّله:</strong></p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Config</span> {
  [<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>]: <span class="hljs-built_in">string</span>;
}
<span class="hljs-keyword">const</span> <span class="hljs-attr">config</span>: <span class="hljs-title class_">Config</span> = { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;app&#x27;</span> };

<span class="hljs-comment">// With flag true (stricter but annoying):</span>
config[<span class="hljs-string">&#x27;name&#x27;</span>]; <span class="hljs-comment">// Required</span>
config.<span class="hljs-property">name</span>; <span class="hljs-comment">// Error!</span>

<span class="hljs-comment">// With flag false (our choice):</span>
config.<span class="hljs-property">name</span>; <span class="hljs-comment">// Allowed - better DX</span>
</code></pre>
<p><strong>🔒 خيار أكثر صرامة:</strong> فعّله لأنماط الوصول إلى الفهرس الصريحة</p>
<h3 id="quotexactoptionalpropertytypesquot-false"><code>&quot;exactOptionalPropertyTypes&quot;: false</code></h3>
<p><strong>ما الذي يفعله:</strong> يميّز بين الخصائص غير المعرّفة (undefined) والخصائص الغائبة.</p>
<p><strong>لماذا نعطّله:</strong></p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">name</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// With flag false (our choice):</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> = { <span class="hljs-attr">name</span>: <span class="hljs-literal">undefined</span> }; <span class="hljs-comment">// Allowed</span>

<span class="hljs-comment">// With flag true (stricter):</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> = { <span class="hljs-attr">name</span>: <span class="hljs-literal">undefined</span> }; <span class="hljs-comment">// Error!</span>
</code></pre>
<p>معظم شيفرة React لا تميّز بين هاتين الحالتين، وتفعيله يسبّب احتكاكًا.</p>
<p><strong>🔒 خيار أكثر صرامة:</strong> فعّله للتعامل الدقيق مع الخصائص الاختيارية</p>
<h3 id="quotnofallthroughcasesinswitchquot-true"><code>&quot;noFallthroughCasesInSwitch&quot;: true</code></h3>
<p><strong>ما الذي يفعله:</strong> يبلّغ عن أخطاء سقوط الحالات في عبارات switch.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">switch</span>(action) {
  <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;save&#x27;</span>:
    <span class="hljs-title function_">save</span>();
    <span class="hljs-comment">// Error! Did you forget &#x27;break&#x27;?</span>
  <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;delete&#x27;</span>:
    <span class="hljs-title function_">delete</span>();
}
</code></pre>
<h2 id="فحوص-جودة-الشيفرة">فحوص جودة الشيفرة</h2>
<h3 id="quotnounusedlocalsquot-false-quotnounusedparametersquot-false"><code>&quot;noUnusedLocals&quot;: false</code> / <code>&quot;noUnusedParameters&quot;: false</code></h3>
<p><strong>ما الذي يفعله:</strong> يبلّغ عن أخطاء في المتغيّرات/المعاملات غير المستخدمة.</p>
<p><strong>لماذا نعطّلهما:</strong></p>
<ul>
<li>مُزعج أثناء التطوير</li>
<li>يتولّى ESLint ذلك بشكل أفضل</li>
<li>يمكنك البادئة بـ <code>_</code> للدلالة على عدم الاستخدام المقصود</li>
</ul>
<p><strong>🔒 خيار أكثر صرامة:</strong> فعّلهما معًا من أجل شيفرة أنظف</p>
<h3 id="quotnoimplicitreturnsquot-true"><code>&quot;noImplicitReturns&quot;: true</code></h3>
<p><strong>ما الذي يفعله:</strong> يجب أن تُعيد جميع مسارات الشيفرة قيمة صراحةً.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">calculate</span>(<span class="hljs-params"><span class="hljs-attr">n</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span> {
  <span class="hljs-keyword">if</span> (n &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> n * <span class="hljs-number">2</span>;
  }
  <span class="hljs-comment">// Error! Missing return statement</span>
}
</code></pre>
<h3 id="quotallowunreachablecodequot-false"><code>&quot;allowUnreachableCode&quot;: false</code></h3>
<p><strong>ما الذي يفعله:</strong> يبلّغ عن أخطاء في الشيفرة التالية لعبارة return أو throw أو break.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">example</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-number">5</span>;
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Never runs&#x27;</span>); <span class="hljs-comment">// Error!</span>
}
</code></pre>
<h2 id="خيارات-حل-الوحدات">خيارات حلّ الوحدات</h2>
<h3 id="quotesmoduleinteropquot-true"><code>&quot;esModuleInterop&quot;: true</code></h3>
<p><strong>ما الذي يفعله:</strong> يصلح التشغيل البيني بين CommonJS ووحدات ES.</p>
<p><strong>يتيح:</strong></p>
<pre><code class="language-typescript"><span class="hljs-comment">// Without:</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// With:</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
</code></pre>
<h3 id="quotallowsyntheticdefaultimportsquot-true"><code>&quot;allowSyntheticDefaultImports&quot;: true</code></h3>
<p><strong>ما الذي يفعله:</strong> يتيح الاستيراد الافتراضي من وحدات ليس لها تصدير افتراضي.</p>
<p><strong>ملاحظة:</strong> مفترَض ضمن <code>esModuleInterop</code>، لكن الصراحة أوضح.</p>
<h3 id="quotresolvejsonmodulequot-true"><code>&quot;resolveJsonModule&quot;: true</code></h3>
<p><strong>ما الذي يفعله:</strong> استيراد ملفات JSON كوحدات.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> config <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./config.json&#x27;</span>;
</code></pre>
<h3 id="quotisolatedmodulesquot-true"><code>&quot;isolatedModules&quot;: true</code></h3>
<p><strong>ما الذي يفعله:</strong> يضمن أن كل ملف يمكن تحويله بشكل مستقل.</p>
<p><strong>حاسم لـ Vite/esbuild</strong> التي تحوّل كل ملف على حدة. ويكتشف:</p>
<ul>
<li>ملفات بلا استيرادات أو تصديرات</li>
<li>استيرادات من نوع type فقط غير موسومة بذلك</li>
</ul>
<h3 id="quotmoduledetectionquot-quotforcequot"><code>&quot;moduleDetection&quot;: &quot;force&quot;</code></h3>
<p><strong>ما الذي يفعله:</strong> يتعامل مع جميع الملفات كوحدات (لا كسكربتات).</p>
<p><strong>الفوائد:</strong></p>
<ul>
<li>لا متغيّرات عامة عشوائية</li>
<li>تعامل متسق مع الملفات</li>
<li>مطلوب لـ <code>await</code> على المستوى الأعلى</li>
</ul>
<h3 id="quotverbatimmodulesyntaxquot-true"><code>&quot;verbatimModuleSyntax&quot;: true</code></h3>
<p><strong>ما الذي يفعله:</strong> يتطلّب المُعدِّل <code>type</code> الصريح للاستيرادات من نوع type فقط.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Bad - ambiguous</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">User</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./types&#x27;</span>;

<span class="hljs-comment">// Good - explicit</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">User</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./types&#x27;</span>;
</code></pre>
<p><strong>لماذا؟</strong> تستطيع أدوات التجميع إجراء tree-shaking بشكل أفضل، والنية أوضح.</p>
<h2 id="خرائط-المسارات">خرائط المسارات</h2>
<h3 id="quotbaseurlquot-quotquot"><code>&quot;baseUrl&quot;: &quot;.&quot;</code></h3>
<p><strong>ما الذي يفعله:</strong> المجلد الأساسي للاستيرادات غير النسبية.</p>
<h3 id="quotpathsquot"><code>&quot;paths&quot;</code></h3>
<p><strong>ما الذي يفعله:</strong> مسارات حلّ وحدات مخصّصة.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Instead of:</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Button</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../../../components/Button&#x27;</span>;

<span class="hljs-comment">// You can:</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Button</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@components/Button&#x27;</span>;
</code></pre>
<p><strong>أفضل الممارسات:</strong></p>
<ul>
<li>أبقِ الأسماء المستعارة مركّزة وذات معنى</li>
<li>طابق بنية مجلداتك</li>
<li>لا تبالغ في ذلك (كثرة الأسماء المستعارة = ارتباك)</li>
</ul>
<h2 id="الأداء">الأداء</h2>
<h3 id="quotskiplibcheckquot-true"><code>&quot;skipLibCheck&quot;: true</code></h3>
<p><strong>ما الذي يفعله:</strong> يتخطّى فحص أنواع ملفات التعريف (.d.ts).</p>
<p><strong>لماذا تفعّله؟</strong></p>
<ul>
<li>ترجمة أسرع</li>
<li>تجنّب الأخطاء في أنواع الطرف الثالث</li>
<li>لا يمكنك على أي حال إصلاح node_modules</li>
</ul>
<p><strong>🔒 خيار أكثر صرامة:</strong> عطّله لالتقاط كل مشكلات الأنواع</p>
<h3 id="quotincrementalquot-true"><code>&quot;incremental&quot;: true</code></h3>
<p><strong>ما الذي يفعله:</strong> يحفظ معلومات الترجمة ليجعل عمليات البناء اللاحقة أسرع.</p>
<h3 id="quottsbuildinfofilequot"><code>&quot;tsBuildInfoFile&quot;</code></h3>
<p><strong>ما الذي يفعله:</strong> أين تُخزَّن معلومات الترجمة التزايدة.</p>
<p><strong>أفضل ممارسة:</strong> استخدم node_modules/.cache لإبقاء المشروع نظيفًا.</p>
<h2 id="أنواع-البيئة">أنواع البيئة</h2>
<h3 id="quottypesquot-quotviteclientquot"><code>&quot;types&quot;: [&quot;vite/client&quot;]</code></h3>
<p><strong>ما الذي يفعله:</strong> أي حزم أنواع تُضمَّن بشكل عام.</p>
<p><strong>الإضافات الشائعة:</strong></p>
<pre><code class="language-json"><span class="hljs-attr">&quot;types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
  <span class="hljs-string">&quot;vite/client&quot;</span><span class="hljs-punctuation">,</span>     <span class="hljs-comment">// Vite env variables</span>
  <span class="hljs-string">&quot;node&quot;</span><span class="hljs-punctuation">,</span>            <span class="hljs-comment">// Node.js types if needed</span>
  <span class="hljs-string">&quot;@testing-library/jest-dom&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-comment">// Testing matchers</span>
  <span class="hljs-string">&quot;vitest/globals&quot;</span>   <span class="hljs-comment">// If using Vitest</span>
<span class="hljs-punctuation">]</span>
</code></pre>
<h2 id="متقدم-استراتيجية-الضبط-المتعدد">متقدّم: استراتيجية الضبط المتعدّد</h2>
<h3 id="الضبط-الأساسي-tsconfigjson">الضبط الأساسي (<code>tsconfig.json</code>)</h3>
<p>ضبطك الرئيسي (المُبيَّن أعلاه)</p>
<h3 id="ضبط-node-tsconfignodejson">ضبط Node (<code>tsconfig.node.json</code>)</h3>
<p>لإعداد Vite وسكربتات Node.js:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;extends&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./tsconfig.json&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;module&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ESNext&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;node&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;allowJs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;include&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;vite.config.ts&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;*.config.js&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="ضبط-البناء-tsconfigbuildjson">ضبط البناء (<code>tsconfig.build.json</code>)</h3>
<p>أكثر صرامة للإنتاج:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;extends&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./tsconfig.json&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;noUnusedLocals&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noUnusedParameters&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exclude&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;**/*.test.tsx&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;**/*.spec.tsx&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="ضبط-مكونات-الخادم-tsconfigserverjson">ضبط مكوّنات الخادم (<code>tsconfig.server.json</code>)</h3>
<p>إن كنت تستخدم مكوّنات خادم React:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;extends&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./tsconfig.json&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;lib&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;ES2023&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span> <span class="hljs-comment">// No DOM for server</span>
    <span class="hljs-attr">&quot;types&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;node&quot;</span><span class="hljs-punctuation">]</span> <span class="hljs-comment">// Node.js types instead</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;include&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;src/app/**/*server*&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;src/lib/server/**/*&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="إعدادات-التطوير-مقابل-الإنتاج">إعدادات التطوير مقابل الإنتاج</h3>
<p>قد ترغب في مستويات صرامة مختلفة أثناء التطوير:</p>
<pre><code class="language-json"><span class="hljs-comment">// tsconfig.dev.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;extends&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./tsconfig.json&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;noUnusedLocals&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;noUnusedParameters&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>ثم في ملف package.json:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;dev&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;vite --mode development&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;type-check&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc --project tsconfig.json --noEmit&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;type-check:dev&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc --project tsconfig.dev.json --noEmit&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tsc --project tsconfig.json --noEmit &amp;&amp; vite build&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="حيث-اخترنا-تجربة-المطور-على-الصرامة">حيث اخترنا تجربة المطور على الصرامة</h2>
<h3 id="nouncheckedindexedaccess-غير-مضمن"><code>noUncheckedIndexedAccess</code> (غير مُضمَّن)</h3>
<p><strong>ما الذي يفعله:</strong> يجعل الوصول المُفهرس يُعيد <code>T | undefined</code></p>
<pre><code class="language-typescript"><span class="hljs-comment">// Without noUncheckedIndexedAccess</span>
<span class="hljs-keyword">const</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-keyword">const</span> first = arr[<span class="hljs-number">0</span>]; <span class="hljs-comment">// Type: number (could be undefined!)</span>

<span class="hljs-comment">// With noUncheckedIndexedAccess</span>
<span class="hljs-keyword">const</span> first = arr[<span class="hljs-number">0</span>]; <span class="hljs-comment">// Type: number | undefined</span>
<span class="hljs-comment">// Requires constant checking even for &quot;safe&quot; access</span>
</code></pre>
<p><strong>ملاحظة خاصة بـ React 19:</strong> هذا الخيار ذو قيمة خاصة مع مكوّنات الخادم والاستيرادات الديناميكية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Without noUncheckedIndexedAccess - runtime error possible!</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">getUser</span>(<span class="hljs-params"><span class="hljs-attr">users</span>: <span class="hljs-title class_">User</span>[], <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">return</span> users[<span class="hljs-built_in">parseInt</span>(id)]; <span class="hljs-comment">// Could be undefined!</span>
}

<span class="hljs-comment">// With noUncheckedIndexedAccess - TypeScript catches it</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">getUser</span>(<span class="hljs-params"><span class="hljs-attr">users</span>: <span class="hljs-title class_">User</span>[], <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">const</span> user = users[<span class="hljs-built_in">parseInt</span>(id)]; <span class="hljs-comment">// Type: User | undefined</span>
  <span class="hljs-keyword">if</span> (!user) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;User not found&#x27;</span>);
  <span class="hljs-keyword">return</span> user; <span class="hljs-comment">// Now safely typed as User</span>
}
</code></pre>
<p>في رأيي المتواضع، هذا يمثّل احتكاكًا كبيرًا لمعظم تطبيقات React. فكّر فيه للتطبيقات عالية الموثوقية. في كل مرة أحاول فيها أن أكون شخصًا صالحًا وأستخدم هذا، أنتهي إلى إطفائه <em>بسرعة كبيرة</em>.</p>
<h3 id="nopropertyaccessfromindexsignature-false"><code>noPropertyAccessFromIndexSignature: false</code></h3>
<p>يسمح بالوصول الطبيعي إلى الخصائص في توقيعات الفهرسة.</p>
<h3 id="exactoptionalpropertytypes-false"><code>exactOptionalPropertyTypes: false</code></h3>
<p>لا يميّز بين undefined وغياب الخاصية - يطابق معظم أنماط React.</p>
<h3 id="nounusedlocalsparameters-false"><code>noUnusedLocals/Parameters: false</code></h3>
<p>يتولّى ESLint ذلك بشكل أفضل بمرونة أكبر.</p>
<h2 id="إطار-القرار">إطار القرار</h2>
<p><strong>فعّلها لأجل السلامة:</strong></p>
<ul>
<li>جميع خيارات <code>strict</code></li>
<li><code>noImplicitReturns</code></li>
<li><code>noFallthroughCasesInSwitch</code></li>
</ul>
<p><strong>فعّلها لأجل الوضوح:</strong></p>
<ul>
<li><code>verbatimModuleSyntax</code></li>
<li><code>noImplicitOverride</code></li>
<li><code>isolatedModules</code></li>
</ul>
<p><strong>فكّر فيها لكل مشروع:</strong></p>
<ul>
<li><code>noUncheckedIndexedAccess</code> - متطلبات سلامة عالية</li>
<li><code>noUnusedLocals/Parameters</code> - مستودع نظيف</li>
<li><code>exactOptionalPropertyTypes</code> - دقّة واجهات البرمجة</li>
</ul>
<p><strong>فعّلها دائمًا لـ React:</strong></p>
<ul>
<li><code>jsx: &quot;react-jsx&quot;</code></li>
<li><code>noEmit: true</code></li>
<li><code>moduleResolution: &quot;bundler&quot;</code></li>
</ul>
<h2 id="الأخطاء-الشائعة">الأخطاء الشائعة</h2>
<ol>
<li><strong>لا تستخدم <code>&quot;moduleResolution&quot;: &quot;node&quot;</code></strong> - إنها قديمة</li>
<li><strong>لا تعطّل <code>strict</code></strong> - إنها صفقة متكاملة</li>
<li><strong>لا تنسَ <code>isolatedModules</code></strong> - مطلوبة لـ Vite</li>
<li><strong>لا تخلط بين أدوات البناء</strong> - دع Vite يبني و TypeScript يفحص</li>
</ol>
<h2 id="فحص-ضبطك">فحص ضبطك</h2>
<p>شغّل هذه الأوامر للتحقق:</p>
<pre><code class="language-bash"><span class="hljs-comment"># Type checking</span>
npx tsc --noEmit

<span class="hljs-comment"># See computed config</span>
npx tsc --showConfig

<span class="hljs-comment"># Check specific file</span>
npx tsc --noEmit --explain-files | grep <span class="hljs-string">&quot;yourfile.tsx&quot;</span>
</code></pre>
<h2 id="react-19-وميزات-react-الحديثة">React 19 وميزات React الحديثة</h2>
<h3 id="دعم-خطاف-use">دعم خُطّاف <code>use</code></h3>
<p>يتطلّب خُطّاف <code>use</code> في React 19 كتابة أنواع غير متزامنة صحيحة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Ensure promises are well-typed for the use hook</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchUser</span>(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">User</span>&gt; {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${id}</span>\`</span>);
  <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch user&#x27;</span>);
  <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>(); <span class="hljs-comment">// Make sure this matches User type</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-comment">// TypeScript ensures the promise resolves to User</span>
  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">use</span>(<span class="hljs-title function_">fetchUser</span>(userId));
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h3 id="أمان-أنواع-الميزات-المتزامنة">أمان أنواع الميزات المتزامنة</h3>
<p>تستفيد الميزات المتزامنة في React 19 من الأنماط غير المتزامنة الصارمة. ويضمن الضبط أعلاه:</p>
<ul>
<li>أن الوعود مُكتوبة بأنواع صحيحة</li>
<li>أن حدود اللاتزامن واضحة</li>
<li>أن حدود Suspense تعمل بشكل صحيح مع TypeScript</li>
</ul>
<h2 id="التحقق-من-ضبطك">التحقق من ضبطك</h2>
<p>أنشئ ملف اختبار بسيطًا للتحقق من أن ضبطك يعمل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// test-config.tsx - Put this in your src folder temporarily</span>
<span class="hljs-keyword">import</span> { use } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>; <span class="hljs-comment">// React 19 import should work</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Button</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./components/Button.tsx&#x27;</span>; <span class="hljs-comment">// Extension import should work</span>

<span class="hljs-comment">// This should type-check properly</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">asyncData</span>: <span class="hljs-title class_">Promise</span>&lt;{ <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span> }&gt; = <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Test&#x27;</span> });

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TestComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> data = <span class="hljs-title function_">use</span>(asyncData); <span class="hljs-comment">// Should be properly typed</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">variant</span>=<span class="hljs-string">&quot;primary&quot;</span>&gt;</span>{data.name}<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>;
}

<span class="hljs-comment">// Strictness test - this should error with your strict config</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">maybeUser</span>: { <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span> } | <span class="hljs-literal">undefined</span> = <span class="hljs-literal">undefined</span>;
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(maybeUser.<span class="hljs-property">name</span>); <span class="hljs-comment">// Should error with strict checks</span>
</code></pre>
<p>شغّل <code>tsc --noEmit</code> للتأكد من أن كل شيء يُفحص بأنواعه بشكل صحيح، ثم احذف ملف الاختبار.</p>
<h2 id="إبقاء-ضبطك-محدثا">إبقاء ضبطك محدَّثًا</h2>
<p>يتطوّر React و TypeScript بسرعة. إليك كيف تبقى على اطّلاع:</p>
<ol>
<li><strong>اتّبع تحديثات تكامل TypeScript في React</strong> في ملاحظات الإصدار الخاصة بها</li>
<li><strong>راقب مدوّنة إصدار TypeScript</strong> خيارات المُصرِّف الجديدة</li>
<li><strong>استخدم أدوات مثل <code>@typescript-eslint/parser</code></strong> لضمان بقاء ضبطك متوافقًا مع إعداد الفحص لديك</li>
<li><strong>اختبر ضبطك مع إصدارات TypeScript الجديدة</strong> قبل الترقية</li>
</ol>
<p>تذكّر: TypeScript أداة تساعدك على تسليم شيفرة أفضل وأسرع، لا أداة تحاربك. يجسّد هذا الضبط تلك الفلسفة، مع كونه جاهزًا لآخر ميزات React 19.</p>
`,e={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:l,html:o};export{s as book,n as chapter,a as chapterTitle,e as default,l as headings,o as html,t as slug,p as title};
