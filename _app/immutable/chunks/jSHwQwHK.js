const s="kinney",a="react-performance",n="أداء React",l="memory-management-deep-dive",p="إدارة الذاكرة بعمق",e=[{depth:2,id:"فهم-إدارة-الذاكرة-في-javascript",text:"فهم إدارة الذاكرة في JavaScript"},{depth:3,id:"جامع-المهملات",text:"جامع المهملات"},{depth:2,id:"مصادر-تسربات-الذاكرة-في-معمارية-react",text:"مصادر تسرّبات الذاكرة في معمارية React"},{depth:3,id:"اعتبارات-ذاكرة-خاصة-بـ-react",text:"اعتبارات ذاكرة خاصة بـ React"},{depth:3,id:"أنماط-ذاكرة-الإغلاقات",text:"أنماط ذاكرة الإغلاقات"},{depth:2,id:"أنماط-متقدمة-لتحسين-الذاكرة",text:"أنماط متقدّمة لتحسين الذاكرة"},{depth:3,id:"weakmap-لبيانات-المكون-الوصفية",text:"WeakMap لبيانات المكوّن الوصفية"},{depth:3,id:"تجميع-الكائنات-للتخصيصات-المتكررة",text:"تجميع الكائنات للتخصيصات المتكرّرة"},{depth:3,id:"إدارة-حالة-فعالة-في-استهلاك-الذاكرة",text:"إدارة حالة فعّالة في استهلاك الذاكرة"},{depth:2,id:"تنميط-الذاكرة-وكشفها",text:"تنميط الذاكرة وكشفها"},{depth:3,id:"استخدام-منمط-ذاكرة-chrome-devtools",text:"استخدام مُنمِّط ذاكرة Chrome DevTools"},{depth:3,id:"الكشف-الآلي-عن-تسربات-الذاكرة",text:"الكشف الآلي عن تسرّبات الذاكرة"},{depth:3,id:"لقطات-الذاكرة-للاختبار",text:"لقطات الذاكرة للاختبار"},{depth:2,id:"إدارة-الذاكرة-في-الإنتاج",text:"إدارة الذاكرة في الإنتاج"},{depth:3,id:"تنفيذ-التعامل-مع-ضغط-الذاكرة",text:"تنفيذ التعامل مع ضغط الذاكرة"},{depth:3,id:"تخزين-مؤقت-واع-بالذاكرة",text:"تخزين مؤقت واعٍ بالذاكرة"},{depth:2,id:"قائمة-أفضل-الممارسات",text:"قائمة أفضل الممارسات"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],t=`<p>بنيت تطبيق React جميلًا. أحبّه المستخدمون. ثم بدأت تذاكر الدعم تتوافد: «يصبح التطبيق أبطأ مع الوقت.» «انهار تبويب المتصفّح لديّ.» «إنه يستهلك 2 غيغابايت من الذاكرة العشوائية!» هل يبدو هذا مألوفًا؟ أهلًا بك في عالم إدارة ذاكرة JavaScript، حيث ينشئ حتى أفضل المطوّرين بالخطأ تسرّبات ذاكرة تخنق تطبيقاتهم ببطء.</p>
<p>وإليك المشكلة: نموذج React التصريحي يجعل من السهل نسيان الذاكرة. تُركَّب المكوّنات، وتُفكَّك، وتُعاد تصييرها… لكن ماذا عن كل مستمعات الأحداث والمؤقّتات والاشتراكات والإغلاقات التي أنشأتها على الطريق؟ إنها ما زالت هناك، تحتفظ بالمراجع، وتمنع جمع المهملات، وتستهلك ذاكرة المستخدمين ببطء.</p>
<p>لنغصّ في أعماق كيفية عمل الذاكرة في JavaScript وReact، وكيفية تحديد التسرّبات وإصلاحها، وكيفية بناء تطبيقات تعمل أيامًا دون تدهور.</p>
<h2 id="فهم-إدارة-الذاكرة-في-javascript">فهم إدارة الذاكرة في JavaScript</h2>
<p>قبل أن نصلح مشكلات الذاكرة، علينا أن نفهم كيف تدير JavaScript الذاكرة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">MemoryLifecycle</span> {
  <span class="hljs-attr">allocation</span>: <span class="hljs-string">&#x27;automatic&#x27;</span>;
  <span class="hljs-attr">usage</span>: <span class="hljs-string">&#x27;tracked by references&#x27;</span>;
  <span class="hljs-attr">deallocation</span>: <span class="hljs-string">&#x27;garbage collection&#x27;</span>;
}

<span class="hljs-comment">// Memory allocation happens automatically</span>
<span class="hljs-keyword">const</span> user = { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span> }; <span class="hljs-comment">// Allocates memory for object</span>
<span class="hljs-keyword">const</span> numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]; <span class="hljs-comment">// Allocates memory for array</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">handler</span> = (<span class="hljs-params"></span>) =&gt; {}; <span class="hljs-comment">// Allocates memory for function</span>

<span class="hljs-comment">// Memory is freed when no longer referenced</span>
<span class="hljs-keyword">let</span> data = { <span class="hljs-attr">large</span>: <span class="hljs-string">&#x27;dataset&#x27;</span> };
data = <span class="hljs-literal">null</span>; <span class="hljs-comment">// Original object can now be garbage collected</span>
</code></pre>
<h3 id="جامع-المهملات">جامع المهملات</h3>
<p>تستخدم JavaScript جمع المهملات بالتحديد والكنس (mark-and-sweep):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">GarbageCollectionProcess</span> {
  <span class="hljs-attr">markPhase</span>: <span class="hljs-string">&#x27;identify reachable objects from roots&#x27;</span>;
  <span class="hljs-attr">sweepPhase</span>: <span class="hljs-string">&#x27;free memory of unreachable objects&#x27;</span>;
  <span class="hljs-attr">roots</span>: [<span class="hljs-string">&#x27;global object&#x27;</span>, <span class="hljs-string">&#x27;currently executing stack&#x27;</span>, <span class="hljs-string">&#x27;DOM references&#x27;</span>];
}

<span class="hljs-comment">// Objects reachable from roots stay in memory</span>
<span class="hljs-keyword">const</span> globalRef = { <span class="hljs-attr">keepMe</span>: <span class="hljs-literal">true</span> }; <span class="hljs-comment">// Root reference</span>

<span class="hljs-keyword">function</span> <span class="hljs-title function_">createLeak</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> localData = { <span class="hljs-attr">temporary</span>: <span class="hljs-literal">true</span> };

  <span class="hljs-comment">// ❌ Creates a leak - global reference to local data</span>
  <span class="hljs-variable language_">window</span>.<span class="hljs-property">leaked</span> = localData;

  <span class="hljs-comment">// ✅ No leak - local data can be collected</span>
  <span class="hljs-keyword">const</span> isolated = { <span class="hljs-attr">temporary</span>: <span class="hljs-literal">true</span> };
  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}
</code></pre>
<h2 id="مصادر-تسربات-الذاكرة-في-معمارية-react">مصادر تسرّبات الذاكرة في معمارية React</h2>
<p>تُنشئ دورة حياة مكوّنات React وخُطّافاتها أنماطًا محدّدة تحدث فيها تسرّبات الذاكرة عادةً. ولمعرفة سير عمل الكشف والتنقيح العملي، راجع <a href="https://stevekinney.com/courses/react-performance/memory-leak-detection">كشف تسرّبات الذاكرة</a>.</p>
<h3 id="اعتبارات-ذاكرة-خاصة-بـ-react">اعتبارات ذاكرة خاصة بـ React</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// React&#x27;s reference management challenges</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ReactMemoryConsiderations</span> {
  <span class="hljs-attr">componentLifecycle</span>: <span class="hljs-string">&#x27;mount → update → unmount&#x27;</span>;
  <span class="hljs-attr">closureCapture</span>: <span class="hljs-string">&#x27;hooks capture variables from render scope&#x27;</span>;
  <span class="hljs-attr">referenceStability</span>: <span class="hljs-string">&#x27;new objects created on every render&#x27;</span>;
  <span class="hljs-attr">effectCleanup</span>: <span class="hljs-string">&#x27;manual cleanup required for side effects&#x27;</span>;
}

<span class="hljs-comment">// Common React patterns that affect memory</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">MemoryPatterns</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// ✅ Stable references reduce memory pressure</span>
  <span class="hljs-keyword">const</span> stableCallback = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Function created once, reused across renders</span>
  }, []);

  <span class="hljs-comment">// ❌ New object every render</span>
  <span class="hljs-keyword">const</span> unstableStyle = { <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;red&#x27;</span>, <span class="hljs-attr">margin</span>: <span class="hljs-number">10</span> };

  <span class="hljs-comment">// ✅ Stable style object</span>
  <span class="hljs-keyword">const</span> stableStyle = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> ({
    <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;red&#x27;</span>,
    <span class="hljs-attr">margin</span>: <span class="hljs-number">10</span>
  }), []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{stableStyle}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{stableCallback}</span> /&gt;</span></span>;
};
</code></pre>
<h3 id="أنماط-ذاكرة-الإغلاقات">أنماط ذاكرة الإغلاقات</h3>
<p>فهم كيفية تفاعل الإغلاقات مع دورات التصيير في React:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Closure scope and memory implications</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ClosureMemoryExample</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">data</span>: <span class="hljs-title class_">LargeDataset</span> }&gt; = <span class="hljs-function">(<span class="hljs-params">{ data }</span>) =&gt;</span> {
  <span class="hljs-comment">// ❌ Closure captures entire props object</span>
  <span class="hljs-keyword">const</span> processData = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> data.<span class="hljs-property">items</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> <span class="hljs-title function_">transformItem</span>(item));
  }, [data]); <span class="hljs-comment">// Entire data object retained</span>

  <span class="hljs-comment">// ✅ Extract minimal closure scope</span>
  <span class="hljs-keyword">const</span> items = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> data.<span class="hljs-property">items</span>, [data.<span class="hljs-property">items</span>]);
  <span class="hljs-keyword">const</span> processDataOptimized = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> items.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> <span class="hljs-title function_">transformItem</span>(item));
  }, [items]); <span class="hljs-comment">// Only items array retained</span>

  <span class="hljs-comment">// ✅ Even better: use refs for large stable data</span>
  <span class="hljs-keyword">const</span> dataRef = <span class="hljs-title function_">useRef</span>(data);
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> { dataRef.<span class="hljs-property">current</span> = data; }, [data]);

  <span class="hljs-keyword">const</span> processWithRef = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> dataRef.<span class="hljs-property">current</span>.<span class="hljs-property">items</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> <span class="hljs-title function_">transformItem</span>(item));
  }, []); <span class="hljs-comment">// No closure capture at all</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ProcessedList</span> <span class="hljs-attr">processor</span>=<span class="hljs-string">{processWithRef}</span> /&gt;</span></span>;
};
</code></pre>
<h2 id="أنماط-متقدمة-لتحسين-الذاكرة">أنماط متقدّمة لتحسين الذاكرة</h2>
<h3 id="weakmap-لبيانات-المكون-الوصفية">WeakMap لبيانات المكوّن الوصفية</h3>
<p>استخدم WeakMap للبيانات الوصفية التي ينبغي أن تُجمع مع المكوّنات:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Component metadata that doesn&#x27;t prevent GC</span>
<span class="hljs-keyword">const</span> componentMetadata = <span class="hljs-keyword">new</span> <span class="hljs-title class_">WeakMap</span>&lt;<span class="hljs-built_in">object</span>, <span class="hljs-title class_">Metadata</span>&gt;();

<span class="hljs-keyword">const</span> <span class="hljs-title class_">TrackedComponent</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">Props</span>&gt; = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> componentRef = <span class="hljs-title function_">useRef</span>({});

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Metadata will be GC&#x27;d when component unmounts</span>
    componentMetadata.<span class="hljs-title function_">set</span>(componentRef.<span class="hljs-property">current</span>, {
      <span class="hljs-attr">mountTime</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
      <span class="hljs-attr">renderCount</span>: <span class="hljs-number">0</span>,
    });

    <span class="hljs-comment">// No need to manually clean WeakMap on unmount</span>
    <span class="hljs-comment">// Entry will be GC&#x27;d automatically</span>
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{/* Component content */}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
};
</code></pre>
<h3 id="تجميع-الكائنات-للتخصيصات-المتكررة">تجميع الكائنات للتخصيصات المتكرّرة</h3>
<p>أعد استخدام الكائنات بدل إنشاء كائنات جديدة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">ObjectPool</span>&lt;T&gt; {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">pool</span>: T[] = [];
  <span class="hljs-keyword">private</span> <span class="hljs-attr">factory</span>: <span class="hljs-function">() =&gt;</span> T;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">reset</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">obj</span>: T</span>) =&gt;</span> <span class="hljs-built_in">void</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">factory</span>: () =&gt; T, <span class="hljs-attr">reset</span>: (obj: T) =&gt; <span class="hljs-built_in">void</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">factory</span> = factory;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">reset</span> = reset;
  }

  <span class="hljs-title function_">acquire</span>(): T {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">pool</span>.<span class="hljs-title function_">pop</span>() || <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">factory</span>();
  }

  <span class="hljs-title function_">release</span>(<span class="hljs-attr">obj</span>: T): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">reset</span>(obj);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">pool</span>.<span class="hljs-title function_">push</span>(obj);
  }
}

<span class="hljs-comment">// Use in React component</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ParticleSystem</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> particlePool = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span>
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">ObjectPool</span>&lt;<span class="hljs-title class_">Particle</span>&gt;(
      <span class="hljs-function">() =&gt;</span> ({ <span class="hljs-attr">x</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">vx</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">vy</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">active</span>: <span class="hljs-literal">false</span> }),
      <span class="hljs-function">(<span class="hljs-params">p</span>) =&gt;</span> { p.<span class="hljs-property">active</span> = <span class="hljs-literal">false</span>; }
    ), []
  );

  <span class="hljs-keyword">const</span> spawnParticle = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> particle = particlePool.<span class="hljs-title function_">acquire</span>();
    particle.<span class="hljs-property">x</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">100</span>;
    particle.<span class="hljs-property">y</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">100</span>;
    particle.<span class="hljs-property">active</span> = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">return</span> particle;
  }, [particlePool]);

  <span class="hljs-comment">// Return particles to pool when done</span>
  <span class="hljs-keyword">const</span> destroyParticle = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">particle</span>: <span class="hljs-title class_">Particle</span></span>) =&gt;</span> {
    particlePool.<span class="hljs-title function_">release</span>(particle);
  }, [particlePool]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Canvas</span> <span class="hljs-attr">onSpawn</span>=<span class="hljs-string">{spawnParticle}</span> <span class="hljs-attr">onDestroy</span>=<span class="hljs-string">{destroyParticle}</span> /&gt;</span></span>;
};
</code></pre>
<h3 id="إدارة-حالة-فعالة-في-استهلاك-الذاكرة">إدارة حالة فعّالة في استهلاك الذاكرة</h3>
<p>قلّل البصمة الذاكرية للحالة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Storing entire objects in state</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">InefficientState</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> [users, setUsers] = useState&lt;<span class="hljs-title class_">User</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [selectedUser, setSelectedUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// Duplicates user data in memory</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserList</span> <span class="hljs-attr">users</span>=<span class="hljs-string">{users}</span> <span class="hljs-attr">selected</span>=<span class="hljs-string">{selectedUser}</span> /&gt;</span></span>;
};

<span class="hljs-comment">// ✅ Store IDs and derive data</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">EfficientState</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> [userMap] = <span class="hljs-title function_">useState</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">User</span>&gt;());
  <span class="hljs-keyword">const</span> [selectedId, setSelectedId] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> selectedUser = selectedId ? userMap.<span class="hljs-title function_">get</span>(selectedId) : <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserList</span> <span class="hljs-attr">users</span>=<span class="hljs-string">{Array.from(userMap.values())}</span> <span class="hljs-attr">selected</span>=<span class="hljs-string">{selectedUser}</span> /&gt;</span></span>;
};
</code></pre>
<h2 id="تنميط-الذاكرة-وكشفها">تنميط الذاكرة وكشفها</h2>
<h3 id="استخدام-منمط-ذاكرة-chrome-devtools">استخدام مُنمِّط ذاكرة Chrome DevTools</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Mark important operations for profiling</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ProfiledOperation</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> performOperation = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Mark in timeline</span>
    performance.<span class="hljs-title function_">mark</span>(<span class="hljs-string">&#x27;operation-start&#x27;</span>);

    <span class="hljs-comment">// Do expensive operation</span>
    <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">expensiveOperation</span>();

    performance.<span class="hljs-title function_">mark</span>(<span class="hljs-string">&#x27;operation-end&#x27;</span>);
    performance.<span class="hljs-title function_">measure</span>(<span class="hljs-string">&#x27;operation&#x27;</span>, <span class="hljs-string">&#x27;operation-start&#x27;</span>, <span class="hljs-string">&#x27;operation-end&#x27;</span>);

    <span class="hljs-comment">// Log for analysis</span>
    <span class="hljs-keyword">const</span> measure = performance.<span class="hljs-title function_">getEntriesByName</span>(<span class="hljs-string">&#x27;operation&#x27;</span>)[<span class="hljs-number">0</span>];
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Operation took <span class="hljs-subst">\${measure.duration}</span>ms\`</span>);

    <span class="hljs-keyword">return</span> result;
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{performOperation}</span>&gt;</span>Run Operation<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
};
</code></pre>
<h3 id="الكشف-الآلي-عن-تسربات-الذاكرة">الكشف الآلي عن تسرّبات الذاكرة</h3>
<p>ابنِ مراقبة الذاكرة في تطبيقك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">MemoryMonitor</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">baseline</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">threshold</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">checkInterval</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">intervalId</span>?: <span class="hljs-title class_">NodeJS</span>.<span class="hljs-property">Timeout</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">thresholdMB</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">50</span>, <span class="hljs-attr">checkIntervalMs</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">30000</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">threshold</span> = thresholdMB * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">checkInterval</span> = checkIntervalMs;
  }

  <span class="hljs-title function_">start</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (!performance.<span class="hljs-property">memory</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">&#x27;Memory API not available&#x27;</span>);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">baseline</span> = performance.<span class="hljs-property">memory</span>.<span class="hljs-property">usedJSHeapSize</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">intervalId</span> = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> current = performance.<span class="hljs-property">memory</span>.<span class="hljs-property">usedJSHeapSize</span>;
      <span class="hljs-keyword">const</span> increase = current - <span class="hljs-variable language_">this</span>.<span class="hljs-property">baseline</span>;

      <span class="hljs-keyword">if</span> (increase &gt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">threshold</span>) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`Memory leak detected! Increase: <span class="hljs-subst">\${(increase / <span class="hljs-number">1024</span> / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">2</span>)}</span>MB\`</span>);
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">reportLeak</span>(increase);
      }
    }, <span class="hljs-variable language_">this</span>.<span class="hljs-property">checkInterval</span>);
  }

  <span class="hljs-title function_">stop</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">intervalId</span>) {
      <span class="hljs-built_in">clearInterval</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">intervalId</span>);
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">reportLeak</span>(<span class="hljs-params"><span class="hljs-attr">bytes</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-comment">// Send to monitoring service</span>
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/metrics/memory-leak&#x27;</span>, {
      <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({
        <span class="hljs-attr">increase</span>: bytes,
        <span class="hljs-attr">current</span>: performance.<span class="hljs-property">memory</span>.<span class="hljs-property">usedJSHeapSize</span>,
        <span class="hljs-attr">limit</span>: performance.<span class="hljs-property">memory</span>.<span class="hljs-property">jsHeapSizeLimit</span>,
        <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>()
      })
    });
  }
}

