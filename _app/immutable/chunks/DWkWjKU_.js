const t="patterns-dev",n="react",e="أنماط React وNext.js",s="compound-pattern",l="النمط المركّب",o=[{depth:2,id:"واجهة-السياق-context-api",text:"واجهة السياق (Context API)"},{depth:2,id:"reactchildrenmap",text:"React.Children.map"},{depth:2,id:"المميزات",text:"المميزات"},{depth:2,id:"العيوب",text:"العيوب"},{depth:2,id:"المراجع",text:"المراجع"}],a=`<p>في تطبيقنا، لدينا غالبًا مكوّنات (components) تخصّ بعضها بعضًا. فهي تعتمد على بعضها عبر الحالة (state) المشتركة، وتتشارك المنطق معًا. ونرى هذا غالبًا في مكوّنات مثل <code>select</code>، ومكوّنات القوائم المنسدلة (dropdown)، أو عناصر القوائم. يتيح لك <strong>نمط المكوّنات المركّبة (compound component pattern)</strong> إنشاء مكوّنات تعمل جميعها معًا لإنجاز مهمة واحدة.</p>
<h2 id="واجهة-السياق-context-api">واجهة السياق (Context API)</h2>
<p>لننظر إلى مثال: لدينا قائمة من صور سنجاب! إلى جانب عرض صور السنجاب فقط، نريد إضافة زر يتيح للمستخدم تحرير الصورة أو حذفها. يمكننا تنفيذ مكوّن <code>FlyOut</code> يعرض قائمة عندما يبدّل المستخدم حالة المكوّن.</p>
<p>داخل مكوّن <code>FlyOut</code> لدينا أساسًا ثلاثة أشياء:</p>
<ul>
<li>غلاف <code>FlyOut</code>، الذي يحتوي زر التبديل والقائمة</li>
<li>زر <code>Toggle</code>، الذي يبدّل حالة <code>List</code></li>
<li><code>List</code>، التي تحتوي على قائمة عناصر القائمة</li>
</ul>
<p>استخدام نمط المكوّنات المركّبة مع <a href="https://reactjs.org/docs/context.html">واجهة Context API في React</a> مثالي لهذا المثال!</p>
<p>أولًا، لنُنشئ مكوّن <code>FlyOut</code>. هذا المكوّن يحتفظ بالحالة، ويُعيد <code>FlyOutProvider</code> يحمل قيمة التبديل إلى كل الأبناء الذين يتلقاهم.</p>
<pre><code>const FlyOutContext = createContext();

function FlyOut(props) {
  const [open, toggle] = useState(false);

  return (
    &lt;FlyOutContext.Provider value={{ open, toggle }}&gt;
      {props.children}
    &lt;/FlyOutContext.Provider&gt;
  );
}
</code></pre>
<p>لدينا الآن مكوّن <code>FlyOut</code> ذو حالة يمرّر قيمتَي <code>open</code> و<code>toggle</code> إلى أبنائه!</p>
<p>لنُنشئ الآن مكوّن <code>Toggle</code>. هذا المكوّن يعرض ببساطة العنصر الذي يمكن للمستخدم النقر عليه لتبديل حالة القائمة.</p>
<pre><code>function Toggle() {
  const { open, toggle } = useContext(FlyOutContext);

  return (
    &lt;div onClick={() =&gt; toggle(!open)}&gt;
      &lt;Icon /&gt;
    &lt;/div&gt;
  );
}
</code></pre>
<p>ولكي نمنح <code>Toggle</code> فعليًا وصولًا إلى مزوّد <code>FlyOutContext</code>، علينا عرضه كابن للمكوّن <code>FlyOut</code>! -<em>يمكننا</em> ببساطة عرضه كابن للمكوّن. لكن يمكننا أيضًا جعل المكوّن <code>Toggle</code> خاصية (property) من المكوّن <code>FlyOut</code>!*</p>
<pre><code>const FlyOutContext = createContext();

function FlyOut(props) {
  const [open, toggle] = useState(false);

  return (
    &lt;FlyOutContext.Provider value={{ open, toggle }}&gt;
      {props.children}
    &lt;/FlyOutContext.Provider&gt;
  );
}

function Toggle() {
  const { open, toggle } = useContext(FlyOutContext);

  return (
    &lt;div onClick={() =&gt; toggle(!open)}&gt;
      &lt;Icon /&gt;
    &lt;/div&gt;
  );
}

FlyOut.Toggle = Toggle;
</code></pre>
<p>هذا يعني أنه إذا أردنا استخدام المكوّن <code>FlyOut</code> في أي ملف، فلن نضطر إلا إلى استيراد <code>FlyOut</code>!</p>
<pre><code>import React from &quot;react&quot;;
import { FlyOut } from &quot;./FlyOut&quot;;

export default function FlyoutMenu() {
  return (
    &lt;FlyOut&gt;
      &lt;FlyOut.Toggle /&gt;
    &lt;/FlyOut&gt;
  );
}
</code></pre>
<p>مجرد زر تبديل لا يكفي. نحتاج أيضًا إلى <code>List</code> تحتوي على عناصر قائمة، تُفتح وتُغلق بناءً على قيمة <code>open</code>.</p>
<pre><code>function List({ children }) {
  const { open } = React.useContext(FlyOutContext);
  return open &amp;&amp; &lt;ul&gt;{children}&lt;/ul&gt;;
}

function Item({ children }) {
  return &lt;li&gt;{children}&lt;/li&gt;;
}
</code></pre>
<p>يعرض مكوّن <code>List</code> أبناءه بناءً على ما إذا كانت قيمة <code>open</code> هي <code>true</code> أو <code>false</code>. لنجعل <code>List</code> و<code>Item</code> خاصيتين من المكوّن <code>FlyOut</code>، تمامًا كما فعلنا مع المكوّن <code>Toggle</code>.</p>
<pre><code>const FlyOutContext = createContext();

function FlyOut(props) {
  const [open, toggle] = useState(false);

  return (
    &lt;FlyOutContext.Provider value={{ open, toggle }}&gt;
      {props.children}
    &lt;/FlyOutContext.Provider&gt;
  );
}

function Toggle() {
  const { open, toggle } = useContext(FlyOutContext);

  return (
    &lt;div onClick={() =&gt; toggle(!open)}&gt;
      &lt;Icon /&gt;
    &lt;/div&gt;
  );
}

function List({ children }) {
  const { open } = React.useContext(FlyOutContext);
  return open &amp;&amp; &lt;ul&gt;{children}&lt;/ul&gt;;
}

function Item({ children }) {
  return &lt;li&gt;{children}&lt;/li&gt;;
}

FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;
</code></pre>
<p>يمكننا الآن استخدامها كخصائص على المكوّن <code>FlyOut</code>! وفي حالتنا هذه نريد عرض خيارين للمستخدم: <strong>تعديل (Edit)</strong> و<strong>حذف (Delete)</strong>. لنُنشئ <code>FlyOut.List</code> يعرض مكوّنَي <code>FlyOut.Item</code>، أحدهما لخيار <strong>تعديل (Edit)</strong> والآخر لخيار <strong>حذف (Delete)</strong>.</p>
<pre><code>import React from &quot;react&quot;;
import { FlyOut } from &quot;./FlyOut&quot;;

export default function FlyoutMenu() {
  return (
    &lt;FlyOut&gt;
      &lt;FlyOut.Toggle /&gt;
      &lt;FlyOut.List&gt;
        &lt;FlyOut.Item&gt;Edit&lt;/FlyOut.Item&gt;
        &lt;FlyOut.Item&gt;Delete&lt;/FlyOut.Item&gt;
      &lt;/FlyOut.List&gt;
    &lt;/FlyOut&gt;
  );
}
</code></pre>
<p>ممتاز! لقد أنشأنا للتو مكوّن <code>FlyOut</code> كاملًا من دون إضافة أي حالة (state) في <code>FlyOutMenu</code> نفسه!</p>
<p>JavaScript iconindex.jsJavaScript iconFlyOut.jsJavaScript iconFlyoutMenu.jsJavaScript iconImages.js</p>
<pre><code>import React from &quot;react&quot;;
import &quot;./styles.css&quot;;
import { FlyOut } from &quot;./FlyOut&quot;;


export default function FlyoutMenu() {
  return (
    &lt;FlyOut&gt;
      &lt;FlyOut.Toggle /&gt;
      &lt;FlyOut.List&gt;
        &lt;FlyOut.Item&gt;Edit&lt;/FlyOut.Item&gt;
        &lt;FlyOut.Item&gt;Delete&lt;/FlyOut.Item&gt;
      &lt;/FlyOut.List&gt;
    &lt;/FlyOut&gt;
  );
}
</code></pre>
<p><a href="https://codesandbox.io/embed/provider-pattern-2-ck29r">افتح CodeSandbox</a></p>
<p>النمط المركّب ممتاز عندما تبني مكتبة مكوّنات. وسترى هذا النمط كثيرًا عند استخدام مكتبات واجهة المستخدم مثل <a href="https://react.semantic-ui.com/modules/dropdown/#types-dropdown">Semantic UI</a>.</p>
<h2 id="reactchildrenmap"><a href="https://reactjs.org/docs/react-api.html#reactchildrenmap"><code>React.Children.map</code></a></h2>
<p>يمكننا أيضًا تنفيذ نمط المكوّنات المركّبة عبر المرور على أبناء المكوّن (mapping over). يمكننا إضافة قيمتَي <code>open</code> و<code>toggle</code> إلى هذه العناصر، عبر <a href="https://reactjs.org/docs/react-api.html#cloneelement">استنساخها (cloning)</a> مع الخصائص (props) الإضافية.</p>
<pre><code>export function FlyOut(props) {
  const [open, toggle] = React.useState(false);

  return (
    &lt;div&gt;
      {React.Children.map(props.children, (child) =&gt;
        React.cloneElement(child, { open, toggle })
      )}
    &lt;/div&gt;
  );
}
</code></pre>
<p>يتم استنساخ جميع المكوّنات الفرعية، ويُمرَّر إليها قيمتا <code>open</code> و<code>toggle</code>. وبدلًا من الحاجة إلى استخدام واجهة Context API كما في المثال السابق، أصبح بإمكاننا الوصول إلى هاتين القيمتين عبر <code>props</code>.</p>
<p>JavaScript iconindex.jsJavaScript iconFlyOut.jsJavaScript iconFlyoutMenu.jsJavaScript iconImages.js</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">Icon</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./Icon&quot;</span>;


<span class="hljs-keyword">const</span> <span class="hljs-title class_">FlyOutContext</span> = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">createContext</span>();


<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">FlyOut</span>(<span class="hljs-params">props</span>) {
  <span class="hljs-keyword">const</span> [open, toggle] = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);


  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {React.Children.map(props.children, child =&gt;
        React.cloneElement(child, { open, toggle })
      )}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}


<span class="hljs-keyword">function</span> <span class="hljs-title function_">Toggle</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { open, toggle } = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">FlyOutContext</span>);


  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flyout-btn&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> toggle(!open)}&gt;
      <span class="hljs-tag">&lt;<span class="hljs-name">Icon</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}


<span class="hljs-keyword">function</span> <span class="hljs-title function_">List</span>(<span class="hljs-params">{ children }</span>) {
  <span class="hljs-keyword">const</span> { open } = <span class="hljs-title class_">React</span>.<span class="hljs-title function_">useContext</span>(<span class="hljs-title class_">FlyOutContext</span>);
  <span class="hljs-keyword">return</span> open &amp;&amp; <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flyout-list&quot;</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>;
}


<span class="hljs-keyword">function</span> <span class="hljs-title function_">Item</span>(<span class="hljs-params">{ children }</span>) {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;flyout-item&quot;</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>;
}


<span class="hljs-title class_">FlyOut</span>.<span class="hljs-property">Toggle</span> = <span class="hljs-title class_">Toggle</span>;
<span class="hljs-title class_">FlyOut</span>.<span class="hljs-property">List</span> = <span class="hljs-title class_">List</span>;
<span class="hljs-title class_">FlyOut</span>.<span class="hljs-property">Item</span> = <span class="hljs-title class_">Item</span>;
</code></pre>
<p><a href="https://codesandbox.io/embed/provider-pattern-2-j9l1k">افتح CodeSandbox</a></p>
<h2 id="المميزات">المميزات</h2>
<p>تدير المكوّنات المركّبة حالتها الداخلية الخاصة، وتشاركها بين عدة مكوّنات فرعية. وعندما ننفّذ مكوّنًا مركّبًا، لا نضطر للقلق بشأن إدارة الحالة بأنفسنا.</p>
<p>وعند استيراد مكوّن مركّب، لا نضطر إلى استيراد المكوّنات الفرعية المتاحة على ذلك المكوّن بشكل صريح.</p>
<blockquote>
<p><strong>ملاحظة (React 18+):</strong> يظل نمط المكوّنات المركّبة باستخدام واجهة Context API في React نمطًا <strong>موصى به</strong> للمكوّنات المرتبطة التي تتشارك الحالة. والتنفيذ باستخدام الخطّافات (Hooks) (<code>useState</code>، <code>useContext</code>) حديث ويتوافق مع أفضل الممارسات الحالية. وعند استخدام السياق، تجنّب عمليات إعادة العرض (re-render) غير الضرورية بعدم إعادة إنشاء قيم السياق في كل عرض. وفي السيناريوهات المعقدة، يمكنك تحسين الأداء عبر التخزين المؤقت (memoization) لقيمة السياق أو عبر تقسيم السياق (مثلًا: سياق للقيمة المنطقية <code>open</code> وآخر لدالة <code>toggle</code>). والنمط متوافق تمامًا مع ميزات React القادمة مثل مكوّنات الخادم (Server Components) — يكفي فقط أن تكون مزوّدات السياق والمستهلكون جميعها إمّا مكوّنات خادم أو مكوّنات عميل حسب الحاجة.</p>
</blockquote>
<pre><code>import { FlyOut } from &quot;./FlyOut&quot;;

export default function FlyoutMenu() {
  return (
    &lt;FlyOut&gt;
      &lt;FlyOut.Toggle /&gt;
      &lt;FlyOut.List&gt;
        &lt;FlyOut.Item&gt;Edit&lt;/FlyOut.Item&gt;
        &lt;FlyOut.Item&gt;Delete&lt;/FlyOut.Item&gt;
      &lt;/FlyOut.List&gt;
    &lt;/FlyOut&gt;
  );
}
</code></pre>
<h2 id="العيوب">العيوب</h2>
<p>عند استخدام <code>React.Children.map</code> لتوفير القيم، يصبح تداخل المكوّنات محدودًا. فالأبناء <em>المباشرة</em> فقط للمكوّن الأب هي التي ستحصل على الخصائص <code>open</code> و<code>toggle</code>، ما يعني أننا لا يمكننا تغليف أي من هذه المكوّنات داخل مكوّن آخر.</p>
<pre><code>export default function FlyoutMenu() {
  return (
    &lt;FlyOut&gt;
      {/* This breaks */}
      &lt;div&gt;
        &lt;FlyOut.Toggle /&gt;
        &lt;FlyOut.List&gt;
          &lt;FlyOut.Item&gt;Edit&lt;/FlyOut.Item&gt;
          &lt;FlyOut.Item&gt;Delete&lt;/FlyOut.Item&gt;
        &lt;/FlyOut.List&gt;
      &lt;/div&gt;
    &lt;/FlyOut&gt;
  );
}
</code></pre>
<p>استنساخ عنصر عبر <code>React.cloneElement</code> يقوم بدمج سطحي. فالخصائص الموجودة أصلًا ستُدمج مع الخصائص الجديدة التي نمرّرها. وقد ينتهي هذا إلى تعارض في التسمية إذا كانت خاصية موجودة بالفعل تحمل الاسم نفسه مثل الخصائص التي نمرّرها إلى الدالة <code>React.cloneElement</code>. وبما أن الدمج سطحي، فإن قيمة تلك الخاصية ستُستبدل بأحدث قيمة نمرّرها.</p>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://reactjs.org/docs/render-props.htm">Render Props - React</a></li>
<li><a href="https://kentcdodds.com/blog/compound-components-with-react-hooks">React Hooks: Compound Components - Kent C. Dodds</a></li>
</ul>
`,c={book:t,chapter:n,chapterTitle:e,slug:s,title:l,headings:o,html:a};export{t as book,n as chapter,e as chapterTitle,c as default,o as headings,a as html,s as slug,l as title};
