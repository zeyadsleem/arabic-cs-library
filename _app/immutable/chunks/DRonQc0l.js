const s="kinney",n="react-performance",a="أداء React",l="measuring-performance-with-real-tools",t="قياس الأداء",e=[{depth:2,id:"أداة-profiler-في-react-devtools-محطتك-الأولى",text:"أداة Profiler في React DevTools: محطتك الأولى"},{depth:3,id:"البدء-مع-أداة-profiler",text:"البدء مع أداة Profiler"},{depth:3,id:"قراءة-نتائج-profiler",text:"قراءة نتائج Profiler"},{depth:3,id:"فهم-سبب-تصيير-المكونات",text:"فهم سبب تصيير المكوّنات"},{depth:2,id:"تبويب-performance-في-chrome-الغوص-العميق",text:"تبويب Performance في Chrome: الغوص العميق"},{depth:3,id:"تسجيل-ملف-تعريف-للأداء",text:"تسجيل ملف تعريف للأداء"},{depth:3,id:"قراءة-المخطط-الزمني",text:"قراءة المخطط الزمني"},{depth:3,id:"العثور-على-عمل-react-في-المخطط-الزمني",text:"العثور على عمل React في المخطط الزمني"},{depth:2,id:"واجهة-user-timing-api-علامات-أداء-مخصصة",text:"واجهة User Timing API: علامات أداء مخصّصة"},{depth:2,id:"تنقيح-الأداء-في-الواقع-العملي",text:"تنقيح الأداء في الواقع العملي"},{depth:3,id:"الخطوة-1-حدد-منطقة-المشكلة",text:"الخطوة 1: حدّد منطقة المشكلة"},{depth:3,id:"الخطوة-2-افهم-لماذا-يصير",text:"الخطوة 2: افهم لماذا يُصيَّر"},{depth:3,id:"الخطوة-3-استخدم-أداة-performance-في-chrome-للتفاصيل",text:"الخطوة 3: استخدم أداة Performance في Chrome للتفاصيل"},{depth:3,id:"الخطوة-4-حسن-وتحقق",text:"الخطوة 4: حسّن وتحقّق"},{depth:3,id:"الخطوة-5-قس-مرة-أخرى",text:"الخطوة 5: قِس مرة أخرى"},{depth:2,id:"تقنيات-تحليل-متقدمة",text:"تقنيات تحليل متقدّمة"},{depth:3,id:"محاكاة-أجهزة-أبطأ",text:"محاكاة أجهزة أبطأ"},{depth:3,id:"التحليل-في-بيئة-الإنتاج",text:"التحليل في بيئة الإنتاج"},{depth:3,id:"تحليل-الذاكرة",text:"تحليل الذاكرة"},{depth:2,id:"اختبار-الأداء-في-cicd",text:"اختبار الأداء في CI/CD"},{depth:2,id:"الخلاصات-الرئيسية",text:"الخلاصات الرئيسية"}],p=`<p>تحسين الأداء بلا قياس ليس إلا أمنيات مع خطوات إضافية. قد <em>تشعر</em> أن إعادة هيكلة ذلك المكوّن جعلت الأمور أسرع، لكن المشاعر لا تُنتج برمجيات موثوقة. وسواء كنت تتعقّب عمليات تصيير بطيئة أو تُثبت لأصحاب المصلحة أن جولة التحسين التي قمت بها كانت تستحقّ، فأنت بحاجة إلى بيانات حقيقية من أدوات حقيقية.</p>
<p>كان تنقيح أداء React في السابق مزيجًا من سجلات console وشيفرة قياس الوقت وتخمينات مدروسة. لم يعد الأمر كذلك. فبين أداة Profiler في React DevTools وتبويب Performance في Chrome وأدوات مخططات اللهب (flamegraph) الحديثة، يمكنك تحديد الموضع الذي يستهلك فيه تطبيقك الوقت بدقة — والأهم من ذلك، الموضع الذي يهدره فيه.</p>
<h2 id="أداة-profiler-في-react-devtools-محطتك-الأولى">أداة Profiler في React DevTools: محطتك الأولى</h2>
<p>صُمّمت <a href="https://react.dev/learn/react-developer-tools">أداة Profiler في React Developer Tools</a> خصيصًا لتطبيقات React، وينبغي أن تكون أداتك المفضّلة لفهم سلوك المكوّنات. فهي تُظهر لك أيّ المكوّنات صُيّرت، ولماذا صُيّرت، وكم استغرقت.</p>
<h3 id="البدء-مع-أداة-profiler">البدء مع أداة Profiler</h3>
<p>أولًا، ثبّت <a href="https://react.dev/learn/react-developer-tools">إضافة المتصفّح React Developer Tools</a>. بعد التثبيت، سترى تبويب «Profiler» في أدوات تطوير المتصفّح عندما تعرض تطبيق React.</p>
<p>إليك كيفية التقاط ملف تعريف للأداء:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Sample component that might have performance issues</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">ExpensiveList</span> = (<span class="hljs-params">{ items, filter }: { items: Item[]; filter: <span class="hljs-built_in">string</span> }</span>) =&gt; {
  <span class="hljs-comment">// ❌ This filtering happens on every render</span>
  <span class="hljs-keyword">const</span> filteredItems = items.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span>
    item.<span class="hljs-property">name</span>.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(filter.<span class="hljs-title function_">toLowerCase</span>()),
  );

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">expensiveCalculation</span> = (<span class="hljs-params"><span class="hljs-attr">item</span>: <span class="hljs-title class_">Item</span></span>) =&gt; {
    <span class="hljs-comment">// Simulate expensive work</span>
    <span class="hljs-keyword">let</span> result = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10000</span>; i++) {
      result += item.<span class="hljs-property">value</span> * <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>();
    }
    <span class="hljs-keyword">return</span> result;
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {filteredItems.map((item) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{item.name}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{expensiveCalculation(item)}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<p>لتحليل هذا المكوّن:</p>
<ol>
<li>افتح React DevTools وانقر تبويب «Profiler»</li>
<li>انقر زر التسجيل (الدائرة)</li>
<li>تفاعل مع تطبيقك (اكتب في عامل التصفية، ومرّر، وانقر الأزرار)</li>
<li>انقر لإيقاف التسجيل</li>
</ol>
<h3 id="قراءة-نتائج-profiler">قراءة نتائج Profiler</h3>
<p>تعرض أداة Profiler مخطط لهب (flamegraph) لشجرة مكوّناتك. يمثّل كل شريط مكوّنًا، ويُظهر العرض مدّة تصييره. إليك ما ينبغي أن تبحث عنه:</p>
<ul>
<li><strong>أشرطة عريضة</strong>: مكوّنات تستغرق وقتًا طويلًا في التصيير</li>
<li><strong>مكدّسات عالية</strong>: تسلسلات هرمية عميقة للمكوّنات قد تستفيد من التحسين</li>
<li><strong>عمليات إعادة تصيير متكرّرة</strong>: مكوّنات تتحدّث أكثر من اللازم</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>انقر على مكوّنات فردية في مخطط اللهب لترى لماذا صُيّرت. تشمل الأسباب الشائعة تغيّر الخصائص، وتحديثات الحالة، وإعادة تصيير المكوّن الأب.</p>
</blockquote>
<p>تعرض أداة Profiler أيضًا طريقة العرض «Ranked»، التي تُدرج المكوّنات بحسب مدّة التصيير. هذه كنز للعثور على أسوأ المذنبين لديك.</p>
<h3 id="فهم-سبب-تصيير-المكونات">فهم سبب تصيير المكوّنات</h3>
<p>لكل مكوّن، تخبرك أداة Profiler بدقة لماذا صُيّر:</p>
<ul>
<li><strong>تغيّر خُطّاف</strong>: تحديث خُطّاف <code>useState</code> أو <code>useReducer</code></li>
<li><strong>تغيّرت الخصائص</strong>: مرّر المكوّن الأب خصائص جديدة</li>
<li><strong>صُيّر المكوّن الأب</strong>: صُيّر المكوّن لأن أباه صُيّر</li>
<li><strong>تغيّرت الحالة</strong>: حُدِّثت حالة المكوّن نفسه</li>
</ul>
<pre><code class="language-typescript"><span class="hljs-comment">// Example: Debugging unnecessary re-renders</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">ProfileButton</span> = (<span class="hljs-params">{ user, onEdit }: { user: User; onEdit: () =&gt; <span class="hljs-built_in">void</span> }</span>) =&gt; {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;ProfileButton rendering...&#x27;</span>, { user, onEdit });

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onEdit}</span>&gt;</span>Edit {user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
};

<span class="hljs-comment">// Parent component</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">UserProfile</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [user, setUser] = <span class="hljs-title function_">useState</span>(<span class="hljs-comment">/* ... */</span>);

  <span class="hljs-comment">// ❌ This creates a new function on every render</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleEdit</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-comment">// edit logic</span>
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ProfileButton</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> <span class="hljs-attr">onEdit</span>=<span class="hljs-string">{handleEdit}</span> /&gt;</span></span>;
};
</code></pre>
<p>في أداة Profiler، سترى <code>ProfileButton</code> يُصيَّر والسبب «Props changed» — مع أن <code>user</code> لم يتغيّر فعليًا. فمن الجاني؟ دالة <code>handleEdit</code> التي يُعاد إنشاؤها عند كل عملية تصيير.</p>
<h2 id="تبويب-performance-في-chrome-الغوص-العميق">تبويب Performance في Chrome: الغوص العميق</h2>
<p>عندما تُظهر لك أداة Profiler في React DevTools <em>ما</em> هو بطيء لكنك تحتاج إلى فهم <em>لماذا</em>، يمنحك تبويب Performance في Chrome الصورة الكاملة. فهو يُظهر تنفيذ JavaScript، والتصيير، والرسم، وكل ما يجري في المتصفّح.</p>
<h3 id="تسجيل-ملف-تعريف-للأداء">تسجيل ملف تعريف للأداء</h3>
<ol>
<li>افتح Chrome DevTools (‏F12 أو Cmd+Option+I)</li>
<li>انتقل إلى تبويب «Performance»</li>
<li>انقر زر التسجيل</li>
<li>تفاعل مع تطبيقك لمدة 3-5 ثوانٍ</li>
<li>انقر للإيقاف</li>
</ol>
<blockquote>
<p><strong>تحذير</strong></p>
<p>قد تكون ملفات تعريف الأداء ضخمة. أبقِ التسجيلات قصيرة (3-10 ثوانٍ) وركّز على تفاعلات محدّدة.</p>
</blockquote>
<h3 id="قراءة-المخطط-الزمني">قراءة المخطط الزمني</h3>
<p>يعرض تبويب Performance عدة مسارات:</p>
<ul>
<li><strong>الخيط الرئيسي</strong>: تنفيذ JavaScript، بما في ذلك عمليات تصيير React</li>
<li><strong>المُركِّب (Compositor)</strong>: تركيب الطبقات والحركات</li>
<li><strong>GPU</strong>: عمليات مُسرَّعة بواسطة GPU</li>
<li><strong>الشبكة</strong>: تحميل الموارد</li>
</ul>
<p>ابحث عن:</p>
<ul>
<li><strong>المهام الطويلة</strong> (كتل صفراء/حمراء): JavaScript يعيق الخيط الرئيسي</li>
<li><strong>إرباك التخطيط (layout thrashing)</strong>: حسابات تخطيط متكرّرة</li>
<li><strong>جمع نفايات مفرط</strong>: ضغط على الذاكرة</li>
</ul>
<h3 id="العثور-على-عمل-react-في-المخطط-الزمني">العثور على عمل React في المخطط الزمني</h3>
<p>يظهر عمل React في المخطط الزمني للخيط الرئيسي. ابحث عن:</p>
<ul>
<li>استدعاءات دوال مثل <code>commitRoot</code> و<code>performWorkUntilDeadline</code></li>
<li>أسماء مكوّناتك في مكدّس الاستدعاءات</li>
<li>الوقت المستغرق في <code>ReactDOMRoot.render</code></li>
</ul>
<pre><code class="language-typescript"><span class="hljs-comment">// This component will show up clearly in Chrome&#x27;s timeline</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">SlowComponent</span> = (<span class="hljs-params">{ data }: { data: <span class="hljs-built_in">number</span>[] }</span>) =&gt; {
  <span class="hljs-keyword">const</span> [sortOrder, setSortOrder] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;asc&#x27;</span>);

  <span class="hljs-comment">// ❌ Expensive sort operation runs on every render</span>
  <span class="hljs-keyword">const</span> sortedData = data.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> (sortOrder === <span class="hljs-string">&#x27;asc&#x27;</span> ? a - b : b - a));

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setSortOrder(sortOrder === &#x27;asc&#x27; ? &#x27;desc&#x27; : &#x27;asc&#x27;)}&gt;
        Toggle sort
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      {sortedData.map((item, index) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span>&gt;</span>{item}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<p>في المخطط الزمني لأداة Performance، سترى كتلة طويلة من تنفيذ JavaScript عند النقر على زر الترتيب، مع ظهور <code>SlowComponent</code> بارزًا في مكدّس الاستدعاءات.</p>
<h2 id="واجهة-user-timing-api-علامات-أداء-مخصصة">واجهة User Timing API: علامات أداء مخصّصة</h2>
<p>تحتاج أحيانًا إلى قياس عمليات محدّدة لا تتماشى مع دورات تصيير React. تتيح لك واجهة User Timing API إضافة علامات مخصّصة إلى المخطط الزمني.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">DataProcessor</span> = (<span class="hljs-params">{ rawData }: { rawData: RawData[] }</span>) =&gt; {
  <span class="hljs-keyword">const</span> [processedData, setProcessedData] = useState&lt;<span class="hljs-title class_">ProcessedData</span>[]&gt;([]);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">processData</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-comment">// Mark the start of data processing</span>
      performance.<span class="hljs-title function_">mark</span>(<span class="hljs-string">&#x27;data-processing-start&#x27;</span>);

      <span class="hljs-keyword">const</span> processed = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">all</span>(
        rawData.<span class="hljs-title function_">map</span>(<span class="hljs-title function_">async</span> (item) =&gt; {
          performance.<span class="hljs-title function_">mark</span>(<span class="hljs-string">\`process-item-<span class="hljs-subst">\${item.id}</span>-start\`</span>);

          <span class="hljs-comment">// Simulate async processing</span>
          <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">processItem</span>(item);

          performance.<span class="hljs-title function_">mark</span>(<span class="hljs-string">\`process-item-<span class="hljs-subst">\${item.id}</span>-end\`</span>);
          performance.<span class="hljs-title function_">measure</span>(
            <span class="hljs-string">\`process-item-<span class="hljs-subst">\${item.id}</span>\`</span>,
            <span class="hljs-string">\`process-item-<span class="hljs-subst">\${item.id}</span>-start\`</span>,
            <span class="hljs-string">\`process-item-<span class="hljs-subst">\${item.id}</span>-end\`</span>,
          );

          <span class="hljs-keyword">return</span> result;
        }),
      );

      performance.<span class="hljs-title function_">mark</span>(<span class="hljs-string">&#x27;data-processing-end&#x27;</span>);
      performance.<span class="hljs-title function_">measure</span>(<span class="hljs-string">&#x27;data-processing&#x27;</span>, <span class="hljs-string">&#x27;data-processing-start&#x27;</span>, <span class="hljs-string">&#x27;data-processing-end&#x27;</span>);

      <span class="hljs-title function_">setProcessedData</span>(processed);
    };

    <span class="hljs-title function_">processData</span>();
  }, [rawData]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {processedData.map((item) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>{item.title}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<p>تظهر هذه العلامات والقياسات المخصّصة في تبويب Performance في Chrome وفي React DevTools معًا، ما يمنحك توقيتًا دقيقًا لعملياتك الخاصة.</p>
<h2 id="تنقيح-الأداء-في-الواقع-العملي">تنقيح الأداء في الواقع العملي</h2>
<p>لنمضِ خطوة بخطوة في تنقيح مشكلة أداء حقيقية. تخيّل أن لديك لوحة معلومات فيها عدة عناصر واجهة تشعر بأنها بطيئة.</p>
<h3 id="الخطوة-1-حدد-منطقة-المشكلة">الخطوة 1: حدّد منطقة المشكلة</h3>
<p>ابدأ بأداة Profiler في React DevTools:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Dashboard component that might be problematic</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">Dashboard</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [widgets, setWidgets] = useState&lt;<span class="hljs-title class_">Widget</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [selectedWidget, setSelectedWidget] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;dashboard&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">WidgetList</span> <span class="hljs-attr">widgets</span>=<span class="hljs-string">{widgets}</span> <span class="hljs-attr">selectedWidget</span>=<span class="hljs-string">{selectedWidget}</span> <span class="hljs-attr">onSelect</span>=<span class="hljs-string">{setSelectedWidget}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">WidgetDetails</span> <span class="hljs-attr">widget</span>=<span class="hljs-string">{widgets.find((w)</span> =&gt;</span> w.id === selectedWidget)} /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">WidgetChart</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{/*</span> <span class="hljs-attr">expensive</span> <span class="hljs-attr">calculation</span> */} /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<p>سجّل ملف تعريف أثناء تحديد عناصر واجهة مختلفة. قد ترى <code>WidgetChart</code> يستغرق 500 مللي ثانية في التصيير في كل مرة — حتى عندما لا يؤثّر عنصر الواجهة المحدّد في بيانات المخطط.</p>
<h3 id="الخطوة-2-افهم-لماذا-يصير">الخطوة 2: افهم لماذا يُصيَّر</h3>
<p>انظر إلى معلومات «Why did this render?» في أداة Profiler. قد تكتشف ما يلي:</p>
<ul>
<li>يُصيَّر <code>WidgetChart</code> لأن أباه <code>Dashboard</code> يُصيَّر</li>
<li>يُصيَّر <code>Dashboard</code> لأن حالة <code>selectedWidget</code> تتغيّر</li>
<li>لا يستخدم <code>WidgetChart</code> فعليًا بيانات <code>selectedWidget</code></li>
</ul>
<h3 id="الخطوة-3-استخدم-أداة-performance-في-chrome-للتفاصيل">الخطوة 3: استخدم أداة Performance في Chrome للتفاصيل</h3>
<p>انتقل إلى تبويب Performance في Chrome لترى ما يفعله <code>WidgetChart</code> فعليًا خلال تلك الـ 500 مللي ثانية:</p>
<ul>
<li>هل هو حساب في JavaScript؟</li>
<li>عمل تخطيط ورسم؟</li>
<li>طلبات شبكة؟</li>
</ul>
<p>قد تجد أنه يعيد حساب بيانات مخطط لم تتغيّر.</p>
<h3 id="الخطوة-4-حسن-وتحقق">الخطوة 4: حسّن وتحقّق</h3>
<p>طبّق تحسينات مثل <code>React.memo</code> أو <code>useMemo</code> أو <code>useCallback</code>:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Optimized version</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">WidgetChart</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-function">(<span class="hljs-params">{ data }: { data: ChartData[] }</span>) =&gt;</span> {
  <span class="hljs-comment">// Chart rendering logic</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{/* chart implementation */}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
});

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Dashboard</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [widgets, setWidgets] = useState&lt;<span class="hljs-title class_">Widget</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [selectedWidget, setSelectedWidget] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// ✅ Memoize expensive chart data calculation</span>
  <span class="hljs-keyword">const</span> chartData = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">calculateChartData</span>(widgets), [widgets]);

  <span class="hljs-comment">// ✅ Memoize callback to prevent WidgetList re-renders</span>
  <span class="hljs-keyword">const</span> handleSelect = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
    <span class="hljs-title function_">setSelectedWidget</span>(id);
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;dashboard&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">WidgetList</span> <span class="hljs-attr">widgets</span>=<span class="hljs-string">{widgets}</span> <span class="hljs-attr">selectedWidget</span>=<span class="hljs-string">{selectedWidget}</span> <span class="hljs-attr">onSelect</span>=<span class="hljs-string">{handleSelect}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">WidgetDetails</span> <span class="hljs-attr">widget</span>=<span class="hljs-string">{widgets.find((w)</span> =&gt;</span> w.id === selectedWidget)} /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">WidgetChart</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{chartData}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h3 id="الخطوة-5-قس-مرة-أخرى">الخطوة 5: قِس مرة أخرى</h3>
<p>سجّل ملف تعريف آخر لتتأكّد أن تحسيناتك نجحت. ينبغي أن ترى:</p>
<ul>
<li>لم يعد <code>WidgetChart</code> يُصيَّر عند تحديد عناصر الواجهة</li>
<li>انخفاض زمن التفاعل الإجمالي</li>
<li>يُظهر مخطط اللهب عملًا أقل</li>
</ul>
<h2 id="تقنيات-تحليل-متقدمة">تقنيات تحليل متقدّمة</h2>
<h3 id="محاكاة-أجهزة-أبطأ">محاكاة أجهزة أبطأ</h3>
<p>يتيح لك Chrome خفض أداء المعالج لمحاكاة أجهزة أبطأ:</p>
<ol>
<li>افتح تبويب Performance</li>
<li>انقر أيقونة الترس</li>
<li>اضبط المعالج على «4x slowdown» أو «6x slowdown»</li>
</ol>
<p>يكشف هذا عن مشكلات أداء قد لا تكون واضحة على جهاز التطوير لديك.</p>
<h3 id="التحليل-في-بيئة-الإنتاج">التحليل في بيئة الإنتاج</h3>
<p>تعمل أداة Profiler في React DevTools مع عمليات البناء الإنتاجية، لكن عليك تمكينها صراحةً:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Only enable profiling in development or staging</span>
<span class="hljs-keyword">const</span> shouldProfile =
  process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> !== <span class="hljs-string">&#x27;production&#x27;</span> || process.<span class="hljs-property">env</span>.<span class="hljs-property">REACT_APP_ENABLE_PROFILING</span> === <span class="hljs-string">&#x27;true&#x27;</span>;

<span class="hljs-keyword">if</span> (shouldProfile) {
  <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;react-dom/profiling&#x27;</span>).<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">{ unstable_trace }</span>) =&gt;</span> {
    <span class="hljs-title function_">unstable_trace</span>(<span class="hljs-string">&#x27;App render&#x27;</span>, performance.<span class="hljs-title function_">now</span>(), <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Your app rendering logic</span>
    });
  });
}
</code></pre>
<blockquote>
<p><strong>خطر</strong></p>
<p>يضيف التحليل عبئًا إضافيًا. لا تُبقِه ممكّنًا في بيئة الإنتاج إلا إذا كنت تنقّح بنشاط.</p>
</blockquote>
<h3 id="تحليل-الذاكرة">تحليل الذاكرة</h3>
<p>الأداء ليس مسألة سرعة تصيير فقط — فتسريبات الذاكرة قد تجعل تطبيقك أبطأ تدريجيًا. استخدم تبويب Memory في Chrome من أجل:</p>
<ul>
<li>أخذ لقطات لذاكرة الكومة (heap) قبل التفاعلات وبعدها</li>
<li>مقارنة اللقطات للعثور على تسريبات الذاكرة</li>
<li>تحليل التخصيصات لترى ما الذي يُنشئ الكائنات</li>
</ul>
<pre><code class="language-typescript"><span class="hljs-comment">// Common memory leak pattern</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">LeakyComponent</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> interval = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// This interval keeps running even after component unmounts</span>
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Still running...&#x27;</span>);
    }, <span class="hljs-number">1000</span>);

    <span class="hljs-comment">// ❌ Missing cleanup</span>
    <span class="hljs-comment">// return () =&gt; clearInterval(interval);</span>
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Component content<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
};
</code></pre>
<h2 id="اختبار-الأداء-في-cicd">اختبار الأداء في CI/CD</h2>
<p>لا تنتظر أن يبلّغ المستخدمون عن تراجع في الأداء. ادمج اختبار الأداء في عملية البناء لديك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Performance test using Lighthouse CI</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">performanceTest</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> lighthouse = <span class="hljs-keyword">await</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;lighthouse&#x27;</span>);
  <span class="hljs-keyword">const</span> puppeteer = <span class="hljs-keyword">await</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&#x27;puppeteer&#x27;</span>);

  <span class="hljs-keyword">const</span> browser = <span class="hljs-keyword">await</span> puppeteer.<span class="hljs-title function_">launch</span>();
  <span class="hljs-keyword">const</span> page = <span class="hljs-keyword">await</span> browser.<span class="hljs-title function_">newPage</span>();

  <span class="hljs-keyword">const</span> runnerResult = <span class="hljs-keyword">await</span> <span class="hljs-title function_">lighthouse</span>(<span class="hljs-string">&#x27;http://localhost:3000&#x27;</span>, {
    <span class="hljs-attr">port</span>: <span class="hljs-number">9222</span>,
    <span class="hljs-attr">output</span>: <span class="hljs-string">&#x27;json&#x27;</span>,
    <span class="hljs-attr">onlyCategories</span>: [<span class="hljs-string">&#x27;performance&#x27;</span>],
  });

  <span class="hljs-keyword">const</span> score = runnerResult.<span class="hljs-property">score</span>;

  <span class="hljs-keyword">if</span> (score &lt; <span class="hljs-number">90</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Performance score too low: <span class="hljs-subst">\${score}</span>\`</span>);
  }

  <span class="hljs-keyword">await</span> browser.<span class="hljs-title function_">close</span>();
};
</code></pre>
<h2 id="الخلاصات-الرئيسية">الخلاصات الرئيسية</h2>
<p>تحسين الأداء عملية تكرارية: قِس، حسّن، تحقّق، ثم كرّر. إليك صندوق أدواتك:</p>
<ol>
<li><strong>أداة Profiler في React DevTools</strong>: ابدأ من هنا للحصول على رؤى على مستوى المكوّنات</li>
<li><strong>تبويب Performance في Chrome</strong>: غوص عميق في سلوك المتصفّح</li>
<li><strong>واجهة User Timing API</strong>: أضف قياسات مخصّصة لعمليات محدّدة</li>
<li><strong>تحليل الذاكرة</strong>: لا تنسَ تسريبات الذاكرة</li>
<li><strong>الاختبار الآلي</strong>: امنع التراجع بدمج CI/CD</li>
</ol>
<p>تذكّر: قد يكون التحسين المبكر أصل كل الشرور، لكن غياب التحسين أصل كل إحباط لدى المستخدمين. استخدم هذه الأدوات للعثور على نقاط الاختناق الحقيقية، وأصلحها بثقة، وقدّم تجارب أسرع سيلاحظها المستخدمون فعلًا.</p>
<p>في المرة القادمة التي يسألك فيها أحد «هل صار أسرع الآن؟»، ستكون لديك بيانات بدل الآمال والأحلام.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:e,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,p as html,l as slug,t as title};
