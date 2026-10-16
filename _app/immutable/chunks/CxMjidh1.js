const s="mooc",n="part-10",a="الجزء 10: تراكيب الأصناف",e="2-access-modifiers",l="مُعدِّلات الوصول",t=[{depth:2,id:"الخصائص-المحمية",text:"الخصائص المحمية"}],p=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستفهم مُعدِّلات الوصول الخاصة والمحمية</li>
<li>ستعرف كيف تُحدَّد مرئية الخصائص في Python</li>
</ul>
</blockquote>
<p>إذا عُرِّفت خاصية على أنها خاصة (private) في الصنف الأساسي، فلم تعد متاحة مباشرة في أي من الأصناف المشتقّة، كما أُشير إليه بإيجاز في القسم السابق. لننظر إلى مثال. في الصنف <code>Notebook</code> أدناه تُخزَّن الملاحظات في قائمة، والخاصية <code>notes</code> خاصة:</p>
<pre><code class="language-python">
<span class="hljs-keyword">class</span> <span class="hljs-title class_">Notebook</span>:
    <span class="hljs-string">&quot;&quot;&quot; A Notebook stores notes in string format &quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># private attribute</span>
        <span class="hljs-variable language_">self</span>.__notes = []

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_note</span>(<span class="hljs-params">self, note</span>):
        <span class="hljs-variable language_">self</span>.__notes.append(note)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">retrieve_note</span>(<span class="hljs-params">self, index</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.__notes[index]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">all_notes</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;,&quot;</span>.join(<span class="hljs-variable language_">self</span>.__notes)

</code></pre>
<p>إذا كان تماسك الصنف هو ما يهمّ، فإن جعل الخاصية <code>notes</code> الخاصة يبدو منطقيًّا. ففي نهاية المطاف يوفّر الصنف للعميل توابع مناسبة لإضافتها إلى الملاحظات واستعراضها. ويصبح هذا النهج مُشكِلًا إذا عرّفنا صنفًا جديدًا <code>NotebookPro</code> يرث الصنف <code>Notebook</code>. فالخاصية <code>notes</code> الخاصة غير متاحة للعميل، لكنها كذلك غير متاحة للأصناف المشتقّة. وإذا حاولنا الوصول إليها، كما في التابع <code>find_notes</code> أدناه، ظهر لنا خطأ:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">NotebookPro</span>(<span class="hljs-title class_ inherited__">Notebook</span>):
    <span class="hljs-string">&quot;&quot;&quot; A better Notebook with search functionality &quot;&quot;&quot;</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># This is OK, the constructor is public despite the underscores</span>
        <span class="hljs-built_in">super</span>().__init__()

    <span class="hljs-comment"># This causes an error</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">find_notes</span>(<span class="hljs-params">self, search_term</span>):
        found = []
        <span class="hljs-comment"># the attribute __notes is private</span>
        <span class="hljs-comment"># the derived class can&#x27;t access it directly</span>
        <span class="hljs-keyword">for</span> note <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.__notes:
            <span class="hljs-keyword">if</span> search_term <span class="hljs-keyword">in</span> note:
                found.append(note)

        <span class="hljs-keyword">return</span> found
</code></pre>
<pre><code>AttributeError: 'NotebookPro' object has no attribute '_NotebookPro__notes'
</code></pre>
<h2 id="الخصائص-المحمية">الخصائص المحمية</h2>
<p>تمتلك كثير من لغات البرمجة الكائنية ميزة، عادةً ما تكون كلمة مفتاحية خاصة، لـ_حماية_ الخصائص. وهذا يعني أنه ينبغي إخفاء الخاصية عن عملاء الصنف مع إبقاؤها متاحة لأصنافه الفرعية. وتنفر Python عمومًا من الكلمات المفتاحية، لذا لا تتوفر مثل هذه الميزة على نحو مباشر في Python. وبدلاً من ذلك، هناك <em>اصطلاح</em> لتعليم الخصائص المحمية بطريقة معيّنة.</p>
<p>تذكّر أنه يمكن إخفاء خاصية بوضع شرطتين سفليتين قبل اسمها:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
    <span class="hljs-variable language_">self</span>.__notes = []
</code></pre>
<p>والاصطلاح المتفق عليه لـ_حماية_ خاصية هو وضع شرطة سفلية <em>واحدة</em> قبل الاسم. وهذا <em>فقط</em> اصطلاح. ولا شيء يمنع المبرمج من خرق هذا الاصطلاح، لكنه يُعتبر ممارسة برمجية سيئة.</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
    <span class="hljs-variable language_">self</span>._notes = []
