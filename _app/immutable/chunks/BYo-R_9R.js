const e="kinney",s="ai-development",o="التطوير بأدوات الذكاء الاصطناعي",n="installing-cursor",r="التثبيت والإعداد",c=[{depth:2,id:"ثبت-تطبيق-سطح-المكتب",text:"ثبّت تطبيق سطح المكتب"},{depth:2,id:"ثبت-واجهة-سطر-الأوامر",text:"ثبّت واجهة سطر الأوامر"},{depth:2,id:"إعداد-المشروع-الأول",text:"إعداد المشروع الأول"},{depth:2,id:"قائمة-التحقق",text:"قائمة التحقق"}],t=`<p>لا يزال أسهل شرح لـ <a href="https://cursor.com/">Cursor</a> أنه محرّر شيفرة له وكيل مدمج في سير العمل. والتحديث المهم هو أن المحرّر لم يعد المنتج بأكمله. فـ Cursor الحالي يتضمّن أيضًا وكلاء سحابيين، وأتمتات، ووكلاء فرعيين، وخطّافات، ومهارات، وBugbot، ووكلاء أمن، وواجهة طرفية.</p>
<p>ابدأ بتطبيق سطح المكتب لأن حلقة التغذية الراجعة اليومية تكون أقوى هناك.</p>
<h2 id="ثبت-تطبيق-سطح-المكتب">ثبّت تطبيق سطح المكتب</h2>
<p>نزّل Cursor من <a href="https://cursor.com/">cursor.com</a>. وأثناء التهيئة الأولية، يستطيع Cursor استيراد الإضافات والإعدادات واختصارات لوحة المفاتيح والسمات من <a href="https://code.visualstudio.com/">Visual Studio Code</a>. وهذه الهجرة مفيدة لأن Cursor مألوف بما يكفي بحيث لا ينبغي أن يكون المحرّر هو الشيء الجديد الذي تتعلّمه، بل سير عمل الوكيل.</p>
<p>بعد التثبيت، تحقّق من هذه الإعدادات قبل أن تسلّمه مستودعًا حقيقيًا:</p>
<ul>
<li>فعّل <a href="https://cursor.com/help/security-and-privacy/privacy"><strong>وضع الخصوصية</strong></a> إذا كان المستودع يحتوي على شيفرة مملوكة.</li>
<li>قرّر ما إذا كانت طلبات النموذج يمكنها استخدام نماذج مميّزة (premium) أو نماذج <a href="https://cursor.com/docs/models-and-pricing">Max Mode</a>.</li>
<li>أضف قواعد المستخدم (User Rules) فقط للتفضيلات التي ينبغي أن تلازمك عبر كل مستودع.</li>
<li>أبقِ القواعد الخاصة بالمستودع في <code>.cursor/rules/*.mdc</code>.</li>
<li>اضبط خوادم <a href="https://modelcontextprotocol.io/">MCP</a> الموثوقة في <code>.cursor/mcp.json</code> أو <code>~/.cursor/mcp.json</code>.</li>
</ul>
<p>القاعدة المبدئية بسيطة: الإعدادات الشخصية الافتراضية توضع في إعدادات المستخدم، وسلوك المستودع يوضع في المستودع، وينبغي أن تكون الأدوات الخارجية صريحة بما يكفي ليستطيع أحد أعضاء الفريق تدقيقها.</p>
<h2 id="ثبت-واجهة-سطر-الأوامر">ثبّت واجهة سطر الأوامر</h2>
<p>يشحن Cursor أيضًا وكيلًا للطرفية. ثبّته بالمثبّت الرسمي:</p>
<pre><code class="language-bash">curl https://cursor.com/install -fsS | bash
</code></pre>
<p>على Windows، استخدم PowerShell:</p>
<pre><code class="language-powershell"><span class="hljs-built_in">irm</span> <span class="hljs-string">&#x27;https://cursor.com/install?win32=true&#x27;</span> | <span class="hljs-built_in">iex</span>
</code></pre>
<p>الأمر هو <code>agent</code> وليس <code>cursor</code>. شغّل <code>agent</code> داخل مستودع لجلسة تفاعلية، أو استخدم وضع الطباعة (print mode) للأتمتة:</p>
<pre><code class="language-bash">agent -p <span class="hljs-string">&quot;Review the staged changes for correctness.&quot;</span>
</code></pre>
<p>يتطلّب تعديل الملفات من <a href="https://cursor.com/docs/cli/headless">وضع الطباعة</a> علامة صريحة مثل <code>--force</code> أو <code>--yolo</code>، وهو اسم صادق على الأقل بشأن القرار المصيري الذي تتّخذه. عامل ذلك كقرار صلاحيات حقيقي، لا كمفتاح راحة.</p>
<h2 id="إعداد-المشروع-الأول">إعداد المشروع الأول</h2>
<p>لمستودع جادّ، أنشئ الملفات على مستوى المشروع قبل أن تطلب من الوكيل تعديل الشيفرة:</p>
<pre><code>.cursor/
  rules/
    architecture.mdc
    testing.mdc
  mcp.json
</code></pre>
<p>أضف المهارات فقط عندما يحتاج سير عمل إلى بنية أكبر مما تستطيع قاعدة توفيره:</p>
<pre><code>.cursor/
  skills/
    release-checklist/
      SKILL.md
</code></pre>
<p>إذا كان المستودع يحتوي بالفعل على <a href="https://agents.md/"><code>AGENTS.md</code></a>، فسيقرؤه Cursor كمصدر تعليمات. وما زلت أفضّل وضع السلوك الخاص بـ Cursor في ملفات Cursor ليعرف القارئ أي أداة تملك أي تعليمة.</p>
<h2 id="قائمة-التحقق">قائمة التحقق</h2>
<p>قبل أن تثق بإعداد جديد، اطلب من Cursor إجراء جولة تعريفية للقراءة فقط:</p>
<pre><code>Read this repository and summarize the build, test, lint, and release commands.
Do not edit files. Cite the files you used.
</code></pre>
<p>ثم قارن إجابته بنصوص المستودع. وإذا اختلق أوامر، فأصلح القواعد أو السياق قبل أن تستخدم وضع الوكيل (Agent mode) لإجراء تغييرات.</p>
`,p={book:e,chapter:s,chapterTitle:o,slug:n,title:r,headings:c,html:t};export{e as book,s as chapter,o as chapterTitle,p as default,c as headings,t as html,n as slug,r as title};
