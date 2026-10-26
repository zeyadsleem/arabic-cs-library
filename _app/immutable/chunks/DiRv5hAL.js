const e="kinney",n="ai-development",s="التطوير بأدوات الذكاء الاصطناعي",t="cursor-cli",a="واجهة سطر أوامر Cursor",p=[{depth:2,id:"الجلسات-التفاعلية",text:"الجلسات التفاعلية"},{depth:2,id:"وضع-الطباعة",text:"وضع الطباعة"},{depth:2,id:"نمط-الأتمتة",text:"نمط الأتمتة"},{depth:2,id:"الصلاحيات-المحلية-تبقى-مهمة",text:"الصلاحيات المحلية تبقى مهمة"}],o=`<p>تستخدم <a href="https://cursor.com/docs/cli/overview">واجهة سطر أوامر Cursor</a> الأمر <code>agent</code>. وهي مفيدة عندما تنتمي المهمة إلى الطرفية أو عندما تريد سطح وكيل قابلًا للبرمجة النصية.</p>
<h2 id="الجلسات-التفاعلية">الجلسات التفاعلية</h2>
<p>شغّل <code>agent</code> داخل مستودع:</p>
<pre><code class="language-bash">agent
</code></pre>
<p>تدعم واجهة الطرفية أوضاع Agent و Plan و Ask. وتستطيع استئناف الجلسات، ومتابعة أحدث جلسة، وتسليم العمل إلى السحابة عندما تسبق طلب الوكيل بـ <code>&amp;</code>:</p>
<pre><code class="language-bash">&amp; refactor the auth module
</code></pre>
<p>من أوامر الجلسة المفيدة:</p>
<pre><code class="language-bash">agent <span class="hljs-built_in">ls</span>
agent resume
agent --<span class="hljs-built_in">continue</span>
</code></pre>
<h2 id="وضع-الطباعة">وضع الطباعة</h2>
<p>يشغّل <a href="https://cursor.com/docs/cli/headless">وضع الطباعة</a> طلبًا ثم يخرج:</p>
<pre><code class="language-bash">agent -p <span class="hljs-string">&quot;Summarize the staged diff and list test gaps.&quot;</span>
</code></pre>
<p>بشكل افتراضي، وضع الطباعة هو الأكثر أمانًا للعمل للقراءة فقط. وإذا سمحت بتعديل الملفات، فافعل ذلك صراحةً بالأعلام الموثّقة وداخل شجرة عمل نظيفة فقط.</p>
<h2 id="نمط-الأتمتة">نمط الأتمتة</h2>
<p>استخدم وضع الطباعة لفحوص ضيقة:</p>
<pre><code class="language-bash">agent -p <span class="hljs-string">&quot;Review this diff for missing tests. Output only findings with file paths.&quot;</span>
</code></pre>
<p>لا تبنِ أنظمة إصدار خفية من طلبات الوكيل. وإذا وجب أن تعمل خطوة دائمًا، فضعها في سكربت أو تكامل مستمر. واستخدم الوكيل للاستدلال على النتيجة.</p>
<h2 id="الصلاحيات-المحلية-تبقى-مهمة">الصلاحيات المحلية تبقى مهمة</h2>
<p>تستطيع واجهة سطر الأوامر تشغيل أوامر الصدفة وتعديل الملفات. وتنطبق قواعد الموافقة نفسها كما في المحرّر: اعرف ما يُسمح للوكيل بفعله، وراجع الفرق، وشغّل أمر التحقق بنفسك قبل الشحن.</p>
`,c={book:e,chapter:n,chapterTitle:s,slug:t,title:a,headings:p,html:o};export{e as book,n as chapter,s as chapterTitle,c as default,p as headings,o as html,t as slug,a as title};
