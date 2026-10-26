const s="kinney",a="react-performance",n="أداء React",l="view-transitions-api",p="واجهة انتقالات العرض (View Transitions API) في React",t=[{depth:2,id:"فهم-واجهة-انتقالات-العرض",text:"فهم واجهة انتقالات العرض"},{depth:2,id:"أنماط-التكامل-مع-react",text:"أنماط التكامل مع React"},{depth:3,id:"التكامل-الأساسي-مع-react-router",text:"التكامل الأساسي مع React Router"},{depth:3,id:"مدير-انتقالات-متقدم",text:"مدير انتقالات متقدم"},{depth:2,id:"انتقالات-العرض-المسماة",text:"انتقالات العرض المسماة"},{depth:3,id:"تنفيذ-انتقالات-العناصر-المشتركة",text:"تنفيذ انتقالات العناصر المشتركة"},{depth:3,id:"أسماء-انتقالات-عرض-ديناميكية",text:"أسماء انتقالات عرض ديناميكية"},{depth:2,id:"حركات-css-المخصصة",text:"حركات CSS المخصصة"},{depth:3,id:"تعريف-حركات-الانتقال",text:"تعريف حركات الانتقال"},{depth:3,id:"تحكم-برمجي-في-الحركة",text:"تحكم برمجي في الحركة"},{depth:2,id:"تحسين-الأداء",text:"تحسين الأداء"},{depth:3,id:"تقليل-تعقيد-الرسم",text:"تقليل تعقيد الرسم"},{depth:3,id:"انتقالات-شرطية-حسب-الجهاز",text:"انتقالات شرطية حسب الجهاز"},{depth:2,id:"استراتيجيات-التبديل-الاحتياطي",text:"استراتيجيات التبديل الاحتياطي"},{depth:3,id:"التحسين-التدريجي",text:"التحسين التدريجي"},{depth:2,id:"التكامل-مع-إدارة-الحالة",text:"التكامل مع إدارة الحالة"},{depth:3,id:"التكامل-مع-redux",text:"التكامل مع Redux"},{depth:2,id:"قائمة-أفضل-الممارسات",text:"قائمة أفضل الممارسات"}],e=`<p>يتنقل تطبيق React لديك فورًا بفضل التوجيه من جانب العميل. لكن الفورية ليست أفضل دائمًا. عندما تتغير الصفحة فجأة، يفقد المستخدمون السياق. فهم لا يرون كيف ترتبط الصفحة القديمة بالجديدة. ويختبرون ما يسميه المصممون «الحمل المعرفي» — تلك اللحظة المربكة التي يحتاج فيها دماغهم إلى إعادة التوجيه.</p>
<p>حلّت تطبيقات الهاتف الأصلية هذا منذ سنوات بانتقالات سلسة ترشد العين من حالة إلى أخرى. والآن، تجلب واجهة انتقالات العرض (View Transitions API) القوة نفسها إلى الويب. تخيّل صور منتجات تكبر بسلاسة إلى عروض تفصيلية. وتنقلًا ينزلق طبيعيًا بين الصفحات. وتغيرات حالة تبدو مقصودة لا مربكة.</p>
<p>لنحوّل تنقل تطبيق React لديك من وظيفي إلى ممتع، باستخدام واجهة انتقالات العرض لإنشاء انتقالات ليست سلسة فحسب — بل ذات معنى.</p>
<h2 id="فهم-واجهة-انتقالات-العرض">فهم واجهة انتقالات العرض</h2>
<p>تلتقط واجهة انتقالات العرض لقطات وتحرّك الانتقال بينها:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ViewTransition</span> {
  <span class="hljs-attr">ready</span>: <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;; <span class="hljs-comment">// Resolves when transition is ready</span>
  <span class="hljs-attr">finished</span>: <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;; <span class="hljs-comment">// Resolves when transition completes</span>
  <span class="hljs-attr">updateCallbackDone</span>: <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;; <span class="hljs-comment">// Resolves when DOM update is done</span>
  <span class="hljs-title function_">skipTransition</span>(): <span class="hljs-built_in">void</span>; <span class="hljs-comment">// Skip the transition</span>
}

<span class="hljs-comment">// Basic usage</span>
<span class="hljs-keyword">if</span> (<span class="hljs-variable language_">document</span>.<span class="hljs-property">startViewTransition</span>) {
  <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">startViewTransition</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Update the DOM</span>
    <span class="hljs-title function_">updateDOM</span>();
  });
} <span class="hljs-keyword">else</span> {
  <span class="hljs-comment">// Fallback for browsers without support</span>
  <span class="hljs-title function_">updateDOM</span>();
}
</code></pre>
<h2 id="أنماط-التكامل-مع-react">أنماط التكامل مع React</h2>
<h3 id="التكامل-الأساسي-مع-react-router">التكامل الأساسي مع React Router</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useNavigate, useLocation } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-router-dom&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title function_">useViewTransition</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> navigate = <span class="hljs-title function_">useNavigate</span>();

  <span class="hljs-keyword">const</span> navigateWithTransition = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">to</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">document</span>.<span class="hljs-property">startViewTransition</span>) {
      <span class="hljs-title function_">navigate</span>(to);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">startViewTransition</span>(<span class="hljs-title function_">async</span> () =&gt; {
      <span class="hljs-title function_">navigate</span>(to);
      <span class="hljs-comment">// Wait for React to render</span>
      <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">0</span>));
    });
  }, [navigate]);

  <span class="hljs-keyword">return</span> { navigateWithTransition };
};

<span class="hljs-comment">// Usage in component</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">NavigationLink</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">to</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span> }&gt; = <span class="hljs-function">(<span class="hljs-params">{
  to,
  children
}</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { navigateWithTransition } = <span class="hljs-title function_">useViewTransition</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> navigateWithTransition(to)}&gt;
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
};
</code></pre>
<h3 id="مدير-انتقالات-متقدم">مدير انتقالات متقدم</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">ViewTransitionManager</span> {
  <span class="hljs-keyword">private</span> <span class="hljs-attr">currentTransition</span>: <span class="hljs-title class_">ViewTransition</span> | <span class="hljs-literal">null</span> = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">transitionQueue</span>: <span class="hljs-title class_">Array</span>&lt;<span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>&gt; = [];

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">startTransition</span>(
    <span class="hljs-attr">updateDOM</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span> | <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;,
    <span class="hljs-attr">options</span>?: <span class="hljs-title class_">TransitionOptions</span>,
  ): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
    <span class="hljs-comment">// Skip if no support</span>
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">document</span>.<span class="hljs-property">startViewTransition</span>) {
      <span class="hljs-keyword">await</span> <span class="hljs-title function_">updateDOM</span>();
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// Cancel current transition if exists</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">currentTransition</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">currentTransition</span>.<span class="hljs-title function_">skipTransition</span>();
    }

    <span class="hljs-comment">// Apply transition class names</span>
    <span class="hljs-keyword">if</span> (options?.<span class="hljs-property">className</span>) {
      <span class="hljs-variable language_">document</span>.<span class="hljs-property">documentElement</span>.<span class="hljs-property">classList</span>.<span class="hljs-title function_">add</span>(options.<span class="hljs-property">className</span>);
    }

    <span class="hljs-keyword">try</span> {
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">currentTransition</span> = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">startViewTransition</span>(<span class="hljs-title function_">async</span> () =&gt; {
        <span class="hljs-keyword">await</span> <span class="hljs-title function_">updateDOM</span>();
      });

      <span class="hljs-comment">// Wait for transition to be ready</span>
      <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">currentTransition</span>.<span class="hljs-property">ready</span>;

      <span class="hljs-comment">// Apply custom animations if provided</span>
      <span class="hljs-keyword">if</span> (options?.<span class="hljs-property">onReady</span>) {
        options.<span class="hljs-title function_">onReady</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">currentTransition</span>);
      }

      <span class="hljs-comment">// Wait for transition to complete</span>
      <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">currentTransition</span>.<span class="hljs-property">finished</span>;
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;View transition failed:&#x27;</span>, error);
      <span class="hljs-comment">// Ensure DOM is updated even if transition fails</span>
      <span class="hljs-keyword">await</span> <span class="hljs-title function_">updateDOM</span>();
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-comment">// Cleanup</span>
      <span class="hljs-keyword">if</span> (options?.<span class="hljs-property">className</span>) {
        <span class="hljs-variable language_">document</span>.<span class="hljs-property">documentElement</span>.<span class="hljs-property">classList</span>.<span class="hljs-title function_">remove</span>(options.<span class="hljs-property">className</span>);
      }
      <span class="hljs-variable language_">this</span>.<span class="hljs-property">currentTransition</span> = <span class="hljs-literal">null</span>;

      <span class="hljs-comment">// Process next transition in queue</span>
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">processQueue</span>();
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">processQueue</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">const</span> next = <span class="hljs-variable language_">this</span>.<span class="hljs-property">transitionQueue</span>.<span class="hljs-title function_">shift</span>();
    <span class="hljs-keyword">if</span> (next) {
      <span class="hljs-title function_">next</span>();
    }
  }

  <span class="hljs-title function_">queueTransition</span>(<span class="hljs-params"><span class="hljs-attr">transition</span>: () =&gt; <span class="hljs-built_in">void</span></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">transitionQueue</span>.<span class="hljs-title function_">push</span>(transition);
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">currentTransition</span>) {
      <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">processQueue</span>();
    }
  }
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TransitionOptions</span> {
  <span class="hljs-attr">className</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onReady</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">transition</span>: <span class="hljs-title class_">ViewTransition</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-comment">// React hook for transition manager</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">useTransitionManager</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> managerRef = <span class="hljs-title function_">useRef</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">ViewTransitionManager</span>());
  <span class="hljs-keyword">return</span> managerRef.<span class="hljs-property">current</span>;
};
</code></pre>
<h2 id="انتقالات-العرض-المسماة">انتقالات العرض المسماة</h2>
<h3 id="تنفيذ-انتقالات-العناصر-المشتركة">تنفيذ انتقالات العناصر المشتركة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Mark elements for shared transitions</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">SharedElement</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}&gt; = <span class="hljs-function">(<span class="hljs-params">{ id, children }</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">viewTransitionName:</span> <span class="hljs-attr">id</span>
      } <span class="hljs-attr">as</span> <span class="hljs-attr">React.CSSProperties</span>}
    &gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};

<span class="hljs-comment">// Product grid with shared elements</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ProductGrid</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> products = <span class="hljs-title function_">useProducts</span>();
  <span class="hljs-keyword">const</span> { navigateWithTransition } = <span class="hljs-title function_">useViewTransition</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;grid&quot;</span>&gt;</span>
      {products.map(product =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
          <span class="hljs-attr">key</span>=<span class="hljs-string">{product.id}</span>
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> navigateWithTransition(\`/product/\${product.id}\`)}
        &gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">SharedElement</span> <span class="hljs-attr">id</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">product-image-</span>\${<span class="hljs-attr">product.id</span>}\`}&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{product.image}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">{product.name}</span> /&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">SharedElement</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">SharedElement</span> <span class="hljs-attr">id</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">product-title-</span>\${<span class="hljs-attr">product.id</span>}\`}&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{product.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">SharedElement</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};

<span class="hljs-comment">// Product detail with matching shared elements</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ProductDetail</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span> }&gt; = <span class="hljs-function">(<span class="hljs-params">{ id }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> product = <span class="hljs-title function_">useProduct</span>(id);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;detail&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">SharedElement</span> <span class="hljs-attr">id</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">product-image-</span>\${<span class="hljs-attr">id</span>}\`}&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{product.image}</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">{product.name}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">SharedElement</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">SharedElement</span> <span class="hljs-attr">id</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">product-title-</span>\${<span class="hljs-attr">id</span>}\`}&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{product.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">SharedElement</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{product.description}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h3 id="أسماء-انتقالات-عرض-ديناميكية">أسماء انتقالات عرض ديناميكية</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">useDynamicTransitionName</span> = (<span class="hljs-params"><span class="hljs-attr">baseName</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">isActive</span>: <span class="hljs-built_in">boolean</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> [transitionName, setTransitionName] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span>&gt;();

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (isActive) {
      <span class="hljs-title function_">setTransitionName</span>(baseName);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// Clear after transition completes</span>
      <span class="hljs-keyword">const</span> timeout = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-title function_">setTransitionName</span>(<span class="hljs-literal">undefined</span>);
      }, <span class="hljs-number">500</span>); <span class="hljs-comment">// Match transition duration</span>

      <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearTimeout</span>(timeout);
    }
  }, [baseName, isActive]);

  <span class="hljs-keyword">return</span> transitionName;
};

<span class="hljs-comment">// Usage for morphing elements</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">MorphingCard</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">expanded</span>: <span class="hljs-built_in">boolean</span> }&gt; = <span class="hljs-function">(<span class="hljs-params">{
  id,
  expanded
}</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> transitionName = <span class="hljs-title function_">useDynamicTransitionName</span>(<span class="hljs-string">\`card-<span class="hljs-subst">\${id}</span>\`</span>, <span class="hljs-literal">true</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{expanded</span> ? &#x27;<span class="hljs-attr">card-expanded</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">card-collapsed</span>&#x27;}
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">viewTransitionName:</span> <span class="hljs-attr">transitionName</span> } <span class="hljs-attr">as</span> <span class="hljs-attr">React.CSSProperties</span>}
    &gt;</span>
      {/* Card content */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h2 id="حركات-css-المخصصة">حركات CSS المخصصة</h2>
<h3 id="تعريف-حركات-الانتقال">تعريف حركات الانتقال</h3>
<pre><code class="language-css"><span class="hljs-comment">/* Default cross-fade animation */</span>
::<span class="hljs-built_in">view-transition-old</span>(root) {
  <span class="hljs-attribute">animation</span>: fade-out <span class="hljs-number">0.3s</span> ease-out;
}

::<span class="hljs-built_in">view-transition-new</span>(root) {
  <span class="hljs-attribute">animation</span>: fade-in <span class="hljs-number">0.3s</span> ease-out;
}

<span class="hljs-comment">/* Slide transitions for navigation */</span>
<span class="hljs-selector-class">.transition-forward</span>::<span class="hljs-built_in">view-transition-old</span>(root) {
  <span class="hljs-attribute">animation</span>: slide-out-left <span class="hljs-number">0.3s</span> ease-out;
}

<span class="hljs-selector-class">.transition-forward</span>::<span class="hljs-built_in">view-transition-new</span>(root) {
  <span class="hljs-attribute">animation</span>: slide-in-right <span class="hljs-number">0.3s</span> ease-out;
}

<span class="hljs-selector-class">.transition-back</span>::<span class="hljs-built_in">view-transition-old</span>(root) {
  <span class="hljs-attribute">animation</span>: slide-out-right <span class="hljs-number">0.3s</span> ease-out;
}

<span class="hljs-selector-class">.transition-back</span>::<span class="hljs-built_in">view-transition-new</span>(root) {
  <span class="hljs-attribute">animation</span>: slide-in-left <span class="hljs-number">0.3s</span> ease-out;
}

<span class="hljs-comment">/* Shared element transitions */</span>
::<span class="hljs-built_in">view-transition-group</span>(product-image) {
  <span class="hljs-attribute">animation-duration</span>: <span class="hljs-number">0.4s</span>;
  <span class="hljs-attribute">animation-timing-function</span>: <span class="hljs-built_in">cubic-bezier</span>(<span class="hljs-number">0.4</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">1</span>);
}

<span class="hljs-comment">/* Morph animation for shared elements */</span>
<span class="hljs-keyword">@keyframes</span> morph {
  <span class="hljs-selector-tag">from</span> {
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">8px</span>;
  }
  <span class="hljs-selector-tag">to</span> {
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span>;
  }
}

::<span class="hljs-built_in">view-transition-image-pair</span>(hero-image) {
  <span class="hljs-attribute">animation</span>: morph <span class="hljs-number">0.4s</span>;
}

<span class="hljs-comment">/* Stagger animations for lists */</span>
::<span class="hljs-built_in">view-transition-group</span>(list-item-<span class="hljs-number">1</span>) {
  <span class="hljs-attribute">animation-delay</span>: <span class="hljs-number">0ms</span>;
}
::<span class="hljs-built_in">view-transition-group</span>(list-item-<span class="hljs-number">2</span>) {
  <span class="hljs-attribute">animation-delay</span>: <span class="hljs-number">50ms</span>;
}
::<span class="hljs-built_in">view-transition-group</span>(list-item-<span class="hljs-number">3</span>) {
  <span class="hljs-attribute">animation-delay</span>: <span class="hljs-number">100ms</span>;
}
</code></pre>
<h3 id="تحكم-برمجي-في-الحركة">تحكم برمجي في الحركة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">useAnimatedTransition</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> applyTransition = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> (
    <span class="hljs-attr">updateDOM</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>,
    <span class="hljs-attr">animation</span>: <span class="hljs-title class_">AnimationConfig</span>
  ) =&gt; {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">document</span>.<span class="hljs-property">startViewTransition</span>) {
      <span class="hljs-title function_">updateDOM</span>();
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">const</span> transition = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">startViewTransition</span>(updateDOM);

    <span class="hljs-keyword">await</span> transition.<span class="hljs-property">ready</span>;

    <span class="hljs-comment">// Get all transition pseudo-elements</span>
    <span class="hljs-keyword">const</span> oldElement = <span class="hljs-variable language_">document</span>.<span class="hljs-property">documentElement</span>.<span class="hljs-title function_">querySelector</span>(
      <span class="hljs-string">&#x27;::view-transition-old(root)&#x27;</span>
    );
    <span class="hljs-keyword">const</span> newElement = <span class="hljs-variable language_">document</span>.<span class="hljs-property">documentElement</span>.<span class="hljs-title function_">querySelector</span>(
      <span class="hljs-string">&#x27;::view-transition-new(root)&#x27;</span>
    );

    <span class="hljs-comment">// Apply custom animations using Web Animations API</span>
    <span class="hljs-keyword">if</span> (oldElement) {
      oldElement.<span class="hljs-title function_">animate</span>(
        animation.<span class="hljs-property">old</span>.<span class="hljs-property">keyframes</span>,
        animation.<span class="hljs-property">old</span>.<span class="hljs-property">options</span>
      );
    }

    <span class="hljs-keyword">if</span> (newElement) {
      newElement.<span class="hljs-title function_">animate</span>(
        animation.<span class="hljs-property">new</span>.<span class="hljs-property">keyframes</span>,
        animation.<span class="hljs-property">new</span>.<span class="hljs-property">options</span>
      );
    }

    <span class="hljs-keyword">await</span> transition.<span class="hljs-property">finished</span>;
  }, []);

  <span class="hljs-keyword">return</span> { applyTransition };
};

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AnimationConfig</span> {
  <span class="hljs-attr">old</span>: {
    <span class="hljs-attr">keyframes</span>: <span class="hljs-title class_">Keyframe</span>[];
    <span class="hljs-attr">options</span>: <span class="hljs-title class_">KeyframeAnimationOptions</span>;
  };
  <span class="hljs-attr">new</span>: {
    <span class="hljs-attr">keyframes</span>: <span class="hljs-title class_">Keyframe</span>[];
    <span class="hljs-attr">options</span>: <span class="hljs-title class_">KeyframeAnimationOptions</span>;
  };
}

<span class="hljs-comment">// Usage example</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">CustomTransition</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> { applyTransition } = <span class="hljs-title function_">useAnimatedTransition</span>();
  <span class="hljs-keyword">const</span> [state, setState] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;initial&#x27;</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleTransition</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">applyTransition</span>(
      <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setState</span>(<span class="hljs-string">&#x27;updated&#x27;</span>),
      {
        <span class="hljs-attr">old</span>: {
          <span class="hljs-attr">keyframes</span>: [
            { <span class="hljs-attr">opacity</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">transform</span>: <span class="hljs-string">&#x27;scale(1) rotate(0deg)&#x27;</span> },
            { <span class="hljs-attr">opacity</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">transform</span>: <span class="hljs-string">&#x27;scale(0.8) rotate(-10deg)&#x27;</span> }
          ],
          <span class="hljs-attr">options</span>: { <span class="hljs-attr">duration</span>: <span class="hljs-number">300</span>, <span class="hljs-attr">easing</span>: <span class="hljs-string">&#x27;ease-out&#x27;</span> }
        },
        <span class="hljs-attr">new</span>: {
          <span class="hljs-attr">keyframes</span>: [
            { <span class="hljs-attr">opacity</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">transform</span>: <span class="hljs-string">&#x27;scale(1.2) rotate(10deg)&#x27;</span> },
            { <span class="hljs-attr">opacity</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">transform</span>: <span class="hljs-string">&#x27;scale(1) rotate(0deg)&#x27;</span> }
          ],
          <span class="hljs-attr">options</span>: { <span class="hljs-attr">duration</span>: <span class="hljs-number">300</span>, <span class="hljs-attr">easing</span>: <span class="hljs-string">&#x27;ease-out&#x27;</span> }
        }
      }
    );
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleTransition}</span>&gt;</span>{state}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
};
</code></pre>
<h2 id="تحسين-الأداء">تحسين الأداء</h2>
<h3 id="تقليل-تعقيد-الرسم">تقليل تعقيد الرسم</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">OptimizedTransition</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> prepareForTransition = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Reduce paint complexity before transition</span>
    <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-property">classList</span>.<span class="hljs-title function_">add</span>(<span class="hljs-string">&#x27;transitioning&#x27;</span>);

    <span class="hljs-comment">// Disable animations on non-critical elements</span>
    <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">&#x27;.animation-heavy&#x27;</span>).<span class="hljs-title function_">forEach</span>(<span class="hljs-function"><span class="hljs-params">el</span> =&gt;</span> {
      (el <span class="hljs-keyword">as</span> <span class="hljs-title class_">HTMLElement</span>).<span class="hljs-property">style</span>.<span class="hljs-property">animation</span> = <span class="hljs-string">&#x27;none&#x27;</span>;
    });

    <span class="hljs-comment">// Use will-change for optimization hints</span>
    <span class="hljs-variable language_">document</span>.<span class="hljs-property">documentElement</span>.<span class="hljs-property">style</span>.<span class="hljs-property">willChange</span> = <span class="hljs-string">&#x27;transform, opacity&#x27;</span>;
  }, []);

  <span class="hljs-keyword">const</span> cleanupAfterTransition = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-property">classList</span>.<span class="hljs-title function_">remove</span>(<span class="hljs-string">&#x27;transitioning&#x27;</span>);

    <span class="hljs-comment">// Re-enable animations</span>
    <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">&#x27;.animation-heavy&#x27;</span>).<span class="hljs-title function_">forEach</span>(<span class="hljs-function"><span class="hljs-params">el</span> =&gt;</span> {
      (el <span class="hljs-keyword">as</span> <span class="hljs-title class_">HTMLElement</span>).<span class="hljs-property">style</span>.<span class="hljs-property">animation</span> = <span class="hljs-string">&#x27;&#x27;</span>;
    });

    <span class="hljs-comment">// Clear will-change</span>
    <span class="hljs-variable language_">document</span>.<span class="hljs-property">documentElement</span>.<span class="hljs-property">style</span>.<span class="hljs-property">willChange</span> = <span class="hljs-string">&#x27;auto&#x27;</span>;
  }, []);

  <span class="hljs-keyword">const</span> optimizedNavigate = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> (<span class="hljs-attr">to</span>: <span class="hljs-built_in">string</span>) =&gt; {
    <span class="hljs-title function_">prepareForTransition</span>();

    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">document</span>.<span class="hljs-property">startViewTransition</span>) {
      <span class="hljs-keyword">const</span> transition = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">startViewTransition</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-title function_">navigate</span>(to);
      });

      <span class="hljs-keyword">await</span> transition.<span class="hljs-property">finished</span>;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-title function_">navigate</span>(to);
    }

    <span class="hljs-title function_">cleanupAfterTransition</span>();
  }, [prepareForTransition, cleanupAfterTransition]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">NavigationMenu</span> <span class="hljs-attr">onNavigate</span>=<span class="hljs-string">{optimizedNavigate}</span> /&gt;</span></span>;
};
</code></pre>
<h3 id="انتقالات-شرطية-حسب-الجهاز">انتقالات شرطية حسب الجهاز</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">useAdaptiveTransitions</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [transitionsEnabled, setTransitionsEnabled] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Check device capabilities</span>
    <span class="hljs-keyword">const</span> <span class="hljs-title function_">checkCapabilities</span> = (<span class="hljs-params"></span>) =&gt; {
      <span class="hljs-comment">// Disable on low-end devices</span>
      <span class="hljs-keyword">const</span> memory = (navigator <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">deviceMemory</span>;
      <span class="hljs-keyword">if</span> (memory &amp;&amp; memory &lt; <span class="hljs-number">4</span>) {
        <span class="hljs-title function_">setTransitionsEnabled</span>(<span class="hljs-literal">false</span>);
        <span class="hljs-keyword">return</span>;
      }

      <span class="hljs-comment">// Disable on slow connections</span>
      <span class="hljs-keyword">const</span> connection = (navigator <span class="hljs-keyword">as</span> <span class="hljs-built_in">any</span>).<span class="hljs-property">connection</span>;
      <span class="hljs-keyword">if</span> (connection?.<span class="hljs-property">saveData</span> || connection?.<span class="hljs-property">effectiveType</span> === <span class="hljs-string">&#x27;2g&#x27;</span>) {
        <span class="hljs-title function_">setTransitionsEnabled</span>(<span class="hljs-literal">false</span>);
        <span class="hljs-keyword">return</span>;
      }

      <span class="hljs-comment">// Check for reduced motion preference</span>
      <span class="hljs-keyword">const</span> prefersReducedMotion = <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">matchMedia</span>(<span class="hljs-string">&#x27;(prefers-reduced-motion: reduce)&#x27;</span>).<span class="hljs-property">matches</span>;

      <span class="hljs-title function_">setTransitionsEnabled</span>(!prefersReducedMotion);
    };

    <span class="hljs-title function_">checkCapabilities</span>();

    <span class="hljs-comment">// Listen for changes</span>
    <span class="hljs-variable language_">window</span>
      .<span class="hljs-title function_">matchMedia</span>(<span class="hljs-string">&#x27;(prefers-reduced-motion: reduce)&#x27;</span>)
      .<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;change&#x27;</span>, checkCapabilities);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">window</span>
        .<span class="hljs-title function_">matchMedia</span>(<span class="hljs-string">&#x27;(prefers-reduced-motion: reduce)&#x27;</span>)
        .<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&#x27;change&#x27;</span>, checkCapabilities);
    };
  }, []);

  <span class="hljs-keyword">const</span> navigate = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">to</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (transitionsEnabled &amp;&amp; <span class="hljs-variable language_">document</span>.<span class="hljs-property">startViewTransition</span>) {
        <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">startViewTransition</span>(<span class="hljs-function">() =&gt;</span> {
          <span class="hljs-variable language_">window</span>.<span class="hljs-property">location</span>.<span class="hljs-property">href</span> = to;
        });
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-variable language_">window</span>.<span class="hljs-property">location</span>.<span class="hljs-property">href</span> = to;
      }
    },
    [transitionsEnabled],
  );

  <span class="hljs-keyword">return</span> { navigate, transitionsEnabled };
};
</code></pre>
<h2 id="استراتيجيات-التبديل-الاحتياطي">استراتيجيات التبديل الاحتياطي</h2>
<h3 id="التحسين-التدريجي">التحسين التدريجي</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">TransitionFallback</span> {
  <span class="hljs-keyword">private</span> supportsViewTransitions = <span class="hljs-string">&#x27;startViewTransition&#x27;</span> <span class="hljs-keyword">in</span> <span class="hljs-variable language_">document</span>;
  <span class="hljs-keyword">private</span> <span class="hljs-attr">fallbackStrategy</span>: <span class="hljs-string">&#x27;css&#x27;</span> | <span class="hljs-string">&#x27;js&#x27;</span> | <span class="hljs-string">&#x27;none&#x27;</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">fallbackStrategy</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">detectFallbackStrategy</span>();
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">detectFallbackStrategy</span>(): <span class="hljs-string">&#x27;css&#x27;</span> | <span class="hljs-string">&#x27;js&#x27;</span> | <span class="hljs-string">&#x27;none&#x27;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">supportsViewTransitions</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;none&#x27;</span>;

    <span class="hljs-comment">// Check for CSS animation support</span>
    <span class="hljs-keyword">const</span> animationSupport = <span class="hljs-string">&#x27;animation&#x27;</span> <span class="hljs-keyword">in</span> <span class="hljs-variable language_">document</span>.<span class="hljs-property">documentElement</span>.<span class="hljs-property">style</span>;
    <span class="hljs-keyword">if</span> (animationSupport) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;css&#x27;</span>;

    <span class="hljs-comment">// Check for requestAnimationFrame</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;requestAnimationFrame&#x27;</span> <span class="hljs-keyword">in</span> <span class="hljs-variable language_">window</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;js&#x27;</span>;

    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;none&#x27;</span>;
  }

  <span class="hljs-keyword">async</span> <span class="hljs-title function_">transition</span>(<span class="hljs-params"><span class="hljs-attr">updateDOM</span>: () =&gt; <span class="hljs-built_in">void</span>, <span class="hljs-attr">options</span>?: <span class="hljs-title class_">TransitionOptions</span></span>) {
    <span class="hljs-keyword">switch</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">fallbackStrategy</span>) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;none&#x27;</span>:
        <span class="hljs-comment">// Use native View Transitions</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">document</span>.<span class="hljs-property">startViewTransition</span>) {
          <span class="hljs-keyword">await</span> <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">startViewTransition</span>(updateDOM).<span class="hljs-property">finished</span>;
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-title function_">updateDOM</span>();
        }
        <span class="hljs-keyword">break</span>;

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;css&#x27;</span>:
        <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">cssFallback</span>(updateDOM, options);
        <span class="hljs-keyword">break</span>;

      <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;js&#x27;</span>:
        <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">jsFallback</span>(updateDOM, options);
        <span class="hljs-keyword">break</span>;

      <span class="hljs-attr">default</span>:
        <span class="hljs-title function_">updateDOM</span>();
    }
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">cssFallback</span>(<span class="hljs-params"><span class="hljs-attr">updateDOM</span>: () =&gt; <span class="hljs-built_in">void</span>, <span class="hljs-attr">options</span>?: <span class="hljs-title class_">TransitionOptions</span></span>) {
    <span class="hljs-keyword">const</span> container = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;root&#x27;</span>);
    <span class="hljs-keyword">if</span> (!container) {
      <span class="hljs-title function_">updateDOM</span>();
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// Add transition class</span>
    container.<span class="hljs-property">classList</span>.<span class="hljs-title function_">add</span>(<span class="hljs-string">&#x27;transitioning-out&#x27;</span>);

    <span class="hljs-comment">// Wait for animation</span>
    <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">300</span>));

    <span class="hljs-comment">// Update DOM</span>
    <span class="hljs-title function_">updateDOM</span>();

    <span class="hljs-comment">// Transition in</span>
    container.<span class="hljs-property">classList</span>.<span class="hljs-title function_">remove</span>(<span class="hljs-string">&#x27;transitioning-out&#x27;</span>);
    container.<span class="hljs-property">classList</span>.<span class="hljs-title function_">add</span>(<span class="hljs-string">&#x27;transitioning-in&#x27;</span>);

    <span class="hljs-comment">// Cleanup</span>
    <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">300</span>));
    container.<span class="hljs-property">classList</span>.<span class="hljs-title function_">remove</span>(<span class="hljs-string">&#x27;transitioning-in&#x27;</span>);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> <span class="hljs-title function_">jsFallback</span>(<span class="hljs-params"><span class="hljs-attr">updateDOM</span>: () =&gt; <span class="hljs-built_in">void</span>, <span class="hljs-attr">options</span>?: <span class="hljs-title class_">TransitionOptions</span></span>) {
    <span class="hljs-keyword">const</span> container = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;root&#x27;</span>);
    <span class="hljs-keyword">if</span> (!container) {
      <span class="hljs-title function_">updateDOM</span>();
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-comment">// Fade out</span>
    <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">animate</span>(container, [{ <span class="hljs-attr">opacity</span>: <span class="hljs-string">&#x27;1&#x27;</span> }, { <span class="hljs-attr">opacity</span>: <span class="hljs-string">&#x27;0&#x27;</span> }], { <span class="hljs-attr">duration</span>: <span class="hljs-number">300</span> });

    <span class="hljs-comment">// Update DOM</span>
    <span class="hljs-title function_">updateDOM</span>();

    <span class="hljs-comment">// Fade in</span>
    <span class="hljs-keyword">await</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">animate</span>(container, [{ <span class="hljs-attr">opacity</span>: <span class="hljs-string">&#x27;0&#x27;</span> }, { <span class="hljs-attr">opacity</span>: <span class="hljs-string">&#x27;1&#x27;</span> }], { <span class="hljs-attr">duration</span>: <span class="hljs-number">300</span> });
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">animate</span>(
    <span class="hljs-attr">element</span>: <span class="hljs-title class_">Element</span>,
    <span class="hljs-attr">keyframes</span>: <span class="hljs-title class_">Keyframe</span>[],
    <span class="hljs-attr">options</span>: <span class="hljs-title class_">KeyframeAnimationOptions</span>,
  ): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> animation = element.<span class="hljs-title function_">animate</span>(keyframes, options);
      animation.<span class="hljs-property">onfinish</span> = <span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">resolve</span>();
    });
  }
}
</code></pre>
<h2 id="التكامل-مع-إدارة-الحالة">التكامل مع إدارة الحالة</h2>
<h3 id="التكامل-مع-redux">التكامل مع Redux</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">useReduxTransition</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> dispatch = <span class="hljs-title function_">useDispatch</span>();

  <span class="hljs-keyword">const</span> dispatchWithTransition = <span class="hljs-title function_">useCallback</span>(<span class="hljs-title function_">async</span> (<span class="hljs-attr">action</span>: <span class="hljs-title class_">AnyAction</span>) =&gt; {
    <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">document</span>.<span class="hljs-property">startViewTransition</span>) {
      <span class="hljs-title function_">dispatch</span>(action);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">const</span> transition = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">startViewTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">dispatch</span>(action);
    });

    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">await</span> transition.<span class="hljs-property">finished</span>;
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">&#x27;Transition failed:&#x27;</span>, error);
    }
  }, [dispatch]);

  <span class="hljs-keyword">return</span> { dispatchWithTransition };
};

<span class="hljs-comment">// Usage in component</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">TodoList</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span> = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> todos = <span class="hljs-title function_">useSelector</span>(selectTodos);
  <span class="hljs-keyword">const</span> { dispatchWithTransition } = <span class="hljs-title function_">useReduxTransition</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleComplete</span> = (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">dispatchWithTransition</span>(<span class="hljs-title function_">completeTodo</span>(id));
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {todos.map(todo =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
          <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>
          <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">viewTransitionName:</span> \`<span class="hljs-attr">todo-</span>\${<span class="hljs-attr">todo.id</span>}\` } <span class="hljs-attr">as</span> <span class="hljs-attr">React.CSSProperties</span>}
        &gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> handleComplete(todo.id)}&gt;
            {todo.text}
          <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  );
};
</code></pre>
<h2 id="قائمة-أفضل-الممارسات">قائمة أفضل الممارسات</h2>
<p>✅ <strong>صمّم انتقالات ذات معنى:</strong></p>
<ul>
<li>استخدم عناصر مشتركة للاستمرارية</li>
<li>طابق اتجاه الانتقال مع نية المستخدم</li>
<li>أبقِ المدد أقل من 400ms</li>
</ul>
<p>✅ <strong>حسّن الأداء:</strong></p>
<ul>
<li>قلّل تعقيد الرسم أثناء الانتقالات</li>
<li>استخدم will-change باعتدال</li>
<li>عطّل على الأجهزة الضعيفة</li>
</ul>
<p>✅ <strong>وفّر بدائل احتياطية:</strong></p>
<ul>
<li>اكتشف دعم واجهة انتقالات العرض</li>
<li>نفّذ بدائل CSS/JS</li>
<li>احترم prefers-reduced-motion</li>
</ul>
<p>✅ <strong>اختبر بدقّة:</strong></p>
<ul>
<li>اختبر على أجهزة متنوعة</li>
<li>راقب أداء الانتقالات</li>
<li>اضمن إمكانية الوصول</li>
</ul>
<p>✅ <strong>استخدم الانتقالات لغرض:</strong></p>
<ul>
<li>وجّه انتباه المستخدم</li>
<li>حافظ على السياق المكاني</li>
<li>أوصل تغيرات الحالة</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
