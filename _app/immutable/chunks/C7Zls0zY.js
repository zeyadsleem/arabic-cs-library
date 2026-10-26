const s="kinney",a="react-performance",n="أداء React",l="animation-performance",p="أداء الرسوم المتحركة في React",t=[{depth:2,id:"فهم-خط-تصيير-المتصفح",text:"فهم خط تصيير المتصفح"},{depth:2,id:"رسوم-متحركة-قائمة-على-transform-في-css",text:"رسوم متحركة قائمة على transform في CSS"},{depth:3,id:"انتقالات-مسرعة-بالعتاد",text:"انتقالات مسرَّعة بالعتاد"},{depth:3,id:"تحريك-القوائم-باستخدام-transform",text:"تحريك القوائم باستخدام transform"},{depth:2,id:"react-spring-للرسوم-المتحركة-المعقدة",text:"React Spring للرسوم المتحركة المعقّدة"},{depth:3,id:"رسوم-متحركة-قائمة-على-الفيزياء",text:"رسوم متحركة قائمة على الفيزياء"},{depth:2,id:"مراقبة-معدل-الإطارات-وتحسينه",text:"مراقبة معدّل الإطارات وتحسينه"},{depth:3,id:"مراقبة-أداء-الرسوم-المتحركة",text:"مراقبة أداء الرسوم المتحركة"},{depth:3,id:"إدارة-ميزانية-الإطار",text:"إدارة ميزانية الإطار"},{depth:2,id:"أنماط-مضادة-شائعة-في-الرسوم-المتحركة",text:"أنماط مضادّة شائعة في الرسوم المتحركة"},{depth:3,id:"تجنب-إرباك-التخطيط",text:"تجنّب إرباك التخطيط"},{depth:3,id:"منع-حجب-الرسوم-المتحركة",text:"منع حجب الرسوم المتحركة"},{depth:2,id:"تقنيات-متقدمة",text:"تقنيات متقدّمة"}],e=`<p>الرسوم المتحركة السلسة هي ما يميّز تطبيقات React الاحترافية عن غيرها. فتلاشٍ متقطّع عند الظهور، أو انتقال قائمة دوّارة متلعثم، أو انتقال نافذة منبثقة بطيء، كل ذلك يرسل إلى المستخدمين إشارة فورية إلى ضعف الأداء. لكن إنشاء رسوم متحركة بمعدّل 60 إطارًا في الثانية في React يتطلّب فهم خط تصيير المتصفح، واختيار الخصائص الصحيحة لتحريكها، وتجنّب المزالق الشائعة التي تحجب الخيط الرئيسي.</p>
<p>التحدّي ليس مجرّد تحريك الأشياء، بل تحريكها بسلاسة مع الحفاظ على نموذج React التصريحي. فكل رسم متحرك سلسلة من تغييرات الحالة المتسارعة التي قد تحرّض عمليات إعادة تصيير مكلفة، وإعادات حساب للتخطيط، وتحديثات للأنماط. أتقن أداء الرسوم المتحركة، وستنشئ واجهات تبدو سلسة ومتجاوبة حتى على الأجهزة المتواضعة.</p>
<h2 id="فهم-خط-تصيير-المتصفح">فهم خط تصيير المتصفح</h2>
<p>قبل تحسين الرسوم المتحركة، افهم ما يحدث عندما يصيّر المتصفح إطارًا واحدًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Browser rendering pipeline for each frame (16.67ms for 60fps)</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">RenderingPipeline</span> {
  <span class="hljs-comment">// 1. JavaScript (1-2ms budget)</span>
  <span class="hljs-attr">javascript</span>: {
    <span class="hljs-attr">reactRender</span>: <span class="hljs-string">&#x27;Component updates and reconciliation&#x27;</span>;
    <span class="hljs-attr">eventHandlers</span>: <span class="hljs-string">&#x27;User interaction processing&#x27;</span>;
    <span class="hljs-attr">animationCallbacks</span>: <span class="hljs-string">&#x27;requestAnimationFrame callbacks&#x27;</span>;
  };

  <span class="hljs-comment">// 2. Style Calculation (1-2ms budget)</span>
  <span class="hljs-attr">style</span>: {
    <span class="hljs-attr">cssRecalculation</span>: <span class="hljs-string">&#x27;Which rules apply to which elements&#x27;</span>;
    <span class="hljs-attr">inheritance</span>: <span class="hljs-string">&#x27;Cascading and computed styles&#x27;</span>;
    <span class="hljs-attr">mediaQueries</span>: <span class="hljs-string">&#x27;Responsive breakpoint calculations&#x27;</span>;
  };

  <span class="hljs-comment">// 3. Layout/Reflow (2-3ms budget)</span>
  <span class="hljs-attr">layout</span>: {
    <span class="hljs-attr">elementPositions</span>: <span class="hljs-string">&#x27;Where each element goes&#x27;</span>;
    <span class="hljs-attr">elementSizes</span>: <span class="hljs-string">&#x27;How big each element should be&#x27;</span>;
    <span class="hljs-attr">textWrapping</span>: <span class="hljs-string">&#x27;How text flows in containers&#x27;</span>;
  };

  <span class="hljs-comment">// 4. Paint (2-3ms budget)</span>
  <span class="hljs-attr">paint</span>: {
    <span class="hljs-attr">fillPixels</span>: <span class="hljs-string">&#x27;Draw pixels for each element&#x27;</span>;
    <span class="hljs-attr">textRasterization</span>: <span class="hljs-string">&#x27;Convert text to pixels&#x27;</span>;
    <span class="hljs-attr">imageDecoding</span>: <span class="hljs-string">&#x27;Process image data&#x27;</span>;
  };

  <span class="hljs-comment">// 5. Composite (1ms budget)</span>
  <span class="hljs-attr">composite</span>: {
    <span class="hljs-attr">layerCombination</span>: <span class="hljs-string">&#x27;Combine painted layers&#x27;</span>;
    <span class="hljs-attr">transformations</span>: <span class="hljs-string">&#x27;Apply 3D transforms&#x27;</span>;
    <span class="hljs-attr">opacity</span>: <span class="hljs-string">&#x27;Alpha blending&#x27;</span>;
  };
}

<span class="hljs-comment">// Animation performance hierarchy (fastest to slowest)</span>
<span class="hljs-keyword">const</span> animationCosts = {
  <span class="hljs-comment">// ✅ Composite-only changes (GPU accelerated)</span>
  <span class="hljs-attr">fastest</span>: [<span class="hljs-string">&#x27;transform&#x27;</span>, <span class="hljs-string">&#x27;opacity&#x27;</span>],

  <span class="hljs-comment">// ⚠️ Paint-only changes (requires repaint)</span>
  <span class="hljs-attr">moderate</span>: [<span class="hljs-string">&#x27;color&#x27;</span>, <span class="hljs-string">&#x27;background-color&#x27;</span>, <span class="hljs-string">&#x27;box-shadow&#x27;</span>, <span class="hljs-string">&#x27;border-radius&#x27;</span>],

  <span class="hljs-comment">// ❌ Layout changes (full pipeline)</span>
  <span class="hljs-attr">slowest</span>: [<span class="hljs-string">&#x27;width&#x27;</span>, <span class="hljs-string">&#x27;height&#x27;</span>, <span class="hljs-string">&#x27;left&#x27;</span>, <span class="hljs-string">&#x27;top&#x27;</span>, <span class="hljs-string">&#x27;margin&#x27;</span>, <span class="hljs-string">&#x27;padding&#x27;</span>, <span class="hljs-string">&#x27;border&#x27;</span>],
};
</code></pre>
<p>القاعدة الذهبية: حرّك الخصائص التي تحرّض التركيب (compositing) وحده. فتغييرات transform وopacity تحدث على وحدة معالجة الرسوميات (GPU) وتتجاوز معظم خط التصيير.</p>
<h2 id="رسوم-متحركة-قائمة-على-transform-في-css">رسوم متحركة قائمة على transform في CSS</h2>
<h3 id="انتقالات-مسرعة-بالعتاد">انتقالات مسرَّعة بالعتاد</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Performant modal animation using transforms</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ModalProps</span> {
  <span class="hljs-attr">isOpen</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onClose</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">PerformantModal</span>(<span class="hljs-params">{ isOpen, onClose, children }: <span class="hljs-title class_">ModalProps</span></span>) {
  <span class="hljs-keyword">const</span> [isVisible, setIsVisible] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [shouldRender, setShouldRender] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (isOpen) {
      <span class="hljs-title function_">setShouldRender</span>(<span class="hljs-literal">true</span>);
      <span class="hljs-comment">// Force layout before animating</span>
      <span class="hljs-title function_">requestAnimationFrame</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-title function_">setIsVisible</span>(<span class="hljs-literal">true</span>);
      });
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-title function_">setIsVisible</span>(<span class="hljs-literal">false</span>);
      <span class="hljs-comment">// Remove from DOM after animation completes</span>
      <span class="hljs-keyword">const</span> timer = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-title function_">setShouldRender</span>(<span class="hljs-literal">false</span>);
      }, <span class="hljs-number">300</span>); <span class="hljs-comment">// Match CSS transition duration</span>
      <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearTimeout</span>(timer);
    }
  }, [isOpen]);

  <span class="hljs-keyword">if</span> (!shouldRender) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">modal-overlay</span> \${<span class="hljs-attr">isVisible</span> ? &#x27;<span class="hljs-attr">modal-overlay--visible</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}\`} <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClose}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
        <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">modal-content</span> \${<span class="hljs-attr">isVisible</span> ? &#x27;<span class="hljs-attr">modal-content--visible</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}\`}
        <span class="hljs-attr">onClick</span>=<span class="hljs-string">{(e)</span> =&gt;</span> e.stopPropagation()}
      &gt;
        {children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// CSS using transform for hardware acceleration</span>
<span class="hljs-keyword">const</span> modalStyles = <span class="hljs-string">\`
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);

  /* Hardware acceleration - Force GPU layer */
  transform: translateZ(0);

  transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.modal-overlay--visible {
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: auto;
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 90vw;
  max-height: 90vh;
  background: white;
  border-radius: 8px;

  /* Use transform instead of changing top/left */
  transform: translate(-50%, -50%) scale(0.9);

  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-content--visible {
  transform: translate(-50%, -50%) scale(1);
}
\`</span>;
</code></pre>
<h3 id="تحريك-القوائم-باستخدام-transform">تحريك القوائم باستخدام transform</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Performant list animations avoiding layout thrashing</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AnimatedListItem</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">content</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">isNew</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">isRemoving</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">AnimatedList</span>(<span class="hljs-params">{ items }: { items: AnimatedListItem[] }</span>) {
  <span class="hljs-keyword">const</span> [displayItems, setDisplayItems] = useState&lt;<span class="hljs-title class_">AnimatedListItem</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> itemRefs = useRef&lt;<span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">HTMLDivElement</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>());

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> previousPositions = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">DOMRect</span>&gt;();

    <span class="hljs-comment">// Store current positions</span>
    itemRefs.<span class="hljs-property">current</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">element, id</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (element) {
        previousPositions.<span class="hljs-title function_">set</span>(id, element.<span class="hljs-title function_">getBoundingClientRect</span>());
      }
    });

    <span class="hljs-comment">// Update items</span>
    <span class="hljs-title function_">setDisplayItems</span>(items);

    <span class="hljs-comment">// Apply FLIP animation technique</span>
    <span class="hljs-title function_">requestAnimationFrame</span>(<span class="hljs-function">() =&gt;</span> {
      itemRefs.<span class="hljs-property">current</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">element, id</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (element &amp;&amp; previousPositions.<span class="hljs-title function_">has</span>(id)) {
          <span class="hljs-keyword">const</span> previousRect = previousPositions.<span class="hljs-title function_">get</span>(id)!;
          <span class="hljs-keyword">const</span> currentRect = element.<span class="hljs-title function_">getBoundingClientRect</span>();

          <span class="hljs-keyword">const</span> deltaX = previousRect.<span class="hljs-property">left</span> - currentRect.<span class="hljs-property">left</span>;
          <span class="hljs-keyword">const</span> deltaY = previousRect.<span class="hljs-property">top</span> - currentRect.<span class="hljs-property">top</span>;

          <span class="hljs-keyword">if</span> (deltaX !== <span class="hljs-number">0</span> || deltaY !== <span class="hljs-number">0</span>) {
            <span class="hljs-comment">// Move element to previous position without transition</span>
            element.<span class="hljs-property">style</span>.<span class="hljs-property">transition</span> = <span class="hljs-string">&#x27;none&#x27;</span>;
            element.<span class="hljs-property">style</span>.<span class="hljs-property">transform</span> = <span class="hljs-string">\`translate(<span class="hljs-subst">\${deltaX}</span>px, <span class="hljs-subst">\${deltaY}</span>px)\`</span>;

            <span class="hljs-comment">// Animate to current position</span>
            <span class="hljs-title function_">requestAnimationFrame</span>(<span class="hljs-function">() =&gt;</span> {
              element.<span class="hljs-property">style</span>.<span class="hljs-property">transition</span> = <span class="hljs-string">&#x27;transform 300ms cubic-bezier(0.4, 0, 0.2, 1)&#x27;</span>;
              element.<span class="hljs-property">style</span>.<span class="hljs-property">transform</span> = <span class="hljs-string">&#x27;translate(0, 0)&#x27;</span>;
            });
          }
        }
      });
    });
  }, [items]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;animated-list&quot;</span>&gt;</span>
      {displayItems.map((item) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
          <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>
          <span class="hljs-attr">ref</span>=<span class="hljs-string">{(el)</span> =&gt;</span> {
            if (el) {
              itemRefs.current.set(item.id, el);
            }
          }}
          className={\`list-item \${
            item.isNew ? &#x27;list-item--entering&#x27; : &#x27;&#x27;
          } \${item.isRemoving ? &#x27;list-item--leaving&#x27; : &#x27;&#x27;}\`}
        &gt;
          {item.content}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// CSS for enter/leave animations</span>
<span class="hljs-keyword">const</span> listAnimationStyles = <span class="hljs-string">\`
.list-item {
  /* Hardware acceleration */
  transform: translateZ(0);
}

.list-item--entering {
  animation: itemEnter 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.list-item--leaving {
  animation: itemLeave 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes itemEnter {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes itemLeave {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
}
\`</span>;
</code></pre>
<h2 id="react-spring-للرسوم-المتحركة-المعقدة">React Spring للرسوم المتحركة المعقّدة</h2>
<h3 id="رسوم-متحركة-قائمة-على-الفيزياء">رسوم متحركة قائمة على الفيزياء</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// High-performance spring animations with react-spring</span>
<span class="hljs-keyword">import</span> { useSpring, animated, useTransition, config } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@react-spring/web&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">SpringCardProps</span> {
  <span class="hljs-attr">isHovered</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">SpringCard</span>(<span class="hljs-params">{ isHovered, onClick, children }: <span class="hljs-title class_">SpringCardProps</span></span>) {
  <span class="hljs-comment">// Spring animation with optimized config</span>
  <span class="hljs-keyword">const</span> springProps = <span class="hljs-title function_">useSpring</span>({
    <span class="hljs-attr">transform</span>: isHovered ? <span class="hljs-string">&#x27;translateY(-8px) scale(1.02)&#x27;</span> : <span class="hljs-string">&#x27;translateY(0px) scale(1)&#x27;</span>,
    <span class="hljs-attr">boxShadow</span>: isHovered ? <span class="hljs-string">&#x27;0 20px 40px rgba(0, 0, 0, 0.15)&#x27;</span> : <span class="hljs-string">&#x27;0 2px 10px rgba(0, 0, 0, 0.1)&#x27;</span>,

    <span class="hljs-comment">// Optimized spring config for performance</span>
    <span class="hljs-attr">config</span>: {
      <span class="hljs-attr">tension</span>: <span class="hljs-number">300</span>, <span class="hljs-comment">// Stiffness of spring</span>
      <span class="hljs-attr">friction</span>: <span class="hljs-number">30</span>, <span class="hljs-comment">// Damping</span>
      <span class="hljs-attr">mass</span>: <span class="hljs-number">1</span>, <span class="hljs-comment">// Mass of object</span>
    },

    <span class="hljs-comment">// Optimize by skipping intermediate values</span>
    <span class="hljs-attr">immediate</span>: <span class="hljs-literal">false</span>,
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">animated.div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{springProps}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;spring-card&quot;</span>&gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">animated.div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// List transitions with staggered animations</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ListTransitionProps</span>&lt;T&gt; {
  <span class="hljs-attr">items</span>: T[];
  <span class="hljs-attr">renderItem</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">getKey</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title class_">StaggeredListTransition</span>&lt;T&gt;({ items, renderItem, getKey }: <span class="hljs-title class_">ListTransitionProps</span>&lt;T&gt;) {
  <span class="hljs-keyword">const</span> transitions = <span class="hljs-title function_">useTransition</span>(items, {
    <span class="hljs-attr">from</span>: {
      <span class="hljs-attr">opacity</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">transform</span>: <span class="hljs-string">&#x27;translateX(-100px) scale(0.8)&#x27;</span>,
    },
    <span class="hljs-attr">enter</span>: <span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span> <span class="hljs-title function_">async</span> (next) =&gt; {
      <span class="hljs-comment">// Stagger animations by index</span>
      <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, index * <span class="hljs-number">50</span>));
      <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>({
        <span class="hljs-attr">opacity</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">transform</span>: <span class="hljs-string">&#x27;translateX(0px) scale(1)&#x27;</span>,
      });
    },
    <span class="hljs-attr">leave</span>: {
      <span class="hljs-attr">opacity</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">transform</span>: <span class="hljs-string">&#x27;translateX(100px) scale(0.8)&#x27;</span>,
    },
    <span class="hljs-attr">keys</span>: getKey,

    <span class="hljs-comment">// Performance optimizations</span>
    <span class="hljs-attr">config</span>: config.<span class="hljs-property">gentle</span>,
    <span class="hljs-attr">trail</span>: <span class="hljs-number">50</span>, <span class="hljs-comment">// Delay between items</span>
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;staggered-list&quot;</span>&gt;</span>
      {transitions((style, item) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">animated.div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;staggered-item&quot;</span>&gt;</span>
          {renderItem(item)}
        <span class="hljs-tag">&lt;/<span class="hljs-name">animated.div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Gesture-based interactions</span>
<span class="hljs-keyword">import</span> { useDrag } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@use-gesture/react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">DraggableCard</span>(<span class="hljs-params">{ onDismiss }: { onDismiss: () =&gt; <span class="hljs-built_in">void</span> }</span>) {
  <span class="hljs-keyword">const</span> [{ x, rotate, scale, opacity }, api] = <span class="hljs-title function_">useSpring</span>(<span class="hljs-function">() =&gt;</span> ({
    <span class="hljs-attr">x</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">rotate</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">scale</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">opacity</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">config</span>: config.<span class="hljs-property">wobbly</span>,
  }));

  <span class="hljs-keyword">const</span> bind = <span class="hljs-title function_">useDrag</span>(<span class="hljs-function">(<span class="hljs-params">{ active, movement: [mx], direction: [xDir], velocity: [vx] }</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> trigger = vx &gt; <span class="hljs-number">0.2</span> || (<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">abs</span>(mx) &gt; <span class="hljs-number">100</span> &amp;&amp; !active);

    <span class="hljs-keyword">if</span> (trigger) {
      <span class="hljs-comment">// Animate off screen</span>
      api.<span class="hljs-title function_">start</span>({
        <span class="hljs-attr">x</span>: (<span class="hljs-number">200</span> + <span class="hljs-variable language_">window</span>.<span class="hljs-property">innerWidth</span>) * xDir,
        <span class="hljs-attr">rotate</span>: xDir * <span class="hljs-number">10</span>,
        <span class="hljs-attr">scale</span>: <span class="hljs-number">0.8</span>,
        <span class="hljs-attr">opacity</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">config</span>: config.<span class="hljs-property">default</span>,
        <span class="hljs-attr">onResolve</span>: onDismiss,
      });
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// Return to center</span>
      api.<span class="hljs-title function_">start</span>({
        <span class="hljs-attr">x</span>: active ? mx : <span class="hljs-number">0</span>,
        <span class="hljs-attr">rotate</span>: active ? (mx / <span class="hljs-number">100</span>) * <span class="hljs-number">5</span> : <span class="hljs-number">0</span>,
        <span class="hljs-attr">scale</span>: active ? <span class="hljs-number">1.05</span> : <span class="hljs-number">1</span>,
        <span class="hljs-attr">opacity</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">immediate</span>: active,
        <span class="hljs-attr">config</span>: active ? { <span class="hljs-attr">tension</span>: <span class="hljs-number">800</span>, <span class="hljs-attr">friction</span>: <span class="hljs-number">50</span> } : config.<span class="hljs-property">wobbly</span>,
      });
    }
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">animated.div</span>
      {<span class="hljs-attr">...bind</span>()}
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">x</span>,
        <span class="hljs-attr">rotate</span>,
        <span class="hljs-attr">scale</span>,
        <span class="hljs-attr">opacity</span>,
        <span class="hljs-attr">touchAction:</span> &#x27;<span class="hljs-attr">none</span>&#x27;, // <span class="hljs-attr">Prevent</span> <span class="hljs-attr">scrolling</span> <span class="hljs-attr">during</span> <span class="hljs-attr">drag</span>
      }}
      <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;draggable-card&quot;</span>
    &gt;</span>
      Swipe me!
    <span class="hljs-tag">&lt;/<span class="hljs-name">animated.div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="مراقبة-معدل-الإطارات-وتحسينه">مراقبة معدّل الإطارات وتحسينه</h2>
<h3 id="مراقبة-أداء-الرسوم-المتحركة">مراقبة أداء الرسوم المتحركة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Animation performance monitor</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">AnimationPerformanceMonitor</span> {
  <span class="hljs-keyword">private</span> frameCount = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">private</span> lastTime = performance.<span class="hljs-title function_">now</span>();
  <span class="hljs-keyword">private</span> <span class="hljs-attr">frameRates</span>: <span class="hljs-built_in">number</span>[] = [];
  <span class="hljs-keyword">private</span> isMonitoring = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">onSlowFrame</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">fps</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">
    <span class="hljs-keyword">private</span> <span class="hljs-attr">config</span>: {
      targetFPS?: <span class="hljs-built_in">number</span>;
      warningThreshold?: <span class="hljs-built_in">number</span>;
      sampleSize?: <span class="hljs-built_in">number</span>;
    } = {},
  </span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">config</span>.<span class="hljs-property">targetFPS</span> = config.<span class="hljs-property">targetFPS</span> || <span class="hljs-number">60</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">config</span>.<span class="hljs-property">warningThreshold</span> = config.<span class="hljs-property">warningThreshold</span> || <span class="hljs-number">45</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">config</span>.<span class="hljs-property">sampleSize</span> = config.<span class="hljs-property">sampleSize</span> || <span class="hljs-number">120</span>; <span class="hljs-comment">// 2 seconds at 60fps</span>
  }

  <span class="hljs-title function_">startMonitoring</span>(<span class="hljs-attr">onSlowFrame</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">fps</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">isMonitoring</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">isMonitoring</span> = <span class="hljs-literal">true</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">onSlowFrame</span> = onSlowFrame;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">frameCount</span> = <span class="hljs-number">0</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">lastTime</span> = performance.<span class="hljs-title function_">now</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">frameRates</span> = [];

    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">measureFrame</span>();
  }

  <span class="hljs-title function_">stopMonitoring</span>(): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">isMonitoring</span> = <span class="hljs-literal">false</span>;
  }

  <span class="hljs-keyword">private</span> measureFrame = (): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">isMonitoring</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> currentTime = performance.<span class="hljs-title function_">now</span>();
    <span class="hljs-keyword">const</span> frameDuration = currentTime - <span class="hljs-variable language_">this</span>.<span class="hljs-property">lastTime</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">lastTime</span> = currentTime;

    <span class="hljs-comment">// Calculate instantaneous FPS</span>
    <span class="hljs-keyword">const</span> fps = <span class="hljs-number">1000</span> / frameDuration;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">frameRates</span>.<span class="hljs-title function_">push</span>(fps);

    <span class="hljs-comment">// Keep only recent samples</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">frameRates</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">config</span>.<span class="hljs-property">sampleSize</span>!) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">frameRates</span>.<span class="hljs-title function_">shift</span>();
    }

    <span class="hljs-comment">// Check for slow frames</span>
    <span class="hljs-keyword">if</span> (fps &lt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">config</span>.<span class="hljs-property">warningThreshold</span>! &amp;&amp; <span class="hljs-variable language_">this</span>.<span class="hljs-property">onSlowFrame</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">onSlowFrame</span>(fps);
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">frameCount</span>++;
    <span class="hljs-title function_">requestAnimationFrame</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">measureFrame</span>);
  };

  <span class="hljs-title function_">getAverageFPS</span>(): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">frameRates</span>.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">frameRates</span>.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, fps</span>) =&gt;</span> sum + fps, <span class="hljs-number">0</span>) / <span class="hljs-variable language_">this</span>.<span class="hljs-property">frameRates</span>.<span class="hljs-property">length</span>;
  }

  <span class="hljs-title function_">getPercentile</span>(<span class="hljs-attr">percentile</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">frameRates</span>.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;

    <span class="hljs-keyword">const</span> sorted = [...<span class="hljs-variable language_">this</span>.<span class="hljs-property">frameRates</span>].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a - b);
    <span class="hljs-keyword">const</span> index = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>((percentile / <span class="hljs-number">100</span>) * sorted.<span class="hljs-property">length</span>);
    <span class="hljs-keyword">return</span> sorted[index];
  }

  <span class="hljs-title function_">getPerformanceGrade</span>(): <span class="hljs-string">&#x27;A&#x27;</span> | <span class="hljs-string">&#x27;B&#x27;</span> | <span class="hljs-string">&#x27;C&#x27;</span> | <span class="hljs-string">&#x27;D&#x27;</span> | <span class="hljs-string">&#x27;F&#x27;</span> {
    <span class="hljs-keyword">const</span> avgFPS = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getAverageFPS</span>();
    <span class="hljs-keyword">const</span> p1FPS = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getPercentile</span>(<span class="hljs-number">1</span>); <span class="hljs-comment">// Worst 1% of frames</span>

    <span class="hljs-keyword">if</span> (avgFPS &gt;= <span class="hljs-number">55</span> &amp;&amp; p1FPS &gt;= <span class="hljs-number">30</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;A&#x27;</span>;
    <span class="hljs-keyword">if</span> (avgFPS &gt;= <span class="hljs-number">45</span> &amp;&amp; p1FPS &gt;= <span class="hljs-number">25</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;B&#x27;</span>;
    <span class="hljs-keyword">if</span> (avgFPS &gt;= <span class="hljs-number">35</span> &amp;&amp; p1FPS &gt;= <span class="hljs-number">20</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;C&#x27;</span>;
    <span class="hljs-keyword">if</span> (avgFPS &gt;= <span class="hljs-number">25</span> &amp;&amp; p1FPS &gt;= <span class="hljs-number">15</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;D&#x27;</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;F&#x27;</span>;
  }
}

<span class="hljs-comment">// React hook for animation performance monitoring</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useAnimationPerformance</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> monitor = <span class="hljs-title function_">useRef</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">AnimationPerformanceMonitor</span>());
  <span class="hljs-keyword">const</span> [metrics, setMetrics] = <span class="hljs-title function_">useState</span>({
    <span class="hljs-attr">averageFPS</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">grade</span>: <span class="hljs-string">&#x27;A&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>,
    <span class="hljs-attr">slowFrameCount</span>: <span class="hljs-number">0</span>,
  });

  <span class="hljs-keyword">const</span> startMonitoring = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">let</span> slowFrameCount = <span class="hljs-number">0</span>;

    monitor.<span class="hljs-property">current</span>.<span class="hljs-title function_">startMonitoring</span>(<span class="hljs-function">(<span class="hljs-params">fps</span>) =&gt;</span> {
      slowFrameCount++;
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">\`⚠️ Slow animation frame: <span class="hljs-subst">\${fps.toFixed(<span class="hljs-number">1</span>)}</span> FPS\`</span>);
    });

    <span class="hljs-comment">// Update metrics every second</span>
    <span class="hljs-keyword">const</span> interval = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setMetrics</span>({
        <span class="hljs-attr">averageFPS</span>: monitor.<span class="hljs-property">current</span>.<span class="hljs-title function_">getAverageFPS</span>(),
        <span class="hljs-attr">grade</span>: monitor.<span class="hljs-property">current</span>.<span class="hljs-title function_">getPerformanceGrade</span>(),
        slowFrameCount,
      });
    }, <span class="hljs-number">1000</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-built_in">clearInterval</span>(interval);
      monitor.<span class="hljs-property">current</span>.<span class="hljs-title function_">stopMonitoring</span>();
    };
  }, []);

  <span class="hljs-keyword">return</span> {
    startMonitoring,
    metrics,
    <span class="hljs-attr">monitor</span>: monitor.<span class="hljs-property">current</span>,
  };
}

<span class="hljs-comment">// Performance-aware animation component</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">MonitoredAnimation</span>(<span class="hljs-params">{ children }: { children: React.ReactNode }</span>) {
  <span class="hljs-keyword">const</span> { startMonitoring, metrics } = <span class="hljs-title function_">useAnimationPerformance</span>();
  <span class="hljs-keyword">const</span> [showWarning, setShowWarning] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;development&#x27;</span>) {
      <span class="hljs-keyword">const</span> cleanup = <span class="hljs-title function_">startMonitoring</span>();
      <span class="hljs-keyword">return</span> cleanup;
    }
  }, [startMonitoring]);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Show warning for poor performance</span>
    <span class="hljs-keyword">if</span> (metrics.<span class="hljs-property">grade</span> === <span class="hljs-string">&#x27;D&#x27;</span> || metrics.<span class="hljs-property">grade</span> === <span class="hljs-string">&#x27;F&#x27;</span>) {
      <span class="hljs-title function_">setShowWarning</span>(<span class="hljs-literal">true</span>);
      <span class="hljs-keyword">const</span> timer = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setShowWarning</span>(<span class="hljs-literal">false</span>), <span class="hljs-number">3000</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearTimeout</span>(timer);
    }
  }, [metrics.<span class="hljs-property">grade</span>]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;monitored-animation&quot;</span>&gt;</span>
      {children}

      {process.env.NODE_ENV === &#x27;development&#x27; &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;animation-metrics&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>FPS: {metrics.averageFPS.toFixed(1)}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Grade: {metrics.grade}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}

      {showWarning &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;performance-warning&quot;</span>&gt;</span>
          ⚠️ Animation performance is poor (Grade: {metrics.grade})
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="إدارة-ميزانية-الإطار">إدارة ميزانية الإطار</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Frame budget manager for complex animations</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">FrameBudgetManager</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">taskQueue</span>: <span class="hljs-title class_">Array</span>&lt;<span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; | <span class="hljs-built_in">void</span>&gt; = [];
  <span class="hljs-keyword">private</span> isProcessing = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">private</span> frameStart = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-keyword">readonly</span> frameDeadline = <span class="hljs-number">16</span>; <span class="hljs-comment">// 16ms for 60fps</span>
  <span class="hljs-keyword">private</span> <span class="hljs-keyword">readonly</span> safetyMargin = <span class="hljs-number">2</span>; <span class="hljs-comment">// 2ms safety margin</span>

  <span class="hljs-title function_">scheduleTask</span>(
    <span class="hljs-attr">task</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; | <span class="hljs-built_in">void</span>,
    <span class="hljs-attr">priority</span>: <span class="hljs-string">&#x27;high&#x27;</span> | <span class="hljs-string">&#x27;normal&#x27;</span> | <span class="hljs-string">&#x27;low&#x27;</span> = <span class="hljs-string">&#x27;normal&#x27;</span>,
  ): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (priority === <span class="hljs-string">&#x27;high&#x27;</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">taskQueue</span>.<span class="hljs-title function_">unshift</span>(task);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">taskQueue</span>.<span class="hljs-title function_">push</span>(task);
    }

    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">isProcessing</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">processQueue</span>();
    }
  }

  <span class="hljs-keyword">private</span> processQueue = <span class="hljs-title function_">async</span> (): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; =&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">isProcessing</span> || <span class="hljs-variable language_">this</span>.<span class="hljs-property">taskQueue</span>.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">isProcessing</span> = <span class="hljs-literal">true</span>;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">frameStart</span> = performance.<span class="hljs-title function_">now</span>();

    <span class="hljs-keyword">while</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">taskQueue</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span> &amp;&amp; <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">hasTimeRemaining</span>()) {
      <span class="hljs-keyword">const</span> task = <span class="hljs-variable language_">this</span>.<span class="hljs-property">taskQueue</span>.<span class="hljs-title function_">shift</span>()!;

      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">await</span> <span class="hljs-title function_">task</span>();
      } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Frame budget task error:&#x27;</span>, error);
      }
    }

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">isProcessing</span> = <span class="hljs-literal">false</span>;

    <span class="hljs-comment">// Continue processing in next frame if tasks remain</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">taskQueue</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-title function_">requestAnimationFrame</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">processQueue</span>);
    }
  };

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">hasTimeRemaining</span>(): <span class="hljs-built_in">boolean</span> {
    <span class="hljs-keyword">const</span> elapsed = performance.<span class="hljs-title function_">now</span>() - <span class="hljs-variable language_">this</span>.<span class="hljs-property">frameStart</span>;
    <span class="hljs-keyword">return</span> elapsed &lt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">frameDeadline</span> - <span class="hljs-variable language_">this</span>.<span class="hljs-property">safetyMargin</span>;
  }

  <span class="hljs-title function_">getRemainingTime</span>(): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">const</span> elapsed = performance.<span class="hljs-title function_">now</span>() - <span class="hljs-variable language_">this</span>.<span class="hljs-property">frameStart</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(<span class="hljs-number">0</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">frameDeadline</span> - <span class="hljs-variable language_">this</span>.<span class="hljs-property">safetyMargin</span> - elapsed);
  }
}

<span class="hljs-comment">// React hook for frame budget management</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useFrameBudget</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> budgetManager = <span class="hljs-title function_">useRef</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FrameBudgetManager</span>());

  <span class="hljs-keyword">const</span> scheduleAnimation = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">animationFn</span>: () =&gt; <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; | <span class="hljs-built_in">void</span>, <span class="hljs-attr">priority</span>: <span class="hljs-string">&#x27;high&#x27;</span> | <span class="hljs-string">&#x27;normal&#x27;</span> | <span class="hljs-string">&#x27;low&#x27;</span> = <span class="hljs-string">&#x27;normal&#x27;</span></span>) =&gt;</span> {
      budgetManager.<span class="hljs-property">current</span>.<span class="hljs-title function_">scheduleTask</span>(animationFn, priority);
    },
    [],
  );

  <span class="hljs-keyword">return</span> { scheduleAnimation };
}

<span class="hljs-comment">// Example usage in complex animation</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ComplexAnimationComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { scheduleAnimation } = <span class="hljs-title function_">useFrameBudget</span>();
  <span class="hljs-keyword">const</span> [items, setItems] = useState&lt;<span class="hljs-title class_">Item</span>[]&gt;([]);

  <span class="hljs-keyword">const</span> animateItems = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// High priority: Update visible items first</span>
    <span class="hljs-title function_">scheduleAnimation</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setItems</span>(<span class="hljs-function">(<span class="hljs-params">prevItems</span>) =&gt;</span>
        prevItems.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> ({
          ...item,
          <span class="hljs-attr">isVisible</span>: <span class="hljs-literal">true</span>,
        })),
      );
    }, <span class="hljs-string">&#x27;high&#x27;</span>);

    <span class="hljs-comment">// Normal priority: Apply transforms</span>
    <span class="hljs-title function_">scheduleAnimation</span>(<span class="hljs-title function_">async</span> () =&gt; {
      <span class="hljs-keyword">const</span> elements = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">&#x27;.animated-item&#x27;</span>);
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> element <span class="hljs-keyword">of</span> elements) {
        (element <span class="hljs-keyword">as</span> <span class="hljs-title class_">HTMLElement</span>).<span class="hljs-property">style</span>.<span class="hljs-property">transform</span> = <span class="hljs-string">&#x27;scale(1.05)&#x27;</span>;
        <span class="hljs-comment">// Yield control if we&#x27;re running out of time</span>
        <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">0</span>));
      }
    });

    <span class="hljs-comment">// Low priority: Update analytics</span>
    <span class="hljs-title function_">scheduleAnimation</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-comment">// Track animation completion</span>
      analytics.<span class="hljs-title function_">track</span>(<span class="hljs-string">&#x27;animation_completed&#x27;</span>, {
        <span class="hljs-attr">itemCount</span>: items.<span class="hljs-property">length</span>,
      });
    }, <span class="hljs-string">&#x27;low&#x27;</span>);
  }, [items, scheduleAnimation]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{animateItems}</span>&gt;</span>Animate Items<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      {items.map((item) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;animated-item&quot;</span>&gt;</span>
          {item.content}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="أنماط-مضادة-شائعة-في-الرسوم-المتحركة">أنماط مضادّة شائعة في الرسوم المتحركة</h2>
<h3 id="تجنب-إرباك-التخطيط">تجنّب إرباك التخطيط</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Animating layout properties</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BadSlider</span>(<span class="hljs-params">{ items }: { items: Item[] }</span>) {
  <span class="hljs-keyword">const</span> [currentIndex, setCurrentIndex] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-comment">// This causes layout recalculation on every frame</span>
  <span class="hljs-keyword">const</span> slideStyle = {
    <span class="hljs-attr">left</span>: <span class="hljs-string">\`-<span class="hljs-subst">\${currentIndex * <span class="hljs-number">100</span>}</span>%\`</span>, <span class="hljs-comment">// ❌ Animates &#x27;left&#x27; property</span>
    <span class="hljs-attr">transition</span>: <span class="hljs-string">&#x27;left 0.3s ease&#x27;</span>,
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;slider-container&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;slider-track&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{slideStyle}</span>&gt;</span>
        {items.map((item, index) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;slide&quot;</span>&gt;</span>
            {item.content}
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Good: Using transforms for hardware acceleration</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">GoodSlider</span>(<span class="hljs-params">{ items }: { items: Item[] }</span>) {
  <span class="hljs-keyword">const</span> [currentIndex, setCurrentIndex] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-comment">// Transform only triggers compositing</span>
  <span class="hljs-keyword">const</span> slideStyle = {
    <span class="hljs-attr">transform</span>: <span class="hljs-string">\`translateX(-<span class="hljs-subst">\${currentIndex * <span class="hljs-number">100</span>}</span>%)\`</span>, <span class="hljs-comment">// ✅ Uses transform</span>
    <span class="hljs-attr">transition</span>: <span class="hljs-string">&#x27;transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)&#x27;</span>,
    <span class="hljs-attr">willChange</span>: <span class="hljs-string">&#x27;transform&#x27;</span>, <span class="hljs-comment">// Hint to browser for optimization</span>
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;slider-container&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;slider-track&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{slideStyle}</span>&gt;</span>
        {items.map((item, index) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;slide&quot;</span>&gt;</span>
            {item.content}
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ❌ Bad: Animating dimensions</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BadAccordion</span>(<span class="hljs-params">{ isExpanded }: { isExpanded: <span class="hljs-built_in">boolean</span> }</span>) {
  <span class="hljs-keyword">const</span> [height, setHeight] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> contentRef = useRef&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (contentRef.<span class="hljs-property">current</span>) {
      <span class="hljs-comment">// ❌ Reading scrollHeight causes layout</span>
      <span class="hljs-keyword">const</span> scrollHeight = contentRef.<span class="hljs-property">current</span>.<span class="hljs-property">scrollHeight</span>;
      <span class="hljs-title function_">setHeight</span>(isExpanded ? scrollHeight : <span class="hljs-number">0</span>);
    }
  }, [isExpanded]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;accordion-content&quot;</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">height</span>, // ❌ <span class="hljs-attr">Animating</span> <span class="hljs-attr">height</span> <span class="hljs-attr">causes</span> <span class="hljs-attr">layout</span> <span class="hljs-attr">thrashing</span>
        <span class="hljs-attr">transition:</span> &#x27;<span class="hljs-attr">height</span> <span class="hljs-attr">0.3s</span> <span class="hljs-attr">ease</span>&#x27;,
        <span class="hljs-attr">overflow:</span> &#x27;<span class="hljs-attr">hidden</span>&#x27;,
      }}
      <span class="hljs-attr">ref</span>=<span class="hljs-string">{contentRef}</span>
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Content that might be very long...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Good: Using transforms with fixed heights</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">GoodAccordion</span>(<span class="hljs-params">{ isExpanded }: { isExpanded: <span class="hljs-built_in">boolean</span> }</span>) {
  <span class="hljs-keyword">const</span> [maxHeight, setMaxHeight] = useState&lt;<span class="hljs-built_in">number</span>&gt;(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> contentRef = useRef&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (contentRef.<span class="hljs-property">current</span> &amp;&amp; maxHeight === <span class="hljs-number">0</span>) {
      <span class="hljs-comment">// Measure once during mount</span>
      <span class="hljs-keyword">const</span> rect = contentRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">getBoundingClientRect</span>();
      <span class="hljs-title function_">setMaxHeight</span>(rect.<span class="hljs-property">height</span>);
    }
  }, [maxHeight]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;accordion-container&quot;</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">height:</span> <span class="hljs-attr">maxHeight</span>,
        <span class="hljs-attr">overflow:</span> &#x27;<span class="hljs-attr">hidden</span>&#x27;,
      }}
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{contentRef}</span>
        <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;accordion-content&quot;</span>
        <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
          <span class="hljs-attr">transform:</span> <span class="hljs-attr">isExpanded</span> ? &#x27;<span class="hljs-attr">translateY</span>(<span class="hljs-attr">0</span>)&#x27; <span class="hljs-attr">:</span> \`<span class="hljs-attr">translateY</span>(<span class="hljs-attr">-</span>\${<span class="hljs-attr">maxHeight</span>}<span class="hljs-attr">px</span>)\`,
          <span class="hljs-attr">transition:</span> &#x27;<span class="hljs-attr">transform</span> <span class="hljs-attr">0.3s</span> <span class="hljs-attr">cubic-bezier</span>(<span class="hljs-attr">0.4</span>, <span class="hljs-attr">0</span>, <span class="hljs-attr">0.2</span>, <span class="hljs-attr">1</span>)&#x27;,
          <span class="hljs-attr">willChange:</span> &#x27;<span class="hljs-attr">transform</span>&#x27;,
        }}
      &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Content that might be very long...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="منع-حجب-الرسوم-المتحركة">منع حجب الرسوم المتحركة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Synchronous state updates during animation</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BadAnimatedCounter</span>(<span class="hljs-params">{ target }: { target: <span class="hljs-built_in">number</span> }</span>) {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">animate</span> = (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-title function_">setCount</span>(<span class="hljs-function">(<span class="hljs-params">prevCount</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> newCount = prevCount + <span class="hljs-number">1</span>;

        <span class="hljs-comment">// ❌ Synchronous DOM update blocks animation</span>
        <span class="hljs-variable language_">document</span>.<span class="hljs-property">title</span> = <span class="hljs-string">\`Count: <span class="hljs-subst">\${newCount}</span>\`</span>;

        <span class="hljs-keyword">if</span> (newCount &lt; target) {
          <span class="hljs-comment">// ❌ requestAnimationFrame with state update on every frame</span>
          <span class="hljs-title function_">requestAnimationFrame</span>(animate);
        }

        <span class="hljs-keyword">return</span> newCount;
      });
    };

    <span class="hljs-title function_">animate</span>();
  }, [target]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;counter&quot;</span>&gt;</span>{count}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Good: Optimized animation with minimal state updates</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">GoodAnimatedCounter</span>(<span class="hljs-params">{ target }: { target: <span class="hljs-built_in">number</span> }</span>) {
  <span class="hljs-keyword">const</span> [displayCount, setDisplayCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> countRef = <span class="hljs-title function_">useRef</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> startTime = <span class="hljs-title function_">useRef</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> duration = <span class="hljs-number">2000</span>; <span class="hljs-comment">// 2 seconds</span>

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    startTime.<span class="hljs-property">current</span> = performance.<span class="hljs-title function_">now</span>();
    countRef.<span class="hljs-property">current</span> = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">const</span> <span class="hljs-title function_">animate</span> = (<span class="hljs-params"><span class="hljs-attr">currentTime</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
      <span class="hljs-keyword">const</span> elapsed = currentTime - startTime.<span class="hljs-property">current</span>;
      <span class="hljs-keyword">const</span> progress = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(elapsed / duration, <span class="hljs-number">1</span>);

      <span class="hljs-comment">// Easing function for smooth animation</span>
      <span class="hljs-keyword">const</span> easedProgress = <span class="hljs-number">1</span> - <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">pow</span>(<span class="hljs-number">1</span> - progress, <span class="hljs-number">3</span>);
      <span class="hljs-keyword">const</span> currentCount = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">round</span>(easedProgress * target);

      <span class="hljs-comment">// Only update state when count actually changes</span>
      <span class="hljs-keyword">if</span> (currentCount !== countRef.<span class="hljs-property">current</span>) {
        countRef.<span class="hljs-property">current</span> = currentCount;
        <span class="hljs-title function_">setDisplayCount</span>(currentCount);

        <span class="hljs-comment">// ✅ Defer non-critical updates</span>
        <span class="hljs-keyword">if</span> (currentCount % <span class="hljs-number">10</span> === <span class="hljs-number">0</span>) {
          <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
            <span class="hljs-variable language_">document</span>.<span class="hljs-property">title</span> = <span class="hljs-string">\`Count: <span class="hljs-subst">\${currentCount}</span>\`</span>;
          }, <span class="hljs-number">0</span>);
        }
      }

      <span class="hljs-keyword">if</span> (progress &lt; <span class="hljs-number">1</span>) {
        <span class="hljs-title function_">requestAnimationFrame</span>(animate);
      }
    };

    <span class="hljs-title function_">requestAnimationFrame</span>(animate);
  }, [target]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;counter&quot;</span>&gt;</span>{displayCount}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// ✅ Better: CSS-based counter animation</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">CSSAnimatedCounter</span>(<span class="hljs-params">{ target }: { target: <span class="hljs-built_in">number</span> }</span>) {
  <span class="hljs-keyword">const</span> counterRef = useRef&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (counterRef.<span class="hljs-property">current</span>) {
      <span class="hljs-comment">// Use CSS custom properties for animation</span>
      counterRef.<span class="hljs-property">current</span>.<span class="hljs-property">style</span>.<span class="hljs-title function_">setProperty</span>(<span class="hljs-string">&#x27;--target&#x27;</span>, target.<span class="hljs-title function_">toString</span>());
      counterRef.<span class="hljs-property">current</span>.<span class="hljs-property">style</span>.<span class="hljs-title function_">setProperty</span>(<span class="hljs-string">&#x27;--start&#x27;</span>, <span class="hljs-string">&#x27;0&#x27;</span>);
    }
  }, [target]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">ref</span>=<span class="hljs-string">{counterRef}</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;css-counter&quot;</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
        // <span class="hljs-attr">CSS</span> <span class="hljs-attr">counter</span> <span class="hljs-attr">animation</span> (<span class="hljs-attr">hardware</span> <span class="hljs-attr">accelerated</span>)
        <span class="hljs-attr">counterReset:</span> &#x27;<span class="hljs-attr">counter</span> <span class="hljs-attr">calc</span>(<span class="hljs-attr">var</span>(<span class="hljs-attr">--start</span>) * <span class="hljs-attr">1</span>)&#x27;,
        <span class="hljs-attr">animation:</span> &#x27;<span class="hljs-attr">countUp</span> <span class="hljs-attr">2s</span> <span class="hljs-attr">cubic-bezier</span>(<span class="hljs-attr">0.4</span>, <span class="hljs-attr">0</span>, <span class="hljs-attr">0.2</span>, <span class="hljs-attr">1</span>)&#x27;,
      }}
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="language-css">{\`
        <span class="hljs-keyword">@keyframes</span> countUp {
          <span class="hljs-selector-tag">to</span> {
            <span class="hljs-attribute">counter-reset</span>: counter <span class="hljs-built_in">calc</span>(<span class="hljs-built_in">var</span>(--target) * <span class="hljs-number">1</span>);
          }
        }

        <span class="hljs-selector-class">.css-counter</span><span class="hljs-selector-pseudo">::after</span> {
          <span class="hljs-attribute">content</span>: <span class="hljs-built_in">counter</span>(counter);
        }
      \`}</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="تقنيات-متقدمة">تقنيات متقدّمة <span class="content-anchor" id="advanced-techniques"></span></h2>
<p>لمزيد من أنماط الرسوم المتحركة المتطوّرة، بما في ذلك تحسين Intersection Observer، والدمج مع Web Animations API، واستراتيجيات اختبار الأداء الشاملة، راجع <a href="https://stevekinney.com/courses/react-performance/animation-performance-advanced">تقنيات متقدّمة في أداء الرسوم المتحركة</a>.</p>
<p>أهم الموضوعات المتقدّمة التي يغطيها:</p>
<ul>
<li><strong>Intersection Observer</strong>: لا تُشغّل الرسوم المتحركة إلا عندما تكون العناصر مرئية لتحسين الأداء</li>
<li><strong>Web Animations API</strong>: تحكّم أدنى مستوى في تسلسلات الرسوم المتحركة المعقّدة</li>
<li><strong>اختبار الأداء</strong>: أطر اختبار آلية للتحقّق من أداء الرسوم المتحركة</li>
<li><strong>التحسين المتقدّم</strong>: إدارة طبقات GPU وتحسين التركيب</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
