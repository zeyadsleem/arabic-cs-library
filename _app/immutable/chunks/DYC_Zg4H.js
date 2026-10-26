const n="kinney",s="visual-studio-code",o="Visual Studio Code",t="settings-via-env-vars-vscode",e="التحكّم في الإعدادات بمتغيّرات البيئة",i=[{depth:2,id:"حالات-استخدام-محتملة",text:"حالات استخدام محتملة"}],l=`<p>تتيح لك متغيّرات البيئة ضبط إعدادات Visual Studio Code ديناميكيًا بناءً على بيئة نظامك. ويفيد ذلك في تكييف الإعدادات مع أنظمة تشغيل مختلفة، أو مراحل تطوير مختلفة (التطوير والتهيئة والإنتاج)، أو تهيئات خاصة بمستخدم معيّن. ويمكنك الإشارة إلى متغيّرات البيئة في <code>settings.json</code> باستخدام الصياغة <code>\${env:VARIABLE_NAME}</code>.</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
	<span class="hljs-attr">&quot;terminal.integrated.defaultProfile.windows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;\${env:WSL_DISTRO_NAME}&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-comment">// Use WSL distro name as default terminal profile on Windows</span>
</code></pre>
<p>وتعمل الصياغة في الأساس هكذا:</p>
<ul>
<li><code>\${env:VARIABLE_NAME}</code>: يشير إلى متغيّر البيئة <code>VARIABLE_NAME</code>.</li>
<li><code>\${env:VARIABLE_NAME:DEFAULT_VALUE}</code>: يوفّر قيمة افتراضية (<code>DEFAULT_VALUE</code>) إذا لم يُضبط متغيّر البيئة.</li>
</ul>
<p>ويدعم Visual Studio Code أيضًا هذه المتغيّرات جاهزةً:</p>
<ul>
<li><strong><code>VSCODE_FONT_SIZE</code>:</strong> المثال المستخدم أعلاه لضبط حجم الخط ديناميكيًا.</li>
<li><strong><code>VSCODE_DISABLE_EXTENSIONS</code>:</strong> يعطّل كل الإضافات عند تشغيل Visual Studio Code (مفيد في تشخيص المشكلات).</li>
<li><strong><code>VSCODE_DEV</code>:</strong> يشغّل Visual Studio Code في وضع التطوير.</li>
</ul>
<h2 id="حالات-استخدام-محتملة">حالات استخدام محتملة</h2>
<ul>
<li><strong>إعدادات عابرة للأنظمة:</strong> استخدم متغيّرات البيئة لضبط مسارات أو تهيئات خاصة بنظام تشغيل معيّن في <code>settings.json</code>، فيصبح لديك إعدادات قابلة للنقل بين أنظمة تشغيل مختلفة.</li>
<li><strong>إعدادات واعية بالبيئة:</strong> عدّل الإعدادات بناءً على بيئة التطوير. فمثلًا قد تستخدم أدوات فحص أو منسّقات مختلفة لبيئتي التطوير والإنتاج.</li>
<li><strong>تخصيص خاص بكل مستخدم:</strong> اسمح لمستخدمين مختلفين في الفريق بتهيئات Visual Studio Code مختلفة قليلًا باستخدام متغيّرات بيئة خاصة بكل مستخدم.</li>
</ul>
`,d={book:n,chapter:s,chapterTitle:o,slug:t,title:e,headings:i,html:l};export{n as book,s as chapter,o as chapterTitle,d as default,i as headings,l as html,t as slug,e as title};
