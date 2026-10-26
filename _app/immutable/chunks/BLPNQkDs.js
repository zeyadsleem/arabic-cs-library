const s="kinney",n="react-performance",a="أداء React",l="animation-performance-advanced",t="تقنيات متقدّمة في أداء الرسوم المتحركة",p=[{depth:2,id:"تقنيات-الرسوم-المتحركة-المتقدمة",text:"تقنيات الرسوم المتحركة المتقدّمة"},{depth:3,id:"استخدام-intersection-observer-لتحسين-الأداء",text:"استخدام Intersection Observer لتحسين الأداء"},{depth:3,id:"الدمج-مع-web-animations-api",text:"الدمج مع Web Animations API"},{depth:2,id:"اختبار-أداء-الرسوم-المتحركة",text:"اختبار أداء الرسوم المتحركة"}],e=`<p>بعد أن تتقن أساسيات أداء الرسوم المتحركة في React، ستساعدك هذه التقنيات المتقدّمة على إنشاء رسوم متحركة بالغة الرقي وعالية الأداء تتوسّع مع التطبيقات المعقّدة. هذه الأنماط ضرورية للتطبيقات ذات المتطلبات الكثيفة من الرسوم المتحركة أو التفاعلات الحسّاسة للأداء.</p>
<h2 id="تقنيات-الرسوم-المتحركة-المتقدمة">تقنيات الرسوم المتحركة المتقدّمة</h2>
<h3 id="استخدام-intersection-observer-لتحسين-الأداء">استخدام Intersection Observer لتحسين الأداء</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Performance-conscious animation with Intersection Observer</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useInViewAnimation</span>(<span class="hljs-params">threshold = <span class="hljs-number">0.1</span></span>) {
  <span class="hljs-keyword">const</span> [isVisible, setIsVisible] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> elementRef = useRef&lt;<span class="hljs-title class_">HTMLElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> element = elementRef.<span class="hljs-property">current</span>;
    <span class="hljs-keyword">if</span> (!element) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> observer = <span class="hljs-keyword">new</span> <span class="hljs-title class_">IntersectionObserver</span>(
      <span class="hljs-function">(<span class="hljs-params">[entry]</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (entry.<span class="hljs-property">isIntersecting</span>) {
          <span class="hljs-title function_">setIsVisible</span>(<span class="hljs-literal">true</span>);
          <span class="hljs-comment">// Stop observing once animation is triggered</span>
          observer.<span class="hljs-title function_">disconnect</span>();
        }
      },
      {
        threshold,
        <span class="hljs-comment">// Add margin to trigger animation before element is fully visible</span>
        <span class="hljs-attr">rootMargin</span>: <span class="hljs-string">&#x27;50px 0px&#x27;</span>,
      },
    );

    observer.<span class="hljs-title function_">observe</span>(element);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> observer.<span class="hljs-title function_">disconnect</span>();
  }, [threshold]);

  <span class="hljs-keyword">return</span> { isVisible, elementRef };
}

<span class="hljs-comment">// Animated component that only animates when in view</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">LazyAnimatedCard</span>(<span class="hljs-params">{ children }: { children: React.ReactNode }</span>) {
  <span class="hljs-keyword">const</span> { isVisible, elementRef } = <span class="hljs-title function_">useInViewAnimation</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{elementRef}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">animated-card</span> \${<span class="hljs-attr">isVisible</span> ? &#x27;<span class="hljs-attr">animated-card--visible</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}\`}&gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// CSS for the lazy animation</span>
<span class="hljs-keyword">const</span> lazyAnimationStyles = <span class="hljs-string">\`
.animated-card {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, transform;
}

.animated-card--visible {
  opacity: 1;
  transform: translateY(0);
}

/* Remove will-change after animation completes */
.animated-card--visible {
  animation: removeWillChange 0.6s forwards;
}

@keyframes removeWillChange {
  to {
    will-change: auto;
  }
}
\`</span>;
</code></pre>
<h3 id="الدمج-مع-web-animations-api">الدمج مع Web Animations API</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// High-performance animations with Web Animations API</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useWebAnimation</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> elementRef = useRef&lt;<span class="hljs-title class_">HTMLElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> animate = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">keyframes</span>: <span class="hljs-title class_">Keyframe</span>[], <span class="hljs-attr">options</span>: <span class="hljs-title class_">KeyframeAnimationOptions</span> = {}</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (!elementRef.<span class="hljs-property">current</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> animation = elementRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">animate</span>(keyframes, {
      <span class="hljs-attr">duration</span>: <span class="hljs-number">300</span>,
      <span class="hljs-attr">easing</span>: <span class="hljs-string">&#x27;cubic-bezier(0.4, 0, 0.2, 1)&#x27;</span>,
      <span class="hljs-attr">fill</span>: <span class="hljs-string">&#x27;forwards&#x27;</span>,
      ...options,
    });

    <span class="hljs-keyword">return</span> animation;
  }, []);

  <span class="hljs-keyword">const</span> fadeIn = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">animate</span>([
      { <span class="hljs-attr">opacity</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">transform</span>: <span class="hljs-string">&#x27;scale(0.9)&#x27;</span> },
      { <span class="hljs-attr">opacity</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">transform</span>: <span class="hljs-string">&#x27;scale(1)&#x27;</span> },
    ]);
  }, [animate]);

  <span class="hljs-keyword">const</span> slideUp = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">animate</span>([{ <span class="hljs-attr">transform</span>: <span class="hljs-string">&#x27;translateY(100%)&#x27;</span> }, { <span class="hljs-attr">transform</span>: <span class="hljs-string">&#x27;translateY(0)&#x27;</span> }]);
  }, [animate]);

  <span class="hljs-keyword">const</span> pulse = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">animate</span>(
      [{ <span class="hljs-attr">transform</span>: <span class="hljs-string">&#x27;scale(1)&#x27;</span> }, { <span class="hljs-attr">transform</span>: <span class="hljs-string">&#x27;scale(1.05)&#x27;</span> }, { <span class="hljs-attr">transform</span>: <span class="hljs-string">&#x27;scale(1)&#x27;</span> }],
      {
        <span class="hljs-attr">duration</span>: <span class="hljs-number">600</span>,
        <span class="hljs-attr">iterations</span>: <span class="hljs-number">3</span>,
      },
    );
  }, [animate]);

  <span class="hljs-keyword">return</span> {
    elementRef,
    animate,
    fadeIn,
    slideUp,
    pulse,
  };
}

<span class="hljs-comment">// Component using Web Animations API</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">WebAnimatedButton</span>(<span class="hljs-params">{
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () =&gt; <span class="hljs-built_in">void</span>;
}</span>) {
  <span class="hljs-keyword">const</span> { elementRef, pulse, fadeIn } = <span class="hljs-title function_">useWebAnimation</span>();
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleClick</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span>;

    <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">true</span>);

    <span class="hljs-comment">// Play pulse animation</span>
    <span class="hljs-keyword">const</span> animation = <span class="hljs-title function_">pulse</span>();

    <span class="hljs-keyword">if</span> (animation) {
      <span class="hljs-comment">// Wait for animation to complete</span>
      <span class="hljs-keyword">await</span> animation.<span class="hljs-property">finished</span>;
    }

    <span class="hljs-title function_">onClick</span>();
    <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
  };

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Fade in on mount</span>
    <span class="hljs-title function_">fadeIn</span>();
  }, [fadeIn]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">ref</span>=<span class="hljs-string">{elementRef}</span>
      <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span>
      <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isLoading}</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;web-animated-button&quot;</span>
    &gt;</span>
      {isLoading ? &#x27;Loading...&#x27; : children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="اختبار-أداء-الرسوم-المتحركة">اختبار أداء الرسوم المتحركة</h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Animation performance testing utilities</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">AnimationTester</span> {
  <span class="hljs-keyword">async</span> <span class="hljs-title function_">testAnimationPerformance</span>(
    <span class="hljs-attr">component</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;<span class="hljs-built_in">any</span>&gt;,
    <span class="hljs-attr">props</span>: <span class="hljs-built_in">any</span>,
    <span class="hljs-attr">animationTrigger</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>,
    <span class="hljs-attr">duration</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">1000</span>,
  ): <span class="hljs-title class_">Promise</span>&lt;{
    <span class="hljs-attr">averageFPS</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">frameDrops</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">grade</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">recommendations</span>: <span class="hljs-built_in">string</span>[];
  }&gt; {
    <span class="hljs-keyword">const</span> container = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;div&#x27;</span>);
    <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-title function_">appendChild</span>(container);

    <span class="hljs-comment">// Setup performance monitoring</span>
    <span class="hljs-keyword">const</span> monitor = <span class="hljs-keyword">new</span> <span class="hljs-title class_">AnimationPerformanceMonitor</span>();
    <span class="hljs-keyword">const</span> <span class="hljs-attr">frameRates</span>: <span class="hljs-built_in">number</span>[] = [];
    <span class="hljs-keyword">let</span> frameDrops = <span class="hljs-number">0</span>;

    monitor.<span class="hljs-title function_">startMonitoring</span>(<span class="hljs-function">(<span class="hljs-params">fps</span>) =&gt;</span> {
      frameRates.<span class="hljs-title function_">push</span>(fps);
      <span class="hljs-keyword">if</span> (fps &lt; <span class="hljs-number">30</span>) frameDrops++;
    });

    <span class="hljs-keyword">try</span> {
      <span class="hljs-comment">// Render component</span>
      <span class="hljs-keyword">const</span> root = <span class="hljs-title class_">ReactDOM</span>.<span class="hljs-title function_">createRoot</span>(container);
      root.<span class="hljs-title function_">render</span>(<span class="hljs-title class_">React</span>.<span class="hljs-title function_">createElement</span>(component, props));

      <span class="hljs-comment">// Wait for initial render</span>
      <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">100</span>));

      <span class="hljs-comment">// Trigger animation</span>
      <span class="hljs-title function_">animationTrigger</span>();

      <span class="hljs-comment">// Monitor for specified duration</span>
      <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, duration));

      monitor.<span class="hljs-title function_">stopMonitoring</span>();

      <span class="hljs-keyword">const</span> averageFPS = frameRates.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, fps</span>) =&gt;</span> sum + fps, <span class="hljs-number">0</span>) / frameRates.<span class="hljs-property">length</span>;
      <span class="hljs-keyword">const</span> grade = monitor.<span class="hljs-title function_">getPerformanceGrade</span>();

      <span class="hljs-keyword">const</span> recommendations = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">generateRecommendations</span>(averageFPS, frameDrops);

      <span class="hljs-keyword">return</span> {
        averageFPS,
        frameDrops,
        grade,
        recommendations,
      };
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-title function_">removeChild</span>(container);
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">generateRecommendations</span>(<span class="hljs-attr">averageFPS</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">frameDrops</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">string</span>[] {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">recommendations</span>: <span class="hljs-built_in">string</span>[] = [];

    <span class="hljs-keyword">if</span> (averageFPS &lt; <span class="hljs-number">45</span>) {
      recommendations.<span class="hljs-title function_">push</span>(<span class="hljs-string">&#x27;Consider using transform/opacity instead of layout properties&#x27;</span>);
      recommendations.<span class="hljs-title function_">push</span>(<span class="hljs-string">&#x27;Reduce animation complexity or duration&#x27;</span>);
    }

    <span class="hljs-keyword">if</span> (frameDrops &gt; <span class="hljs-number">10</span>) {
      recommendations.<span class="hljs-title function_">push</span>(
        <span class="hljs-string">&#x27;Too many dropped frames - check for expensive operations during animation&#x27;</span>,
      );
    }

    <span class="hljs-keyword">if</span> (averageFPS &lt; <span class="hljs-number">30</span>) {
      recommendations.<span class="hljs-title function_">push</span>(<span class="hljs-string">&#x27;Critical performance issue - animation may be blocking main thread&#x27;</span>);
    }

    <span class="hljs-keyword">return</span> recommendations;
  }
}

<span class="hljs-comment">// Jest integration for animation testing</span>
<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;Animation Performance&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> tester = <span class="hljs-keyword">new</span> <span class="hljs-title class_">AnimationTester</span>();

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should maintain 60fps during modal animation&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> tester.<span class="hljs-title function_">testAnimationPerformance</span>(
      <span class="hljs-title class_">PerformantModal</span>,
      { <span class="hljs-attr">isOpen</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">onClose</span>: <span class="hljs-function">() =&gt;</span> {} },
      <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-comment">// Trigger modal open</span>
        <span class="hljs-keyword">const</span> button = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&#x27;[data-testid=&quot;open-modal&quot;]&#x27;</span>);
        button?.<span class="hljs-title function_">click</span>();
      },
      <span class="hljs-number">500</span>, <span class="hljs-comment">// 500ms animation</span>
    );

    <span class="hljs-title function_">expect</span>(results.<span class="hljs-property">averageFPS</span>).<span class="hljs-title function_">toBeGreaterThan</span>(<span class="hljs-number">45</span>);
    <span class="hljs-title function_">expect</span>(results.<span class="hljs-property">frameDrops</span>).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">5</span>);
    <span class="hljs-title function_">expect</span>(results.<span class="hljs-property">grade</span>).<span class="hljs-property">not</span>.<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;F&#x27;</span>);
  });
});
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
