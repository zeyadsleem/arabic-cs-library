const s="kinney",a="react-performance",n="أداء React",l="lifting-state-intelligently",t="رفع الحالة بذكاء (Lifting State Intelligently)",p=[{depth:2,id:"مشكلة-المبالغة-في-رفع-الحالة",text:"مشكلة المبالغة في رفع الحالة"},{depth:2,id:"أبق-الحالة-محلية-افتراضيا",text:"أبقِ الحالة محلية افتراضيًا"},{depth:2,id:"متى-ترفع-الحالة-فعلا",text:"متى ترفع الحالة فعلًا"},{depth:2,id:"استراتيجيات-ذكية-لموضع-الحالة",text:"استراتيجيات ذكية لموضع الحالة"},{depth:3,id:"أبق-الحالة-قريبة-من-المكونات-التي-تحتاجها",text:"أبقِ الحالة قريبة من المكوّنات التي تحتاجها"},{depth:3,id:"استخدم-حاويات-حالة-متعددة",text:"استخدم حاويات حالة متعددة"},{depth:3,id:"احصر-تغييرات-الحالة-باستخدام-reactmemo",text:"احصر تغييرات الحالة باستخدام React.memo"},{depth:2,id:"معمارية-حالة-من-الواقع",text:"معمارية حالة من الواقع"},{depth:2,id:"أنماط-مضادة-شائعة-ينبغي-تجنبها",text:"أنماط مضادة شائعة ينبغي تجنّبها"},{depth:3,id:"فخ-منع-تمرير-الخصائص-المتشعب",text:"فخّ «منع تمرير الخصائص المتشعّب»"},{depth:3,id:"مغالطة-التحوط-للمستقبل",text:"مغالطة «التحوّط للمستقبل»"},{depth:2,id:"قياس-الأثر",text:"قياس الأثر"}],e=`<p>«ارفع الحالة إلى أعلى» من أكثر الشعارات تكرارًا في React — ولسبب وجيه. فعندما تحتاج عدة مكوّنات إلى القطعة نفسها من البيانات، يصبح نقلها إلى أقرب سلف مشترك لها منطقيًا تمامًا. لكن كمعظم النصائح المعمارية، يسهل المبالغة في ذلك وإنشاء اختناقات أداء بالخطأ تنتشر في شجرة مكوّناتك بأكملها.</p>
<p>والرؤية الجوهرية؟ <strong>لا ترفع الحالة إلا عندما تحتاج المكوّنات فعلًا إلى مشاركتها</strong>. وكل ما عدا ذلك يمكنه (بل ينبغي له) أن يبقى محليًا. وعندما ترفع الحالة فعلًا، فكن متعمّدًا في اختيار موضع استقرارها وكيفية انتشار التغييرات. فقليل من التفكير المسبق ينجيك من تصحيح واجهات بطيئة لاحقًا.</p>
<h2 id="مشكلة-المبالغة-في-رفع-الحالة">مشكلة المبالغة في رفع الحالة</h2>
<p>لنفترض أنك تبني لوحة تحكّم فيها عدة أدوات مصغّرة. لكل أداة حالة التحميل الخاصة بها وبياناتها وتفاعلات مستخدميها. وقد يكون النهج الساذج هو رفع كل الحالة إلى المستوى الأعلى — فالحالة المركزية تبدو منظّمة، أليس كذلك؟</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Over-lifting state creates unnecessary re-renders</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Dashboard</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [widget1Loading, setWidget1Loading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [widget1Data, setWidget1Data] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [widget2Loading, setWidget2Loading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [widget2Data, setWidget2Data] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [widget3Loading, setWidget3Loading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [widget3Data, setWidget3Data] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Widget1</span>
        <span class="hljs-attr">loading</span>=<span class="hljs-string">{widget1Loading}</span>
        <span class="hljs-attr">data</span>=<span class="hljs-string">{widget1Data}</span>
        <span class="hljs-attr">setLoading</span>=<span class="hljs-string">{setWidget1Loading}</span>
        <span class="hljs-attr">setData</span>=<span class="hljs-string">{setWidget1Data}</span>
      /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Widget2</span>
        <span class="hljs-attr">loading</span>=<span class="hljs-string">{widget2Loading}</span>
        <span class="hljs-attr">data</span>=<span class="hljs-string">{widget2Data}</span>
        <span class="hljs-attr">setLoading</span>=<span class="hljs-string">{setWidget2Loading}</span>
        <span class="hljs-attr">setData</span>=<span class="hljs-string">{setWidget2Data}</span>
      /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Widget3</span>
        <span class="hljs-attr">loading</span>=<span class="hljs-string">{widget3Loading}</span>
        <span class="hljs-attr">data</span>=<span class="hljs-string">{widget3Data}</span>
        <span class="hljs-attr">setLoading</span>=<span class="hljs-string">{setWidget3Loading}</span>
        <span class="hljs-attr">setData</span>=<span class="hljs-string">{setWidget3Data}</span>
      /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>وهنا المشكلة: كلما حمّلت أي أداة بياناتها، يُعاد تصيير مكوّن <code>Dashboard</code> بأكمله — مع كل أداة أخرى — مع أنه لا علاقة بينها. لقد أنشأت نقطة اختناق في الأداء تُطلق فيها تغييرات معزولة عملًا غير ضروري في شجرتك بأكملها.</p>
<h2 id="أبق-الحالة-محلية-افتراضيا">أبقِ الحالة محلية افتراضيًا</h2>
<p>والنهج الأفضل؟ <strong>ابدأ محليًا، ولا ترفع إلا عند الضرورة</strong>. ينبغي لكل أداة أن تدير حالتها بنفسها حتى يوجد سبب قوي لمشاركتها.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Keep independent state local</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Dashboard</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Widget1</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Widget2</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Widget3</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Widget1</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [loading, setLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [data, setData] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">loadData</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">true</span>);
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchWidget1Data</span>();
      <span class="hljs-title function_">setData</span>(result);
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">false</span>);
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {loading ? <span class="hljs-tag">&lt;<span class="hljs-name">Spinner</span> /&gt;</span> : <span class="hljs-tag">&lt;<span class="hljs-name">WidgetContent</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span> /&gt;</span>}
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{loadData}</span>&gt;</span>Refresh<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>الآن عندما تحمّل <code>Widget1</code> بياناتها، لا يُعاد تصيير إلا <code>Widget1</code>. وتبقى الأدوات الأخرى في غفلة سعيدة، وتبقى لوحة التحكّم لديك سريعة الاستجابة.</p>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>هذا هو السلوك الافتراضي في React وهو في صالحك. فلا يُعاد تصيير المكوّنات إلا عندما تتغيّر حالتها هي أو يمرّر لها الأب خصائص مختلفة.</p>
</blockquote>
<h2 id="متى-ترفع-الحالة-فعلا">متى ترفع الحالة فعلًا</h2>
<p>ينبغي أن ترفع الحالة عندما تحتاج المكوّنات إلى:</p>
<ol>
<li><strong>مشاركة البيانات نفسها</strong> وعرضها باتساق</li>
<li><strong>تنسيق السلوك</strong> (مثل واجهات الرئيس/التفصيل)</li>
<li><strong>مزامنة التغييرات</strong> عبر مواضع متعددة</li>
</ol>
<p>لننظر إلى مثال واقعي يكون فيه رفع الحالة منطقيًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Lift state when components need to share data</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">OrderManagement</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [selectedOrderId, setSelectedOrderId] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [orders, setOrders] = useState&lt;<span class="hljs-title class_">Order</span>[]&gt;([]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">OrderList</span>
        <span class="hljs-attr">orders</span>=<span class="hljs-string">{orders}</span>
        <span class="hljs-attr">selectedOrderId</span>=<span class="hljs-string">{selectedOrderId}</span>
        <span class="hljs-attr">onSelectOrder</span>=<span class="hljs-string">{setSelectedOrderId}</span>
      /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">OrderDetails</span>
        <span class="hljs-attr">orderId</span>=<span class="hljs-string">{selectedOrderId}</span>
        <span class="hljs-attr">onOrderUpdate</span>=<span class="hljs-string">{(updatedOrder)</span> =&gt;</span> {
          setOrders((prev) =&gt;
            prev.map((order) =&gt; (order.id === updatedOrder.id ? updatedOrder : order)),
          );
        }}
      /&gt;
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>هنا يحتاج <code>OrderList</code> و<code>OrderDetails</code> فعلًا إلى التنسيق — فاختيار طلب من القائمة ينبغي أن يعرض تفاصيله، وتحديث طلب ينبغي أن يحدّث القائمة. والحالة المشتركة مبرَّرة.</p>
<h2 id="استراتيجيات-ذكية-لموضع-الحالة">استراتيجيات ذكية لموضع الحالة</h2>
<h3 id="أبق-الحالة-قريبة-من-المكونات-التي-تحتاجها">أبقِ الحالة قريبة من المكوّنات التي تحتاجها</h3>
<p>ضع الحالة قريبة قدر الإمكان من المكوّنات التي تستخدمها. فإن كان مكوّنان شقيقان فقط يحتاجان إلى مشاركة البيانات، فارفعها إلى أبيهما المباشر — لا إلى سلف بعيد على بُعد ثلاثة مستويات.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Lift to the closest common parent</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductPage</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ProductHeader</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ProductDetails</span> /&gt;</span> {/* This component manages its own state */}
      <span class="hljs-tag">&lt;<span class="hljs-name">RelatedProductsSection</span> /&gt;</span> {/* This section has shared state */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">RelatedProductsSection</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [selectedCategory, setSelectedCategory] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;all&#x27;</span>);
  <span class="hljs-keyword">const</span> [products, setProducts] = <span class="hljs-title function_">useState</span>([]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">CategoryFilter</span> <span class="hljs-attr">selected</span>=<span class="hljs-string">{selectedCategory}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{setSelectedCategory}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ProductGrid</span> <span class="hljs-attr">products</span>=<span class="hljs-string">{products}</span> <span class="hljs-attr">category</span>=<span class="hljs-string">{selectedCategory}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="استخدم-حاويات-حالة-متعددة">استخدم حاويات حالة متعددة</h3>
<p>لا تشعر بأنك مضطر إلى حشر كل شيء في كائن حالة واحد. فغالبًا ما تكون قطع الحالة المتعددة المركّزة أفضل من كائن واحد متضخّم.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Monolithic state object</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [appState, setAppState] = <span class="hljs-title function_">useState</span>({
    <span class="hljs-attr">user</span>: <span class="hljs-literal">null</span>,
    <span class="hljs-attr">currentPage</span>: <span class="hljs-string">&#x27;home&#x27;</span>,
    <span class="hljs-attr">sidebarOpen</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">notifications</span>: [],
    <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;light&#x27;</span>,
  });

  <span class="hljs-comment">// Every state change re-renders the entire app</span>
}

<span class="hljs-comment">// ✅ Separate concerns</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [currentPage, setCurrentPage] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;home&#x27;</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Sidebar</span> /&gt;</span> {/* Manages its own open/closed state */}
      <span class="hljs-tag">&lt;<span class="hljs-name">NotificationSystem</span> /&gt;</span> {/* Manages its own notifications */}
      <span class="hljs-tag">&lt;<span class="hljs-name">ThemeProvider</span>&gt;</span>
        {&#x27; &#x27;}
        {/* Manages theme separately */}
        <span class="hljs-tag">&lt;<span class="hljs-name">PageContent</span> <span class="hljs-attr">page</span>=<span class="hljs-string">{currentPage}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ThemeProvider</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="احصر-تغييرات-الحالة-باستخدام-reactmemo">احصر تغييرات الحالة باستخدام <code>React.memo</code></h3>
<p>عندما تحتاج فعلًا إلى رفع الحالة لكنك تريد تقليل أثر إعادة التصيير إلى أدنى حد، استخدم <code>React.memo</code> لإنشاء حدود للتصيير:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Memo prevents unnecessary re-renders of expensive components</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ExpensiveWidget</span> = <span class="hljs-title function_">memo</span>(<span class="hljs-keyword">function</span> <span class="hljs-title function_">ExpensiveWidget</span>(<span class="hljs-params">{
  data,
  onAction,
}: {
  data: WidgetData;
  onAction: () =&gt; <span class="hljs-built_in">void</span>;
}</span>) {
  <span class="hljs-comment">// This component only re-renders when data or onAction changes</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ComplexVisualization</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span> /&gt;</span></span>;
});

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Dashboard</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [sharedCounter, setSharedCounter] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> [widgetData, setWidgetData] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> handleAction = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Stable callback prevents ExpensiveWidget re-renders</span>
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Action performed&#x27;</span>);
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setSharedCounter((c) =&gt; c + 1)}&gt;Count: {sharedCounter}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ExpensiveWidget</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{widgetData}</span> <span class="hljs-attr">onAction</span>=<span class="hljs-string">{handleAction}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="معمارية-حالة-من-الواقع">معمارية حالة من الواقع</h2>
<p>إليك كيف يمكنك هيكلة الحالة في تطبيق واقعي:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Thoughtful state architecture</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// Global app state - truly shared across the app</span>
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [isOnline, setIsOnline] = <span class="hljs-title function_">useState</span>(navigator.<span class="hljs-property">onLine</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">user</span>, <span class="hljs-attr">setUser</span> }}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Router</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">NavBar</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Routes</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/dashboard&quot;</span> <span class="hljs-attr">element</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">Dashboard</span> /&gt;</span>} /&gt;
            <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/profile&quot;</span> <span class="hljs-attr">element</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">ProfilePage</span> /&gt;</span>} /&gt;
          <span class="hljs-tag">&lt;/<span class="hljs-name">Routes</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ConnectionStatus</span> <span class="hljs-attr">isOnline</span>=<span class="hljs-string">{isOnline}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">UserContext.Provider</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Dashboard</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// Page-level state - shared within this page</span>
  <span class="hljs-keyword">const</span> [selectedDateRange, setSelectedDateRange] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;week&#x27;</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">DateRangePicker</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{selectedDateRange}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{setSelectedDateRange}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">MetricsGrid</span> <span class="hljs-attr">dateRange</span>=<span class="hljs-string">{selectedDateRange}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ActivityFeed</span> /&gt;</span> {/* Manages its own state independently */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">MetricsGrid</span> = <span class="hljs-title function_">memo</span>(<span class="hljs-keyword">function</span> <span class="hljs-title function_">MetricsGrid</span>(<span class="hljs-params">{ dateRange }: { dateRange: <span class="hljs-built_in">string</span> }</span>) {
  <span class="hljs-comment">// Component-level state - local to this component tree</span>
  <span class="hljs-keyword">const</span> [metrics, setMetrics] = <span class="hljs-title function_">useState</span>([]);
  <span class="hljs-keyword">const</span> [loading, setLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Only fetch when dateRange changes</span>
    <span class="hljs-title function_">loadMetrics</span>(dateRange).<span class="hljs-title function_">then</span>(setMetrics);
  }, [dateRange]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;grid grid-cols-3 gap-4&quot;</span>&gt;</span>
      {metrics.map((metric) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">MetricCard</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{metric.id}</span> <span class="hljs-attr">metric</span>=<span class="hljs-string">{metric}</span> /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
});
</code></pre>
<h2 id="أنماط-مضادة-شائعة-ينبغي-تجنبها">أنماط مضادة شائعة ينبغي تجنّبها</h2>
<h3 id="فخ-منع-تمرير-الخصائص-المتشعب">فخّ «منع تمرير الخصائص المتشعّب»</h3>
<p>مجرّد رغبتك في تجنّب تمرير الخصائص المتشعّب لا يعني أنه ينبغي لك رفع الحالة إلى المستوى الأعلى. فكّر بدلًا من ذلك في Context أو مكتبة إدارة حالة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Lifting state too high to avoid props drilling</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [theme, setTheme] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;light&#x27;</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Layout</span> <span class="hljs-attr">theme</span>=<span class="hljs-string">{theme}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> <span class="hljs-attr">theme</span>=<span class="hljs-string">{theme}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Sidebar</span> <span class="hljs-attr">theme</span>=<span class="hljs-string">{theme}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">MainContent</span> <span class="hljs-attr">theme</span>=<span class="hljs-string">{theme}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Dashboard</span> <span class="hljs-attr">theme</span>=<span class="hljs-string">{theme}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Widget</span> <span class="hljs-attr">theme</span>=<span class="hljs-string">{theme}</span> /&gt;</span> {/* This is getting ridiculous */}
        <span class="hljs-tag">&lt;/<span class="hljs-name">Dashboard</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">MainContent</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Use Context for truly global concerns</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">ThemeContext</span> = <span class="hljs-title function_">createContext</span>();

<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [theme, setTheme] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;light&#x27;</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ThemeContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">theme</span>, <span class="hljs-attr">setTheme</span> }}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Layout</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Sidebar</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">MainContent</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Dashboard</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Widget</span> /&gt;</span> {/* Can access theme via useContext */}
          <span class="hljs-tag">&lt;/<span class="hljs-name">Dashboard</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">MainContent</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ThemeContext.Provider</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="مغالطة-التحوط-للمستقبل">مغالطة «التحوّط للمستقبل»</h3>
<p>لا ترفع الحالة «تحسّبًا» لأنك قد تحتاجها لاحقًا. ينطبق مبدأ YAGNI (لن تحتاج إليه) على معمارية الحالة أيضًا:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Premature state lifting</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [userPreferences, setUserPreferences] = <span class="hljs-title function_">useState</span>({});
  <span class="hljs-keyword">const</span> [profileData, setProfileData] = <span class="hljs-title function_">useState</span>({});
  <span class="hljs-keyword">const</span> [accountSettings, setAccountSettings] = <span class="hljs-title function_">useState</span>({});

  <span class="hljs-comment">// Only one component uses each piece of state...</span>

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">PersonalInfo</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{profileData}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">PreferencesPanel</span> <span class="hljs-attr">preferences</span>=<span class="hljs-string">{userPreferences}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">AccountSettings</span> <span class="hljs-attr">settings</span>=<span class="hljs-string">{accountSettings}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Let each section manage its own state until sharing is needed</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfile</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">PersonalInfo</span> /&gt;</span> {/* Loads and manages its own data */}
      <span class="hljs-tag">&lt;<span class="hljs-name">PreferencesPanel</span> /&gt;</span> {/* Loads and manages its own data */}
      <span class="hljs-tag">&lt;<span class="hljs-name">AccountSettings</span> /&gt;</span> {/* Loads and manages its own data */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="قياس-الأثر">قياس الأثر</h2>
<p>عندما تتردّد في رفع الحالة، قِس أداء تطبيقك. فبإمكان أداة Profiler في React DevTools أن تُظهر لك أيّ المكوّنات يُعاد تصييرها ولماذا:</p>
<ol>
<li><strong>قبل الرفع</strong>: افحص أداء تطبيقك الحالي</li>
<li><strong>بعد الرفع</strong>: افحص الأداء مجددًا وقارن</li>
<li><strong>ابحث عن</strong>: عمليات إعادة تصيير غير ضرورية في مكوّنات لا علاقة لها بالأمر</li>
<li><strong>حسّن</strong>: أضف حدود <code>memo</code> أو أعد النظر في موضع الحالة</li>
</ol>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>ليست عمليات إعادة التصيير غير الضرورية القليلة مشكلة دائمًا — فـ React سريعة جدًا. ركّز على التي تسبّب تأخّرًا ملحوظًا أو حسابات مكلفة.</p>
</blockquote>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
