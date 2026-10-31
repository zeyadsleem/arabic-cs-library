const s="kinney",n="enterprise-ui",a="واجهات المؤسسات",t="codemods-at-scale",p="Codemods على نطاق واسع",e=[{depth:2,id:"لماذا-تنكسر-التحويلات-القائمة-على-النص",text:"لماذا تنكسر التحويلات القائمة على النص"},{depth:2,id:"خط-أنابيب-ast",text:"خط أنابيب AST"},{depth:2,id:"jscodeshift",text:"jscodeshift"},{depth:2,id:"تحويل-أكثر-واقعية",text:"تحويل أكثر واقعية"},{depth:2,id:"حلقة-الاختبار",text:"حلقة الاختبار"},{depth:2,id:"التوزيع-المؤسسي",text:"التوزيع المؤسسي"},{depth:2,id:"متى-تستحق-codemods-كلفتها",text:"متى تستحق codemods كلفتها"},{depth:2,id:"ما-هو-أبعد-من-jscodeshift",text:"ما هو أبعد من jscodeshift"},{depth:2,id:"الخلاصة-السريعة-tldr",text:"الخلاصة السريعة (TL;DR)"},{depth:3,id:"خط-أنابيب-ast-1",text:"خط أنابيب AST"},{depth:3,id:"jscodeshift-1",text:"jscodeshift"},{depth:3,id:"متى-تستحق-codemods-كلفتها-1",text:"متى تستحق codemods كلفتها"}],o=`<p>إن احتجت يومًا إلى إعادة تسمية استيراد عبر ألفَي ملف، فحدسك الأول كان على الأرجح البحث والاستبدال. وبالنسبة إلى إعادة تسمية بسيطة—<code>oldThing</code> إلى <code>newThing</code>—فهذا ينجح. لكن بمجرد أن تحتاج شيئًا أكثر بنيوية بقليل—تحويل استيراد مُسمّى إلى استيراد افتراضي، أو إعادة كتابة نداء دالة ليستخدم ترتيب وسائط مختلفًا، أو استبدال واجهة برمجية مهجورة بأخرى تأخذ خيارات مختلفة—يبدأ البحث والاستبدال في إنتاج نتائج إيجابية خاطئة، وإغفال حالات حدّية، وإتلاف القوالب النصية (template literals) أحيانًا.</p>
<p><strong>codemod</strong> هو تحويل آلي للشيفرة يعمل على <em>بنية</em> الشيفرة لا على نصها. فبدلًا من مطابقة السلاسل النصية، يحلّل codemod الشيفرة المصدرية إلى شجرة صياغة مجرّدة (Abstract Syntax Tree)، ويبحث عن العُقد المطابقة لنمط ما، ويستبدل تلك العُقد بأخرى جديدة، ويطبع الشجرة المعدَّلة عائدةً إلى المصدر. والنتيجة تحويل يفهم الفرق بين <code>React.createClass</code> في عبارة استيراد و<code>React.createClass</code> في تعليق.</p>
<h2 id="لماذا-تنكسر-التحويلات-القائمة-على-النص">لماذا تنكسر التحويلات القائمة على النص</h2>
<p>تأمّل ترحيلًا تحتاج فيه إلى تغيير كل نداء إلى <code>analytics.track(eventName)</code> ليصبح <code>analytics.send({ event: eventName })</code>. يستطيع التعبير النمطي (regex) معالجة الحالة البسيطة، لكن قواعد الشيفرة الحقيقية فيها:</p>
<ul>
<li>أسماء استيراد مستعارة مختلفة (<code>import { track as logEvent }</code>)</li>
<li>نداءات تمتد على عدة أسطر</li>
<li>السلسلة <code>analytics.track</code> نفسها داخل خاصية JSX وقالب نصي وتعليق</li>
<li>وصول ديناميكي إلى الخصائص (<code>analytics[method]()</code>)</li>
</ul>
<p>فإما أن يفوت التعبير النمطي هذه الحالات أو يشوّهها. أما التحويل القائم على AST فيتعامل مع الثلاث الأولى طبيعيًا لأنه يعمل على البنية المحلَّلة لا على النص الخام. والحالة الرابعة—الوصول الديناميكي—يتخطّاها بشكل صحيح لأن نوع العقدة لا يطابق. أنت تريد أداة دقيقة في ما تغيّره وصادقة في ما لا تستطيع تغييره.</p>
<h2 id="خط-أنابيب-ast">خط أنابيب AST</h2>
<p>يتبع كل codemod خط الأنابيب نفسه ذا المراحل الأربع:</p>
<pre><code>flowchart LR
    Source[&quot;Source Code&quot;] --&gt; Parse
    Parse --&gt; AST[&quot;Abstract\\nSyntax Tree&quot;]
    AST --&gt; Transform[&quot;Find &amp;\\nTransform&quot;]
    Transform --&gt; Print
    Print --&gt; Output[&quot;Modified Source&quot;]
</code></pre>
<p>يقرأ المحلّل (parser) الشيفرة المصدرية وينتج شجرة. وتمثّل كل عقدة في الشجرة تركيبًا لغويًا—<code>ImportDeclaration</code> أو <code>CallExpression</code> أو <code>JSXElement</code> أو <code>VariableDeclarator</code>. وتمشي خطوة التحويل في الشجرة، فتجد العُقد المطابقة لنمط وتستبدلها بعُقد جديدة. ويُسلسل الطابع (printer) الشجرة المعدَّلة عائدةً إلى الشيفرة المصدرية، محافظًا على التنسيق والتعليقات التي لم تكن جزءًا من التحويل.</p>
<p>كلمة «مجرّدة» في <strong>شجرة الصياغة المجرّدة</strong> تعني أن الشجرة تُسقط الضجيج الصياغي—الأقواس المستخدمة للتجميع فقط، والفواصل المنقوطة، والمسافات. وما يبقى هو البنية المنطقية للبرنامج. ولهذا يُنتج ملفان بتنسيق مختلف لكن بمنطق متطابق الشجرة نفسها، ولهذا يستطيع codemod إيجاد نمط دون القلق من عدد المسافات التي استخدمها أحدهم للإزاحة.</p>
<p>إليك شكل عبارة استيراد بسيطة كشجرة:</p>
<pre><code>graph TD
    ID[&quot;ImportDeclaration&quot;]
    ID --&gt; Specifiers
    ID --&gt; Source[&quot;Source: '@pulse/analytics'&quot;]
    Specifiers --&gt; IS[&quot;ImportSpecifier&quot;]
    IS --&gt; Imported[&quot;imported: 'Chart'&quot;]
    IS --&gt; Local[&quot;local: 'Chart'&quot;]
</code></pre>
<p>عندما «يجد codemod كل الاستيرادات من <code>./legacy-chart</code>»، فهو يبحث عن عُقد <code>ImportDeclaration</code> التي تطابق <code>source.value</code> فيها تلك السلسلة. وعندما يستبدل المصدر بـ <code>@pulse/analytics</code>، فهو يبادل عقدة AST بأخرى. ويتولّى الطابع تحويل الشجرة المعدَّلة عائدةً إلى شيفرة مصدرية صالحة.</p>
<h2 id="jscodeshift">jscodeshift</h2>
<p><a href="https://github.com/facebook/jscodeshift">jscodeshift</a> هو صندوق أدوات Meta لكتابة codemods وتشغيلها. وهو يلفّ <a href="https://github.com/benjamn/recast">recast</a> (الذي يتولّى التحليل والطبع مع الحفاظ على التنسيق) ويوفّر واجهة برمجية شبيهة بـ jQuery للبحث في AST وتحويله.</p>
<p>يبدو codemod بسيط هكذا:</p>
<p><em>rename-import.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-variable constant_">API</span>, <span class="hljs-title class_">FileInfo</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;jscodeshift&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">transform</span>(<span class="hljs-params"><span class="hljs-attr">file</span>: <span class="hljs-title class_">FileInfo</span>, <span class="hljs-attr">api</span>: API</span>) {
  <span class="hljs-keyword">const</span> j = api.<span class="hljs-property">jscodeshift</span>;
  <span class="hljs-keyword">const</span> root = <span class="hljs-title function_">j</span>(file.<span class="hljs-property">source</span>);

  root
    .<span class="hljs-title function_">find</span>(j.<span class="hljs-property">ImportDeclaration</span>, {
      <span class="hljs-attr">source</span>: { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;@old/package&#x27;</span> },
    })
    .<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> {
      path.<span class="hljs-property">node</span>.<span class="hljs-property">source</span>.<span class="hljs-property">value</span> = <span class="hljs-string">&#x27;@new/package&#x27;</span>;
    });

  <span class="hljs-keyword">return</span> root.<span class="hljs-title function_">toSource</span>();
}
</code></pre>
<p><em>ملاحظة:</em> <code>j(file.source)</code> يحلّل الملف ويعيد مجموعة قابلة للاجتياز.</p>
<p><em>ملاحظة:</em> يجد كل استيراد من <code>@old/package</code> ويعيد كتابة سلسلة المصدر.</p>
<p>تشغّله على دليل من الملفات:</p>
<pre><code class="language-bash">npx jscodeshift --parser tsx --transform rename-import.ts src/
</code></pre>
<p>يعالج jscodeshift الملفات على التوازي افتراضيًا، فيتوسّع ليشمل قواعد شيفرة كبيرة دون دفعات مخصّصة. ويخبر علم <code>--parser tsx</code> أداة recast باستخدام محلّل مدرك لـ TypeScript، يتعامل مع ملفات <code>.ts</code> و<code>.tsx</code> معًا.</p>
<p>تتبع الواجهة البرمجية نمطًا: <code>find</code> لتحديد موقع العُقد، و<code>filter</code> لتضييق النتائج، و<code>forEach</code> أو <code>replaceWith</code> لإجراء التغييرات. وإن كنت قد استخدمت jQuery أو تحديدات D3، فسيبدو أسلوب التسلسل مألوفًا.</p>
<h2 id="تحويل-أكثر-واقعية">تحويل أكثر واقعية</h2>
<p>إعادة تسمية مصدر حزمة هي الحالة السهلة. وإليك شيئًا أقرب إلى عمل ترحيل حقيقي—تحويل نمط نداء واجهة برمجية قديمة إلى نمط حديث:</p>
<p><em>migrate-api-calls.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-variable constant_">API</span>, <span class="hljs-title class_">FileInfo</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;jscodeshift&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">transform</span>(<span class="hljs-params"><span class="hljs-attr">file</span>: <span class="hljs-title class_">FileInfo</span>, <span class="hljs-attr">api</span>: API</span>) {
  <span class="hljs-keyword">const</span> j = api.<span class="hljs-property">jscodeshift</span>;
  <span class="hljs-keyword">const</span> root = <span class="hljs-title function_">j</span>(file.<span class="hljs-property">source</span>);

  <span class="hljs-comment">// Find: analytics.track(&quot;event_name&quot;, { key: value })</span>
  <span class="hljs-comment">// Replace: analytics.send({ event: &quot;event_name&quot;, properties: { key: value } })</span>
  root
    .<span class="hljs-title function_">find</span>(j.<span class="hljs-property">CallExpression</span>, {
      <span class="hljs-attr">callee</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;MemberExpression&#x27;</span>,
        <span class="hljs-attr">object</span>: { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;analytics&#x27;</span> },
        <span class="hljs-attr">property</span>: { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;track&#x27;</span> },
      },
    })
    .<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> args = path.<span class="hljs-property">node</span>.<span class="hljs-property">arguments</span>;
      <span class="hljs-keyword">if</span> (args.<span class="hljs-property">length</span> &lt; <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span>;

      <span class="hljs-keyword">const</span> eventArg = args[<span class="hljs-number">0</span>];
      <span class="hljs-keyword">const</span> propsArg = args[<span class="hljs-number">1</span>] || j.<span class="hljs-title function_">objectExpression</span>([]);

      <span class="hljs-comment">// Build the new call: analytics.send({ event, properties })</span>
      path.<span class="hljs-property">node</span>.<span class="hljs-property">callee</span>.<span class="hljs-property">property</span>.<span class="hljs-property">name</span> = <span class="hljs-string">&#x27;send&#x27;</span>;
      path.<span class="hljs-property">node</span>.<span class="hljs-property">arguments</span> = [
        j.<span class="hljs-title function_">objectExpression</span>([
          j.<span class="hljs-title function_">property</span>(<span class="hljs-string">&#x27;init&#x27;</span>, j.<span class="hljs-title function_">identifier</span>(<span class="hljs-string">&#x27;event&#x27;</span>), eventArg),
          j.<span class="hljs-title function_">property</span>(<span class="hljs-string">&#x27;init&#x27;</span>, j.<span class="hljs-title function_">identifier</span>(<span class="hljs-string">&#x27;properties&#x27;</span>), propsArg),
        ]),
      ];
    });

  <span class="hljs-keyword">return</span> root.<span class="hljs-title function_">toSource</span>();
}
</code></pre>
<p><em>ملاحظة:</em> يطابق الشكل الدقيق لنداءات <code>analytics.track(...)</code> في AST.</p>
<p><em>ملاحظة:</em> يعيد هيكلة الوسائط في كائن خيارات واحد.</p>
<p>يأخذ هذا التحويل <code>analytics.track(&quot;page_view&quot;, { url: &quot;/&quot; })</code> وينتج <code>analytics.send({ event: &quot;page_view&quot;, properties: { url: &quot;/&quot; } })</code>. ولا يستطيع التعبير النمطي التمييز بشكل موثوق بين هذا وسلسلة تحتوي <code>analytics.track</code> صدفةً أو نداء بعدد وسائط مختلف. ويتعامل تحويل AST مع الحالتين بشكل صحيح لأنه يعمل على بنية الشيفرة لا على نصها.</p>
<blockquote>
<p><strong>ابدأ بالحالات الميكانيكية</strong></p>
<p>لا يحتاج codemod إلى معالجة كل حالة حدّية ليكون ذا قيمة. فإن كان يحوّل 80% من مواضع النداء بشكل صحيح ويؤشّر على الـ20% المتبقية للمراجعة اليدوية، فقد وفّر أيامًا من العمل بالفعل. اكتب التحويل للنمط الشائع، وأضف <code>console.warn</code> للأنماط التي لا تستطيع معالجتها تلقائيًا، وراجع الفرق (diff).</p>
</blockquote>
<h2 id="حلقة-الاختبار">حلقة الاختبار</h2>
<p>codemods هي دوال من سلاسل نصية إلى سلاسل نصية، ما يجعل اختبارها مباشرًا. فتكتب مدخلًا، وتشغّل التحويل، وتتحقق من المخرَج:</p>
<p><em>rename-import.test.ts</em></p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { describe, it, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vitest&#x27;</span>;
<span class="hljs-keyword">import</span> jscodeshift <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;jscodeshift&#x27;</span>;
<span class="hljs-keyword">import</span> transform <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../rename-import&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">run</span>(<span class="hljs-params"><span class="hljs-attr">input</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">transform</span>(
    { <span class="hljs-attr">source</span>: input, <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;test.tsx&#x27;</span> },
    { jscodeshift, <span class="hljs-attr">j</span>: jscodeshift, <span class="hljs-attr">stats</span>: <span class="hljs-function">() =&gt;</span> {}, <span class="hljs-attr">report</span>: <span class="hljs-function">() =&gt;</span> {} },
  );
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;rename-import&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;rewrites the package source&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> input = <span class="hljs-string">\`import { Button } from &quot;@old/package&quot;;\`</span>;
    <span class="hljs-keyword">const</span> output = <span class="hljs-title function_">run</span>(input);
    <span class="hljs-title function_">expect</span>(output).<span class="hljs-title function_">toContain</span>(<span class="hljs-string">&#x27;@new/package&#x27;</span>);
    <span class="hljs-title function_">expect</span>(output).<span class="hljs-property">not</span>.<span class="hljs-title function_">toContain</span>(<span class="hljs-string">&#x27;@old/package&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;leaves unrelated imports alone&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> input = <span class="hljs-string">\`import { useState } from &quot;react&quot;;\`</span>;
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">run</span>(input)).<span class="hljs-title function_">toBe</span>(input);
  });
});
</code></pre>
<p><em>ملاحظة:</em> سلسلة تدخل، وسلسلة تخرج. لا نظام ملفات، ولا مُجمِّع، ولا إطار.</p>
<p>عندما ينتج codemod مخرَجًا غير صحيح على ملف حقيقي، انسخ المقتطف المشكِل إلى حالة اختبار، وأصلح التحويل، وتحقق من نجاح الاختبار. ومع الوقت، تجمع مجموعة اختباراتك فهرسًا من الحالات الحدّية يمنع التراجعات عند توسيعك نطاق codemod.</p>
<h2 id="التوزيع-المؤسسي">التوزيع المؤسسي</h2>
<p>في شركات مثل Meta وGoogle، ليست codemods بدعة ترحيل—بل جزء من سير عمل التطوير القياسي. فعندما تُدخل مكتبة داخلية تغييرًا كاسرًا في واجهتها البرمجية، يشحن الفريق المالك للمكتبة codemod إلى جانب الإصدار الجديد. ويصف <a href="https://martinfowler.com/articles/codemods-api-refactoring.html">مقال Martin Fowler عن codemods</a> هذا كعُرف ثقافي: فمؤلّف المكتبة يتحمّل مسؤولية ترحيل المستهلكين، لا العكس.</p>
<p>هذا يقلب ديناميكية الترقية المعتادة. فبدلًا من أن يكتشف كل فريق مستهلك باستقلالية كيف يتكيّف مع تغيير كاسر، يكتب فريق المكتبة تحويلًا واحدًا يتولّى الترحيل عبر المستودع الأحادي بأكمله. وعلى مقياس Meta—آلاف المهندسين، وملايين أسطر الشيفرة—فإن البديل (فتح تذاكر والأمل في أن يهاجر كل فريق يدويًا) لا ينجح ببساطة.</p>
<p>وينطبق النمط نفسه على ترحيلات نظام التصميم. فعندما تعيد مكتبة مكوّنات تسمية خاصية (prop)، أو تغيّر واجهة مكوّن البرمجية، أو تُهجر نمطًا، يستطيع codemod تحديث كل مستهلك تلقائيًا. ويبني <a href="https://www.hypermod.io/blog/7-automating-design-system-evolution">Hypermod</a> على هذه الفكرة، موفّرًا منصة مخصّصة لتوزيع codemods نظام التصميم التي تستطيع الفرق تشغيلها كجزء من سير عمل ترقيتها.</p>
<p>يستحق الاستنتاج التنظيمي التسطير: تنقل codemods كلفة تطوّر الواجهة البرمجية من المستهلكين إلى المنتِجين. فالفريق الذي يُجري التغيير الكاسر يتحمّل كلفة كتابة سكربت الترحيل، وهذا عادل—فهو الأكثر دراية بما تغيّر ولماذا. وهذا يجعل التغييرات الكاسرة <em>أرخص</em> على المؤسسة ككل، ما يعني أن المكتبات تستطيع التطور أسرع دون ترك المستهلكين عالقين على إصدارات قديمة.</p>
<h2 id="متى-تستحق-codemods-كلفتها">متى تستحق codemods كلفتها</h2>
<p>تصبح codemods منطقية عندما يكون لديك تحويل:</p>
<ul>
<li><strong>ميكانيكي</strong>: يُقابل النمط القديم النمط الجديد دون أحكام شخصية.</li>
<li><strong>متكرّر</strong>: يحتاج التغيير نفسه إلى الحدوث عبر عشرات أو مئات الملفات.</li>
<li><strong>قابل للاختبار</strong>: تستطيع كتابة أزواج مدخل/مخرَج تتحقق من التحويل.</li>
</ul>
<p>وهي أقل فائدة عندما يتطلّب التحويل فهم منطق العمل، أو عندما تكون الشيفرة غير متسقة إلى حد لا يغطّي فيه نمط واحد معظم الحالات، أو عندما يكون عدد الملفات المتأثرة صغيرًا بما يكفي لتكون التعديلات اليدوية أسرع من كتابة التحويل.</p>
<p>اختبار عباد الشمس الجيد: إن كنت تصف التغيير بأنه «اعثر على كل X واستبدله بـ Y، حيث X وY نمطان بنيويان في الشيفرة»، فهذا codemod. وإن كنت تصفه بأنه «انظر إلى كل استخدام وقرّر ما تفعله بناءً على السياق»، فهذا إنسان مع قائمة تحقّق.</p>
<h2 id="ما-هو-أبعد-من-jscodeshift">ما هو أبعد من jscodeshift</h2>
<p>jscodeshift هو الأداة الأوسع استخدامًا في منظومة JavaScript، لكنه ليس الخيار الوحيد. ويوفّر <a href="https://ts-morph.com/">ts-morph</a> واجهة برمجية أصلية لـ TypeScript غالبًا أكثر ملاءمة للتحويلات الخاصة بـ TypeScript لأنه يفهم الأنواع لا الصياغة فقط. وبالنسبة إلى تحويلات CSS، يوفّر <a href="https://postcss.org/">PostCSS</a> خط أنابيب مكافئًا قائمًا على AST. وبالنسبة إلى قوالب HTML، تقدّم أدوات مثل <a href="https://github.com/inikulin/parse5">parse5</a> معالجة شجرية بمستوى DOM.</p>
<p>الفكرة الكامنة هي نفسها في كل مكان: حلّل محتوى مُهيكلًا إلى شجرة، وعالج الشجرة، ثم اطبعها عائدةً. وبمجرد أن تكتب تحويل AST واحدًا، ينتقل النمط إلى أي لغة أو صيغة لها محلّل.</p>
<p>سنضع هذا موضع التطبيق في <a href="https://stevekinney.com/courses/enterprise-ui/strangler-fig-and-codemods-exercise">التمرين 9</a>، حيث ستكتب codemod بـ jscodeshift يحوّل استيرادات المكوّنات القديمة إلى استيرادات حزم حديثة—وهو بالضبط نوع عمل الترحيل الميكانيكي المتكرّر الذي تتعامل معه codemods جيدًا.</p>
<hr>
<h2 id="الخلاصة-السريعة-tldr">الخلاصة السريعة (TL;DR)</h2>
<h3 id="خط-أنابيب-ast-1">خط أنابيب AST</h3>
<blockquote>
<p>حلّل → اعثر → حوّل → اطبع. هذه هي الفكرة كلها.</p>
</blockquote>
<pre><code>Source Code → Parse → Abstract Syntax Tree → Find &amp; Transform → Print → Modified Source
</code></pre>
<ul>
<li>تنكسر التحويلات القائمة على النص (regex، sed) عند التعبيرات متعددة الأسطر، وأسماء الاستيراد المستعارة، والمحتوى داخل التعليقات أو السلاسل النصية.</li>
<li>تفهم تحويلات AST <em>بنية</em> البرنامج. فهي تطابق عُقدًا لا أحرفًا.</li>
<li>يحافظ الطابع على التنسيق الأصلي (المسافات، والعلامات، والفواصل المنقوطة) لكل ما لم يمسّه.</li>
</ul>
<hr>
<h3 id="jscodeshift-1">jscodeshift</h3>
<blockquote>
<p>صندوق أدوات Meta لكتابة تحويلات الشيفرة القائمة على AST وتشغيلها على نطاق واسع.</p>
</blockquote>
<pre><code class="language-typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">transform</span>(<span class="hljs-params">file, api</span>) {
  <span class="hljs-keyword">const</span> j = api.<span class="hljs-property">jscodeshift</span>;
  <span class="hljs-keyword">const</span> root = <span class="hljs-title function_">j</span>(file.<span class="hljs-property">source</span>);

  root.<span class="hljs-title function_">find</span>(j.<span class="hljs-property">ImportDeclaration</span>, { <span class="hljs-attr">source</span>: { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;@legacy/analytics&#x27;</span> } }).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> {
    path.<span class="hljs-property">node</span>.<span class="hljs-property">source</span>.<span class="hljs-property">value</span> = <span class="hljs-string">&#x27;@modern/analytics&#x27;</span>;
  });

  <span class="hljs-keyword">return</span> root.<span class="hljs-title function_">toSource</span>();
}
</code></pre>
<ul>
<li>واجهة برمجية شبيهة بـ jQuery: <code>find()</code>، <code>filter()</code>، <code>forEach()</code>، <code>replaceWith()</code>.</li>
<li>يشغّل التحويلات على التوازي عبر قواعد شيفرة كبيرة.</li>
<li>استخدم AST Explorer لنمذجة التحويلات قبل الالتزام بها.</li>
</ul>
<hr>
<h3 id="متى-تستحق-codemods-كلفتها-1">متى تستحق codemods كلفتها</h3>
<blockquote>
<p>تستحق codemods العناء عندما يكون التحويل ميكانيكيًا ومتكرّرًا وقابلًا للاختبار.</p>
</blockquote>
<ul>
<li><strong>ميكانيكي:</strong> يُقابل النمط القديم النمط الجديد مباشرةً. ولا يلزم حكم على منطق العمل.</li>
<li><strong>متكرّر:</strong> من عشرات إلى مئات مواضع النداء. وإن كانت ثلاثة ملفات، فأنجزها يدويًا.</li>
<li><strong>قابل للاختبار:</strong> سلسلة تدخل وسلسلة تخرج. اكتب أزواج مدخل/مخرَج، وشغّل التحويل، وقارن.</li>
<li>اشحن codemods <em>مع</em> التغييرات الكاسرة. ففريق المكتبة الذي يعيد تسمية الواجهة البرمجية يكتب codemod. وتنتقل كلفة الترحيل من المستهلكين إلى المنتِجين.</li>
</ul>
`,l={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:e,html:o};export{s as book,n as chapter,a as chapterTitle,l as default,e as headings,o as html,t as slug,p as title};
