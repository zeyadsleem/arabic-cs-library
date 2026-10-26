const e="kinney",t="ai-development",n="التطوير بأدوات الذكاء الاصطناعي",o="claude-code-thinking",p="تشجيع التفكير",d=[{depth:2,id:"استخدم-وضع-الخطة-للقرارات-الحقيقية",text:"استخدم وضع الخطة للقرارات الحقيقية"},{depth:2,id:"استخدم-ضوابط-الجهد",text:"استخدم ضوابط الجهد"},{depth:2,id:"استخدم-تخطيط-opus-عن-قصد",text:"استخدم تخطيط Opus عن قصد"},{depth:2,id:"اطرح-أسئلة-مقايضة-أفضل",text:"اطرح أسئلة مقايضة أفضل"}],a=`<p>الهدف ليس أن «يفكّر <a href="https://code.claude.com/docs/en/overview">Claude Code</a> أعمق» بشكل مجرّد. الهدف أن يُظهر الاستدلال الذي يؤثر في الإجراء التالي.</p>
<h2 id="استخدم-وضع-الخطة-للقرارات-الحقيقية">استخدم وضع الخطة للقرارات الحقيقية</h2>
<p>عندما يكون للمهمة عدة تصاميم معقولة، ابدأ في وضع الخطة:</p>
<pre><code>Plan the smallest change that adds account-level rate limits.
Compare middleware and service-layer implementations. Name the files each path
would touch. Do not edit files.
</code></pre>
<p>يدفع هذا الطلب القرار إلى العلن قبل بدء التعديلات.</p>
<h2 id="استخدم-ضوابط-الجهد">استخدم ضوابط الجهد</h2>
<p>يدعم Claude Code ضوابط الجهد مثل <code>/effort</code>. ارفع الجهد عندما تكون للمهمة كلفة استدلال عالية: المعمارية، أو الأمان، أو تخطيط الترحيل، أو المراجعة. واخفض الجهد للتعديلات الروتينية حيث تكون الكمون أهم من التحليل العميق.</p>
<p>الجهد ليس بديلًا عن السياق. فالنموذج عالي الجهد مع الملفات الخاطئة سيحلّ المشكلة الخاطئة رغم ذلك.</p>
<h2 id="استخدم-تخطيط-opus-عن-قصد">استخدم تخطيط Opus عن قصد</h2>
<p>يستخدم الاسم المستعار <code>opusplan</code> نموذج Opus للتخطيط و Sonnet للتنفيذ. وهو إعداد افتراضي مفيد للتغييرات الأكبر لأنه يصرف الاستدلال المكلف حيث يهمّ أكثر.</p>
<p>راجع الخطة قبل التنفيذ:</p>
<pre><code>Use opusplan. Produce the plan first and wait for approval before editing.
</code></pre>
<h2 id="اطرح-أسئلة-مقايضة-أفضل">اطرح أسئلة مقايضة أفضل</h2>
<p>ضعيف:</p>
<pre><code>Think carefully and make this better.
</code></pre>
<p>أفضل:</p>
<pre><code>List the two smallest implementation paths, the failure modes of each, and the
verification command that would prove the chosen path works.
</code></pre>
<p>الطلب الثاني يمنح التفكير مهمة.</p>
`,i={book:e,chapter:t,chapterTitle:n,slug:o,title:p,headings:d,html:a};export{e as book,t as chapter,n as chapterTitle,i as default,d as headings,a as html,o as slug,p as title};
