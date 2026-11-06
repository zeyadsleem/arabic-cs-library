---
title: "5.2 محاكي آلة مسجّلات"
lang: ar
---

### 5.2 محاكي آلة مسجّلات

ولنكتسب فهمًا حسنًا لتصميم آلات المسجّلات، يتحتّم علينا أن نختبر الآلات التي نصمّمها لنرى ما إذا كانت تؤدّي كما هو متوقّع. وإحدى طرق اختبار تصميمٍ هي محاكاة تشغيل المتحكّم يدويًّا، كما في [التمرين 5.5](https://sarabander.github.io/sicp/html/5_002e1.xhtml#Exercise-5_002e5). لكنّ هذا أمرٌ بالغ المملّة في جميع الآلات ما عدا أبسطها. ونبني في هذا القسم محاكيًا للآلات الموصوفة بلغة آلات المسجّلات. والمحاكي برنامج Scheme فيه أربعة إجراءات واجهة. فالأوّل يستخدم وصف آلة مسجّلاتٍ لبناء نموذج للآلة (بنية بياناتٍ أجزاؤها تقابل أجزاء الآلة التي تُحاكى)، والثلاثة الأخرى تسمح لنا بمحاكاة الآلة بالتلاعب بالنموذج:

```scheme
(make-machine ⟨register-names⟩
              ⟨operations⟩
              ⟨controller⟩)
```

يبني نموذجًا للآلة ذات المسجّلات والعمليّات والمتحكّم المعطاة، ويُعيده.

```scheme
(set-register-contents! ⟨machine-model⟩ 
                        ⟨register-name⟩ 
                        ⟨value⟩)
```

يُخزّن قيمةً في مسجّلٍ محاكىً في الآلة المعطاة.

```scheme
(get-register-contents ⟨machine-model⟩
                       ⟨register-name⟩)
```

يُعيد محتويات مسجّلٍ محاكىً في الآلة المعطاة.

```scheme
(start ⟨machine-model⟩)
```

يحاكي تنفيذ الآلة المعطاة، بدءًا من بداية تسلسل المتحكّم وتوقّفًا حين يبلغ نهاية التسلسل.

ومثالٌ على كيفيّة استخدام هذه الإجراءات، يمكننا تعريف `gcd-machine` ليكون نموذجًا لآلة GCD الواردة في [5.1.1](https://sarabander.github.io/sicp/html/5_002e1.xhtml#g_t5_002e1_002e1) كما يلي:

```scheme
(define gcd-machine
  (make-machine
   '(a b t)
   (list (list 'rem remainder) (list '= =))
   '(test-b
       (test (op =) (reg b) (const 0))
       (branch (label gcd-done))
       (assign t (op rem) (reg a) (reg b))
       (assign a (reg b))
       (assign b (reg t))
       (goto (label test-b))
     gcd-done)))
```

المَعطى الأوّل إلى `make-machine` هو قائمةٌ بأسماء المسجّلات. والمَعطى التالي هو جدول (قائمةٌ من قوائمٍ ثنائيّة العناصر) يُقرن كلّ اسم عمليّةٍ فيه بإجراءٍ من Scheme يُنفّذ تلك العمليّة (أي يُنتج قيمة الخرج ذاتها عند إعطائه قيم الدخل ذاتها). وأمّا المَعطى الأخير فيحدّد المتحكّم على هيئة قائمةٍ من اللصائق وتعليمات الآلة، كما في [5.1](https://sarabander.github.io/sicp/html/5_002e1.xhtml#g_t5_002e1).

ولحساب القواسم المشتركة الكبرى بهذه الآلة، نُعيّن محتويات مسجّلات الدخل، ونُشغّل الآلة، وندرس النتيجة حين تنتهي المحاكاة:

```scheme
(set-register-contents! gcd-machine 'a 206)
done

(set-register-contents! gcd-machine 'b 40)
done

(start gcd-machine)
done

(get-register-contents gcd-machine 'a)
2
```

وسيجرى هذا الاحتساب أبطأَ بكثيرٍ من إجراء `gcd` مكتوبٍ بـScheme، لأنّنا سنحاكي تعليمات آلةٍ منخفضة المستوى، مثل `assign`، بعمليّاتٍ أعقدَ بكثيرٍ.

> **التمرين 5.7:** استخدم المُحاكي لاختبار الآلات التي صمّمتها في [التمرين 5.4](https://sarabander.github.io/sicp/html/5_002e1.xhtml#Exercise-5_002e4).

#### 5.2.1 نموذج الآلة

نموذج الآلة الذي يولّده `make-machine` مُمثَّلٌ بإجراءٍ ذي حالة محلّيّة، باستخدام تقنيّات تمرير الرسائل المطوّرة في [الفصل 3](https://sarabander.github.io/sicp/html/Chapter-3.xhtml#Chapter-3). فلبناء هذا النموذج، يبدأ `make-machine` بنداء الإجراء `make-new-machine` لبناء أجزاء نموذج الآلة المشتركة بين جميع آلات المسجّلات. وهذا النموذج الأساسيّ للآلة الذي يبنيه `make-new-machine` هو في جوهره حاوٍ لبعض المسجّلات ومكدس، إلى جانب آليّة تنفيذٍ تعالج تعليمات المتحكّم واحدةً واحدة.

ثم يمدّ `Make-machine` هذا النموذج الأساسيّ (بإرسال رسائل إليه) ليشمل مسجّلات الآلة المعيّنة وعمليّاتها ومتحكّمها. فأوّلًا يُخصِّص مسجّلًا في الآلة الجديدة لكلّ اسمٍ من أسماء المسجّلات المعطاة ويثبّت العمليّات المعيّنة في الآلة. ثم يستخدم *مُجمِّعًا (assembler)* (موصوفًا أدناه في [5.2.2](/book/sicp/c5-computing-with-register-machines/5-2/)) لتحويل قائمة المتحكّم إلى تعليماتٍ للآلة الجديدة ويثبّتها بوصفها تسلسل تعليمات الآلة. ويُعيد `Make-machine` نموذج الآلة المعدَّل قيمةً له.

```scheme
(define (make-machine register-names 
                      ops 
                      controller-text)
  (let ((machine (make-new-machine)))
    (for-each (lambda (register-name)
                ((machine 'allocate-register) 
                 register-name))
              register-names)
    ((machine 'install-operations) ops)
    ((machine 'install-instruction-sequence)
     (assemble controller-text machine))
    machine))
```

#### المسجّلات

وسنمثّل المسجّل بإجراءٍ ذي حالة محلّيّة، كما في [الفصل 3](https://sarabander.github.io/sicp/html/Chapter-3.xhtml#Chapter-3). فالإجراء `make-register` يُنشئ مسجّلًا يحتفظ بقيمةٍ يمكن الاطلاع عليها أو تغييرها:

```scheme
(define (make-register name)
  (let ((contents '*unassigned*))
    (define (dispatch message)
      (cond ((eq? message 'get) contents)
            ((eq? message 'set)
             (lambda (value) 
               (set! contents value)))
            (else
             (error "Unknown request: 
                     REGISTER"
                    message))))
    dispatch))
```

والإجراءات التالية تُستخدم للوصول إلى المسجّلات:

```scheme
(define (get-contents register)
  (register 'get))

(define (set-contents! register value)
  ((register 'set) value))
```

#### المكدس

ويمكننا أيضًا تمثيل المكدس بإجراءٍ ذي حالة محلّيّة. فالإجراء `make-stack` يُنشئ مكدسًا تتألّف حالته المحليّة من قائمةٍ بالعناصر الموجودة في المكدس. ويقبل المكدس طلبات `push` عنصرًا إلى المكدس، و`pop` العنصر الأعلى من المكدس وإعادته، و`initialize` المكدس ليصبح فارغًا.

```scheme
(define (make-stack)
  (let ((s '()))
    (define (push x)
      (set! s (cons x s)))
    (define (pop)
      (if (null? s)
          (error "Empty stack: POP")
          (let ((top (car s)))
            (set! s (cdr s))
            top)))
    (define (initialize)
      (set! s '())
      'done)
    (define (dispatch message)
      (cond ((eq? message 'push) push)
            ((eq? message 'pop) (pop))
            ((eq? message 'initialize) 
             (initialize))
            (else 
             (error "Unknown request: STACK"
                    message))))
    dispatch))
```

والإجراءات التالية تُستخدم للوصول إلى الأكداس:

```scheme
(define (pop stack) (stack 'pop))
(define (push stack value)
  ((stack 'push) value))
```

#### الآلة الأساسيّة

يبني الإجراء `make-new-machine`، المبيَّن في [الشكل 5.13](/book/sicp/c5-computing-with-register-machines/5-2/)، كائنًا تتألّف حالته المحليّة من مكدس، وتسلسل تعليماتٍ فارغٍ في بادئ الأمر، وقائمةٍ من العمليّات تحتوي في بادئ الأمر على عمليّةٍ لتهيئة المكدس، و*جدول مسجّلات* يحتوي في بادئ الأمر على مسجّلين، يُسمّيان `flag` و`pc` (اختصارًا لـ«عدّاد البرنامج»). ويُضيف الإجراء الداخليّ `allocate-register` مُدخلاتٍ جديدة إلى جدول المسجّلات، ويَبحَث الإجراء الداخليّ `lookup-register` عن المسجّلات في الجدول.

**الشكل 5.13:** $↓$ الإجراء `make-new-machine`، الذي يُنفّذ نموذج الآلة الأساسيّ.

```scheme
(define (make-new-machine)
  (let ((pc (make-register 'pc))
        (flag (make-register 'flag))
        (stack (make-stack))
        (the-instruction-sequence '()))
    (let ((the-ops
           (list 
            (list 'initialize-stack
                  (lambda () 
                    (stack 'initialize)))))
          (register-table
           (list (list 'pc pc) 
                 (list 'flag flag))))
      (define (allocate-register name)
        (if (assoc name register-table)
            (error 
             "Multiply defined register: " 
             name)
            (set! register-table
                  (cons 
                   (list name 
                         (make-register name))
                   register-table)))
        'register-allocated)
      (define (lookup-register name)
        (let ((val 
               (assoc name register-table)))
          (if val
              (cadr val)
              (error "Unknown register:" 
                     name))))
      (define (execute)
        (let ((insts (get-contents pc)))
          (if (null? insts)
              'done
              (begin
                ((instruction-execution-proc 
                  (car insts)))
                (execute)))))
      (define (dispatch message)
        (cond ((eq? message 'start)
               (set-contents! 
                pc
                the-instruction-sequence)
               (execute))
              ((eq? 
                message 
                'install-instruction-sequence)
               (lambda (seq) 
                 (set! 
                  the-instruction-sequence 
                  seq)))
              ((eq? message 
                    'allocate-register) 
               allocate-register)
              ((eq? message 'get-register) 
               lookup-register)
              ((eq? message 
                    'install-operations)
               (lambda (ops) 
                 (set! the-ops 
                       (append the-ops ops))))
              ((eq? message 'stack) stack)
              ((eq? message 'operations) 
               the-ops)
              (else (error "Unknown request: 
                            MACHINE"
                           message))))
      dispatch)))
```

يُستخدم المسجّل `flag` للتحكّم في التفرّع في الآلة المحاكاة. فتعليمات `Test` تضبط محتويات `flag` بنتيجة الاختبار (صحيحة أو خاطئة). وتقرّر تعليمات `Branch` ما إذا كانت ستتفرّع أم لا بفحص محتويات `flag`.

يحدّد المسجّل `pc` تتابع التعليمات أثناء جريان الآلة. وهذا التتابع مُنفَّذٌ بالإجراء الداخليّ `execute`. ففي نموذج المحاكاة، كلّ تعليمة آلةٍ هي بنية بيانات تتضمّن إجراءً بلا معطيات، يُسمّى *إجراء تنفيذ التعليمة (instruction execution procedure)*، بحيث إنّ نداء هذا الإجراء يحاكي تنفيذ التعليمة. وأثناء جريان المحاكاة، يُشير `pc` إلى المكان في تسلسل التعليمات الذي تبدأ فيه التعليمة التالية المراد تنفيذها. و`Execute` يجلب تلك التعليمة، ويَنفّذها بنداء إجراء تنفيذ التعليمة، ويكرّر هذه الدورة حتّى لا تبقى تعليماتٌ لتنفيذها (أي حتّى يُشير `pc` إلى نهاية تسلسل التعليمات).

كجزءٍ من عمليّته، يُعدّل كلّ إجراءٍ لتنفيذ تعليمةٍ المسجّل `pc` للإشارة إلى التعليمة التالية المراد تنفيذها. فتعليمات `Branch` و`goto` تُغيّران `pc` ليُشير إلى الوجهة الجديدة. وجميع التعليمات الأخرى تُقدّم `pc` تقدّمًا بسيطًا، فتجعلُه يُشير إلى التعليمة التالية في التسلسل. ولاحِظ أنّ كلّ نداءٍ لـ`execute` يَنداء `execute` مرّةً أخرى، لكنّ هذا لا يُنتج حلقةً لا نهائيّةً لأنّ تشغيل إجراء تنفيذ التعليمة يُغيّر محتويات `pc`.

يُعيد `Make-new-machine` إجراء `dispatch` يُنفّذ وصولاً بتمرير الرسائل إلى الحالة الداخليّة. ولاحِظ أنّ تشغيل الآلة يُنجَز بتعيين `pc` إلى بداية تسلسل التعليمات ونداء `execute`.

وللتيسير، نوفّر واجهةً إجراءيّةً بديلةً لعمليّة `start` في الآلة، وكذلك إجراءاتٍ لتعيين محتويات المسجّلات وفحصها، كما هو محدَّدٌ في بداية [5.2](/book/sicp/c5-computing-with-register-machines/5-2/):

```scheme
(define (start machine)
  (machine 'start))

(define (get-register-contents 
         machine register-name)
  (get-contents 
   (get-register machine register-name)))

(define (set-register-contents! 
         machine register-name value)
  (set-contents! 
   (get-register machine register-name) 
   value)
  'done)
```

وهذه الإجراءات (والعديد من الإجراءات في [5.2.2](/book/sicp/c5-computing-with-register-machines/5-2/) و[5.2.3](/book/sicp/c5-computing-with-register-machines/5-2/)) تستخدم ما يلي للبحث عن المسجّل ذي الاسم المعطى في آلةٍ معطاة:

```scheme
(define (get-register machine reg-name)
  ((machine 'get-register) reg-name))
```

#### 5.2.2 المُجمِّع

يحوّل المُجمِّع تسلسل تعابير المتحكّم لآلةٍ إلى قائمةٍ مقابلةٍ من تعليمات الآلة، كلٌّ منها بإجراء تنفيذه. وبصورةٍ عامّة، فإنّ المُجمِّع يشبه إلى حدٍّ كبيرٍ المقيّمات التي درسناها في [الفصل 4](https://sarabander.github.io/sicp/html/Chapter-4.xhtml#Chapter-4) — فهناك لغة دخل (في هذه الحالة، لغة آلات المسجّلات) وينبغي أن نؤدّي فعلًا مناسبًا لكلّ نوعٍ من التعابير في اللغة.

وتقنيّة إنتاج إجراء تنفيذٍ لكلّ تعليمةٍ هي ذاتها التي استخدمناها في [4.1.7](https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e7) لتسريع المقيّم بفصل التحليل عن التنفيذ وقت التشغيل. فكما رأينا في [الفصل 4](https://sarabander.github.io/sicp/html/Chapter-4.xhtml#Chapter-4)، فإنّ جزءًا كبيرًا من التحليل المفيد لتعبيرات Scheme يمكن أداؤه دون معرفة قيم المتغيّرات الفعليّة. وهنا، بالتماثل، فإنّ جزءًا كبيرًا من التحليل المفيد لتعبيرات لغة آلات المسجّلات يمكن أداؤه دون معرفة محتويات مسجّلات الآلة الفعليّة. فمثلًا، نستطيع استبدال الإشارات إلى المسجّلات بمؤشّراتٍ إلى كائنات المسجّل، ونستطيع استبدال الإشارات إلى اللصائق بمؤشّراتٍ إلى المكان في تسلسل التعليمات الذي تُعيّّنه اللصيقة.

وقبل أن يتمكّن من توليد إجراءات تنفيذ التعليمات، ينبغي أن يعرف المُجمِّع ما تشير إليه جميع اللصائق، فيبدأ بمسح نصّ المتحكّم لفصل اللصائق عن التعليمات. وأثناء مسحه النصّ، يبني قائمةً بالتعليمات وجدولًا يُقرن كلّ لصيقةٍ بمؤشّرٍ إلى داخل تلك القائمة. ثم يُنمّي المُجمِّع قائمة التعليمات بإدراج إجراء التنفيذ لكلّ تعليمة.

الإجراء `assemble` هو المدخل الرئيسيّ إلى المُجمِّع. وهو يأخذ نصّ المتحكّم ونموذج الآلة مَعطيين ويُعيد تسلسل التعليمات الذي سيُخزَّن في النموذج. ويَنداء `Assemble` الإجراء `extract-labels` لبناء قائمة التعليمات الأوّلية وجدول اللصائق من نصّ المتحكّم المعطى. والمَعطى الثاني إلى `extract-labels` هو إجراءٌ سيُنداء لمعالجة هذه النتائج: وهذا الإجراء يستخدم `update-insts!` لتوليد إجراءات تنفيذ التعليمات وإدراجها في قائمة التعليمات، ويُعيد القائمة المعدَّلة.

```scheme
(define (assemble controller-text machine)
  (extract-labels controller-text
    (lambda (insts labels)
      (update-insts! insts labels machine)
      insts)))
```

يأخذ `Extract-labels` مَعطيين: قائمةً `text` (تسلسل تعابير تعليمات المتحكّم) وإجراء `receive`. وسيُنداء `Receive` بقيمتين: (1) قائمةً `insts` من بنيات بيانات التعليمات، كلٌّ منها يحتوي تعليمةً من `text`؛ و(2) جدولًا يُسمّى `labels`، يُقرن كلّ لصيقةٍ من `text` بالموضع في القائمة `insts` الذي تُعيّّنه اللصيقة.

```scheme
(define (extract-labels text receive)
  (if (null? text)
      (receive '() '())
      (extract-labels 
       (cdr text)
       (lambda (insts labels)
         (let ((next-inst (car text)))
           (if (symbol? next-inst)
               (receive 
                   insts
                   (cons 
                    (make-label-entry 
                     next-inst
                     insts)
                    labels))
               (receive 
                   (cons (make-instruction 
                          next-inst)
                         insts)
                   labels)))))))
```

يعمل `Extract-labels` بمسح عناصر `text` تتابعيّ ليُراكِم `insts` و`labels`. فإن كان العنصر رمزًا (وهو إذن لصيقة) أُضيف مُدخلٌ مناسبٌ إلى جدول `labels`. وإلّا فالعنصر يُراكَم على قائمة `insts`.[^4]

يُعدّل `Update-insts!` قائمة التعليمات، التي تحتوي في بادئ الأمر على نصّ التعليمات فقط، لتتضمّن إجراءات التنفيذ المقابلة:

```scheme
(define (update-insts! insts labels machine)
  (let ((pc (get-register machine 'pc))
        (flag (get-register machine 'flag))
        (stack (machine 'stack))
        (ops (machine 'operations)))
    (for-each
     (lambda (inst)
       (set-instruction-execution-proc!
        inst
        (make-execution-procedure
         (instruction-text inst) 
         labels
         machine
         pc
         flag
         stack
         ops)))
     insts)))
```

وبنية بيانات تعليمة الآلة تُقرن ببساطةٍ نصّ التعليمة بإجراء التنفيذ المقابل. وإجراء التنفيذ غير متوفّرٍ بعد حين يبني `extract-labels` التعليمة، ويُدرَج لاحقًا بـ`update-insts!`.

```scheme
(define (make-instruction text)
  (cons text '()))
(define (instruction-text inst) (car inst))
(define (instruction-execution-proc inst)
  (cdr inst))
(define (set-instruction-execution-proc!
         inst
         proc)
  (set-cdr! inst proc))
```

نصّ التعليمة لا يستخدمه مُحاكينا، لكنّ من المفيد الاحتفاظ به للتّنقيح (انظر [التمرين 5.16](/book/sicp/c5-computing-with-register-machines/5-2/)).

وعناصر جدول اللصائق هي أزواج:

```scheme
(define (make-label-entry label-name insts)
  (cons label-name insts))
```

وسيُبحَث عن المُدخلات في الجدول بـ

```scheme
(define (lookup-label labels label-name)
  (let ((val (assoc label-name labels)))
    (if val
        (cdr val)
        (error "Undefined label: ASSEMBLE" 
               label-name))))
```

**التمرين 5.8:** إنّ شيفرة آلة المسجّلات التالية غامضة، لأنّ اللصيقة `here` مُعرَّفةٌ أكثر من مرّة:

```scheme
start
  (goto (label here))
here
  (assign a (const 3))
  (goto (label there))
here
  (assign a (const 4))
  (goto (label there))
there
```

بالمُحاكي كما هو مكتوب، فماذا ستكون محتويات المسجّل `a` حين يبلغ التحكّم `there`؟ عدّل الإجراء `extract-labels` بحيث يُشير المُجمِّع إلى خطأٍ إذا استُخدم اسم اللصيقة ذاته للإشارة إلى موضعين مختلفين.

#### 5.2.3 توليد إجراءات تنفيذ التعليمات

يَنداء المُجمِّع `make-execution-procedure` لتوليد إجراء تنفيذ تعليمةٍ. فمثل الإجراء `analyze` في مقيّم [4.1.7](https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e7)، فإنّه يُوزّع على نوع التعليمة لتوليد إجراء التنفيذ المناسب.

```scheme
(define (make-execution-procedure 
         inst labels machine pc flag stack ops)
  (cond ((eq? (car inst) 'assign)
         (make-assign 
          inst machine labels ops pc))
        ((eq? (car inst) 'test)
         (make-test 
          inst machine labels ops flag pc))
        ((eq? (car inst) 'branch)
         (make-branch 
          inst machine labels flag pc))
        ((eq? (car inst) 'goto)
         (make-goto inst machine labels pc))
        ((eq? (car inst) 'save)
         (make-save inst machine stack pc))
        ((eq? (car inst) 'restore)
         (make-restore inst machine stack pc))
        ((eq? (car inst) 'perform)
         (make-perform
          inst machine labels ops pc))
        (else (error "Unknown instruction 
                      type: ASSEMBLE"
                     inst))))
```

فلكلّ نوعٍ من التعليمات في لغة آلات المسجّلات، هناك مُولِّدٌ يبني إجراء تنفيذٍ مناسبًا. وتفاصيل هذه الإجراءات تحدّد صياغة تعليمات لغة آلات المسجّلات الفرديّة ومعناها جميعًا. ونحن نستخدم تجريد البيانات لعزل الصياغة المفصّلة لتعبيرات آلات المسجّلات عن آليّة التنفيذ العامّة، كما فعلنا مع المقيّمات في [4.1.2](https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e2)، وذلك باستخدام إجراءات الصياغة لاستخراج أجزاء التعليمة وتصنيفها.

#### تعليمات `Assign`

إنّ الإجراء `make-assign` يتعامل مع تعليمات `assign`:

```scheme
(define (make-assign 
         inst machine labels operations pc)
  (let ((target 
         (get-register 
          machine 
          (assign-reg-name inst)))
        (value-exp (assign-value-exp inst)))
    (let ((value-proc
           (if (operation-exp? value-exp)
               (make-operation-exp
                value-exp 
                machine
                labels
                operations)
               (make-primitive-exp
                (car value-exp)
                machine
                labels))))
      (lambda ()   ; execution procedure
                   ; for assign
        (set-contents! target (value-proc))
        (advance-pc pc)))))
```

يستخرج `Make-assign` اسم المسجّل الهدف (العنصر الثاني من التعليمة) وتعبير القيمة (بقيّة القائمة التي تشكّل التعليمة) من تعليمة `assign` باستخدام المحدِّدات

```scheme
(define (assign-reg-name assign-instruction)
  (cadr assign-instruction))
(define (assign-value-exp assign-instruction)
  (cddr assign-instruction))
```

يُبحَث عن اسم المسجّل بـ`get-register` لإنتاج كائن المسجّل الهدف. وتعبير القيمة يُمرَّر إلى `make-operation-exp` إذا كانت القيمة نتيجة عمليّة، وإلى `make-primitive-exp` وإلّا. وهذه الإجراءات (المبيَّنة أدناه) تُحلّل تعبير القيمة وتُنتج إجراء تنفيذٍ للقيمة. وهذا إجراءٌ بلا معطيات، يُسمّى `value-proc`، سيُقيَّم أثناء المحاكاة لإنتاج القيمة الفعليّة التي ستُحلَّ في المسجّل. ولاحِظ أنّ عمل البحث عن اسم المسجّل وتحليل تعبير القيمة يُؤدّى مرّةً واحدةً فقط، في وقت التجميع، لا في كلّ مرّةٍ تُحاكى فيها التعليمة. وهذا الاقتصاد في العمل هو سبب استخدامنا إجراءات التنفيذ، ويقابل مباشرةً الاقتصاد في العمل الذي حصلنا عليه بفصل تحليل البرنامج عن تنفيذه في مقيّم [4.1.7](https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e7).

والنتيجة التي يُعيدها `make-assign` هي إجراء تنفيذ تعليمة `assign`. وحين يُنداء هذا الإجراء (بإجراء `execute` الخاصّ بنموذج الآلة)، فإنّه يضبط محتويات المسجّل الهدف بالقيمة المتحصّلة من تنفيذ `value-proc`. ثم يُقدّم `pc` إلى التعليمة التالية بتشغيل الإجراء

```scheme
(define (advance-pc pc)
  (set-contents! pc (cdr (get-contents pc))))
```

إنّ `Advance-pc` هي النهاية الطبيعيّة لجميع التعليمات ما عدا `branch` و`goto`.

#### تعليمات `Test` و`branch` و`goto`

يتعامل `Make-test` مع تعليمات `test` على نحوٍ مماثل. فإنّه يستخرج التعبير الذي يحدّد الشرط المراد اختباره ويولّد إجراء تنفيذٍ له. في وقت المحاكاة، يُنداء إجراء الشرط، وتُحلّ النتيجة في المسجّل `flag`، ويُقدَّم `pc`:

```scheme
(define 
  (make-test 
   inst machine labels operations flag pc)
  (let ((condition (test-condition inst)))
    (if (operation-exp? condition)
        (let ((condition-proc
               (make-operation-exp
                condition 
                machine
                labels
                operations)))
          (lambda () 
            (set-contents! 
             flag (condition-proc))
            (advance-pc pc)))
        (error "Bad TEST instruction: 
                ASSEMBLE" inst))))

(define (test-condition test-instruction)
  (cdr test-instruction))
```

يفحص إجراء التنفيذ الخاص بتعليمة `branch` محتويات مسجّل `flag` وإمّا أن يضبط محتويات `pc` على مقصد التفريع (إذا أُخذ التفريع) وإمّا أن يُقدّم `pc` فقط (إذا لم يُؤخذ التفريع). لاحِظ أنّ المقصد المُشار إليه في تعليمة `branch` يجب أن يكون لافتة، وإجراء `make-branch` يفرض ذلك. لاحِظ أيضًا أنّ اللافتة تُبحَث عند التجميع، لا في كلّ مرّةٍ تُحاكى فيها تعليمة `branch`.

```scheme
(define 
  (make-branch 
   inst machine labels flag pc)
  (let ((dest (branch-dest inst)))
    (if (label-exp? dest)
        (let ((insts
               (lookup-label 
                labels 
                (label-exp-label dest))))
          (lambda ()
            (if (get-contents flag)
                (set-contents! pc insts)
                (advance-pc pc))))
        (error "Bad BRANCH instruction: 
                ASSEMBLE"
               inst))))

(define (branch-dest branch-instruction)
  (cadr branch-instruction))
```

تشبه تعليمة `goto` التفريع، إلّا أنّ المقصد يمكن أن يُحدَّد إمّا كلافتةٍ وإمّا كمسجّل، ولا يوجد شرطٌ يُفحص — فـ`pc` يُضبَط دائمًا على المقصد الجديد.

```scheme
(define (make-goto inst machine labels pc)
  (let ((dest (goto-dest inst)))
    (cond ((label-exp? dest)
           (let ((insts
                  (lookup-label 
                   labels
                   (label-exp-label dest))))
             (lambda () 
               (set-contents! pc insts))))
          ((register-exp? dest)
           (let ((reg
                  (get-register 
                   machine
                   (register-exp-reg dest))))
             (lambda ()
               (set-contents! 
                pc
                (get-contents reg)))))
          (else (error "Bad GOTO instruction: 
                        ASSEMBLE"
                       inst)))))

(define (goto-dest goto-instruction)
  (cadr goto-instruction))
```

#### تعليمات أخرى

تستخدم تعليمتا المكدس `save` و`restore` المكدس مع المسجّل المُعيَّن ببساطةٍ وتُقدّمان `pc`:

```scheme
(define (make-save inst machine stack pc)
  (let ((reg (get-register 
              machine
              (stack-inst-reg-name inst))))
    (lambda ()
      (push stack (get-contents reg))
      (advance-pc pc))))

(define (make-restore inst machine stack pc)
  (let ((reg (get-register
              machine
              (stack-inst-reg-name inst))))
    (lambda ()
      (set-contents! reg (pop stack))
      (advance-pc pc))))

(define (stack-inst-reg-name 
         stack-instruction)
  (cadr stack-instruction))
```

إنّ نوع التعليمة الأخير، الذي يتعامل معه `make-perform`، يُنشئ إجراء تنفيذٍ للفعل الذي ينبغي أداؤه. وفي وقت المحاكاة، يُنفَّذ إجراء الفعل ويُقدَّم `pc`.

```scheme
(define (make-perform 
         inst machine labels operations pc)
  (let ((action (perform-action inst)))
    (if (operation-exp? action)
        (let ((action-proc
               (make-operation-exp
                action
                machine
                labels
                operations)))
          (lambda ()
            (action-proc)
            (advance-pc pc)))
        (error "Bad PERFORM instruction: 
                ASSEMBLE"
               inst))))

(define (perform-action inst) (cdr inst))
```

#### إجراءات تنفيذ التعابير الجزئيّة

قد تكون قيمة تعبير `reg` أو `label` أو `const` لازمةً للإحلال إلى مسجّل (`make-assign`) أو كمدخلٍ لعمليّة (`make-operation-exp`، أدناه). والإجراء الآتي يُنشئ إجراءات تنفيذٍ لإنتاج قيم هذه التعابير أثناء المحاكاة:

```scheme
(define (make-primitive-exp exp machine labels)
  (cond ((constant-exp? exp)
         (let ((c (constant-exp-value exp)))
           (lambda () c)))
        ((label-exp? exp)
         (let ((insts
                (lookup-label 
                 labels
                 (label-exp-label exp))))
           (lambda () insts)))
        ((register-exp? exp)
         (let ((r (get-register
                   machine
                   (register-exp-reg exp))))
           (lambda () (get-contents r))))
        (else (error "Unknown expression type: 
                      ASSEMBLE"
                     exp))))
```

تُحدَّد صياغة تعابير `reg` و`label` و`const` بـ

```scheme
(define (register-exp? exp)
  (tagged-list? exp 'reg))
(define (register-exp-reg exp)
  (cadr exp))
(define (constant-exp? exp)
  (tagged-list? exp 'const))
(define (constant-exp-value exp)
  (cadr exp))
(define (label-exp? exp)
  (tagged-list? exp 'label))
(define (label-exp-label exp) 
  (cadr exp))
```

قد تتضمّن تعليمات `assign` و`perform` و`test` تطبيق عمليّة آلةٍ (مُحدَّدةً بتعبير `op`) على بعض العوامل (مُحدَّدةً بتعبيرات `reg` و`const`). والإجراء الآتي يُنتج إجراء تنفيذٍ «لتعبير عمليّة» — وهو قائمةٌ تحتوي تعبير العمليّة وتعبيرات العوامل الآتية من التعليمة:

```scheme
(define (make-operation-exp
         exp machine labels operations)
  (let ((op (lookup-prim 
             (operation-exp-op exp)
             operations))
        (aprocs
         (map (lambda (e)
                (make-primitive-exp 
                 e machine labels))
              (operation-exp-operands exp))))
    (lambda () (apply op (map (lambda (p) (p))
                              aprocs)))))
```

تُحدَّد صياغة تعابير العمليّات بـ

```scheme
(define (operation-exp? exp)
  (and (pair? exp)
       (tagged-list? (car exp) 'op)))
(define (operation-exp-op operation-exp)
  (cadr (car operation-exp)))
(define (operation-exp-operands operation-exp)
  (cdr operation-exp))
```

لاحِظ أنّ معالجة تعابير العمليّات تشبه إلى حدٍّ بعيدٍ معالجة تطبيقات الإجراءات التي يجريها الإجراء `analyze-application` في المقيّم الوارد في [4.1.7](https://sarabander.github.io/sicp/html/4_002e1.xhtml#g_t4_002e1_002e7)، من حيث أنّنا نُنشئ إجراء تنفيذٍ لكلّ عامل. وفي وقت المحاكاة، نستدعي إجراءات العوامل ونطبّق إجراء Scheme الذي يحاكي العمليّة على القيم الناتجة. ويُوجَد إجراء المحاكاة بالبحث عن اسم العمليّة في جدول عمليّات الآلة:

```scheme
(define (lookup-prim symbol operations)
  (let ((val (assoc symbol operations)))
    (if val
        (cadr val)
        (error "Unknown operation: ASSEMBLE"
               symbol))))
```

> **التمرين 5.9:** إنّ معالجة عمليّات الآلة أعلاه تسمح لها بالعمل على اللافتات إضافةً إلى الثوابت ومحتويات المسجّلات. عدّل إجراءات معالجة التعابير لفرض الشرط القائل إنّ العمليّات لا يمكن استخدامها إلّا مع المسجّلات والثوابت.

> **التمرين 5.10:** صمِّم صياغةً جديدةً لتعليمات آلة المسجّلات وعدّل المحاكي ليستخدم صياغتك الجديدة. فهل تستطيع تنفيذ صياغتك الجديدة دون تغيير أيّ جزءٍ من المحاكي ما عدا إجراءات الصياغة في هذا القسم؟

**التمرين 5.11:** حين استحدثنا `save` و`restore` في [5.1.4](https://sarabander.github.io/sicp/html/5_002e1.xhtml#g_t5_002e1_002e4)، لم نُحدّد ما يحدث إذا حاولت استعادة مسجّلٍ ليس آخر ما حُفظ، كما في التسلسل

```scheme
(save y)
(save x)
(restore y)
```

ثمّة عدّة احتمالاتٍ معقولةٍ لمعنى `restore`:

1. `(restore y)` يضع في `y` آخر قيمةٍ حُفظت في المكدس، أياً يكن المسجّل الذي جاءت منه تلك القيمة. وهذا هو سلوك محاكينا. أظهر كيف يمكن استثمار هذا السلوك لإلغاء تعليمةٍ واحدةٍ من آلة فيبوناتشي الواردة في [5.1.4](https://sarabander.github.io/sicp/html/5_002e1.xhtml#g_t5_002e1_002e4) ([الشكل 5.12](https://sarabander.github.io/sicp/html/5_002e1.xhtml#Figure-5_002e12)).
2. `(restore y)` يضع في `y` آخر قيمةٍ حُفظت في المكدس، لكن فقط إذا كانت تلك القيمة قد حُفظت من `y`؛ وإلّا فإنّه يُشير إلى خطأٍ. عدّل المحاكي ليسلوك هذا السلوك. سيتعيّن عليك تغيير `save` ليضع اسم المسجّل في المكدس إلى جانب القيمة.
3. `(restore y)` يضع في `y` آخر قيمةٍ حُفظت من `y` أياً تكن المسجّلات الأخرى التي حُفظت بعد `y` ولم تُستعَد. عدّل المحاكي ليسلوك هذا السلوك. سيتعيّن عليك ربط مكدسٍ منفصلٍ بكلّ مسجّلٍ. وينبغي أن تجعل عمليّة `initialize-stack` تُهيّئ جميع مكدسات المسجّلات.

> **التمرين 5.12:** يمكن استخدام المحاكي للمساعدة في تحديد مسار البيانات المطلوب لتنفيذ آلةٍ بمتحكّمٍ معطى. وسّع المُجمِّع ليخزّن المعلومات الآتية في نموذج الآلة: قائمةٌ بجميع التعليمات، بعد إزالة المكرّر منها، مرتّبةً بحسب نوع التعليمة (`assign` و`goto` وما شابه)؛
> > قائمةٌ (دون مكرّراتٍ) بالمسجّلات المستخدمة لحفظ نقاط الدخول (وهي المسجّلات التي تشير إليها تعليمات `goto`)؛
> > قائمةٌ (دون مكرّراتٍ) بالمسجّلات التي تُحفَظ بـ`save` أو تُستعَد بـ`restore`؛
> > وبالنسبة لكلّ مسجّلٍ، قائمةٌ (دون مكرّراتٍ) بالمصادر التي يُحلَّل منها (فمثلًا، مصادر المسجّل `val` في آلة العامليّة الواردة في [الشكل 5.11](https://sarabander.github.io/sicp/html/5_002e1.xhtml#Figure-5_002e11) هي `(const 1)` و`((op *) (reg n) (reg val))`).
> > 
> > وسّع واجهة تمرير الرسائل إلى الآلة لتوفير النفاذ إلى هذه المعلومات الجديدة. ولاختبار مُحلِّلك، عرّف آلة فيبوناتشي من [الشكل 5.12](https://sarabander.github.io/sicp/html/5_002e1.xhtml#Figure-5_002e12) وافحص القوائم التي بنيتها.

> **التمرين 5.13:** عدّل المحاكي كي يستخدم تسلسل المتحكّم لتحديد المسجّلات التي تمتلكها الآلة بدلًا من اشتراط قائمةٍ بالمسجّلات كمعطىً لـ`make-machine`. فبدلًا من تخصيص المسجّلات مُسبقًا في `make-machine`، يمكنك تخصيصها واحدةً تلو الأخرى حين تُشاهَد أوّلَ مرّةٍ أثناء تجميع التعليمات.

#### 5.2.4 مراقبة أداء الآلة

المحاكاة مفيدةٌ لا للتحقّق من صحّة تصميم آلةٍ مقترحةٍ فحسب، بل أيضًا لقياس أداء الآلة. فإنّا نستطيع، مثلًا، تثبيت «مقياس» في برنامج المحاكاة لدينا يقيس عدد عمليّات المكدس المستخدمة في احتسابٍ ما. ولفعل ذلك، نعدّل مكدسنا المحاكى كي يُتابع عدد المرّات التي تُحفَظ فيها المسجّلات في المكدس وأقصى عمقٍ يبلغه المكدس، ونُضيف رسالةً إلى واجهة المكدس تطبع الإحصائيّات، كما هو موضّح أدناه. ونُضيف أيضًا عمليّةً إلى نموذج الآلة الأساسيّ لطبع إحصائيّات المكدس، بتهيئة `the-ops` في `make-new-machine` إلى

```scheme
(list (list 'initialize-stack
            (lambda () 
              (stack 'initialize)))
      (list 'print-stack-statistics
            (lambda () 
              (stack 'print-statistics))))
```

وها هو الإصدار الجديد من `make-stack`:

```scheme
(define (make-stack)
  (let ((s '())
        (number-pushes 0)
        (max-depth 0)
        (current-depth 0))
    (define (push x)
      (set! s (cons x s))
      (set! number-pushes (+ 1 number-pushes))
      (set! current-depth (+ 1 current-depth))
      (set! max-depth 
            (max current-depth max-depth)))
    (define (pop)
      (if (null? s)
          (error "Empty stack: POP")
          (let ((top (car s)))
            (set! s (cdr s))
            (set! current-depth
                  (- current-depth 1))
            top)))
    (define (initialize)
      (set! s '())
      (set! number-pushes 0)
      (set! max-depth 0)
      (set! current-depth 0)
      'done)

    (define (print-statistics)
      (newline)
      (display (list 'total-pushes 
                     '= 
                     number-pushes
                     'maximum-depth
                     '=
                     max-depth)))
    (define (dispatch message)
      (cond ((eq? message 'push) push)
            ((eq? message 'pop) (pop))
            ((eq? message 'initialize)
             (initialize))
            ((eq? message 'print-statistics)
             (print-statistics))
            (else
             (error "Unknown request: STACK"
                    message))))
    dispatch))
```

يصف [التمرين 5.15](/book/sicp/c5-computing-with-register-machines/5-2/) إلى [التمرين 5.19](/book/sicp/c5-computing-with-register-machines/5-2/) ميزات مراقبةٍ وتنقيحٍ مفيدةً أخرى يمكن إضافتها إلى محاكي آلة المسجّلات.

> **التمرين 5.14:** قِس عدد الدفعات وأقصى عمقٍ للمكدس اللازمين لاحتساب $n !$ لقيمٍ صغيرةٍ متنوّعةٍ لـ$n$ باستخدام آلة العامليّة الموضّحة في [الشكل 5.11](https://sarabander.github.io/sicp/html/5_002e1.xhtml#Figure-5_002e11). واستنبط من بياناتك صيغًا بدلالة $n$ للعدد الكلّي لعمليّات الدفع ولأقصى عمقٍ للمكدس يُستخدم في احتساب $n !$ لأيّ $n > 1$ . ولاحِظ أنّ كُلًّا من هذين دالّةٌ خطّيّةٌ في $n$ وبالتالي تُحدَّد بثابتين. ولكي تُطبع الإحصائيّات، سيتعيّن عليك توسيع آلة العامليّة بتعليماتِ تهيئة المكدس وطبع الإحصائيّات. وقد ترغب أيضًا في تعديل الآلة كي تقرأ قيمة $n$ مرارًا، وتحسب العامليّة، وتطبع النتيجة (كما فعلنا لآلة القاسم المشترك الأكبر في [الشكل 5.4](https://sarabander.github.io/sicp/html/5_002e1.xhtml#Figure-5_002e4))، بحيث لا يضطرّك الأمر إلى استدعاء `get-register-contents` و`set-register-contents!` و`start` مرارًا.

> **التمرين 5.15:** أضِف *عدّ التعليمات* إلى محاكاة آلة المسجّلات. أي اجعل نموذج الآلة يُتابع عدد التعليمات المُنفَّذة. وسّع واجهة نموذج الآلة لتقبل رسالةً جديدةً تطبع قيمة عدّاد التعليمات وتُصفّر العدّاد.

> **التمرين 5.16:** وسّع المحاكي ليتيح *تتبّع التعليمات*. أي قبل تنفيذ كلّ تعليمةٍ، ينبغي أن يطبع المحاكي نصّ التعليمة. واجعل نموذج الآلة يقبل رسالتي `trace-on` و`trace-off` لتشغيل التتبّع وإيقافه.

> **التمرين 5.17:** وسّع تتبّع التعليمات الوارد في [التمرين 5.16](/book/sicp/c5-computing-with-register-machines/5-2/) بحيث يطبع المحاكي، قبل طبع تعليمةٍ ما، أيّ لافتاتٍ تسبق تلك التعليمة مباشرةً في تسلسل المتحكّم. واحرص على فعل ذلك بطريقةٍ لا تتداخل مع عدّ التعليمات ([التمرين 5.15](/book/sicp/c5-computing-with-register-machines/5-2/)). وسيتعيّن عليك أن تجعل المحاكي يحتفظ بمعلومات اللافتات اللازمة.

> **التمرين 5.18:** عدّل إجراء `make-register` الوارد في [5.2.1](/book/sicp/c5-computing-with-register-machines/5-2/) بحيث يمكن تتبّع المسجّلات. وينبغي أن تقبل المسجّلات رسائل تُشغّل التتبّع وتُوقفه. وحين يُتْبَع مسجّلٌ ما، ينبغي أن يطبع إحلال قيمةٍ إلى المسجّل اسم المسجّل والمحتويات القديمة للمسجّل والمحتويات الجديدة التي تُحلَّل إليها. وسّع الواجهة إلى نموذج الآلة لتسمح لك بتشغيل التتبّع وإيقافه لمسجّلات آلةٍ معيَّنةٍ منها.

**التمرين 5.19:** تُريد أليسا ب. هاكر ميزة *نقطة توقّف* في المحاكي تساعدها على تنقيح تصاميم آلاتها. وقد عُهد إليك بتثبيت هذه الميزة لها. وهي تُريد أن تكون قادرةً على تحديد موضعٍ في تسلسل المتحكّم يتوقّف عنده المحاكي ويتيح لها فحص حالة الآلة. ومهمّتك تنفيذ الإجراء

```scheme
(set-breakpoint ⟨machine⟩ ⟨label⟩ ⟨n⟩)
```

الذي يضع نقطة توقّفٍ قبل التعليمة رقم $n^{th}$ بعد اللافتة المعطاة. مثلًا،

```scheme
(set-breakpoint gcd-machine 'test-b 4)
```

يثبّت نقطة توقّفٍ في `gcd-machine` قبل الإحلال إلى المسجّل `a`. وحين يبلغ المحاكي نقطة التوقّف، ينبغي أن يطبع اللافتة وإزاحة نقطة التوقّف وأن يتوقّف عن تنفيذ التعليمات. وبوسع أليسا حينها استخدام `get-register-contents` و`set-register-contents!` للتلاعب بحالة الآلة المحاكاة. وينبغي أن تقدر بعد ذلك على متابعة التنفيذ بقولها

```scheme
(proceed-machine ⟨machine⟩)
```

وينبغي أن تقدر أيضًا على إزالة نقطة توقّفٍ معيّنةٍ بـ

```scheme
(cancel-breakpoint ⟨machine⟩ ⟨label⟩ ⟨n⟩)
```

أو على إزالة جميع نقاط التوقّف بـ

```scheme
(cancel-all-breakpoints ⟨machine⟩)
```


[^4]: استخدام إجراء `receive` هنا طريقةٌ لجعل `extract-labels` يُعيد فعليًّا قيمتين—`labels` و`insts`—دون أن نُشكّل صراحةً بنية بيانات مركّبةٍ للاحتفاظ بهما. ثمّة تنفيذٌ بديل يُعيد زوجًا صريحًا من القيم، وهو ```scheme (define (extract-labels text) (if (null? text) (cons '() '()) (let ((result (extract-labels (cdr text)))) (let ((insts (car result)) (labels (cdr result))) (let ((next-inst (car text))) (if (symbol? next-inst) (cons insts (cons (make-label-entry next-inst insts) labels)) (cons (cons (make-instruction next-inst) insts) labels))))))) ```