const s="mit-6100l",n="problem-sets",e="مجموعات المسائل",o="ps5",a="مجموعة المسائل 5 — استخدام المكتبات",t=[{depth:2,id:"المقدمة",text:"المقدمة"},{depth:3,id:"الأهداف",text:"الأهداف"},{depth:3,id:"التعاون",text:"التعاون"},{depth:3,id:"ملاحظة-عن-الدرجة",text:"ملاحظة عن الدرجة"},{depth:2,id:"البدء-getting-started",text:"البدء (Getting Started)"},{depth:3,id:"a-مرشحات-عمى-الألوان-colorblindness-filters",text:"A) مرشّحات عمى الألوان (Colorblindness Filters)"},{depth:3,id:"b-رسائل-مخفية-في-الصور-hidden-messages-in-images",text:"B) رسائل مخفية في الصور (Hidden Messages in Images)"},{depth:2,id:"3-إجراءات-التسليم-hand-in-procedure",text:"3) إجراءات التسليم (Hand-in Procedure)"},{depth:3,id:"31-معلومات-الوقت-والتعاون",text:"3.1) معلومات الوقت والتعاون"},{depth:3,id:"32-التسليم-في-منتصف-الطريق-half-way-submission",text:"3.2) التسليم في منتصف الطريق (Half-way Submission)"},{depth:3,id:"33-التسليم-النهائي-submission",text:"3.3) التسليم النهائي (Submission)"},{depth:2,id:"المصدر-والنسب-والترخيص",text:"المصدر والنَّسب والترخيص"}],p=`<h1>مجموعة المسائل 5: استخدام المكتبات (Using Libraries)</h1>
<p><strong>زميل مجموعة المسائل (Pset Buddy):</strong> لم يُعيَّن لك زميل لهذه المجموعة في النسخة المنشورة.</p>
<h2 id="المقدمة">المقدمة</h2>
<p>تعرّفك مجموعة المسائل هذه على موضوع <strong>استخدام المكتبات (Using Libraries)</strong>، أي استخدام مكتبات موجودة مسبقًا من أجل إنجاز هدف ما. وتتطلب هذه المجموعة كتابة قدر ضئيل جدًا من الكود؛ فالعملية التعليمية هنا هي إيجاد دوال مفيدة تنفّذ العمل نيابةً عنك داخل المكتبات الموجودة. ومن المتوقَّع أن تستخدم البحث على الويب للعثور على الدوال اللازمة.</p>
<h3 id="الأهداف">الأهداف</h3>
<ul>
<li>تعلّم كيفية استخدام المكتبات الموجودة سلفًا للوصول إلى هدف.</li>
<li>تعلّم كيفية قراءة توثيق (Documentation) دوال مكتبة ما واستخدامها.</li>
</ul>
<h3 id="التعاون">التعاون</h3>
<ul>
<li>يمكنك العمل مع طلاب آخرين. لكن يجب أن يكتب كل طالب تكليفه ويسلّمه على حدة. تأكّد من الإشارة في تعليقات تسليمك إلى من عملت معهم.</li>
</ul>
<h3 id="ملاحظة-عن-الدرجة">ملاحظة عن الدرجة</h3>
<p>سيكون لهذا التكليف وزن أكبر للتصحيح اليدوي لأن أداة التصحيح الآلي ليست شاملة. 50% من الدرجة ستأتي من أداة التصحيح الآلي، و50% من التصحيح اليدوي على الصور المُنتَجة.</p>
<p>تساعدك أداة الاختبار <code>test_ps5_student.py</code> على التحقق مما إذا كنت تُظهر الصور المخفية بشكل صحيح.</p>
<h2 id="البدء-getting-started">البدء (Getting Started)</h2>
<p>حمّل ملف <code>1_ps5.zip</code> وفكّ ضغط كل ملفاته في المجلد نفسه. الملفات المُضمَّنة هي: <code>ps5.py</code>، و<code>test_ps5_student.py</code>، والصور المُستخدَمة في المجموعة. وعندما تنتهي، تأكّد من تشغيل ملف الاختبار للتحقق من كودك مقابل بعض حالات الاختبار لدينا.</p>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p><strong>ملاحظة المترجم:</strong> لم يُنشر ملف الاختبار <code>test_ps5_student.py</code> ولا الحزمة الأصلية في <code>static/</code>؛ فهما متاحان من صفحة الكود الرسمية على OCW. المواعيد المذكورة أدناه هي مواعيد المقرر الأصلي في خريف 2022 وليست مواعيد جديدة لهذه الترجمة.</p>
</div>
<h3 id="a-مرشحات-عمى-الألوان-colorblindness-filters">A) مرشّحات عمى الألوان (Colorblindness Filters)</h3>
<p>يحتوي عين الإنسان على نوعين من الخلايا المُستقبِلة للضوء (Photoreceptive Cells): العصيات (Rods) والمخاريط (Cones). العصيات مسؤولة عن الرؤية في البيئات ذات الإضاءة المنخفضة مثل الليل، بينما المخاريط مسؤولة عن رؤية الألوان. وهناك ثلاثة أنواع من المخاريط، كل نوع منها مسؤول عن لون بعينه: الأحمر والأخضر والأزرق. وتعمل المخاريط الثلاثة معًا فتتيح لك رؤية كامل الطيف اللوني. فمثلًا، عندما تُنشَّط مخاريط الأحمر والأزرق بطريقة معيّنة، ترى اللون البنفسجي.</p>
<p>وتظهر الحالة المعروفة بـ<strong>عمى الألوان (Colorblindness)</strong> عادةً على شكل نقص في أحد أنواع المخاريط هذه؛ فمثلًا، <strong>العمى الأحمر (Protanopia)</strong> هو نقص في الحساسية للضوء الأحمر، وإليك مثالًا على الفرق في رؤية صورة ما:</p>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> الصورة المقارنة في هذه الشريحة لم تُنشر هنا لأن حقوقها تعود إلى طرف ثالث خارج نطاق ترخيص CC الذي تطبّقه MIT على هذه النشرة (انظر «استثناءات الأطراف الثالثة» أدناه). لم يُخمَّن أي وصف بديل لها.</p>
</blockquote>
<p>الهدف من هذا الجزء هو إنشاء مرشّحات تحاكي هذه الفروق. وسنستخدم لذلك <strong>مكتبة صور بايثون (Python's Image Library أو PIL)</strong>. ومن PIL سنستورد <code>Image</code>، وهي مكتبة فرعية (Sublibrary)، أي مجموعة من الدوال والطرق (Methods) المتعلقة بمعالجة الصور. ومع <code>Image</code> يمكننا تحويل الصور إلى قائمة من البكسلات (Pixels)، ثم التعامل مع قيم <strong>RGB</strong> (الأحمر والأخضر والأزرق) لتلك البكسلات.</p>
<p>ويمكننا محاكاة آثار عمى الألوان عبر <strong>ضرب مصفوفة تحويل عمى الألوان (Colorblindness Transformation Matrix)</strong> في قيم RGB لإحدى البكسلات، وهي ممثَّلة كمتجه (Vector) من ثلاثة مدخلات.</p>
<p>لا تحتاج إلى معرفة أي شيء عن <strong>ضرب المصفوفات (Matrix Multiplication)</strong>؛ لكن إن أردت المزيد من المعلومات عنه فراجع <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ps5_pdf/">Material here</a>.</p>
<p>وهنا هو التفصيل العام لعملية تحويل الصورة:</p>
<ol>
<li>افتح الصورة في بايثون.</li>
<li>استرجع قائمة (من الصفوف أو الأعداد الصحيحة) بمعلومات البكسلات.</li>
<li>مرّ على البكسلات واضربها في مصفوفة التحويل باستخدام <code>matrix_multiply</code>.</li>
<li>احفظ البكسلات المحوَّلة في صورة.</li>
</ol>
<h4>1.1) تنفيذ الدوال المساعدة (Implementing Helper Functions)</h4>
<h5>1.1.1) <code>img_to_pix(filename)</code></h5>
<p>الدالة المساعدة الأولى هي تحويل الصورة إلى قائمة بكسلات. المُدخل هو نص يمثّل ملف صورة، مثل <code>'example.jpg'</code>، والمُخرج هو قائمة تمثّل البكسلات في تلك الصورة، مثل <code>[(0,0,0),(255,255,255),(38,29,58)...]</code> لصور RGB، أو <code>[60, 66, 72...]</code> لصور بالأبيض والأسود. وستتكوّن القائمة من صفوف (Tuples) من ثلاثة عناصر تمثّل قيم RGB لتلك البكسلات في صورة RGB، أو من عدد صحيح يمثّل سطوع تلك البكسل في صورة بالأبيض والأسود.</p>
<p>سترغب في فتح الصورة والحصول على بيانات تلك الصورة. (راجع توثيق وحدة <code>Image</code> لمعرفة كيفية هذين الأمرين.) لاحظ: لا تقلق بشأن تحديد ما إذا كانت الصورة RGB أم بالأبيض والأسود. فدوال مكتبة PIL التي ستستخدمها تُعيد قيم البكسلات الصحيحة لأي من نمطي الصورة.</p>
<p>يجب أن يكون هذا قصيرًا جدًا إن وجدت الدوال المناسبة.</p>
<h5>1.1.2) <code>pix_to_img(pixels_list, size, mode)</code></h5>
<p>الدالة المساعدة التالية هي تحويل قائمة البكسلات إلى صورة. المُدخل سيكون <code>pixels_list</code>، بنفس تنسيق مُخرج الدالة السابقة، إضافةً إلى معامل <code>size</code> وهو صف من عنصرين يصف أبعاد الصورة المُخرَجة، ومعامل <code>mode</code> الذي يحدّد ما إذا كانت البكسلات المُدخَلة تمثّل صورة بالأبيض والأسود أم صورة ملوّنة. افترض أن <code>size</code> مُدخل صالح بحيث <code>size[0] * size[1] == len(pixels)</code>.</p>
<p>بعبارة أخرى، أنت تريد نسخ قيم البكسلات من كائن تسلسلي (Sequence Object) إلى الصورة، لذا عليك مراجعة توثيق وحدة <code>Image</code> لمعرفة كيفية فعل ذلك. وراجع الـ<code>docstring</code> (سلسلة التوثيق) للتفاصيل حول كيفية تمثيل <code>mode</code>.</p>
<p>يجب أن يكون هذا قصيرًا جدًا إن وجدت الدوال المناسبة.</p>
<h5>1.1.3) <code>filter(pixels_list, color)</code></h5>
<p>تأخذ هذه الدالة قائمة بكسلات بصيغة RGB، مثل <code>[(0,0,0),(255,255,255),(38,29,58)...]</code>، إضافةً إلى لون: <code>'red'</code> أو <code>'blue'</code> أو <code>'green'</code> أو <code>'none'</code>. والغرض من هذه الدالة هو تطبيق تحويل على البكسلات في قائمة المُدخل بحيث يحاكي نقصًا في مخاريط لون المُدخل.</p>
<p>أعِد قائمة البكسلات المحوَّلة.</p>
<p>ولإجراء التحويل، اضرب كل بكسل في المصفوفة المناسبة. وقد وفّرنا لك الدالة <code>make_matrix</code> التي تُعطي مصفوفة تمثّل التحويل المناسب حسب نص المُدخل. فمثلًا، تُعيد <code>make_matrix('red')</code> المصفوفة التي تمثّل نقصًا في رؤية الأحمر.</p>
<p>تذكّر أنه يجب أن تمرّ على قائمة البكسلات وتضرب كل واحدة منها في المصفوفة المناسبة. واستخدم الدالة <code>matrix_multiply(matrix1, matrix2)</code> المقدَّمة لذلك. ولاحظ أن مصفوفة التحويل يجب أن تكون المُدخل الأول ومتجه البكسل RGB هو المُدخل الثاني، وإلا فستكون الصورة الناتجة غير صحيحة. ولاحظ أيضًا أن <code>matrix_multiply</code> تُعيد قائمة من الأعداد العشرية (Floats) وأن البكسلات يجب أن تكون صفوفًا من الأعداد الصحيحة (Ints).</p>
<p>يجب أن يكون هذا قصيرًا إلى حد ما إن وجدت الدوال المناسبة.</p>
<p>إذا كان كل شيء على ما يرام، فإن تشغيل البرنامج مع الصورة التجريبية (<code>'image_15.png'</code>) ومع نقص في رؤية الأحمر ينبغي أن ينتج ما يلي:</p>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> لم تُنشر هنا صورتا «الأصلية» و«بعد التحويل» لأن MIT تستثني من ترخيص CC الصور التي حقوقها تعود إلى أطراف ثالثة. ولأن النص لا يقدّم عنهما بديلًا، لم يُخمَّن أي وصف لهما.</p>
</blockquote>
<p>تُعرف الصور من هذا النوع باختبارات <strong>إشيهارا (Ishihara Tests)</strong>.</p>
<p>للحصول على الدرجة، سلّم الصورة المحوَّلة في نهاية المجموعة.</p>
<h3 id="b-رسائل-مخفية-في-الصور-hidden-messages-in-images">B) رسائل مخفية في الصور (Hidden Messages in Images)</h3>
<p>في الصورة من الممكن إخفاء صورة ثانية (سرّية) لا يمكن استرجاعها إلا بعمليات رياضية معيّنة. وتُعرف هذه بـ<strong>الاختباء الشفاف (Steganography)</strong>. وفي هذا القسم ستمرّ على بعض الأمثلة وتكتب وحدة اختباء شفاف خاصة بك لإخفاء الصور.</p>
<blockquote>
<p><strong>ملاحظة المترجم — مادة مستثناة:</strong> يذكر ملف النشرة الأصلي بوضوح أن الصور المستخدمة في هذا القسم حقوقها © Cyp على ويكيبيديا الإنجليزية، وأنها مرخّصة بـ CC-BY-SA وأن MIT <strong>تستثنيها من ترخيصها الخاص</strong>. لذلك لم تُنشر صورتا «الأصلية» و«الصورة السرّية» هنا، ولم يُخمَّن أي وصف بديل. النص الشرحي التالي هو كامل الترجمة لما ورد في النشرة.</p>
</blockquote>
<p>أُعطي مثال على الاختباء الشفاف في الأعلى. الصورة على اليسار تحتوي الصورة على اليمين. وعندما تنتهي من مجموعة المسائل هذه، ستفهم كيفية استخراج الصورة السرّية من الصورة الأصلية.</p>
<p>في الصورة بالأبيض والأسود، تمثَّل كل بكسل بقيمة عددية تدلّ على سطوعه. القيمة الدنيا لكل بكسل هي 0 (والتي تمثّل الأسود)، بينما القيمة العليا (والتي تمثّل الأبيض) تعتمد على عدد البتات (Bits) المستخدمة لكل بكسل. وفي أمثلتنا سنستخدم صورًا بعمق 8 بت (8-bit Images). أي أن البكسلات يمكن أن تأخذ قيمًا بين 0 و255 شاملةً (هل ترى لماذا؟).</p>
<p>افترض في هذا الجزء أنك تتعامل مع صور بعمق ألوان 8 بت.</p>
<h4>2.1) العمل مع الأعداد الثنائية (Working with Binary Numbers)</h4>
<p>يعتمد هذا الجزء من المجموعة على قراءة الأعداد الثنائية (Binary Numbers) والتعامل معها.</p>
<p>ولنأخذ مثالًا التمثيل الثنائي للعدد العشري 13، وهو 1101. بدءًا من الرقم في أقصى اليمين، ثمّ التحرك يسارًا،، يمثّل كل موضع فهرس قوة متزايدة للعدد 2:</p>
<table>
<thead>
<tr>
<th>1</th>
<th>1</th>
<th>0</th>
<th>1</th>
</tr>
</thead>
<tbody>
<tr>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mn>3</mn></msup></mrow><annotation encoding="application/x-tex">2^3</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8141em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">3</span></span></span></span></span></span></span></span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">2^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8141em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mn>1</mn></msup></mrow><annotation encoding="application/x-tex">2^1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8141em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span></span></span></span></span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mn>0</mn></msup></mrow><annotation encoding="application/x-tex">2^0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8141em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span></span></span></span></span></span></span></span></span></td>
</tr>
</tbody>
</table>
<p>وحين نجمع هذه القوى للعدد 2 (أي <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mn>3</mn></msup><mo>+</mo><msup><mn>2</mn><mn>2</mn></msup><mo>+</mo><msup><mn>2</mn><mn>0</mn></msup></mrow><annotation encoding="application/x-tex">2^3 + 2^2 + 2^0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8974em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">3</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8974em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8141em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">0</span></span></span></span></span></span></span></span></span></span></span>) نحصل على 13.</p>
<p>لمزيد من الأمثلة والشروح عن الأعداد الثنائية، راجع شرائح المحاضرة 3.</p>
<h5>2.1.1) البتات الأقل أهمية (Least Significant Bits)</h5>
<p>التقنية الأكثر شيوعًا لتضمين صور سرّية هي استخدام <strong>البت الأقل أهمية (Least Significant Bit أو LSB)</strong> من كل قيمة بكسل. يمكننا تعديل الـLSB في كل بكسل من دون إحداث أي فرق ملحوظ. وبهذه الطريقة يمكن أن تحمل صورة صورةً سرّية أخرى غير مرئية تمامًا للعين المجرّدة.</p>
<p>ما هو البت الأقل أهمية؟</p>
<p>مثال: ما هو الـLSB للعدد 13؟ أوّلًا نحوّل التمثيل العشري إلى ثنائي كما سبق: <code>13 -&gt; 1101</code>. والـLSB هو الرقم في أقصى اليمين، وهو هنا 1. أمّا الـ3 LSBs (أقل ثلاثة بتات أهمية) فهي آخر ثلاثة أرقام، وهي هنا 101، وهو ما يساوي 5 في الأساس 10.</p>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> يرد في النص الأصلي عدم اتساق لفظي: فيُشار إلى أن «آخر ثلاثة بتات» هي «الرقمان في أقصى اليمين»، بينما العدد المذكور 101 من ثلاثة أرقام. والمقصود هو آخر ثلاثة بتات، أي 101، ويساوي 5 في الأساس 10. وقد نُقل المعنى الصحيح مع الإشارة هنا إلى عدم الاتساق في الأصل.</p>
</blockquote>
<h5>2.1.2) أسئلة للتفكير (Questions to Consider)</h5>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>ملاحظة: هذه الأسئلة ليست جزءًا من التكليف، وإنما هي لمساعدتك على التفكير في المشكلة. إن تعثّرت فاكتب على Piazza أو تعال إلى ساعات المكتب.</p>
</div>
<ol>
<li>إذا كان عدد ما قابلًا للقسمة على 2، فما قيمة الـLSB له؟ وأيٌّ من هذه الأعداد الثنائية يقبل القسمة على 2: <code>1001</code>، <code>10111</code>، <code>10110</code>، <code>111110</code>؟</li>
<li>كيف يمكننا الحصول على قيمة الـLSB من غير تحويل العدد من الأساس 10 إلى تمثيل ثنائي؟</li>
<li>هل العدد الثنائي <code>xxx00</code> (حيث يمكن أن يكون <code>x</code> صفرًا أو واحدًا) يقبل القسمة على 4؟ وإن كان كذلك، فلماذا؟</li>
<li>ما الباقي عند قسمة هذه الأعداد الثنائية على 4: <code>xxx01</code>، <code>xxx10</code>، <code>xxx11</code>؟</li>
<li>كيف يمكننا استخراج آخر بتين (آخر LSBs) من عدد في الأساس 10 من غير تحويله إلى ثنائي؟</li>
<li>كيف يمكننا استخراج آخر <code>n</code> بت من عدد في الأساس 10 من غير تحويله إلى ثنائي؟</li>
</ol>
<p>تأكّد أنك تفهم هذه الأسئلة قبل المتابعة. فهمها سيبسّط تنفيذك لدالة <code>extract_end_bits</code>.</p>
<h4>2.2) تنفيذ <code>extract_end_bits</code></h4>
<p>لاستخراج أي عدد من هذه الـLSBs من قيم البكسلات، ستنفّذ دالة مساعدة اسمها <code>extract_end_bits(num_end_bits, pixel)</code>. وستُخرج هذه الدالة آخر <code>num_end_bits</code> بت من <code>pixel</code> كعدد صحيح في الأساس 10.</p>
<p>المُعاملات (Parameters):</p>
<ul>
<li><code>num_end_bits</code>: عدد البتات التي يجب إعادتها.</li>
<li><code>pixel</code>: قيمة البكسل التي ستُعاد آخر بتات لها.</li>
</ul>
<p>ومثالًا، انطلاقًا من المثال أعلاه، يمكننا كتابة:</p>
<pre><code class="language-python">extract_end_bits(<span class="hljs-number">1</span>, <span class="hljs-number">13</span>) <span class="hljs-comment"># get one LSB -&gt; return 1</span>
extract_end_bits(<span class="hljs-number">2</span>, <span class="hljs-number">13</span>) <span class="hljs-comment"># get two LSBs -&gt; return 1</span>
extract_end_bits(<span class="hljs-number">3</span>, <span class="hljs-number">13</span>) <span class="hljs-comment"># get three LSBs -&gt; return 5</span>
</code></pre>
<p>تلميحات (Hints):</p>
<ul>
<li>لا تحوّل الأعداد إلى ثنائي.</li>
<li>يجب أن يكون تنفيذ هذه الدالة قصيرًا جدًا.</li>
<li>عند التفكير في كيفية تنفيذ <code>extract_end_bits</code>، قد يكون عامل الباقي <code>%</code> (Modulo) مفيدًا جدًا.</li>
</ul>
<p>يمكنك تشغيل <code>test_ps5_student.py</code> للتحقق من تنفيذك لدالة <code>extract_end_bits</code>.</p>
<h4>2.3) استرجاع صورة ثنائية (Recovering a Binary Image)</h4>
<p>في الصورة الثنائية (بالأسود والأبيض)، تمثَّل كل بكسل بقيمة عددية تمثّل شدّته (Intensity). القيمة الدنيا لكل بكسل هي 0 (والتي تمثّل الأسود)، بينما القيمة العليا (والتي تمثّل الأبيض) تعتمد على عدد البتات المستخدمة لكل بكسل. وفي أمثلتنا سنستخدم صورًا بعمق 8 بت. أي أن البكسلات يمكن أن تأخذ قيمًا بين 0 و255 شاملةً (هل ترى لماذا؟).</p>
<p>في ملف <code>ps5.py</code>، أكمل الجزء الخاص بالأبيض والأسود من الدالة <code>reveal_image</code> بتنفيذ <code>reveal_bw_image</code> وفقًا للـ<code>docstring</code>. تأخذ هذه الدالة اسم ملف صورة، وتستخدم قيمة الـLSB لإيجاد الصورة المخفية، وتُعيدها ككائن <code>PIL.Image</code>.</p>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>ملاحظة: يجب أن تكون <code>reveal_image</code> قادرة على التعامل مع صور BW وRGB معًا؛ وستنفّذ الجزء الخاص بـRGB في القسم 2.4.</p>
</div>
<p><strong>مهم:</strong> الصورة المخفية مضمَّنة في البت الأقل أهمية ويمكن استرجاعها باستخدام <code>extract_end_bits</code> مع المُعامل <code>num_bits</code> المناسب على كل قيمة بكسل. لكن استخدام النتيجة الخام من هذه العملية سينتج صورة ذات تباين (Contrast) منخفض جدًا. فبعد استرجاع المعلومات، عليك إجراء عملية أخرى لإعادة معايرة قيم البكسلات (Rescale) بحيث تستفيد من كامل نطاق القيم المتاحة.</p>
<p>في مجلد مجموعة المسائل ستجد صورة اسمها <code>hidden1.bmp</code>. باستخدام دالتك، اعثر على الصورة السرّية في هذا الملف واحفظ نسخة منها مستعينًا بوظائف مكتبة PIL. لاحظ: صورة تدرّج الرمادي (Grayscale) يجب أن تكون الصورة السرّية فيها تدرّج رماديًا أيضًا. وتذكّر اسم الملف الذي اخترته لأنك ستحتاج اسم الملف بعد قليل.</p>
<h5>2.3.1) أسئلة للتفكير</h5>
<div class="callout callout--note">
<p><strong>ملاحظة</strong></p>
<p>ملاحظة: هذه الأسئلة ليست جزءًا من التكليف، وإنما هي لمساعدتك على التفكير في المشكلة. إن تعثّرت فاكتب على Piazza أو تعال إلى ساعات المكتب.</p>
</div>
<ol>
<li>ما الأعداد في الأساس 10 التي يمكن تمثيلها في بت واحد؟ وفي بتّين؟</li>
<li>ما نطاق قيم بكسل BW (أو عنصر في بكسل RGB)؟</li>
<li>كيف يمكننا إعادة معايرة قيم الـLSB للاستفادة من نطاق البكسل؟</li>
</ol>
<h4>2.4) استرجاع صورة ملوّنة (Recovering a Color Image)</h4>
<p>الأساليب الموصوفة أعلاه متينة بما يكفي لتطبيقها على بتات أكثر. وفي هذا القسم ستعمل مع صورة RGB وتستخدم ثلاثة أقل بتات أهمية لاسترجاع الصورة السرّية.</p>
<p>في ملف <code>ps5.py</code>، أكمل المكوّن المناسب من الدالة <code>reveal_image</code> بتنفيذ <code>reveal_color_image</code> وفقًا للـ<code>docstring</code> الخاص بها. بالنسبة للصورة الملوّنة، تأخذ هذه الدالة اسم الملف، وتستخرج الصورة السرّية من أقل ثلاث بتات في كل قناة (الأحمر والأخضر والأزرق)، وتُعيدها ككائن <code>PIL.Image</code>. وستحتاج مجددًا إلى إعادة معايرة البكسلات.</p>
<p>في مجلد مجموعة المسائل ستجد صورة اسمها <code>hidden2.bmp</code>. باستخدام دالتك، اعثر على الصورة السرّية في هذا الملف واحفظ نسخة منها مستعينًا بوظائف مكتبة PIL. وتذكّر اسم الملف الذي اخترته لأنك ستحتاج اسم الملف بعد قليل.</p>
<h4>2.5) اجعل فنّك خاصًا بك (Making Your Art Your Own)</h4>
<p>في هذه المرحلة يجب أن تكون قد حصلت على ثلاث صور جديدة:</p>
<ol>
<li>الصورة بعد الترشيح: <code>image_15.png</code></li>
<li>الصورة بعد كشفها: <code>hidden1.bmp</code></li>
<li>الصورة بعد كشفها: <code>hidden2.bmp</code></li>
</ol>
<p>باستخدام الدالة المساعدة المقدَّمة <code>draw_kerb</code>، مرّر كل صورك من هذه الدالة لتضيف <strong>علامة «كيربيروس» (Kerberos Watermark)</strong> الخاصة بك على كل واحدة منها.</p>
<p>ولتساعدك على البدء: إن كانت لديك صورة اسمها <code>img1.png</code> وكان اسم «كيربيروس» الخاص بك هو <code>timthebeaver</code>، فيمكنك استدعاء:</p>
<pre><code class="language-python">draw_kerb(<span class="hljs-string">&quot;img1.png&quot;</span>, <span class="hljs-string">&quot;timthebeaver)&quot;</span>
</code></pre>
<p>والذي سيُنتج صورة في مجلدك اسمها <code>img1_kerb.png</code>.</p>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> أعلاه مقتبس حرفيًا من النشرة الأصلية بما فيه قوس إغلاق ناقص في السلسلة النصية. نُقل كما هو من غير تصحيح لأن النص جزء من النص النمطي للتمرين.</p>
</blockquote>
<p>وحالما تصبح لديك الصور الثلاث وعليها علامة كيربيروس، اجمعها في ملف PDF واحد للتسليم. يمكنك استخدام أداة مثل أداة دمج ملفات PDF لإنجاز ذلك. وينبغي أن تتمكّن من رفع الثلاث صور بصيغها الأصلية لتُخرج لك ملف PDF واحدًا تسلّمه.</p>
<div class="callout callout--warning">
<p><strong>تحذير</strong></p>
<p><strong>مهم:</strong> قبل رفع كودك إلى الموقع، علّق (Comment out) استدعاءات دالة <code>draw_kerb</code> حتى لا تعطّل أداة التصحيح الآلي!</p>
</div>
<h2 id="3-إجراءات-التسليم-hand-in-procedure">3) إجراءات التسليم (Hand-in Procedure)</h2>
<h3 id="31-معلومات-الوقت-والتعاون">3.1) معلومات الوقت والتعاون</h3>
<p>في بداية كل ملف، اكتب في تعليق أسماء من تعاونت معهم. مثال:</p>
<pre><code class="language-python"><span class="hljs-comment"># Problem Set 5</span>
<span class="hljs-comment"># Name: Jane Lee</span>
<span class="hljs-comment"># Collaborators: John Doe</span>
</code></pre>
<p>يُرجى تقدير عدد الساعات التي قضيتها في مجموعة المسائل في مربّع الإجابة أدناه.</p>
<h3 id="32-التسليم-في-منتصف-الطريق-half-way-submission">3.2) التسليم في منتصف الطريق (Half-way Submission)</h3>
<p>ينبغي لجميع الطلاب تسليم تقدّمهم بحلول موعد التسليم في منتصف الطريق (أسبوع واحد قبل الموعد النهائي).</p>
<p>هذا التسليم يستحق نقطة واحدة من درجة المجموعة، ولن يُصحَّح من حيث الصحة. والغرض منه التأكّد من أنك تتقدّم في المجموعة بانتظام بدلًا من العمل عليها في الأيام الأخيرة قبل الموعد.</p>
<p>يمكنك رفع نسخ جديدة من كل ملف حتى 30 نوفمبر الساعة 09:00 مساءً. ولا يمكنك استخدام تمديدات أو أيام تأخّر في هذا التسليم.</p>
<p>يُرجى تحديث الصفحة قبل رفع ملف جديد. إذا لم تفعل فلن يتم تحديث آخر تسليم لك.</p>
<h3 id="33-التسليم-النهائي-submission">3.3) التسليم النهائي (Submission)</h3>
<p>تأكّد من تشغيل أداة الاختبار الخاصة بالطالب وأن جميع الاختبارات تنجح.</p>
<p>سلّم شيفرة بايثون <strong>و</strong> ملف صور الـPDF أدناه.</p>
<p>تأكّد من رفع ملف <code>.py</code> وملف <code>.pdf</code> في مربّعي التسليم.</p>
<p>يمكنك رفع نسخ جديدة حتى 7 ديسمبر الساعة 09:00 مساءً، لكن أي شيء يُرفع بعد ذلك الوقت سيُحسب ضمن أيام التأخّر، إن كانت لديك أيّ أيام تأخّر متبقية. وإذا لم تكن لديك أي أيام تأخّر متبقية، فلن تحصل على أي درجة لتسليم متأخّر.</p>
<h4>3.3.1) تسليم شيفرة بايثون (Python Submission)</h4>
<p>اختر ملفًا: <code>Select File</code> — لم يُحدَّد أي ملف — <code>Submit</code> — «تبقّى لك عدد لا نهائي من مرات التسليم».</p>
<h4>3.3.2) تسليم ملف صور الـPDF (Images PDF Submission)</h4>
<p>اختر ملفًا: <code>Select File</code> — لم يُحدَّد أي ملف — <code>Submit</code> — «تبقّى لك عدد لا نهائي من مرات التسليم».</p>
<h2 id="المصدر-والنسب-والترخيص">المصدر والنَّسب والترخيص</h2>
<p>المصدر: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ps5_pdf/">تعليمات PS 5 الرسمية</a>، <code>extracted/mit6_100l_f22_ps5.txt</code>. ترجمة عربية لجميع التعليمات مع إبقاء الكود والمخرجات النموذجية دون ترجمة حتى تبقى نافعة للاختبار. المواعيد تاريخية.</p>
<p><strong>استثناءات الأطراف الثالثة:</strong> صور الاختباء الشفاف في القسم 2 (© Cyp على ويكيبيديا الإنجليزية، CC-BY-SA) <strong>مستثناة صراحةً من ترخيص MIT</strong> ولم تُنشر هنا؛ وكذلك لم تُنشر صور المقارنة في القسم 1.1.3. ولم يُخمَّن أي محتوى بديل. كما لم يُنشر ملف الاختبار <code>test_ps5_student.py</code> ولا الحزمة الأصلية في <code>static/</code>.</p>
<p>النَّسب: <strong>Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare.</strong> <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/">المقرر الأصلي</a>. المواد المملوكة لـ MIT وهذه الترجمة بموجب <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>: النَّسب، غير تجاري، المشاركة بالمثل. ترجمة غير رسمية لا تعني اعتماد MIT. <a href="https://ocw.mit.edu/pages/privacy-and-terms-of-use/">شروط الاستخدام</a>.</p>
`,i={book:s,chapter:n,chapterTitle:e,slug:"ps5",title:a,headings:t,html:p};export{s as book,n as chapter,e as chapterTitle,i as default,t as headings,p as html,o as slug,a as title};
