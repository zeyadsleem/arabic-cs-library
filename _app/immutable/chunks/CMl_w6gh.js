const s="kinney",n="testing",a="مدخل إلى الاختبارات",t="how-tests-work",l="كيف تعمل الاختبارات",p=[{depth:2,id:"الإصرار-على-فشل-الاختبار",text:"الإصرار على فشل الاختبار"},{depth:2,id:"بعض-الفروق-الدقيقة-الإضافية",text:"بعض الفروق الدقيقة الإضافية"},{depth:2,id:"توقع-التوقع",text:"توقّع التوقّع"}],e=`<blockquote>
<p><strong>قاعدة ستيف الأولى في الاختبار</strong></p>
<p>لا تنجح اختباراتك لأن شيفرتك تعمل. بل تنجح اختباراتك لأن الشيفرة لا <em>تعمل بشكل خاطئ</em>.</p>
</blockquote>
<p>ينجح الاختبار لسبب واحد: <strong>لأنه لم يفشل</strong>.</p>
<p>يبدو هذا تافهًا، لكنه سيكون مهمًا لاحقًا، لذا سأقولها مرارًا وتكرارًا: لا وجود لشيء اسمه اختبار ناجح. هناك <em>فقط</em> اختبارات لم تفشل. إنه تمييز دقيق لكنه مهم.</p>
<p>هذا أحد الأسباب الكبيرة التي تجعل الناس يحاولون إقناعك بـ<a href="https://stevekinney.com/courses/testing/test-driven-development">التطوير المدفوع بالاختبارات</a>. الفكرة الأساسية هي أنه إذا استطعت البدء باختبار فاشل ثم جعلته ينجح، فيمكنك أن تكون <em>واثقًا جدًا</em> بأنك لا تواجه نتيجة إيجابية كاذبة.</p>
<p>إذا فكّرنا في كيفية عمل مجموعة الاختبارات، فهي شيء يشغّل شيفرتك ويتتبّع المرات التي رُمي فيها خطأ. فالـ<code>expect</code> الذي لم يحصل على ما يتوقّعه يرمي خطأً، وهذا يُفشل اختبارك. وإذا نجح اختبارك، فليس ذلك لأن هناك شيئًا صحيحًا في جوهر شيفرتك. بل ببساطة لا يوجد فيها شيء <em>خاطئ</em> في جوهرها.</p>
<p>من الواضح أن هذا الاختبار سيفشل.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should fail&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-literal">true</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">false</span>);
});
</code></pre>
<p>ومن المثير للاهتمام أن هذا الاختبار سيفشل <em>أيضًا</em>.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should fail&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Throwing is failing.&#x27;</span>);
});
</code></pre>
<p>وفي الوقت نفسه، سينجح هذا الاختبار.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should pass&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> four = <span class="hljs-number">2</span> + <span class="hljs-number">2</span>;
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(four);
});
</code></pre>
<p>ما يمكننا استنتاجه—بعيدًا عن أنني أخطأت في كتابة ذلك في الاختبار الثاني—هو أن الاختبار يفشل عندما يُرمى خطأ. وهذا يعني أنه لو أصابنا <em>ملل شديد</em>، <em>لأمكننا</em> كتابة نسخة ساذجة جدًا من <code>expect</code> تفتقد الكثير من مزايا النسخة التي يوفّرها Vitest أو Jest أو أيًا كان.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">expect</span> = (<span class="hljs-params">a</span>) =&gt; {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-title function_">toBe</span>(<span class="hljs-params">b</span>) {
      <span class="hljs-keyword">if</span> (a !== b) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Expected: <span class="hljs-subst">\${a}</span>, but got <span class="hljs-subst">\${b}</span>\`</span>);
      }
    },
  };
};
</code></pre>
<p>لحسن الحظ، لسنا بحاجة إلى ذلك. فكل مُشغّل اختبارات تحت الشمس تقريبًا يأتي مع مكتبة تحقّق أو توقّع. والوحيد الذي يمكنني التفكير فيه، <a href="https://mochajs.org/">Mocha</a>، له شقيق هو <a href="https://www.chaijs.com/">Chai</a>. ونظرًا لأسمائهما، يُفترض المرء أنهما مصمّمان للاستخدام معًا.</p>
<p>في الواقع، مكتبة التحقّق في Vitest <em>هي</em> Chai كما ترى <a href="https://github.com/vitest-dev/vitest/blob/1800167e4608327f335bc136f41543403486cfef/packages/vitest/package.json#L160">هنا</a>.</p>
<h2 id="الإصرار-على-فشل-الاختبار">الإصرار على فشل الاختبار</h2>
<p>لا أستخدم هذا أبدًا، لكنني متأكد من أن له سببًا للوجود، وربما يكون مفيدًا لك. يمكنك التصريح صراحةً بأنك تريد أن يفشل الاختبار.</p>
<pre><code class="language-javascript">test.<span class="hljs-title function_">fails</span>(<span class="hljs-string">&#x27;works with &quot;test&quot; as well&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-literal">true</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">false</span>);
});
</code></pre>
<p>إن أردت أن أقدّم لك تبريرًا لسبب ومتى تستخدم هذا، فهذا أفضل ما لديّ. ستنجح اختباراتك <strong>لسبب واحد</strong>: <em>لم يفشل أي من تحقّقاتك</em>. هذا بالتصميم، فلا فائدة من الشكوى منه.</p>
<p>هناك مأزق بالطبع؛ هل نجح اختبارك لأن:</p>
<ul>
<li>كل تحقّقاتك نجحت،</li>
<li>أم لأن <em>أيًا</em> منها لم يفشل؟</li>
</ul>
<p>كل ما يفعله مُشغّل الاختبارات <em>فعليًا</em> هو تشغيل شيفرتك وتتبّع كل مرة يُرمى فيها خطأ. والاختبار الفاشل يرمي خطأً. إذن يستنتج المنطق أنه إن لم يُرمَ أي خطأ، فقد نجح الاختبار.</p>
<h2 id="بعض-الفروق-الدقيقة-الإضافية">بعض الفروق الدقيقة الإضافية</h2>
<p>يبدو هذا واضحًا إلى أن نتذكّر الشيء الوحيد—إلى جانب DOM—الذي يجعل <em>كل شيء</em> في JavaScript صعبًا: <strong>اللاتزامن</strong>. وهذا خطير بشكل خاص مع الشيفرة غير المتزامنة.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;it will pass, unfortunately&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-string">&#x27;This should fail.&#x27;</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Totally not the same.&#x27;</span>);
  }, <span class="hljs-number">1000</span>);
});
</code></pre>
<p>إنه لا يفشل لأن الشيفرة غير المتزامنة صعبة. لكن إذا أضفنا تعليقًا يتضمّن التوقّع المحدّد بفشله، فيمكننا <em>على الأقل</em> الحصول على بعض التغذية الراجعة.</p>
<pre><code class="language-javascript">test.<span class="hljs-title function_">fails</span>(<span class="hljs-string">&#x27;works with &quot;test&quot; as well&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-title function_">expect</span>(<span class="hljs-string">&#x27;This should fail.&#x27;</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Totally not the same.&#x27;</span>);
  }, <span class="hljs-number">1000</span>);
});
</code></pre>
<p>سنتحدّث أكثر عن هذا في قسم <a href="https://stevekinney.com/courses/testing/testing-asynchronous-code">اختبار الشيفرة غير المتزامنة</a>، لكن إذا أعادت شيفرتك وعدًا (promise)، فسينتظر Vitest حتى يُحلّ ذلك الوعد.</p>
<pre><code class="language-typescript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;works with &quot;test&quot; as well&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">done</span>) =&gt;</span> {
    <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-title function_">expect</span>(<span class="hljs-string">&#x27;This should fail.&#x27;</span>).<span class="hljs-property">not</span>.<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;Totally not the same.&#x27;</span>);

      <span class="hljs-title function_">done</span>(<span class="hljs-literal">null</span>);
    }, <span class="hljs-number">500</span>);
  });
});
</code></pre>
<h2 id="توقع-التوقع">توقّع التوقّع</h2>
<p>إذا <em>أردت حقًا</em> التأكّد من أن اختباراتك لا تنجح لمجرد أنها لا تفشل، فيمكنك توقّع وجود تحقّق واحد أو أكثر في اختبارك.</p>
<pre><code class="language-typescript">expect.<span class="hljs-title function_">hasAssertions</span>();
</code></pre>
<p>بدلًا من ذلك، يمكنك توقّع عدد محدّد من التحقّقات.</p>
<pre><code class="language-typescript">expect.<span class="hljs-title function_">assertions</span>(<span class="hljs-number">1</span>);
</code></pre>
<p>سيأتي هذا مفيدًا عندما نتحدّث عن <a href="https://stevekinney.com/courses/testing/testing-asynchronous-code">اختبار الشيفرة غير المتزامنة</a>، لكن أولًا لنعمّق قليلًا في <a href="https://stevekinney.com/courses/testing/beyond-strict-equality">ما بعد المساواة الصارمة</a>.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,t as slug,l as title};
