const s="kinney",a="react-typescript",n="React مع TypeScript",l="typescript-type-narrowing-control-flow",p="تضييق الأنواع وتحليل تدفّق التحكم",t=[{depth:2,id:"ما-هو-تضييق-الأنواع",text:"ما هو تضييق الأنواع؟"},{depth:2,id:"حراس-الأنواع-أدواتك-للتضييق",text:"حرّاس الأنواع: أدواتك للتضييق"},{depth:3,id:"حراس-الأنواع-عبر-typeof",text:"حرّاس الأنواع عبر typeof"},{depth:3,id:"حراس-الأنواع-عبر-instanceof",text:"حرّاس الأنواع عبر instanceof"},{depth:3,id:"حراس-الأنواع-عبر-المعامل-in",text:"حرّاس الأنواع عبر المعامل in"},{depth:2,id:"التضييق-بالصحة-truthiness",text:"التضييق بالصحّة (truthiness)"},{depth:2,id:"التضييق-بالمساواة",text:"التضييق بالمساواة"},{depth:2,id:"حراس-أنواع-مخصصة",text:"حرّاس أنواع مخصّصة"},{depth:2,id:"حراس-الأنواع-للمصفوفات",text:"حرّاس الأنواع للمصفوفات"},{depth:2,id:"تحليل-تدفق-التحكم",text:"تحليل تدفّق التحكم"},{depth:2,id:"never-والشمول-exhaustiveness",text:"never والشمول (exhaustiveness)"},{depth:2,id:"دوال-التأكيد-assertion-functions",text:"دوال التأكيد (assertion functions)"},{depth:2,id:"السلسلة-الاختيارية-والتضييق",text:"السلسلة الاختيارية والتضييق"},{depth:2,id:"تضييق-الأنواع-في-react",text:"تضييق الأنواع في React"},{depth:3,id:"خصائص-المكونات",text:"خصائص المكوّنات"},{depth:3,id:"التصيير-الشرطي",text:"التصيير الشرطي"},{depth:3,id:"التحقق-من-النماذج",text:"التحقّق من النماذج"},{depth:2,id:"أنماط-متقدمة",text:"أنماط متقدّمة"},{depth:3,id:"الاتحادات-المميزة-discriminated-unions-ذات-الحقول-المتعددة",text:"الاتحادات المميّزة (discriminated unions) ذات الحقول المتعدّدة"},{depth:3,id:"دمج-حراس-الأنواع",text:"دمج حرّاس الأنواع"},{depth:3,id:"التضييق-مع-الأنواع-العامة",text:"التضييق مع الأنواع العامة"},{depth:2,id:"مثال-من-العالم-الحقيقي-معالج-نموذج",text:"مثال من العالم الحقيقي: معالج نموذج"},{depth:2,id:"أفضل-الممارسات",text:"أفضل الممارسات"},{depth:3,id:"استخدم-الاتحادات-المميزة",text:"استخدم الاتحادات المميّزة"},{depth:3,id:"اجعل-الحالات-غير-الصالحة-غير-قابلة-للتمثيل",text:"اجعل الحالات غير الصالحة غير قابلة للتمثيل"},{depth:3,id:"استخدم-الفحوص-الشاملة",text:"استخدم الفحوص الشاملة"},{depth:3,id:"فضل-حراس-الأنواع-على-تأكيدات-الأنواع",text:"فضّل حرّاس الأنواع على تأكيدات الأنواع"},{depth:2,id:"الخلاصة",text:"الخلاصة"}],e=`<p>يمتلك TypeScript قدرة مذهلة على فهم منطق شيفرتك وتضييق الأنواع بناءً على الفحوص التي تجريها. فهو كمساعد ذكي جدًا يتابعك أثناء كتابة الشروط ويساعدك على ضمان سلامة الأنواع. ولنتعمّق في كيفية جعل تحليل تدفّق التحكم في TypeScript لشيفرة React أكثر أمانًا وقابلية للتنبؤ.</p>
<h2 id="ما-هو-تضييق-الأنواع">ما هو تضييق الأنواع؟</h2>
<p>تضييق الأنواع هو أن يصقل TypeScript نوعًا ليصبح أكثر تحديدًا بناءً على تدفّق التحكم في الشيفرة. فكّر فيه كأن TypeScript يتتبّع منطقك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">processValue</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span></span>) {
  <span class="hljs-comment">// Here, value is string | number</span>

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&#x27;string&#x27;</span>) {
    <span class="hljs-comment">// Here, TypeScript knows value is string</span>
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(value.<span class="hljs-title function_">toUpperCase</span>());
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// Here, TypeScript knows value is number</span>
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(value.<span class="hljs-title function_">toFixed</span>(<span class="hljs-number">2</span>));
  }
}
</code></pre>
<h2 id="حراس-الأنواع-أدواتك-للتضييق">حرّاس الأنواع: أدواتك للتضييق</h2>
<h3 id="حراس-الأنواع-عبر-typeof">حرّاس الأنواع عبر typeof</h3>
<p>معامل <code>typeof</code> هو خط دفاعك الأول أمام الأنواع الأولية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">formatValue</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | <span class="hljs-built_in">boolean</span></span>) {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&#x27;string&#x27;</span>) {
    <span class="hljs-comment">// value is string</span>
    <span class="hljs-keyword">return</span> value.<span class="hljs-title function_">trim</span>();
  }

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&#x27;number&#x27;</span>) {
    <span class="hljs-comment">// value is number</span>
    <span class="hljs-keyword">return</span> value.<span class="hljs-title function_">toLocaleString</span>();
  }

  <span class="hljs-comment">// value is boolean</span>
  <span class="hljs-keyword">return</span> value ? <span class="hljs-string">&#x27;Yes&#x27;</span> : <span class="hljs-string">&#x27;No&#x27;</span>;
}

<span class="hljs-comment">// In React components</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">DisplayValue</span> = (<span class="hljs-params">{ value }: { value: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | <span class="hljs-literal">null</span> }</span>) =&gt; {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&#x27;string&#x27;</span>) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;text-value&quot;</span>&gt;</span>{value}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&#x27;number&#x27;</span>) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;number-value&quot;</span>&gt;</span>{value.toFixed(2)}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;null-value&quot;</span>&gt;</span>No value<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>;
};
</code></pre>
<h3 id="حراس-الأنواع-عبر-instanceof">حرّاس الأنواع عبر instanceof</h3>
<p>للنسخ الخارجة من الأصناف وللكائنات المدمجة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">ValidationError</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Error</span> {
  <span class="hljs-attr">field</span>: <span class="hljs-built_in">string</span>;

  <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">field</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span></span>) {
    <span class="hljs-variable language_">super</span>(message);
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">field</span> = field;
  }
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">handleError</span>(<span class="hljs-params"><span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> | <span class="hljs-title class_">ValidationError</span></span>) {
  <span class="hljs-keyword">if</span> (error <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">ValidationError</span>) {
    <span class="hljs-comment">// error is ValidationError</span>
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Field <span class="hljs-subst">\${error.field}</span>: <span class="hljs-subst">\${error.message}</span>\`</span>);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// error is Error</span>
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`General error: <span class="hljs-subst">\${error.message}</span>\`</span>);
  }
}

<span class="hljs-comment">// Works with built-in types too</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">processDate</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-title class_">Date</span> | <span class="hljs-built_in">string</span></span>) {
  <span class="hljs-keyword">if</span> (value <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Date</span>) {
    <span class="hljs-comment">// value is Date</span>
    <span class="hljs-keyword">return</span> value.<span class="hljs-title function_">toISOString</span>();
  }

  <span class="hljs-comment">// value is string</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(value).<span class="hljs-title function_">toISOString</span>();
}
</code></pre>
<h3 id="حراس-الأنواع-عبر-المعامل-in">حرّاس الأنواع عبر المعامل in</h3>
<p>تحقّق من وجود الخاصية لتضييق أنواع الكائنات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Car</span> {
  <span class="hljs-title function_">drive</span>(): <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">wheels</span>: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Boat</span> {
  <span class="hljs-title function_">sail</span>(): <span class="hljs-built_in">void</span>;
  <span class="hljs-attr">rudder</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">operateVehicle</span>(<span class="hljs-params"><span class="hljs-attr">vehicle</span>: <span class="hljs-title class_">Car</span> | <span class="hljs-title class_">Boat</span></span>) {
  <span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;wheels&#x27;</span> <span class="hljs-keyword">in</span> vehicle) {
    <span class="hljs-comment">// vehicle is Car</span>
    vehicle.<span class="hljs-title function_">drive</span>();
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Car has <span class="hljs-subst">\${vehicle.wheels}</span> wheels\`</span>);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// vehicle is Boat</span>
    vehicle.<span class="hljs-title function_">sail</span>();
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Boat rudder: <span class="hljs-subst">\${vehicle.rudder}</span>\`</span>);
  }
}

<span class="hljs-comment">// React example</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">TextProps</span> {
  <span class="hljs-attr">text</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">maxLength</span>?: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ComponentProps</span> {
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">React</span>.<span class="hljs-property">ComponentType</span>;
  <span class="hljs-attr">props</span>?: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">any</span>&gt;;
}

<span class="hljs-keyword">const</span> <span class="hljs-title function_">DynamicRender</span> = (<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">TextProps</span> | <span class="hljs-title class_">ComponentProps</span></span>) =&gt; {
  <span class="hljs-keyword">if</span> (<span class="hljs-string">&#x27;text&#x27;</span> <span class="hljs-keyword">in</span> props) {
    <span class="hljs-comment">// props is TextProps</span>
    <span class="hljs-keyword">const</span> displayText = props.<span class="hljs-property">maxLength</span>
      ? props.<span class="hljs-property">text</span>.<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, props.<span class="hljs-property">maxLength</span>)
      : props.<span class="hljs-property">text</span>;
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{displayText}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>;
  }

  <span class="hljs-comment">// props is ComponentProps</span>
  <span class="hljs-keyword">const</span> <span class="hljs-title class_">Component</span> = props.<span class="hljs-property">component</span>;
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> {<span class="hljs-attr">...props.props</span>} /&gt;</span></span>;
};
</code></pre>
<h2 id="التضييق-بالصحة-truthiness">التضييق بالصحّة (truthiness)</h2>
<p>يفهم TypeScript صحّة القيم في JavaScript:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">processUser</span>(<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span></span>) {
  <span class="hljs-keyword">if</span> (!user) {
    <span class="hljs-comment">// user is null | undefined</span>
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;No user&#x27;</span>;
  }

  <span class="hljs-comment">// user is User</span>
  <span class="hljs-keyword">return</span> <span class="hljs-string">\`Hello, <span class="hljs-subst">\${user.name}</span>\`</span>;
}

<span class="hljs-comment">// More specific checks</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">handleValue</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span> | <span class="hljs-string">&#x27;&#x27;</span></span>) {
  <span class="hljs-keyword">if</span> (value) {
    <span class="hljs-comment">// value is string (and not empty)</span>
    <span class="hljs-keyword">return</span> value.<span class="hljs-title function_">toUpperCase</span>();
  }

  <span class="hljs-comment">// value is null | undefined | &#x27;&#x27;</span>
  <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;No value&#x27;</span>;
}

<span class="hljs-comment">// Array checking</span>
<span class="hljs-keyword">function</span> processItems&lt;T&gt;(<span class="hljs-attr">items</span>: T[] | <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span>) {
  <span class="hljs-keyword">if</span> (!items?.<span class="hljs-property">length</span>) {
    <span class="hljs-comment">// items is null | undefined | empty array</span>
    <span class="hljs-keyword">return</span> [];
  }

  <span class="hljs-comment">// items is non-empty T[]</span>
  <span class="hljs-keyword">return</span> items.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> <span class="hljs-title function_">processItem</span>(item));
}
</code></pre>
<h2 id="التضييق-بالمساواة">التضييق بالمساواة</h2>
<p>يضيّق TypeScript الأنواع بناءً على فحوص المساواة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handleStatus</span>(<span class="hljs-params"><span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> | <span class="hljs-string">&#x27;success&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span> | <span class="hljs-literal">null</span></span>) {
  <span class="hljs-keyword">if</span> (status === <span class="hljs-literal">null</span>) {
    <span class="hljs-comment">// status is null</span>
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;Not started&#x27;</span>;
  }

  <span class="hljs-keyword">if</span> (status === <span class="hljs-string">&#x27;loading&#x27;</span>) {
    <span class="hljs-comment">// status is &#x27;loading&#x27;</span>
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Spinner</span> /&gt;</span></span>;
  }

  <span class="hljs-keyword">if</span> (status === <span class="hljs-string">&#x27;success&#x27;</span>) {
    <span class="hljs-comment">// status is &#x27;success&#x27;</span>
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">SuccessMessage</span> /&gt;</span></span>;
  }

  <span class="hljs-comment">// status is &#x27;error&#x27;</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">ErrorMessage</span> /&gt;</span></span>;
}

<span class="hljs-comment">// Using switch for exhaustive checks</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Action</span> =
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;increment&#x27;</span>; <span class="hljs-attr">amount</span>: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;decrement&#x27;</span>; <span class="hljs-attr">amount</span>: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;reset&#x27;</span> };

<span class="hljs-keyword">function</span> <span class="hljs-title function_">reducer</span>(<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">action</span>: <span class="hljs-title class_">Action</span></span>): <span class="hljs-built_in">number</span> {
  <span class="hljs-keyword">switch</span> (action.<span class="hljs-property">type</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;increment&#x27;</span>:
      <span class="hljs-comment">// action is { type: &#x27;increment&#x27;; amount: number }</span>
      <span class="hljs-keyword">return</span> state + action.<span class="hljs-property">amount</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;decrement&#x27;</span>:
      <span class="hljs-comment">// action is { type: &#x27;decrement&#x27;; amount: number }</span>
      <span class="hljs-keyword">return</span> state - action.<span class="hljs-property">amount</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;reset&#x27;</span>:
      <span class="hljs-comment">// action is { type: &#x27;reset&#x27; }</span>
      <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;

    <span class="hljs-attr">default</span>:
      <span class="hljs-comment">// TypeScript knows this is unreachable</span>
      <span class="hljs-keyword">const</span> <span class="hljs-attr">exhaustive</span>: <span class="hljs-built_in">never</span> = action;
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Unhandled action: <span class="hljs-subst">\${exhaustive}</span>\`</span>);
  }
}
</code></pre>
<h2 id="حراس-أنواع-مخصصة">حرّاس أنواع مخصّصة</h2>
<p>أنشئ دوال حرّاس أنواع خاصة بك:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Simple type guard</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">isString</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">unknown</span></span>): value is <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&#x27;string&#x27;</span>;
}

<span class="hljs-comment">// More complex type guard</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">email</span>: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">isUser</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">unknown</span></span>): value is <span class="hljs-title class_">User</span> {
  <span class="hljs-keyword">return</span> (
    <span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&#x27;object&#x27;</span> &amp;&amp;
    value !== <span class="hljs-literal">null</span> &amp;&amp;
    <span class="hljs-string">&#x27;id&#x27;</span> <span class="hljs-keyword">in</span> value &amp;&amp;
    <span class="hljs-string">&#x27;name&#x27;</span> <span class="hljs-keyword">in</span> value &amp;&amp;
    <span class="hljs-string">&#x27;email&#x27;</span> <span class="hljs-keyword">in</span> value &amp;&amp;
    <span class="hljs-title function_">typeof</span> (value <span class="hljs-keyword">as</span> <span class="hljs-title class_">User</span>).<span class="hljs-property">id</span> === <span class="hljs-string">&#x27;number&#x27;</span> &amp;&amp;
    <span class="hljs-title function_">typeof</span> (value <span class="hljs-keyword">as</span> <span class="hljs-title class_">User</span>).<span class="hljs-property">name</span> === <span class="hljs-string">&#x27;string&#x27;</span> &amp;&amp;
    <span class="hljs-title function_">typeof</span> (value <span class="hljs-keyword">as</span> <span class="hljs-title class_">User</span>).<span class="hljs-property">email</span> === <span class="hljs-string">&#x27;string&#x27;</span>
  );
}

<span class="hljs-comment">// Using the type guard</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">processData</span>(<span class="hljs-params"><span class="hljs-attr">data</span>: <span class="hljs-built_in">unknown</span></span>) {
  <span class="hljs-keyword">if</span> (<span class="hljs-title function_">isUser</span>(data)) {
    <span class="hljs-comment">// data is User</span>
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`User: <span class="hljs-subst">\${data.name}</span> (<span class="hljs-subst">\${data.email}</span>)\`</span>);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-title function_">isString</span>(data)) {
    <span class="hljs-comment">// data is string</span>
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`String: <span class="hljs-subst">\${data}</span>\`</span>);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Unknown data type&#x27;</span>);
  }
}
</code></pre>
<h2 id="حراس-الأنواع-للمصفوفات">حرّاس الأنواع للمصفوفات</h2>
<p>يتطلب التعامل مع المصفوفات عناية خاصة:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Filter with type guards</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">mixedArray</span>: (<span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | <span class="hljs-literal">null</span>)[] = [<span class="hljs-string">&#x27;a&#x27;</span>, <span class="hljs-number">1</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">&#x27;b&#x27;</span>, <span class="hljs-number">2</span>];

<span class="hljs-comment">// This doesn&#x27;t narrow the type</span>
<span class="hljs-keyword">const</span> filtered = mixedArray.<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> item !== <span class="hljs-literal">null</span>);
<span class="hljs-comment">// filtered is still (string | number | null)[]</span>

<span class="hljs-comment">// Use a type guard function</span>
<span class="hljs-keyword">function</span> isNotNull&lt;T&gt;(<span class="hljs-attr">value</span>: T | <span class="hljs-literal">null</span>): value is T {
  <span class="hljs-keyword">return</span> value !== <span class="hljs-literal">null</span>;
}

<span class="hljs-keyword">const</span> filtered2 = mixedArray.<span class="hljs-title function_">filter</span>(isNotNull);
<span class="hljs-comment">// filtered2 is (string | number)[]</span>

<span class="hljs-comment">// Or be more specific</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">isString</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">unknown</span></span>): value is <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&#x27;string&#x27;</span>;
}

<span class="hljs-keyword">const</span> strings = mixedArray.<span class="hljs-title function_">filter</span>(isString);
<span class="hljs-comment">// strings is string[]</span>
</code></pre>
<h2 id="تحليل-تدفق-التحكم">تحليل تدفّق التحكم</h2>
<p>يتبع TypeScript منطق شيفرتك:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">processValue</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | <span class="hljs-literal">null</span></span>) {
  <span class="hljs-comment">// value is string | number | null</span>

  <span class="hljs-keyword">if</span> (value === <span class="hljs-literal">null</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;null&#x27;</span>;
  }
  <span class="hljs-comment">// value is string | number</span>

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&#x27;string&#x27;</span>) {
    <span class="hljs-keyword">return</span> value.<span class="hljs-property">length</span>;
  }
  <span class="hljs-comment">// value is number</span>

  <span class="hljs-keyword">return</span> value * <span class="hljs-number">2</span>;
}

<span class="hljs-comment">// Assignment narrowing</span>
<span class="hljs-keyword">let</span> <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> = <span class="hljs-string">&#x27;hello&#x27;</span>;
<span class="hljs-comment">// value is string | number, but currently &#x27;hello&#x27;</span>

value = <span class="hljs-number">42</span>;
<span class="hljs-comment">// value is still string | number, but currently 42</span>

<span class="hljs-keyword">if</span> (<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() &gt; <span class="hljs-number">0.5</span>) {
  value = <span class="hljs-string">&#x27;world&#x27;</span>;
  <span class="hljs-comment">// value is string in this block</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(value.<span class="hljs-title function_">toUpperCase</span>());
} <span class="hljs-keyword">else</span> {
  value = <span class="hljs-number">100</span>;
  <span class="hljs-comment">// value is number in this block</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(value.<span class="hljs-title function_">toFixed</span>(<span class="hljs-number">2</span>));
}
</code></pre>
<h2 id="never-والشمول-exhaustiveness">never والشمول (exhaustiveness)</h2>
<p>استخدم <code>never</code> لتتأكّد من أنك تعالج كل الحالات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Shape</span> =
  | { <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;circle&#x27;</span>; <span class="hljs-attr">radius</span>: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;square&#x27;</span>; <span class="hljs-attr">size</span>: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">kind</span>: <span class="hljs-string">&#x27;triangle&#x27;</span>; <span class="hljs-attr">base</span>: <span class="hljs-built_in">number</span>; <span class="hljs-attr">height</span>: <span class="hljs-built_in">number</span> };

<span class="hljs-keyword">function</span> <span class="hljs-title function_">getArea</span>(<span class="hljs-params"><span class="hljs-attr">shape</span>: <span class="hljs-title class_">Shape</span></span>): <span class="hljs-built_in">number</span> {
  <span class="hljs-keyword">switch</span> (shape.<span class="hljs-property">kind</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;circle&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-title class_">Math</span>.<span class="hljs-property">PI</span> * shape.<span class="hljs-property">radius</span> ** <span class="hljs-number">2</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;square&#x27;</span>:
      <span class="hljs-keyword">return</span> shape.<span class="hljs-property">size</span> ** <span class="hljs-number">2</span>;

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;triangle&#x27;</span>:
      <span class="hljs-keyword">return</span> (shape.<span class="hljs-property">base</span> * shape.<span class="hljs-property">height</span>) / <span class="hljs-number">2</span>;

    <span class="hljs-attr">default</span>:
      <span class="hljs-comment">// If we miss a case, TypeScript will error here</span>
      <span class="hljs-keyword">const</span> <span class="hljs-attr">exhaustive</span>: <span class="hljs-built_in">never</span> = shape;
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Unhandled shape: <span class="hljs-subst">\${exhaustive}</span>\`</span>);
  }
}

<span class="hljs-comment">// React reducer example</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">State</span> = {
  <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> | <span class="hljs-string">&#x27;loading&#x27;</span> | <span class="hljs-string">&#x27;success&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span>;
  <span class="hljs-attr">data</span>?: <span class="hljs-built_in">any</span>;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
};

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Action</span> =
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;FETCH_START&#x27;</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;FETCH_SUCCESS&#x27;</span>; <span class="hljs-attr">payload</span>: <span class="hljs-built_in">any</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;FETCH_ERROR&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> }
  | { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;RESET&#x27;</span> };

<span class="hljs-keyword">function</span> <span class="hljs-title function_">reducer</span>(<span class="hljs-params"><span class="hljs-attr">state</span>: <span class="hljs-title class_">State</span>, <span class="hljs-attr">action</span>: <span class="hljs-title class_">Action</span></span>): <span class="hljs-title class_">State</span> {
  <span class="hljs-keyword">switch</span> (action.<span class="hljs-property">type</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;FETCH_START&#x27;</span>:
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> };

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;FETCH_SUCCESS&#x27;</span>:
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>, <span class="hljs-attr">data</span>: action.<span class="hljs-property">payload</span> };

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;FETCH_ERROR&#x27;</span>:
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>, <span class="hljs-attr">error</span>: action.<span class="hljs-property">error</span> };

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;RESET&#x27;</span>:
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> };

    <span class="hljs-attr">default</span>:
      <span class="hljs-keyword">const</span> <span class="hljs-attr">exhaustive</span>: <span class="hljs-built_in">never</span> = action;
      <span class="hljs-keyword">return</span> state;
  }
}
</code></pre>
<h2 id="دوال-التأكيد-assertion-functions">دوال التأكيد (assertion functions)</h2>
<p>أنشئ دوال تؤكّد شروطًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> assertIsDefined&lt;T&gt;(<span class="hljs-attr">value</span>: T | <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span>): asserts value is T {
  <span class="hljs-keyword">if</span> (value === <span class="hljs-literal">null</span> || value === <span class="hljs-literal">undefined</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Value is null or undefined&#x27;</span>);
  }
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">assertIsString</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">unknown</span></span>): asserts value is <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value !== <span class="hljs-string">&#x27;string&#x27;</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Expected string, got <span class="hljs-subst">\${<span class="hljs-keyword">typeof</span> value}</span>\`</span>);
  }
}

<span class="hljs-comment">// Using assertion functions</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">processConfig</span>(<span class="hljs-params"><span class="hljs-attr">config</span>: <span class="hljs-title class_">Config</span> | <span class="hljs-literal">null</span></span>) {
  <span class="hljs-title function_">assertIsDefined</span>(config);
  <span class="hljs-comment">// config is Config from here on</span>

  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(config.<span class="hljs-property">apiUrl</span>);
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(config.<span class="hljs-property">timeout</span>);
}

<span class="hljs-comment">// React example</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">UserProfile</span> = (<span class="hljs-params">{ userId }: { userId: <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span> }</span>) =&gt; {
  <span class="hljs-title function_">assertIsDefined</span>(userId);
  <span class="hljs-comment">// userId is string from here on</span>

  <span class="hljs-keyword">const</span> user = <span class="hljs-title function_">useUser</span>(userId);

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>User: {user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
};
</code></pre>
<h2 id="السلسلة-الاختيارية-والتضييق">السلسلة الاختيارية والتضييق</h2>
<p>يفهم TypeScript السلسلة الاختيارية:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">address</span>?: {
    <span class="hljs-attr">street</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">city</span>: <span class="hljs-built_in">string</span>;
  };
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">getCity</span>(<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span></span>) {
  <span class="hljs-keyword">const</span> city = user.<span class="hljs-property">address</span>?.<span class="hljs-property">city</span>;
  <span class="hljs-comment">// city is string | undefined</span>

  <span class="hljs-keyword">if</span> (city) {
    <span class="hljs-comment">// city is string</span>
    <span class="hljs-keyword">return</span> city.<span class="hljs-title function_">toUpperCase</span>();
  }

  <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;No city&#x27;</span>;
}

<span class="hljs-comment">// With nullish coalescing</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">getDisplayName</span>(<span class="hljs-params"><span class="hljs-attr">user</span>: <span class="hljs-title class_">User</span> | <span class="hljs-literal">null</span></span>) {
  <span class="hljs-keyword">const</span> name = user?.<span class="hljs-property">name</span> ?? <span class="hljs-string">&#x27;Anonymous&#x27;</span>;
  <span class="hljs-comment">// name is string (never undefined or null)</span>

  <span class="hljs-keyword">return</span> name.<span class="hljs-title function_">toUpperCase</span>();
}
</code></pre>
<h2 id="تضييق-الأنواع-في-react">تضييق الأنواع في React</h2>
<h3 id="خصائص-المكونات">خصائص المكوّنات</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ButtonProps</span> =
  | { <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;primary&#x27;</span>; <span class="hljs-attr">onClick</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span> }
  | { <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;link&#x27;</span>; <span class="hljs-attr">href</span>: <span class="hljs-built_in">string</span> }
  | { <span class="hljs-attr">variant</span>: <span class="hljs-string">&#x27;disabled&#x27;</span> };

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Button</span> = (<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">ButtonProps</span></span>) =&gt; {
  <span class="hljs-keyword">switch</span> (props.<span class="hljs-property">variant</span>) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;primary&#x27;</span>:
      <span class="hljs-comment">// props has onClick</span>
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;btn-primary&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{props.onClick}</span>&gt;</span>
          Click me
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
      );

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;link&#x27;</span>:
      <span class="hljs-comment">// props has href</span>
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;btn-link&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">{props.href}</span>&gt;</span>
          Visit
        <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>
      );

    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;disabled&#x27;</span>:
      <span class="hljs-comment">// props has no additional properties</span>
      <span class="hljs-keyword">return</span> (
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;btn-disabled&quot;</span> <span class="hljs-attr">disabled</span>&gt;</span>
          Disabled
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
      );

    <span class="hljs-attr">default</span>:
      <span class="hljs-keyword">const</span> <span class="hljs-attr">exhaustive</span>: <span class="hljs-built_in">never</span> = props;
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Unhandled variant: <span class="hljs-subst">\${exhaustive}</span>\`</span>);
  }
};
</code></pre>
<h3 id="التصيير-الشرطي">التصيير الشرطي</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">DataState</span>&lt;T&gt; {
  <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> | <span class="hljs-string">&#x27;loading&#x27;</span> | <span class="hljs-string">&#x27;success&#x27;</span> | <span class="hljs-string">&#x27;error&#x27;</span>;
  <span class="hljs-attr">data</span>?: T;
  <span class="hljs-attr">error</span>?: <span class="hljs-title class_">Error</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title class_">DataDisplay</span>&lt;T&gt;({ state }: { <span class="hljs-attr">state</span>: <span class="hljs-title class_">DataState</span>&lt;T&gt; }) {
  <span class="hljs-keyword">if</span> (state.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;idle&#x27;</span>) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Ready to load<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">if</span> (state.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;loading&#x27;</span>) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }

  <span class="hljs-keyword">if</span> (state.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;error&#x27;</span>) {
    <span class="hljs-comment">// TypeScript knows error exists when status is &#x27;error&#x27;</span>
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Error: {state.error?.message}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }

  <span class="hljs-comment">// state.status is &#x27;success&#x27;, data should exist</span>
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Data: {JSON.stringify(state.data)}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}
</code></pre>
<h3 id="التحقق-من-النماذج">التحقّق من النماذج</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">ValidationResult</span> =
  | { <span class="hljs-attr">valid</span>: <span class="hljs-literal">true</span>; <span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span> }
  | { <span class="hljs-attr">valid</span>: <span class="hljs-literal">false</span>; <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> };

<span class="hljs-keyword">function</span> <span class="hljs-title function_">validateEmail</span>(<span class="hljs-params"><span class="hljs-attr">input</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-title class_">ValidationResult</span> {
  <span class="hljs-keyword">if</span> (!input.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;@&#x27;</span>)) {
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">valid</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Invalid email format&#x27;</span> };
  }

  <span class="hljs-keyword">return</span> { <span class="hljs-attr">valid</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">value</span>: input.<span class="hljs-title function_">trim</span>().<span class="hljs-title function_">toLowerCase</span>() };
}

<span class="hljs-keyword">const</span> <span class="hljs-title function_">EmailInput</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">const</span> [input, setInput] = <span class="hljs-title function_">useState</span>(<span class="hljs-string">&#x27;&#x27;</span>);

  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">validateEmail</span>(input);

    <span class="hljs-keyword">if</span> (result.<span class="hljs-property">valid</span>) {
      <span class="hljs-comment">// result.value is available</span>
      <span class="hljs-title function_">submitEmail</span>(result.<span class="hljs-property">value</span>);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// result.error is available</span>
      <span class="hljs-title function_">showError</span>(result.<span class="hljs-property">error</span>);
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      <span class="hljs-attr">value</span>=<span class="hljs-string">{input}</span>
      <span class="hljs-attr">onChange</span>=<span class="hljs-string">{e</span> =&gt;</span> setInput(e.target.value)}
      onBlur={handleSubmit}
    /&gt;</span>
  );
};
</code></pre>
<h2 id="أنماط-متقدمة">أنماط متقدّمة</h2>
<h3 id="الاتحادات-المميزة-discriminated-unions-ذات-الحقول-المتعددة">الاتحادات المميّزة (discriminated unions) ذات الحقول المتعدّدة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Response</span>&lt;T&gt; =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">data</span>: T; <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span>; <span class="hljs-attr">retryAfter</span>?: <span class="hljs-built_in">number</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;pending&#x27;</span>; <span class="hljs-attr">progress</span>?: <span class="hljs-built_in">number</span> };

<span class="hljs-keyword">function</span> handleResponse&lt;T&gt;(<span class="hljs-attr">response</span>: <span class="hljs-title class_">Response</span>&lt;T&gt;) {
  <span class="hljs-keyword">if</span> (response.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;success&#x27;</span>) {
    <span class="hljs-comment">// All success fields are available</span>
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Success at <span class="hljs-subst">\${response.timestamp}</span>: <span class="hljs-subst">\${response.data}</span>\`</span>);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (response.<span class="hljs-property">status</span> === <span class="hljs-string">&#x27;error&#x27;</span>) {
    <span class="hljs-comment">// All error fields are available</span>
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`Error: <span class="hljs-subst">\${response.error.message}</span>\`</span>);
    <span class="hljs-keyword">if</span> (response.<span class="hljs-property">retryAfter</span>) {
      <span class="hljs-built_in">setTimeout</span>(retry, response.<span class="hljs-property">retryAfter</span>);
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// response.status === &#x27;pending&#x27;</span>
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Pending... <span class="hljs-subst">\${response.progress ?? <span class="hljs-number">0</span>}</span>%\`</span>);
  }
}
</code></pre>
<h3 id="دمج-حراس-الأنواع">دمج حرّاس الأنواع</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">Admin</span> {
  <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;admin&#x27;</span>;
  <span class="hljs-attr">permissions</span>: <span class="hljs-built_in">string</span>[];
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">User</span> {
  <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;user&#x27;</span>;
  <span class="hljs-attr">subscription</span>?: <span class="hljs-string">&#x27;free&#x27;</span> | <span class="hljs-string">&#x27;premium&#x27;</span>;
}

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Person</span> = <span class="hljs-title class_">Admin</span> | <span class="hljs-title class_">User</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">hasPermission</span>(<span class="hljs-params"><span class="hljs-attr">person</span>: <span class="hljs-title class_">Person</span>, <span class="hljs-attr">permission</span>: <span class="hljs-built_in">string</span></span>): <span class="hljs-built_in">boolean</span> {
  <span class="hljs-comment">// First narrow by role</span>
  <span class="hljs-keyword">if</span> (person.<span class="hljs-property">role</span> === <span class="hljs-string">&#x27;admin&#x27;</span>) {
    <span class="hljs-comment">// person is Admin</span>
    <span class="hljs-keyword">return</span> person.<span class="hljs-property">permissions</span>.<span class="hljs-title function_">includes</span>(permission);
  }

  <span class="hljs-comment">// person is User</span>
  <span class="hljs-comment">// Further narrow by subscription</span>
  <span class="hljs-keyword">if</span> (person.<span class="hljs-property">subscription</span> === <span class="hljs-string">&#x27;premium&#x27;</span>) {
    <span class="hljs-comment">// Premium users have some permissions</span>
    <span class="hljs-keyword">return</span> [<span class="hljs-string">&#x27;read&#x27;</span>, <span class="hljs-string">&#x27;write&#x27;</span>].<span class="hljs-title function_">includes</span>(permission);
  }

  <span class="hljs-comment">// Free users have limited permissions</span>
  <span class="hljs-keyword">return</span> permission === <span class="hljs-string">&#x27;read&#x27;</span>;
}
</code></pre>
<h3 id="التضييق-مع-الأنواع-العامة">التضييق مع الأنواع العامة</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> processValue&lt;T&gt;(<span class="hljs-attr">value</span>: T | <span class="hljs-literal">null</span>, <span class="hljs-attr">processor</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: T</span>) =&gt;</span> <span class="hljs-built_in">void</span>): <span class="hljs-built_in">void</span> {
  <span class="hljs-keyword">if</span> (value !== <span class="hljs-literal">null</span>) {
    <span class="hljs-comment">// value is T (not null)</span>
    <span class="hljs-title function_">processor</span>(value);
  }
}

<span class="hljs-comment">// Type guard with generics</span>
<span class="hljs-keyword">function</span> isDefined&lt;T&gt;(<span class="hljs-attr">value</span>: T | <span class="hljs-literal">undefined</span>): value is T {
  <span class="hljs-keyword">return</span> value !== <span class="hljs-literal">undefined</span>;
}

<span class="hljs-keyword">function</span> filterDefined&lt;T&gt;(<span class="hljs-attr">items</span>: (T | <span class="hljs-literal">undefined</span>)[]): T[] {
  <span class="hljs-keyword">return</span> items.<span class="hljs-title function_">filter</span>(isDefined);
}
</code></pre>
<h2 id="مثال-من-العالم-الحقيقي-معالج-نموذج">مثال من العالم الحقيقي: معالج نموذج</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">FieldValue</span> = <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | <span class="hljs-built_in">boolean</span> | <span class="hljs-title class_">Date</span> | <span class="hljs-literal">null</span>;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Field</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">value</span>: <span class="hljs-title class_">FieldValue</span>;
  <span class="hljs-attr">validation</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-title class_">FieldValue</span></span>) =&gt;</span> <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span>;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Form</span> {
  <span class="hljs-attr">fields</span>: <span class="hljs-title class_">Field</span>[];
  <span class="hljs-attr">isValid</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">validateField</span>(<span class="hljs-params"><span class="hljs-attr">field</span>: <span class="hljs-title class_">Field</span></span>): <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span> {
  <span class="hljs-keyword">const</span> { value, validation } = field;

  <span class="hljs-comment">// Check for required field</span>
  <span class="hljs-keyword">if</span> (value === <span class="hljs-literal">null</span> || value === <span class="hljs-literal">undefined</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;Field is required&#x27;</span>;
  }

  <span class="hljs-comment">// Type-specific validation</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&#x27;string&#x27;</span>) {
    <span class="hljs-keyword">if</span> (value.<span class="hljs-title function_">trim</span>().<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;Field cannot be empty&#x27;</span>;
    }
    <span class="hljs-keyword">if</span> (value.<span class="hljs-property">length</span> &gt; <span class="hljs-number">255</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;Field is too long&#x27;</span>;
    }
  }

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&#x27;number&#x27;</span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">isNaN</span>(value)) {
      <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;Invalid number&#x27;</span>;
    }
    <span class="hljs-keyword">if</span> (value &lt; <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;Number must be positive&#x27;</span>;
    }
  }

  <span class="hljs-keyword">if</span> (value <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">Date</span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">isNaN</span>(value.<span class="hljs-title function_">getTime</span>())) {
      <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;Invalid date&#x27;</span>;
    }
    <span class="hljs-keyword">if</span> (value &lt; <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>()) {
      <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;Date must be in the future&#x27;</span>;
    }
  }

  <span class="hljs-comment">// Custom validation</span>
  <span class="hljs-keyword">if</span> (validation) {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">validation</span>(value);
  }

  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}

<span class="hljs-keyword">const</span> <span class="hljs-title function_">FormComponent</span> = (<span class="hljs-params">{ form }: { form: Form }</span>) =&gt; {
  <span class="hljs-keyword">const</span> <span class="hljs-title function_">handleSubmit</span> = (<span class="hljs-params"></span>) =&gt; {
    <span class="hljs-keyword">const</span> errors = form.<span class="hljs-property">fields</span>
      .<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">field</span> =&gt;</span> ({
        <span class="hljs-attr">field</span>: field.<span class="hljs-property">name</span>,
        <span class="hljs-attr">error</span>: <span class="hljs-title function_">validateField</span>(field)
      }))
      .<span class="hljs-title function_">filter</span>(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> result.<span class="hljs-property">error</span> !== <span class="hljs-literal">null</span>);

    <span class="hljs-keyword">if</span> (errors.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) {
      <span class="hljs-comment">// All fields are valid</span>
      <span class="hljs-title function_">submitForm</span>(form);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// Show errors</span>
      errors.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">{ field, error }</span>) =&gt;</span> {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(<span class="hljs-string">\`<span class="hljs-subst">\${field}</span>: <span class="hljs-subst">\${error}</span>\`</span>);
      });
    }
  };

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{e</span> =&gt;</span> {
      e.preventDefault();
      handleSubmit();
    }}&gt;
      {form.fields.map(field =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">FieldRenderer</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{field.name}</span> <span class="hljs-attr">field</span>=<span class="hljs-string">{field}</span> /&gt;</span>
      ))}
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span>
  );
};
</code></pre>
<h2 id="أفضل-الممارسات">أفضل الممارسات <span class="content-anchor" id="best-practices"></span></h2>
<h3 id="استخدم-الاتحادات-المميزة">استخدم الاتحادات المميّزة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good - Easy to narrow</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Result</span>&lt;T&gt; = { <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>; <span class="hljs-attr">data</span>: T } | { <span class="hljs-attr">success</span>: <span class="hljs-literal">false</span>; <span class="hljs-attr">error</span>: <span class="hljs-built_in">string</span> };

<span class="hljs-comment">// ❌ Avoid - Harder to narrow</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Result</span>&lt;T&gt; {
  <span class="hljs-attr">success</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">data</span>?: T;
  <span class="hljs-attr">error</span>?: <span class="hljs-built_in">string</span>;
}
</code></pre>
<h3 id="اجعل-الحالات-غير-الصالحة-غير-قابلة-للتمثيل">اجعل الحالات غير الصالحة غير قابلة للتمثيل</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good - Can&#x27;t have both data and error</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">State</span>&lt;T&gt; =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;loading&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;success&#x27;</span>; <span class="hljs-attr">data</span>: T }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-title class_">Error</span> };

<span class="hljs-comment">// ❌ Avoid - Could have data and error simultaneously</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">State</span>&lt;T&gt; {
  <span class="hljs-attr">isLoading</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">data</span>?: T;
  <span class="hljs-attr">error</span>?: <span class="hljs-title class_">Error</span>;
}
</code></pre>
<h3 id="استخدم-الفحوص-الشاملة">استخدم الفحوص الشاملة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Always include exhaustive checks</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">handle</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;a&#x27;</span> | <span class="hljs-string">&#x27;b&#x27;</span> | <span class="hljs-string">&#x27;c&#x27;</span></span>) {
  <span class="hljs-keyword">switch</span> (value) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;a&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;b&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;c&#x27;</span>:
      <span class="hljs-keyword">return</span> <span class="hljs-number">3</span>;
    <span class="hljs-attr">default</span>:
      <span class="hljs-keyword">const</span> <span class="hljs-attr">exhaustive</span>: <span class="hljs-built_in">never</span> = value;
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Unhandled value: <span class="hljs-subst">\${exhaustive}</span>\`</span>);
  }
}
</code></pre>
<h3 id="فضل-حراس-الأنواع-على-تأكيدات-الأنواع">فضّل حرّاس الأنواع على تأكيدات الأنواع</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// ✅ Good - Safe type narrowing</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">isString</span>(<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">unknown</span></span>): value is <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> value === <span class="hljs-string">&#x27;string&#x27;</span>;
}

<span class="hljs-keyword">if</span> (<span class="hljs-title function_">isString</span>(value)) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(value.<span class="hljs-title function_">toUpperCase</span>());
}

<span class="hljs-comment">// ❌ Avoid - Unsafe type assertion</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>((value <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>).<span class="hljs-title function_">toUpperCase</span>());
</code></pre>
<h2 id="الخلاصة">الخلاصة</h2>
<p>تضييق الأنواع وتحليل تدفّق التحكم أساسيان في كتابة شيفرة TypeScript آمنة. وهما يتيحان لك:</p>
<ol>
<li><strong>اكتب شيفرة أكثر أمانًا</strong> — يضمن TypeScript أنك تعالج كل الحالات</li>
<li><strong>تجنّب أخطاء وقت التشغيل</strong> — التقط مشكلات الأنواع وقت التصريف</li>
<li><strong>عبّر عن النية بوضوح</strong> — فحوص أنواعك توثّق منطقك</li>
<li><strong>قلّل الشيفرة الدفاعية</strong> — يعرف TypeScript متى تكون الفحوص غير ضرورية</li>
<li><strong>فعّل إعادة هيكلة أفضل</strong> — تُلتقط التغييرات في الأنواع فورًا</li>
</ol>
<p>أتقن هذه المفاهيم، وستكتب مكوّنات React لا آمنةً من حيث الأنواع فحسب، بل أسهل في الصيانة وأوضح في التفكير فيها.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
