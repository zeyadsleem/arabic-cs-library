const s="kinney",a="self-testing-ai-agents",n="وكلاء ذكاء اصطناعي يختبرون أنفسهم",e="the-waiting-story",t="حكاية الانتظار",l=[{depth:2,id:"الخطيئة",text:"الخطيئة"},{depth:2,id:"النسخة-الأفضل-بلا-سحر",text:"النسخة الأفضل، بلا سحر"},{depth:2,id:"الأفعال-تنتظر-أصلا-قابلية-التنفيذ",text:"الأفعال تنتظر أصلًا قابلية التنفيذ"},{depth:2,id:"المجسات-المنطقية-ليست-انتظارا",text:"المجسّات المنطقية ليست انتظارًا"},{depth:2,id:"الانتظار-على-الشبكة-لا-على-الساعات",text:"الانتظار على الشبكة، لا على الساعات"},{depth:2,id:"fill-أولا-وpresssequentially-عن-قصد",text:"fill() أولًا، وpressSequentially() عن قصد"},{depth:2,id:"الساعات-والحركات-وواجهة-clock",text:"الساعات والحركات وواجهة Clock"},{depth:2,id:"expectpoll-مقابل-topass",text:"expect.poll() مقابل toPass()"},{depth:2,id:"امنح-expect-أمزجة-مختلفة",text:"امنح expect أمزجة مختلفة"},{depth:2,id:"الانتظار-حتى-تستقر-الصفحة",text:"الانتظار حتى «تستقرّ» الصفحة"},{depth:2,id:"قواعد-الوكيل",text:"قواعد الوكيل"},{depth:2,id:"مثال-ملموس-من-shelf",text:"مثال ملموس من Shelf"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],p=`<p>إن كان الانضباط في محدّدات الموقع هو أول ما سيخطئ فيه الوكيل في مجموعة اختبارات Playwright، فإن الانتظار يليه مباشرة بفارق ضئيل جدًا. وحيث تكون المحدّدات سيئة لأنها تنكسر مع كل إعادة هيكلة، يكون الانتظار سيئًا لأنه ينكسر <em>على الشيفرة نفسها بالضبط، على نحو متقطّع، لأسباب لا يستطيع أحد تفسيرها</em>. وهذا أسوأ. هذا هو الشيء الذي يجعل فريقك يكفّ عن الوثوق باختبارات طرف إلى طرف.</p>
<h2 id="الخطيئة">الخطيئة</h2>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> page.<span class="hljs-title function_">click</span>(<span class="hljs-string">&#x27;button.add-book&#x27;</span>);
<span class="hljs-keyword">await</span> page.<span class="hljs-title function_">waitForTimeout</span>(<span class="hljs-number">2000</span>);
<span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Added to your shelf&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
</code></pre>
<p>ثانيتان. ولماذا ثانيتان؟ لأن واحدة لم تنجح في محاولة الوكيل الأولى، وثلاثًا بدت مضيعة للوقت. هذا هو النمط الأكثر شيوعًا الذي أراه في شيفرة Playwright التي يولّدها الوكيل، وهو خاطئ من كل وجه ممكن.</p>
<p>إنه خاطئ حين تكون الآلة سريعة، لأنك تجلس هناك 1.9 ثانية لا تفعل شيئًا. وهو خاطئ حين تكون الآلة بطيئة، لأن الثانيتين لم تكفيا فيتقلّب الاختبار. وهو خاطئ في CI، لأن CI بطيء أيام الثلاثاء وسريع أيام الأربعاء ولا أحد يعرف السبب، فصار اختبارك الآن رمية عملة. وهو خاطئ على وجه الخصوص لأن الآلية التي <em>ينبغي</em> أن تستخدمها ليست أكثر موثوقية فحسب، بل أسرع أيضًا في الحالة السعيدة.</p>
<pre><code>flowchart LR
  A[&quot;Click button&quot;] --&gt; B[&quot;Wait 2 seconds&lt;br&gt;waitForTimeout&quot;]
  B --&gt; C{&quot;Is text&lt;br&gt;visible?&quot;}
  C --&gt;|Yes| D[&quot;PASS&lt;br&gt;~2 seconds elapsed&quot;]
  C --&gt;|No| E[&quot;FAIL&lt;br&gt;Timeout&quot;]

  F[&quot;Click button&quot;] --&gt; G[&quot;Auto-retry assertion&lt;br&gt;for 5 seconds&quot;]
  G --&gt; H{&quot;Is text&lt;br&gt;visible?&quot;}
  H --&gt;|Yes| I[&quot;PASS&lt;br&gt;~50ms elapsed&quot;]
  H --&gt;|No| J[&quot;FAIL&lt;br&gt;Timeout&quot;]

  style B fill:#ffcccc
  style G fill:#ccffcc
  style D fill:#ffcccc
  style I fill:#ccffcc
</code></pre>
<p>لديّ قاعدة بسيطة في هذا الشأن: <code>page.waitForTimeout</code> محظور. لا «غير مستحسَن». محظور. ملف الإرشادات يحظره. وقاعدة lint تحظره. الحالة الوحيدة التي يكون فيها مقبولًا هي جلسة تنقيح عابرة داخل <code>test.skip</code>، وحتى حينها ينبغي أن تشعر بالسوء تجاهه.</p>
<h2 id="النسخة-الأفضل-بلا-سحر">النسخة الأفضل، بلا سحر</h2>
<p><a href="https://playwright.dev/docs/test-assertions">تأكيدات Playwright ذاتية الإعادة</a> تفعل تقريبًا كل ما تحتاجه منها إن سمحت لها بذلك. يُعاد كل تأكيد لمدّة انتظار قابلة للضبط (خمس ثوانٍ افتراضيًا) حتى ينجح أو تنتهي المدة. وهذا يعني أنك لست مضطرًا للانتظار بنفسك—فالتأكيد <em>هو</em> الانتظار.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Add book&#x27;</span> }).<span class="hljs-title function_">click</span>();
<span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Added to your shelf&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
</code></pre>
<p>هذا كل شيء. لا <code>waitForTimeout</code>، ولا <code>waitForSelector</code>، ولا <code>sleep</code>. ينتظر تأكيد <code>toBeVisible()</code> حتى يظهر النص أو تنتهي مدة الانتظار. على آلة سريعة ينجح في عشر مللي ثانية. وعلى آلة بطيئة ينجح في ثانيتين. وعلى آلة معطوبة يفشل بخطأ مفيد. والنتائج الثلاث كلها صحيحة.</p>
<p>وهذا يعمل لأكثر من الظهور. فالعائلة كلها <code>expect(locator).*</code> تعيد المحاولة تلقائيًا:</p>
<ul>
<li><code>toBeVisible()</code>، و<code>toBeHidden()</code>، و<code>toBeEnabled()</code>، و<code>toBeDisabled()</code></li>
<li><code>toHaveText(text)</code>، و<code>toHaveValue(value)</code>، و<code>toHaveAttribute(name, value)</code></li>
<li><code>toHaveCount(n)</code>—وهو المفضّل عندي شخصيًا لـ«انتظر حتى تُرسَم المدخلات الثلاثة كلها في قائمة الكتب»</li>
<li><code>toBeInViewport()</code></li>
</ul>
<p>أي شيء تريد تأكيده ويكون صحيحًا في النهاية، استخدم عليه <code>expect</code> مربوطًا بمحدّد موقع. ذلك هو انتظارك.</p>
<h2 id="الأفعال-تنتظر-أصلا-قابلية-التنفيذ">الأفعال تنتظر أصلًا قابلية التنفيذ</h2>
<p>هذا هو الجزء الذي تقاومه فرق كثيرة بدلًا من استخدامه. أفعال Playwright تنتظر تلقائيًا قابلية التنفيذ: الظهور، والاستقرار، وتلقّي الأحداث، والتمكين، وكل ذلك. معظم «مساعدات الجاهزية قبل النقر» ليست إلا إعادة تنفيذ أبطأ وأسوأ لما يفعله Playwright أصلًا.</p>
<p>وإن أردت أن تسأل «هل صار هذا العنصر قابلًا للنقر بعد؟» دون أن تنقر عليه فعلًا، فإن كثيرًا من أفعال محدّد الموقع تدعم <a href="https://playwright.dev/docs/actionability"><code>trial: true</code></a>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Publish&#x27;</span> }).<span class="hljs-title function_">click</span>({ <span class="hljs-attr">trial</span>: <span class="hljs-literal">true</span> });
</code></pre>
<p>ينفّذ ذلك فحوص قابلية التنفيذ ويتخطّى النقر. وهو بديل أنيق للمساعدات المفصّلة على المقاس من نوع «انتظر حتى يجهز الزر»، ويُبقي الانتظار متوائمًا مع الفعل الحقيقي بدلًا من اختراع تعريف ثانٍ للجاهزية.</p>
<h2 id="المجسات-المنطقية-ليست-انتظارا">المجسّات المنطقية ليست انتظارًا</h2>
<p><a href="https://playwright.dev/docs/api/class-locator">واجهة Locator</a> صريحة في هذا: دوال مثل <code>isVisible()</code> تعود فورًا. فهي تجيب عن «ما الصحيح <em>الآن</em>»، لا عن «انتظر حتى يصير هذا صحيحًا».</p>
<p>إذن هذا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">if</span> (<span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Saved&#x27;</span>).<span class="hljs-title function_">isVisible</span>()) {
  <span class="hljs-comment">// ...</span>
}
</code></pre>
<p>لا بأس به كفرع بعد أن تكون الصفحة مستقرّة أصلًا. لكنه ليس بدائية مزامنة. فإن كانت الصفحة تتحدّث لا تزامنيًا، فاستخدم التأكيد الذي يعيد المحاولة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Saved&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
</code></pre>
<p>النمط المضاد الذي أراه باستمرار هو <code>expect(await locator.isVisible()).toBe(true)</code>. ذلك يتجاوز نموذج إعادة المحاولة كله، ثم يتظاهر بالدهشة حين يصل CI إلى هناك بعد حاسوبك المحمول بـ200 مللي ثانية.</p>
<h2 id="الانتظار-على-الشبكة-لا-على-الساعات">الانتظار على الشبكة، لا على الساعات</h2>
<p>أحيانًا لا يكون الشيء الذي تنتظره تغيّرًا في DOM، بل استجابة شبكة. النقرة تُطلق طلب POST، وتحتاج إلى أن ينتهي POST قبل أن تتفاعل مع الشيء التالي، ولا توجد حالة DOM تخبرك بوضوح أن POST قد انتهى. هنا يستحق <a href="https://playwright.dev/docs/api/class-page#page-wait-for-response"><code>page.waitForResponse</code></a> مكانه.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> responsePromise = page.<span class="hljs-title function_">waitForResponse</span>(
  <span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> res.<span class="hljs-title function_">url</span>().<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">&#x27;/api/shelf&#x27;</span>) &amp;&amp; res.<span class="hljs-title function_">request</span>().<span class="hljs-title function_">method</span>() === <span class="hljs-string">&#x27;POST&#x27;</span>,
);
<span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;button&#x27;</span>, { <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Add book&#x27;</span> }).<span class="hljs-title function_">click</span>();
<span class="hljs-keyword">await</span> responsePromise;
</code></pre>
<p>ثمة أمران يجب ملاحظتهما. أولًا، تنصب المنتظِر <em>قبل</em> الفعل، لأن الاستجابة قد تصل أسرع مما يعمل السطر التالي من الشيفرة. وثانيًا، تطابق على العنوان (URL) والطريقة، لا على مقارنة نصية للعنوان كله—وإلا أربكتك معاملات الاستعلام والمعرّفات.</p>
<p>و<code>page.waitForRequest</code> موجود أيضًا، لحالة «أريد فقط أن أثبت أن الطلب قد خرج». وكلاهما دقيق، وكلاهما يتغلّب على مهلة الانتظار في كل مرة.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إن كانت الواجهة تعرض أصلًا حالة النهاية التي تهمّك، ففضّل تأكيد محدّد موقع على انتظار شبكي. <code>waitForResponse</code> للحالات التي يكون فيها حدث الشبكة <em>هو</em> الإشارة. فإن كانت الصفحة تعرض «Saved» أو ظهر السطر الجديد في الجدول، فأكّد على ذلك بدلًا من الانتظار.</p>
</blockquote>
<h2 id="fill-أولا-وpresssequentially-عن-قصد"><code>fill()</code> أولًا، و<code>pressSequentially()</code> عن قصد</h2>
<p>معظم إدخال النصوص ينبغي أن يستخدم <code>locator.fill()</code>. فهو يضبط القيمة مباشرة ويترك Playwright يفعل الشيء المملّ الموثوق.</p>
<p>و<a href="https://playwright.dev/docs/api/class-locator"><code>locator.pressSequentially()</code></a> موجود للحالات الخاصة حقًا:</p>
<ul>
<li>أن يتفاعل المكوّن مع كل ضغطة مفتاح</li>
<li>أن يعتمد منطق الإكمال التلقائي أو الإشارات على أحداث مفاتيح حقيقية</li>
<li>أن يكون الحقل مقنّعًا أو منسّقًا أثناء الكتابة</li>
<li>أن يكون الخطأ الذي تعيد إنتاجه متعلقًا بمعالجة ضغطات المفاتيح تحديدًا</li>
</ul>
<p>إن لم يكن أي من ذلك صحيحًا، فـ<code>fill()</code> هو النداء الصحيح. فحدس «الكتابة الحقيقية أكثر واقعية» يبدو لطيفًا، ويخلق بعضًا من أغبى أعطال الإدخال التي لن تقع إلا في CI وستنقّحها في حياتك.</p>
<h2 id="الساعات-والحركات-وواجهة-clock">الساعات والحركات وواجهة Clock</h2>
<p>الصنف القبيح من الانتظارات هو حين يكون في الواجهة <code>setTimeout</code> في مكان ما. إشعار يختفي تلقائيًا بعد ثلاث ثوانٍ. طابع زمني يقول «الآن» ويتحدّث كل دقيقة. حركة تستغرق 250 مللي ثانية. صار اختبارك الآن يعتمد على الوقت الحقيقي للجدار، وهذا أمر شنيع.</p>
<p>يشحن Playwright <a href="https://playwright.dev/docs/clock">واجهة Clock</a> تتيح لك تثبيت ساعة مزيفة قبل أن تُحمّل الصفحة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> page.<span class="hljs-property">clock</span>.<span class="hljs-title function_">install</span>();
<span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(<span class="hljs-string">&#x27;/shelf&#x27;</span>);
<span class="hljs-comment">// ... interact ...</span>
<span class="hljs-keyword">await</span> page.<span class="hljs-property">clock</span>.<span class="hljs-title function_">fastForward</span>(<span class="hljs-string">&#x27;03&#x27;</span>); <span class="hljs-comment">// advance three seconds</span>
<span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Added to your shelf&#x27;</span>)).<span class="hljs-title function_">toBeHidden</span>();
</code></pre>
<p>هكذا تختبر الإشعار الذي يختفي بعد ثلاث ثوانٍ دون أن تنتظر ثلاث ثوانٍ فعلًا. وهكذا تختبر عروض «قبل X دقيقة» دون تعديل ساعة النظام. وهي قليلة الاستخدام إلى حدّ بعيد وتستحق أن تُوضَع في وعي الوكيل. فإن كان الوكيل يكتب <code>waitForTimeout</code> لأنه ينتظر واجهة تقودها ساعة، فالجواب الصحيح دائمًا تقريبًا هو <code>page.clock</code>.</p>
<h2 id="expectpoll-مقابل-topass"><code>expect.poll()</code> مقابل <code>toPass()</code></h2>
<p>من أجل الاتّساق النهائي، لديك مطرقتان لإعادة المحاولة. وهما ليستا المطرقة نفسها.</p>
<p><a href="https://playwright.dev/docs/test-assertions"><code>expect.poll()</code></a> يعيد محاولة دالة تُنتج قيمة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> expect
  .<span class="hljs-title function_">poll</span>(
    <span class="hljs-title function_">async</span> () =&gt; {
      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> request.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/shelf&#x27;</span>);
      <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
      <span class="hljs-keyword">return</span> data.<span class="hljs-property">entries</span>.<span class="hljs-title function_">find</span>(
        <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">entry</span>: { book: { title: <span class="hljs-built_in">string</span> } }</span>) =&gt;</span> entry.<span class="hljs-property">book</span>.<span class="hljs-property">title</span> === <span class="hljs-string">&#x27;Station Eleven&#x27;</span>,
      );
    },
    { <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Station Eleven should eventually appear in the persisted shelf state&#x27;</span> },
  )
  .<span class="hljs-title function_">toBeTruthy</span>();
</code></pre>
<p>مهلته الافتراضية خمس ثوانٍ، وهذا عادةً ما يتوقّعه الناس.</p>
<p>و<code>expect(async () =&gt; { ... }).toPass()</code> يعيد محاولة كتلة تأكيد كاملة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">await</span> <span class="hljs-title function_">expect</span>(<span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> request.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/shelf&#x27;</span>);
  <span class="hljs-title function_">expect</span>(response.<span class="hljs-title function_">ok</span>()).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);

  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> response.<span class="hljs-title function_">json</span>();
  <span class="hljs-title function_">expect</span>(data.<span class="hljs-property">entries</span>.<span class="hljs-title function_">some</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">entry</span>: { rating: <span class="hljs-built_in">number</span> | <span class="hljs-literal">null</span> }</span>) =&gt;</span> entry.<span class="hljs-property">rating</span> === <span class="hljs-number">4</span>)).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">true</span>);
}).<span class="hljs-title function_">toPass</span>({ <span class="hljs-attr">timeout</span>: <span class="hljs-number">10_000</span> });
</code></pre>
<p>مهلته الافتراضية <code>0</code> ما لم تمرّر واحدة. وهذا يُوقع الناس في الحيرة باستمرار. فإن لجأت إلى <code>toPass()</code>، فاضبط المهلة عن قصد.</p>
<p>استخدم <code>poll()</code> حين تكون قيمة واحدة مرشّحة للاستقرار في النهاية. واستخدم <code>toPass()</code> حين تريد حقًا إعادة تشغيل كتلة تأكيدات كاملة.</p>
<h2 id="امنح-expect-أمزجة-مختلفة">امنح <code>expect</code> أمزجة مختلفة</h2>
<p><a href="https://playwright.dev/docs/test-assertions"><code>expect.configure()</code></a> يستحق الاستخدام متى صارت المجموعة كبيرة بما يكفي بحيث لا تتشارك كل التأكيدات المزاج نفسه.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> slowExpect = expect.<span class="hljs-title function_">configure</span>({ <span class="hljs-attr">timeout</span>: <span class="hljs-number">15_000</span> });
<span class="hljs-keyword">const</span> softExpect = expect.<span class="hljs-title function_">configure</span>({ <span class="hljs-attr">soft</span>: <span class="hljs-literal">true</span> });

<span class="hljs-keyword">await</span> <span class="hljs-title function_">slowExpect</span>(page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;status&#x27;</span>)).<span class="hljs-title function_">toHaveText</span>(<span class="hljs-regexp">/Report complete/</span>);
<span class="hljs-keyword">await</span> <span class="hljs-title function_">softExpect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Summary&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
<span class="hljs-keyword">await</span> <span class="hljs-title function_">softExpect</span>(page.<span class="hljs-title function_">getByText</span>(<span class="hljs-string">&#x27;Details&#x27;</span>)).<span class="hljs-title function_">toBeVisible</span>();
</code></pre>
<p>هذا يُبقي النية محلية. فلا تضطر إلى إعادة كتابة مهلة التأكيد العامة لأن شاشة واحدة متّسقة نهائيًا أبطأ من بقية المجموعة.</p>
<p>وحين تستخدم التأكيدات اللينة، فافحص <code>test.info().errors</code> قبل أن تنطلق إلى المرحلة الخطرة التالية من الاختبار. الفشل اللين مفيد. أما الفشل اللين ثم التظاهر بأن الشرط المسبق قد نجح فليس إلا كذبًا بخطوات إضافية.</p>
<h2 id="الانتظار-حتى-تستقر-الصفحة">الانتظار حتى «تستقرّ» الصفحة</h2>
<p>خطأ شائع من الوكيل: <code>await page.waitForLoadState('networkidle')</code>. لا تفعل ذلك. فوثائق التنقّل في Playwright نفسها تصنّف <code>networkidle</code> غير مستحسَن للاختبار. وهو يعني «لا نشاط شبكي لمدة 500 مللي ثانية»، وهذا أبطأ مما تحتاجه فعلًا (ولماذا تنتظر <em>كل</em> الطلبات؟) وغير موثوق في الصفحات التي فيها استقصاء طويل أو منارات تحليلات أو أي نوع من نبضات الحياة.</p>
<p>بدلًا من ذلك، انتظر الشيء المحدّد الذي يهمّك فعلًا. فإن كنت تنتظر رسم الرفّ، فانتظر محتوى الرفّ، لا سكون الشبكة. وإن كنت تنتظر انتهاء نداء API، فانتظر <em>ذلك</em> النداء، لا توقّف كل النداءات. كن محدّدًا.</p>
<h2 id="قواعد-الوكيل">قواعد الوكيل</h2>
<p>أضف هذه إلى ملف الإرشادات تحت Playwright:</p>
<pre><code class="language-markdown"><span class="hljs-section">## Waiting in Playwright</span>

<span class="hljs-bullet">-</span> Never use <span class="hljs-code">\`page.waitForTimeout\`</span>. There is always a better option.
<span class="hljs-bullet">-</span> Never use <span class="hljs-code">\`page.waitForLoadState(&#x27;networkidle&#x27;)\`</span>.
<span class="hljs-bullet">-</span> To wait for a UI change, use <span class="hljs-code">\`expect(locator).toBeVisible()\`</span> or a
  similar assertion. They auto-retry up to the configured timeout.
<span class="hljs-bullet">-</span> Do not use <span class="hljs-code">\`locator.isVisible()\`</span> or similar boolean probes as waits.
  They answer immediately. Use retrying assertions.
<span class="hljs-bullet">-</span> Prefer <span class="hljs-code">\`locator.fill()\`</span> for text entry. Use <span class="hljs-code">\`pressSequentially()\`</span> only
  when the page genuinely depends on real key events.
<span class="hljs-bullet">-</span> To wait for a network call, set up <span class="hljs-code">\`page.waitForResponse\`</span> with a
  URL+method matcher <span class="hljs-emphasis">_before_</span> triggering the action.
<span class="hljs-bullet">-</span> If you need to wait for actionability without acting, use the real
  action with <span class="hljs-code">\`trial: true\`</span> instead of inventing a custom readiness wait.
<span class="hljs-bullet">-</span> Use <span class="hljs-code">\`expect.poll()\`</span> for eventually consistent values. Use <span class="hljs-code">\`toPass()\`</span>
  only when you need to retry a whole assertion block, and set its
  timeout explicitly.
<span class="hljs-bullet">-</span> To wait for clock-driven UI (toasts, timers, &quot;X minutes ago&quot;),
  install <span class="hljs-code">\`page.clock\`</span> at the top of the test and advance it explicitly.
<span class="hljs-bullet">-</span> If you are tempted to add a wait to &quot;fix flakiness,&quot; stop. The flakiness
  is a symptom of an assertion not matching the actual end state. Find
  the real end state and assert on it.
</code></pre>
<p>القاعدة الأخيرة هي المهمة، وهي الأصعب على الوكيل أن يتبعها دون أن يشير إليها إنسان. التقلّب لا يُحلّ أبدًا بانتظار أطول. بل يُحلّ بالتأكيد على الشيء الصحيح.</p>
<h2 id="مثال-ملموس-من-shelf">مثال ملموس من Shelf</h2>
<p>سير عمل تقييم الكتب في Shelf هو المكان النموذجي الذي يظهر فيه كل هذا. النسخة الخامّة من الاختبار تستخدم <code>waitForTimeout(1500)</code> بعد إرسال تقييم، لأن الوكيل الذي كتبها أولًا كان يخمّن. وتلك النسخة تنجح معظم الوقت. لكنها تفشل نحو مرة من كل خمس عشرة على حاسوبي، وأكثر من ذلك في CI تحت الحمل—وهذا إقليم «الاختبار المتقلّب الذي يعطّل الإصدارات كل بضعة أيام» الكلاسيكي.</p>
<p>المختبر التالي يمشي معك في إعادة كتابته. وللإصلاح ثلاثة أجزاء: استبدال محدّد الموقع بسلسلة <code>getByRole</code>، واستبدال <code>waitForTimeout</code> بـ<code>waitForResponse</code> على POST، وإضافة تأكيد <code>expect(locator).toHaveText(/Thanks/)</code> على إشعار التأكيد. هذا كل شيء. ثلاثة تعديلات، ولا سحر، ويتوقف الاختبار عن التقلّب.</p>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>كل انتظار في اختبارك عبارة عن تصريح بما تتوقّع أن يكون صحيحًا. فإن لم تستطع كتابة ذلك التصريح كتأكيد، فأنت لا تعرف فعلًا ما الذي تنتظره، وسيتقلّب الاختبار حتى تكتشفه. <code>waitForTimeout</code> هو غياب التصريح. فاحظره.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/locators-and-the-accessibility-hierarchy">المحددات وهرمية إمكانية الوصول</a></li>
<li><a href="https://playwright.dev/docs/test-assertions">التأكيدات</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication">مصادقة حالة التخزين</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-harden-the-flaky-rate-book-test">مختبر: تحصين اختبار Rate-Book المتقلّب</a></li>
</ul>
`,o={book:s,chapter:a,chapterTitle:n,slug:e,title:t,headings:l,html:p};export{s as book,a as chapter,n as chapterTitle,o as default,l as headings,p as html,e as slug,t as title};
