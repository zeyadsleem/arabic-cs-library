const o="patterns-dev",e="vanilla",n="أنماط JavaScript",p="proxy-pattern",r="نمط الوسيط (proxy)",t=[{depth:2,id:"reflect",text:"Reflect"},{depth:2,id:"المفاضلات",text:"المفاضلات"},{depth:2,id:"المراجع",text:"المراجع"}],a=`<p>باستخدام كائن Proxy، نحصل على تحكم أكبر في التفاعلات مع كائنات معينة. ويمكن لكائن الوسيط (proxy) أن يحدد السلوك في كل مرة نتفاعل فيها مع الكائن، على سبيل المثال عندما نحصل على قيمة أو عندما نضبط قيمة.</p>
<p>عمومًا، الوساطة تعني وجود شخص يحل محل شخص آخر. وبدلًا من التحدث إلى ذلك الشخص مباشرةً، فإنك ستتحدث إلى شخص الوسيط الذي سيمثل الشخص الذي كنت تحاول الوصول إليه. ويحدث الشيء نفسه في JavaScript: بدلًا من التفاعل مع الكائن الهدف مباشرةً، سنتفاعل مع كائن Proxy.</p>
<p>لننشئ كائن <code>person</code> الذي يمثل John Doe.</p>
<pre><code>const person = {
  name: &quot;John Doe&quot;,
  age: 42,
  nationality: &quot;American&quot;,
};
</code></pre>
<p>بدلًا من التفاعل مع هذا الكائن مباشرةً، نريد التفاعل مع كائن وسيط. وفي JavaScript، يمكننا بسهولة إنشاء وسيط جديد عبر إنشاء نسخة جديدة من <code>Proxy</code>.</p>
<pre><code>const person = {
  name: &quot;John Doe&quot;,
  age: 42,
  nationality: &quot;American&quot;,
};

const personProxy = new Proxy(person, {});
</code></pre>
<p>المُعامل الثاني لـ <code>Proxy</code> هو كائن يمثّل <em>المُعالِج</em> (handler). وفي كائن المعالج، يمكننا تعريف سلوك محدد بناءً على نوع التفاعل. ورغم أن هناك <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy">طرقًا كثيرة</a> يمكنك إضافيتها إلى معالج Proxy، فإن أكثر طريقتين شيوعًا هما <code>get</code> و<code>set</code>:</p>
<ul>
<li><code>get</code>: تُستدعى عند محاولة <strong>الوصول</strong> إلى خاصية</li>
<li><code>set</code>: تُستدعى عند محاولة <strong>تعديل</strong> خاصية</li>
</ul>
<p>وبالفعالية، فإن ما سيحدث في نهاية المطاف هو الآتي:</p>
<p>بدلًا من التفاعل مع كائن <code>person</code> مباشرةً، سنتفاعل مع <code>personProxy</code>.</p>
<p>لنضِف معالجات إلى كائن Proxy أي <code>personProxy</code>. فعند محاولة تعديل خاصية، أي استدعاء الأسلوب <code>set</code> على <code>Proxy</code>، نريد أن يسجّل الوسيط القيمة السابقة والقيمة الجديدة للخاصية. وعند محاولة الوصول إلى خاصية، أي استدعاء الأسلوب <code>get</code> على <code>Proxy</code>، نريد أن يسجّل الوسيط جملة أكثر قابلية للقراءة تحتوي على اسم الخاصية وقيمتها.</p>
<pre><code>const personProxy = new Proxy(person, {
  get: (obj, prop) =&gt; {
    console.log(\`The value of \${prop} is \${obj[prop]}\`);
  },
  set: (obj, prop, value) =&gt; {
    console.log(\`Changed \${prop} from \${obj[prop]} to \${value}\`);
    obj[prop] = value;
  },
});
</code></pre>
<p>ممتاز! لنرَ ما يحدث عندما نحاول تعديل خاصية أو استرجاعها.</p>
<p>JavaScript iconindex.js</p>
<pre><code>const person = {
  name: &quot;John Doe&quot;,
  age: 42,
  nationality: &quot;American&quot;
};


const personProxy = new Proxy(person, {
  get: (obj, prop) =&gt; {
    console.log(\`The value of \${prop} is \${obj[prop]}\`);
  },
  set: (obj, prop, value) =&gt; {
    console.log(\`Changed \${prop} from \${obj[prop]} to \${value}\`);
    obj[prop] = value;
    return true;
  }
});


personProxy.name;
personProxy.age = 43;
</code></pre>
<p><a href="https://codesandbox.io/embed/cocky-bird-rkgyo">افتح CodeSandbox</a></p>
<p>عند الوصول إلى الخاصية <code>name</code>، أعاد الوسيط جملة أوضح: <code>The value of name is John Doe</code>.</p>
<p>وعند تعديل الخاصية <code>age</code>، أعاد الوسيط القيمة السابقة والجديدة لهذه الخاصية: <code>Changed age from 42 to 43</code>.</p>
<p>يمكن أن يكون الوسيط مفيدًا لإضافة <strong>التحقق من صحة البيانات</strong> (validation). فلا ينبغي أن يستطيع المستخدم تغيير عمر <code>person</code> إلى قيمة نصية، أو أن يعطيه اسمًا فارغًا. وأيضًا، إذا كان المستخدم يحاول الوصول إلى خاصية على الكائن غير موجودة، فينبغي أن نخبره بذلك.</p>
<pre><code>const personProxy = new Proxy(person, {
  get: (obj, prop) =&gt; {
    if (!obj[prop]) {
      console.log(
        \`Hmm.. this property doesn't seem to exist on the target object\`
      );
    } else {
      console.log(\`The value of \${prop} is \${obj[prop]}\`);
    }
  },
  set: (obj, prop, value) =&gt; {
    if (prop === &quot;age&quot; &amp;&amp; typeof value !== &quot;number&quot;) {
      console.log(\`Sorry, you can only pass numeric values for age.\`);
    } else if (prop === &quot;name&quot; &amp;&amp; value.length &lt; 2) {
      console.log(\`You need to provide a valid name.\`);
    } else {
      console.log(\`Changed \${prop} from \${obj[prop]} to \${value}.\`);
      obj[prop] = value;
    }
  },
});
</code></pre>
<p>لنرَ ما يحدث عندما نحاول تمرير قيم خاطئة!</p>
<p>JavaScript iconindex.js</p>
<pre><code>const person = {
  name: &quot;John Doe&quot;,
  age: 42,
  nationality: &quot;American&quot;
};


const personProxy = new Proxy(person, {
  get: (obj, prop) =&gt; {
    if (!obj[prop]) {
      console.log(\`Hmm.. this property doesn&amp;#x27;t seem to exist\`);
    } else {
      console.log(\`The value of \${prop} is \${obj[prop]}\`);
    }
  },
  set: (obj, prop, value) =&gt; {
    if (prop === &quot;age&quot; &amp;&amp; typeof value !== &quot;number&quot;) {
      console.log(\`Sorry, you can only pass numeric values for age.\`);
    } else if (prop === &quot;name&quot; &amp;&amp; value.length &lt; 2) {
      console.log(\`You need to provide a valid name.\`);
    } else {
      console.log(\`Changed \${prop} from \${obj[prop]} to \${value}.\`);
      obj[prop] = value;
    }
    return true;
  }
});


personProxy.nonExistentProperty;
personProxy.age = &quot;44&quot;;
personProxy.name = &quot;&quot;;
</code></pre>
<p><a href="https://codesandbox.io/embed/focused-rubin-dgk2v">افتح CodeSandbox</a></p>
<p>تأكّد الوسيط من أننا لم نعدّل كائن <code>person</code> بقيم خاطئة، مما يساعدنا في الحفاظ على نقاء بياناتنا!</p>
<h2 id="reflect"><code>Reflect</code></h2>
<p>يوفّر JavaScript كائنًا مدمجًا باسم <code>Reflect</code>، الذي يجعل التلاعب بالهدف أصعب عند العمل مع الوسطاء.</p>
<p>في السابق، كنا نحاول تعديل الخصائص والوصول إليها على الكائن الهدف داخل الوسيط من خلال الحصول على القيم أو ضبطها مباشرةً باستخدام صيغة الأقواس المربعة. وبدلًا من ذلك، يمكننا استخدام كائن <code>Reflect</code>. وللأساليب الموجودة على كائن <code>Reflect</code> الاسم نفسه الذي تحمله أساليب كائن <code>handler</code>.</p>
<p>بدلًا من الوصول إلى الخصائص عبر <code>obj[prop]</code> أو ضبط الخصائص عبر <code>obj[prop] = value</code>، يمكننا الوصول إلى الخصائص على الكائن الهدف أو تعديلها عبر <code>Reflect.get()</code> و<code>Reflect.set()</code>. وتستقبل هذه الأساليب المعطيات نفسها التي تستقبلها أساليب كائن المعالج.</p>
<pre><code>const personProxy = new Proxy(person, {
  get: (obj, prop) =&gt; {
    console.log(\`The value of \${prop} is \${Reflect.get(obj, prop)}\`);
  },
  set: (obj, prop, value) =&gt; {
    console.log(\`Changed \${prop} from \${obj[prop]} to \${value}\`);
    Reflect.set(obj, prop, value);
  },
});
</code></pre>
<p>ممتاز! يمكننا الوصول إلى الخصائص على الكائن الهدف وتعديلها بسهولة باستخدام كائن <code>Reflect</code>.</p>
<p>JavaScript iconindex.js</p>
<pre><code>const person = {
  name: &quot;John Doe&quot;,
  age: 42,
  nationality: &quot;American&quot;
};


const personProxy = new Proxy(person, {
  get: (obj, prop) =&gt; {
    console.log(\`The value of \${prop} is \${Reflect.get(obj, prop)}\`);
  },
  set: (obj, prop, value) =&gt; {
    console.log(\`Changed \${prop} from \${obj[prop]} to \${value}\`);
    return Reflect.set(obj, prop, value);
  }
});


personProxy.name;
personProxy.age = 43;
personProxy.name = &quot;Jane Doe&quot;;
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
`,c={book:o,chapter:e,chapterTitle:n,slug:p,title:r,headings:t,html:a};export{o as book,e as chapter,n as chapterTitle,c as default,t as headings,a as html,p as slug,r as title};
