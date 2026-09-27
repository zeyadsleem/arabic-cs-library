const s="effective-go",e="semicolons",n="الفواصل المنقوطة",o="index",c="الفواصل المنقوطة",a=[],p=`<p>مثل C، تستخدم القواعد الرسمية لـ Go الفواصل المنقوطة لإنهاء الجمل، لكن بخلاف C، لا تظهر هذه الفواصل في المصدر. بدلًا من ذلك، يستعمل المُحلِّل (lexer) قاعدة بسيطة لإدراج الفواصل المنقوطة تلقائيًا أثناء المسح، فيخلو نصّ الإدخال منهما في معظمه.</p>
<p>والقاعدة هي هذه: إذا كان آخر رمز قبل سطر جديد هو مُعرِّفًا (identifier) — الذي يشمل كلمات مثل <code>int</code> و<code>float64</code> — أو قيمة أساسية (basic literal) مثل عدد أو ثابت نصي، أو أحد الرموز</p>
<pre><code class="language-text">break continue fallthrough return ++ -- ) }
</code></pre>
<p>فإن المُحلِّل يُدرِج فاصلة منقوطة دائمًا بعد ذلك الرمز. ويمكن اختصار القاعدة في: «إذا جاء سطرٌ جديد بعد رمز قادر على إنهاء جملة، فأدرج فاصلة منقوطة».</p>
<p>ويمكن كذلك حذف الفاصلة المنقوطة مباشرةً قبل قوس إغلاق، فجملة مثل</p>
<pre><code class="language-go"><span class="hljs-keyword">go</span> <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span></span> { <span class="hljs-keyword">for</span> { dst &lt;- &lt;-src } }()
</code></pre>
<p>لا تحتاج إلى فواصل منقوطة.</p>
<p>والبرامج المتّبعة لأعراف Go لا توجد فيها الفواصل المنقوطة إلا في مواضع مثل بنود حلقة <code>for</code>، حيث تفصل بين عنصر التهيئة وعنصر الشرط وعنصر المتابعة. وهي ضرورية أيضًا لفصل جمل متعددة في السطر الواحد، إن كتبت شيفرة على هذا النحو.</p>
<p>وإحدى نتائج قواعد إدراج الفواصل المنقوطة أنك لا تستطيع وضع قوس الافتتاح لبنية تحكم — <code>if</code> أو <code>for</code> أو <code>switch</code> أو <code>select</code> — في السطر التالي. ففعل ذلك سيُدرِج فاصلة منقوطة قبل القوس، وقد ينتج عن ذلك آثار غير مقصودة. فاكتبها هكذا:</p>
<pre><code class="language-go"><span class="hljs-keyword">if</span> i &lt; f() {
    g()
}
</code></pre>
<p>وليس هكذا:</p>
<pre><code class="language-go"><span class="hljs-keyword">if</span> i &lt; f()  <span class="hljs-comment">// خطأ!</span>
{           <span class="hljs-comment">// خطأ!</span>
    g()
}
</code></pre>
`,l={book:s,chapter:e,chapterTitle:n,slug:o,title:c,headings:a,html:p};export{s as book,e as chapter,n as chapterTitle,l as default,a as headings,p as html,o as slug,c as title};
