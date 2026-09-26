const e="db-design",s="chapter-4",a="Types of Database Models",n="index",l="أنواع نماذج قواعد البيانات",t=[{depth:2,id:"نماذج-البيانات-المفاهيمية-عالية-المستوى",text:"نماذج البيانات المفاهيمية عالية المستوى"},{depth:2,id:"نماذج-البيانات-المنطقية-المعتمدة-على-السجلات",text:"نماذج البيانات المنطقية المعتمدة على السجلات"},{depth:2,id:"نسب-العمل",text:"نسب العمل"}],i=`<p>النص الرئيسي</p>
<pre><code class="language-sql">Key Terms

hierarchical model: represents data <span class="hljs-keyword">as</span> a hierarchical tree structure

instance: a record <span class="hljs-keyword">within</span> a <span class="hljs-keyword">table</span>

network model: represents data <span class="hljs-keyword">as</span> record types

relation: another term <span class="hljs-keyword">for</span> <span class="hljs-keyword">table</span>

relational model: represents data <span class="hljs-keyword">as</span> relations <span class="hljs-keyword">or</span> tables

<span class="hljs-keyword">set</span> type: a limited type <span class="hljs-keyword">of</span> <span class="hljs-keyword">one</span> <span class="hljs-keyword">to</span> many relationship 
</code></pre>
<h2 id="نماذج-البيانات-المفاهيمية-عالية-المستوى">نماذج البيانات المفاهيمية عالية المستوى</h2>
<pre><code class="language-sql">Exercises

What <span class="hljs-keyword">is</span> a data model?
What <span class="hljs-keyword">is</span> a high<span class="hljs-operator">-</span>level conceptual data model?
What <span class="hljs-keyword">is</span> an entity? An attribute? A relationship?
List <span class="hljs-keyword">and</span> briefly <span class="hljs-keyword">describe</span> the common record<span class="hljs-operator">-</span>based logical data models.
</code></pre>
<p>توفّر نماذج البيانات المفاهيمية عالية المستوى مفاهيم لعرض البيانات بطرق قريبة من الطريقة التي يدرك بها الناس البيانات. ومن الأمثلة النموذجية نموذج الكيانات والعلاقات (entity relationship model)، الذي يستخدم مفاهيم رئيسية مثل الكيانات (entities) والخصائص (attributes) والعلاقات (relationships). ويمثّل الكيان (entity) كائنًا من العالم الحقيقي مثل موظف أو مشروع. ويمتلك الكيان خصائص (attributes) تمثّل صفات مثل اسم الموظف وعنوانه وتاريخ ميلاده. أما العلاقة (relationship) فتمثّل ترابطًا بين الكيانات؛ فعلى سبيل المثال، يعمل موظف على العديد من المشاريع. وهناك علاقة بين الموظف وكل مشروع.</p>
<h2 id="نماذج-البيانات-المنطقية-المعتمدة-على-السجلات">نماذج البيانات المنطقية المعتمدة على السجلات</h2>
<p>توفّر نماذج البيانات المنطقية المعتمدة على السجلات (record-based logical data models) مفاهيم يستطيع المستخدمون فهمها، لكنها ليست بعيدة جدًا عن الطريقة التي تُخزَّن بها البيانات في الحاسوب. وهناك ثلاثة نماذج بيانات معروفة جيدًا من هذا النوع، وهي: نماذج البيانات العلائقية، ونماذج البيانات الشبكية، ونماذج البيانات الهرمية.</p>
<ul>
<li>
<p>يمثّل النموذج العلائقي (relational model) البيانات في صورة علاقات (relations)، أو جداول (tables). فعلى سبيل المثال، في نظام العضويات في Science World، لكل عضوية أعضاء كثيرون (انظر الشكل 2.2 في الفصل 2). ومعرّف العضوية وتاريخ الانتهاء ومعلومات العنوان حقول (fields) في العضوية. أما الأعضاء فهم أفراد مثل Mickey وMinnie وMighty وDoor وTom وKing وMan وMoose. ويُقال عن كل سجل (record) إنه نسخة (instance) من جدول العضويات.</p>
</li>
<li>
<p>يمثّل النموذج الشبكي (network model) البيانات في صورة أنواع سجلات. كما يمثّل هذا النموذج أيضًا نوعًا محدودًا من علاقة واحد إلى متعدد يُسمَّى نوع المجموعة (set type)، كما هو مبيّن في الشكل 4.1.</p>
</li>
</ul>
<p><img src="/images/db-design/chapter-4-0-Network_data_model_300x244.webp" alt="مخطط النموذج الشبكي: مربعات وأسهم متقاطعة تصل بينها"></p>
<ul>
<li>يمثّل النموذج الهرمي (hierarchical model) البيانات في صورة بنية شجرية هرمية. ويمثّل كل فرع من فروع التسلسل الهرمي عددًا من السجلات المترابطة. ويبيّن الشكل 4.2 هذا المخطط (schema) بترميز النموذج الهرمي.</li>
</ul>
<p><img src="/images/db-design/chapter-4-1-Hierarchical_Data_Model_300x116.webp" alt="مخطط النموذج الهرمي بعناوين مترابطة بخطوط"></p>
<p>النموذج الهرمي (hierarchical model): يمثّل البيانات في صورة بنية شجرية هرمية</p>
<p>النسخة (instance): سجل داخل جدول</p>
<p>النموذج الشبكي (network model): يمثّل البيانات في صورة أنواع سجلات</p>
<p>العلاقة (relation): مصطلح آخر للجدول</p>
<p>النموذج العلائقي (relational model): يمثّل البيانات في صورة علاقات أو جداول</p>
<p>نوع المجموعة (set type): نوع محدود من علاقة واحد إلى متعدد</p>
<ul>
<li>ما هو نموذج البيانات (data model)؟</li>
<li>ما هو نموذج البيانات المفاهيمي عالي المستوى؟</li>
<li>ما هو الكيان (entity)؟ وما الخاصية (attribute)؟ وما العلاقة (relationship)؟</li>
<li>اذكر النماذج المنطقية المعتمدة على السجلات الشائعة وصفها بإيجاز.</li>
</ul>
<h2 id="نسب-العمل">نسب العمل</h2>
<p>هذا الفصل من كتاب Database Design هو نسخة مشتقة من <a href="http://cnx.org/contents/b57b8760-6898-469d-a0f7-06e0537f6817@1">Database System Concepts</a> من تأليف Nguyen Kim Anh، بترخيص <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution License 3.0 license</a></p>
<p>كُتبت المواد التالية من إعداد Adrienne Watt:</p>
<ul>
<li>المصطلحات الأساسية</li>
<li>تمارين</li>
</ul>
`,p={book:e,chapter:s,chapterTitle:a,slug:n,title:l,headings:t,html:i};export{e as book,s as chapter,a as chapterTitle,p as default,t as headings,i as html,n as slug,l as title};
