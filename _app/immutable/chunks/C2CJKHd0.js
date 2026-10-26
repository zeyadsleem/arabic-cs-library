const s="kinney",t="enterprise-ui",e="واجهات المؤسسات",n="server-rendering-across-frameworks",a="التصيير على الخادم عبر أطر العمل",p=[{depth:2,id:"مجموعة-المشكلات-المشتركة",text:"مجموعة المشكلات المشتركة"},{depth:2,id:"nuxt-وvue",text:"Nuxt وVue"},{depth:3,id:"تحميل-البيانات",text:"تحميل البيانات"},{depth:3,id:"حد-الخادمالعميل",text:"حد الخادم/العميل"},{depth:3,id:"التدفق",text:"التدفق"},{depth:3,id:"الطفرات-mutations",text:"الطفرات (Mutations)"},{depth:2,id:"sveltekit",text:"SvelteKit"},{depth:3,id:"تحميل-البيانات",text:"تحميل البيانات"},{depth:3,id:"التدفق",text:"التدفق"},{depth:3,id:"الطفرات",text:"الطفرات"},{depth:3,id:"خيارات-الصفحة",text:"خيارات الصفحة"},{depth:2,id:"astro",text:"Astro"},{depth:3,id:"الحد",text:"الحد"},{depth:3,id:"تحميل-البيانات",text:"تحميل البيانات"},{depth:3,id:"الطفرات",text:"الطفرات"},{depth:3,id:"جزر-الخادم",text:"جزر الخادم"},{depth:2,id:"qwik",text:"Qwik"},{depth:3,id:"الحد",text:"الحد"},{depth:3,id:"تحميل-البيانات",text:"تحميل البيانات"},{depth:3,id:"الطفرات",text:"الطفرات"},{depth:3,id:"التدفق",text:"التدفق"},{depth:2,id:"angular",text:"Angular"},{depth:3,id:"الترطيب",text:"الترطيب"},{depth:3,id:"الترطيب-التدريجي",text:"الترطيب التدريجي"},{depth:3,id:"تحميل-البيانات",text:"تحميل البيانات"},{depth:3,id:"الطفرات",text:"الطفرات"},{depth:3,id:"المقايضة",text:"المقايضة"},{depth:2,id:"كيف-تتقارن-الإجابات",text:"كيف تتقارن الإجابات"},{depth:2,id:"ماذا-يعني-هذا-لمعمارية-المؤسسات",text:"ماذا يعني هذا لمعمارية المؤسسات"}],c=`<p>غطت <a href="https://stevekinney.com/courses/enterprise-ui/server-components-and-streaming">المحاضرة السابقة</a> إجابة React عن مجموعة أسئلة يجب أن يجيب عنها كل إطار تصيير على الخادم. أين يقع حد الخادم/العميل؟ وكيف تنتقل البيانات من الخادم إلى المكوّن الذي يحتاجها؟ وكيف يصل HTML إلى المتصفح؟ وكيف تتدفق الطفرات عائدةً؟ وإجابات React — حدود وحدات RSC، ومكوّنات الخادم غير المتزامنة، و<code>renderToPipeableStream</code> مع Suspense، ودوال الخادم — مجموعة واحدة متماسكة من المقايضات. لكنها ليست المجموعة الوحيدة.</p>
<p>لكل إطار جادّ آراؤه الخاصة في هذه الأسئلة، والفروق ليست شكلية. فهي تعكس اعتقادات مختلفة فعلًا حول مكان التعقيد، ومدى صراحة الفصل بين الخادم والعميل، وكم ينبغي أن يفعل الإطار نيابةً عنك مقابل كم ينبغي أن يبقى بعيدًا عن طريقك. وإذا كنت تعمل في معمارية مؤسسية قد تستخدم فيها فرق مختلفة مكدّسات مختلفة — أو كنت تقيّم أي مكدّس تعتمده معيارًا — فإن فهم كيف يحل كل إطار هذه المشكلات أنفع من حفظ واجهة برمجة إطار واحد.</p>
<h2 id="مجموعة-المشكلات-المشتركة">مجموعة المشكلات المشتركة</h2>
<p>تتكرر أربعة أسئلة بصرف النظر عن إطار العمل:</p>
<ul>
<li><strong>أين يقع حد الخادم/العميل؟</strong> أي شفرة تعمل على الخادم، وأيها تعمل في المتصفح، وكيف يفرض الإطار ذلك الفصل؟</li>
<li><strong>كيف تُحمَّل البيانات؟</strong> كيف يحصل المكوّن المحتاج للبيانات عليها من الخادم دون رحلة إضافية إلى المتصفح؟</li>
<li><strong>كيف يصل HTML؟</strong> هل يرسل الخادم الصفحة كاملة دفعة واحدة، أم يتدفق أجزاءً تدريجيًا كلما أصبحت البيانات متاحة؟</li>
<li><strong>كيف تعمل الطفرات؟</strong> عندما يرسل المستخدم نموذجًا أو يُطلق عملية كتابة، كيف يصل ذلك الطلب إلى الخادم، وكيف تُحدَّث الواجهة بعد ذلك؟</li>
</ul>
<p>إجابات React من المحاضرة السابقة هي النقطة المرجعية. والآن: كيف يتعامل الجميع الآخرون معها.</p>
<h2 id="nuxt-وvue">Nuxt وVue</h2>
<p>نظام التفاعلية في Vue — <code>ref</code> و<code>computed</code> و<code>watch</code> — يعمل بالطريقة نفسها على الخادم وفي المتصفح. وهذا هو الأساس الذي يبني عليه Nuxt. فبينما اخترعت React نموذج حدود وحدات جديدًا لشفرة الخادم، يأخذ Nuxt تفاعلية Vue القائمة ويلفّها باصطلاحات تحدد <em>متى</em> تعمل الشفرة على الخادم مقابل المتصفح.</p>
<h3 id="تحميل-البيانات">تحميل البيانات</h3>
<p>أساسيات تحميل البيانات في Nuxt هي <a href="https://nuxt.com/docs/getting-started/data-fetching"><code>useAsyncData</code></a> و<code>useFetch</code>. وكلتاهما تعمل على الخادم أثناء التصيير على الخادم، وتُسلسل النتيجة في كائن حِمل (payload)، وتنقله إلى المتصفح حتى لا يعيد جلب البيانات نفسها أثناء الترطيب. ويستخدم التسلسل <a href="https://github.com/Rich-Harris/devalue">devalue</a>، الذي يتعامل مع Dates وMaps وSets ومراجع Vue — لا مع المجموعة الآمنة في JSON فقط.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// In a page or component setup</span>
<span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: posts } = <span class="hljs-keyword">await</span> <span class="hljs-title function_">useFetch</span>(<span class="hljs-string">&#x27;/api/posts&#x27;</span>);
</code></pre>
<p><code>useFetch</code> غلاف مريح حول <code>$fetch</code> (أداة HTTP في Nuxt) يولّد مفتاح ذاكرة مؤقتة من عنوان URL تلقائيًا. أما <code>useAsyncData</code> فالنسخة الأكثر مرونة — إذ تقدّم دالة المعالج ومفتاح الذاكرة المؤقتة بنفسك، وهذا مفيد عندما تأتي البيانات من عميل CMS أو استعلام قاعدة بيانات أو أي شيء ليس نداء HTTP مباشرًا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> { <span class="hljs-attr">data</span>: product } = <span class="hljs-keyword">await</span> <span class="hljs-title function_">useAsyncData</span>(<span class="hljs-string">\`product-<span class="hljs-subst">\${id}</span>\`</span>, <span class="hljs-function">() =&gt;</span>
  db.<span class="hljs-property">products</span>.<span class="hljs-title function_">findUnique</span>({ <span class="hljs-attr">where</span>: { id } }),
);
</code></pre>
<p>آلية الحِمل هي التفصيل المهم. و<a href="https://nuxt.com/docs/getting-started/data-fetching">توثيقات</a> Nuxt صريحة: إذا أُجري نداء API على الخادم، فتُنقل البيانات إلى المتصفح في الحِمل، ما يتجنب طلبًا مكررًا وعدم تطابق في الترطيب معًا. ويتلقى المتصفح البيانات المجلوبة سابقًا ولا يعيد تنفيذ الـcomposable حتى التنقل التالي.</p>
<h3 id="حد-الخادمالعميل">حد الخادم/العميل</h3>
<p>تعيش شفرة الخادم في Nuxt في مجلد <code>server/</code> منفصل يعمل بمحرك <a href="https://nuxt.com/docs/getting-started/server">Nitro</a>، وهو محرك خادم قائم بذاته. وتعرّف الملفات في <code>server/api/</code> و<code>server/routes/</code> نقاط نهاية الخادم — ولا تلامس حزمة المتصفح أبدًا. وهذا حد على <em>مستوى المجلد</em>، لا على مستوى التوجيه كما في <code>'use client'</code> في React.</p>
<p>أما المكوّنات، فلـNuxt <a href="https://nuxt.com/docs/guide/directory-structure/components">دعم تجريبي</a> للتصيير على الخادم فقط عبر لاحقة <code>.server.vue</code>. فالمكوّن المسمّى <code>MyWidget.server.vue</code> يُصيَّر على الخادم ولا يُرطَّب في المتصفح — مشابه مفاهيميًا لمكوّنات الخادم في React، لكنه يستخدم نظام تفاعلية Vue بدل مخطط وحدات React. والميزة ما زالت تنضج وليس لها العمق البيئي الذي لـRSC في Next.js.</p>
<h3 id="التدفق">التدفق</h3>
<p>توفّر Vue 3 واجهات تدفق (<a href="https://vuejs.org/guide/scaling-up/ssr.html"><code>renderToNodeStream</code> و<code>renderToWebStream</code></a>) على مستوى المكتبة، لكن تكامل Nuxt مع التصيير التدفقي على الخادم ما زال ينضج. والسلوك الافتراضي في Nuxt 3 و4 هو تخزين الصفحة كاملة على الخادم عبر <code>renderToString</code> قبل إرسال الاستجابة. أما التدفق — حيث يبدأ الخادم بإرسال أجزاء HTML قبل حلّ كل البيانات — فمخطّط لدعمه الكامل في Nuxt 5 مع Nitro v3. وهذا يعني أن Nuxt ينتظر حاليًا انتهاء كل نداءات <code>useAsyncData</code> و<code>useFetch</code> قبل أن يصل أي HTML إلى المتصفح، بخلاف التدفق المدفوع بـSuspense في React أو التدفق القائم على الوعود في SvelteKit المذكور أدناه.</p>
<h3 id="الطفرات-mutations">الطفرات (Mutations)</h3>
<p>لا يملك Nuxt أساسًا مدمجًا لإجراءات النماذج أو دوال الخادم مغروسًا في نموذج المكوّنات. فالطفرات تمر عادةً عبر نداءات <code>$fetch</code> إلى مسارات API في الخادم، أو عبر <code>useAsyncData</code> مع نداء <code>refresh()</code> بعد الطفرة. وهناك وحدة مجتمعية (<code>@hebilicious/form-actions-nuxt</code>) تضيف إجراءات نماذج على طراز SvelteKit، لكنها ليست جزءًا من الإطار الأساسي. وإذا أردت شيئًا مثل دوال الخادم في React، فستكتب مسارات API وتستدعيها من المتصفح.</p>
<h2 id="sveltekit">SvelteKit</h2>
<p>يتبنّى SvelteKit أكثر نهج مدفوع بالاصطلاحات لحد الخادم/العميل. فبينما تستخدم React توجيهًا (<code>'use client'</code>) ويستخدم Nuxt مجلدًا (<code>server/</code>)، يستخدم SvelteKit <em>لواحق ملفات</em> داخل شجرة التوجيه. فالحد مغروس في نظام الملفات، ما يجعله صعب الخطأ وسهل التبرير.</p>
<h3 id="تحميل-البيانات">تحميل البيانات</h3>
<p>آلية تحميل البيانات في SvelteKit هي <a href="https://svelte.dev/docs/kit/load">دالة <code>load</code></a>. ولكل مسار أن يكون فيه ملفان يوفّران البيانات:</p>
<ul>
<li><code>+page.server.ts</code> يعمل <em>حصرًا</em> على الخادم. ويمكنه الوصول إلى قواعد البيانات وقراءة أسرار البيئة وفعل أي شيء خاص بالخادم. ويجب أن تكون قيمته المُرجعة قابلة للتسلسل.</li>
<li><code>+page.ts</code> يعمل على الخادم <em>وفي المتصفح</em> معًا. فعند الطلب الأول يعمل على الخادم أثناء التصيير على الخادم. وفي التنقلات اللاحقة يعمل في المتصفح.</li>
</ul>
<pre><code class="language-typescript"><span class="hljs-comment">// +page.server.ts — server only</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">PageServerLoad</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./$types&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">load</span>: <span class="hljs-title class_">PageServerLoad</span> = <span class="hljs-title function_">async</span> ({ params }) =&gt; {
  <span class="hljs-keyword">const</span> post = <span class="hljs-keyword">await</span> db.<span class="hljs-property">posts</span>.<span class="hljs-title function_">find</span>(params.<span class="hljs-property">slug</span>);
  <span class="hljs-keyword">return</span> { post };
};
</code></pre>
<p>ويتلقى المكوّن البيانات عبر خاصية <code>data</code>، وتتدفق الأنواع تلقائيًا من نوع إرجاع دالة <code>load</code>. بلا <code>useEffect</code>، وبلا <code>useAsyncData</code>، وبلا composable — فالبيانات متاحة عند تصيير المكوّن لأن الإطار شغّل المحمّل أولًا.</p>
<p>الفرق الجوهري عن React: لا حاجة إلى توجيه <code>'use client'</code> لأن اصطلاح التوجيه يتولى الفصل. فملف <code>.server.ts</code> لا يصل أبدًا إلى حزمة المتصفح. وملف <code>.ts</code> بلا لاحقة <code>.server</code> شفرة شاملة. والحد هو اسم الملف، والمجمّع يفرضه.</p>
<h3 id="التدفق">التدفق</h3>
<p>يتدفق SvelteKit بإرجاع وعود غير منتظَرة من دوال <code>load</code> على الخادم. فتُصيَّر الصفحة بما هو متاح من البيانات، وتملأ الأجزاء اللاحقة الفراغ كلما حُلّت الوعود.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// +page.server.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">load</span>: <span class="hljs-title class_">PageServerLoad</span> = <span class="hljs-title function_">async</span> ({ params }) =&gt; {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">post</span>: <span class="hljs-keyword">await</span> <span class="hljs-title function_">getPost</span>(params.<span class="hljs-property">slug</span>), <span class="hljs-comment">// awaited — blocks the shell</span>
    <span class="hljs-attr">comments</span>: <span class="hljs-title function_">getComments</span>(params.<span class="hljs-property">slug</span>), <span class="hljs-comment">// not awaited — streams later</span>
  };
};
</code></pre>
<p>ويستخدم المكوّن كتلة <code>{#await}</code> في Svelte للتعامل مع الوعد المتدفق:</p>
<pre><code class="language-svelte">&lt;article&gt;{data.post.content}&lt;/article&gt;

{#await data.comments}
  &lt;p&gt;Loading comments…&lt;/p&gt;
{:then comments}
  &lt;CommentList {comments} /&gt;
{/await}
</code></pre>
<p>هذا مشابه مفاهيميًا للتدفق المدفوع بـSuspense في React، لكن الآلية مختلفة. ففي React، <em>تُعلَّق</em> شجرة المكوّنات عند لقاء وعد غير محلول، ويتدفق الإطار البديل ثم المحتوى المحلول لاحقًا. أما في SvelteKit، فتتحكم دالة <code>load</code> صراحةً في ما يُنتظر (وبالتالي يعيق الهيكل) مقابل ما هو وعد (وبالتالي يتدفق). فالتحكم يعيش في طبقة البيانات، لا في شجرة المكوّنات.</p>
<p>وتذكر <a href="https://svelte.dev/docs/kit/load">توثيقات</a> SvelteKit تحفّظين: التدفق يتطلب JavaScript في المتصفح، ولا يمكن تغيير ترويسات الاستجابة ورموز الحالة بعد بدء التدفق.</p>
<h3 id="الطفرات">الطفرات</h3>
<p>لدى SvelteKit <a href="https://svelte.dev/docs/kit/form-actions">إجراءات نماذج</a> — دوال على الخادم تتولى إرسال النماذج مع تعزيز تدريجي مدمج.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// +page.server.ts</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">Actions</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./$types&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">actions</span>: <span class="hljs-title class_">Actions</span> = {
  <span class="hljs-attr">default</span>: <span class="hljs-title function_">async</span> ({ request }) =&gt; {
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> request.<span class="hljs-title function_">formData</span>();
    <span class="hljs-keyword">const</span> title = data.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;title&#x27;</span>);
    <span class="hljs-keyword">await</span> db.<span class="hljs-property">posts</span>.<span class="hljs-title function_">create</span>({ title });
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span> };
  },
};
</code></pre>
<pre><code class="language-svelte">&lt;form method=&quot;POST&quot;&gt;
  &lt;input name=&quot;title&quot; /&gt;
  &lt;button&gt;Create&lt;/button&gt;
&lt;/form&gt;
</code></pre>
<p>يعمل هذا النموذج بلا JavaScript. فيُرسل المتصفح طلب POST معياريًا، ويشغّل الخادم الإجراء، وتُعيد الصفحة التحميل بالنتيجة. ومع توجيه <code>use:enhance</code> في SvelteKit، يُرسل النموذج نفسه عبر fetch بدل ذلك، ويحدّث الصفحة دون إعادة تحميل كاملة، ويتعامل مع إعادات التوجيه والأخطاء — كل ذلك دون تغيير شفرة الخادم.</p>
<p>إجراءات النماذج محدودة النطاق بالمسار — فهي تعيش في <code>+page.server.ts</code> إلى جانب دالة <code>load</code>. وهذا مختلف عن دوال الخادم في React، التي يمكن استيرادها من أي وحدة عميل. ونموذج SvelteKit أكثر تقييدًا لكنه أكثر قابلية للتوقع: فكل إجراء ينتمي إلى مسار، وبيانات كل مسار وطفراته تعيش في الملف نفسه.</p>
<h3 id="خيارات-الصفحة">خيارات الصفحة</h3>
<p>يوفّر SvelteKit <a href="https://svelte.dev/docs/kit/page-options">تحكمًا في التصيير لكل مسار</a> عبر ثوابت مُصدَّرة: <code>ssr</code> (هل تُصيَّر على الخادم)، و<code>csr</code> (هل تُرطَّب)، و<code>prerender</code> (هل تُولَّد HTML ساكن وقت البناء). وضبط <code>csr = false</code> يزيل كل JavaScript من الصفحة — مفيد للمحتوى الساكن تمامًا. وتتتالى هذه الخيارات عبر التخطيطات، فيمكنك ضبط الافتراضيات على مستوى التخطيط وتجاوزها لكل صفحة.</p>
<h2 id="astro">Astro</h2>
<p>تغطي <a href="https://stevekinney.com/courses/enterprise-ui/island-architecture">محاضرة معمارية الجزر</a> أصلًا نموذج الترطيب في Astro — كيف تكون مكوّنات <code>.astro</code> خاصة بالخادم افتراضيًا، وكيف تُدخل توجيهات <code>client:</code> مكوّنات محددة في التفاعلية بالمتصفح، وكيف تؤجّل جزر الخادم المحتوى المخصّص. ويركّز هذا القسم على ما لم تغطّه تلك المحاضرة: كيف يتعامل Astro مع تحميل البيانات والطفرات وخط أنابيب التصيير على الخادم.</p>
<h3 id="الحد">الحد</h3>
<p>حد الخادم/العميل في Astro هو الأبسط بين كل الأطر هنا. فمكوّن <code>.astro</code> <em>دائمًا</em> خاص بالخادم. يُصيَّر إلى HTML على الخادم، ولا يرسل JavaScript، ولا يُرطَّب أبدًا. ومكوّن React أو Vue أو Svelte مضمَّن في صفحة Astro مع توجيه <code>client:*</code> <em>دائمًا</em> يُرطَّب في المتصفح. ولا يوجد مكوّن مختلط التنفيذ ولا توجيه لتعليم شفرة الخادم — فملفات <code>.astro</code> <em>هي</em> شفرة الخادم.</p>
<p>هذه المباشرة هي المقصد. فلا تحتاج إلى التفكير في مخططات الوحدات أو حدود التسلسل لأن نوع الملف يخبرك بكل شيء. فإذا كنت تكتب <code>.astro</code> فأنت على الخادم. وإذا كنت تضمّن مكوّن إطار عمل، فأنت تختار استراتيجية ترطيبه صراحةً.</p>
<h3 id="تحميل-البيانات">تحميل البيانات</h3>
<p>تحمّل مكوّنات Astro البيانات مباشرةً في كتلة المقدمة (frontmatter) الخاصة بها. وللمواقع المدفوعة بالمحتوى، توفّر مجموعات محتوى Astro <a href="https://docs.astro.build/en/guides/content-collections/"><code>getCollection()</code></a> و<code>getEntry()</code> للوصول الآمن أنواعيًا إلى المحتوى المنظم:</p>
<pre><code class="language-astro">---
import { getCollection } from 'astro:content';
const posts = await getCollection('blog', ({ data }) =&gt; !data.draft);
---

&lt;ul&gt;
  {posts.map(post =&gt; &lt;li&gt;&lt;a href={\`/blog/\${post.id}\`}&gt;{post.data.title}&lt;/a&gt;&lt;/li&gt;)}
&lt;/ul&gt;
</code></pre>
<p>أما البيانات غير المحتوائية، فتستخدم <code>fetch</code> أو تستعلم قاعدة بيانات مباشرةً في المقدمة. ولا يوجد تجريد دالة <code>load</code> — فالمقدمة <em>هي</em> شفرة الخادم.</p>
<h3 id="الطفرات">الطفرات</h3>
<p>إجراءات Astro، <a href="https://docs.astro.build/en/guides/actions/">المستقرة منذ Astro 4.15</a>، دوال خادم آمنة أنواعيًا تعرّفها في <code>src/actions/index.ts</code>:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { defineAction } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;astro:actions&#x27;</span>;
<span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;astro/zod&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> server = {
  <span class="hljs-attr">addComment</span>: <span class="hljs-title function_">defineAction</span>({
    <span class="hljs-attr">accept</span>: <span class="hljs-string">&#x27;form&#x27;</span>,
    <span class="hljs-attr">input</span>: z.<span class="hljs-title function_">object</span>({
      <span class="hljs-attr">postId</span>: z.<span class="hljs-title function_">string</span>(),
      <span class="hljs-attr">body</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>),
    }),
    <span class="hljs-attr">handler</span>: <span class="hljs-title function_">async</span> (input) =&gt; {
      <span class="hljs-keyword">await</span> db.<span class="hljs-property">comments</span>.<span class="hljs-title function_">create</span>(input);
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span> };
    },
  }),
};
</code></pre>
<p>تستخدم الإجراءات Zod للتحقق من المدخلات، وتُرجع نتائج بأنواع محددة، وتعمل مع نداءات JSON وإرسال نماذج HTML معًا. فمن مكوّن عميل، تستدعي <code>actions.addComment({ postId, body })</code> وتحصل على نتيجة <code>{ data, error }</code> محددة النوع. ومن نموذج، تمرّر الإجراء كخاصية <code>action</code> في النموذج وتحصل على التعزيز التدريجي مجانًا.</p>
<p>الإجراءات أقرب إلى دوال الخادم في React من أي شيء آخر في هذه القائمة. والفرق الرئيسي أنها تُعرَّف في ملف مركزي لا مضمّنة في المكوّنات، وأنها تستخدم مخططات Zod بدل الاعتماد على TypeScript وحده لأمان المدخلات.</p>
<h3 id="جزر-الخادم">جزر الخادم</h3>
<p>تمدّ <a href="https://docs.astro.build/en/guides/server-islands/">جزر الخادم</a> النموذج بتأجيل الشذرات البطيئة أو المخصّصة المُصيَّرة على الخادم خارج تصيير الصفحة الرئيسية. فالمكوّن الموسوم بـ<code>server:defer</code> يُصيَّر بمعزل عن الصفحة، ويُعرض محتوى بديل حتى وصول الشذرة المؤجَّلة. ويمكن تخزين الصفحة مؤقتًا بجرأة بينما تُحمَّل الشذرات المخصّصة باستقلال.</p>
<h2 id="qwik">Qwik</h2>
<p>يقارب Qwik مشكلة التصيير على الخادم من زاوية مختلفة جذريًا عن كل إطار آخر هنا. وقد قدّمت <a href="https://stevekinney.com/courses/enterprise-ui/island-architecture">محاضرة معمارية الجزر</a> فكرته الجوهرية — <strong>قابلية الاستئناف</strong> — حيث <a href="https://qwik.dev/docs/concepts/resumable/">يُسلسل التطبيق حالة كافية داخل HTML</a> بحيث يستطيع المتصفح الاستئناف من حيث توقف الخادم دون إعادة تشغيل تهيئة المكوّنات. ويغطي هذا القسم كيف يتعامل Qwik City (إطار Qwik الفوقي) مع تحميل البيانات والطفرات.</p>
<h3 id="الحد">الحد</h3>
<p>لا يرسم Qwik حدًا بين الخادم والعميل كما تفعل React أو SvelteKit. بل يستخدم لاحقة <code>$</code> لوسم <strong>حدود التسلسل</strong> — نقاط يمكن للإطار عندها تقسيم الشفرة إلى أجزاء قابلة للتحميل الكسول.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { component$ } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@builder.io/qwik&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">component$</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>$=<span class="hljs-string">{()</span> =&gt;</span> console.log(&#x27;clicked&#x27;)}&gt;Click me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;
});
</code></pre>
<p>تُخبر <code>component$</code> و<code>onClick$</code> مُحسِّن Qwik باستخراج تلك الدوال إلى أجزاء منفصلة قابلة للاستيراد. فلا يُنزّل الإطار شفرة معالج الحدث حتى يتفاعل المستخدم فعليًا مع العنصر. وهذا ليس «شفرة خادم مقابل شفرة عميل» — بل «شفرة تعمل الآن مقابل شفرة يمكنها الانتظار». فالحد ليس في <em>أين</em> تعمل الشفرة بل في <em>متى</em> تُحمَّل.</p>
<h3 id="تحميل-البيانات">تحميل البيانات</h3>
<p>يستخدم Qwik City <a href="https://qwik.dev/docs/route-loader/"><code>routeLoader$</code></a> كأساسه في تحميل البيانات. فـ<code>routeLoader$</code> يعمل على الخادم، ويسلسل نتيجته داخل HTML، ويتيحها للمكوّن دون جلب من المتصفح:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { routeLoader$ } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@builder.io/qwik-city&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> useProduct = <span class="hljs-title function_">routeLoader$</span>(<span class="hljs-title function_">async</span> ({ params }) =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> db.<span class="hljs-property">products</span>.<span class="hljs-title function_">find</span>(params.<span class="hljs-property">id</span>);
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">component$</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">const</span> product = <span class="hljs-title function_">useProduct</span>();
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{product.value.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
});
</code></pre>
<p>تُضمَّن البيانات في HTML كحالة مُسلسَلة، فيحصل عليها المكوّن فورًا عند الاستئناف — بلا جلب أثناء الترطيب، وبلا مؤشر تحميل لبيانات كانت لدى الخادم أصلًا.</p>
<h3 id="الطفرات">الطفرات</h3>
<p><a href="https://qwik.dev/docs/action/"><code>routeAction$</code></a> يتولى الطفرات — دوال على الخادم تُستثار بإرسال النماذج، مع تحقق مدمج بـZod:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { routeAction$, zod$, z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@builder.io/qwik-city&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> useAddToCart = <span class="hljs-title function_">routeAction$</span>(
  <span class="hljs-title function_">async</span> (data) =&gt; {
    <span class="hljs-keyword">await</span> db.<span class="hljs-property">cart</span>.<span class="hljs-title function_">add</span>(data.<span class="hljs-property">productId</span>, data.<span class="hljs-property">quantity</span>);
    <span class="hljs-keyword">return</span> { <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span> };
  },
  <span class="hljs-title function_">zod$</span>({
    <span class="hljs-attr">productId</span>: z.<span class="hljs-title function_">string</span>(),
    <span class="hljs-attr">quantity</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>),
  }),
);
</code></pre>
<p>تتكامل الإجراءات مع نماذج HTML لأجل التعزيز التدريجي. والنمط مشابه لإجراءات النماذج في SvelteKit وإجراءات Astro — عرّف دالة خادم، وتحقق من المدخلات، وأرجع نتيجة محددة النوع.</p>
<h3 id="التدفق">التدفق</h3>
<p>يستخدم Qwik <code>renderToStream</code> لتدفق HTML إلى المتصفح. فيمكن للخادم البدء بإرسال المحتوى فورًا، ولأن Qwik يسلسل حالة التطبيق داخل HTML بدل الاعتماد على الترطيب في المتصفح لإعادة بنائها، يصبح المحتوى المتدفق تفاعليًا بمجرد تحميل أجزاء الشفرة ذات الصلة — وقد لا يحدث ذلك أبدًا إن لم يتفاعل المستخدم مع ذلك الجزء من الصفحة.</p>
<h2 id="angular">Angular</h2>
<p>كانت علاقة Angular بالتصيير على الخادم تاريخيًا أقرب إلى الإضافة الملحقة منها إلى المدمجة. فقد أضاف Angular Universal (الآن <a href="https://angular.dev/guide/ssr"><code>@angular/ssr</code></a>) قدرة التصيير على الخادم، لكن Angular صُمّم إطارًا للمتصفح أولًا. وقد قلّصت الإصدارات الأخيرة تلك الفجوة كثيرًا.</p>
<h3 id="الترطيب">الترطيب</h3>
<p>قدّم Angular 17 <a href="https://angular.dev/guide/hydration">الترطيب غير الإتلافي</a> — إذ يعيد المتصفح استخدام DOM المُصيَّر على الخادم بدل تصييره من الصفر. فقبل الإصدار 17، كان التصيير على الخادم في Angular يصيّر HTML على الخادم، ويرسله إلى المتصفح، ثم <em>يهدم</em> الـDOM كاملًا ويعيد إنشاءه أثناء الترطيب. وكان الترطيب غير الإتلافي تحسينًا كبيرًا جاء بـAngular إلى ما كانت React وVue وSvelte تفعله.</p>
<p>وتفعّله في إقلاع التطبيق:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { provideClientHydration } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@angular/platform-browser&#x27;</span>;

<span class="hljs-title function_">bootstrapApplication</span>(<span class="hljs-title class_">App</span>, {
  <span class="hljs-attr">providers</span>: [<span class="hljs-title function_">provideClientHydration</span>()],
});
</code></pre>
<h3 id="الترطيب-التدريجي">الترطيب التدريجي</h3>
<p>أحدث إضافات Angular وأكثرها إثارةً <a href="https://angular.dev/guide/incremental-hydration">الترطيب التدريجي</a> عبر كتل <code>@defer</code>. فكتلة <code>@defer</code> تخبر الإطار بإبقاء جزء من الصفحة في حالته المُصيَّرة على الخادم وغير المُرطَّبة حتى يُستثار مُشغّل:</p>
<pre><code class="language-html">@defer (hydrate on viewport) {
<span class="hljs-tag">&lt;<span class="hljs-name">app-comments</span> [<span class="hljs-attr">postId</span>]=<span class="hljs-string">&quot;post.id&quot;</span> /&gt;</span>
} @placeholder {
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Loading comments…<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
}
</code></pre>
<p>والمُشغّلات المتاحة — <code>idle</code> و<code>viewport</code> و<code>interaction</code> و<code>hover</code> و<code>immediate</code> و<code>timer</code> — مشابهة في الجوهر لتوجيهات <code>client:</code> في Astro لكنها مدمجة في صياغة قوالب Angular. فالمحتوى المؤجَّل مُصيَّر على الخادم ومرئي فورًا؛ ولا ينتظر المُشغّل إلا JavaScript وعمل الترطيب. وتُلتقط تفاعلات المستخدم قبل الترطيب عبر إعادة تشغيل الأحداث وتُعاد بعد اكتمال الترطيب.</p>
<p>صدر الترطيب التدريجي في معاينة المطوّرين في Angular 19 وانتقل إلى الاستقرار في Angular 20.</p>
<h3 id="تحميل-البيانات">تحميل البيانات</h3>
<p>لا يملك Angular دالة <code>load</code> يوفّرها الإطار كما في SvelteKit ولا <code>routeLoader$</code> كما في Qwik. فتحميل البيانات يحدث عبر الخدمات ومحلّلات المسارات — أنماط حقن التبعيات المعيارية في Angular. لكن الإطار يوفّر آلية <code>TransferState</code> لتفادي الطلبات المكررة أثناء الترطيب: فـ<code>HttpClient</code> يخزّن استجابات GET وHEAD المؤداة أثناء التصيير على الخادم ويستخدمها في المتصفح تلقائيًا، فلا يعيد المتصفح جلب بيانات كان الخادم قد جلبها. وتصف <a href="https://angular.dev/guide/hydration">توثيقات الترطيب</a> ذلك بذاكرة نقل HTTP المؤقتة — وهي مفعّلة افتراضيًا عند استخدام <code>provideClientHydration()</code>.</p>
<h3 id="الطفرات">الطفرات</h3>
<p>لا يملك Angular أساسًا مدمجًا لإجراءات النماذج أو دوال الخادم. فالطفرات تمر عبر خدمات تنادي نقاط نهاية HTTP — النمط نفسه الذي استخدمه Angular منذ البداية. وهذا صريح لكنه يعني تحسينًا تلقائيًا أقل وبلا تعزيز تدريجي افتراضيًا. وإذا أردت نموذجًا يعمل بلا JavaScript، فأنت تبنيه بنفسك.</p>
<h3 id="المقايضة">المقايضة</h3>
<p>نهج Angular أقل تدخلًا في حدود شفرة الخادم/العميل من أي إطار آخر في هذه القائمة. فلا اصطلاح <code>.server.ts</code>، ولا توجيه <code>'use client'</code>، ولا علامة تسلسل <code>$</code>. والفصل بين الخادم والعميل ضمني — فما تضعه في خدمة يعمل حيث يعمل Angular، والتصيير على الخادم إعداد نشر لا قرار معماري. وهذا موقف معقول لإطار بتاريخ Angular، لكنه يعني أنك لا تحصل على تقسيم الحزم التلقائي أو إزالة الشفرة الميتة التي توفّرها حدود أكثر تدخلًا.</p>
<h2 id="كيف-تتقارن-الإجابات">كيف تتقارن الإجابات</h2>
<p>يجيب كل إطار عن الأسئلة الأربعة نفسها. وتكشف الإجابات أولويات مختلفة.</p>
<table>
<thead>
<tr>
<th>السؤال</th>
<th>React/Next</th>
<th>SvelteKit</th>
<th>Nuxt/Vue</th>
<th>Astro</th>
<th>Qwik/Qwik City</th>
<th>Angular</th>
</tr>
</thead>
<tbody>
<tr>
<td>حد الخادم/العميل</td>
<td>توجيه <code>'use client'</code></td>
<td>لاحقة ملف <code>.server.ts</code></td>
<td>مجلد <code>server/</code></td>
<td><code>.astro</code> = خادم دائمًا</td>
<td>علامات تسلسل <code>$</code></td>
<td>ضمني (شأن نشر)</td>
</tr>
<tr>
<td>تحميل البيانات</td>
<td>مكوّنات خادم غير متزامنة</td>
<td>دوال <code>load</code></td>
<td><code>useAsyncData</code> / <code>useFetch</code></td>
<td>المقدمة</td>
<td><code>routeLoader$</code></td>
<td>خدمات + محلّلات + <code>TransferState</code></td>
</tr>
<tr>
<td>التدفق</td>
<td>حدود Suspense</td>
<td>وعود غير منتظَرة في <code>load</code></td>
<td>مخزَّنة (التدفق في Nuxt 5)</td>
<td>وضع تصيير عند الطلب</td>
<td><code>renderToStream</code> + حالة مُسلسَلة</td>
<td>تصيير تدفقي على الخادم (v20+)</td>
</tr>
<tr>
<td>الطفرات</td>
<td>دوال الخادم</td>
<td>إجراءات النماذج</td>
<td>مسارات API + <code>$fetch</code></td>
<td>الإجراءات (<code>defineAction</code>)</td>
<td><code>routeAction$</code></td>
<td>خدمات + نقاط نهاية HTTP</td>
</tr>
<tr>
<td>التعزيز التدريجي</td>
<td>نعم</td>
<td>نعم (<code>use:enhance</code>)</td>
<td>يدوي</td>
<td>نعم</td>
<td>نعم</td>
<td>يدوي</td>
</tr>
</tbody>
</table>
<p>والاتجاه في كلها: نقل تحميل البيانات إلى أقرب ما يمكن من المكوّن، وإتاحة النتيجة المجلوبة من الخادم دون إعادة جلب من المتصفح، وإرسال الأجزاء المهمة من الصفحة أولًا.</p>
<h2 id="ماذا-يعني-هذا-لمعمارية-المؤسسات">ماذا يعني هذا لمعمارية المؤسسات</h2>
<p>يشكّل اختيار إطار العمل استراتيجية التصيير على الخادم لديك، وهي تشكّل بنيتك التحتية ونموذج التخزين المؤقت وخط أنابيب النشر. وفيما يلي أمور تستحق الملاحظة للفرق التي تتخذ هذه القرارات:</p>
<p>قد يكون للمعماريات مختلطة الأطر — الواجهات الدقيقة بمكدّسات مختلفة لكل ريموت — نماذج تصيير على الخادم مختلفة في أجزاء مختلفة من التطبيق. وهذا مقبول ما دامت طبقة التركيب (هيكل المضيف، أو الوسيط الطرفي، أو الواجهة الخلفية للواجهة الأمامية) تستطيع التعامل مع أشكال الاستجابات المختلفة. فريموت React يستخدم RSC وريموت Vue يستخدم التصيير على الخادم في Nuxt يمكن أن يتعايشا خلف هيكل مشترك، لكن الهيكل يحتاج إلى معرفة أنه يجمّع استجابات من خطوط أنابيب تصيير مختلفة جذريًا.</p>
<p>والاتجاه عبر كل الأطر متقارب: قرّب تحميل البيانات من المكوّن، واجعل حدود الخادم/العميل صريحة، ودفّق HTML تدريجيًا، وتعامل مع الطفرات كعمليات خادم من الدرجة الأولى. فالصياغة مختلفة. والاتجاه واحد. وإذا فهمت إجابات إطار واحد عن هذه الأسئلة الأربعة، استطعت قراءة إجابات أي إطار آخر ومعرفة ما تبحث عنه بالضبط.</p>
`,o={book:s,chapter:t,chapterTitle:e,slug:n,title:a,headings:p,html:c};export{s as book,t as chapter,e as chapterTitle,o as default,p as headings,c as html,n as slug,a as title};
