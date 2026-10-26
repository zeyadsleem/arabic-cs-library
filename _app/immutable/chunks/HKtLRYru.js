const s="kinney",n="visual-studio-code",a="Visual Studio Code",t="setting-up-dev-containers",e="تهيئة حاويات التطوير",o=[{depth:2,id:"النتيجة-النهائية",text:"النتيجة النهائية"},{depth:2,id:"تخصيص-التعريفات-الجاهزة",text:"تخصيص التعريفات الجاهزة"}],p=`<p><img src="/arabic-cs-library/images/kinney/75da7687ea1671cb.webp" alt="تهيئة حاويات التطوير"></p>
<p>يوفّر Visual Studio Code والمجتمع مجموعة غنية من تعريفات حاويات التطوير الجاهزة. وهي مفيدة للغاية للإعداد السريع لبيئات تطوير شائعة دون كتابة <code>devcontainer.json</code> من الصفر.</p>
<p><strong>الوصول إلى التعريفات الجاهزة:</strong></p>
<ol>
<li><strong>عند إنشاء حاوية تطوير:</strong> عندما تستخدم الأمر “Dev Containers: Add Dev Container Configuration Files…“، سيعرض عليك Visual Studio Code قائمة من التعريفات المعرّفة مسبقًا. ويُجلب ذلك من <a href="https://www.google.com/url?sa=E&amp;source=gmail&amp;q=https://github.com/devcontainers/templates&amp;authuser=1">مستودع vscode-dev-containers على GitHub</a>.</li>
<li><strong>وثائق إضافة Visual Studio Code Dev Containers:</strong> توفّر وثائق إضافة “Remote - Containers” أيضًا روابط إلى قوائم منسّقة من التعريفات الجاهزة.</li>
</ol>
<p>ويمكنك البدء بـ<strong>Add Dev Container Configuration Files</strong> من مركز الأوامر.</p>
<p>واجهة Visual Studio Code تعرض موضع أمر Dev Containers. بعد ذلك، اختر الحاوية التي تريد استخدامها.</p>
<p><img src="/arabic-cs-library/images/kinney/0ba8e3ca93e05f43.webp" alt="نافذة حوارية لاختيار إعداد حاوية جاهز"></p>
<p>في حال صورة <strong>Node.js &amp; TypeScript</strong>، سيُسألك عن إصدار Node الذي تريد استخدامه.</p>
<p><img src="/arabic-cs-library/images/kinney/3e25a5bbebec65af.webp" alt="نافذة حوارية لاختيار إصدار Node.js للحاوية"></p>
<p>بعد أن تختار حاويتك، يمكنك أيضًا انتقاء بعض البرمجيات الإضافية التي تريد ضمّها.</p>
<p><img src="/arabic-cs-library/images/kinney/97b1d1101062b295.webp" alt="نافذة حوارية لاختيار ميزات إضافية لحاوية التطوير"></p>
<p>ويمكنك تصفية هذه القائمة للعثور على ما تبحث عنه.</p>
<p><img src="/arabic-cs-library/images/kinney/065f0e4697e08a55.webp" alt="قائمة مصفّاة بميزات حاويات التطوير"></p>
<p>وأخيرًا، يمكنك إضافة بعض الملفات الإضافية.</p>
<p><img src="/arabic-cs-library/images/kinney/92dfff9ebad73dd7.webp" alt="نافذة حوارية لاختيار ملفات إعدادات اختيارية"></p>
<h2 id="النتيجة-النهائية">النتيجة النهائية</h2>
<p>في النهاية، ينبغي أن ترى شيئًا مثل هذا.</p>
<pre><code class="language-json"><span class="hljs-comment">// For format details, see https://aka.ms/devcontainer.json. For config options, see the</span>
<span class="hljs-comment">// README at: https://github.com/devcontainers/templates/tree/main/src/typescript-node</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Node.js &amp; TypeScript&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-comment">// Or use a Dockerfile or Docker Compose file. More info: https://containers.dev/guide/dockerfile</span>
  <span class="hljs-attr">&quot;image&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm&quot;</span>

  <span class="hljs-comment">// Features to add to the dev container. More info: https://containers.dev/features.</span>
  <span class="hljs-comment">// &quot;features&quot;: {},</span>

  <span class="hljs-comment">// Use &#x27;forwardPorts&#x27; to make a list of ports inside the container available locally.</span>
  <span class="hljs-comment">// &quot;forwardPorts&quot;: [],</span>

  <span class="hljs-comment">// Use &#x27;postCreateCommand&#x27; to run commands after the container is created.</span>
  <span class="hljs-comment">// &quot;postCreateCommand&quot;: &quot;yarn install&quot;,</span>

  <span class="hljs-comment">// Configure tool-specific properties.</span>
  <span class="hljs-comment">// &quot;customizations&quot;: {},</span>

  <span class="hljs-comment">// Uncomment to connect as root instead. More info: https://aka.ms/dev-containers-non-root.</span>
  <span class="hljs-comment">// &quot;remoteUser&quot;: &quot;root&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="تخصيص-التعريفات-الجاهزة">تخصيص التعريفات الجاهزة</h2>
<p>التعريفات الجاهزة نقاط انطلاق ممتازة. ويمكنك تخصيصها أكثر بسهولة عبر تعديل ملف <code>devcontainer.json</code> المُولَّد. فيمكنك إضافة مزيد من الإضافات، وتخصيص الإعدادات، وتحويل المنافذ (forward ports)، وإضافة <code>postCreateCommand</code>، وغير ذلك، لتفصيل البيئة الجاهزة على مقاس احتياجات مشروعك تحديدًا.</p>
`,i={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:o,html:p};export{s as book,n as chapter,a as chapterTitle,i as default,o as headings,p as html,t as slug,e as title};
