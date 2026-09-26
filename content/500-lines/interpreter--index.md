---
title: "مفسّر بايثون مكتوب بلغة بايثون"
lang: ar
source: https://aosabook.org/en/500L/interpreter.html
---

_أليسون مهندسة في Dropbox، حيث تساعد على صيانة إحدى أكبر شبكات عملاء بايثون في العالم. وقبل Dropbox كانت مُيسّرة في مركز Recurse Center، وهو ملتقى للمبرمجين من كتّاب في نيويورك. تحدّثت في PyCon أمريكا الشمالية عن تفاصيل بايثون الداخلية وتحبّ الأخطاء الغريبة. تكتب في مدونتها على [akaptur.com](http://akaptur.com)._

_(هذا الفصل متاح أيضًا بـ[الصينية المبسّطة](http://qingyunha.github.io/taotao/))_. 

## مقدّمة

Byterun هو مفسّر (interpreter) لبايثون مُنفَّذ بلغة بايثون. ومن خلال عملي على Byterun، فوجئت وسُررت بأن البنية الأساسية لمفسّر بايثون تتّسع بسهولة ضمن حدّ خمسمئة سطر. سيقود هذا الفصل عبر بنية المفسّر ويمنحك سياقًا كافيًا لتستكشفه أكثر. الهدف ليس شرح كل ما يُعرف عن المفسّرات&mdash;فمثل كثير من مجالات البرمجة وعلوم الحاسوب المثيرة للاهتمام، يمكنك تكريس سنوات لبناء فهم عميق لهذا الموضوع.

كتب Byterun نيد باتشيلدر وأنا، انطلاقًا من أعمال بول سوارتز. بنيته مشابهة للتنفيذ الأساسي لبايثون، وهو CPython، لذا فإن فهم Byterun سيساعدك على فهم المفسّرات على العموم وعلى مفسّر CPython على الخصوص. (وإن كنت لا تعرف أي نسخة من بايثون تستخدمها، فالأرجح أنها CPython.) ورغم قصر طوله، فإن Byterun قادر على تشغيل معظم برامج بايثون البسيطة[^versions].

[^versions]: يستند هذا الفصل إلى شيفرة بايت (bytecode) أنتجتها Python 3.5 أو
ما قبلها، إذ طرأت بعض التغييرات على مواصفة شيفرة البايت في Python
3.6. 


### مفسّر بايثون

قبل أن نبدأ، لنضبط ما نعنيه بعبارة «مفسّر بايثون». يمكن أن تُستخدم كلمة «مفسّر» («interpreter») بطرق مختلفة عند الحديث عن بايثون. فحينًا ما تشير «interpreter» إلى واجهة بايثون التفاعلية (REPL)، أي المطوّر التفاعلي الذي تحصل عليه بكتابة `python` في سطر الأوامر. وأحيانًا يستخدم الناس «مفسّر بايثون» و«بايثون» بشكل شبه متكافئ للإشارة إلى تنفيذ شيفرة بايثون من البداية إلى النهاية. أما في هذا الفصل، فللكلمة «مفسّر» معنى أضيق: إنه الخطوة الأخيرة في عملية تنفيذ برنامج بايثون.

قبل أن يتسلّم المفسّر زمام الأمر، تنفّذ بايثون ثلاث خطوات أخرى: التحليل المعجمي، والتحليل النحوي، والترجمة (compiling).وتحوّل هذه الخطوات مجتمعةً شيفرة المصدر التي كتبها المبرمج من أسطر نصية إلى كائنات شيفرة (code objects) ذات بنية منظَّمة تحتوي على تعليمات يستطيع المفسّر فهمها. ومهمة المفسّر هي أخذ كائنات الشيفرة هذه واتباع التعليمات.

قد تُفاجأ إذا سمعت أن الترجمة (compiling) كانت خطوة ضمن خطوات تنفيذ شيفرة بايثون أصلًا. فبايثون تُسمّى كثيرًا لغة «مفسَّرة» (interpreted) مثل روبي أو بيرل، في مقابل لغة «مصرَّفة» (compiled) مثل C أو Rust. غير أن هذه المصطلحات ليست دقيقة بالقدر الذي قد يبدو عليه. لمعظم اللغات المفسَّرة، ومنها بايثون، تتضمّن فعلًا خطوة ترجمة. والسبب في تسمية بايثون «مفسَّرة» هو أن خطوة الترجمة تؤدي قدرًا أقل نسبيًا من العمل (ويؤدي المفسّر قدرًا أكبر نسبيًا) مقارنةً بلغة مصرَّفة. وكما سنرى لاحقًا في هذا الفصل، فإن مصرّف بايثون لديه معلومات أقل بكثير عن سلوك البرنامج مما لدى مصرّف C.

### مفسّر بايثون مكتوب بلغة بايثون

Byterun هو مفسّر بايثون مكتوب بلغة بايثون. قد يبدو هذا غريبًا لك، لكنه ليس أغرب من كتابة مصرّف C بلغة C. (وفي الواقع، فإن مصرّف C واسع الانتشار gcc مكتوب بلغة C.) ويمكنك كتابة مفسّر بايثون بأي لغة تقريبًا.

ولكتابة مفسّر بايثون بلغة بايثون مزايا وعيوب معًا. أكبر العيوب هو السرعة: فتنفّذ الشيفرة عبر Byterun أبطأ بكثير من تنفيذها في CPython حيث المفسّر مكتوب بلغة C ومُحسَّن بعناية. لكن Byterun صُمِّم في الأصل ليكون تمرينًا تعليميًا، لذا فالسرعة ليست مهمّة بالنسبة إلينا. وأكبر مزايا استخدام بايثون هو أننا نستطيع أن ننفّذ *المفسّر فحسب* بسهولة أكبر، دون بقية زمن تشغيل بايثون، وبخاصة نظام الكائنات. فمثلًا يستطيع Byterun أن يعود إلى بايثون «الحقيقية» حين يحتاج إلى إنشاء صنف. ومن المزايا الأخرى أن Byterun سهل الفهم، وذلك جزئيًا لأنه مكتوب بلغة عالية المستوى (بايثون!) يجدها كثيرون سهلة القراءة. (كما أننا نستثني تحسينات المفسّر في Byterun&mdash;مؤكّدين مرة أخرى وضوح الواجهة والبساطة على السرعة.)

## بناء مفسّر

قبل أن نبدأ في النظر في شيفرة Byterun، نحتاج إلى بعض السياق الأعلى مستوى حول بنية المفسّر. كيف يعمل مفسّر بايثون؟

مفسّر بايثون هو _آلة افتراضية_ (virtual machine)، أي أنه برمجيات تحاكي حاسوبًا ماديًا. وهذه الآلة الافتراضية تحديدًا هي آلة مكدّس (stack machine): فهي تتلاعب بعدة مكدّسات لإداء عملياتها (بخلاف آلة السجلات، التي تكتب إلى مواقع ذاكرة معيّنة وتقرأ منها).

مفسّر بايثون هو _مفسّر شيفرة بايت_ (bytecode interpreter): ومدخله هو مجموعات تعليمات (instruction sets) تُدعى _شيفرة بايت_. حين تكتب بايثون، ينتج المُحلِّل المعجمي (lexer) والمحلّل النحوي (parser) والمصرّف كائنات شيفرة ليعمل عليها المفسّر. يحتوي كل كائن شيفرة على مجموعة تعليمات تُنفَّذ&mdash;وهي شيفرة البايت&mdash;بالإضافة إلى معلومات أخرى سيحتاجها المفسّر. وشيفرة البايت هي _تمثيل وسيط_ (intermediate representation) لشيفرة بايثون: فهي تعبّر عن شيفرة المصدر التي كتبتها بطريقة يفهمها المفسّر. تمامًا كما أن لغة التجميع تخدم دور تمثيل وسيط بين شيفرة C وقطعة من العتاد.

### مفسّر صغير جدًا

لنجعل هذا ملموسًا، لنبدأ بمفسّر صغير للغاية. لا يستطيع هذا المفسّر سوى جمع الأعداد، وهو يفهم ثلاث تعليمات فقط. وكل شيفرة يستطيع تنفيذها تتألف من هذه التعليمات الثلاث في تركيبات مختلفة. وتعليماتُه الثلاث هي:

- `LOAD_VALUE`
- `ADD_TWO_VALUES`
- `PRINT_ANSWER`

ولأننا لا نتناول في هذا الفصل المُحلِّل المعجمي ولا المحلل النحوي ولا المصرّف، فإن كيفية إنتاج مجموعات التعليمات لا تهمّنا. يمكنك أن تتخيّل أن تكتب `7 + 5` فيولّد مصرّف تركيبة من هذه التعليمات الثلاث. أو، إن كان لديك المصرّف المناسب، يمكنك كتابة صيغة Lisp تُحوَّل إلى التركيبة نفسها من التعليمات. والمفسّر لا يهمّه الأمر. المهم الوحيد هو أن يُعطى مفسّرنا ترتيبًا صحيحًا للتعليمات.

لنفترض أن

```python
7 + 5
```

ينتج مجموعة التعليمات التالية:

```python
what_to_execute = {
    "instructions": [("LOAD_VALUE", 0),  # the first number
                     ("LOAD_VALUE", 1),  # the second number
                     ("ADD_TWO_VALUES", None),
                     ("PRINT_ANSWER", None)],
    "numbers": [7, 5] }
```

مفسّر بايثون هو _آلة مكدّس_ (stack machine)، لذا عليه أن يتلاعب بالمكدّسات ليجمع عددين (\aosafigref{500l.interpreter.stackmachine}.) سيبدأ المفسّر بتنفيذ التعليم الأول، `LOAD_VALUE`، ويدفع العدد الأول على المكدّس. ثم سيدفع العدد الثاني على المكدّس. أما التعليم الثالث، `ADD_TWO_VALUES`، فسيُسقط العددين من المكدّس، ويجمعهما معًا، ويدفع الناتج على المكدّس. وأخيرًا، سيُسقط الإجابة من المكدّس ويطبعها.

\aosafigure[240pt]/images/500-lines/interpreter-0-interpreter_stack.webp{آلة مكدّس}{500l.interpreter.stackmachine}

يُخبر التعليم `LOAD_VALUE` المفسّر بأن يدفع عددًا على المكدّس، لكن التعليم وحده لا يحدّد أيّ عدد. فكل تعليم يحتاج إلى قطعة معلومات إضافية تخبر المفسّر أين يجد العدد الذي سيحمّله. إذًا لمجموعة التعليمات لدينا جزآن: التعليمات نفسها، إضافة إلى قائمة بالثوابت التي ستحتاجها التعليمات. (في بايثون، ما نسمّيه «التعليمات» هو شيفرة البايت، وكائن «ما الذي يُنفَّذ» أدناه هو _كائن الشيفرة_.)

ولماذا لا نضع الأعداد مباشرةً داخل التعليمات؟ تخيّل أننا كنّا نجمع نصوصًا (strings) بدل الأعداد. فلن نرغب في أن تكون النصوص محشورةً مع التعليمات، لأنها قد تكون ضخمة بأي حجم. كما أن هذا التصميم يعني أننا نستطيع أن نحتفظ بنسخة واحدة فقط من كل كائن نحتاجه، فمثلًا لإضافة `7 + 7` يمكن أن تكون `"numbers"` هي فقط `[7]`.

قد تتساءل لماذا كانت هناك حاجة إلى تعليمات أخرى غير `ADD_TWO_VALUES` أصلًا. وبالفعل، في الحالة البسيطة الخاصة بجمع عددين، يبدو المثال مصطنعًا بعض الشيء. لكن هذا التعليم يُعدّ لبنة أساسية لبرامج أعقد. فمثلًا، بالتعليمات التي عرّفناها حتى الآن فقط، يمكننا بالفعل أن نجمع ثلاث قيم&mdash;أو أي عدد من القيم&mdash;معطَاةً مجموعة التعليمات المناسبة. ويوفّر المكدّس وسيلة نظيفة لتتبّع حالة المفسّر، وسيُتيح لنا دعم درجات أعقد من التعقيد مع تقدّمنا.

لنبدأ الآن في كتابة المفسّر نفسه. لدى كائن المفسّر مكدّس سنمثّله بقائمة. ويملك الكائن أيضًا دالة تصف كيفية تنفيذ كل تعليم. فمثلًا،بالنسبة إلى `LOAD_VALUE`، يدفع المفسّر القيمة على المكدّس.

```python
class Interpreter:
    def __init__(self):
        self.stack = []

    def LOAD_VALUE(self, number):
        self.stack.append(number)

    def PRINT_ANSWER(self):
        answer = self.stack.pop()
        print(answer)

    def ADD_TWO_VALUES(self):
        first_num = self.stack.pop()
        second_num = self.stack.pop()
        total = first_num + second_num
        self.stack.append(total)
```

تطبّق هذه الدوال الثلاث التعليمات الثلاث التي يفهمها مفسّرنا. ويحتاج المفسّر إلى قطعة أخرى: وسيلة تربط كل شيء معًا وتنفّذه فعليًا. وتُدعى هذه الدالة `run_code`، وهي تأخذ قاموس `what_to_execute` المعرَّف أعلاه كوسيط. فهي تكرّر على كل تعليمة، وتعالج وسائط تلك التعليم إن وُجدت، ثم تستدعي الدالة المقابلة على كائن المفسّر.

```python
    def run_code(self, what_to_execute):
        instructions = what_to_execute["instructions"]
        numbers = what_to_execute["numbers"]
        for each_step in instructions:
            instruction, argument = each_step
            if instruction == "LOAD_VALUE":
                number = numbers[argument]
                self.LOAD_VALUE(number)
            elif instruction == "ADD_TWO_VALUES":
                self.ADD_TWO_VALUES()
            elif instruction == "PRINT_ANSWER":
                self.PRINT_ANSWER()
```

لاختباره، يمكننا إنشاء نسخة من الكائن ثم استدعاء الدالة `run_code` بمجموعة تعليمات جمع 7 + 5 المعرَّفة أعلاه.

```python
    interpreter = Interpreter()
    interpreter.run_code(what_to_execute)
```

وفعلًا، فإنها تطبع الإجابة: 12.

ورغم أن هذا المفسّر محدود إلى حد بعيد، فإن هذه العملية تكاد تكون مطابقة تمامًا لكيفية إضافة مفسّر بايثون الحقيقي للأعداد. وهناك أمران ينبغي ملاحظتهما حتى في هذا المثال الصغير.

أولًا، بعض التعليمات تحتاج إلى وسائط. وفي شيفرة بايت بايثون الحقيقية، نحو نصف التعليمات لها وسائط. وتُحزَّم الوسائط مع التعليمات، تمامًا كما في مثالنا. ولاحظ أن وسائط _التعليمات_ تختلف عن وسائط الدوال التي تُستدعى.

ثانيًا، لاحظ أن تعليم `ADD_TWO_VALUES` لم يحتج إلى أي وسائط. بل إن القيم التي ستُجمع سُحبت من مكدّس المفسّر. وهذه هي الخاصية المميِّزة للمفسّر المبني على مكدّس.

تذكّر أننا، إذا توفّرت لدينا مجموعات تعليمات صالحة، نستطيع جمع أكثر من عددين في المرة الواحدة دون أي تغيير على مفسّرنا. فكّر في مجموعة التعليمات أدناه. ماذا تتوقّع أن يحدث؟ ولو كان لديك مصرّف ودود، فما الشيفرة التي يمكنك كتابتها لتوليد مجموعة التعليمات هذه؟ \newpage

```python
    what_to_execute = {
        "instructions": [("LOAD_VALUE", 0),
                         ("LOAD_VALUE", 1),
                         ("ADD_TWO_VALUES", None),
                         ("LOAD_VALUE", 2),
                         ("ADD_TWO_VALUES", None),
                         ("PRINT_ANSWER", None)],
        "numbers": [7, 5, 8] }
```

في هذه المرحلة، يمكننا أن نبدأ في رؤية كيف أن هذه البنية قابلة للتوسيع: يمكننا أن نضيف دوال على كائن المفسّر تصف عمليات كثيرة أخرى (ما دام لدينا مصرّف يسلّمنا مجموعات تعليمات صحيحة البنية).

#### المتغيّرات

لنضف المتغيّرات الآن إلى مفسّرنا. تحتاج المتغيّرات إلى تعليم لتخزين قيمة متغيّر، وهو `STORE_NAME`؛ وإلى تعليم لاسترجاعها، وهو `LOAD_NAME`؛ وإلى ربط من أسماء المتغيّرات إلى قيمها. وسنتجاهل الأسماء والنطاقات (scopes) في الوقت الحالي، حتى نتمكن من تخزين هذا الربط على كائن المفسّر نفسه. وأخيرًا، علينا التأكّد من أن `what_to_execute` يحتوي على قائمة بأسماء المتغيّرات، إضافة إلى قائمته بالثوابت.

```python
>>> def s():
...     a = 1
...     b = 2
...     print(a + b)
# a friendly compiler transforms `s` into:
    what_to_execute = {
        "instructions": [("LOAD_VALUE", 0),
                         ("STORE_NAME", 0),
                         ("LOAD_VALUE", 1),
                         ("STORE_NAME", 1),
                         ("LOAD_NAME", 0),
                         ("LOAD_NAME", 1),
                         ("ADD_TWO_VALUES", None),
                         ("PRINT_ANSWER", None)],
        "numbers": [1, 2],
        "names":   ["a", "b"] }
```

تنفيذنا الجديد موجود أدناه. ولتتتبّع ما رُبط بكل اسم من قيم، سنضيف قاموس `environment` (بيئة) إلى الدالة `__init__`. وسنضيف أيضًا `STORE_NAME` و`LOAD_NAME`. تبحث هاتان الدالتان أولًا عن اسم المتغيّر المطلوب ثم تستخدمان القاموس لتخزين قيمته أو استرجاعها.

لم تعد وسائط التعليم تعني شيئًا واحدًا فقط: فهي قد تكون إمّا فهرسًا في قائمة `"numbers"`، وإمّا فهرسًا في قائمة `"names"`. والمفسّر يعرف أيّهما ينبغي أن يكون عبر التحقّق من التعليم الذي ينفّذه. وسنُخرج هذا المنطق&mdash;وكذلك ربط التعليمات بمعنى وسائطها&mdash;إلى دالة منفصلة. \newpage

```python
class Interpreter:
    def __init__(self):
        self.stack = []
        self.environment = {}

    def STORE_NAME(self, name):
        val = self.stack.pop()
        self.environment[name] = val

    def LOAD_NAME(self, name):
        val = self.environment[name]
        self.stack.append(val)

    def parse_argument(self, instruction, argument, what_to_execute):
        """ Understand what the argument to each instruction means."""
        numbers = ["LOAD_VALUE"]
        names = ["LOAD_NAME", "STORE_NAME"]

        if instruction in numbers:
            argument = what_to_execute["numbers"][argument]
        elif instruction in names:
            argument = what_to_execute["names"][argument]

        return argument

    def run_code(self, what_to_execute):
        instructions = what_to_execute["instructions"]
        for each_step in instructions:
            instruction, argument = each_step
            argument = self.parse_argument(instruction, argument, what_to_execute)

            if instruction == "LOAD_VALUE":
                self.LOAD_VALUE(argument)
            elif instruction == "ADD_TWO_VALUES":
                self.ADD_TWO_VALUES()
            elif instruction == "PRINT_ANSWER":
                self.PRINT_ANSWER()
            elif instruction == "STORE_NAME":
                self.STORE_NAME(argument)
            elif instruction == "LOAD_NAME":
                self.LOAD_NAME(argument)
```

حتى مع خمس تعليمات فقط، بدأت الدالة `run_code` تصبح مُرهقة. فلو أبقينا على هذه البنية، لما احتيجنا إلى فرع واحد من جملة `if` لكل تعليمة. وهنا يمكننا أن نستفيد من البحث الديناميكي عن الدوال في بايثون. فنحن نعرّف دائمًا دالة اسمها `FOO` لتنفيذ التعليم المسمّى `FOO`، وبذلك يمكننا استخدام دالة `getattr` في بايثون للبحث عن الدالة في الحال بدلًا من جملة `if` الكبيرة. عندئذٍ تبدو الدالة `run_code` كالتالي: \newpage

```python
    def execute(self, what_to_execute):
        instructions = what_to_execute["instructions"]
        for each_step in instructions:
            instruction, argument = each_step
            argument = self.parse_argument(instruction, argument, what_to_execute)
            bytecode_method = getattr(self, instruction)
            if argument is None:
                bytecode_method()
            else:
                bytecode_method(argument)
```

## شيفرة بايت بايثون الحقيقية

في هذه المرحلة، سنتخلّى عن مجموعات التعليمات اللعبية التي بنيناها وننتقل إلى شيفرة بايت بايثون الحقيقية. وبنية شيفرة البايت مشابهة لمجموعات التعليمات المطوّلة في مفسّرنا اللعبي، باستثناء أنها تستخدم بايتًا واحدًا بدل اسم طويل لتحديد كل تعليمة. ولفهم هذه البنية، سنمرّ عبر شيفرة بايت دالة قصيرة. فكّر في المثال أدناه:

```python
>>> def cond():
...     x = 3
...     if x < 5:
...         return 'yes'
...     else:
...         return 'no'
...
```

يكشف بايثون عن كمّ هائل من تفاصيله الداخلية في زمن التشغيل، ويمكننا الوصول إليها مباشرةً من الواجهة التفاعلية. بالنسبة إلى كائن الدالة `cond`، فإن `cond.__code__` هو كائن الشيفرة المرتبط بها، و`cond.__code__.co_code` هو شيفرة البايت. ونادرًا ما يوجد سبب وجيه لاستخدام هاتين الخاصيتين مباشرةً حين تكتب شيفرة بايثون، لكنهما تتيحان لنا أن نقوم بكل أنواع العبث، وأن ننظر في التفاصيل الداخلية لفهمها.

```python
>>> cond.__code__.co_code  # the bytecode as raw bytes
b'd\x01\x00}\x00\x00|\x00\x00d\x02\x00k\x00\x00r\x16\x00d\x03\x00Sd\x04\x00Sd\x00
   \x00S'
>>> list(cond.__code__.co_code)  # the bytecode as numbers
[100, 1, 0, 125, 0, 0, 124, 0, 0, 100, 2, 0, 107, 0, 0, 114, 22, 0, 100, 3, 0, 83, 
 100, 4, 0, 83, 100, 0, 0, 83]
```

حين نطبع شيفرة البايت فحسب، تبدو غير مفهومة&mdash;كل ما نستطيع قوله إنها سلسلة من البايتات. ولحسن الحظ، لدينا أداة قوية يمكننا استخدامها لفهمها: وهي الوحدة `dis` في مكتبة بايثون القياسية.

`dis` هي مفكّك شيفرة بايت (bytecode disassembler). ويفكّك المفكّك شيفرة منخفضة المستوى كُتبت للآلات، مثل لغة التجميع أو شيفرة البايت، ويطبعها بطريقة يقرأها الإنسان. وحين ننفّذ `dis.dis`، فإنها تُخرج شرحًا لشيفرة البايت التي مرّرناها إليها. \newpage

```python
>>> dis.dis(cond)
  2           0 LOAD_CONST               1 (3)
              3 STORE_FAST               0 (x)

  3           6 LOAD_FAST                0 (x)
              9 LOAD_CONST               2 (5)
             12 COMPARE_OP               0 (<)
             15 POP_JUMP_IF_FALSE       22

  4          18 LOAD_CONST               3 ('yes')
             21 RETURN_VALUE

  6     >>   22 LOAD_CONST               4 ('no')
             25 RETURN_VALUE
             26 LOAD_CONST               0 (None)
             29 RETURN_VALUE
```

ماذا يعني كل هذا؟ لننظر إلى التعليم الأول `LOAD_CONST` كمثال. الرقم في العمود الأول (`2`) يعرض رقم السطر في شيفرة بايثون المصدرية لدينا. أما العمود الثاني فهو فهرس داخل شيفرة البايت، يخبرنا بأن تعليم `LOAD_CONST` يظهر عند الموضع صفر. والعمود الثالث هو التعليم نفسه، مربوطًا باسمه المقروء. أما العمود الرابع، حين يكون موجودًا، فهو وسيط ذلك التعليم. والعمود الخامس، حين يكون موجودًا، فهو تلميح إلى معنى الوسيط.

فكّر في أول بايتات قليلة من هذه الشيفرة: [100, 1, 0, 125, 0, 0]. فهذه البايتات الستة تمثّل تعليمين مع وسائطيهما. يمكننا استخدام `dis.opname`، وهو ربط من البايتات إلى نصوص مفهومة، لمعرفة ما يقابله التعليمان 100 و125:

```python
>>> dis.opname[100]
'LOAD_CONST'
>>> dis.opname[125]
'STORE_FAST'
```

البايت الثاني والثالث&mdash;أي 1، 0&mdash;هما وسائط `LOAD_CONST`، بينما البايت الخامس والسادس&mdash;أي 0، 0&mdash;هما وسائط `STORE_FAST`. تمامًا كما في مثالنا اللعبي، يحتاج `LOAD_CONST` إلى معرفة أين يجد ثابته ليحمّله، ويحتاج `STORE_FAST` إلى معرفة الاسم ليخزّنه. (`LOAD_CONST` في بايثون هو نفسه `LOAD_VALUE` في مفسّرنا اللعبي، و`LOAD_FAST` هو نفسه `LOAD_NAME`.) إذًا تمثّل هذه البايتات الستة أول سطر من الشيفرة، وهو `x = 3`. (ولماذا نستخدم بايتين لكل وسيط؟ لو استخدم بايثون بايتًا واحدًا فقط لتحديد الثوابت والأسماء بدل بايتين، لما استطاع أن يمتلك إلا 256 اسمًا/ثابتًا مرتبطة بكائن شيفرة واحد. وبعدون بايتين يمكنك أن تملك ما يصل إلى 256 تربيعًا، أي 65,536.)

### الجمل الشرطية والحلقات

حتى الآن، نفّذ المفسّر الشيفرة ببساطة عبر المرور على التعليمات واحدًا تلو الآخر. وهذه مشكلة؛ فنحن كثيرًا ما نرغب في تنفيذ تعليمات معيّنة مرات عديدة، أو في تخطّيها في ظروف معيّنة. ولأن نسمح لأنفسنا بكتابة الحلقات وجمل `if` في شيفرتنا، يجب أن يكون المفسّر قادرًا على القفز هنا وهناك في مجموعة التعليمات. بمعنى من المعاني، تتعامل بايثون مع الحلقات والجمل الشرطية بعبارات `GOTO` في شيفرة البايت! انظر إلى تفكيك شيفرة الدالة `cond` مرة أخرى: \newpage

```python
>>> dis.dis(cond)
  2           0 LOAD_CONST               1 (3)
              3 STORE_FAST               0 (x)

  3           6 LOAD_FAST                0 (x)
              9 LOAD_CONST               2 (5)
             12 COMPARE_OP               0 (<)
             15 POP_JUMP_IF_FALSE       22

  4          18 LOAD_CONST               3 ('yes')
             21 RETURN_VALUE

  6     >>   22 LOAD_CONST               4 ('no')
             25 RETURN_VALUE
             26 LOAD_CONST               0 (None)
             29 RETURN_VALUE
```

تُصرَّف الجملة الشرطية `if x < 5` في السطر 3 من الشيفرة إلى أربعة تعليمات: `LOAD_FAST` و`LOAD_CONST` و`COMPARE_OP` و`POP_JUMP_IF_FALSE`. وتولّد `x < 5` شيفرة تحمّل `x` وتحمّل 5 وتقارن القيمتين. والتعليم `POP_JUMP_IF_FALSE` هو المسؤول عن تنفيذ `if`. وسيُسقط هذا التعليم القيمةَّ العليا من مكدّس المفسّر. فإذا كانت القيمة صادقة، فلا يحدث شيء. (وللقيمة أن تكون «صادقة»&mdash;فلا يلزم أن تكون الكائن `True` نفسه.) وإذا كانت القيمة خاطئة، فإن المفسّر سينتقل إلى تعليمة أخرى.

يُسمّى التعليم الذي سننتهي عنده هدف القفز (jump target)، ويُقدَّم كوسيط لتعليمة `POP_JUMP`. وهنا هدف القفز هو 22. والتعليم عند الفهرس 22 هو `LOAD_CONST` في السطر 6. (وتضع `dis` علامة على أهداف القفز بالرمز `>>`.) فإذا كانت نتيجة `x < 5` هي False، فإن المفسّر سينتقل مباشرةً إلى السطر 6 (`return "no"`)، متخطّيًا السطر 4 (`return "yes"`). وهكذا يستخدم المفسّر تعليمات القفز لتخطّي أجزاء بعينها من مجموعة التعليمات.

تعتمد حلقات بايثون على القفز أيضًا. في شيفرة البايت أدناه، لاحظ أن السطر `while x < 5` يولّد شيفرة بايت تكاد تكون مطابقة لتلك المولَّدة عن `if x < 10`. ففي الحالتين تُحسب المقارنة ثم تتحكّم `POP_JUMP_IF_FALSE` في أيّ التعليمات تُنفَّذ تاليًا. وفي نهاية السطر 4&mdash;أي نهاية جسم الحلقة&mdash;يعيد التعليم `JUMP_ABSOLUTE` المفسّر دائمًا إلى التعليم 9 في أعلى الحلقة. وعندما تصبح x < 5 خاطئة، فإن `POP_JUMP_IF_FALSE` تقفز بالمفسّر بعد نهاية الحلقة، إلى التعليم 34.

```python
>>> def loop():
...      x = 1
...      while x < 5:
...          x = x + 1
...      return x
...
>>> dis.dis(loop)
  2           0 LOAD_CONST               1 (1)
              3 STORE_FAST               0 (x)

  3           6 SETUP_LOOP              26 (to 35)
        >>    9 LOAD_FAST                0 (x)
             12 LOAD_CONST               2 (5)
             15 COMPARE_OP               0 (<)
             18 POP_JUMP_IF_FALSE       34

  4          21 LOAD_FAST                0 (x)
             24 LOAD_CONST               1 (1)
             27 BINARY_ADD
             28 STORE_FAST               0 (x)
             31 JUMP_ABSOLUTE            9
        >>   34 POP_BLOCK

  5     >>   35 LOAD_FAST                0 (x)
             38 RETURN_VALUE
```

### استكشاف شيفرة البايت

أشجّعك على أن تجرّب تشغيل `dis.dis` على الدوال التي تكتبها. وهذه بعض الأسئلة التي تستحق الاستكشاف:

- ما الفرق بين حلقة `for` وحلقة `while` من وجهة نظر مفسّر بايثون؟
- كيف يمكنك كتابة دوال مختلفة تولّد شيفرة بايت متطابقة؟
- كيف يعمل `elif`؟ وماذا عن فهم القوائم (list comprehensions)؟

## الإطارات

حتى الآن، تعلّمنا أن الآلة الافتراضية لبايثون آلة مكدّس. فهي تمرّ على التعليمات وتقفز بينها، وتدفع القيم على المكدّس وتُسقطها منه. لكن ما زال في نموذجنا الذهني بعض الثغرات. ففي الأمثلة أعلاه، التعليم الأخير هو `RETURN_VALUE`، وهو يقابل جملة `return` في الشيفرة. لكن إلى أين يعود هذا التعليم؟

للإجابة عن هذا السؤال، علينا أن نضيف طبقة من التعقيد: الإطار (frame). والإطار مجموعة من المعلومات والسياق الخاص بجزء من الشيفرة. وتُنشأ الإطارات وتُدمَّر في الحال مع تنفيذ شيفرة بايثون الخاصة بك. ويقابل كل *استدعاء* لدالة إطار واحد&mdash;فبينما لكل إطار كائن شيفرة واحد مرتبط به، يمكن أن يكون لكائن الشيفرة الواحد عدّة إطارات كثيرة. فلو كانت لديك دالة تستدعي نفسها تعاوديًا عشر مرات، لكان لديك أحد عشر إطارًا&mdash;واحد لكل مستوى من مستويات التعاود وواحد للوحدة (module) التي بدأت منها. وبوجه عام، يوجد إطار واحد لكل نطاق (scope) في برنامج بايثون. فمثلًا، لكل وحدة، ولكل استدعاء دالة، ولكل تعريف صنف، إطار.

تعيش الإطارات على _مكدّس الاستدعاءات_ (call stack)، وهو مكدّس مختلف تمامًا عن المكدّس الذي ناقشناه حتى الآن. (مكدّس الاستدعاءات هو المكدّس الذي أنت أكثر ما تعرفه أصلًا&mdash;لقد رأيتَه مطبوعًا في تتبّعات الاستثناءات (tracebacks). فكل سطر في تتبّع استثناء يبدأ بـ"File 'program.py', line 10" يقابل إطارًا واحدًا على مكدّس الاستدعاءات.) أما المكدّس الذي كنّا نفحصه&mdash;الذي يتلاعب به المفسّر أثناء تنفيذه لشيفرة البايت&mdash;فسنسميه _مكدّس البيانات_. وهناك أيضًا مكدّس ثالث، يُسمّى _مكدّس الكتل_. تُستخدم الكتل لأنواع معيّنة من التحكم في التسلسل، وبخاصة الحلقات ومعالجة الاستثناءات. ولكل إطار على مكدّس الاستدعاءات مكدّس بيانات خاص به ومكدّس كتل خاص به.

لنجعل هذا ملموسًا بمثال. نفترض أن مفسّر بايثون ينفّذ حاليًا السطر الموسوم بـ3 أدناه. فالمفسّر في منتصف استدعاء لـ`foo`، وبدوره يستدعي `bar`. ويعرض الرسم مخططًا لمكدّس استدعاءات الإطارات، ولمكدّسات الكتل، ولمكدّسات البيانات. (هذه الشيفرة مكتوبة بجلسة واجهة تفاعلية، لذلك عرّفنا أولًا الدوال المطلوبة.) في اللحظة التي تهمّنا، يكون المفسّر منفّذًا `foo()` في القاع، ثم يدخل إلى جسم `foo` ثم صعودًا إلى `bar`. \newpage

```python
>>> def bar(y):
...     z = y + 3     # <--- (3) ... and the interpreter is here.
...     return z
...
>>> def foo():
...     a = 1
...     b = 2
...     return a + bar(b) # <--- (2) ... which is returning a call to bar ...
...
>>> foo()             # <--- (1) We're in the middle of a call to foo ...
3
```

\aosafigure[240pt]/images/500-lines/interpreter-1-interpreter_callstack.webp{مكدّس الاستدعاءات}{500l.interpreter.callstack}

في هذه اللحظة، يكون المفسّر في منتصف الاستدعاء والدالة `bar`. وهناك ثلاثة إطارات على مكدّس الاستدعاءات: واحد لمستوى الوحدة، وواحد للدالة `foo`، وواحد لـ`bar` (\aosafigref{500l.interpreter.callstack}.) ولمّا تعود `bar`، يُسقط الإطار المرتبط بها من مكدّس الاستدعاءات ويُطرح بعيدًا.

يُخبر تعليم شيفرة البايت `RETURN_VALUE` المفسّر بأن يمرّر قيمة بين الإطارات. وهو أولًا يُسقط القيمة العليا من مكدّس البيانات الخاص بالإطار الأعلى على مكدّس الاستدعاءات. ثم يُسقط الإطار بأكمله من مكدّس الاستدعاءات ويتخلّص منه. وأخيرًا تُدفع القيمة على مكدّس البيانات الخاص بالإطار الذي يليه.

حين كان نيد باتشيلدر وأنا نعمل على Byterun، كان لدينا خطأ جسيم في تنقيذنا لفترة طويلة. وبدلًا من وجود مكدّس بيانات واحد في كل إطار، كان لدينا مكدّس بيانات واحد فقط على الآلة الافتراضية بأكملها. وكنا لدينا عشرات الاختبارات المؤلَّفة من قصاصات صغيرة من شيفرة بايثون، كنّا ننفّذها عبر Byterun وعبر مفسّر بايثون الحقيقي لنتأكّد من حدوث الشيء نفسه في المفسّرين. وكان كل هذه الاختبارات ينجح تقريبًا. ولم يكن الشيء الوحيد الذي تعذّر تشغيله هو المولّدات (generators). وأخيرًا، وبعد قراءة شيفرة CPython بعناية أكبر، أدركنا الخطأ[^thanks]. وكانت نقل مكدّس بيانات إلى كل إطار هي ما حلّ المشكلة.

[^thanks]: أشكر Michael Arntzenius على رؤيته الثاقبة بخصوص هذا الخطأ.

وعند مراجعة هذا الخطأ، أدهشني قِدر ما كان قليلًا من بايثون يعتمد على وجود مكدّس بيانات مختلف لكل إطار. فمعظم عمليات مفسّر بايثون تنظّف مكدّس البيانات بعناية، لذا فإن كون الإطارات تتشارك المكدّس نفسه لم يكن مهمًّا. وفي المثال أعلاه، حين ينتهي `bar` من التنفيذ، سيترك مكدّس بياناته فارغًا. وحتى لو كان `foo` يتشارك المكدّس نفسه، لكانت القيم في موضع أخفض. لكن مع المولّدات، تكمن خاصية أساسية في القدرة على إيقاف إطار مؤقتًا، والعودة إلى إطار آخر، ثم العودة لاحقًا إلى إطار المولّد لتجده في الحالة نفسها تمامًا التي تركته فيها. \newpage

## Byterun

لدينا الآن سياق كافٍ عن مفسّر بايثون لنبدأ في فحص Byterun.

هناك أربعة أنواع من الكائنات في Byterun:

- صنف `VirtualMachine`، الذي يدير البنية في أعلى المستويات، وبخاصة مكدّس استدعاءات الإطارات، ويحتوي على ربط من التعليمات إلى العمليات. وهذه نسخة أعقد من كائن `Intepreter` أعلاه.
- صنف `Frame`. ولكل نسخة من `Frame` كائن شيفرة واحد، وهي تدير قطعًا أخرى ضرورية من الحالة، وبخاصة نطاقَي الأسماء العالمي والمحلي، ومرجعًا إلى إطار الاستدعاء، وآخر تعليمة شيفرة بايت نُفِّذت.
- صنف `Function`، الذي سيُستخدم بدلاً من دوال بايثون الحقيقية. وتذكّر أن استدعاء دالة ينشئ إطارًا جديدًا في المفسّر. وننفّذ هذا الصنف حتى نتحكّم في إنشاء إطارات جديدة.
- صنف `Block`، وهو يغلّف الخصائص الثلاثة للكتل فحسب. (تفاصيل الكتل ليست جوهرية لفهم مفسّر بايثون، لذا لن ننفق عليها وقتًا طويلًا، لكنها مُدرجة هنا كي يتمكّن Byterun من تشغيل شيفرة بايثون حقيقية.)

### صنف `VirtualMachine`

لن يُنشأ سوى نسخة واحدة من `VirtualMachine` في كل مرة يُشغَّل فيها البرنامج، لأن لدينا مفسّر بايثون واحدًا فقط. ويخزّن `VirtualMachine` مكدّس الاستدعاءات، وحالة الاستثناء، وقيم الإرجاع في أثناء تمريرها بين الإطارات. ونقطة الدخول لتنفيذ الشيفرة هي الدالة `run_code`، وهي تأخذ كائن شيفرة مصرَّفًا كوسيط. وتبدأ بإعداد إطار وتشغيله. وقد ينشئ هذا الإطار إطارات أخرى؛ وسيكبر مكدّس الاستدعاءات ويصغر مع تنفيذ البرنامج. وحين يعود الإطار الأول في النهاية، يكون التنفيذ قد انتهى.

```python
class VirtualMachineError(Exception):
    pass

class VirtualMachine(object):
    def __init__(self):
        self.frames = []   # The call stack of frames.
        self.frame = None  # The current frame.
        self.return_value = None
        self.last_exception = None

    def run_code(self, code, global_names=None, local_names=None):
        """ An entry point to execute code using the virtual machine."""
        frame = self.make_frame(code, global_names=global_names, 
                                local_names=local_names)
        self.run_frame(frame)

```

### صنف `Frame`

الآن سنكتب كائن `Frame`. والإطار مجموعة من الخصائص بلا أي دوال. وكما ذُكر أعلاه، تشمل هذه الخصائص كائن الشيفرة الذي أنشأه المصرّف؛ ونطاقَي الأسماء المحلي والعالمي والمدمج؛ ومرجعًا إلى الإطار السابق؛ ومكدّس بيانات؛ ومكدّس كتل؛ وآخر تعليمة نُفِّذت. (علينا أن نعمل عملًا إضافيًا قليلًا للوصول إلى نطاق الأسماء المدمجة، لأن بايثون يتعامل مع هذا النطاق بصور مختلفة في الوحدات (modules) المختلفة؛ وهذا التفصيل لا يهمّ الآلة الافتراضية.)

```python
class Frame(object):
    def __init__(self, code_obj, global_names, local_names, prev_frame):
        self.code_obj = code_obj
        self.global_names = global_names
        self.local_names = local_names
        self.prev_frame = prev_frame
        self.stack = []
        if prev_frame:
            self.builtin_names = prev_frame.builtin_names
        else:
            self.builtin_names = local_names['__builtins__']
            if hasattr(self.builtin_names, '__dict__'):
                self.builtin_names = self.builtin_names.__dict__

        self.last_instruction = 0
        self.block_stack = []
```

الآن سنضيف معالجة الإطارات إلى الآلة الافتراضية. وهناك ثلاث دوال مساعدة للإطارات: واحدة لإنشاء إطارات جديدة (وهي المسؤولة عن ترتيب نطاقَي الأسماء للإطار الجديد)، وواحدة للدفع بالإطارات على مكدّس الإطارات، وواحدة لسحبها منه. وهناك دالة رابعة، هي `run_frame`، تقوم بالعمل الأساسي في تنفيذ الإطار. وسنعود إلى هذا قريبًا.

```python
class VirtualMachine(object):
    [... snip ...]

    # Frame manipulation
    def make_frame(self, code, callargs={}, global_names=None, local_names=None):
        if global_names is not None and local_names is not None:
            local_names = global_names
        elif self.frames:
            global_names = self.frame.global_names
            local_names = {}
        else:
            global_names = local_names = {
                '__builtins__': __builtins__,
                '__name__': '__main__',
                '__doc__': None,
                '__package__': None,
            }
        local_names.update(callargs)
        frame = Frame(code, global_names, local_names, self.frame)
        return frame

    def push_frame(self, frame):
        self.frames.append(frame)
        self.frame = frame

    def pop_frame(self):
        self.frames.pop()
        if self.frames:
            self.frame = self.frames[-1]
        else:
            self.frame = None

    def run_frame(self):
        pass
        # we'll come back to this shortly
```

### صنف `Function`

تنفيذ كائن `Function` ملتبس بعض الشيء، وأغلب تفاصيله ليست حرجة لفهم المفسّر. والأمر المهم الذي ينبغي ملاحظته هو أن استدعاء دالة&mdash;أي استدعاء الدالة `__call__`&mdash;ينشئ كائن `Frame` جديدًا ويبدأ تشغيله.

```python
class Function(object):
    """
    Create a realistic function object, defining the things the interpreter expects.
    """
    __slots__ = [
        'func_code', 'func_name', 'func_defaults', 'func_globals',
        'func_locals', 'func_dict', 'func_closure',
        '__name__', '__dict__', '__doc__',
        '_vm', '_func',
    ]

    def __init__(self, name, code, globs, defaults, closure, vm):
        """You don't need to follow this closely to understand the interpreter."""
        self._vm = vm
        self.func_code = code
        self.func_name = self.__name__ = name or code.co_name
        self.func_defaults = tuple(defaults)
        self.func_globals = globs
        self.func_locals = self._vm.frame.f_locals
        self.__dict__ = {}
        self.func_closure = closure
        self.__doc__ = code.co_consts[0] if code.co_consts else None

        # Sometimes, we need a real Python function.  This is for that.
        kw = {
            'argdefs': self.func_defaults,
        }
        if closure:
            kw['closure'] = tuple(make_cell(0) for _ in closure)
        self._func = types.FunctionType(code, globs, **kw)

    def __call__(self, *args, **kwargs):
        """When calling a Function, make a new frame and run it."""
        callargs = inspect.getcallargs(self._func, *args, **kwargs)
        # Use callargs to provide a mapping of arguments: values to pass into the new 
        # frame.
        frame = self._vm.make_frame(
            self.func_code, callargs, self.func_globals, {}
        )
        return self._vm.run_frame(frame)

def make_cell(value):
    """Create a real Python closure and grab a cell."""
    # Thanks to Alex Gaynor for help with this bit of twistiness.
    fn = (lambda x: lambda: x)(value)
    return fn.__closure__[0]
```

والآن، على كائن `VirtualMachine` مجددًا، سنضيف بعض الدوال المساعدة للتعامل مع مكدّس البيانات. فشيفرة البايت التي تتلاعب بالمكدّس تعمل دائمًا على مكدّس بيانات الإطار الحالي. وسيجعل هذا تنفيذنا لدوال `POP_TOP` و`LOAD_FAST` وكل التعليمات الأخرى التي تمسّ المكدّس أكثر قابلية للقراءة.

```python
class VirtualMachine(object):
    [... snip ...]

    # Data stack manipulation
    def top(self):
        return self.frame.stack[-1]

    def pop(self):
        return self.frame.stack.pop()

    def push(self, *vals):
        self.frame.stack.extend(vals)

    def popn(self, n):
        """Pop a number of values from the value stack.
        A list of `n` values is returned, the deepest value first.
        """
        if n:
            ret = self.frame.stack[-n:]
            self.frame.stack[-n:] = []
            return ret
        else:
            return []
```

قبل أن نصل إلى تشغيل إطار، نحتاج إلى دالتين إضافيتين.

الأولى، وهي `parse_byte_and_args`، تأخذ بايتًا من شيفرة البايت، وتتحقّق مما إذا كان له وسائط، وتحلّل الوسائط إن وُجدت. كما أن هذه الدالة تُحدّث خاصية الإطار `last_instruction`، وهي مرجع إلى آخر تعليمة نُفِّذت. وتعليمة واحدة طولها بايت واحد إن لم يكن لها وسيط، وثلاثة بايتات إن كان لها وسيط؛ وآخر بايتين هما الوسيط. ويعتمد معنى الوسيط لكل تعليمة على أيّ تعليمة هي. فمثلًا، كما ذُكر أعلاه، بالنسبة إلى `POP_JUMP_IF_FALSE`، يكون وسيط التعليم هو هدف القفز. أما `BUILD_LIST`، فهو عدد العناصر في القائمة. و`LOAD_CONST`، فهو فهرس في قائمة الثوابت.

تستخدم بعض التعليمات أرقامًا بسيطة كوسائط. أما التعليمات الأخرى، فعلينا أن تعمل الآلة الافتراضية عملًا قليلًا لتكتشف ما تعنيه الوسائط. وتكشف الوحدة `dis` في المكتبة القياسية ورقة مرجعية تشرح أيّ الوسائط تعني ماذا، مما يجعل شيفرتنا أكثر اختصارًا. فمثلًا، تخبرنا القائمة `dis.hasname` بأن وسائط `LOAD_NAME` و`IMPORT_NAME` و`LOAD_GLOBAL` وتسع تعليمات أخرى لها المعنى نفسه: فبالنسبة إلى هذه التعليمات، يمثّل الوسيط فهرسًا في قائمة الأسماء الموجودة على كائن الشيفرة.

```python
class VirtualMachine(object):
    [... snip ...]

    def parse_byte_and_args(self):
        f = self.frame
        opoffset = f.last_instruction
        byteCode = f.code_obj.co_code[opoffset]
        f.last_instruction += 1
        byte_name = dis.opname[byteCode]
        if byteCode >= dis.HAVE_ARGUMENT:
            # index into the bytecode
            arg = f.code_obj.co_code[f.last_instruction:f.last_instruction+2]  
            f.last_instruction += 2   # advance the instruction pointer
            arg_val = arg[0] + (arg[1] * 256)
            if byteCode in dis.hasconst:   # Look up a constant
                arg = f.code_obj.co_consts[arg_val]
            elif byteCode in dis.hasname:  # Look up a name
                arg = f.code_obj.co_names[arg_val]
            elif byteCode in dis.haslocal: # Look up a local name
                arg = f.code_obj.co_varnames[arg_val]
            elif byteCode in dis.hasjrel:  # Calculate a relative jump
                arg = f.last_instruction + arg_val
            else:
                arg = arg_val
            argument = [arg]
        else:
            argument = []

        return byte_name, argument
```

الدالة التالية هي `dispatch`، وهي تبحث عن العمليات الخاصة بتعليم معيّن وتنفّذها. وفي مفسّر CPython، يتم هذا التوزيع (dispatch) بجملة تحويل (switch) ضخمة تمتد على 1500 سطر! ولحسن الحظ، بما أننا نكتب بلغة بايثون، يمكننا أن نكون أكثر اختصارًا. وسنعرّف دالةً لكل اسم بايت ثم نستخدم `getattr` للبحث عنها. تمامًا كما في المفسّر اللعبي أعلاه، إذا كان اسم تعليمتنا هو `FOO_BAR` فإن الدالة المقابلة ستكون باسم `byte_FOO_BAR`. أما في الوقت الحالي، فسنُترك محتويات هذه الدوال صندوقًا أسود (black box). وستعيد كل دالة من دوال شيفرة البايت إمّا `None` وإمّا سلسلة نصية تُسمّى `why`، وهي قطعة حالة إضافية يحتاجها المفسّر في بعض الحالات. ولا تُستخدم قيم الإرجاع هذه من دوال التعليمات المنفردة إلا كمؤشّرات داخلية لحالة المفسّر&mdash;فلا تخلطها بقيم الإرجاع الناتجة عن تنفيذ الإطارات.

```python
class VirtualMachine(object):
    [... snip ...]

    def dispatch(self, byte_name, argument):
        """ Dispatch by bytename to the corresponding methods.
        Exceptions are caught and set on the virtual machine."""

        # When later unwinding the block stack,
        # we need to keep track of why we are doing it.
        why = None
        try:
            bytecode_fn = getattr(self, 'byte_%s' % byte_name, None)
            if bytecode_fn is None:
                if byte_name.startswith('UNARY_'):
                    self.unaryOperator(byte_name[6:])
                elif byte_name.startswith('BINARY_'):
                    self.binaryOperator(byte_name[7:])
                else:
                    raise VirtualMachineError(
                        "unsupported bytecode type: %s" % byte_name
                    )
            else:
                why = bytecode_fn(*argument)
        except:
            # deal with exceptions encountered while executing the op.
            self.last_exception = sys.exc_info()[:2] + (None,)
            why = 'exception'

        return why

    def run_frame(self, frame):
        """Run a frame until it returns (somehow).
        Exceptions are raised, the return value is returned.
        """
        self.push_frame(frame)
        while True:
            byte_name, arguments = self.parse_byte_and_args()

            why = self.dispatch(byte_name, arguments)

            # Deal with any block management we need to do
            while why and frame.block_stack:
                why = self.manage_block_stack(why)

            if why:
                break

        self.pop_frame()

        if why == 'exception':
            exc, val, tb = self.last_exception
            e = exc(val)
            e.__traceback__ = tb
            raise e

        return self.return_value
```

### صنف `Block`

قبل أن ننفّذ دوال كل تعليمة من تعليمات شيفرة البايت، سنناقش الكتل بإيجاز. وتُستخدم الكتلة لأنواع معيّنة من التحكم في التسلسل، وتحديدًا معالجة الاستثناءات والحلقات. والكتلة مسؤولة عن التأكّد من أن مكدّس البيانات في الحالة المناسبة حين تنتهي العملية. فمثلًا، في الحلقة، يبقى كائن مُتَشِف خاص على المكدّس ما دامت الحلقة قيد التنفيذ، لكنه يُسقط عند انتهائها. ويجب أن يتتبّع المفسّر ما إذا كانت الحلقة ما زالت مستمرة أم انتهت.

ولتتبّع هذه قطعة المعلومات الإضافية، يضبط المفسّر علمًا يشير إلى حالته. وننفّذ هذا العلم كمتغيّر اسمه `why`، ويمكن أن يكون `None` أو إحدى السلاسل النصية `"continue"` أو `"break"` أو `"exception"` أو `"return"`. وهذا يوضّح أيّ نوع من التلاعب بمكدّس الكتل ومكدّس البيانات ينبغي أن يحدث. ولنسعد إلى مثال كائن التشيف، إذا كان قمة مكدّس الكتل كتلة `loop` وكان شيفرة `why` هي `continue`، فينبغي لكائن التشيف أن يبقى على مكدّس البيانات، أما إذا كانت شيفرة `why` هي `break` فينبغي أن يُسقط منه.

تفاصيل التلاعب بالكتل دقيقة ومربكة، ولن ننفق وقتًا أطول على هذا، لكن القرّاء المهتمّين مدعوّون للنظر فيه بعناية.

```python
Block = collections.namedtuple("Block", "type, handler, stack_height")

class VirtualMachine(object):
    [... snip ...]

    # Block stack manipulation
    def push_block(self, b_type, handler=None):
        stack_height = len(self.frame.stack)
        self.frame.block_stack.append(Block(b_type, handler, stack_height))

    def pop_block(self):
        return self.frame.block_stack.pop()

    def unwind_block(self, block):
        """Unwind the values on the data stack corresponding to a given block."""
        if block.type == 'except-handler':
            # The exception itself is on the stack as type, value, and traceback.
            offset = 3  
        else:
            offset = 0

        while len(self.frame.stack) > block.level + offset:
            self.pop()

        if block.type == 'except-handler':
            traceback, value, exctype = self.popn(3)
            self.last_exception = exctype, value, traceback

    def manage_block_stack(self, why):
        """ """
        frame = self.frame
        block = frame.block_stack[-1]
        if block.type == 'loop' and why == 'continue':
            self.jump(self.return_value)
            why = None
            return why

        self.pop_block()
        self.unwind_block(block)

        if block.type == 'loop' and why == 'break':
            why = None
            self.jump(block.handler)
            return why

        if (block.type in ['setup-except', 'finally'] and why == 'exception'):
            self.push_block('except-handler')
            exctype, value, tb = self.last_exception
            self.push(tb, value, exctype)
            self.push(tb, value, exctype) # yes, twice
            why = None
            self.jump(block.handler)
            return why

        elif block.type == 'finally':
            if why in ('return', 'continue'):
                self.push(self.return_value)

            self.push(why)

            why = None
            self.jump(block.handler)
            return why
        return why
```

## التعليمات

لم يبقَ سوى تنفيذ عشرات الدوال الخاصة بالتعليمات. فالتعليمات الفعلية هي أقل أجزاء المفسّر إثارةً للاهتمام، لذا نعرض هنا عددًا قليلًا منها فحسب، لكن التنفيذ الكامل [متاح على GitHub](https://github.com/nedbat/byterun). (وقد أدرج هنا ما يكفي من التعليمات لتنفيذ جميع أمثلة الشيفرة التي فكّكناها أعلاه.)

```python
class VirtualMachine(object):
    [... snip ...]

    ## Stack manipulation

    def byte_LOAD_CONST(self, const):
        self.push(const)

    def byte_POP_TOP(self):
        self.pop()

    ## Names
    def byte_LOAD_NAME(self, name):
        frame = self.frame
        if name in frame.f_locals:
            val = frame.f_locals[name]
        elif name in frame.f_globals:
            val = frame.f_globals[name]
        elif name in frame.f_builtins:
            val = frame.f_builtins[name]
        else:
            raise NameError("name '%s' is not defined" % name)
        self.push(val)

    def byte_STORE_NAME(self, name):
        self.frame.f_locals[name] = self.pop()

    def byte_LOAD_FAST(self, name):
        if name in self.frame.f_locals:
            val = self.frame.f_locals[name]
        else:
            raise UnboundLocalError(
                "local variable '%s' referenced before assignment" % name
            )
        self.push(val)

    def byte_STORE_FAST(self, name):
        self.frame.f_locals[name] = self.pop()

    def byte_LOAD_GLOBAL(self, name):
        f = self.frame
        if name in f.f_globals:
            val = f.f_globals[name]
        elif name in f.f_builtins:
            val = f.f_builtins[name]
        else:
            raise NameError("global name '%s' is not defined" % name)
        self.push(val)

    ## Operators

    BINARY_OPERATORS = {
        'POWER':    pow,
        'MULTIPLY': operator.mul,
        'FLOOR_DIVIDE': operator.floordiv,
        'TRUE_DIVIDE':  operator.truediv,
        'MODULO':   operator.mod,
        'ADD':      operator.add,
        'SUBTRACT': operator.sub,
        'SUBSCR':   operator.getitem,
        'LSHIFT':   operator.lshift,
        'RSHIFT':   operator.rshift,
        'AND':      operator.and_,
        'XOR':      operator.xor,
        'OR':       operator.or_,
    }

    def binaryOperator(self, op):
        x, y = self.popn(2)
        self.push(self.BINARY_OPERATORS[op](https://github.com/aosabook/500lines/blob/master/x, y))

    COMPARE_OPERATORS = [
        operator.lt,
        operator.le,
        operator.eq,
        operator.ne,
        operator.gt,
        operator.ge,
        lambda x, y: x in y,
        lambda x, y: x not in y,
        lambda x, y: x is y,
        lambda x, y: x is not y,
        lambda x, y: issubclass(x, Exception) and issubclass(x, y),
    ]

    def byte_COMPARE_OP(self, opnum):
        x, y = self.popn(2)
        self.push(self.COMPARE_OPERATORS[opnum](https://github.com/aosabook/500lines/blob/master/x, y))

    ## Attributes and indexing

    def byte_LOAD_ATTR(self, attr):
        obj = self.pop()
        val = getattr(obj, attr)
        self.push(val)

    def byte_STORE_ATTR(self, name):
        val, obj = self.popn(2)
        setattr(obj, name, val)

    ## Building

    def byte_BUILD_LIST(self, count):
        elts = self.popn(count)
        self.push(elts)

    def byte_BUILD_MAP(self, size):
        self.push({})

    def byte_STORE_MAP(self):
        the_map, val, key = self.popn(3)
        the_map[key] = val
        self.push(the_map)

    def byte_LIST_APPEND(self, count):
        val = self.pop()
        the_list = self.frame.stack[-count] # peek
        the_list.append(val)

    ## Jumps

    def byte_JUMP_FORWARD(self, jump):
        self.jump(jump)

    def byte_JUMP_ABSOLUTE(self, jump):
        self.jump(jump)

    def byte_POP_JUMP_IF_TRUE(self, jump):
        val = self.pop()
        if val:
            self.jump(jump)

    def byte_POP_JUMP_IF_FALSE(self, jump):
        val = self.pop()
        if not val:
            self.jump(jump)

    ## Blocks

    def byte_SETUP_LOOP(self, dest):
        self.push_block('loop', dest)

    def byte_GET_ITER(self):
        self.push(iter(self.pop()))

    def byte_FOR_ITER(self, jump):
        iterobj = self.top()
        try:
            v = next(iterobj)
            self.push(v)
        except StopIteration:
            self.pop()
            self.jump(jump)

    def byte_BREAK_LOOP(self):
        return 'break'

    def byte_POP_BLOCK(self):
        self.pop_block()

    ## Functions

    def byte_MAKE_FUNCTION(self, argc):
        name = self.pop()
        code = self.pop()
        defaults = self.popn(argc)
        globs = self.frame.f_globals
        fn = Function(name, code, globs, defaults, None, self)
        self.push(fn)

    def byte_CALL_FUNCTION(self, arg):
        lenKw, lenPos = divmod(arg, 256) # KWargs not supported here
        posargs = self.popn(lenPos)

        func = self.pop()
        frame = self.frame
        retval = func(*posargs)
        self.push(retval)

    def byte_RETURN_VALUE(self):
        self.return_value = self.pop()
        return "return"
```

## الأنواع الديناميكية: ما لا يعرفه المصرّف

من الأشياء التي قد سمعت بها أن بايثون لغة «ديناميكية»&mdash;وبخاصة أنها «مكتوبة بأنواع ديناميكية». والعمل الذي أنجزناه حتى هذه النقطة يلقي بعض الضوء على هذا الوصف.

أحد معاني «ديناميكية» في هذا السياق هو أن قدرًا كبيرًا من العمل يتم في زمن التشغيل. فقد رأينا في وقت سابق أن مصرّف بايثون لا يملك معلومات كثيرة عمّا تفعله الشيفرة فعلًا. فمثلًا، فكّر في الدالة القصيرة `mod` أدناه. تأخذ `mod` وسيطين وتُعيد الأول على الثاني (باقي القسمة). وفي شيفرة البايت، نرى أن المتغيّرين `a` و`b` يُحمَّلان، ثم تُجري شيفرة البايت `BINARY_MODULO` عملية الباقي على النفس بنفسها.

```python
>>> def mod(a, b):
...    return a % b
>>> dis.dis(mod)
  2           0 LOAD_FAST                0 (a)
              3 LOAD_FAST                1 (b)
              6 BINARY_MODULO
              7 RETURN_VALUE
>>> mod(19, 5)
4
```

حساب 19 `%` 5 يعطي 4&mdash;ولا مفاجأة هنا. فماذا يحدث إن استدعيناها بوسائط مختلفة؟

```python
>>> mod("by%sde", "teco")
'bytecode'
```

وماذا حدث للتوّ؟ لقد رأيتَ هذه الصياغة على الأرجح من قبل، لكن في سياق مختلف:

```
>>> print("by%sde" % "teco")
bytecode
```

استخدام الرمز `%` لصياغة نص للطباعة يعني استدعاء التعليمة `BINARY_MODULO`. وهذه التعليمة تأخذ الباقي بين أعلى قيمتين على المكدّس لحظة تنفيذ التعليمة&mdash;سواء كانتا نصين أو عددين صحيحين أو نسخًا من صنف عرّفته بنفسك. وقد وُلِّدت شيفرة البايت حين صُرِّفت الدالة (وبالمناسبة، حين عُرِّفت)، وتُستخدم شيفرة البايت نفسها مع أنواع مختلفة من الوسائط.

يعرف مصرّف بايثون القليل نسبيًا عن الأثر الذي سيُحدثته شيفرة البايت. فعلى المفسّر أن يحدّد نوع الكائن الذي تعمل عليه `BINARY_MODULO` ويقوم بالشيء الصحيح لذلك النوع. ولهذا يُوصف بايثون بأنه _مكتوب بأنواع ديناميكية_: فأنت لا تعرف أنواع وسائط هذه الدالة حتى تشغّلها فعلًا. وبالمقابل، في لغة مكتوبة بأنواع ساكنة (statically typed)، يخبر المبرمج المصرّف مسبقًا بما ستكون عليه أنواع الوسائط (أو يستنتجها المصرّف وحده).

جهل المصرّف هو أحد التحديات التي تواجه تحسين بايثون أو تحليلها تحليلًا ساكنًا&mdash;فمجرد النظر إلى شيفرة البايت، من دون تشغيل الشيفرة فعلًا، لا تعرف ما سيفعله كل تعليمة! وفي الواقع، يمكنك أن تُعرّف صنفًا ينفّذ الدالة `__mod__`، وسيستدعي بايثون تلك الدالة إذا استخدمت `%` على كائناتك. إذًا يمكن لـ`BINARY_MODULO` أن ينفّذ أي شيفرة على الإطلاق!

مجرّد النظر إلى الشيفرة التالية، تبدو أول عملية حساب لـ`a % b` مهدورةً للوقت.

```python
def mod(a,b):
    a % b
    return a %b
```

للأسف، لا يستطيع التحليل الساكن لهذه الشيفرة&mdash;من النوع الذي يمكنك إجراؤه من دون تشغيلها&mdash;أن يتأكّد من أن `a % b` الأولى لا تفعل شيئًا حقًا. فاستدعاء `__mod__` عبر `%` قد يكتب إلى ملف، أو يتفاعل مع جزء آخر من برنامجك، أو يفعل حرفيًا أي شيء آخر ممكن في بايثون. ومن الصعب تحسين دالة حين لا تعرف ما تفعله! ففي الورقة الرائعة لسَيَرِل باور وأليكس روبينستاين "إلى أي حدّ يمكننا أن نجعل بايثون المفسَّرة سريعة؟" يذكران: "في غياب معلومات الأنواع على نحو عام، يجب التعامل مع كل تعليمة على أنها `INVOKE_ARBITRARY_METHOD`."

## الخلاصة

Byterun هو مفسّر بايثون مُدمج يسهل فهمه أكثر من CPython. ويُحاكي Byterun التفاصيل البنيوية الأساسية لـCPython: مفسّرًا قائمًا على مكدّس يعمل على مجموعات تعليمات تُدعى شيفرة بايت. فهو يمرّ على هذه التعليمات أو يقفز بينها، مدفوعًا إلى مكدّس بيانات ومُسقطًا منه. ويُنشئ المفسّر الإطارات ويهدمها ويقفز بينها مع استدعائه الدوال والمولّدات وعودته منها. ويشارك Byterun المفسّر الحقيقي قيوده أيضًا: فبما أن بايثون تستخدم أنواعًا ديناميكية، يجب على المفسّر أن يبذل جهدًا كبيرًا في زمن التشغيل لتحديد السلوك الصحيح للبرنامج.

أشجّعك على تفكيك برامجك وتشغيلها باستخدام Byterun. فستصطدم سريعًا بتعليمات لا ينفّذها هذا الإصدار الأقصر من Byterun. ويمكن العثور على التنفيذ الكامل في https://github.com/nedbat/byterun&mdash;أو، بقراءة شيفرة `ceval.c` الخاصة بمفسّر CPython الحقيقي قراءةً متأنّية، يمكنك أن تنفّذه بنفسك!

## شكر وتقدير

أشكر نيد باتشيلدر على إطلاق هذا المشروع وتوجيه مساهماتي، وMichael Arntzenius على مساعدته في تنقيح الشيفرة وتحرير النثر، وليتا مونتوبولي على تعديلاتها، وعلى مجتمع مركز Recurse Center بأكمله على دعمه واهتمامه. وأي أخطاء هي أخطائي أنا.
