const e="kinney",n="ai-development",t="التطوير بأدوات الذكاء الاصطناعي",o="claude-code-plan-mode",p="وضع الخطة",l=[{depth:2,id:"ما-ينبغي-أن-ينتجه-وضع-الخطة",text:"ما ينبغي أن ينتجه وضع الخطة"},{depth:2,id:"الموافقة-على-الخطة",text:"الموافقة على الخطة"},{depth:2,id:"وضع-الخطة-مقابل-خطة-opus",text:"وضع الخطة مقابل خطة Opus"}],d=`<p>وضع الخطة في <a href="https://code.claude.com/docs/en/permissions">Claude Code</a> هو حدّ صلاحيات. فهو يتيح لـ Claude الفحص والاستدلال دون تعديل الملفات فورًا.</p>
<p>استخدمه عندما تكون المهمة غير واضحة أو محفوفة بالمخاطر أو واسعة.</p>
<h2 id="ما-ينبغي-أن-ينتجه-وضع-الخطة">ما ينبغي أن ينتجه وضع الخطة</h2>
<p>تتضمن الخطة المفيدة:</p>
<ul>
<li>الملفات التي فحصها Claude.</li>
<li>خيارات التنفيذ.</li>
<li>المسار المختار وسبب كونه الأصغر.</li>
<li>الملفات المتوقع تغيّرها.</li>
<li>أوامر التحقق.</li>
<li>شروط التوقف.</li>
</ul>
<p>الطلب:</p>
<pre><code>Enter plan mode. Research the smallest safe way to add refresh-token rotation.
Compare at most two implementation paths. Do not edit files.
</code></pre>
<h2 id="الموافقة-على-الخطة">الموافقة على الخطة</h2>
<p>قبل الانتقال من التخطيط إلى التنفيذ، تحقّق من قائمة الملفات وأمر التحقق. وإذا كان أحدهما مفقودًا، فالخطة غير جاهزة.</p>
<p>تسليم جيد:</p>
<pre><code>Implement option B only. Write the regression test first. Run the targeted test
and bun run lint. Stop on unrelated failures.
</code></pre>
<h2 id="وضع-الخطة-مقابل-خطة-opus">وضع الخطة مقابل خطة Opus</h2>
<p>يتحكم وضع الخطة بالصلاحيات. أما <code>opusplan</code> فيتحكم بتوجيه النموذج. وهما يجتمعان جيدًا للمهام المعقّدة، لكنهما يحلّان مشكلتين مختلفتين. فوضع الخطة يقول «لا تعدّل بعد». و<code>opusplan</code> يقول «استخدم نموذجًا أقوى للتخطيط».</p>
`,i={book:e,chapter:n,chapterTitle:t,slug:o,title:p,headings:l,html:d};export{e as book,n as chapter,t as chapterTitle,i as default,l as headings,d as html,o as slug,p as title};
