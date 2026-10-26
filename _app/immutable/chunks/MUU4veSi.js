const s="kinney",a="react-typescript",n="React مع TypeScript",l="flushsync-and-imperative-dom",t="`flushSync` والـ DOM الأمْرِيّ مع الأنواع",p=[{depth:2,id:"فهم-التحديثات-غير-المتزامنة-في-react",text:"فهم التحديثات غير المتزامنة في React"},{depth:2,id:"متى-تستخدم-flushsync",text:"متى تستخدم flushSync"},{depth:2,id:"استخدام-flushsync-الأساسي-مع-الأنواع",text:"استخدام flushSync الأساسي مع الأنواع"},{depth:2,id:"مثال-واقعي-إدارة-التركيز-في-النافذة-المنبثقة",text:"مثال واقعي: إدارة التركيز في النافذة المنبثقة"},{depth:2,id:"أنماط-الـ-dom-الأمرية-مع-الأنواع",text:"أنماط الـ DOM الأمْرِيّة مع الأنواع"},{depth:3,id:"خطاف-مخصص-للتركيز-على-المدخلات",text:"خُطّاف مخصّص للتركيز على المدخلات"},{depth:3,id:"قياس-dom-بالأنواع",text:"قياس DOM بالأنواع"},{depth:2,id:"مثال-عن-التنسيق-مع-الحركات",text:"مثال عن التنسيق مع الحركات"},{depth:2,id:"مزالق-شائعة-وأفضل-الممارسات",text:"مزالق شائعة وأفضل الممارسات"},{depth:3,id:"سيئ-الإفراط-في-استخدام-flushsync",text:"❌ سيّئ: الإفراط في استخدام flushSync"},{depth:3,id:"جيد-استخدام-flushsync-استراتيجيا",text:"✅ جيّد: استخدام flushSync استراتيجيًّا"},{depth:3,id:"نصائح-سلامة-الأنواع",text:"نصائح سلامة الأنواع"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:2,id:"متى-تستخدم-uselayouteffect-بدلا-منه",text:"متى تستخدم useLayoutEffect بدلًا منه"},{depth:2,id:"حالات-استخدام-في-الواقع",text:"حالات استخدام في الواقع™"},{depth:3,id:"التحقق-من-النموذج-مع-التركيز",text:"التحقّق من النموذج مع التركيز"},{depth:3,id:"محتوى-ديناميكي-مع-الحفاظ-على-موضع-التمرير",text:"محتوى ديناميكي مع الحفاظ على موضع التمرير"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],e=`<p>نموذج React الإعلاني (declarative) رائع—إلى أن تحتاج التناغم مع الـ DOM نفسه. فأحيانًا تحتاج إلى قياس العناصر، أو التركيز على حقول الإدخال، أو ضبط توقيت الحركات بدقّة. وها أنتَ مع <code>flushSync</code> ومساعدات React للـ DOM الأمْرِيّ (imperative DOM) التي تتيح لك الخروج من عالم React غير المتزامن متى دَعَت الحاجة (ويساعدك TypeScript على فعله بأمان).</p>
<p>يُجبِر <code>flushSync</code> React على تفريغ التحديثات تزامنيًّا بدلًا من تجميعها معًا، بينما تستخدم أنماط الـ DOM الأمْرِيّة مراجع (refs) لمعالجة عناصر DOM مباشرةً. وكلاهما مخارج هروب من النموذج الإعلاني لـ React—أدوات قوية ينبغي استخدامها باقتصاد ودواعٍ وجيهة.</p>
<h2 id="فهم-التحديثات-غير-المتزامنة-في-react">فهم التحديثات غير المتزامنة في React</h2>
<p>قبل الغوص في <code>flushSync</code>، لنفهم أولًا لماذا تُجمّع React التحديثات أصلًا. تجمع React تحديثات حالة متعددة معًا لتفادي إعادة التصيير (re-render) غير اللازمة، وهو ما يُحسّن الأداء لكنه قد يخلق تحديات توقيت:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">AsyncExample</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> [message, setMessage] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleClick</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">setCount</span>(count + <span class="hljs-number">1</span>);
    <span class="hljs-title function_">setMessage</span>(<span class="hljs-string">\`Count is now <span class="hljs-subst">\${count + <span class="hljs-number">1</span>}</span>\`</span>);
    <span class="hljs-comment">// Both updates are batched together</span>
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Count: {count}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{message}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span>&gt;</span>Update<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>التجميع هو عادةً ما تريد، لكن أحيانًا تحتاج أن تجري التحديثات فورًا—وهنا يقطع <code>flushSync</code> عزمًا.</p>
<h2 id="متى-تستخدم-flushsync">متى تستخدم <code>flushSync</code></h2>
<p>يُجبِر <code>flushSync</code> React على تفريغ التحديثات إلى الـ DOM تزامنيًّا. فاستعمله باقتصاد في هذه الحالات بعينها:</p>
<ul>
<li><strong>إدارة التركيز</strong>: ضمان أن يكون العنصر قد انتُج بالتصيير قبل التركيز عليه</li>
<li><strong>قياسات DOM</strong>: الحصول على أبعاد دقيقة بعد تغيّرات الحالة</li>
<li><strong>توقيت الحركات</strong>: التنسيق مع مكتبات الحركات (animation)</li>
<li><strong>موضع التمرير</strong>: تحديث موضع التمرير بعد تغيّر المحتوى</li>
</ul>
<blockquote>
<p><strong>تحذير</strong></p>
<p>قد يُضرّ <code>flushSync</code> بالأداء بمنع تحسينات React. لا تستخدمه إلا إذا كان عندك شرط توقيت بعينه.</p>
</blockquote>
<h2 id="استخدام-flushsync-الأساسي-مع-الأنواع">استخدام <code>flushSync</code> الأساسي مع الأنواع</h2>
<p>هكذا تستخدم <code>flushSync</code> مع أنواع TypeScript سليمة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { flushSync } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom&#x27;</span>;
<span class="hljs-keyword">import</span> { useState, useRef, <span class="hljs-keyword">type</span> <span class="hljs-title class_">RefObject</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ListItem</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [items, setItems] = useState&lt;<span class="hljs-title class_">ListItem</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [newItem, setNewItem] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> <span class="hljs-attr">inputRef</span>: <span class="hljs-title class_">RefObject</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt; = <span class="hljs-title function_">useRef</span>(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> <span class="hljs-attr">listRef</span>: <span class="hljs-title class_">RefObject</span>&lt;<span class="hljs-title class_">HTMLUListElement</span>&gt; = <span class="hljs-title function_">useRef</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">addItem</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">if</span> (!newItem.<span class="hljs-title function_">trim</span>()) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> <span class="hljs-attr">item</span>: <span class="hljs-title class_">ListItem</span> = {
      <span class="hljs-attr">id</span>: crypto.<span class="hljs-title function_">randomUUID</span>(),
      <span class="hljs-attr">text</span>: newItem,
    };

    <span class="hljs-comment">// ✅ Good: Force sync update before measuring/focusing</span>
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setItems</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, item]);
      <span class="hljs-title function_">setNewItem</span>(<span class="hljs-string">&#x27;&#x27;</span>);
    });

    <span class="hljs-comment">// Now we can safely interact with the DOM</span>
    <span class="hljs-keyword">if</span> (inputRef.<span class="hljs-property">current</span>) {
      inputRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">focus</span>();
    }

    <span class="hljs-comment">// Scroll to show the new item</span>
    <span class="hljs-keyword">if</span> (listRef.<span class="hljs-property">current</span>) {
      listRef.<span class="hljs-property">current</span>.<span class="hljs-property">scrollTop</span> = listRef.<span class="hljs-property">current</span>.<span class="hljs-property">scrollHeight</span>;
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{listRef}</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">maxHeight:</span> &#x27;<span class="hljs-attr">200px</span>&#x27;, <span class="hljs-attr">overflow:</span> &#x27;<span class="hljs-attr">auto</span>&#x27; }}&gt;</span>
        {items.map((item) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>{item.text}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{inputRef}</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{newItem}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setNewItem(e.target.value)}
        onKeyDown={(e) =&gt; e.key === &#x27;Enter&#x27; &amp;&amp; addItem()}
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{addItem}</span>&gt;</span>Add Item<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="مثال-واقعي-إدارة-التركيز-في-النافذة-المنبثقة">مثال واقعي: إدارة التركيز في النافذة المنبثقة</h2>
<p>هذا مثال تطبيقي يضمن فيه <code>flushSync</code> إدارة التركيز في نافذة منبثقة (modal):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { flushSync } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom&#x27;</span>;
<span class="hljs-keyword">import</span> { useState, useRef, useEffect, <span class="hljs-keyword">type</span> <span class="hljs-title class_">RefObject</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ModalProps</span> {
  <span class="hljs-attr">isOpen</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">onClose</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">children</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Modal</span>(<span class="hljs-params">{ isOpen, onClose, title, children }: <span class="hljs-title class_">ModalProps</span></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">modalRef</span>: <span class="hljs-title class_">RefObject</span>&lt;<span class="hljs-title class_">HTMLDialogElement</span>&gt; = <span class="hljs-title function_">useRef</span>(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> <span class="hljs-attr">firstFocusableRef</span>: <span class="hljs-title class_">RefObject</span>&lt;<span class="hljs-title class_">HTMLButtonElement</span>&gt; = <span class="hljs-title function_">useRef</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> modal = modalRef.<span class="hljs-property">current</span>;
    <span class="hljs-keyword">if</span> (!modal) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">if</span> (isOpen) {
      <span class="hljs-comment">// ✅ Good: Ensure modal is rendered before focusing</span>
      <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
        modal.<span class="hljs-title function_">showModal</span>();
      });

      <span class="hljs-comment">// Now safely focus the first element</span>
      <span class="hljs-keyword">if</span> (firstFocusableRef.<span class="hljs-property">current</span>) {
        firstFocusableRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">focus</span>();
      }
    } <span class="hljs-keyword">else</span> {
      modal.<span class="hljs-title function_">close</span>();
    }
  }, [isOpen]);

  <span class="hljs-keyword">if</span> (!isOpen) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">dialog</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{modalRef}</span> <span class="hljs-attr">onClose</span>=<span class="hljs-string">{onClose}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{firstFocusableRef}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onClose}</span> <span class="hljs-attr">aria-label</span>=<span class="hljs-string">&quot;Close modal&quot;</span>&gt;</span>
            ×
          <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">dialog</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Usage with proper typing</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [isModalOpen, setIsModalOpen] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setIsModalOpen(true)}&gt;Open Modal<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Modal</span> <span class="hljs-attr">isOpen</span>=<span class="hljs-string">{isModalOpen}</span> <span class="hljs-attr">onClose</span>=<span class="hljs-string">{()</span> =&gt;</span> setIsModalOpen(false)} title=&quot;Settings&quot;&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Modal content here...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Modal</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="أنماط-الـ-dom-الأمرية-مع-الأنواع">أنماط الـ DOM الأمْرِيّة مع الأنواع</h2>
<p>أحيانًا تحتاج معالجة عناصر DOM مباشرةً. وهذه أنماط شائعة بأنواع TypeScript سليمة:</p>
<h3 id="خطاف-مخصص-للتركيز-على-المدخلات">خُطّاف مخصّص للتركيز على المدخلات</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useRef, useCallback, <span class="hljs-keyword">type</span> <span class="hljs-title class_">RefObject</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-comment">// ✅ Good: Generic hook with proper constraints</span>
<span class="hljs-keyword">function</span> useFocusableRef&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLElement</span>&gt;(): [<span class="hljs-title class_">RefObject</span>&lt;T&gt;, <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>] {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">ref</span>: <span class="hljs-title class_">RefObject</span>&lt;T&gt; = <span class="hljs-title function_">useRef</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> focus = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (ref.<span class="hljs-property">current</span> &amp;&amp; <span class="hljs-string">&#x27;focus&#x27;</span> <span class="hljs-keyword">in</span> ref.<span class="hljs-property">current</span>) {
      (ref.<span class="hljs-property">current</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">HTMLElement</span> &amp; { <span class="hljs-title function_">focus</span>(): <span class="hljs-built_in">void</span> }).<span class="hljs-title function_">focus</span>();
    }
  }, []);

  <span class="hljs-keyword">return</span> [ref, focus];
}

<span class="hljs-comment">// Better: Type-safe version for specific elements</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useInputFocus</span>(<span class="hljs-params"></span>): [<span class="hljs-title class_">RefObject</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt;, <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>] {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">ref</span>: <span class="hljs-title class_">RefObject</span>&lt;<span class="hljs-title class_">HTMLInputElement</span>&gt; = <span class="hljs-title function_">useRef</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> focus = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    ref.<span class="hljs-property">current</span>?.<span class="hljs-title function_">focus</span>();
  }, []);

  <span class="hljs-keyword">return</span> [ref, focus];
}

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [inputRef, focusInput] = <span class="hljs-title function_">useInputFocus</span>();
  <span class="hljs-keyword">const</span> [query, setQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">FormEvent</span></span>) =&gt; {
    e.<span class="hljs-title function_">preventDefault</span>();
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Searching for:&#x27;</span>, query);

    <span class="hljs-comment">// Focus input after search (maybe for next query)</span>
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setQuery</span>(<span class="hljs-string">&#x27;&#x27;</span>);
    });
    <span class="hljs-title function_">focusInput</span>();
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{inputRef}</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{query}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setQuery(e.target.value)}
        placeholder=&quot;Search...&quot;
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Search<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="قياس-dom-بالأنواع">قياس DOM بالأنواع</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useState, useRef, useCallback, <span class="hljs-keyword">type</span> <span class="hljs-title class_">RefObject</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { flushSync } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ElementDimensions</span> {
  <span class="hljs-attr">width</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">height</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">top</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">left</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">function</span> useElementDimensions&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLElement</span>&gt;(): [
  <span class="hljs-title class_">RefObject</span>&lt;T&gt;,
  <span class="hljs-title class_">ElementDimensions</span> | <span class="hljs-literal">null</span>,
  <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>,
] {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">ref</span>: <span class="hljs-title class_">RefObject</span>&lt;T&gt; = <span class="hljs-title function_">useRef</span>(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [dimensions, setDimensions] = useState&lt;<span class="hljs-title class_">ElementDimensions</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> measure = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (!ref.<span class="hljs-property">current</span>) {
      <span class="hljs-title function_">setDimensions</span>(<span class="hljs-literal">null</span>);
      <span class="hljs-keyword">return</span>;
    }

    <span class="hljs-keyword">const</span> rect = ref.<span class="hljs-property">current</span>.<span class="hljs-title function_">getBoundingClientRect</span>();
    <span class="hljs-title function_">setDimensions</span>({
      <span class="hljs-attr">width</span>: rect.<span class="hljs-property">width</span>,
      <span class="hljs-attr">height</span>: rect.<span class="hljs-property">height</span>,
      <span class="hljs-attr">top</span>: rect.<span class="hljs-property">top</span>,
      <span class="hljs-attr">left</span>: rect.<span class="hljs-property">left</span>,
    });
  }, []);

  <span class="hljs-keyword">return</span> [ref, dimensions, measure];
}

<span class="hljs-comment">// Usage example</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ResizableBox</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [content, setContent] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;Short content&#x27;</span>);
  <span class="hljs-keyword">const</span> [boxRef, dimensions, measureBox] = useElementDimensions&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;();

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">addContent</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-comment">// ✅ Good: Ensure content is rendered before measuring</span>
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setContent</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev + <span class="hljs-string">&#x27;\\nMore content here...&#x27;</span>);
    });
    <span class="hljs-title function_">measureBox</span>();
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{boxRef}</span>
        <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
          <span class="hljs-attr">border:</span> &#x27;<span class="hljs-attr">1px</span> <span class="hljs-attr">solid</span> #<span class="hljs-attr">ccc</span>&#x27;,
          <span class="hljs-attr">padding:</span> &#x27;<span class="hljs-attr">16px</span>&#x27;,
          <span class="hljs-attr">whiteSpace:</span> &#x27;<span class="hljs-attr">pre-line</span>&#x27;,
        }}
      &gt;</span>
        {content}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{addContent}</span>&gt;</span>Add Content<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{measureBox}</span>&gt;</span>Measure Box<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      {dimensions &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
          Size: {Math.round(dimensions.width)}×{Math.round(dimensions.height)}px
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="مثال-عن-التنسيق-مع-الحركات">مثال عن التنسيق مع الحركات</h2>
<p>هكذا تنسّق بين تغيّرات حالة React ومكتبات الحركات (animation):</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useState, useRef, useCallback, <span class="hljs-keyword">type</span> <span class="hljs-title class_">RefObject</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { flushSync } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">AnimatedListProps</span>&lt;T&gt; {
  <span class="hljs-attr">items</span>: T[];
  <span class="hljs-attr">renderItem</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T, <span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-title class_">React</span>.<span class="hljs-property">ReactNode</span>;
  <span class="hljs-attr">keyExtractor</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">item</span>: T</span>) =&gt;</span> <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title class_">AnimatedList</span>&lt;T&gt;({ items, renderItem, keyExtractor }: <span class="hljs-title class_">AnimatedListProps</span>&lt;T&gt;) {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">listRef</span>: <span class="hljs-title class_">RefObject</span>&lt;<span class="hljs-title class_">HTMLUListElement</span>&gt; = <span class="hljs-title function_">useRef</span>(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [animatingItems, setAnimatingItems] = <span class="hljs-title function_">useState</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">string</span>&gt;());

  <span class="hljs-keyword">const</span> animateItemRemoval = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">itemKey</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> listElement = listRef.<span class="hljs-property">current</span>;
    <span class="hljs-keyword">if</span> (!listElement) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> itemElement = listElement.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">\`[data-key=&quot;<span class="hljs-subst">\${itemKey}</span>&quot;]\`</span>);
    <span class="hljs-keyword">if</span> (!itemElement) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Mark item as animating</span>
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setAnimatingItems</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(prev).<span class="hljs-title function_">add</span>(itemKey));
    });

    <span class="hljs-comment">// Start animation</span>
    itemElement
      .<span class="hljs-title function_">animate</span>(
        [
          { <span class="hljs-attr">opacity</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">transform</span>: <span class="hljs-string">&#x27;translateX(0)&#x27;</span> },
          { <span class="hljs-attr">opacity</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">transform</span>: <span class="hljs-string">&#x27;translateX(-100%)&#x27;</span> },
        ],
        {
          <span class="hljs-attr">duration</span>: <span class="hljs-number">300</span>,
          <span class="hljs-attr">easing</span>: <span class="hljs-string">&#x27;ease-out&#x27;</span>,
        },
      )
      .<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;finish&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-comment">// Clean up after animation</span>
        <span class="hljs-title function_">setAnimatingItems</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> {
          <span class="hljs-keyword">const</span> next = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(prev);
          next.<span class="hljs-title function_">delete</span>(itemKey);
          <span class="hljs-keyword">return</span> next;
        });
      });
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{listRef}</span>&gt;</span>
      {items.map((item, index) =&gt; {
        const key = keyExtractor(item);
        const isAnimating = animatingItems.has(key);

        return (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
            <span class="hljs-attr">key</span>=<span class="hljs-string">{key}</span>
            <span class="hljs-attr">data-key</span>=<span class="hljs-string">{key}</span>
            <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
              <span class="hljs-attr">opacity:</span> <span class="hljs-attr">isAnimating</span> ? <span class="hljs-attr">0.5</span> <span class="hljs-attr">:</span> <span class="hljs-attr">1</span>,
              <span class="hljs-attr">transition:</span> &#x27;<span class="hljs-attr">opacity</span> <span class="hljs-attr">0.2s</span>&#x27;,
            }}
            <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> animateItemRemoval(key)}
          &gt;
            {renderItem(item, index)}
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        );
      })}
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Todo</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">completed</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoApp</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([
    { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;1&#x27;</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Learn React&#x27;</span>, <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span> },
    { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;2&#x27;</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&#x27;Master TypeScript&#x27;</span>, <span class="hljs-attr">completed</span>: <span class="hljs-literal">true</span> },
  ]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AnimatedList</span>
      <span class="hljs-attr">items</span>=<span class="hljs-string">{todos}</span>
      <span class="hljs-attr">keyExtractor</span>=<span class="hljs-string">{(todo)</span> =&gt;</span> todo.id}
      renderItem={(todo) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">textDecoration:</span> <span class="hljs-attr">todo.completed</span> ? &#x27;<span class="hljs-attr">line-through</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">none</span>&#x27; }}&gt;</span>
          {todo.text}
        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      )}
    /&gt;</span>
  );
}
</code></pre>
<h2 id="مزالق-شائعة-وأفضل-الممارسات">مزالق شائعة وأفضل الممارسات</h2>
<h3 id="سيئ-الإفراط-في-استخدام-flushsync">❌ سيّئ: الإفراط في استخدام <code>flushSync</code></h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Don&#x27;t do this - unnecessary flushSync usage</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">BadCounter</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">increment</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setCount</span>(count + <span class="hljs-number">1</span>);
    });
    <span class="hljs-comment">// No reason for flushSync here!</span>
  };

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{increment}</span>&gt;</span>{count}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
}
</code></pre>
<h3 id="جيد-استخدام-flushsync-استراتيجيا">✅ جيّد: استخدام <code>flushSync</code> استراتيجيًّا</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Do this - flushSync only when you need DOM coordination</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">GoodInfiniteScroll</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [items, setItems] = useState&lt;<span class="hljs-built_in">string</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> <span class="hljs-attr">scrollRef</span>: <span class="hljs-title class_">RefObject</span>&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt; = <span class="hljs-title function_">useRef</span>(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> loadMore = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> newItems = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">10</span> }, <span class="hljs-function">(<span class="hljs-params">_, i</span>) =&gt;</span> <span class="hljs-string">\`Item <span class="hljs-subst">\${items.length + i + <span class="hljs-number">1</span>}</span>\`</span>);

    <span class="hljs-comment">// Only use flushSync when you need to measure/scroll after update</span>
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setItems</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, ...newItems]);
    });

    <span class="hljs-comment">// Now safely scroll to new content</span>
    <span class="hljs-keyword">if</span> (scrollRef.<span class="hljs-property">current</span>) {
      <span class="hljs-keyword">const</span> { scrollTop, scrollHeight, clientHeight } = scrollRef.<span class="hljs-property">current</span>;
      <span class="hljs-keyword">const</span> wasAtBottom = scrollTop + clientHeight &gt;= scrollHeight - <span class="hljs-number">10</span>;

      <span class="hljs-keyword">if</span> (wasAtBottom) {
        scrollRef.<span class="hljs-property">current</span>.<span class="hljs-property">scrollTop</span> = scrollRef.<span class="hljs-property">current</span>.<span class="hljs-property">scrollHeight</span>;
      }
    }
  }, [items.<span class="hljs-property">length</span>]);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{scrollRef}</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">height:</span> &#x27;<span class="hljs-attr">300px</span>&#x27;, <span class="hljs-attr">overflow:</span> &#x27;<span class="hljs-attr">auto</span>&#x27; }}&gt;</span>
      {items.map((item) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item}</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">padding:</span> &#x27;<span class="hljs-attr">8px</span>&#x27; }}&gt;</span>
          {item}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{loadMore}</span>&gt;</span>Load More<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="نصائح-سلامة-الأنواع">نصائح سلامة الأنواع</h3>
<ol>
<li><strong>استخدم أنواع عناصر محدّدة</strong>: <code>RefObject&lt;HTMLInputElement&gt;</code> بدلًا من <code>RefObject&lt;HTMLElement&gt;</code></li>
<li><strong>افحص null</strong>: افحص <code>ref.current</code> دومًا قبل استخدامها</li>
<li><strong>حدّد نوع استدعاءات الحركات</strong> (callbacks): استخدم أنواع أحداث مناسبة لأحداث الحركة</li>
<li><strong>قيود الأنواع العامة</strong>: استخدم قيودًا مثل <code>T extends HTMLElement</code> للخُطّافات (hooks) القابلة لإعادة الاستخدام</li>
</ol>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<p>يتجاوز <code>flushSync</code> تحسينات React للأداء، فاستخدمه بحكمة:</p>
<ul>
<li><strong>قِس أولًا</strong>: اكتشف إن كان لديك مشكل توقيت فعلًا</li>
<li><strong>جمّع العمليات</strong>: أدرج تحديثات الحالة المتعددة في استدعاء واحد لـ <code>flushSync</code></li>
<li><strong>تجنّب استعماله في الحلقات</strong>: لا تستدعِ <code>flushSync</code> مرارًا في حلقات مغلقة (tight loops)</li>
<li><strong>فكّر في البدائل</strong>: أحيانًا يكون <code>useLayoutEffect</code> خيارًا أفضل</li>
</ul>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Batch multiple updates</span>
<span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">setItems</span>(newItems);
  <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>);
});

<span class="hljs-comment">// ❌ Bad: Multiple flushSync calls</span>
<span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setItems</span>(newItems));
<span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setLoading</span>(<span class="hljs-literal">false</span>));
<span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">setError</span>(<span class="hljs-literal">null</span>));
</code></pre>
<h2 id="متى-تستخدم-uselayouteffect-بدلا-منه">متى تستخدم <code>useLayoutEffect</code> بدلًا منه</h2>
<p>أحيانًا يكون <code>useLayoutEffect</code> خيارًا أفضل من <code>flushSync</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useLayoutEffect, useRef, useState, <span class="hljs-keyword">type</span> <span class="hljs-title class_">RefObject</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">AutoResizeTextarea</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> <span class="hljs-attr">textareaRef</span>: <span class="hljs-title class_">RefObject</span>&lt;<span class="hljs-title class_">HTMLTextAreaElement</span>&gt; = <span class="hljs-title function_">useRef</span>(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [value, setValue] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-comment">// ✅ Good: useLayoutEffect for DOM measurements</span>
  <span class="hljs-title function_">useLayoutEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> textarea = textareaRef.<span class="hljs-property">current</span>;
    <span class="hljs-keyword">if</span> (!textarea) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Reset height to get accurate scrollHeight</span>
    textarea.<span class="hljs-property">style</span>.<span class="hljs-property">height</span> = <span class="hljs-string">&#x27;auto&#x27;</span>;
    textarea.<span class="hljs-property">style</span>.<span class="hljs-property">height</span> = <span class="hljs-string">\`<span class="hljs-subst">\${textarea.scrollHeight}</span>px\`</span>;
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
<h2 id="حالات-استخدام-في-الواقع">حالات استخدام في الواقع™</h2>
<p>هذه بعض السيناريوهات المطبِّقة التي تلمع فيها هذه الأنماط:</p>
<h3 id="التحقق-من-النموذج-مع-التركيز">التحقّق من النموذج مع التركيز</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">FormError</span> {
  <span class="hljs-attr">field</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ValidatedForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [errors, setErrors] = useState&lt;<span class="hljs-title class_">FormError</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> fieldsRef = useRef&lt;<span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">HTMLInputElement</span> | <span class="hljs-literal">null</span>&gt;&gt;({});

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">validateAndFocus</span> = (<span class="hljs-params"><span class="hljs-attr">formData</span>: <span class="hljs-title class_">FormData</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">newErrors</span>: <span class="hljs-title class_">FormError</span>[] = [];

    <span class="hljs-comment">// Validate fields...</span>
    <span class="hljs-keyword">if</span> (!formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;email&#x27;</span>)) {
      newErrors.<span class="hljs-title function_">push</span>({ <span class="hljs-attr">field</span>: <span class="hljs-string">&#x27;email&#x27;</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Email is required&#x27;</span> });
    }

    <span class="hljs-keyword">if</span> (newErrors.<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-comment">// ✅ Good: Update errors first, then focus</span>
      <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-title function_">setErrors</span>(newErrors);
      });

      <span class="hljs-comment">// Focus first error field</span>
      <span class="hljs-keyword">const</span> firstErrorField = newErrors[<span class="hljs-number">0</span>].<span class="hljs-property">field</span>;
      fieldsRef.<span class="hljs-property">current</span>[firstErrorField]?.<span class="hljs-title function_">focus</span>();
    }

    <span class="hljs-keyword">return</span> newErrors.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>;
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span>
      <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{(e)</span> =&gt;</span> {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (validateAndFocus(formData)) {
          console.log(&#x27;Form submitted!&#x27;);
        }
      }}
    &gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;email&quot;</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{(el)</span> =&gt;</span> (fieldsRef.current.email = el)}
        placeholder=&quot;Email&quot;
      /&gt;
      {errors.find((e) =&gt; e.field === &#x27;email&#x27;) &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">color:</span> &#x27;<span class="hljs-attr">red</span>&#x27; }}&gt;</span>Email is required<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>}
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Submit<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="محتوى-ديناميكي-مع-الحفاظ-على-موضع-التمرير">محتوى ديناميكي مع الحفاظ على موضع التمرير</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ChatMessages</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [messages, setMessages] = useState&lt;<span class="hljs-title class_">Array</span>&lt;{ <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span> }&gt;&gt;([]);
  <span class="hljs-keyword">const</span> <span class="hljs-attr">messagesRef</span>: <span class="hljs-title class_">RefObject</span>&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt; = <span class="hljs-title function_">useRef</span>(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [shouldScrollToBottom, setShouldScrollToBottom] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">addMessage</span> = (<span class="hljs-params"><span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> container = messagesRef.<span class="hljs-property">current</span>;
    <span class="hljs-keyword">if</span> (!container) <span class="hljs-keyword">return</span>;

    <span class="hljs-comment">// Check if user was at bottom before adding message</span>
    <span class="hljs-keyword">const</span> wasAtBottom = container.<span class="hljs-property">scrollTop</span> + container.<span class="hljs-property">clientHeight</span> &gt;= container.<span class="hljs-property">scrollHeight</span> - <span class="hljs-number">10</span>;

    <span class="hljs-keyword">const</span> newMessage = {
      <span class="hljs-attr">id</span>: crypto.<span class="hljs-title function_">randomUUID</span>(),
      text,
    };

    <span class="hljs-comment">// ✅ Good: Add message, then decide whether to scroll</span>
    <span class="hljs-title function_">flushSync</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setMessages</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, newMessage]);
    });

    <span class="hljs-comment">// Only auto-scroll if user was already at bottom</span>
    <span class="hljs-keyword">if</span> (wasAtBottom || shouldScrollToBottom) {
      container.<span class="hljs-property">scrollTop</span> = container.<span class="hljs-property">scrollHeight</span>;
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{messagesRef}</span>
        <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
          <span class="hljs-attr">height:</span> &#x27;<span class="hljs-attr">300px</span>&#x27;,
          <span class="hljs-attr">overflow:</span> &#x27;<span class="hljs-attr">auto</span>&#x27;,
          <span class="hljs-attr">border:</span> &#x27;<span class="hljs-attr">1px</span> <span class="hljs-attr">solid</span> #<span class="hljs-attr">ccc</span>&#x27;,
        }}
      &gt;</span>
        {messages.map((message) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{message.id}</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">padding:</span> &#x27;<span class="hljs-attr">8px</span>&#x27; }}&gt;</span>
            {message.text}
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> addMessage(\`Message \${messages.length + 1}\`)}&gt;Add Message<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="الخلاصة">الخلاصة</h2>
<p>أنماط <code>flushSync</code> والـ DOM الأمْرِيّة مخارج هروب قويّة من النموذج الإعلاني في React. استخدمها حين تحتاج دقّة في التوقيت لإدارة التركيز، أو قياسات الـ DOM، أو تنسيق الحركات—لكن قِس أثر الأداء دومًا، وفكّر هل تعمل البدائل الإعلانية على غرارها.</p>
<p>تذكّر: طبيعة React غير المتزامنة ميزة في الغالب لا خللًا. وعندما تحتاج فعلًا إلى الخروج من ذلك النموذج، يساعدك نظام أنواع TypeScript على ضمان أن تفعل بأمان، عبر التقاط أخطاء المراجع الفارغة (null reference) وتوفير أنواع عناصر مناسبة لمعالجاتك في الـ DOM.</p>
<p>المفتاح أن تعرف متى تكون هذه الأدوات ضرورية فعلًا ومتى تكون في محاربة الأنماط الطبيعية لـ React. عند الشكّ، ابدأ بالنهج الإعلاني، ولا تقبض على <code>flushSync</code> إلا إذا كان عندك شرط توقيت بعينه لا يحلّه غيره.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
