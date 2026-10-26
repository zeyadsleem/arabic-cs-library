const s="kinney",a="react-typescript",n="React مع TypeScript",l="compound-components-and-slots-typing",t="أنواع المكوّنات المركّبة والخانات",p=[{depth:2,id:"فهم-المكونات-المركبة",text:"فهم المكوّنات المركّبة"},{depth:2,id:"بناء-مكون-menu-آمن-الأنواع",text:"بناء مكوّن Menu آمن الأنواع"},{depth:2,id:"قائمة-menu-متقدمة-مع-خصائص-الخانات",text:"قائمة Menu متقدّمة مع خصائص الخانات"},{depth:2,id:"بناء-مكونات-tab-آمنة-الأنواع",text:"بناء مكوّنات Tab آمنة الأنواع"},{depth:2,id:"مكونات-list-عامة-مع-قيود-على-العناصر",text:"مكوّنات List عامة مع قيود على العناصر"},{depth:2,id:"المطبات-الشائعة-وحلولها",text:"المَطبّات الشائعة وحلولها"},{depth:3,id:"المطبة-تأكيد-نوع-السياق-بشكل-خاطئ",text:"المطبّة: تأكيد نوع السياق بشكل خاطئ"},{depth:3,id:"المطبة-مكونات-عامة-ذات-استنتاج-ضعيف",text:"المطبّة: مكوّنات عامة ذات استنتاج ضعيف"},{depth:3,id:"المطبة-نسيان-readonly-في-الخصائص",text:"المطبّة: نسيان readonly في الخصائص"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:2,id:"حالات-الاستخدام-الواقعية",text:"حالات الاستخدام الواقعية™"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],e=`<p>المكوّنات المركّبة (compound components) من أنماط React وأنيقها — فهي تتيح لك تركيب واجهات تتعاون فيها مكوّنات متعدّدة بسلاسة (فكّر في <code>&lt;select&gt;</code> و<code>&lt;option&gt;</code>، لكن تصميم الواجهة البرمجية بيدك). وحين تضيف TypeScript إلى المعادلة، تستطيع إنشاء علاقات آمنة الأنواع بين المكوّنات الأصلية والفرعية تمنع أخطاء وقت التشغيل وتقدّم تجربة تطوير ممتازة. لنتعرّف كيف نبني مكوّنات Menu وTabs وList المرنة والمتينة في آنٍ واحد.</p>
<p>الفكرة المحورية في المكوّنات المركّبة أن المكوّن الأصل يدير الحالة المشتركة بينما تتولّى المكوّنات الفرعية منطق تصييرها الخاص. ويساعدنا TypeScript على التأكّد من نمذجة هذه العلاقات على نحو صحيح وأن تدفّق البيانات بين المكوّنات يسير بطرق يمكن التنبّؤ بها.</p>
<h2 id="فهم-المكونات-المركبة">فهم المكوّنات المركّبة</h2>
<p>قبل الغوص في تفاصيل TypeScript، لنثبّت ما الذي يجعل المكوّن مركّبًا. في جوهره، هو مجموعة مكوّنات مصمّمة للعمل معًا، حيث:</p>
<ul>
<li>المكوّن الأصل يدير الحالة المشتركة والسياق</li>
<li>المكوّنات الفرعية تستقبل الخصائص والسياق لتعرض بشكل مناسب</li>
<li>تبدو الواجهة البرمجية بديهية وتعبيرية لمستهلكيها</li>
</ul>
<p>إليك نمط مكوّنات مركّبة بسيطًا من دون TypeScript:</p>
<pre><code class="language-jsx"><span class="hljs-comment">// ❌ No type safety</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Menu</span>(<span class="hljs-params">{ children }</span>) {
  <span class="hljs-keyword">const</span> [selectedId, setSelectedId] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;menu&quot;</span>&gt;</span>
      {React.Children.map(children, (child) =&gt;
        React.cloneElement(child, {
          selectedId,
          onSelect: setSelectedId,
        }),
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">MenuItem</span>(<span class="hljs-params">{ id, children, selectedId, onSelect }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;menuitem&quot;</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{selectedId</span> === <span class="hljs-string">id</span> ? &#x27;<span class="hljs-attr">selected</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}
      <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> onSelect(id)}
    &gt;
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}
</code></pre>
<p>هذا يعمل، لكن من دون أمان أنواع. فالمكوّن الأصل يمكنه تمرير أي شيء إلى الأبناء، وقد لا يتلقّى الأبناء الخصائص التي يتوقّعونها، ولا تتوفّر لدينا أي ضمانات بشأن شكل بياناتنا. لنصلح ذلك.</p>
<h2 id="بناء-مكون-menu-آمن-الأنواع">بناء مكوّن Menu آمن الأنواع</h2>
<p>لنبدأ بمكوّن Menu يوضّح المفاهيم الأساسية. نريد التأكّد من أن مكوّنات MenuItem تتلقّى الخصائص الصحيحة وأن Menu لا يمكن أن يحوي إلا أبناء صالحين.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { useState, createContext, useContext } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// First, define the shape of our menu item data</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">MenuItemData</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">label</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-comment">// Context for sharing state between Menu and MenuItem</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">MenuContextValue</span> {
  <span class="hljs-attr">selectedId</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>;
  <span class="hljs-attr">onSelect</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">MenuContext</span> = createContext&lt;<span class="hljs-title class_">MenuContextValue</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

<span class="hljs-comment">// Custom hook to access menu context with proper error handling</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useMenuContext</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> context = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">MenuContext</span>);
  <span class="hljs-keyword">if</span> (!context) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;MenuItem must be used within a Menu component&#x27;</span>);
  }
  <span class="hljs-keyword">return</span> context;
}

<span class="hljs-comment">// Props for the Menu component</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">MenuProps</span> {
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">onSelectionChange</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">selectedId</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">defaultSelected</span>?: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Menu</span>(<span class="hljs-params">{
  children,
  onSelectionChange,
  defaultSelected = <span class="hljs-literal">null</span>
}: <span class="hljs-title class_">MenuProps</span></span>) {
  <span class="hljs-keyword">const</span> [selectedId, setSelectedId] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(defaultSelected);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSelect</span> = (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">setSelectedId</span>(id);
    onSelectionChange?.(id);
  };

  <span class="hljs-keyword">const</span> <span class="hljs-attr">contextValue</span>: <span class="hljs-title class_">MenuContextValue</span> = {
    selectedId,
    <span class="hljs-attr">onSelect</span>: handleSelect,
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">MenuContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{contextValue}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;menu&quot;</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;menu&quot;</span>&gt;</span>
        {children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">MenuContext.Provider</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Props for MenuItem - notice we don&#x27;t need selectedId or onSelect</span>
<span class="hljs-comment">// because they come from context</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">MenuItemProps</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">MenuItem</span>(<span class="hljs-params">{ id, disabled = <span class="hljs-literal">false</span>, children }: <span class="hljs-title class_">MenuItemProps</span></span>) {
  <span class="hljs-keyword">const</span> { selectedId, onSelect } = <span class="hljs-title function_">useMenuContext</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;menuitem&quot;</span>
      <span class="hljs-attr">disabled</span>=<span class="hljs-string">{disabled}</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">menu-item</span> \${<span class="hljs-attr">selectedId</span> === <span class="hljs-string">id</span> ? &#x27;<span class="hljs-attr">selected</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}\`}
      <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> !disabled &amp;&amp; onSelect(id)}
    &gt;
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Attach MenuItem to Menu for dot notation access</span>
<span class="hljs-title class_">Menu</span>.<span class="hljs-property">Item</span> = <span class="hljs-title class_">MenuItem</span>;
</code></pre>
<p>الآن يمكننا استخدام Menu الآمن الأنواع:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Menu</span> <span class="hljs-attr">onSelectionChange</span>=<span class="hljs-string">{(id)</span> =&gt;</span> console.log(&#x27;Selected:&#x27;, id)}&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">Menu.Item</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;file&quot;</span>&gt;</span>File<span class="hljs-tag">&lt;/<span class="hljs-name">Menu.Item</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Menu.Item</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;edit&quot;</span>&gt;</span>Edit<span class="hljs-tag">&lt;/<span class="hljs-name">Menu.Item</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Menu.Item</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;view&quot;</span> <span class="hljs-attr">disabled</span>&gt;</span>
        View
      <span class="hljs-tag">&lt;/<span class="hljs-name">Menu.Item</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Menu</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>ملاحظة</strong></p>
<p>استخدام React Context يُغني عن الحاجة إلى <code>React.cloneElement</code>، وهي قد تسبّب مشكلات مع TypeScript ولا تحافظ على توجيه المراجع (ref forwarding).</p>
</blockquote>
<h2 id="قائمة-menu-متقدمة-مع-خصائص-الخانات">قائمة Menu متقدّمة مع خصائص الخانات</h2>
<p>أحيانًا تريد تحكّمًا أكبر في العرض. لنوسّع Menu لدينا ليدعم خصائص التصيير (render props) (المعروفة أيضًا بـ«خصائص الخانات» (slot props) في بعض الأطر):</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Extended MenuItem that supports custom rendering</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">MenuItemRenderProps</span> {
  <span class="hljs-attr">isSelected</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">isDisabled</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">select</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">MenuItemSlotProps</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">MenuItemProps</span>, &#x27;children&#x27;&gt; {
  <span class="hljs-attr">children</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">MenuItemRenderProps</span></span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">MenuItemSlot</span>(<span class="hljs-params">{ id, disabled = <span class="hljs-literal">false</span>, children }: <span class="hljs-title class_">MenuItemSlotProps</span></span>) {
  <span class="hljs-keyword">const</span> { selectedId, onSelect } = <span class="hljs-title function_">useMenuContext</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-attr">renderProps</span>: <span class="hljs-title class_">MenuItemRenderProps</span> = {
    <span class="hljs-attr">isSelected</span>: selectedId === id,
    <span class="hljs-attr">isDisabled</span>: disabled,
    <span class="hljs-attr">select</span>: <span class="hljs-function">() =&gt;</span> !disabled &amp;&amp; <span class="hljs-title function_">onSelect</span>(id),
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;menu-item-slot&quot;</span>&gt;</span>
      {children(renderProps)}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-title class_">Menu</span>.<span class="hljs-property">ItemSlot</span> = <span class="hljs-title class_">MenuItemSlot</span>;
</code></pre>
<p>الآن يمكنك استخدام خصائص التصيير للحصول على تحكّم كامل:</p>
<pre><code class="language-typescript">&lt;<span class="hljs-title class_">Menu</span>&gt;
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Menu.ItemSlot</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;custom&quot;</span>&gt;</span>
    {({ isSelected, isDisabled, select }) =&gt; (
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">custom-item</span> \${<span class="hljs-attr">isSelected</span> ? &#x27;<span class="hljs-attr">active</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}\`} <span class="hljs-attr">onClick</span>=<span class="hljs-string">{select}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;star&quot;</span> /&gt;</span>
        Custom Item
        {isSelected &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">Badge</span>&gt;</span>Selected<span class="hljs-tag">&lt;/<span class="hljs-name">Badge</span>&gt;</span>}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )}
  <span class="hljs-tag">&lt;/<span class="hljs-name">Menu.ItemSlot</span>&gt;</span></span>
&lt;/<span class="hljs-title class_">Menu</span>&gt;
</code></pre>
<h2 id="بناء-مكونات-tab-آمنة-الأنواع">بناء مكوّنات Tab آمنة الأنواع</h2>
<p>تبقى Tab حالة استخدام ممتازة أخرى للمكوّنات المركّبة. لنبنِ نظام Tab مرنًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">TabData</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TabContextValue</span> {
  <span class="hljs-attr">activeTab</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">setActiveTab</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">tabs</span>: <span class="hljs-title class_">TabData</span>[];
  <span class="hljs-attr">registerTab</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">tab</span>: <span class="hljs-title class_">TabData</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">TabContext</span> = createContext&lt;<span class="hljs-title class_">TabContextValue</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

<span class="hljs-keyword">function</span> <span class="hljs-title function_">useTabContext</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> context = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">TabContext</span>);
  <span class="hljs-keyword">if</span> (!context) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Tab components must be used within a TabContainer&#x27;</span>);
  }
  <span class="hljs-keyword">return</span> context;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TabContainerProps</span> {
  <span class="hljs-attr">defaultTab</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">onTabChange</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">tabId</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">TabContainer</span>(<span class="hljs-params">{
  defaultTab,
  onTabChange,
  children
}: <span class="hljs-title class_">TabContainerProps</span></span>) {
  <span class="hljs-keyword">const</span> [tabs, setTabs] = useState&lt;<span class="hljs-title class_">TabData</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [activeTab, setActiveTab] = useState&lt;<span class="hljs-built_in">string</span>&gt;(defaultTab || <span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">registerTab</span> = (<span class="hljs-params"><span class="hljs-attr">tab</span>: <span class="hljs-title class_">TabData</span></span>) =&gt; {
    <span class="hljs-title function_">setTabs</span>(<span class="hljs-function"><span class="hljs-params">current</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> exists = current.<span class="hljs-title function_">some</span>(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> t.<span class="hljs-property">id</span> === tab.<span class="hljs-property">id</span>);
      <span class="hljs-keyword">if</span> (exists) <span class="hljs-keyword">return</span> current;
      <span class="hljs-keyword">return</span> [...current, tab];
    });

    <span class="hljs-comment">// Set as active if it&#x27;s the first tab or matches defaultTab</span>
    <span class="hljs-keyword">if</span> (!activeTab || tab.<span class="hljs-property">id</span> === defaultTab) {
      <span class="hljs-title function_">setActiveTab</span>(tab.<span class="hljs-property">id</span>);
    }
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleTabChange</span> = (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">setActiveTab</span>(id);
    onTabChange?.(id);
  };

  <span class="hljs-keyword">const</span> <span class="hljs-attr">contextValue</span>: <span class="hljs-title class_">TabContextValue</span> = {
    activeTab,
    <span class="hljs-attr">setActiveTab</span>: handleTabChange,
    tabs,
    registerTab,
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TabContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{contextValue}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;tab-container&quot;</span>&gt;</span>
        {children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">TabContext.Provider</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// TabList renders the actual tab buttons</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TabList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { tabs, activeTab, setActiveTab } = <span class="hljs-title function_">useTabContext</span>();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;tab-list&quot;</span> <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;tablist&quot;</span>&gt;</span>
      {tabs.map((tab) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">key</span>=<span class="hljs-string">{tab.id}</span>
          <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;tab&quot;</span>
          <span class="hljs-attr">disabled</span>=<span class="hljs-string">{tab.disabled}</span>
          <span class="hljs-attr">aria-selected</span>=<span class="hljs-string">{activeTab</span> === <span class="hljs-string">tab.id}</span>
          <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">tab</span> \${<span class="hljs-attr">activeTab</span> === <span class="hljs-string">tab.id</span> ? &#x27;<span class="hljs-attr">active</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}\`}
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> !tab.disabled &amp;&amp; setActiveTab(tab.id)}
        &gt;
          {tab.title}
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TabPanelProps</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">disabled</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TabPanel</span>(<span class="hljs-params">{ id, title, disabled = <span class="hljs-literal">false</span>, children }: <span class="hljs-title class_">TabPanelProps</span></span>) {
  <span class="hljs-keyword">const</span> { activeTab, registerTab } = <span class="hljs-title function_">useTabContext</span>();

  <span class="hljs-comment">// Register this tab on mount</span>
  <span class="hljs-title class_">React</span>.<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">registerTab</span>({ id, title, disabled });
  }, [id, title, disabled, registerTab]);

  <span class="hljs-keyword">if</span> (activeTab !== id) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;tabpanel&quot;</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;tab-panel&quot;</span> <span class="hljs-attr">aria-labelledby</span>=<span class="hljs-string">{id}</span>&gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-title class_">TabContainer</span>.<span class="hljs-property">List</span> = <span class="hljs-title class_">TabList</span>;
<span class="hljs-title class_">TabContainer</span>.<span class="hljs-property">Panel</span> = <span class="hljs-title class_">TabPanel</span>;
</code></pre>
<p>الاستخدام نظيف وتعبيري:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">TabContainer</span> <span class="hljs-attr">defaultTab</span>=<span class="hljs-string">&quot;profile&quot;</span> <span class="hljs-attr">onTabChange</span>=<span class="hljs-string">{(id)</span> =&gt;</span> console.log(id)}&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">TabContainer.List</span> /&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">TabContainer.Panel</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;profile&quot;</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;Profile&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ProfileForm</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">TabContainer.Panel</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">TabContainer.Panel</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;settings&quot;</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;Settings&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">SettingsPanel</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">TabContainer.Panel</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">TabContainer.Panel</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;billing&quot;</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;Billing&quot;</span> <span class="hljs-attr">disabled</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">BillingInfo</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">TabContainer.Panel</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">TabContainer</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>لاحظ كيف يسجّل TabPanel نفسه تلقائيًا لدى الحاوية. هذا يمنع المشكلة الشائعة بإضافة التبويب إلى قائمة التبويبات.</p>
</blockquote>
<h2 id="مكونات-list-عامة-مع-قيود-على-العناصر">مكوّنات List عامة مع قيود على العناصر</h2>
<p>في مثالنا الأخير، لنبنِ مكوّن List عامًا يمكنه العمل مع أي نوع من البيانات مع الحفاظ على أمان الأنواع:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Generic interface for list items</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ListItem</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ListContextValue</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ListItem</span>&gt; {
  <span class="hljs-attr">items</span>: T[];
  <span class="hljs-attr">selectedIds</span>: <span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">string</span>&gt;;
  <span class="hljs-attr">onToggleItem</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">multiSelect</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">ListContext</span> = createContext&lt;<span class="hljs-title class_">ListContextValue</span>&lt;<span class="hljs-built_in">any</span>&gt; | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

<span class="hljs-keyword">function</span> useListContext&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ListItem</span>&gt;() {
  <span class="hljs-keyword">const</span> context = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">ListContext</span>) <span class="hljs-keyword">as</span> <span class="hljs-title class_">ListContextValue</span>&lt;T&gt; | <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">if</span> (!context) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;List items must be used within a List component&#x27;</span>);
  }
  <span class="hljs-keyword">return</span> context;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ListProps</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ListItem</span>&gt; {
  <span class="hljs-attr">items</span>: T[];
  <span class="hljs-attr">multiSelect</span>?: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onSelectionChange</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">selectedIds</span>: <span class="hljs-built_in">string</span>[]</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title class_">List</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ListItem</span>&gt;({
  items,
  multiSelect = <span class="hljs-literal">false</span>,
  onSelectionChange,
  children
}: <span class="hljs-title class_">ListProps</span>&lt;T&gt;) {
  <span class="hljs-keyword">const</span> [selectedIds, setSelectedIds] = useState&lt;<span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">string</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">onToggleItem</span> = (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">setSelectedIds</span>(<span class="hljs-function"><span class="hljs-params">current</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> newSet = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(current);

      <span class="hljs-keyword">if</span> (newSet.<span class="hljs-title function_">has</span>(id)) {
        newSet.<span class="hljs-title function_">delete</span>(id);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">if</span> (!multiSelect) {
          newSet.<span class="hljs-title function_">clear</span>();
        }
        newSet.<span class="hljs-title function_">add</span>(id);
      }

      onSelectionChange?.(<span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>(newSet));
      <span class="hljs-keyword">return</span> newSet;
    });
  };

  <span class="hljs-keyword">const</span> <span class="hljs-attr">contextValue</span>: <span class="hljs-title class_">ListContextValue</span>&lt;T&gt; = {
    items,
    selectedIds,
    onToggleItem,
    multiSelect,
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ListContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{contextValue}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;list&quot;</span>&gt;</span>
        {items.map((item) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;list-item-wrapper&quot;</span>&gt;</span>
            {children(item)}
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ListContext.Provider</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Reusable ListItem component that works with any item type</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ListItemProps</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ListItem</span>&gt; {
  <span class="hljs-attr">item</span>: T;
  <span class="hljs-attr">children</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">props</span>: {
    item: T;
    isSelected: <span class="hljs-built_in">boolean</span>;
    onToggle: () =&gt; <span class="hljs-built_in">void</span>;
  }</span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title class_">ListItem</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ListItem</span>&gt;({ item, children }: <span class="hljs-title class_">ListItemProps</span>&lt;T&gt;) {
  <span class="hljs-keyword">const</span> { selectedIds, onToggleItem } = useListContext&lt;T&gt;();

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
      {children({
        item,
        isSelected: selectedIds.has(item.id),
        onToggle: () =&gt; onToggleItem(item.id),
      })}
    <span class="hljs-tag">&lt;/&gt;</span></span>
  );
}

<span class="hljs-title class_">List</span>.<span class="hljs-property">Item</span> = <span class="hljs-title class_">ListItem</span>;
</code></pre>
<p>الآن يمكنك إنشاء قوائم آمنة الأنواع لأي بيانات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ListItem</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Product</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">ListItem</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">price</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserList</span>(<span class="hljs-params">{ users }: { users: User[] }</span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">List</span> <span class="hljs-attr">items</span>=<span class="hljs-string">{users}</span> <span class="hljs-attr">multiSelect</span>&gt;</span>
      {(user) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">List.Item</span> <span class="hljs-attr">item</span>=<span class="hljs-string">{user}</span>&gt;</span>
          {({ item, isSelected, onToggle }) =&gt; (
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">user-card</span> \${<span class="hljs-attr">isSelected</span> ? &#x27;<span class="hljs-attr">selected</span>&#x27; <span class="hljs-attr">:</span> &#x27;&#x27;}\`} <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onToggle}</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{item.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{item.email}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          )}
        <span class="hljs-tag">&lt;/<span class="hljs-name">List.Item</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">List</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>كن حذرًا مع السياق العام (generic context). فقد يجد TypeScript صعوبة أحيانًا في الاستنتاج عبر حدود المكوّنات، لذا قد تحتاج إلى تعليقات نوع صريحة.</p>
</blockquote>
<h2 id="المطبات-الشائعة-وحلولها">المَطبّات الشائعة وحلولها</h2>
<h3 id="المطبة-تأكيد-نوع-السياق-بشكل-خاطئ">المطبّة: تأكيد نوع السياق بشكل خاطئ</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Unsafe type assertion</span>
<span class="hljs-keyword">const</span> context = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">SomeContext</span>) <span class="hljs-keyword">as</span> <span class="hljs-title class_">SomeContextValue</span>;

<span class="hljs-comment">// ✅ Good: Proper error handling</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useSomeContext</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> context = <span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">SomeContext</span>);
  <span class="hljs-keyword">if</span> (!context) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;useSomeContext must be used within SomeProvider&#x27;</span>);
  }
  <span class="hljs-keyword">return</span> context;
}
</code></pre>
<h3 id="المطبة-مكونات-عامة-ذات-استنتاج-ضعيف">المطبّة: مكوّنات عامة ذات استنتاج ضعيف</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: TypeScript can&#x27;t infer the type</span>
&lt;<span class="hljs-title class_">List</span> items={products}&gt;
  {<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{item.title}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>} <span class="hljs-comment">// &#x27;title&#x27; might not exist</span>
&lt;/<span class="hljs-title class_">List</span>&gt;

<span class="hljs-comment">// ✅ Good: Explicit type parameter when needed</span>
&lt;<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">Product</span>&gt; items={products}&gt;
  {<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{item.title}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>} <span class="hljs-comment">// TypeScript knows item is Product</span>
&lt;/<span class="hljs-title class_">List</span>&gt;
</code></pre>
<h3 id="المطبة-نسيان-readonly-في-الخصائص">المطبّة: نسيان <code>readonly</code> في الخصائص</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Arrays are mutable</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ListProps</span>&lt;T&gt; {
  <span class="hljs-attr">items</span>: T[];
}

<span class="hljs-comment">// ✅ Good: Readonly arrays prevent accidental mutations</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ListProps</span>&lt;T&gt; {
  <span class="hljs-attr">items</span>: <span class="hljs-keyword">readonly</span> T[];
}
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<p>قد تُنشئ المكوّنات المركّبة أحيانًا إعادة تصيير غير ضرورية. إليك بعض استراتيجيات التحسين:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Memoize context value to prevent unnecessary re-renders</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Menu</span>(<span class="hljs-params">{ children, onSelectionChange }: <span class="hljs-title class_">MenuProps</span></span>) {
  <span class="hljs-keyword">const</span> [selectedId, setSelectedId] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> contextValue = <span class="hljs-title function_">useMemo</span>((): <span class="hljs-function"><span class="hljs-params">MenuContextValue</span> =&gt;</span> ({
    selectedId,
    <span class="hljs-attr">onSelect</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
      <span class="hljs-title function_">setSelectedId</span>(id);
      onSelectionChange?.(id);
    },
  }), [selectedId, onSelectionChange]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">MenuContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{contextValue}</span>&gt;</span>
      {children}
    <span class="hljs-tag">&lt;/<span class="hljs-name">MenuContext.Provider</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Memoize expensive child components</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">MenuItem</span> = <span class="hljs-title function_">memo</span>(<span class="hljs-function">(<span class="hljs-params">{ id, disabled = <span class="hljs-literal">false</span>, children }: <span class="hljs-title class_">MenuItemProps</span></span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { selectedId, onSelect } = <span class="hljs-title function_">useMenuContext</span>();
  <span class="hljs-comment">// ... component logic</span>
});
</code></pre>
<h2 id="حالات-الاستخدام-الواقعية">حالات الاستخدام الواقعية™</h2>
<p>الأنماط التي استكشفناها تعمل بشكل ممتاز بشكل خاص مع:</p>
<ol>
<li><strong>مكوّنات أنظمة التصميم</strong>: بناء مكتبات يجب أن تعمل مكوّناتها معًا بسلاسة</li>
<li><strong>باني النماذج</strong>: إنشاء نماذج ديناميكية تتشارك فيها مكوّنات الحقول حالة التحقّق</li>
<li><strong>جداول البيانات</strong>: حيث تحتاج مكوّنات الترويسة والجسم والترقيم إلى التنسيق فيما بينها</li>
<li><strong>مكوّنات التنقّل</strong>: مسارات التنقّل (breadcrumbs) والأشرطة الجانبية والقوائم متعدّدة المستويات</li>
<li><strong>أنظمة النوافذ المنبثقة</strong>: حيث تعمل مكوّنات الزر والمحتوى والإجراءات معًا</li>
</ol>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
<p>أصبح لديك الآن الأدوات لبناء مكوّنات مركّبة متينة مع TypeScript. إليك بعض المجالات التي تستحق الاستكشاف أكثر:</p>
<ul>
<li><strong>توجيه المراجع (ref forwarding)</strong> مع المكوّنات المركّبة باستخدام <code>forwardRef</code> و<code>useImperativeHandle</code></li>
<li><strong>أنماط الوصول (accessibility)</strong> مثل إدارة التركيز وعلاقات ARIA</li>
<li><strong>قيود عامة متقدّمة</strong> باستخدام الأنواع المُخطَّطة (mapped types) والأنواع الشرطية</li>
<li><strong>استراتيجيات الاختبار</strong> للمكوّنات المركّبة (تلميح: اختبر السلوك لا التنفيذ)</li>
</ul>
<p>تمنحك المكوّنات المركّبة مع TypeScript أفضل ما في العالمين: واجهات برمجية مرنة وقابلة لإعادة الاستخدام تمنع أخطاء وقت التشغيل وتقدّم تجربة تطوير ممتازة. ابدأ بهذه الأنماط وعدّلها لتناسب حالات الاستخدام لديك — وستشكرك نسختك المستقبلية من نفسك (وزملاؤك).</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
