const s="database-foundations",a="sql-tennis",n="SQL Exercises on tennis club database",p="index",e="تمارين SQL على قاعدة بيانات نادي التنس",l=[{depth:2,id:"قاعدة-بيانات-التنس",text:"قاعدة بيانات التنس"},{depth:3,id:"النموذج-الفيزيائي-العلائقي",text:"النموذج الفيزيائي العلائقي"},{depth:3,id:"معلومات-مهمة-عن-الناديقاعدة-البيانات",text:"معلومات مهمة عن النادي/قاعدة البيانات"},{depth:3,id:"جمل-create",text:"جمل CREATE"},{depth:3,id:"بعض-النقاط-المثيرة-للاهتمام",text:"بعض النقاط المثيرة للاهتمام"},{depth:2,id:"تمارين-بسيطة",text:"تمارين بسيطة"},{depth:2,id:"الغرامات",text:"الغرامات"},{depth:2,id:"المباريات-واللاعبون-والقادة",text:"المباريات واللاعبون والقادة..."},{depth:2,id:"تمارين-أصعب",text:"تمارين أصعب"}],r=`<blockquote>
<p>الخبرة ميزة كبيرة. المشكلة أنها عندما تكتسب الخبرة تكون قد شِخت جدًا لتفعل شيئًا حيالها. —Jimmy Connors</p>
</blockquote>
<p>ننتقل إلى مخطط أكبر فيه خمسة جداول مترابطة. وهذا المخطط أساس كتاب &quot;The SQL Textbook&quot;، الطبعة السابعة، Rick van der Lans، Academic Service.</p>
<h2 id="قاعدة-بيانات-التنس">قاعدة بيانات التنس</h2>
<h3 id="النموذج-الفيزيائي-العلائقي">النموذج الفيزيائي العلائقي</h3>
<p>يوضح الشكل أدناه مخطط الكيانات والعلاقات (ERD) لهذا المخطط. ادرس هذا المخطط بتمعّن واقرأ التفسيرات في الأقسام التالية بعناية. وتتبع ذلك تمارين كثيرة على هذا المخطط.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-0-tennis.webp" alt=""></p>
<h3 id="معلومات-مهمة-عن-الناديقاعدة-البيانات">معلومات مهمة عن النادي/قاعدة البيانات</h3>
<p>تأسّس نادي التنس في عام 1970، ومنذ البداية خُزّن عدد من السجلات الإدارية في قاعدة بيانات. وتتكوّن قاعدة البيانات هذه من الجداول التالية: players وteams وmatches وfines وboard members.</p>
<p>ويحتوي جدول اللاعبين على بيانات عن <em>اللاعبين</em> الأعضاء في نادي التنس، مثل الأسماء والعناوين وتواريخ الميلاد. ويجري الانضمام إلى الجمعية دائمًا في 1 يناير من سنة معينة. وبالتالي لا يمكن للاعبين أن يصبحوا أعضاء في منتصف السنة. ولا يحتوي جدول اللاعبين على بيانات تاريخية. فإذا ألغى اللاعب عضويته اختفى من الجدول. وكذلك عندما ينتقل اللاعب إلى عنوان آخر، يُستبدل العنوان القديم بالعنوان الجديد، فلا يُخزَّن العنوان القديم في أي مكان.</p>
<p>ولنادي التنس نوعان من الأعضاء: لاعبون ترفيهيون ولاعبون في المنافسات. والمجموعة الأولى تلعب مباريات فيما بينها فقط، فلا مباريات ضد لاعبي أندية أخرى. ولا تُسجَّل نتائج هذه المباريات المتبادلة. أما لاعبو المنافسات فيلعبون في فرق ضد لاعبي أندية أخرى. وتُتبَّع نتائج هذه المباريات. ولكل لاعب رقم فريد، سواء كان لاعب منافسات أم لا.</p>
<p>ويمنح الاتحاد، وهو مؤسسة وطنية، كل لاعب منافس رقمًا فريدًا. ويتكوّن رقم الاتحاد هذا عادةً من أرقام، لكنه قد يحتوي حروفًا أيضًا. وإذا لم يعد لاعب المنافسات يلعب مباريات وأصبح لاعبًا ترفيهيًا، انتهت صلاحية رقم الاتحاد. ولاحظ أن اللاعبين الترفيهيين ليس لديهم رقم اتحاد، لكن لديهم رقم لاعب.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-1-tennisclub.webp" alt=""></p>
<p>ولنادي التنس عدد من <em>الفرق</em> التي تتنافس في الدوريات. ولكل فريق يُسجَّل القائد والقسم الذي يتنافس فيه الفريق حاليًا. ولا يلزم أن يكون القائد قد لعب للفريق. وقد يكون لاعب معين في وقت ما قائدًا لفريقين أو أكثر. ولا يُحتفظ في هذا الجدول بتاريخ أيضًا. فعندما يُرقَّى فريق أو يُهبط إلى قسم آخر، يُستبدل القسم المسجَّل ببساطة. وينطبق الأمر نفسه على قائد الفريق: فعند التغيير يُستبدل رقم القائد القديم.</p>
<p>ويتكوّن الفريق من عدد من اللاعبين. وإذا لعب فريق ضد فريق من جمعية أخرى، يلعب كل لاعب في ذلك الفريق مباراة ضد لاعب من الفريق الآخر (ونفترض للتبسيط أن المباريات التي يلعب فيها ثنائيات بعضها ضد بعض لا تحدث). والفريق الذي يفوز لاعبوه بأكبر عدد من المباريات هو الفائز.</p>
<p>ولا يتكوّن الفريق دائمًا من المجموعة نفسها من اللاعبين. وفي حالة المرض أو العطلات، يلزم أحيانًا بدلاء. لذا يمكن أن يكون اللاعب جزءًا من عدة فرق. وعندما نتحدث عن &quot;لاعبي فريق&quot;، يعني ذلك &quot;اللاعبين الذين لعبوا مباراة واحدة على الأقل للفريق&quot;. ومرة أخرى، لا يجوز أن يلعب المباريات الرسمية إلا اللاعبون الذين لديهم رقم اتحاد.</p>
<p>وتتكوّن مباراة التنس من عدد من المجموعات. ومن يفوز بأكبر عدد من المجموعات هو الفائز. ولكل مباراة يُحدَّد مسبقًا عدد المجموعات التي تُحسم بها المباراة. وبشكل عام تتوقف المباراة عندما يفوز أحد اللاعبين بمجموعتين أو ثلاث. ومن ثمّ فإن النتائج النهائية الممكنة لمباراة تنس هي 2-1 أو 2-0 إذا لعبت حتى يفوز أحد اللاعبين بمجموعتين (أفضل من ثلاث)، أو 3-2 أو 3-1 أو 3-0 إذا لعبت حتى الفوز بثلاث مجموعات (أفضل من خمس). ويمكن للاعب أن يفوز بمباراته أو يخسر، ولا يمكن التعادل. ويُسجّل جدول المباريات كل لاعب لعب المباراة ولأي فريق. ويسجّل أيضًا عدد المجموعات التي فاز بها اللاعب وخسرها. ومن ذلك يمكننا استنتاج ما إذا كان قد فاز بالمباراة.</p>
<p>وبسبب سوء سلوك اللاعبين (التأخر أو السلوك العدواني أو عدم الحضور)، يفرض الاتحاد غرامات. ويدفع نادي التنس الغرامات. وبمجرد دفعها، يُسجَّل المبلغ والتاريخ في جدول الغرامات. وما دام اللاعب يلعب مباريات، تُحفظ جميع الغرامات في ملفه.</p>
<p>وعندما يترك لاعب النادي، تُدمَّر جميع بياناته في الجداول الخمسة. وإذا سحب النادي فريقًا، تُحذف جميع بيانات ذلك الفريق من جدولي الفرق والمباريات. وإذا توقف لاعب المباريات عن لعب المباريات وأصبح لاعبًا ترفيهيًا من جديد، تُحذف جميع بيانات المباريات والغرامات من الجدولين المعنيين.</p>
<p>ومنذ 1 يناير 1990، يتتبّع جدول عضوية المجلس من هم في المجلس. وتُميَّز أربعة مناصب: الرئيس وأمين الصندوق والأمين والعضو العام. ويُنتخب مجلس جديد كل عام في 1 يناير. وعندما يشغل لاعب منصبًا في المجلس، يُسجَّل تاريخا بداية هذا المنصب ونهايته. وإذا كان شخص ما لا يزال نشطًا، فلا يُدخل تاريخ نهاية.</p>
<h3 id="جمل-create">جمل CREATE</h3>
<p>لا يلزمك بناء هذا المخطط بنفسك. <em>ويمكن الوصول إليه عبر اتصال التجميع، قاعدة البيانات df، المخطط &quot;tennis_en&quot;.</em></p>
<p>وفيما يلي نقدّم شيفرة SQL التي استخدمناها لإنشاء الجداول الخمسة. <em>ونتوقع أنك تفهم جميع الأسطر في هذه الشيفرة.</em> فقيود <code>CHECK</code> (<code>CONSTRAINTS</code>) جديدة، لكن من المفترض ألا يكون فكّ رموزها بهذه الصعوبة. ومن المهم حقًا دراسة المخطط بعناية.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE  TABLE</span> tennis_en.players (
  player_number         <span class="hljs-type">integer</span>  <span class="hljs-keyword">NOT NULL</span> ,
  name                  <span class="hljs-type">char</span>(<span class="hljs-number">15</span>)  <span class="hljs-keyword">NOT NULL</span> ,
  initials              <span class="hljs-type">char</span>(<span class="hljs-number">3</span>)  <span class="hljs-keyword">NOT NULL</span> ,
  birth_date            <span class="hljs-type">date</span>   ,
  sex                   <span class="hljs-type">char</span>(<span class="hljs-number">1</span>)  <span class="hljs-keyword">NOT NULL</span> ,
  year_of_entry         <span class="hljs-type">smallint</span>  <span class="hljs-keyword">NOT NULL</span> ,
  street                <span class="hljs-type">varchar</span>(<span class="hljs-number">30</span>)  <span class="hljs-keyword">NOT NULL</span> ,
  house_number          <span class="hljs-type">char</span>(<span class="hljs-number">4</span>)   ,
  postal_code           <span class="hljs-type">char</span>(<span class="hljs-number">6</span>)   ,
  municipality          <span class="hljs-type">varchar</span>(<span class="hljs-number">30</span>)  <span class="hljs-keyword">NOT NULL</span> ,
  telephone             <span class="hljs-type">char</span>(<span class="hljs-number">13</span>)   ,
  association_number    <span class="hljs-type">char</span>(<span class="hljs-number">4</span>)   ,
  <span class="hljs-keyword">CONSTRAINT</span> players_pkey <span class="hljs-keyword">PRIMARY KEY</span> ( player_number ) ,
  <span class="hljs-keyword">CONSTRAINT</span> players_postal_code_check <span class="hljs-keyword">CHECK</span> ( (postal_code <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;______&#x27;</span> ) ) ,
  <span class="hljs-keyword">CONSTRAINT</span> players_year_of_entry_check <span class="hljs-keyword">CHECK</span> ( (year_of_entry <span class="hljs-operator">&gt;</span> <span class="hljs-number">1969</span>) ) ,
  <span class="hljs-keyword">CONSTRAINT</span> players_sex_check <span class="hljs-keyword">CHECK</span> ( (sex <span class="hljs-keyword">IN</span> (<span class="hljs-string">&#x27;M&#x27;</span>, <span class="hljs-string">&#x27;F&#x27;</span>)) )
);

<span class="hljs-keyword">CREATE  TABLE</span> tennis_en.teams (
  team_number           <span class="hljs-type">integer</span>  <span class="hljs-keyword">NOT NULL</span> ,
  player_number         <span class="hljs-type">integer</span>  <span class="hljs-keyword">NOT NULL</span> ,
  division              <span class="hljs-type">char</span>(<span class="hljs-number">6</span>)  <span class="hljs-keyword">NOT NULL</span> ,
  <span class="hljs-keyword">CONSTRAINT</span> teams_pkey <span class="hljs-keyword">PRIMARY KEY</span> ( team_number ) ,
  <span class="hljs-keyword">CONSTRAINT</span> teams_player_number_fkey <span class="hljs-keyword">FOREIGN KEY</span> ( player_number ) <span class="hljs-keyword">REFERENCES</span> tennis_en.players( player_number ) ,
  <span class="hljs-keyword">CONSTRAINT</span> teams_division_check <span class="hljs-keyword">CHECK</span> ( (division <span class="hljs-keyword">IN</span> (<span class="hljs-string">&#x27;first&#x27;</span>, <span class="hljs-string">&#x27;second&#x27;</span>)) )
);

<span class="hljs-keyword">CREATE  TABLE</span> tennis_en.matches(
  <span class="hljs-keyword">match_number</span>          <span class="hljs-type">integer</span>  <span class="hljs-keyword">NOT NULL</span> ,
  team_number           <span class="hljs-type">integer</span>  <span class="hljs-keyword">NOT NULL</span> ,
  player_number         <span class="hljs-type">integer</span>  <span class="hljs-keyword">NOT NULL</span> ,
  won                   <span class="hljs-type">smallint</span>  <span class="hljs-keyword">NOT NULL</span> ,
  lost                  <span class="hljs-type">smallint</span>  <span class="hljs-keyword">NOT NULL</span> ,
  <span class="hljs-keyword">CONSTRAINT</span> matches_pkey <span class="hljs-keyword">PRIMARY KEY</span> ( <span class="hljs-keyword">match_number</span> ),
  <span class="hljs-keyword">CONSTRAINT</span> matches_player_number_fkey <span class="hljs-keyword">FOREIGN KEY</span> ( player_number ) <span class="hljs-keyword">REFERENCES</span>
       tennis_en.players( player_number )   ,
  <span class="hljs-keyword">CONSTRAINT</span> matches_team_number_fkey <span class="hljs-keyword">FOREIGN KEY</span> ( team_number ) <span class="hljs-keyword">REFERENCES</span> tennis_en.teams( team_number )  ,
  <span class="hljs-keyword">CONSTRAINT</span> matches_lost_check <span class="hljs-keyword">CHECK</span> ( ((lost <span class="hljs-operator">&gt;=</span> <span class="hljs-number">0</span>) <span class="hljs-keyword">AND</span> (lost <span class="hljs-operator">&lt;=</span> <span class="hljs-number">3</span>)) ) ,
  <span class="hljs-keyword">CONSTRAINT</span> matches_won_check <span class="hljs-keyword">CHECK</span> ( ((won <span class="hljs-operator">&gt;=</span> <span class="hljs-number">0</span>) <span class="hljs-keyword">AND</span> (won <span class="hljs-operator">&lt;=</span> <span class="hljs-number">3</span>)) )
);

<span class="hljs-keyword">CREATE  TABLE</span> tennis_en.board_members(
  player_number         <span class="hljs-type">integer</span>  <span class="hljs-keyword">NOT NULL</span> ,
  start_date            <span class="hljs-type">date</span>  <span class="hljs-keyword">NOT NULL</span> ,
  end_date              <span class="hljs-type">date</span>   ,
  <span class="hljs-keyword">function</span>              <span class="hljs-type">char</span>(<span class="hljs-number">20</span>)   ,
  <span class="hljs-keyword">CONSTRAINT</span> board_members_pkey <span class="hljs-keyword">PRIMARY KEY</span> ( player_number, start_date ),
  <span class="hljs-keyword">CONSTRAINT</span> board_members_player_number_fkey <span class="hljs-keyword">FOREIGN KEY</span> ( player_number ) <span class="hljs-keyword">REFERENCES</span>
      tennis_en.players( player_number ) ,
  <span class="hljs-keyword">CONSTRAINT</span> board_members_check <span class="hljs-keyword">CHECK</span> ( (start_date <span class="hljs-operator">&lt;</span> end_date) ) ,
  <span class="hljs-keyword">CONSTRAINT</span> board_members_start_date_check <span class="hljs-keyword">CHECK</span> ( (start_date <span class="hljs-operator">&gt;=</span> <span class="hljs-string">&#x27;1990-01-01&#x27;</span>::<span class="hljs-type">date</span>) )
);

<span class="hljs-keyword">CREATE  TABLE</span> tennis_en.fines (
  payment_number        <span class="hljs-type">integer</span>  <span class="hljs-keyword">NOT NULL</span> ,
  player_number         <span class="hljs-type">integer</span>  <span class="hljs-keyword">NOT NULL</span> ,
  <span class="hljs-type">date</span>                  <span class="hljs-type">date</span>  <span class="hljs-keyword">NOT NULL</span> ,
  amount                <span class="hljs-type">numeric</span>(<span class="hljs-number">7</span>,<span class="hljs-number">2</span>)  <span class="hljs-keyword">NOT NULL</span> ,
  <span class="hljs-keyword">CONSTRAINT</span> fines_pkey <span class="hljs-keyword">PRIMARY KEY</span> ( payment_number ),
  <span class="hljs-keyword">CONSTRAINT</span> fines_player_number_fkey <span class="hljs-keyword">FOREIGN KEY</span> ( player_number ) <span class="hljs-keyword">REFERENCES</span>	tennis_en.players( player_number ) ,
  <span class="hljs-keyword">CONSTRAINT</span> fines_date_check <span class="hljs-keyword">CHECK</span> ( (<span class="hljs-type">date</span> <span class="hljs-operator">&gt;=</span> <span class="hljs-string">&#x27;1969-12-31&#x27;</span>::<span class="hljs-type">date</span>) ) ,
  <span class="hljs-keyword">CONSTRAINT</span> fines_amount_check <span class="hljs-keyword">CHECK</span> ( (amount <span class="hljs-operator">&gt;</span> (<span class="hljs-number">0</span>)::<span class="hljs-type">numeric</span>) )
);
</code></pre>
<h3 id="بعض-النقاط-المثيرة-للاهتمام">بعض النقاط المثيرة للاهتمام</h3>
<p>في مخطط الكيانات والعلاقات (وفي شيفرة <code>CREATE</code>) نريد فقط الإشارة إلى بضعة أمور:</p>
<ul>
<li>لاحظ أن &quot;رقم اللاعب&quot; له دور محوري في المخطط. فهو المفتاح الأساسي في جدول واحد، والمفتاح الأجنبي في الجداول الأربعة الأخرى.</li>
<li>وجاء جدول أعضاء المجلس بمفتاح أساسي مركّب. ويمكنك رؤية ذلك في الشكل عبر رمزَي المفتاح، وفي الشيفرة يوجد عمودان في <code>PRIMARY KEY</code>.</li>
<li>ومن الأخطاء الشائعة عدم أخذ حقيقة <em>أن رقم اللاعب في جدول الفرق هو رقم قائد ذلك الفريق</em> في الاعتبار. ولمعرفة من لعب المباريات فعليًا، عليك النظر في جدول <em>matches</em> واستخدام رقم اللاعب.</li>
</ul>
<div class="exercises"><h2 id="تمارين-بسيطة">تمارين بسيطة</h2>
<p>نبدأ ببعض التمارين البسيطة المصمّمة أساسًا للتعرّف على هذا المخطط قليلًا. وكالعادة: أنجزها بنفسك ولا تنظر إلى الحل إلا بعد ذلك.</p>
<p>اعرض جميع اللاعبين من Zoetermeer الذين انضموا إلى النادي قبل 1984. ويجب أن تحصل على محتويات الأعمدة وترويساتها في الشكل.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-2-oef1_4.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> player_number, name <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; &#x27;</span> <span class="hljs-operator">||</span> initials <span class="hljs-keyword">AS</span> name, year_of_entry
<span class="hljs-keyword">FROM</span> players
<span class="hljs-keyword">WHERE</span> municipality <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Zoetermeer&#x27;</span> <span class="hljs-keyword">AND</span> year_of_entry <span class="hljs-operator">&lt;</span> <span class="hljs-number">1984</span>;
</code></pre>
<p>اسرد جميع الفرق التي رقم اللاعب 27 قائدها.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-3-oef1_5.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> teams
<span class="hljs-keyword">WHERE</span> player_number <span class="hljs-operator">=</span> <span class="hljs-number">27</span>;
</code></pre>
<p>اسرد جميع مباريات التنس التي فُزيت.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-4-oef1_6.webp" alt=""></p>
<h4>الحل</h4>
<p>تفوز بمباراة إذا فزت بمجموعات أكثر مما خسرت:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> <span class="hljs-keyword">matches</span>
<span class="hljs-keyword">WHERE</span> won <span class="hljs-operator">&gt;</span> lost;
</code></pre>
<p>اسرد جميع المباريات التي لعبها اللاعب 112. ولحساب كل مباراة من هذه المباريات، احسب بكم مجموعة فاز هذا اللاعب أو خسر.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-5-oef1_8.webp" alt=""></p>
<h4>الحل</h4>
<p>يوضح الشكل أنك تحتاج إلى إضافة عمود جديد ناتج عن حساب بسيط:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">match_number</span>, player_number, <span class="hljs-built_in">abs</span>(won <span class="hljs-operator">-</span> lost) <span class="hljs-keyword">AS</span> difference
<span class="hljs-keyword">FROM</span> <span class="hljs-keyword">matches</span>
<span class="hljs-keyword">WHERE</span> player_number <span class="hljs-operator">=</span> <span class="hljs-number">112</span>;
</code></pre>
<p>أنشئ قائمة بجميع الغرامات المدفوعة.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-6-oef1_9.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> fines
</code></pre>
<p>في القائمة من التمرين السابق، أضف أيضًا اسم اللاعب (الاسم والأحرف الأولى في عمود واحد).</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-7-oef1_10.webp" alt=""></p>
<h4>الحل</h4>
<p>المعلومات التي تحتاجها موزّعة الآن على جدولين، لذا تحتاج إلى <code>JOIN</code>.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> b.payment_number, b.player_number, s.name <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; &#x27;</span> <span class="hljs-operator">||</span> s.initials <span class="hljs-keyword">AS</span> name, b.date, b.amount
<span class="hljs-keyword">FROM</span> fines b <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> players s <span class="hljs-keyword">ON</span> b.player_number <span class="hljs-operator">=</span> s.player_number;
</code></pre>
<p>أعطِ أصغر مبلغ غرامة وأكبَره.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-8-oef1_11.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">min</span>(amount) <span class="hljs-keyword">AS</span> min, <span class="hljs-built_in">max</span>(amount) <span class="hljs-keyword">AS</span> max
<span class="hljs-keyword">FROM</span> fines;
</code></pre>
<p>اسرد جميع أعضاء المجلس الذين يشغلون مناصبهم حاليًا. واعرض مناصبهم. وقدّم أيضًا أسماءهم (الاسم والأحرف الأولى في عمود واحد) كما في الشكل.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-9-oef2_1.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> b.player_number, s.name <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; &#x27;</span> <span class="hljs-operator">||</span> s.initials <span class="hljs-keyword">AS</span> name, b.start_date, b.function
<span class="hljs-keyword">FROM</span> board_members b <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> players s <span class="hljs-keyword">ON</span> b.player_number <span class="hljs-operator">=</span> s.player_number
<span class="hljs-keyword">WHERE</span> end_date <span class="hljs-keyword">IS</span> <span class="hljs-keyword">null</span>;
</code></pre>
<p>أنشئ قائمة بجميع اللاعبات اللواتي <em>لا</em> يسكنّ في Leiden.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-10-oef2_2.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> player_number, name, municipality, sex
<span class="hljs-keyword">FROM</span> players
<span class="hljs-keyword">WHERE</span> sex <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;F&#x27;</span> <span class="hljs-keyword">AND</span> municipality <span class="hljs-operator">!=</span> <span class="hljs-string">&#x27;Leiden&#x27;</span>;
</code></pre>
<h2 id="الغرامات">الغرامات</h2>
<p>ما متوسط مبلغ الغرامة؟ وكم غرامة دُفعت بالفعل؟</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-11-oef2_3.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> round(<span class="hljs-built_in">avg</span>(amount)) <span class="hljs-keyword">AS</span> average, <span class="hljs-built_in">count</span>(amount) <span class="hljs-keyword">AS</span> &quot;number of fines&quot;
<span class="hljs-keyword">FROM</span> fines;
</code></pre>
<p>اسرد جميع الغرامات الأكبر من 30 يورو. واعرض المبلغ بالسنتات الأوروبية. وقدّم أيضًا رقم اللاعب واسم اللاعب الذي تلقى الغرامة.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-12-oef2_4.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> b.player_number, s.name, round(amount<span class="hljs-operator">*</span><span class="hljs-number">100</span>) <span class="hljs-keyword">AS</span> &quot;amount in cents&quot;
<span class="hljs-keyword">FROM</span> fines b <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> players s <span class="hljs-keyword">ON</span> b.player_number <span class="hljs-operator">=</span> s.player_number <span class="hljs-keyword">AND</span> amount <span class="hljs-operator">&gt;</span> <span class="hljs-number">30</span>;
</code></pre>
<p>ابدأ من التمرين السابق: قائمة بجميع اللاعبين الذين تلقوا غرامة أكبر من 30 يورو. والفرق الآن أننا نريد <em>قائمة لاعبين</em> فقط لا قائمة غرامات. واللاعب الذي تلقى أكثر من غرامة (مثل Cools الذي عليه غرامة 75 يورو وغرامة 100 يورو) يجوز أن يظهر في هذه القائمة مرة واحدة فقط.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-13-oef2_5.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">DISTINCT</span> player_number
<span class="hljs-keyword">FROM</span> fines
<span class="hljs-keyword">WHERE</span> amount <span class="hljs-operator">&gt;</span> <span class="hljs-number">30</span>;
</code></pre>
<h2 id="المباريات-واللاعبون-والقادة">المباريات واللاعبون والقادة...</h2>
<p>اسرد جميع المباريات التي فُزيت ولعبها أعضاء الفريق 2. واعرض رقم اللاعب الفائز ورقم قائد الفريق أيضًا.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-14-oef2_6.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> w.match_number, w.player_number, w.team_number, t.player_number <span class="hljs-keyword">AS</span> captain
<span class="hljs-keyword">FROM</span> <span class="hljs-keyword">matches</span> w <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> teams t <span class="hljs-keyword">ON</span> w.team_number <span class="hljs-operator">=</span> t.team_number
<span class="hljs-keyword">WHERE</span> w.team_number <span class="hljs-operator">=</span> <span class="hljs-number">2</span> <span class="hljs-keyword">AND</span> won<span class="hljs-operator">-</span>lost <span class="hljs-operator">&gt;</span> <span class="hljs-number">0</span>;
</code></pre>
<p>أنشئ قائمة بجميع لاعبي المنافسات. فليس كل لاعبي نادينا يلعبون في دورة، لكن من يلعبون في منافسات رسمية يجب أن يكونوا أعضاء في الاتحاد الوطني (والشكل لا يُظهر القائمة الكاملة).</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-15-oef2_7.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> player_number, name
<span class="hljs-keyword">FROM</span> players
<span class="hljs-keyword">WHERE</span> association_number <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NOT null</span>;
</code></pre>
<p>اعرض النظرة العامة من التمرين السابق، لكن للاعبات فقط.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-16-oef2_8.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> player_number, name, sex
<span class="hljs-keyword">FROM</span> players
<span class="hljs-keyword">WHERE</span> association_number <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NOT null</span> <span class="hljs-keyword">AND</span> sex <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;F&#x27;</span>;
</code></pre>
<p>اعرض الاسم والأحرف الأولى والفريق والقسم لقائد كل فريق.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-17-oef2_9.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> t.team_number,t.player_number, s.name <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; &#x27;</span> <span class="hljs-operator">||</span> s.initials <span class="hljs-keyword">AS</span> captain, t.division
<span class="hljs-keyword">FROM</span> teams t <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> players s <span class="hljs-keyword">ON</span> t.player_number <span class="hljs-operator">=</span> s.player_number;
</code></pre>
<p>احصر القائمة السابقة في القائدات.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-18-oef2_10.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> t.team_number,t.player_number, s.name <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; &#x27;</span> <span class="hljs-operator">||</span> s.initials <span class="hljs-keyword">AS</span> captain, t.division
<span class="hljs-keyword">FROM</span> teams t <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> players s <span class="hljs-keyword">ON</span> t.player_number <span class="hljs-operator">=</span> s.player_number
<span class="hljs-keyword">WHERE</span> s.sex <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;F&#x27;</span>;
</code></pre>
<h2 id="تمارين-أصعب">تمارين أصعب</h2>
<p>اسرد رقم اللاعب واسمه وتاريخ الغرامة ومبلغها لجميع اللاعبين الذين غُرِّموا مبلغًا أكبر من 45.50 يورو ويسكنون في Rijswijk. ورتّب حسب رقم اللاعب ورقم الغرامة.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-19-tennis_opg_1.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> players.player_number, players.name, fines.date, fines.amount
<span class="hljs-keyword">FROM</span> players <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> fines <span class="hljs-keyword">ON</span> players.player_number <span class="hljs-operator">=</span> fines.player_number
<span class="hljs-keyword">WHERE</span> fines.amount <span class="hljs-operator">&gt;</span> <span class="hljs-number">45.50</span> <span class="hljs-keyword">AND</span> players.municipality <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Rijswijk&#x27;</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> players.player_number, fines.payment_number;
</code></pre>
<p>لكل مباراة، قدّم رقم المباراة والاسم الكامل لقائد الفريق الذي لعب المباراة. ورتّب نتيجتك حسب رقم المباراة تصاعديًا. نصيحة: ستضطر هنا إلى <code>JOIN</code> أكثر من جدولين.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-20-tennis_opg_2.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> W.match_number, T.player_number, name, initials
<span class="hljs-keyword">FROM</span> <span class="hljs-keyword">matches</span> W <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> teams T <span class="hljs-keyword">on</span> W.team_number <span class="hljs-operator">=</span> T.team_number
  <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> players S <span class="hljs-keyword">on</span> T.player_number <span class="hljs-operator">=</span> S.player_number
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">1</span>;
</code></pre>
<p>أنشئ جدولًا تبيّن فيه لكل بلدية فيها حرف &quot;o&quot; واحد على الأقل (الكبير والصغير كلاهما مقبول) عدد اللاعبين الذين يسكنون في تلك البلدية. ورتّب حسب البلدية.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-21-tennis_opg_3.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> municipality, <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>) <span class="hljs-keyword">AS</span> number
<span class="hljs-keyword">FROM</span> players
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> municipality
<span class="hljs-keyword">HAVING</span> <span class="hljs-built_in">LOWER</span>(municipality) <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;%o%&#x27;</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> municipality;
</code></pre>
<p>أعطِ متوسط مبلغ الغرامة لكل لاعب، مقرّبًا إلى منزلتين عشريتين بعد الفاصلة العشرية. ويُعطى اللاعبون الذين ليس عليهم غرامات القيمة &quot;no fines&quot;. ورتّب حسب اسم اللاعب.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-22-tennis_opg_4.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> players.name,
  <span class="hljs-keyword">CASE</span>
    <span class="hljs-keyword">WHEN</span> <span class="hljs-built_in">AVG</span>(fines.amount) <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span> <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;no fines&#x27;</span>
    <span class="hljs-keyword">ELSE</span> <span class="hljs-built_in">CAST</span>(ROUND(<span class="hljs-built_in">AVG</span>(fines.amount), <span class="hljs-number">2</span>) <span class="hljs-keyword">AS</span> <span class="hljs-type">varchar</span>(<span class="hljs-number">8</span>))
  <span class="hljs-keyword">END</span> <span class="hljs-keyword">AS</span> average
<span class="hljs-keyword">FROM</span> players <span class="hljs-keyword">LEFT</span> <span class="hljs-keyword">OUTER</span> <span class="hljs-keyword">JOIN</span> fines <span class="hljs-keyword">ON</span> players.player_number <span class="hljs-operator">=</span> fines.player_number
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> players.player_number, players.name
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">1</span>;
</code></pre>
<p>أعطِ متوسط عدد المجموعات التي فُزيت وخُسرت حسب سنة الميلاد. وقرّب إلى منزلتين عشريتين في كل حالة. ورتّب حسب سنة الميلاد بحيث تكون بيانات أصغر اللاعبين في الأعلى.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-23-tennis_opg_5.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">EXTRACT</span>(<span class="hljs-keyword">YEAR</span> <span class="hljs-keyword">FROM</span> birth_date) <span class="hljs-keyword">AS</span> birthyear, ROUND(<span class="hljs-built_in">AVG</span>(won),<span class="hljs-number">2</span>) <span class="hljs-keyword">AS</span> won,
  ROUND(<span class="hljs-built_in">AVG</span>(lost),<span class="hljs-number">2</span>) <span class="hljs-keyword">AS</span> lost
<span class="hljs-keyword">FROM</span> <span class="hljs-keyword">matches</span> W <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> players S <span class="hljs-keyword">ON</span> W.player_number <span class="hljs-operator">=</span> S.player_number
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> <span class="hljs-built_in">EXTRACT</span>(<span class="hljs-keyword">YEAR</span> <span class="hljs-keyword">FROM</span> birth_date)
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> birthyear <span class="hljs-keyword">DESC</span>;
</code></pre>
<p>تمرين صعب... أعطِ لجميع أعضاء المجلس النشطين <em>بدون غرامة</em> آخر مباراة لعبوها (المباراة ذات الرقم الأكبر). ورتّب تنازليًا حسب رقم اللاعب.</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-24-tennis_opg_6.webp" alt=""></p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> board_members.player_number, <span class="hljs-built_in">MAX</span>(matches.match_number) <span class="hljs-keyword">AS</span> final_match
<span class="hljs-keyword">FROM</span> board_members
  <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> <span class="hljs-keyword">matches</span> <span class="hljs-keyword">ON</span> board_members.player_number <span class="hljs-operator">=</span> matches.player_number <span class="hljs-keyword">AND</span>
        board_members.end_date <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>
  <span class="hljs-keyword">LEFT</span> <span class="hljs-keyword">OUTER</span> <span class="hljs-keyword">JOIN</span> fines <span class="hljs-keyword">ON</span> board_members.player_number <span class="hljs-operator">=</span> fines.player_number
<span class="hljs-keyword">WHERE</span> fines.player_number <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> board_members.player_number
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> player_number <span class="hljs-keyword">DESC</span>;
</code></pre>
</div>`,o={book:s,chapter:a,chapterTitle:n,slug:p,title:e,headings:l,html:r};export{s as book,a as chapter,n as chapterTitle,o as default,l as headings,r as html,p as slug,e as title};
