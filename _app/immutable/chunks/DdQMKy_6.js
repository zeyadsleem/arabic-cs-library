const e="kinney",o="ai-development",d="التطوير بأدوات الذكاء الاصطناعي",n="claude-code-model-selection",c="اختيار النموذج",t=[{depth:2,id:"أسماء-مستعارة-مفيدة",text:"أسماء مستعارة مفيدة"},{depth:2,id:"الإعدادات-الافتراضية",text:"الإعدادات الافتراضية"},{depth:2,id:"خطة-opus",text:"خطة Opus"},{depth:2,id:"الجهد-والسياق",text:"الجهد والسياق"},{depth:2,id:"سلاسل-الاحتياط",text:"سلاسل الاحتياط"}],l=`<p>تتغيّر <a href="https://code.claude.com/docs/en/model-config">تهيئة نموذج Claude Code</a> بسرعة. واعتبارًا من 23 يونيو 2026، الفكرة الدائمة المهمة هي استخدام الأسماء المستعارة وشكل المهمة بدلًا من ترميز معرّفات النماذج الدقيقة في كل مكان.</p>
<h2 id="أسماء-مستعارة-مفيدة">أسماء مستعارة مفيدة</h2>
<p>يدعم Claude Code أسماء مستعارة مثل:</p>
<ul>
<li><code>default</code></li>
<li><code>best</code></li>
<li><code>fable</code></li>
<li><code>sonnet</code></li>
<li><code>opus</code></li>
<li><code>haiku</code></li>
<li><code>sonnet[1m]</code></li>
<li><code>opus[1m]</code></li>
<li><code>opusplan</code></li>
</ul>
<p>وكما في التوثيق الحالي، يُقابل <code>opus</code> النموذج <a href="https://code.claude.com/docs/en/model-config">Opus 4.8</a> على واجهة Anthropic API، بينما قد يحلّ Claude Platform on AWS و<a href="https://aws.amazon.com/bedrock/">Amazon Bedrock</a> و<a href="https://cloud.google.com/vertex-ai">Google Vertex AI</a> و<a href="https://azure.microsoft.com/products/ai-foundry/">Microsoft Foundry</a> الاسم المستعار نفسه بطريقة مختلفة. ويُقابل <code>sonnet</code> النموذج <a href="https://code.claude.com/docs/en/model-config">Sonnet 4.6</a> على واجهة Anthropic API و Claude Platform on AWS، ويتاح <a href="https://code.claude.com/docs/en/model-config">Fable 5</a> للاستخدام الصريح عندما يسمح الحساب وسياسة الاحتفاظ بذلك. تحقّق من توجيه النماذج الخاص بكل مزوّد قبل وضع قاعدة على مستوى الفريق.</p>
<h2 id="الإعدادات-الافتراضية">الإعدادات الافتراضية</h2>
<p>تختلف إعدادات Claude Code الافتراضية حسب نوع الحساب والمزوّد. وهذا يعني أن «استخدم النموذج الافتراضي» سير عمل شخصي معقول لكنه ادّعاء ضعيف بقابلية إعادة الإنتاج. ولسير عمل الفريق، حدّد الاسم المستعار وأرّخ الإرشاد.</p>
<pre><code>As of 2026-06-23, use \`sonnet\` for routine implementation and \`opusplan\` for
planning complex changes before execution.
</code></pre>
<h2 id="خطة-opus">خطة Opus</h2>
<p>يستخدم <code>opusplan</code> نموذج Opus للتخطيط و Sonnet للتنفيذ. وهو مناسب عندما يكون الجزء الصعب هو التصميم لا كتابة الشيفرة. اطلب الخطة أولًا وراجعها قبل السماح بتعديلات واسعة.</p>
<h2 id="الجهد-والسياق">الجهد والسياق</h2>
<p>يدعم Claude Code أيضًا ضوابط الجهد مثل <code>/effort</code> والأسماء المستعارة ذات السياق الكبير مثل <code>sonnet[1m]</code> و<code>opus[1m]</code>. والسياق الأكبر ليس أفضل تلقائيًا. فهو مفيد عندما تعتمد المهمة على ملفات كثيرة أو سجلات طويلة أو مخرجات مولَّدة. وهو إسراف عندما يحدّد اختبار مركّز وملفَّا مصدر الإجابة.</p>
<h2 id="سلاسل-الاحتياط">سلاسل الاحتياط</h2>
<p>استخدم نماذج احتياطية من أجل الموثوقية:</p>
<pre><code class="language-bash">claude --model opus --fallback-model sonnet
</code></pre>
<p>الاحتياطات سياسة تشغيلية. وينبغي أن تحافظ على نية المهمة، لا أن تخفّض مراجعة أمنية بصمت إلى إعادة كتابة رخيصة.</p>
`,a={book:e,chapter:o,chapterTitle:d,slug:n,title:c,headings:t,html:l};export{e as book,o as chapter,d as chapterTitle,a as default,t as headings,l as html,n as slug,c as title};