<span class="hljs-comment">// Use in your app</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">App</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> monitor = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MemoryMonitor</span>();
    monitor.<span class="hljs-title function_">start</span>();

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> monitor.<span class="hljs-title function_">stop</span>();
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Router</span> /&gt;</span></span>;
};
</code></pre>
<h3 id="لقطات-الذاكرة-للاختبار">لقطات الذاكرة للاختبار</h3>
<p>ادمج اختبار الذاكرة في مجموعة اختباراتك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// memory.test.ts</span>
<span class="hljs-keyword">import</span> { test, expect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@playwright/test&#x27;</span>;

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;should not leak memory on navigation&#x27;</span>, <span class="hljs-title function_">async</span> ({ page }) =&gt; {
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/&#x27;</span>);

  <span class="hljs-comment">// Take initial snapshot</span>
  <span class="hljs-keyword">const</span> initialMemory = <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">evaluate</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (performance.<span class="hljs-property">memory</span>) {
      <span class="hljs-keyword">return</span> performance.<span class="hljs-property">memory</span>.<span class="hljs-property">usedJSHeapSize</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
  });

  <span class="hljs-comment">// Navigate through app</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">click</span>(<span class="hljs-string">&#x27;[data-testid=&quot;next-page&quot;]&#x27;</span>);
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">waitForLoadState</span>(<span class="hljs-string">&#x27;networkidle&#x27;</span>);
    <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goBack</span>();
  }

  <span class="hljs-comment">// Force garbage collection (if available in test environment)</span>
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">evaluate</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">window</span>.<span class="hljs-property">gc</span>) <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">gc</span>();
  });

  <span class="hljs-comment">// Check final memory</span>
  <span class="hljs-keyword">const</span> finalMemory = <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">evaluate</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (performance.<span class="hljs-property">memory</span>) {
      <span class="hljs-keyword">return</span> performance.<span class="hljs-property">memory</span>.<span class="hljs-property">usedJSHeapSize</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
  });

  <span class="hljs-comment">// Allow for some growth but flag significant leaks</span>
  <span class="hljs-keyword">const</span> growth = finalMemory - initialMemory;
  <span class="hljs-keyword">const</span> growthMB = growth / <span class="hljs-number">1024</span> / <span class="hljs-number">1024</span>;

  <span class="hljs-title function_">expect</span>(growthMB).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">10</span>); <span class="hljs-comment">// Less than 10MB growth</span>
});
</code></pre>
<h2 id="إدارة-الذاكرة-في-الإنتاج">إدارة الذاكرة في الإنتاج</h2>
<h3 id="تنفيذ-التعامل-مع-ضغط-الذاكرة">تنفيذ التعامل مع ضغط الذاكرة</h3>
<p>استجب لضغط الذاكرة في المتصفّح:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">useMemoryPressure</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [pressure, setPressure] = useState&lt;<span class="hljs-string">&#x27;low&#x27;</span> | <span class="hljs-string">&#x27;moderate&#x27;</span> | <span class="hljs-string">&#x27;critical&#x27;</span>&gt;(<span class="hljs-string">&#x27;low&#x27;</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!(<span class="hljs-string">&#x27;memory&#x27;</span> <span class="hljs-keyword">in</span> performance)) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">checkPressure</span> = (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-keyword">const</span> used = performance.<span class="hljs-property">memory</span>.<span class="hljs-property">usedJSHeapSize</span>;
      <span class="hljs-keyword">const</span> limit = performance.<span class="hljs-property">memory</span>.<span class="hljs-property">jsHeapSizeLimit</span>;
      <span class="hljs-keyword">const</span> usage = used / limit;

      <span class="hljs-keyword">if</span> (usage &gt; <span class="hljs-number">0.9</span>) {
        <span class="hljs-title function_">setPressure</span>(<span class="hljs-string">&#x27;critical&#x27;</span>);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (usage &gt; <span class="hljs-number">0.7</span>) {
        <span class="hljs-title function_">setPressure</span>(<span class="hljs-string">&#x27;moderate&#x27;</span>);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-title function_">setPressure</span>(<span class="hljs-string">&#x27;low&#x27;</span>);
      }
    };

    <span class="hljs-keyword">const</span> interval = <span class="hljs-built_in">setInterval</span>(checkPressure, <span class="hljs-number">5000</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearInterval</span>(interval);
  }, []);

  <span class="hljs-keyword">return</span> pressure;
};

