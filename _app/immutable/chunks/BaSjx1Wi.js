const s="kinney",n="full-stack-typescript",t="TypeScript للويب الكامل",p="type-stripping",a="نزع الأنواع",e=[{depth:2,id:"كيف-يعمل",text:"كيف يعمل"},{depth:2,id:"تهيئة-typescript-لنزع-الأنواع-في-node",text:"تهيئة TypeScript لنزع الأنواع في Node"},{depth:2,id:"جهز-tsconfigjson",text:"جهّز tsconfig.json"},{depth:2,id:"استخدم-الاستيرادات-الخاصة-بالأنواع-فقط",text:"استخدم الاستيرادات الخاصة بالأنواع فقط"},{depth:2,id:"التزم-بالصياغة-المدعومة",text:"التزم بالصياغة المدعومة"},{depth:2,id:"شغل-فحص-الأنواع-الساكن-منفصلا",text:"شغّل فحص الأنواع الساكن منفصلًا"},{depth:2,id:"أفضل-الممارسات-والاستنتاجات-الأساسية",text:"أفضل الممارسات والاستنتاجات الأساسية"},{depth:3,id:"النمذجة-السريعة",text:"النمذجة السريعة"},{depth:3,id:"التصحيح",text:"التصحيح"},{depth:3,id:"ابق-داخل-الحدود",text:"ابقَ داخل الحدود"},{depth:3,id:"الحالة-التجريبية",text:"الحالة التجريبية"}],o=`<p>نزع الأنواع (type stripping) هو طريقة Node.js لتشغيل ملفات TypeScript «بشكل سحري» بلا خطوة بناء منفصلة — إذ يمحو فعليًا كل صياغة الأنواع من شيفرتك المصدرية في وقت التشغيل. بعبارة أخرى، يأخذ Node ملف <code>.ts</code> لديك، ويحذف منه أشياء مثل تعليقات الأنواع والواجهات والاستيرادات المخصّصة للأنواع فقط (باستبدالها بمسافات بيضاء كي تبقى أرقام الأسطر كما هي)، ثم ينفّذ شيفرة JavaScript المتبقية كما لو كنت قد كتبتها بيدك. إنه مثل وجود زر «نفّذها مباشرةً» لـ TypeScript — لكن لا تنسَ أنه لا يفحص أنواعك في وقت التشغيل!</p>
<h2 id="كيف-يعمل">كيف يعمل</h2>
<ul>
<li><strong>لا فحص أنواع في وقت التشغيل:</strong> يكتفي Node بنزع تعليقات الأنواع (باستخدام تحويل بالغ الصغر عبر نسخة مخصّصة من swc) دون إجراء أي فحوص أنواع. لذا إن مرّرت رقمًا بالخطأ حيث يُتوقع نص، سيشغّل Node شيفرتك بسرور، وغالبًا ما ستنفجر لاحقًا.</li>
<li><strong>الحفاظ على خريطة المصدر:</strong> باستبدال شيفرة الأنواع بمسافات بيضاء بدل حذفها كليًا، يحافظ Node على أرقام أسطر شيفرتك الأصلية. وهذا يعني أن تتبّعات المكدّس لا تزال تشير إلى الموقع الصحيح في مصدرك — رغم اختفاء أنواعك.</li>
<li><strong>ميزة تجريبية:</strong> كانت تُعلَن في البداية بتحذيرات (يمكنك تعطيلها باستخدام <code>--disable-warning=ExperimentalWarning</code> أو عبر <code>NODE_OPTIONS</code>)، ونزع الأنواع ميزة تجريبية قد تتطوّر بمرور الوقت.</li>
</ul>
<h2 id="تهيئة-typescript-لنزع-الأنواع-في-node">تهيئة TypeScript لنزع الأنواع في Node</h2>
<p>للجمع بين أفضل ما في العالمين — تنفيذ سريع بنزع الأنواع المدمج في Node وفحص أنواع ساكن متين أثناء التطوير — إليك ما ينبغي أن تفعله:</p>
<h2 id="جهز-tsconfigjson">جهّز <code>tsconfig.json</code></h2>
<p>استخدم تكوينًا بالغ الصغر مُفصّلًا لنزع الأنواع في Node. على سبيل المثال:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;esnext&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;module&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;nodenext&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;allowImportingTsExtensions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span> <span class="hljs-comment">// Import .ts files directly</span>
    <span class="hljs-attr">&quot;rewriteRelativeImportExtensions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span> <span class="hljs-comment">// Convert .ts imports to .js in output</span>
    <span class="hljs-attr">&quot;verbatimModuleSyntax&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span> <span class="hljs-comment">// Enforce use of &#x27;import type&#x27; for type-only imports</span>
    <span class="hljs-attr">&quot;erasableSyntaxOnly&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span> <span class="hljs-comment">// Warns on unsupported TS features (like enums, namespaces, etc.)</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يخبر هذا الإعداد TypeScript أن يُعلم Node.js أي الأجزاء آمنة لنزعها.</p>
<h2 id="استخدم-الاستيرادات-الخاصة-بالأنواع-فقط">استخدم الاستيرادات الخاصة بالأنواع فقط</h2>
<p>استورد الأنواع دائمًا بصياغة <code>import type { … }</code>. فإذا استوردت الأنواع كقيم وقت تشغيل (بإغفال <code>type</code>)، فلن يزيلها نزع الأنواع في Node، وقد يؤدي ذلك إلى أخطاء وقت التشغيل.</p>
<h2 id="التزم-بالصياغة-المدعومة">التزم بالصياغة المدعومة</h2>
<p>نزع الأنواع الحالي في Node يدعم مجموعة فرعية من TypeScript فقط:</p>
<ul>
<li>لا تعدادات (enums)، ولا خصائص وسائط، ولا نطاقات أسماء (namespaces).</li>
<li>JSX غير مدعوم.</li>
<li>استخدم ملفات <code>.ts</code> عادية (أو <code>.mts</code>/<code>.cts</code> لسلوك خاص بالوحدات).</li>
</ul>
<p>باختصار، اكتب شيفرة TS بعقلية أن Node «ينظّف» أنواعك فحسب، ولا يحوّل شيفرتك تحويلًا عميقًا.</p>
<h2 id="شغل-فحص-الأنواع-الساكن-منفصلا">شغّل فحص الأنواع الساكن منفصلًا</h2>
<p>بما أن Node لن يفحص أنواعك في وقت التشغيل، فتأكّد من تشغيل <code>tsc --noEmit</code> (أو استخدام خادم اللغة في محرّرك) أثناء التطوير لالتقاط أخطاء الأنواع قبل وصولك إلى وقت التشغيل.</p>
<h2 id="أفضل-الممارسات-والاستنتاجات-الأساسية">أفضل الممارسات والاستنتاجات الأساسية</h2>
<h3 id="النمذجة-السريعة">النمذجة السريعة</h3>
<p>نزع الأنواع رائع للتحرير السريع بلا خطوة بناء. لكن لا ترتخِ كثيرًا — اعتمد على فاحص الأنواع لالتقاط الأخطاء.</p>
<h3 id="التصحيح">التصحيح</h3>
<p>بفضل استبدال المسافات البيضاء، يبقى التصحيح دقيقًا. فتتبّعات المكدّس تشير إلى حيث تتوقّع تمامًا.</p>
<h3 id="ابق-داخل-الحدود">ابقَ داخل الحدود</h3>
<p>بما أن ميزات TypeScript كلها غير مدعومة، فتجنّب صياغة TS «الغرابة» التي تتطلب ترجمة كاملة (مثل التعدادات أو بعض الأنواع العامة المتقدمة).</p>
<h3 id="الحالة-التجريبية">الحالة التجريبية</h3>
<p>تذكّر أن هذه الميزة تجريبية. استخدمها في التطوير للنمذجة، لكن في شيفرة الإنتاج قد تفضّل خطوة بناء كاملة حتى تنضج الميزة.</p>
<p>باختصار، نزع الأنواع في Node.js ميزة أنيقة تتيح لك تشغيل ملفات TypeScript كما لو كانت JavaScript — بنزع الأنواع على الطائر. فقط تذكّر أن هذا حلّ وقت تشغيل «بلا فحص أنواع»، لذا يجب تشغيل شبكة أمانك (مصرّف TypeScript) منفصلًا أثناء التطوير.</p>
<p>برمجة سعيدة — ولتُلتقط أخطاء أنواعك قبل وقت التشغيل (أو على الأقل قبل أن يلاحظها مستخدموك)!</p>
`,l={book:s,chapter:n,chapterTitle:t,slug:p,title:a,headings:e,html:o};export{s as book,n as chapter,t as chapterTitle,l as default,e as headings,o as html,p as slug,a as title};
