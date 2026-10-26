const s="kinney",a="react-typescript",n="React مع TypeScript",l="useref-and-imperative-handles",p="`useRef` والمقابض الإجرائية",t=[{depth:2,id:"ملعب-useref",text:"ملعب useRef"},{depth:2,id:"تخزين-القيم-باستخدام-useref",text:"تخزين القيم باستخدام useRef"},{depth:2,id:"مراجع-الاستدعاء-حين-لا-يكفي-useref",text:"مراجع الاستدعاء: حين لا يكفي useRef"},{depth:2,id:"تمرير-المراجع-تفويض-المسؤولية",text:"تمرير المراجع: تفويض المسؤولية"},{depth:2,id:"المقابض-الإجرائية-واجهات-منتقاة",text:"المقابض الإجرائية: واجهات منتقاة"},{depth:2,id:"الأنماط-الشائعة-والمزالق",text:"الأنماط الشائعة والمزالق"},{depth:3,id:"رقصة-التحقق-من-القيم-الفارغة",text:"رقصة التحقّق من القيم الفارغة"},{depth:3,id:"مزالق-التوقيت-في-المراجع",text:"مزالق التوقيت في المراجع"},{depth:3,id:"الجمع-بين-عدة-مراجع",text:"الجمع بين عدة مراجع"},{depth:2,id:"متى-تستخدم-ماذا",text:"متى تستخدم ماذا"},{depth:2,id:"حالات-استخدام-من-العالم-الحقيقي",text:"حالات استخدام من العالم الحقيقي™"},{depth:3,id:"إدارة-التركيز-focus-management",text:"إدارة التركيز (Focus Management)"},{depth:3,id:"تنسيق-حقول-النماذج",text:"تنسيق حقول النماذج"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],e=`<p>أحيانًا لا يكفي نموذج React التصريحي (declarative) تمامًا — فأنت بحاجة إلى تركيز حقل إدخال بشكل إجرائي، أو قياس عقدة DOM، أو استدعاء تابع في مكتبة من طرف ثالث. هنا يأتي دور المراجع (refs): مخرج React إلى الوصول المباشر إلى DOM وإلى الواجهات الإجرائية للمكوّنات. سنستكشف كيف تُنمّط المراجع بشكل صحيح في TypeScript، ونتفهم متى تتفوّق مراجع الاستدعاء (callback refs) على <code>useRef</code>، ونبني واجهات إجرائية نظيفة باستخدام <code>forwardRef</code> و<code>useImperativeHandle</code>.</p>
<p>إذا سبق لك أن وجدت نفسك تقول «دعني فقط آخذ ذلك العنصر من DOM»، فالمراجع في صفّك. لكن مثل كل أداة قوية، لها حوافّ حادة — ولا سيما في TypeScript حيث تحتاج إلى مصارعة الأنواع الخاصة بعناصر DOM وكائنات المراجع القابلة للتغيير وواجهات المكوّنات.</p>
<h2 id="ملعب-useref">ملعب <code>useRef</code></h2>
<p>لنبدأ بأشيع نمط مراجع: <code>useRef</code> للوصول إلى عناصر DOM. يحتاج TypeScript إلى أن يعرف ما الذي تخزّنه، وعناصر DOM لها أنواع محدّدة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useRef, useEffect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">InputFocus</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// ✅ Explicitly type the ref for HTMLInputElement</span>
  <span class="hljs-keyword">const</span> inputRef = useRef&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// TypeScript knows this could be null</span>
    inputRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">focus</span>();
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{inputRef}</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Auto-focused input&quot;</span> /&gt;</span></span>;
}
</code></pre>
<p>السحر يحدث مع ذلك المعامل العام: <code>useRef&lt;HTMLInputElement&gt;(null)</code>. هذا يخبر TypeScript أنك تخزّن مرجعًا إلى عنصر إدخال، وأن القيمة الأولية هي <code>null</code> (لأن React لم يُصيّر بعد).</p>
<p>وهنا مثال أشمل يعرض أنواعًا مختلفة من عناصر DOM:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useRef } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">DOMReferences</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> divRef = useRef&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> buttonRef = useRef&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> canvasRef = useRef&lt;<span class="hljs-title class_">HTMLCanvasElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleMeasure</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (divRef.<span class="hljs-property">current</span>) {
      <span class="hljs-keyword">const</span> { width, height } = divRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">getBoundingClientRect</span>();
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Div dimensions: <span class="hljs-subst">\${width}</span>x<span class="hljs-subst">\${height}</span>\`</span>);
    }
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleCanvasSetup</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (canvasRef.<span class="hljs-property">current</span>) {
      <span class="hljs-keyword">const</span> ctx = canvasRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&#x27;2d&#x27;</span>);
      ctx?.<span class="hljs-title function_">fillRect</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">100</span>, <span class="hljs-number">100</span>);
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{divRef}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;measured-div&quot;</span>&gt;</span>
        Measure me!
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{buttonRef}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleMeasure}</span>&gt;</span>
        Measure Div
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{canvasRef}</span> <span class="hljs-attr">width</span>=<span class="hljs-string">{200}</span> <span class="hljs-attr">height</span>=<span class="hljs-string">{200}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleCanvasSetup}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="تخزين-القيم-باستخدام-useref">تخزين القيم باستخدام <code>useRef</code></h2>
<p><code>useRef</code> ليس مخصّصًا لعناصر DOM فحسب — بل مثالي أيضًا لتخزين القيم القابلة للتغيير التي تبقى بين التصييرات (renders) دون أن تسبّب تصييرات جديدة. فكّر فيه كـ«صندوق» يمكنك وضع أي شيء بداخله.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useRef, useEffect, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">TimerComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> [isRunning, setIsRunning] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-comment">// ✅ Store the timer ID - number or undefined</span>
  <span class="hljs-keyword">const</span> timerRef = useRef&lt;<span class="hljs-built_in">number</span> | <span class="hljs-literal">undefined</span>&gt;();

  <span class="hljs-comment">// ✅ Track previous count value</span>
  <span class="hljs-keyword">const</span> prevCountRef = useRef&lt;<span class="hljs-built_in">number</span>&gt;();

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    prevCountRef.<span class="hljs-property">current</span> = count;
  });

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">startTimer</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (!isRunning) {
      <span class="hljs-title function_">setIsRunning</span>(<span class="hljs-literal">true</span>);
      <span class="hljs-comment">// Store the timer ID in the ref</span>
      timerRef.<span class="hljs-property">current</span> = <span class="hljs-variable language_">window</span>.<span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-title function_">setCount</span>(<span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> c + <span class="hljs-number">1</span>);
      }, <span class="hljs-number">100</span>);
    }
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">stopTimer</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (timerRef.<span class="hljs-property">current</span>) {
      <span class="hljs-built_in">clearInterval</span>(timerRef.<span class="hljs-property">current</span>);
      timerRef.<span class="hljs-property">current</span> = <span class="hljs-literal">undefined</span>;
      <span class="hljs-title function_">setIsRunning</span>(<span class="hljs-literal">false</span>);
    }
  };

  <span class="hljs-keyword">const</span> prevCount = prevCountRef.<span class="hljs-property">current</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Count: {count}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Previous: {prevCount}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{startTimer}</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isRunning}</span>&gt;</span>
        Start
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{stopTimer}</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{!isRunning}</span>&gt;</span>
        Stop
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>عند تخزين قيم غير مرتبطة بـ DOM داخل المراجع، نمّطها صراحةً في كل مرة. فـ<code>useRef&lt;number&gt;()</code> دون قيمة أولية ينشئ <code>MutableRefObject&lt;number | undefined&gt;</code>، وهو ما تريده عادةً لمعرّفات المؤقّتات (timers) أو غيرها من القيم الاختيارية.</p>
</blockquote>
<h2 id="مراجع-الاستدعاء-حين-لا-يكفي-useref">مراجع الاستدعاء: حين لا يكفي <code>useRef</code></h2>
<p>أحيانًا يبدو <code>useRef</code> مرهقًا — مثلًا حين تحتاج إلى تشغيل شيفرة فور توفّر عنصر DOM، أو حين تعمل مع عناصر ديناميكية. تتيح لك مراجع الاستدعاء تمرير دالة بدل كائن مرجع، ويستدعيها React مع العنصر.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useState, useCallback } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">CallbackRefExample</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [dimensions, setDimensions] = useState&lt;{ <span class="hljs-attr">width</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">height</span>: <span class="hljs-built_in">number</span> } | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// ✅ Callback ref - receives the element directly</span>
  <span class="hljs-keyword">const</span> measuredRef = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">element</span>: <span class="hljs-title class_">HTMLDivElement</span> | <span class="hljs-literal">null</span></span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (element) {
      <span class="hljs-keyword">const</span> { width, height } = element.<span class="hljs-title function_">getBoundingClientRect</span>();
      <span class="hljs-title function_">setDimensions</span>({ width, height });
    }
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{measuredRef}</span>
        <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
          <span class="hljs-attr">width:</span> &#x27;<span class="hljs-attr">50</span>%&#x27;,
          <span class="hljs-attr">height:</span> &#x27;<span class="hljs-attr">200px</span>&#x27;,
          <span class="hljs-attr">backgroundColor:</span> &#x27;#<span class="hljs-attr">f0f0f0</span>&#x27;,
          <span class="hljs-attr">padding:</span> &#x27;<span class="hljs-attr">20px</span>&#x27;
        }}
      &gt;</span>
        This div measures itself!
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      {dimensions &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Dimensions: {dimensions.width.toFixed(0)}px × {dimensions.height.toFixed(0)}px<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>وتتألق مراجع الاستدعاء حقًا حين تحتاج إلى التعامل مع قوائم ديناميكية أو عناصر تُصيَّر بشروط:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useState, useCallback } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Item</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">DynamicListRefs</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [items] = useState&lt;<span class="hljs-title class_">Item</span>[]&gt;([
    { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;First item&#x27;</span> },
    { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;2&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Second item&#x27;</span> },
    { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;3&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Third item&#x27;</span> },
  ]);

  <span class="hljs-keyword">const</span> [itemHeights, setItemHeights] = useState&lt;<span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">number</span>&gt;&gt;({});

  <span class="hljs-comment">// ✅ Callback ref factory - creates a ref callback for each item</span>
  <span class="hljs-keyword">const</span> createItemRef = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">itemId</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span>
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">element</span>: <span class="hljs-title class_">HTMLLIElement</span> | <span class="hljs-literal">null</span></span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (element) {
        <span class="hljs-keyword">const</span> height = element.<span class="hljs-title function_">getBoundingClientRect</span>().<span class="hljs-property">height</span>;
        <span class="hljs-title function_">setItemHeights</span>(<span class="hljs-function"><span class="hljs-params">prev</span> =&gt;</span> ({ ...prev, [itemId]: height }));
      }
    }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {items.map(item =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{createItemRef(item.id)}</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">padding:</span> &#x27;<span class="hljs-attr">10px</span>&#x27; }}&gt;</span>
            {item.name}
            {itemHeights[item.id] &amp;&amp; (
              <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">color:</span> &#x27;#<span class="hljs-attr">666</span>&#x27;, <span class="hljs-attr">marginLeft:</span> &#x27;<span class="hljs-attr">10px</span>&#x27; }}&gt;</span>
                ({itemHeights[item.id].toFixed(0)}px tall)
              <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            )}
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="تمرير-المراجع-تفويض-المسؤولية">تمرير المراجع: تفويض المسؤولية</h2>
<p>عندما تنشئ مكوّنات قابلة لإعادة الاستخدام، فغالبًا ما تريد للمكوّنات الأب أن تصل إلى عناصر DOM الداخلية. يتيح لك <code>forwardRef</code> «تمرير» مرجع عبر مكوّنك إلى العنصر في داخله.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { forwardRef, useRef, useImperativeHandle } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">CustomInputProps</span> {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">placeholder</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-comment">// ✅ forwardRef with proper typing</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">CustomInput</span> = forwardRef&lt;<span class="hljs-title class_">HTMLInputElement</span>, <span class="hljs-title class_">CustomInputProps</span>&gt;(
  <span class="hljs-function">(<span class="hljs-params">{ label, placeholder }, ref</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;custom-input&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
          {label}
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
            <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span>
            <span class="hljs-attr">placeholder</span>=<span class="hljs-string">{placeholder}</span>
            <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
              <span class="hljs-attr">marginLeft:</span> &#x27;<span class="hljs-attr">10px</span>&#x27;,
              <span class="hljs-attr">padding:</span> &#x27;<span class="hljs-attr">8px</span>&#x27;,
              <span class="hljs-attr">border:</span> &#x27;<span class="hljs-attr">1px</span> <span class="hljs-attr">solid</span> #<span class="hljs-attr">ccc</span>&#x27;,
              <span class="hljs-attr">borderRadius:</span> &#x27;<span class="hljs-attr">4px</span>&#x27;
            }}
          /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
);

<span class="hljs-comment">// Don&#x27;t forget the display name for debugging</span>
<span class="hljs-title class_">CustomInput</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">&#x27;CustomInput&#x27;</span>;
</code></pre>
<p>الآن تستطيع المكوّنات الأب الوصول المباشر إلى عنصر الإدخال:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useRef } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">ParentWithForwardedRef</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> inputRef = useRef&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">focusInput</span> = (<span class="hljs-params"></span>) =&gt; {
    inputRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">focus</span>();
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">clearInput</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (inputRef.<span class="hljs-property">current</span>) {
      inputRef.<span class="hljs-property">current</span>.<span class="hljs-property">value</span> = <span class="hljs-string">&#x27;&#x27;</span>;
      inputRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">focus</span>();
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">CustomInput</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{inputRef}</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;Name:&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Enter your name&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">marginTop:</span> &#x27;<span class="hljs-attr">10px</span>&#x27; }}&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{focusInput}</span>&gt;</span>Focus Input<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{clearInput}</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">marginLeft:</span> &#x27;<span class="hljs-attr">10px</span>&#x27; }}&gt;</span>
          Clear &amp; Focus
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>عند استخدام <code>forwardRef</code>، تستقبل دالة المكوّن <code>props</code> أولًا ثم <code>ref</code> ثانيًا. ويختلف هذا عن النمط المعتاد حيث يكون <code>ref</code> جزءًا من <code>props</code>.</p>
</blockquote>
<h2 id="المقابض-الإجرائية-واجهات-منتقاة">المقابض الإجرائية: واجهات منتقاة</h2>
<p>أحيانًا لا تريد كشف عنصر DOM بالكامل — بل تريد إنشاء واجهة إجرائية منتقاة. يتيح لك <code>useImperativeHandle</code> تخصيص ما يُكشف عندما يصل المكوّن الأب إلى مرجعك.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { forwardRef, useRef, useImperativeHandle, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">VideoPlayerHandle</span> {
  <span class="hljs-attr">play</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">pause</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">seek</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">time</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">getCurrentTime</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">getDuration</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">VideoPlayerProps</span> {
  <span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onTimeUpdate</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">currentTime</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">VideoPlayer</span> = forwardRef&lt;<span class="hljs-title class_">VideoPlayerHandle</span>, <span class="hljs-title class_">VideoPlayerProps</span>&gt;(
  <span class="hljs-function">(<span class="hljs-params">{ src, onTimeUpdate }, ref</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> videoRef = useRef&lt;<span class="hljs-title class_">HTMLVideoElement</span>&gt;(<span class="hljs-literal">null</span>);
    <span class="hljs-keyword">const</span> [isPlaying, setIsPlaying] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

    <span class="hljs-comment">// ✅ Expose only specific methods via useImperativeHandle</span>
    <span class="hljs-title function_">useImperativeHandle</span>(ref, <span class="hljs-function">() =&gt;</span> ({
      <span class="hljs-attr">play</span>: <span class="hljs-function">() =&gt;</span> {
        videoRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">play</span>();
        <span class="hljs-title function_">setIsPlaying</span>(<span class="hljs-literal">true</span>);
      },
      <span class="hljs-attr">pause</span>: <span class="hljs-function">() =&gt;</span> {
        videoRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">pause</span>();
        <span class="hljs-title function_">setIsPlaying</span>(<span class="hljs-literal">false</span>);
      },
      <span class="hljs-attr">seek</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">time</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (videoRef.<span class="hljs-property">current</span>) {
          videoRef.<span class="hljs-property">current</span>.<span class="hljs-property">currentTime</span> = time;
        }
      },
      <span class="hljs-attr">getCurrentTime</span>: <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-keyword">return</span> videoRef.<span class="hljs-property">current</span>?.<span class="hljs-property">currentTime</span> ?? <span class="hljs-number">0</span>;
      },
      <span class="hljs-attr">getDuration</span>: <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-keyword">return</span> videoRef.<span class="hljs-property">current</span>?.<span class="hljs-property">duration</span> ?? <span class="hljs-number">0</span>;
      },
    }), []);

    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;video-player&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">video</span>
          <span class="hljs-attr">ref</span>=<span class="hljs-string">{videoRef}</span>
          <span class="hljs-attr">src</span>=<span class="hljs-string">{src}</span>
          <span class="hljs-attr">onTimeUpdate</span>=<span class="hljs-string">{()</span> =&gt;</span> {
            if (videoRef.current &amp;&amp; onTimeUpdate) {
              onTimeUpdate(videoRef.current.currentTime);
            }
          }}
          style={{ width: &#x27;100%&#x27;, maxWidth: &#x27;500px&#x27; }}
        /&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">marginTop:</span> &#x27;<span class="hljs-attr">10px</span>&#x27; }}&gt;</span>
          Status: {isPlaying ? &#x27;Playing&#x27; : &#x27;Paused&#x27;}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
);

<span class="hljs-title class_">VideoPlayer</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">&#x27;VideoPlayer&#x27;</span>;
</code></pre>
<p>الآن تحصل المكوّنات الأب على واجهة نظيفة ومتحكَّم بها بدل عنصر الفيديو كاملًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useRef, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">VideoController</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> videoRef = useRef&lt;<span class="hljs-title class_">VideoPlayerHandle</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [currentTime, setCurrentTime] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handlePlay</span> = (<span class="hljs-params"></span>) =&gt; videoRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">play</span>();
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handlePause</span> = (<span class="hljs-params"></span>) =&gt; videoRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">pause</span>();
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSeek</span> = (<span class="hljs-params"><span class="hljs-attr">time</span>: <span class="hljs-built_in">number</span></span>) =&gt; videoRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">seek</span>(time);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">VideoPlayer</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{videoRef}</span>
        <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;/sample-video.mp4&quot;</span>
        <span class="hljs-attr">onTimeUpdate</span>=<span class="hljs-string">{setCurrentTime}</span>
      /&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">marginTop:</span> &#x27;<span class="hljs-attr">20px</span>&#x27; }}&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handlePlay}</span>&gt;</span>Play<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handlePause}</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">marginLeft:</span> &#x27;<span class="hljs-attr">10px</span>&#x27; }}&gt;</span>
          Pause
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> handleSeek(30)} style={{ marginLeft: &#x27;10px&#x27; }}&gt;
          Skip to 30s
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Current time: {currentTime.toFixed(2)}s<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="الأنماط-الشائعة-والمزالق">الأنماط الشائعة والمزالق</h2>
<h3 id="رقصة-التحقق-من-القيم-الفارغة">رقصة التحقّق من القيم الفارغة</h3>
<p>تبدأ مراجع DOM بقيمة <code>null</code>، لذا ستجري تحقّقات من <code>null</code> باستمرار. إليك بعض الأنماط التي تجعل ذلك أقل إزعاجًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useRef, useCallback } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">NullCheckPatterns</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> elementRef = useRef&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// ✅ Early return pattern</span>
  <span class="hljs-keyword">const</span> handleMeasure = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!elementRef.<span class="hljs-property">current</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> rect = elementRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">getBoundingClientRect</span>();
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Dimensions:&#x27;</span>, rect.<span class="hljs-property">width</span>, rect.<span class="hljs-property">height</span>);
  }, []);

  <span class="hljs-comment">// ✅ Optional chaining for simple operations</span>
  <span class="hljs-keyword">const</span> handleFocus = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    elementRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">focus</span>();
  }, []);

  <span class="hljs-comment">// ✅ Helper function for common operations</span>
  <span class="hljs-keyword">const</span> withElement = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">callback</span>: (el: HTMLDivElement) =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (elementRef.<span class="hljs-property">current</span>) {
      <span class="hljs-title function_">callback</span>(elementRef.<span class="hljs-property">current</span>);
    }
  }, []);

  <span class="hljs-keyword">const</span> handleComplexOperation = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">withElement</span>(<span class="hljs-function">(<span class="hljs-params">el</span>) =&gt;</span> {
      el.<span class="hljs-property">style</span>.<span class="hljs-property">backgroundColor</span> = <span class="hljs-string">&#x27;lightblue&#x27;</span>;
      el.<span class="hljs-title function_">scrollIntoView</span>({ <span class="hljs-attr">behavior</span>: <span class="hljs-string">&#x27;smooth&#x27;</span> });
      <span class="hljs-comment">// More complex operations without null checks</span>
    });
  }, [withElement]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{elementRef}</span> <span class="hljs-attr">tabIndex</span>=<span class="hljs-string">{0}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleMeasure}</span>&gt;</span>Measure<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleFocus}</span>&gt;</span>Focus<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleComplexOperation}</span>&gt;</span>Complex Operation<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="مزالق-التوقيت-في-المراجع">مزالق التوقيت في المراجع</h3>
<p>المراجع غير متاحة أثناء أول تصيير — تُضبط في مرحلة الالتزام (commit). إذا احتجت إلى تشغيل شيفرة عند توفّر المرجع، فاستخدم <code>useEffect</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useRef, useEffect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">RefTimingExample</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> canvasRef = useRef&lt;<span class="hljs-title class_">HTMLCanvasElement</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// ❌ This won&#x27;t work - ref is null during first render</span>
  <span class="hljs-comment">// const ctx = canvasRef.current?.getContext(&#x27;2d&#x27;);</span>

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// ✅ This works - ref is available after commit</span>
    <span class="hljs-keyword">if</span> (canvasRef.<span class="hljs-property">current</span>) {
      <span class="hljs-keyword">const</span> ctx = canvasRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">getContext</span>(<span class="hljs-string">&#x27;2d&#x27;</span>);
      <span class="hljs-keyword">if</span> (ctx) {
        ctx.<span class="hljs-property">fillStyle</span> = <span class="hljs-string">&#x27;#ff6b6b&#x27;</span>;
        ctx.<span class="hljs-title function_">fillRect</span>(<span class="hljs-number">10</span>, <span class="hljs-number">10</span>, <span class="hljs-number">100</span>, <span class="hljs-number">100</span>);
      }
    }
  }, []); <span class="hljs-comment">// Empty dependency array - run once after mount</span>

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{canvasRef}</span> <span class="hljs-attr">width</span>=<span class="hljs-string">{200}</span> <span class="hljs-attr">height</span>=<span class="hljs-string">{200}</span> /&gt;</span></span>;
}
</code></pre>
<h3 id="الجمع-بين-عدة-مراجع">الجمع بين عدة مراجع</h3>
<p>أحيانًا تحتاج إلى استخدام مرجع مُمرَّر ومرجع داخلي خاص بك في الوقت نفسه. إليك كيفية التعامل مع ذلك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { forwardRef, useRef, useImperativeHandle } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">EnhancedButtonHandle</span> {
  <span class="hljs-attr">focus</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">click</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">EnhancedButtonProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">onClick</span>?: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">EnhancedButton</span> = forwardRef&lt;<span class="hljs-title class_">EnhancedButtonHandle</span>, <span class="hljs-title class_">EnhancedButtonProps</span>&gt;(
  <span class="hljs-function">(<span class="hljs-params">{ children, onClick }, ref</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> buttonRef = useRef&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt;(<span class="hljs-literal">null</span>);

    <span class="hljs-title function_">useImperativeHandle</span>(ref, <span class="hljs-function">() =&gt;</span> ({
      <span class="hljs-attr">focus</span>: <span class="hljs-function">() =&gt;</span> buttonRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">focus</span>(),
      <span class="hljs-attr">click</span>: <span class="hljs-function">() =&gt;</span> buttonRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">click</span>(),
    }), []);

    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{buttonRef}</span>
        <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>
        <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
          <span class="hljs-attr">padding:</span> &#x27;<span class="hljs-attr">10px</span> <span class="hljs-attr">20px</span>&#x27;,
          <span class="hljs-attr">fontSize:</span> &#x27;<span class="hljs-attr">16px</span>&#x27;,
          <span class="hljs-attr">borderRadius:</span> &#x27;<span class="hljs-attr">5px</span>&#x27;,
          <span class="hljs-attr">border:</span> &#x27;<span class="hljs-attr">none</span>&#x27;,
          <span class="hljs-attr">backgroundColor:</span> &#x27;#<span class="hljs-attr">007bff</span>&#x27;,
          <span class="hljs-attr">color:</span> &#x27;<span class="hljs-attr">white</span>&#x27;,
          <span class="hljs-attr">cursor:</span> &#x27;<span class="hljs-attr">pointer</span>&#x27;
        }}
      &gt;</span>
        {children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    );
  }
);

<span class="hljs-title class_">EnhancedButton</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">&#x27;EnhancedButton&#x27;</span>;
</code></pre>
<h2 id="متى-تستخدم-ماذا">متى تستخدم ماذا</h2>
<p>إليك شجرة قرار سريعة لاختيار نهج المرجع المناسب:</p>
<ul>
<li><strong>هل تحتاج إلى الوصول إلى عنصر DOM؟</strong> → <code>useRef&lt;HTMLElementType&gt;(null)</code></li>
<li><strong>هل تحتاج إلى تخزين قيمة قابلة للتغيير عبر التصييرات؟</strong> → <code>useRef&lt;ValueType&gt;(initialValue)</code></li>
<li><strong>هل تحتاج إلى تشغيل شيفرة عند ظهور عنصر؟</strong> → مرجع استدعاء (callback ref)</li>
<li><strong>هل تعمل مع قوائم ديناميكية؟</strong> → مراجع استدعاء مع دوال مُولِّدة (factories)</li>
<li><strong>هل تبني مكوّنًا قابلًا لإعادة الاستخدام ينبغي أن يكشف عنصره؟</strong> → <code>forwardRef</code></li>
<li><strong>هل تريد كشف واجهة منتقاة بدل العنصر الخام؟</strong> → <code>forwardRef</code> + <code>useImperativeHandle</code></li>
</ul>
<h2 id="حالات-استخدام-من-العالم-الحقيقي">حالات استخدام من العالم الحقيقي™</h2>
<h3 id="إدارة-التركيز-focus-management">إدارة التركيز (Focus Management)</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useRef, useEffect } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FocusTrapProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">active</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">FocusTrap</span>(<span class="hljs-params">{ children, active }: <span class="hljs-title class_">FocusTrapProps</span></span>) {
  <span class="hljs-keyword">const</span> containerRef = useRef&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> previousActiveElement = useRef&lt;<span class="hljs-title class_">Element</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!active || !containerRef.<span class="hljs-property">current</span>) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Store the currently focused element</span>
    previousActiveElement.<span class="hljs-property">current</span> = <span class="hljs-variable language_">document</span>.<span class="hljs-property">activeElement</span>;

    <span class="hljs-comment">// Focus the container</span>
    containerRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">focus</span>();

    <span class="hljs-comment">// Return focus when deactivating</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">if</span> (previousActiveElement.<span class="hljs-property">current</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">HTMLElement</span>) {
        previousActiveElement.<span class="hljs-property">current</span>.<span class="hljs-title function_">focus</span>();
      }
    };
  }, [active]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">ref</span>=<span class="hljs-string">{containerRef}</span>
      <span class="hljs-attr">tabIndex</span>=<span class="hljs-string">{-1}</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
        <span class="hljs-attr">outline:</span> <span class="hljs-attr">active</span> ? &#x27;<span class="hljs-attr">2px</span> <span class="hljs-attr">solid</span> <span class="hljs-attr">blue</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">none</span>&#x27;,
        <span class="hljs-attr">padding:</span> &#x27;<span class="hljs-attr">20px</span>&#x27;,
        <span class="hljs-attr">border:</span> &#x27;<span class="hljs-attr">1px</span> <span class="hljs-attr">solid</span> #<span class="hljs-attr">ccc</span>&#x27;
      }}
    &gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="تنسيق-حقول-النماذج">تنسيق حقول النماذج</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { forwardRef, useImperativeHandle, useRef } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FormFieldHandle</span> {
  <span class="hljs-attr">focus</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">clear</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">getValue</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">FormFieldProps</span> {
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">type</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">required</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">FormField</span> = forwardRef&lt;<span class="hljs-title class_">FormFieldHandle</span>, <span class="hljs-title class_">FormFieldProps</span>&gt;(
  <span class="hljs-function">(<span class="hljs-params">{ label, <span class="hljs-keyword">type</span> = <span class="hljs-string">&#x27;text&#x27;</span>, required }, ref</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> inputRef = useRef&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;(<span class="hljs-literal">null</span>);

    <span class="hljs-title function_">useImperativeHandle</span>(ref, <span class="hljs-function">() =&gt;</span> ({
      <span class="hljs-attr">focus</span>: <span class="hljs-function">() =&gt;</span> inputRef.<span class="hljs-property">current</span>?.<span class="hljs-title function_">focus</span>(),
      <span class="hljs-attr">clear</span>: <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-keyword">if</span> (inputRef.<span class="hljs-property">current</span>) {
          inputRef.<span class="hljs-property">current</span>.<span class="hljs-property">value</span> = <span class="hljs-string">&#x27;&#x27;</span>;
          inputRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">focus</span>();
        }
      },
      <span class="hljs-attr">getValue</span>: <span class="hljs-function">() =&gt;</span> inputRef.<span class="hljs-property">current</span>?.<span class="hljs-property">value</span> ?? <span class="hljs-string">&#x27;&#x27;</span>,
    }), []);

    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">marginBottom:</span> &#x27;<span class="hljs-attr">15px</span>&#x27; }}&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">display:</span> &#x27;<span class="hljs-attr">block</span>&#x27;, <span class="hljs-attr">marginBottom:</span> &#x27;<span class="hljs-attr">5px</span>&#x27; }}&gt;</span>
          {label} {required &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">color:</span> &#x27;<span class="hljs-attr">red</span>&#x27; }}&gt;</span>*<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
        <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">ref</span>=<span class="hljs-string">{inputRef}</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">{type}</span>
          <span class="hljs-attr">required</span>=<span class="hljs-string">{required}</span>
          <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
            <span class="hljs-attr">padding:</span> &#x27;<span class="hljs-attr">8px</span>&#x27;,
            <span class="hljs-attr">border:</span> &#x27;<span class="hljs-attr">1px</span> <span class="hljs-attr">solid</span> #<span class="hljs-attr">ddd</span>&#x27;,
            <span class="hljs-attr">borderRadius:</span> &#x27;<span class="hljs-attr">4px</span>&#x27;,
            <span class="hljs-attr">width:</span> &#x27;<span class="hljs-attr">100</span>%&#x27;
          }}
        /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
);

<span class="hljs-title class_">FormField</span>.<span class="hljs-property">displayName</span> = <span class="hljs-string">&#x27;FormField&#x27;</span>;
</code></pre>
<h2 id="الخلاصة">الخلاصة</h2>
<p>تربط المراجع عالم React التصريحي بواجهات DOM الإجرائية التي تحتاجها أحيانًا. يجعلها TypeScript أكثر أمانًا عبر التقاط عدم تطابق الأنواع وقت التصريف (compilation)، لكنك ما زلت بحاجة إلى معالجة واقع التشغيل لمراجع <code>null</code> وإدارة دورة الحياة بشكل صحيح.</p>
<p>أهم ما ينبغي أن تأخذه معك:</p>
<ul>
<li>نمّط مراجعك صراحةً دائمًا —‏ <code>useRef&lt;HTMLInputElement&gt;(null)</code> أفضل من <code>useRef(null)</code></li>
<li>استخدم مراجع الاستدعاء في السيناريوهات الديناميكية وللوصول الفوري إلى DOM</li>
<li>ينشئ <code>forwardRef</code> مع <code>useImperativeHandle</code> واجهات مكوّنات نظيفة دون كشف تفاصيل التنفيذ</li>
<li>تذكّر أن المراجع تبقى <code>null</code> حتى بعد أول تصيير</li>
</ul>
<p>المراجع هي مخرجك حين لا يكفي تدفّق البيانات المعتاد في React. استخدمها بحكمة، ونمّطها بشكل صحيح، وسيشكرك نسختك المستقبلية عند تنقيح تفاعلات DOM في الساعة الثانية فجرًا.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
