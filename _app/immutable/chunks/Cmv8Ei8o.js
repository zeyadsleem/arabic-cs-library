const s="kinney",a="react-performance",n="أداء React",l="colocation-of-state",t="إبقاء الحالة قريبة من موضع استخدامها (Colocation of State)",p=[{depth:2,id:"لماذا-يهم-إبقاء-الحالة-قريبة",text:"لماذا يهمّ إبقاء الحالة قريبة"},{depth:2,id:"النمط-المضاد-كل-شيء-في-app",text:"النمط المضاد: كل شيء في App"},{depth:2,id:"الأفضل-حالة-قريبة-من-موضع-استخدامها",text:"الأفضل: حالة قريبة من موضع استخدامها"},{depth:2,id:"مثال-من-الواقع-حالة-نموذج",text:"مثال من الواقع: حالة نموذج"},{depth:2,id:"متى-لا-تبقي-الحالة-قريبة",text:"متى لا تُبقي الحالة قريبة"},{depth:3,id:"حالة-مشتركة-بين-مكونات-شقيقة",text:"حالة مشتركة بين مكوّنات شقيقة"},{depth:3,id:"حالة-التطبيق-العامة",text:"حالة التطبيق العامة"},{depth:3,id:"حالة-تحتاج-إلى-البقاء",text:"حالة تحتاج إلى البقاء"},{depth:2,id:"نمط-متقدم-رفع-الحالة-وخفضها",text:"نمط متقدّم: رفع الحالة وخفضها"},{depth:2,id:"أثر-الأداء-بالأرقام",text:"أثر الأداء بالأرقام"},{depth:2,id:"فوائد-الاختبار",text:"فوائد الاختبار"},{depth:2,id:"قائمة-تحقق-سريعة-لإبقاء-الحالة-قريبة",text:"قائمة تحقّق سريعة لإبقاء الحالة قريبة"}],e=`<p>إبقاء الحالة قريبة من موضع استخدامها أحد أنماط أداء React التي يبدو اسمها متأنّقًا لكنها في حقيقتها مجرّد حكمة بديهية: أبقِ حالتك قريبة قدر الإمكان من موضع استخدامها الفعلي. فبدلًا من رفع كل شيء إلى قمة شجرة المكوّنات «تحسّبًا لأي طارئ»، تضع الحالة حيث تنتمي بالضبط — قرب المكوّنات التي تحتاجها فعلًا.</p>
<p>يمكن لهذا المبدأ البسيط أن يقلّل جذريًا عمليات إعادة التصيير غير الضرورية، وأن يجعل مكوّناتك أسهل في الاختبار والاستدلال، وأن ينجيك من كابوس تمرير الخصائص المتشعّب المخيف. فضلًا عن أنه يجعل شيفرتك أكثر قابلية للصيانة عندما تحتاج حتمًا إلى نقل المكوّنات هنا وهناك (وثق بي، ستحتاج إلى ذلك).</p>
<h2 id="لماذا-يهم-إبقاء-الحالة-قريبة">لماذا يهمّ إبقاء الحالة قريبة</h2>
<p>عندما تعيش الحالة بعيدًا عن موضع استهلاكها، ينتهي بك الأمر إلى مشكلات عدة:</p>
<ul>
<li><strong>عواصف التصيير</strong>: تغييرات الحالة عالية المستوى تُطلق إعادات تصيير في مكوّنات لا تهمّها تلك التغييرات فعلًا</li>
<li><strong>تمرير الخصائص المتشعّب</strong>: تُمرّر الخصائص عبر طبقات مكوّنات متعددة لا تحتاج إليها</li>
<li><strong>الاقتران المحكم</strong>: تصبح المكوّنات معتمدة على حالة أب لا ينبغي أن تعرف عنها شيئًا</li>
<li><strong>تعقيد الاختبار</strong>: تحتاج إلى إعداد أشجار مكوّنات كاملة لمجرّد اختبار جزء صغير من الوظائف</li>
</ul>
<p>السلوك الافتراضي في React هو إعادة تصيير المكوّن وكل أبنائه كلما تغيّرت الحالة. وإذا كانت لديك حالة في جذر تطبيقك لا تؤثّر إلا في جزء صغير من واجهتك، فأنت ربما تعيد تصيير تطبيقك بأكمله بلا سبب وجيه.</p>
<h2 id="النمط-المضاد-كل-شيء-في-app">النمط المضاد: كل شيء في App</h2>
<p>لنبدأ بما <em>لا</em> ينبغي فعله. إليك نمطًا مضادًا شائعًا تعيش فيه كل الحالة في المستوى الأعلى:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Everything lives in App</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [searchQuery, setSearchQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [searchResults, setSearchResults] = useState&lt;<span class="hljs-title class_">Product</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [cartItems, setCartItems] = useState&lt;<span class="hljs-title class_">CartItem</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isModalOpen, setIsModalOpen] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [selectedProduct, setSelectedProduct] = useState&lt;<span class="hljs-title class_">Product</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> <span class="hljs-attr">onLogout</span>=<span class="hljs-string">{()</span> =&gt;</span> setUser(null)} /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">SearchBar</span>
        <span class="hljs-attr">searchQuery</span>=<span class="hljs-string">{searchQuery}</span>
        <span class="hljs-attr">onSearchChange</span>=<span class="hljs-string">{setSearchQuery}</span>
        <span class="hljs-attr">searchResults</span>=<span class="hljs-string">{searchResults}</span>
        <span class="hljs-attr">onResultsChange</span>=<span class="hljs-string">{setSearchResults}</span>
      /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ProductGrid</span>
        <span class="hljs-attr">products</span>=<span class="hljs-string">{searchResults}</span>
        <span class="hljs-attr">onProductSelect</span>=<span class="hljs-string">{setSelectedProduct}</span>
        <span class="hljs-attr">onModalOpen</span>=<span class="hljs-string">{()</span> =&gt;</span> setIsModalOpen(true)}
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">Cart</span> <span class="hljs-attr">items</span>=<span class="hljs-string">{cartItems}</span> <span class="hljs-attr">onItemsChange</span>=<span class="hljs-string">{setCartItems}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Modal</span> <span class="hljs-attr">isOpen</span>=<span class="hljs-string">{isModalOpen}</span> <span class="hljs-attr">onClose</span>=<span class="hljs-string">{()</span> =&gt;</span> setIsModalOpen(false)} product={selectedProduct} /&gt;
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>يبدو هذا منظّمًا للوهلة الأولى، لكن كل تغيير في الحالة يُطلق إعادة تصيير لمكوّن <code>App</code> بأكمله وكل أبنائه. فعندما يكتب أحدهم في شريط البحث، يُعاد تصيير الترويسة وسلة التسوّق والنافذة المنبثقة جميعًا بلا داعٍ.</p>
<h2 id="الأفضل-حالة-قريبة-من-موضع-استخدامها">الأفضل: حالة قريبة من موضع استخدامها</h2>
<p>إليك الوظائف نفسها مع حالة موضوعة على النحو الصحيح قرب موضع استخدامها:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: State lives close to where it&#x27;s used</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span> <span class="hljs-attr">onLogout</span>=<span class="hljs-string">{()</span> =&gt;</span> setUser(null)} /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">SearchSection</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Cart</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchSection</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [searchQuery, setSearchQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [searchResults, setSearchResults] = useState&lt;<span class="hljs-title class_">Product</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [selectedProduct, setSelectedProduct] = useState&lt;<span class="hljs-title class_">Product</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [isModalOpen, setIsModalOpen] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">SearchBar</span>
        <span class="hljs-attr">searchQuery</span>=<span class="hljs-string">{searchQuery}</span>
        <span class="hljs-attr">onSearchChange</span>=<span class="hljs-string">{setSearchQuery}</span>
        <span class="hljs-attr">onResultsChange</span>=<span class="hljs-string">{setSearchResults}</span>
      /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ProductGrid</span>
        <span class="hljs-attr">products</span>=<span class="hljs-string">{searchResults}</span>
        <span class="hljs-attr">onProductSelect</span>=<span class="hljs-string">{setSelectedProduct}</span>
        <span class="hljs-attr">onModalOpen</span>=<span class="hljs-string">{()</span> =&gt;</span> setIsModalOpen(true)}
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">Modal</span> <span class="hljs-attr">isOpen</span>=<span class="hljs-string">{isModalOpen}</span> <span class="hljs-attr">onClose</span>=<span class="hljs-string">{()</span> =&gt;</span> setIsModalOpen(false)} product={selectedProduct} /&gt;
    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Cart</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [cartItems, setCartItems] = useState&lt;<span class="hljs-title class_">CartItem</span>[]&gt;([]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">aside</span>&gt;</span>{/* Cart implementation */}<span class="hljs-tag">&lt;/<span class="hljs-name">aside</span>&gt;</span></span>;
}
</code></pre>
<p>الآن عندما يكتب أحدهم في شريط البحث، لا يُعاد تصيير إلا مكوّن <code>SearchSection</code> وأبنائه. أما الترويسة وسلة التسوّق فتبقيان بمنأى تمامًا.</p>
<h2 id="مثال-من-الواقع-حالة-نموذج">مثال من الواقع: حالة نموذج</h2>
<p>النماذج مثال مثالي على الموضع الذي يتألّق فيه إبقاء الحالة قريبًا. لننظر إلى نموذج ملف تعريف مستخدم يوضّح الفرق:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad: Form state scattered throughout parent components</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfilePage</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [name, setName] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [email, setEmail] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [bio, setBio] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [avatar, setAvatar] = useState&lt;<span class="hljs-title class_">File</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [isSubmitting, setIsSubmitting] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [errors, setErrors] = useState&lt;<span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;&gt;({});

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">setIsSubmitting</span>(<span class="hljs-literal">true</span>);
    <span class="hljs-comment">// Submit logic...</span>
    <span class="hljs-title function_">setIsSubmitting</span>(<span class="hljs-literal">false</span>);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">PageHeader</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">UserProfileForm</span>
        <span class="hljs-attr">name</span>=<span class="hljs-string">{name}</span>
        <span class="hljs-attr">onNameChange</span>=<span class="hljs-string">{setName}</span>
        <span class="hljs-attr">email</span>=<span class="hljs-string">{email}</span>
        <span class="hljs-attr">onEmailChange</span>=<span class="hljs-string">{setEmail}</span>
        <span class="hljs-attr">bio</span>=<span class="hljs-string">{bio}</span>
        <span class="hljs-attr">onBioChange</span>=<span class="hljs-string">{setBio}</span>
        <span class="hljs-attr">avatar</span>=<span class="hljs-string">{avatar}</span>
        <span class="hljs-attr">onAvatarChange</span>=<span class="hljs-string">{setAvatar}</span>
        <span class="hljs-attr">isSubmitting</span>=<span class="hljs-string">{isSubmitting}</span>
        <span class="hljs-attr">errors</span>=<span class="hljs-string">{errors}</span>
        <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span>
      /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Sidebar</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>كل ضغطة مفتاح في النموذج تُطلق إعادة تصيير لـ <code>UserProfilePage</code> و<code>PageHeader</code> و<code>Sidebar</code>. وهذا إهدار.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Form state colocated</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfilePage</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">PageHeader</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">UserProfileForm</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Sidebar</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">UserProfileForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [formData, setFormData] = <span class="hljs-title function_">useState</span>({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">email</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">bio</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">avatar</span>: <span class="hljs-literal">null</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">File</span> | <span class="hljs-literal">null</span>,
  });
  <span class="hljs-keyword">const</span> [isSubmitting, setIsSubmitting] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [errors, setErrors] = useState&lt;<span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;&gt;({});

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">updateField</span> = (<span class="hljs-params"><span class="hljs-attr">field</span>: keyof <span class="hljs-keyword">typeof</span> formData</span>) =&gt; <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">any</span></span>) =&gt;</span> {
    <span class="hljs-title function_">setFormData</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, [field]: value }));
  };

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">FormEvent</span></span>) =&gt; {
    e.<span class="hljs-title function_">preventDefault</span>();
    <span class="hljs-title function_">setIsSubmitting</span>(<span class="hljs-literal">true</span>);
    <span class="hljs-keyword">try</span> {
      <span class="hljs-comment">// Submit logic...</span>
    } <span class="hljs-keyword">catch</span> (error) {
      <span class="hljs-comment">// Error handling...</span>
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-title function_">setIsSubmitting</span>(<span class="hljs-literal">false</span>);
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{formData.name}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> updateField(&#x27;name&#x27;)(e.target.value)}
        placeholder=&quot;Name&quot;
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{formData.email}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> updateField(&#x27;email&#x27;)(e.target.value)}
        placeholder=&quot;Email&quot;
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{formData.bio}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> updateField(&#x27;bio&#x27;)(e.target.value)}
        placeholder=&quot;Bio&quot;
      /&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isSubmitting}</span>&gt;</span>
        {isSubmitting ? &#x27;Saving...&#x27; : &#x27;Save Profile&#x27;}
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}
</code></pre>
<p>الآن لا تُعيد تفاعلات النموذج تصيير غير النموذج نفسه. وتبقى ترويسة الصفحة والشريط الجانبي في غفلة سعيدة عن كتابتك.</p>
<h2 id="متى-لا-تبقي-الحالة-قريبة">متى لا تُبقي الحالة قريبة</h2>
<p>هناك بالتأكيد أوقات لا ينبغي فيها إبقاء الحالة قريبة من موضع الاستخدام. إليك الاستثناءات الرئيسية:</p>
<h3 id="حالة-مشتركة-بين-مكونات-شقيقة">حالة مشتركة بين مكوّنات شقيقة</h3>
<p>عندما تحتاج عدة مكوّنات في المستوى نفسه إلى الحالة ذاتها:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Shared state lives in common parent</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Dashboard</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [selectedDateRange, setSelectedDateRange] = useState&lt;<span class="hljs-title class_">DateRange</span>&gt;({
    <span class="hljs-attr">start</span>: <span class="hljs-title function_">startOfMonth</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>()),
    <span class="hljs-attr">end</span>: <span class="hljs-title function_">endOfMonth</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>()),
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">DateRangePicker</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{selectedDateRange}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{setSelectedDateRange}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">SalesChart</span> <span class="hljs-attr">dateRange</span>=<span class="hljs-string">{selectedDateRange}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">RevenueTable</span> <span class="hljs-attr">dateRange</span>=<span class="hljs-string">{selectedDateRange}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="حالة-التطبيق-العامة">حالة التطبيق العامة</h3>
<p>بعض الحالة تحتاج فعلًا إلى أن تكون عامة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Authentication state is global</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [theme, setTheme] = useState&lt;<span class="hljs-string">&#x27;light&#x27;</span> | <span class="hljs-string">&#x27;dark&#x27;</span>&gt;(<span class="hljs-string">&#x27;light&#x27;</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ThemeProvider</span> <span class="hljs-attr">theme</span>=<span class="hljs-string">{theme}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">AuthProvider</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{user}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Router</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">AuthProvider</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ThemeProvider</span>&gt;</span></span>
  );
}
</code></pre>
<h3 id="حالة-تحتاج-إلى-البقاء">حالة تحتاج إلى البقاء</h3>
<p>إذا كانت الحالة تحتاج إلى البقاء بعد إلغاء تحميل المكوّن، فالأرجح أنها تنتمي إلى مستوى أعلى:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Draft state persists when modal closes</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [draftPost, setDraftPost] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [isComposeOpen, setIsComposeOpen] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setIsComposeOpen(true)}&gt;Write Post<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      {isComposeOpen &amp;&amp; (
        <span class="hljs-tag">&lt;<span class="hljs-name">ComposeModal</span>
          <span class="hljs-attr">draft</span>=<span class="hljs-string">{draftPost}</span>
          <span class="hljs-attr">onDraftChange</span>=<span class="hljs-string">{setDraftPost}</span>
          <span class="hljs-attr">onClose</span>=<span class="hljs-string">{()</span> =&gt;</span> setIsComposeOpen(false)}
        /&gt;
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="نمط-متقدم-رفع-الحالة-وخفضها">نمط متقدّم: رفع الحالة وخفضها</h2>
<p>قد تحتاج أحيانًا إلى نقل الحالة صعودًا ونزولًا في شجرة المكوّنات مع تغيّر المتطلبات. وهذا طبيعي تمامًا! إليك كيف تفكّر في الأمر:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Initial implementation: colocated</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductCard</span>(<span class="hljs-params">{ product }: { product: Product }</span>) {
  <span class="hljs-keyword">const</span> [isLiked, setIsLiked] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{product.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setIsLiked(!isLiked)}&gt;{isLiked ? &#x27;❤️&#x27; : &#x27;🤍&#x27;}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>لاحقًا، تحتاج إلى عرض المنتجات المُعجَبة في جزء آخر من التطبيق:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Lifted state for sharing</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">ProductSection</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [likedProducts, setLikedProducts] = useState&lt;<span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">string</span>&gt;&gt;(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>());

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">toggleLike</span> = (<span class="hljs-params"><span class="hljs-attr">productId</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-title function_">setLikedProducts</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> next = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>(prev);
      <span class="hljs-keyword">if</span> (next.<span class="hljs-title function_">has</span>(productId)) {
        next.<span class="hljs-title function_">delete</span>(productId);
      } <span class="hljs-keyword">else</span> {
        next.<span class="hljs-title function_">add</span>(productId);
      }
      <span class="hljs-keyword">return</span> next;
    });
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ProductGrid</span> <span class="hljs-attr">products</span>=<span class="hljs-string">{products}</span> <span class="hljs-attr">likedProducts</span>=<span class="hljs-string">{likedProducts}</span> <span class="hljs-attr">onToggleLike</span>=<span class="hljs-string">{toggleLike}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">LikedProductsSidebar</span> <span class="hljs-attr">likedProducts</span>=<span class="hljs-string">{likedProducts}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>ابدأ بحالة قريبة من موضع استخدامها، ولا ترفعها إلا عندما تكون لديك حاجة ملموسة إلى مشاركتها. لا ترفع الحالة تحسّبًا.</p>
</blockquote>
<h2 id="أثر-الأداء-بالأرقام">أثر الأداء بالأرقام</h2>
<p>لوضع ذلك في المنظور الصحيح، إليك ما يحدث في شجرة مكوّنات نموذجية:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ State at root causes 100+ component re-renders</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">App</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [searchQuery, setSearchQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span> {/* Unnecessary re-render */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Navigation</span> /&gt;</span> {/* Unnecessary re-render */}
      <span class="hljs-tag">&lt;<span class="hljs-name">MainContent</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">SearchBar</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{searchQuery}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{setSearchQuery}</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ProductGrid</span> /&gt;</span> {/* Unnecessary re-render */}
      <span class="hljs-tag">&lt;/<span class="hljs-name">MainContent</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Sidebar</span> /&gt;</span> {/* Unnecessary re-render */}
      <span class="hljs-tag">&lt;<span class="hljs-name">Footer</span> /&gt;</span> {/* Unnecessary re-render */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Colocated state causes 3-5 component re-renders</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">MainContent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [searchQuery, setSearchQuery] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">SearchBar</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{searchQuery}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{setSearchQuery}</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">SearchResults</span> <span class="hljs-attr">query</span>=<span class="hljs-string">{searchQuery}</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></span>
  );
}
</code></pre>
<p>يصبح الفرق أهمّ أضعافًا مضاعفة مع نموّ شجرة مكوّناتك. فتغيير يُطلق 5 عمليات إعادة تصيير بدل 100 هو تحسين في الأداء بنسبة 95%!</p>
<h2 id="فوائد-الاختبار">فوائد الاختبار</h2>
<p>تُبسّط الحالة القريبة من موضع استخدامها الاختبار كثيرًا، إذ لا تحتاج إلى محاكاة حالة أب معقّدة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Easy to test - self-contained</span>
<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;UserProfileForm&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;validates email format&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UserProfileForm</span> /&gt;</span></span>);

    fireEvent.<span class="hljs-title function_">change</span>(screen.<span class="hljs-title function_">getByPlaceholderText</span>(<span class="hljs-string">&#x27;Email&#x27;</span>), {
      <span class="hljs-attr">target</span>: { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;invalid-email&#x27;</span> },
    });

    fireEvent.<span class="hljs-title function_">click</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Save Profile&#x27;</span>));

    <span class="hljs-title function_">expect</span>(screen.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Invalid email format&#x27;</span>)).<span class="hljs-title function_">toBeInTheDocument</span>();
  });
});
</code></pre>
<p>قارن هذا باختبار المنطق نفسه عندما تعيش الحالة في مكوّن أب — إذ ستحتاج إلى إعداد التسلسل الهرمي للمكوّنات بأكمله لمجرّد اختبار التحقّق من البريد الإلكتروني.</p>
<h2 id="قائمة-تحقق-سريعة-لإبقاء-الحالة-قريبة">قائمة تحقّق سريعة لإبقاء الحالة قريبة</h2>
<p>قبل أن تقرّر أين تضع الحالة، اسأل نفسك:</p>
<ul>
<li><strong>كم مكوّنًا يحتاج هذه الحالة فعلًا؟</strong> إن كان مكوّنًا واحدًا فقط، فأبقِها قريبة منه.</li>
<li><strong>هل تحتاج مكوّنات شقيقة إلى مشاركة هذه الحالة؟</strong> إن كان نعم، فارفعها إلى الأب المشترك.</li>
<li><strong>هل تحتاج هذه الحالة إلى البقاء عند إلغاء تحميل المكوّنات؟</strong> إن كان نعم، ففكّر في رفعها.</li>
<li><strong>هل هذه حالة عامة فعلًا</strong> (مثل المصادقة أو السمة)؟ إن كان نعم، فضعها في مزوّد أو مخزن عام.</li>
<li><strong>هل أرفع الحالة «تحسّبًا لأي طارئ»؟</strong> لا تفعل ذلك — ابدأ بحالة قريبة من موضع استخدامها وارفعها عند الحاجة.</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
