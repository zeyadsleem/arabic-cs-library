const s="database-foundations",a="sql-kookclub",n="Exercises SQL on database for a cooking club",p="index",l="تمارين SQL على قاعدة بيانات نادٍ للطبخ",e=[{depth:2,id:"تقديم-النموذج",text:"تقديم النموذج"},{depth:2,id:"أسئلة-عليك-فيها-إعطاء-الجواب-فقط",text:"أسئلة عليك فيها إعطاء الجواب فقط"},{depth:2,id:"سؤال-النموذج",text:"سؤال النموذج"},{depth:2,id:"بالنظر-إلى-استعلام-sql-فما-كان-السؤال",text:"بالنظر إلى استعلام SQL، فما كان السؤال؟"},{depth:2,id:"استعلامات-sql",text:"استعلامات SQL"},{depth:2,id:"أسئلة-عليك-فيها-إعطاء-الجواب-فقط-الجزء-2",text:"أسئلة عليك فيها إعطاء الجواب فقط، الجزء 2"},{depth:2,id:"بالنظر-إلى-استعلام-sql-فما-كان-السؤال-الجزء-2",text:"بالنظر إلى استعلام SQL، فما كان السؤال؟ الجزء 2"},{depth:2,id:"استعلامات-sql-الجزء-2",text:"استعلامات SQL، الجزء 2"},{depth:2,id:"أسئلة-عليك-فيها-إعطاء-الجواب-فقط-الجزء-3-فيديو",text:"أسئلة عليك فيها إعطاء الجواب فقط، الجزء 3 (+ فيديو)"},{depth:2,id:"تعديل-بيانات-قاعدة-البيانات-فيديو",text:"تعديل بيانات قاعدة البيانات (+ فيديو)"},{depth:2,id:"بالنظر-إلى-الاستعلام-فما-كان-السؤال-الجزء-3-فيديو",text:"بالنظر إلى الاستعلام، فما كان السؤال؟ الجزء 3 (+ فيديو)"},{depth:2,id:"إضافة-معلومات-إلى-قاعدة-البيانات-فيديو",text:"إضافة معلومات إلى قاعدة البيانات (+ فيديو)"},{depth:2,id:"استعلامات-sql-الجزء-3-فيديو",text:"استعلامات SQL، الجزء 3 (+ فيديو)"}],o=`<blockquote>
<p>كل ما أردت فعله يومًا هو جعل الطعام في متناول الجميع؛ وأن أُظهر أنك تستطيع ارتكاب الأخطاء – وأنا أفعل ذلك طوال الوقت – لكن ذلك لا يهم. —Jamie Oliver</p>
</blockquote>
<h2 id="تقديم-النموذج">تقديم النموذج</h2>
<p>في هذا الفصل الأخير نريد أن نعطيك فكرة عن صعوبة تمارين الامتحان. ولهذا نعيد استخدام نموذج استُخدم في امتحان سابق لنادٍ للطبخ.</p>
<p>يمكنك إيجاد هذا النموذج (&quot;cooking_club&quot;) في قاعدة البيانات &quot;df&quot;. ولديك صلاحيات <code>SELECT</code> فقط، وبالتالي لا يمكنك اختبار <code>INSERT</code> و<code>CREATE</code> ونحو ذلك.</p>
<p>ولهذا الامتحان، سنستخدم نموذجًا بسيطًا لمنظمة تنظّم ورش عمل للطبخ. وهذا هو النموذج الفيزيائي:</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-kookclub-0-ERD_kookclub.webp" alt=""></p>
<p>نريد أتمتة تنظيم ورش عمل الطبخ. وتدور ورشة طبخ دائمًا حول موضوع معين توجد داخله أطباق معينة. ويمكن للأعضاء التسجيل للمشاركة في ورشة، ويمكنهم أيضًا منح تقييم وبعض الملاحظات. وكلا الخاصيتين غير إلزامية.</p>
<p>وعند تنظيم ورشة طبخ، يُحدَّد الموضوع كما ذُكر أعلاه. وداخل كل موضوع تُعرف عدة أطباق. ويمكن لورشة الطبخ اختيار أطباق من المعروضات داخل ذلك الموضوع، لكن يمكن أيضًا إضافة طبق جديد. وبالطبع سيُربط هذا الطبق الجديد بذلك الموضوع. ولكل طبق تُسجَّل المكوّنات والكميات المستخدمة لكل طبق في قاعدة البيانات.</p>
<p>ملاحظة عن المكوّنات: تشير الوحدة إلى ما إذا كان ذلك المكوّن يُستخدم بالغرام أو بالمليلتر أو بملعقة الطعام أو بالقطعة أو غير ذلك. ويعرض مستوى الطاقة عدد الكيلوكالوري. ولاحظ أنه إذا كانت الوحدة معبَّر عنها بالغرام أو المليلتر، فإن الطاقة تُعطى دائمًا لكل 100 غرام أو 100 مليلتر. وفي الحالات الأخرى تكون لكل وحدة مشار إليها.</p>
<p>فمثلًا، تحقق في قاعدة البيانات من أن الفراولة فيها 32 كيلوكالوري من الطاقة لكل 100 غرام، وأن المشمشة الواحدة فيها محتوى طاقة 27 كيلوكالوري.</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> cooking_club.ingredient <span class="hljs-comment">-- or use the search_path …</span>
<span class="hljs-keyword">WHERE</span> name <span class="hljs-keyword">IN</span> (<span class="hljs-string">&#x27;Strawberry&#x27;</span>,<span class="hljs-string">&#x27;Apricot&#x27;</span>);
</code></pre>
<p>لا تنسَ ضبط <code>search_path</code> بشكل صحيح أو استخدام اسم المخطط قبل اسم الجدول...</p>
<p>نصيحة: ادرس الآن النموذج قبل النظر في الأسئلة. راجع محتويات جميع الجداول لتأخذ فكرة عن أين تجد المعلومات ومدى ضخامة بعض الجداول. فجزء من قاعدة البيانات مولَّد تلقائيًا (مثل &quot;member&quot; و&quot;participation&quot;)، لكن جداول كثيرة لا تزال مملوءة يدويًا ولذا تبدو البيانات واقعية إلى حد كبير.</p>
<p>ستجد أدناه تمارين كثيرة كما طُلبت مرة في امتحان. وهناك أنواع كثيرة ومختلفة:</p>
<ul>
<li>أعطِ الجواب عن سؤال، دون طلب شيفرة SQL.</li>
<li>أعطِ شيفرة SQL التي تجيب عن سؤال.</li>
<li>عدّل قاعدة البيانات: أضف بيانات، غيّر أشياء (لكن لا يمكنك اختبار ذلك لأنك لا تملك الأذونات المناسبة).</li>
<li>ماذا تفعل شيفرة SQL التالية؟</li>
<li>وسّع النموذج بوظيفة جديدة.</li>
</ul>
<h2 id="أسئلة-عليك-فيها-إعطاء-الجواب-فقط">أسئلة عليك فيها إعطاء الجواب فقط</h2>
<p>في هذه التمارين لا يلزمك سوى تقديم إجابة قصيرة (اسم، مكوّن، بلدية...). فلا يلزمك تقديم الاستعلام الذي وجدت به هذه الإجابة. وستجد في الحلول عادةً الاستعلام لتتحقق مما أخطأت فيه.</p>
<p>يتضمن المخطط قائمة شاملة بالمكوّنات. وبعضها بالغرام، وآخر بالمليلتر، وآخر بملعقة الطعام، وغيره بالقطعة، وهكذا. افترض أنك تأكل واحدًا من كل مكوّن يُعدّ <em>بالقطعة</em>، فكم كمية الطاقة (كيلوكالوري) التي استهلكتها؟</p>
<h4>الحل</h4>
<p>الجواب: 7071 كيلوكالوري. والاستعلام الممكن لذلك:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">sum</span>(energy)
<span class="hljs-keyword">FROM</span> ingredient
<span class="hljs-keyword">WHERE</span> unit <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;piece&#x27;</span>;
</code></pre>
<p>مُلئ هذا المخطط جزئيًا بتوليد بيانات تلقائي. ولم يُفعل ذلك بذكاء شديد. فمثلًا، من الواضح أنه لا يمكن أن يقع تاريخ تسجيل <em>بعد</em> ورشة الطبخ نفسها. لذا يجب تصحيح هذا الخطأ يدويًا. فكم عدد التسجيلات الخاطئة كهذه؟</p>
<h4>الحل</h4>
<p>الجواب: 57، والاستعلام الممكن:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>)
<span class="hljs-keyword">FROM</span> participation D <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> cooking_workshop K <span class="hljs-keyword">ON</span> D.workshop <span class="hljs-operator">=</span> K.workshop_id
<span class="hljs-keyword">WHERE</span> D.registration_date <span class="hljs-operator">&gt;</span> K.start_time;
</code></pre>
<p>تحقق من جميع الأطباق <em>الرئيسية</em> التي صُنعت يومًا في ورشة طبخ. وقد تطلب ذلك مكوّنات كثيرة. وإذا حذفتها من القائمة الطويلة لجميع المكوّنات ورتّبت القائمة المتبقية أبجديًا، فما المكوّن الذي لم يُستخدم لأي طبق رئيسي ويقع في الصف 81؟</p>
<h4>الحل</h4>
<p>الجواب: Meatball، ويمكن إيجاد الحل مثلًا عبر:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> name, IG.dish
<span class="hljs-keyword">FROM</span> dish_in_workshop GW
  <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> ingredient_in_dish IG <span class="hljs-keyword">on</span> GW.dish <span class="hljs-operator">=</span> IG.dish <span class="hljs-keyword">AND</span> role_in_menu <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Main Dish&#x27;</span>
  <span class="hljs-keyword">RIGHT</span> <span class="hljs-keyword">OUTER</span> <span class="hljs-keyword">JOIN</span> ingredient I <span class="hljs-keyword">ON</span> IG.ingredient <span class="hljs-operator">=</span> I.name
<span class="hljs-keyword">WHERE</span> IG.dish <span class="hljs-keyword">is</span> <span class="hljs-keyword">NULL</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">1</span>;
</code></pre>
<p>من أصغر مشارك في ورشة طبخ استخدم كلمة &quot;awesome&quot; أو &quot;fantastic&quot; في ملاحظاته؟ وقدّم الاسم الأول ثم الاسم.</p>
<h4>الحل</h4>
<p>الجواب: Ramiro Bell، مثلًا بالاستعلام التالي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> first_name, name, birth_date, feedback
<span class="hljs-keyword">FROM</span> participation D <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> <span class="hljs-keyword">member</span> L <span class="hljs-keyword">ON</span> D.member <span class="hljs-operator">=</span> L.member_number
<span class="hljs-keyword">WHERE</span> feedback <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;%awesome%&#x27;</span> <span class="hljs-keyword">OR</span> feedback <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;%fantastic%&#x27;</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">3</span> <span class="hljs-keyword">DESC</span>;
</code></pre>
<h2 id="سؤال-النموذج">سؤال النموذج</h2>
<p>في هذا السؤال، عليك إضافة شيء إلى النموذج. ولا يمكنك اختبار ذلك لأنك تملك صلاحيات <code>SELECT</code> فقط على المخطط. وترسم شيئًا على الورق لهذا السؤال على مخطط الكيانات والعلاقات (النموذج الفيزيائي) للمخطط وتصدر استعلامات SQL اللازمة.</p>
<p>نريد تتبّع كمية المكوّنات التي نحتاج إلى طلبها لورشة معينة. وللقيام بذلك، نحتاج إلى تتبّع كمية كل مكوّن مطلوب في تاريخ محدد.</p>
<ol>
<li>ارسم الإضافة اللازمة إلى المخطط.</li>
<li>اكتب التغييرات اللازمة في نص <code>CREATE</code>. واحرص أيضًا على أن تكون الأعداد المطلوبة موجبة تمامًا دائمًا. وأدرج جميع قواعد السلامة.</li>
<li>بالنسبة إلى ورشة الطبخ 7، ينبغي طلب المكوّنات التالية: 600 غرام زنجبيل (80 كيلوكالوري لكل 100 غرام)، و180 غرام واسابي (241 كيلوكالوري لكل 100 غرام)، و6 كيلوغرام سلمون (137 كيلوكالوري لكل 100 غرام)، و7 قطع بروكلي (35 كيلوكالوري لكل قطعة). واكتب جمل <code>INSERT</code> اللازمة لذلك.</li>
</ol>
<h4>الحل</h4>
<p>تحتاج إلى إنشاء جدول:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE  TABLE</span> cooking_club.order (
  ingredient_name          <span class="hljs-type">varchar</span>(<span class="hljs-number">30</span>)  <span class="hljs-keyword">NOT NULL</span> ,
  workshop_id              <span class="hljs-type">smallint</span>  <span class="hljs-keyword">NOT NULL</span> ,
  order_date               <span class="hljs-type">date</span> <span class="hljs-keyword">NOT NULL</span> ,
  number                   <span class="hljs-type">smallint</span>  <span class="hljs-keyword">NOT NULL</span> ,
  <span class="hljs-keyword">CONSTRAINT</span> pk_order <span class="hljs-keyword">PRIMARY KEY</span> ( ingredient_name, workshop_id, order_date ),
  <span class="hljs-keyword">CONSTRAINT</span> fk_order_ingredient <span class="hljs-keyword">FOREIGN KEY</span> ( ingredient_name )
      <span class="hljs-keyword">REFERENCES</span> cooking_club.ingredient( name )   ,
  <span class="hljs-keyword">CONSTRAINT</span> fk_order_cooking_workshop <span class="hljs-keyword">FOREIGN KEY</span> ( workshop_id )
       <span class="hljs-keyword">REFERENCES</span> cooking_club.cooking_workshop( workshop_id )   ,
  <span class="hljs-keyword">CONSTRAINT</span> cns_order <span class="hljs-keyword">CHECK</span> ( number <span class="hljs-operator">&gt;</span> <span class="hljs-number">0</span> )
);
</code></pre>
<p>وتتم إضافة المعلومات الإضافية كما يلي: اطلب 0.6 كيلوغرام من الزنجبيل (80 كيلوكالوري لكل 100 غرام)، و180 غرامًا من الواسابي (241 كيلوكالوري لكل 100 غرام)، و6 كيلوغرامات من السلمون (137 كيلوكالوري لكل 100 غرام)، و7 حبات بروكلي (35 كيلوكالوري لكل واحدة) لاستخدامها في ورشة الطبخ 7 لأننا سنعدّ فيها سمكًا على الطريقة الشرقية. والزنجبيل والسلمون والبروكلي موجودة بالفعل في جدول المكوّنات. أما الواسابي فليس موجودًا فيه بعد، لذا عليك أولًا إضافة ذلك المكوّن:</p>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> ingredient <span class="hljs-keyword">VALUES</span> (<span class="hljs-string">&#x27;Wasabi&#x27;</span>, <span class="hljs-string">&#x27;g&#x27;</span>, <span class="hljs-number">241</span>);
</code></pre>
<p>ويمكننا الآن إدراج الطلب في جدول order:</p>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> <span class="hljs-keyword">order</span> <span class="hljs-keyword">VALUES</span> (<span class="hljs-string">&#x27;Ginger&#x27;</span>, <span class="hljs-number">7</span>, <span class="hljs-string">&#x27;2020-08-18&#x27;</span>, <span class="hljs-number">600</span>);
<span class="hljs-keyword">INSERT INTO</span> <span class="hljs-keyword">order</span> <span class="hljs-keyword">VALUES</span> (<span class="hljs-string">&#x27;Wasabi&#x27;</span>, <span class="hljs-number">7</span>, <span class="hljs-string">&#x27;2020-08-18&#x27;</span>, <span class="hljs-number">180</span>);
<span class="hljs-keyword">INSERT INTO</span> <span class="hljs-keyword">order</span> <span class="hljs-keyword">VALUES</span> (<span class="hljs-string">&#x27;Salmon&#x27;</span>, <span class="hljs-number">7</span>, <span class="hljs-string">&#x27;2020-08-18&#x27;</span>, <span class="hljs-number">6000</span>);
<span class="hljs-keyword">INSERT INTO</span> <span class="hljs-keyword">order</span> <span class="hljs-keyword">VALUES</span> (<span class="hljs-string">&#x27;Broccoli&#x27;</span>, <span class="hljs-number">7</span>, <span class="hljs-string">&#x27;2020-08-18&#x27;</span>, <span class="hljs-number">7</span>);
</code></pre>
<h2 id="بالنظر-إلى-استعلام-sql-فما-كان-السؤال">بالنظر إلى استعلام SQL، فما كان السؤال؟</h2>
<p>في هذا التمرين، يُعطى لك استعلام هو جواب عن سؤال معين. فما كان السؤال؟ وقدّم إجابتك بأكبر قدر ممكن من الاكتمال. ولا تتردد في استخدام عدة جمل.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">distinct</span> municipality
<span class="hljs-keyword">FROM</span> municipality <span class="hljs-keyword">LEFT</span> <span class="hljs-keyword">OUTER</span> <span class="hljs-keyword">JOIN</span> <span class="hljs-keyword">member</span> <span class="hljs-keyword">using</span>(postal_code)
  <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> participation <span class="hljs-keyword">ON</span> member.member_number <span class="hljs-operator">=</span> participation.member
  <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> dish_in_workshop <span class="hljs-keyword">using</span>(workshop)
  <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> ingredient_in_dish <span class="hljs-keyword">using</span>(dish)
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> municipality, participation.member
<span class="hljs-keyword">HAVING</span> <span class="hljs-built_in">COUNT</span>(<span class="hljs-keyword">distinct</span> ingredient) <span class="hljs-operator">&gt;</span> <span class="hljs-number">30</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">1</span> <span class="hljs-keyword">ASC</span>;
</code></pre>
<h4>الحل</h4>
<p>قدّم قائمة أبجدية بجميع البلديات التي شارك سكانها في ورشة طبخ واحدة أو أكثر بمجموع يزيد على 30 مكوّنًا مختلفًا (عبر جميع ورش طبخ هذا العضو). وإذا وُجد عدة سكان كهؤلاء، فينبغي إدراج البلدية مرة واحدة فقط. و<code>OUTER JOIN</code> ليس له أثر ولا يُترجم إلى السؤال.</p>
<h2 id="استعلامات-sql">استعلامات SQL</h2>
<p>يتطلب النوع التالي من التمارين إعادة <em>استعلام SQL الكامل</em> جوابًا لك.</p>
<p>قدّم نظرة عامة تبيّن لكل مكوّن في أي موضوعات يُستخدم ذلك المكوّن. وهناك عمود إضافي يعرض طاقة المكوّن بكلمة واحدة: أقل من 100 (كيلوكالوري) هو &quot;low&quot;، وبين 100 و300 هو &quot;medium&quot;، وأعلى من 300 هو &quot;high&quot;. وتجنّب تكرار الصفوف. ورتّب المكوّنات أبجديًا. اكتب الاستعلام.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-kookclub-1-kcal.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">distinct</span> I.name <span class="hljs-keyword">AS</span> ingredient, GT.theme <span class="hljs-keyword">AS</span> &quot;name theme&quot;, 
  <span class="hljs-keyword">CASE</span>
    <span class="hljs-keyword">WHEN</span> energy <span class="hljs-operator">&lt;</span> <span class="hljs-number">100</span> <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;low&#x27;</span>
    <span class="hljs-keyword">WHEN</span> energy <span class="hljs-operator">&gt;</span> <span class="hljs-number">300</span> <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;high&#x27;</span>
    <span class="hljs-keyword">ELSE</span> <span class="hljs-string">&#x27;medium&#x27;</span>
  <span class="hljs-keyword">END</span> <span class="hljs-keyword">AS</span> energy
<span class="hljs-keyword">FROM</span> ingredient I
    <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> ingredient_in_dish IG <span class="hljs-keyword">ON</span> (I.name <span class="hljs-operator">=</span> IG.ingredient)
    <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> dish_fits_in_theme GT <span class="hljs-keyword">using</span>(dish)
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">1</span>;
</code></pre>
<p>لكل موضوع، اسرد (انظر الشكل) حسب البلدية عدد المشاركين من تلك البلدية. ورتّب أبجديًا حسب الموضوع وداخل الموضوع الواحد حسب عدد الأعضاء المتناقص. اكتب الاستعلام.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-kookclub-2-ledenperthema.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> theme, municipality, <span class="hljs-built_in">COUNT</span> (member_number) <span class="hljs-keyword">AS</span> &quot;number of members per municipality&quot;
<span class="hljs-keyword">FROM</span> <span class="hljs-keyword">member</span>
  <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> municipality <span class="hljs-keyword">USING</span> (postal_code)
  <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> participation <span class="hljs-keyword">ON</span> (<span class="hljs-keyword">member</span> <span class="hljs-operator">=</span> member_number)
  <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> cooking_workshop <span class="hljs-keyword">ON</span> (workshop <span class="hljs-operator">=</span> workshop_id)
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> theme, postal_code, municipality
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> theme, <span class="hljs-built_in">COUNT</span>(member_number) <span class="hljs-keyword">DESC</span>;
</code></pre>
<p>وصيغة بديلة يمكن فيها إغفال municipality في <code>GROUP BY</code> بسبب عدم استخدام <code>USING</code>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> theme, municipality, <span class="hljs-built_in">COUNT</span> (member_number) <span class="hljs-keyword">AS</span> &quot;number of members per municipality&quot;
<span class="hljs-keyword">FROM</span> <span class="hljs-keyword">member</span>
  <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> municipality <span class="hljs-keyword">ON</span> municipality.postal_code <span class="hljs-operator">=</span> member.postal_code
  <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> participation <span class="hljs-keyword">ON</span> (<span class="hljs-keyword">member</span> <span class="hljs-operator">=</span> member_number)
  <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> cooking_workshop <span class="hljs-keyword">ON</span> (workshop <span class="hljs-operator">=</span> workshop_id)
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> theme, municipality.postal_code
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> theme, <span class="hljs-built_in">COUNT</span>(member_number) <span class="hljs-keyword">DESC</span>;
</code></pre>
<p>كم كيلوكالوري في طبق &quot;Tiramisu with chocolate and banana&quot; لكل مكوّن؟ ولاحظ أنه عندما تكون الوحدة &quot;g&quot; أو &quot;ml&quot;، فإن محتوى الطاقة هو عدد الكيلوكالوري لكل 100 غرام أو 100 مليلتر. أما بالنسبة إلى جميع الوحدات الأخرى، فالعدد بالكيلوكالوري هو ببساطة الطاقة لكل وحدة (قطعة، ملعقة طعام...). لذا ضع الوحدات في اعتبارك. والمكوّن الذي يقدّم أكبر إسهام في طاقة هذا الطبق في الأعلى، ثم الثاني، وهكذا. انظر الشكل. اكتب الاستعلام.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-kookclub-3-tiramisu-energie.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> IG.ingredient, quantity, unit,energy,
  <span class="hljs-keyword">CASE</span>
    <span class="hljs-keyword">WHEN</span> unit <span class="hljs-keyword">in</span> (<span class="hljs-string">&#x27;g&#x27;</span>,<span class="hljs-string">&#x27;ml&#x27;</span>) <span class="hljs-keyword">THEN</span> energy <span class="hljs-operator">*</span> quantity <span class="hljs-operator">/</span> <span class="hljs-number">100</span>
    <span class="hljs-keyword">ELSE</span> energy <span class="hljs-operator">*</span> quantity
  <span class="hljs-keyword">END</span> <span class="hljs-keyword">AS</span> titak
<span class="hljs-keyword">FROM</span> ingredient_in_dish IG <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> ingredient I <span class="hljs-keyword">ON</span> IG.ingredient <span class="hljs-operator">=</span> I.name
<span class="hljs-keyword">WHERE</span> dish <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Tiramisu with chocolate and banana&#x27;</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">5</span> <span class="hljs-keyword">DESC</span>;
</code></pre>
<h2 id="أسئلة-عليك-فيها-إعطاء-الجواب-فقط-الجزء-2">أسئلة عليك فيها إعطاء الجواب فقط، الجزء 2</h2>
<p>اسرد أبجديًا جميع المكوّنات التي <em>لم تُستخدم بعد</em> في طبق. فأي مكوّن يقع في المرتبة 100 وما قيمة طاقة هذا المكوّن؟ إذن تحتوي إجابتك على جزأين مثل: &quot;Cauliflower with 25 kcal&quot;.</p>
<h4>الحل</h4>
<p>الجواب: &quot;Red Whine&quot; بـ 82 كيلوكالوري. والاستعلام الممكن:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ingredient.name, ingredient.energy
<span class="hljs-keyword">FROM</span> ingredient <span class="hljs-keyword">LEFT</span> <span class="hljs-keyword">OUTER</span> <span class="hljs-keyword">JOIN</span> ingredient_in_dish <span class="hljs-keyword">ON</span> (ingredient.name <span class="hljs-operator">=</span> ingredient_in_dish.ingredient)
<span class="hljs-keyword">WHERE</span> ingredient_in_dish.dish <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> ingredient.name;
</code></pre>
<p>اعرض جميع المشاركات في ورش الطبخ لأشخاص من بلدية تبدأ بحرف &quot;N&quot; أو تنتهي بحرف &quot;n&quot;. فكم مشاركًا من هذه البلديات منح تقييمًا لا يقل عن 7؟</p>
<h4>الحل</h4>
<p>الجواب: 10. والاستعلام الممكن:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> score, member_number, municipality, postal_code
<span class="hljs-keyword">FROM</span> participation D
    <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> <span class="hljs-keyword">member</span> L <span class="hljs-keyword">ON</span> D.member <span class="hljs-operator">=</span> L.member_number
    <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> municipality <span class="hljs-keyword">using</span>(postal_code)
<span class="hljs-keyword">WHERE</span> (municipality <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;N%&#x27;</span> <span class="hljs-keyword">OR</span> municipality <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;%n&#x27;</span>) <span class="hljs-keyword">AND</span> score <span class="hljs-operator">&gt;=</span> <span class="hljs-number">7</span>;
</code></pre>
<p>راجع القائمة الطويلة للمكوّنات، لكن اقتصر على المكوّنات المقيسة بالغرام (&quot;g&quot;). واحسب متوسط طاقة هذه المكوّنات (وهي مقيسة لكل 100 غرام، لكن ذلك لا يهم هنا). فأي مكوّن مقيس بالغرام محتوى طاقته أقرب إلى هذا المتوسط؟</p>
<h4>الحل</h4>
<p>الجواب: Advocaat (240 كيلوكالوري لكل 100 غرام، وهو الأقرب إلى المتوسط 226.5). ويمكنك الحصول على ذلك بسهولة بأصغر استعلامين، لكن يستطيع بالطبع فعل ذلك بصورة أكثر أناقة باستعلام واحد (يحتوي استعلامًا فرعيًا).</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> name,energy <span class="hljs-comment">-- but first you ask avg(energy)</span>
<span class="hljs-keyword">FROM</span> ingredient
<span class="hljs-keyword">WHERE</span> unit <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;g&#x27;</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">2</span>;
</code></pre>
<p>قدّم الاسم الأول واسم العضو صاحب أكبر عدد من المشاركات. وإذا وُجد عدة أعضاء بالعدد الأقصى نفسه من المشاركات، فأعطِ جميع الأسماء (الاسم الأول ثم الاسم الأخير).</p>
<h4>الحل</h4>
<p>الجواب: Benny Nielsenn وCasey Valentine وShelley Vincent</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> name, first_name, <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>)
<span class="hljs-keyword">FROM</span> participation D <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> <span class="hljs-keyword">member</span> L <span class="hljs-keyword">ON</span> D.member <span class="hljs-operator">=</span> L.member_number
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> member_number
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">3</span> <span class="hljs-keyword">DESC</span>, <span class="hljs-number">1</span>;
</code></pre>
<h2 id="بالنظر-إلى-استعلام-sql-فما-كان-السؤال-الجزء-2">بالنظر إلى استعلام SQL، فما كان السؤال؟ الجزء 2</h2>
<p>في هذا التمرين تحصل على استعلام هو جواب عن سؤال معين. فما كان هذا السؤال؟ وقدّم إجابتك بأكبر قدر ممكن من الاكتمال. ولا تتردد في استخدام عدة جمل لوصف ذلك السؤال بوضوح.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> G.name
<span class="hljs-keyword">FROM</span> theme T
    <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> dish_fits_in_theme GT <span class="hljs-keyword">ON</span> T.name <span class="hljs-operator">=</span> GT.theme
    <span class="hljs-keyword">RIGHT</span> <span class="hljs-keyword">OUTER</span> <span class="hljs-keyword">JOIN</span> dish G <span class="hljs-keyword">ON</span> GT.dish <span class="hljs-operator">=</span> G.name <span class="hljs-keyword">AND</span>
        T.name <span class="hljs-keyword">IN</span> (<span class="hljs-string">&#x27;mediterranean&#x27;</span>,<span class="hljs-string">&#x27;italian&#x27;</span>,<span class="hljs-string">&#x27;fish&#x27;</span>)
<span class="hljs-keyword">WHERE</span> T.name <span class="hljs-keyword">is</span> <span class="hljs-keyword">NULL</span> <span class="hljs-keyword">AND</span> G.description <span class="hljs-keyword">NOT</span> <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;%summer%&#x27;</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> preparation_time <span class="hljs-keyword">DESC</span>;
</code></pre>
<h4>الحل</h4>
<p>هذا تمرين صعب، <a href="/arabic-cs-library/book/database-foundations/sql-outerjoin/index#Select-rows-that-do-NOT-meet-a-certain-condition">انظر أيضًا عنوان &quot;تحديد الصفوف التي لا تحقق شرطًا معينًا في الجزء الخاص بـ OUTER JOIN</a>. اسرد جميع الأطباق في قاعدة البيانات التي <em>ليس</em> موضوعها Mediterranean أو Italian أو Fish ولا يتضمن وصف الطبق كلمة summer، مرتبة حسب مدة تحضير الطبق المتناقصة.</p>
<h2 id="استعلامات-sql-الجزء-2">استعلامات SQL، الجزء 2</h2>
<p>اكتب استعلامًا يحسب، لجميع الأطباق التي لها قائمة مكوّنات، محتوى الطاقة الإجمالي بالكيلوكالوري. تنبيه: بالنسبة إلى المكوّنات التي وحدتها &quot;g&quot; أو &quot;ml&quot;، يُعطى محتوى الطاقة لكل 100 غرام أو 100 مليلتر. وبالنسبة إلى جميع الوحدات الأخرى يُعطى محتوى الطاقة لكل وحدة (&quot;piece&quot; و&quot;dl&quot; و&quot;teaspoon&quot;...). ونريد استخدام هذه النظرة العامة للحصول على قائمة بالأطباق &quot;الخفيفة&quot; فقط التي تحتوي إجمالًا أقل من 4000 كيلوكالوري. والطبق ذو أقل عدد من الكيلوكالوري في الأعلى، ثم الثاني، وهكذا. ولا تُظهر اللقطة سوى الصفين الأولين.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-kookclub-4-weinigkcal.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> IG.dish,
  <span class="hljs-built_in">sum</span>(<span class="hljs-keyword">CASE</span>
    <span class="hljs-keyword">WHEN</span> unit <span class="hljs-keyword">in</span> (<span class="hljs-string">&#x27;g&#x27;</span>,<span class="hljs-string">&#x27;ml&#x27;</span>) <span class="hljs-keyword">THEN</span> energy <span class="hljs-operator">*</span> quantity <span class="hljs-operator">/</span> <span class="hljs-number">100</span>
    <span class="hljs-keyword">ELSE</span> energy <span class="hljs-operator">*</span> quantity
  <span class="hljs-keyword">END</span>) <span class="hljs-keyword">AS</span> &quot;total kcal&quot;
<span class="hljs-keyword">FROM</span> ingredient_in_dish IG <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> ingredient I <span class="hljs-keyword">ON</span> IG.ingredient <span class="hljs-operator">=</span> I.name
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> IG.dish
<span class="hljs-keyword">HAVING</span> <span class="hljs-built_in">sum</span>(<span class="hljs-keyword">CASE</span>
    <span class="hljs-keyword">WHEN</span> unit <span class="hljs-keyword">in</span> (<span class="hljs-string">&#x27;g&#x27;</span>,<span class="hljs-string">&#x27;ml&#x27;</span>) <span class="hljs-keyword">THEN</span> energy <span class="hljs-operator">*</span> quantity <span class="hljs-operator">/</span> <span class="hljs-number">100</span>
    <span class="hljs-keyword">ELSE</span> energy <span class="hljs-operator">*</span> quantity
  <span class="hljs-keyword">END</span>) <span class="hljs-operator">&lt;</span> <span class="hljs-number">4000</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">2</span>;
</code></pre>
<p>عند التسجيل لم نأخذ في الاعتبار الحد الأقصى لعدد المشاركين في كل ورشة طبخ. وهذا غبي بالطبع، لأن الأشخاص الذين سجّلوا بعد بلوغ الحد الأقصى للمشاركين ينبغي إخطارهم بأن الورشة ممتلئة بالفعل. اكتب استعلامًا يولّد قائمة بجميع الورش المفرطة في الحجز. والورشة الأكثر حجزًا زائدًا في الأعلى، وتحتها صاحبة ثاني أكبر حجز زائد، وهكذا. ولا تُظهر اللقطة في الشكل أدناه سوى الصفوف الثلاثة الأولى.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-kookclub-5-overboekt.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> workshop_id, max_participants, <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>) <span class="hljs-keyword">AS</span> &quot;number of participants&quot;
<span class="hljs-keyword">FROM</span> cooking_workshop KW <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> participation D <span class="hljs-keyword">ON</span> D.workshop <span class="hljs-operator">=</span> KW.workshop_id
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> workshop_id
<span class="hljs-keyword">HAVING</span> <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>) <span class="hljs-operator">&gt;</span> max_participants
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> (<span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>) <span class="hljs-operator">-</span> max_participants) <span class="hljs-keyword">DESC</span>;
</code></pre>
<h2 id="أسئلة-عليك-فيها-إعطاء-الجواب-فقط-الجزء-3-فيديو">أسئلة عليك فيها إعطاء الجواب فقط، الجزء 3 (+ فيديو)</h2>
<p>أنشئ قائمة بجميع الأعضاء الذين لم يشاركوا بعد في أي ورشة ويسكنون في شارع ينتهي بـ &quot;pad&quot;. ورتّب هذه القائمة من الأكبر سنًا إلى الأصغر. فما الاسم الأول للشخص الذي يقع في المرتبة 7 في هذه القائمة؟</p>
<h4>الحل</h4>
<p>الجواب: Angelica. والاستعلام الممكن:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> <span class="hljs-keyword">member</span> M <span class="hljs-keyword">LEFT</span> <span class="hljs-keyword">OUTER</span> <span class="hljs-keyword">JOIN</span> participation P <span class="hljs-keyword">ON</span> M.member_number <span class="hljs-operator">=</span> P.member
<span class="hljs-keyword">WHERE</span> street <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;%pad&#x27;</span> <span class="hljs-keyword">AND</span> workshop <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> birth_date;
</code></pre>
<p>اسرد حسب البلدية متوسط التقييم الذي منحه أهل تلك البلدية لورشة طبخ. ورتّب هذه القائمة بحيث تكون أعلى المتوسطات في الأعلى. وداخل المتوسط نفسه رتّب أبجديًا. والبلديات التي لم يمنح فيها أحد تقييمًا لا تُدرج في هذه القائمة. فأي بلدية (اسمها) في الأعلى؟</p>
<h4>الحل</h4>
<p>الجواب: Barvaux-Condrox. والاستعلام الممكن:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">avg</span>(score), municipality
<span class="hljs-keyword">FROM</span> participation P
  <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> <span class="hljs-keyword">member</span> M <span class="hljs-keyword">ON</span> P.member <span class="hljs-operator">=</span> M.member_number
  <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> municipality G <span class="hljs-keyword">ON</span> G.postal_code <span class="hljs-operator">=</span> M.postal_code
<span class="hljs-keyword">WHERE</span> score <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NOT NULL</span>
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> municipality
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-built_in">avg</span>(score) <span class="hljs-keyword">DESC</span>, municipality <span class="hljs-keyword">ASC</span>;
</code></pre>
<p>احسب النسبة المئوية للمشاركين الذين تلقوا تقييمًا إيجابيًا. ونعني بـ&quot;إيجابي&quot; أن يحتوي التقييم كلمة واحدة على الأقل من الكلمات التالية: &quot;good&quot; أو &quot;great&quot; أو &quot;fantastic&quot;. نصيحة: يمكنك كتابة استعلامين قصيرين إلى حد ما يعيد كل منهما عددًا ثم استخدام الآلة الحاسبة لحساب النسبة بنفسك. ويمكن بالطبع فعل ذلك باستعلام واحد أيضًا.</p>
<h4>الحل</h4>
<p>الجواب: 23.5%. وهناك 94 مشاركة جيدة:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>)
<span class="hljs-keyword">FROM</span> participation
<span class="hljs-keyword">WHERE</span> feedback <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;%good%&#x27;</span> <span class="hljs-keyword">or</span> feedback <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;%great%&#x27;</span> <span class="hljs-keyword">or</span> feedback <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;%fantastic%&#x27;</span>;
</code></pre>
<p>وإجمالًا هناك 400 مشاركة:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>)
<span class="hljs-keyword">FROM</span> participation;
</code></pre>
<p>أنشئ قائمة بجميع المكوّنات التي تحتوي حرف &quot;a&quot; <em>مرتين بالضبط</em>. ولا نأخذ حالة الأحرف في الاعتبار. ورتّب حسب محتوى الطاقة المتناقص. فأي مكوّن يقع في المرتبة 21؟</p>
<h4>الحل</h4>
<p>الجواب: Low-fat cottage cheese. والاستعلام الممكن:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> ingredient
<span class="hljs-keyword">WHERE</span> (<span class="hljs-built_in">lower</span>(name) <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;%a%a%&#x27;</span>) <span class="hljs-keyword">AND</span> <span class="hljs-keyword">NOT</span>(<span class="hljs-built_in">lower</span>(name) <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;%a%a%a%&#x27;</span>)
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">3</span> <span class="hljs-keyword">DESC</span>;
</code></pre>
<p>أنشئ نظرة عامة على جميع التسجيلات في ورش كتب المشارك فيها ملاحظات وكان تاريخ التسجيل قبل 1 يناير 2019. ورتّب هذه القائمة أبجديًا حسب الاسم. واذكر الاسم الأول والاسم الأخير للشخص المدرج في المرتبة 100.</p>
<h4>الحل</h4>
<p>الجواب: Sonya Osborne. والاستعلام:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> name, first_name, <span class="hljs-keyword">member</span>, registration_date, feedback
<span class="hljs-keyword">FROM</span> participation P <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> <span class="hljs-keyword">member</span> M <span class="hljs-keyword">ON</span> P.member <span class="hljs-operator">=</span> M.member_number
<span class="hljs-keyword">WHERE</span> feedback <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NOT NULL</span> <span class="hljs-keyword">AND</span> registration_date <span class="hljs-operator">&lt;</span> <span class="hljs-string">&#x27;2019-01-01&#x27;</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">1</span>;
</code></pre>
<p>رتّب جميع الموضوعات حسب عدد التسجيلات المتناقص بحيث يكون الموضوع الذي اشترك فيه أكبر عدد من الأشخاص في الأعلى. فكم تسجيلًا حصل عليه الموضوع الذي يقع في المرتبة الخامسة في هذه القائمة؟</p>
<h4>الحل</h4>
<p>الجواب: 41</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> theme, <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>)
<span class="hljs-keyword">FROM</span> participation <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> cooking_workshop <span class="hljs-keyword">ON</span> workshop <span class="hljs-operator">=</span> workshop_id
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> theme
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">2</span> <span class="hljs-keyword">DESC</span>;
</code></pre>
<h2 id="تعديل-بيانات-قاعدة-البيانات-فيديو">تعديل بيانات قاعدة البيانات (+ فيديو)</h2>
<p>اندمجت بلديتا &quot;Overpelt&quot; و&quot;Neerpelt&quot; مؤخرًا. وتشكّلان معًا الآن بلدية &quot;Pelt&quot;. ويذكر موقع بلدية Pelt: &quot;تصبح 3900 Overpelt هي 3900 Pelt، وتصبح 3910 Neerpelt هي 3910 Pelt&quot;. وعليك، بصفتك مسؤول قاعدة البيانات للنادي، التأكد من تحديث هذه المعلومة تحديثًا صحيحًا في قاعدة البيانات. اكتب استعلامًا واحدًا يفعل ذلك. تنبيه: بما أنك تملك صلاحية <code>SELECT</code> فقط على قاعدة البيانات، فلن تستطيع اختبار الاستعلام.</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">UPDATE</span> cooking_club.municipality
<span class="hljs-keyword">SET</span> municipality <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Pelt&#x27;</span>
<span class="hljs-keyword">WHERE</span> postal_code <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;3900&#x27;</span> <span class="hljs-keyword">OR</span> postal_code <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;3910&#x27;</span>;
</code></pre>
<h2 id="بالنظر-إلى-الاستعلام-فما-كان-السؤال-الجزء-3-فيديو">بالنظر إلى الاستعلام، فما كان السؤال؟ الجزء 3 (+ فيديو)</h2>
<p>بالنظر إلى الاستعلام التالي. صِف بدقة واختصار (جملة واحدة) ما السؤال الذي يقدّم الاستعلام جوابه. وابدأ إجابتك بـ &quot;اسرد جميع ...&quot;. وهذا التمرين أصعب مما تتوقع من النظرة الأولى.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> name
<span class="hljs-keyword">FROM</span> theme T <span class="hljs-keyword">LEFT</span> <span class="hljs-keyword">OUTER</span> <span class="hljs-keyword">JOIN</span> cooking_workshop CW <span class="hljs-keyword">ON</span> T.name <span class="hljs-operator">=</span> CW.theme <span class="hljs-keyword">AND</span> max_participants <span class="hljs-operator">&gt;</span> <span class="hljs-number">35</span>
<span class="hljs-keyword">WHERE</span> theme <span class="hljs-keyword">IS</span> <span class="hljs-keyword">null</span>;
</code></pre>
<h4>الحل</h4>
<p>&quot;يرجى سرد جميع الموضوعات (ويكفي الاسم) التي <em>لا</em> تُعالج في ورشة طبخ بطاقة استيعابية قصوى تزيد على 35 مشاركًا.&quot; وبديل: &quot;يرجى سرد جميع الموضوعات التي لم تُعالج بعد في ورشة طبخ أو عولجت فقط في ورشة طبخ بـ 35 مشاركًا على الأكثر.&quot;</p>
<h2 id="إضافة-معلومات-إلى-قاعدة-البيانات-فيديو">إضافة معلومات إلى قاعدة البيانات (+ فيديو)</h2>
<p>أعدّ Jeroen Meus مؤخرًا في برنامجه للطبخ <a href="https://dagelijksekost.vrt.be">&quot;dagelijkse kost&quot;</a> (وبالإنجليزية: &quot;daily food&quot;) طبق &quot;Cheese Croquette with ham and asparagus&quot;. وبدا ذلك لذيذًا بشكل خاص. وتريد بشدة إضافة هذا الطبق إلى قاعدة البيانات. ونعطي أدناه الوصف الكامل. وعليك إضافة الأسطر المناسبة. <em>والمعلومات الموجودة في قاعدة البيانات بالفعل لا ينبغي إضافتها مرة أخرى</em>، لأن خادم قاعدة البيانات سيردّ حينئذ برسالة خطأ. وإذا كانت هناك معلومات ناقصة مطلوبة، فاخترع شيئًا مناسبًا. واحترس: بما أنك تملك صلاحية <code>SELECT</code> فقط على قاعدة البيانات، فلن تستطيع اختبار الاستعلامات.</p>
<p>نضيف &quot;Cheese Croquette with ham and asparagus&quot;. ويُوصف هذا الطبق بأنه &quot;الهليون في كروكيت، مع اللحم والجبن الفلمنكي&quot;. ويستغرق تحضير هذا الطبق ساعة. وستحتاج إلى المكوّنات التالية:</p>
<ul>
<li>10 أعواد هليون (كل واحدة تقدّم طاقة 18 كيلوكالوري)</li>
<li>150 غرامًا زبدة (100 غرام زبدة تقدّم 737 كيلوكالوري)</li>
<li>ليمونة واحدة (لليمونة الواحدة طاقة 35 كيلوكالوري)</li>
<li>200 غرام من اللحم (100 غرام من اللحم تقدّم 335 كيلوكالوري)</li>
<li>0.3 كيلوغرام من الجبن الفلمنكي (100 غرام تقدّم طاقة 365 كيلوكالوري)</li>
</ul>
<p>ويندرج هذا الطبق ضمن موضوع &quot;belgian&quot;. اكتب جميع الاستعلامات اللازمة لإضافة كل هذه المعلومات إلى قاعدة البيانات.</p>
<h4>الحل</h4>
<p>من حيث المكوّنات، لا يلزمك سوى إضافة الجبن الفلمنكي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> cooking_club.ingredient <span class="hljs-keyword">VALUES</span> (<span class="hljs-string">&#x27;Flandrien Cheese&#x27;</span>, <span class="hljs-string">&#x27;g&#x27;</span>, <span class="hljs-number">365</span>);
</code></pre>
<p>ثم أضف الطبق الجديد:</p>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> cooking_club.dish <span class="hljs-keyword">VALUES</span> 
  (<span class="hljs-string">&#x27;Cheese Croquette with ham and asparagus&#x27;</span>,<span class="hljs-string">&#x27;Asparagus in a croquette, together with ham and Flandrien cheese&#x27;</span>, <span class="hljs-number">60</span>);
</code></pre>
<p>وبعد ذلك، الجدول الوسيط بينهما:</p>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> cooking_club.ingredient_in_dish <span class="hljs-keyword">VALUES</span> (<span class="hljs-string">&#x27;Cheese Croquette with ham and asparagus&#x27;</span>,<span class="hljs-string">&#x27;Asparagus&#x27;</span>,<span class="hljs-number">10</span>);
<span class="hljs-keyword">INSERT INTO</span> cooking_club.ingredient_in_dish <span class="hljs-keyword">VALUES</span> (<span class="hljs-string">&#x27;Cheese Croquette with ham and asparagus&#x27;</span>,<span class="hljs-string">&#x27;Butter&#x27;</span>,<span class="hljs-number">150</span>);
<span class="hljs-keyword">INSERT INTO</span> cooking_club.ingredient_in_dish <span class="hljs-keyword">VALUES</span> (<span class="hljs-string">&#x27;Cheese Croquette with ham and asparagus&#x27;</span>,<span class="hljs-string">&#x27;Lemon&#x27;</span>,<span class="hljs-number">1</span>);
<span class="hljs-keyword">INSERT INTO</span> cooking_club.ingredient_in_dish <span class="hljs-keyword">VALUES</span> (<span class="hljs-string">&#x27;Cheese Croquette with ham and asparagus&#x27;</span>,<span class="hljs-string">&#x27;Ham&#x27;</span>,<span class="hljs-number">200</span>);
<span class="hljs-keyword">INSERT INTO</span> cooking_club.ingredient_in_dish <span class="hljs-keyword">VALUES</span> (<span class="hljs-string">&#x27;Cheese Croquette with ham and asparagus&#x27;</span>,<span class="hljs-string">&#x27;Flandrien Cheese&#x27;</span>,<span class="hljs-number">300</span>);
</code></pre>
<p>وأخيرًا اقرن الطبق بموضوع belgian:</p>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> cooking_club.dish_fits_in_theme <span class="hljs-keyword">VALUES</span> (<span class="hljs-string">&#x27;Cheese Croquette with ham and asparagus&#x27;</span>,<span class="hljs-string">&#x27;belgian&#x27;</span>);
</code></pre>
<h2 id="استعلامات-sql-الجزء-3-فيديو">استعلامات SQL، الجزء 3 (+ فيديو)</h2>
<p>اكتب استعلام SQL الذي يولّد الملخص التالي: قائمة بجميع البلديات التي لديها ما مجموعه ثلاثة تسجيلات في ورش الطبخ. ولا نريد إلا البلديات التي يحتوي اسمها على حرف &quot;e&quot; الصغير ثلاث مرات على الأقل. ورتّب النتائج بترتيب أبجدي عكسي.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-kookclub-6-3deelnames.webp" alt=""></p>
<h4>الحل</h4>
<p>بديل: التجميع حسب البلدية والرمز البريدي مسموح أيضًا، والرمز البريدي أكثر تحديدًا.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> G.postal_code, <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>) <span class="hljs-keyword">AS</span> &quot;number of participations&quot;, G.municipality
<span class="hljs-keyword">FROM</span> municipality G
  <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> <span class="hljs-keyword">member</span> M <span class="hljs-keyword">ON</span> G.postal_code <span class="hljs-operator">=</span> M.postal_code
  <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> participation P <span class="hljs-keyword">ON</span> M.member_number <span class="hljs-operator">=</span> P.member
<span class="hljs-keyword">WHERE</span> municipality <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;%e%e%e%&#x27;</span>
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> G.postal_code
<span class="hljs-keyword">HAVING</span> <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>) <span class="hljs-operator">=</span> <span class="hljs-number">3</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">3</span> <span class="hljs-keyword">DESC</span>;
</code></pre>
<p>افترض أنك تعدّ جميع الأطباق التي موضوعها &quot;italian&quot; أو &quot;BBQ&quot; (أو كلاهما معًا). أنشئ الآن نظرة عامة لكل مكوّن يتضمن كل سطر الاسم ومقدار الطاقة (بالكيلوكالوري لكل قطعة أو 100 غرام أو 100 مليلتر...)، والوحدة التي يُعدّ بها، والكمية الإجمالية من هذا المكوّن التي تحتاجها لتحضير كل هذه الأطباق، ومقدار الطاقة بالكيلوكالوري الذي يمثله ذلك. ورتّب بحيث يكون المكوّن ذو أكبر مقدار من الكيلوكالوري في الأعلى. اكتب الاستعلام.</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ingredient, energy, unit, <span class="hljs-built_in">sum</span>(quantity) <span class="hljs-keyword">AS</span> &quot;total quantity&quot;,
  <span class="hljs-keyword">CASE</span>
    <span class="hljs-keyword">WHEN</span> unit <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;g&#x27;</span> <span class="hljs-keyword">or</span> unit <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;ml&#x27;</span> <span class="hljs-keyword">THEN</span> energy<span class="hljs-operator">*</span><span class="hljs-built_in">sum</span>(quantity)<span class="hljs-operator">/</span><span class="hljs-number">100</span>
    <span class="hljs-keyword">ELSE</span> energy<span class="hljs-operator">*</span><span class="hljs-built_in">sum</span>(quantity)
  <span class="hljs-keyword">END</span> <span class="hljs-keyword">AS</span> &quot;total energy&quot;
<span class="hljs-keyword">FROM</span> ingredient_in_dish IG
  <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> dish_fits_in_theme GT <span class="hljs-keyword">ON</span> IG.dish <span class="hljs-operator">=</span> GT.dish
  <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> ingredient I <span class="hljs-keyword">ON</span> I.name <span class="hljs-operator">=</span> IG.ingredient
<span class="hljs-keyword">WHERE</span> theme <span class="hljs-keyword">IN</span> (<span class="hljs-string">&#x27;italian&#x27;</span>,<span class="hljs-string">&#x27;BBQ&#x27;</span>)
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> ingredient, energy, unit
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">5</span> <span class="hljs-keyword">DESC</span>;
</code></pre>
`,r={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:e,html:o};export{s as book,a as chapter,n as chapterTitle,r as default,e as headings,o as html,p as slug,l as title};
