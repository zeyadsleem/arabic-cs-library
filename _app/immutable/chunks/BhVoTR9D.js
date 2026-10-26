const s="kinney",a="react-performance",n="أداء React",l="windowing-and-virtualization",t="التصيير النوافذي والافتراضي في القوائم الطويلة",p=[{depth:2,id:"ما-التصيير-النوافذي",text:"ما التصيير النوافذي؟"},{depth:2,id:"متى-تحتاج-التصيير-النوافذي",text:"متى تحتاج التصيير النوافذي"},{depth:2,id:"تثبيت-react-window",text:"تثبيت react-window"},{depth:2,id:"قائمة-أساسية-ثابتة-الحجم",text:"قائمة أساسية ثابتة الحجم"},{depth:2,id:"قوائم-متغيرة-الحجم",text:"قوائم متغيرة الحجم"},{depth:2,id:"التحجيم-التلقائي-للحاوية",text:"التحجيم التلقائي للحاوية"},{depth:2,id:"إضافة-عناصر-تحكم-في-التمرير",text:"إضافة عناصر تحكم في التمرير"},{depth:2,id:"التعامل-مع-حالات-التحميل-والتمرير-اللانهائي",text:"التعامل مع حالات التحميل والتمرير اللانهائي"},{depth:2,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:3,id:"عدد-التجاوز-overscan",text:"عدد التجاوز (overscan)"},{depth:3,id:"الحفظ-memoization",text:"الحفظ (memoization)"},{depth:3,id:"تجنب-الكائنات-المضمنة",text:"تجنّب الكائنات المضمّنة"},{depth:2,id:"اعتبارات-إمكانية-الوصول",text:"اعتبارات إمكانية الوصول"},{depth:2,id:"مزالق-شائعة",text:"مزالق شائعة"},{depth:3,id:"حسابات-ارتفاع-غير-صحيحة",text:"حسابات ارتفاع غير صحيحة"},{depth:3,id:"نسيان-خاصية-style",text:"نسيان خاصية style"},{depth:3,id:"تسريبات-ذاكرة-في-مكونات-الصفوف",text:"تسريبات ذاكرة في مكوّنات الصفوف"},{depth:2,id:"متى-لا-تستخدم-التصيير-النوافذي",text:"متى لا تستخدم التصيير النوافذي"},{depth:2,id:"الخطوات-التالية",text:"الخطوات التالية"}],e=`<p>هل تصيّر 10,000 عنصر قائمة في React؟ سيرفض متصفحك بأدب بواجهة مجمدة وتسريب ذاكرة. الحل ليس رمي مزيد من الذاكرة على المشكلة — بل أن تكون أذكى فيما تصيّره. التصيير النوافذي (windowing)، ويسمى أيضًا الافتراضية (virtualization)، يصيّر فقط العناصر الظاهرة في إطار العرض، فيبقي واجهتك سريعة حتى مع مجموعات بيانات ضخمة. سنستكشف كيفية تنفيذ ذلك باستخدام <code>react-window</code>، والتعامل مع الحالات الطرفية، ومراعاة إمكانية الوصول، مع تحويل القوائم المتثاقلة إلى تجارب بالغة السلاسة.</p>
<h2 id="ما-التصيير-النوافذي">ما التصيير النوافذي؟</h2>
<p>التصيير النوافذي كالنظر عبر نافذة إلى لوحة ضخمة — لا ترى إلا الجزء الذي يتسع في الإطار. وعندما تمرر، تكشف أقسامًا مختلفة، لكن اللوحة كاملة لا تُحمَّل في مجال رؤيتك دفعة واحدة. سيكون ذلك سخيفًا (ومكلفًا).</p>
<p>في سياق تطبيقات React، يعني التصيير النوافذي:</p>
<ol>
<li><strong>أن تصيّر العناصر الظاهرة فقط</strong>: إن كان إطار العرض يعرض 10 صفوف، فصيّر نحو 15-20 لمعالجة التمرير السلس</li>
<li><strong>أن تعيد تدوير عقد DOM</strong>: عندما تخرج عناصر من مجال الرؤية بالتمرير، تُعاد عقد DOM الخاصة بها للاستخدام مع عناصر جديدة تدخل</li>
<li><strong>أن تحافظ على موضع التمرير</strong>: يجب ألا يعرف المستخدمون أبدًا أن عناصر تُضاف وتُزال</li>
</ol>
<p>يحوّل هذا الأسلوب قوائم كانت ستنهار متصفحك عادةً إلى تجارب أداء واستجابة.</p>
<h2 id="متى-تحتاج-التصيير-النوافذي">متى تحتاج التصيير النوافذي</h2>
<p>إليك بعض حالات الاستخدام الواقعية™ التي يصبح فيها التصيير النوافذي ضروريًا:</p>
<ul>
<li><strong>جداول البيانات</strong> بمئات الصفوف أو آلافها</li>
<li><strong>تطبيقات الدردشة</strong> بسجلات رسائل طويلة</li>
<li><strong>مستكشفات الملفات</strong> بالكثير من العناصر</li>
<li><strong>خلاصات التواصل الاجتماعي</strong> (وإن كان التمرير اللانهائي يقترن غالبًا بالتصيير النوافذي)</li>
<li><strong>عارضات السجلات</strong> التي تعرض آلاف المدخلات</li>
<li><strong>قوائم منسدلة</strong> بمئات الخيارات</li>
</ul>
<p>القاعدة العامة: إن كنت تصيّر أكثر من 50-100 عنصر متشابه، ففكّر في التصيير النوافذي.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>ابدأ قياس الأداء عند نحو 50 عنصرًا. قد تفاجئك سرعة التباطؤ، خصوصًا على الأجهزة المحمولة.</p>
</blockquote>
<h2 id="تثبيت-react-window">تثبيت react-window</h2>
<p>سنستخدم <code>react-window</code>، أشهر مكتبة تصيير نوافذي لـ React. إنها خليفة <code>react-virtualized</code> لكن بحجم حزمة أصغر وواجهة أبسط.</p>
<pre><code class="language-bash">npm install react-window
<span class="hljs-comment"># If you&#x27;re using TypeScript (and you should be):</span>
npm install --save-dev @types/react-window
</code></pre>
<p>لحالات استخدام أكثر تقدمًا، قد ترغب أيضًا في:</p>
<pre><code class="language-bash"><span class="hljs-comment"># For dynamic item heights and additional features</span>
npm install react-window-infinite-loader
npm install react-virtualized-auto-sizer
</code></pre>
<h2 id="قائمة-أساسية-ثابتة-الحجم">قائمة أساسية ثابتة الحجم</h2>
<p>لنبدأ بأبسط حالة: قائمة يكون فيها كل عنصر بالارتفاع نفسه.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">FixedSizeList</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">List</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-window&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Item</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">RowProps</span> {
  <span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">style</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">CSSProperties</span>;
  <span class="hljs-attr">data</span>: <span class="hljs-title class_">Item</span>[];
}

<span class="hljs-comment">// Individual row component</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">Row</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">RowProps</span>&gt; = <span class="hljs-function">(<span class="hljs-params">{ index, style, data }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> item = data[index];

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex items-center border-b p-4&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;font-medium&quot;</span>&gt;</span>{item.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;ml-4 text-gray-600&quot;</span>&gt;</span>{item.email}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};

<span class="hljs-comment">// Main list component</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">UserList</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">users</span>: <span class="hljs-title class_">Item</span>[] }&gt; = <span class="hljs-function">(<span class="hljs-params">{ users }</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">List</span>
      <span class="hljs-attr">height</span>=<span class="hljs-string">{400}</span> // <span class="hljs-attr">Container</span> <span class="hljs-attr">height</span>
      <span class="hljs-attr">itemCount</span>=<span class="hljs-string">{users.length}</span>
      <span class="hljs-attr">itemSize</span>=<span class="hljs-string">{60}</span> // <span class="hljs-attr">Height</span> <span class="hljs-attr">of</span> <span class="hljs-attr">each</span> <span class="hljs-attr">row</span>
      <span class="hljs-attr">itemData</span>=<span class="hljs-string">{users}</span> // <span class="hljs-attr">Data</span> <span class="hljs-attr">passed</span> <span class="hljs-attr">to</span> <span class="hljs-attr">each</span> <span class="hljs-attr">row</span>
      <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;100%&quot;</span>
    &gt;</span>
      {Row}
    <span class="hljs-tag">&lt;/<span class="hljs-name">List</span>&gt;</span></span>
  );
};
</code></pre>
<p>نقاط رئيسية في هذا التنفيذ:</p>
<ul>
<li><strong>خاصية <code>style</code></strong>: طبّقها دائمًا على العنصر الجذر لصفك — فهي تضع العناصر في مواضعها الصحيحة</li>
<li><strong><code>itemData</code></strong>: مرّر بياناتك عبر هذه الخاصية بدلًا من الإغلاق لتجنب إعادة إنشاء مكوّنات الصفوف</li>
<li><strong>أبعاد ثابتة</strong>: يجب أن يكون <code>height</code> و<code>itemSize</code> معروفين مسبقًا</li>
</ul>
<h2 id="قوائم-متغيرة-الحجم">قوائم متغيرة الحجم</h2>
<p>نادرًا ما تناسب بيانات العالم الحقيقي صناديق موحدة. فأطوال الأسماء تختلف، وأحجام التعليقات تتفاوت، والمحتوى ديناميكي. في هذه الحالات، استخدم <code>VariableSizeList</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">VariableSizeList</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">List</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-window&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Comment</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">author</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">RowProps</span> {
  <span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">style</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">CSSProperties</span>;
  <span class="hljs-attr">data</span>: <span class="hljs-title class_">Comment</span>[];
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">CommentRow</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">RowProps</span>&gt; = <span class="hljs-function">(<span class="hljs-params">{ index, style, data }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> comment = data[index];

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;border-b p-4&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-sm font-medium text-gray-500&quot;</span>&gt;</span>
        {comment.author} • {comment.timestamp.toLocaleDateString()}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mt-2&quot;</span>&gt;</span>{comment.content}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};

<span class="hljs-keyword">const</span> <span class="hljs-title class_">CommentList</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">comments</span>: <span class="hljs-title class_">Comment</span>[] }&gt; = <span class="hljs-function">(<span class="hljs-params">{ comments }</span>) =&gt;</span> {
  <span class="hljs-comment">// Calculate the height of each item</span>
  <span class="hljs-keyword">const</span> getItemSize = (<span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span>): <span class="hljs-function"><span class="hljs-params">number</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> comment = comments[index];
    <span class="hljs-comment">// Base height + content height estimation</span>
    <span class="hljs-keyword">const</span> baseHeight = <span class="hljs-number">60</span>; <span class="hljs-comment">// Author info + padding</span>
    <span class="hljs-keyword">const</span> contentHeight = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(comment.<span class="hljs-property">content</span>.<span class="hljs-property">length</span> / <span class="hljs-number">50</span>) * <span class="hljs-number">20</span>;
    <span class="hljs-keyword">return</span> baseHeight + contentHeight;
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">List</span>
      <span class="hljs-attr">height</span>=<span class="hljs-string">{400}</span>
      <span class="hljs-attr">itemCount</span>=<span class="hljs-string">{comments.length}</span>
      <span class="hljs-attr">itemSize</span>=<span class="hljs-string">{getItemSize}</span>
      <span class="hljs-attr">itemData</span>=<span class="hljs-string">{comments}</span>
      <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;100%&quot;</span>
    &gt;</span>
      {CommentRow}
    <span class="hljs-tag">&lt;/<span class="hljs-name">List</span>&gt;</span></span>
  );
};
</code></pre>
<blockquote>
<p><strong>تحذير</strong></p>
<p>القوائم متغيرة الحجم أعقد لأن <code>react-window</code> يحتاج إلى معرفة ارتفاع كل عنصر قبل التصيير. التقديرات الضعيفة قد تسبب قفزات في التمرير أو مواضع تمرير غير صحيحة.</p>
</blockquote>
<h2 id="التحجيم-التلقائي-للحاوية">التحجيم التلقائي للحاوية</h2>
<p>ليس ترميز أبعاد الحاوية يدويًا عمليًا دائمًا. يكتشف <code>react-virtualized-auto-sizer</code> حجم الحاوية الأم ويمرره إلى قائمتك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">AutoSizer</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-virtualized-auto-sizer&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">FixedSizeList</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">List</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-window&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">ResponsiveUserList</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">users</span>: <span class="hljs-title class_">Item</span>[] }&gt; = <span class="hljs-function">(<span class="hljs-params">{ users }</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;h-full&quot;</span>&gt;</span>
      {&#x27; &#x27;}
      {/* Parent container */}
      <span class="hljs-tag">&lt;<span class="hljs-name">AutoSizer</span>&gt;</span>
        {({ height, width }) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">List</span>
            <span class="hljs-attr">height</span>=<span class="hljs-string">{height}</span>
            <span class="hljs-attr">width</span>=<span class="hljs-string">{width}</span>
            <span class="hljs-attr">itemCount</span>=<span class="hljs-string">{users.length}</span>
            <span class="hljs-attr">itemSize</span>=<span class="hljs-string">{60}</span>
            <span class="hljs-attr">itemData</span>=<span class="hljs-string">{users}</span>
          &gt;</span>
            {Row}
          <span class="hljs-tag">&lt;/<span class="hljs-name">List</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">AutoSizer</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<p>هذا مفيد خاصةً في التخطيطات المتجاوبة حيث تحتاج القائمة إلى ملء المساحة المتاحة.</p>
<h2 id="إضافة-عناصر-تحكم-في-التمرير">إضافة عناصر تحكم في التمرير</h2>
<p>أحيانًا تحتاج إلى تحكم برمجي في التمرير — الانتقال إلى عناصر محددة، أو التمرير السلس، أو استعادة موضع التمرير:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useRef, useCallback } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">FixedSizeList</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">List</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-window&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">ControllableList</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">users</span>: <span class="hljs-title class_">Item</span>[] }&gt; = <span class="hljs-function">(<span class="hljs-params">{ users }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> listRef = useRef&lt;<span class="hljs-title class_">List</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> scrollToUser = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> index = users.<span class="hljs-title function_">findIndex</span>(<span class="hljs-function">(<span class="hljs-params">user</span>) =&gt;</span> user.<span class="hljs-property">id</span> === userId);
      <span class="hljs-keyword">if</span> (index !== -<span class="hljs-number">1</span> &amp;&amp; listRef.<span class="hljs-property">current</span>) {
        listRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">scrollToItem</span>(index, <span class="hljs-string">&#x27;center&#x27;</span>);
      }
    },
    [users],
  );

  <span class="hljs-keyword">const</span> scrollToTop = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">if</span> (listRef.<span class="hljs-property">current</span>) {
      listRef.<span class="hljs-property">current</span>.<span class="hljs-title function_">scrollToItem</span>(<span class="hljs-number">0</span>, <span class="hljs-string">&#x27;start&#x27;</span>);
    }
  }, []);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;mb-4 space-x-2&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{scrollToTop}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;rounded bg-blue-500 px-4 py-2 text-white&quot;</span>&gt;</span>
          Scroll to Top
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> scrollToUser(&#x27;user-100&#x27;)}
          className=&quot;rounded bg-green-500 px-4 py-2 text-white&quot;
        &gt;
          Jump to User 100
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">List</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">{listRef}</span>
        <span class="hljs-attr">height</span>=<span class="hljs-string">{400}</span>
        <span class="hljs-attr">itemCount</span>=<span class="hljs-string">{users.length}</span>
        <span class="hljs-attr">itemSize</span>=<span class="hljs-string">{60}</span>
        <span class="hljs-attr">itemData</span>=<span class="hljs-string">{users}</span>
        <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;100%&quot;</span>
      &gt;</span>
        {Row}
      <span class="hljs-tag">&lt;/<span class="hljs-name">List</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};
</code></pre>
<h2 id="التعامل-مع-حالات-التحميل-والتمرير-اللانهائي">التعامل مع حالات التحميل والتمرير اللانهائي</h2>
<p>غالبًا ما تحمّل التطبيقات الواقعية البيانات تدريجيًا. اجمع التصيير النوافذي مع التمرير اللانهائي للتعامل مع مجموعات بيانات ضخمة فعلًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useState, useEffect, useCallback } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">FixedSizeList</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">List</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-window&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">InfiniteLoader</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-window-infinite-loader&#x27;</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">InfiniteUserListProps</span> {
  <span class="hljs-attr">loadMoreUsers</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">startIndex</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">stopIndex</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Item</span>[]&gt;;
}

<span class="hljs-keyword">const</span> <span class="hljs-title class_">InfiniteUserList</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">InfiniteUserListProps</span>&gt; = <span class="hljs-function">(<span class="hljs-params">{ loadMoreUsers }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> [users, setUsers] = useState&lt;<span class="hljs-title class_">Item</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [hasNextPage, setHasNextPage] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">true</span>);

  <span class="hljs-comment">// Check if an item is loaded</span>
  <span class="hljs-keyword">const</span> isItemLoaded = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> index &lt; users.<span class="hljs-property">length</span>;
    },
    [users.<span class="hljs-property">length</span>],
  );

  <span class="hljs-comment">// Load more items</span>
  <span class="hljs-keyword">const</span> loadMoreItems = <span class="hljs-title function_">useCallback</span>(
    <span class="hljs-title function_">async</span> (<span class="hljs-attr">startIndex</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">stopIndex</span>: <span class="hljs-built_in">number</span>) =&gt; {
      <span class="hljs-keyword">if</span> (isLoading) <span class="hljs-keyword">return</span>;

      <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">true</span>);
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> newUsers = <span class="hljs-keyword">await</span> <span class="hljs-title function_">loadMoreUsers</span>(startIndex, stopIndex);
        <span class="hljs-keyword">if</span> (newUsers.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) {
          <span class="hljs-title function_">setHasNextPage</span>(<span class="hljs-literal">false</span>);
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-title function_">setUsers</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, ...newUsers]);
        }
      } <span class="hljs-keyword">finally</span> {
        <span class="hljs-title function_">setIsLoading</span>(<span class="hljs-literal">false</span>);
      }
    },
    [isLoading, loadMoreUsers],
  );

  <span class="hljs-comment">// Row component that handles loading states</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">Row</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">RowProps</span>&gt; = <span class="hljs-function">(<span class="hljs-params">{ index, style, data }</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> user = data[index];

    <span class="hljs-comment">// Show loading skeleton for unloaded items</span>
    <span class="hljs-keyword">if</span> (!user) {
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex animate-pulse items-center border-b p-4&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;h-4 w-32 rounded bg-gray-300&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;ml-4 h-4 w-48 rounded bg-gray-300&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      );
    }

    <span class="hljs-keyword">return</span> (
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex items-center border-b p-4&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;font-medium&quot;</span>&gt;</span>{user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;ml-4 text-gray-600&quot;</span>&gt;</span>{user.email}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">InfiniteLoader</span>
      <span class="hljs-attr">isItemLoaded</span>=<span class="hljs-string">{isItemLoaded}</span>
      <span class="hljs-attr">itemCount</span>=<span class="hljs-string">{hasNextPage</span> ? <span class="hljs-attr">users.length</span> + <span class="hljs-attr">1</span> <span class="hljs-attr">:</span> <span class="hljs-attr">users.length</span>}
      <span class="hljs-attr">loadMoreItems</span>=<span class="hljs-string">{loadMoreItems}</span>
    &gt;</span>
      {({ onItemsRendered, ref }) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">List</span>
          <span class="hljs-attr">ref</span>=<span class="hljs-string">{ref}</span>
          <span class="hljs-attr">height</span>=<span class="hljs-string">{400}</span>
          <span class="hljs-attr">itemCount</span>=<span class="hljs-string">{hasNextPage</span> ? <span class="hljs-attr">users.length</span> + <span class="hljs-attr">1</span> <span class="hljs-attr">:</span> <span class="hljs-attr">users.length</span>}
          <span class="hljs-attr">itemSize</span>=<span class="hljs-string">{60}</span>
          <span class="hljs-attr">itemData</span>=<span class="hljs-string">{users}</span>
          <span class="hljs-attr">onItemsRendered</span>=<span class="hljs-string">{onItemsRendered}</span>
          <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;100%&quot;</span>
        &gt;</span>
          {Row}
        <span class="hljs-tag">&lt;/<span class="hljs-name">List</span>&gt;</span>
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">InfiniteLoader</span>&gt;</span></span>
  );
};
</code></pre>
<h2 id="اعتبارات-الأداء">اعتبارات الأداء</h2>
<h3 id="عدد-التجاوز-overscan">عدد التجاوز (overscan)</h3>
<p>افتراضيًا، يصيّر <code>react-window</code> بعض العناصر الإضافية خارج إطار العرض لجعل التمرير أكثر سلاسة. يمكنك ضبط ذلك:</p>
<pre><code class="language-typescript">&lt;<span class="hljs-title class_">List</span>
  <span class="hljs-comment">// ... other props</span>
  overscanCount={<span class="hljs-number">5</span>} <span class="hljs-comment">// Render 5 extra items above and below viewport</span>
&gt;
  {<span class="hljs-title class_">Row</span>}
&lt;/<span class="hljs-title class_">List</span>&gt;
</code></pre>
<p>القيم الأعلى = تمرير أكثر سلاسة لكن استهلاك ذاكرة أكبر. القيم الأدنى = استهلاك ذاكرة أفضل لكن احتمال تعثّر التمرير.</p>
<h3 id="الحفظ-memoization">الحفظ (memoization)</h3>
<p>امنع إعادة التصيير غير الضرورية لمكوّنات صفوفك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { memo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-title class_">Row</span> = memo&lt;<span class="hljs-title class_">RowProps</span>&gt;(<span class="hljs-function">(<span class="hljs-params">{ index, style, data }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> item = data[index];

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex items-center border-b p-4&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;font-medium&quot;</span>&gt;</span>{item.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;ml-4 text-gray-600&quot;</span>&gt;</span>{item.email}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
});
</code></pre>
<h3 id="تجنب-الكائنات-المضمنة">تجنّب الكائنات المضمّنة</h3>
<p>لا تنشئ كائنات أثناء التصيير — فستسبب إعادة تصيير كل صف:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad - creates new style object every render</span>
&lt;<span class="hljs-title class_">List</span> itemData={{ users, <span class="hljs-attr">theme</span>: <span class="hljs-string">&#x27;dark&#x27;</span> }}&gt;

<span class="hljs-comment">// ✅ Good - stable reference</span>
<span class="hljs-keyword">const</span> itemData = <span class="hljs-title function_">useMemo</span>(<span class="hljs-function">() =&gt;</span> ({ users, theme }), [users, theme]);
<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">List</span> <span class="hljs-attr">itemData</span>=<span class="hljs-string">{itemData}</span>&gt;</span>
</span></code></pre>
<h2 id="اعتبارات-إمكانية-الوصول">اعتبارات إمكانية الوصول</h2>
<p>قد يكسر التصيير النوافذي تنقّل قارئ الشاشة لأن عناصر DOM تُضاف وتُزال باستمرار. إليك كيفية الحفاظ على إمكانية الوصول:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title class_">AccessibleRow</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;<span class="hljs-title class_">RowProps</span>&gt; = <span class="hljs-function">(<span class="hljs-params">{ index, style, data }</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> item = data[index];

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flex items-center border-b p-4&quot;</span>
      <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;listitem&quot;</span>
      <span class="hljs-attr">aria-setsize</span>=<span class="hljs-string">{data.length}</span>
      <span class="hljs-attr">aria-posinset</span>=<span class="hljs-string">{index</span> + <span class="hljs-attr">1</span>}
      <span class="hljs-attr">aria-label</span>=<span class="hljs-string">{</span>\`\${<span class="hljs-attr">item.name</span>}, \${<span class="hljs-attr">item.email</span>}\`}
    &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;font-medium&quot;</span>&gt;</span>{item.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;ml-4 text-gray-600&quot;</span>&gt;</span>{item.email}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
};

<span class="hljs-keyword">const</span> <span class="hljs-title class_">AccessibleUserList</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">FC</span>&lt;{ <span class="hljs-attr">users</span>: <span class="hljs-title class_">Item</span>[] }&gt; = <span class="hljs-function">(<span class="hljs-params">{ users }</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">List</span>
      <span class="hljs-attr">height</span>=<span class="hljs-string">{400}</span>
      <span class="hljs-attr">itemCount</span>=<span class="hljs-string">{users.length}</span>
      <span class="hljs-attr">itemSize</span>=<span class="hljs-string">{60}</span>
      <span class="hljs-attr">itemData</span>=<span class="hljs-string">{users}</span>
      <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;100%&quot;</span>
      <span class="hljs-attr">role</span>=<span class="hljs-string">&quot;list&quot;</span>
      <span class="hljs-attr">aria-label</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">List</span> <span class="hljs-attr">of</span> \${<span class="hljs-attr">users.length</span>} <span class="hljs-attr">users</span>\`}
    &gt;</span>
      {AccessibleRow}
    <span class="hljs-tag">&lt;/<span class="hljs-name">List</span>&gt;</span></span>
  );
};
</code></pre>
<p>خصائص إمكانية الوصول الرئيسية:</p>
<ul>
<li><code>role=&quot;list&quot;</code> و<code>role=&quot;listitem&quot;</code> للبنية الدلالية</li>
<li><code>aria-setsize</code> و<code>aria-posinset</code> يساعدان قارئات الشاشة على فهم الموضع</li>
<li><code>aria-label</code> يوفر سياقًا للقائمة كاملة</li>
</ul>
<h2 id="مزالق-شائعة">مزالق شائعة</h2>
<h3 id="حسابات-ارتفاع-غير-صحيحة">حسابات ارتفاع غير صحيحة</h3>
<p>القوائم متغيرة الحجم حساسة بشكل خاص لأخطاء حساب الارتفاع:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad - can cause scroll jumping</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">getItemSize</span> = (<span class="hljs-params"><span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">100</span>; <span class="hljs-comment">// Unpredictable heights</span>
};

<span class="hljs-comment">// ✅ Good - deterministic height calculation</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">getItemSize</span> = (<span class="hljs-params"><span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> item = data[index];
  <span class="hljs-keyword">const</span> baseHeight = <span class="hljs-number">40</span>;
  <span class="hljs-keyword">const</span> contentLines = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">ceil</span>(item.<span class="hljs-property">content</span>.<span class="hljs-property">length</span> / <span class="hljs-variable constant_">CHARS_PER_LINE</span>);
  <span class="hljs-keyword">return</span> baseHeight + contentLines * <span class="hljs-variable constant_">LINE_HEIGHT</span>;
};
</code></pre>
<h3 id="نسيان-خاصية-style">نسيان خاصية style</h3>
<p>يجب على كل مكوّن صف أن يطبّق خاصية <code>style</code>:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad - missing style prop</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">Row</span> = (<span class="hljs-params">{ index, data }</span>) =&gt; <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{data[index].name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

<span class="hljs-comment">// ✅ Good - style prop applied</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">Row</span> = (<span class="hljs-params">{ index, style, data }</span>) =&gt; <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span>&gt;</span>{data[index].name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
</code></pre>
<h3 id="تسريبات-ذاكرة-في-مكونات-الصفوف">تسريبات ذاكرة في مكوّنات الصفوف</h3>
<p>تجنّب إنشاء مستمعات أحداث أو اشتراكات في مكوّنات الصفوف دون تنظيف:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Bad - potential memory leak</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">Row</span> = (<span class="hljs-params">{ index, style, data }</span>) =&gt; {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> subscription = <span class="hljs-title function_">subscribe</span>(data[index].<span class="hljs-property">id</span>);
    <span class="hljs-comment">// Missing cleanup!</span>
  }, []);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span>&gt;</span>{data[index].name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
};

<span class="hljs-comment">// ✅ Good - proper cleanup</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">Row</span> = (<span class="hljs-params">{ index, style, data }</span>) =&gt; {
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> subscription = <span class="hljs-title function_">subscribe</span>(data[index].<span class="hljs-property">id</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> subscription.<span class="hljs-title function_">unsubscribe</span>();
  }, [data[index].<span class="hljs-property">id</span>]);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{style}</span>&gt;</span>{data[index].name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
};
</code></pre>
<h2 id="متى-لا-تستخدم-التصيير-النوافذي">متى لا تستخدم التصيير النوافذي</h2>
<p>التصيير النوافذي ليس الحل الصحيح دائمًا:</p>
<ul>
<li><strong>القوائم الصغيرة</strong> (أقل من 50 عنصرًا): التعقيد عادةً لا يستحق</li>
<li><strong>القوائم ذات التفاعلات المعقدة</strong>: السحب والإفلات، التحديد المتعدد عبر نطاقات كبيرة</li>
<li><strong>عندما تحتاج كل العناصر في DOM</strong>: بعض مكتبات الطرف الثالث تتوقع وجود كل العناصر</li>
<li><strong>المحتوى الحرج لمحركات البحث</strong>: لا تستطيع محركات البحث فهرسة المحتوى الافتراضي</li>
</ul>
<h2 id="الخطوات-التالية">الخطوات التالية</h2>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