</code></pre>
<p>أدناه المثال الكامل على Notebook، باستخدام الخاصية المحمية <code>_notes</code> بدلًا من الخاصة <code>__notes</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Notebook</span>:
    <span class="hljs-string">&quot;&quot;&quot; A Notebook stores notes in string format &quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># protected attribute</span>
        <span class="hljs-variable language_">self</span>._notes = []

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_note</span>(<span class="hljs-params">self, note</span>):
        <span class="hljs-variable language_">self</span>._notes.append(note)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">retrieve_note</span>(<span class="hljs-params">self, index</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._notes[index]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">all_notes</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;,&quot;</span>.join(<span class="hljs-variable language_">self</span>._notes)

<span class="hljs-keyword">class</span> <span class="hljs-title class_">NotebookPro</span>(<span class="hljs-title class_ inherited__">Notebook</span>):
    <span class="hljs-string">&quot;&quot;&quot; A better Notebook with search functionality &quot;&quot;&quot;</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># This is OK, the constructor is public despite the underscores</span>
        <span class="hljs-built_in">super</span>().__init__()

    <span class="hljs-comment"># This works, the protected attribute is accessible to the derived class</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">find_notes</span>(<span class="hljs-params">self, search_term</span>):
        found = []
        <span class="hljs-keyword">for</span> note <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>._notes:
            <span class="hljs-keyword">if</span> search_term <span class="hljs-keyword">in</span> note:
                found.append(note)

        <span class="hljs-keyword">return</span> found

</code></pre>
<p>أدناه جدول مفيد لمرئية الخصائص باختلاف مُعدِّلات الوصول:</p>
<table>
<thead>
<tr>
<th style="text-align:center">مُعدِّل الوصول</th>
<th style="text-align:center">مثال</th>
<th style="text-align:center">مرئي للعميل</th>
<th style="text-align:center">مرئي للصنف المشتق</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">عام</td>
<td style="text-align:center"><code>self.name</code></td>
<td style="text-align:center">نعم</td>
<td style="text-align:center">نعم</td>
</tr>
<tr>
<td style="text-align:center">محمي</td>
<td style="text-align:center"><code>self._name</code></td>
<td style="text-align:center">لا</td>
<td style="text-align:center">نعم</td>
</tr>
<tr>
<td style="text-align:center">خاص</td>
<td style="text-align:center"><code>self.__name</code></td>
<td style="text-align:center">لا</td>
<td style="text-align:center">لا</td>
</tr>
</tbody>
</table>
<p>تعمل مُعدِّلات الوصول بالطريقة نفسها مع كل الخصائص. فمثلًا، في الصنف <code>Person</code> أدناه لدينا التابع المحمي <code>capitalize_initials</code>. ويمكن استخدامه من الصنف المشتق <code>Footballer</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Person</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>._name = <span class="hljs-variable language_">self</span>._capitalize_initials(name)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_capitalize_initials</span>(<span class="hljs-params">self, name</span>):
        name_capitalized = []
        <span class="hljs-keyword">for</span> n <span class="hljs-keyword">in</span> name.split(<span class="hljs-string">&quot; &quot;</span>):
            name_capitalized.append(n.capitalize())

        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot; &quot;</span>.join(name_capitalized)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__repr__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.__name

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Footballer</span>(<span class="hljs-title class_ inherited__">Person</span>):

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, nickname: <span class="hljs-built_in">str</span>, position: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-built_in">super</span>().__init__(name)
        <span class="hljs-comment"># the method is available as it is protected in the base class</span>
        <span class="hljs-variable language_">self</span>.__nickname = <span class="hljs-variable language_">self</span>._capitalize_initials(nickname)
        <span class="hljs-variable language_">self</span>.__position = position

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__repr__</span>(<span class="hljs-params">self</span>):
        r =  <span class="hljs-string">f&quot;Footballer - name: <span class="hljs-subst">{self._name}</span>, nickname: <span class="hljs-subst">{self.__nickname}</span>&quot;</span>
        r += <span class="hljs-string">f&quot;, position: <span class="hljs-subst">{self.__position}</span>&quot;</span>
        <span class="hljs-keyword">return</span> r

<span class="hljs-comment"># Test the classes</span>
<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    jp = Footballer(<span class="hljs-string">&quot;peter pythons&quot;</span>, <span class="hljs-string">&quot;pyper&quot;</span>, <span class="hljs-string">&quot;forward&quot;</span>)
    <span class="hljs-built_in">print</span>(jp)

