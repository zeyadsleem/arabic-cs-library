const n="mit-6100l",s="lecture-03",a="المحاضرة 3: التكرار (Iteration)",e="exercises",t="المحاضرة 3: التمرين القصير وحلّه والشيفرة الأصلية",o=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"صفحة-المصدر-1-التمارين-القصيرة-للمحاضرة-3",text:"صفحة المصدر 1: التمارين القصيرة للمحاضرة 3"},{depth:3,id:"1-السؤال-1-من-1",text:"1) السؤال 1 من 1"},{depth:2,id:"صفحة-المصدر-2-بيانات-المقرر",text:"صفحة المصدر 2: بيانات المقرر"},{depth:2,id:"ترجمة-تعليمات-ملف-شيفرة-المحاضرة",text:"ترجمة تعليمات ملف شيفرة المحاضرة"},{depth:3,id:"تدريب-منزلي-1",text:"تدريب منزلي 1"},{depth:3,id:"تدريب-منزلي-2",text:"تدريب منزلي 2"},{depth:2,id:"ملف-python-الأصلي-كاملا-دون-تغيير",text:"ملف Python الأصلي كاملًا، دون تغيير"}],c=`<h1>المحاضرة 3: التمرين القصير وحلّه والشيفرة الأصلية</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<p>المادة الأصلية: <strong>آنا بيل (Ana Bell)</strong>، <strong>MIT OpenCourseWare (MIT OCW)</strong>، معهد ماساتشوستس للتكنولوجيا، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python</strong>، <strong>خريف 2022 (Fall 2022)</strong>.</p>
<ul>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-3-iteration/">صفحة المحاضرة ونص التمرين الرسمي</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex03_sol_pdf/">صفحة حلول التمرين الرسمي</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex03_sol.pdf">ملف الحل الرسمي، PDF</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec03_code_py/">صفحة شيفرة المحاضرة الرسمية</a>.</li>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec03_code.py">ملف الشيفرة الأصلي</a>.</li>
</ul>
<p>هذه ترجمة وتكييف عربي غير رسمي، وفق <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل</a>، ولا تمثل اعتمادًا أو تأييدًا من MIT أو MIT OCW. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والاستشهاد</a>. نُقلت الشيفرة الأصلية أدناه دون ترجمة تعليقاتها أو تغيير مسافاتها؛ لم تُشغَّل.</p>
<div class="exercises"><h2 id="صفحة-المصدر-1-التمارين-القصيرة-للمحاضرة-3">صفحة المصدر 1: التمارين القصيرة للمحاضرة 3</h2>
<p>موعد تسليم الأسئلة أدناه: <strong>الاثنين 19 سبتمبر 2022، الساعة 03:00:00 مساءً</strong>.</p>
<h3 id="1-السؤال-1-من-1">1) السؤال 1 من 1</h3>
<p>افترض أن لديك متغيرًا لعدد صحيح موجب (Positive Integer) اسمه <code>N</code>. اكتب مقطعًا من شيفرة Python يطبع <code>hello world</code> على أسطر منفصلة، <code>N</code> مرات. يمكنك استخدام حلقة (Loop) <code>while</code> أو حلقة <code>for</code>.</p>
<p>سطر محرر الإجابة الأصلي، ورقمه 1:</p>
<pre><code class="language-python"><span class="hljs-comment"># Write your code here</span>
</code></pre>
<p>لديك عدد غير محدود من محاولات الإرسال المتبقية.</p>
<p>هذا هو الحل الذي كتبناه:</p>
<pre><code class="language-python"><span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(N):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;hello world&#x27;</span>)
</code></pre>
<h2 id="صفحة-المصدر-2-بيانات-المقرر">صفحة المصدر 2: بيانات المقرر</h2>
<p>MIT OpenCourseWare — https://ocw.mit.edu</p>
<p>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022.</p>
<p>للحصول على معلومات عن الاستشهاد بهذه المواد أو شروط استخدامها، تفضل بزيارة https://ocw.mit.edu/terms.</p>
<h2 id="ترجمة-تعليمات-ملف-شيفرة-المحاضرة">ترجمة تعليمات ملف شيفرة المحاضرة</h2>
<p><strong>ملاحظة المترجم:</strong> هذه ترجمة للنصوص الإرشادية في الملف، وليست تعديلًا لتعليقاته في النسخة الحرفية أدناه.</p>
<p>يمكنك إزالة التعليق عن كل مثال ومحاولة تشغيله بنفسك. لإضافة التعليق إلى مجموعة أسطر أو إزالته عنها، حدد الأسطر ثم اضغط <code>CTRL+1</code> على Windows أو <code>CMD+1</code> على Mac.</p>
<p>يتضمن الملف أمثلة حلقات <code>while</code>، وشيفرة مسلية للغابة الضائعة لتجربتها بنفسك، ومثالًا يطبع <code>x</code>، وتمرين حلقة لانهائية (Infinite Loop) ينبغي الحذر منه. لإيقافه، انقر نافذة الصدفة (Shell) واضغط <code>CTRL+c</code> أو المربع الأحمر في أعلاها.</p>
<p>تمرين «جرّب بنفسك» الأول: وسّع الشيفرة لعرض وجه حزين حين يدخل المستخدم حلقة <code>while</code> أكثر من مرتين. تلميح: استخدم عدّادًا (Counter). تتبعه أمثلة عدّاد باستخدام <code>while</code> ثم <code>for</code>، والمضروب (Factorial) بالحَلقتين، وتجربة النطاقات <code>range(1,4,1)</code> و<code>range(1,4,2)</code> و<code>range(4,0,-1)</code>، وأمثلة المجموع (Sum).</p>
<p>تمرين «جرّب بنفسك» الآخر: أصلح الشيفرة لتستخدم المتغيرين <code>start</code> و<code>end</code> في النطاق (Range)، وتحصل على مجموع القيم الواقعة بينهما بما يشمل الطرفين.</p>
<h3 id="تدريب-منزلي-1">تدريب منزلي 1</h3>
<p>عرّف متغيرًا <code>x</code> يخزن عددًا صحيحًا أكبر من <code>0</code>. اطبع جميع الأعداد الصحيحة القابلة للقسمة على <code>5</code> بين <code>1</code> شاملًا و<code>x</code> شاملًا، كل عدد على سطر منفصل. مثلًا، إذا كان <code>x = 15</code> تُطبع <code>5</code> و<code>10</code> و<code>15</code>؛ وإذا كان <code>x = 14</code> تُطبع <code>5</code> و<code>10</code>.</p>
<h3 id="تدريب-منزلي-2">تدريب منزلي 2</h3>
<p>عرّف متغيرًا <code>n</code> يخزن عددًا صحيحًا. اطبع مجموع كل الأرقام (Digits) فيه. تلميح: يمكنك الحصول على رقم واحد كل مرة بالنظر إلى الباقي (Remainder) عند قسمة <code>n</code> على <code>10</code>. مثلًا، إذا كان <code>x = 1234</code>، اطبع <code>10</code>؛ ورد اسم <code>x</code> هنا في تعليق المصدر مع أن المتغير المطلوب اسمه <code>n</code>.</p>
<p>يضم الملف حلول التدريبين المنزليين، وحلّي تمريني المحاضرة: عدّاد الوجه الحزين، ومجموع الطرفين باستخدام <code>end+1</code>. جميعها محفوظة كاملة بالتعليقات الأصلية في النسخة التالية.</p>
<h2 id="ملف-python-الأصلي-كاملا-دون-تغيير">ملف Python الأصلي كاملًا، دون تغيير</h2>
<pre><code class="language-python"><span class="hljs-comment">###################</span>
<span class="hljs-comment"># Tou can uncomment each of these examples</span>
<span class="hljs-comment"># and try running them yourself</span>

<span class="hljs-comment"># To batch comment/uncomment, select the lines and then</span>
<span class="hljs-comment"># on Windows hit CTRL+1 or on Mac hit CMD+1</span>
<span class="hljs-comment">###################</span>



<span class="hljs-comment">###################</span>
<span class="hljs-comment"># EXAMPLE: while loops </span>
<span class="hljs-comment">####################</span>
<span class="hljs-comment"># where = input(&quot;You are in the Lost Forest. Go left or right? &quot;)</span>
<span class="hljs-comment"># while where == &quot;right&quot;:</span>
<span class="hljs-comment">#     where = input(&quot;You are in the Lost Forest. Go left or right? &quot;)</span>
<span class="hljs-comment"># print(&quot;You got out of the Lost Forest! \\o/&quot;)</span>



<span class="hljs-comment">###########################################</span>

<span class="hljs-comment"># Fun Lost Forest code, run it on your own!</span>
<span class="hljs-comment">#where = input(&quot;You are in the Lost Forest\\n****************\\n****************\\n :)\\n****************\\n****************\\nGo left or right? &quot;)</span>
<span class="hljs-comment">#while where.lower() == &quot;right&quot;:</span>
<span class="hljs-comment">#    where = input(&quot;You are in the Lost Forest\\n****************\\n******       ***\\n  (╯°□°）╯\\n     ︵ \\n    ┻━┻\\n****************\\n****************\\nGo left or right? &quot;)</span>
<span class="hljs-comment">#print(&quot;\\nYou got out of the Lost Forest!\\n\\o/&quot;)</span>

    
<span class="hljs-comment">###########</span>
<span class="hljs-comment">## EXAMPLE    </span>
<span class="hljs-comment">###########</span>
<span class="hljs-comment"># n = int(input(&#x27;Please enter a non-negative integer: &#x27;))</span>
<span class="hljs-comment"># while n &gt; 0:</span>
<span class="hljs-comment">#     print(&#x27;x&#x27;)</span>
<span class="hljs-comment">#     n = n-1  # the same as n -= 1</span>
    

<span class="hljs-comment">################ YOU TRY IT ###################</span>
<span class="hljs-comment">## EXAMPLE: infinite loop, be careful!</span>
<span class="hljs-comment"># To stop it, click the shell and hit CTRL+c or </span>
<span class="hljs-comment"># the red square at the top of the shell</span>
<span class="hljs-comment">##############################################</span>
<span class="hljs-comment"># while True:</span>
<span class="hljs-comment">#     print(&quot;noooooooo&quot;)</span>



<span class="hljs-comment">############### YOU TRY IT ################</span>
<span class="hljs-comment"># Expand this code to show a sad face when the user entered </span>
<span class="hljs-comment"># the while loop more than 2 times. Hint: use a counter</span>
<span class="hljs-comment">###################</span>
<span class="hljs-comment"># where = input(&quot;Go left or right? &quot;)</span>
<span class="hljs-comment"># while where == &quot;right&quot;:</span>
<span class="hljs-comment">#     where = input(&quot;Go left or right? &quot;)</span>
<span class="hljs-comment"># print(&quot;You got out!&quot;)</span>



<span class="hljs-comment">#############</span>
<span class="hljs-comment">## EXAMPLE: counter</span>
<span class="hljs-comment">#############</span>

<span class="hljs-comment">## With while loop</span>
<span class="hljs-comment"># n = 0</span>
<span class="hljs-comment"># while n &lt; 5:</span>
<span class="hljs-comment">#     print(n)</span>
<span class="hljs-comment">#     n = n+1</span>

<span class="hljs-comment">## With for loop</span>
<span class="hljs-comment">#for n in range(5):</span>
<span class="hljs-comment">#    print(n)</span>

<span class="hljs-comment">###########</span>
<span class="hljs-comment">## EXAMPLE: factorial</span>
<span class="hljs-comment">###########</span>

<span class="hljs-comment">## With while loops</span>
<span class="hljs-comment"># x = 6</span>
<span class="hljs-comment"># i = 1</span>
<span class="hljs-comment"># factorial = 1</span>
<span class="hljs-comment"># while i &lt;= x:</span>
<span class="hljs-comment">#     factorial *= i</span>
<span class="hljs-comment">#     i += 1</span>
<span class="hljs-comment"># print(f&#x27;{x} factorial is {factorial}&#x27;)</span>

<span class="hljs-comment">## With for loops</span>
<span class="hljs-comment"># factorial = 1</span>
<span class="hljs-comment"># for i in range(1, x+1, 1):</span>
<span class="hljs-comment">#     factorial *= i</span>
<span class="hljs-comment"># print(f&#x27;{x} factorial is {factorial}&#x27;)</span>


<span class="hljs-comment">################ YOU TRY IT ################</span>
<span class="hljs-comment"># for i in range(1,4,1):</span>
<span class="hljs-comment">#     print(i)</span>
<span class="hljs-comment"># for j in range(1,4,2):</span>
<span class="hljs-comment">#     print(j*2)</span>
<span class="hljs-comment"># for me in range(4,0,-1):</span>
<span class="hljs-comment">#     print(&quot;$&quot;*me)</span>


<span class="hljs-comment">###########################################</span>

<span class="hljs-comment">###############</span>
<span class="hljs-comment">## EXAMPLE: sum</span>
<span class="hljs-comment">###############</span>

<span class="hljs-comment">#mysum = 0</span>
<span class="hljs-comment">#for i in range(10):</span>
<span class="hljs-comment">#    mysum += i</span>
<span class="hljs-comment">#print(mysum)</span>

<span class="hljs-comment">######</span>

<span class="hljs-comment">#mysum = 0</span>
<span class="hljs-comment">#for i in range(7, 10):</span>
<span class="hljs-comment">#    mysum += i</span>
<span class="hljs-comment">#print(mysum)</span>

<span class="hljs-comment">######</span>

<span class="hljs-comment">#mysum = 0</span>
<span class="hljs-comment">#for i in range(5, 11, 2):</span>
<span class="hljs-comment">#    mysum += i</span>
<span class="hljs-comment">#    if mysum == 5:</span>
<span class="hljs-comment">#        break</span>
<span class="hljs-comment">#        mysum += 1</span>
<span class="hljs-comment">#print(mysum)</span>

<span class="hljs-comment">################ YOU TRY IT ################</span>
<span class="hljs-comment"># Fix this code to use variables start and end in the </span>
<span class="hljs-comment"># range, to get the total sum between and including those values. </span>

<span class="hljs-comment"># mysum = 0</span>
<span class="hljs-comment"># start = 3</span>
<span class="hljs-comment"># end = 5</span>
<span class="hljs-comment"># for i in range(start, end):</span>
<span class="hljs-comment">#     mysum += i</span>
<span class="hljs-comment"># print(mysum)</span>

<span class="hljs-comment">###########################################</span>



<span class="hljs-comment">#########################################################</span>
<span class="hljs-comment">##################### AT HOME ###########################</span>
<span class="hljs-comment">#########################################################</span>

<span class="hljs-comment"># Practice 1: </span>
<span class="hljs-comment"># Declare a variable x that stores an int &gt; 0. Print all ints, one on each</span>
<span class="hljs-comment"># line, between 1 (inclusive) and x (inclusive) that are divisible by 5.</span>
<span class="hljs-comment"># For ex. if x = 15, it prints 5, 10, and 15. </span>
<span class="hljs-comment"># For ex. if x = 14, it prints 5 and 10.</span>


<span class="hljs-comment"># Practice 2:</span>
<span class="hljs-comment"># Declare a variable n that stores an int. Print the sum of all digits </span>
<span class="hljs-comment"># in n. Hint: you can get a digit at a time looking at the remainder </span>
<span class="hljs-comment"># when you divide n by 10.</span>
<span class="hljs-comment"># For ex. If x = 1234, print 10</span>
 



<span class="hljs-comment">#########################################################</span>
<span class="hljs-comment">##################### END AT HOME ###########################</span>
<span class="hljs-comment">#########################################################</span>


<span class="hljs-comment">#########################################################</span>
<span class="hljs-comment">##################### ANSWERS AT HOME ###########################</span>
<span class="hljs-comment">#########################################################</span>

<span class="hljs-comment"># Practice 1: </span>
<span class="hljs-comment"># Declare a variable x that stores an int &gt; 0. Print all ints, one on each</span>
<span class="hljs-comment"># line, between 1 (inclusive) and x (inclusive) that are divisible by 5.</span>
<span class="hljs-comment"># For ex. if x = 15, it prints 5, 10, and 15. If x = 14, it prints 5 and 10.</span>

<span class="hljs-comment"># x = 15</span>
<span class="hljs-comment"># for i in range(1,x+1):</span>
<span class="hljs-comment">#     if i%5 == 0:</span>
<span class="hljs-comment">#         print(i)</span>


<span class="hljs-comment"># Practice 2:</span>
<span class="hljs-comment"># Declare a variable n that stores an int. Print the sum of all digits </span>
<span class="hljs-comment"># in n. Hint: you can get a digit at a time looking at the remainder </span>
<span class="hljs-comment"># when you divide n by 10.</span>
<span class="hljs-comment"># For ex. If x = 1234, print 10</span>
<span class="hljs-comment"># n = 1234</span>
<span class="hljs-comment"># total = 0</span>
<span class="hljs-comment"># while True:</span>
<span class="hljs-comment">#     r = n%10</span>
<span class="hljs-comment">#     total += r </span>
<span class="hljs-comment">#     n = n//10</span>
<span class="hljs-comment">#     if n == 0:</span>
<span class="hljs-comment">#         break</span>
<span class="hljs-comment"># print(total)</span>

<span class="hljs-comment">#########################################################</span>
<span class="hljs-comment">##################### END ANSWERS AT HOME ###########################</span>
<span class="hljs-comment">#########################################################</span>




<span class="hljs-comment">#########################################</span>
<span class="hljs-comment">############### ANSWERS TO LECTURE ##########################</span>
<span class="hljs-comment">#########################################</span>
<span class="hljs-comment"># You Try It 1: </span>
<span class="hljs-comment"># Expand this code to show a sad face when the user entered </span>
<span class="hljs-comment"># the while loop more than 2 times. Hint: use a counter</span>
<span class="hljs-comment">###################</span>
<span class="hljs-comment"># where = input(&quot;Go left or right? &quot;)</span>
<span class="hljs-comment"># counter = 0</span>
<span class="hljs-comment"># while where == &quot;right&quot;:</span>
<span class="hljs-comment">#     counter = counter + 1</span>
<span class="hljs-comment">#     if counter &gt; 2:</span>
<span class="hljs-comment">#         print(&quot;:(&quot;)</span>
<span class="hljs-comment">#     where = input(&quot;Go left or right? &quot;)</span>
<span class="hljs-comment"># print(&quot;You got out!&quot;)</span>



<span class="hljs-comment"># Your Try It 2: </span>
<span class="hljs-comment"># Fix this code to use variables start and end in the </span>
<span class="hljs-comment"># range, to get the total sum between and including those values. </span>

<span class="hljs-comment"># mysum = 0</span>
<span class="hljs-comment"># start = 1</span>
<span class="hljs-comment"># end = 3</span>
<span class="hljs-comment"># for i in range(start, end+1):</span>
<span class="hljs-comment">#     mysum += i</span>
<span class="hljs-comment"># print(mysum)</span>

<span class="hljs-comment">#########################################</span>
<span class="hljs-comment">############### END ANSWERS TO LECTURE ##########################</span>
<span class="hljs-comment">#########################################</span>
</code></pre>
</div>`,l={book:n,chapter:s,chapterTitle:a,slug:e,title:t,headings:o,html:c};export{n as book,s as chapter,a as chapterTitle,l as default,o as headings,c as html,e as slug,t as title};
