const t="500-lines",n="introduction",d="Introduction",a="index",r="مقدّمة",e=[{depth:2,id:"الرسالة",text:"الرسالة"},{depth:2,id:"المساهمون",text:"المساهمون"},{depth:2,id:"المراجعون-التقنيون",text:"المراجعون التقنيون"}],i=`<h1><em>500 سطر أو أقل</em></h1>
<blockquote>
<p>&quot;ما لا أستطيع صناعته، لا أفهمه.&quot;</p>
<p>-- ريتشارد فاينمان</p>
</blockquote>
<p>هذا هو مصدر كتاب <em>500 سطر أو أقل</em>، وهو الكتاب الرابع في سلسلة
<a href="http://aosabook.org">هندسة تطبيقات مفتوحة المصدر</a>. وكما في الكتب الأخرى
في هذه السلسلة، ستغطي جميع النصوص المكتوبة رخصة المشاع الإبداعي - نسب
المصنف، وستغطي جميع الشيفرةَ رخصة MIT؛ انظر
<a href="https://github.com/aosabook/500lines/blob/master/LICENSE.md">وصف الرخصة</a> للتفاصيل. وإضافةً إلى ذلك، ستذهب كل إيرادات
النسخ المدفوعة إلى منظمة العفو الدولية.</p>
<p>أصبح إصدار هذا الكتاب ممكناً بفضل الدعم المالي من
<a href="http://www.pagerduty.com/company/work-with-us/">PagerDuty</a>.</p>
<p align="center">
    <img src="https://github.com/aosabook/500lines/raw/master/resource/pagerduty_logo.png" alt="شعار PagerDuty" />
</p>
<h2 id="الرسالة">الرسالة</h2>
<p>يدرس كل مهندس معماري، أثناء تدريبه، بيوت الأسرة والشقق والمدارس
وأنواع المباني الشائعة الأخرى. وعلى نحو مماثل، ينبغي لكل مبرمج أن يعرف كيف
يحوّل المصرّف (compiler) النص إلى تعليمات، وكيف تحدّث جدول بيانات
(spreadsheet) خلاياه، وكيف تخزّن قاعدة البيانات (database) البيانات بكفاءة.</p>
<p>وقد فعلت كتب الأسبقية في سلسلة AOSA ذلك بوصف البنية المعمارية
العالية المستوى لعدة مشاريع مفتوحة المصدر ناضجة. ورغم أن الدروس المستفادة
من تلك القصص قيّمة، فإنها أحياناً تكون صعبة الاستيعاب على المبرمجين الذين
لم يضطروا بعد إلى بناء أي شيء بهذا المقياس.</p>
<p>يركّز كتاب &quot;500 سطر أو أقل&quot; على قرارات التصميم والمقايضات التي يتخذها
المبرمجون ذوو الخبرة وهم يكتبون الشيفرة:</p>
<ul>
<li>لماذا نقسم التطبيق إلى هذه الوحدات (modules) بالذات وبهذه الواجهات
(interfaces) بالذات؟</li>
<li>لماذا نستخدم الوراثة (inheritance) هنا والتركيب (composition) هناك؟</li>
<li>كيف يمكننا أن نتنبأ بالأماكن التي قد يحتاج فيها برنامجنا إلى التوسّع،
وكيف يمكننا أن نجعل ذلك سهلاً على بقية المبرمجين؟</li>
</ul>
<p>يتكوّن كل فصل من استعراض شامل لبرنامج يحلّ مشكلة كلاسيكية في هندسة البرمجيات
في ما لا يتجاوز خمسمئة سطر من شيفرة المصدر. ونأمل أن تساعد مادة هذا الكتاب
القرّاء على فهم الأساليب المتنوّعة التي يلجأ إليها المهندسون عند حلّ المسائل
في المجالات المختلفة، وأن تكون أساساً لمشاريع توسّع المساهمات الواردة هنا
أو تعدّلها.</p>
<h2 id="المساهمون">المساهمون</h2>
<table>
  <tr>
    <th>الاسم</th>
    <th>الانتساب</th>
    <th>المشروع</th>
    <th>على الإنترنت</th>
    <th>GitHub</th>
  </tr>
  <tr>
    <td>Mike DiBernardo</td>
    <td>Wave</td>
    <td>editorial</td>
    <td>
        <ul>
            <li><a href="https://twitter.com/mdibernardo">@mdibernardo</a></li>
            <li><a href="http://mikedebo.ca">mikedebo.ca</a></li>
        </ul>
    </td>
    <td><a href="https://github.com/MichaelDiBernardo">MichaelDiBernardo</a></td>
  </tr>
   <tr>
    <td>Amy Brown</td>
    <td>indie</td>
    <td>editorial</td>
    <td><ul><li><a href="http://www.amyrbrown.ca/">amyrbrown.ca</a></li>
        <li><a href="http://www.twitter.com/amyrbrown">@amyrbrown</a></li></ul></td>
    <td><a href="https://github.com/amyrbrown">amyrbrown</a></td>
  </tr>
  <tr>
    <td>Allison Kaptur</td>
    <td>Dropbox</td>
    <td>byterun</td>
    <td><ul><li><a href="https://twitter.com/akaptur">@akaptur</a></li></ul></td>
    <td><a href="https://github.com/akaptur">akaptur</a></td>
  </tr>
  <tr>
    <td>Audrey Tang</td>
    <td>g0v.tw, Socialtext, Apple</td>
    <td>spreadsheet</td>
    <td>
        <ul>
            <li><a href="https://twitter.com/audreyt">@audreyt</a></li>
        </ul>
    </td>
    <td><a href="https://github.com/audreyt">audreyt</a></td>
  </tr>
  <tr>
    <td>Brandon Rhodes</td>
    <td>Dropbox</td>
    <td>contingent</td>
    <td><ul><li><a href="https://twitter.com/brandon_rhodes">@brandon_rhodes</a></li></ul></td>
    <td><a href="https://github.com/brandon-rhodes">brandon-rhodes</a></td>
  </tr>
  <tr>
    <td>Carl Friedrich Bolz</td>
    <td>King's College London</td>
    <td>object model</td>
    <td>
        <ul>
            <li><a href="https://cfbolz.de">cfbolz.de</a></li>
            <li><a href="https://twitter.com/cfbolz">@cfbolz</a></li>
        </ul>
    </td>
    <td><a href="https://github.com/cfbolz">cfbolz</a></td>
  </tr>
  <tr>
    <td>Cate Huston</td>
    <td>&nbsp;</td>
    <td>Image Filter app</td>
    <td>
        <ul>
            <li><a href="http://www.accidentallyincode.com/">www.accidentallyincode.com/</a></li>
            <li><a href="https://twitter.com/catehstn">@catehstn</a></li>
        </ul>
    </td>
    <td><a href="https://github.com/catehstn">catehstn</a></td>
  </tr>
  <tr>
    <td>Christian Muise</td>
    <td>University of Melbourne</td>
    <td>flow-shop</td>
    <td>
        <ul>
            <li><a href="https://twitter.com/cjmuise">@cjmuise</a></li>
        </ul>
    </td>
    <td><a href="https://github.com/haz">haz</a></td>
  </tr>
  <tr>
    <td>Daniel Jackson</td>
    <td>&nbsp;</td>
    <td>same-origin-policy</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Daniel Rocco</td>
    <td>BrightLink Technology</td>
    <td>contingent</td>
    <td><ul><li><a href="https://twitter.com/drocco007">@drocco007</a></li></ul></td>
    <td><a href="https://github.com/drocco007">drocco007</a></td>
  </tr>
  <tr>
    <td>Dann Toliver</td>
    <td>Bento Box</td>
    <td>dagoba</td>
    <td>
        <ul>
            <li><a href="http://danntoliver.com">danntoliver.com</a></li>
            <li><a href="https://twitter.com/dann">@dann</a></li>
        </ul>
    </td>
    <td><a href="https://github.com/dxnn">dxnn</a></td>
  </tr>
  <tr>
    <td>Dessy Daskalov</td>
    <td>Nudge Rewards</td>
    <td>Pedometer</td>
    <td>
        <ul>
            <li><a href="http://www.dessydaskalov.com/">www.dessydaskalov.com</a></li>
            <li><a href="https://twitter.com/dess_e">@dess_e</a></li>
        </ul>
    </td>
    <td><a href="https://github.com/dessy">dessy</a></td>
  </tr>
  <tr>
    <td>Dethe Elza</td>
    <td>&nbsp;</td>
    <td>blockcode</td>
    <td>&nbsp;</td>
    <td><a href="https://github.com/dethe">dethe</a></td>
  </tr>
  <tr>
    <td>Dustin Mitchell</td>
    <td>Mozilla</td>
    <td>cluster</td>
    <td>&nbsp;</td>
    <td><a href="https://github.com/djmitche">djmitche</a></td>
  </tr>
  <tr>
    <td>Erick Dransch</td>
    <td>&nbsp;</td>
    <td>Modeller</td>
    <td>
        <ul>
            <li><a href="https://twitter.com/ErickDransch">@ErickDransch</a></li>
        </ul>
    </td>
    <td><a href="https://github.com/EkkiD">EkkiD</a></td>
  </tr>
  <tr>
    <td>Eunsuk Kang</td>
    <td>&nbsp;</td>
    <td>same-origin-policy</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Greg Wilson</td>
    <td>&nbsp;</td>
    <td>web-server</td>
    <td>
        <ul>
            <li><a href="https://twitter.com/gvwilson">@gvwilson</a></li>
        </ul>
    </td>
    <td><a href="https://github.com/gvwilson">gvwilson</a></td>
  </tr>
  <tr>
    <td>Guido van Rossum</td>
    <td>Dropbox</td>
    <td>crawler</td>
    <td>
        <ul>
            <li><a href="https://twitter.com/gvanrossum">@gvanrossum</a></li>
        </ul>
    </td>
    <td><a href="https://github.com/gvanrossum">gvanrossum</a></td>
  </tr>
  <tr>
    <td>A. Jesse Jiryu Davis</td>
    <td>MongoDB</td>
    <td>crawler</td>
    <td>
        <ul>
            <li><a href="https://twitter.com/jessejiryudavis">@jessejiryudavis</a></li>
        </ul>
    </td>
    <td><a href="https://github.com/ajdavis">ajdavis</a></td>
  </tr>
  <tr>
    <td>Jessica Hamrick</td>
    <td>University of California, Berkeley</td>
    <td>sampler</td>
    <td>
        <ul>
            <li><a href="http://www.jesshamrick.com">www.jesshamrick.com</a></li>
            <li><a href="https://twitter.com/jhamrick">@jhamrick</a></li>
        </ul>
    </td>
    <td><a href="https://github.com/jhamrick">jhamrick</a></td>
  </tr>
  <tr>
    <td>Leah Hanson</td>
    <td>Google</td>
    <td>static analysis</td>
    <td>
        <ul>
            <li><a href="https://twitter.com/astrieanna">@astrieanna</a></li>
        </ul>
    </td>
    <td><a href="https://github.com/astrieanna">astrieanna</a></td>
  </tr>
  <tr>
    <td>Leo Zovic</td>
    <td>&nbsp;</td>
    <td>event-web-framework</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Malini Das</td>
    <td>Twitch</td>
    <td>ci</td>
    <td>
        <ul>
            <li><a href="http://malinidas.com">malinidas.com</a></li>
            <li><a href="https://twitter.com/malinidas">@malinidas</a></li>
        </ul>
    </td>
    <td><a href="https://github.com/malini">malini</a></td>
  </tr>
  <tr>
    <td>Marina Samuel</td>
    <td>Mozilla</td>
    <td>ocr</td>
    <td>
        <ul>
            <li><a href="http://marinasamuel.com">www.marinasamuel.com</a></li>
            <li><a href="https://twitter.com/emtwos">@emtwos</a></li>
        </ul>
    </td>
    <td><a href="https://github.com/emtwo">emtwo</a></td>
  </tr>
  <tr>
    <td>Ned Batchelder</td>
    <td>edX</td>
    <td>templating engine</td>
    <td>
        <ul>
            <li><a href="http://nedbatchelder.com">nedbatchelder.com</a></li>
            <li><a href="https://twitter.com/nedbat">@nedbat</a></li>
        </ul>
    </td>
    <td><a href="https://github.com/nedbat">nedbat</a></td>
  </tr>
  <tr>
    <td>Santiago Perez De Rosso</td>
    <td>&nbsp;</td>
    <td>same-origin-policy</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Taavi Burns</td>
    <td>Previously at Points, now at PagerDuty</td>
    <td>data-store</td>
    <td>
        <ul>
            <li><a href="https://twitter.com/jaaaarel">@jaaaarel</a></li>
        </ul>
    </td>
    <td><a href="https://github.com/taavi">taavi</a></td>
  </tr>
  <tr>
    <td>Yoav Rubin</td>
    <td>Microsoft</td>
    <td>In-memory functional database</td>
    <td>
        <ul>
            <li><a href="https://twitter.com/yoavrubin">@yoavrubin</a></li>
        </ul>
    </td>
    <td><a href="https://github.com/yoavrubin">yoavrubin</a></td>
  </tr>
</table>
<h2 id="المراجعون-التقنيون">المراجعون التقنيون</h2>
<table>
  <tr>
    <td>Amber Yust</td>
    <td>Andrew Gwozdziewycz</td>
    <td>Andrew Kuchling</td>
  </tr>
  <tr>
    <td>Andrew Svetlov</td>
    <td>Andy Shen</td>
    <td>Anton Beloglazov</td>
  </tr>
  <tr>
    <td>Ben Trofatter</td>
    <td>Borys Pierov</td>
    <td>Carise Fernandez</td>
  </tr>
  <tr>
    <td>Charles Stanhope</td>
    <td>Chris Atlee</td>
    <td>Chris Seaton</td>
  </tr>
  <tr>
    <td>Cyryl Płotnicki-Chudyk</td>
    <td>Dan Langer</td>
    <td>Dan Shapiro</td>
  </tr>
  <tr>
    <td>David Pokorny</td>
    <td>Eric Bouwers</td>
    <td>Frederic De Groef</td>
  </tr>
  <tr>
    <td>Graham Lee</td>
    <td>Gregory Eric Sanderson</td>
    <td>James O'Beirne</td>
  </tr>
  <tr>
    <td>Jan de Baat</td>
    <td>Jana Beck</td>
    <td>Jessica McKellar</td>
  </tr>
  <tr>
    <td>Jo Van Eyck</td>
    <td>Joel Crocker</td>
    <td>Johan Thelin</td>
  </tr>
  <tr>
    <td>Johannes Fürmann</td>
    <td>John Morrissey</td>
    <td>Joseph Kaptur</td>
  </tr>
  <tr>
    <td>Josh Crompton</td>
    <td>Joshua T. Corbin</td>
    <td>Kevin Huang</td>
  </tr>
  <tr>
    <td>Maggie Zhou</td>
    <td>Marc Towler</td>
    <td>Marcin Milewski</td>
  </tr>
  <tr>
    <td>Marco Lancini</td>
    <td>Mark Reid</td>
    <td>Matthias Bussonnier</td>
  </tr>
  <tr>
    <td>Max Mautner</td>
    <td>Meggin Kearney</td>
    <td>Mike Aquino</td>
  </tr>
  <tr>
    <td>Natalie Black</td>
    <td>Nick Presta</td>
    <td>Nikhil Almeida</td>
  </tr>
  <tr>
    <td>Nolan Prescott</td>
    <td>Paul Martin</td>
    <td>Piotr Banaszkiewicz</td>
  </tr>
  <tr>
    <td>Preston Holmes</td>
    <td>Pulkit Sethi</td>
    <td>Rail Aliiev</td>
  </tr>
  <tr>
    <td>Ronen Narkis</td>
    <td>Rose Ames</td>
    <td>Sina Jahan</td>
  </tr>
  <tr>
    <td>Stefan Turalski</td>
    <td>William Lachance</td>
  </tr>
</table>
`,o={book:t,chapter:n,chapterTitle:d,slug:a,title:r,headings:e,html:i};export{t as book,n as chapter,d as chapterTitle,o as default,e as headings,i as html,a as slug,r as title};