<span class="hljs-keyword">const</span> <span class="hljs-title class_">AdaptiveComponent</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> pressure = <span class="hljs-title function_">useMemoryPressure</span>();

  <span class="hljs-comment">// Adapt behavior based on memory pressure</span>
  <span class="hljs-keyword">const</span> renderQuality = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">switch</span> (pressure) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;critical&#x27;</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;low&#x27;</span>; <span class="hljs-comment">// Minimal features</span>
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;moderate&#x27;</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;medium&#x27;</span>; <span class="hljs-comment">// Reduced features</span>
      <span class="hljs-attr">default</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;high&#x27;</span>; <span class="hljs-comment">// Full features</span>
    }
  }, [pressure]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {renderQuality === &#x27;high&#x27; &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">RichVisualizations</span> /&gt;</span>}
      {renderQuality === &#x27;medium&#x27; &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">BasicVisualizations</span> /&gt;</span>}
      {renderQuality === &#x27;low&#x27; &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">TextOnly</span> /&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h3 id="تخزين-مؤقت-واع-بالذاكرة">تخزين مؤقت واعٍ بالذاكرة</h3>
<p>نفّذ ذاكرات مؤقتة تستجيب لضغط الذاكرة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">MemoryAwareCache</span>&lt;K, V&gt; {
  <span class="hljs-keyword">private</span> cache = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;K, { <span class="hljs-attr">value</span>: V; <span class="hljs-attr">size</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">lastAccess</span>: <span class="hljs-built_in">number</span> }&gt;();
  <span class="hljs-keyword">private</span> totalSize = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">maxSize</span>: <span class="hljs-built_in">number</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">maxSizeMB</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">50</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">maxSize</span> = maxSizeMB * <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>;
  }

  <span class="hljs-title function_">set</span>(<span class="hljs-params"><span class="hljs-attr">key</span>: K, <span class="hljs-attr">value</span>: V, <span class="hljs-attr">sizeBytes</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-comment">// Remove old entry if exists</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">has</span>(key)) {
      <span class="hljs-keyword">const</span> old = <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">get</span>(key)!;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">totalSize</span> -= old.<span class="hljs-property">size</span>;
    }

    <span class="hljs-comment">// Evict if necessary</span>
    <span class="hljs-keyword">while</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">totalSize</span> + sizeBytes &gt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">maxSize</span> &amp;&amp; <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-property">size</span> &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">evictLRU</span>();
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">set</span>(key, {
      value,
      <span class="hljs-attr">size</span>: sizeBytes,
      <span class="hljs-attr">lastAccess</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
    });
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">totalSize</span> += sizeBytes;
  }

  <span class="hljs-title function_">get</span>(<span class="hljs-attr">key</span>: K): V | <span class="hljs-literal">undefined</span> {
    <span class="hljs-keyword">const</span> entry = <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">get</span>(key);
    <span class="hljs-keyword">if</span> (entry) {
      entry.<span class="hljs-property">lastAccess</span> = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>();
      <span class="hljs-keyword">return</span> entry.<span class="hljs-property">value</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">evictLRU</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">let</span> <span class="hljs-attr">oldestKey</span>: K | <span class="hljs-literal">undefined</span>;
    <span class="hljs-keyword">let</span> oldestTime = <span class="hljs-title class_">Infinity</span>;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> [key, entry] <span class="hljs-keyword">of</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>) {
      <span class="hljs-keyword">if</span> (entry.<span class="hljs-property">lastAccess</span> &lt; oldestTime) {
        oldestTime = entry.<span class="hljs-property">lastAccess</span>;
        oldestKey = key;
      }
    }

    <span class="hljs-keyword">if</span> (oldestKey !== <span class="hljs-literal">undefined</span>) {
      <span class="hljs-keyword">const</span> entry = <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">get</span>(oldestKey)!;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">totalSize</span> -= entry.<span class="hljs-property">size</span>;
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">delete</span>(oldestKey);
    }
  }

  <span class="hljs-title function_">clear</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">cache</span>.<span class="hljs-title function_">clear</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">totalSize</span> = <span class="hljs-number">0</span>;
  }
}
</code></pre>
<h2 id="قائمة-أفضل-الممارسات">قائمة أفضل الممارسات</h2>
<p>✅ <strong>نظّف دائمًا في useEffect:</strong></p>
<ul>
<li>أزل مستمعات الأحداث</li>
<li>ألغِ المؤقّتات والفترات</li>
<li>أغلق الاتصالات</li>
<li>ألغِ الاشتراكات</li>
</ul>
<p>✅ <strong>قلّل نطاق الإغلاق:</strong></p>
<ul>
<li>استخدم <code>refs</code> للحصول على مراجع مستقرة</li>
<li>استخرج الدوال الثابتة</li>
<li>احفظ دوال الاستدعاء في الذاكرة المؤقتة بحكمة</li>
</ul>
<p>✅ <strong>راقب الذاكرة في الإنتاج:</strong></p>
<ul>
<li>تتبّع مقاييس حجم الكومة</li>
<li>أعدّ كشف التسرّبات</li>
<li>نبّه عند ضغط الذاكرة</li>
</ul>
<p>✅ <strong>حسّن إدارة الحالة:</strong></p>
<ul>
<li>وحّد بنى البيانات</li>
<li>استخدم المعرّفات بدل تكرار الكائنات</li>
<li>نفّذ التمرير الافتراضي للقوائم الكبيرة</li>
</ul>
<p>✅ <strong>نمّط بانتظام:</strong></p>
<ul>
<li>خُذ لقطات للكومة أثناء التطوير</li>
<li>شغّل اختبارات تسرّبات الذاكرة</li>
<li>راقب الجلسات الطويلة</li>
</ul>
<h2 id="الخلاصة">الخلاصة</h2>
<p>تتطلّب إدارة الذاكرة في React فهم جمع مهملات JavaScript وأنماط React الخاصة معًا:</p>
<ol>
<li><strong>إدارة المراجع</strong> - تحكّم في أي الكائنات يبقى في الذاكرة عبر التعامل الدقيق مع المراجع</li>
<li><strong>تحسين الإغلاقات</strong> - قلّل احتجاز النطاق في الخُطّافات ودوال الاستدعاء</li>
<li><strong>الوعي بدورة الحياة</strong> - استخدم أنماط التنظيف في React باستمرار</li>
<li><strong>المراقبة في الإنتاج</strong> - تتبّع استهلاك الذاكرة واكشف التسرّبات في التطبيقات الحقيقية</li>
</ol>
<p>أتقن هذه الأساسيات، وستصبح تسرّبات الذاكرة قابلة للمنع بدل أن تكون غامضة. يتولّى جامع المهملات التفاصيل — ومهمتك أنت إدارة ما يبقى قابلًا للوصول.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:t};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,t as html,l as slug,p as title};
