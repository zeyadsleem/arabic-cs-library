const s="kinney",a="testing",n="مدخل إلى الاختبارات",t="alternatives-to-using-test-doubles",p="بدائل استخدام بدائل الاختبار (test doubles)",e=[{depth:2,id:"اختبر-الشيء-الحقيقي",text:"اختبر الشيء الحقيقي"},{depth:2,id:"حقن-اعتمادياتك",text:"حقن اعتمادياتك"},{depth:2,id:"استخدم-كائنات-حقيقية-لا-واجهات-محاكاة",text:"استخدم كائنات حقيقية، لا واجهات محاكاة"},{depth:2,id:"اختبارات-مكتفية-ذاتيا",text:"اختبارات مكتفية ذاتيًا"},{depth:2,id:"دع-الدوال-البسيطة-تفعل-فعلها",text:"دع الدوال البسيطة تفعل فعلها"},{depth:2,id:"أفكار-ختامية",text:"أفكار ختامية"}],l=`<p>ضع قبعة الخيال لثانية: أنت تكتب اختبارًا، و<em>يمكنك</em> محاكاة شيء ما، لكنه يبدو… خطأ.</p>
<p><a href="https://stevekinney.com/courses/testing/test-doubles">بدائل الاختبار (Test Doubles)</a> — تلك <a href="https://stevekinney.com/courses/testing/stubs">البدائل (stubs)</a> و<a href="https://stevekinney.com/courses/testing/mocks">البدائل المحاكاة (mocks)</a> و<a href="https://stevekinney.com/courses/testing/spies">الجواسيس (spies)</a> المفيدة — قد تكون مفيدة جدًا، لكنها ليست الخيار الأفضل دائمًا. في الواقع، الإفراط في استخدامها قد يؤدي إلى اختبارات هشة. لنلقِ نظرة على بعض البدائل المتينة لاستخدام بدائل الاختبار، ولنتعلم متى قد لا نحتاج إلى أجراس صندوق محاكاة لامعة.</p>
<h2 id="اختبر-الشيء-الحقيقي">اختبر الشيء الحقيقي</h2>
<p>حين يكون ممكنًا، غالبًا ما تكون كتابة الاختبارات باستخدام التنفيذ الفعلي هي الطريق الصحيح. تُبقي هذه المقاربة اختباراتك راسخة في الواقع وأقل عرضة للكسر لأن بعض البدائل المحاكاة تصرفت على نحو لم تتوقعه. فبدلًا من محاولة تظاهر ما سترجعه الدالة، دعها ترجع ما ينبغي أن ترجعه فعلًا.</p>
<p>لننظر إلى مثال.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">calculateTotal</span>(<span class="hljs-params">cartItems</span>) {
  <span class="hljs-keyword">return</span> cartItems.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">total, item</span>) =&gt;</span> total + item.<span class="hljs-property">price</span>, <span class="hljs-number">0</span>);
}

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;calculates correct total from cart items&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> items = [
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Widget&#x27;</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">9.99</span> },
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Gizmo&#x27;</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">12.49</span> },
  ];
  <span class="hljs-keyword">const</span> total = <span class="hljs-title function_">calculateTotal</span>(items);
  <span class="hljs-title function_">expect</span>(total).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">22.48</span>);
});
</code></pre>
<p>هنا، لا حاجة لبديل عن أي شيء، ولا حاجة لأي محاكاة، اختبر الأمر الحقيقي فقط. سلوك الدالة حتمي وبسيط. بوم. انتهى. شُحن.</p>
<h2 id="حقن-اعتمادياتك">حقن اعتمادياتك</h2>
<p>لنفترض أن دالتك تستدعي <em>جزءًا آخر</em> من شيفرتك. الإغراء هنا هو محاكاة تلك الدالة الأخرى وتجنب الآثار الجانبية الخارجية — لكن أحيانًا، ترك تلك الاعتماديات تفعل فعلها قد يمنحك نتيجة اختبار أفضل.</p>
<p>مثلًا، لنفترض أن لديك دالة <code>getUserCart</code> تصل إلى مخزن بيانات محلي وتستدعي <code>calculateTotal</code> داخليًا. بدلًا من محاكاة <code>calculateTotal</code>، استفد منها! فهي شيفرتك في النهاية، وإن كانت دوالك تعمل معًا بشكل جيد، فقد تعلمت عن نظامك أكثر بكثير مما لو استخدمت محاكاة جزئية.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">getUserCart</span>(<span class="hljs-params">userId, cartService</span>) {
  <span class="hljs-keyword">const</span> cartItems = cartService.<span class="hljs-title function_">getCartByUserId</span>(userId);
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">calculateTotal</span>(cartItems);
}

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;returns correct total from cart service&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> cartService = {
    <span class="hljs-attr">getCartByUserId</span>: <span class="hljs-function">(<span class="hljs-params">id</span>) =&gt;</span> [
      { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Thingamajig&#x27;</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">19.99</span> },
      { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Doodad&#x27;</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">5.99</span> },
    ],
  };

  <span class="hljs-keyword">const</span> total = <span class="hljs-title function_">getUserCart</span>(<span class="hljs-number">123</span>, cartService);
  <span class="hljs-title function_">expect</span>(total).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">25.98</span>);
});
</code></pre>
<p>هنا، لا أحاكي <code>calculateTotal</code> — أريد أن أرى إن كانت تعمل كجزء من <code>getUserCart</code>. حتى مع تحكمي في <code>cartService</code> داخل الاختبار، أترك بقية الشيفرة تستخدم تنفيذها. في كثير من الحالات، ترك الاعتماديات الحقيقية تعمل بحرية يمنحك ثقة أكبر بكثير من الاعتماد على البدائل المحاكاة في كل شيء.</p>
<h2 id="استخدم-كائنات-حقيقية-لا-واجهات-محاكاة">استخدم كائنات حقيقية، لا واجهات محاكاة</h2>
<p>عند اختبار دوال ترجع كائنات معقدة، قد يكون مغريًا استبدال الاعتماديات التي نستدعيها ببدائل محاكاة. لكن انتظر! قد يكون الأفضل لك استخدام كائنات حقيقية أو مصانع لإنشاء هذه الأشياء المعقدة، خاصةً إن كانت خفيفة نسبيًا.</p>
<p>لنفترض أن لديك كائن <code>CartItem</code> يحمل بيانات وطريقة مرتبطة به.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">class</span> <span class="hljs-title class_">CartItem</span> {
  <span class="hljs-title function_">constructor</span>(<span class="hljs-params">name, price</span>) {
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">name</span> = name;
    <span class="hljs-variable language_">this</span>.<span class="hljs-property">price</span> = price;
  }

  <span class="hljs-title function_">getPrice</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">price</span>;
  }
}
</code></pre>
<p>إن كنت تختبر سلوك <code>getPrice</code>، فمن المحتمل ألا تحتاج إلى محاكاته — استخدم الشيء الحقيقي فقط!</p>
<pre><code class="language-javascript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;calculates price of cart item correctly&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> item = <span class="hljs-keyword">new</span> <span class="hljs-title class_">CartItem</span>(<span class="hljs-string">&#x27;Component A&#x27;</span>, <span class="hljs-number">99.99</span>);
  <span class="hljs-title function_">expect</span>(item.<span class="hljs-title function_">getPrice</span>()).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">99.99</span>);
});
</code></pre>
<p>لا حاجة لمحاكاة ذلك <code>CartItem</code>؛ فهو بسيط بما يكفي وأسرع في الاستخدام المباشر.</p>
<h2 id="اختبارات-مكتفية-ذاتيا">اختبارات مكتفية ذاتيًا</h2>
<p>أحيانًا توجد البدائل المحاكاة لترقيع اختبار مسرّب… لكن لنكن واقعيين — ربما الاختبار ليس محصورًا كما <em>ينبغي</em> أن يكون. إن كانت اختباراتك معتمدة على نفسها ومركزة، فلن تحتاج كل سقالات المحاكاة لإمساكها. قبل الوصول إلى محاكاة، اسأل نفسك: <em>هل ينبغي أن يعرف هذا الاختبار كل جزء آخر من النظام؟</em> غالبًا الجواب لا، والاختبار الأصغر يعني عدم الحاجة إلى محاكاة.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;correctly sums prices in cart&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> cart = [{ <span class="hljs-attr">price</span>: <span class="hljs-number">10</span> }, { <span class="hljs-attr">price</span>: <span class="hljs-number">20</span> }];

  <span class="hljs-keyword">const</span> total = cart.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, item</span>) =&gt;</span> sum + item.<span class="hljs-property">price</span>, <span class="hljs-number">0</span>);
  <span class="hljs-title function_">expect</span>(total).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">30</span>);
});
</code></pre>
<p>هنا، لا أحتاج إلى محاكاة أي شيء — فقط أُعدّ بياناتي، وأنفّذ إجرائي، وأتحقق من النتيجة. (لقد تحققت نيرفانا الاختبار!)</p>
<h2 id="دع-الدوال-البسيطة-تفعل-فعلها">دع الدوال البسيطة تفعل فعلها</h2>
<p>بـ «الدوال البسيطة» أعني الدوال النقية أو الدوال بلا آثار جانبية. هذه أصدقاؤك أثناء الاختبار. تعطيها مدخلات، فتفعل فعلها، وتبصق النتيجة الصحيحة — دون حاجة لمحاكاة سلوكها.</p>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">add</span>(<span class="hljs-params">a, b</span>) {
  <span class="hljs-keyword">return</span> a + b;
}

<span class="hljs-title function_">test</span>(<span class="hljs-string">&#x27;adds numbers correctly&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">add</span>(<span class="hljs-number">2</span>, <span class="hljs-number">3</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-number">5</span>);
});
</code></pre>
<p>أعني، هذا أساسي لدرجة <em>مؤلمة</em> — لكننا أحيانًا نعقّد الأمور دون داعٍ بمحاكاة دوال لا تحتاج ذلك فعلًا. إن لم يكن هناك شيء آخر، فتذكر: البساطة مَلِك في الاختبارات.</p>
<h2 id="أفكار-ختامية">أفكار ختامية</h2>
<p>لا تفهمني خطأ: للمحاكاة <em>مكانها</em> (وVitest يجعل محاكاة الأشياء بـ <code>vi.fn()</code> سهلة جدًا)، لكنها مشرط لا مطرقة ثقيلة. اسأل نفسك دائمًا إن كان يمكنك اختبار التنفيذ الحقيقي أولًا. <em>الشيفرة الحقيقية تعني نتائج حقيقية.</em> إن اخترت هذا الطريق، فستكون اختباراتك أكثر موثوقية، وستقضي وقتًا أقل في القلق على تعقيدات المحاكاة، ويمكنك التركيز بالليزر على كسر شيفرتك بطرق لا يفعلها إلا المستخدمون <em>الحقيقيون</em>. أهداف متوائمة، وذهن مرتاح، واختبار نقي.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:p,headings:e,html:l};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,l as html,t as slug,p as title};
