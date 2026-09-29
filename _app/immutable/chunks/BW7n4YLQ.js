const e="use-the-index-luke",n="sql-join-sort-merge-join",t="Sort Merge",s="index",o="دمج الترتيب",i=[],r=`<p>يجمع ربط الدمج بالترتيب قائمتين مرتَّبتين كما يُغلق السحّاب. ويجب أن يكون طرفا الربط مرتَّبين بمُسندات الربط.</p>
<p>ويحتاج ربط الدمج بالترتيب الفهارس نفسها التي يحتاجها <a href="/arabic-cs-library/book/use-the-index-luke/sql-join-hash-join-partial-objects/index">الربط بالتجزئة</a>، أي فهرساً للشروط المستقلة لقراءة جميع السجلات المرشحة دفعة واحدة. أما فهرسة مُسندات الربط فلا جدوى منها. وكل شيء شبيه بالربط بالتجزئة حتى الآن. غير أن هناك جانباً فريداً في ربط الدمج بالترتيب: التناظر المطلق؛ فترتيب الربط لا يُحدث أي فرق — ولا حتى في الأداء. وهذه الخاصية مفيدة جداً للعمليات الخارجية (outer joins)؛ ففي الخوارزميات الأخرى يستلزم اتجاه الربط الخارجي (يساراً أو يميناً) ترتيب الربط — بخلاف ربط الدمج بالترتيب. بل يستطيع ربط الدمج بالترتيب تنفيذ ربط خارجي أيسر وأيمن في الوقت نفسه — وهو ما يسمى الربط الخارجي الكامل (full outer join)، كما في الرسم المتحرك التالي.</p>
<p>الشكل 4.1 ربط الدمج بالترتيب ينفّذ ربطاً خارجياً كاملاً <img src="https://use-the-index-luke.com/images/use-the-index-luke/sql-join-sort-merge-join-0-sort-merge.2hg7gOBL.webp" alt=""></p>
<p>ومع أن ربط الدمج بالترتيب يؤدي أداءً جيداً جداً بعد ترتيب المدخلات، فقلّما يُستخدم لأن فرز الطرفين باهظ جداً. أما الربط بالتجزئة فيحتاج إلى معالجة مسبقة لطرف واحد فقط.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-sort-merge&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>وتبرز قوة ربط الدمج بالترتيب إذا كانت المدخلات مرتَّبة أصلاً. وهذا ممكن باستغلال ترتيب الفهرس لتجنّب عمليات الفرز كلياً. ويشرح <a href="/arabic-cs-library/book/use-the-index-luke/sql-sorting-grouping/index">الفصل 6، «<em>الترتيب والتجميع</em>»</a> هذا المفهوم بالتفصيل. ومع ذلك تتفوق خوارزمية الربط بالتجزئة في حالات كثيرة.</p>
<h4>مربع حقائق</h4>
<ul>
<li>لا تحتاج عمليات ربط الدمج بالترتيب فهارس على مُسندات الربط.</li>
<li>لا تدعم MySQL عمليات ربط الدمج بالترتيب إطلاقاً.</li>
</ul>
`,a={book:e,chapter:n,chapterTitle:t,slug:s,title:o,headings:i,html:r};export{e as book,n as chapter,t as chapterTitle,a as default,i as headings,r as html,s as slug,o as title};
