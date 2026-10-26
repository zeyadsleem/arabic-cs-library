const s="kinney",n="self-testing-ai-agents",a="وكلاء ذكاء اصطناعي يختبرون أنفسهم",t="failure-dossiers-what-agents-actually-need-from-a-red-build",p="ملفّات الفشل: ما يحتاجه الوكلاء فعلًا من بناء أحمر",l=[{depth:2,id:"ما-الذي-يحتويه-ملف-الفشل",text:"ما الذي يحتويه ملف الفشل"},{depth:2,id:"تفعيل-التتبعات-ولقطات-الشاشة-والفيديوهات",text:"تفعيل التتبّعات ولقطات الشاشة والفيديوهات"},{depth:2,id:"تقرير-html-هو-الباب-الأمامي-لملف-الفشل",text:"تقرير HTML هو الباب الأمامي لملف الفشل"},{depth:2,id:"جعل-ملفات-الفشل-قابلة-لقراءة-الوكيل",text:"جعل ملفات الفشل قابلة لقراءة الوكيل"},{depth:3,id:"كيف-يبدو-تقرير-playwright",text:"كيف يبدو تقرير Playwright"},{depth:3,id:"مقتطف-تمثيلي-من-dossiermd-لتشغيل-فاشل",text:"مقتطف تمثيلي من dossier.md لتشغيل فاشل"},{depth:2,id:"كيف-تسير-الحلقة",text:"كيف تسير الحلقة"},{depth:2,id:"التقاط-الطرفية-والشبكة",text:"التقاط الطرفية والشبكة"},{depth:2,id:"فخ-consolelog",text:"فخّ console.log"},{depth:2,id:"ما-يمنحك-ملف-الفشل-على-جانب-الوكيل",text:"ما يمنحك ملف الفشل على جانب الوكيل"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],e=`<p>هناك شيء كنت أتمنّى أن أفهمه قبل عام تقريبًا ممّا فعلت: <strong>حين يرى الوكيل فشل اختبار، فإن مخرجات الاختبار موجّه.</strong> هذا هو تحوّل الإطار كله. علامة X الحمراء على البناء ليست حالة — إنها التعليمة التالية التي سيتصرّف الوكيل بناءً عليها، وكل ما يتعلّق بعلامة X الحمراء سياق لتلك التعليمة.</p>
<p>وهذا يعني أن جودة مخرجات اختبارك تحدّد مدى قدرة الوكيل على إصلاح الأمور. فالفشل الذي يقول <code>expect(received).toBe(expected)</code> مع تتبّع مكدّس من سطرين موجّه سيئ. أما الفشل الذي يقول ما كان متوقّعًا، وما حدث فعلًا، وكيف بدت الصفحة، وما قالته الطرفية، وما فعلته الشبكة، وأين تنظر أولًا — فذلك موجّه جيد. وسيصلح الوكيل الثاني دون مساعدتك نحو ثلاثة أضعاف ما يصلح الأول.</p>
<p>هذا الدرس عن جعل حالات الفشل موجّهات جيدة. أسمّي الحزمة «ملف الفشل»، لأنني ميّال إلى الدراما. سمّها ما شئت. الفكرة واحدة.</p>
<h2 id="ما-الذي-يحتويه-ملف-الفشل">ما الذي يحتويه ملف الفشل</h2>
<p>أصغر ملف فشل صالح لاختبار Playwright فاشل:</p>
<ul>
<li><strong>اسم الاختبار ومسار الملف.</strong> بديهي، وغالبًا ما يغيب عن خطأ منسوخ ولصوق.</li>
<li><strong>التأكيد الذي فشل.</strong> ماذا توقّع الاختبار؟ وماذا حصل؟ الطرفان معًا، لا رسالة الفشل وحدها.</li>
<li><strong>لقطة شاشة للصفحة عند لحظة الفشل.</strong> يلتقطها Playwright لك إن طلبت منه ذلك.</li>
<li><strong>لقطة DOM كاملة عند لحظة الفشل.</strong> يتضمّنها ملف التتبّع في Playwright.</li>
<li><strong>سجلات الطرفية من المتصفّح أثناء تشغيل الاختبار.</strong> وهي أيضًا في التتبّع.</li>
<li><strong>طلبات الشبكة التي حدثت أثناء الاختبار.</strong> وهي أيضًا في التتبّع.</li>
<li><strong>أمر إعادة الإنتاج.</strong> لا «الاختبار فشل» — بل أمر shell الحرفي الذي يعزل هذا الاختبار.</li>
</ul>
<p>إن كان ملفك يحتوي كل هذه إضافةً إلى عنوان يقول «هذا ما فشل ولماذا»، فلدى الوكيل كل ما يحتاجه ليقترح إصلاحًا دون أن يسألك سؤالًا واحدًا.</p>
<p>الخبر الجيد: يلتقط Playwright معظم هذا لك سلفًا. كل ما عليك هو تفعيله وتوجيهه إلى مكان يستطيع الوكيل قراءته.</p>
<h2 id="تفعيل-التتبعات-ولقطات-الشاشة-والفيديوهات">تفعيل التتبّعات ولقطات الشاشة والفيديوهات</h2>
<p>في <code>playwright.config.ts</code>، استخدم <a href="https://playwright.dev/docs/api/class-testoptions#test-options-trace">خيارات تهيئة التتبّع</a>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">outputDir</span>: <span class="hljs-string">&#x27;playwright-report/test-results&#x27;</span>,
  <span class="hljs-attr">use</span>: {
    <span class="hljs-attr">trace</span>: <span class="hljs-string">&#x27;retain-on-failure&#x27;</span>,
    <span class="hljs-attr">screenshot</span>: <span class="hljs-string">&#x27;only-on-failure&#x27;</span>,
    <span class="hljs-attr">video</span>: <span class="hljs-string">&#x27;retain-on-failure&#x27;</span>,
  },
});
</code></pre>
<p>ثلاثة مقابض.</p>
<p><code>trace: 'retain-on-failure'</code> يخبر Playwright بتسجيل ملف تتبّع (<code>trace.zip</code>) لكل اختبار يفشل، والتخلّص منه لكل اختبار ينجح. ويتضمّن التتبّع لقطات DOM، ولقطات شاشة، وسجلات شبكة، وسجلات طرفية، وسجل إجراءات Playwright الكامل. وهو أكثر أثر كثيف المعلومات في المنظومة كلها. يمكنك فتحه بـ<code>npx playwright show-trace trace.zip</code> والحصول على خط زمني تفاعلي كامل للاختبار عبر <a href="https://playwright.dev/docs/trace-viewer">عارض التتبّع</a>.</p>
<p><code>screenshot: 'only-on-failure'</code> يكتب صورة PNG واحدة للصفحة في لحظة فشل التأكيد. هذه هي الصورة التي تطعمها للوكيل. إنها مكرّرة مع التتبّع لكنها أرخص وصولًا — ملف واحد يُفتح فورًا.</p>
<p><code>video: 'retain-on-failure'</code> يسجّل الاختبار كله فيديو. أستخدم هذا أقل ممّا توقّعت. فالفيديو لاختبار صعب على الوكيل استهلاكه (معظم الوكلاء لا يستطيعون مشاهدة الفيديو)، ونادرًا ما يكون أنفع للبشر من التتبّع. أُبقيه مفعّلًا لأنه مجاني، لكنني لن أفتقده لو لم يكن.</p>
<h2 id="تقرير-html-هو-الباب-الأمامي-لملف-الفشل">تقرير HTML هو الباب الأمامي لملف الفشل</h2>
<p><code>playwright.config.ts</code>:</p>
<pre><code class="language-typescript"><span class="hljs-attr">reporter</span>: [
  [<span class="hljs-string">&#x27;html&#x27;</span>, { <span class="hljs-attr">open</span>: <span class="hljs-string">&#x27;never&#x27;</span>, <span class="hljs-attr">outputFolder</span>: <span class="hljs-string">&#x27;playwright-report/html&#x27;</span> }],
  [<span class="hljs-string">&#x27;json&#x27;</span>, { <span class="hljs-attr">outputFile</span>: <span class="hljs-string">&#x27;playwright-report/report.json&#x27;</span> }],
  [<span class="hljs-string">&#x27;list&#x27;</span>],
],
</code></pre>
<p>يكتب مُبلِّغ HTML الملف <code>playwright-report/html/index.html</code>، ويعرض لكل اختبار فاشل التأكيد، ولقطة الشاشة، ومكدّس الخطأ، ورابطًا لفتح التتبّع. افتحه في متصفّح فتحصل على ملف فشل بديع وسهل القراءة بلا أي جهد.</p>
<blockquote>
<p><strong>أسهل طريقة لترى هذا يعمل</strong></p>
<p>إن أردت أن ترى خط أنابيب آثار Playwright من طرف إلى طرف دون أن تزرع علة مصطنعة في التطبيق، فانقل مؤقتًا أحد خطوط الأساس المُودَعة في المستودع للانحدار البصري وشغّل الاختبار البصري المطابق. ينتج عن ذلك <code>report.json</code>، ولقطة شاشة محفوظة، وفيديو محفوظ، وملف <code>trace.zip</code> تحت <code>playwright-report/test-results/</code> من فشل متعمّد واحد يمكنك التراجع عنه في التزام واحد. وحين تبني مُلخِّص ملف الفشل من المختبر المرافق، ينتج التشغيل نفسه أيضًا <code>playwright-report/dossier.md</code>.</p>
</blockquote>
<p><img src="/arabic-cs-library/images/kinney/da9e47276d7154c2.webp" alt="تقرير Playwright بصيغة HTML بعد فشل متعمّد في Shelf"></p>
<p>يمنع العلم <code>open: 'never'</code> Playwright من فتح تبويب متصفّح تلقائيًا عند تشغيل الاختبارات، وهو أمر مزعج في التكامل المستمر ومشتّت محليًا.</p>
<p>في Shelf، أسهل كسر متعمّد هو تعديل عنوان الصفحة الرئيسية في <code>src/routes/+page.svelte</code> — غيّر <code>Build a shelf that remembers what you actually read</code> إلى أي شيء آخر فيصبح <code>tests/smoke.spec.ts</code> أحمر عند تأكيده <code>getByRole('heading', { ... })</code>. إنه تغيير واجهة صاخب لا يمسّ المصادقة ولا البيانات المزروعة. شغّل المجموعة عبر <code>npm run test</code> حين تريد مجموعة آثار Playwright الحقيقية، وأبقِ البوابات الأساسية الأخرى في الحلقة أيضًا كي يظلّ المستودع صادقًا وأنت تكرّر على الفشل.</p>
<h2 id="جعل-ملفات-الفشل-قابلة-لقراءة-الوكيل">جعل ملفات الفشل قابلة لقراءة الوكيل</h2>
<p>هنا يصبح الدرس مثيرًا. تقرير HTML رائع للبشر. وهو <em>مقبول</em> للوكلاء. يستطيع الوكيل قراءة نظام الملفات، فيمكنه تقنيًا العثور على رسائل الخطأ. لكنه أفضل بكثير إن استطاع الوكيل أن يطلب «ملف الفشل الخاص بآخر اختبار فاشل» ويحصل على ملخّص منظّم.</p>
<p>يستحقّ مُلخِّص ملف الفشل أن يُكتب. إنه سكربت من نحو 50 سطرًا يقوم بما يلي:</p>
<ol>
<li>يقرأ <code>playwright-report/report.json</code> بعد تشغيل الاختبارات.</li>
<li>يعثر على الاختبارات الفاشلة.</li>
<li>يستخرج لكل واحد منها رسالة الخطأ، ومسار لقطة الشاشة، والتتبّع المحفوظ، وأمر إعادة الإنتاج.</li>
<li>يكتب ملف <code>dossier.md</code> واحدًا يحتوي كل ذلك، مرتبطًا بالمرفقات.</li>
</ol>
<h3 id="كيف-يبدو-تقرير-playwright">كيف يبدو تقرير Playwright</h3>
<p>قبل أن نسير في التقرير، يساعد أن ترى الشكل الذي تسير فيه. يكتب مُبلِّغ JSON شجرة متداخلة: <code>suites</code> في الأعلى، ولكل منها <code>suites</code> و<code>specs</code> خاصة بها، ولكل <code>spec</code> اختبارات <code>tests</code>، ولكل <code>test</code> نتائج <code>results</code>، ولكل <code>result</code> فاشل <code>error</code> إضافة إلى <code>attachments</code>. والشكل المختصر أدناه <em>توضيحي</em> — فمواصفة <code>tests/rate-book.spec.ts</code> ومشروع Playwright المسمّى <code>authenticated</code> المشار إليهما في المثال طموحان: يُضافان في مختبرات لاحقة (التجهيزات، والمشاريع، والحالة الحتمية). أما مع المشروع الانطلاقي البسيط الحالي، فالسير نفسه يمرّ على <code>tests/smoke.spec.ts</code> مع <code>projectName</code> فارغ. البنية هي المقصد:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;suites&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;suites&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;specs&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
        <span class="hljs-punctuation">{</span>
          <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;user can rate Station Eleven&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;file&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;tests/rate-book.spec.ts&quot;</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;line&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">9</span><span class="hljs-punctuation">,</span>
          <span class="hljs-attr">&quot;tests&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-punctuation">{</span>
              <span class="hljs-attr">&quot;projectName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;authenticated&quot;</span><span class="hljs-punctuation">,</span>
              <span class="hljs-attr">&quot;results&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
                <span class="hljs-punctuation">{</span>
                  <span class="hljs-attr">&quot;status&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;failed&quot;</span><span class="hljs-punctuation">,</span>
                  <span class="hljs-attr">&quot;error&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;message&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;expect(...).toHaveText failed ...&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
                  <span class="hljs-attr">&quot;attachments&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
                    <span class="hljs-punctuation">{</span>
                      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;screenshot&quot;</span><span class="hljs-punctuation">,</span>
                      <span class="hljs-attr">&quot;contentType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;image/png&quot;</span><span class="hljs-punctuation">,</span>
                      <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;playwright-report/test-results/.../test-failed-1.png&quot;</span><span class="hljs-punctuation">,</span>
                    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
                    <span class="hljs-punctuation">{</span>
                      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;trace&quot;</span><span class="hljs-punctuation">,</span>
                      <span class="hljs-attr">&quot;contentType&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;application/zip&quot;</span><span class="hljs-punctuation">,</span>
                      <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;playwright-report/test-results/.../trace.zip&quot;</span><span class="hljs-punctuation">,</span>
                    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
                  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
                <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
              <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
            <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
          <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>الحقول المهمة، بالترتيب الذي سيصل إليه السائر:</p>
<ul>
<li><code>suites[].suites[]</code> — المجموعات تتداخل، لذا فالسائر تعاودي.</li>
<li><code>specs[].title</code> و<code>specs[].file</code> و<code>specs[].line</code> — هذه هي الحقول التي تعرّف الاختبار.</li>
<li><code>tests[].projectName</code> — مشروع Playwright (مثل <code>authenticated</code> و<code>public</code>) الذي أنتج النتيجة. سنستخدمه لبناء أمر إعادة الإنتاج.</li>
<li><code>results[].status</code> — افحص هل هو <code>failed</code> أو <code>timedOut</code>.</li>
<li><code>results[].error.message</code> — سلسلة الخطأ الأساسية القابلة للقراءة البشرية.</li>
<li><code>results[].attachments[]</code> — لكل مرفق <code>name</code> و<code>contentType</code> و<code>path</code>. وتصل لقطات الشاشة بصيغة <code>image/png</code>، والتتبّعات بصيغة <code>application/zip</code> (وتُسمّى أيضًا <code>trace</code>)، والفيديوهات بصيغة <code>video/webm</code>.</li>
</ul>
<p>الآن السكربت. إنه يسير في شجرة المجموعات، ويرشّح النتائج الفاشلة، ويعرض كل واحدة في قسم markdown.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// scripts/summarize-failure-dossier.ts</span>
<span class="hljs-keyword">import</span> { readFileSync, writeFileSync } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:fs&#x27;</span>;
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:path&#x27;</span>;

<span class="hljs-keyword">const</span> reportJson = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(<span class="hljs-title function_">readFileSync</span>(<span class="hljs-string">&#x27;playwright-report/report.json&#x27;</span>, <span class="hljs-string">&#x27;utf8&#x27;</span>));

<span class="hljs-keyword">function</span> <span class="hljs-title function_">collectSpecs</span>(<span class="hljs-params"><span class="hljs-attr">suites</span>: <span class="hljs-built_in">any</span>[]</span>): <span class="hljs-built_in">any</span>[] {
  <span class="hljs-keyword">return</span> suites.<span class="hljs-title function_">flatMap</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">suite</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> [
    ...(suite.<span class="hljs-property">specs</span> ?? []),
    ...<span class="hljs-title function_">collectSpecs</span>(suite.<span class="hljs-property">suites</span> ?? []),
  ]);
}

<span class="hljs-keyword">const</span> failures = <span class="hljs-title function_">collectSpecs</span>(reportJson.<span class="hljs-property">suites</span> ?? []).<span class="hljs-title function_">flatMap</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">spec</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span>
  (spec.<span class="hljs-property">tests</span> ?? []).<span class="hljs-title function_">flatMap</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">test</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> failedResult = (test.<span class="hljs-property">results</span> ?? []).<span class="hljs-title function_">find</span>(
      <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">result</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> result.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;failed&#x27;</span> || result.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;timedOut&#x27;</span>,
    );
    <span class="hljs-keyword">return</span> failedResult ? [{ spec, failedResult, <span class="hljs-attr">projectName</span>: test.<span class="hljs-property">projectName</span> }] : [];
  }),
);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">screenshot</span> = (<span class="hljs-params"><span class="hljs-attr">attachments</span>: <span class="hljs-built_in">any</span>[]</span>) =&gt; {
  <span class="hljs-keyword">const</span> file = (attachments ?? []).<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">a</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> a.<span class="hljs-property">contentType</span>?.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&#x27;image/&#x27;</span>) &amp;&amp; a.<span class="hljs-property">path</span>);
  <span class="hljs-keyword">return</span> file ? <span class="hljs-string">\`**Screenshot**: [<span class="hljs-subst">\${path.basename(file.path)}</span>](<span class="hljs-subst">\${file.path}</span>)\\n\`</span> : <span class="hljs-string">&#x27;&#x27;</span>;
};

<span class="hljs-keyword">const</span> <span class="hljs-title function_">trace</span> = (<span class="hljs-params"><span class="hljs-attr">attachments</span>: <span class="hljs-built_in">any</span>[]</span>) =&gt; {
  <span class="hljs-keyword">const</span> file = (attachments ?? []).<span class="hljs-title function_">find</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">a</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> a.<span class="hljs-property">name</span> === <span class="hljs-string">&#x27;trace&#x27;</span> &amp;&amp; a.<span class="hljs-property">path</span>);
  <span class="hljs-keyword">return</span> file ? <span class="hljs-string">\`**Trace**: \\\`npx playwright show-trace <span class="hljs-subst">\${file.path}</span>\\\`\\n\`</span> : <span class="hljs-string">&#x27;&#x27;</span>;
};

<span class="hljs-keyword">const</span> markdown = failures
  .<span class="hljs-title function_">map</span>(
    <span class="hljs-function">(<span class="hljs-params">{ spec, failedResult, projectName }: <span class="hljs-built_in">any</span></span>) =&gt;</span> <span class="hljs-string">\`
## <span class="hljs-subst">\${spec.title}</span>

**Project**: \\\`<span class="hljs-subst">\${projectName}</span>\\\`

**File**: \\\`<span class="hljs-subst">\${spec.file}</span>:<span class="hljs-subst">\${spec.line}</span>\\\`

**Error**:
\\\`\\\`\\\`
<span class="hljs-subst">\${failedResult.error?.message ?? <span class="hljs-string">&#x27;Unknown error&#x27;</span>}</span>
\\\`\\\`\\\`

<span class="hljs-subst">\${screenshot(failedResult.attachments)}</span><span class="hljs-subst">\${trace(failedResult.attachments)}</span>
**Reproduce**:
\\\`\\\`\\\`sh
npx playwright test --project=<span class="hljs-subst">\${projectName}</span> <span class="hljs-subst">\${spec.file}</span> -g <span class="hljs-subst">\${<span class="hljs-built_in">JSON</span>.stringify(spec.title)}</span>
\\\`\\\`\\\`
\`</span>,
  )
  .<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27;\\n---\\n&#x27;</span>);

<span class="hljs-title function_">writeFileSync</span>(
  <span class="hljs-string">&#x27;playwright-report/dossier.md&#x27;</span>,
  markdown || <span class="hljs-string">&#x27;# Playwright failure dossier\\n\\nNo failing tests.\\n&#x27;</span>,
);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`Wrote dossier for <span class="hljs-subst">\${failures.length}</span> failures\`</span>);
</code></pre>
<blockquote>
<p><strong>حلّ الدورة يتضمّن النسخة الإنتاجية</strong></p>
<p>لا يشحن المشروع الانطلاقي Shelf الملف <code>scripts/summarize-failure-dossier.ts</code>. أنت تضيفه في <a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-build-a-failure-dossier-for-shelf">مختبر: ابنِ ملف فشل من أجل Shelf</a>. ونسخة المختبر المكتملة تنفيذ أطول ومكتوب بأنواع كاملة لهذا المخطّط، وهي تختار أيضًا مرفق <code>diff</code> قبل خط الأساس في حالات فشل الانحدار البصري، وتتحرّز من أن يكون <code>result.error</code> غير معرّف عبر <code>result.errors[0]</code>، وتجعل كل مسار مرفق نسبيًا إلى جذر المستودع. اقرأ المخطّط أعلاه لتفهم السير، ثم افتح حلّ المختبر أو تنفيذك الخاص لترى الشكل الإنتاجي.</p>
</blockquote>
<h3 id="مقتطف-تمثيلي-من-dossiermd-لتشغيل-فاشل">مقتطف تمثيلي من <code>dossier.md</code> لتشغيل فاشل</h3>
<p>هكذا سيبدو ملف markdown المولّد بعد اختبار تقييم كتاب فاشل عمدًا في نسخة من Shelf مرّت سلفًا بمختبرات التجهيزات والمشاريع اللاحقة. (وفي المشروع الانطلاقي الحالي، ينتج السير نفسه مدخلًا لأي تأكيد تكسره في <code>tests/smoke.spec.ts</code>، مع <code>projectName</code> فارغ.)</p>
<pre><code class="language-markdown"><span class="hljs-section"># Playwright failure dossier</span>

<span class="hljs-section">## user can rate Station Eleven</span>

<span class="hljs-strong">**Project**</span>: <span class="hljs-code">\`authenticated\`</span>

<span class="hljs-strong">**File**</span>: <span class="hljs-code">\`tests/rate-book.spec.ts:9\`</span>

<span class="hljs-strong">**Error**</span>:

\\<span class="hljs-code">\`\\\`</span>\\\`
Error: expect(locator).toHaveText(expected) failed
Locator: getByRole(&#x27;status&#x27;)
Expected string: &quot;Thanks&quot;
Received string: &quot;&quot;
\\<span class="hljs-code">\`\\\`</span>\\\`

<span class="hljs-strong">**Screenshot**</span>: [<span class="hljs-string">test-failed-1.png</span>](<span class="hljs-link">./playwright-report/test-results/.../test-failed-1.png</span>)

<span class="hljs-strong">**Trace**</span>: <span class="hljs-code">\`npx playwright show-trace playwright-report/test-results/.../trace.zip\`</span>

<span class="hljs-strong">**Reproduce**</span>:

\\<span class="hljs-code">\`\\\`</span>\\\`sh
npx playwright test --project=authenticated tests/rate-book.spec.ts -g &quot;user can rate Station Eleven&quot;
\\<span class="hljs-code">\`\\\`</span>\\\`
</code></pre>
<p>هذا بالضبط ما تريده في يد الوكيل: عنوان الاختبار، والمشروع الذي عاش فيه، والملف والسطر، ورسالة الخطأ الكاملة، ورابط لقطة الشاشة، وسطر واحد لفتح التتبّع، وأمر إعادة إنتاج يعزل هذا الاختبار وحده. يقرأ الوكيل ملفًا واحدًا فيعرف ما يفعله بعد ذلك.</p>
<p>(عدّل أسماء الحقول لتطابق إصدار Playwright لديك إن لزم — فمخطّط JSON يتغيّر بين الإصدارات. المقصد هو البنية، لا الواجهة البرمجية الدقيقة.)</p>
<p>ولبديل يتخطّى السكربت المخصّص كليًا ويستخدم النموذج اللغوي نفسه لفرز ملف الفشل إلى JSON مكتوب بأنواع، راجع <a href="https://stevekinney.com/courses/self-testing-ai-agents/structured-cli-output-as-pipeline-glue">مخرجات CLI المنظّمة كغراء للخط الأنابيب</a>. يعلّمك ذلك الدرس <code>claude -p --json-schema</code> مع ملف الفشل كمدخل — البيانات نفسها، والمستهلك مختلف.</p>
<p>بعد أن تضيف المُلخِّص من مختبر ملف الفشل، يمكنك إضافة هذا القسم إلى تعليمات وكيلك:</p>
<pre><code class="language-markdown"><span class="hljs-section">## When a test fails</span>

<span class="hljs-bullet">1.</span> Run <span class="hljs-code">\`npm run dossier\`</span> to generate a summary at <span class="hljs-code">\`playwright-report/dossier.md\`</span>.
<span class="hljs-bullet">2.</span> Read the dossier. It contains the error, screenshot path, trace path, and reproduction command for every failing test.
<span class="hljs-bullet">3.</span> Use the reproduction command to rerun just the failing test while iterating.
<span class="hljs-bullet">4.</span> Do not &quot;fix&quot; a failing test by changing the assertion. Fix the underlying code.
<span class="hljs-bullet">5.</span> Do not add <span class="hljs-code">\`console.log\`</span> calls to test files to debug. The trace already has the DOM at every step; open it with <span class="hljs-code">\`npx playwright show-trace &lt;path&gt;\`</span>.
</code></pre>
<p>صار لدى الوكيل الآن نقطة دخول واحدة منظّمة. أمر واحد، وملف واحد، ومحتوى قابل للتنفيذ في الداخل.</p>
<h2 id="كيف-تسير-الحلقة">كيف تسير الحلقة</h2>
<pre><code>graph LR
  A[&quot;Test fails&lt;br/&gt;Red build&quot;] --&gt; B[&quot;Trace + screenshots&lt;br/&gt;+ console + network&quot;]
  B --&gt; C[&quot;dossier.md generated&lt;br/&gt;structured summary&quot;]
  C --&gt; D[&quot;Agent reads dossier&quot;]
  D --&gt; E[&quot;Reproduces failure&lt;br/&gt;from command in dossier&quot;]
  E --&gt; F[&quot;Inspects screenshot&lt;br/&gt;and trace&quot;]
  F --&gt; G[&quot;Proposes fix&quot;]
  G --&gt; H[&quot;Rerun test&quot;]
  H --&gt;|Passes| I[&quot;✓ Done&quot;]
  H --&gt;|Still fails| D
</code></pre>
<h2 id="التقاط-الطرفية-والشبكة">التقاط الطرفية والشبكة</h2>
<p>حيلتان في Playwright تدفعان ثمنهما فورًا في ملف الفشل.</p>
<p><strong>تمرير طرفية المتصفّح إلى مخرجات الاختبار.</strong> أضف هذا كتجهيز اختبار:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// tests/fixtures.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> test = base.<span class="hljs-title function_">extend</span>({
  <span class="hljs-attr">page</span>: <span class="hljs-title function_">async</span> ({ page }, use) =&gt; {
    page.<span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;console&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">msg</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (msg.<span class="hljs-title function_">type</span>() === <span class="hljs-string">&#x27;error&#x27;</span> || msg.<span class="hljs-title function_">type</span>() === <span class="hljs-string">&#x27;warning&#x27;</span>) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`[browser <span class="hljs-subst">\${msg.<span class="hljs-keyword">type</span>()}</span>] <span class="hljs-subst">\${msg.text()}</span>\`</span>);
      }
    });
    page.<span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;pageerror&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`[browser pageerror] <span class="hljs-subst">\${error.message}</span>\`</span>);
    });
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">use</span>(page);
  },
});
</code></pre>
<p>الآن يظهر أي خطأ في طرفية المتصفّح في مخرجات الاختبار. وحين يفشل اختبار، يستطيع الوكيل أن يبحث في المخرجات عن <code>[browser</code> ليرى ما كان التطبيق يشتكي منه في اللحظات السابقة للفشل. تبيّن أن نصف حالات الفشل «الغامضة» ليست إلا «آه، كان هناك TypeError في مكوّن ظننّا أنه لا يهم».</p>
<p><strong>تسجيل فشل الشبكة.</strong> نمط مشابه:</p>
<pre><code class="language-typescript">page.<span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;requestfailed&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">request</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> failureText = request.<span class="hljs-title function_">failure</span>()?.<span class="hljs-property">errorText</span> ?? <span class="hljs-string">&#x27;unknown error&#x27;</span>;
  <span class="hljs-keyword">if</span> (failureText.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;ERR_ABORTED&#x27;</span>) || failureText.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;NS_BINDING_ABORTED&#x27;</span>)) {
    <span class="hljs-keyword">return</span>;
  }
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`[network failed] <span class="hljs-subst">\${request.method()}</span> <span class="hljs-subst">\${request.url()}</span> - <span class="hljs-subst">\${failureText}</span>\`</span>);
});
page.<span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;response&#x27;</span>, <span class="hljs-title function_">async</span> (response) =&gt; {
  <span class="hljs-keyword">if</span> (response.<span class="hljs-title function_">status</span>() &gt;= <span class="hljs-number">400</span>) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(
      <span class="hljs-string">\`[network <span class="hljs-subst">\${response.status()}</span>] <span class="hljs-subst">\${response.request().method()}</span> <span class="hljs-subst">\${response.url()}</span>\`</span>,
    );
  }
});
</code></pre>
<p>يظهر في المخرجات كل طلب فاشل، وكل 4xx، وكل 5xx. وحين يفشل اختبار لأن «الزر لم يفعل شيئًا»، يخبر السطر <code>[network 500]</code> في المخرجات الوكيل أن الزر <em>فعل</em> شيئًا — لكن استدعاء واجهة البرمجة فشل فقط.</p>
<h2 id="فخ-consolelog">فخّ <code>console.log</code></h2>
<p>نصيحة مخالفة للحدس: كفّ عن السماح للوكيل بإضافة عبارات <code>console.log</code> إلى الاختبارات كأسلوب تنقيح. يفشل الاختبار، فيضيف الوكيل <code>console.log(await page.content())</code> ويعيد تشغيله. هذا يعمل، لكنه نسخة أسوأ ممّا يمنحك التتبّع سلفًا. فالتتبّع يحتوي DOM كاملًا عند كل خطوة، بطوابع زمنية، ومنظّمًا مسبقًا.</p>
<p>القاعدة:</p>
<pre><code class="language-markdown"><span class="hljs-bullet">-</span> Do not add <span class="hljs-code">\`console.log\`</span> statements to test files to debug failures.
  Read the trace instead: <span class="hljs-code">\`npx playwright show-trace &lt;path&gt;\`</span>. If the
  information you want is not in the trace, either add it as a
  permanent observation (network listener, console forwarder) or
  explain why it&#x27;s missing.
</code></pre>
<p>سبب أهمية هذا أن عبارات <code>console.log</code> تتراكم. تصل إلى طلبات السحب. وتُشحن إلى التكامل المستمر. وتتجمّع. فملف اختبار فيه خمسة عشر استدعاءً لـ<code>console.log</code> هو ملف لا يريد أحد قراءته، وقد أُضيفت الخمسة عشر كلها واحدًا واحدًا بواسطة وكيل يحاول إصلاح فشل.</p>
<h2 id="ما-يمنحك-ملف-الفشل-على-جانب-الوكيل">ما يمنحك ملف الفشل على جانب الوكيل</h2>
<p>هذه هي الحلقة التي تهمّني. يفشل اختبار. يُولَّد ملف الفشل. يشغّل الوكيل Claude Code ويقول:</p>
<blockquote>
<p>اقرأ <code>playwright-report/dossier.md</code>. اختر أول فشل. استخدم أمر إعادة الإنتاج لإعادة تشغيل الاختبار معزولًا. انظر إلى لقطة الشاشة. اقرأ التتبّع. اقترح إصلاحًا. طبّق الإصلاح. أعد تشغيل الاختبار. فإن ظلّ فاشلًا، فكرّر.</p>
</blockquote>
<p>تلك حلقة تنقيح ذاتية القيادة بالكامل. لا يحتاج الوكيل منك لصق رسائل خطأ. ولا يحتاج منك تشغيل الاختبار. ولا يحتاج منك فتح تقرير HTML. إنه يقرأ ملف الفشل، ويعيد إنتاج الفشل، وينظر إلى الأدلّة، ويكرّر. كل ما تفعله أنت أن تلاحظ متى تتقارب الحلقة وتراجع الإصلاح.</p>
<p>كل جزء من هذا الدرس جزء من تلك الحلقة. ملف الفشل هو نقطة الدخول. والتتبّع هو الدليل. وأمر إعادة الإنتاج هو الفعل. ولقطة الشاشة هي فحص المعقولية.</p>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>الاختبار الفاشل موجّه. والموجّه الجيد محمّل بالأدلّة. التتبّعات، ولقطات الشاشة، وسجلات الطرفية، وأوامر إعادة الإنتاج — كلها تنتمي إلى ملف الفشل، لأن الوكيل لا يستطيع التصرّف إلا بناءً على ما ترفقه. فعّلها مرّة واحدة فتصبح الحلقة أشدّ إحكامًا بدرجة هائلة.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/writing-a-custom-mcp-wrapper">كتابة غلاف MCP مخصّص</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-build-a-failure-dossier-for-shelf">مختبر: ابنِ ملف فشل من أجل Shelf</a></li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:l,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,e as html,t as slug,p as title};
