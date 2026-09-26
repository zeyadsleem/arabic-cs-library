---
title: "بلوك كود: مجموعة أدوات برمجة بصرية"
lang: ar
source: https://aosabook.org/en/500L/blockcode.html
---

_[ديتي](https://twitter.com/dethe) هو أب يعشق التقنية، ومبرمج يعنى بالجماليات، ومرشد، ومبتكر أداة البرمجة البصرية [واتربير](http://waterbearlang.com/). وهو يستضيف صالونات «صنّاع النماذج» التعليمية في فانكوفر، ويرغب في ملء العالم بأرانب أوريغامي روبوتية._

في لغات البرمجة القائمة على الكُتل (blocks)، تكتب البرامج بسحب الكتل التي تمثّل أجزاء من البرنامج وربطها ببعضها. وتختلف اللغات القائمة على الكتل عن لغات البرمجة التقليدية التي تكتب فيها الكلمات والرموز.

قد يكون تعلّم لغة برمجة صعباً لأنها شديدة الحساسية حتى لأصغر خطأ إملائي. معظم لغات البرمجة حسّاسة لحالة الأحرف، ذات نحو غامض، وترفض التنفيذ إن وضعت فاصلة منقوطة في المكان الخطأ بمقدار ما - أو أسوأ من ذلك، إن أهملتها تماماً. وإضافةً إلى ذلك، فإن معظم لغات البرمجة المستخدمة اليوم مبنية على الإنجليزية ولا يمكن تعريب صياغتها.

على النقيض من ذلك، يمكن للغة كتل مصمَّمة بإتقان أن تقضي على أخطاء الصياغة تماماً. فما زال بإمكانك إنشاء برنامج يفعل الشيء الخطأ، لكن لا يمكنك إنشاء واحد بصياغة خاطئة: فالكتل ببساطة لن تتّسع بهذا الشكل. كما أن لغات الكتل أكثر قابلية للاكتشاف: يمكنك أن ترى جميع بِنَى اللغة ومكتباتها (libraries) في قائمة الكتل مباشرة. وإضافةً إلى ذلك، يمكن تعريب الكتل إلى أي لغة بشرية دون تغيير معنى لغة البرمجة.

\aosafigure[240pt]/images/500-lines/blockcode-0-blockcode_ide.webp{بيئة التطوير المتكاملة (IDE) لبلوك كود أثناء الاستخدام}{500l.blockcode.ide}

للغات القائمة على الكتل تاريخ طويل، ومن أبرزها [ليغو مايستورمز](http://www.lego.com/en-us/mindstorms/) و[أليس ثري دي](http://www.alice.org/index.php) و[ستارلوغو](http://education.mit.edu/projects/starlogo-tng) و[خُصّصاً سكراتش](http://scratch.mit.edu/). وهناك أيضاً عدة أدوات للبرمجة بالكتل على الويب: [بلوكلي](https://developers.google.com/blockly/) و[آب إنفنتور](http://appinventor.mit.edu/explore/) و[تينكر](http://www.tynker.com/) و[وأدوات أخرى كثيرة](http://en.wikipedia.org/wiki/Visual_programming_language).

الشيفرة في هذا الفصل مستندة بصورة عامة إلى مشروع مفتوح المصدر اسمه [واتربير](http://waterbearlang.com/)، وهو ليس لغة بل أداة لتغليف لغات قائمة بصياغة معتمدة على الكتل. ومن مزايا هذا التغليف ما سبق ذكره: إلغاء أخطاء الصياغة، والعرض المرئي للمكوّنات المتاحة، وسهولة التعريب. وإضافةً إلى ذلك، أحياناً ما تكون الشيفرة المرئية أسهل في القراءة والتنقيح، ويمكن للأطفال قبل أن يتعلّموا القراءة أن يستخدموا الكتل. (ولنا في الحقيقة أن نذهب أبعد من ذلك فنضع أيقونات على الكتل، إما إلى جانب الأسماء النصية أو بدلاً منها، ليتمكّن الأطفال غير القادرين على القراءة من كتابة برامج، لكننا لا نذهب إلى هذا الحد في هذا المثال.)

يعود اختيار رسومات السلحفاة (turtle graphics) لهذه اللغة إلى لغة لوغو، التي أُنشئت تحديداً لتعليم البرمجة للأطفال. وتتضمن عدة من اللغات القائمة على الكتل المذكورة أعلاه رسومات السلحفاة، وهو مجال صغير بما يكفي ليمكن أن يُلتقَط في مشروع محدَّد الضوابط مثل هذا.

إذا رغبت في التعرّف على طابع ما تن عليه لغة قائمة على الكتل، فيمكنك التجربة بالبرنامج المبني في هذا الفصل من [مستودع GitHub للمؤلف](https://dethe.github.io/500lines/blockcode/).

## الأهداف والبنية

أريد أن أحقّق شيئين بهذه الشيفرة. أولاً وفوق كل شيء، أريد أن أنفّذ لغة كتل لرسومات السلحفاة، تكتب بها شيفرة لإنشاء الصور عبر سحب الكتل وإفلاتها ببساطة، باستخدام أبسط بنية ممكنة من HTML وCSS وJavaScript. وثانياً، وهو أمر لا يقل أهمية، أريد أن أُظهر كيف يمكن للكتل نفسها أن تصبّح إطار عمل (framework) للغات أخرى غير لغتنا المصغّرة للسلحفاة.

ولتحقيق ذلك، نغلّف كل ما يخصّ لغة السلحفاة تحديداً في ملف واحد \newline (`turtle.js`) يمكننا استبداله بسهولة بملف آخر. ولا ينبغي أن يكون أي شيء آخر خاصاً بلغة السلحفاة؛ فبقية الملفات إمّا أن تتعلّق بمعالجة الكتل (`blocks.js` و`menu.js`) أو تكون أدوات ويب عامة النفع (`util.js` و`drag.js` و`file.js`). هذه هي الهدف، غير أن الحفاظ على صغر حجم المشروع استلزم أن تكون بعض تلك الأدوات أقل عمومية وأكثر ارتباطاً باستعمالها مع الكتل.

أمر واحد لفت انتباهي وأنا أكتب لغة كتل هو أن اللغة هي بيئة التطوير المتكاملة (IDE) الخاصة بها. فلا يمكنك ببساطة أن تكتب شيفرة الكتل في محرّر النصوص المفضّل لديك؛ بل يجب أن تُصمَّم بيئة التطوير وتُطوَّر بالتوازي مع لغة الكتل. ولهذا الأمر إيجابيات وسلبيات. من الإيجابيات أن الجميع سيستخدم بيئة متسقة، ولا مجال لحروب دينية حول أي محرّر ينبغي استخدامه. ومن السلبيات أنه قد يشتّت انتباهك بشدة عن بناء لغة الكتل نفسها.

### طبيعة السكربتات

سكربت في بلوك كود، مثله مثل سكربت في أي لغة (سواء كانت قائمة على الكتل أم على النص)، هو سلسلة عمليات يجب اتباعها. وفي حالة بلوك كود، يتكوّن السكربت من عناصر HTML يتم التكرار عليها، ويرتبط كل منها بدالة JavaScript بعينها تُنفَّذ حين يحين دور تلك الكتلة. ويمكن لبعض الكتل أن تحتوي كتلاً أخرى (وأن تكون مسؤولة عن تشغيلها)، ويمكن لبعض الكتل أن تحتوي وسائط عددية تُمرَّر إلى الدوال.

في معظم اللغات (القائمة على النص) يمرّ السكربت بعدة مراحل: حيث يحوّل المُرمِّز (lexer) النص إلى رموز (tokens) معروفة، وينظّم المحلّل (parser) تلك الرموز في شجرة صياغة مجرّدة، ثم - بحسب اللغة - قد يُصرَّف البرنامج إلى شيفرة آلة أو يُمرَّر إلى مفسّر (interpreter). هذه تبسيط؛ إذ قد تكون هناك خطوات أخرى. أما في بلوك كود، فإن تخطيط الكتل في منطقة السكربت يمثّل شجرة الصياغة المجرّدة بالفعل، ولذلك لا نضطر إلى المرور بمرحلتي الترميز والتحليل. ونستخدم نمط الزائر (Visitor pattern) للتكرار على تلك الكتل واستدعاء دوال JavaScript المُعرَّفة مسبقاً المرتبطة بكل كتلة من أجل تشغيل البرنامج.

لا شيء يمنعنا من إضافة مراحل أخرى لتصبح أقرب إلى اللغة التقليدية. بدلاً من مجرد استدعاء دوال JavaScript المرتبطة، يمكننا استبدال `turtle.js` بلغة كتل تُصدر شيفرة بايت (byte code) لآلة افتراضية (virtual machine) مختلفة، أو حتى شيفرة C++ لمصرّف (compiler). وتوجد لغات كتل (كجزء من مشروع واتربير) لتوليد شيفرة روبوتات Java، ولبرمجة أردوينو، وللكتابة النصية على ماينكرافت التي تعمل على راسبيري باي.

### تطبيقات الويب

كي تكون الأداة متاحة لأوسع جمهور ممكن، فإنها وليدة للويب (web-native). فهي مكتوبة بـ HTML وCSS وJavaScript، لذا ينبغي أن تعمل في معظم المتصفحات والمنصات.

متصفحات الويب الحديثة منصّات قوية، تتيح مجموعة غنية من الأدوات لبناء تطبيقات رائعة. فإذا أصبح شيء ما في التنفّذ معقّداً أكثر من اللازم، فإنني أفسّر ذلك على أنه إشارة إلى أنني لم أضعه «بطريقة الويب»، وأحاول عند الإمكان أن أعيد التفكير في كيفية الاستفادة من أدوات المتصفح على نحو أفضل.

من الفروق المهمة بين تطبيقات الويب وتطبيقات سطح المكتب أو تطبيقات الخادم التقليدية هو غياب `main()` أو أي نقطة دخول أخرى. فلا توجد حلقة تشغيل (run loop) صريحة لأن ذلك مبنيّ أصلاً في المتصفح ضمنياً في كل صفحة ويب. وستُحلَّل جميع شيفرتنا وتُنفَّذ عند التحميل، وعندها يمكننا تسجيل اهتمامنا بأحداث معيّنة للتفاعل مع المستخدم. وبعد التشغيل الأول، يكون كل تفاعل لاحق مع شيفرتنا عبر دوال استدعاء (callbacks) نقيمها ونسجّلها، سواء كانت مسجّلة لأحداث (مثل حركة الفأرة) أو لمهل زمنية (تُطلق بالوتيرة التي نحدّدها) أو لمعالِج إطارات (تُستدعى عند كل إعادة رسم للشاشة، أي ستين إطاراً في الثانية عموماً). كما أن المتصفح لا يوفّر خيوطاً (threads) كاملة الإمكانات (إنما عمّال ويب لا يشتركون في شيء فحسب).

## المرور على الشيفرة خطوةً بخطوة

حاولت أن أتبع بعض الأعراف وأفضل الممارسات في هذا المشروع كله. كل ملف JavaScript ملفوف داخل دالة تفادياً لتسريب المتغيّرات إلى البيئة العامّة. وإذا احتاج إلى كشف متغيّرات لملفات أخرى، فإنه يعرّف متغيّراً عامّاً واحداً لكل ملف، مستندةً إلى اسم الملف، تحيط به الدوال المكشوفة. وسيكون ذلك قرب نهاية الملف، يليه أي معالِجات أحداث ضبطها ذلك الملف، لتتمكّن دائماً من إلقاء نظرة سريعة على نهاية الملف لمعرفة الأحداث التي يعالجها والدوال التي يكشفها.

أسلوب الشيفرة إجرائي (procedural)، لا كائني التوجه ولا وظيفي. يمكننا فعل الشيء نفسه بأي من هذه النماذج، لكن ذلك سيتطلب شيفرة تهيئة أكبر وأغلفة تُفرض على ما هو قائم أصلاً في DOM. وقد جعلت الأعمال الحديثة على [العناصر المخصَّصة](http://webcomponents.org/) العمل مع DOM بنمط كائني التوجه أسهل، وهناك كتابات ممتازة كثيرة عن [JavaScript الوظيفي](https://leanpub.com/javascript-allonge/read)، لكن أيّهما يتطلب قدراً من القسر والتلفيف، فبدا ببساطة أن إبقاءه إجرائياً هو الأنسب.

هناك ثمانية ملفات مصدر في هذا المشروع، لكن `index.html` و`blocks.css` بنياءٌ أساسي ونمط للتطبيق ولن نتناولهما بالحديث. كذلك لن نتناول بالتفصيل أيّ من ملفي JavaScript: فـ `util.js` يحتوي على بعض دوال المساعدة ويصنع جسراً بين مختلف تطبيقات المتصفح - شبيه بمكتبة مثل jQuery لكن في أقل من خمسين سطراً من الشيفرة. أما `file.js` فأداة مماثلة تُستخدم لتحميل الملفات وحفظها وتسلسل السكربتات.

وهذه هي الملفات المتبقية:

* `block.js` هو التمثيل المجرّد للغة قائمة على الكتل.
* `drag.js` ينفّذ التفاعل الأساسي للغة: السماح للمستخدم بسحب الكتل من قائمة الكتل المتاحة (القائمة «menu») وتجميعها في برنامج (السكربت «script»).
* `menu.js` يضمّ بعض شيفرة المساعدة وهو أيضاً مسؤول عن تشغيل برنامج المستخدم فعلياً.
* `turtle.js` يعرّف خصوصيات لغتنا القائمة على الكتل (رسومات السلحفاة) ويهيّئ كتلها المخصّصة. وهذا هو الملف الذي يُستبدل لإنشاء لغة كتل مختلفة.

### `blocks.js`

تتكوّن كل كتلة من بضعة عناصر HTML، منسَّقة بـ CSS، مع بعض معالِجات أحداث JavaScript للسحب والإفلات وتعديل وسائط الإدخال. ويساعد ملف `blocks.js` على إنشاء هذه التجمّعات من العناصر وإدارتها بوصفها كائنات (objects) مفردة. وحين يُضاف نوع من الكتل إلى قائمة الكتل، يُربط بدالة JavaScript تُنفِّذ اللغة، ولذلك يجب أن تمكّن كل كتلة في السكربت من العثور على دالتها المرتبطة واستدعائها عند تشغيل السكربت.

\aosafigure[144pt]/images/500-lines/blockcode-1-block.webp{مثال على كتلة}{500l.blockcode.block}

للكتل جزءان اختياريان من البنية. يمكن أن يكون لها وسيط عددي واحد (بقيمة افتراضية)، ويمكن أن تكون حاويةً لكتل أخرى. وهذه حدود صارمة للعمل ضمنها، لكنها ستخفّ في نظام أكبر. ففي واتربير توجد أيضاً كتل تعابير يمكن تمريرها كوسائط، وتدعم عدة وسائط من مختلف الأنواع. أما هنا، في عالم القيود الضيقة، فسنرى ما يمكننا فعله بنوع واحد فقط من الوسائط.

```html
<!-- The HTML structure of a block -->
<div class="block" draggable="true" data-name="Right">
    Right
    <input type="number" value="5">
    degrees
</div>
```

من المهم أن نلاحظ أنه لا يوجد تمييز حقيقي بين الكتل في القائمة والكتل في السكربت. يعامل السحبُها معاملةً مختلفة قليلاً بحسب المكان الذي تُسحب منه، وحين نشغّل سكربتاً لا ينظر إلا إلى الكتل الموجودة في منطقة السكربت، لكنها في جوهرها البنى نفسها، ما يعني أننا نستطيع استنساخ الكتل عند السحب من القائمة إلى السكربت.

تُرجع الدالة `createBlock(name, value, contents)` كتلةً كعنصر DOM مملوءاً بجميع عناصره الداخلية، جاهزةً للإدراج في المستند. ويمكن استخدام هذا لإنشاء كتل القائمة، أو لاستعادة كتل سكربت محفوظة في ملفات أو في `localStorage`. ورغم مرونتها بهذه الطريقة، فإنها مصمَّمة خصيصاً لـ«لغة» بلوك كود وتبني افتراضات عليها، فإذا وُجدت قيمة فإنها تفترض أن القيمة تمثّل وسيطاً عددياً وتنشئ حقل إدخال من نوع «number». ولأن هذا قيدٌ في بلوك كود فإن الأمر مقبول، لكن لو وسّعنا الكتل لدعم أنواع أخرى من الوسائط، أو لأكثر من وسيط واحد، لكان على الشيفرة أن تتغيّر.

```javascript
    function createBlock(name, value, contents){
        var item = elem('div',
            {'class': 'block', draggable: true, 'data-name': name},
            [name]
        );
        if (value !== undefined && value !== null){
            item.appendChild(elem('input', {type: 'number', value: value}));
        }
        if (Array.isArray(contents)){
            item.appendChild(
                elem('div', {'class': 'container'}, contents.map(function(block){
                return createBlock.apply(null, block);
            })));
        }else if (typeof contents === 'string'){
            // Add units (degrees, etc.) specifier
            item.appendChild(document.createTextNode(' ' + contents));
        }
        return item;
    }
```

لدينا بعض الأدوات التي تتعامل مع الكتل بوصفها عناصر DOM:

- `blockContents(block)` تسترجع الكتل الفرعية لكتلة حاوية. فهي تُرجع قائمة دائماً إذا استُدعيت على كتلة حاوية، وتُرجع null دائماً على كتلة بسيطة
- `blockValue(block)` تُرجع القيمة العددية لحقل الإدخال في الكتلة إذا كانت الكتلة تملك حقل إدخال من نوع number، أو null إن لم يكن هناك عنصر إدخال لتلك الكتلة
- `blockScript(block)` تُرجع بنيةً مناسبة للتسلسل باستخدام JSON، لحفظ الكتل في صورة يمكن استعادتها منها بسهولة
- `runBlocks(blocks)` معالجٌ يشغّل كل كتلة في مصفوفة كتل

```javascript
    function blockContents(block){
        var container = block.querySelector('.container');
        return container ? [].slice.call(container.children) : null;
    }

    function blockValue(block){
        var input = block.querySelector('input');
        return input ? Number(input.value) : null;
    }

    function blockUnits(block){
        if (block.children.length > 1 &&
            block.lastChild.nodeType === Node.TEXT_NODE &&
            block.lastChild.textContent){
            return block.lastChild.textContent.slice(1);
        }
    }

    function blockScript(block){
        var script = [block.dataset.name];
        var value = blockValue(block);
        if (value !== null){
            script.push(blockValue(block));
        }
        var contents = blockContents(block);
        var units = blockUnits(block);
        if (contents){script.push(contents.map(blockScript));}
        if (units){script.push(units);}
        return script.filter(function(notNull){ return notNull !== null; });
    }

    function runBlocks(blocks){
        blocks.forEach(function(block){ trigger('run', block); });
    }
```

### `drag.js`

الغرض من `drag.js` هو تحويل كتل HTML الساكنة إلى لغة برمجة حيّة عبر تنفيذ التفاعلات بين قسم القائمة في الواجهة وقسم السكربت. يبني المستخدم برنامجه بسحب الكتل من القائمة إلى السكربت، ويشغّل النظامُ الكتلَ الموجودة في منطقة السكربت.

نحن نستخدم السحب والإفلات في HTML5؛ ومعالِجات أحداث JavaScript التي يحتاجها معرَّفة هنا. (لمزيد من المعلومات عن استخدام السحب والإفلات في HTML5، راجع [مقال إريك بيدلمان](http://www.html5rocks.com/en/tutorials/dnd/basics/).) ورغم أن الدعم المدمج للسحب والإفلات أمر لطيف، إلا أنه له بعض الطرافات وبعض القيود الكبرى، مثل عدم تنفيذه في أي متصفح على الهواتف المحمولة وقت كتابة هذا الكتاب.

نعرّف بعض المتغيّرات في أعلى الملف. وأثناء السحب، سنحتاج إلى الإشارة إليها من مراحل مختلفة في رقصة دالة الاستدعاء الخاصة بالسحب.

```javascript
    var dragTarget = null; // Block we're dragging
    var dragType = null; // Are we dragging from the menu or from the script?
    var scriptBlocks = []; // Blocks in the script, sorted by position
```

وبحسب مكان بداية السحب ونهايته، سيكون لـ `drop` آثار مختلفة:

* إذا كان السحب من السكربت إلى القائمة، فاحذف `dragTarget` (أزل الكتلة من السكربت).
* إذا كان السحب من السكربت إلى السكربت، فانقل `dragTarget` (انقل كتلة سكربت موجودة).
* إذا كان السحب من القائمة إلى السكربت، فانسخ `dragTarget` (أدرج كتلة جديدة في السكربت).
* إذا كان السحب من القائمة إلى القائمة، فلا تفعل شيئاً.

أثناء معالج `dragStart(evt)` نبدأ بتتبّع ما إذا كانت الكتلة تُنسخ من القائمة أم تُنقل من السكربت (أو داخله). كما نلتقط قائمة بجميع الكتل الموجودة في السكربت والتي لا يجري سحبها، لاستخدامها لاحقاً. أمّا الاستدعاء `evt.dataTransfer.setData` فيُستخدم للسحب بين المتصفح والتطبيقات الأخرى (أو سطح المكتب)، وهو أمر لا نستعمله، لكننا نستدعيه على أي حال للتخلّص من خطأ ما.

```javascript
    function dragStart(evt){
        if (!matches(evt.target, '.block')) return;
        if (matches(evt.target, '.menu .block')){
            dragType = 'menu';
        }else{
            dragType = 'script';
        }
        evt.target.classList.add('dragging');
        dragTarget = evt.target;
        scriptBlocks = [].slice.call(
            document.querySelectorAll('.script .block:not(.dragging)'));
        // For dragging to take place in Firefox, we have to set this, even if
        // we don't use it
        evt.dataTransfer.setData('text/html', evt.target.outerHTML);
        if (matches(evt.target, '.menu .block')){
            evt.dataTransfer.effectAllowed = 'copy';
        }else{
            evt.dataTransfer.effectAllowed = 'move';
        }
    }
```

ووأثناء السحب، تتيح لنا الأحداث `dragenter` و`dragover` و`dragout` فرصاً لإضافة إشارات بصرية عبر إبراز أهداف الإفلات الصالحة وغيرها. ومن بينها لا نستثمر سوى `dragover`.

```javascript
    function dragOver(evt){
        if (!matches(evt.target, '.menu, .menu *, .script, .script *, .content')) {
            return;
        }
        // Necessary. Allows us to drop.
        if (evt.preventDefault) { evt.preventDefault(); }
        if (dragType === 'menu'){
            // See the section on the DataTransfer object.
            evt.dataTransfer.dropEffect = 'copy';  
        }else{
            evt.dataTransfer.dropEffect = 'move';
        }
        return false;
    }
```

حين نُفلت زر الفأرة، نتلقّى حدث `drop`. وهنا تحدث المعجزة. علينا أن نتحقّق من المكان الذي سحبنا منه (وهو ما ضُبط في `dragStart`) والمكان الذي سحبنا إليه. ثم إمّا أن ننسخ الكتلة أو ننقلها أو نحذفها حسب الحاجة. ونطلق بعض الأحداث المخصَّصة باستخدام `trigger()` (المعرَّفة في `util.js`) لاستعمالنا في منطق الكتل، حتى نتمكّن من تحديث السكربت عندما يتغيّر.

```javascript
    function drop(evt){
        if (!matches(evt.target, '.menu, .menu *, .script, .script *')) return;
        var dropTarget = closest(
            evt.target, '.script .container, .script .block, .menu, .script');
        var dropType = 'script';
        if (matches(dropTarget, '.menu')){ dropType = 'menu'; }
        // stops the browser from redirecting.
        if (evt.stopPropagation) { evt.stopPropagation(); }
        if (dragType === 'script' && dropType === 'menu'){
            trigger('blockRemoved', dragTarget.parentElement, dragTarget);
            dragTarget.parentElement.removeChild(dragTarget);
        }else if (dragType ==='script' && dropType === 'script'){
            if (matches(dropTarget, '.block')){
                dropTarget.parentElement.insertBefore(
                    dragTarget, dropTarget.nextSibling);
            }else{
                dropTarget.insertBefore(dragTarget, dropTarget.firstChildElement);
            }
            trigger('blockMoved', dropTarget, dragTarget);
        }else if (dragType === 'menu' && dropType === 'script'){
            var newNode = dragTarget.cloneNode(true);
            newNode.classList.remove('dragging');
            if (matches(dropTarget, '.block')){
                dropTarget.parentElement.insertBefore(
                    newNode, dropTarget.nextSibling);
            }else{
                dropTarget.insertBefore(newNode, dropTarget.firstChildElement);
            }
            trigger('blockAdded', dropTarget, newNode);
        }
    }
```


تُستدعى الدالة `dragEnd(evt)` حين نرفع زر الفأرة، لكن بعد أن نتعامل مع حدث `drop`. وهنا يمكننا التنظيف، وإزالة الأصناف (classes) من العناصر، وإعادة ضبط الأمور من أجل السحب التالي.

```javascript
    function _findAndRemoveClass(klass){
        var elem = document.querySelector('.' + klass);
        if (elem){ elem.classList.remove(klass); }
    }

    function dragEnd(evt){
        _findAndRemoveClass('dragging');
        _findAndRemoveClass('over');
        _findAndRemoveClass('next');
    }
```

### `menu.js`

الملف `menu.js` هو المكان الذي تُربط فيه الكتل بالدوال التي تُستدعى عند تشغيلها، ويحتوي على شيفرة تشغيل السكربت فعلياً بينما يبنيه المستخدم. وكلما عُدِّل السكربت، يُعاد تشغيله تلقائياً.

«القائمة» في هذا السياق ليست قائمة منسدلة (أو منبثقة) كما في معظم التطبيقات، بل هي قائمة الكتل التي يمكنك اختيارها لسكربتك. وهذا الملف هو الذي يهيّئها، ويبدأ القائمة بكتلة تكرار عمومية النفع (وبالتالي ليست جزءاً من لغة السلحفاة نفسها). هذا ملف أشبه بملف لمتفرّقات، للأشياء التي قد لا تنتمي إلى أي مكان آخر.

وجود ملف واحد نجمع فيه الدوال المتناثرة أمر مفيد، وخصوصاً حين تكون البنية المعمارية قيد التطوير. فالنظريّة التي أراها لتوثيق البيت النظيف هي تخصيص أماكن للفوضى، وينطبق ذلك أيضاً على بناء بنية برنامج. يصبح ملف أو وحدة (module) ما سلة شاملة (catch-all) للأشياء التي ليس لها موضع واضح بعد. ومع نمو هذا الملف من المهم أن نراقب البِنى النامية: إذ يمكن استخراج عدة دوال متعلقة في وحدة منفصلة (أو ضمّها معاً في دالة أكثر عمومية). ولا تريد للحاوية الشاملة أن تكبر بلا حدّ، بل أن تكون مكان حجز مؤقت حتى تجد الطريقة الصحيحة لتنظيم الشيفرة.

نُبقي على مراجع إلى `menu` و`script` لأننا نستعملهما كثيراً؛ فلا فائدة من مطاردة DOM بحثاً عنهما مراراً. وسنستعمل أيضاً `scriptRegistry` حيث نخزّن سكربتات الكتل في القائمة. ونستخدم ربطاً بسيطاً جداً بين الاسم والسكربت، وهو لا يدعم تعدّد كتل القائمة ذات الاسم الواحد ولا إعادة تسمية الكتل. أما بيئة سكربت أكثر تعقيداً فتحتاج إلى شيء أكثر متانة.

نستعمل `scriptDirty` لتتبّع ما إذا كان السكربت قد عُدِّل منذ آخر مرة شُغِّل فيها، كي لا نواصل محاولة تشغيله باستمرار.

```javascript
    var menu = document.querySelector('.menu');
    var script = document.querySelector('.script');
    var scriptRegistry = {};
    var scriptDirty = false;
```

حين نرغب في إخبار النظام بأن يشغّل السكربت في معالج الإطار التالي، نستدعي `runSoon()` التي تضبط راية `scriptDirty` على `true`. ويستدعي النظام `run()` في كل إطار، لكنه يعود فوراً ما لم تكن `scriptDirty` مضبوطة. وحين تكون `scriptDirty` مضبوطة، يشغّل جميع كتل السكربت، كما يطلق أحداثاً لتتيح للغة المخصّصة معالجة أي مهام تحتاجها قبل تشغيل السكربت وبعده. وهذا يفصل الكتل بوصفها حقيبة أدوات عن لغة السلحفاة، ليصبح بالإمكان إعادة استخدام الكتل (أو جعل اللغة قابلة للتبديل، بحسب منظورك).

كجزء من تشغيل السكربت، نكرّر على كل كتلة، مستدعين `runEach(evt)` عليها، وهي تضبط صنفاً (class) على الكتلة، ثم تجد الدالة المرتبطة بها وتنفّذها. وإذا أبطأنا الأمور، ينبغي أن تتمكّن من مشاهدة الشيفرة تُنفَّذ بينما تومض كل كتلة لتبيّن وقت تشغيلها.

أمّا الدالة `requestAnimationFrame` أدناه فيوفّرها المتصفح من أجل الرسوم المتحركة. وهي تأخذ دالةً تُستدعى من أجل الإطار التالي الذي سيعيد المتصفح رسمه (بمعدل ستين إطاراً في الثانية) بعد إجراء الاستدعاء. أما عدد الإطارات التي نحصل عليها فعلاً فيتوقّف على مدى سرعتنا في إنجاز العمل داخل ذلك الاستدعاء.

```javascript
    function runSoon(){ scriptDirty = true; }

    function run(){
        if (scriptDirty){
            scriptDirty = false;
            Block.trigger('beforeRun', script);
            var blocks = [].slice.call(
                document.querySelectorAll('.script > .block'));
            Block.run(blocks);
            Block.trigger('afterRun', script);
        }else{
            Block.trigger('everyFrame', script);
        }
        requestAnimationFrame(run);
    }
    requestAnimationFrame(run);

    function runEach(evt){
        var elem = evt.target;
        if (!matches(elem, '.script .block')) return;
        if (elem.dataset.name === 'Define block') return;
        elem.classList.add('running');
        scriptRegistry[elem.dataset.name](https://github.com/aosabook/500lines/blob/master/elem);
        elem.classList.remove('running');
    }
```

نضيف الكتل إلى القائمة باستخدام `menuItem(name, fn, value, contents)` التي تأخذ كتلة عادية، وتربطها بدالة، وتضعها في عمود القائمة.

```javascript
    function menuItem(name, fn, value, units){
        var item = Block.create(name, value, units);
        scriptRegistry[name] = fn;
        menu.appendChild(item);
        return item;
    }
```

نعرّف `repeat(block)` هنا، خارج لغة السلحفاة، لأنها مفيدة عموماً في اللغات المختلفة. ولو كان لدينا كتل للشروط ولكتابة المتغيّرات وقراءتها، لاستطاعت هي أيضاً أن تكون هنا، أو في وحدة منفصلة عابرة للغات، لكن لدينا الآن كتلة واحدة فقط من هذا النوع المخصَّص للاستعمال العام.

```javascript
    function repeat(block){
        var count = Block.value(block);
        var children = Block.contents(block);
        for (var i = 0; i < count; i++){
            Block.run(children);
        }
    }
    menuItem('Repeat', repeat, 10, []);
```


### `turtle.js`

`turtle.js` هو تطبيق لغة كتل السلحفاة. وهو لا يكشف أي دوال لبقية الشيفرة، فلا يستطيع أي شيء آخر الاعتماد عليه. وبهذه الطريقة يمكننا استبدال هذا الملف الواحد لإنشاء لغة كتل جديدة مع اليقين بأن لا شيء في النواة سينكسر.

\aosafigure[240pt]/images/500-lines/blockcode-2-turtle_example.webp{مثال على تشغيل شيفرة السلحفاة}{500l.blockcode.turtle}

برمجة السلحفاة هي أسلوب في برمجة الرسوم، شاعه أوّلاً لوغو، حيث يكون لديك سلحفاة خيالية تحمل قلماً تمشي على الشاشة. ويمكنك أن تطلب من السلحفاة أن ترفع القلم (فتتوقّف عن الرسم مع بقاء الحركة)، أو تضع القلم (فتترك خطاً أينما ذهبت)، أو تتقدّم إلى الأمام بعدد من الخطوات، أو تلتف بعدد من الدرجات. وهذه الأوامر وحدها، مع التكرار، قادرة على إنشاء صور مذهلة التعقيد.

في هذه النسخة من رسومات السلحفاة لدينا بضع كتل إضافية. ومن الناحية التقنية لا نحتاج إلى كلٍّ من `turn right` و`turn left`، إذ يمكننا الاكتفاء بواحدة والحصول على الأخرى بأعداد سالبة. وعلى نحو مماثل يمكن تنفيذ `move back` باستخدام `move forward` وأعداد سالبة. لكن في هذه الحالة بدا أكثر توازناً أن يتوفّر كلاهما.

تشكّلت الصورة أعلاه بوضع حلقتين داخل حلقة أخرى، وإضافة `move forward` و`turn right` إلى كل حلقة، ثم العب بالمعاملات تفاعلياً حتى أعجبتني الصورة الناتجة.

```javascript
    var PIXEL_RATIO = window.devicePixelRatio || 1;
    var canvasPlaceholder = document.querySelector('.canvas-placeholder');
    var canvas = document.querySelector('.canvas');
    var script = document.querySelector('.script');
    var ctx = canvas.getContext('2d');
    var cos = Math.cos, sin = Math.sin, sqrt = Math.sqrt, PI = Math.PI;
    var DEGREE = PI / 180;
    var WIDTH, HEIGHT, position, direction, visible, pen, color;
```

تُصفّر الدالة `reset()` جميع متغيّرات الحالة إلى قيمها الافتراضية. ولو أردنا دعم عدة سلاحف، لجرى تغليف هذه المتغيّرات داخل كائن. ولدينا أيضاً أداة `deg2rad(deg)`، لأننا نعمل بالدرجات في واجهة المستخدم لكننا نرسم بالراديان. وأخيراً، ترسم `drawTurtle()` السلحفاة نفسها. أما السلحفاة الافتراضية فمجرد مثلّث، لكن يمكنك تجاوز ذلك لرسم سلحفاة أجمل.

لاحظ أن `drawTurtle` تستخدم العمليات الأولية نفسها التي عرّفناها لتنفيذ رسم السلحفاة. وأحياناً لا ترغب في إعادة استخدام الشيفرة على مستويات تجريد مختلفة، لكن حين يكون المعنى واضحاً، يمكن أن يكون ذلك مكسباً كبيراً في حجم الشيفرة والأداء.

```javascript
    function reset(){
        recenter();
        direction = deg2rad(90); // facing "up"
        visible = true;
        pen = true; // when pen is true we draw, otherwise we move without drawing
        color = 'black';
    }

    function deg2rad(degrees){ return DEGREE * degrees; }

    function drawTurtle(){
        var userPen = pen; // save pen state
        if (visible){
            penUp(); _moveForward(5); penDown();
            _turn(-150); _moveForward(12);
            _turn(-120); _moveForward(12);
            _turn(-120); _moveForward(12);
            _turn(30);
            penUp(); _moveForward(-5);
            if (userPen){
                penDown(); // restore pen state
            }
        }
    }
```

لدينا كتلة خاصة لرسم دائرة ذات نصف قطر معيّن عند موضع الفأرة الحالي. ونُعالج `drawCircle` على نحو خاص، لأنك مع أن بإمكانك بالتأكيد رسم دائرة بتكرار `MOVE 1 RIGHT 1` ثلاثمئة وستّين مرّة، إلا أن التحكم في حجم الدائرة على تلك الطريقة صعب جداً.

```javascript
    function drawCircle(radius){
        // Math for this is from http://www.mathopenref.com/polygonradius.html
        var userPen = pen; // save pen state
        if (visible){
            penUp(); _moveForward(-radius); penDown();
            _turn(-90);
            var steps = Math.min(Math.max(6, Math.floor(radius / 2)), 360);
            var theta = 360 / steps;
            var side = radius * 2 * Math.sin(Math.PI / steps);
            _moveForward(side / 2);
            for (var i = 1; i < steps; i++){
                _turn(theta); _moveForward(side);
            }
            _turn(theta); _moveForward(side / 2);
            _turn(90);
            penUp(); _moveForward(radius); penDown();
            if (userPen){
                penDown(); // restore pen state
            }
        }
    }
```

عمليتنا الأساسية هي `moveForward`، ويجب أن تتعامل مع بعض المثلثيات الأولية وأن تفحص ما إذا كان القلم مرفوعاً أم موضوعاً.

```javascript
    function _moveForward(distance){
        var start = position;
        position = {
            x: cos(direction) * distance * PIXEL_RATIO + start.x,
            y: -sin(direction) * distance * PIXEL_RATIO + start.y
        };
        if (pen){
            ctx.lineStyle = color;
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(position.x, position.y);
            ctx.stroke();
        }
    }
```

يمكن تعريف معظم بقية أوامر السلحفاة بسهولة بعبارة عمّا بنيناه أعلاه.

```javascript
    function penUp(){ pen = false; }
    function penDown(){ pen = true; }
    function hideTurtle(){ visible = false; }
    function showTurtle(){ visible = true; }
    function forward(block){ _moveForward(Block.value(block)); }
    function back(block){ _moveForward(-Block.value(block)); }
    function circle(block){ drawCircle(Block.value(block)); }
    function _turn(degrees){ direction += deg2rad(degrees); }
    function left(block){ _turn(Block.value(block)); }
    function right(block){ _turn(-Block.value(block)); }
    function recenter(){ position = {x: WIDTH/2, y: HEIGHT/2}; }
```

حين نريد بدايةً نظيفة، تعيد الدالة `clear` كل شيء إلى ما كنّا بدأنا منه.

```javascript
    function clear(){
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,WIDTH,HEIGHT);
        ctx.restore();
        reset();
        ctx.moveTo(position.x, position.y);
    }
```

حين يُحمَّل هذا السكربت ويُنفَّذ لأول مرة، نستخدم `reset` و`clear` لتهيئة كل شيء ورسم السلحفاة.

```javascript
    onResize();
    clear();
    drawTurtle();
```

الآن يمكننا استخدام الدوال أعلاه، مع الدالة `Menu.item` من `menu.js`، لإنشاء كتل يبني منها المستخدم سكربتاته. وتُسحب هذه الكتل إلى أماكنها لتصنع برامج المستخدم.

```javascript
    Menu.item('Left', left, 5, 'degrees');
    Menu.item('Right', right, 5, 'degrees');
    Menu.item('Forward', forward, 10, 'steps');
    Menu.item('Back', back, 10, 'steps');
    Menu.item('Circle', circle, 20, 'radius');
    Menu.item('Pen up', penUp);
    Menu.item('Pen down', penDown);
    Menu.item('Back to center', recenter);
    Menu.item('Hide turtle', hideTurtle);
    Menu.item('Show turtle', showTurtle);
```

## الدروس المستفادة

### لماذا لا نستخدم MVC؟

كان نمط النموذج-العرض-المتحكم (Model-View-Controller) خياراً تصميمياً جيداً لبرامج سمالتوك (Smalltalk) في الثمانينيات، ويمكن أن ينفع بأي شكل أو بآخر في تطبيقات الويب، لكنه ليس الأداة المناسبة لكل مسألة. فحالة النظام كلها (وهي «النموذج» في MVC) يلتقطها في لغة الكتل عناصر الكتل على أي حال، لذا فإن نقلها إلى Javascript له فائدة ضئيلة ما لم تكن هناك حاجة أخرى إلى النموذج (لو كنّا مثلاً نحرّر شيفرة مشتركة وموزّعة).

سعى إصدار مبكر من واتربير إلى أبعد حدّ للإبقاء على النموذج في JavaScript ومزامنته مع DOM، حتى لاحظت أن أكثر من نصف الشيفرة و90% من الأخطاء كان سببها إبقاء النموذج متزامناً مع DOM. وإلغاء هذا التكرار أتاح للشيفرة أن تكون أبسط وأكثر متانة، ومع وجود الحالة كلها على عناصر DOM أمكن اكتشاف كثير من الأخطاء بمجرد النظر في DOM في أدوات المطوّر. لذا في هذه الحالة لا فائدة تُذكر من بناء فصلٍ أكثر بين مكوّنات MVC مما لدينا بالفعل في HTML/CSS/JavaScript.

### التغييرات اللعبية قد تقود إلى تغييرات حقيقية

كان بناء نسخة صغيرة ومحدودة النطاق من النظام الأكبر الذي أعمل عليه تمريناً ممتعاً. ففي نظام كبير أحياناً ما تكون هناك أمور تتردّد في تغييرها لأنها تؤثّر في أمور كثيرة أخرى. أما في نسخة صغيرة لُعبية فيمكنك أن تجرّب بحرّية وتتعلّم أشياء يمكنك إعادتها بعدها إلى النظام الأكبر. بالنسبة إليّ النظام الأكبر هو واتربير، وقد كان لهذا المشروع أثر هائل في طريقة بناء بنية واتربير.

#### التجارب الصغيرة تجعل الفشل مقبولاً

كانت بعض التجارب التي استطعت إجراءها بهذه اللغة المجرّدة من الكتل ما يلي:

- استخدام السحب والإفلات في HTML5،
- تشغيل الكتل مباشرة بالتكرار على DOM واستدعاء الدوال المرتبطة،
- فصل الشيفرة التي تعمل نقياً عن HTML DOM،
- تبسيط اختبار الإصابة (hit testing) أثناء السحب،
- بناء مكتباتنا المصغّرة الخاصة بالمتجهات والأفاتار (للكتل الخاصة باللعبة)، و
- «البرمجة الحيّة» حيث تظهر النتائج كلما غيّرت سكربت الكتل.

أمر التجارب أنها لا تحتاج إلى أن تنجح. فنحن نميل إلى تجاوز الإخفاقات والنهايات المسدودة في أعمالنا، حيث يُعاقَب الإخفاق بدل أن يُعامَل كعربة مهمة للتعلّم، لكن الإخفاق جوهري إن كنت تنوي المضي قدماً. ورغم أنني نجحت في جعل السحب والإفلات في HTML5 يعمل، فإن عدم دعمه إطلاقاً في أي متصفح على الهواتف المحمولة يجعله خياراً غير قابل للبدء بالنسبة إلى واتربير. أما فصل الشيفرة خارجاً وتشغيل الشيفرة بالتكرار على الكتل فقد نجح إلى حدّ بعيد لدرجة أنني بدأت بالفعل أنقل تلك الأفكار إلى واتربير، مع تحسينات ممتازة في الاختبار والتنقيح. واختبار الإصابة المبسّط، مع بعض التعديلات، عاد أيضاً إلى واتربير، وكذلك مكتبات المتجهات والأفاتار المصغّرة. أما البرمجة الحيّة فلم تصل إلى واتربير بعد، لكن ما إن يستقر جولة التغييرات الحالية قد أُقدّمها.

#### ما الذي نحاول بناءه فعلاً؟

بناء نسخة صغيرة من نظام أكبر يركّز التركيز بدقّة على ما إذا كانت الأجزاء المهمة فعلاً. هل هناك أجزاء باقية لأسباب تاريخية لا تخدم أي غرض (أو أسوأ من ذلك، تشتّت عن الغرض)؟ هل هناك ميزات لا يستخدمها أحد لكن عليك أن تدفع ثمن صيانتها؟ هل يمكن تبسيط واجهة المستخدم؟ كل هذه أسئلة ممتازة لطرحها أثناء بناء نسخة صغيرة. أما التغييرات الجذرية، مثل إعادة تنظيم التخطيط، فيمكن إجراؤها دون القلق من تداعياتها التي تتسرّب عبر نظام أكثر تعقيداً، بل قد تكون في حدّ ذاتها دليلاً على إعادة هيكلة النظام المعقّد نفسه.

#### البرنامج عملية لا شيء

هناك أمور لم أتمكّن من تجربتها ضمن نطاق هذا المشروع وقد أستخدم شيفرة بلوك كود لاختبارها في المستقبل. سيكون من المثير إنشاء كتل «دالة» تصنع كتلاً جديدة من كتل قائمة. وتنفيذ التراجع/الإعادة سيكون أسهل في بيئة مقيّدة. وجعل الكتل تقبل وسائط متعددة دون توسيع التعقيد بشكل جذري سيكون أمراً مفيداً. أما إيجاد طرق متنوّعة لمشاركة سكربتات الكتل على الإنترنت فيُكمل دورة كون الأداة على الويب تماماً.
