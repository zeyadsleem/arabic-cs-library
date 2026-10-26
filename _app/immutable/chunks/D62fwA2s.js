const s="kinney",n="ai-development",a="التطوير بأدوات الذكاء الاصطناعي",t="claude-code-hook-examples",p="كتاب وصفات الخطّافات",c=[{depth:2,id:"احجب-تعديلات-الملفات-المولدة",text:"احجب تعديلات الملفات المولَّدة"},{depth:2,id:"حذر-من-أوامر-bash-الخطيرة",text:"حذّر من أوامر Bash الخطيرة"},{depth:2,id:"حافظ-على-حالة-الضغط",text:"حافظ على حالة الضغط"},{depth:2,id:"دقق-الوكلاء-الفرعيين-العاملين-في-الخلفية",text:"دقّق الوكلاء الفرعيين العاملين في الخلفية"}],o=`<p>ينبغي أن تكون الخطّافات صغيرة بما يكفي لتشرحها في جملة واحدة. والأمثلة هنا أنماط، لا سياسة إنتاج جاهزة للنسخ واللصق.</p>
<h2 id="احجب-تعديلات-الملفات-المولدة">احجب تعديلات الملفات المولَّدة</h2>
<p>استخدم خطّافًا قبل الأداة لرفض التعديلات تحت دليل مولَّد:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;hooks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;PreToolUse&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;matcher&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Edit|Write|MultiEdit&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;hooks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
          <span class="hljs-punctuation">{</span>
            <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;command&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;bun scripts/deny-generated-edits.ts&quot;</span>
          <span class="hljs-punctuation">}</span>
        <span class="hljs-punctuation">]</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>ينبغي أن يفحص السكربت مدخل الخطّاف ويعيد رفضًا واضحًا عندما يكون الملف مولَّدًا. أبقِ سياسة المسار في السكربت كي يمكن اختبارها.</p>
<h2 id="حذر-من-أوامر-bash-الخطيرة">حذّر من أوامر Bash الخطيرة</h2>
<p>استخدم خطّاف صلاحيات أو خطّافًا قبل الأداة لاشتراط الموافقة على الأوامر التي تنشر أو تحذف أو تدفع بالقوة أو تطبع الأسرار. وينبغي أن يحجب الخطّاف الأمر ويخبر المستخدم بالسبب بدقة.</p>
<pre><code>Denied: command matches a production deployment pattern. Ask the user for
explicit approval with the exact command.
</code></pre>
<h2 id="حافظ-على-حالة-الضغط">حافظ على حالة الضغط</h2>
<p>يستطيع خطّاف ما قبل الضغط أن يكتب ملف حالة قصيرًا:</p>
<pre><code>goal, changed files, completed checks, remaining checks, blockers
</code></pre>
<p>لا تستخدم هذا كمخزن الحالة الوحيد. فهو شبكة أمان للجلسات الطويلة.</p>
<h2 id="دقق-الوكلاء-الفرعيين-العاملين-في-الخلفية">دقّق الوكلاء الفرعيين العاملين في الخلفية</h2>
<p>يستطيع خطّاف توقف الوكيل الفرعي أن يسجّل اسم الوكيل الفرعي والأدوات المستخدمة والملخّص المُعاد. وهذا مفيد عندما يؤثر عمل في الخلفية على تنفيذ رئيسي.</p>
<p>أبقِ سجلات التدقيق محلية إلا إذا اتفق الفريق على الاحتفاظ والخصوصية.</p>
`,l={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:c,html:o};export{s as book,n as chapter,a as chapterTitle,l as default,c as headings,o as html,t as slug,p as title};
