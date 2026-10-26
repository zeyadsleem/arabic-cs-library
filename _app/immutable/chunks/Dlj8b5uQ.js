const s="kinney",a="react-performance",n="أداء React",l="inp-production-monitoring",p="مراقبة INP في الإنتاج",t=[{depth:2,id:"بناء-نظام-مراقبة-inp",text:"بناء نظام مراقبة INP"},{depth:3,id:"جمع-بيانات-inp-الأساسي",text:"جمع بيانات INP الأساسي"},{depth:2,id:"تتبع-inp-الخاص-بـ-react",text:"تتبّع INP الخاص بـ React"},{depth:3,id:"تتبع-الأداء-على-مستوى-المكون",text:"تتبّع الأداء على مستوى المكوّن"},{depth:3,id:"تحليل-inp-حسب-المسار",text:"تحليل INP حسب المسار"},{depth:2,id:"ربط-inp-بإجراءات-المستخدم",text:"ربط INP بإجراءات المستخدم"},{depth:3,id:"نظام-إسناد-الإجراءات",text:"نظام إسناد الإجراءات"},{depth:2,id:"لوحة-مراقبة-المستخدمين-الحقيقيين",text:"لوحة مراقبة المستخدمين الحقيقيين"},{depth:3,id:"تجميع-مقاييس-inp",text:"تجميع مقاييس INP"},{depth:2,id:"التنبيه-وكشف-الشذوذ",text:"التنبيه وكشف الشذوذ"},{depth:2,id:"قائمة-أفضل-الممارسات",text:"قائمة أفضل الممارسات"}],e=`<p>حسّنت تطبيق React لديك محليًا. ودرجات INP مثالية في اختباراتك. ثم تنشر إلى الإنتاج، فيبدأ المستخدمون فجأة يعانون تأخّرات تفاعل مقدارها 500 مللي ثانية. ما الذي حدث خطأً؟ كل شيء. فالمستخدمون الحقيقيون لديهم أجهزتهم الحقيقية وظروف شبكتهم الحقيقية وأنماط استخدامهم الحقيقية التي لم تلتقطها اختباراتك الاصطناعية قط.</p>
<p>ولهذا فإن مراقبة INP في الإنتاج ليست اختيارية — بل ضرورية. تحتاج إلى معرفة كيف يختبر المستخدمون الفعليون تطبيقك، وأي التفاعلات بطيئة، والأهم من ذلك: لماذا هي بطيئة. وبدون هذه البيانات فأنت تحسّن على غير هدى.</p>
<p>لنبنِ نظامًا شاملًا لمراقبة INP يلتقط كل تفاعل، ويحدّد الأنماط، ويمنحك الرؤى التي تحتاجها لإصلاح مشكلات الأداء قبل أن يشتكي المستخدمون.</p>
<h2 id="بناء-نظام-مراقبة-inp">بناء نظام مراقبة INP</h2>
<h3 id="جمع-بيانات-inp-الأساسي">جمع بيانات INP الأساسي</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { onINP, <span class="hljs-title class_">INPMetric</span>, <span class="hljs-title class_">INPAttribution</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;web-vitals&#x27;</span>;

<span class="hljs-keyword">class</span> <span class="hljs-title class_">INPCollector</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">INPMetric</span>[] = [];
  <span class="hljs-keyword">private</span> attributions = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">INPAttribution</span>&gt;();
  <span class="hljs-keyword">private</span> <span class="hljs-attr">userContext</span>: <span class="hljs-title class_">UserContext</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">sessionId</span>: <span class="hljs-built_in">string</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">sessionId</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">generateSessionId</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">userContext</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">collectUserContext</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">startCollection</span>();
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">startCollection</span>(<span class="hljs-params"></span>) {
    <span class="hljs-comment">// Collect INP with attribution</span>
    <span class="hljs-title function_">onINP</span>(
      <span class="hljs-function">(<span class="hljs-params">metric</span>) =&gt;</span> {
        <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">processMetric</span>(metric);
      },
      {
        <span class="hljs-attr">reportAllChanges</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Get continuous updates</span>
        <span class="hljs-attr">durationThreshold</span>: <span class="hljs-number">40</span>, <span class="hljs-comment">// Report all interactions &gt; 40ms</span>
      },
    );

    <span class="hljs-comment">// Also collect raw event timing</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">collectEventTiming</span>();
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">processMetric</span>(<span class="hljs-params"><span class="hljs-attr">metric</span>: <span class="hljs-title class_">INPMetric</span></span>) {
    <span class="hljs-comment">// Enrich with context</span>
    <span class="hljs-keyword">const</span> enrichedMetric = {
      ...metric,
      <span class="hljs-attr">sessionId</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">sessionId</span>,
      <span class="hljs-attr">url</span>: <span class="hljs-variable language_">window</span>.<span class="hljs-property">location</span>.<span class="hljs-property">href</span>,
      <span class="hljs-attr">userAgent</span>: navigator.<span class="hljs-property">userAgent</span>,
      <span class="hljs-attr">connection</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getConnectionInfo</span>(),
      <span class="hljs-attr">deviceMemory</span>: (navigator <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">deviceMemory</span>,
      <span class="hljs-attr">hardwareConcurrency</span>: navigator.<span class="hljs-property">hardwareConcurrency</span>,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
      <span class="hljs-attr">context</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">userContext</span>,
    };

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">push</span>(enrichedMetric);

    <span class="hljs-comment">// Report if threshold exceeded</span>
    <span class="hljs-keyword">if</span> (metric.<span class="hljs-property">value</span> &gt; <span class="hljs-number">200</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">reportSlowInteraction</span>(enrichedMetric);
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">collectEventTiming</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-title class_">PerformanceObserver</span>.<span class="hljs-property">supportedEntryTypes</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;event&#x27;</span>)) {
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">const</span> observer = <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceObserver</span>(<span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> entry <span class="hljs-keyword">of</span> list.<span class="hljs-title function_">getEntries</span>()) {
        <span class="hljs-keyword">const</span> eventEntry = entry <span class="hljs-keyword">as</span> <span class="hljs-title class_">PerformanceEventTiming</span>;

        <span class="hljs-keyword">if</span> (eventEntry.<span class="hljs-property">duration</span> &gt; <span class="hljs-number">100</span>) {
          <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">analyzeSlowEvent</span>(eventEntry);
        }
      }
    });

    observer.<span class="hljs-title function_">observe</span>({
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;event&#x27;</span>,
      <span class="hljs-attr">buffered</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">durationThreshold</span>: <span class="hljs-number">100</span>,
    });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">analyzeSlowEvent</span>(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_">PerformanceEventTiming</span></span>) {
    <span class="hljs-keyword">const</span> analysis = {
      <span class="hljs-attr">type</span>: event.<span class="hljs-property">name</span>,
      <span class="hljs-attr">duration</span>: event.<span class="hljs-property">duration</span>,
      <span class="hljs-attr">processingStart</span>: event.<span class="hljs-property">processingStart</span>,
      <span class="hljs-attr">processingEnd</span>: event.<span class="hljs-property">processingEnd</span>,
      <span class="hljs-attr">inputDelay</span>: event.<span class="hljs-property">processingStart</span> - event.<span class="hljs-property">startTime</span>,
      <span class="hljs-attr">processingTime</span>: event.<span class="hljs-property">processingEnd</span> - event.<span class="hljs-property">processingStart</span>,
      <span class="hljs-attr">presentationTime</span>: event.<span class="hljs-property">duration</span> - (event.<span class="hljs-property">processingEnd</span> - event.<span class="hljs-property">startTime</span>),
      <span class="hljs-attr">target</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getTargetSelector</span>(event.<span class="hljs-property">target</span>),
    };

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">attributions</span>.<span class="hljs-title function_">set</span>(event.<span class="hljs-property">interactionId</span> || <span class="hljs-string">&#x27;&#x27;</span>, analysis);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">getTargetSelector</span>(<span class="hljs-attr">target</span>: <span class="hljs-title class_">EventTarget</span> | <span class="hljs-literal">null</span>): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">if</span> (!target || !(target <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Element</span>)) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;unknown&#x27;</span>;

    <span class="hljs-comment">// Build a selector path</span>
    <span class="hljs-keyword">const</span> <span class="hljs-attr">path</span>: <span class="hljs-built_in">string</span>[] = [];
    <span class="hljs-keyword">let</span> <span class="hljs-attr">element</span>: <span class="hljs-title class_">Element</span> | <span class="hljs-literal">null</span> = target;

    <span class="hljs-keyword">while</span> (element &amp;&amp; path.<span class="hljs-property">length</span> &lt; <span class="hljs-number">5</span>) {
      <span class="hljs-keyword">let</span> selector = element.<span class="hljs-property">tagName</span>.<span class="hljs-title function_">toLowerCase</span>();

      <span class="hljs-keyword">if</span> (element.<span class="hljs-property">id</span>) {
        selector += <span class="hljs-string">\`#<span class="hljs-subst">\${element.id}</span>\`</span>;
        path.<span class="hljs-title function_">unshift</span>(selector);
        <span class="hljs-keyword">break</span>;
      }

      <span class="hljs-keyword">if</span> (element.<span class="hljs-property">className</span>) {
        <span class="hljs-keyword">const</span> classes = element.<span class="hljs-property">className</span>.<span class="hljs-title function_">split</span>(<span class="hljs-string">&#x27; &#x27;</span>).<span class="hljs-title function_">filter</span>(<span class="hljs-title class_">Boolean</span>);
        <span class="hljs-keyword">if</span> (classes.<span class="hljs-property">length</span>) {
          selector += <span class="hljs-string">\`.<span class="hljs-subst">\${classes[<span class="hljs-number">0</span>]}</span>\`</span>;
        }
      }

      path.<span class="hljs-title function_">unshift</span>(selector);
      element = element.<span class="hljs-property">parentElement</span>;
    }

    <span class="hljs-keyword">return</span> path.<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27; &gt; &#x27;</span>);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">getConnectionInfo</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> connection = (navigator <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">connection</span>;
    <span class="hljs-keyword">if</span> (!connection) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">effectiveType</span>: connection.<span class="hljs-property">effectiveType</span>,
      <span class="hljs-attr">downlink</span>: connection.<span class="hljs-property">downlink</span>,
      <span class="hljs-attr">rtt</span>: connection.<span class="hljs-property">rtt</span>,
      <span class="hljs-attr">saveData</span>: connection.<span class="hljs-property">saveData</span>,
    };
  }
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserContext</span> {
  <span class="hljs-attr">viewport</span>: { <span class="hljs-attr">width</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">height</span>: <span class="hljs-built_in">number</span> };
  <span class="hljs-attr">screen</span>: { <span class="hljs-attr">width</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">height</span>: <span class="hljs-built_in">number</span> };
  <span class="hljs-attr">referrer</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">language</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">cookieEnabled</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">PerformanceEventTiming</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">PerformanceEntry</span> {
  <span class="hljs-attr">duration</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">interactionId</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">processingStart</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">processingEnd</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">target</span>?: <span class="hljs-title class_">EventTarget</span> | <span class="hljs-literal">null</span>;
}
</code></pre>
<h2 id="تتبع-inp-الخاص-بـ-react">تتبّع INP الخاص بـ React</h2>
<h3 id="تتبع-الأداء-على-مستوى-المكون">تتبّع الأداء على مستوى المكوّن</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// HOC for component interaction tracking</span>
<span class="hljs-keyword">function</span> withINPTracking&lt;P <span class="hljs-keyword">extends</span> <span class="hljs-built_in">object</span>&gt;(
  <span class="hljs-title class_">Component</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>&lt;P&gt;,
  <span class="hljs-attr">componentName</span>: <span class="hljs-built_in">string</span>
) {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">forwardRef</span>&lt;<span class="hljs-built_in">any</span>, P&gt;(<span class="hljs-function">(<span class="hljs-params">props, ref</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> interactionRef = useRef&lt;<span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">number</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>());

    <span class="hljs-keyword">const</span> trackInteraction = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">eventName</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> startTime = performance.<span class="hljs-title function_">now</span>();
      interactionRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">set</span>(eventName, startTime);

      <span class="hljs-comment">// Schedule measurement after paint</span>
      <span class="hljs-title function_">requestAnimationFrame</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-title function_">requestAnimationFrame</span>(<span class="hljs-function">() =&gt;</span> {
          <span class="hljs-keyword">const</span> endTime = performance.<span class="hljs-title function_">now</span>();
          <span class="hljs-keyword">const</span> duration = endTime - startTime;

          <span class="hljs-keyword">if</span> (duration &gt; <span class="hljs-number">50</span>) {
            <span class="hljs-title function_">reportComponentINP</span>({
              <span class="hljs-attr">component</span>: componentName,
              <span class="hljs-attr">event</span>: eventName,
              duration,
              <span class="hljs-attr">props</span>: <span class="hljs-title function_">sanitizeProps</span>(props)
            });
          }
        });
      });
    }, [props]);

    <span class="hljs-comment">// Wrap event handlers</span>
    <span class="hljs-keyword">const</span> wrappedProps = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">const</span> <span class="hljs-attr">wrapped</span>: <span class="hljs-built_in">any</span> = { ...props };

      <span class="hljs-title class_">Object</span>.<span class="hljs-title function_">keys</span>(props).<span class="hljs-title function_">forEach</span>(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (key.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&#x27;on&#x27;</span>) &amp;&amp; <span class="hljs-title function_">typeof</span> (props <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>)[key] === <span class="hljs-string">&#x27;function&#x27;</span>) {
          <span class="hljs-keyword">const</span> originalHandler = (props <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>)[key];
          wrapped[key] = <span class="hljs-function">(<span class="hljs-params">...<span class="hljs-attr">args</span>: <span class="hljs-built_in">any</span>[]</span>) =&gt;</span> {
            <span class="hljs-title function_">trackInteraction</span>(key);
            <span class="hljs-keyword">return</span> <span class="hljs-title function_">originalHandler</span>(...args);
          };
        }
      });

      <span class="hljs-keyword">return</span> wrapped;
    }, [props, trackInteraction]);

    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> {<span class="hljs-attr">...wrappedProps</span>} <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span> /&gt;</span></span>;
  });
}

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">TrackedButton</span> = <span class="hljs-title function_">withINPTracking</span>(<span class="hljs-title class_">Button</span>, <span class="hljs-string">&#x27;Button&#x27;</span>);

<span class="hljs-comment">// Hook for manual tracking</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">useINPTracking</span> = (<span class="hljs-params"><span class="hljs-attr">componentName</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> trackInteraction = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params">
    <span class="hljs-attr">eventName</span>: <span class="hljs-built_in">string</span>,
    <span class="hljs-attr">handler</span>: () =&gt; <span class="hljs-built_in">void</span> | <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;
  </span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> startMark = <span class="hljs-string">\`<span class="hljs-subst">\${componentName}</span>-<span class="hljs-subst">\${eventName}</span>-start\`</span>;
    <span class="hljs-keyword">const</span> endMark = <span class="hljs-string">\`<span class="hljs-subst">\${componentName}</span>-<span class="hljs-subst">\${eventName}</span>-end\`</span>;

    performance.<span class="hljs-title function_">mark</span>(startMark);

    <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">handler</span>();

    <span class="hljs-keyword">if</span> (result <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Promise</span>) {
      result.<span class="hljs-title function_">finally</span>(<span class="hljs-function">() =&gt;</span> {
        performance.<span class="hljs-title function_">mark</span>(endMark);
        performance.<span class="hljs-title function_">measure</span>(eventName, startMark, endMark);

        <span class="hljs-keyword">const</span> measure = performance.<span class="hljs-title function_">getEntriesByName</span>(eventName)[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">if</span> (measure &amp;&amp; measure.<span class="hljs-property">duration</span> &gt; <span class="hljs-number">50</span>) {
          <span class="hljs-title function_">reportComponentINP</span>({
            <span class="hljs-attr">component</span>: componentName,
            <span class="hljs-attr">event</span>: eventName,
            <span class="hljs-attr">duration</span>: measure.<span class="hljs-property">duration</span>
          });
        }
      });
    } <span class="hljs-keyword">else</span> {
      performance.<span class="hljs-title function_">mark</span>(endMark);
      performance.<span class="hljs-title function_">measure</span>(eventName, startMark, endMark);

      <span class="hljs-keyword">const</span> measure = performance.<span class="hljs-title function_">getEntriesByName</span>(eventName)[<span class="hljs-number">0</span>];
      <span class="hljs-keyword">if</span> (measure &amp;&amp; measure.<span class="hljs-property">duration</span> &gt; <span class="hljs-number">50</span>) {
        <span class="hljs-title function_">reportComponentINP</span>({
          <span class="hljs-attr">component</span>: componentName,
          <span class="hljs-attr">event</span>: eventName,
          <span class="hljs-attr">duration</span>: measure.<span class="hljs-property">duration</span>
        });
      }
    }

    <span class="hljs-keyword">return</span> result;
  }, [componentName]);

  <span class="hljs-keyword">return</span> { trackInteraction };
};
</code></pre>
<h3 id="تحليل-inp-حسب-المسار">تحليل INP حسب المسار</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">useRouteINPTracking</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> location = <span class="hljs-title function_">useLocation</span>();
  <span class="hljs-keyword">const</span> [routeMetrics, setRouteMetrics] = useState&lt;<span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">RouteINPMetrics</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>());

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> metrics = <span class="hljs-keyword">new</span> <span class="hljs-title class_">RouteINPMetrics</span>(location.<span class="hljs-property">pathname</span>);
    metrics.<span class="hljs-title function_">start</span>();

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      metrics.<span class="hljs-title function_">stop</span>();
      <span class="hljs-title function_">setRouteMetrics</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>(prev).<span class="hljs-title function_">set</span>(location.<span class="hljs-property">pathname</span>, metrics));
    };
  }, [location]);

  <span class="hljs-keyword">return</span> routeMetrics;
};

<span class="hljs-keyword">class</span> <span class="hljs-title class_">RouteINPMetrics</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">route</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">interactions</span>: <span class="hljs-title class_">InteractionMetric</span>[] = [];
  <span class="hljs-keyword">private</span> <span class="hljs-attr">observer</span>: <span class="hljs-title class_">PerformanceObserver</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">route</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">route</span> = route;
  }

  <span class="hljs-title function_">start</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-title class_">PerformanceObserver</span>.<span class="hljs-property">supportedEntryTypes</span>.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;event&#x27;</span>)) <span class="hljs-keyword">return</span>;

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">observer</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">PerformanceObserver</span>(<span class="hljs-function">(<span class="hljs-params">list</span>) =&gt;</span> {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> entry <span class="hljs-keyword">of</span> list.<span class="hljs-title function_">getEntries</span>()) {
        <span class="hljs-keyword">const</span> event = entry <span class="hljs-keyword">as</span> <span class="hljs-title class_">PerformanceEventTiming</span>;

        <span class="hljs-variable language_">this</span>.<span class="hljs-property">interactions</span>.<span class="hljs-title function_">push</span>({
          <span class="hljs-attr">type</span>: event.<span class="hljs-property">name</span>,
          <span class="hljs-attr">duration</span>: event.<span class="hljs-property">duration</span>,
          <span class="hljs-attr">timestamp</span>: event.<span class="hljs-property">startTime</span>,
          <span class="hljs-attr">route</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">route</span>,
        });
      }
    });

    <span class="hljs-variable language_">this</span>.<span class="hljs-property">observer</span>.<span class="hljs-title function_">observe</span>({ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;event&#x27;</span>, <span class="hljs-attr">buffered</span>: <span class="hljs-literal">false</span> });
  }

  <span class="hljs-title function_">stop</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">observer</span>?.<span class="hljs-title function_">disconnect</span>();
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">analyze</span>();
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">analyze</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">interactions</span>.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> p75 = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculatePercentile</span>(<span class="hljs-number">75</span>);
    <span class="hljs-keyword">const</span> p95 = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculatePercentile</span>(<span class="hljs-number">95</span>);
    <span class="hljs-keyword">const</span> p99 = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculatePercentile</span>(<span class="hljs-number">99</span>);

    <span class="hljs-keyword">const</span> analysis = {
      <span class="hljs-attr">route</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">route</span>,
      <span class="hljs-attr">interactionCount</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">interactions</span>.<span class="hljs-property">length</span>,
      <span class="hljs-attr">p75INP</span>: p75,
      <span class="hljs-attr">p95INP</span>: p95,
      <span class="hljs-attr">p99INP</span>: p99,
      <span class="hljs-attr">slowInteractions</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">interactions</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">i</span>) =&gt;</span> i.<span class="hljs-property">duration</span> &gt; <span class="hljs-number">200</span>),
      <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
    };

    <span class="hljs-comment">// Send to analytics</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">report</span>(analysis);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">calculatePercentile</span>(<span class="hljs-attr">percentile</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">const</span> sorted = [...<span class="hljs-variable language_">this</span>.<span class="hljs-property">interactions</span>].<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.<span class="hljs-property">duration</span> - b.<span class="hljs-property">duration</span>);
    <span class="hljs-keyword">const</span> index = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>((percentile / <span class="hljs-number">100</span>) * sorted.<span class="hljs-property">length</span>) - <span class="hljs-number">1</span>;
    <span class="hljs-keyword">return</span> sorted[index]?.<span class="hljs-property">duration</span> || <span class="hljs-number">0</span>;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">report</span>(<span class="hljs-params"><span class="hljs-attr">analysis</span>: <span class="hljs-built_in">any</span></span>) {
    navigator.<span class="hljs-title function_">sendBeacon</span>(<span class="hljs-string">&#x27;/api/metrics/route-inp&#x27;</span>, <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(analysis));
  }
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">InteractionMetric</span> {
  <span class="hljs-attr">type</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">duration</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">route</span>: <span class="hljs-built_in">string</span>;
}
</code></pre>
<h2 id="ربط-inp-بإجراءات-المستخدم">ربط INP بإجراءات المستخدم</h2>
<h3 id="نظام-إسناد-الإجراءات">نظام إسناد الإجراءات</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">ActionAttributionSystem</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">actionStack</span>: <span class="hljs-title class_">UserAction</span>[] = [];
  <span class="hljs-keyword">private</span> actionMap = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">ActionMetrics</span>&gt;();

  <span class="hljs-title function_">trackAction</span>(<span class="hljs-params"><span class="hljs-attr">action</span>: <span class="hljs-title class_">UserAction</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">actionStack</span>.<span class="hljs-title function_">push</span>(action);

    <span class="hljs-comment">// Link to performance entries</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">correlateWithPerformance</span>(action);

    <span class="hljs-comment">// Clean old actions</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">cleanOldActions</span>();
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">correlateWithPerformance</span>(<span class="hljs-params"><span class="hljs-attr">action</span>: <span class="hljs-title class_">UserAction</span></span>) {
    <span class="hljs-comment">// Get recent performance entries</span>
    <span class="hljs-keyword">const</span> entries = performance.<span class="hljs-title function_">getEntriesByType</span>(<span class="hljs-string">&#x27;event&#x27;</span>) <span class="hljs-keyword">as</span> <span class="hljs-title class_">PerformanceEventTiming</span>[];

    <span class="hljs-keyword">const</span> relevantEntries = entries.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">entry</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">abs</span>(entry.<span class="hljs-property">startTime</span> - action.<span class="hljs-property">timestamp</span>) &lt; <span class="hljs-number">100</span>;
    });

    <span class="hljs-keyword">if</span> (relevantEntries.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">const</span> slowest = relevantEntries.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">prev, curr</span>) =&gt;</span>
        curr.<span class="hljs-property">duration</span> &gt; prev.<span class="hljs-property">duration</span> ? curr : prev,
      );

      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">updateActionMetrics</span>(action, slowest);
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">updateActionMetrics</span>(<span class="hljs-params"><span class="hljs-attr">action</span>: <span class="hljs-title class_">UserAction</span>, <span class="hljs-attr">timing</span>: <span class="hljs-title class_">PerformanceEventTiming</span></span>) {
    <span class="hljs-keyword">const</span> key = <span class="hljs-string">\`<span class="hljs-subst">\${action.<span class="hljs-keyword">type</span>}</span>:<span class="hljs-subst">\${action.target}</span>\`</span>;

    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">actionMap</span>.<span class="hljs-title function_">has</span>(key)) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">actionMap</span>.<span class="hljs-title function_">set</span>(key, {
        <span class="hljs-attr">action</span>: action.<span class="hljs-property">type</span>,
        <span class="hljs-attr">target</span>: action.<span class="hljs-property">target</span>,
        <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">totalDuration</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">maxDuration</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">minDuration</span>: <span class="hljs-title class_">Infinity</span>,
        <span class="hljs-attr">slowCount</span>: <span class="hljs-number">0</span>,
      });
    }

    <span class="hljs-keyword">const</span> metrics = <span class="hljs-variable language_">this</span>.<span class="hljs-property">actionMap</span>.<span class="hljs-title function_">get</span>(key)!;
    metrics.<span class="hljs-property">count</span>++;
    metrics.<span class="hljs-property">totalDuration</span> += timing.<span class="hljs-property">duration</span>;
    metrics.<span class="hljs-property">maxDuration</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(metrics.<span class="hljs-property">maxDuration</span>, timing.<span class="hljs-property">duration</span>);
    metrics.<span class="hljs-property">minDuration</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(metrics.<span class="hljs-property">minDuration</span>, timing.<span class="hljs-property">duration</span>);

    <span class="hljs-keyword">if</span> (timing.<span class="hljs-property">duration</span> &gt; <span class="hljs-number">200</span>) {
      metrics.<span class="hljs-property">slowCount</span>++;
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">reportSlowAction</span>(action, timing);
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">reportSlowAction</span>(<span class="hljs-params"><span class="hljs-attr">action</span>: <span class="hljs-title class_">UserAction</span>, <span class="hljs-attr">timing</span>: <span class="hljs-title class_">PerformanceEventTiming</span></span>) {
    <span class="hljs-keyword">const</span> report = {
      <span class="hljs-attr">action</span>: action.<span class="hljs-property">type</span>,
      <span class="hljs-attr">target</span>: action.<span class="hljs-property">target</span>,
      <span class="hljs-attr">component</span>: action.<span class="hljs-property">component</span>,
      <span class="hljs-attr">duration</span>: timing.<span class="hljs-property">duration</span>,
      <span class="hljs-attr">inputDelay</span>: timing.<span class="hljs-property">processingStart</span> - timing.<span class="hljs-property">startTime</span>,
      <span class="hljs-attr">processingTime</span>: timing.<span class="hljs-property">processingEnd</span> - timing.<span class="hljs-property">processingStart</span>,
      <span class="hljs-attr">context</span>: action.<span class="hljs-property">context</span>,
      <span class="hljs-attr">timestamp</span>: action.<span class="hljs-property">timestamp</span>,
    };

    <span class="hljs-comment">// Send immediately for slow interactions</span>
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/metrics/slow-action&#x27;</span>, {
      <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(report),
      <span class="hljs-attr">keepalive</span>: <span class="hljs-literal">true</span>,
    });
  }

  <span class="hljs-title function_">getActionMetrics</span>(): <span class="hljs-title class_">ActionMetrics</span>[] {
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">actionMap</span>.<span class="hljs-title function_">values</span>());
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">cleanOldActions</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> cutoff = <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() - <span class="hljs-number">60000</span>; <span class="hljs-comment">// Keep last minute</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">actionStack</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">actionStack</span>.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">a</span>) =&gt;</span> a.<span class="hljs-property">timestamp</span> &gt; cutoff);
  }
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">UserAction</span> {
  <span class="hljs-attr">type</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">target</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">component</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">timestamp</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">context</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ActionMetrics</span> {
  <span class="hljs-attr">action</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">target</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">count</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">totalDuration</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">maxDuration</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">minDuration</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">slowCount</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-comment">// React integration</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ActionContext</span> = <span class="hljs-title class_">React</span>.<span class="hljs-property">createContext</span>&lt;<span class="hljs-title class_">ActionAttributionSystem</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">useActionTracking</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> system = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">ActionContext</span>);

  <span class="hljs-keyword">const</span> trackAction = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">type</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">target</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">context</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;</span>) =&gt;</span> {
      system?.<span class="hljs-title function_">trackAction</span>({
        <span class="hljs-keyword">type</span>,
        target,
        <span class="hljs-attr">component</span>: <span class="hljs-title function_">getComponentName</span>(),
        <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
        context,
      });
    },
    [system],
  );

  <span class="hljs-keyword">return</span> { trackAction };
};
</code></pre>
<h2 id="لوحة-مراقبة-المستخدمين-الحقيقيين">لوحة مراقبة المستخدمين الحقيقيين</h2>
<h3 id="تجميع-مقاييس-inp">تجميع مقاييس INP</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">INPAggregator</span> {
  <span class="hljs-keyword">private</span> buckets = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">MetricBucket</span>&gt;();
  <span class="hljs-keyword">private</span> flushInterval = <span class="hljs-number">30000</span>; <span class="hljs-comment">// 30 seconds</span>
  <span class="hljs-keyword">private</span> <span class="hljs-attr">timer</span>: <span class="hljs-title class_">NodeJS</span>.<span class="hljs-property">Timeout</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">startAggregation</span>();
  }

  <span class="hljs-title function_">addMetric</span>(<span class="hljs-params"><span class="hljs-attr">metric</span>: <span class="hljs-title class_">INPMetric</span></span>) {
    <span class="hljs-keyword">const</span> bucketKey = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">getBucketKey</span>(metric);

    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>.<span class="hljs-title function_">has</span>(bucketKey)) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>.<span class="hljs-title function_">set</span>(bucketKey, {
        <span class="hljs-attr">key</span>: bucketKey,
        <span class="hljs-attr">metrics</span>: [],
        <span class="hljs-attr">stats</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">initializeStats</span>(),
      });
    }

    <span class="hljs-keyword">const</span> bucket = <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>.<span class="hljs-title function_">get</span>(bucketKey)!;
    bucket.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">push</span>(metric);
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">updateStats</span>(bucket.<span class="hljs-property">stats</span>, metric);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">getBucketKey</span>(<span class="hljs-attr">metric</span>: <span class="hljs-title class_">INPMetric</span>): <span class="hljs-built_in">string</span> {
    <span class="hljs-keyword">const</span> url = <span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(metric.<span class="hljs-property">url</span> || <span class="hljs-variable language_">window</span>.<span class="hljs-property">location</span>.<span class="hljs-property">href</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-string">\`<span class="hljs-subst">\${url.pathname}</span>:<span class="hljs-subst">\${metric.name}</span>\`</span>;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">initializeStats</span>(): <span class="hljs-title class_">BucketStats</span> {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">sum</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">min</span>: <span class="hljs-title class_">Infinity</span>,
      <span class="hljs-attr">max</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">p50</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">p75</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">p95</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">p99</span>: <span class="hljs-number">0</span>,
    };
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">updateStats</span>(<span class="hljs-params"><span class="hljs-attr">stats</span>: <span class="hljs-title class_">BucketStats</span>, <span class="hljs-attr">metric</span>: <span class="hljs-title class_">INPMetric</span></span>) {
    stats.<span class="hljs-property">count</span>++;
    stats.<span class="hljs-property">sum</span> += metric.<span class="hljs-property">value</span>;
    stats.<span class="hljs-property">min</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(stats.<span class="hljs-property">min</span>, metric.<span class="hljs-property">value</span>);
    stats.<span class="hljs-property">max</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(stats.<span class="hljs-property">max</span>, metric.<span class="hljs-property">value</span>);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">calculatePercentiles</span>(<span class="hljs-params"><span class="hljs-attr">bucket</span>: <span class="hljs-title class_">MetricBucket</span></span>) {
    <span class="hljs-keyword">const</span> values = bucket.<span class="hljs-property">metrics</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">m</span>) =&gt;</span> m.<span class="hljs-property">value</span>).<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a - b);
    <span class="hljs-keyword">const</span> len = values.<span class="hljs-property">length</span>;

    bucket.<span class="hljs-property">stats</span>.<span class="hljs-property">p50</span> = values[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(len * <span class="hljs-number">0.5</span>)] || <span class="hljs-number">0</span>;
    bucket.<span class="hljs-property">stats</span>.<span class="hljs-property">p75</span> = values[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(len * <span class="hljs-number">0.75</span>)] || <span class="hljs-number">0</span>;
    bucket.<span class="hljs-property">stats</span>.<span class="hljs-property">p95</span> = values[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(len * <span class="hljs-number">0.95</span>)] || <span class="hljs-number">0</span>;
    bucket.<span class="hljs-property">stats</span>.<span class="hljs-property">p99</span> = values[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(len * <span class="hljs-number">0.99</span>)] || <span class="hljs-number">0</span>;
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">startAggregation</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span> = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">flush</span>();
    }, <span class="hljs-variable language_">this</span>.<span class="hljs-property">flushInterval</span>);
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">flush</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>.<span class="hljs-property">size</span> === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Calculate percentiles for each bucket</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> bucket <span class="hljs-keyword">of</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>.<span class="hljs-title function_">values</span>()) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculatePercentiles</span>(bucket);
    }

    <span class="hljs-comment">// Prepare batch report</span>
    <span class="hljs-keyword">const</span> report = {
      <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
      <span class="hljs-attr">buckets</span>: <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>.<span class="hljs-title function_">values</span>()).<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">b</span>) =&gt;</span> ({
        <span class="hljs-attr">key</span>: b.<span class="hljs-property">key</span>,
        <span class="hljs-attr">stats</span>: b.<span class="hljs-property">stats</span>,
        <span class="hljs-attr">sampleCount</span>: b.<span class="hljs-property">metrics</span>.<span class="hljs-property">length</span>,
      })),
    };

    <span class="hljs-comment">// Send to backend</span>
    <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">sendReport</span>(report);

    <span class="hljs-comment">// Clear buckets</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>.<span class="hljs-title function_">clear</span>();
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">sendReport</span>(<span class="hljs-params"><span class="hljs-attr">report</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/metrics/inp-aggregate&#x27;</span>, {
        <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
        <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
        <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(report),
        <span class="hljs-attr">keepalive</span>: <span class="hljs-literal">true</span>,
      });
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Failed to send INP report:&#x27;</span>, error);
      <span class="hljs-comment">// Store locally for retry</span>
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">storeLocally</span>(report);
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">storeLocally</span>(<span class="hljs-params"><span class="hljs-attr">report</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-keyword">const</span> stored = <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">getItem</span>(<span class="hljs-string">&#x27;inp-reports&#x27;</span>) || <span class="hljs-string">&#x27;[]&#x27;</span>;
    <span class="hljs-keyword">const</span> reports = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(stored);
    reports.<span class="hljs-title function_">push</span>(report);

    <span class="hljs-comment">// Keep only last 10 reports</span>
    <span class="hljs-keyword">if</span> (reports.<span class="hljs-property">length</span> &gt; <span class="hljs-number">10</span>) {
      reports.<span class="hljs-title function_">shift</span>();
    }

    <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">setItem</span>(<span class="hljs-string">&#x27;inp-reports&#x27;</span>, <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(reports));
  }

  <span class="hljs-title function_">stop</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span>) {
      <span class="hljs-built_in">clearInterval</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">timer</span>);
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">flush</span>(); <span class="hljs-comment">// Final flush</span>
    }
  }
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">MetricBucket</span> {
  <span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">metrics</span>: <span class="hljs-title class_">INPMetric</span>[];
  <span class="hljs-attr">stats</span>: <span class="hljs-title class_">BucketStats</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">BucketStats</span> {
  <span class="hljs-attr">count</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">sum</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">min</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">max</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">p50</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">p75</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">p95</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">p99</span>: <span class="hljs-built_in">number</span>;
}
</code></pre>
<h2 id="التنبيه-وكشف-الشذوذ">التنبيه وكشف الشذوذ</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">INPAnomalyDetector</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">baseline</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">BaselineMetrics</span>&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();
  <span class="hljs-keyword">private</span> alertThresholds = {
    <span class="hljs-attr">absolute</span>: <span class="hljs-number">500</span>, <span class="hljs-comment">// Alert if INP &gt; 500ms</span>
    <span class="hljs-attr">relative</span>: <span class="hljs-number">2.0</span>, <span class="hljs-comment">// Alert if INP &gt; 2x baseline</span>
    <span class="hljs-attr">volumeThreshold</span>: <span class="hljs-number">10</span>, <span class="hljs-comment">// Minimum events before alerting</span>
  };

  <span class="hljs-title function_">updateBaseline</span>(<span class="hljs-params"><span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span></span>) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">baseline</span>.<span class="hljs-title function_">has</span>(key)) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">baseline</span>.<span class="hljs-title function_">set</span>(key, {
        <span class="hljs-attr">values</span>: [],
        <span class="hljs-attr">mean</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">stdDev</span>: <span class="hljs-number">0</span>,
      });
    }

    <span class="hljs-keyword">const</span> baseline = <span class="hljs-variable language_">this</span>.<span class="hljs-property">baseline</span>.<span class="hljs-title function_">get</span>(key)!;
    baseline.<span class="hljs-property">values</span>.<span class="hljs-title function_">push</span>(value);

    <span class="hljs-comment">// Keep rolling window of 1000 values</span>
    <span class="hljs-keyword">if</span> (baseline.<span class="hljs-property">values</span>.<span class="hljs-property">length</span> &gt; <span class="hljs-number">1000</span>) {
      baseline.<span class="hljs-property">values</span>.<span class="hljs-title function_">shift</span>();
    }

    <span class="hljs-comment">// Recalculate statistics</span>
    <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">calculateStatistics</span>(baseline);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">calculateStatistics</span>(<span class="hljs-params"><span class="hljs-attr">baseline</span>: <span class="hljs-title class_">BaselineMetrics</span></span>) {
    <span class="hljs-keyword">const</span> values = baseline.<span class="hljs-property">values</span>;
    <span class="hljs-keyword">const</span> sum = values.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>);
    baseline.<span class="hljs-property">mean</span> = sum / values.<span class="hljs-property">length</span>;

    <span class="hljs-keyword">const</span> squaredDiffs = values.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">v</span>) =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">pow</span>(v - baseline.<span class="hljs-property">mean</span>, <span class="hljs-number">2</span>));
    <span class="hljs-keyword">const</span> avgSquaredDiff = squaredDiffs.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>) / values.<span class="hljs-property">length</span>;
    baseline.<span class="hljs-property">stdDev</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">sqrt</span>(avgSquaredDiff);
  }

  <span class="hljs-title function_">detectAnomaly</span>(<span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span>): <span class="hljs-title class_">AnomalyResult</span> {
    <span class="hljs-keyword">const</span> baseline = <span class="hljs-variable language_">this</span>.<span class="hljs-property">baseline</span>.<span class="hljs-title function_">get</span>(key);

    <span class="hljs-comment">// Check absolute threshold</span>
    <span class="hljs-keyword">if</span> (value &gt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">alertThresholds</span>.<span class="hljs-property">absolute</span>) {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">isAnomaly</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">severity</span>: <span class="hljs-string">&#x27;critical&#x27;</span>,
        <span class="hljs-attr">reason</span>: <span class="hljs-string">\`INP exceeds absolute threshold (<span class="hljs-subst">\${value}</span>ms &gt; <span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.alertThresholds.absolute}</span>ms)\`</span>,
        value,
        <span class="hljs-attr">threshold</span>: <span class="hljs-variable language_">this</span>.<span class="hljs-property">alertThresholds</span>.<span class="hljs-property">absolute</span>,
      };
    }

    <span class="hljs-comment">// Check relative to baseline</span>
    <span class="hljs-keyword">if</span> (baseline &amp;&amp; baseline.<span class="hljs-property">values</span>.<span class="hljs-property">length</span> &gt;= <span class="hljs-variable language_">this</span>.<span class="hljs-property">alertThresholds</span>.<span class="hljs-property">volumeThreshold</span>) {
      <span class="hljs-keyword">const</span> zScore = (value - baseline.<span class="hljs-property">mean</span>) / baseline.<span class="hljs-property">stdDev</span>;

      <span class="hljs-keyword">if</span> (zScore &gt; <span class="hljs-number">3</span>) {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">isAnomaly</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">severity</span>: <span class="hljs-string">&#x27;high&#x27;</span>,
          <span class="hljs-attr">reason</span>: <span class="hljs-string">\`INP is <span class="hljs-subst">\${zScore.toFixed(<span class="hljs-number">1</span>)}</span> standard deviations above normal\`</span>,
          value,
          <span class="hljs-attr">baseline</span>: baseline.<span class="hljs-property">mean</span>,
        };
      }

      <span class="hljs-keyword">if</span> (value &gt; baseline.<span class="hljs-property">mean</span> * <span class="hljs-variable language_">this</span>.<span class="hljs-property">alertThresholds</span>.<span class="hljs-property">relative</span>) {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">isAnomaly</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">severity</span>: <span class="hljs-string">&#x27;medium&#x27;</span>,
          <span class="hljs-attr">reason</span>: <span class="hljs-string">\`INP is <span class="hljs-subst">\${(value / baseline.mean).toFixed(<span class="hljs-number">1</span>)}</span>x above baseline\`</span>,
          value,
          <span class="hljs-attr">baseline</span>: baseline.<span class="hljs-property">mean</span>,
        };
      }
    }

    <span class="hljs-keyword">return</span> { <span class="hljs-attr">isAnomaly</span>: <span class="hljs-literal">false</span>, value };
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">sendAlert</span>(<span class="hljs-params"><span class="hljs-attr">anomaly</span>: <span class="hljs-title class_">AnomalyResult</span>, <span class="hljs-attr">context</span>: <span class="hljs-built_in">any</span></span>) {
    <span class="hljs-keyword">const</span> alert = {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;INP_ANOMALY&#x27;</span>,
      <span class="hljs-attr">severity</span>: anomaly.<span class="hljs-property">severity</span>,
      <span class="hljs-attr">message</span>: anomaly.<span class="hljs-property">reason</span>,
      <span class="hljs-attr">value</span>: anomaly.<span class="hljs-property">value</span>,
      context,
      <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
    };

    <span class="hljs-comment">// Send to alerting service</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/alerts&#x27;</span>, {
      <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
      <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
      <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(alert),
    });

    <span class="hljs-comment">// Log to console in development</span>
    <span class="hljs-keyword">if</span> (process.<span class="hljs-property">env</span>.<span class="hljs-property">NODE_ENV</span> === <span class="hljs-string">&#x27;development&#x27;</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">warn</span>(<span class="hljs-string">&#x27;INP Anomaly Detected:&#x27;</span>, alert);
    }
  }
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">BaselineMetrics</span> {
  <span class="hljs-attr">values</span>: <span class="hljs-built_in">number</span>[];
  <span class="hljs-attr">mean</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">stdDev</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AnomalyResult</span> {
  <span class="hljs-attr">isAnomaly</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">severity</span>?: <span class="hljs-string">&#x27;low&#x27;</span> | <span class="hljs-string">&#x27;medium&#x27;</span> | <span class="hljs-string">&#x27;high&#x27;</span> | <span class="hljs-string">&#x27;critical&#x27;</span>;
  <span class="hljs-attr">reason</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">baseline</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">threshold</span>?: <span class="hljs-built_in">number</span>;
}
</code></pre>
<h2 id="قائمة-أفضل-الممارسات">قائمة أفضل الممارسات</h2>
<p>✅ <strong>اجمع بيانات شاملة:</strong></p>
<ul>
<li>تتبّع كل التفاعلات، لا العيّنات وحدها</li>
<li>ضمّن سياق الجهاز والشبكة</li>
<li>التقط إسناد التفاعل</li>
</ul>
<p>✅ <strong>راقب حسب الشرائح:</strong></p>
<ul>
<li>تتبّع INP حسب المسار/الصفحة</li>
<li>قسّم حسب نوع الجهاز</li>
<li>راقب حسب سرعة الاتصال</li>
</ul>
<p>✅ <strong>أعدّ التنبيهات:</strong></p>
<ul>
<li>حدّد عتبات مطلقة</li>
<li>اكشف الشذوذ انطلاقًا من خط الأساس</li>
<li>نبّه عند اتجاهات التدهور</li>
</ul>
<p>✅ <strong>اربطها بإجراءات المستخدم:</strong></p>
<ul>
<li>اربط INP بمكوّنات بعينها</li>
<li>تتبّع مسارات المستخدم</li>
<li>حدّد الأنماط المشكِلة</li>
</ul>
<p>✅ <strong>أبلغ برؤى قابلة للتنفيذ:</strong></p>
<ul>
<li>أظهر أسوأ التفاعلات أداءً</li>
<li>أبرز مخاطر التراجع</li>
<li>قدّم توصيات إصلاح</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
