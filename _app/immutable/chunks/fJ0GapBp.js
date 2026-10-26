const s="kinney",a="react-typescript",n="React مع TypeScript",l="usestate-typescript-basics",t="useState مع TypeScript: الأساسيات",p=[{depth:2,id:"استنتاج-الأنواع-حين-يعرف-typescript-وحده",text:"استنتاج الأنواع: حين يعرف TypeScript وحده"},{depth:2,id:"حين-لا-يكفي-الاستنتاج-كن-صريحا",text:"حين لا يكفي الاستنتاج: كن صريحًا"},{depth:3,id:"المصفوفات-الفارغة-الفخ-الكلاسيكي",text:"المصفوفات الفارغة: الفخّ الكلاسيكي"},{depth:3,id:"أنواع-اتحادية-للقيم-المقيدة",text:"أنواع اتحادية للقيم المقيَّدة"},{depth:2,id:"العمل-مع-الكائنات-نوع-todo",text:"العمل مع الكائنات: نوع Todo"},{depth:2,id:"نمط-nullundefined-للبيانات-غير-المتزامنة",text:"نمط null/undefined للبيانات غير المتزامنة"},{depth:2,id:"التحديثات-الوظيفية-الطريقة-الآمنة",text:"التحديثات الوظيفية: الطريقة الآمنة"},{depth:2,id:"الحالة-المعقدة-متى-تقسم-ومتى-تدمج",text:"الحالة المعقّدة: متى تُقسِّم ومتى تُدمج"},{depth:2,id:"خطافات-مخصصة-عامة-مع-usestate",text:"خُطّافات مخصّصة عامة مع useState"},{depth:2,id:"الأخطاء-الشائعة-وكيف-تتجنبها",text:"الأخطاء الشائعة وكيف تتجنّبها"},{depth:3,id:"الخطأ-1-تعديل-الحالة-مباشرة",text:"الخطأ 1: تعديل الحالة مباشرة"},{depth:3,id:"الخطأ-2-الإغلاقات-القديمة-stale-closures-في-معالجات-الأحداث",text:"الخطأ 2: الإغلاقات القديمة (stale closures) في معالجات الأحداث"},{depth:3,id:"الخطأ-3-تحديد-الأنواع-أكثر-من-اللازم",text:"الخطأ 3: تحديد الأنواع أكثر من اللازم"},{depth:2,id:"نصائح-الأداء",text:"نصائح الأداء"},{depth:3,id:"نصيحة-1-حالة-ابتدائية-كسولة",text:"نصيحة 1: حالة ابتدائية كسولة"},{depth:3,id:"نصيحة-2-تجميع-تحديثات-الحالة",text:"نصيحة 2: تجميع تحديثات الحالة"},{depth:2,id:"تجميع-كل-ما-سبق-مثال-كامل",text:"تجميع كل ما سبق: مثال كامل"},{depth:2,id:"الخلاصات-الأساسية",text:"الخلاصات الأساسية"},{depth:2,id:"ما-التالي",text:"ما التالي؟"}],e=`<p>حين تجمع خُطّاف <code>useState</code> في React مع TypeScript، تحصل على ثنائيٍّ قويّ يلتقط الأخطاء قبل وقوعها. لكنّ الأمر يتجاوز مجرّد وضع الأنواع على متغيّرات حالتك. إن فهمتَ كيف يستنتج TypeScript الأنواع، ومتى ينبغي أن تكون صريحًا، وكيف تتعامل مع أشكال الحالة المعقّدة، فإنّ تجربة تطويرك في React ستتحوّل من «آمل أن يعمل» إلى «متيقّن من أنّه يعمل».</p>
<p>في هذا الدليل، سنبني تدريجيًا من أبسط أنماط useState إلى التعامل مع أشكال الحالة المعقّدة، مستخدمين واجهة JSONPlaceholder لقوائم المهام مثالًا واقعيًا في كلّ مراحل الشرح.</p>
<h2 id="استنتاج-الأنواع-حين-يعرف-typescript-وحده">استنتاج الأنواع: حين يعرف TypeScript وحده</h2>
<p>TypeScript ذكيّ في استنتاج الأنواع من القيم الابتدائية. وللأنواع الأولية البسيطة، لن تحتاج غالبًا إلى أنواع صريحة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoCounter</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// TypeScript infers these types automatically</span>
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>); <span class="hljs-comment">// number</span>
  <span class="hljs-keyword">const</span> [title, setTitle] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>); <span class="hljs-comment">// string</span>
  <span class="hljs-keyword">const</span> [isDone, setIsDone] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>); <span class="hljs-comment">// boolean</span>

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Todos completed: {count}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setCount(count + 1)}&gt;Mark one complete<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

      {/* TypeScript ensures type safety */}
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setCount(&#x27;five&#x27;)}&gt;
        {&#x27; &#x27;}
        {/* ❌ Error: string not assignable to number */}
        This won&#x27;t compile
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>أين الجمال هنا؟ يقيّد TypeScript تلقائيًا نوع <code>setCount</code> ليقبل الأعداد فقط أو دالةً تُعيد عددًا. فتحصل على أمانٍ وقت التصريف دون كتابة أي تعليق نوع واحد.</p>
<h2 id="حين-لا-يكفي-الاستنتاج-كن-صريحا">حين لا يكفي الاستنتاج: كن صريحًا</h2>
<p>رغم أنّ الاستنتاج ممتاز مع الأنواع الأولية، ستحتاج إلى أن تكون صريحًا في عدّة سيناريوهات شائعة:</p>
<h3 id="المصفوفات-الفارغة-الفخ-الكلاسيكي">المصفوفات الفارغة: الفخّ الكلاسيكي</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// ❌ Bad: TypeScript infers never[] - you can&#x27;t add anything!</span>
  <span class="hljs-keyword">const</span> [items, setItems] = <span class="hljs-title function_">useState</span>([]);

  <span class="hljs-comment">// This will cause a TypeScript error</span>
  <span class="hljs-title function_">setItems</span>([<span class="hljs-string">&#x27;Buy milk&#x27;</span>]); <span class="hljs-comment">// Error: Type &#x27;string&#x27; is not assignable to type &#x27;never&#x27;</span>
}
</code></pre>
<p>الحلّ؟ كن صريحًا بشأن ما ستحتوي عليه المصفوفة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoList</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// ✅ Good: Explicitly typed array</span>
  <span class="hljs-keyword">const</span> [items, setItems] = useState&lt;<span class="hljs-built_in">string</span>[]&gt;([]);

  <span class="hljs-comment">// Now this works perfectly</span>
  <span class="hljs-title function_">setItems</span>([<span class="hljs-string">&#x27;Buy milk&#x27;</span>, <span class="hljs-string">&#x27;Walk the dog&#x27;</span>]);

  <span class="hljs-comment">// TypeScript still protects you</span>
  <span class="hljs-title function_">setItems</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]); <span class="hljs-comment">// ❌ Error: number[] not assignable to string[]</span>
}
</code></pre>
<h3 id="أنواع-اتحادية-للقيم-المقيدة">أنواع اتحادية للقيم المقيَّدة</h3>
<p>حين لا ينبغي أن تتجاوز حالتك قيمًا معيّنة، وجّه TypeScript باستخدام الأنواع الاتحادية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">FilterStatus</span> = <span class="hljs-string">&#x27;all&#x27;</span> | <span class="hljs-string">&#x27;active&#x27;</span> | <span class="hljs-string">&#x27;completed&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoFilter</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// Without explicit typing, TypeScript infers &#x27;string&#x27;</span>
  <span class="hljs-keyword">const</span> [filter, setFilter] = useState&lt;<span class="hljs-title class_">FilterStatus</span>&gt;(<span class="hljs-string">&#x27;all&#x27;</span>);

  <span class="hljs-comment">// TypeScript ensures only valid values</span>
  <span class="hljs-title function_">setFilter</span>(<span class="hljs-string">&#x27;completed&#x27;</span>); <span class="hljs-comment">// ✅ Works</span>
  <span class="hljs-title function_">setFilter</span>(<span class="hljs-string">&#x27;pending&#x27;</span>); <span class="hljs-comment">// ❌ Error: &#x27;pending&#x27; not assignable to FilterStatus</span>

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setFilter(&#x27;all&#x27;)}&gt;All<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setFilter(&#x27;active&#x27;)}&gt;Active<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setFilter(&#x27;completed&#x27;)}&gt;Completed<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="العمل-مع-الكائنات-نوع-todo">العمل مع الكائنات: نوع Todo</h2>
<p>لنعرّف نوع Todo استنادًا إلى بنية واجهة JSONPlaceholder:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Todo</span> {
  <span class="hljs-attr">userId</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">completed</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoItem</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// Single todo item (can be null initially)</span>
  <span class="hljs-keyword">const</span> [todo, setTodo] = useState&lt;<span class="hljs-title class_">Todo</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// Array of todos</span>
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);

  <span class="hljs-comment">// Example: Adding a new todo</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">addTodo</span> = (<span class="hljs-params"><span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">newTodo</span>: <span class="hljs-title class_">Todo</span> = {
      <span class="hljs-attr">userId</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">id</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(), <span class="hljs-comment">// Temporary ID</span>
      title,
      <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>,
    };

    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, newTodo]);
  };

  <span class="hljs-comment">// Example: Toggling completion</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">toggleTodo</span> = (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
      prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> (todo.<span class="hljs-property">id</span> === id ? { ...todo, <span class="hljs-attr">completed</span>: !todo.<span class="hljs-property">completed</span> } : todo)),
    );
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {todos.map((todo) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">checked</span>=<span class="hljs-string">{todo.completed}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{()</span> =&gt;</span> toggleTodo(todo.id)} /&gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="نمط-nullundefined-للبيانات-غير-المتزامنة">نمط null/undefined للبيانات غير المتزامنة</h2>
<p>حين لا تكون البيانات قد حُمِّلت بعد، فإن استخدام <code>null</code> أو <code>undefined</code> كقيمة ابتدائية للحالة نمطٌ شائع:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoDetail</span>(<span class="hljs-params">{ todoId }: { todoId: <span class="hljs-built_in">number</span> }</span>) {
  <span class="hljs-comment">// null indicates &quot;not loaded yet&quot;</span>
  <span class="hljs-keyword">const</span> [todo, setTodo] = useState&lt;<span class="hljs-title class_">Todo</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// Load todo on mount</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`https://jsonplaceholder.typicode.com/todos/<span class="hljs-subst">\${todoId}</span>\`</span>)
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">json</span>())
      .<span class="hljs-title function_">then</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-title class_">Todo</span></span>) =&gt;</span> <span class="hljs-title function_">setTodo</span>(data))
      .<span class="hljs-title function_">catch</span>(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> <span class="hljs-title function_">setError</span>(err.<span class="hljs-property">message</span>));
  }, [todoId]);

  <span class="hljs-comment">// TypeScript makes you handle all cases</span>
  <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">if</span> (!todo) <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;

  <span class="hljs-comment">// TypeScript knows todo is definitely Todo here (not null)</span>
  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Status: {todo.completed ? &#x27;Done&#x27; : &#x27;Pending&#x27;}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="التحديثات-الوظيفية-الطريقة-الآمنة">التحديثات الوظيفية: الطريقة الآمنة</h2>
<p>حين تعتمد حالتك التالية على حالتك السابقة، استخدم نمط التحديث الوظيفي. ويستنتج TypeScript تلقائيًا نوع المُعامل:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoStats</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [stats, setStats] = <span class="hljs-title function_">useState</span>({
    <span class="hljs-attr">total</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">completed</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">active</span>: <span class="hljs-number">0</span>,
  });

  <span class="hljs-comment">// TypeScript knows &#x27;prev&#x27; has the shape of our stats object</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">incrementCompleted</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-title function_">setStats</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({
      ...prev,
      <span class="hljs-attr">completed</span>: prev.<span class="hljs-property">completed</span> + <span class="hljs-number">1</span>,
      <span class="hljs-attr">active</span>: prev.<span class="hljs-property">active</span> - <span class="hljs-number">1</span>,
    }));
  };

  <span class="hljs-comment">// This pattern prevents stale closure bugs</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">batchUpdate</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-comment">// All three updates will use the latest state</span>
    <span class="hljs-title function_">setStats</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, <span class="hljs-attr">total</span>: prev.<span class="hljs-property">total</span> + <span class="hljs-number">1</span> }));
    <span class="hljs-title function_">setStats</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, <span class="hljs-attr">active</span>: prev.<span class="hljs-property">active</span> + <span class="hljs-number">1</span> }));
    <span class="hljs-title function_">setStats</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> ({ ...prev, <span class="hljs-attr">total</span>: prev.<span class="hljs-property">total</span> + <span class="hljs-number">1</span> }));
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Total: {stats.total}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Completed: {stats.completed}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Active: {stats.active}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="الحالة-المعقدة-متى-تقسم-ومتى-تدمج">الحالة المعقّدة: متى تُقسِّم ومتى تُدمج</h2>
<p>إن كان قرارك بين استخدام عدّة استدعاءات لـ <code>useState</code> أو دمج الحالة في كائن واحد يعتمد على العلاقة بين القيم:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good: Related values that change together</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoForm</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [formData, setFormData] = <span class="hljs-title function_">useState</span>({
    <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;&#x27;</span>,
    <span class="hljs-attr">priority</span>: <span class="hljs-string">&#x27;medium&#x27;</span> <span class="hljs-keyword">as</span> <span class="hljs-string">&#x27;low&#x27;</span> | <span class="hljs-string">&#x27;medium&#x27;</span> | <span class="hljs-string">&#x27;high&#x27;</span>,
  });

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">FormEvent</span></span>) =&gt; {
    e.<span class="hljs-title function_">preventDefault</span>();
    <span class="hljs-comment">// All form data is together</span>
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Submitting:&#x27;</span>, formData);
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">value</span>=<span class="hljs-string">{formData.title}</span>
        <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span>
          setFormData((prev) =&gt; ({
            ...prev,
            title: e.target.value,
          }))
        }
      /&gt;
      {/* Other fields... */}
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// ✅ Good: Separate concerns that change independently</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoApp</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [filter, setFilter] = useState&lt;<span class="hljs-string">&#x27;all&#x27;</span> | <span class="hljs-string">&#x27;active&#x27;</span> | <span class="hljs-string">&#x27;completed&#x27;</span>&gt;(<span class="hljs-string">&#x27;all&#x27;</span>);
  <span class="hljs-keyword">const</span> [searchTerm, setSearchTerm] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-comment">// Each piece of state has a single responsibility</span>
  <span class="hljs-comment">// They can be updated independently without affecting others</span>
}
</code></pre>
<h2 id="خطافات-مخصصة-عامة-مع-usestate">خُطّافات مخصّصة عامة مع useState</h2>
<p>أنشئ منطقًا ذا حالة قابلًا لإعادة الاستخدام عبر خُطّافات مخصّصة عامة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Generic hook for any toggleable value</span>
<span class="hljs-keyword">function</span> useToggle&lt;T&gt;(<span class="hljs-attr">initialValue</span>: T, <span class="hljs-attr">alternateValue</span>: T) {
  <span class="hljs-keyword">const</span> [value, setValue] = useState&lt;T&gt;(initialValue);

  <span class="hljs-keyword">const</span> toggle = <span class="hljs-title function_">useCallback</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">setValue</span>(<span class="hljs-function">(<span class="hljs-params">current</span>) =&gt;</span> (current === initialValue ? alternateValue : initialValue));
  }, [initialValue, alternateValue]);

  <span class="hljs-keyword">return</span> [value, toggle, setValue] <span class="hljs-keyword">as</span> <span class="hljs-keyword">const</span>;
}

