const s="kinney",n="react-performance",a="أداء React",l="flushsync-in-react-dom",t="flushSync في react-dom",p=[{depth:2,id:"ما-هو-flushsync",text:"ما هو flushSync؟"},{depth:2,id:"متى-تحتاج-إلى-flushsync-فعلا",text:"متى تحتاج إلى flushSync فعلًا"},{depth:3,id:"التنسيق-مع-إدارة-التركيز",text:"التنسيق مع إدارة التركيز"},{depth:3,id:"قياس-عناصر-dom-بعد-التحديثات",text:"قياس عناصر DOM بعد التحديثات"},{depth:3,id:"التكامل-مع-مكتبات-الطرف-الثالث",text:"التكامل مع مكتبات الطرف الثالث"},{depth:2,id:"كلفة-الأداء",text:"كلفة الأداء"},{depth:3,id:"كسر-تجميع-react-للدفعات",text:"كسر تجميع React للدفعات"},{depth:3,id:"حجب-الخيط-الرئيسي",text:"حجب الخيط الرئيسي"},{depth:2,id:"أفضل-الممارسات-والإرشادات",text:"أفضل الممارسات والإرشادات"},{depth:3,id:"استخدمه-نادرا-وبهدف",text:"استخدمه نادرًا وبهدف"},{depth:3,id:"فضل-البدائل-عندما-يكون-ذلك-ممكنا",text:"فضّل البدائل عندما يكون ذلك ممكنًا"},{depth:3,id:"اجمع-تحديثات-متعددة",text:"اجمع تحديثات متعددة"},{depth:2,id:"اعتبارات-react-18",text:"اعتبارات React 18+"},{depth:3,id:"مقاطعة-الانتقالات",text:"مقاطعة الانتقالات"},{depth:3,id:"العمل-مع-suspense",text:"العمل مع Suspense"},{depth:2,id:"تصحيح-مشكلات-flushsync",text:"تصحيح مشكلات flushSync"},{depth:3,id:"محلل-الأداء-في-react-devtools",text:"محلّل الأداء في React DevTools"},{depth:3,id:"قياس-التوقيت-بوحدة-التحكم",text:"قياس التوقيت بوحدة التحكم"},{depth:2,id:"متى-لا-تستخدم-flushsync",text:"متى لا تستخدم flushSync"},{depth:3,id:"التحقق-من-صحة-النماذج",text:"التحقق من صحة النماذج"},{depth:3,id:"محفزات-الحركة",text:"محفّزات الحركة"},{depth:3,id:"جلب-البيانات",text:"جلب البيانات"},{depth:2,id:"مثال-من-الواقع-إدارة-التركيز-في-النافذة-المنبثقة",text:"مثال من الواقع: إدارة التركيز في النافذة المنبثقة"}],e=`<p>التصيير المتزامن (concurrent rendering) في React واحد من أقوى مزاياه — فهو يجمع التحديثات في دفعات، ويرتّب أولويات العمل، ويُبقي تطبيقك سريع الاستجابة عبر تقسيم التصيير إلى قطع. لكن أحيانًا تحتاج إلى إخبار React: «لا، فعلًا، أحتاج أن يحدث هذا التحديث الآن». هنا يأتي دور <code>flushSync</code> — أداة حادة تُجبر React على دفع التحديثات فورًا وبشكل متزامن.</p>
<p>تخيّل <code>flushSync</code> كفرامل الطوارئ في نظام التصيير لدى React. إنه مفيد للغاية عندما تحتاج إلى التنسيق مع واجهات برمجية أمرية (imperative APIs)، مثل تركيز العناصر أو قياس عقد DOM أو تشغيل الحركات، لكنه يأتي بمقايضات أداء تجعله شيئًا ينبغي أن تلجأ إليه نادرًا وعن قصد.</p>
<h2 id="ما-هو-flushsync">ما هو <code>flushSync</code>؟</h2>
<p><code>flushSync</code> دالة من <code>react-dom</code> تُجبر React على دفع أي تحديثات معلّقة بشكل متزامن قبل المتابعة. وعندما تغلّف تحديث حالة داخل <code>flushSync</code>، تطبّق React ذلك التحديث على DOM فورًا — بلا تجميع في دفعات، وبلا جدولة متزامنة، وبلا انتظار.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { flushSync } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">MyComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleClick</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-comment">// This update happens immediately</span>
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setCount</span>(count + <span class="hljs-number">1</span>);
    });

    <span class="hljs-comment">// By this point, the DOM has been updated</span>
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;DOM is now updated&#x27;</span>);
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span>&gt;</span>{count}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<p>الفرق الجوهري هو التوقيت: عادةً تجمع React التحديثات في دفعات وتدفعها خلال دورة التصيير التالية. أما مع <code>flushSync</code> فأنت تُجبر هذا الدفع على الحدوث فورًا داخل التنفيذ المتزامن الحالي.</p>
<h2 id="متى-تحتاج-إلى-flushsync-فعلا">متى تحتاج إلى <code>flushSync</code> فعلًا</h2>
<p>في معظم الأوقات، لا تحتاج إلى <code>flushSync</code>. فالسلوك الافتراضي في React بتجميع التحديثات هو غالبًا ما تريده. لكن هناك سيناريوهات محددة تصبح فيها التحديثات المتزامنة ضرورية:</p>
<h3 id="التنسيق-مع-إدارة-التركيز">التنسيق مع إدارة التركيز</h3>
<p>من أكثر الاستخدامات المشروعة شيوعًا إدارة التركيز بعد تغييرات DOM:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchableList</span>(<span class="hljs-params">{ items }: { items: <span class="hljs-built_in">string</span>[] }</span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [selectedIndex, setSelectedIndex] = <span class="hljs-title function_">useState</span>(-<span class="hljs-number">1</span>);
  <span class="hljs-keyword">const</span> listRef = useRef&lt;<span class="hljs-title class_">HTMLUListElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleKeyDown</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">KeyboardEvent</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;</span>) =&gt; {
    <span class="hljs-keyword">if</span> (e.<span class="hljs-property">key</span> === <span class="hljs-string">&#x27;ArrowDown&#x27;</span>) {
      <span class="hljs-comment">// We need the DOM to update before focusing</span>
      <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-title function_">setSelectedIndex</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(prev + <span class="hljs-number">1</span>, filteredItems.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>));
      });

      <span class="hljs-comment">// Now we can safely focus the newly selected item</span>
      <span class="hljs-keyword">const</span> selectedItem = listRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">querySelector</span>(
        <span class="hljs-string">\`[data-index=&quot;<span class="hljs-subst">\${selectedIndex}</span>&quot;]\`</span>,
      ) <span class="hljs-keyword">as</span> <span class="hljs-title class_">HTMLElement</span>;
      selectedItem?.<span class="hljs-title function_">focus</span>();
    }
  };

  <span class="hljs-keyword">const</span> filteredItems = items.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-title function_">toLowerCase</span>().<span class="hljs-title function_">includes</span>(query.<span class="hljs-title function_">toLowerCase</span>()));

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder=&quot;Search items...&quot;
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{listRef}</span>&gt;</span>
        {filteredItems.map((item, index) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
            <span class="hljs-attr">key</span>=<span class="hljs-string">{item}</span>
            <span class="hljs-attr">data-index</span>=<span class="hljs-string">{index}</span>
            <span class="hljs-attr">tabIndex</span>=<span class="hljs-string">{-1}</span>
            <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
              <span class="hljs-attr">backgroundColor:</span> <span class="hljs-attr">index</span> === <span class="hljs-string">selectedIndex</span> ? &#x27;#<span class="hljs-attr">e0e0e0</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">white</span>&#x27;,
            }}
          &gt;</span>
            {item}
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>من دون <code>flushSync</code>، قد يحدث استدعاء التركيز قبل أن تحدّث React الـ DOM، ما يؤدي إلى تركيز العنصر الخطأ أو عدم تركيز أي عنصر إطلاقًا.</p>
<h3 id="قياس-عناصر-dom-بعد-التحديثات">قياس عناصر DOM بعد التحديثات</h3>
<p>أحيانًا تحتاج إلى قياس العناصر فورًا بعد تغيّر الحالة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">CollapsiblePanel</span>(<span class="hljs-params">{ children }: { children: React.ReactNode }</span>) {
  <span class="hljs-keyword">const</span> [isExpanded, setIsExpanded] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [height, setHeight] = useState&lt;<span class="hljs-built_in">number</span> | <span class="hljs-literal">undefined</span>&gt;();
  <span class="hljs-keyword">const</span> contentRef = useRef&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleToggle</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (!isExpanded) {
      <span class="hljs-comment">// Expand first, then measure</span>
      <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-title function_">setIsExpanded</span>(<span class="hljs-literal">true</span>);
      });

      <span class="hljs-comment">// Now we can measure the actual height</span>
      <span class="hljs-keyword">if</span> (contentRef.<span class="hljs-property">current</span>) {
        <span class="hljs-title function_">setHeight</span>(contentRef.<span class="hljs-property">current</span>.<span class="hljs-property">scrollHeight</span>);
      }
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-title function_">setIsExpanded</span>(<span class="hljs-literal">false</span>);
      <span class="hljs-title function_">setHeight</span>(<span class="hljs-literal">undefined</span>);
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleToggle}</span>&gt;</span>{isExpanded ? &#x27;Collapse&#x27; : &#x27;Expand&#x27;}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{contentRef}</span>
        <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
          <span class="hljs-attr">height:</span> <span class="hljs-attr">isExpanded</span> ? <span class="hljs-attr">height</span> <span class="hljs-attr">:</span> <span class="hljs-attr">0</span>,
          <span class="hljs-attr">overflow:</span> &#x27;<span class="hljs-attr">hidden</span>&#x27;,
          <span class="hljs-attr">transition:</span> &#x27;<span class="hljs-attr">height</span> <span class="hljs-attr">0.3s</span> <span class="hljs-attr">ease</span>&#x27;,
        }}
      &gt;</span>
        {children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>هنا نحتاج إلى تصيير المحتوى (موسّعًا) قبل أن نتمكن من قياس ارتفاعه الطبيعي لأجل الحركة.</p>
<h3 id="التكامل-مع-مكتبات-الطرف-الثالث">التكامل مع مكتبات الطرف الثالث</h3>
<p>عند التكامل مع مكتبات تتوقّع تحديثات DOM فورية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ChartComponent</span>(<span class="hljs-params">{ data }: { data: ChartData[] }</span>) {
  <span class="hljs-keyword">const</span> [chartType, setChartType] = useState&lt;<span class="hljs-string">&#x27;bar&#x27;</span> | <span class="hljs-string">&#x27;line&#x27;</span>&gt;(<span class="hljs-string">&#x27;bar&#x27;</span>);
  <span class="hljs-keyword">const</span> chartRef = useRef&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> chartInstanceRef = useRef&lt;<span class="hljs-title class_">Chart</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleChartTypeChange</span> = (<span class="hljs-params"><span class="hljs-attr">newType</span>: <span class="hljs-string">&#x27;bar&#x27;</span> | <span class="hljs-string">&#x27;line&#x27;</span></span>) =&gt; {
    <span class="hljs-comment">// Update the state and flush immediately</span>
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setChartType</span>(newType);
    });

    <span class="hljs-comment">// Now the DOM is updated, we can safely recreate the chart</span>
    <span class="hljs-keyword">if</span> (chartInstanceRef.<span class="hljs-property">current</span>) {
      chartInstanceRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">destroy</span>();
    }

    chartInstanceRef.<span class="hljs-property">current</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Chart</span>(chartRef.<span class="hljs-property">current</span>!, {
      <span class="hljs-attr">type</span>: newType,
      <span class="hljs-attr">data</span>: data,
      <span class="hljs-comment">// ... chart options</span>
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">select</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{chartType}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> handleChartTypeChange(e.target.value as &#x27;bar&#x27; | &#x27;line&#x27;)}
      &gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;bar&quot;</span>&gt;</span>Bar Chart<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;line&quot;</span>&gt;</span>Line Chart<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{chartRef}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>تحتاج مكتبة المخططات إلى أن يعكس DOM الحالة الحالية قبل أن تتمكن من التهيئة على النحو الصحيح.</p>
<h2 id="كلفة-الأداء">كلفة الأداء</h2>
<p>يأتي <code>flushSync</code> بتداعيات أداء حقيقية ينبغي أن تفهمها:</p>
<h3 id="كسر-تجميع-react-للدفعات">كسر تجميع React للدفعات</h3>
<p>عادةً تجمع React تحديثات حالة متعددة في دورة تصيير واحدة. ويكسر <code>flushSync</code> هذا التحسين:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Multiple flushSync calls</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BadExample</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [name, setName] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [email, setEmail] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [age, setAge] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setName</span>(<span class="hljs-string">&#x27;John&#x27;</span>)); <span class="hljs-comment">// Render 1</span>
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setEmail</span>(<span class="hljs-string">&#x27;john@&#x27;</span>)); <span class="hljs-comment">// Render 2</span>
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setAge</span>(<span class="hljs-number">30</span>)); <span class="hljs-comment">// Render 3</span>
  };
}

<span class="hljs-comment">// ✅ Better: Batch updates when possible</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">GoodExample</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [formData, setFormData] = <span class="hljs-title function_">useState</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-number">0</span>,
  });

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-comment">// Single update, single render</span>
    <span class="hljs-title function_">setFormData</span>({
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;John&#x27;</span>,
      <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;john@example.com&#x27;</span>,
      <span class="hljs-attr">age</span>: <span class="hljs-number">30</span>,
    });
  };
}
</code></pre>
<h3 id="حجب-الخيط-الرئيسي">حجب الخيط الرئيسي</h3>
<p>يُجبر <code>flushSync</code> عملًا متزامنًا على الخيط الرئيسي، ما قد يسبب تقطيعًا في الأداء:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Problematic: Large synchronous update</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProblematicList</span>(<span class="hljs-params">{ items }: { items: Item[] }</span>) {
  <span class="hljs-keyword">const</span> [filter, setFilter] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleUrgentFilter</span> = (<span class="hljs-params"><span class="hljs-attr">newFilter</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-comment">// This could block the thread if items is large</span>
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setFilter</span>(newFilter);
    });

    <span class="hljs-comment">// Some imperative work that needs the filtered DOM</span>
    <span class="hljs-title function_">performDOMWork</span>();
  };

  <span class="hljs-keyword">const</span> filteredItems = items.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item.<span class="hljs-property">name</span>.<span class="hljs-title function_">includes</span>(filter));

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      {filteredItems.map((item) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>{item.name}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Better: Consider if you really need synchronous updates</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BetterList</span>(<span class="hljs-params">{ items }: { items: Item[] }</span>) {
  <span class="hljs-keyword">const</span> [filter, setFilter] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleFilter</span> = (<span class="hljs-params"><span class="hljs-attr">newFilter</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-comment">// Let React batch and prioritize normally</span>
    <span class="hljs-title function_">setFilter</span>(newFilter);

    <span class="hljs-comment">// Use useLayoutEffect for DOM work after render</span>
    <span class="hljs-comment">// or consider if the work can be async</span>
  };

  <span class="hljs-comment">// ... rest of component</span>
}
</code></pre>
<h2 id="أفضل-الممارسات-والإرشادات">أفضل الممارسات والإرشادات</h2>
<h3 id="استخدمه-نادرا-وبهدف">استخدمه نادرًا وبهدف</h3>
<p>لا تلجأ إلى <code>flushSync</code> إلا عندما تكون لديك حاجة تنسيق محددة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Clear coordination need</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Modal</span>(<span class="hljs-params">{ isOpen, onClose }: <span class="hljs-title class_">ModalProps</span></span>) {
  <span class="hljs-keyword">const</span> firstButtonRef = useRef&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleOpen</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setIsOpen</span>(<span class="hljs-literal">true</span>);
    });

    <span class="hljs-comment">// Focus management requires immediate DOM update</span>
    firstButtonRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">focus</span>();
  };
}

<span class="hljs-comment">// ❌ Bad: No real coordination need</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Counter</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">increment</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-comment">// Unnecessary - no imperative work after</span>
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setCount</span>(<span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c + <span class="hljs-number">1</span>);
    });
  };
}
</code></pre>
<h3 id="فضل-البدائل-عندما-يكون-ذلك-ممكنا">فضّل البدائل عندما يكون ذلك ممكنًا</h3>
<p>غالبًا ما تستطيع آليات React المدمجة تلبية احتياجاتك من دون <code>flushSync</code>:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Instead of flushSync for DOM measurements, use useLayoutEffect</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">MeasuredComponent</span>(<span class="hljs-params">{ content }: { content: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-keyword">const</span> [height, setHeight] = useState&lt;<span class="hljs-built_in">number</span>&gt;(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> ref = useRef&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Runs synchronously after DOM mutations</span>
    <span class="hljs-keyword">if</span> (ref.<span class="hljs-property">current</span>) {
      <span class="hljs-title function_">setHeight</span>(ref.<span class="hljs-property">current</span>.<span class="hljs-property">offsetHeight</span>);
    }
  }, [content]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span>&gt;</span>{content}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h3 id="اجمع-تحديثات-متعددة">اجمع تحديثات متعددة</h3>
<p>إذا كان لا بد من استخدام <code>flushSync</code>، فاجمع التحديثات المرتبطة معًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Bundle related updates</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">handleComplexUpdate</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">setSelectedId</span>(newId);
    <span class="hljs-title function_">setHighlighted</span>(<span class="hljs-literal">true</span>);
    <span class="hljs-title function_">setScrollPosition</span>(newPosition);
  });

  <span class="hljs-comment">// Now perform imperative work</span>
  <span class="hljs-title function_">performFocusWork</span>();
};

<span class="hljs-comment">// ❌ Bad: Multiple separate flushSync calls</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">handleBadUpdate</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setSelectedId</span>(newId));
  <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setHighlighted</span>(<span class="hljs-literal">true</span>));
  <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setScrollPosition</span>(newPosition));
};
</code></pre>
<h2 id="اعتبارات-react-18">اعتبارات React 18+</h2>
<p>مع ميزات التصيير المتزامن في React 18، ثمة اعتبارات إضافية لـ <code>flushSync</code>:</p>
<h3 id="مقاطعة-الانتقالات">مقاطعة الانتقالات</h3>
<p>سيقاطع <code>flushSync</code> أي انتقالات جارية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchResults</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [results, setResults] = useState&lt;<span class="hljs-title class_">Result</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isPending, startTransition] = <span class="hljs-title function_">useTransition</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSearch</span> = (<span class="hljs-params"><span class="hljs-attr">newQuery</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">setQuery</span>(newQuery);

    <span class="hljs-comment">// This transition might be interrupted by flushSync elsewhere</span>
    <span class="hljs-title function_">startTransition</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setResults</span>(<span class="hljs-title function_">performSearch</span>(newQuery));
    });
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleUrgentUpdate</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-comment">// This will interrupt the above transition</span>
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setSomeUrgentState</span>(newValue);
    });
  };
}
</code></pre>
<h3 id="العمل-مع-suspense">العمل مع <code>Suspense</code></h3>
<p>لا يتعامل <code>flushSync</code> بلطف مع حدود Suspense:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Problematic: flushSync with Suspense</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProblematicComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [showSuspenseful, setShowSuspenseful] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleShow</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-comment">// This might cause issues with Suspense</span>
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setShowSuspenseful</span>(<span class="hljs-literal">true</span>);
    });
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">Loading</span> /&gt;</span>}&gt;{showSuspenseful &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">LazyComponent</span> /&gt;</span>}<span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>;
}
</code></pre>
<h2 id="تصحيح-مشكلات-flushsync">تصحيح مشكلات <code>flushSync</code></h2>
<p>عندما تسوء الأمور مع <code>flushSync</code>، إليك أساليب التصحيح الشائعة:</p>
<h3 id="محلل-الأداء-في-react-devtools">محلّل الأداء في React DevTools</h3>
<p>يمكن لمحلّل الأداء في React DevTools أن يعرض لك أثر الأداء:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Add labels to make profiling clearer</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProfiledComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleUpdate</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title class_">React</span>.<span class="hljs-title function_">unstable_trace</span>(<span class="hljs-string">&#x27;urgent-update&#x27;</span>, performance.<span class="hljs-title function_">now</span>(), <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-title function_">setUrgentState</span>(newValue);
      });
    });
  };
}
</code></pre>
<h3 id="قياس-التوقيت-بوحدة-التحكم">قياس التوقيت بوحدة التحكم</h3>
<p>قِس العمل المتزامن:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">TimedComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleUpdate</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">time</span>(<span class="hljs-string">&#x27;flushSync-update&#x27;</span>);
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setLargeState</span>(newLargeValue);
    });
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">timeEnd</span>(<span class="hljs-string">&#x27;flushSync-update&#x27;</span>);

    <span class="hljs-comment">// Additional imperative work</span>
    <span class="hljs-title function_">performDOMWork</span>();
  };
}
</code></pre>
<h2 id="متى-لا-تستخدم-flushsync">متى لا تستخدم <code>flushSync</code></h2>
<p>إليك بعض الأنماط المضادة الشائعة التي ينبغي تجنّبها:</p>
<h3 id="التحقق-من-صحة-النماذج">التحقق من صحة النماذج</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Don&#x27;t use flushSync for form validation</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BadForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [errors, setErrors] = useState&lt;<span class="hljs-built_in">string</span>[]&gt;([]);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">FormData</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> newErrors = <span class="hljs-title function_">validateForm</span>(data);

    <span class="hljs-comment">// Unnecessary - validation errors don&#x27;t need immediate DOM updates</span>
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setErrors</span>(newErrors);
    });
  };
}
</code></pre>
<h3 id="محفزات-الحركة">محفّزات الحركة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Don&#x27;t use flushSync for CSS animations</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BadAnimation</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [isAnimating, setIsAnimating] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">startAnimation</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-comment">// CSS animations don&#x27;t need flushSync</span>
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setIsAnimating</span>(<span class="hljs-literal">true</span>);
    });
  };
}

<span class="hljs-comment">// ✅ Better: Let React handle normally</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">GoodAnimation</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [isAnimating, setIsAnimating] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">startAnimation</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">setIsAnimating</span>(<span class="hljs-literal">true</span>); <span class="hljs-comment">// CSS will handle the animation</span>
  };
}
</code></pre>
<h3 id="جلب-البيانات">جلب البيانات</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Don&#x27;t use flushSync for loading states</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BadDataFetching</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">fetchData</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-comment">// Loading states don&#x27;t need immediate DOM updates</span>
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">true</span>);
    });

    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> api.<span class="hljs-title function_">getData</span>();
    <span class="hljs-title function_">setData</span>(data);
    <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
  };
}
</code></pre>
<h2 id="مثال-من-الواقع-إدارة-التركيز-في-النافذة-المنبثقة">مثال من الواقع: إدارة التركيز في النافذة المنبثقة</h2>
<p>إليك مثالًا كاملًا يوضّح الاستخدام الصحيح لـ <code>flushSync</code> لإدارة التركيز في النافذة المنبثقة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ModalProps</span> {
  <span class="hljs-attr">isOpen</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onClose</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Modal</span>(<span class="hljs-params">{ isOpen, onClose, children, title }: <span class="hljs-title class_">ModalProps</span></span>) {
  <span class="hljs-keyword">const</span> modalRef = useRef&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> closeButtonRef = useRef&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> previousFocusRef = useRef&lt;<span class="hljs-title class_">HTMLElement</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (isOpen) {
      <span class="hljs-comment">// Store previous focus</span>
      previousFocusRef.<span class="hljs-property">current</span> = <span class="hljs-variable language_">document</span>.<span class="hljs-property">activeElement</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">HTMLElement</span>;

      <span class="hljs-comment">// We need flushSync here because we need the modal</span>
      <span class="hljs-comment">// to be in the DOM before we can focus it</span>
      <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-comment">// Modal is now rendered</span>
      });

      <span class="hljs-comment">// Focus the close button</span>
      closeButtonRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">focus</span>();
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// Restore previous focus</span>
      previousFocusRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">focus</span>();
    }
  }, [isOpen]);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleKeyDown</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">KeyboardEvent</span>&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;</span>) =&gt; {
    <span class="hljs-keyword">if</span> (e.<span class="hljs-property">key</span> === <span class="hljs-string">&#x27;Escape&#x27;</span>) {
      <span class="hljs-title function_">onClose</span>();
    }

    <span class="hljs-comment">// Trap focus within modal</span>
    <span class="hljs-keyword">if</span> (e.<span class="hljs-property">key</span> === <span class="hljs-string">&#x27;Tab&#x27;</span>) {
      <span class="hljs-keyword">const</span> focusableElements = modalRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">querySelectorAll</span>(
        <span class="hljs-string">&#x27;button, [href], input, select, textarea, [tabindex]:not([tabindex=&quot;-1&quot;])&#x27;</span>,
      );

      <span class="hljs-keyword">if</span> (focusableElements &amp;&amp; focusableElements.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">const</span> firstElement = focusableElements[<span class="hljs-number">0</span>] <span class="hljs-keyword">as</span> <span class="hljs-title class_">HTMLElement</span>;
        <span class="hljs-keyword">const</span> lastElement = focusableElements[focusableElements.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>] <span class="hljs-keyword">as</span> <span class="hljs-title class_">HTMLElement</span>;

        <span class="hljs-keyword">if</span> (e.<span class="hljs-property">shiftKey</span> &amp;&amp; <span class="hljs-variable language_">document</span>.<span class="hljs-property">activeElement</span> === firstElement) {
          lastElement.<span class="hljs-title function_">focus</span>();
          e.<span class="hljs-title function_">preventDefault</span>();
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!e.<span class="hljs-property">shiftKey</span> &amp;&amp; <span class="hljs-variable language_">document</span>.<span class="hljs-property">activeElement</span> === lastElement) {
          firstElement.<span class="hljs-title function_">focus</span>();
          e.<span class="hljs-title function_">preventDefault</span>();
        }
      }
    }
  };

  <span class="hljs-keyword">if</span> (!isOpen) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;modal-overlay&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{(e)</span> =&gt;</span> e.target === e.currentTarget &amp;&amp; onClose()}&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{modalRef}</span>
        <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;modal-content&quot;</span>
        <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;dialog&quot;</span>
        <span class="hljs-attr">aria-labelledby</span>=<span class="hljs-string">&quot;modal-title&quot;</span>
        <span class="hljs-attr">aria-modal</span>=<span class="hljs-string">&quot;true&quot;</span>
        <span class="hljs-attr">onKeyDown</span>=<span class="hljs-string">{handleKeyDown}</span>
      &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;modal-header&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;modal-title&quot;</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{closeButtonRef}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClose}</span> <span class="hljs-attr">aria-label</span>=<span class="hljs-string">&quot;Close modal&quot;</span>&gt;</span>
            ×
          <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;modal-body&quot;</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [isModalOpen, setIsModalOpen] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">openModal</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-comment">// The flushSync happens inside the Modal component</span>
    <span class="hljs-comment">// when the DOM needs to be updated for focus management</span>
    <span class="hljs-title function_">setIsModalOpen</span>(<span class="hljs-literal">true</span>);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{openModal}</span>&gt;</span>Open Modal<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">Modal</span> <span class="hljs-attr">isOpen</span>=<span class="hljs-string">{isModalOpen}</span> <span class="hljs-attr">onClose</span>=<span class="hljs-string">{()</span> =&gt;</span> setIsModalOpen(false)} title=&quot;Example Modal&quot;&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>This modal properly manages focus using flushSync where needed.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setIsModalOpen(false)}&gt;Close from inside<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Modal</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
