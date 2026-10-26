const s="kinney",n="visual-studio-code",a="Visual Studio Code",t="more-on-multi-root-namespaces",o="المزيد عن النطاقات متعدّدة الجذور",p=[{depth:2,id:"بنية-ملف-مساحة-العمل-واستمراريته",text:"بنية ملف مساحة العمل واستمراريته"},{depth:2,id:"إدارة-متقدمة-لمساحة-العمل",text:"إدارة متقدّمة لمساحة العمل"},{depth:2,id:"التحكم-في-الإصدارات-عبر-مجلدات-متعددة",text:"التحكّم في الإصدارات عبر مجلدات متعدّدة"},{depth:2,id:"إعدادات-المهام-والتنقيح-المدمجة",text:"إعدادات المهام والتنقيح المدمجة"}],c=`<p>بعض الملاحظات الإضافية التي <em>لن نصل</em> إليها على الأرجح، لكنني أُدرجها هنا احتياطًا.</p>
<h2 id="بنية-ملف-مساحة-العمل-واستمراريته">بنية ملف مساحة العمل واستمراريته</h2>
<p>تُعرَّف مساحات العمل متعدّدة الجذور بملف <code>.code-workspace</code>، وهو لا يسرد المجلدات المشمولة في مساحة العمل فحسب، بل يتيح لك أيضًا تخزين إعدادات وتكوينات خاصة بمساحة العمل. ويمكن حفظ هذا الملف وإدارته بالتحكّم في الإصدارات ومشاركته مع فريقك، بما يضمن أن يستخدم الجميع بيئة تطوير متّسقة. فمثلًا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;folders&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;frontend&quot;</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;backend&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;settings&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;editor.tabSize&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;files.exclude&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;**/node_modules&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<blockquote>
<p><strong>احفظ مساحة عملك في ملف <code>.code-workspace</code> لتتمكّن بسهولة من إعادة فتح إعدادك متعدّد الجذور ومشاركته.</strong></p>
</blockquote>
<h2 id="إدارة-متقدمة-لمساحة-العمل">إدارة متقدّمة لمساحة العمل</h2>
<p>يوفّر Visual Studio Code أوامر لإدارة مجلدات مساحة العمل ديناميكيًا. استخدم لوحة الأوامر لتشغيل <strong>“Workspaces: Add Folder to Workspace”</strong> أو <strong>“Workspaces: Remove Folder from Workspace”</strong> لتعديل مساحة عملك بسرعة. ويمكنك أيضًا إعادة ترتيب المجلدات بسحبها في Explorer، مما يتيح لك إعطاء أولوية لمشاريع معيّنة.</p>
<blockquote>
<p><strong>إعادة ترتيب مجلدات مساحة عملك تساعدك على الحفاظ على التركيز بوضع المشاريع الأكثر أهمية في أعلى عرض Explorer.</strong></p>
</blockquote>
<h2 id="التحكم-في-الإصدارات-عبر-مجلدات-متعددة">التحكّم في الإصدارات عبر مجلدات متعدّدة</h2>
<p>يمكن أن يكون لكل مجلد في مساحة عمل متعدّدة الجذور إعداداته الخاصة للتحكّم في الإصدارات، مما يتيح لك العمل على مستودعات Git منفصلة في الوقت نفسه. ويعني ذلك أنك تستطيع تجهيز التغييرات وإيداعها ودفعها بشكل مستقل لكل مشروع مع الاستفادة في الوقت نفسه من واجهة موحّدة. وإضافة إلى ذلك، يمكن أن تساعد إعدادات مستوى مساحة العمل في توحيد قواعد الفحص والتنسيق (linting and formatting) بين جميع المشاريع.</p>
<blockquote>
<p><strong>استفد من مساحات العمل متعدّدة الجذور لإبقاء المستودعات معزولة مع إدارتها في نافذة واحدة، مما يقلّل التنقّل بين نُسخ VS Code المختلفة.</strong></p>
</blockquote>
<h2 id="إعدادات-المهام-والتنقيح-المدمجة">إعدادات المهام والتنقيح المدمجة</h2>
<p>تتيح لك مساحات العمل متعدّدة الجذور تعريف مهام وإعدادات تنقيح تمتدّ عبر مجلدات متعدّدة. وفي ملف <code>.code-workspace</code>، يمكنك تحديد مهام تشغّل أوامر في مجلد معيّن أو تُفعّل حتى مهام مركّبة عبر مشاريع مختلفة. وعلى نحو مماثل، يمكن أن تساعد إعدادات التشغيل على مستوى مساحة العمل في تنقيح التفاعلات بين الخدمات، مثل تطبيق للواجهة الأمامية يتّصل بواجهة برمجية للجهة الخلفية.</p>
<blockquote>
<p><strong>استخدم الإعدادات المركّبة في <code>launch.json</code> لبدء خدمات متعدّدة في آنٍ واحد، بما يضمن تجربة تنقيح متماسكة عبر مشروعك كاملًا.</strong></p>
</blockquote>
`,l={book:s,chapter:n,chapterTitle:a,slug:t,title:o,headings:p,html:c};export{s as book,n as chapter,a as chapterTitle,l as default,p as headings,c as html,t as slug,o as title};
