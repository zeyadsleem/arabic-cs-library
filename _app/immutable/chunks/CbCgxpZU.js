const n="hello-algo",s="chapter_computational_complexity",a="تحليل التعقيد",l="exercises",e="تمارين",p=[{depth:2,id:"مراجعة-المفاهيم",text:"مراجعة المفاهيم"},{depth:3,id:"التعقيد-الزمني-والتعقيد-المكاني-للتكرار-والتعاود",text:"التعقيد الزمني والتعقيد المكاني للتكرار والتعاود"},{depth:3,id:"التعقيد-الزمني-لثلاث-مقاطع-شيفرة",text:"التعقيد الزمني لثلاث مقاطع شيفرة"},{depth:3,id:"أي-طريقة-للعكس-تستهلك-مساحة-أقل",text:"أي طريقة للعكس تستهلك مساحة أقل؟"},{depth:2,id:"تمارين-برمجية",text:"تمارين برمجية"},{depth:3,id:"عدد-فيبوناتشي",text:"عدد فيبوناتشي"}],c=`<h2 id="مراجعة-المفاهيم">مراجعة المفاهيم</h2>
<h3 id="التعقيد-الزمني-والتعقيد-المكاني-للتكرار-والتعاود">التعقيد الزمني والتعقيد المكاني للتكرار والتعاود</h3>
<p>تحسب الدالتان التاليتان كلتاهما $1 + 2 + \\dots + n$ (افترض أن $n \\ge 1$). اجعل قيمة <code>n</code> تساوي 4،
وأجب عن الأسئلة باتباع ترتيب تنفيذ البرنامج الفعلي، ثم قارن كفاءة الطريقتين.</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* الجمع بالتكرار */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">sumIter</span><span class="hljs-params">(n <span class="hljs-type">int</span>)</span></span> <span class="hljs-type">int</span> {
	res := <span class="hljs-number">0</span>
	<span class="hljs-keyword">for</span> i := <span class="hljs-number">1</span>; i &lt;= n; i++ {
		res += i
	}
	<span class="hljs-keyword">return</span> res
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* الجمع بالتكرار */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">sumIter</span>(<span class="hljs-params"><span class="hljs-attr">n</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">let</span> res = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>; i &lt;= n; i++) {
        res += i;
    }
    <span class="hljs-keyword">return</span> res;
}
</code></pre>
</div>
<!-- numbered-subquestions -->
<ol>
<li>عند تشغيل الدالة التكرارية بقيمة <code>n = 4</code>، ما قيمة المجمّع <code>res</code> بعد كل دورة من دورات الحلقة؟</li>
<li>عند تشغيل الدالة التعاودية بقيمة <code>n = 4</code>، ما القيم التي تأخذها الوسيطة <code>n</code> بالترتيب؟ وعندما تعود الاستدعاءات من أعمق مستوى، كيف نحصل على النتيجة؟</li>
<li>ما التعقيد الزمني والتعقيد المكاني للطريقتين؟ اشرح استدلالك باستخدام عمليتي التنفيذ الواردتين في السؤالين 1 و2.</li>
</ol>
<div class="note">
<p class="note__title">الإجابة</p>
<ol>
<li>
<p>يأخذ متغير الحلقة <code>i</code> القيم <code>1, 2, 3, 4</code>. وبعد كل دورة يصبح <code>res</code> على الترتيب
<code>1, 3, 6, 10</code>، لذا تعيد الدالة التكرارية القيمة 10.</p>
</li>
<li>
<p>تأخذ الوسيطة <code>n</code> القيم <code>4 → 3 → 2 → 1</code>.
ويعيد أعمق استدعاء القيمة 1. ثم تحصل الاستدعاءات المتبقية على <code>2 + 1 = 3</code> و<code>3 + 3 = 6</code> و<code>4 + 6 = 10</code> بهذا الترتيب.
وعند أعمق نقطة، تكون استدعاءات الدالة الأربعة كلها ما تزال غير مكتملة.</p>
</li>
<li>
<p>تؤدي الدالتان عدداً من دورات الحلقة أو الاستدعاءات يتناسب مع $n$، لذا يكون التعقيد الزمني لكلتيهما $O(n)$.
أما التعقيد المكاني فيختلف بينهما. فالنسخة التكرارية تستخدم عدداً ثابتاً من المتغيرات فقط، لذا يكون تعقيدها المكاني $O(1)$.
وفي النسخة التعاودية، يجب أن تنتظر الاستدعاءات الأسبق نتيجةً قبل أن تعود، لذا يحمل مكدس الاستدعاءات حتى $n$ استدعاء في الوقت نفسه.
وتعقيدها المكاني $O(n)$.</p>
<p>وعند تحليل التعقيد المكاني، تذكّر أن تشمل المساحة التي تستخدمها الاستدعاءات التعاودية إلى جانب المتغيرات المكتوبة في الشيفرة.</p>
</li>
</ol>
</div>
<h3 id="التعقيد-الزمني-لثلاث-مقاطع-شيفرة">التعقيد الزمني لثلاث مقاطع شيفرة</h3>
<p>يأخذ كل مقطع من مقاطع الشيفرة التالية عدداً صحيحاً موجباً $n$ كمدخل. رتّبها من الأدنى إلى الأعلى من حيث التعقيد الزمني، واذكر تعقيد كل واحد منها.</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* حلقة خطية */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">linearLoop</span><span class="hljs-params">(n <span class="hljs-type">int</span>)</span></span> <span class="hljs-type">int</span> {
	res := <span class="hljs-number">0</span>
	<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; n; i++ {
		res += i
	}
	<span class="hljs-keyword">return</span> res
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* حلقة خطية */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">linearLoop</span>(<span class="hljs-params"><span class="hljs-attr">n</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">let</span> res = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; n; i++) {
        res += i;
    }
    <span class="hljs-keyword">return</span> res;
}
</code></pre>
</div>
<div class="note">
<p class="note__title">الإجابة</p>
<p>الترتيب من الأدنى إلى الأعلى هو: المقطع 3 بتعقيد $O(\\log n)$، ثم المقطع 1 بتعقيد $O(n)$، ثم المقطع 2 بتعقيد $O(n^2)$.
فالمقطع 3 ينصّف $n$ في كل دورة، لذا يعمل نحو $\\log_2 n$ مرة.
أما حلقة المقطع 1 فتعمل $n$ مرة بالضبط. وتعمل الحلقة الداخلية في المقطع 2
$n,n-1,\\dots,1$ مرة، أي $n(n+1)/2$ في المجموع، لذا يكون تعقيده الزمني تربيعياً.</p>
</div>
<h3 id="أي-طريقة-للعكس-تستهلك-مساحة-أقل">أي طريقة للعكس تستهلك مساحة أقل؟</h3>
<p>توجد طريقتان لعكس جميع عناصر المصفوفة <code>nums</code>:</p>
<!-- numbered-subquestions -->
<ol>
<li>
<p>أنشئ مصفوفة جديدة <code>res</code> بالطول نفسه، وانسخ العناصر إليها بترتيب معكوس، ثم أعِدها.</p>
</li>
<li>
<p>حرّك فهرسين <code>i</code> و<code>j</code> إلى الداخل من البداية والنهاية، مع تبديل <code>nums[i]</code> و<code>nums[j]</code> في كل خطوة.</p>
<p>ما التعقيد المكاني لكل طريقة؟ وأيّهما عملية «في المكان»؟</p>
</li>
</ol>
<div class="note">
<p class="note__title">الإجابة</p>
<ol>
<li>
<p>تحتاج هذه الطريقة إلى مصفوفة مساعدة بالطول نفسه للمدخل، لذا يكون تعقيدها المكاني $O(n)$.</p>
</li>
<li>
<p>لا تستخدم هذه الطريقة سوى متغيري فهرس،
لذا يكون تعقيدها المكاني $O(1)$. وهي عملية في المكان.</p>
<p>ولاحظ أن العكس في المكان يغيّر مصفوفة الإدخال،
لذا لا يُفضَّل إلا عندما يكون تعديل الإدخال مسموحاً. أما إذا وجب الحفاظ على المصفوفة الأصلية، فلا مفرّ من تكلفة النسخ في الطريقة الأولى.</p>
</li>
</ol>
</div>
<h2 id="تمارين-برمجية">تمارين برمجية</h2>
<h3 id="عدد-فيبوناتشي">عدد فيبوناتشي</h3>
<p>تُعرَّف متتالية فيبوناتشي بـ$F(0)=0$ و$F(1)=1$، ولأجل $n\\ge2$
يكون $F(n)=F(n-1)+F(n-2)$.</p>
<p>بمعطى عدد صحيح غير سالب <code>n</code>، استخدم حلقة لحساب $F(n)$ وإعادته. ولا تستخدم التعاود.</p>
<div class="note">
<p class="note__title">تلميحات</p>
<ol>
<li>تعامل مع حالتي كون n تساوي 0 أو 1 على حدة</li>
<li>لا نحتاج إلى حساب الحد التالي سوى إلى الحدين السابقين؛ فلا حاجة إلى تخزين المتتالية كاملة</li>
<li>عند تحديث المتغيرين، احرص ألا تكتب فوق قيمة قديمة قبل استخدامها</li>
</ol>
</div>
<p><a href="https://leetcode.com/problems/fibonacci-number/">LeetCode</a>{ .rounded-button .exercise-button target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot; }</p>
`,o={book:n,chapter:s,chapterTitle:a,slug:l,title:e,headings:p,html:c};export{n as book,s as chapter,a as chapterTitle,o as default,p as headings,c as html,l as slug,e as title};
