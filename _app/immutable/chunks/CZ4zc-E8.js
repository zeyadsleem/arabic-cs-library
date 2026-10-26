const s="kinney",e="enterprise-ui",n="واجهات المؤسسات",a="writing-eslint-rules",t="كتابة قواعد ESLint الخاصة بنا",o=[{depth:2,id:"ابدأ-بأرخص-وسيلة-إنفاذ-تفي-بالغرض",text:"ابدأ بأرخص وسيلة إنفاذ تفي بالغرض"},{depth:2,id:"واقع-eslint-الراهن",text:"واقع ESLint الراهن"},{depth:2,id:"شكل-القاعدة-الحديثة",text:"شكل القاعدة الحديثة"},{depth:2,id:"الزوار-والمحددات-وأحداث-مسار-الشيفرة",text:"الزوار والمحدِّدات وأحداث مسار الشيفرة"},{depth:2,id:"كائن-context-وsourcecode",text:"كائن context وSourceCode"},{depth:2,id:"الإبلاغ-عن-المشكلات-على-نحو-سليم",text:"الإبلاغ عن المشكلات على نحو سليم"},{depth:2,id:"الإصلاحات-التلقائية-مقابل-الاقتراحات",text:"الإصلاحات التلقائية مقابل الاقتراحات"},{depth:2,id:"الخيارات-والمخططات",text:"الخيارات والمخططات"},{depth:2,id:"النطاق-والمتغيرات-ومسك-سجل-الاستخدام",text:"النطاق والمتغيرات ومسك سجل «الاستخدام»"},{depth:2,id:"اختبار-القواعد-بـruletester",text:"اختبار القواعد بـRuleTester"},{depth:2,id:"قواعد-خاصة-بـtypescript",text:"قواعد خاصة بـTypeScript"},{depth:2,id:"تحزيم-القواعد-في-إضافة",text:"تحزيم القواعد في إضافة"},{depth:2,id:"استخدام-القواعد-الداخلية-دون-نشر-أي-شيء",text:"استخدام القواعد الداخلية دون نشر أي شيء"},{depth:2,id:"الأداء-والتنقيح",text:"الأداء والتنقيح"},{depth:2,id:"التسمية-والتوثيق-وقابلية-الصيانة",text:"التسمية والتوثيق وقابلية الصيانة"},{depth:2,id:"متى-تكون-القاعدة-نقطة-تمديد-خاطئة",text:"متى تكون القاعدة نقطة تمديد خاطئة"},{depth:2,id:"النهج-الافتراضي-الذي-سأستخدمه",text:"النهج الافتراضي الذي سأستخدمه"},{depth:2,id:"الخلاصة-السريعة-tldr",text:"الخلاصة السريعة (TL;DR)"},{depth:3,id:"متى-تكتب-قاعدة-مخصصة",text:"متى تكتب قاعدة مخصصة"},{depth:3,id:"تشريح-القاعدة",text:"تشريح القاعدة"},{depth:3,id:"نمط-زائر-شجرة-ast",text:"نمط زائر شجرة AST"},{depth:3,id:"اختبار-القواعد-بـruletester",text:"اختبار القواعد بـRuleTester"}],c=`<p>كتابة قواعد ESLint المخصصة من الأمور التي تبدو أكثر غموضًا مما هي عليه بكثير. فتحت قشرة الطقوس، ليست <a href="https://eslint.org/docs/latest/extend/custom-rules">القاعدة</a> سوى شيفرة تمشي في شجرة نحو مجردة (AST)، وتقرر ما إذا كان هناك خطأ ما، وتبلغ اختياريًا عن إصلاح أو اقتراح. والحيلة ليست <em>كيفية</em> كتابتها، بل معرفة متى تكون القاعدة المخصصة هي الأداة الصحيحة فعلًا، وكيف تكتبها بواجهة البرمجة المعاصرة في عصر الإعداد المسطح (flat config)، وكيف تتجنب بناء عفريت سياسات هشّ صغير يكرهه الجميع.</p>
<h2 id="ابدأ-بأرخص-وسيلة-إنفاذ-تفي-بالغرض">ابدأ بأرخص وسيلة إنفاذ تفي بالغرض</h2>
<p>لا تبدأ بكتابة إضافة لأن مهندسًا ما خاض تجربة روحية في <code>node_modules</code>. فـ<a href="https://eslint.org/docs/latest/extend/custom-rule-tutorial">إرشاد</a> ESLint نفسه هو إنشاء قاعدة مخصصة فقط عندما لا تغطي القواعد المدمجة أو قواعد المجتمع حالتك، بل إن درس القواعد المخصصة يطلب منك البحث عن حل قائم أولًا. وعدد مفاجئ من أفكار «نحتاج قاعدة مخصصة» ليس في الحقيقة إلا إعدادًا، أو تقييدًا قائمًا على محددات عبر <code>no-restricted-syntax</code>.</p>
<p>كثير من القواعد التركيبية بحتًا ينبغي التعبير عنها بـ<a href="https://eslint.org/docs/latest/extend/selectors">المحدِّدات</a> بدلًا من الشيفرة. فـESLint يدعم محددات AST شبيهة بـCSS مثل <code>VariableDeclarator &gt; Identifier</code>، ومرشحات الخصائص مثل <code>[name=&quot;foo&quot;]</code>، ومحددات الأخوة، والنفي، و<code>:matches()</code>، و<code>:exit</code>. وتعمل هذه المحددات داخل القواعد المخصصة، لكنها تعمل أيضًا في الإعداد عبر <code>no-restricted-syntax</code>. وإذا لم تكن تريد سوى «حظر هذا الشكل التركيبي»، فاجعل المحددات خيارك الأول. فلا أحد بحاجة إلى إضافة مفصّلة على الطلب لمجرد تجريم نمط AST واحد.</p>
<p>تصبح القواعد المخصصة جديرة بالجهد عندما تحتاج إلى أحد أربعة أشياء: سياسة خاصة بالمشروع، أو سياق غير تافه، أو إصلاح تلقائي آمن أو اقتراحات، أو فحوص دلالية واعية بأنواع TypeScript. وهناك تتوقف المحددات عن الكفاية ويستحق نموذج قاعدة حقيقي مكانه.</p>
<h2 id="واقع-eslint-الراهن">واقع ESLint الراهن</h2>
<p>كتابة القواعد <em>اليوم</em> تعني الكتابة لعصر الإعداد المسطح. فقد أصبح الإعداد المسطح الافتراضي في ESLint v9، وأصبح الإعداد الحديث يعيش في <code>eslint.config.js</code> أو أحد تنويعاته بصيغ الوحدات. والمنشورات القديمة التي تفترض افتراضات <code>.eslintrc</code> أو تحميل الإضافات بسلاسل نصية أو سلوك <code>RuleTester</code> القديم أصبحت أمثلة ممتازة على علم الآثار التقني.</p>
<p>حدث أكبر تغيير في واجهة البرمجة لمؤلفي القواعد في <a href="https://eslint.org/docs/latest/use/migrate-to-9.0.0">الإصدار 9</a>. فلم تعد القواعد بأسلوب الدوال مدعومة، لذا يجب أن تصدّر القاعدة كائنًا فيه <code>meta</code> و<code>create()</code>. كما نقل ESLint كثيرًا من الأدوات المساعدة من <code>context</code> إلى <code>SourceCode</code>، بما فيها أدوات النطاق والرموز مثل <code>getScope</code> و<code>getAncestors</code> و<code>getDeclaredVariables</code> و<code>markVariableAsUsed</code>. وإذا رأيت <code>TypeError: context.getScope is not a function</code>، فالكون لا يعاقبك؛ بل يعني ذلك أن القاعدة أو الإضافة لا تزال تستخدم واجهة ما قبل الإصدار 9.</p>
<p>ويؤثر هذا التغيير في الاختبارات أيضًا. ففي عالم الإعداد المسطح، يستخدم <code>RuleTester</code> افتراضات الإعداد المسطح، أي <code>ecmaVersion: &quot;latest&quot;</code> و<code>sourceType: &quot;module&quot;</code> ما لم تتجاوزهما. كما يستخدم إعداد حالات الاختبار <code>languageOptions</code> بدلًا من <code>parserOptions</code> القديمة على المستوى الأعلى. وشدّد ESLint v9 أيضًا قبضته على <code>RuleTester</code> بحيث بات يفرض أمورًا كانت تمر سابقًا، مثل اشتراط <code>message</code> أو <code>messageId</code>، واشتراط تأكيدات صريحة للاقتراحات، ومعاملة <code>output: null</code> كطريقة القول «لا إصلاح تلقائي».</p>
<h2 id="شكل-القاعدة-الحديثة">شكل القاعدة الحديثة</h2>
<p>يصدّر نموذج القاعدة الحديث كائنًا بجزأين على المستوى الأعلى: <code>meta</code> و<code>create()</code>. فـ<code>meta</code> يصف القاعدة، و<code>create(context)</code> يعيد خريطة الزوار التي يستخدمها ESLint أثناء اجتيازه شجرة AST. وتعدّد وثائق ESLint حقول <code>meta</code> الرئيسية التي ستعنيها فعلًا: <code>type</code> و<code>docs</code> و<code>messages</code> و<code>fixable</code> و<code>hasSuggestions</code> و<code>schema</code> و<code>defaultOptions</code> وبيانات الإهمال الوصفية. وينبغي أن تكون قيمة <code>type</code> واحدة من <code>&quot;problem&quot;</code> أو <code>&quot;suggestion&quot;</code> أو <code>&quot;layout&quot;</code>، ويستخدم ESLint هذا التصنيف في أشياء مثل <code>--fix-type</code>.</p>
<p>هيكل أساسي جيد:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// rules/no-window-fetch.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">meta</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;problem&#x27;</span>,
    <span class="hljs-attr">docs</span>: {
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Disallow window.fetch in application code&#x27;</span>,
      <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;https://internal.example.com/eslint/no-window-fetch&#x27;</span>,
    },
    <span class="hljs-attr">hasSuggestions</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">schema</span>: [
      {
        <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;object&#x27;</span>,
        <span class="hljs-attr">properties</span>: {
          <span class="hljs-attr">allowInTests</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;boolean&#x27;</span> },
        },
        <span class="hljs-attr">additionalProperties</span>: <span class="hljs-literal">false</span>,
      },
    ],
    <span class="hljs-attr">defaultOptions</span>: [{ <span class="hljs-attr">allowInTests</span>: <span class="hljs-literal">true</span> }],
    <span class="hljs-attr">messages</span>: {
      <span class="hljs-attr">avoidWindowFetch</span>: <span class="hljs-string">&#x27;Use the shared API client instead of window.fetch().&#x27;</span>,
      <span class="hljs-attr">replaceWithApiClient</span>: <span class="hljs-string">&#x27;Replace with apiClient.fetch().&#x27;</span>,
    },
  },

  <span class="hljs-title function_">create</span>(<span class="hljs-params">context</span>) {
    <span class="hljs-keyword">const</span> [{ allowInTests }] = context.<span class="hljs-property">options</span>;
    <span class="hljs-keyword">const</span> isTestFile = <span class="hljs-regexp">/(^|[\\\\/])(.*\\.)?(test|spec)\\.[jt]sx?$/</span>.<span class="hljs-title function_">test</span>(context.<span class="hljs-property">filename</span>);

    <span class="hljs-keyword">if</span> (allowInTests &amp;&amp; isTestFile) {
      <span class="hljs-keyword">return</span> {};
    }

    <span class="hljs-keyword">return</span> {
      <span class="hljs-string">&quot;CallExpression[callee.type=&#x27;MemberExpression&#x27;][callee.object.name=&#x27;window&#x27;][callee.property.name=&#x27;fetch&#x27;]&quot;</span>(
        node,
      ) {
        context.<span class="hljs-title function_">report</span>({
          <span class="hljs-attr">node</span>: node.<span class="hljs-property">callee</span>,
          <span class="hljs-attr">messageId</span>: <span class="hljs-string">&#x27;avoidWindowFetch&#x27;</span>,
          <span class="hljs-attr">suggest</span>: [
            {
              <span class="hljs-attr">messageId</span>: <span class="hljs-string">&#x27;replaceWithApiClient&#x27;</span>,
              <span class="hljs-title function_">fix</span>(<span class="hljs-params">fixer</span>) {
                <span class="hljs-keyword">return</span> fixer.<span class="hljs-title function_">replaceText</span>(node.<span class="hljs-property">callee</span>, <span class="hljs-string">&#x27;apiClient.fetch&#x27;</span>);
              },
            },
          ],
        });
      },
    };
  },
};
</code></pre>
<p>هذا المثال وحده يعرض الأفكار الجوهرية المهمة. فالقاعدة بأسلوب الكائنات. وتستخدم <code>meta.messages</code> و<code>messageId</code> بدلًا من سلاسل نصية مكتوبة يدويًا. وتعلن <code>hasSuggestions: true</code> لأنها تصدر اقتراحات. وتعلن مخططًا لأنها تقبل خيارات. وتستخدم مستمع محدِّد بدلًا من كومة متداخلة عملاقة من جمل <code>if</code> لأن النمط تركيبي في معظمه. وتستخدم <code>defaultOptions</code> بحيث يستطيع المنطق التنفيذي افتراض شكل خيار دون دمج الافتراضات يدويًا في كل مرة. وتوثّق ESLint كل هذه القطع مباشرة، بما فيها اشتراط ضبط القواعد المُصدِّرة للاقتراحات لـ<code>hasSuggestions</code>، وسلوك الدمج التعاودي في <code>meta.defaultOptions</code>.</p>
<h2 id="الزوار-والمحددات-وأحداث-مسار-الشيفرة">الزوار والمحدِّدات وأحداث مسار الشيفرة</h2>
<p>الكائن الذي يعيده <code>create()</code> هو <strong>خريطة زوار</strong>. فإن كان المفتاح نوع عقدة، شغّل ESLint تلك الدالة المرجعية عند دخوله تلك العقدة. وإن انتهى المفتاح بـ<code>:exit</code>، شغّله في طريق العودة. وإن كان المفتاح محدِّدًا، طبّق ESLint الدالة المرجعية عندما تطابق عقدة ذلك المحدِّد. وإن كان المفتاح أحد أحداث مسار الشيفرة، استدعاه ESLint أثناء تحليل مسار الشيفرة. وتعرض وثائق ESLint الأنماط الثلاثة صراحةً، بما فيها <code>FunctionExpression:exit</code> و<code>onCodePathStart</code> / <code>onCodePathEnd</code>.</p>
<p><a href="https://eslint.org/docs/latest/extend/selectors">المحدِّدات</a> هي القوة الخارقة المُهمَلة هنا. فيدعم ESLint أنواع العقد، ومحارف البدل، ووجود الخصائص ومقارنتها، والخصائص المتداخلة، والحقول، والأحفاد، والأبناء، والأخوة، والنفي، و<code>:matches()</code> / <code>:is()</code>. وعمليًا، غالبًا ما تجعل مستمعات المحدِّدات القاعدة أصغر وأكثر محلية وأسهل في الاستدلال من مسحات <code>Program()</code> الواسعة. استخدمها عندما يكون النمط بنيويًا، واستخدم مستمعات العقد العادية عندما يسهل التعبير عن المنطق في الشيفرة، ولا تستخدم أحداث مسار الشيفرة إلا عندما تحتاج فعلًا إلى معلومات الوصول أو تدفق التحكم.</p>
<p>وحين لا تكون متأكدًا من شكل شجرة AST، استخدم ESLint Code Explorer. فالوثائق تشير إليه مباشرة، وذلك هو التصرف الصحيح. فتخمين أشكال العقد من الذاكرة هو الطريق الذي ينتهي به الناس إلى كتابة قواعد ضد صياغة لم يحللوها فعليًا.</p>
<h2 id="كائن-context-وsourcecode">كائن <code>context</code> و<code>SourceCode</code></h2>
<p>يمثل <code>context</code> رؤية القاعدة لتشغيل الفحص الحالي. وتوثّق ESLint أكثر الخصائص فائدة: <code>id</code> و<code>filename</code> و<code>physicalFilename</code> و<code>cwd</code> و<code>options</code> و<code>sourceCode</code> و<code>settings</code> و<code>languageOptions</code>. ويخبرك <code>languageOptions</code> بوضع التحليل الفعلي وإعداد المحلل للملف الحالي. ويتباعد <code>filename</code> و<code>physicalFilename</code> في سيناريوهات المعالجات مثل كتل الشيفرة، وهذا يهم أكثر مما يتوقعه الناس بمجرد أن يدخل Markdown أو محتوى مستخلص آخر في الصورة.</p>
<p>أصبح <code>context.sourceCode</code> الآن السطح الرئيسي للأدوات المساعدة. فهناك تحصل على نص المصدر والرموز والتعليقات والنطاقات والأسلاف والمتغيرات المعلنة وخدمات المحلل. وتوثّق ESLint توابع مثل <code>getText()</code> و<code>getCommentsBefore()</code> و<code>getCommentsAfter()</code> و<code>getCommentsInside()</code> و<code>getAncestors()</code> و<code>getDeclaredVariables()</code> و<code>getScope()</code> و<code>markVariableAsUsed()</code>. ولا يوفر المحلل الافتراضي أي خدمات محلل، لكن المحللات المخصصة تستطيع ذلك، وقواعد TypeScript تعتمد على هذا بالضبط.</p>
<p>وثمة نمط عملي مخفي في واجهات البرمجة تلك: فاجعل بيانات AST أولًا. ولا تلجأ إلى نصوص <code>SourceCode</code> وواجهات الرموز إلا عندما لا تخبرك شجرة AST بما يكفي، خصوصًا في القواعد الحساسة للتخطيط التي تتعلق بالفواصل أو الفواصل المنقوطة أو المسافات أو موضع التعليقات. وتوصي وثائق ESLint صراحةً بـ<code>sourceCode.getText()</code> في هذه الحالات، وتلاحظ أن استعلامات التعليقات تُحسب عند الطلب، وهو تلميح جيد إلى عدم رشّ مسحات التعليقات على كل زائر ساخن إلا إذا كنت تحتاجها فعلًا.</p>
<p>كما تتاح <code>settings</code> المشتركة لكل قاعدة عبر <code>context.settings</code>. ويدعم الإعداد المسطح كائن <code>settings</code> تحديدًا للمعلومات المشتركة بين القواعد، ويعرض مثال ESLint قاعدة إضافة تقرأ <code>context.settings.sharedData</code>. استخدم ذلك عندما تحتاج قواعد عدة إلى إعداد الإضافة العام نفسه، واستخدم خيارات القاعدة عندما يكون سلوك ما خاصًا بقاعدة بعينها. والخلط بينهما هو كيف يتحول إعداد الإضافات إلى فلكلور.</p>
<h2 id="الإبلاغ-عن-المشكلات-على-نحو-سليم">الإبلاغ عن المشكلات على نحو سليم</h2>
<p>الفعل الجوهري للقاعدة هو <code>context.report()</code>. وتوصي وثائق ESLint بـ<code>messageId</code> بدلًا من سلاسل <code>message</code> المضمنة لأنه يمركز الرسائل في <code>meta.messages</code>، ويقلل التكرار في الاختبارات، ويجعل تغيير الرسائل أقل إيلامًا. ويحتاج الإبلاغ إلى <code>node</code> أو <code>loc</code> على الأقل، ويمكن أن يتضمن <code>data</code> لعناصر استبدال الرسالة. هذا هو النمط الافتراضي الممل الصحيح.</p>
<p>مثال نظيف:</p>
<pre><code class="language-javascript">context.<span class="hljs-title function_">report</span>({
  node,
  <span class="hljs-attr">messageId</span>: <span class="hljs-string">&#x27;avoidWindowFetch&#x27;</span>,
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">callee</span>: <span class="hljs-string">&#x27;window.fetch&#x27;</span>,
  },
});
</code></pre>
<p>وتساعد هذه البنية الاختبارات أيضًا. فـ<code>RuleTester</code> الحديث يريد <code>message</code> أو <code>messageId</code> صريحًا، وسيشتكي الآن إذا تُركت عناصر الاستبدال دون تعويض. وقد أصبحت الأداة أكثر تشددًا عن قصد، وهذا جيد. فالقواعد أسهل في الثقة عندما تكون الاختبارات أقل استعدادًا للتهاون.</p>
<h2 id="الإصلاحات-التلقائية-مقابل-الاقتراحات">الإصلاحات التلقائية مقابل الاقتراحات</h2>
<p>الإصلاحات التلقائية والاقتراحات ليسا الشيء نفسه، والفرق تخلط بينهما باستمرار. فـ<strong>الإصلاح التلقائي</strong> شيء قد يطبقه ESLint تلقائيًا عبر <code>--fix</code>. أما <strong>الاقتراح</strong> فهو إصلاح يظهر في المحرر أو يستدعيه المستخدم بوصفه مساعدًا اختياريًا. ويشترط ESLint ضبط <code>meta.fixable</code> للقواعد المُصلِحة تلقائيًا، و<code>meta.hasSuggestions</code> للقواعد التي تصدر اقتراحات. وإن حذفت هذين الحقلين وحاولت مع ذلك الإصلاح أو الاقتراح، رمى ESLint استثناءً.</p>
<p>وإرشادات ESLint نفسها لأفضل ممارسات الإصلاح صارمة لسبب وجيه: تجنّب الإصلاحات التي قد تغيّر سلوك وقت التشغيل، واجعل الإصلاحات أصغر ما يمكن، واقصرها على إصلاح مفهومي واحد لكل رسالة. فـESLint يعيد تشغيل القواعد بعد دورة الإصلاح، لذا لا تحتاج القاعدة إلى تلميع إصلاحها لتلبية كل قاعدة أخرى دفعة واحدة. ولهذا أيضًا ينبغي أن تكون إصلاحات الاقتراحات مركزة وألّا تحاول مطابقة تفضيلات أسلوب المستخدم. فالاقتراحات تغييرات قائمة بذاتها، لا مُنسّقات مصغرة.</p>
<p>وهذا يمنحك قاعدة قرار بسيطة: إذا كان التغيير آمنًا وميكانيكيًا بوضوح، فأصلحه تلقائيًا. وإذا كان التغيير قد يغيّر السلوك، أو يعتمد على القصد، أو له نتائج صحيحة متعددة، فاجعله اقتراحًا. وتذكر وثائق الاقتراحات في ESLint هذه الحالات بالضبط: الإصلاحات التي تغيّر السلوك، والحالات ذات الحلول الصحيحة المتعددة.</p>
<h2 id="الخيارات-والمخططات">الخيارات والمخططات</h2>
<p>القواعد التي تقبل خيارات تحتاج الآن إلى مخطط حقيقي. فقد جعل ESLint <a href="https://eslint.org/docs/latest/use/migrate-to-9.0.0">الإصدار 9</a> ذلك غير اختياري عمليًا: إذا مرّر المستخدمون خيارات إلى قاعدة بلا <code>meta.schema</code>، رمى ESLint استثناءً. والمخطط هو JSON Schema وتحديدًا Draft-04، ويتحقق ESLint من <em>مصفوفة الخيارات بعد درجة الخطورة</em>، لا من درجة الخطورة نفسها. وهذا يعني أن مخططك لا يرى <code>&quot;error&quot;</code> أو <code>&quot;warn&quot;</code> ولا يستطيع التحقق منهما.</p>
<p>وثمة نمطان للمخطط. فصيغة المصفوفة المختصرة تتحقق من <code>context.options</code> بحسب الموضع. أما صيغة JSON Schema الكاملة فتتحقق من مصفوفة الخيارات بأكملها وتلزم إذا أردت أشياء مثل <code>$ref</code> أو <code>oneOf</code> أو <code>anyOf</code> عبر بنية الخيارات كاملة. وتحذّر ESLint أيضًا من خطأ سهل: يجب أن يظل المخطط على المستوى الأعلى واصفًا مصفوفة خيارات لا كائنًا مجردًا، وإلا أصبحت القاعدة مستحيلة التمكين. وهذا نوع خاص من إحراز الهدف في مرماك الخاطئ.</p>
<p>يستحق <code>meta.defaultOptions</code> الاستخدام في أي قاعدة لها إعداد حقيقي. فـESLint يدمج تعاوديًا عناصر الخيارات التي قدمها المستخدم فوق الافتراضات، ويتحقق من النتيجة المدمجة مقابل المخطط، ثم يعرض تلك المصفوفة المدموجة على <code>context.options</code>. وهذا يتيح لمنطق قاعدتك معاملة الخيارات كأنها مُوحَّدة الوضع بالفعل.</p>
<p>نمط معقول:</p>
<pre><code class="language-javascript"><span class="hljs-attr">meta</span>: {
  <span class="hljs-attr">schema</span>: [
    {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;object&quot;</span>,
      <span class="hljs-attr">properties</span>: {
        <span class="hljs-attr">allowInTests</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;boolean&quot;</span> },
      },
      <span class="hljs-attr">additionalProperties</span>: <span class="hljs-literal">false</span>,
    },
  ],
  <span class="hljs-attr">defaultOptions</span>: [{ <span class="hljs-attr">allowInTests</span>: <span class="hljs-literal">true</span> }],
},
<span class="hljs-title function_">create</span>(<span class="hljs-params">context</span>) {
  <span class="hljs-keyword">const</span> [{ allowInTests }] = context.<span class="hljs-property">options</span>;
}
</code></pre>
<p>تنتمي تسوية الخيارات إلى البيانات الوصفية، لا إلى تلطيخ منطق الزوار بها.</p>
<h2 id="النطاق-والمتغيرات-ومسك-سجل-الاستخدام">النطاق والمتغيرات ومسك سجل «الاستخدام»</h2>
<p>إذا كانت قاعدتك بحاجة إلى الاستدلال على المعرّفات دلاليًا لا تركيبيًا، فواجهات نطاق <code>SourceCode</code> هي الأداة الصحيحة. وتوثّق ESLint <code>sourceCode.getScope(node)</code> للبحث عن النطاق، و<code>sourceCode.getDeclaredVariables(node)</code> لإعلانات المتغيرات، و<code>sourceCode.markVariableAsUsed(name, refNode)</code> للحالات التي ينبغي فيها لنمط الوصول المخصص لديك أن يفي بـ<code>no-unused-vars</code>. وهذه الواجهة الأخيرة مفيدة بشكل خاص للأطر أو الماكروات التي تشير إلى المتغيرات بشكل غير مباشر.</p>
<p>وهذا أيضًا فخ الترحيل الخاص بالإصدار 9 الذي يوقع القواعد القديمة. فما كان <code>context.getScope()</code> أصبح <code>sourceCode.getScope(node)</code>، وما كان <code>context.markVariableAsUsed(name)</code> أصبح <code>sourceCode.markVariableAsUsed(name, node)</code>. وإن كنت تحدّث قواعد داخلية، فأصلح هذين أولًا قبل أن تبدأ في شتم المحلل.</p>
<h2 id="اختبار-القواعد-بـruletester">اختبار القواعد بـ<code>RuleTester</code></h2>
<p>يجب أن يكون لكل قاعدة مخصصة اختبارات. لا لأن الاختبار فضيلة، بل لأن قواعد ESLint مُصرِّفات صغيرة لها من السطح ما يكفي بالضبط لتكون خاطئة بطرق خفية ومزعجة. ويوفر ESLint أداة <code>RuleTester</code>، وتسميها وثائق القواعد المخصصة صراحةً الطريقة المعيارية لاختبار القواعد. وفي عصر الإعداد المسطح، تكون افتراضات <code>RuleTester</code> هي <code>ecmaVersion: &quot;latest&quot;</code> و<code>sourceType: &quot;module&quot;</code> ما لم تتجاوزها.</p>
<p>وملف اختبار عادي يبدو الآن هكذا:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">RuleTester</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;eslint&#x27;</span>;
<span class="hljs-keyword">import</span> rule <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;../rules/no-window-fetch.js&#x27;</span>;

<span class="hljs-keyword">const</span> ruleTester = <span class="hljs-keyword">new</span> <span class="hljs-title class_">RuleTester</span>({
  <span class="hljs-attr">languageOptions</span>: {
    <span class="hljs-attr">ecmaVersion</span>: <span class="hljs-string">&#x27;latest&#x27;</span>,
    <span class="hljs-attr">sourceType</span>: <span class="hljs-string">&#x27;module&#x27;</span>,
  },
});

ruleTester.<span class="hljs-title function_">run</span>(<span class="hljs-string">&#x27;no-window-fetch&#x27;</span>, rule, {
  <span class="hljs-attr">valid</span>: [
    <span class="hljs-string">&quot;apiClient.fetch(&#x27;/users&#x27;)&quot;</span>,
    {
      <span class="hljs-attr">code</span>: <span class="hljs-string">&quot;window.fetch(&#x27;/users&#x27;)&quot;</span>,
      <span class="hljs-attr">options</span>: [{ <span class="hljs-attr">allowInTests</span>: <span class="hljs-literal">true</span> }],
      <span class="hljs-attr">filename</span>: <span class="hljs-string">&#x27;api.test.ts&#x27;</span>,
    },
  ],
  <span class="hljs-attr">invalid</span>: [
    {
      <span class="hljs-attr">code</span>: <span class="hljs-string">&quot;window.fetch(&#x27;/users&#x27;)&quot;</span>,
      <span class="hljs-attr">options</span>: [{ <span class="hljs-attr">allowInTests</span>: <span class="hljs-literal">false</span> }],
      <span class="hljs-attr">errors</span>: [
        {
          <span class="hljs-attr">messageId</span>: <span class="hljs-string">&#x27;avoidWindowFetch&#x27;</span>,
          <span class="hljs-attr">suggestions</span>: [
            {
              <span class="hljs-attr">messageId</span>: <span class="hljs-string">&#x27;replaceWithApiClient&#x27;</span>,
              <span class="hljs-attr">output</span>: <span class="hljs-string">&quot;apiClient.fetch(&#x27;/users&#x27;)&quot;</span>,
            },
          ],
        },
      ],
      <span class="hljs-attr">output</span>: <span class="hljs-literal">null</span>,
    },
  ],
});
</code></pre>
<p>هذه <code>output: null</code> تهم. ففي <code>RuleTester</code> الحديث، تعني <code>output</code> أن «هذه الحالة تتوقع إصلاحًا تلقائيًا». وإذا لم يكن هناك إصلاح تلقائي، فاحذف <code>output</code> أو اضبطها على <code>null</code>. ويشترط ESLint v9 الآن أيضًا أن تكون الاختبارات صريحة بشأن وجود اقتراحات، وتحتاج تأكيدات الاقتراحات إلى <code>output</code> وإلى <code>desc</code> أو <code>messageId</code>. لذا لم تعد العادة القديمة في كتابة حالات غير صالحة غامضة والأمل في أن تفعل القاعدة الصواب مقبولة بالقدر نفسه. خسارة للفوضى، حقًا.</p>
<h2 id="قواعد-خاصة-بـtypescript">قواعد خاصة بـTypeScript</h2>
<p>إذا كانت قاعدة شيفرتك ثقيلة بـTypeScript، فلا تزال كتابة قواعد ESLint العادية ممكنة، لكن الأدوات الموصى بها تتغير. فـ<a href="https://typescript-eslint.io/developers/custom-rules/">يوصي typescript-eslint</a> بـ<code>@typescript-eslint/utils</code> لكتابة القواعد، و<code>ESLintUtils.RuleCreator</code> لنماذج قواعد قوية الأنواع، و<code>@typescript-eslint/rule-tester</code> للاختبارات. والسبب بسيط: أنواع <code>eslint</code> العادية مبنية على ESTree العادي ولا تفهم العقد والخصائص الخاصة بـTypeScript فهمًا صحيحًا.</p>
<p>وتبدأ القاعدة المكتوبة بالأنواع عادة هكذا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ESLintUtils</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@typescript-eslint/utils&#x27;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> ts <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;typescript&#x27;</span>;

<span class="hljs-keyword">const</span> createRule = <span class="hljs-title class_">ESLintUtils</span>.<span class="hljs-title class_">RuleCreator</span>(<span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> <span class="hljs-string">\`https://internal.example.com/eslint/<span class="hljs-subst">\${name}</span>\`</span>);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">createRule</span>({
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;no-enum-for-of&#x27;</span>,
  <span class="hljs-attr">meta</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;problem&#x27;</span>,
    <span class="hljs-attr">docs</span>: {
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Disallow for...of over enums&#x27;</span>,
    },
    <span class="hljs-attr">schema</span>: [],
    <span class="hljs-attr">messages</span>: {
      <span class="hljs-attr">noEnum</span>: <span class="hljs-string">&#x27;Do not iterate over enums with for...of.&#x27;</span>,
    },
  },
  <span class="hljs-attr">defaultOptions</span>: [],
  <span class="hljs-title function_">create</span>(<span class="hljs-params">context</span>) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-title class_">ForOfStatement</span>(node) {
        <span class="hljs-keyword">const</span> services = <span class="hljs-title class_">ESLintUtils</span>.<span class="hljs-title function_">getParserServices</span>(context);
        <span class="hljs-keyword">const</span> <span class="hljs-keyword">type</span> = services.<span class="hljs-title function_">getTypeAtLocation</span>(node.<span class="hljs-property">right</span>);

        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span>.<span class="hljs-property">symbol</span> &amp;&amp; (<span class="hljs-keyword">type</span>.<span class="hljs-property">symbol</span>.<span class="hljs-property">flags</span> &amp; ts.<span class="hljs-property">SymbolFlags</span>.<span class="hljs-property">Enum</span>) !== <span class="hljs-number">0</span>) {
          context.<span class="hljs-title function_">report</span>({
            <span class="hljs-attr">node</span>: node.<span class="hljs-property">right</span>,
            <span class="hljs-attr">messageId</span>: <span class="hljs-string">&#x27;noEnum&#x27;</span>,
          });
        }
      },
    };
  },
});
</code></pre>
<p>هذا النمط مأخوذ مباشرة من نموذج typescript-eslint. فـ<code>getParserServices(context)</code> يمنحك الجسر من عقد ESLint إلى عقد TypeScript ومعلومات الأنواع، بما فيها أدوات مساعدة مثل <code>getTypeAtLocation()</code> و<code>getSymbolAtLocation()</code>. وإن احتجت إلى واجهة المصرّف الخام، فيمكنك أيضًا استخدام <code>services.program.getTypeChecker()</code>.</p>
<p>ويستحق تحذير التصميم من typescript-eslint الاتباع أيضًا: لا تغيّر سلوك القاعدة صامتًا بناءً على ما إذا كانت معلومات الأنواع متاحة أم لا. فهم يوصون صراحةً بعدم كتابة قواعد تفعل شيئًا مع <code>services.program</code> وشيئًا آخر بدونه. وإذا كانت القاعدة تتطلب معلومات الأنواع حقًا، فوثّق ذلك، أو قيّدها بخيار صريح، أو قسّمها إلى قاعدة أو إعداد منفصل. وإلا حصل المستخدمون على قاعدة فحص شاذة على طريقة شرودنغر تغيّر شخصيتها حسب حوادث الإعداد.</p>
<p>ولاختبار القواعد المكتوبة بالأنواع، استخدم <code>@typescript-eslint/rule-tester</code> ومكّن الوضع الواعي بالأنواع عبر <code>parserOptions.projectService</code>، مع <code>allowDefaultProject</code> عادةً لملفات الاختبار و<code>tsconfigRootDir</code>. وهذا هو المسار الموصى به حاليًا للاختبارات الواعية بالأنواع. ويدعم مختبر typescript-eslint أيضًا بعض التيسيرات خارج نواة ESLint، مثل صيغة المصفوفة لـ<code>output</code> في الإصلاحات متعددة الدورات، وقيود الاعتماد للاختبارات المشروطة بالإصدار.</p>
<h2 id="تحزيم-القواعد-في-إضافة">تحزيم القواعد في إضافة</h2>
<p><a href="https://eslint.org/docs/latest/extend/plugins">الإضافة</a> ليست سوى كائن. وتعرّف وثائق الإضافات في ESLint السطح الرئيسي بأنه <code>meta</code> و<code>configs</code> و<code>rules</code> و<code>processors</code>. وفي إضافات القواعد، الجزء الجوهري هو كائن <code>rules</code> الذي يعيّن أسماء القواعد إلى نماذج القواعد. وتوصي الوثائق أيضًا بكائن <code>meta</code> جذري فيه <code>name</code> و<code>version</code> و<code>namespace</code> لتسهيل التنقيح وجعل تخزين الإضافة مؤقتًا أكثر فعالية، وتلاحظ أن <code>meta.namespace</code> يساعد <code>defineConfig()</code> في العثور على إضافتك حتى لو أسند المستخدم إليها نطاق أسماء مختلفًا في الإعداد.</p>
<p>نقطة دخول نظيفة للإضافة:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> noWindowFetch <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./rules/no-window-fetch.js&#x27;</span>;

<span class="hljs-keyword">const</span> plugin = {
  <span class="hljs-attr">meta</span>: {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;eslint-plugin-acme&#x27;</span>,
    <span class="hljs-attr">version</span>: <span class="hljs-string">&#x27;0.1.0&#x27;</span>,
    <span class="hljs-attr">namespace</span>: <span class="hljs-string">&#x27;acme&#x27;</span>,
  },
  <span class="hljs-attr">rules</span>: {
    <span class="hljs-string">&#x27;no-window-fetch&#x27;</span>: noWindowFetch,
  },
  <span class="hljs-attr">configs</span>: {},
};

<span class="hljs-title class_">Object</span>.<span class="hljs-title function_">assign</span>(plugin.<span class="hljs-property">configs</span>, {
  <span class="hljs-attr">recommended</span>: [
    {
      <span class="hljs-attr">plugins</span>: {
        <span class="hljs-attr">acme</span>: plugin,
      },
      <span class="hljs-attr">rules</span>: {
        <span class="hljs-string">&#x27;acme/no-window-fetch&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
      },
    },
  ],
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> plugin;
</code></pre>
<p>هذا يتبع إرشاد الإضافات الحالي تمامًا: صدّر كائن إضافة، ثم علّق الإعدادات المشتركة على <code>plugin.configs</code>. وإذا احتجت إلى دعم الإعداد المسطح والإعداد القديم معًا، فتوصي ESLint بشحن الشكلين من كائن <code>configs</code> واستخدام أسماء مثل <code>legacy-recommended</code> أو <code>flat/recommended</code> لجعل التمييز واضحًا.</p>
<p>وبالنسبة إلى الإضافات الواعية بـTypeScript تحديدًا، <a href="https://typescript-eslint.io/developers/eslint-plugins/">يوصي typescript-eslint</a> بـ<code>@typescript-eslint/utils</code> كاعتماد وقت تشغيل، و<code>@typescript-eslint/rule-tester</code> كاعتماد تطوير، واعتمادات نظير على <code>eslint</code> و<code>typescript</code> و<code>@typescript-eslint/parser</code> وأي محلل آخر تتوقع أن يستخدمه المستهلكون. ويوصون أيضًا بإبقاء كل حزم <code>@typescript-eslint</code> على خط الدلالات الدقيقة (semver) نفسه.</p>
<h2 id="استخدام-القواعد-الداخلية-دون-نشر-أي-شيء">استخدام القواعد الداخلية دون نشر أي شيء</h2>
<p>بالنسبة إلى القواعد الخاصة بالشركة وحدها، يجعل الإعداد المسطح ذلك أجمل بكثير من رقصة <code>--rulesdir</code> القديمة. فـESLint يدعم تحميل كائن إضافة محلي من ملف، أو تعريف <a href="https://eslint.org/docs/latest/use/configure/plugins">إضافة افتراضية</a> مباشرة داخل <code>eslint.config.js</code>. وهذا يعني أنك تستطيع إبقاء القواعد المحلية في المستودع قريبة من قاعدة الشيفرة وربطها مباشرة دون اختراع حزمة npm فقط لإجبار فريق واحد على التوقف عن استخدام <code>window.fetch</code>.</p>
<p>أخف إعداد هو الإضافة الافتراضية:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// eslint.config.js</span>
<span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;eslint/config&#x27;</span>;
<span class="hljs-keyword">import</span> noWindowFetch <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./tools/eslint/rules/no-window-fetch.js&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>([
  {
    <span class="hljs-attr">plugins</span>: {
      <span class="hljs-attr">local</span>: {
        <span class="hljs-attr">rules</span>: {
          <span class="hljs-string">&#x27;no-window-fetch&#x27;</span>: noWindowFetch,
        },
      },
    },
    <span class="hljs-attr">rules</span>: {
      <span class="hljs-string">&#x27;local/no-window-fetch&#x27;</span>: <span class="hljs-string">&#x27;error&#x27;</span>,
    },
  },
]);
</code></pre>
<p>وتوثّق ESLint هذا مباشرة كنمط الإضافة الافتراضية. وهو أفضل نقطة انطلاق للقواعد الخاصة لأنه يبقي التغذية الراجعة سريعة والطقوس منخفضة. وانشر لاحقًا إن أصبحت القواعد قابلة لإعادة الاستخدام على نطاق واسع. فليست كل عادة داخلية تستحق أسطورتها الخاصة في سجل الحزم.</p>
<h2 id="الأداء-والتنقيح">الأداء والتنقيح</h2>
<p>تعمل القواعد المخصصة كثيرًا، لذا يهم الأداء. ولدى ESLint وضع توقيت مدمج: اضبط <code>TIMING=1</code> لترى أبطأ عشر قواعد، و<code>TIMING=all</code> لقائمة أطول، واجمعهما مع <code>--no-config-lookup --rule ...</code> عندما تريد عزل قاعدة واحدة. ويشير ESLint أيضًا إلى خيار <code>--stats</code> لتوقيت أدق لكل ملف وكل قاعدة. هذه هي الطريقة الرسمية للتوقف عن التخمين بشأن القاعدة البطيئة.</p>
<p>عمليًا، أكبر مكاسب الأداء مملة: استخدم زوارًا ضيقين بدلًا من عمل واسع على الشجرة كاملة. وفضّل مستمعات المحدِّدات عندما تتيح لـESLint إنجاز عمل المطابقة بدقة. وخزّن التعابير النمطية والإعداد لمرة واحدة خارج دوال العقد الساخنة. وتجنب مسحات النص الكامل أو التعليقات المتكررة عندما تكفي استعلامات محلية بالعقدة، خصوصًا وأن استعلامات التعليقات تُحسب عند الطلب. لا شيء من ذلك براق، لكن الانتظار ثلاث ثوانٍ إضافية في كل دورة فحص بسبب قاعدة تطمح أكثر من اللازم ليس براقًا أيضًا.</p>
<h2 id="التسمية-والتوثيق-وقابلية-الصيانة">التسمية والتوثيق وقابلية الصيانة</h2>
<p>لا تزال <a href="https://eslint.org/docs/latest/contribute/core-rules">اصطلاحات التسمية</a> في نواة ESLint افتراضًا جيدًا حتى للقواعد الخاصة: استخدم الشرطات، واستخدم <code>no-</code> للنواهي، واستخدم أسماء أمرية قصيرة للمتطلبات الإيجابية. فهذا يجعل حزمة القواعد تبدو مثل ESLint لا مثل لغة داخلية مخصصة عشوائية. وأدرج <code>docs.url</code> كلما استطعت، لأن المحررات تستخدمه لإظهار روابط مفيدة عند المخالفات.</p>
<p>وثمت قاعدتان لقابلية الصيانة تهمان أكثر من الباقي. الأولى: لا تبنِ فوق تنفيذات قواعد نواة ESLint. فـESLint يحذّر صراحةً من أن قواعد النواة ليست واجهة عامة وليست مصممة للتمديد. وإن احتجت إلى «القاعدة نفسها لكن باختلاف بسيط»، فانسخ الملف وتملّك نسختك. والثانية: لا تترك الخيارات بلا أنواع ولا توثيق. فـ<code>meta.schema</code> و<code>meta.defaultOptions</code> والاختبارات وصفحة توثيق حقيقية ليست عملًا شكليًا، بل هي ما يحوّل القاعدة من حيلة بارعة إلى بنية تحتية.</p>
<p>وبالنسبة إلى الإضافات الواعية بـTypeScript، يستحق تقسيم الإعدادات بوضوح أيضًا. فيوصي typescript-eslint إما بجعل <code>recommended</code> يشترط معلومات الأنواع وإما بنشر إعداد منفصل مثل <code>recommendedTypeChecked</code>، وينصحون بتوثيق هذه الاستراتيجية صراحةً. فهذا يمنع المستخدمين من تمكين مجموعة قواعدك ثم اكتشاف أن نصفها لا يعمل إلا عندما تُعدّ خدمة المشروع تعديلًا صحيحًا.</p>
<h2 id="متى-تكون-القاعدة-نقطة-تمديد-خاطئة">متى تكون القاعدة نقطة تمديد خاطئة</h2>
<p>ليست كل حاجة إلى فحص قاعدة. فـ<a href="https://eslint.org/docs/latest/use/configure/plugins">الإضافات</a> يمكنها أيضًا تصدير معالجات ولغات. والمعالجات هي ما تريده عندما يلزم استخلاص JavaScript من نوع ملف آخر، مثل كتل شيفرة Markdown. أما اللغات فهي نقطة التمديد الأحدث لفحص لغات غير JavaScript عبر الإضافات. وإذا كانت مشكلتك الحقيقية «افحص شيفرة داخل Markdown» أو «افحص JSON كلغة من الدرجة الأولى»، فليست هذه مشكلة قاعدة مخصصة، بل مشكلة معالج أو لغة.</p>
<p>وبالمثل، إذا كانت الصياغة نفسها JavaScript غير معيارية، فذلك عادة <a href="https://eslint.org/docs/latest/extend/custom-parsers">شأن محلل</a> لا شأن قاعدة. فالقواعد تفحص الشجرة التي تُعطاها، وليست مسؤولة عن اختراع شجرة لصياغة لا يفهمها المحلل.</p>
<h2 id="النهج-الافتراضي-الذي-سأستخدمه">النهج الافتراضي الذي سأستخدمه</h2>
<p>بالنسبة إلى قاعدة شيفرة داخلية، المسار المعقول ممل جدًا. ابدأ بالتحقق مما إذا كانت المحدِّدات و<code>no-restricted-syntax</code> كافيتين. وإن لم تكونا، اكتب قاعدة محلية كإضافة افتراضية في <code>eslint.config.js</code>. واستخدم القواعد بأسلوب الكائنات فقط. وضع كل الرسائل في <code>meta.messages</code>. وأضف <code>schema</code> و<code>defaultOptions</code> حقيقيين لكل ما هو قابل للإعداد. وفضّل الاقتراحات على الإصلاحات التلقائية حتى يصبح التغيير آمنًا بوضوح. واختبر كل قاعدة بـ<code>RuleTester</code>، بما في ذلك «لا إصلاح تلقائي» والاقتراحات والحالات الحدّية. ثم لا ترقِّها إلى إضافة منشورة بإعدادات مسماة إلا عندما تصبح مجموعة القواعد قابلة لإعادة الاستخدام عبر المستودعات فعلًا.</p>
<p>هذه هي اللعبة كلها. فكتابة قواعد ESLint ليست صعبة، لكنها سهلة الإنجاز برخاوة، والبنية التحتية الرخوة للفحص تملك موهبة خاصة في إغاظة كل مهندسي الشركة دفعة واحدة.</p>
<hr>
<h2 id="الخلاصة-السريعة-tldr">الخلاصة السريعة (TL;DR)</h2>
<h3 id="متى-تكتب-قاعدة-مخصصة">متى تكتب قاعدة مخصصة</h3>
<blockquote>
<p>شجرة القرار.</p>
</blockquote>
<ul>
<li>هل تستطيع حلّها بقاعدة أو إضافة قائمة؟ → استخدمها.</li>
<li>هل هي عُرف خاص بـ<em>قاعدة شيفرتك</em> أنت؟ → اكتب قاعدة مخصصة.</li>
<li>هل تفرض حدًا معماريًا؟ → اكتب قاعدة بلا تردد.</li>
</ul>
<p><strong>أمثلة على قواعد مخصصة تستحق الكتابة:</strong></p>
<ul>
<li>لا استيرادات مباشرة من الحزم الداخلية لفريق آخر</li>
<li>فرض اصطلاحات تسمية الأحداث عبر الواجهات المصغّرة</li>
<li>اشتراط حدود الأخطاء حول الاستيرادات البعيدة الموحدة</li>
<li>حظر أنماط API معينة تسبب مشكلات في الإنتاج</li>
</ul>
<hr>
<h3 id="تشريح-القاعدة">تشريح القاعدة</h3>
<blockquote>
<p>كل قاعدة ESLint زائر لشجرة AST.</p>
</blockquote>
<pre><code class="language-javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">meta</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;problem&#x27;</span>, <span class="hljs-comment">// &#x27;problem&#x27; | &#x27;suggestion&#x27; | &#x27;layout&#x27;</span>
    <span class="hljs-attr">docs</span>: { <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;...&#x27;</span> },
    <span class="hljs-attr">schema</span>: [], <span class="hljs-comment">// options the rule accepts</span>
    <span class="hljs-attr">fixable</span>: <span class="hljs-string">&#x27;code&#x27;</span>, <span class="hljs-comment">// can auto-fix? &#x27;code&#x27; | &#x27;whitespace&#x27; | null</span>
  },
  <span class="hljs-title function_">create</span>(<span class="hljs-params">context</span>) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-title class_">ImportDeclaration</span>(node) {
        <span class="hljs-comment">// Runs every time the parser encounters an import statement</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-title function_">isForbiddenImport</span>(node.<span class="hljs-property">source</span>.<span class="hljs-property">value</span>)) {
          context.<span class="hljs-title function_">report</span>({
            node,
            <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Do not import from {{source}}&#x27;</span>,
            <span class="hljs-attr">data</span>: { <span class="hljs-attr">source</span>: node.<span class="hljs-property">source</span>.<span class="hljs-property">value</span> },
          });
        }
      },
    };
  },
};
</code></pre>
<hr>
<h3 id="نمط-زائر-شجرة-ast">نمط زائر شجرة AST</h3>
<blockquote>
<p>تعلن أنواع العقد التي تهمك، ويمشي ESLint في الشجرة.</p>
</blockquote>
<pre><code>Program
├── ImportDeclaration          ← &quot;import X from 'Y'&quot;
│   ├── ImportDefaultSpecifier ← &quot;X&quot;
│   └── Literal                ← &quot;'Y'&quot;
├── FunctionDeclaration        ← &quot;function foo() {}&quot;
│   └── BlockStatement
│       └── ReturnStatement
└── ExportDefaultDeclaration   ← &quot;export default ...&quot;
</code></pre>
<ul>
<li>استخدم <a href="https://astexplorer.net/">AST Explorer</a> لترى العقد التي تنتجها شيفرتك.</li>
<li>تطابق مفاتيح الزوار أسماء أنواع العقد: <code>ImportDeclaration</code> و<code>CallExpression</code> و<code>MemberExpression</code>.</li>
<li>يمكنك أيضًا استخدام محددات شبيهة بـCSS: <code>CallExpression[callee.name=&quot;require&quot;]</code>.</li>
</ul>
<hr>
<h3 id="اختبار-القواعد-بـruletester">اختبار القواعد بـRuleTester</h3>
<blockquote>
<p>القواعد دوال نقية. فاختبرها كدوال نقية.</p>
</blockquote>
<pre><code class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">RuleTester</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;eslint&#x27;</span>);
<span class="hljs-keyword">const</span> rule = <span class="hljs-built_in">require</span>(<span class="hljs-string">&#x27;./no-cross-team-imports&#x27;</span>);

<span class="hljs-keyword">const</span> ruleTester = <span class="hljs-keyword">new</span> <span class="hljs-title class_">RuleTester</span>();

ruleTester.<span class="hljs-title function_">run</span>(<span class="hljs-string">&#x27;no-cross-team-imports&#x27;</span>, rule, {
  <span class="hljs-attr">valid</span>: [<span class="hljs-string">\`import { Button } from &#x27;@design-system/ui&#x27;\`</span>, <span class="hljs-string">\`import { utils } from &#x27;./local-utils&#x27;\`</span>],
  <span class="hljs-attr">invalid</span>: [
    {
      <span class="hljs-attr">code</span>: <span class="hljs-string">\`import { internal } from &#x27;@team-checkout/internals&#x27;\`</span>,
      <span class="hljs-attr">errors</span>: [{ <span class="hljs-attr">message</span>: <span class="hljs-regexp">/Do not import from/</span> }],
    },
  ],
});
</code></pre>
<ul>
<li>يجب ألّا تبلغ كل حالة صالحة عن شيء. ويجب أن تبلغ كل حالة غير صالحة بالأخطاء المتوقعة بالضبط.</li>
<li>اختبر الحالات الحدّية: إعادات التصدير، والاستيرادات الديناميكية، والاستيرادات الخاصة بالأنواع فقط.</li>
</ul>
`,p={book:s,chapter:e,chapterTitle:n,slug:a,title:t,headings:o,html:c};export{s as book,e as chapter,n as chapterTitle,p as default,o as headings,c as html,a as slug,t as title};