<span class="hljs-comment">// Usage with different types</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoControls</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [view, toggleView] = <span class="hljs-title function_">useToggle</span>(<span class="hljs-string">&#x27;list&#x27;</span>, <span class="hljs-string">&#x27;grid&#x27;</span>);
  <span class="hljs-keyword">const</span> [isDark, toggleTheme] = <span class="hljs-title function_">useToggle</span>(<span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>);
  <span class="hljs-keyword">const</span> [sortOrder, toggleSort] = useToggle&lt;<span class="hljs-string">&#x27;asc&#x27;</span> | <span class="hljs-string">&#x27;desc&#x27;</span>&gt;(<span class="hljs-string">&#x27;asc&#x27;</span>, <span class="hljs-string">&#x27;desc&#x27;</span>);

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{toggleView}</span>&gt;</span>View: {view}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{toggleTheme}</span>&gt;</span>Theme: {isDark ? &#x27;Dark&#x27; : &#x27;Light&#x27;}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{toggleSort}</span>&gt;</span>Sort: {sortOrder}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="الأخطاء-الشائعة-وكيف-تتجنبها">الأخطاء الشائعة وكيف تتجنّبها</h2>
<h3 id="الخطأ-1-تعديل-الحالة-مباشرة">الخطأ 1: تعديل الحالة مباشرة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoMutationBug</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);

  <span class="hljs-comment">// ❌ Bad: Mutating state directly</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">buggyAddTodo</span> = (<span class="hljs-params"><span class="hljs-attr">newTodo</span>: <span class="hljs-title class_">Todo</span></span>) =&gt; {
    todos.<span class="hljs-title function_">push</span>(newTodo); <span class="hljs-comment">// This mutates the existing array</span>
    <span class="hljs-title function_">setTodos</span>(todos); <span class="hljs-comment">// React won&#x27;t re-render!</span>
  };

  <span class="hljs-comment">// ✅ Good: Creating a new array</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">correctAddTodo</span> = (<span class="hljs-params"><span class="hljs-attr">newTodo</span>: <span class="hljs-title class_">Todo</span></span>) =&gt; {
    <span class="hljs-title function_">setTodos</span>([...todos, newTodo]); <span class="hljs-comment">// New array reference</span>
  };

  <span class="hljs-comment">// ✅ Better: Using functional update</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">bestAddTodo</span> = (<span class="hljs-params"><span class="hljs-attr">newTodo</span>: <span class="hljs-title class_">Todo</span></span>) =&gt; {
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, newTodo]); <span class="hljs-comment">// Always uses latest state</span>
  };
}
</code></pre>
<h3 id="الخطأ-2-الإغلاقات-القديمة-stale-closures-في-معالجات-الأحداث">الخطأ 2: الإغلاقات القديمة (stale closures) في معالجات الأحداث</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">StaleClosureExample</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);

  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// ❌ Bad: count is captured and becomes stale</span>
    <span class="hljs-keyword">const</span> timer = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setCount</span>(count + <span class="hljs-number">1</span>); <span class="hljs-comment">// Always adds to the initial count!</span>
    }, <span class="hljs-number">1000</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearInterval</span>(timer);
  }, []); <span class="hljs-comment">// Empty deps means count is captured once</span>

  <span class="hljs-comment">// ✅ Good: Using functional update</span>
  <span class="hljs-title function_">useEffect</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> timer = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">setCount</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev + <span class="hljs-number">1</span>); <span class="hljs-comment">// Always uses current value</span>
    }, <span class="hljs-number">1000</span>);

    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">clearInterval</span>(timer);
  }, []); <span class="hljs-comment">// Now the empty deps array is safe</span>
}
</code></pre>
<h3 id="الخطأ-3-تحديد-الأنواع-أكثر-من-اللازم">الخطأ 3: تحديد الأنواع أكثر من اللازم</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ❌ Unnecessary: TypeScript can infer this</span>
<span class="hljs-keyword">const</span> [name, setName] = useState&lt;<span class="hljs-built_in">string</span>&gt;(<span class="hljs-string">&#x27;&#x27;</span>);

<span class="hljs-comment">// ✅ Let inference work for simple cases</span>
<span class="hljs-keyword">const</span> [name, setName] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

<span class="hljs-comment">// ✅ Be explicit only when needed</span>
<span class="hljs-keyword">const</span> [user, setUser] = useState&lt;<span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);
<span class="hljs-keyword">const</span> [items, setItems] = useState&lt;<span class="hljs-built_in">string</span>[]&gt;([]);
</code></pre>
<h2 id="نصائح-الأداء">نصائح الأداء</h2>
<h3 id="نصيحة-1-حالة-ابتدائية-كسولة">نصيحة 1: حالة ابتدائية كسولة</h3>
<p>حين تتطلّب الحالة الابتدائية حسابًا مكلفًا، استخدم دالةً:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">ExpensiveComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// ❌ This runs on every render</span>
  <span class="hljs-keyword">const</span> [data, setData] = <span class="hljs-title function_">useState</span>(<span class="hljs-title function_">expensiveComputation</span>());

  <span class="hljs-comment">// ✅ This runs only once</span>
  <span class="hljs-keyword">const</span> [data, setData] = <span class="hljs-title function_">useState</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">expensiveComputation</span>());

  <span class="hljs-comment">// Real example: parsing localStorage</span>
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">const</span> saved = <span class="hljs-variable language_">localStorage</span>.<span class="hljs-title function_">getItem</span>(<span class="hljs-string">&#x27;todos&#x27;</span>);
    <span class="hljs-keyword">return</span> saved ? <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(saved) : [];
  });
}
</code></pre>
<h3 id="نصيحة-2-تجميع-تحديثات-الحالة">نصيحة 2: تجميع تحديثات الحالة</h3>
<p>يجمع React تحديثات الحالة تلقائيًا في معالجات الأحداث:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoBatching</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [count, setCount] = <span class="hljs-title function_">useState</span>(<span class="hljs-number">0</span>);
  <span class="hljs-keyword">const</span> [lastUpdate, setLastUpdate] = useState&lt;<span class="hljs-title class_">Date</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleClick</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-comment">// These are automatically batched - one re-render</span>
    <span class="hljs-title function_">setTodos</span>([]);
    <span class="hljs-title function_">setCount</span>(<span class="hljs-number">0</span>);
    <span class="hljs-title function_">setLastUpdate</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>());
  };

  <span class="hljs-comment">// In async code, updates are also batched in React 18+</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleAsync</span> = <span class="hljs-keyword">async</span> (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;https://jsonplaceholder.typicode.com/todos&#x27;</span>);
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();

    <span class="hljs-comment">// Still batched in React 18+</span>
    <span class="hljs-title function_">setTodos</span>(data);
    <span class="hljs-title function_">setCount</span>(data.<span class="hljs-property">length</span>);
    <span class="hljs-title function_">setLastUpdate</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>());
  };
}
</code></pre>
<h2 id="تجميع-كل-ما-سبق-مثال-كامل">تجميع كل ما سبق: مثال كامل</h2>
<p>إليك كل ما تعلّمناه في مكوّن عملي لقائمة المهام:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Todo</span> {
  <span class="hljs-attr">userId</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">completed</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">FilterStatus</span> = <span class="hljs-string">&#x27;all&#x27;</span> | <span class="hljs-string">&#x27;active&#x27;</span> | <span class="hljs-string">&#x27;completed&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">TodoManager</span>(<span class="hljs-params"></span>) {
  <span class="hljs-comment">// Multiple pieces of state with proper typing</span>
  <span class="hljs-keyword">const</span> [todos, setTodos] = useState&lt;<span class="hljs-title class_">Todo</span>[]&gt;([]);
  <span class="hljs-keyword">const</span> [filter, setFilter] = useState&lt;<span class="hljs-title class_">FilterStatus</span>&gt;(<span class="hljs-string">&#x27;all&#x27;</span>);
  <span class="hljs-keyword">const</span> [newTodoTitle, setNewTodoTitle] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  <span class="hljs-keyword">const</span> [isLoading, setIsLoading] = <span class="hljs-title function_">useState</span>(<span class="hljs-literal">false</span>);
  <span class="hljs-keyword">const</span> [error, setError] = useState&lt;<span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>&gt;(<span class="hljs-literal">null</span>);

  <span class="hljs-comment">// Computed value based on state</span>
  <span class="hljs-keyword">const</span> filteredTodos = todos.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (filter === <span class="hljs-string">&#x27;active&#x27;</span>) <span class="hljs-keyword">return</span> !todo.<span class="hljs-property">completed</span>;
    <span class="hljs-keyword">if</span> (filter === <span class="hljs-string">&#x27;completed&#x27;</span>) <span class="hljs-keyword">return</span> todo.<span class="hljs-property">completed</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  });

  <span class="hljs-comment">// Add a new todo</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">addTodo</span> = (<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">React</span>.<span class="hljs-title class_">FormEvent</span></span>) =&gt; {
    e.<span class="hljs-title function_">preventDefault</span>();
    <span class="hljs-keyword">if</span> (!newTodoTitle.<span class="hljs-title function_">trim</span>()) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> <span class="hljs-attr">newTodo</span>: <span class="hljs-title class_">Todo</span> = {
      <span class="hljs-attr">userId</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">id</span>: <span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>(),
      <span class="hljs-attr">title</span>: newTodoTitle,
      <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>,
    };

    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> [...prev, newTodo]);
    <span class="hljs-title function_">setNewTodoTitle</span>(<span class="hljs-string">&#x27;&#x27;</span>);
  };

  <span class="hljs-comment">// Toggle todo completion</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">toggleTodo</span> = (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span>
      prev.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> (todo.<span class="hljs-property">id</span> === id ? { ...todo, <span class="hljs-attr">completed</span>: !todo.<span class="hljs-property">completed</span> } : todo)),
    );
  };

  <span class="hljs-comment">// Delete a todo</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">deleteTodo</span> = (<span class="hljs-params"><span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span></span>) =&gt; {
    <span class="hljs-title function_">setTodos</span>(<span class="hljs-function">(<span class="hljs-params">prev</span>) =&gt;</span> prev.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> todo.<span class="hljs-property">id</span> !== id));
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Todo Manager<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>

      {/* Add new todo form */}
      <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{addTodo}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
          <span class="hljs-attr">value</span>=<span class="hljs-string">{newTodoTitle}</span>
          <span class="hljs-attr">onChange</span>=<span class="hljs-string">{(e)</span> =&gt;</span> setNewTodoTitle(e.target.value)}
          placeholder=&quot;What needs to be done?&quot;
        /&gt;
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Add<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>

      {/* Filter buttons */}
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setFilter(&#x27;all&#x27;)} disabled={filter === &#x27;all&#x27;}&gt;
          All ({todos.length})
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setFilter(&#x27;active&#x27;)} disabled={filter === &#x27;active&#x27;}&gt;
          Active ({todos.filter((t) =&gt; !t.completed).length})
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setFilter(&#x27;completed&#x27;)} disabled={filter === &#x27;completed&#x27;}&gt;
          Completed ({todos.filter((t) =&gt; t.completed).length})
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      {/* Todo list */}
      {error &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {error}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}
      {isLoading &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>}

      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {filteredTodos.map((todo) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{todo.id}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;checkbox&quot;</span> <span class="hljs-attr">checked</span>=<span class="hljs-string">{todo.completed}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{()</span> =&gt;</span> toggleTodo(todo.id)} /&gt;
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>
              <span class="hljs-attr">style</span>=<span class="hljs-string">{{</span>
                <span class="hljs-attr">textDecoration:</span> <span class="hljs-attr">todo.completed</span> ? &#x27;<span class="hljs-attr">line-through</span>&#x27; <span class="hljs-attr">:</span> &#x27;<span class="hljs-attr">none</span>&#x27;,
              }}
            &gt;</span>
              {todo.title}
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> deleteTodo(todo.id)}&gt;Delete<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        ))}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<h2 id="الخلاصات-الأساسية">الخلاصات الأساسية</h2>
<ol>
<li><strong>دع TypeScript يستنتج متى أمكن</strong> - بالنسبة للأنواع الأولية البسيطة، يكون استنتاج TypeScript كافيًا عادةً</li>
<li><strong>كن صريحًا مع الأنواع المعقّدة</strong> - تحتاج المصفوفات والكائنات والأنواع الاتحادية إلى تحديدٍ صريح</li>
<li><strong>استخدم الأنواع الاتحادية مع null</strong> - نمط <code>Type | null</code> مثالي للبيانات غير المتزامنة</li>
<li><strong>فضّل التحديثات الوظيفية</strong> - فهي تمنع أخطاء الإغلاقات القديمة وأكثر قابلية للتنبّؤ</li>
<li><strong>قسّم الحالة بحسب المسؤوليات</strong> - أبقِ الحالة غير المرتبطة منفصلة للحصول على شيفرة أنظف</li>
<li><strong>هيّئ الحالة المكلفة كسولًا</strong> - استخدم الدوال للحسابات الابتدائية المكلفة</li>
</ol>
<h2 id="ما-التالي">ما التالي؟</h2>
<p>الآن بعد أن فهمتَ أساسيات useState مع TypeScript، أصبحتَ مستعدًا لخوض غمار جلب البيانات غير المتزامنة. في الدليل التالي، سنجمع useState مع useEffect لجلب مهام حقيقية من واجهة JSONPlaceholder، ومعالجة حالات التحميل، وإدارة الأخطاء — كل ذلك بأمانٍ كامل في الأنواع.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
