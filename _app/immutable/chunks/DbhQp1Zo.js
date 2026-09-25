const s="patterns-dev",n="react",a="أنماط React وNext.js",t="hooks-pattern",e="نمط الخطافات (Hooks Pattern)",l=[{depth:2,id:"لماذا-أعادت-الخطافات-تشكيل-react",text:"لماذا أعادت الخطافات تشكيل React"},{depth:2,id:"القاعدةان-اللتان-تحكمان-كل-خطاف",text:"القاعدةان اللتان تحكمان كل خطاف"},{depth:2,id:"الخطافات-المدمجة-مصنفة",text:"الخطافات المدمجة، مصنّفة"},{depth:2,id:"الحالة-من-دون-أصناف",text:"الحالة من دون أصناف"},{depth:2,id:"الآثار-ولماذا-لا-ينبغي-لأن-تكون-معظم-الآثار-آثارا",text:"الآثار، ولماذا لا ينبغي لأن تكون معظم «الآثار» آثارًا"},{depth:2,id:"الخطافات-المخصصة-حيث-يستحق-النمط-مكانه",text:"الخطافات المخصصة: حيث يستحق النمط مكانه"},{depth:3,id:"uselocalstorage",text:"useLocalStorage"},{depth:3,id:"usemediaquery",text:"useMediaQuery"},{depth:2,id:"react-19-خطافات-للعمل-غير-المتزامن-والنماذج-والإجراءات",text:"React 19: خطافات للعمل غير المتزامن والنماذج والإجراءات"},{depth:3,id:"use-قراءة-الوعود-والسياق-بشكل-شرطي",text:"use() — قراءة الوعود والسياق بشكل شرطي"},{depth:3,id:"useactionstate-إدارة-حالة-إرسال-النموذج",text:"useActionState — إدارة حالة إرسال النموذج"},{depth:3,id:"useformstatus-قراءة-حالة-إرسال-النموذج-الأصل",text:"useFormStatus — قراءة حالة إرسال النموذج الأصل"},{depth:3,id:"useoptimistic-تحديث-متفائل-optimistic-update-وواجهة-فورية-قبل-تأكيد-الخادم",text:"useOptimistic — تحديث متفائل (optimistic update) وواجهة فورية قبل تأكيد الخادم"},{depth:2,id:"مصرف-react-ونهاية-التخزين-المؤقت-memoization-اليدوي",text:"مصرّف React ونهاية التخزين المؤقت (memoization) اليدوي"},{depth:2,id:"إعادة-هيكلة-عملية-من-الأصناف-إلى-الخطافات",text:"إعادة هيكلة عملية: من الأصناف إلى الخطافات"},{depth:2,id:"المفاضلات-والمخاطر",text:"المفاضلات والمخاطر"},{depth:2,id:"ما-ينبغي-تذكره",text:"ما ينبغي تذكّره"},{depth:2,id:"المراجع",text:"المراجع"}],p=`<h2 id="لماذا-أعادت-الخطافات-تشكيل-react">لماذا أعادت الخطافات تشكيل React</h2>
<p>عندما أطلقت React 16.8 الخطافات في مطلع عام 2019، أنهت بهدوء معظم أنماط التصميم التي كان مطوّرو React يتجادلون بشأنها لسنوات. المكوّنات من رتبة عليا (higher-order components)، وخصائص العرض (render props)، والخلط، وفصل الحاوية/العرضية (container/presentational)، جميعها وُجدت أساسًا للإجابة عن سؤال واحد: <em>كيف أشارك منطقًا ذا حالة بين المكوّنات من دون إعادة كتابته؟</em></p>
<p>الخطاف مجرد دالة. يمكنه الاحتفاظ بالحالة (state)، وتشغيل الآثار الجانبية (side effects)، وقراءة السياق، والاشتراك في مخازن خارجية. تستدعي المكوّنات الخطافات، وتستدعي الخطافات خطافات أخرى. لا يوجد مكوّن غلاف، ولا عقدة إضافية في الشجرة، ولا ربط بـ<code>this</code>، ولا دمج ضمني للخصائص. هذه البساطة المضللة هي جوهر القصة كلها.</p>
<p>انتقلت الخطافات الآن من كونها «الأمر الجديد» إلى كونها «الطريقة الوحيدة التي تُكتب بها معظم شيفرة React». أضافت React 19، التي أُطلقت في ديسمبر 2024، عدة خطافات جديدة إلى هذا النموذج، هي <code>use</code> و<code>useOptimistic</code> و<code>useActionState</code> و<code>useFormStatus</code>، تعتمد على Suspense وActions للتعامل مع العمل غير المتزامن الذي كان يتطلب سابقًا مكتبة حالة.</p>
<p>تغطي هذه المقالة الخطافات الأساسية التي ستستخدمها كل يوم، والقواعد التي تحكمها، وإضافات React 19، والأنماط التي تظهر عندما تبدأ في تركيب خطافاتك الخاصة.</p>
<h2 id="القاعدةان-اللتان-تحكمان-كل-خطاف">القاعدةان اللتان تحكمان كل خطاف</h2>
<p>قبل أي واجهة برمجية، القواعد. كلتاهما مفروضة بواسطة حزمة <a href="https://www.npmjs.com/package/eslint-plugin-react-hooks"><code>eslint-plugin-react-hooks</code></a>، فثبّتها منذ اليوم الأول.</p>
<ul>
<li><strong>استدع الخطافات في المستوى الأعلى فقط.</strong> لا تستدعها أبدًا داخل الحلقات أو الشروط أو الدوال المتداخلة. يتعرّف React على كل استدعاء خطاف من خلال <em>موضعه</em> في ترتيب الاستدعاءات، لذا يجب أن يبقى هذا الترتيب ثابتًا عبر عمليات العرض.</li>
<li><strong>استدع الخطافات من دوال React فقط.</strong> أي المكوّنات (<code>function MyComponent()</code>) أو الخطافات الأخرى (<code>function useMyThing()</code>). لا يمكن لدالة مساعدة عادية أن تستدعي <code>useState</code>.</li>
</ul>
<p>ينتج عن القاعدة 2 عرفٌ استخدام: يجب أن تبدأ أي دالة تستدعي الخطافات بـ<code>use</code>. ويستخدم المدقّق (linter) هذه البادئة ليعرف القواعد التي تنطبق.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Allowed: hook calling a hook</span>

<span class="hljs-keyword">function</span> <span class="hljs-title function_">useDarkMode</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> [isDark, setIsDark] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);

<span class="hljs-comment">// ...</span>

}

<span class="hljs-comment">// NOT allowed: condition wraps the hook</span>

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Avatar</span>(<span class="hljs-params">{ user }</span>) {

<span class="hljs-keyword">if</span> (user) {

<span class="hljs-keyword">const</span> [hovered, setHovered] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>); <span class="hljs-comment">// breaks rule 1</span>

}

}
</code></pre>
<h2 id="الخطافات-المدمجة-مصنفة">الخطافات المدمجة، مصنّفة</h2>
<p>يوجد من الخطافات المدمجة عدد أكبر مما يتذكره معظم الناس. وييسّر تصنيفها حسب الغرض استخدامها:</p>
<table>
<thead>
<tr>
<th>الغرض</th>
<th>الخطافات</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>الحالة</strong></td>
<td><code>useState</code> و<code>useReducer</code></td>
</tr>
<tr>
<td><strong>الآثار ودورة الحياة</strong></td>
<td><code>useEffect</code> و<code>useLayoutEffect</code> و<code>useInsertionEffect</code></td>
</tr>
<tr>
<td><strong>السياق</strong></td>
<td><code>useContext</code> و<code>use</code> (React 19)</td>
</tr>
<tr>
<td><strong>المراجع وDOM</strong></td>
<td><code>useRef</code> و<code>useImperativeHandle</code></td>
</tr>
<tr>
<td><strong>الأداء</strong></td>
<td><code>useMemo</code> و<code>useCallback</code> و<code>useTransition</code> و<code>useDeferredValue</code></td>
</tr>
<tr>
<td><strong>المخازن الخارجية</strong></td>
<td><code>useSyncExternalStore</code> و<code>useDebugValue</code></td>
</tr>
<tr>
<td><strong>النماذج والإجراءات (React 19)</strong></td>
<td><code>useActionState</code> و<code>useFormStatus</code> و<code>useOptimistic</code></td>
</tr>
<tr>
<td><strong>المعرّفات</strong></td>
<td><code>useId</code></td>
</tr>
</tbody>
</table>
<p>ربما تستخدم أربعة منها فقط في يوم عمل معيّن، وهي <code>useState</code> و<code>useEffect</code> و<code>useRef</code> وواحد من خطافات النماذج في React 19. أما البقية فموجودة لحل مشكلات محددة؛ فاستخدمها عند مواجهة تلك المشكلات.</p>
<h2 id="الحالة-من-دون-أصناف">الحالة من دون أصناف</h2>
<p>إضافة الحالة إلى مكوّن دالي سطران: ثنائي مُفكك بالقيمة الأولية.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Counter</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setCount((c) =&gt; c + 1)}&gt;

Clicked {count} times

<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>

);

}
</code></pre>
<p>هناك تفصيلان يستحقان الذكر:</p>
<ul>
<li><strong>مرّر دالة تحديث عندما تعتمد الحالة الجديدة على القديمة.</strong> <code>setCount((c) =&gt; c + 1)</code> آمن مع التجميع التلقائي في React؛ أما <code>setCount(count + 1)</code> فليست آمنة.</li>
<li><strong>يمكن حساب القيم الأولية بشيء من الكسل.</strong> مرّر دالة، مثل <code>useState(() =&gt; expensiveDefault())</code>، عندما تكون عملية حساب القيمة الأولية نفسها مكلفة. لا يستدعيها React إلا عند العرض الأول.</li>
</ul>
<p>للحالة التي تحتوي على قيم فرعية متعددة تُحدَّث معًا، فضّل <code>useReducer</code>. يجمع المُقلِّص (reducer) جميع الانتقالات في مكان واحد ويجعل اختبارها مباشرًا:</p>
<pre><code class="language-javascript">type <span class="hljs-title class_">State</span> = { <span class="hljs-attr">status</span>: <span class="hljs-string">&quot;idle&quot;</span> | <span class="hljs-string">&quot;loading&quot;</span> | <span class="hljs-string">&quot;ok&quot;</span> | <span class="hljs-string">&quot;error&quot;</span>; data?: <span class="hljs-title class_">Order</span>[]; error?: <span class="hljs-title class_">Error</span> };

type <span class="hljs-title class_">Action</span> =

| { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;fetch&quot;</span> }

| { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;success&quot;</span>; <span class="hljs-attr">data</span>: <span class="hljs-title class_">Order</span>[] }

| { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;failure&quot;</span>; <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> };

<span class="hljs-keyword">function</span> <span class="hljs-title function_">reducer</span>(<span class="hljs-params">state: State, action: Action</span>): <span class="hljs-title class_">State</span> {

<span class="hljs-keyword">switch</span> (action.<span class="hljs-property">type</span>) {

<span class="hljs-keyword">case</span> <span class="hljs-string">&quot;fetch&quot;</span>:   <span class="hljs-keyword">return</span> { <span class="hljs-attr">status</span>: <span class="hljs-string">&quot;loading&quot;</span> };

<span class="hljs-keyword">case</span> <span class="hljs-string">&quot;success&quot;</span>: <span class="hljs-keyword">return</span> { <span class="hljs-attr">status</span>: <span class="hljs-string">&quot;ok&quot;</span>, <span class="hljs-attr">data</span>: action.<span class="hljs-property">data</span> };

<span class="hljs-keyword">case</span> <span class="hljs-string">&quot;failure&quot;</span>: <span class="hljs-keyword">return</span> { <span class="hljs-attr">status</span>: <span class="hljs-string">&quot;error&quot;</span>, <span class="hljs-attr">error</span>: action.<span class="hljs-property">error</span> };

}

}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Orders</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> [state, dispatch] = <span class="hljs-title function_">useReducer</span>(reducer, { <span class="hljs-attr">status</span>: <span class="hljs-string">&quot;idle&quot;</span> });

<span class="hljs-comment">// ...</span>

}
</code></pre>
<h2 id="الآثار-ولماذا-لا-ينبغي-لأن-تكون-معظم-الآثار-آثارا">الآثار، ولماذا لا ينبغي لأن تكون معظم «الآثار» آثارًا</h2>
<p>يمثّل <code>useEffect</code> مخرجًا للتعامل مع العالم <em>خارج</em> React: الاشتراكات، وواجهات المتصفح، وتسجيل الشبكة، وقياسات DOM اليدوية. وتؤكد وثائق React على هذا بصراحة:</p>
<blockquote>
<p>إذا لم يكن هناك نظام خارجي، فلا ينبغي أن تحتاج إلى تأثير. إزالة الآثار غير الضرورية تجعل شيفرتك أسهل في القراءة، وأسرع في التنفيذ، وأقل عرضة للأخطاء. — <a href="https://react.dev/learn/you-might-not-need-an-effect">react.dev — <em>ربما لا تحتاج إلى Effect</em></a></p>
</blockquote>
<p>فيما يلي بعض أكثر إساءات الاستخدام شيوعًا، مع طرائق لإصلاحها:</p>
<p><strong>1. حساب حالة مشتقة في Effect.</strong></p>
<pre><code class="language-javascript"><span class="hljs-comment">// Anti-pattern</span>

<span class="hljs-keyword">const</span> [fullName, setFullName] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&quot;&quot;</span>);

<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {

<span class="hljs-title function_">setFullName</span>(<span class="hljs-string">\`<span class="hljs-subst">\${first}</span> <span class="hljs-subst">\${last}</span>\`</span>);

}, [first, last]);

<span class="hljs-comment">// Fix: just compute it</span>

<span class="hljs-keyword">const</span> fullName = <span class="hljs-string">\`<span class="hljs-subst">\${first}</span> <span class="hljs-subst">\${last}</span>\`</span>;
</code></pre>
<p><strong>2. إعادة تعيين الحالة عند تغيّر خاصية.</strong></p>
<pre><code class="language-javascript"><span class="hljs-comment">// Anti-pattern: extra render after every prop change</span>

<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {

<span class="hljs-title function_">setSelection</span>(<span class="hljs-literal">null</span>);

}, [list]);

<span class="hljs-comment">// Fix: use a \`key\` to remount the subtree, or store derived state with the prop value</span>
</code></pre>
<p><strong>3. معالجة أحداث المستخدم.</strong></p>
<pre><code class="language-javascript"><span class="hljs-comment">// Anti-pattern: an effect that &quot;watches&quot; a form submission</span>

<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {

<span class="hljs-keyword">if</span> (justSubmitted) <span class="hljs-title function_">postOrder</span>(values);

}, [justSubmitted]);

<span class="hljs-comment">// Fix: do the work in the event handler itself</span>

<span class="hljs-keyword">const</span> <span class="hljs-title function_">onSubmit</span> = (<span class="hljs-params">e</span>) =&gt; {

e.<span class="hljs-title function_">preventDefault</span>();

<span class="hljs-title function_">postOrder</span>(values);

};
</code></pre>
<p>عندما <em>تحتاج فعلًا</em> إلى تأثير، يكون شكله شبه مطابق دائمًا: اشترك في جسم الدالة، ثم أعد دالة تنظيف.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {

<span class="hljs-keyword">const</span> id = <span class="hljs-built_in">setInterval</span>(tick, <span class="hljs-number">1000</span>);

<span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearInterval</span>(id);

}, []);
</code></pre>
<p>مصفوفة الاعتماديات ليست زينة اختيارية. كل ما تقرأه داخل التأثير ويأتي من الخصائص أو الحالة أو السياق يجب أن يظهر فيها، وإلا حصلت على إغلاق قديم (stale closures). وسيخبرك المدقّق بما ينقص منها.</p>
<h2 id="الخطافات-المخصصة-حيث-يستحق-النمط-مكانه">الخطافات المخصصة: حيث يستحق النمط مكانه</h2>
<p>الغرض من الخطافات ليس <code>useState</code>؛ بل القدرة على استخراج أي منطق ذي حالة إلى دالة وإعادة استخدامه. الخطاف المخصص مجرد دالة يبدأ اسمها بـ<code>use</code> ويُسمح له باستدعاء خطافات أخرى.</p>
<p>مثالان يستحقان مكانهما في كل قاعدة شيفرة تقريبًا.</p>
<h3 id="uselocalstorage"><code>useLocalStorage</code></h3>
<p>انسخ جزءًا من الحالة إلى <code>localStorage</code> بحيث يبقى بعد إعادة تحميل الصفحة.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { useEffect, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> useLocalStorage&lt;T&gt;(<span class="hljs-attr">key</span>: string, <span class="hljs-attr">initial</span>: T) {

<span class="hljs-keyword">const</span> [value, setValue] = useState&lt;T&gt;(<span class="hljs-function">() =&gt;</span> {

<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-variable language_">window</span> === <span class="hljs-string">&quot;undefined&quot;</span>) <span class="hljs-keyword">return</span> initial; <span class="hljs-comment">// SSR-safe</span>

<span class="hljs-keyword">const</span> stored = <span class="hljs-variable language_">window</span>.<span class="hljs-property">localStorage</span>.<span class="hljs-title function_">getItem</span>(key);

<span class="hljs-keyword">return</span> stored !== <span class="hljs-literal">null</span> ? (<span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(stored) <span class="hljs-keyword">as</span> T) : initial;

});

<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {

<span class="hljs-variable language_">window</span>.<span class="hljs-property">localStorage</span>.<span class="hljs-title function_">setItem</span>(key, <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(value));

}, [key, value]);

<span class="hljs-keyword">return</span> [value, setValue] <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;

}
</code></pre>
<p>يقرأ استخدامُه تمامًا مثل <code>useState</code>:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ThemeToggle</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> [theme, setTheme] = useLocalStorage&lt;<span class="hljs-string">&quot;light&quot;</span> | <span class="hljs-string">&quot;dark&quot;</span>&gt;(<span class="hljs-string">&quot;theme&quot;</span>, <span class="hljs-string">&quot;light&quot;</span>);

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setTheme(theme === &quot;light&quot; ? &quot;dark&quot; : &quot;light&quot;)}&gt;

Switch to {theme === &quot;light&quot; ? &quot;dark&quot; : &quot;light&quot;} mode

<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>

);

}
</code></pre>
<blockquote>
<p><strong>هل ستنشر هذا؟</strong> اشترك في حدث <code>&quot;storage&quot;</code> الخاص بـ<code>window</code> لمزامنة عدة تبويبات مفتوحة، وفكّر في استخدام <a href="https://react.dev/reference/react/useSyncExternalStore"><code>useSyncExternalStore</code></a> بدلًا من الثنائي اليدوي <code>useState</code> + <code>useEffect</code>. صُمّم هذا الخطاف تحديدًا للحالات التي «تعكس فيها هذا الشيء الخارجي في React».</p>
</blockquote>
<h3 id="usemediaquery"><code>useMediaQuery</code></h3>
<p>اعرض فروعًا مبنية على استعلام وسائط CSS. وهو مفيد للتكيّف مع تفضيلات المستخدم مثل <code>prefers-reduced-motion</code> أو <code>prefers-color-scheme</code>.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { useEffect, useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useMediaQuery</span>(<span class="hljs-params">query: string</span>) {

<span class="hljs-keyword">const</span> [matches, setMatches] = <span class="hljs-title function_">useState</span>(<span class="hljs-function">() =&gt;</span>

<span class="hljs-keyword">typeof</span> <span class="hljs-variable language_">window</span> === <span class="hljs-string">&quot;undefined&quot;</span> ? <span class="hljs-literal">false</span> : <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">matchMedia</span>(query).<span class="hljs-property">matches</span>,

);

<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {

<span class="hljs-keyword">const</span> mql = <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">matchMedia</span>(query);

<span class="hljs-keyword">const</span> <span class="hljs-title function_">onChange</span> = (<span class="hljs-params">e: MediaQueryListEvent</span>) =&gt; <span class="hljs-title function_">setMatches</span>(e.<span class="hljs-property">matches</span>);

mql.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;change&quot;</span>, onChange);

<span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> mql.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&quot;change&quot;</span>, onChange);

}, [query]);

<span class="hljs-keyword">return</span> matches;

}

<span class="hljs-comment">// Usage</span>

<span class="hljs-keyword">function</span> <span class="hljs-title function_">MotionAwareIntro</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> reduceMotion = <span class="hljs-title function_">useMediaQuery</span>(<span class="hljs-string">&quot;(prefers-reduced-motion: reduce)&quot;</span>);

<span class="hljs-keyword">return</span> reduceMotion ? <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">StaticHero</span> /&gt;</span></span> : <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AnimatedHero</span> /&gt;</span></span>;

}
</code></pre>
<p>هناك خطافات أخرى يسعدك أن تكون في متناول اليد: <code>useDebounce</code> و<code>useOnlineStatus</code> و<code>useClipboard</code> و<code>usePrevious</code> و<code>useIntersectionObserver</code>. بدلًا من كتابتها جميعًا بنفسك، تصفّح مجموعة مختارة:</p>
<ul>
<li><a href="https://usehooks-ts.com/"><code>usehooks-ts</code></a> — يقدّم TypeScript أولًا ومختبرًا جيدًا</li>
<li><a href="https://github.com/streamich/react-use"><code>react-use</code></a> — مكتبة كبيرة تضم أدوات متنوعة</li>
<li><a href="https://usehooks.com/"><code>usehooks.com</code></a> — وصفات جاهزة للنسخ واللصق</li>
</ul>
<h2 id="react-19-خطافات-للعمل-غير-المتزامن-والنماذج-والإجراءات">React 19: خطافات للعمل غير المتزامن والنماذج والإجراءات</h2>
<p>تقدّم React 19 (المستقرة منذ ديسمبر 2024) عدة خطافات تغيّر طريقة تعاملك مع العمل غير المتزامن والنماذج. صُمّمت للعمل مع <strong>Actions</strong>، أي الدوال غير المتزامنة التي تمرّرها مباشرةً إلى \`\` أو تستدعيها من انتقال (transition).</p>
<h3 id="use-قراءة-الوعود-والسياق-بشكل-شرطي"><code>use()</code> — قراءة الوعود والسياق بشكل شرطي</h3>
<p><code>use</code> دالة خاصة (لا تخضع لقاعدة «عدم استدعاء الخطافات بشروط» عند فك تغليف وعد) تعلّق التنفيذ حتى يُحلّ الوعد، ثم تعيد قيمته. ويمكنها أيضًا قراءة السياق، لتحل محلّ استدعاءات كثيرة لـ<code>useContext</code>.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { use, <span class="hljs-title class_">Suspense</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">Comments</span>(<span class="hljs-params">{ commentsPromise }: { commentsPromise: <span class="hljs-built_in">Promise</span>&lt;Comment[]&gt; }</span>) {

<span class="hljs-comment">// Suspends here until the promise settles</span>

<span class="hljs-keyword">const</span> comments = <span class="hljs-title function_">use</span>(commentsPromise);

<span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>{comments.map((c) =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{c.id}</span>&gt;</span>{c.text}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>)}<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>;

}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">Post</span>(<span class="hljs-params">{ id }: { id: string }</span>) {

<span class="hljs-keyword">const</span> commentsPromise = <span class="hljs-title function_">fetchComments</span>(id); <span class="hljs-comment">// started during render</span>

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Suspense</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">p</span>&gt;</span>Loading…<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>}&gt;

<span class="hljs-tag">&lt;<span class="hljs-name">Comments</span> <span class="hljs-attr">commentsPromise</span>=<span class="hljs-string">{commentsPromise}</span> /&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">Suspense</span>&gt;</span></span>

);

}
</code></pre>
<p>داخل المكوّنات الخادمية (server components)، يتيح لك <code>use</code> إدخال بيانات غير متزامنة من دون رفعها إلى رحلة ذهاب وإياب منفصلة عبر <code>useEffect</code>.</p>
<h3 id="useactionstate-إدارة-حالة-إرسال-النموذج"><code>useActionState</code> — إدارة حالة إرسال النموذج</h3>
<p>يحل <code>useActionState</code> قدرًا كبيرًا من شيفرة <code>useState</code> المتكررة في النماذج. اقرنه بإجراء غير متزامن ليعيد أحدث نتيجة، وإجراء ملفوفًا، وعلم انتظار.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { useActionState } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">subscribeAction</span>(<span class="hljs-params">_prev: State, formData: FormData</span>) {

<span class="hljs-keyword">const</span> email = formData.<span class="hljs-title function_">get</span>(<span class="hljs-string">&quot;email&quot;</span>) <span class="hljs-keyword">as</span> string;

<span class="hljs-keyword">try</span> {

<span class="hljs-keyword">await</span> <span class="hljs-title function_">subscribe</span>(email);

<span class="hljs-keyword">return</span> { <span class="hljs-attr">ok</span>: <span class="hljs-literal">true</span> } <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;

} <span class="hljs-keyword">catch</span> (err) {

<span class="hljs-keyword">return</span> { <span class="hljs-attr">ok</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">error</span>: (err <span class="hljs-keyword">as</span> <span class="hljs-title class_">Error</span>).<span class="hljs-property">message</span> } <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;

}

}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">NewsletterForm</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> [state, formAction, isPending] = <span class="hljs-title function_">useActionState</span>(subscribeAction, { <span class="hljs-attr">ok</span>: <span class="hljs-literal">false</span> });

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">{formAction}</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;email&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span> <span class="hljs-attr">required</span> /&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{isPending}</span>&gt;</span>

{isPending ? &quot;Subscribing…&quot; : &quot;Subscribe&quot;}

<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

{state.ok &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>You&#x27;re in.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>}

{!state.ok &amp;&amp; &quot;error&quot; in state &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{state.error}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>}

<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>

);

}
</code></pre>
<h3 id="useformstatus-قراءة-حالة-إرسال-النموذج-الأصل"><code>useFormStatus</code> — قراءة حالة إرسال النموذج الأصل</h3>
<p>مفيد داخل زر أو حقل إدخال يحتاج إلى معرفة ما إذا كان النموذج الحيط يُرسل حاليًا، من دون الحاجة إلى تمرير الخصائص إلى أسفل الشجرة.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { useFormStatus } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react-dom&quot;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">SubmitButton</span>(<span class="hljs-params">{ children }: { children: React.ReactNode }</span>) {

<span class="hljs-keyword">const</span> { pending } = <span class="hljs-title function_">useFormStatus</span>();

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span> <span class="hljs-attr">disabled</span>=<span class="hljs-string">{pending}</span> <span class="hljs-attr">aria-busy</span>=<span class="hljs-string">{pending}</span>&gt;</span>

{children}

<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>

);

}
</code></pre>
<h3 id="useoptimistic-تحديث-متفائل-optimistic-update-وواجهة-فورية-قبل-تأكيد-الخادم"><code>useOptimistic</code> — تحديث متفائل (optimistic update) وواجهة فورية قبل تأكيد الخادم</h3>
<p>اعرض النتيجة فورًا، ثم طابقها عندما يصل الاستجابة الحقيقي.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { useOptimistic, useTransition } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">LikeButton</span>(<span class="hljs-params">{ post }: { post: Post }</span>) {

<span class="hljs-keyword">const</span> [optimisticLikes, addOptimistic] = <span class="hljs-title function_">useOptimistic</span>(

post.<span class="hljs-property">likes</span>,

<span class="hljs-function">(<span class="hljs-params">current, delta: number</span>) =&gt;</span> current + delta,

);

<span class="hljs-keyword">const</span> [, startTransition] = <span class="hljs-title function_">useTransition</span>();

<span class="hljs-keyword">return</span> (

<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>

<span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span>

startTransition(async () =&gt; {

addOptimistic(1);

await like(post.id);

})

}

&gt;

{optimisticLikes} likes

<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>

);

}
</code></pre>
<h2 id="مصرف-react-ونهاية-التخزين-المؤقت-memoization-اليدوي">مصرّف React ونهاية التخزين المؤقت (memoization) اليدوي</h2>
<p>طوال سنوات، كانت <code>useMemo</code> و<code>useCallback</code> و<code>React.memo</code> الأدوات القياسية لإبقاء عمليات العرض رخيصة. وهي كذلك مصدر دائم للأخطاء (الإغلاق القديم، والاعتماديات المفقودة) والفوضى (تغليف كل دالة استدعاء بـ<code>useCallback</code> احتياطًا).</p>
<p>يحلل <a href="https://react.dev/learn/react-compiler">مصرّف React</a>، الذي أُطلق مع React 19، مكوّناتك تحليلًا ساكنًا ويدخل التخزين المؤقت المكافئ تلقائيًا. وتوضح الوثائق الرسمية ذلك بصراحة: المصرّف <em>«يتولى التخزين المؤقت نيابةً عنك، مما يلغي الحاجة إلى <code>useMemo</code> و<code>useCallback</code> و<code>React.memo</code> يدويًا»</em> في معظم الحالات.</p>
<p><strong>الآثار العملية:</strong></p>
<ul>
<li><strong>في المشاريع الجديدة مع تفعيل المصرّف،</strong> تخلَّ من التخزين المؤقت اليدوي ما لم يثبت تحليل الأداء أنك تحتاج إليه.</li>
<li><strong>في المشاريع القائمة،</strong> اترك التخزين المؤقت القائم في مكانه؛ فقد صُمّم المصرّف للعمل معه.</li>
<li><strong>اكتب شيفرة مألوفة.</strong> يكون المصرّف أكثر فاعلية عندما تكون المكوّنات خالصة، وتوضع الآثار الجانبية في دوال التأثير، ولا تعدّل الخصائص أو الحالة.</li>
</ul>
<h2 id="إعادة-هيكلة-عملية-من-الأصناف-إلى-الخطافات">إعادة هيكلة عملية: من الأصناف إلى الخطافات</h2>
<p>لجعل المقارنة ملموسة، إليك مكوّنًا صنفيًا صغيرًا يتتبع موضع تمرير المستخدم ويحفظه في تخزين الجلسة عند فك التركيب.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">ScrollTracker</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">React.Component</span>&lt;{ <span class="hljs-attr">pageId</span>: string }, { <span class="hljs-attr">y</span>: number }&gt; {

state = { <span class="hljs-attr">y</span>: <span class="hljs-number">0</span> };

onScroll = <span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">setState</span>({ <span class="hljs-attr">y</span>: <span class="hljs-variable language_">window</span>.<span class="hljs-property">scrollY</span> });

<span class="hljs-title function_">componentDidMount</span>(<span class="hljs-params"></span>) {

<span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;scroll&quot;</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">onScroll</span>, { <span class="hljs-attr">passive</span>: <span class="hljs-literal">true</span> });

}

<span class="hljs-title function_">componentWillUnmount</span>(<span class="hljs-params"></span>) {

<span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&quot;scroll&quot;</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">onScroll</span>);

<span class="hljs-variable language_">sessionStorage</span>.<span class="hljs-title function_">setItem</span>(<span class="hljs-string">\`scroll:<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.props.pageId}</span>\`</span>, <span class="hljs-title class_">String</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">state</span>.<span class="hljs-property">y</span>));

}

<span class="hljs-title function_">render</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ScrollIndicator</span> <span class="hljs-attr">y</span>=<span class="hljs-string">{this.state.y}</span> /&gt;</span></span>;

}

}
</code></pre>
<p>وعند تحويله إلى مكوّن دالي مع خطاف مخصص، يُمنح <em>السلوك</em> اسمًا (<code>useScrollPosition</code>) ويصبح قابلًا لإعادة الاستخدام على نحو بديهي.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">useScrollPosition</span>(<span class="hljs-params"></span>) {

<span class="hljs-keyword">const</span> [y, setY] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {

<span class="hljs-keyword">const</span> <span class="hljs-title function_">onScroll</span> = (<span class="hljs-params"></span>) =&gt; <span class="hljs-title function_">setY</span>(<span class="hljs-variable language_">window</span>.<span class="hljs-property">scrollY</span>);

<span class="hljs-variable language_">window</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&quot;scroll&quot;</span>, onScroll, { <span class="hljs-attr">passive</span>: <span class="hljs-literal">true</span> });

<span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">removeEventListener</span>(<span class="hljs-string">&quot;scroll&quot;</span>, onScroll);

}, []);

<span class="hljs-keyword">return</span> y;

}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ScrollTracker</span>(<span class="hljs-params">{ pageId }: { pageId: string }</span>) {

<span class="hljs-keyword">const</span> y = <span class="hljs-title function_">useScrollPosition</span>();

<span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {

<span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-variable language_">sessionStorage</span>.<span class="hljs-title function_">setItem</span>(<span class="hljs-string">\`scroll:<span class="hljs-subst">\${pageId}</span>\`</span>, <span class="hljs-title class_">String</span>(y));

}, [pageId, y]);

<span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ScrollIndicator</span> <span class="hljs-attr">y</span>=<span class="hljs-string">{y}</span> /&gt;</span></span>;

}
</code></pre>
<p>نسخة الخطاف أقصر، ولا تحتوي على <code>this</code>، ولا ربط لطرق، ولا طريقة دورة حياة عليك تذكرها، وأصبح منطق تتبّع التمرير وحدة يمكنك إدراجها في أي مكوّن.</p>
<h2 id="المفاضلات-والمخاطر">المفاضلات والمخاطر</h2>
<p>الخطافات ليست بلا تكلفة. كانت الأنماط التي حلّت محلها (HOCs، وخصائص العرض، والأصناف) ذات فوائد حقيقية في ظروف معينة، وللخطافات أساليب فشل خاصة بها تستحق المعرفة.</p>
<ul>
<li><strong>الإغلاق القديم.</strong> يلتقط كل عرض لقطة خاصة به من الحالة والخصائص. ويظل <code>setInterval</code> الذي أُنشئ في تأثير بلا اعتماديات يرى قيم <em>العرض الأول</em> فقط. الحل المعتاد هو <code>ref</code> أو مصفوفة اعتماديات صحيحة.</li>
<li><strong>الإفراط في استخدام التأثيرات.</strong> هذا هو الخطأ الأكثر شيوعًا في الخطافات. إذا كنت تستخدم <code>useEffect</code> لاستخراج حالة من الخصائص، أو للتفاعل مع نقرة، أو لمزامنة قطعتين من الحالة المحلية، فعلى الأرجح أنك لا تحتاج إلى تأثير.</li>
<li><strong>قواعد الترتيب المخفية.</strong> تبدو عبارة «استدع الخطافات في المستوى الأعلى فقط» بديهية، حتى تحاول العودة المبكرة قبل خطاف أو استدعاء واحد داخل <code>try/catch</code>. المدقّق صديقك؛ فثق به.</li>
<li><strong>سهولة الاختبار.</strong> يجب استدعاء الخطافات داخل مكوّن. اختبرها عبر مكوّن أو عبر أداة <code>renderHook</code> في <a href="https://testing-library.com/docs/react-testing-library/intro/"><code>@testing-library/react</code></a>، ولا تحاول استدعاءها مباشرةً.</li>
</ul>
<h2 id="ما-ينبغي-تذكره">ما ينبغي تذكّره</h2>
<ul>
<li>تتيح لك الخطافات استخراج أي منطق ذي حالة إلى دالة عادية يمكن للمكوّنات أو الخطافات الأخرى أن تركّبها.</li>
<li>قاعدتان: المستوى الأعلى فقط، ودوال React فقط. أداة التدقيق ستجعلك ملتزمًا بهما.</li>
<li><code>useEffect</code> مخصص للتعامل مع العالم الخارجي، لا لاستخراج الحالة من الخصائص أو التفاعل مع أحداث المستخدم.</li>
<li>تضيف React 19 خطافات من الدرجة الأولى للعمل غير المتزامن (<code>use</code>)، والنماذج (<code>useActionState</code> و<code>useFormStatus</code>)، وواجهة المستخدم المتفائلة (<code>useOptimistic</code>).</li>
<li>يلغي مصرّف React معظم الحاجة إلى <code>useMemo</code> و<code>useCallback</code> يدويًا؛ اكتب مكوّنات نظيفة ودع المحسّن يتولى الباقي.</li>
<li>عندما يبدأ المكوّن في الشعور بالتشابك، ابحث عن الأفعال المخفية داخله (<code>useScrollPosition</code> و<code>useDebouncedSearch</code> و<code>useFeatureFlag</code>) وارفعها إلى خطافات.</li>
</ul>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://react.dev/reference/react/hooks">مرجع الخطافات — react.dev</a></li>
<li><a href="https://react.dev/reference/rules/rules-of-hooks">قواعد الخطافات</a></li>
<li><a href="https://react.dev/learn/you-might-not-need-an-effect">ربما لا تحتاج إلى Effect</a></li>
<li><a href="https://react.dev/blog/2024/12/05/react-19">ملاحظات إصدار React 19</a></li>
<li><a href="https://react.dev/learn/react-compiler">مصرّف React</a></li>
<li><a href="https://usehooks-ts.com/"><code>usehooks-ts</code></a> — مكتبة خطافات تضع TypeScript أولًا</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:l,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,p as html,t as slug,e as title};