</code></pre>
<pre><code>Footballer - name: Peter Pythons, nickname: Pyper, position: forward
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: المجموعة الفائقة</strong></p>
<p>يحتوي قالب التمرين على تعريف صنف <code>SuperHero</code>.</p>
</blockquote>
<p>يُرجى تعريف صنف اسمه <code>SuperGroup</code> يمثّل مجموعة من الأبطال الخارقين. وينبغي أن يحتوي الصنف على الأعضاء التالية:</p>
<ul>
<li>خصائص <strong>محمية</strong> هي name (str)، وlocation (str)، وmembers (list)</li>
<li>باني يأخذ اسم المجموعة وموقعها كوسيطين، بهذا الترتيب</li>
<li>توابع جلب (getter) للخاصيتين name وlocation</li>
<li>تابع اسمه <code>add_member(hero: SuperHero)</code> يضيف عضوًا جديدًا إلى المجموعة</li>
<li>تابع اسمه <code>print_group</code> يطبع معلومات عن المجموعة وأعضائها، وفقًا للصيغة المحدّدة أدناه</li>
</ul>
<p>مثال على عمل هذا الصنف:</p>
<pre><code class="language-python">superperson = SuperHero(<span class="hljs-string">&quot;SuperPerson&quot;</span>, <span class="hljs-string">&quot;Superspeed, superstrength&quot;</span>)
invisible = SuperHero(<span class="hljs-string">&quot;Invisible Inca&quot;</span>, <span class="hljs-string">&quot;Invisibility&quot;</span>)
revengers = SuperGroup(<span class="hljs-string">&quot;Revengers&quot;</span>, <span class="hljs-string">&quot;Emerald City&quot;</span>)

revengers.add_member(superperson)
revengers.add_member(invisible)
revengers.print_group()
</code></pre>
<pre><code>Revengers, Emerald City
Members:
SuperPerson, superpowers: Superspeed, superstrength
Invisible Inca, superpowers: Invisibility
</code></pre>
<p>إذا احتجت إلى تذكير بتوابع الجلب والوضع، يُرجى الاطلاع على <a href="/arabic-cs-library/book/mooc/part-9/3-encapsulation#getters-and-setters">هذا القسم من الجزء السابق</a> من المادّة.</p>
<blockquote>
<p><strong>تمرين برمجي: الجرعة السحرية السرية</strong></p>
<p>يحتوي قالب التمرين على تعريف صنف <code>MagicPotion</code> يتيح لك حفظ وصفة لجرعة سحرية. ويتضمن تعريف الصنف بانيًا إلى جانب التوابع التالية</p>
</blockquote>
<ul>
<li><code>add_ingredient(ingredient: str, amount: float)</code> و</li>
<li><code>print_recipe()</code></li>
</ul>
<p>يُرجى تعريف صنف اسمه <code>SecretMagicPotion</code> يرث الصنف <code>MagicPotion</code> ويتيح لك أيضًا حماية الوصفة بكلمة مرور.</p>
<p>ينبغي أن يمتلك الصنف الجديد بانيًا يأخذ السلسلة النصية لكلمة المرور كوسيط أيضًا.</p>
<p>ينبغي أيضًا أن يحتوي الصنف على التوابع التالية:</p>
<ul>
<li><code>add_ingredient(ingredient: str, amount: float, password: str)</code></li>
<li><code>print_recipe(password: str)</code></li>
</ul>
<p>إذا كانت قيمة وسيط كلمة المرور المُعطاة لأيٍّ من هذين التوابع خاطئة، فيجب على التوابع رفع استثناء <code>ValueError</code>.</p>
<p>وإذا كانت كلمة المرور صحيحة، فيجب على كل تابع استدعاء التابع المعني في الصنف الأب. لا تنسخ ولا تلصق أي شيء من صنف MagicPotion.</p>
<p>مثال على كيفية عمل هذا:</p>
<pre><code class="language-python">diminuendo = SecretMagicPotion(<span class="hljs-string">&quot;Diminuendo maximus&quot;</span>, <span class="hljs-string">&quot;hocuspocus&quot;</span>)
diminuendo.add_ingredient(<span class="hljs-string">&quot;Toadstool&quot;</span>, <span class="hljs-number">1.5</span>, <span class="hljs-string">&quot;hocuspocus&quot;</span>)
diminuendo.add_ingredient(<span class="hljs-string">&quot;Magic sand&quot;</span>, <span class="hljs-number">3.0</span>, <span class="hljs-string">&quot;hocuspocus&quot;</span>)
diminuendo.add_ingredient(<span class="hljs-string">&quot;Frogspawn&quot;</span>, <span class="hljs-number">4.0</span>, <span class="hljs-string">&quot;hocuspocus&quot;</span>)
diminuendo.print_recipe(<span class="hljs-string">&quot;hocuspocus&quot;</span>)

diminuendo.print_recipe(<span class="hljs-string">&quot;pocushocus&quot;</span>) <span class="hljs-comment"># WRONG password!</span>
</code></pre>
<pre><code>Diminuendo maximus:
Toadstool 1.5 grams
Magic sand 3.0 grams
Frogspawn 4.0 grams
Traceback (most recent call last):
  File &quot;secret_magic_potion.py&quot;, line 98, in &lt;module&gt;
    raise ValueError(&quot;Wrong password!&quot;)
ValueError: Wrong password!
</code></pre>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:l,headings:t,html:p};export{s as book,n as chapter,a as chapterTitle,o as default,t as headings,p as html,e as slug,l as title};
