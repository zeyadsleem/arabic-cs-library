const n="mooc",s="part-1",a="الجزء 1: البدء",e="2-information-from-the-user",o="المعلومات من المستخدم",t=[{depth:2,id:"الإشارة-إلى-متغير",text:"الإشارة إلى متغيّر"},{depth:2,id:"أكثر-من-مدخل-واحد",text:"أكثر من مُدخَل واحد"}],p=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستعرف كيف تكتب برنامجًا يستخدم مُدخَلات من المستخدم</li>
<li>ستعرف كيف تستخدم المتغيّرات لتخزين المُدخَل وطباعته</li>
<li>ستكون قادرًا على دمج السلاسل النصية</li>
</ul>
</blockquote>
<p><em>المُدخَل</em> (input) هو أي معلومة يعطيها المستخدم إلى البرنامج. وتحديدًا، يقرأ الأمر <code>input</code> في Python سطر مُدخَل يكتبه المستخدم. ويمكن أيضًا استخدامه لعرض رسالة على المستخدم، أي لطلب مُدخَل معيَّن.</p>
<p>يقرأ البرنامج التالي اسم المستخدم بالأمر <code>input</code>. ثم يطبعه بالأمر <code>print</code>:</p>
<pre><code class="language-python">name = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;What is your name? &quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi there, &quot;</span> + name)
</code></pre>
<p>قد يبدو تنفيذ هذا البرنامج على النحو التالي (المُدخَل الذي أدخله المستخدم بالأحمر):</p>
<pre><code>What is your name? **Paul Python**
Hi there, Paul Python
</code></pre>
<p>ما يطبعه هذا البرنامج يعتمد جزئيًا على المُدخَل الذي يُدخله المستخدم. أي أن تنفيذ البرنامج يمكن أن يبدو أيضًا على النحو التالي:</p>
<pre><code>What is your name? **Paula Programmer**
Hi there, Paula Programmer
</code></pre>
<p>الكلمة <code>name</code> في هذا البرنامج هي <em>متغيّر</em> (variable). وفي سياق البرمجة، المتغيّر هو موضع لتخزين <em>قيمة</em> (value) ما، مثل سلسلة نصية أو عدد. ويمكن استخدام هذه القيمة لاحقًا، كما يمكن تغييرها أيضًا.</p>
<blockquote>
<p><strong>تسمية المتغيّرات</strong></p>
<p>من حيث المبدأ، يمكن تسمية المتغيّرات بحرية إلى حدٍّ كبير، ضمن بعض القيود التيحدّدها لغة Python.</p>
<p>ومن الممارسات الشائعة في البرمجة الدولية تسمية المتغيّرات بالإنجليزية، لكنك قد تصادف شيفرة تكون فيها المتغيّرات مسمّاة بلغات أخرى، مثل اللغة الأم للمبرمج. ولا يؤثر اسم المتغيّر مباشرةً في محتواه، فالاسم من هذه الناحية لا يهمّ. لكن التسمية المنطقية بالإنجليزية كثيرًا ما تساعد في فهم كيفية عمل الشيفرة.</p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: الاسم مرتين</strong></p>
<p>اكتب برنامجًا يطلب اسم المستخدم ثم يطبعه مرتين، على سطرين متتاليين.</p>
</blockquote>
<p>مثال على كيف ينبغي أن يعمل البرنامج:</p>
<pre><code>What is your name? **Paul**
Paul
Paul
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<h2 id="الإشارة-إلى-متغير">الإشارة إلى متغيّر</h2>
<p>يمكن الإشارة إلى المتغيّر الواحد عدّة مرّات في البرنامج:</p>
<pre><code class="language-python">name = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;What is your name? &quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi, &quot;</span> + name + <span class="hljs-string">&quot;!&quot;</span>)
<span class="hljs-built_in">print</span>(name + <span class="hljs-string">&quot; is quite a nice name.&quot;</span>)
</code></pre>
<p>إذا أدخل المستخدم الاسم <code>Paul Python</code>، فإن هذا البرنامج يطبع ما يلي:</p>
<pre><code>What is your name? **Paul Python**
Hi, Paul Python!
Paul Python is quite a nice name.
</code></pre>
<p>لننظر عن كثب في طريقة استخدام الأمر <code>print</code> أعلاه. ففي داخل أقواس الأمر يوجد نص بين علامتَي تنصيص، وكذلك أسماء متغيّرات تشير إلى مُدخَل من المستخدم. وقد جُمعت هذه باستخدام المشغّل <code>+</code>، الذي <em>يدمج</em> سلسلتين نصيتين في سلسلة نصية واحدة.</p>
<p>يمكن دمج السلاسل النصية والمتغيّرات بحرية تامة:</p>
<pre><code class="language-python">name = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;What is your name? &quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Hi &quot;</span> + name + <span class="hljs-string">&quot;! Let me make sure: your name is &quot;</span> + name + <span class="hljs-string">&quot;?&quot;</span>)
</code></pre>
<p>إذا أدخل المستخدم الاسم <code>Ellen Example</code> فإن هذا يطبع</p>
<pre><code>What is your name? **Ellen Example**
Hi Ellen Example! Let me make sure: your name is Ellen Example?
</code></pre>
<blockquote>
<p><strong>تمرين تفاعلي: الاسم وعلامات التعجّب</strong></p>
<p>اكتب برنامجًا يطلب اسم المستخدم ثم يطبعه مرتين في سطر واحد، بحيث توجد علامة تعجّب في بداية السطر، وأخرى بين الاسمين، وثالثة في نهاية السطر.</p>
</blockquote>
<p>يجب أن يعمل البرنامج على النحو التالي:</p>
<pre><code>What is your name? **Paul**
!Paul!Paul!
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<h2 id="أكثر-من-مدخل-واحد">أكثر من مُدخَل واحد</h2>
<p>يمكن للبرنامج أن يطلب أكثر من مُدخَل واحد. لاحظ كيف أن كل أمر <code>input</code> في المثال التالي يخزّن القيمة المستلَمة في متغيّر مختلف.</p>
<pre><code class="language-python">name = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;What is your name? &quot;</span>)
email = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;What is your email address? &quot;</span>)
nickname = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;What is your nickname? &quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Let&#x27;s make sure we got this right&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Your name: &quot;</span> + name)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Your email address: &quot;</span> + email)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Your nickname: &quot;</span> + nickname)
</code></pre>
<p>قد يطبع البرنامج ما يلي، على سبيل المثال:</p>
<pre><code>What is your name? **Frances Fictitious**
What is your email address? **frances99@example.com**
What is your nickname? **Fran**
Let's make sure we got this right
Your name: Frances Fictitious
Your email address: frances99@example.com
Your nickname: Fran
</code></pre>
<p>إذا استُخدم المتغيّر نفسه لتخزين أكثر من مُدخَل، فإن كل قيمة جديدة ستحلّ محلّ القيمة السابقة. فمثلًا:</p>
<pre><code class="language-python">address = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;What is your address? &quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;So you live at address &quot;</span> + address)

address = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a new address: &quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Your address is now &quot;</span> + address)
</code></pre>
<p>مثال على تنفيذ البرنامج:</p>
<pre><code>What is your address? **Python Path 101, Flat 3D**
So you live at address Python Path 101, Flat 3D
Please type in a new address: **New Road 999**
Your address is now New Road 999
</code></pre>
<p>وهذا يعني أنه إذا استُخدم المتغيّر نفسه لتخزين مُدخَلين متتاليين، فلا توجد طريقة للوصول إلى قيمة المُدخَل الأول بعد أن حلّت محلّها الثانية:</p>
<pre><code class="language-python">address = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;What is your address? &quot;</span>)
address = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a new address: &quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Your address is now &quot;</span> + address)
</code></pre>
<p>مثال على كيف قد يبدو مخرجات البرنامج:</p>
<pre><code>What is your address? **Python Path 10**
Please type in a new address: **Programmer's Walk 23**
Your address is now Programmer's Walk 23
</code></pre>
<blockquote>
<p><strong>تمرين تفاعلي: الاسم والعنوان</strong></p>
<p>اكتب برنامجًا يطلب اسم المستخدم وعنوانه. وعلى البرنامج أيضًا أن يطبع المعلومات المُدخَلة، على النحو التالي:</p>
</blockquote>
<pre><code>Given name: **Steve**
Family name: **Sanders**
Street address: **91 Station Road**
City and postal code: **London EC05 6AW**
Steve Sanders
91 Station Road
London EC05 6AW
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: إصلاح الشيفرة: الأقوال</strong></p>
<p>إليك برنامجًا من المفترض أن يطلب ثلاثة أقسام ويطبعها، على النحو التالي:</p>
</blockquote>
<pre><code>The 1st part: **hickory**
The 2nd part: **dickory**
The 3rd part: **dock**
hickory-dickory-dock!
</code></pre>
<p>لكن هناك خلل ما في الشيفرة أدناه. يُرجى إصلاحه.</p>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: القصة</strong></p>
<p>اكتب برنامجًا يطبع القصة التالية. ويعطي المستخدم اسمًا وسنة، ينبغي إدراجهما في المطبوع.</p>
</blockquote>
<pre><code>Please type in a name: **Mary**
Please type in a year: **1572**

Mary is a valiant knight, born in the year 1572. One morning Mary woke up to an awful racket: a dragon was approaching the village. Only Mary could save the village's residents.
</code></pre>
<p>القصة ينبغي أن تتغيّر وفق المُدخَل الذي يُعطيه المستخدم.</p>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<!--

اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 10cb3510-d8a6-5e9b-b372-c85c4c7eb957)


-->
`,l={book:n,chapter:s,chapterTitle:a,slug:e,title:o,headings:t,html:p};export{n as book,s as chapter,a as chapterTitle,l as default,t as headings,p as html,e as slug,o as title};
