---
title: "Proofs about Discrete Structures"
lang: ar
source: https://discrete.openmathbooks.org/dmoi4/sec_logic-structures.html
---

\Print headersFirst pageRunning Print footersFirst pageRunning Highlight workspace &#xe8ad;Print

## القسم 1.5 البراهين حول البنى المنفصلة

### الأهداف

بعد إتمام هذا القسم، ينبغي أن تتمكّن من 수행 ما يلي.[🔗](#sec_logic-structures-2-1-1)

- قراءة تعريفات البنى المنفصلة (discrete structures) وفهمها بحيث تتمكّن من تطبيق التعريفات تطبيقاً صحيحاً.[🔗](#sec_logic-structures-2-2-1-1) [🔗](#sec_logic-structures-2-2-1)
- كتابة البراهين حول البنى المنفصلة.[🔗](#sec_logic-structures-2-2-2-1) [🔗](#sec_logic-structures-2-2-2)

[🔗](#sec_logic-structures-2)

### القسم الفرعي: معاينة القسم

#### استكشف!

لنفترض أن هناك 15 شخصاً في حفلة. معظم الناس يعرف بعضهم بالفعل، لكن ما زال هناك بعض الأشخاص يقرّرون مصافحة الأيدي. هل من الممكن أن يتصافح كل شخص في الحفلة مع ثلاثة أشخاص آخرين بالضبط؟[🔗](#logic-structures-intro-2-1-1) [🔗](#logic-structures-intro-2)لقد رأينا حتى الآن كيف يمكن للصيغة المنطقية لجملة أن تدلّنا على كيفية بناء الهيكل العظمي للبرهان. لكن هذا لا يأخذنا بعيداً: فلكمال الهيكل العظمي للبرهان لا بدّ من فهم الكائنات والبنى الرياضية التي تتناولها البراهين. وبعض هذا الفهم يأتي من قراءة التعريفات قراءةً متأنّية. غير أن ثمة أيضاً فهماً أقل تجريداً وبديهية يأتي من العمل مع هذه الكائنات والبنى، وهو ما يقود إلى لحظة الإلهام التي تلمّح لك بـ «آه-ها!» فتقترح كيف تُكمل البرهان.[🔗](#logic-structures-intro-3)

#### بالمناسبة...

لماذا نكتب البراهين؟ إلى جانب التمرين على أن نصير مُفكِّرين أفضل، فإنّ التعمّق في براهين دقيقة حول البنى المنفصلة وسيلةٌ لتعلّم المزيد عن هذه البنى نفسها. فهي ساحةٌ للعب لاستكشاف الرياضيات، تساعدنا على بناء البديهية تجاه البنى الرياضية. إذن ندرس البنى كي تساعدنا على كتابة براهين عنها، ونكتب براهين عنها كي تساعدنا على فهم البنى. هكذا نبني الأساس بعضه على بعض![🔗](#logic-structures-intro-4-1) وثمة سبب آخر لتحويل بؤرة اهتمامنا إلى البراهين حول البنى المنفصلة، هو أنّ ذلك يوضح خاصيةً مهمة في الرياضيات: التجريد (abstraction). لقد كنّا نبرهن على وقائع بعينها في مسائل بعينها. بل قد نبدأ في ملاحظة أوجه تشابه بين براهين بعض الجمل. وقد يكون ذلك راجعاً إلى البنى الرياضية الكامنة التي تتناولها المسائل (في الخفاء). فإذا برهنّا على الوقائع العامة لهذه البنى، أمكننا عندئذٍ تطبيق هذه «المبرهنات» على مسائل مختلفة كثيرة.[🔗](#logic-structures-intro-5) بعض البنى المنفصلة تناسب أنماطاً خاصة من البراهين، وبعض تقنيات البرهان «المعيارية» تنطبق على بنًى بعينها. سنرى بعضاً من ذلك هنا، لكننا في معظمه نستثمر هذه الفرصة لتذكّر بعض التعريفات والخصائص الأساسية للبنى المنفصلة، ونستخدم البراهين عنها لتفهمها فهماً أفضل.[🔗](#logic-structures-intro-6)

#### نشاط ورقة العمل التمهيدي[&#xe8ad;](?printpreview=PA-logic-structures)

في هذا النشاط التمهيدي، سنستكشف بعض الخصائص الأساسية للمجموعات والدوال. وفيما بعد من هذا القسم، سنكتب براهين حول هذه الأفكار.[🔗](#PA-logic-structures-2-1)

#### 1.

فعّل تذكَّر أن المجموعة ليست سوى مجموعة عناصر. وفيما يلي تعريفان حول المجموعات:

1. المجموعة \(A\) هي مجموعة جزئية (subset) من المجموعة \(B\text{,}\) ويُكتب ذلك \(A \subseteq B\text{,}\) شريطة أن يكون كل عنصر في \(A\) عنصراً في \(B\text{.}\)[🔗](#extracted-webwork-21-1-1-1-1-1-1) [🔗](#extracted-webwork-21-1-1-1-1-1)
2. المعطاة مجموعتان \(A\) و\(B\text{,}\) فإنّ اتحاد (union) \(A\) و\(B\text{,}\) ويُكتب \(A \cup B\text{,}\) هو المجموعة التي تضم كل عنصر يكون في \(A\) أو في \(B\) أو في كليهما.[🔗](#extracted-webwork-21-1-1-1-1-2-1) [🔗](#extracted-webwork-21-1-1-1-1-2)

[🔗](#extracted-webwork-21-1-1-1)لنبنِ بعض الأمثلة.[🔗](#extracted-webwork-21-1-1-2)

#### (a)

لتكن \(B = \{1, 3, 5, 7, 9\}\text{.}\) أعطِ مثالاً لمجموعة \(A\) تضم \(3\) عناصر وتكون مجموعة جزئية من \(B\text{.}\)[🔗](#extracted-webwork-21-1-2-1-1) فما هو \(A \cup B\) للمجموعة \(A\) التي أعطيتَها كمثال؟[🔗](#extracted-webwork-21-1-2-1-2) [🔗](#extracted-webwork-21-1-2)

#### (b)

أعطِ مثالاً لمجموعتين مختلفتين \(A\) و\(B\) بحيث \(A \cup B = B\text{.}\)[🔗](#extracted-webwork-21-1-3-1-1) \(A =\) ; \(B =\) [🔗](#extracted-webwork-21-1-3-1-2) وفي المثال الذي أعطيتَه، هل \(A \subseteq B\text{?}\)

- نعم[🔗](#extracted-webwork-21-1-3-1-3-2-1-1) [🔗](#extracted-webwork-21-1-3-1-3-2-1)
- لا[🔗](#extracted-webwork-21-1-3-1-3-2-2-1) [🔗](#extracted-webwork-21-1-3-1-3-2-2)

[🔗](#extracted-webwork-21-1-3-1-3) [🔗](#extracted-webwork-21-1-3)

#### (c)

ابحث عن أمثلة، إن وُجدت، لمجموعتين \(A\) و\(B\) بحيث \(A \cup B \ne B\text{.}\)[🔗](#extracted-webwork-21-1-4-1-1) \(A =\) ; \(B =\) .[🔗](#extracted-webwork-21-1-4-1-2) وفي المثال الذي أعطيتَه، هل \(A \subseteq B\text{?}\)

- نعم[🔗](#extracted-webwork-21-1-4-1-3-2-1-1) [🔗](#extracted-webwork-21-1-4-1-3-2-1)
- لا[🔗](#extracted-webwork-21-1-4-1-3-2-2-1) [🔗](#extracted-webwork-21-1-4-1-3-2-2)

[🔗](#extracted-webwork-21-1-4-1-3) [🔗](#extracted-webwork-21-1-4) [🔗](#pa-logic-structure-1)

#### 2.

أيٌّ مما يلي صحيح دائماً؟[🔗](#pa-logic-structure-2-1-1)

- لأي مجموعتين \(A\) و\(B\text{,}\) لدينا \(A \cup B \subseteq B\text{.}\)
- وماذا لو كان \(A = \{1,2,3\}\) و\(B = \{1, 3, 5\}\text{?}\)
- لأي مجموعتين \(A\) و\(B\text{,}\) لدينا \(B \subseteq A \cup B\text{.}\)
- لأي مجموعتين \(A\) و\(B\text{,}\) إذا كان \(A \subseteq B\text{,}\) فإن \(A \cup B \subseteq B\text{.}\)
- لأي مجموعتين \(A\) و\(B\text{,}\) إذا كان \(A \cup B = B\text{,}\) فإن \(A \subseteq B\text{.}\)

[🔗](#pa-logic-structure-2)

#### 3.

فعّل لأي دالة \(f: \mathbb{N} \to \mathbb{N}\) وأي مجموعة \(A \subseteq \mathbb{N}\text{,}\) يمكننا تعريف صورة (image) \(A\) على يد \(f\) بأنها مجموعة كل مخرجات \(f\) عندما يكون المدخل عنصراً من \(A\text{.}\) ونكتبها \(f(A) = \{f(x) ~:~ x \in A\}\text{.}\)[🔗](#extracted-webwork-22-1-1-1) وفيما يلي من المهام، فلنستكشف الدالة \(f: \mathbb{N} \to \mathbb{N}\) المعرَّفة بـ \(f(x) = x^2 - 3x + 8\text{.}\)[🔗](#extracted-webwork-22-1-1-2)

#### (a)

لتكن \(A = \{1,2,3\}\) و\(B = \{2, 4, 6\}\text{.}\) جدِد \(f(A)\) و\(f(B)\text{.}\) ثم جدِد \(f(A) \cup f(B)\text{.}\)[🔗](#extracted-webwork-22-1-2-1-1) \(f(A) =\) ; \(f(B) =\) ; \(f(A) \cup f(b) =\) .[🔗](#extracted-webwork-22-1-2-1-2) [🔗](#extracted-webwork-22-1-2)

#### (b)

الآن جدِد \(A \cup B\) و\(f(A \cup B)\text{.}\)[🔗](#extracted-webwork-22-1-3-1-1) \(A \cup B =\) ; \(f(A \cup B) =\) .[🔗](#extracted-webwork-22-1-3-1-2) [🔗](#extracted-webwork-22-1-3)

#### (c)

أعطِ مثالاً، إن وُجد، لمجموعتين مختلفتين \(A\) و\(B\) بحيث \(A \subseteq B\) و\(f(A) \subseteq f(B)\text{.}\)[🔗](#extracted-webwork-22-1-4-1-1) \(A =\); \(B =\).[🔗](#extracted-webwork-22-1-4-1-2) أعطِ مثالاً، إن وُجد، لمجموعتين مختلفتين \(A\) و\(B\) بحيث \(A \subseteq B\) لكن \(f(A) \not\subseteq f(B)\text{.}\)[🔗](#extracted-webwork-22-1-4-1-3) \(A =\); \(B =\).[🔗](#extracted-webwork-22-1-4-1-4) [🔗](#extracted-webwork-22-1-4) [🔗](#pa-logic-structure-3)[🔗](#PA-logic-structures)[🔗](#logic-structures-intro)

### القسم الفرعي: البراهين حول المجموعات

تذكَّر أن المجموعة مجموعة عناصر غير مرتّبة. يمكننا وصف مجموعة بإدراج عناصرها، أو بتحديد خاصية تحقّقها جميع عناصر المجموعة. على سبيل المثال، \begin{equation*} A = \{1,2,3,4,5\}\text{,} \end{equation*} أو \begin{equation*} B = \{x \in \N \st x \lt 10 \}\text{.} \end{equation*} المجموعة الثانية هنا هي مجموعة الأعداد الطبيعية (\(0, 1, 2, \ldots\)) الأصغر من 10. لاحظ أن كل عنصر في \(A\) هو أيضاً عنصر في \(B\text{.}\) وإليك تعريفاً يعبّر عن هذه الفكرة. [🔗](#sec_logic-structures-4-2)

#### تعريف 1.5.1.

المجموعة \(A\) هي مجموعة جزئية (subset) من المجموعة \(B\text{,}\) ويُكتب ذلك \(A \subseteq B\text{,}\) شريطة أن يكون كل عنصر من عناصر \(A\) عنصراً أيضاً من عناصر \(B\text{.}\)[🔗](#def-subset-1-1) وتُسمّى المجموعة \(B\) أحياناً مجموعة شاملة (superset) لـ \(A\text{.}\)[🔗](#def-subset-1-2) ونقول إن \(A\) مجموعة جزئية فعلية (proper subset) من \(B\text{,}\) ويُكتب ذلك \(A \subset B\text{,}\) شريطة أن \(A \subseteq B\) وأن \(A \neq B\text{.}\) بمعنى آخر، إذا كان كل عنصر في \(A\) عنصراً في \(B\text{,}\) وكان هناك عنصر واحد على الأقل في \(B\) *ليس* في \(A\text{.}\)[🔗](#def-subset-1-3) [🔗](#def-subset)

#### مثال 1.5.2.

لتكن \(A = \{x \in \N \st x \lt 5\}\) و\(B = \{ x \in \N \st x^2 \lt 10\}\text{.}\) هل \(B \subseteq A\text{?}\) وهل \(B\) مجموعة جزئية *فعلية* من \(A\text{?}\)[🔗](#sec_logic-structures-4-4-1-1) الحل. إننا نسأل: هل كل عدد طبيعي أصغر من 5 هو أيضاً عدد طبيعي مربعه أصغر من 10؟ حسناً، يمكننا ببساطة أن نكتب عناصر المجموعتين: \(A = \{0,1,2,3,4\}\) و\(B = \{0,1,2,3\}\) (بما أن \(3^2 = 9\) و\(4^2 = 16\)). إذن \(B \subseteq A\text{.}\) لكن \(B \neq A\text{,}\) فبحقيقة الأمر \(B \subset A\text{.}\)[🔗](#sec_logic-structures-4-4-2-1) [🔗](#sec_logic-structures-4-4-2) [🔗](#sec_logic-structures-4-4)كانت المجموعات في المثال أعلاه صغيرة، ومن السهل بما فيه الكفاية كتابة عناصرها. لكن يمكننا أيضاً أن نبرهن على علاقات الاحتواء بين المجموعات إذا لم يكن ذلك عملياً أو حتى ممكناً (ربما كانت المجموعات لانهائية). فلننظر عن قرب إلى كيف كان يمكننا أن نستنتج في المثال أعلاه.[🔗](#sec_logic-structures-4-5) ادّعينا أن كل عنصر في \(B\) هو أيضاً عنصر في \(A\text{.}\) وتعبير آخر عن ذلك: لكل الأعداد \(n\text{,}\) *إذا* كان \(n\) عنصراً في \(B\text{,}\) *فإن* \(n\) يكون أيضاً عنصراً في \(A\text{.}\) ولما كان هذا التوصيف جملة شرطية، فإنا ننتقل لإعطاء برهان مباشر أو بالـعكس أو بالتناقض لهذه الواقعة. وحيث إنّ البرهان المباشر هنا مقبول تماماً، فلنجرّبه:[🔗](#sec_logic-structures-4-6)

#### برهان.

ليكن \(n\) عنصراً في المجموعة \(B\text{.}\) عندئذٍ \(n^2 \lt 10\text{,}\) بحكم تعريف \(B\text{.}\) وبما أن \(4^2 = 16\text{,}\) فلا بدّ أن يكون لدينا \(n \lt 4\text{.}\) ومن تعريف \(A\text{,}\) ومن الحقيقة \(4 \lt 5\text{,}\) نرى أن \(n \in A\text{.}\)[🔗](#sec_logic-structures-4-7-1) [🔗](#sec_logic-structures-4-7)ولئلّا يلتبس، فإن هذا البرهان أطول *بكثير* مما كنا نكتبه عادةً في هذا المثال، لكن صيغته يُفترض أن تكون مضيئة. فالبرهنة على أن مجموعة مجموعة جزئية من أخرى هي في الحقيقة البرهنة نفسها على استلزام (implication)![🔗](#sec_logic-structures-4-8) ولتبيين مثال على كيف يمكننا تطبيق تعريف «المجموعة الجزئية» في سياق أعمّ، فلنبرهن على واقعة أساسية عن الاحتواء.[🔗](#sec_logic-structures-4-9)

#### دعوى 1.5.3.

لأي مجموعات \(A\text{,}\) \(B\text{,}\) و\(C\text{,}\) إذا كان \(A \subseteq B\) و\(B \subseteq C\text{,}\) فإن \(A \subseteq C\text{.}\)[🔗](#prop-subset-transitive-1-1) [🔗](#prop-subset-transitive)

#### برهان.

سنُعطي برهاناً مباشراً. لتكن \(A\text{,}\) \(B\text{,}\) و\(C\) مجموعات، ونفترض أن \(A \subseteq B\) وأن \(B \subseteq C\text{.}\) وسنبرهن على أن \(A \subseteq C\text{.}\)[🔗](#prop-subset-transitive-2-1) ليكن \(x\) عنصراً في \(A\text{.}\) وبما أن \(A \subseteq B\text{,}\) نعلم أن \(x \in B\text{.}\) وبما أن \(B \subseteq C\text{,}\) نعلم أن \(x \in C\text{.}\) إذن، \(A \subseteq C\text{.}\)[🔗](#prop-subset-transitive-2-2) [🔗](#prop-subset-transitive-2)ولنتقل الآن إلى برهنة واقعة عن الأعداد: كل مضاعف للعدد 9100 هو أيضاً مضاعف للعدد 13. يمكننا تحليل 9100 إلى عوامله، لكن إليك طريقةً أسهل. مجموعة مضاعفات 9100 مجموعة جزئية من مجموعة مضاعفات 91. ومجموعة مضاعفات 91 مجموعة جزئية من مجموعة مضاعفات 13. والآن طبّق الدعوى أعلاه.[🔗](#sec_logic-structures-4-11) برهان [الدعوى 1.5.3](sec_logic-structures.html#prop-subset-transitive) هو ما يُسمّى أحياناً برهان تتبّع العناصر (element chasing). فبحكم تعريف المجموعة الجزئية، تعني \(A \subseteq B\) أن كل عنصر في \(A\) هو عنصر في \(B\text{,}\) أو ما يعادلها، لكل \(x\text{,}\) إذا كان \(x\) عنصراً في \(A\text{,}\) فإن \(x\) عنصر في \(B\text{.}\) وإحدى طرائق إثبات ذلك هي أن «نتتبّع» العنصر \(x\) من \(A\) إلى \(B\text{.}\)[🔗](#sec_logic-structures-4-12)

#### مثال 1.5.4.

برهن أن إذا كان \(A \subseteq B\text{,}\) فإن \(A \cup B \subseteq B\text{.}\) تذكَّر أن \(A \cup B\) هو اتحاد المجموعتين \(A\) و\(B\text{,}\) ويحتوي على جميع العناصر الموجودة في \(A\) أو في \(B\) أو في كليهما.[🔗](#sec_logic-structures-4-13-1-1) الحل. سنكتب برهاناً مباشراً. سنفترض إذن أن \(A \subseteq B\) ونبرهن على أن \(A \cup B \subseteq B\text{.}\) والنتيجة التي نريدها جملة عن المجموعات الجزئية، فدعنا نبرهن عليها بتتبّع العناصر.[🔗](#sec_logic-structures-4-13-2-1)

#### برهان.

لتكن \(A\) و\(B\) مجموعتين ونفترض \(A \subseteq B\text{.}\) وليكن الآن \(x\) عنصراً في \(A \cup B\text{.}\) وهذا يعني أن \(x\) عنصر في \(A\text{,}\) أو أن \(x\) عنصر في \(B\text{,}\) أو في كليهما. 6 بحكم تعريف الاتحاد.[🔗](#sec_logic-structures-4-13-2-2-1) ناقش الحالات. إذا كان \(x\) عنصراً في \(A\text{,}\) فبما أن \(A \subseteq B\text{,}\) نعلم أن \(x\) عنصر في \(B\text{.}\) ومن جهة أخرى، إذا لم يكن \(x\) عنصراً في \(A\text{,}\) فلا بدّ أن يكون \(x\) عنصراً في \(B\) (بما أن \(x\) في \(A \cup B\)). وفي كلتا الحالتين، \(x\) عنصر في \(B\text{.}\) إذن، \(A \cup B \subseteq B\text{.}\)[🔗](#sec_logic-structures-4-13-2-2-2) [🔗](#sec_logic-structures-4-13-2-2)وفي الحقيقة يمكننا البرهنة على قاعدة أقوى: \(A \subseteq B\) إذا وفقط إذا \(A \cup B = B\text{.}\) وقد طُلب منك فعل ذلك في التمارين.[🔗](#sec_logic-structures-4-13-2-3) [🔗](#sec_logic-structures-4-13-2) [🔗](#sec_logic-structures-4-13)[🔗](#sec_logic-structures-4)

### القسم الفرعي: البراهين حول الدوال

الدالة \(f:A \to B\) هي قاعدةٌ تُسند كل عنصر من عناصر المجموعة \(A\) (المجال domain) إلى عنصر واحد تماماً من عناصر المجموعة \(B\) (مدى الدالة codomain). وهي أيّ قاعدة: لا يلزم وجود صيغة أو مبرِّر لها؛ فنحن نحتاج فقط إلى مقابلة عناصر من \(A\) بعناصر من \(B\text{.}\) على سبيل المثال، يمكننا أن نجعل \(A\) مجموعة الطلاب المسجَّلين في مقرر معيّن للرياضيات المنفصلة، و\(B\) مجموعة أشهر السنة. نعرّف الآن الدالة \(f:A \to B\) بأنها القاعدة التي تُسند لكل طالب الشهر الذي يقع فيه عيد ميلاده. وبما أن لكل طالب شهراً مُسنداً، ولا أكثر من شهر واحد، فإن هذه دالة.[🔗](#subsec-logic-proofs-functions-2) وإليك تعريفاً لنوعٍ معيّن من الدوال.[🔗](#subsec-logic-proofs-functions-3)

#### تعريف 1.5.5.

الدالة \(f:A \to B\) أحادية (injective) (أو واحد إلى واحد) شريطة أن يكون كل عنصر في \(B\) صورة عنصر واحد على الأكثر في \(A\text{.}\) بمعنى آخر، لا يوجد عنصر في \(B\) يكون *المخرج* لأكثر من *مدخل* واحد من \(A\text{.}\)[🔗](#def-func-inj-1-1) [🔗](#def-func-inj) في المثال أدناه، نستخدم *الصيغة ذات السطرين* (two-line notation) لوصف دالة. يضمّ الصف العلوي المداخل، ويسرد الصف السفلي المخرجات المقابلة. هكذا يمكن تعريف \(f:\{1,2,3,4\} \to \{a,b,c,d\}\) بـ، \begin{equation*} f = \twoline{1 \amp 2 \amp 3 \amp 4}{a \amp b \amp c \amp d}\text{,} \end{equation*} وهذا يعني أن \(f(1) = a\text{,}\) و\(f(2) = b\text{,}\) و\(f(3) = c\text{,}\) و\(f(4) = d\text{.}\) [🔗](#subsec-logic-proofs-functions-5)

#### مثال 1.5.6.

لتكن \(A = \{1,2,3\}\) و\(B = \{2, 4, 6, 8\}\text{.}\) تأمَّل الدالتين \(f:A \to B\) و\(g:A \to B\) المعرَّفتين بـ، \begin{equation*} f = \twoline{1 \amp 2 \amp 3}{2 \amp 8 \amp 6}, \qquad g = \twoline{1 \amp 2 \amp 3}{4 \amp 6 \amp 4}. \end{equation*} أيُّ هاتين الدالتين أحادية؟ [🔗](#subsec-logic-proofs-functions-6-1-1) الحل. الدالة \(f\) أحادية: كل عنصر في \(B\) صورة عنصر واحد على الأكثر في \(A\text{.}\) أما الدالة \(g\) فليست أحادية: العنصر 4 في \(B\) هو صورة كلٍّ من 1 و3 في \(A\text{.}\)[🔗](#subsec-logic-proofs-functions-6-2-1) [🔗](#subsec-logic-proofs-functions-6-2) [🔗](#subsec-logic-proofs-functions-6)ولنتأمَّل ثانيةً دالة «الطالب إلى شهر الميلاد». هل يمكن لهذا أن تكون أحادية؟ أو بصيغة أخرى، هل يجب أن يوجد طالبان في المقرر لهما شهر ميلاد واحد (وهذا ما يعني أن الدالة *ليست* أحادية)؟ يبدو أن الإجابة تعتمد على عدد الطلاب في الصف.[🔗](#subsec-logic-proofs-functions-7) لكن دعنا نتوقف ونفكر في الواقعة الأكثر عمومية عن الدوال التي بين أيدينا. فلنبرهن على الواقعة التالية. وتذكَّر أن \(|A|\) تدل على عدد (cardinality) المجموعة \(A\text{:}\) وهو عدد عناصر \(A\text{.}\)[🔗](#subsec-logic-proofs-functions-8)

#### دعوى 1.5.7.

لنفترض أن \(f:A \to B\) دالة و\(A\) و\(B\) كلتاهما مجموعة منتهية. إذا كان \(|A| \gt |B|\text{,}\) فإن \(f\) *ليست* أحادية.[🔗](#prop-non-injective-1-1) [🔗](#prop-non-injective)

#### برهان.

سنُقدّم برهان العكس (contrapositive): إذا كانت \(f\) أحادية، فإن \(|A| \le |B|\text{.}\) ليكن \(|B| = n\text{.}\) وبما أن \(f\) أحادية، فلا بدّ أن يكون كل عنصر في \(B\) مخرجاً لعنصر واحد *فقط على الأكثر* من \(A\text{.}\) ومن ثمّ فإن ما لا يزيد عدده على \(n\) من العناصر في \(A\) تُسند إلى \(B\) على يد \(f\text{.}\) لكن تعريف الدالة يشترط أن يُسند كل عنصر من المجال إلى عنصر واحد تماماً من مدى الدالة، ومن ثمّ فلا بدّ أن يكون العدد \(n\) هو عدد عناصر \(A\text{.}\)[🔗](#prop-non-injective-2-1) [🔗](#prop-non-injective-2) هل يذكّرك هذا البرهان ببراهيننا الشبيهة بمبدأ الأدراج (pigeonhole principle)؟ ينبغي أن يذكّرك، إذ إنّ هذا هو تحديداً إحدى الصياغات الدقيقة لمبدأ الأدراج. كان بإمكاننا البرهنة على واقعة الطلاب الذين يشتركون في شهر ميلاد واحد، لكننا الآن نكتفي بتطبيق الدعوى أعلاه وننهي الأمر. وحين تطبّق مبرهنة أو دعوى للبرهنة مباشرة على نتيجة أخرى، فإننا نسمي النتيجة اللاحقة نتيجةً (corollary).[🔗](#subsec-logic-proofs-functions-10)

#### نتيجة 1.5.8.

لنفترض أن في صفٍّ 25 طالباً. عندئذٍ يشترك طالبان على الأقل في شهر الميلاد نفسه.[🔗](#cor-birth-month-1-1) [🔗](#cor-birth-month)

#### برهان.

تأمَّل الدالة التي تُسند كل طالب إلى شهر ميلاده. وبما أن المجال يضم 25 عنصراً وأن مدى الدالة يضم 12 عنصراً، فإن الدالة ليست أحادية، بحكم [الدعوى 1.5.7](sec_logic-structures.html#prop-non-injective). إذن، يشترك طالبان على الأقل في شهر الميلاد نفسه.[🔗](#cor-birth-month-2-1) [🔗](#cor-birth-month-2)للدوال دائماً مداخل من *مجموعة* (تُسمّى المجال domain) ومخرجات في مجموعة أيضاً (تُسمّى مدى الدالة codomain). وهذا يقود بطبيعة الحال إلى وقائع يجب النظر إليها بشأن التفاعل بين المجموعات والدوال.[🔗](#subsec-logic-proofs-functions-12)

#### تعريف 1.5.9.

المعطاة دالة \(f:X \to Y\) ومجموعة \(A \subseteq X\text{,}\) فإننا نعرّف صورة \(A\) (image) على يد \(f\) بأنها المجموعة \(f(A) = \{f(a) \in Y \st a \in A\}\text{.}\) بمعنى أن \(f(A)\) هي مجموعة كل مخرجات الدالة عند مداخل في \(A\text{.}\)[🔗](#def-function-image-1-1) [🔗](#def-function-image)

#### مثال 1.5.10.

لتكن \(f: \N \to \N\) معرَّفة بـ \(f(n) = 2n\text{.}\) ولتكن \(A = \{1,2,3\}\text{.}\) جدِد \(f(A)\text{.}\)[🔗](#subsec-logic-proofs-functions-14-1-1) الحل. قيّم كل عنصر من عناصر \(A\) بواسطة \(f\text{.}\) \begin{equation*} f(1) = 2;\qquad f(2) = 4; \qquad f(3) = 6\text{.} \end{equation*} نريد مجموعة هذه المخرجات. إذن \(f(A) = \{2, 4, 6\}\text{.}\) [🔗](#subsec-logic-proofs-functions-14-2-1) [🔗](#subsec-logic-proofs-functions-14-2) [🔗](#subsec-logic-proofs-functions-14)ولنبرهن الآن على شيءٍ ما.[🔗](#subsec-logic-proofs-functions-15)

#### دعوى 1.5.11.

لتكن \(f:X \to Y\) دالة، ولتكن \(A\) و\(B\) مجموعتين جزئيتين من \(X\text{.}\) إذا كان \(A \subseteq B\text{,}\) فإن \(f(A) \subseteq f(B)\text{.}\)[🔗](#prop-subset-image-1-1) [🔗](#prop-subset-image)

#### برهان.

لتكن \(f\text{,}\) \(A\text{,}\) و\(B\) كما في الدعوى. نفترض أن \(A \subseteq B\text{.}\) ولنتأمَّل الآن عنصراً \(y \in f(A)\text{.}\) وبحكم التعريف، هذا يعني أن هناك عنصراً ما \(a \in A\) بحيث \(f(a) = y\text{.}\) وبما أن \(a \in A\) وأن \(A \subseteq B\text{,}\) فإن لدينا \(a \in B\text{.}\) عندئذٍ بحكم التعريف، \begin{equation*} y = f(a) \in f(B)\text{.} \end{equation*} ولأن \(y\) كان عنصراً اعتباطياً في \(f(A)\text{,}\) فقد برهنّا على أن \(f(A) \subseteq f(B)\text{.}\) [🔗](#prop-subset-image-2-1) [🔗](#prop-subset-image-2)ولاحظ أن البرهان أعلاه هو أيضاً برهان تتبّع عناصر. وهذا منطقي ما دمت تتذكّر أن \(f(A)\) و\(f(B)\) ليس سوى اسمين لمجموعتين. فللبرهنة على أن مجموعة مجموعة جزئية من أخرى، نتتبّع العناصر من المجموعة الجزئية إلى المجموعة الشاملة.[🔗](#subsec-logic-proofs-functions-17) [🔗](#subsec-logic-proofs-functions)

### القسم الفرعي: البراهين حول العلاقات

العلاقة (relation) على مجموعة \(A\) هي مجموعة من أزواج مرتّبة من عناصر \(A\text{.}\) يمكننا أن نفكر في العلاقة على أنها طريقة لوصف نوعٍ من الصلة بين عناصر \(A\text{.}\) على سبيل المثال، قد تكون لدينا علاقة على مجموعة الأشخاص في حفلة تصف من هو صديقٌ لمن. وقد تكون لدينا علاقة على مجموعة الأعداد الطبيعية تصف أيّ الأزواج من الأعداد تربطها العلاقة \(x \lt y\text{.}\)[🔗](#subsec-proofs-about-relations-2) وتسري في الرياضيات بأكملها، غالباً دون أن نفكر فيها حتى. فكلما أدلينا جملةً عن عنصرين من عناصر مجموعة، فإننا نعرّف ضمناً علاقة. وتكون الجملة صادقة عندما يكون الزوج داخل العلاقة. على سبيل المثال، الجملة «3 أقل من 5» صحيحة لأن الزوج \((3,5)\) موجود في العلاقة \(\lt\text{.}\) وفي الواقع، باستعمال اللغة التي طوّرناها في القسم الفرعي [المُكمِّمات والمُميِّزات](sec_logic-statements.html#subsec_logic-statements-quant)، يمكننا القول بأن العلاقة ليست سوى مُميِّز (predicate)، حيث تأتي المتغيرات من المجموعة نفسها.[🔗](#subsec-proofs-about-relations-3) وكثيراً ما تحمل العلاقات رموزاً خاصة مثل «\(=\)» أو «\(\le\)» أو «\(\perp\)». وعندما نتحدث عن علاقة عامة، فإننا إما أن نستخدم \(\sim\) ونكتب \(x \sim y\text{,}\) أو نستخدم حرفاً كبيراً مثل \(R\text{,}\) ونكتب \(R(x,y)\) أو \(xRy\) أو حتى \((x,y) \in R\) ( وكلها تعني الشيء نفسه).[🔗](#subsec-proofs-about-relations-4) وعندما ندرس العلاقات، نحاول تحديد الخصائص التي قد تكون لها. وإليك مثالاً على خاصية شائعة جداً.[🔗](#subsec-proofs-about-relations-5)

#### تعريف 1.5.12.

العلاقة \(R\) على مجموعة \(A\) متناسِبة (transitive) شريطة أنه لكل \(x,y,z \in A\text{,}\) إذا كان \(xRy\) و\(yRz\text{,}\) فإن \(xRz\text{.}\)[🔗](#def-transitive-1-1) [🔗](#def-transitive)

#### مثال 1.5.13.

تأمَّل العلاقة \(\sim\) على مجموعة الطلاب في مقرر الرياضيات المنفصلة، والتي تتحقق بين طالبين شريطة أن يكون لهما مقرّر آخر مشترك. هل هذه العلاقة متناسِبة؟[🔗](#subsec-proofs-about-relations-7-1-1) الحل. لا، ليس بالضرورة (وإن كان ذلك ممكناً لبعض مجموعات الطلاب). على سبيل المثال، لنفترض أن أليس تشترك مع برويس في مقرر آخر، ولنقل «مدخل إلى البرمجة». كارلوس ليس مسجّلاً في «مدخل إلى البرمجة»، لكنه هو وبرويس مسجّلان كلاهما في «الكيمياء العضوية». عندئذٍ يكون أليس\(\sim\)برويس وبرويس\(\sim\)كارلوس، لكن ليس بالضرورة أن يكون أليس\(\sim\)كارلوس (إذ لا يلزم أن تكون أليس في «الكيمياء العضوية» مع كارلوس).[🔗](#subsec-proofs-about-relations-7-2-1) [🔗](#subsec-proofs-about-relations-7-2) [🔗](#subsec-proofs-about-relations-7)والبرهنة على أن علاقة ما *ليست* متناسِبة لا تتطلب أكثر من إيجاد مثال مضادّ (counterexample)، أي إيجاد ثلاثة عناصر \(a\text{,}\) \(b\text{,}\) و\(c\) بحيث \(a \sim b\text{,}\) و\(b \sim c\text{,}\) ولكن \(a \not\sim c\) (وتذكَّر أن الطريقة الوحيدة لتكون جملة شرطية خاطئة هي أن يكون الفرض صحيحاً والنتيجة خاطئة).[🔗](#subsec-proofs-about-relations-8) وربما كان أكثر إثارةً للاهتمام قليلاً أن نبرهن على أن علاقة متناسِبة.[🔗](#subsec-proofs-about-relations-9)

#### مثال 1.5.14.

تأمَّل مجموعة جميع الطلاب في صف الرياضيات المنفصلة، وعَرِّف العلاقة \(\sim\) التي تتحقق بين طالبين \(a\) و\(b\) (أي أن \(a \sim b\) صحيح)، شريطة أن يكون \(a\) أطول من \(b\text{.}\) برهن أن هذه العلاقة متناسِبة.[🔗](#subsec-proofs-about-relations-10-1-1) الحل. تعريف المتناسبية هو استلزام، لذا يمكننا أن نجرّب برهاناً مباشراً.[🔗](#subsec-proofs-about-relations-10-2-1)

#### برهان.

ليكن \(a\text{,}\) \(b\text{,}\) و\(c\) طلاباً اعتباطيين في مقرر الرياضيات المنفصلة. نفترض أن \(a \sim b\) و\(b \sim c\text{.}\) هذا يعني أن \(a\) أطول من \(b\text{,}\) وأن \(b\) أطول من \(c\text{.}\) لكن عندئذٍ لا بدّ أن يكون \(a\) أطول من \(c\) أكثر مما هما أطول من \(b\text{,}\) فلدينا أيضاً أن \(a \sim c\) صحيح. إذن فإن \(\sim\) متناسِبة على هذه المجموعة.[🔗](#subsec-proofs-about-relations-10-2-2-1) [🔗](#subsec-proofs-about-relations-10-2-2)[🔗](#subsec-proofs-about-relations-10-2) [🔗](#subsec-proofs-about-relations-10)[🔗](#subsec-proofs-about-relations)

### القسم الفرعي: البراهين حول الرسوم البيانية

سنقضي كل [الفصل 2](ch_graphtheory.html) في دراسة البراهين حول الرسوم البيانية (graphs)، لأن هذا مجالٌ من الرياضيات غنيٌّ جداً. وكمعاينة، إليك مثالاً على كيف يمكن أن تسير البراهين حول الرسوم البيانية.[🔗](#subsec-proofs-about-graphs-2) الرسم البياني هو مجموعة \(V\) من الرؤوس (vertices) ومجموعة \(E\) من الحواف (edges). الحواف هي مجموعات جزئية من عنصرين من الرؤوس، ويمكننا التفكير فيها بأنها تمثّل علاقات بين الرؤوس. لاحظ أن هذا تعريفٌ مجرد للرسم البياني باستخدام المجموعات، لكننا نرسم الرسوم البيانية عادةً بنقاطٍ تمثل الرؤوس تربطها خطوطٌ تمثل الحواف، لأن هذا يعطينا صورةً جميلة لما يجري.[🔗](#subsec-proofs-about-graphs-3) وبما أن الرسوم البيانية تمثّل نوعاً من العلاقات بين العناصر (الرؤوس)، يمكننا استخدام الرسوم البيانية لتمثيل كثيرٍ من مسائل العالم الحقيقي. على سبيل المثال، قد تمثّل رؤوس الرسم البياني أشخاصاً في حفلة. ويمكن لكل حافة أن تمثّل مصافحة يدٍ بين شخصين. فإذا تساءلنا هل من الممكن أن يتصافح كلٌّ من الأشخاص الخمسة عشر في حفلة مع 3 أشخاص تحديداً هناك، فإننا في الحقيقة نسأل: هل يوجد رسم بياني بـ 15 رأساً حيث ينتمي كل رأس إلى 3 حواف؟ (تنتمي إلى؟؟ نعم، لأن الحافة مجموعة جزئية من عنصرين من الرؤوس، فإذا «لامست» حافةً رأساً أو «خرجت» منه، فهذا يعني أن ذلك الرأس ينتمي إلى تلك المجموعة الجزئية المحددة من عنصرين.)[🔗](#subsec-proofs-about-graphs-4) وإليك تعريفاً ذا صلة بهذه الفكرة.[🔗](#subsec-proofs-about-graphs-5)

#### تعريف 1.5.15.

ليكن \(v\) رأساً في رسم بياني \(G\text{.}\) درجة \(v\text{,}\) ويُكتب \(d(v)\text{,}\) هي عدد الحواف التي تحتوي \(v\text{,}\) أي عدد الحواف الملاصقة لـ \(v\text{.}\)[🔗](#def-degree-1-1) [🔗](#def-degree)

#### مثال 1.5.16.

تأمَّل الرسم البياني \(G\) ذو الرؤوس \(V = \{1,2,3,4\}\) والحواف \(E = \{\{1,2\}, \{1,3\}, \{1,4\}, \{2,3\}\}\text{.}\) ما درجة كل رأس في \(G\text{?}\)[🔗](#subsec-proofs-about-graphs-7-1-1) الحل. قد يكون من المفيد تخيّل الرسم البياني:[🔗](#subsec-proofs-about-graphs-7-2-1) ![رسم بياني بأربعة رؤوس مُرقَّمة من 1 إلى 4. هناك حواف من الرأس 1 إلى كلٍّ من الرؤوس الأخرى، وحافة بين الرأسين 2 و3.](generated/latex-image/graph-for-degrees.svg) لدينا \(d(1) = 3\text{,}\) و\(d(2) = 2\text{,}\) و\(d(3) = 2\text{,}\) و\(d(4) = 1\text{.}\) ويمكنك أن ترى ذلك بعدّ كم حافةً ملاصقة لكل رأس، أو بعدّ كم حافةً (مجموعة جزئية) ينتمي إليها كل رأس.[🔗](#subsec-proofs-about-graphs-7-2-3) [🔗](#subsec-proofs-about-graphs-7-2) [🔗](#subsec-proofs-about-graphs-7)إذن هل من الممكن أن يتصافح 15 شخصاً كلٌّ منهم مع ثلاثة أشخاص تماماً في مجموعته؟ حسناً، هل يوجد رسم بياني بـ 15 رأساً، جميعها درجتها 3؟ الجواب لا![🔗](#subsec-proofs-about-graphs-8) وإحدى الطرق التي يمكنك بها أن ترى ذلك هي أن تسأل: كم حافةً سيحتوي عليها هذا الرسم البياني؟ كل رأس ملاصق لثلاث حواف، فبعدّ الملاصقات نحصل على \(15\cdot 3 = 45\text{.}\) لكن كل حافة ملاصقة لرأسين، فقد عدنا كل حافة مرتين. إذن يكون عدد الحواف في مثل هذا الرسم البياني \(45/2 = 22.5\text{.}\) لكن عدد الحواف في الرسم البياني لا بد أن يكون عدداً صحيحاً، فلا يوجد مثل هذا الرسم البياني.[🔗](#subsec-proofs-about-graphs-9) وهذا يقترح أننا يمكننا قول شيءٍ أكثر عمومية. والدعوى التالية نتيجةٌ بسيطة لـ[لمّة المصافحة 2.1.8](sec_gt-intro.html#lem-handshake)، التي سنبرهن عليها في [القسم 2.1](sec_gt-intro.html). وهنا نقدم برهاناً كاملاً لهذه الصيغة تحديداً.[🔗](#subsec-proofs-about-graphs-10)

#### دعوى 1.5.17.

في أي رسم بياني، لا بد أن يكون عدد الرؤوس ذات الدرجة الفردية زوجياً.[🔗](#prop-handshake-parity-1-1) [🔗](#prop-handshake-parity)

#### برهان.

سنبرهن على ذلك بالتناقض. لنفترض وجود رسم بياني فيه عدد فردي من الرؤوس ذات الدرجة الفردية. تأمَّل مجموع درجات جميع الرؤوس. سيكون مجموع درجات الرؤوس ذات الدرجة الفردية فردياً (لأن مجموع عددٍ فردي من الأعداد الفردية هو فردي). وسيكون مجموع درجات الرؤوس ذات الدرجة الزوجية زوجياً (فأي مجموع لأعداد زوجية لا بد أن يكون زوجياً). ومجموع عدد فردي وآخر زوجي هو فردي. إذن يكون مجموع جميع الدرجات فردياً.[🔗](#prop-handshake-parity-2-1) غير أن عدد الحواف في الرسم البياني يساوي نصف مجموع الدرجات (بحكم [لمّة 2.1.8](sec_gt-intro.html#lem-handshake)، أو ببساطة لأن كل حافة تسهم بواحد في عدّ درجتي رأسين). وبما أن عدد الحواف عددٌ صحيح، نرى أن مجموع الدرجات لا بد أن يكون زوجياً.[🔗](#prop-handshake-parity-2-2) وهذا يناقض ما وجدناه في الفقرة السابقة. إذن، في أي رسم بياني، لا بد أن يكون عدد الرؤوس ذات الدرجة الفردية زوجياً.[🔗](#prop-handshake-parity-2-3) [🔗](#prop-handshake-parity-2)[🔗](#subsec-proofs-about-graphs)

### أسئلة القراءة

#### 1.

أيٌّ مما يلي هو تعريف الدالة \(f:A \to B\) بأنها أحادية؟[🔗](#rq-logic-structures-injective-1-1)

- كل عنصر في \(B\) هو صورة عنصر واحد على الأكثر في \(A\text{.}\)
- المجال \(A\) مجموعةٌ أكبر من مدى الدالة \(B\text{.}\)
- لا، بل إن هذا لا يمكن أن يحدث أبداً إذا كانت \(f\) أحادية.
- كل عنصر في \(A\) يُرسَل إلى عنصر واحد على الأكثر في \(B\text{.}\)
- هذا ليس سوى جزء من تعريف الدالة.
- مدى الدالة \(B\) ليس أصغر من المجال \(A\text{.}\)
- لا بد أن يكون هذا صحيحاً إذا كانت \(f\) أحادية، لكنه ليس جزءاً من تعريف الأحادية.

[🔗](#rq-logic-structures-injective)

#### 2.

متى يكون استخدام تتبّع العناصر كجزءٍ من برهان هو الأنسب؟[🔗](#rq-logic-structures-chasing-1-1)

- عند البرهنة على أن مجموعة مجموعة جزئية من أخرى.
- عند البرهنة على أن دالة ما أحادية.
- عند البرهنة على أن علاقة ما متناسِبة.
- عند البرهنة على أن رسماً بيانياً له عدد فردي من الحواف.

[🔗](#rq-logic-structures-chasing)

#### 3.

ما الأسئلة التي تدور في ذهنك بعد قراءة هذا القسم؟ اكتب سؤالاً واحداً على الأقل عن محتوى هذا القسم يثير فضولك.[🔗](#rq-logic-structures-q-1-1) [🔗](#rq-logic-structures-q)[🔗](#rqs-logic-structures)

### تمارين: تمارين تطبيقية

#### 1.

المعطاة مجموعتان \(A\) و\(B\text{,}\) فإن تقاطع (intersection) \(A\) و\(B\text{,}\) ويُكتب \(A \cap B\text{,}\) هو مجموعة جميع العناصر الموجودة في \(A\) وفي \(B\text{.}\)[🔗](#mc-logic-strucutres-first-line-direct-1-1) لنفترض أنك أردت البرهنة على أنه إذا كان \(A \cap B = B\) فإن \(B \subseteq A\text{.}\)[🔗](#mc-logic-strucutres-first-line-direct-1-2) أيٌّ مما يلي سيكون بدايةً جيدة لهذا البرهان إذا استخدمت برهاناً مباشراً؟[🔗](#mc-logic-strucutres-first-line-direct-1-3)

- ليكن \(a\) عنصراً في \(A \cap B\text{.}\)
- ليكن \(b\) عنصراً في \(B\text{.}\)
- ليكن \(a\) عنصراً في \(A\text{.}\)
- لنفترض أن هناك عنصراً \(b\) في \(B\) ليس في \(A\text{.}\)
- هذا سيكون بدايةً جيدة لبرهان بالتناقض أو بالـعكس، لا لبرهان مباشر.

[🔗](#mc-logic-strucutres-first-line-direct)

#### 2.

لنفترض أنك أردت البرهنة على أنه لكل المجموعات \(A\) و\(B\) يكون \(A \cap B \subseteq A\text{.}\) أيٌّ مما يلي سيكون بدايةً جيدة لبرهان بالتناقض؟[🔗](#mc-logic-structures-contradiction-1-1)

- لنفترض أن هناك عنصراً \(a\) في \(A\) ليس في \(A \cap B\text{.}\)
- لنفترض أن هناك عنصراً \(a\) في \(A \cap B\) ليس في \(A\text{.}\)
- ليكن \(a\) عنصراً في \(A\text{.}\)
- ليكن \(a\) عنصراً في \(A \cap B\text{.}\)
- هذا سيكون بدايةً جيدة لبرهانٍ مباشر، لا لبرهان بالتناقض.

[🔗](#mc-logic-structures-contradiction)

#### 3.

رتِّب بعض الجمل التالية لتُكوّن برهاناً صحيحاً للجملة الآتية: «لأي مجموعتين \(A\) و\(B\text{,}\) إذا كان \(B \subseteq A \cap B\) فإن \(B \subseteq A\text{.}\)»[🔗](#parsons-subset-proof-intersection-1-1)

```natural
Suppose \(B \subseteq A \cap B\text{,}\) and let \(b\) be an element of \(B\text{.}\)

---
Then \(b\) is an element of \(A \cap B\) since \(B \subseteq A \cap B\text{.}\)

---
Since \(A \cap B\) contains all the elements that are in both \(A\) and \(B\text{,}\) \(b\) is an element of \(A\text{.}\)

---
Therefore \(B \subseteq A\text{.}\)

---
Therefore \(B \subseteq A \cap B\)
 #distractor
---
Then \(b\) is an element of \(B\) since \(B \subseteq A \cap B\text{.}\)
 #distractor
---
Let \(b\) be an element of \(A \cap B\text{.}\)
 #distractor
---
Suppose \(B \subseteq A\text{.}\)
 #distractor
---
Suppose \(A \subseteq B\text{.}\)
 #distractor
```

[🔗](#parsons-subset-proof-intersection)

#### 4.

برهن أن لأي مجموعتين \(A\) و\(B\text{,}\) \((A \cap B) \cup A = A\)[🔗](#parsons-logic-structures-set-equality-1-1) رتِّب الجمل التالية لتُكوّن برهاناً صحيحاً.[🔗](#parsons-logic-structures-set-equality-1-2)

```natural
First we will prove that \((A \cap B) \cup A \subseteq A\text{.}\)

---
Let \(x\) be an element of \((A \cap B) \cup A\text{.}\)

---
Then \(x\) is an element of \(A \cap B\text{,}\) or \(x\) is an element of \(A\text{.}\)

---
So in particular, \(x\) is an element of \(A\text{.}\)

---
Therefore \((A \cap B) \cup A \subseteq A\text{.}\)

---
Second, we will prove that \(A \subseteq (A \cap B) \cup A\text{.}\)

---
Let \(x\) be an element of \(A\text{.}\)

---
Then \(x\) is an element of \((A \cap B) \cup A\text{,}\) since \(x\) is in \(A\) or in the other set.
---
Therefore \(A \subseteq (A \cap B) \cup A\text{.}\)

---
Since \((A \cap B) \cup A \subseteq A\) and \(A \subseteq (A \cap B) \cup A\text{,}\) we have \((A \cap B) \cup A = A\text{.}\)
```

[🔗](#parsons-logic-structures-set-equality)

#### 5.

لتكن \(f:X \to Y\) دالة، وليكن \(B \subseteq Y\) مجموعةً جزئية من مدى الدالة. عرِّف الصورة العكسية (inverse image) لـ \(B\) على يد \(f\) بأنها المجموعة \(f\inv(B) = \{x \in X \st f(x) \in B\}\text{.}\) بمعنى أنها كل العناصر في المجال التي تُسند إلى عناصر في \(B\text{.}\)[🔗](#parsons-logic-structures-function-image-1-1) برهن أن إذا كانت \(B_1 \subseteq B_2\) مجموعتين جزئيتين من مدى الدالة، فإن \(f\inv(B_1) \subseteq f\inv(B_2)\text{.}\)[🔗](#parsons-logic-structures-function-image-1-2) رتِّب بعض الجمل التالية لتُكوّن برهاناً صحيحاً.[🔗](#parsons-logic-structures-function-image-1-3)

```natural
Suppose \(B_1 \subseteq B_2\text{.}\)

---
Let \(a\) be an element of \(f\inv(B_1)\text{.}\)

---
This means that \(f(a)\) is an element of \(B_1\text{.}\)

---
Since \(B_1 \subseteq B_2\text{,}\) \(f(a)\) is an element of \(B_2\text{.}\)

---
This then means that \(a\) is an element of \(f\inv(B_2)\text{.}\)

---
Therefore \(f\inv(B_1) \subseteq f\inv(B_2)\text{.}\)

---
Let \(b\) be an element of \(B_1\text{.}\)
 #distractor
---
Therefore \(b\) is an element of \(B_2\text{.}\)
 #distractor
---
Thus \(B_1 \subseteq B_2\text{.}\)
 #distractor
```

[🔗](#parsons-logic-structures-function-image)[🔗](#practice-logic-structures)

### تمارين: تمارين إضافية

#### 1.

برهن أن لأي مجموعتين \(A\) و\(B\text{,}\) يكون \(A \subseteq B\) إذا وفقط إذا \(A \cup B = B\text{.}\)[🔗](#exercises-logic-structures-2-1-1) تلميح. للبرهنة على أن \(A \subseteq B\) إذا وفقط إذا \(A \cup B = B\text{,}\) عليك البرهنة على استلزامين:

1. إذا كان \(A \subseteq B\text{,}\) فإن \(A \cup B = B\text{.}\)[🔗](#exercises-logic-structures-2-2-1-3-1-1) [🔗](#exercises-logic-structures-2-2-1-3-1)
2. إذا كان \(A \cup B = B\text{,}\) فإن \(A \subseteq B\text{.}\)[🔗](#exercises-logic-structures-2-2-1-3-2-1) [🔗](#exercises-logic-structures-2-2-1-3-2)

[🔗](#exercises-logic-structures-2-2-1) للبرهنة على تساوي مجموعتين، نبرهن عادةً على أن كلاً منهما مجموعة جزئية من الأخرى.[🔗](#exercises-logic-structures-2-2-2) [🔗](#exercises-logic-structures-2-2) [🔗](#exercises-logic-structures-2)

#### 2.

تقاطع المجموعتين \(A\) و\(B\text{,}\) الذي يُرمز له بـ \(A \cap B\text{,}\) هو مجموعة جميع العناصر الموجودة في \(A\) وفي \(B\text{.}\)[🔗](#exercises-logic-structures-3-1-1) برهن أن لأي مجموعتين \(A\) و\(B\text{,}\) يكون \(A \subseteq B\) إذا وفقط إذا \(A \cap B = A\text{.}\)[🔗](#exercises-logic-structures-3-1-2) [🔗](#exercises-logic-structures-3)

#### 3.

برهن أن لأي مجموعات \(A\text{,}\) \(B\text{,}\) و\(C\text{,}\) إذا كان \(A \cup B \subseteq C\text{,}\) فإن \(A \subseteq C\) و\(B \subseteq C\text{.}\)[🔗](#exercises-logic-structures-4-1-1) [🔗](#exercises-logic-structures-4)

#### 4.

برهن أن لأي مجموعات \(A\text{,}\) \(B\text{,}\) و\(C\text{,}\) إذا كان \(A \subseteq C\) و\(B \subseteq C\text{,}\) فإن \(A \cup B \subseteq C\text{.}\)[🔗](#exercises-logic-structures-5-1-1) [🔗](#exercises-logic-structures-5)

#### 5.

فرق المجموعتين \(A\) و\(B\text{,}\) ويُكتب \(A \setminus B\text{,}\) هو مجموعة جميع العناصر الموجودة في \(A\) وغير الموجودة في \(B\text{.}\)[🔗](#exercises-logic-structures-6-1-1) المجموعة الخالية (empty set)، ويُكتب \(\emptyset\text{,}\) هي المجموعة التي لا تضم أي عناصر.[🔗](#exercises-logic-structures-6-1-2) برهن أن إذا كان \(A \setminus B = A\) فإن \(A \cap B = \emptyset\text{.}\)[🔗](#exercises-logic-structures-6-1-3) [🔗](#exercises-logic-structures-6)

#### 6.

برهن أن إذا كان \(A \setminus B = B \setminus A\) فإن \(A = B\text{.}\)[🔗](#exercises-logic-structures-7-1-1) [🔗](#exercises-logic-structures-7)

#### 7.

لتكن \(f:X \to Y\) دالة، ولتكن \(A\) و\(B\) مجموعتين جزئيتين من \(X\text{.}\)[🔗](#exercises-logic-structures-8-1-1)

#### (a)

برهن أن \(f(A \cap B) \subseteq f(A) \cap f(B)\text{.}\)[🔗](#exercises-logic-structures-8-2-1-1) [🔗](#exercises-logic-structures-8-2)

#### (b)

ابحث عن مثال لدالة ومجموعتين \(A\) و\(B\) بحيث \(f(A \cap B) \neq f(A) \cap f(B)\text{.}\)[🔗](#exercises-logic-structures-8-3-1-1) [🔗](#exercises-logic-structures-8-3)[🔗](#exercises-logic-structures-8)

#### 8.

لتكن \(f:X \to Y\) دالة، ولتكن \(A\) و\(B\) مجموعتين جزئيتين من \(X\text{.}\)[🔗](#exercises-logic-structures-9-1-1)

#### (a)

برهن أن \(f(A \cup B) \subseteq f(A) \cup f(B)\text{.}\)[🔗](#exercises-logic-structures-9-2-1-1) [🔗](#exercises-logic-structures-9-2)

#### (b)

برهن أن \(f(A) \cup f(B) \subseteq f(A \cup B)\)[🔗](#exercises-logic-structures-9-3-1-1) [🔗](#exercises-logic-structures-9-3)

#### (c)

ما الذي تستطيع استنتاجه من البرهانين السابقين؟[🔗](#exercises-logic-structures-9-4-1-1) [🔗](#exercises-logic-structures-9-4)[🔗](#exercises-logic-structures-9)

#### 9.

المعطاة دالة \(f:X \to Y\) ومجموعة \(B \subseteq Y\text{,}\) فإننا نعرّف الصورة العكسية لـ \(B\) على يد \(f\) بأنها المجموعة \(f\inv(B) = \{x \in X \st f(x) \in B\text{.}\) بمعنى أنها كل العناصر في المجال التي تُسند إلى عناصر في \(B\text{.}\)[🔗](#ex-inv-image-1-1)

#### (a)

بالنسبة إلى \(f:\N \to \N\) المعرَّفة بـ \(f(n) = n^2\text{,}\) فما كلٌّ من المجموعات التالية؟

1. \(\displaystyle f\inv(\{1, 4, 9\})\)[🔗](#ex-inv-image-2-1-1-3-1-1) [🔗](#ex-inv-image-2-1-1-3-1)
2. \(\displaystyle f\inv(\{2, 3, 5, 7\})\)[🔗](#ex-inv-image-2-1-1-3-2-1) [🔗](#ex-inv-image-2-1-1-3-2)
3. \(\displaystyle f\inv(\{1,2,\ldots,10\})\)[🔗](#ex-inv-image-2-1-1-3-3-1) [🔗](#ex-inv-image-2-1-1-3-3)

[🔗](#ex-inv-image-2-1-1) [🔗](#ex-inv-image-2)

#### (b)

برهن أن لأي مجموعة \(C \subseteq X\text{,}\) لدينا \(C \subseteq f\inv(f(C))\text{.}\)[🔗](#ex-inv-image-3-1-1) [🔗](#ex-inv-image-3)

#### (c)

أعطِ مثالاً لدالة \(f\) ومجموعة \(C\) بحيث \(C \neq f\inv(f(C))\text{.}\)[🔗](#ex-inv-image-4-1-1) [🔗](#ex-inv-image-4)

#### (d)

برهن أن لأي مجموعة \(D \subseteq Y\text{,}\) لدينا \(f(f\inv(D)) \subseteq D\text{.}\)[🔗](#ex-inv-image-5-1-1) [🔗](#ex-inv-image-5)

#### (e)

أعطِ مثالاً لدالة \(f\) ومجموعة \(D\) بحيث \(f(f\inv(D)) \neq D\text{.}\)[🔗](#ex-inv-image-6-1-1) [🔗](#ex-inv-image-6)[🔗](#ex-inv-image)

#### 10.

لتكن \(f:X \to Y\) دالة، ولتكن \(A\) و\(B\) مجموعتين جزئيتين من \(Y\text{.}\) برهن أن \(f\inv(A \cap B) = f\inv(A) \cap f\inv(B)\text{.}\)[🔗](#exercises-logic-structures-11-1-1) [🔗](#exercises-logic-structures-11)

#### 11.

لتكن \(f:X \to Y\) دالة، ولتكن \(A\) و\(B\) مجموعتين جزئيتين من \(Y\text{.}\) برهن أن \(f\inv(A \cup B) = f\inv(A) \cup f\inv(B)\text{.}\)[🔗](#exercises-logic-structures-12-1-1) [🔗](#exercises-logic-structures-12)

#### 12.

لكل علاقة مما يلي، حدِّد ما إذا كانت متناسِبة. إن كانت كذلك فبرهن عليها. وإن لم تكن كذلك فاذكر مثالاً مضاداً.[🔗](#exercises-logic-structures-13-1-1)

#### (a)

العلاقة «\(|\)» (يقسم) على \(\Z\) المعرَّفة بأن \(a | b\) شريطة أن يكون \(b\) مضاعفاً للعدد \(a\text{.}\)[🔗](#exercises-logic-structures-13-2-1-1) [🔗](#exercises-logic-structures-13-2)

#### (b)

العلاقة «\(\leq\)» (أصغر من أو يساوي) على \(\R\text{.}\)[🔗](#exercises-logic-structures-13-3-1-1) [🔗](#exercises-logic-structures-13-3)

#### (c)

العلاقة «\(\perp\)» (عمودية على) على مجموعة المستقيمات في المستوى.[🔗](#exercises-logic-structures-13-4-1-1) [🔗](#exercises-logic-structures-13-4)

#### (d)

العلاقة «\(\sim\)» (متشابهة مع) على مجموعة المثلثات في المستوى (المثلثان متشابهان إذا كان لهما الزوايا نفسها، لكن ليس بالضرورة الحجم نفسه).[🔗](#exercises-logic-structures-13-5-1-1) [🔗](#exercises-logic-structures-13-5)[🔗](#exercises-logic-structures-13)[🔗](#exercises-logic-structures)[🔗](#sec_logic-structures) [&#xe5cb;السابق](sec_logic-proofs.html)[&#xe5ce;الأعلى](#)[التالي&#xe5cc;](sec_logic-conc.html) [ملاحظات](/cdn-cgi/l/email-protection#ddb2aebebcaff3b1b8abb4b39da8b3beb2f3b8b9a8)[شعار PreTeXt](https://pretextbook.org)[![شعار Runstone Academy](/images/discrete-math/sec_logic-structures-RAIcon_cropped.png.webp)](https://runestone.academy)[![شعار MathJax](/images/discrete-math/sec_logic-structures-badge-square-2.png.webp)](https://www.mathjax.org) window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-66485406-1');