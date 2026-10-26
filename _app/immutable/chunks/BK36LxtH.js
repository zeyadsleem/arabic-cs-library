const s="kinney",n="react-performance",a="أداء React",e="uselayouteffect-performance",l="خصائص الأداء في useLayoutEffect",t=[{depth:2,id:"فهم-فرق-التوقيت",text:"فهم فرق التوقيت"},{depth:2,id:"متى-تحتاج-uselayouteffect-فعلا",text:"متى تحتاج useLayoutEffect فعلًا"},{depth:3,id:"قياس-عناصر-dom",text:"قياس عناصر DOM"},{depth:3,id:"منع-اهتزاز-التخطيط",text:"منع اهتزاز التخطيط"},{depth:2,id:"خصائص-الأداء-والتكاليف",text:"خصائص الأداء والتكاليف"},{depth:3,id:"حجب-عملية-الرسم",text:"حجب عملية الرسم"},{depth:3,id:"الأثر-على-الميزات-التزامنية",text:"الأثر على الميزات التزامنية"},{depth:2,id:"قياس-أثر-الأداء",text:"قياس أثر الأداء"},{depth:2,id:"استراتيجيات-التحسين",text:"استراتيجيات التحسين"},{depth:3,id:"تجميع-عمليات-dom",text:"تجميع عمليات DOM"},{depth:3,id:"استخدم-resizeobserver-عند-الاقتضاء",text:"استخدم ResizeObserver عند الاقتضاء"},{depth:2,id:"أنماط-مضادة-شائعة-يجب-تجنبها",text:"أنماط مضادة شائعة يجب تجنّبها"},{depth:3,id:"استخدام-uselayouteffect-لتأثيرات-جانبية-غير-متعلقة-بـ-dom",text:"استخدام useLayoutEffect لتأثيرات جانبية غير متعلقة بـ DOM"},{depth:3,id:"الإفراط-في-استخدامه-بذريعة-يبدو-أسرع",text:"الإفراط في استخدامه بذريعة «يبدو أسرع»"},{depth:2,id:"اعتبارات-react-19",text:"اعتبارات React 19"},{depth:2,id:"اختبار-أداء-تأثير-التخطيط",text:"اختبار أداء تأثير التخطيط"}],p=`<p>يعمل <code>useLayoutEffect</code> تزامنيًا بعد كل تعديلات DOM لكن قبل رسم المتصفح. هذا التوقيت يجعله قويًا في منع العيوب البصرية، لكنه قد يكون مكلفًا للأداء. لنستكشف متى تحتاجه، ومتى لا تحتاجه، وكيف تقيس أثره على استجابة تطبيقك.</p>
<p>الفكرة الجوهرية: يجبر <code>useLayoutEffect</code> React على حجب عملية رسم المتصفح حتى ينتهي تأثيرك. قد يكون هذا بالضبط ما تحتاجه — أو بالضبط ما يقتل معدل الإطارات لديك.</p>
<h2 id="فهم-فرق-التوقيت">فهم فرق التوقيت</h2>
<p>يوفر React خُطّافين للتأثيرات الجانبية التي تعمل بعد التصيير: <code>useEffect</code> و<code>useLayoutEffect</code>. الفرق يكمن في علاقتهما بخط أنابيب التصيير في المتصفح.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">TimingDemo</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-comment">// ✅ Runs asynchronously after paint</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;useEffect runs after paint&#x27;</span>);
  }, [count]);

  <span class="hljs-comment">// 🟡 Runs synchronously before paint (blocking)</span>
  <span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;useLayoutEffect runs before paint&#x27;</span>);
  }, [count]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Count: {count}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<p>إليك ما يحدث أثناء دورة تصيير نموذجية:</p>
<ol>
<li>يصيّر React مكوّنك</li>
<li>تُطبَّق تعديلات DOM</li>
<li><strong>يعمل <code>useLayoutEffect</code> تزامنيًا</strong> ← يحجب هنا</li>
<li>يرسم المتصفح الشاشة</li>
<li>يعمل <code>useEffect</code> بشكل غير متزامن</li>
</ol>
<p>هذا التنفيذ التزامني هو القوة الخارقة لـ <code>useLayoutEffect</code> ومزلق أدائه في الوقت نفسه.</p>
<h2 id="متى-تحتاج-uselayouteffect-فعلا">متى تحتاج <code>useLayoutEffect</code> فعلًا</h2>
<p>استخدم <code>useLayoutEffect</code> عندما تحتاج إلى القراءة من DOM أو الكتابة إليه قبل أن يرسم المتصفح — عادةً لمنع الوميض البصري أو قياس العناصر.</p>
<h3 id="قياس-عناصر-dom">قياس عناصر DOM</h3>
<p>أكثر حالة استخدام مشروعة شيوعًا هي قياس عناصر تعتمد على محتوى ديناميكي:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">AutoResizingTextarea</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> textareaRef = useRef&lt;<span class="hljs-title class_">HTMLTextAreaElement</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [value, setValue] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-comment">// ✅ Good use of useLayoutEffect - prevents visible height jumps</span>
  <span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> textarea = textareaRef.<span class="hljs-property">current</span>;
    <span class="hljs-keyword">if</span> (!textarea) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Reset height to measure natural height</span>
    textarea.<span class="hljs-property">style</span>.<span class="hljs-property">height</span> = <span class="hljs-string">&#x27;0px&#x27;</span>;
    <span class="hljs-keyword">const</span> scrollHeight = textarea.<span class="hljs-property">scrollHeight</span>;

    <span class="hljs-comment">// Apply the measured height</span>
    textarea.<span class="hljs-property">style</span>.<span class="hljs-property">height</span> = <span class="hljs-string">\`<span class="hljs-subst">\${scrollHeight}</span>px\`</span>;
  }, [value]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>
      <span class="hljs-attr">ref</span>=<span class="hljs-string">{textareaRef}</span>
      <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span>
      <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setValue(e.target.value)}
      style={{ resize: &#x27;none&#x27;, overflow: &#x27;hidden&#x27; }}
    /&gt;</span>
  );
}
</code></pre>
<h3 id="منع-اهتزاز-التخطيط">منع اهتزاز التخطيط</h3>
<p>عندما تحتاج إلى قراءة خصائص التخطيط وكتابتها فورًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ScrollSyncedHeader</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> headerRef = useRef&lt;<span class="hljs-title class_">HTMLElement</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [scrollY, setScrollY] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> header = headerRef.<span class="hljs-property">current</span>;
    <span class="hljs-keyword">if</span> (!header) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Read and write in the same frame to prevent thrashing</span>
    <span class="hljs-keyword">const</span> opacity = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(<span class="hljs-number">0</span>, <span class="hljs-number">1</span> - scrollY / <span class="hljs-number">100</span>);
    header.<span class="hljs-property">style</span>.<span class="hljs-property">opacity</span> = opacity.<span class="hljs-title function_">toString</span>();

    <span class="hljs-comment">// Position sticky header based on scroll</span>
    header.<span class="hljs-property">style</span>.<span class="hljs-property">transform</span> = <span class="hljs-string">\`translateY(<span class="hljs-subst">\${<span class="hljs-built_in">Math</span>.max(<span class="hljs-number">0</span>, scrollY - <span class="hljs-number">50</span>)}</span>px)\`</span>;
  }, [scrollY]);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleScroll</span> = (<span class="hljs-params"></span>) =&gt; <span class="hljs-title function_">setScrollY</span>(<span class="hljs-variable language_">window</span>.<span class="hljs-property">scrollY</span>);
    <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;scroll&#x27;</span>, handleScroll, { <span class="hljs-attr">passive</span>: <span class="hljs-literal">true</span> });
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;scroll&#x27;</span>, handleScroll);
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{headerRef}</span>&gt;</span>Scroll-synced header<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span></span>;
}
</code></pre>
<h2 id="خصائص-الأداء-والتكاليف">خصائص الأداء والتكاليف</h2>
<p>لـ <code>useLayoutEffect</code> آثار أداء قابلة للقياس لأنه يحجب الخيط الرئيسي خلال مسار التصيير الحرج.</p>
<h3 id="حجب-عملية-الرسم">حجب عملية الرسم</h3>
<p>كل جزء من الثانية يُنفق داخل <code>useLayoutEffect</code> يؤخّر مباشرة متى يرى المستخدمون تحديثاتك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ExpensiveLayoutEffect</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [data, setData] = useState&lt;<span class="hljs-built_in">number</span>[]&gt;([]);

  <span class="hljs-comment">// ❌ Bad - blocks paint for expensive computation</span>
  <span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Simulating expensive DOM measurements</span>
    <span class="hljs-keyword">const</span> measurements = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000</span>; i++) {
      <span class="hljs-keyword">const</span> element = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">\`[data-item=&quot;<span class="hljs-subst">\${i}</span>&quot;]\`</span>);
      <span class="hljs-keyword">if</span> (element) {
        measurements.<span class="hljs-title function_">push</span>(element.<span class="hljs-title function_">getBoundingClientRect</span>());
      }
    }

    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Blocking paint for&#x27;</span>, measurements.<span class="hljs-property">length</span>, <span class="hljs-string">&#x27;measurements&#x27;</span>);
  }, [data]);

  <span class="hljs-comment">// ✅ Better - use useEffect unless sync timing is critical</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Same expensive work, but doesn&#x27;t block paint</span>
    <span class="hljs-comment">// User sees the update immediately, measurements happen after</span>
  }, [data]);
}
</code></pre>
<h3 id="الأثر-على-الميزات-التزامنية">الأثر على الميزات التزامنية</h3>
<p>يعمل <code>useLayoutEffect</code> تزامنيًا حتى في الوضع التزامني (Concurrent Mode) في React، ما قد يتعارض مع ميزات مثل تقطيع الوقت:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ConcurrentUnfriendly</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [items, setItems] = useState&lt;<span class="hljs-title class_">Item</span>[]&gt;([]);

  <span class="hljs-comment">// This blocks even during concurrent rendering</span>
  <span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Heavy DOM work that can&#x27;t be interrupted</span>
    items.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> element = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">\`[data-id=&quot;<span class="hljs-subst">\${item.id}</span>&quot;]\`</span>);
      <span class="hljs-keyword">if</span> (element) {
        <span class="hljs-comment">// Expensive layout calculations</span>
        element.<span class="hljs-property">style</span>.<span class="hljs-property">transform</span> = <span class="hljs-title function_">calculateTransform</span>(item, index);
      }
    });
  }, [items]);
}
</code></pre>
<h2 id="قياس-أثر-الأداء">قياس أثر الأداء</h2>
<p>استخدم React DevTools Profiler وأدوات أداء المتصفح لقياس التكلفة الفعلية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">MeasuredLayoutEffect</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [trigger, setTrigger] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> start = performance.<span class="hljs-title function_">now</span>();

    <span class="hljs-comment">// Your layout effect work</span>
    <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">&#x27;.measured-element&#x27;</span>).<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">el</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> rect = el.<span class="hljs-title function_">getBoundingClientRect</span>();
      <span class="hljs-comment">// Do something with measurements</span>
    });

    <span class="hljs-keyword">const</span> end = performance.<span class="hljs-title function_">now</span>();
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Layout effect took <span class="hljs-subst">\${end - start}</span>ms\`</span>);
  }, [trigger]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setTrigger((t) =&gt; t + 1)}&gt;Trigger Layout Effect<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>استخدم <code>performance.mark()</code> و<code>performance.measure()</code> لتنميط أكثر تطورًا يتكامل مع أدوات مطوّري المتصفح.</p>
</blockquote>
<h2 id="استراتيجيات-التحسين">استراتيجيات التحسين</h2>
<h3 id="تجميع-عمليات-dom">تجميع عمليات DOM</h3>
<p>عندما تضطر إلى استخدام <code>useLayoutEffect</code>، جمّع عمليات DOM لتقليل اهتزاز التخطيط:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">BatchedLayoutOperations</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [items, setItems] = useState&lt;<span class="hljs-title class_">Item</span>[]&gt;([]);

  <span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// ❌ Bad - causes multiple layout recalculations</span>
    items.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> el = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">\`[data-id=&quot;<span class="hljs-subst">\${item.id}</span>&quot;]\`</span>);
      <span class="hljs-keyword">if</span> (el) {
        el.<span class="hljs-property">style</span>.<span class="hljs-property">height</span> = <span class="hljs-string">\`<span class="hljs-subst">\${item.height}</span>px\`</span>; <span class="hljs-comment">// Layout recalc</span>
        el.<span class="hljs-property">style</span>.<span class="hljs-property">width</span> = <span class="hljs-string">\`<span class="hljs-subst">\${item.width}</span>px\`</span>; <span class="hljs-comment">// Layout recalc</span>
      }
    });

    <span class="hljs-comment">// ✅ Better - batch style changes</span>
    <span class="hljs-keyword">const</span> updates = items.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> ({
      <span class="hljs-attr">element</span>: <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">\`[data-id=&quot;<span class="hljs-subst">\${item.id}</span>&quot;]\`</span>),
      <span class="hljs-attr">styles</span>: { <span class="hljs-attr">height</span>: <span class="hljs-string">\`<span class="hljs-subst">\${item.height}</span>px\`</span>, <span class="hljs-attr">width</span>: <span class="hljs-string">\`<span class="hljs-subst">\${item.width}</span>px\`</span> },
    }));

    <span class="hljs-comment">// Apply all changes together</span>
    updates.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">{ element, styles }</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (element) {
        <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">assign</span>(element.<span class="hljs-property">style</span>, styles);
      }
    });
  }, [items]);
}
</code></pre>
<h3 id="استخدم-resizeobserver-عند-الاقتضاء">استخدم ResizeObserver عند الاقتضاء</h3>
<p>لقياس العناصر، فكّر في <code>ResizeObserver</code> كبديل لتأثيرات التخطيط:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ResizeObserverExample</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [dimensions, setDimensions] = <span class="hljs-title function_">useState</span>({ <span class="hljs-attr">width</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">0</span> });
  <span class="hljs-keyword">const</span> elementRef = useRef&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> element = elementRef.<span class="hljs-property">current</span>;
    <span class="hljs-keyword">if</span> (!element) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// ResizeObserver is more efficient than layout effects for size changes</span>
    <span class="hljs-keyword">const</span> resizeObserver = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ResizeObserver</span>(<span class="hljs-function">(<span class="hljs-params">entries</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> { width, height } = entries[<span class="hljs-number">0</span>].<span class="hljs-property">contentRect</span>;
      <span class="hljs-title function_">setDimensions</span>({ width, height });
    });

    resizeObserver.<span class="hljs-title function_">observe</span>(element);
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> resizeObserver.<span class="hljs-title function_">disconnect</span>();
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{elementRef}</span>&gt;</span>
      Content that might resize: {dimensions.width}x{dimensions.height}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="أنماط-مضادة-شائعة-يجب-تجنبها">أنماط مضادة شائعة يجب تجنّبها</h2>
<h3 id="استخدام-uselayouteffect-لتأثيرات-جانبية-غير-متعلقة-بـ-dom">استخدام <code>useLayoutEffect</code> لتأثيرات جانبية غير متعلقة بـ DOM</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad - doesn&#x27;t need to block paint</span>
<span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// API calls don&#x27;t need synchronous timing</span>
  <span class="hljs-title function_">fetchUserData</span>(userId).<span class="hljs-title function_">then</span>(setUser);
}, [userId]);

<span class="hljs-comment">// ❌ Bad - local storage doesn&#x27;t need to block paint</span>
<span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">setItem</span>(<span class="hljs-string">&#x27;theme&#x27;</span>, currentTheme);
}, [currentTheme]);

<span class="hljs-comment">// ✅ Good - use regular useEffect instead</span>
<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">fetchUserData</span>(userId).<span class="hljs-title function_">then</span>(setUser);
}, [userId]);
</code></pre>
<h3 id="الإفراط-في-استخدامه-بذريعة-يبدو-أسرع">الإفراط في استخدامه بذريعة «يبدو أسرع»</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">OverEngineeredComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [data, setData] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// ❌ Bad - no visual benefit, just blocking paint</span>
  <span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// This doesn&#x27;t prevent visual flicker, just delays everything</span>
    <span class="hljs-title function_">processData</span>(data);
  }, [data]);

  <span class="hljs-comment">// ✅ Better - let the user see the update immediately</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">processData</span>(data);
  }, [data]);
}
</code></pre>
<h2 id="اعتبارات-react-19">اعتبارات React 19</h2>
<p>تجعل الميزات التزامنية في React 19 استخدام <code>useLayoutEffect</code> أكثر أهمية بأن يكون بحكمة. فالنموذج الجديد للتصيير يجعل العمل التزامني الحاجب أكثر وضوحًا للمستخدمين.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">React19Aware</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [items, setItems] = useState&lt;<span class="hljs-title class_">Item</span>[]&gt;([]);

  <span class="hljs-comment">// Consider if you can use startTransition to make updates non-blocking</span>
  <span class="hljs-keyword">const</span> updateItems = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">newItems</span>: <span class="hljs-title class_">Item</span>[]</span>) =&gt;</span> {
    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setItems</span>(newItems);
    });
  }, []);

  <span class="hljs-comment">// Only use layout effect if you absolutely need sync DOM access</span>
  <span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Measure only what you must measure synchronously</span>
    <span class="hljs-keyword">const</span> criticalMeasurements = <span class="hljs-title function_">measureCriticalElements</span>();
    <span class="hljs-title function_">applyCriticalUpdates</span>(criticalMeasurements);
  }, [items]);

  <span class="hljs-comment">// Move non-critical work to regular effects</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">updateNonCriticalUI</span>(items);
  }, [items]);
}
</code></pre>
<h2 id="اختبار-أداء-تأثير-التخطيط">اختبار أداء تأثير التخطيط</h2>
<p>أنشئ معايير أداء للتحقق من صحة استخدامك لـ <code>useLayoutEffect</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">PerformanceTest</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [iterations, setIterations] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> timeRef = useRef&lt;<span class="hljs-built_in">number</span>[]&gt;([]);

  <span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> start = performance.<span class="hljs-title function_">now</span>();

    <span class="hljs-comment">// Simulate your actual layout work</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100</span>; i++) {
      <span class="hljs-keyword">const</span> el = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;div&#x27;</span>);
      <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-title function_">appendChild</span>(el);
      <span class="hljs-keyword">const</span> rect = el.<span class="hljs-title function_">getBoundingClientRect</span>(); <span class="hljs-comment">// Force layout</span>
      <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-title function_">removeChild</span>(el);
    }

    <span class="hljs-keyword">const</span> duration = performance.<span class="hljs-title function_">now</span>() - start;
    timeRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">push</span>(duration);

    <span class="hljs-keyword">if</span> (timeRef.<span class="hljs-property">current</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">10</span>) {
      <span class="hljs-keyword">const</span> avg = timeRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b) / timeRef.<span class="hljs-property">current</span>.<span class="hljs-property">length</span>;
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Average layout effect time: <span class="hljs-subst">\${avg.toFixed(<span class="hljs-number">2</span>)}</span>ms\`</span>);
      timeRef.<span class="hljs-property">current</span> = [];
    }
  }, [iterations]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setIterations((i) =&gt; i + 1)}&gt;
      Run Performance Test (iterations: {iterations})
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:e,title:l,headings:t,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,p as html,e as slug,l as title};
