const s="hello-algo",a="chapter_data_structure",n="بنى البيانات",t="basic_data_types",p="أنواع البيانات الأساسية",e=[],l=`<p>عندما نتحدث عن البيانات المخزَّنة في الحواسيب، يخطر في ذهننا أشكال متنوعة مثل النصوص والصور والفيديوهات والصوتيات والنماذج ثلاثية الأبعاد وغيرها. ورغم أن هذه الأنواع من البيانات تُنظَّم بطرق مختلفة، فإنها جميعاً تتكون من أنواع بيانات أساسية متنوعة.</p>
<p><strong>أنواع البيانات الأساسية هي أنواع يمكن لوحدة المعالجة المركزية (CPU) التعامل معها مباشرة</strong>، وتُستخدم مباشرة في الخوارزميات، وتشمل أساساً ما يلي.</p>
<ul>
<li>أنواع الأعداد الصحيحة <code>byte</code> و<code>short</code> و<code>int</code> و<code>long</code>.</li>
<li>أنواع الأعداد العشرية (floating-point) <code>float</code> و<code>double</code>، وتُستخدم لتمثيل الأعداد ذات الفاصلة العشرية.</li>
<li>نوع المحرف <code>char</code>، ويُستخدم لتمثيل الحروف وعلامات الترقيم وحتى الرموز التعبيرية في مختلف اللغات.</li>
<li>النوع المنطقي <code>bool</code>، ويُستخدم لتمثيل أحكام «نعم» و«لا».</li>
</ul>
<p><strong>تُخزَّن أنواع البيانات الأساسية في الحواسيب بالصيغة الثنائية</strong>. وخانة الرقم الثنائي الواحدة هي بت واحد. وفي معظم أنظمة التشغيل الحديثة، يتكون البايت الواحد من <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">8</span></span></span></span> بتات.</p>
<p>يعتمد نطاق قيم أنواع البيانات الأساسية على حجم المساحة التي تشغلها. وفيما يلي مثال بلغة Java.</p>
<ul>
<li>النوع الصحيح <code>byte</code> يشغل <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> بايت = <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">8</span></span></span></span> بتات، ويمكنه تمثيل <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8141em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">8</span></span></span></span></span></span></span></span></span></span></span></span> عدداً.</li>
<li>النوع الصحيح <code>int</code> يشغل <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">4</span></span></span></span> بايتات = <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">32</span></span></span></span> بتاً، ويمكنه تمثيل <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8141em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">32</span></span></span></span></span></span></span></span></span></span></span></span> عدداً.</li>
</ul>
<p>يسرد الجدول التالي المساحة المشغولة ونطاقات القيم والقيم الافتراضية لمختلف أنواع البيانات الأساسية في Java. لست بحاجة إلى حفظ هذا الجدول؛ يكفي فهم عام له، ويمكنك الرجوع إليه عند الحاجة.</p>
<p align="center"> جدول <id> &nbsp; المساحة المشغولة ونطاقات القيم لأنواع البيانات الأساسية </p>
<table>
<thead>
<tr>
<th>النوع</th>
<th>الرمز</th>
<th>المساحة المشغولة</th>
<th>القيمة الدنيا</th>
<th>القيمة العظمى</th>
<th>القيمة الافتراضية</th>
</tr>
</thead>
<tbody>
<tr>
<td>عدد صحيح</td>
<td><code>byte</code></td>
<td>1 بايت</td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8974em;vertical-align:-0.0833em;"></span><span class="mord">−</span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">7</span></span></span></span></span></span></span></span></span></span></span> (<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">−</span><span class="mord">128</span></span></span></span>)</td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8974em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">7</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> (<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">127</span></span></span></span>)</td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span></td>
</tr>
<tr>
<td></td>
<td><code>short</code></td>
<td>2 بايت</td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8974em;vertical-align:-0.0833em;"></span><span class="mord">−</span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">15</span></span></span></span></span></span></span></span></span></span></span></span></td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8974em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">15</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span></td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span></td>
</tr>
<tr>
<td></td>
<td><code>int</code></td>
<td>4 بايت</td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8974em;vertical-align:-0.0833em;"></span><span class="mord">−</span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">31</span></span></span></span></span></span></span></span></span></span></span></span></td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8974em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">31</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span></td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span></td>
</tr>
<tr>
<td></td>
<td><code>long</code></td>
<td>8 بايت</td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8974em;vertical-align:-0.0833em;"></span><span class="mord">−</span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">63</span></span></span></span></span></span></span></span></span></span></span></span></td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8974em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">63</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span></td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span></td>
</tr>
<tr>
<td>عدد عشري</td>
<td><code>float</code></td>
<td>4 بايت</td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1.175</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8141em;"></span><span class="mord">1</span><span class="mord"><span class="mord">0</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">−</span><span class="mord mtight">38</span></span></span></span></span></span></span></span></span></span></span></span></td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">3.403</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8141em;"></span><span class="mord">1</span><span class="mord"><span class="mord">0</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">38</span></span></span></span></span></span></span></span></span></span></span></span></td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord">0.0</span><span class="mord text"><span class="mord">f</span></span></span></span></span></td>
</tr>
<tr>
<td></td>
<td><code>double</code></td>
<td>8 بايت</td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">2.225</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8141em;"></span><span class="mord">1</span><span class="mord"><span class="mord">0</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">−</span><span class="mord mtight">308</span></span></span></span></span></span></span></span></span></span></span></span></td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1.798</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8141em;"></span><span class="mord">1</span><span class="mord"><span class="mord">0</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">308</span></span></span></span></span></span></span></span></span></span></span></span></td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0.0</span></span></span></span></td>
</tr>
<tr>
<td>محرف</td>
<td><code>char</code></td>
<td>2 بايت</td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span></td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8974em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">16</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span></td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span></td>
</tr>
<tr>
<td>منطقي</td>
<td><code>bool</code></td>
<td>1 بايت</td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord text"><span class="mord">false</span></span></span></span></span></td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6151em;"></span><span class="mord text"><span class="mord">true</span></span></span></span></span></td>
<td><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord text"><span class="mord">false</span></span></span></span></span></td>
</tr>
</tbody>
</table>
<p>يرجى ملاحظة أن الجدول أعلاه ينطبق تحديداً على أنواع البيانات الأساسية في Java. ولكل لغة برمجة تعريفاتها الخاصة للأنواع، وقد تختلف مساحتها ونطاقات قيمها وقيمها الافتراضية.</p>
<ul>
<li>في Python، يمكن أن يكون النوع الصحيح <code>int</code> بأي حجم، ولا يحدّه إلا الذاكرة المتاحة؛ والنوع العشري <code>float</code> مزدوج الدقة بطول 64 بت؛ ولا يوجد نوع <code>char</code>، فالمحرف الواحد هو في الواقع سلسلة نصية <code>str</code> بطول 1.</li>
<li>لا تحدد لغتا C وC++ حجم أنواع البيانات الأساسية تحديداً صريحاً، بل يختلف ذلك حسب التنفيذ والمنصة. ويتبع الجدول أعلاه <a href="https://en.cppreference.com/w/cpp/language/types#Properties">نموذج البيانات</a> LP64، المستخدم في أنظمة تشغيل Unix 64 بت بما فيها Linux وmacOS.</li>
<li>حجم المحرف <code>char</code> هو 1 بايت في C وC++، وفي معظم لغات البرمجة يعتمد على طريقة ترميز المحارف المحددة، كما هو مفصل في قسم «ترميز المحارف».</li>
<li>رغم أن تمثيل قيمة منطقية لا يحتاج إلا إلى 1 بت (<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span> أو <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>)، فإنها تُخزَّن عادةً في الذاكرة بايتاً واحداً. ذلك لأن وحدات المعالجة المركزية الحديثة تستخدم البايت الواحد عادةً أصغر وحدة ذاكرة قابلة للعنونة.</li>
</ul>
<p>فما العلاقة بين أنواع البيانات الأساسية وبنى البيانات؟ نعلم أن بنى البيانات طرق لتنظيم البيانات وتخزينها في الحواسيب. والتشديد هنا على «البنية» وليس على «البيانات».</p>
<p>إذا أردنا تمثيل «صف من الأعداد»، نميل بطبيعتنا إلى استخدام مصفوفة. ذلك لأن البنية الخطية للمصفوفة يمكن أن تمثل علاقات التجاور والترتيب بين الأعداد، أما ما إذا كان المحتوى المخزَّن عدداً صحيحاً <code>int</code> أو عدداً عشرياً <code>float</code> أو محرفاً <code>char</code> فأمر لا علاقة له بـ«بنية البيانات».</p>
<p>وبعبارة أخرى، <strong>توفر أنواع البيانات الأساسية «نوع المحتوى» للبيانات، بينما توفر بنى البيانات «طريقة التنظيم» للبيانات</strong>. وعلى سبيل المثال، في الشيفرة التالية نستخدم بنية البيانات نفسها (المصفوفة) لتخزين أنواع بيانات أساسية مختلفة وتمثيلها، بما فيها <code>int</code> و<code>float</code> و<code>char</code> و<code>bool</code> وغيرها.</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">// هيّئ المصفوفات باستخدام أنواع بيانات أساسية متنوعة</span>
<span class="hljs-keyword">var</span> numbers = [<span class="hljs-number">5</span>]<span class="hljs-type">int</span>{}
<span class="hljs-keyword">var</span> decimals = [<span class="hljs-number">5</span>]<span class="hljs-type">float64</span>{}
<span class="hljs-keyword">var</span> characters = [<span class="hljs-number">5</span>]<span class="hljs-type">byte</span>{}
<span class="hljs-keyword">var</span> bools = [<span class="hljs-number">5</span>]<span class="hljs-type">bool</span>{}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-comment">// هيّئ المصفوفات باستخدام أنواع بيانات أساسية متنوعة</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">numbers</span>: <span class="hljs-built_in">number</span>[] = [];
<span class="hljs-keyword">const</span> <span class="hljs-attr">characters</span>: <span class="hljs-built_in">string</span>[] = [];
<span class="hljs-keyword">const</span> <span class="hljs-attr">bools</span>: <span class="hljs-built_in">boolean</span>[] = [];
</code></pre>
</div>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:p,headings:e,html:l};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,l as html,t as slug,p as title};
