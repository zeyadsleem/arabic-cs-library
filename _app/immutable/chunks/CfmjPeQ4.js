const n="kinney",e="python-ai",g="أساسيات الذكاء الاصطناعي بلغة Python",c="installing-hugging-face",o="تثبيت Hugging Face",t=[{depth:2,id:"تسجيل-الدخول",text:"تسجيل الدخول"}],a=`<blockquote>
<p><strong>على الأرجح لن تحتاج إلى القيام بذلك.</strong></p>
<p>لكن، تحسّبًا لذلك—إليك بعض التعليمات.</p>
</blockquote>
<p>لتثبيت واجهة سطر الأوامر (CLI) الخاصة بـ Hugging Face، ستحتاج أساسًا إلى <strong>تثبيت مكتبة <code>huggingface_hub</code></strong>. وينبغي أن تثبّت مكتبة <code>huggingface_hub</code> باستخدام <code>pip</code>، مدير حزم Python.</p>
<p>ويُعدّ هذا «أول الأمور وأهمّها» التي ينبغي القيام بها.</p>
<pre><code class="language-bash">pip install huggingface_hub
</code></pre>
<p>بدلًا من ذلك، يمكنك استخدام العلم <code>-U</code> لضمان الحصول على نسخة محدّثة أو أحدث إصدار من الحزمة:</p>
<pre><code class="language-bash">pip install -U huggingface_hub
</code></pre>
<p>بمجرد تثبيت <code>huggingface_hub</code>، يمكنك استخدام أوامر واجهة سطر الأوامر مثل <code>hugging face CLI login</code> للتفاعل مع Hugging Face Hub من الطرفية.</p>
<h2 id="تسجيل-الدخول">تسجيل الدخول</h2>
<p>بعد تثبيت واجهة سطر الأوامر، ستحتاج إلى <a href="https://huggingface.co/settings/tokens">رمز وصول</a>. ثم يمكنك تشغيل واجهة سطر الأوامر لتسجيل الدخول.</p>
<pre><code class="language-bash">huggingface-cli login
</code></pre>
<p>الصق رمز الوصول الخاص بك وستكون جاهزًا.</p>
`,p={book:n,chapter:e,chapterTitle:g,slug:c,title:o,headings:t,html:a};export{n as book,e as chapter,g as chapterTitle,p as default,t as headings,a as html,c as slug,o as title};
