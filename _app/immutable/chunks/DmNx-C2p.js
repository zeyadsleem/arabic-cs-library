const s="kinney",n="testing",a="مدخل إلى الاختبارات",l="unhappy-path",t="المسار غير السعيد",p=[{depth:2,id:"لماذا-تختبر-المسار-غير-السعيد",text:"لماذا تختبر المسار غير السعيد؟"},{depth:2,id:"سيناريوهات-شائعة-للمسار-غير-السعيد",text:"سيناريوهات شائعة للمسار غير السعيد"},{depth:2,id:"اختبار-المدخلات-غير-الصالحة",text:"اختبار المدخلات غير الصالحة"},{depth:3,id:"أمثلة-إضافية-على-المدخلات-غير-الصالحة",text:"أمثلة إضافية على المدخلات غير الصالحة"},{depth:2,id:"اختبار-الأخطاء-في-الدوال-غير-المتزامنة",text:"اختبار الأخطاء في الدوال غير المتزامنة"},{depth:2,id:"اختبار-الشروط-الحدية",text:"اختبار الشروط الحدّية"},{depth:2,id:"اختبار-الاعتماديات-الخارجية-وإخفاقاتها",text:"اختبار الاعتماديات الخارجية وإخفاقاتها"},{depth:2,id:"الخاتمة",text:"الخاتمة"}],e=`<p>لا، هذا <em>ليس</em> اسم فرقتي الموسيقية الجديدة.</p>
<p>يشير «المسار السعيد» إلى السيناريو الذي يعمل فيه كل شيء كما هو متوقّع—المدخلات صالحة، والظروف مثالية، ولا تحدث أخطاء. لكن العالم الحقيقي™ ليس لطيفًا إلى هذا الحد أبدًا.</p>
<p>هنا يأتي دور اختبار <strong>المسار غير السعيد™</strong>. يختبر المسار غير السعيد كيف تتصرّف شيفرتك عندما تسوء الأمور—مدخلات غير صالحة، أو عمليات فاشلة، أو ظروف غير متوقّعة.</p>
<p>اختبار المسار غير السعيد يضمن أن تطبيقك يتعامل مع الحالات الحدّية والأخطاء والمدخلات غير المتوقّعة بلطف. ويوفّر Vitest أدوات متنوّعة لاختبار هذه السيناريوهات بفعالية.</p>
<h2 id="لماذا-تختبر-المسار-غير-السعيد">لماذا تختبر المسار غير السعيد؟</h2>
<p>أظن أنني لست بحاجة حقًا إلى إقناعك بهذا، لكن على سبيل الاحتياط:</p>
<ul>
<li><strong>المتانة</strong>: باختبار كيف تتصرّف شيفرتك في ظروف غير طبيعية، تضمن أن تطبيقك متين ويستطيع التعامل مع مشكلات العالم الحقيقي مثل المدخلات غير الصالحة وفشل الشبكة وغيرها.</li>
<li><strong>معالجة الأخطاء</strong>: التحقّق من أن شيفرتك ترمي الأخطاء وتلتقطها بشكل صحيح أمر جوهري لضمان التعافي السلس من الإخفاقات.</li>
<li><strong>الأمان</strong>: يساعد اختبار الحالات الحدّية في منع السلوكيات غير المتوقّعة التي قد تكشف ثغرات.</li>
<li><strong>تجربة المستخدم</strong>: يفعل المستخدمون أغرب الأشياء—أليس كذلك؟ التعامل بلطف مع الأخطاء يوفّر تجارب مستخدم أفضل بمنع الأعطال أو الاستثناءات غير المعالجة.</li>
</ul>
<h2 id="سيناريوهات-شائعة-للمسار-غير-السعيد">سيناريوهات شائعة للمسار غير السعيد</h2>
<p>يشمل اختبار المسار غير السعيد سيناريوهات فشل متنوّعة، مثل:</p>
<ul>
<li>مدخلات غير صالحة (مثل السلاسل الفارغة، و<code>null</code>، و<code>undefined</code>، وأنواع بيانات خاطئة).</li>
<li>عمليات غير ناجحة (مثل فشل الشبكة وأخطاء قاعدة البيانات).</li>
<li>شروط حدّية (مثل القيم الخارجة عن النطاق).</li>
<li>استثناءات ترميها اعتماديات أو دوال خارجية.</li>
</ul>
<h2 id="اختبار-المدخلات-غير-الصالحة">اختبار المدخلات غير الصالحة</h2>
<p>يكفي نحو ثلاث دقائق من الحديث مع شخص يكتب لغة برمجة أخرى لتسمع النكات عن JavaScript.</p>
<ul>
<li><code>true + true === 2</code></li>
<li><code>1 + '1' === '11'</code></li>
<li><code>NaN !== NaN</code></li>
</ul>
<p>القائمة تطول—لكن لدينا ما هو أهم. من المؤكد أن دوالنا الحسابية الأساسية من قبل عرضة لهذا، أليس كذلك؟ ماذا سيحدث في الحالات التالية؟</p>
<ul>
<li><code>add(1)</code></li>
<li><code>add(null, 1)</code></li>
<li><code>add('1', 2)</code></li>
<li><code>add(2, 'potato')</code></li>
<li><code>subtract('1', 1)</code></li>
<li><code>divide(5, 0)</code></li>
</ul>
<p>وهكذا دواليك. الإجابة <em>الخاطئة</em> الوحيدة هنا هي <code>:shrug:</code>. في أي من هذه الحالات حقًا، لدينا نحو خيارين اثنين لا أكثر:</p>
<ul>
<li>أن نفشل بلطف.</li>
<li>أن نقلب طاولة (أي نرمي خطأً)</li>
</ul>
<p><em>يجب</em> أن تغطي اختباراتنا هذه الحالات الحدّية، وهذا أحد الفروق الدقيقة في التطوير المدفوع بالاختبارات. لا يوجد في TDD ما يمنعك من فعل هذه الأشياء—لكن الاكتفاء بدورة الأحمر-الأخضر-إعادة الهيكلة <em>أيضًا</em> لن يوصلك إلى هناك تمامًا.</p>
<h3 id="أمثلة-إضافية-على-المدخلات-غير-الصالحة">أمثلة إضافية على المدخلات غير الصالحة</h3>
<p>من المسارات غير السعيدة الشائعة أن يقدّم المستخدم مدخلات غير صالحة. ينبغي أن تختبر كيف تتصرّف شيفرتك حين تتلقّى مدخلات لا تلبي التوقّعات.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Function to be tested</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">parseAge</span>(<span class="hljs-params">age</span>) {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> age !== <span class="hljs-string">&#x27;number&#x27;</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Invalid age format&#x27;</span>);
  }
  <span class="hljs-keyword">if</span> (age &lt; <span class="hljs-number">0</span> || age &gt; <span class="hljs-number">120</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Age must be between 0 and 120&#x27;</span>);
  }
  <span class="hljs-keyword">return</span> age;
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;parseAge&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should throw an error for non-number input&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test invalid input: string</span>
    <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">parseAge</span>(<span class="hljs-string">&#x27;thirty&#x27;</span>)).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;Invalid age format&#x27;</span>);

    <span class="hljs-comment">// Test invalid input: null</span>
    <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">parseAge</span>(<span class="hljs-literal">null</span>)).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;Invalid age format&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should throw an error for out-of-range age&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test invalid age: negative number</span>
    <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">parseAge</span>(-<span class="hljs-number">5</span>)).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;Age must be between 0 and 120&#x27;</span>);

    <span class="hljs-comment">// Test invalid age: too high</span>
    <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">parseAge</span>(<span class="hljs-number">130</span>)).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;Age must be between 0 and 120&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return the valid age for a number between 0 and 120&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test valid input</span>
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">parseAge</span>(<span class="hljs-number">25</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">25</span>);
  });
});
</code></pre>
<p>في هذا المثال:</p>
<ul>
<li>نختبر مدخلات غير صالحة مختلفة (سلسلة و<code>null</code>) ونتوقّع أن ترمي الدالة خطأً.</li>
<li>نختبر أعدادًا خارج النطاق للتأكّد من أن الدالة ترمي خطأً عندما يكون المدخل خارج النطاق المقبول.</li>
<li>يُضمَّن المسار السعيد أيضًا للتحقّق من أن الدالة تتصرّف بشكل صحيح مع مدخل صالح.</li>
</ul>
<blockquote>
<p><strong>لنتعلّم كيف نختبر المسار غير السعيد</strong></p>
<p>هناك مجموعة من الأمثلة الأخرى أدناه، لكن لنأخذ لحظة للنظر في كيفية إضافة مزيد من الصلابة إلى المثال الذي كنا نعمل عليه في <a href="https://stevekinney.com/courses/testing/error-handling-and-edge-case-testing">اختبار معالجة الأخطاء والحالات الحدّية</a>.</p>
</blockquote>
<h2 id="اختبار-الأخطاء-في-الدوال-غير-المتزامنة">اختبار الأخطاء في الدوال غير المتزامنة</h2>
<p>عند العمل مع دوال غير متزامنة، مثل استدعاءات API أو استعلامات قاعدة البيانات، من المهم اختبار سيناريوهات الفشل مثل أخطاء الشبكة أو المهل المنتهية أو عدم توفّر الخدمة.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Asynchronous function to be tested</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchUserData</span>(<span class="hljs-params">userId</span>) {
  <span class="hljs-keyword">if</span> (!userId) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;User ID is required&#x27;</span>);
  }
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">\`/api/users/<span class="hljs-subst">\${userId}</span>\`</span>);
  <span class="hljs-keyword">if</span> (!response.<span class="hljs-property">ok</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Failed to fetch user data&#x27;</span>);
  }
  <span class="hljs-keyword">return</span> response.<span class="hljs-title function_">json</span>();
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;fetchUserData&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should throw an error if userId is not provided&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Test for missing userId</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">fetchUserData</span>()).<span class="hljs-property">rejects</span>.<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;User ID is required&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should throw an error if the API response is not ok&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Mock the fetch function to simulate an API error</span>
    <span class="hljs-variable language_">global</span>.<span class="hljs-property">fetch</span> = vi.<span class="hljs-title function_">fn</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>({ <span class="hljs-attr">ok</span>: <span class="hljs-literal">false</span> }));

    <span class="hljs-comment">// Test for API failure</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">fetchUserData</span>(<span class="hljs-number">1</span>)).<span class="hljs-property">rejects</span>.<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;Failed to fetch user data&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return user data on success&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Mock fetch to return valid data</span>
    <span class="hljs-variable language_">global</span>.<span class="hljs-property">fetch</span> = vi.<span class="hljs-title function_">fn</span>(<span class="hljs-function">() =&gt;</span>
      <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>({
        <span class="hljs-attr">ok</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">json</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>({ <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;John Doe&#x27;</span> }),
      }),
    );

    <span class="hljs-comment">// Test happy path</span>
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchUserData</span>(<span class="hljs-number">1</span>);
    <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toEqual</span>({ <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;John Doe&#x27;</span> });
  });
});
</code></pre>
<p>في هذا المثال:</p>
<ul>
<li>يتحقّق الاختبار الأول من أن الدالة ترمي خطأً إذا كان <code>userId</code> مفقودًا.</li>
<li>يحاكي الاختبار الثاني دالة <code>fetch</code> لمضاهاة خطأ في API ويتحقّق من أن الدالة ترمي خطأً.</li>
<li>يُختبر المسار السعيد أيضًا لضمان التعامل الصحيح مع البيانات الصالحة.</li>
</ul>
<h2 id="اختبار-الشروط-الحدية">اختبار الشروط الحدّية</h2>
<p>الشروط الحدّية مصدر شائع آخر للأخطاء. اختبار أطراف النطاقات الصالحة يضمن أن شيفرتك تتصرّف بشكل صحيح مع القيم الحدّية الصالحة وغير الصالحة معًا.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Function to be tested</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">calculateDiscount</span>(<span class="hljs-params">price</span>) {
  <span class="hljs-keyword">if</span> (price &lt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Price cannot be negative&#x27;</span>);
  }
  <span class="hljs-keyword">if</span> (price &gt; <span class="hljs-number">1000</span>) {
    <span class="hljs-keyword">return</span> price * <span class="hljs-number">0.2</span>; <span class="hljs-comment">// 20% discount for high prices</span>
  }
  <span class="hljs-keyword">return</span> price * <span class="hljs-number">0.1</span>; <span class="hljs-comment">// 10% discount otherwise</span>
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;calculateDiscount&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should throw an error for negative prices&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test boundary condition: negative price</span>
    <span class="hljs-title function_">expect</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title function_">calculateDiscount</span>(-<span class="hljs-number">10</span>)).<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;Price cannot be negative&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should apply 10% discount for prices less than 1000&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test boundary condition: price below 1000</span>
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">calculateDiscount</span>(<span class="hljs-number">500</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">50</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should apply 20% discount for prices above 1000&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Test boundary condition: price above 1000</span>
    <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">calculateDiscount</span>(<span class="hljs-number">1500</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">300</span>);
  });
});
</code></pre>
<p>في هذا المثال:</p>
<ul>
<li>يُختبر المسار غير السعيد بالتحقّق من أن الأسعار السالبة ترمي خطأً.</li>
<li>يُختبر الشرط الحدّي للأسعار فوق 1000 لضمان تطبيق الخصم الصحيح.</li>
</ul>
<h2 id="اختبار-الاعتماديات-الخارجية-وإخفاقاتها">اختبار الاعتماديات الخارجية وإخفاقاتها</h2>
<p>تعتمد تطبيقات كثيرة على خدمات خارجية، مثل قواعد البيانات أو واجهات API. اختبار المسار غير السعيد يعني مضاهاة فشل هذه الاعتماديات الخارجية أو إعادتها نتائج غير متوقّعة.</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Mocking a database call</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> db <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./db&#x27;</span>;

<span class="hljs-comment">// Function to be tested</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getUserData</span>(<span class="hljs-params">userId</span>) {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> db.<span class="hljs-title function_">findUserById</span>(userId);
    <span class="hljs-keyword">if</span> (!user) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;User not found&#x27;</span>);
    }
    <span class="hljs-keyword">return</span> user;
  } <span class="hljs-keyword">catch</span> (error) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Database error&#x27;</span>);
  }
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;getUserData&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should throw an error if the user is not found&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Mock the database to return null (user not found)</span>
    vi.<span class="hljs-title function_">spyOn</span>(db, <span class="hljs-string">&#x27;findUserById&#x27;</span>).<span class="hljs-title function_">mockResolvedValue</span>(<span class="hljs-literal">null</span>);

    <span class="hljs-comment">// Test that the function throws the correct error</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">getUserData</span>(<span class="hljs-number">1</span>)).<span class="hljs-property">rejects</span>.<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;User not found&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should throw an error for database failure&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Mock the database to simulate an error</span>
    vi.<span class="hljs-title function_">spyOn</span>(db, <span class="hljs-string">&#x27;findUserById&#x27;</span>).<span class="hljs-title function_">mockRejectedValue</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Database failure&#x27;</span>));

    <span class="hljs-comment">// Test that the function throws a database error</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">getUserData</span>(<span class="hljs-number">1</span>)).<span class="hljs-property">rejects</span>.<span class="hljs-title function_">toThrow</span>(<span class="hljs-string">&#x27;Database error&#x27;</span>);
  });

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return user data if the user exists&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Mock the database to return a valid user</span>
    vi.<span class="hljs-title function_">spyOn</span>(db, <span class="hljs-string">&#x27;findUserById&#x27;</span>).<span class="hljs-title function_">mockResolvedValue</span>({ <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;John Doe&#x27;</span> });

    <span class="hljs-comment">// Test happy path</span>
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getUserData</span>(<span class="hljs-number">1</span>);
    <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toEqual</span>({ <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;John Doe&#x27;</span> });
  });
});
</code></pre>
<p>في هذا المثال:</p>
<ul>
<li>نحاكي قاعدة بيانات تُعيد <code>null</code> لاختبار سيناريو عدم العثور على المستخدم.</li>
<li>نحاكي قاعدة البيانات لمضاهاة إخفاق ونتحقّق من أن الدالة ترمي الخطأ الصحيح.</li>
<li>يُختبر المسار السعيد أيضًا لضمان أن الدالة تعمل بشكل صحيح عند العثور على المستخدم.</li>
</ul>
<h2 id="الخاتمة">الخاتمة <span class="content-anchor" id="conclusion"></span></h2>
<p>اختبار المسار غير السعيد™ جوهري لضمان أن تطبيقك يستطيع التعامل مع سيناريوهات العالم الحقيقي، بما فيها المدخلات غير الصالحة والعمليات الفاشلة وإخفاقات الخدمات الخارجية. باستخدام أدوات Vitest القوية مثل <code>toThrow()</code> و<code>rejects.toThrow()</code> والمضاهاة، يمكنك محاكاة هذه الحالات الحدّية والتحقّق من أن شيفرتك تستجيب بشكل مناسب. اختبار المسار غير السعيد يؤدي إلى تطبيقات أكثر متانة وتجارب مستخدم أفضل بالتعامل بلطف مع الأخطاء ومنع الأعطال أو السلوك غير المتوقّع.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
