const s="kinney",n="testing",e="مدخل إلى الاختبارات",t="mocking-the-file-system",a="محاكاة قراءة الملفات وكتابتها",l=[{depth:2,id:"تهيئة-المشهد",text:"تهيئة المشهد"},{depth:2,id:"محاكاة-نظام-الملفات-باستخدام-vitest",text:"محاكاة نظام الملفات باستخدام Vitest"},{depth:3,id:"كتابة-الاختبار",text:"كتابة الاختبار"},{depth:3,id:"تفكيك-الأمر",text:"تفكيك الأمر"},{depth:3,id:"تشغيل-الاختبار",text:"تشغيل الاختبار"},{depth:2,id:"المزالق-الشائعة",text:"المزالق الشائعة"},{depth:2,id:"أفكار-ختامية",text:"أفكار ختامية"}],p=`<p>عادةً، عندما تختبر شيئًا مثل عمليات الملفات، فإنك لا تريد فعليًا أن تعبث اختباراتك بنظام ملفاتك. لا نريد لاختبار وحدة شارد أن يغيّر الملف الذي يحوي تفضيلات غداء زملائك في العمل، أو، حاشا لله، أن يحذفه بالكامل. هنا تأتي المحاكاة. فبالمحاكاة يمكننا أن <em>نتظاهر</em> فقط بأننا نقرأ الملفات ونكتبها. يجعل Vitest وأدوات حديثة مثل <code>fs/promises</code> هذا الأمر بالغ البساطة. فلنغص في التفاصيل.</p>
<h2 id="تهيئة-المشهد">تهيئة المشهد</h2>
<p>لنفترض أن لديك هذه الوحدة الصغيرة الفاخرة التي تقرأ من ملف، وتعدّل البيانات، ثم تكتبها مرة أخرى. شيء <em>واقعي</em> حقًا مثل هذا:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// fileOperations.js</span>
<span class="hljs-keyword">import</span> { readFile, writeFile } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;fs/promises&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">processFile</span>(<span class="hljs-params">filePath, content</span>) {
  <span class="hljs-keyword">const</span> existingContent = <span class="hljs-keyword">await</span> <span class="hljs-title function_">readFile</span>(filePath, <span class="hljs-string">&#x27;utf-8&#x27;</span>);
  <span class="hljs-keyword">const</span> updatedContent = <span class="hljs-string">\`<span class="hljs-subst">\${existingContent}</span>\\n<span class="hljs-subst">\${content}</span>\`</span>;
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">writeFile</span>(filePath, updatedContent);
  <span class="hljs-keyword">return</span> updatedContent;
}
</code></pre>
<p>الحلم هنا أن تمرّر مسار ملف وبعض المحتوى الجديد، فيُلحق ذلك المحتوى بما في الملف. أمر معتاد تمامًا. لكن من أجل اختباراتنا، لا نريد أن نقرأ أو نكتب ملفات فعليًا.</p>
<h2 id="محاكاة-نظام-الملفات-باستخدام-vitest">محاكاة نظام الملفات باستخدام Vitest</h2>
<p>يمكننا محاكاة <code>fs/promises</code> باستخدام دالة <code>vi.mock()</code> في Vitest. يتيح لنا ذلك <em>اعتراض</em> تلك النداءات إلى <code>readFile</code> و<code>writeFile</code> وإعادة قيم محددة نريدها.</p>
<h3 id="كتابة-الاختبار">كتابة الاختبار</h3>
<p>لنكتب الاختبارات أولًا، مع محاكاة نداءات نظام الملفات تلك كي لا نُدمّر أي ملفات حقيقية.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { processFile } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./fileOperations&#x27;</span>;
<span class="hljs-keyword">import</span> { readFile, writeFile } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;fs/promises&#x27;</span>;
<span class="hljs-keyword">import</span> { describe, it, expect, vi } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;

vi.<span class="hljs-title function_">mock</span>(<span class="hljs-string">&#x27;fs/promises&#x27;</span>); <span class="hljs-comment">// this magic line mocks the whole module</span>

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;processFile&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should read content, append new content, and write it back&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Arrange: Set up mock behavior</span>
    <span class="hljs-keyword">const</span> mockFilePath = <span class="hljs-string">&#x27;mockFile.txt&#x27;</span>;
    <span class="hljs-keyword">const</span> mockExistingContent = <span class="hljs-string">&#x27;Hello World&#x27;</span>;
    <span class="hljs-keyword">const</span> mockNewContent = <span class="hljs-string">&#x27;Vitest is awesome&#x27;</span>;

    <span class="hljs-comment">// Mock &#x27;readFile&#x27; to return some existing content</span>
    readFile.<span class="hljs-title function_">mockResolvedValue</span>(mockExistingContent);

    <span class="hljs-comment">// Act: Call the function we&#x27;re testing</span>
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">processFile</span>(mockFilePath, mockNewContent);

    <span class="hljs-comment">// Assert: Did the magic happen?</span>
    <span class="hljs-title function_">expect</span>(readFile).<span class="hljs-title function_">toHaveBeenCalledWith</span>(mockFilePath, <span class="hljs-string">&#x27;utf-8&#x27;</span>);
    <span class="hljs-title function_">expect</span>(writeFile).<span class="hljs-title function_">toHaveBeenCalledWith</span>(
      mockFilePath,
      <span class="hljs-string">\`<span class="hljs-subst">\${mockExistingContent}</span>\\n<span class="hljs-subst">\${mockNewContent}</span>\`</span>,
    );
    <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">\`<span class="hljs-subst">\${mockExistingContent}</span>\\n<span class="hljs-subst">\${mockNewContent}</span>\`</span>);
  });
});
</code></pre>
<h3 id="تفكيك-الأمر">تفكيك الأمر</h3>
<h4>البديل المُحاكى</h4>
<p><code>vi.mock('fs/promises')</code> يقول أساسًا: «مرحبًا Vitest، لا تحاول حتى التفاعل مع نظام الملفات الحقيقي، حاكِ فقط كل شيء في هذه الوحدة.»</p>
<h4>محاكاة <code>readFile</code></h4>
<p>نريد أن نحاكي قراءة الملف دون القيام بذلك فعليًا. تقول <code>readFile.mockResolvedValue(mockExistingContent)</code> لـ Vitest: «كلما نادى أحدهم <code>readFile</code>، بدلًا من الوصول إلى القرص، أعطه هذا المحتوى المُحاكى فقط.»</p>
<h4>التحقق من <code>writeFile</code></h4>
<p>بعد إلحاق المحتوى، ستحتاج إلى التحقق من أنه ينادي <code>writeFile</code> بشكل صحيح. فعبارة <code>expect(writeFile).toHaveBeenCalledWith(mockFilePath, expectedContent)</code> تؤكد أنه يكتب ما تتوقعه.</p>
<h3 id="تشغيل-الاختبار">تشغيل الاختبار</h3>
<p>بافتراض أن Vitest معدّ بالكامل، يمكنك إطلاق الاختبار بتشغيل:</p>
<pre><code class="language-bash">npx vitest
</code></pre>
<p>وإن كان كل شيء موصولًا بشكل صحيح، فسينجح! 🎉</p>
<h2 id="المزالق-الشائعة">المزالق الشائعة</h2>
<ol>
<li><strong>نسيان محاكاة الشيء الصحيح:</strong> تقع واجهة نظام الملفات تحت أسماء مختلفة (<code>fs</code>، <code>fs/promises</code>). تأكد من أنك تحاكي الاسم الصحيح! تفضّل شيفرة Node.js الأحدث <code>fs/promises</code>، ولهذا نحاكيه.</li>
<li><strong>البدائل المُحاكاة التي تُعيد undefined:</strong> إن نسيت <code>mockResolvedValue</code>، فسيُعيد Vitest القيمة <code>undefined</code> افتراضيًا. لذا إن كنت تتساءل لماذا يُطلق اختبارك <code>undefined is not a function</code>، فافحص تلك البدائل المُحاكاة!</li>
</ol>
<h2 id="أفكار-ختامية">أفكار ختامية</h2>
<p>قد تكون محاكاة قراءة الملفات وكتابتها مخيفة قليلًا في البداية، لكن بمجرد أن تتقنها، ستصبح اختباراتك أنظف وأسرع وأقل احتمالًا لمحو ملفات ثمينة لأحدهم (ملفاتك أنت مثلًا).</p>
`,c={book:s,chapter:n,chapterTitle:e,slug:t,title:a,headings:l,html:p};export{s as book,n as chapter,e as chapterTitle,c as default,l as headings,p as html,t as slug,a as title};
