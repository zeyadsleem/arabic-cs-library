const s="sicp",a="c5-computing-with-register-machines",n="الحوسبة بآلات المسجّلات",c="5-2",e="5.2 محاكي آلة مسجّلات",l=[{depth:3,id:"52-محاكي-آلة-مسجلات",text:"5.2 محاكي آلة مسجّلات"}],p=`<h3 id="52-محاكي-آلة-مسجلات">5.2 محاكي آلة مسجّلات</h3>
<p>ولنكتسب فهمًا حسنًا لتصميم آلات المسجّلات، يتحتّم علينا أن نختبر الآلات التي نصمّمها لنرى ما إذا كانت تؤدّي كما هو متوقّع. وإحدى طرق اختبار تصميمٍ هي محاكاة تشغيل المتحكّم يدويًّا، كما في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#Exercise-5_002e5">التمرين 5.5</a>. لكنّ هذا أمرٌ بالغ المملّة في جميع الآلات ما عدا أبسطها. ونبني في هذا القسم محاكيًا للآلات الموصوفة بلغة آلات المسجّلات. والمحاكي برنامج Scheme فيه أربعة إجراءات واجهة. فالأوّل يستخدم وصف آلة مسجّلاتٍ لبناء نموذج للآلة (بنية بياناتٍ أجزاؤها تقابل أجزاء الآلة التي تُحاكى)، والثلاثة الأخرى تسمح لنا بمحاكاة الآلة بالتلاعب بالنموذج:</p>
<pre><code class="language-scheme">(<span class="hljs-name">make-machine</span> ⟨register-names⟩
              ⟨operations⟩
              ⟨controller⟩)
</code></pre>
<p>يبني نموذجًا للآلة ذات المسجّلات والعمليّات والمتحكّم المعطاة، ويُعيده.</p>
<pre><code class="language-scheme">(<span class="hljs-name">set-register-contents!</span> ⟨machine-model⟩ 
                        ⟨register-name⟩ 
                        ⟨value⟩)
</code></pre>
<p>يُخزّن قيمةً في مسجّلٍ محاكىً في الآلة المعطاة.</p>
<pre><code class="language-scheme">(<span class="hljs-name">get-register-contents</span> ⟨machine-model⟩
                       ⟨register-name⟩)
</code></pre>
<p>يُعيد محتويات مسجّلٍ محاكىً في الآلة المعطاة.</p>
<pre><code class="language-scheme">(<span class="hljs-name">start</span> ⟨machine-model⟩)
</code></pre>
<p>يحاكي تنفيذ الآلة المعطاة، بدءًا من بداية تسلسل المتحكّم وتوقّفًا حين يبلغ نهاية التسلسل.</p>
<p>ومثالٌ على كيفيّة استخدام هذه الإجراءات، يمكننا تعريف <code>gcd-machine</code> ليكون نموذجًا لآلة GCD الواردة في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#g_t5_002e1_002e1">5.1.1</a> كما يلي:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> gcd-machine
  (<span class="hljs-name">make-machine</span>
   &#x27;(a b t)
   (<span class="hljs-name"><span class="hljs-built_in">list</span></span> (<span class="hljs-name"><span class="hljs-built_in">list</span></span> <span class="hljs-symbol">&#x27;rem</span> remainder) (<span class="hljs-name"><span class="hljs-built_in">list</span></span> <span class="hljs-symbol">&#x27;=</span> =))
   &#x27;(test-b
       (test (op =) (reg b) (const <span class="hljs-number">0</span>))
       (branch (label gcd-done))
       (assign t (op rem) (reg a) (reg b))
       (assign a (reg b))
       (assign b (reg t))
       (goto (label test-b))
     gcd-done)))
</code></pre>
<p>المَعطى الأوّل إلى <code>make-machine</code> هو قائمةٌ بأسماء المسجّلات. والمَعطى التالي هو جدول (قائمةٌ من قوائمٍ ثنائيّة العناصر) يُقرن كلّ اسم عمليّةٍ فيه بإجراءٍ من Scheme يُنفّذ تلك العمليّة (أي يُنتج قيمة الخرج ذاتها عند إعطائه قيم الدخل ذاتها). وأمّا المَعطى الأخير فيحدّد المتحكّم على هيئة قائمةٍ من اللصائق وتعليمات الآلة، كما في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#g_t5_002e1">5.1</a>.</p>
<p>ولحساب القواسم المشتركة الكبرى بهذه الآلة، نُعيّن محتويات مسجّلات الدخل، ونُشغّل الآلة، وندرس النتيجة حين تنتهي المحاكاة:</p>
<pre><code class="language-scheme">(<span class="hljs-name">set-register-contents!</span> gcd-machine <span class="hljs-symbol">&#x27;a</span> <span class="hljs-number">206</span>)
done

(<span class="hljs-name">set-register-contents!</span> gcd-machine <span class="hljs-symbol">&#x27;b</span> <span class="hljs-number">40</span>)
done

(<span class="hljs-name">start</span> gcd-machine)
done

(<span class="hljs-name">get-register-contents</span> gcd-machine <span class="hljs-symbol">&#x27;a</span>)
<span class="hljs-number">2</span>
</code></pre>
<p>وسيجرى هذا الاحتساب أبطأَ بكثيرٍ من إجراء <code>gcd</code> مكتوبٍ بـScheme، لأنّنا سنحاكي تعليمات آلةٍ منخفضة المستوى، مثل <code>assign</code>، بعمليّاتٍ أعقدَ بكثيرٍ.</p>
<blockquote>
<p><strong>التمرين 5.7:</strong> استخدم المُحاكي لاختبار الآلات التي صمّمتها في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#Exercise-5_002e4">التمرين 5.4</a>.</p>
</blockquote>
<h4>5.2.1 نموذج الآلة</h4>
<p>نموذج الآلة الذي يولّده <code>make-machine</code> مُمثَّلٌ بإجراءٍ ذي حالة محلّيّة، باستخدام تقنيّات تمرير الرسائل المطوّرة في <a href="https://sarabander.github.io/sicp/html/Chapter-3.xhtml#Chapter-3">الفصل 3</a>. فلبناء هذا النموذج، يبدأ <code>make-machine</code> بنداء الإجراء <code>make-new-machine</code> لبناء أجزاء نموذج الآلة المشتركة بين جميع آلات المسجّلات. وهذا النموذج الأساسيّ للآلة الذي يبنيه <code>make-new-machine</code> هو في جوهره حاوٍ لبعض المسجّلات ومكدس، إلى جانب آليّة تنفيذٍ تعالج تعليمات المتحكّم واحدةً واحدة.</p>
<p>ثم يمدّ <code>Make-machine</code> هذا النموذج الأساسيّ (بإرسال رسائل إليه) ليشمل مسجّلات الآلة المعيّنة وعمليّاتها ومتحكّمها. فأوّلًا يُخصِّص مسجّلًا في الآلة الجديدة لكلّ اسمٍ من أسماء المسجّلات المعطاة ويثبّت العمليّات المعيّنة في الآلة. ثم يستخدم <em>مُجمِّعًا (assembler)</em> (موصوفًا أدناه في <a href="/arabic-cs-library/book/sicp/c5-computing-with-register-machines/5-2/">5.2.2</a>) لتحويل قائمة المتحكّم إلى تعليماتٍ للآلة الجديدة ويثبّتها بوصفها تسلسل تعليمات الآلة. ويُعيد <code>Make-machine</code> نموذج الآلة المعدَّل قيمةً له.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-machine</span> register-names 
                      ops 
                      controller-text)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">machine</span> (<span class="hljs-name">make-new-machine</span>)))
    (<span class="hljs-name"><span class="hljs-built_in">for-each</span></span> (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (register-name)
                ((<span class="hljs-name">machine</span> <span class="hljs-symbol">&#x27;allocate-register</span>) 
                 register-name))
              register-names)
    ((<span class="hljs-name">machine</span> <span class="hljs-symbol">&#x27;install-operations</span>) ops)
    ((<span class="hljs-name">machine</span> <span class="hljs-symbol">&#x27;install-instruction-sequence</span>)
     (<span class="hljs-name">assemble</span> controller-text machine))
    machine))
</code></pre>
<h4>المسجّلات</h4>
<p>وسنمثّل المسجّل بإجراءٍ ذي حالة محلّيّة، كما في <a href="https://sarabander.github.io/sicp/html/Chapter-3.xhtml#Chapter-3">الفصل 3</a>. فالإجراء <code>make-register</code> يُنشئ مسجّلًا يحتفظ بقيمةٍ يمكن الاطلاع عليها أو تغييرها:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-register</span> name)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">contents</span> <span class="hljs-symbol">&#x27;*unassigned*</span>))
    (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">dispatch</span> message)
      (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;get</span>) contents)
            ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;set</span>)
             (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (value) 
               (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> contents value)))
            (<span class="hljs-name"><span class="hljs-built_in">else</span></span>
             (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Unknown request: 
                     REGISTER&quot;</span>
                    message))))
    dispatch))
</code></pre>
<p>والإجراءات التالية تُستخدم للوصول إلى المسجّلات:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">get-contents</span> register)
  (<span class="hljs-name">register</span> <span class="hljs-symbol">&#x27;get</span>))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">set-contents!</span> register value)
  ((<span class="hljs-name">register</span> <span class="hljs-symbol">&#x27;set</span>) value))
</code></pre>
<h4>المكدس</h4>
<p>ويمكننا أيضًا تمثيل المكدس بإجراءٍ ذي حالة محلّيّة. فالإجراء <code>make-stack</code> يُنشئ مكدسًا تتألّف حالته المحليّة من قائمةٍ بالعناصر الموجودة في المكدس. ويقبل المكدس طلبات <code>push</code> عنصرًا إلى المكدس، و<code>pop</code> العنصر الأعلى من المكدس وإعادته، و<code>initialize</code> المكدس ليصبح فارغًا.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-stack</span>)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">s</span> &#x27;()))
    (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">push</span> x)
      (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> s (<span class="hljs-name"><span class="hljs-built_in">cons</span></span> x s)))
    (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">pop</span>)
      (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">null?</span></span> s)
          (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Empty stack: POP&quot;</span>)
          (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">top</span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> s)))
            (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> s (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> s))
            top)))
    (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">initialize</span>)
      (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> s &#x27;())
      <span class="hljs-symbol">&#x27;done</span>)
    (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">dispatch</span> message)
      (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;push</span>) push)
            ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;pop</span>) (<span class="hljs-name">pop</span>))
            ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;initialize</span>) 
             (<span class="hljs-name">initialize</span>))
            (<span class="hljs-name"><span class="hljs-built_in">else</span></span> 
             (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Unknown request: STACK&quot;</span>
                    message))))
    dispatch))
</code></pre>
<p>والإجراءات التالية تُستخدم للوصول إلى الأكداس:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">pop</span> stack) (<span class="hljs-name">stack</span> <span class="hljs-symbol">&#x27;pop</span>))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">push</span> stack value)
  ((<span class="hljs-name">stack</span> <span class="hljs-symbol">&#x27;push</span>) value))
</code></pre>
<h4>الآلة الأساسيّة</h4>
<p>يبني الإجراء <code>make-new-machine</code>، المبيَّن في <a href="/arabic-cs-library/book/sicp/c5-computing-with-register-machines/5-2/">الشكل 5.13</a>، كائنًا تتألّف حالته المحليّة من مكدس، وتسلسل تعليماتٍ فارغٍ في بادئ الأمر، وقائمةٍ من العمليّات تحتوي في بادئ الأمر على عمليّةٍ لتهيئة المكدس، و<em>جدول مسجّلات</em> يحتوي في بادئ الأمر على مسجّلين، يُسمّيان <code>flag</code> و<code>pc</code> (اختصارًا لـ«عدّاد البرنامج»). ويُضيف الإجراء الداخليّ <code>allocate-register</code> مُدخلاتٍ جديدة إلى جدول المسجّلات، ويَبحَث الإجراء الداخليّ <code>lookup-register</code> عن المسجّلات في الجدول.</p>
<p><strong>الشكل 5.13:</strong> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>↓</mo></mrow><annotation encoding="application/x-tex">↓</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mrel">↓</span></span></span></span> الإجراء <code>make-new-machine</code>، الذي يُنفّذ نموذج الآلة الأساسيّ.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-new-machine</span>)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">pc</span> (<span class="hljs-name">make-register</span> <span class="hljs-symbol">&#x27;pc</span>))
        (<span class="hljs-name">flag</span> (<span class="hljs-name">make-register</span> <span class="hljs-symbol">&#x27;flag</span>))
        (<span class="hljs-name">stack</span> (<span class="hljs-name">make-stack</span>))
        (<span class="hljs-name">the-instruction-sequence</span> &#x27;()))
    (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">the-ops</span>
           (<span class="hljs-name"><span class="hljs-built_in">list</span></span> 
            (<span class="hljs-name"><span class="hljs-built_in">list</span></span> <span class="hljs-symbol">&#x27;initialize-stack</span>
                  (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> () 
                    (<span class="hljs-name">stack</span> <span class="hljs-symbol">&#x27;initialize</span>)))))
          (<span class="hljs-name">register-table</span>
           (<span class="hljs-name"><span class="hljs-built_in">list</span></span> (<span class="hljs-name"><span class="hljs-built_in">list</span></span> <span class="hljs-symbol">&#x27;pc</span> pc) 
                 (<span class="hljs-name"><span class="hljs-built_in">list</span></span> <span class="hljs-symbol">&#x27;flag</span> flag))))
      (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">allocate-register</span> name)
        (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">assoc</span></span> name register-table)
            (<span class="hljs-name">error</span> 
             <span class="hljs-string">&quot;Multiply defined register: &quot;</span> 
             name)
            (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> register-table
                  (<span class="hljs-name"><span class="hljs-built_in">cons</span></span> 
                   (<span class="hljs-name"><span class="hljs-built_in">list</span></span> name 
                         (<span class="hljs-name">make-register</span> name))
                   register-table)))
        <span class="hljs-symbol">&#x27;register-allocated</span>)
      (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">lookup-register</span> name)
        (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">val</span> 
               (<span class="hljs-name"><span class="hljs-built_in">assoc</span></span> name register-table)))
          (<span class="hljs-name"><span class="hljs-built_in">if</span></span> val
              (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> val)
              (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Unknown register:&quot;</span> 
                     name))))
      (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">execute</span>)
        (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">insts</span> (<span class="hljs-name">get-contents</span> pc)))
          (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">null?</span></span> insts)
              <span class="hljs-symbol">&#x27;done</span>
              (<span class="hljs-name"><span class="hljs-built_in">begin</span></span>
                ((<span class="hljs-name">instruction-execution-proc</span> 
                  (<span class="hljs-name"><span class="hljs-built_in">car</span></span> insts)))
                (<span class="hljs-name">execute</span>)))))
      (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">dispatch</span> message)
        (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;start</span>)
               (<span class="hljs-name">set-contents!</span> 
                pc
                the-instruction-sequence)
               (<span class="hljs-name">execute</span>))
              ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> 
                message 
                <span class="hljs-symbol">&#x27;install-instruction-sequence</span>)
               (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (seq) 
                 (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> 
                  the-instruction-sequence 
                  seq)))
              ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message 
                    <span class="hljs-symbol">&#x27;allocate-register</span>) 
               allocate-register)
              ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;get-register</span>) 
               lookup-register)
              ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message 
                    <span class="hljs-symbol">&#x27;install-operations</span>)
               (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (ops) 
                 (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> the-ops 
                       (<span class="hljs-name"><span class="hljs-built_in">append</span></span> the-ops ops))))
              ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;stack</span>) stack)
              ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;operations</span>) 
               the-ops)
              (<span class="hljs-name"><span class="hljs-built_in">else</span></span> (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Unknown request: 
                            MACHINE&quot;</span>
                           message))))
      dispatch)))
</code></pre>
<p>يُستخدم المسجّل <code>flag</code> للتحكّم في التفرّع في الآلة المحاكاة. فتعليمات <code>Test</code> تضبط محتويات <code>flag</code> بنتيجة الاختبار (صحيحة أو خاطئة). وتقرّر تعليمات <code>Branch</code> ما إذا كانت ستتفرّع أم لا بفحص محتويات <code>flag</code>.</p>
<p>يحدّد المسجّل <code>pc</code> تتابع التعليمات أثناء جريان الآلة. وهذا التتابع مُنفَّذٌ بالإجراء الداخليّ <code>execute</code>. ففي نموذج المحاكاة، كلّ تعليمة آلةٍ هي بنية بيانات تتضمّن إجراءً بلا معطيات، يُسمّى <em>إجراء تنفيذ التعليمة (instruction execution procedure)</em>، بحيث إنّ نداء هذا الإجراء يحاكي تنفيذ التعليمة. وأثناء جريان المحاكاة، يُشير <code>pc</code> إلى المكان في تسلسل التعليمات الذي تبدأ فيه التعليمة التالية المراد تنفيذها. و<code>Execute</code> يجلب تلك التعليمة، ويَنفّذها بنداء إجراء تنفيذ التعليمة، ويكرّر هذه الدورة حتّى لا تبقى تعليماتٌ لتنفيذها (أي حتّى يُشير <code>pc</code> إلى نهاية تسلسل التعليمات).</p>
<p>كجزءٍ من عمليّته، يُعدّل كلّ إجراءٍ لتنفيذ تعليمةٍ المسجّل <code>pc</code> للإشارة إلى التعليمة التالية المراد تنفيذها. فتعليمات <code>Branch</code> و<code>goto</code> تُغيّران <code>pc</code> ليُشير إلى الوجهة الجديدة. وجميع التعليمات الأخرى تُقدّم <code>pc</code> تقدّمًا بسيطًا، فتجعلُه يُشير إلى التعليمة التالية في التسلسل. ولاحِظ أنّ كلّ نداءٍ لـ<code>execute</code> يَنداء <code>execute</code> مرّةً أخرى، لكنّ هذا لا يُنتج حلقةً لا نهائيّةً لأنّ تشغيل إجراء تنفيذ التعليمة يُغيّر محتويات <code>pc</code>.</p>
<p>يُعيد <code>Make-new-machine</code> إجراء <code>dispatch</code> يُنفّذ وصولاً بتمرير الرسائل إلى الحالة الداخليّة. ولاحِظ أنّ تشغيل الآلة يُنجَز بتعيين <code>pc</code> إلى بداية تسلسل التعليمات ونداء <code>execute</code>.</p>
<p>وللتيسير، نوفّر واجهةً إجراءيّةً بديلةً لعمليّة <code>start</code> في الآلة، وكذلك إجراءاتٍ لتعيين محتويات المسجّلات وفحصها، كما هو محدَّدٌ في بداية <a href="/arabic-cs-library/book/sicp/c5-computing-with-register-machines/5-2/">5.2</a>:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">start</span> machine)
  (<span class="hljs-name">machine</span> <span class="hljs-symbol">&#x27;start</span>))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">get-register-contents</span> 
         machine register-name)
  (<span class="hljs-name">get-contents</span> 
   (<span class="hljs-name">get-register</span> machine register-name)))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">set-register-contents!</span> 
         machine register-name value)
  (<span class="hljs-name">set-contents!</span> 
   (<span class="hljs-name">get-register</span> machine register-name) 
   value)
  <span class="hljs-symbol">&#x27;done</span>)
</code></pre>
<p>وهذه الإجراءات (والعديد من الإجراءات في <a href="/arabic-cs-library/book/sicp/c5-computing-with-register-machines/5-2/">5.2.2</a> و<a href="/arabic-cs-library/book/sicp/c5-computing-with-register-machines/5-2/">5.2.3</a>) تستخدم ما يلي للبحث عن المسجّل ذي الاسم المعطى في آلةٍ معطاة:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">get-register</span> machine reg-name)
  ((<span class="hljs-name">machine</span> <span class="hljs-symbol">&#x27;get-register</span>) reg-name))
</code></pre>
<h4>5.2.2 المُجمِّع</h4>
<p>يحوّل المُجمِّع تسلسل تعابير المتحكّم لآلةٍ إلى قائمةٍ مقابلةٍ من تعليمات الآلة، كلٌّ منها بإجراء تنفيذه. وبصورةٍ عامّة، فإنّ المُجمِّع يشبه إلى حدٍّ كبيرٍ المقيّمات التي درسناها في <a href="https://sarabander.github.io/sicp/html/Chapter-4.xhtml#Chapter-4">الفصل 4</a> — فهناك لغة دخل (في هذه الحالة، لغة آلات المسجّلات) وينبغي أن نؤدّي فعلًا مناسبًا لكلّ نوعٍ من التعابير في اللغة.</p>
<p>وتقنيّة إنتاج إجراء تنفيذٍ لكلّ تعليمةٍ هي ذاتها التي استخدمناها في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e7">4.1.7</a> لتسريع المقيّم بفصل التحليل عن التنفيذ وقت التشغيل. فكما رأينا في <a href="https://sarabander.github.io/sicp/html/Chapter-4.xhtml#Chapter-4">الفصل 4</a>، فإنّ جزءًا كبيرًا من التحليل المفيد لتعبيرات Scheme يمكن أداؤه دون معرفة قيم المتغيّرات الفعليّة. وهنا، بالتماثل، فإنّ جزءًا كبيرًا من التحليل المفيد لتعبيرات لغة آلات المسجّلات يمكن أداؤه دون معرفة محتويات مسجّلات الآلة الفعليّة. فمثلًا، نستطيع استبدال الإشارات إلى المسجّلات بمؤشّراتٍ إلى كائنات المسجّل، ونستطيع استبدال الإشارات إلى اللصائق بمؤشّراتٍ إلى المكان في تسلسل التعليمات الذي تُعيّّنه اللصيقة.</p>
<p>وقبل أن يتمكّن من توليد إجراءات تنفيذ التعليمات، ينبغي أن يعرف المُجمِّع ما تشير إليه جميع اللصائق، فيبدأ بمسح نصّ المتحكّم لفصل اللصائق عن التعليمات. وأثناء مسحه النصّ، يبني قائمةً بالتعليمات وجدولًا يُقرن كلّ لصيقةٍ بمؤشّرٍ إلى داخل تلك القائمة. ثم يُنمّي المُجمِّع قائمة التعليمات بإدراج إجراء التنفيذ لكلّ تعليمة.</p>
<p>الإجراء <code>assemble</code> هو المدخل الرئيسيّ إلى المُجمِّع. وهو يأخذ نصّ المتحكّم ونموذج الآلة مَعطيين ويُعيد تسلسل التعليمات الذي سيُخزَّن في النموذج. ويَنداء <code>Assemble</code> الإجراء <code>extract-labels</code> لبناء قائمة التعليمات الأوّلية وجدول اللصائق من نصّ المتحكّم المعطى. والمَعطى الثاني إلى <code>extract-labels</code> هو إجراءٌ سيُنداء لمعالجة هذه النتائج: وهذا الإجراء يستخدم <code>update-insts!</code> لتوليد إجراءات تنفيذ التعليمات وإدراجها في قائمة التعليمات، ويُعيد القائمة المعدَّلة.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">assemble</span> controller-text machine)
  (<span class="hljs-name">extract-labels</span> controller-text
    (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (insts labels)
      (<span class="hljs-name">update-insts!</span> insts labels machine)
      insts)))
</code></pre>
<p>يأخذ <code>Extract-labels</code> مَعطيين: قائمةً <code>text</code> (تسلسل تعابير تعليمات المتحكّم) وإجراء <code>receive</code>. وسيُنداء <code>Receive</code> بقيمتين: (1) قائمةً <code>insts</code> من بنيات بيانات التعليمات، كلٌّ منها يحتوي تعليمةً من <code>text</code>؛ و(2) جدولًا يُسمّى <code>labels</code>، يُقرن كلّ لصيقةٍ من <code>text</code> بالموضع في القائمة <code>insts</code> الذي تُعيّّنه اللصيقة.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">extract-labels</span> text receive)
  (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">null?</span></span> text)
      (<span class="hljs-name">receive</span> &#x27;() &#x27;())
      (<span class="hljs-name">extract-labels</span> 
       (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> text)
       (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (insts labels)
         (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">next-inst</span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> text)))
           (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">symbol?</span></span> next-inst)
               (<span class="hljs-name">receive</span> 
                   insts
                   (<span class="hljs-name"><span class="hljs-built_in">cons</span></span> 
                    (<span class="hljs-name">make-label-entry</span> 
                     next-inst
                     insts)
                    labels))
               (<span class="hljs-name">receive</span> 
                   (<span class="hljs-name"><span class="hljs-built_in">cons</span></span> (<span class="hljs-name">make-instruction</span> 
                          next-inst)
                         insts)
                   labels)))))))
</code></pre>
<p>يعمل <code>Extract-labels</code> بمسح عناصر <code>text</code> تتابعيّ ليُراكِم <code>insts</code> و<code>labels</code>. فإن كان العنصر رمزًا (وهو إذن لصيقة) أُضيف مُدخلٌ مناسبٌ إلى جدول <code>labels</code>. وإلّا فالعنصر يُراكَم على قائمة <code>insts</code>.<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup></p>
<p>يُعدّل <code>Update-insts!</code> قائمة التعليمات، التي تحتوي في بادئ الأمر على نصّ التعليمات فقط، لتتضمّن إجراءات التنفيذ المقابلة:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">update-insts!</span> insts labels machine)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">pc</span> (<span class="hljs-name">get-register</span> machine <span class="hljs-symbol">&#x27;pc</span>))
        (<span class="hljs-name">flag</span> (<span class="hljs-name">get-register</span> machine <span class="hljs-symbol">&#x27;flag</span>))
        (<span class="hljs-name">stack</span> (<span class="hljs-name">machine</span> <span class="hljs-symbol">&#x27;stack</span>))
        (<span class="hljs-name">ops</span> (<span class="hljs-name">machine</span> <span class="hljs-symbol">&#x27;operations</span>)))
    (<span class="hljs-name"><span class="hljs-built_in">for-each</span></span>
     (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (inst)
       (<span class="hljs-name">set-instruction-execution-proc!</span>
        inst
        (<span class="hljs-name">make-execution-procedure</span>
         (<span class="hljs-name">instruction-text</span> inst) 
         labels
         machine
         pc
         flag
         stack
         ops)))
     insts)))
</code></pre>
<p>وبنية بيانات تعليمة الآلة تُقرن ببساطةٍ نصّ التعليمة بإجراء التنفيذ المقابل. وإجراء التنفيذ غير متوفّرٍ بعد حين يبني <code>extract-labels</code> التعليمة، ويُدرَج لاحقًا بـ<code>update-insts!</code>.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-instruction</span> text)
  (<span class="hljs-name"><span class="hljs-built_in">cons</span></span> text &#x27;()))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">instruction-text</span> inst) (<span class="hljs-name"><span class="hljs-built_in">car</span></span> inst))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">instruction-execution-proc</span> inst)
  (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> inst))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">set-instruction-execution-proc!</span>
         inst
         proc)
  (<span class="hljs-name"><span class="hljs-built_in">set-cdr!</span></span> inst proc))
</code></pre>
<p>نصّ التعليمة لا يستخدمه مُحاكينا، لكنّ من المفيد الاحتفاظ به للتّنقيح (انظر <a href="/arabic-cs-library/book/sicp/c5-computing-with-register-machines/5-2/">التمرين 5.16</a>).</p>
<p>وعناصر جدول اللصائق هي أزواج:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-label-entry</span> label-name insts)
  (<span class="hljs-name"><span class="hljs-built_in">cons</span></span> label-name insts))
</code></pre>
<p>وسيُبحَث عن المُدخلات في الجدول بـ</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">lookup-label</span> labels label-name)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">val</span> (<span class="hljs-name"><span class="hljs-built_in">assoc</span></span> label-name labels)))
    (<span class="hljs-name"><span class="hljs-built_in">if</span></span> val
        (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> val)
        (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Undefined label: ASSEMBLE&quot;</span> 
               label-name))))
</code></pre>
<p><strong>التمرين 5.8:</strong> إنّ شيفرة آلة المسجّلات التالية غامضة، لأنّ اللصيقة <code>here</code> مُعرَّفةٌ أكثر من مرّة:</p>
<pre><code class="language-scheme">start
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> here))
here
  (<span class="hljs-name">assign</span> a (<span class="hljs-name">const</span> <span class="hljs-number">3</span>))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> there))
here
  (<span class="hljs-name">assign</span> a (<span class="hljs-name">const</span> <span class="hljs-number">4</span>))
  (<span class="hljs-name">goto</span> (<span class="hljs-name">label</span> there))
there
</code></pre>
<p>بالمُحاكي كما هو مكتوب، فماذا ستكون محتويات المسجّل <code>a</code> حين يبلغ التحكّم <code>there</code>؟ عدّل الإجراء <code>extract-labels</code> بحيث يُشير المُجمِّع إلى خطأٍ إذا استُخدم اسم اللصيقة ذاته للإشارة إلى موضعين مختلفين.</p>
<h4>5.2.3 توليد إجراءات تنفيذ التعليمات</h4>
<p>يَنداء المُجمِّع <code>make-execution-procedure</code> لتوليد إجراء تنفيذ تعليمةٍ. فمثل الإجراء <code>analyze</code> في مقيّم <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e7">4.1.7</a>، فإنّه يُوزّع على نوع التعليمة لتوليد إجراء التنفيذ المناسب.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-execution-procedure</span> 
         inst labels machine pc flag stack ops)
  (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> inst) <span class="hljs-symbol">&#x27;assign</span>)
         (<span class="hljs-name">make-assign</span> 
          inst machine labels ops pc))
        ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> inst) <span class="hljs-symbol">&#x27;test</span>)
         (<span class="hljs-name">make-test</span> 
          inst machine labels ops flag pc))
        ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> inst) <span class="hljs-symbol">&#x27;branch</span>)
         (<span class="hljs-name">make-branch</span> 
          inst machine labels flag pc))
        ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> inst) <span class="hljs-symbol">&#x27;goto</span>)
         (<span class="hljs-name">make-goto</span> inst machine labels pc))
        ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> inst) <span class="hljs-symbol">&#x27;save</span>)
         (<span class="hljs-name">make-save</span> inst machine stack pc))
        ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> inst) <span class="hljs-symbol">&#x27;restore</span>)
         (<span class="hljs-name">make-restore</span> inst machine stack pc))
        ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> inst) <span class="hljs-symbol">&#x27;perform</span>)
         (<span class="hljs-name">make-perform</span>
          inst machine labels ops pc))
        (<span class="hljs-name"><span class="hljs-built_in">else</span></span> (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Unknown instruction 
                      type: ASSEMBLE&quot;</span>
                     inst))))
</code></pre>
<p>فلكلّ نوعٍ من التعليمات في لغة آلات المسجّلات، هناك مُولِّدٌ يبني إجراء تنفيذٍ مناسبًا. وتفاصيل هذه الإجراءات تحدّد صياغة تعليمات لغة آلات المسجّلات الفرديّة ومعناها جميعًا. ونحن نستخدم تجريد البيانات لعزل الصياغة المفصّلة لتعبيرات آلات المسجّلات عن آليّة التنفيذ العامّة، كما فعلنا مع المقيّمات في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e2">4.1.2</a>، وذلك باستخدام إجراءات الصياغة لاستخراج أجزاء التعليمة وتصنيفها.</p>
<h4>تعليمات <code>Assign</code></h4>
<p>إنّ الإجراء <code>make-assign</code> يتعامل مع تعليمات <code>assign</code>:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-assign</span> 
         inst machine labels operations pc)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">target</span> 
         (<span class="hljs-name">get-register</span> 
          machine 
          (<span class="hljs-name">assign-reg-name</span> inst)))
        (<span class="hljs-name">value-exp</span> (<span class="hljs-name">assign-value-exp</span> inst)))
    (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">value-proc</span>
           (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name">operation-exp?</span> value-exp)
               (<span class="hljs-name">make-operation-exp</span>
                value-exp 
                machine
                labels
                operations)
               (<span class="hljs-name">make-primitive-exp</span>
                (<span class="hljs-name"><span class="hljs-built_in">car</span></span> value-exp)
                machine
                labels))))
      (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> ()   <span class="hljs-comment">; execution procedure</span>
                   <span class="hljs-comment">; for assign</span>
        (<span class="hljs-name">set-contents!</span> target (<span class="hljs-name">value-proc</span>))
        (<span class="hljs-name">advance-pc</span> pc)))))
</code></pre>
<p>يستخرج <code>Make-assign</code> اسم المسجّل الهدف (العنصر الثاني من التعليمة) وتعبير القيمة (بقيّة القائمة التي تشكّل التعليمة) من تعليمة <code>assign</code> باستخدام المحدِّدات</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">assign-reg-name</span> assign-instruction)
  (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> assign-instruction))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">assign-value-exp</span> assign-instruction)
  (<span class="hljs-name">cddr</span> assign-instruction))
</code></pre>
<p>يُبحَث عن اسم المسجّل بـ<code>get-register</code> لإنتاج كائن المسجّل الهدف. وتعبير القيمة يُمرَّر إلى <code>make-operation-exp</code> إذا كانت القيمة نتيجة عمليّة، وإلى <code>make-primitive-exp</code> وإلّا. وهذه الإجراءات (المبيَّنة أدناه) تُحلّل تعبير القيمة وتُنتج إجراء تنفيذٍ للقيمة. وهذا إجراءٌ بلا معطيات، يُسمّى <code>value-proc</code>، سيُقيَّم أثناء المحاكاة لإنتاج القيمة الفعليّة التي ستُحلَّ في المسجّل. ولاحِظ أنّ عمل البحث عن اسم المسجّل وتحليل تعبير القيمة يُؤدّى مرّةً واحدةً فقط، في وقت التجميع، لا في كلّ مرّةٍ تُحاكى فيها التعليمة. وهذا الاقتصاد في العمل هو سبب استخدامنا إجراءات التنفيذ، ويقابل مباشرةً الاقتصاد في العمل الذي حصلنا عليه بفصل تحليل البرنامج عن تنفيذه في مقيّم <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e7">4.1.7</a>.</p>
<p>والنتيجة التي يُعيدها <code>make-assign</code> هي إجراء تنفيذ تعليمة <code>assign</code>. وحين يُنداء هذا الإجراء (بإجراء <code>execute</code> الخاصّ بنموذج الآلة)، فإنّه يضبط محتويات المسجّل الهدف بالقيمة المتحصّلة من تنفيذ <code>value-proc</code>. ثم يُقدّم <code>pc</code> إلى التعليمة التالية بتشغيل الإجراء</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">advance-pc</span> pc)
  (<span class="hljs-name">set-contents!</span> pc (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> (<span class="hljs-name">get-contents</span> pc))))
</code></pre>
<p>إنّ <code>Advance-pc</code> هي النهاية الطبيعيّة لجميع التعليمات ما عدا <code>branch</code> و<code>goto</code>.</p>
<h4>تعليمات <code>Test</code> و<code>branch</code> و<code>goto</code></h4>
<p>يتعامل <code>Make-test</code> مع تعليمات <code>test</code> على نحوٍ مماثل. فإنّه يستخرج التعبير الذي يحدّد الشرط المراد اختباره ويولّد إجراء تنفيذٍ له. في وقت المحاكاة، يُنداء إجراء الشرط، وتُحلّ النتيجة في المسجّل <code>flag</code>، ويُقدَّم <code>pc</code>:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> 
  (<span class="hljs-name">make-test</span> 
   inst machine labels operations flag pc)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">condition</span> (<span class="hljs-name">test-condition</span> inst)))
    (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name">operation-exp?</span> condition)
        (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">condition-proc</span>
               (<span class="hljs-name">make-operation-exp</span>
                condition 
                machine
                labels
                operations)))
          (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> () 
            (<span class="hljs-name">set-contents!</span> 
             flag (<span class="hljs-name">condition-proc</span>))
            (<span class="hljs-name">advance-pc</span> pc)))
        (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Bad TEST instruction: 
                ASSEMBLE&quot;</span> inst))))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">test-condition</span> test-instruction)
  (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> test-instruction))
</code></pre>
<p>يفحص إجراء التنفيذ الخاص بتعليمة <code>branch</code> محتويات مسجّل <code>flag</code> وإمّا أن يضبط محتويات <code>pc</code> على مقصد التفريع (إذا أُخذ التفريع) وإمّا أن يُقدّم <code>pc</code> فقط (إذا لم يُؤخذ التفريع). لاحِظ أنّ المقصد المُشار إليه في تعليمة <code>branch</code> يجب أن يكون لافتة، وإجراء <code>make-branch</code> يفرض ذلك. لاحِظ أيضًا أنّ اللافتة تُبحَث عند التجميع، لا في كلّ مرّةٍ تُحاكى فيها تعليمة <code>branch</code>.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> 
  (<span class="hljs-name">make-branch</span> 
   inst machine labels flag pc)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">dest</span> (<span class="hljs-name">branch-dest</span> inst)))
    (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name">label-exp?</span> dest)
        (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">insts</span>
               (<span class="hljs-name">lookup-label</span> 
                labels 
                (<span class="hljs-name">label-exp-label</span> dest))))
          (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> ()
            (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name">get-contents</span> flag)
                (<span class="hljs-name">set-contents!</span> pc insts)
                (<span class="hljs-name">advance-pc</span> pc))))
        (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Bad BRANCH instruction: 
                ASSEMBLE&quot;</span>
               inst))))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">branch-dest</span> branch-instruction)
  (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> branch-instruction))
</code></pre>
<p>تشبه تعليمة <code>goto</code> التفريع، إلّا أنّ المقصد يمكن أن يُحدَّد إمّا كلافتةٍ وإمّا كمسجّل، ولا يوجد شرطٌ يُفحص — فـ<code>pc</code> يُضبَط دائمًا على المقصد الجديد.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-goto</span> inst machine labels pc)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">dest</span> (<span class="hljs-name">goto-dest</span> inst)))
    (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name">label-exp?</span> dest)
           (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">insts</span>
                  (<span class="hljs-name">lookup-label</span> 
                   labels
                   (<span class="hljs-name">label-exp-label</span> dest))))
             (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> () 
               (<span class="hljs-name">set-contents!</span> pc insts))))
          ((<span class="hljs-name">register-exp?</span> dest)
           (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">reg</span>
                  (<span class="hljs-name">get-register</span> 
                   machine
                   (<span class="hljs-name">register-exp-reg</span> dest))))
             (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> ()
               (<span class="hljs-name">set-contents!</span> 
                pc
                (<span class="hljs-name">get-contents</span> reg)))))
          (<span class="hljs-name"><span class="hljs-built_in">else</span></span> (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Bad GOTO instruction: 
                        ASSEMBLE&quot;</span>
                       inst)))))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">goto-dest</span> goto-instruction)
  (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> goto-instruction))
</code></pre>
<h4>تعليمات أخرى</h4>
<p>تستخدم تعليمتا المكدس <code>save</code> و<code>restore</code> المكدس مع المسجّل المُعيَّن ببساطةٍ وتُقدّمان <code>pc</code>:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-save</span> inst machine stack pc)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">reg</span> (<span class="hljs-name">get-register</span> 
              machine
              (<span class="hljs-name">stack-inst-reg-name</span> inst))))
    (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> ()
      (<span class="hljs-name">push</span> stack (<span class="hljs-name">get-contents</span> reg))
      (<span class="hljs-name">advance-pc</span> pc))))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-restore</span> inst machine stack pc)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">reg</span> (<span class="hljs-name">get-register</span>
              machine
              (<span class="hljs-name">stack-inst-reg-name</span> inst))))
    (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> ()
      (<span class="hljs-name">set-contents!</span> reg (<span class="hljs-name">pop</span> stack))
      (<span class="hljs-name">advance-pc</span> pc))))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">stack-inst-reg-name</span> 
         stack-instruction)
  (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> stack-instruction))
</code></pre>
<p>إنّ نوع التعليمة الأخير، الذي يتعامل معه <code>make-perform</code>، يُنشئ إجراء تنفيذٍ للفعل الذي ينبغي أداؤه. وفي وقت المحاكاة، يُنفَّذ إجراء الفعل ويُقدَّم <code>pc</code>.</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-perform</span> 
         inst machine labels operations pc)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">action</span> (<span class="hljs-name">perform-action</span> inst)))
    (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name">operation-exp?</span> action)
        (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">action-proc</span>
               (<span class="hljs-name">make-operation-exp</span>
                action
                machine
                labels
                operations)))
          (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> ()
            (<span class="hljs-name">action-proc</span>)
            (<span class="hljs-name">advance-pc</span> pc)))
        (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Bad PERFORM instruction: 
                ASSEMBLE&quot;</span>
               inst))))

(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">perform-action</span> inst) (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> inst))
</code></pre>
<h4>إجراءات تنفيذ التعابير الجزئيّة</h4>
<p>قد تكون قيمة تعبير <code>reg</code> أو <code>label</code> أو <code>const</code> لازمةً للإحلال إلى مسجّل (<code>make-assign</code>) أو كمدخلٍ لعمليّة (<code>make-operation-exp</code>، أدناه). والإجراء الآتي يُنشئ إجراءات تنفيذٍ لإنتاج قيم هذه التعابير أثناء المحاكاة:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-primitive-exp</span> exp machine labels)
  (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name">constant-exp?</span> exp)
         (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">c</span> (<span class="hljs-name">constant-exp-value</span> exp)))
           (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> () c)))
        ((<span class="hljs-name">label-exp?</span> exp)
         (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">insts</span>
                (<span class="hljs-name">lookup-label</span> 
                 labels
                 (<span class="hljs-name">label-exp-label</span> exp))))
           (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> () insts)))
        ((<span class="hljs-name">register-exp?</span> exp)
         (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">r</span> (<span class="hljs-name">get-register</span>
                   machine
                   (<span class="hljs-name">register-exp-reg</span> exp))))
           (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> () (<span class="hljs-name">get-contents</span> r))))
        (<span class="hljs-name"><span class="hljs-built_in">else</span></span> (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Unknown expression type: 
                      ASSEMBLE&quot;</span>
                     exp))))
</code></pre>
<p>تُحدَّد صياغة تعابير <code>reg</code> و<code>label</code> و<code>const</code> بـ</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">register-exp?</span> exp)
  (<span class="hljs-name">tagged-list?</span> exp <span class="hljs-symbol">&#x27;reg</span>))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">register-exp-reg</span> exp)
  (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> exp))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">constant-exp?</span> exp)
  (<span class="hljs-name">tagged-list?</span> exp <span class="hljs-symbol">&#x27;const</span>))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">constant-exp-value</span> exp)
  (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> exp))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">label-exp?</span> exp)
  (<span class="hljs-name">tagged-list?</span> exp <span class="hljs-symbol">&#x27;label</span>))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">label-exp-label</span> exp) 
  (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> exp))
</code></pre>
<p>قد تتضمّن تعليمات <code>assign</code> و<code>perform</code> و<code>test</code> تطبيق عمليّة آلةٍ (مُحدَّدةً بتعبير <code>op</code>) على بعض العوامل (مُحدَّدةً بتعبيرات <code>reg</code> و<code>const</code>). والإجراء الآتي يُنتج إجراء تنفيذٍ «لتعبير عمليّة» — وهو قائمةٌ تحتوي تعبير العمليّة وتعبيرات العوامل الآتية من التعليمة:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-operation-exp</span>
         exp machine labels operations)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">op</span> (<span class="hljs-name">lookup-prim</span> 
             (<span class="hljs-name">operation-exp-op</span> exp)
             operations))
        (<span class="hljs-name">aprocs</span>
         (<span class="hljs-name"><span class="hljs-built_in">map</span></span> (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (e)
                (<span class="hljs-name">make-primitive-exp</span> 
                 e machine labels))
              (<span class="hljs-name">operation-exp-operands</span> exp))))
    (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> () (<span class="hljs-name"><span class="hljs-built_in">apply</span></span> op (<span class="hljs-name"><span class="hljs-built_in">map</span></span> (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> (p) (<span class="hljs-name">p</span>))
                              aprocs)))))
</code></pre>
<p>تُحدَّد صياغة تعابير العمليّات بـ</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">operation-exp?</span> exp)
  (<span class="hljs-name"><span class="hljs-built_in">and</span></span> (<span class="hljs-name"><span class="hljs-built_in">pair?</span></span> exp)
       (<span class="hljs-name">tagged-list?</span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> exp) <span class="hljs-symbol">&#x27;op</span>)))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">operation-exp-op</span> operation-exp)
  (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> operation-exp)))
(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">operation-exp-operands</span> operation-exp)
  (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> operation-exp))
</code></pre>
<p>لاحِظ أنّ معالجة تعابير العمليّات تشبه إلى حدٍّ بعيدٍ معالجة تطبيقات الإجراءات التي يجريها الإجراء <code>analyze-application</code> في المقيّم الوارد في <a href="https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e7">4.1.7</a>، من حيث أنّنا نُنشئ إجراء تنفيذٍ لكلّ عامل. وفي وقت المحاكاة، نستدعي إجراءات العوامل ونطبّق إجراء Scheme الذي يحاكي العمليّة على القيم الناتجة. ويُوجَد إجراء المحاكاة بالبحث عن اسم العمليّة في جدول عمليّات الآلة:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">lookup-prim</span> symbol operations)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">val</span> (<span class="hljs-name"><span class="hljs-built_in">assoc</span></span> symbol operations)))
    (<span class="hljs-name"><span class="hljs-built_in">if</span></span> val
        (<span class="hljs-name"><span class="hljs-built_in">cadr</span></span> val)
        (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Unknown operation: ASSEMBLE&quot;</span>
               symbol))))
</code></pre>
<blockquote>
<p><strong>التمرين 5.9:</strong> إنّ معالجة عمليّات الآلة أعلاه تسمح لها بالعمل على اللافتات إضافةً إلى الثوابت ومحتويات المسجّلات. عدّل إجراءات معالجة التعابير لفرض الشرط القائل إنّ العمليّات لا يمكن استخدامها إلّا مع المسجّلات والثوابت.</p>
</blockquote>
<blockquote>
<p><strong>التمرين 5.10:</strong> صمِّم صياغةً جديدةً لتعليمات آلة المسجّلات وعدّل المحاكي ليستخدم صياغتك الجديدة. فهل تستطيع تنفيذ صياغتك الجديدة دون تغيير أيّ جزءٍ من المحاكي ما عدا إجراءات الصياغة في هذا القسم؟</p>
</blockquote>
<p><strong>التمرين 5.11:</strong> حين استحدثنا <code>save</code> و<code>restore</code> في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#g_t5_002e1_002e4">5.1.4</a>، لم نُحدّد ما يحدث إذا حاولت استعادة مسجّلٍ ليس آخر ما حُفظ، كما في التسلسل</p>
<pre><code class="language-scheme">(<span class="hljs-name">save</span> y)
(<span class="hljs-name">save</span> x)
(<span class="hljs-name">restore</span> y)
</code></pre>
<p>ثمّة عدّة احتمالاتٍ معقولةٍ لمعنى <code>restore</code>:</p>
<ol>
<li><code>(restore y)</code> يضع في <code>y</code> آخر قيمةٍ حُفظت في المكدس، أياً يكن المسجّل الذي جاءت منه تلك القيمة. وهذا هو سلوك محاكينا. أظهر كيف يمكن استثمار هذا السلوك لإلغاء تعليمةٍ واحدةٍ من آلة فيبوناتشي الواردة في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#g_t5_002e1_002e4">5.1.4</a> (<a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#Figure-5_002e12">الشكل 5.12</a>).</li>
<li><code>(restore y)</code> يضع في <code>y</code> آخر قيمةٍ حُفظت في المكدس، لكن فقط إذا كانت تلك القيمة قد حُفظت من <code>y</code>؛ وإلّا فإنّه يُشير إلى خطأٍ. عدّل المحاكي ليسلوك هذا السلوك. سيتعيّن عليك تغيير <code>save</code> ليضع اسم المسجّل في المكدس إلى جانب القيمة.</li>
<li><code>(restore y)</code> يضع في <code>y</code> آخر قيمةٍ حُفظت من <code>y</code> أياً تكن المسجّلات الأخرى التي حُفظت بعد <code>y</code> ولم تُستعَد. عدّل المحاكي ليسلوك هذا السلوك. سيتعيّن عليك ربط مكدسٍ منفصلٍ بكلّ مسجّلٍ. وينبغي أن تجعل عمليّة <code>initialize-stack</code> تُهيّئ جميع مكدسات المسجّلات.</li>
</ol>
<blockquote>
<p><strong>التمرين 5.12:</strong> يمكن استخدام المحاكي للمساعدة في تحديد مسار البيانات المطلوب لتنفيذ آلةٍ بمتحكّمٍ معطى. وسّع المُجمِّع ليخزّن المعلومات الآتية في نموذج الآلة: قائمةٌ بجميع التعليمات، بعد إزالة المكرّر منها، مرتّبةً بحسب نوع التعليمة (<code>assign</code> و<code>goto</code> وما شابه)؛</p>
<blockquote>
<p>قائمةٌ (دون مكرّراتٍ) بالمسجّلات المستخدمة لحفظ نقاط الدخول (وهي المسجّلات التي تشير إليها تعليمات <code>goto</code>)؛
قائمةٌ (دون مكرّراتٍ) بالمسجّلات التي تُحفَظ بـ<code>save</code> أو تُستعَد بـ<code>restore</code>؛
وبالنسبة لكلّ مسجّلٍ، قائمةٌ (دون مكرّراتٍ) بالمصادر التي يُحلَّل منها (فمثلًا، مصادر المسجّل <code>val</code> في آلة العامليّة الواردة في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#Figure-5_002e11">الشكل 5.11</a> هي <code>(const 1)</code> و<code>((op *) (reg n) (reg val))</code>).</p>
<p>وسّع واجهة تمرير الرسائل إلى الآلة لتوفير النفاذ إلى هذه المعلومات الجديدة. ولاختبار مُحلِّلك، عرّف آلة فيبوناتشي من <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#Figure-5_002e12">الشكل 5.12</a> وافحص القوائم التي بنيتها.</p>
</blockquote>
</blockquote>
<blockquote>
<p><strong>التمرين 5.13:</strong> عدّل المحاكي كي يستخدم تسلسل المتحكّم لتحديد المسجّلات التي تمتلكها الآلة بدلًا من اشتراط قائمةٍ بالمسجّلات كمعطىً لـ<code>make-machine</code>. فبدلًا من تخصيص المسجّلات مُسبقًا في <code>make-machine</code>، يمكنك تخصيصها واحدةً تلو الأخرى حين تُشاهَد أوّلَ مرّةٍ أثناء تجميع التعليمات.</p>
</blockquote>
<h4>5.2.4 مراقبة أداء الآلة</h4>
<p>المحاكاة مفيدةٌ لا للتحقّق من صحّة تصميم آلةٍ مقترحةٍ فحسب، بل أيضًا لقياس أداء الآلة. فإنّا نستطيع، مثلًا، تثبيت «مقياس» في برنامج المحاكاة لدينا يقيس عدد عمليّات المكدس المستخدمة في احتسابٍ ما. ولفعل ذلك، نعدّل مكدسنا المحاكى كي يُتابع عدد المرّات التي تُحفَظ فيها المسجّلات في المكدس وأقصى عمقٍ يبلغه المكدس، ونُضيف رسالةً إلى واجهة المكدس تطبع الإحصائيّات، كما هو موضّح أدناه. ونُضيف أيضًا عمليّةً إلى نموذج الآلة الأساسيّ لطبع إحصائيّات المكدس، بتهيئة <code>the-ops</code> في <code>make-new-machine</code> إلى</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">list</span></span> (<span class="hljs-name"><span class="hljs-built_in">list</span></span> <span class="hljs-symbol">&#x27;initialize-stack</span>
            (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> () 
              (<span class="hljs-name">stack</span> <span class="hljs-symbol">&#x27;initialize</span>)))
      (<span class="hljs-name"><span class="hljs-built_in">list</span></span> <span class="hljs-symbol">&#x27;print-stack-statistics</span>
            (<span class="hljs-name"><span class="hljs-built_in">lambda</span></span> () 
              (<span class="hljs-name">stack</span> <span class="hljs-symbol">&#x27;print-statistics</span>))))
</code></pre>
<p>وها هو الإصدار الجديد من <code>make-stack</code>:</p>
<pre><code class="language-scheme">(<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">make-stack</span>)
  (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">s</span> &#x27;())
        (<span class="hljs-name">number-pushes</span> <span class="hljs-number">0</span>)
        (<span class="hljs-name">max-depth</span> <span class="hljs-number">0</span>)
        (<span class="hljs-name">current-depth</span> <span class="hljs-number">0</span>))
    (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">push</span> x)
      (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> s (<span class="hljs-name"><span class="hljs-built_in">cons</span></span> x s))
      (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> number-pushes (<span class="hljs-name"><span class="hljs-built_in">+</span></span> <span class="hljs-number">1</span> number-pushes))
      (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> current-depth (<span class="hljs-name"><span class="hljs-built_in">+</span></span> <span class="hljs-number">1</span> current-depth))
      (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> max-depth 
            (<span class="hljs-name"><span class="hljs-built_in">max</span></span> current-depth max-depth)))
    (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">pop</span>)
      (<span class="hljs-name"><span class="hljs-built_in">if</span></span> (<span class="hljs-name"><span class="hljs-built_in">null?</span></span> s)
          (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Empty stack: POP&quot;</span>)
          (<span class="hljs-name"><span class="hljs-built_in">let</span></span> ((<span class="hljs-name">top</span> (<span class="hljs-name"><span class="hljs-built_in">car</span></span> s)))
            (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> s (<span class="hljs-name"><span class="hljs-built_in">cdr</span></span> s))
            (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> current-depth
                  (<span class="hljs-name"><span class="hljs-built_in">-</span></span> current-depth <span class="hljs-number">1</span>))
            top)))
    (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">initialize</span>)
      (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> s &#x27;())
      (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> number-pushes <span class="hljs-number">0</span>)
      (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> max-depth <span class="hljs-number">0</span>)
      (<span class="hljs-name"><span class="hljs-built_in">set!</span></span> current-depth <span class="hljs-number">0</span>)
      <span class="hljs-symbol">&#x27;done</span>)

    (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">print-statistics</span>)
      (<span class="hljs-name"><span class="hljs-built_in">newline</span></span>)
      (<span class="hljs-name"><span class="hljs-built_in">display</span></span> (<span class="hljs-name"><span class="hljs-built_in">list</span></span> <span class="hljs-symbol">&#x27;total-pushes</span> 
                     <span class="hljs-symbol">&#x27;=</span> 
                     number-pushes
                     <span class="hljs-symbol">&#x27;maximum-depth</span>
                     <span class="hljs-symbol">&#x27;=</span>
                     max-depth)))
    (<span class="hljs-name"><span class="hljs-built_in">define</span></span> (<span class="hljs-name">dispatch</span> message)
      (<span class="hljs-name"><span class="hljs-built_in">cond</span></span> ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;push</span>) push)
            ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;pop</span>) (<span class="hljs-name">pop</span>))
            ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;initialize</span>)
             (<span class="hljs-name">initialize</span>))
            ((<span class="hljs-name"><span class="hljs-built_in">eq?</span></span> message <span class="hljs-symbol">&#x27;print-statistics</span>)
             (<span class="hljs-name">print-statistics</span>))
            (<span class="hljs-name"><span class="hljs-built_in">else</span></span>
             (<span class="hljs-name">error</span> <span class="hljs-string">&quot;Unknown request: STACK&quot;</span>
                    message))))
    dispatch))
</code></pre>
<p>يصف <a href="/arabic-cs-library/book/sicp/c5-computing-with-register-machines/5-2/">التمرين 5.15</a> إلى <a href="/arabic-cs-library/book/sicp/c5-computing-with-register-machines/5-2/">التمرين 5.19</a> ميزات مراقبةٍ وتنقيحٍ مفيدةً أخرى يمكن إضافتها إلى محاكي آلة المسجّلات.</p>
<blockquote>
<p><strong>التمرين 5.14:</strong> قِس عدد الدفعات وأقصى عمقٍ للمكدس اللازمين لاحتساب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo stretchy="false">!</mo></mrow><annotation encoding="application/x-tex">n !</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">n</span><span class="mclose">!</span></span></span></span> لقيمٍ صغيرةٍ متنوّعةٍ لـ<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> باستخدام آلة العامليّة الموضّحة في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#Figure-5_002e11">الشكل 5.11</a>. واستنبط من بياناتك صيغًا بدلالة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> للعدد الكلّي لعمليّات الدفع ولأقصى عمقٍ للمكدس يُستخدم في احتساب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo stretchy="false">!</mo></mrow><annotation encoding="application/x-tex">n !</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">n</span><span class="mclose">!</span></span></span></span> لأيّ <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>&gt;</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">n &gt; 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> . ولاحِظ أنّ كُلًّا من هذين دالّةٌ خطّيّةٌ في <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> وبالتالي تُحدَّد بثابتين. ولكي تُطبع الإحصائيّات، سيتعيّن عليك توسيع آلة العامليّة بتعليماتِ تهيئة المكدس وطبع الإحصائيّات. وقد ترغب أيضًا في تعديل الآلة كي تقرأ قيمة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> مرارًا، وتحسب العامليّة، وتطبع النتيجة (كما فعلنا لآلة القاسم المشترك الأكبر في <a href="https://sarabander.github.io/sicp/html/5_002e1.xhtml#Figure-5_002e4">الشكل 5.4</a>)، بحيث لا يضطرّك الأمر إلى استدعاء <code>get-register-contents</code> و<code>set-register-contents!</code> و<code>start</code> مرارًا.</p>
</blockquote>
<blockquote>
<p><strong>التمرين 5.15:</strong> أضِف <em>عدّ التعليمات</em> إلى محاكاة آلة المسجّلات. أي اجعل نموذج الآلة يُتابع عدد التعليمات المُنفَّذة. وسّع واجهة نموذج الآلة لتقبل رسالةً جديدةً تطبع قيمة عدّاد التعليمات وتُصفّر العدّاد.</p>
</blockquote>
<blockquote>
<p><strong>التمرين 5.16:</strong> وسّع المحاكي ليتيح <em>تتبّع التعليمات</em>. أي قبل تنفيذ كلّ تعليمةٍ، ينبغي أن يطبع المحاكي نصّ التعليمة. واجعل نموذج الآلة يقبل رسالتي <code>trace-on</code> و<code>trace-off</code> لتشغيل التتبّع وإيقافه.</p>
</blockquote>
<blockquote>
<p><strong>التمرين 5.17:</strong> وسّع تتبّع التعليمات الوارد في <a href="/arabic-cs-library/book/sicp/c5-computing-with-register-machines/5-2/">التمرين 5.16</a> بحيث يطبع المحاكي، قبل طبع تعليمةٍ ما، أيّ لافتاتٍ تسبق تلك التعليمة مباشرةً في تسلسل المتحكّم. واحرص على فعل ذلك بطريقةٍ لا تتداخل مع عدّ التعليمات (<a href="/arabic-cs-library/book/sicp/c5-computing-with-register-machines/5-2/">التمرين 5.15</a>). وسيتعيّن عليك أن تجعل المحاكي يحتفظ بمعلومات اللافتات اللازمة.</p>
</blockquote>
<blockquote>
<p><strong>التمرين 5.18:</strong> عدّل إجراء <code>make-register</code> الوارد في <a href="/arabic-cs-library/book/sicp/c5-computing-with-register-machines/5-2/">5.2.1</a> بحيث يمكن تتبّع المسجّلات. وينبغي أن تقبل المسجّلات رسائل تُشغّل التتبّع وتُوقفه. وحين يُتْبَع مسجّلٌ ما، ينبغي أن يطبع إحلال قيمةٍ إلى المسجّل اسم المسجّل والمحتويات القديمة للمسجّل والمحتويات الجديدة التي تُحلَّل إليها. وسّع الواجهة إلى نموذج الآلة لتسمح لك بتشغيل التتبّع وإيقافه لمسجّلات آلةٍ معيَّنةٍ منها.</p>
</blockquote>
<p><strong>التمرين 5.19:</strong> تُريد أليسا ب. هاكر ميزة <em>نقطة توقّف</em> في المحاكي تساعدها على تنقيح تصاميم آلاتها. وقد عُهد إليك بتثبيت هذه الميزة لها. وهي تُريد أن تكون قادرةً على تحديد موضعٍ في تسلسل المتحكّم يتوقّف عنده المحاكي ويتيح لها فحص حالة الآلة. ومهمّتك تنفيذ الإجراء</p>
<pre><code class="language-scheme">(<span class="hljs-name">set-breakpoint</span> ⟨machine⟩ ⟨label⟩ ⟨n⟩)
</code></pre>
<p>الذي يضع نقطة توقّفٍ قبل التعليمة رقم <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>n</mi><mrow><mi>t</mi><mi>h</mi></mrow></msup></mrow><annotation encoding="application/x-tex">n^{th}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8491em;"></span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">t</span><span class="mord mathnormal mtight">h</span></span></span></span></span></span></span></span></span></span></span></span> بعد اللافتة المعطاة. مثلًا،</p>
<pre><code class="language-scheme">(<span class="hljs-name">set-breakpoint</span> gcd-machine <span class="hljs-symbol">&#x27;test-b</span> <span class="hljs-number">4</span>)
</code></pre>
<p>يثبّت نقطة توقّفٍ في <code>gcd-machine</code> قبل الإحلال إلى المسجّل <code>a</code>. وحين يبلغ المحاكي نقطة التوقّف، ينبغي أن يطبع اللافتة وإزاحة نقطة التوقّف وأن يتوقّف عن تنفيذ التعليمات. وبوسع أليسا حينها استخدام <code>get-register-contents</code> و<code>set-register-contents!</code> للتلاعب بحالة الآلة المحاكاة. وينبغي أن تقدر بعد ذلك على متابعة التنفيذ بقولها</p>
<pre><code class="language-scheme">(<span class="hljs-name">proceed-machine</span> ⟨machine⟩)
</code></pre>
<p>وينبغي أن تقدر أيضًا على إزالة نقطة توقّفٍ معيّنةٍ بـ</p>
<pre><code class="language-scheme">(<span class="hljs-name">cancel-breakpoint</span> ⟨machine⟩ ⟨label⟩ ⟨n⟩)
</code></pre>
<p>أو على إزالة جميع نقاط التوقّف بـ</p>
<pre><code class="language-scheme">(<span class="hljs-name">cancel-all-breakpoints</span> ⟨machine⟩)
</code></pre>
<hr class="footnotes-sep">
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1" class="footnote-item"><p>استخدام إجراء <code>receive</code> هنا طريقةٌ لجعل <code>extract-labels</code> يُعيد فعليًّا قيمتين—<code>labels</code> و<code>insts</code>—دون أن نُشكّل صراحةً بنية بيانات مركّبةٍ للاحتفاظ بهما. ثمّة تنفيذٌ بديل يُعيد زوجًا صريحًا من القيم، وهو <code>scheme (define (extract-labels text) (if (null? text) (cons '() '()) (let ((result (extract-labels (cdr text)))) (let ((insts (car result)) (labels (cdr result))) (let ((next-inst (car text))) (if (symbol? next-inst) (cons insts (cons (make-label-entry next-inst insts) labels)) (cons (cons (make-instruction next-inst) insts) labels))))))) </code> <a href="#fnref1" class="footnote-backref">↩︎</a></p>
</li>
</ol>
</section>
`,t={book:s,chapter:a,chapterTitle:n,slug:"5-2",title:e,headings:l,html:p};export{s as book,a as chapter,n as chapterTitle,t as default,l as headings,p as html,c as slug,e as title};
