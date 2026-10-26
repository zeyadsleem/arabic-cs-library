const n="kinney",s="visual-studio-code",o="Visual Studio Code",t="keybindings",e="اختصارات لوحة المفاتيح (Keybindings)",a=[{depth:2,id:"اختصارات-لوحة-المفاتيح-المخصصة",text:"اختصارات لوحة المفاتيح المخصّصة"},{depth:3,id:"ملف-keybindingsjson",text:"ملف keybindings.json"},{depth:3,id:"فهم-شرط-when",text:"فهم شرط when"},{depth:3,id:"تجنب-تعارضات-الاختصارات",text:"تجنّب تعارضات الاختصارات"},{depth:2,id:"تصدير-اختصارات-لوحة-المفاتيح-ومزامنتها",text:"تصدير اختصارات لوحة المفاتيح ومزامنتها"},{depth:2,id:"اختصارات-خاصة-بكل-نظام-تشغيل",text:"اختصارات خاصة بكل نظام تشغيل"},{depth:2,id:"اختصارات-متعددة-الضغطات",text:"اختصارات متعددة الضغطات"}],c=`<p>اختصارات لوحة المفاتيح هي الاختصارات السحرية التي تمكّنك من استدعاء الأوامر بضغطة مفتاح واحدة. ويمكنك عرضها وتخصيصها مباشرةً من لوحة الأوامر بالبحث عن <code>Preferences: Open Keyboard Shortcuts</code>. وتعرض هذه الواجهة كل أمر متاح وأي ارتباطات افتراضية أو مخصّصة.</p>
<p>وإذا وجدت أمرًا أساسيًا مدفونًا في لوحة الأوامر، فخصّص له اختصارًا ملائمًا. وبذلك تتجنّب التنقيب عنه في المرة القادمة وتذهب مباشرةً إلى ما تريد.</p>
<h2 id="اختصارات-لوحة-المفاتيح-المخصصة">اختصارات لوحة المفاتيح المخصّصة</h2>
<p>وراء محرّر الاختصارات تقع البراعة الحقيقية: اختصارات مخصّصة في <code>keybindings.json</code>. ويُفتح هذا الملف من لوحة الأوامر بالبحث عن <code>Preferences: Open Keyboard Shortcuts (JSON)</code>. وهو يوفّر تحكمًا دقيقًا في كيفية عمل الاختصارات ووقت تفعيلها.</p>
<h3 id="ملف-keybindingsjson">ملف <code>keybindings.json</code></h3>
<p><code>keybindings.json</code> في جوهره قائمة من القواعد. وتحتوي كل قاعدة عادةً على <code>key</code> و<code>command</code> وشرط <code>when</code> اختياري. على سبيل المثال:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ctrl+alt+j&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;editor.action.commentLine&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;when&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;editorTextFocus &amp;&amp; editorLangId == &#x27;javascript&#x27;&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يربط هذا <code>Ctrl+Alt+J</code> بتبديل تعليقات الأسطر، لكن في ملفات JavaScript فقط (<code>editorLangId == 'javascript'</code>). ولو جرّبت هذا الارتباط في ملف TypeScript، لما عمل.</p>
<h3 id="فهم-شرط-when">فهم شرط <code>when</code></h3>
<p>شرط <code>when</code> هو وسيلتك لضبط قواعد سياقية. وهو يعمل كشرط تضميني يجب أن يكون صحيحًا حتى يُفعَّل الارتباط. ومن الأمثلة الشائعة:</p>
<ul>
<li><code>editorTextFocus</code>: يضمن أن المؤشر حاليًا في محرّر نصوص (لا في عرض فروقات ولا في لوحة).</li>
<li><code>editorLangId == 'javascript'</code>: يقصر الاختصار على ملفات JavaScript فقط.</li>
<li><code>isInDiffEditor</code>: يستهدف محرّر الفروقات وحده، وهو مفيد في مراجعات الشيفرة.</li>
</ul>
<p>وسَلسْنة شروط متعددة سهلة باستخدام <code>&amp;&amp;</code> بينها. وتمنحك هذه المرونة القدرة على صياغة اختصارات دقيقة تتصرّف بثبات في كل سياق.</p>
<blockquote>
<p><strong>احرص ألّا تبالغ في إضافة شروط كثيرة. فشروط <code>when</code> المفرطة في التحديد قد تتركك تتساءل لماذا توقّف اختصار فجأة عن العمل.</strong></p>
</blockquote>
<p>وإليك بعض القيم الشائعة لخاصية <code>when</code>.</p>
<ul>
<li><strong><code>editorTextFocus</code></strong>: صحيحة عندما يكون محرّر النصوص في التركيز.</li>
<li><strong><code>editorLangId</code></strong>: يمثّل معرّف اللغة للملف الحالي (مثل ‘typescript’ و‘javascript’).</li>
<li><strong><code>resourceExtname</code></strong>: امتداد الملف للمورد الحالي (مثل ‘.js’ و‘.ts’).</li>
<li><strong><code>resourceScheme</code></strong>: مخطط URI للمورد (مثل ‘file’ و‘untitled’).</li>
<li><strong><code>sideBarFocus</code></strong>: صحيحة عندما يكون الشريط الجانبي في التركيز.</li>
<li><strong><code>panelFocus</code></strong>: صحيحة عندما تكون اللوحة (القسم السفلي) في التركيز.</li>
<li><strong><code>inDebugMode</code></strong>: صحيحة عندما يكون المنقّح نشطًا.</li>
<li><strong><code>debuggersAvailable</code></strong>: صحيحة عندما تتوفّر منقّحات للجلسة الحالية.</li>
<li><strong><code>textInputFocus</code></strong>: صحيحة عندما يكون صندوق إدخال نصي (بما في ذلك المحرّر) في التركيز.</li>
<li><strong><code>config.&lt;settingName&gt;</code></strong>: يمثّل قيمة إعداد معيّن؛ فمثلًا <code>config.editor.tabCompletion</code> يفحص إعداد ‘editor.tabCompletion’.</li>
</ul>
<p>يمكن دمج مفاتيح السياق هذه باستخدام معاملات شرطية لإنشاء شروط أكثر تحديدًا:</p>
<ul>
<li><strong><code>&amp;&amp;</code></strong>: و (AND) المنطقية.</li>
<li><strong><code>||</code></strong>: أو (OR) المنطقية.</li>
<li><strong><code>!</code></strong>: النفي (NOT) المنطقي.</li>
<li><strong><code>==</code></strong>: التساوي.</li>
<li><strong><code>!=</code></strong>: عدم التساوي.</li>
<li><strong><code>=~</code></strong>: مطابقة تعبير نمطي.</li>
</ul>
<blockquote>
<p><strong>استكشاف مفاتيح السياق</strong></p>
<p>لاستكشاف مفاتيح السياق النشطة في جلسة VS Code الحالية، يمكنك استخدام أمر <strong>Developer: Inspect Context Keys</strong> من لوحة الأوامر. وتوفّر هذه الأداة نظرة على الحالة الحالية لمفاتيح السياق المختلفة، ما يساعد في إنشاء شروط “when” دقيقة. وستحتاج إلى</p>
</blockquote>
<h3 id="تجنب-تعارضات-الاختصارات">تجنّب تعارضات الاختصارات</h3>
<p>تحدث التعارضات عندما يُربط اختصاران أو أكثر بالمفاتيح نفسها في السياق نفسه. ويستخدم Visual Studio Code عادةً الارتباط المعلَن أخيرًا، فيأخذ الأولوية أيهما حُمِّل آخرًا. ولتجنّب الالتباس، راجع الاختصارات الموجودة في محرّر الاختصارات قبل تعيين اختصارات جديدة. وإذا وجدت تعارضًا، فأزل الارتباط القديم أو غيّره للحفاظ على ذاكرتك العضلية.</p>
<blockquote>
<p><strong>تجاوز الإضافات التي تتجاوز اختصاراتك</strong></p>
<p>إذا كنت تعتمد على إضافة تخطف اختصارًا تحبه، فافتح <code>keybindings.json</code> وتجاوزه. انتهت المشكلة — بلا حاجة إلى ضجّة.</p>
</blockquote>
<h2 id="تصدير-اختصارات-لوحة-المفاتيح-ومزامنتها">تصدير اختصارات لوحة المفاتيح ومزامنتها</h2>
<p>يقدّم VS Code ميزة Settings Sync المدمجة التي تتضمّن اختصاراتك المخصّصة، فتضمن أن اختصاراتك الشخصية ترافقك بين الأجهزة. وبتفعيل Settings Sync، يُنسَخ <code>keybindings.json</code> احتياطيًا ويُشارَك تلقائيًا بين أجهزتك، فيبقى سير عملك متسقًا حيثما عملت.</p>
<h2 id="اختصارات-خاصة-بكل-نظام-تشغيل">اختصارات خاصة بكل نظام تشغيل</h2>
<p>أحيانًا لا يكون الاختصار نفسه مثاليًا عبر أنظمة تشغيل مختلفة. ويتيح لك VS Code تعريف اختصارات خاصة بكل نظام مباشرةً في <code>keybindings.json</code>. فمثلًا، يمكنك تجاوز مفتاح أمر على macOS مقارنةً بـ Windows أو Linux:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ctrl+shift+t&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;workbench.action.reopenClosedEditor&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;when&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;editorTextFocus&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;mac&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;cmd+shift+t&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يضمن هذا الإعداد أن يستخدم مستخدمو macOS الاختصار <code>Cmd+Shift+T</code> بينما يلتزم الآخرون بـ <code>Ctrl+Shift+T</code>، فيتكيّف التجربة مع مواطن القوة في كل نظام.</p>
<h2 id="اختصارات-متعددة-الضغطات">اختصارات متعددة الضغطات</h2>
<p>يدعم VS Code اختصارات متعددة الضغطات (أو المقترنة)، التي تتيح لك تسلسل عدة ضغطات مفتاح لتشغيل أمر. وتقلّل هذه المقاربة التعارضات مع الارتباطات أحادية الضغطة وقد تكون أسهل تذكّرًا للأوامر المعقّدة. فمثلًا، يتطلّب الارتباط التالي ضغطتين متتاليتين:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;key&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;cmd+k cmd+c&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;editor.action.addCommentLine&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;when&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;editorTextFocus&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يوفّر استخدام الاختصارات متعددة الضغطات طريقة متينة لتوسيع مجموعة اختصاراتك دون إثقال لوحة المفاتيح، ما يتيح لك تعيين الأوامر بطريقة أكثر بديهية وتنظيمًا.</p>
<blockquote>
<p><strong>تشغيل عدة أوامر</strong></p>
<p>توجد إضافة مفيدة لذلك تُسمّى <a href="https://marketplace.visualstudio.com/items?itemName=ryuta46.multi-command"><strong>Multi Command</strong></a>.</p>
</blockquote>
`,p={book:n,chapter:s,chapterTitle:o,slug:t,title:e,headings:a,html:c};export{n as book,s as chapter,o as chapterTitle,p as default,a as headings,c as html,t as slug,e as title};
