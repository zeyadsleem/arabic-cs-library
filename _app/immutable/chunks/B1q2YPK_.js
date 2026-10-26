const e="kinney",o="tailwind",d="Tailwind CSS",n="screen-reader-support",t="دعم قارئات الشاشة",c=[{depth:3,id:"أداة-sr-only",text:"أداة sr-only"},{depth:2,id:"مؤشرات-التركيز",text:"مؤشرات التركيز"},{depth:3,id:"أدوات-المحيط",text:"أدوات المحيط"},{depth:3,id:"outline-hidden-مقابل-outline-none",text:"outline-hidden مقابل outline-none"},{depth:3,id:"تحديد-النص-وقابلية-القراءة",text:"تحديد النص وقابلية القراءة"},{depth:3,id:"الوصولية-للقوائم-في-preflight",text:"الوصولية للقوائم في Preflight"}],i=`<p>للعناصر التي يلزم وجودها لقارئات الشاشة مع إخفاءها بصريًا، توفّر Tailwind أدوات محدّدة.</p>
<h3 id="أداة-sr-only">أداة <code>sr-only</code></h3>
<p>تُزيح أداة <code>sr-only</code> العناصر خارج الشاشة مع إبقائها في متناول التقنيات المساعدة. استخدمها للتسميات أو النصوص الوصفية التي توفّر سياقًا لمستخدمي قارئات الشاشة ولا يحتاجها المستخدمون ذوو البصر. وتعكس أداة <code>not-sr-only</code> ذلك، فتعيد العناصر إلى الظهور.</p>
<h2 id="مؤشرات-التركيز">مؤشرات التركيز</h2>
<p>التنسيق السليم للتركيز ضروري للتنقل بلوحة المفاتيح، إذ يوضّح العنصر القابل للتفاعل حاليًا.</p>
<h3 id="أدوات-المحيط">أدوات المحيط</h3>
<p>تقدّم المتصفحات محيطات افتراضية للعناصر التي تحوز على التركيز، لكنك غالبًا ما تحتاج إلى تنسيق مخصّص. توفّر Tailwind أدوات مثل <code>outline-2</code> و<code>outline-blue-500</code> لضبط سماكة المحيط ولونه. طبّقها باستخدام صيغة <code>focus:</code>.</p>
<h3 id="outline-hidden-مقابل-outline-none"><code>outline-hidden</code> مقابل <code>outline-none</code></h3>
<p>إذا أخفتَ محيط المتصفح الافتراضي، فطبّق تنسيق تركيزك الخاص لأغراض الوصولية. تُخفي أداة <code>outline-hidden</code> المحيط الافتراضي مع الحفاظ عليه في وضع الألوان القسرية. أمّا أداة <code>outline-none</code> فتضبط <code>outline-style: none</code> صراحةً، فتزيل المحيط تمامًا.</p>
<h3 id="تحديد-النص-وقابلية-القراءة">تحديد النص وقابلية القراءة</h3>
<p>أدوات تحديد النص (<code>user-select-none</code> و<code>select-text</code> و<code>select-all</code> و<code>select-auto</code>) تؤثر في تفاعل المستخدم. وأدوات لفّ النص مثل <code>text-balance</code> (توزّع النص بالتساوي في العناوين) و<code>text-pretty</code> (تمنع الكلمات اليتيمة) تحسّن قابلية القراءة. وأدوات تنعيم الخطوط (<code>antialiased</code> و<code>subpixel-antialiased</code>) تؤثر في تصيير النص.</p>
<h3 id="الوصولية-للقوائم-في-preflight">الوصولية للقوائم في Preflight</h3>
<p>تزيل أنماط Preflight الأساسية في Tailwind النقاط أو الأرقام من القوائم افتراضيًا. أما المحتوى غير المسنَّد الذي هو قائمة بالفعل، فأضِف إليه <code>role=&quot;list&quot;</code> من أجل وصولية VoiceOver، إذ لا تُعلَن القوائم غير المسنَّد بوصفها قوائم افتراضيًا.</p>
`,l={book:e,chapter:o,chapterTitle:d,slug:n,title:t,headings:c,html:i};export{e as book,o as chapter,d as chapterTitle,l as default,c as headings,i as html,n as slug,t as title};
