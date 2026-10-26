const e="kinney",n="visual-studio-code",t="Visual Studio Code",i="favorite-vs-code-settings",o="إعدادات Steve المفضّلة وإعدادات شائعة أخرى",s=[{depth:2,id:"مفضلات-steve",text:"مفضّلات Steve"},{depth:3,id:"workbencheditorrevealifopen",text:"workbench.editor.revealIfOpen"},{depth:3,id:"updateimportsonfilemove",text:"updateImportsOnFileMove"},{depth:3,id:"javascriptpreferencesorganizeimports",text:"javascript.preferences.organizeImports"},{depth:2,id:"إعدادات-شائعة-أخرى",text:"إعدادات شائعة أخرى"},{depth:3,id:"filesautosave",text:"files.autoSave"},{depth:3,id:"editorminimapenabled",text:"editor.minimap.enabled"},{depth:3,id:"editorwordwrap",text:"editor.wordWrap"},{depth:3,id:"editorrenderwhitespace",text:"editor.renderWhitespace"},{depth:3,id:"editorcursorsmoothcaretanimation",text:"editor.cursorSmoothCaretAnimation"},{depth:3,id:"workbenchicontheme",text:"workbench.iconTheme"},{depth:3,id:"editorcodelens",text:"editor.codeLens"},{depth:3,id:"terminalintegratedfontfamily",text:"terminal.integrated.fontFamily"}],r=`<h2 id="مفضلات-steve">مفضّلات Steve</h2>
<p>أنا شخص بسيط نسبيًا، لكن هذه بعض الإعدادات التي أتشبّث برأيي فيها، بترتيب تنازلي.</p>
<h3 id="workbencheditorrevealifopen"><code>workbench.editor.revealIfOpen</code></h3>
<p>إعداد <code>workbench.editor.revealIfOpen</code> هو نسخة Visual Studio Code من عبارة: «مهلا، لديّ هذا الملف مفتوحًا بالفعل!». فبدلًا من إثقال مساحة عملك بتبويبات مكرّرة، يكتفي Visual Studio Code بإبراز التبويب الموجود. وإليك التفصيل:</p>
<p>عند فتح ملف مفتوح بالفعل في تبويب آخر، يكشف Visual Studio Code التبويب الموجود بدلًا من فتح تبويب جديد. لا مزيد من التبويبات المكرّرة المتنافرة.</p>
<h3 id="updateimportsonfilemove"><code>updateImportsOnFileMove</code></h3>
<pre><code class="language-json"><span class="hljs-attr">&quot;javascript.updateImportsOnFileMove.enabled&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;always&quot;</span><span class="hljs-punctuation">,</span>
<span class="hljs-attr">&quot;typescript.updateImportsOnFileMove.enabled&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;always&quot;</span><span class="hljs-punctuation">,</span>
</code></pre>
<p>كلما نقلت ملفًا (أو أعدت تسميته)، يفحص Visual Studio Code مشروعك ويحدّث تلقائيًا كل مسارات الاستيراد التي تشير إلى الملف المنقول. لا مزيد من الروابط المعطوبة.</p>
<h4>كيف يعمل</h4>
<ul>
<li><strong>في الخلفية:</strong> عند نقل ملف، تتدخّل خدمة اللغة وتبحث عن أي عبارات استيراد تشير إلى الموقع القديم للملف، ثم تعيد كتابتها بالمسار الجديد.</li>
<li><strong>وضع “always”:</strong> مع ضبط الإعداد على “always”، تجري هذه العملية تلقائيًا دون أن يسألك. الأمر أشبه بمساعد شخصي لا ينسى تحديث جهات اتصالك عندما تغيّر رقمك.</li>
</ul>
<h4>لماذا يعجبني</h4>
<ul>
<li><strong>منع الأخطاء:</strong> لا مزيد من أخطاء “module not found” الغامضة بسبب مسارات قديمة.</li>
<li><strong>إعادة هيكلة بلا عناء:</strong> يمكنك إعادة ترتيب بنية مشروعك دون خوف من كسر عبارات الاستيراد.</li>
<li><strong>ملائم للفريق:</strong> يضمن الاتساق ويخلّص فريقك من صداع تحديث الاستيرادات يدويًا في ملفات متعددة.</li>
</ul>
<p>ويضمن الإعدادان معًا أن Visual Studio Code يحدّث تلقائيًا مسارات الاستيراد المقابلة كلما نقلت ملفًا في مشروع JavaScript أو TypeScript. وهذا يبقي شيفرتك نظيفة وعاملة وخالية من أخطاء المسارات المزعجة، ويتيح لك التركيز على بناء الميزات بدلًا من تصحيح أخطاء عبارات الاستيراد.</p>
<h3 id="javascriptpreferencesorganizeimports"><code>javascript.preferences.organizeImports</code></h3>
<p>هذا الإعداد هو طريقة Visual Studio Code في الأساس لتُبقي عبارات الاستيراد مرتّبة كدرج جوارب منظّم بعناية. وإليك الخلاصة:</p>
<h4>ما يفعله</h4>
<ul>
<li><strong>تنظيف تلقائي:</strong> عند تمكينه، ترتّب خدمة JavaScript في Visual Studio Code استيراداتك بحذف غير المستخدم منها وترتيبها وتجميعها منطقيًا. الأمر أشبه بوجود Marie Kondo رقمية لشيفرتك.</li>
<li><strong>يدوي أو تلقائي:</strong> يمكنك تشغيله يدويًا عبر أمر “Organize Imports”، أو تلقائيًا عند حفظ ملفك إن كنت قد ضبطت إجراء الشيفرة المناسب.</li>
</ul>
<h4>كيف يعمل</h4>
<ul>
<li><strong>التكامل مع إجراءات الشيفرة:</strong> يعمل الإعداد جنبًا إلى جنب مع إجراء الشيفرة “source.organizeImports”. وعند الحفظ (وإن كنت قد أعددته في editor.codeActionsOnSave)، يمر Visual Studio Code على ملفك ويعيد ترتيب عبارات الاستيراد.</li>
<li><strong>يبقي شيفرتك خفيفة:</strong> بالتخلص من الاستيرادات غير المستخدمة وترتيب الباقي، يضمن ألا تتراكم في شيفرتك أعباء غير ضرورية، فتبقى أنظف وأسهل قراءة.</li>
</ul>
<h4>كيفية الضبط</h4>
<ol>
<li><strong>اضبط التفضيل:</strong> تأكّد من وجود “javascript.preferences.organizeImports”: true في إعدادات Visual Studio Code لديك (إن كان ذلك منطبقًا).</li>
<li><strong>مكّنه عند الحفظ (اختياري):</strong> أضف هذا إلى إعداداتك ليعمل تلقائيًا عند الحفظ:</li>
</ol>
<pre><code class="language-typescript"><span class="hljs-string">&quot;editor.codeActionsOnSave&quot;</span>: {
  <span class="hljs-string">&quot;source.organizeImports&quot;</span>: <span class="hljs-literal">true</span>
}
</code></pre>
<p><strong>استمتع بالتنظيف:</strong> الآن في كل مرة تحفظ فيها، تخضع استيراداتك لعملية تنسيق مرتّبة، ولا مزيد من الوحدات الشاردة غير المستخدمة!</p>
<h4>لماذا يستحقّ الاستخدام</h4>
<ul>
<li><strong>الاتساق:</strong> يضمن أن كل ملفاتك تتبع النمط المنظّم نفسه.</li>
<li><strong>فوضى أقل:</strong> يزيل الشيفرة الميتة (الاستيرادات غير المستخدمة) التي قد تربك ملفاتك أو تضخّمها.</li>
<li><strong>تعاون أفضل:</strong> الاستيرادات النظيفة المنظّمة تجعل فهم شيفرتك أسرع للزملاء (أو لك في المستقبل).</li>
</ul>
<p>باختصار، javascript.preferences.organizeImports إعداد صغير يحقّق فوائد كبيرة، ويبقي قاعدتك البرمجية متينة دون أن ترفع إصبعًا (أو على الأقل ليس لتنظيف الاستيرادات). لا مزيد من الترتيب اليدوي، بل نظافة تلقائية خالصة!</p>
<h2 id="إعدادات-شائعة-أخرى">إعدادات شائعة أخرى</h2>
<p>لا أحبّ كل هذه الإعدادات، لكن آخرين يحبّونها وقد تحبّها أنت أيضًا. وإليك بعض التعديلات الشائعة في Visual Studio Code التي يتفانى كثير من المطوّرين في الدفاع عنها، مع سبب إعجابك المحتمل بها:</p>
<h3 id="filesautosave"><code>files.autoSave</code></h3>
<ul>
<li>يحفظ تغييراتك تلقائيًا بناءً على المُشغّل الذي تختاره (مثلًا بعد مهلة زمنية، أو عند تغيّر التركيز، أو عند تغيّر النافذة).</li>
<li>الأمر أشبه بصديق نسخ احتياطي مفرط الحماس لا يدعك تفقد عبقرتك غير المحفوظة أبدًا.</li>
</ul>
<h3 id="editorminimapenabled"><code>editor.minimap.enabled</code></h3>
<ul>
<li>يشغّل الخريطة المصغّرة (minimap)، وهي نظرة من عُلٍّ على شيفرتك، أو يوقفها.</li>
<li>لمن يحبّون خريطة مرئية لشيفرتهم، أو لمن يريدون تقليل الفوضى على الشاشة إن كانت الخريطة المصغّرة عبئًا إضافيًا.</li>
</ul>
<h3 id="editorwordwrap"><code>editor.wordWrap</code></h3>
<ul>
<li>يلفّ أسطر الشيفرة الطويلة حتى لا تضطر إلى التمرير جانبيًا إلى ما لا نهاية.</li>
<li>يبقي شيفرتك مقروءة دون أن تشعر بأنك عالق في نفق أفقي لا ينتهي.</li>
</ul>
<h3 id="editorrenderwhitespace"><code>editor.renderWhitespace</code></h3>
<ul>
<li>يعرض الأحرف غير المرئية مثل المسافات ومحارف الجدولة وفواصل الأسطر.</li>
<li>وهو مفيد في اكتشاف مشكلات التنسيق الخفيّة، فتتيقّن دائمًا مما يجري في الخلفية.</li>
</ul>
<h3 id="editorcursorsmoothcaretanimation"><code>editor.cursorSmoothCaretAnimation</code></h3>
<ul>
<li>يمنح حركة المؤشر انزلاقًا سلسًا متحرّكًا.</li>
<li>قد لا يؤثّر في الوظائف، لكنه بالتأكيد يجعل التنقل في شيفرتك أشبه بفاصل راقص.</li>
</ul>
<h3 id="workbenchicontheme"><code>workbench.iconTheme</code></h3>
<ul>
<li>يتيح لك اختيار مجموعة مختلفة من أيقونات الملفات، فيبدو شجرة ملفاتك أنيقًا مثل شيفرتك.</li>
<li>يمكن لسمة أيقونات جديدة أن تضيف شخصية إلى مساحة عملك، فاعتبره تحديثًا لمظهر مستكشف الملفات.</li>
</ul>
<h3 id="editorcodelens"><code>editor.codeLens</code></h3>
<ul>
<li>يضيف تعليقات مضمّنة للمراجع وحالات الاختبارات وغير ذلك.</li>
<li>الأمر أشبه بملاحظات لاصقة صغيرة مفيدة داخل شيفرتك، تتابع المعلومات المهمة في المكان الذي تحتاجها فيه بالضبط.</li>
</ul>
<h3 id="terminalintegratedfontfamily"><code>terminal.integrated.fontFamily</code></h3>
<ul>
<li>يتيح لك ضبط الخط المفضل لديك للطرفية المدمجة لتصبح أكثر تخصيصًا أو جمالًا.</li>
<li>لأن سطر الأوامر لديك يستحق أيضًا مظهرًا رائعًا وإحساسًا مريحًا.</li>
</ul>
`,l={book:e,chapter:n,chapterTitle:t,slug:i,title:o,headings:s,html:r};export{e as book,n as chapter,t as chapterTitle,l as default,s as headings,r as html,i as slug,o as title};
