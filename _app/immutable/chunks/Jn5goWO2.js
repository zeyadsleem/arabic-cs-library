const s="kinney",a="react-performance",n="أداء React",p="react-memo-react-19-and-compiler-era",l="React.memo في عصر React 19 والمُصرّف",t=[{depth:2,id:"ما-هو-reactmemo",text:"ما هو React.memo؟"},{depth:2,id:"مصرف-react-19-يغير-كل-شيء",text:"مُصرّف React 19 يغيّر كل شيء"},{depth:2,id:"متى-يبقى-reactmemo-مهما",text:"متى يبقى React.memo مهمًّا"},{depth:3,id:"مقارنات-تساو-معقدة",text:"مقارنات تساوٍ معقّدة"},{depth:3,id:"مكتبات-الطرف-الثالث-والشيفرة-القديمة",text:"مكتبات الطرف الثالث والشيفرة القديمة"},{depth:3,id:"تحكم-دقيق",text:"تحكّم دقيق"},{depth:2,id:"كتابة-دوال-areequal-فعالة",text:"كتابة دوال areEqual فعّالة"},{depth:3,id:"أبقها-بسيطة-وسريعة",text:"أبقِها بسيطة وسريعة"},{depth:3,id:"ركز-على-ما-يهم-فعلا",text:"ركّز على ما يهمّ فعلًا"},{depth:3,id:"تعامل-مع-خصائص-الدوال-بحذر",text:"تعامل مع خصائص الدوال بحذر"},{depth:2,id:"متى-لا-تستخدم-reactmemo",text:"متى لا تستخدم React.memo"},{depth:3,id:"مكونات-يعاد-تصييرها-دائما",text:"مكوّنات يُعاد تصييرها دائمًا"},{depth:3,id:"مكونات-رخيصة",text:"مكوّنات رخيصة"},{depth:3,id:"عندما-تتوفر-لديك-تحسينات-المصرف",text:"عندما تتوفّر لديك تحسينات المُصرّف"},{depth:2,id:"تصحيح-مشكلات-حفظ-النتائج",text:"تصحيح مشكلات حفظ النتائج"},{depth:3,id:"سجل-تغييرات-الخصائص",text:"سجّل تغييرات الخصائص"},{depth:3,id:"استخدم-أداة-profiler-في-react-devtools",text:"استخدم أداة Profiler في React DevTools"},{depth:2,id:"أنماط-من-الواقع",text:"أنماط من الواقع"},{depth:3,id:"مكونات-القوائم-بمفاتيح-مستقرة",text:"مكوّنات القوائم بمفاتيح مستقرة"},{depth:3,id:"مكونات-كثيفة-الإعدادات",text:"مكوّنات كثيفة الإعدادات"},{depth:2,id:"مستقبل-حفظ-النتائج",text:"مستقبل حفظ النتائج"},{depth:2,id:"ملخص-أفضل-الممارسات",text:"ملخّص أفضل الممارسات"}],e=`<p>يأتي React 19 بمُصرّف React (React Compiler) متاحًا للعموم، واعدًا بتحسين مكوّناتك تلقائيًا من أجل الأداء. لكن هل يعني ذلك أن <code>React.memo</code> صار عتيقًا؟ ليس تمامًا. فمع أن المُصرّف يتولّى كثيرًا من الحالات التي كانت تتطلّب حفظ النتائج يدويًا، يبقى فهم متى وكيف تستخدم <code>React.memo</code> بفعالية جوهريًا لبناء تطبيقات React عالية الأداء. لنستكشف المواضع التي ما زال <code>React.memo</code> يتألّق فيها، ومتى تجعله React الحديثة زائدًا عن الحاجة، وكيف تكتب مقارنات تساوٍ سليمة عند الحاجة إليها.</p>
<h2 id="ما-هو-reactmemo">ما هو <code>React.memo</code>؟</h2>
<p><code>React.memo</code> مكوّن أعلى رتبة يمنع إعادات التصيير غير الضرورية عبر حفظ نتيجة المكوّن. فهو يقارن الخصائص الحالية بالخصائص السابقة بمقارنة سطحية، ولا يعيد التصيير إلا إن تغيّرت. فكّر فيه كتحسين للأداء يقول «يا React، لا تُعِد تصيير هذا المكوّن إلا إذا تغيّرت الخصائص فعلًا».</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Basic usage</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ExpensiveComponent</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-function">(<span class="hljs-params">{ data, onUpdate }</span>) =&gt;</span> {
  <span class="hljs-comment">// Some computationally expensive rendering logic</span>
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {data.map((item) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">Item</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span> {<span class="hljs-attr">...item</span>} /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
});
</code></pre>
<p>عندما يُعاد تصيير الأب، تتخطّى React إعادة تصيير <code>ExpensiveComponent</code> إن لم تتغيّر خصائصه. بسيط بما يكفي، أليس كذلك؟</p>
<h2 id="مصرف-react-19-يغير-كل-شيء">مُصرّف React 19 يغيّر كل شيء</h2>
<p>يحدّد مُصرّف React (المعروف سابقًا بـ React Forget) فرص حفظ النتائج تلقائيًا ويطبّقها خلف الكواليس. فهو يحلّل مخطط اعتماديات مكوّنك ويُدرج التحسينات المناسبة في وقت البناء.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Before: You&#x27;d manually wrap this</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserCard</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-function">(<span class="hljs-params">{ user, theme }</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">card</span> <span class="hljs-attr">card--</span>\${<span class="hljs-attr">theme</span>}\`}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{user.email}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
});

<span class="hljs-comment">// After: The compiler handles this automatically</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">UserCard</span> = (<span class="hljs-params">{ user, theme }</span>) =&gt; {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">card</span> <span class="hljs-attr">card--</span>\${<span class="hljs-attr">theme</span>}\`}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{user.email}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
<span class="hljs-comment">// Compiler output includes automatic memoization where beneficial</span>
</code></pre>
<p>المُصرّف ذكيّ في تحديد متى يطبّق هذه التحسينات. فلا يحفظ نتائج مكوّنات:</p>
<ul>
<li>رخيصة التصيير</li>
<li>تتغيّر خصائصها بشكل متكرّر</li>
<li>تستفيد أكثر من تحسينات أخرى</li>
</ul>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>مُصرّف React اختياري في React 19. ستحتاج إلى تفعيله في إعدادات البناء للاستفادة من التحسينات التلقائية.</p>
</blockquote>
<h2 id="متى-يبقى-reactmemo-مهما">متى يبقى <code>React.memo</code> مهمًّا</h2>
<p>حتى مع المُصرّف، توجد حالات يبقى فيها الاستخدام اليدوي لـ <code>React.memo</code> ذا قيمة:</p>
<h3 id="مقارنات-تساو-معقدة">مقارنات تساوٍ معقّدة</h3>
<p>يستخدم المُصرّف المقارنة السطحية افتراضيًا، لكنك تحتاج أحيانًا إلى منطق مقارنة مخصّص:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ProductCardProps</span> {
  <span class="hljs-attr">product</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">specs</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;;
    <span class="hljs-attr">lastUpdated</span>: <span class="hljs-title class_">Date</span>;
  };
  <span class="hljs-attr">onAddToCart</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-comment">// Only re-render if product data meaningfully changed</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ProductCard</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(
  <span class="hljs-function">(<span class="hljs-params">{ product, onAddToCart }: <span class="hljs-title class_">ProductCardProps</span></span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{product.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ProductSpecs</span> <span class="hljs-attr">specs</span>=<span class="hljs-string">{product.specs}</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> onAddToCart(product.id)}&gt;Add to Cart<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  },
  <span class="hljs-function">(<span class="hljs-params">prevProps, nextProps</span>) =&gt;</span> {
    <span class="hljs-comment">// Custom equality: ignore lastUpdated changes</span>
    <span class="hljs-keyword">const</span> prevProduct = prevProps.<span class="hljs-property">product</span>;
    <span class="hljs-keyword">const</span> nextProduct = nextProps.<span class="hljs-property">product</span>;

    <span class="hljs-keyword">return</span> (
      prevProduct.<span class="hljs-property">id</span> === nextProduct.<span class="hljs-property">id</span> &amp;&amp;
      prevProduct.<span class="hljs-property">name</span> === nextProduct.<span class="hljs-property">name</span> &amp;&amp;
      <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(prevProduct.<span class="hljs-property">specs</span>) === <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(nextProduct.<span class="hljs-property">specs</span>) &amp;&amp;
      prevProps.<span class="hljs-property">onAddToCart</span> === nextProps.<span class="hljs-property">onAddToCart</span>
    );
  },
);
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>احذر استخدام <code>JSON.stringify</code> للمقارنة العميقة — فهو مكلف ولا يتعامل مع المراجع الدائرية. فكّر في استخدام مكتبة مقارنة عميقة مناسبة مثل <code>isEqual</code> من Lodash للكائنات المعقّدة.</p>
</blockquote>
<h3 id="مكتبات-الطرف-الثالث-والشيفرة-القديمة">مكتبات الطرف الثالث والشيفرة القديمة</h3>
<p>إذا كنت تعمل مع مكوّنات لم يعالجها المُصرّف (مكتبات طرف ثالث، شيفرة قديمة)، فلا يزال حفظ النتائج يدويًا يوفّر فوائد كبيرة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Third-party component that isn&#x27;t compiler-optimized</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">ExpensiveChart</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;some-chart-library&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">OptimizedChart</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-title class_">ExpensiveChart</span>, <span class="hljs-function">(<span class="hljs-params">prevProps, nextProps</span>) =&gt;</span> {
  <span class="hljs-comment">// Chart only needs to re-render if data actually changed</span>
  <span class="hljs-keyword">return</span> prevProps.<span class="hljs-property">data</span> === nextProps.<span class="hljs-property">data</span> &amp;&amp; prevProps.<span class="hljs-property">config</span> === nextProps.<span class="hljs-property">config</span>;
});
</code></pre>
<h3 id="تحكم-دقيق">تحكّم دقيق</h3>
<p>أنت تعرف أحيانًا أفضل من المُصرّف متى ينبغي إعادة تصيير المكوّن. ويصدق هذا خاصة في المكوّنات ذات الآثار الجانبية المكلفة أو منطق التصيير المعقّد:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">DataVisualizationProps</span> {
  <span class="hljs-attr">dataset</span>: <span class="hljs-title class_">DataPoint</span>[];
  <span class="hljs-attr">filterOptions</span>: <span class="hljs-title class_">FilterConfig</span>;
  <span class="hljs-attr">renderMode</span>: <span class="hljs-string">&#x27;canvas&#x27;</span> | <span class="hljs-string">&#x27;svg&#x27;</span> | <span class="hljs-string">&#x27;webgl&#x27;</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">DataVisualization</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(
  <span class="hljs-function">(<span class="hljs-params">{ dataset, filterOptions, renderMode }: <span class="hljs-title class_">DataVisualizationProps</span></span>) =&gt;</span> {
    <span class="hljs-comment">// Expensive WebGL rendering that we want to control precisely</span>
    <span class="hljs-keyword">const</span> processedData = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-title function_">processDataForVisualization</span>(dataset, filterOptions);
    }, [dataset, filterOptions]);

    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AdvancedChart</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{processedData}</span> <span class="hljs-attr">mode</span>=<span class="hljs-string">{renderMode}</span> /&gt;</span></span>;
  },
  <span class="hljs-function">(<span class="hljs-params">prevProps, nextProps</span>) =&gt;</span> {
    <span class="hljs-comment">// Only re-render if dataset reference changed or critical config changed</span>
    <span class="hljs-keyword">return</span> (
      prevProps.<span class="hljs-property">dataset</span> === nextProps.<span class="hljs-property">dataset</span> &amp;&amp;
      prevProps.<span class="hljs-property">renderMode</span> === nextProps.<span class="hljs-property">renderMode</span> &amp;&amp;
      <span class="hljs-title function_">isFilterConfigEqual</span>(prevProps.<span class="hljs-property">filterOptions</span>, nextProps.<span class="hljs-property">filterOptions</span>)
    );
  },
);
</code></pre>
<h2 id="كتابة-دوال-areequal-فعالة">كتابة دوال areEqual فعّالة</h2>
<p>عندما تحتاج فعلًا إلى مقارنات تساوٍ مخصّصة، اتبع هذه الإرشادات:</p>
<h3 id="أبقها-بسيطة-وسريعة">أبقِها بسيطة وسريعة</h3>
<p>تعمل دالة التساوي في كل إعادة تصيير محتملة، فاجعلها خفيفة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Fast property checks</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">areEqual</span> = (<span class="hljs-params">prevProps, nextProps</span>) =&gt; {
  <span class="hljs-keyword">return</span> (
    prevProps.<span class="hljs-property">id</span> === nextProps.<span class="hljs-property">id</span> &amp;&amp;
    prevProps.<span class="hljs-property">status</span> === nextProps.<span class="hljs-property">status</span> &amp;&amp;
    prevProps.<span class="hljs-property">priority</span> === nextProps.<span class="hljs-property">priority</span>
  );
};

<span class="hljs-comment">// ❌ Bad: Expensive deep equality on every render</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">areEqual</span> = (<span class="hljs-params">prevProps, nextProps</span>) =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(prevProps) === <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(nextProps);
};
</code></pre>
<h3 id="ركز-على-ما-يهم-فعلا">ركّز على ما يهمّ فعلًا</h3>
<p>لا تفحص خصائص لا تؤثّر في التصيير:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">TaskItemProps</span> {
  <span class="hljs-attr">task</span>: {
    <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">completed</span>: <span class="hljs-built_in">boolean</span>;
    <span class="hljs-attr">createdAt</span>: <span class="hljs-title class_">Date</span>; <span class="hljs-comment">// Doesn&#x27;t affect rendering</span>
    <span class="hljs-attr">internalTracking</span>: <span class="hljs-built_in">any</span>; <span class="hljs-comment">// Doesn&#x27;t affect rendering</span>
  };
  <span class="hljs-attr">onToggle</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">TaskItem</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(
  <span class="hljs-function">(<span class="hljs-params">{ task, onToggle }: <span class="hljs-title class_">TaskItemProps</span></span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{task.completed</span> ? &#x27;<span class="hljs-attr">completed</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{task.title}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> onToggle(task.id)}&gt;{task.completed ? &#x27;Undo&#x27; : &#x27;Complete&#x27;}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  },
  <span class="hljs-function">(<span class="hljs-params">prevProps, nextProps</span>) =&gt;</span> {
    <span class="hljs-comment">// Only check properties that affect rendering</span>
    <span class="hljs-keyword">const</span> prevTask = prevProps.<span class="hljs-property">task</span>;
    <span class="hljs-keyword">const</span> nextTask = nextProps.<span class="hljs-property">task</span>;

    <span class="hljs-keyword">return</span> (
      prevTask.<span class="hljs-property">id</span> === nextTask.<span class="hljs-property">id</span> &amp;&amp;
      prevTask.<span class="hljs-property">title</span> === nextTask.<span class="hljs-property">title</span> &amp;&amp;
      prevTask.<span class="hljs-property">completed</span> === nextTask.<span class="hljs-property">completed</span> &amp;&amp;
      prevProps.<span class="hljs-property">onToggle</span> === nextProps.<span class="hljs-property">onToggle</span>
    );
  },
);
</code></pre>
<h3 id="تعامل-مع-خصائص-الدوال-بحذر">تعامل مع خصائص الدوال بحذر</h3>
<p>خصائص الدوال مصدر شائع لإعادات التصيير غير الضرورية. تأكّد من أن فحص التساوي لديك يتعامل معها على النحو المناسب:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// If you know the function is stable (wrapped in useCallback), reference equality works</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">SimpleComponent</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(
  <span class="hljs-function">(<span class="hljs-params">{ data, onClick }</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClick}</span>&gt;</span>{data.label}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
  },
  <span class="hljs-function">(<span class="hljs-params">prevProps, nextProps</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> (
      prevProps.<span class="hljs-property">data</span>.<span class="hljs-property">label</span> === nextProps.<span class="hljs-property">data</span>.<span class="hljs-property">label</span> &amp;&amp; prevProps.<span class="hljs-property">onClick</span> === nextProps.<span class="hljs-property">onClick</span> <span class="hljs-comment">// Reference equality for stable functions</span>
    );
  },
);

<span class="hljs-comment">// If functions might be recreated but are functionally equivalent, you might skip them</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">FlexibleComponent</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(
  <span class="hljs-function">(<span class="hljs-params">{ data, onSubmit }</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{onSubmit}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">defaultValue</span>=<span class="hljs-string">{data.value}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
    );
  },
  <span class="hljs-function">(<span class="hljs-params">prevProps, nextProps</span>) =&gt;</span> {
    <span class="hljs-comment">// Skip function comparison if the data is the same</span>
    <span class="hljs-keyword">return</span> prevProps.<span class="hljs-property">data</span>.<span class="hljs-property">value</span> === nextProps.<span class="hljs-property">data</span>.<span class="hljs-property">value</span>;
  },
);
</code></pre>
<h2 id="متى-لا-تستخدم-reactmemo">متى لا تستخدم <code>React.memo</code></h2>
<h3 id="مكونات-يعاد-تصييرها-دائما">مكوّنات يُعاد تصييرها دائمًا</h3>
<p>إذا تغيّرت خصائص مكوّنك في كل تصيير للأب، فحفظ النتائج يضيف حملًا بلا فائدة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Timestamp changes every render</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">Clock</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{new Date().toLocaleTimeString()}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
});

<span class="hljs-comment">// ✅ Better: Just let it re-render</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">Clock</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{new Date().toLocaleTimeString()}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
};
</code></pre>
<h3 id="مكونات-رخيصة">مكوّنات رخيصة</h3>
<p>في المكوّنات البسيطة، قد يفوق حمل حفظ النتائج فوائده:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Probably unnecessary</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">SimpleLabel</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(<span class="hljs-function">(<span class="hljs-params">{ text, className }</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span>&gt;</span>{text}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>;
});

<span class="hljs-comment">// ✅ Just let it re-render—it&#x27;s cheap</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">SimpleLabel</span> = (<span class="hljs-params">{ text, className }</span>) =&gt; {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span>&gt;</span>{text}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>;
};
</code></pre>
<h3 id="عندما-تتوفر-لديك-تحسينات-المصرف">عندما تتوفّر لديك تحسينات المُصرّف</h3>
<p>إذا كان مُصرّف React يتولّى مكوّنك، فقد يتعارض إضافة <code>React.memo</code> يدويًا مع تحسيناته أو ينشئ عملًا زائدًا.</p>
<h2 id="تصحيح-مشكلات-حفظ-النتائج">تصحيح مشكلات حفظ النتائج</h2>
<p>عندما لا تسير الأمور كما هو متوقّع، فإن أداة Profiler في React DevTools هي صديقك المفضّل. لكن إليك بعض تقنيات التصحيح السريعة:</p>
<h3 id="سجل-تغييرات-الخصائص">سجّل تغييرات الخصائص</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">DebugMemo</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(
  <span class="hljs-function">(<span class="hljs-params">{ data, config }</span>) =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Component rendering with:&#x27;</span>, { data, config });
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ExpensiveComponent</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span> <span class="hljs-attr">config</span>=<span class="hljs-string">{config}</span> /&gt;</span></span>;
  },
  <span class="hljs-function">(<span class="hljs-params">prevProps, nextProps</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> isEqual = prevProps.<span class="hljs-property">data</span> === nextProps.<span class="hljs-property">data</span> &amp;&amp; prevProps.<span class="hljs-property">config</span> === nextProps.<span class="hljs-property">config</span>;

    <span class="hljs-keyword">if</span> (!isEqual) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Props changed:&#x27;</span>, {
        <span class="hljs-attr">dataChanged</span>: prevProps.<span class="hljs-property">data</span> !== nextProps.<span class="hljs-property">data</span>,
        <span class="hljs-attr">configChanged</span>: prevProps.<span class="hljs-property">config</span> !== nextProps.<span class="hljs-property">config</span>,
      });
    }

    <span class="hljs-keyword">return</span> isEqual;
  },
);
</code></pre>
<h3 id="استخدم-أداة-profiler-في-react-devtools">استخدم أداة Profiler في React DevTools</h3>
<p>فعّل «Record why each component rendered» في React DevTools لترى بالضبط لماذا تُعاد المكوّنات للتصيير، حتى مع حفظ النتائج.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>ثبّت إضافة المتصفّح React DevTools واستخدم تبويب Profiler لتحديد اختناقات الأداء. فسيُظهر لك أيّ المكوّنات يُعاد تصييرها ولماذا.</p>
</blockquote>
<h2 id="أنماط-من-الواقع">أنماط من الواقع</h2>
<h3 id="مكونات-القوائم-بمفاتيح-مستقرة">مكوّنات القوائم بمفاتيح مستقرة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">TodoListProps</span> {
  <span class="hljs-attr">todos</span>: <span class="hljs-title class_">Todo</span>[];
  <span class="hljs-attr">onToggle</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">onDelete</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">TodoList</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(
  <span class="hljs-function">(<span class="hljs-params">{ todos, onToggle, onDelete }: <span class="hljs-title class_">TodoListProps</span></span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {todos.map((todo) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">TodoItem</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span> <span class="hljs-attr">todo</span>=<span class="hljs-string">{todo}</span> <span class="hljs-attr">onToggle</span>=<span class="hljs-string">{onToggle}</span> <span class="hljs-attr">onDelete</span>=<span class="hljs-string">{onDelete}</span> /&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
    );
  },
  <span class="hljs-function">(<span class="hljs-params">prevProps, nextProps</span>) =&gt;</span> {
    <span class="hljs-comment">// List components benefit from checking array reference equality</span>
    <span class="hljs-keyword">return</span> (
      prevProps.<span class="hljs-property">todos</span> === nextProps.<span class="hljs-property">todos</span> &amp;&amp;
      prevProps.<span class="hljs-property">onToggle</span> === nextProps.<span class="hljs-property">onToggle</span> &amp;&amp;
      prevProps.<span class="hljs-property">onDelete</span> === nextProps.<span class="hljs-property">onDelete</span>
    );
  },
);
</code></pre>
<h3 id="مكونات-كثيفة-الإعدادات">مكوّنات كثيفة الإعدادات</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ChartProps</span> {
  <span class="hljs-attr">data</span>: <span class="hljs-title class_">DataPoint</span>[];
  <span class="hljs-attr">options</span>: <span class="hljs-title class_">ChartOptions</span>;
  <span class="hljs-attr">theme</span>: <span class="hljs-title class_">ThemeConfig</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Chart</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">memo</span>(
  <span class="hljs-function">(<span class="hljs-params">{ data, options, theme }: <span class="hljs-title class_">ChartProps</span></span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ExpensiveChart</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span> <span class="hljs-attr">options</span>=<span class="hljs-string">{options}</span> <span class="hljs-attr">theme</span>=<span class="hljs-string">{theme}</span> /&gt;</span></span>;
  },
  <span class="hljs-function">(<span class="hljs-params">prevProps, nextProps</span>) =&gt;</span> {
    <span class="hljs-comment">// For config-heavy components, focus on reference equality</span>
    <span class="hljs-comment">// assuming parent properly memoizes these objects</span>
    <span class="hljs-keyword">return</span> (
      prevProps.<span class="hljs-property">data</span> === nextProps.<span class="hljs-property">data</span> &amp;&amp;
      prevProps.<span class="hljs-property">options</span> === nextProps.<span class="hljs-property">options</span> &amp;&amp;
      prevProps.<span class="hljs-property">theme</span> === nextProps.<span class="hljs-property">theme</span>
    );
  },
);
</code></pre>
<h2 id="مستقبل-حفظ-النتائج">مستقبل حفظ النتائج</h2>
<p>مع نضوج مُصرّف React وانتشاره على نطاق أوسع، سيصبح حفظ النتائج اليدوي أقل ضرورة في معظم حالات الاستخدام. ومع ذلك، سيبقى <code>React.memo</code> ذا قيمة في:</p>
<ul>
<li>المكوّنات المعقّدة ذات احتياجات تحسين محدّدة</li>
<li>التكامل مع أنظمة غير React</li>
<li>الضبط الدقيق للأداء</li>
<li>العمل مع شيفرة قديمة لا يمكنها استخدام المُصرّف</li>
</ul>
<p>المفتاح هو فهم متى يدعمك المُصرّف ومتى تحتاج إلى التدخّل بتحسينات يدوية.</p>
<h2 id="ملخص-أفضل-الممارسات">ملخّص أفضل الممارسات</h2>
<ol>
<li><strong>اجعل الافتراضي أن يتولّى المُصرّف الأمر</strong> إن كنت تستخدم React 19 مع تفعيل المُصرّف</li>
<li><strong>استخدم <code>React.memo</code> لمنطق تساوٍ مخصّص</strong> عندما لا تكفي المقارنة السطحية</li>
<li><strong>أبقِ دوال <code>areEqual</code> سريعة ومركّزة</strong> على الخصائص المتعلّقة بالتصيير</li>
<li><strong>قِس الأداء قبل التحسين</strong> لتضمن أنك تحلّ مشكلات أداء حقيقية</li>
<li><strong>لا تحفظ نتائج كل شيء</strong> — فالمكوّنات الرخيصة غالبًا لا تستفيد من حفظ النتائج</li>
<li><strong>احذر خصائص الدوال</strong> — تأكّد من استقرارها أو التعامل معها على النحو المناسب في المقارنات</li>
</ol>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,p as slug,l as title};
