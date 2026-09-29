const s="hello-algo",a="chapter_computational_complexity",n="تحليل التعقيد",p="exercises",e="تمارين",l=[{depth:2,id:"مراجعة-المفاهيم",text:"مراجعة المفاهيم"},{depth:3,id:"التعقيد-الزمني-والتعقيد-المكاني-للتكرار-والتعاود",text:"التعقيد الزمني والتعقيد المكاني للتكرار والتعاود"},{depth:3,id:"التعقيد-الزمني-لثلاث-مقاطع-شيفرة",text:"التعقيد الزمني لثلاث مقاطع شيفرة"},{depth:3,id:"أي-طريقة-للعكس-تستهلك-مساحة-أقل",text:"أي طريقة للعكس تستهلك مساحة أقل؟"},{depth:2,id:"تمارين-برمجية",text:"تمارين برمجية"},{depth:3,id:"عدد-فيبوناتشي",text:"عدد فيبوناتشي"}],t=`<h2 id="مراجعة-المفاهيم">مراجعة المفاهيم</h2>
<h3 id="التعقيد-الزمني-والتعقيد-المكاني-للتكرار-والتعاود">التعقيد الزمني والتعقيد المكاني للتكرار والتعاود</h3>
<p>تحسب الدالتان التاليتان كلتاهما <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">2</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="minner">⋯</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> (افترض أن <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7719em;vertical-align:-0.136em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≥</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>). اجعل قيمة <code>n</code> تساوي 4،
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
<p>تؤدي الدالتان عدداً من دورات الحلقة أو الاستدعاءات يتناسب مع <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span>، لذا يكون التعقيد الزمني لكلتيهما <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.
أما التعقيد المكاني فيختلف بينهما. فالنسخة التكرارية تستخدم عدداً ثابتاً من المتغيرات فقط، لذا يكون تعقيدها المكاني <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>.
وفي النسخة التعاودية، يجب أن تنتظر الاستدعاءات الأسبق نتيجةً قبل أن تعود، لذا يحمل مكدس الاستدعاءات حتى <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> استدعاء في الوقت نفسه.
وتعقيدها المكاني <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</p>
<p>وعند تحليل التعقيد المكاني، تذكّر أن تشمل المساحة التي تستخدمها الاستدعاءات التعاودية إلى جانب المتغيرات المكتوبة في الشيفرة.</p>
</li>
</ol>
</div>
<h3 id="التعقيد-الزمني-لثلاث-مقاطع-شيفرة">التعقيد الزمني لثلاث مقاطع شيفرة</h3>
<p>يأخذ كل مقطع من مقاطع الشيفرة التالية عدداً صحيحاً موجباً <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> كمدخل. رتّبها من الأدنى إلى الأعلى من حيث التعقيد الزمني، واذكر تعقيد كل واحد منها.</p>
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
<p>الترتيب من الأدنى إلى الأعلى هو: المقطع 3 بتعقيد <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>، ثم المقطع 1 بتعقيد <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>، ثم المقطع 2 بتعقيد <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span>.
فالمقطع 3 ينصّف <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> في كل دورة، لذا يعمل نحو <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.9386em;vertical-align:-0.2441em;"></span><span class="mop"><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.207em;"><span style="top:-2.4559em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2441em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span></span></span></span> مرة.
أما حلقة المقطع 1 فتعمل <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> مرة بالضبط. وتعمل الحلقة الداخلية في المقطع 2
<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7778em;vertical-align:-0.1944em;"></span><span class="mord mathnormal">n</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8389em;vertical-align:-0.1944em;"></span><span class="mord">1</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">…</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">1</span></span></span></span> مرة، أي $n(n+1)/2$ في المجموع، لذا يكون تعقيده الزمني تربيعياً.</p>
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
<p>تحتاج هذه الطريقة إلى مصفوفة مساعدة بالطول نفسه للمدخل، لذا يكون تعقيدها المكاني <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</p>
</li>
<li>
<p>لا تستخدم هذه الطريقة سوى متغيري فهرس،
لذا يكون تعقيدها المكاني <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>. وهي عملية في المكان.</p>
<p>ولاحظ أن العكس في المكان يغيّر مصفوفة الإدخال،
لذا لا يُفضَّل إلا عندما يكون تعديل الإدخال مسموحاً. أما إذا وجب الحفاظ على المصفوفة الأصلية، فلا مفرّ من تكلفة النسخ في الطريقة الأولى.</p>
</li>
</ol>
</div>
<div class="exercises"><h2 id="تمارين-برمجية">تمارين برمجية</h2>
<h3 id="عدد-فيبوناتشي">عدد فيبوناتشي</h3>
<p>تُعرَّف متتالية فيبوناتشي بـ<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.1389em;">F</span><span class="mopen">(</span><span class="mord">0</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span> و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.1389em;">F</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>، ولأجل <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7719em;vertical-align:-0.136em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≥</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">2</span></span></span></span>
يكون $F(n)=F(n-1)+F(n-2)$.</p>
<p>بمعطى عدد صحيح غير سالب <code>n</code>، استخدم حلقة لحساب <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.1389em;">F</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> وإعادته. ولا تستخدم التعاود.</p>
<div class="note">
<p class="note__title">تلميحات</p>
<ol>
<li>تعامل مع حالتي كون n تساوي 0 أو 1 على حدة</li>
<li>لا نحتاج إلى حساب الحد التالي سوى إلى الحدين السابقين؛ فلا حاجة إلى تخزين المتتالية كاملة</li>
<li>عند تحديث المتغيرين، احرص ألا تكتب فوق قيمة قديمة قبل استخدامها</li>
</ol>
</div>
<p><a href="https://leetcode.com/problems/fibonacci-number/">LeetCode</a>{ .rounded-button .exercise-button target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot; }</p>
</div>`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:e,headings:l,html:t};export{s as book,a as chapter,n as chapterTitle,c as default,l as headings,t as html,p as slug,e as title};
