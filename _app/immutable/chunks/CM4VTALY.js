const s="patterns-dev",a="vanilla",n="أنماط JavaScript",p="proxy-pattern",l="نمط الوسيط (proxy)",e=[{depth:2,id:"reflect",text:"Reflect"},{depth:2,id:"المفاضلات",text:"المفاضلات"},{depth:2,id:"المراجع",text:"المراجع"}],o=`<p>باستخدام كائن Proxy، نحصل على تحكم أكبر في التفاعلات مع كائنات معينة. ويمكن لكائن الوسيط (proxy) أن يحدد السلوك في كل مرة نتفاعل فيها مع الكائن، على سبيل المثال عندما نحصل على قيمة أو عندما نضبط قيمة.</p>
<p>عمومًا، الوساطة تعني وجود شخص يحل محل شخص آخر. وبدلًا من التحدث إلى ذلك الشخص مباشرةً، فإنك ستتحدث إلى شخص الوسيط الذي سيمثل الشخص الذي كنت تحاول الوصول إليه. ويحدث الشيء نفسه في JavaScript: بدلًا من التفاعل مع الكائن الهدف مباشرةً، سنتفاعل مع كائن Proxy.</p>
<p>لننشئ كائن <code>person</code> الذي يمثل John Doe.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> person = {

<span class="hljs-attr">name</span>: <span class="hljs-string">&quot;John Doe&quot;</span>,

<span class="hljs-attr">age</span>: <span class="hljs-number">42</span>,

<span class="hljs-attr">nationality</span>: <span class="hljs-string">&quot;American&quot;</span>,

};
</code></pre>
<p>بدلًا من التفاعل مع هذا الكائن مباشرةً، نريد التفاعل مع كائن وسيط. وفي JavaScript، يمكننا بسهولة إنشاء وسيط جديد عبر إنشاء نسخة جديدة من <code>Proxy</code>.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> person = {

<span class="hljs-attr">name</span>: <span class="hljs-string">&quot;John Doe&quot;</span>,

<span class="hljs-attr">age</span>: <span class="hljs-number">42</span>,

<span class="hljs-attr">nationality</span>: <span class="hljs-string">&quot;American&quot;</span>,

};

<span class="hljs-keyword">const</span> personProxy = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Proxy</span>(person, {});
</code></pre>
<p>المُعامل الثاني لـ <code>Proxy</code> هو كائن يمثّل <em>المُعالِج</em> (handler). وفي كائن المعالج، يمكننا تعريف سلوك محدد بناءً على نوع التفاعل. ورغم أن هناك <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy">طرقًا كثيرة</a> يمكنك إضافيتها إلى معالج Proxy، فإن أكثر طريقتين شيوعًا هما <code>get</code> و<code>set</code>:</p>
<ul>
<li><code>get</code>: تُستدعى عند محاولة <strong>الوصول</strong> إلى خاصية</li>
<li><code>set</code>: تُستدعى عند محاولة <strong>تعديل</strong> خاصية</li>
</ul>
<p>وبالفعالية، فإن ما سيحدث في نهاية المطاف هو الآتي:</p>
<p>بدلًا من التفاعل مع كائن <code>person</code> مباشرةً، سنتفاعل مع <code>personProxy</code>.</p>
<p>لنضِف معالجات إلى كائن Proxy أي <code>personProxy</code>. فعند محاولة تعديل خاصية، أي استدعاء الأسلوب <code>set</code> على <code>Proxy</code>، نريد أن يسجّل الوسيط القيمة السابقة والقيمة الجديدة للخاصية. وعند محاولة الوصول إلى خاصية، أي استدعاء الأسلوب <code>get</code> على <code>Proxy</code>، نريد أن يسجّل الوسيط جملة أكثر قابلية للقراءة تحتوي على اسم الخاصية وقيمتها.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> personProxy = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Proxy</span>(person, {

<span class="hljs-attr">get</span>: <span class="hljs-function">(<span class="hljs-params">obj, prop</span>) =&gt;</span> {

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`The value of <span class="hljs-subst">\${prop}</span> is <span class="hljs-subst">\${obj[prop]}</span>\`</span>);

},

<span class="hljs-attr">set</span>: <span class="hljs-function">(<span class="hljs-params">obj, prop, value</span>) =&gt;</span> {

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Changed <span class="hljs-subst">\${prop}</span> from <span class="hljs-subst">\${obj[prop]}</span> to <span class="hljs-subst">\${value}</span>\`</span>);

obj[prop] = value;

},

});
</code></pre>
<p>ممتاز! لنرَ ما يحدث عندما نحاول تعديل خاصية أو استرجاعها.</p>
<p>JavaScript iconindex.js</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> person = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;John Doe&quot;</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-number">42</span>,
  <span class="hljs-attr">nationality</span>: <span class="hljs-string">&quot;American&quot;</span>
};

<span class="hljs-keyword">const</span> personProxy = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Proxy</span>(person, {
  <span class="hljs-attr">get</span>: <span class="hljs-function">(<span class="hljs-params">obj, prop</span>) =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`The value of <span class="hljs-subst">\${prop}</span> is <span class="hljs-subst">\${obj[prop]}</span>\`</span>);
  },
  <span class="hljs-attr">set</span>: <span class="hljs-function">(<span class="hljs-params">obj, prop, value</span>) =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Changed <span class="hljs-subst">\${prop}</span> from <span class="hljs-subst">\${obj[prop]}</span> to <span class="hljs-subst">\${value}</span>\`</span>);
    obj[prop] = value;
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }
});

personProxy.<span class="hljs-property">name</span>;
personProxy.<span class="hljs-property">age</span> = <span class="hljs-number">43</span>;
</code></pre>
<p><a href="https://codesandbox.io/embed/cocky-bird-rkgyo">افتح CodeSandbox</a></p>
<p>عند الوصول إلى الخاصية <code>name</code>، أعاد الوسيط جملة أوضح: <code>The value of name is John Doe</code>.</p>
<p>وعند تعديل الخاصية <code>age</code>، أعاد الوسيط القيمة السابقة والجديدة لهذه الخاصية: <code>Changed age from 42 to 43</code>.</p>
<p>يمكن أن يكون الوسيط مفيدًا لإضافة <strong>التحقق من صحة البيانات</strong> (validation). فلا ينبغي أن يستطيع المستخدم تغيير عمر <code>person</code> إلى قيمة نصية، أو أن يعطيه اسمًا فارغًا. وأيضًا، إذا كان المستخدم يحاول الوصول إلى خاصية على الكائن غير موجودة، فينبغي أن نخبره بذلك.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> personProxy = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Proxy</span>(person, {

<span class="hljs-attr">get</span>: <span class="hljs-function">(<span class="hljs-params">obj, prop</span>) =&gt;</span> {

<span class="hljs-keyword">if</span> (!obj[prop]) {

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(

<span class="hljs-string">\`Hmm.. this property doesn&#x27;t seem to exist on the target object\`</span>

);

} <span class="hljs-keyword">else</span> {

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`The value of <span class="hljs-subst">\${prop}</span> is <span class="hljs-subst">\${obj[prop]}</span>\`</span>);

}

},

<span class="hljs-attr">set</span>: <span class="hljs-function">(<span class="hljs-params">obj, prop, value</span>) =&gt;</span> {

<span class="hljs-keyword">if</span> (prop === <span class="hljs-string">&quot;age&quot;</span> &amp;&amp; <span class="hljs-keyword">typeof</span> value !== <span class="hljs-string">&quot;number&quot;</span>) {

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Sorry, you can only pass numeric values for age.\`</span>);

} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (prop === <span class="hljs-string">&quot;name&quot;</span> &amp;&amp; value.<span class="hljs-property">length</span> &lt; <span class="hljs-number">2</span>) {

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`You need to provide a valid name.\`</span>);

} <span class="hljs-keyword">else</span> {

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Changed <span class="hljs-subst">\${prop}</span> from <span class="hljs-subst">\${obj[prop]}</span> to <span class="hljs-subst">\${value}</span>.\`</span>);

obj[prop] = value;

}

},

});
</code></pre>
<p>لنرَ ما يحدث عندما نحاول تمرير قيم خاطئة!</p>
<p>JavaScript iconindex.js</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> person = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;John Doe&quot;</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-number">42</span>,
  <span class="hljs-attr">nationality</span>: <span class="hljs-string">&quot;American&quot;</span>
};

<span class="hljs-keyword">const</span> personProxy = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Proxy</span>(person, {
  <span class="hljs-attr">get</span>: <span class="hljs-function">(<span class="hljs-params">obj, prop</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (!obj[prop]) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Hmm.. this property doesn&amp;#x27;t seem to exist\`</span>);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`The value of <span class="hljs-subst">\${prop}</span> is <span class="hljs-subst">\${obj[prop]}</span>\`</span>);
    }
  },
  <span class="hljs-attr">set</span>: <span class="hljs-function">(<span class="hljs-params">obj, prop, value</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (prop === <span class="hljs-string">&quot;age&quot;</span> &amp;&amp; <span class="hljs-keyword">typeof</span> value !== <span class="hljs-string">&quot;number&quot;</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Sorry, you can only pass numeric values for age.\`</span>);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (prop === <span class="hljs-string">&quot;name&quot;</span> &amp;&amp; value.<span class="hljs-property">length</span> &lt; <span class="hljs-number">2</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`You need to provide a valid name.\`</span>);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Changed <span class="hljs-subst">\${prop}</span> from <span class="hljs-subst">\${obj[prop]}</span> to <span class="hljs-subst">\${value}</span>.\`</span>);
      obj[prop] = value;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }
});

personProxy.<span class="hljs-property">nonExistentProperty</span>;
personProxy.<span class="hljs-property">age</span> = <span class="hljs-string">&quot;44&quot;</span>;
personProxy.<span class="hljs-property">name</span> = <span class="hljs-string">&quot;&quot;</span>;
</code></pre>
<p><a href="https://codesandbox.io/embed/focused-rubin-dgk2v">افتح CodeSandbox</a></p>
<p>تأكّد الوسيط من أننا لم نعدّل كائن <code>person</code> بقيم خاطئة، مما يساعدنا في الحفاظ على نقاء بياناتنا!</p>
<h2 id="reflect"><code>Reflect</code></h2>
<p>يوفّر JavaScript كائنًا مدمجًا باسم <code>Reflect</code>، الذي يجعل التلاعب بالهدف أصعب عند العمل مع الوسطاء.</p>
<p>في السابق، كنا نحاول تعديل الخصائص والوصول إليها على الكائن الهدف داخل الوسيط من خلال الحصول على القيم أو ضبطها مباشرةً باستخدام صيغة الأقواس المربعة. وبدلًا من ذلك، يمكننا استخدام كائن <code>Reflect</code>. وللأساليب الموجودة على كائن <code>Reflect</code> الاسم نفسه الذي تحمله أساليب كائن <code>handler</code>.</p>
<p>بدلًا من الوصول إلى الخصائص عبر <code>obj[prop]</code> أو ضبط الخصائص عبر <code>obj[prop] = value</code>، يمكننا الوصول إلى الخصائص على الكائن الهدف أو تعديلها عبر <code>Reflect.get()</code> و<code>Reflect.set()</code>. وتستقبل هذه الأساليب المعطيات نفسها التي تستقبلها أساليب كائن المعالج.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> personProxy = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Proxy</span>(person, {

<span class="hljs-attr">get</span>: <span class="hljs-function">(<span class="hljs-params">obj, prop</span>) =&gt;</span> {

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`The value of <span class="hljs-subst">\${prop}</span> is <span class="hljs-subst">\${<span class="hljs-built_in">Reflect</span>.get(obj, prop)}</span>\`</span>);

},

<span class="hljs-attr">set</span>: <span class="hljs-function">(<span class="hljs-params">obj, prop, value</span>) =&gt;</span> {

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Changed <span class="hljs-subst">\${prop}</span> from <span class="hljs-subst">\${obj[prop]}</span> to <span class="hljs-subst">\${value}</span>\`</span>);

<span class="hljs-title class_">Reflect</span>.<span class="hljs-title function_">set</span>(obj, prop, value);

},

});
</code></pre>
<p>ممتاز! يمكننا الوصول إلى الخصائص على الكائن الهدف وتعديلها بسهولة باستخدام كائن <code>Reflect</code>.</p>
<p>JavaScript iconindex.js</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> person = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;John Doe&quot;</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-number">42</span>,
  <span class="hljs-attr">nationality</span>: <span class="hljs-string">&quot;American&quot;</span>
};

<span class="hljs-keyword">const</span> personProxy = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Proxy</span>(person, {
  <span class="hljs-attr">get</span>: <span class="hljs-function">(<span class="hljs-params">obj, prop</span>) =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`The value of <span class="hljs-subst">\${prop}</span> is <span class="hljs-subst">\${<span class="hljs-built_in">Reflect</span>.get(obj, prop)}</span>\`</span>);
  },
  <span class="hljs-attr">set</span>: <span class="hljs-function">(<span class="hljs-params">obj, prop, value</span>) =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Changed <span class="hljs-subst">\${prop}</span> from <span class="hljs-subst">\${obj[prop]}</span> to <span class="hljs-subst">\${value}</span>\`</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Reflect</span>.<span class="hljs-title function_">set</span>(obj, prop, value);
  }
});

personProxy.<span class="hljs-property">name</span>;
personProxy.<span class="hljs-property">age</span> = <span class="hljs-number">43</span>;
personProxy.<span class="hljs-property">name</span> = <span class="hljs-string">&quot;Jane Doe&quot;</span>;
</code></pre>
<p><a href="https://codesandbox.io/embed/gallant-violet-o1hjx">افتح CodeSandbox</a></p>
<h2 id="المفاضلات">المفاضلات</h2>
<p>الوسطاء طريقة قوية لإضافة التحكم في سلوك كائن ما. وللوسيط حالات استخدام متنوعة: فيمكنه المساعدة في التحقق من صحة البيانات، والتنسيق، والإشعارات، أو التصحيح الأخطاء.</p>
<p>الإفراط في استخدام كائن <code>Proxy</code> أو تنفيذ عمليات ثقيلة مع كل استدعاء لأسلوب من أساليب <code>handler</code> يمكن أن يؤثر بسهولة وبشكل سلبي في أداء تطبيقك. ومن الأفضل ألا تستخدم الوسطاء مع الشيفرة الحرجة للأداء.</p>
<h2 id="المراجع">المراجع</h2>
<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy">Proxy</a> - MDN</li>
<li><a href="https://davidwalsh.name/javascript-proxy">JavaScript Proxy</a> - David Walsh</li>
<li><a href="https://github.com/mikaelbr/awesome-es2015-proxy">Awesome ES2015 Proxy</a> - GitHub @mikaelbr</li>
<li><a href="http://thecodebarbarian.com/thoughts-on-es6-proxies-performance">Thoughts on ES6 Proxies Performance</a> - Valeri Karpov</li>
</ul>
`,t={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:e,html:o};export{s as book,a as chapter,n as chapterTitle,t as default,e as headings,o as html,p as slug,l as title};
