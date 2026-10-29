---
title: "قواعد العدّ"
lang: ar
source: https://courses.csail.mit.edu/6.042/spring18/mcs.pdf
---

# قواعد العدّ

كيف تعدّ عدد الأشخاص في غرفة مزدحمة؟ يمكنك أن تعدّ الرؤوس، فلكلّ شخص رأس واحد بالضبط. أو يمكنك أن تعدّ الآذان وتقسم على اثنين. بالطبع، قد تضطرّ إلى تعديل الحساب إن فقد أحدهم أذنًا في غارة قراصنة، أو وُلد أحدهم بثلاث آذان. والمقصود أنك تستطيع في كثير من الأحيان أن تعدّ شيئًا بعدّ شيء آخر، مع شيء من التساهل أحيانًا. وهذه فكرة محورية في العدّ، من أسهل المسائل إلى أصعبها.

بل إننا سبق أن رأينا هذه التقنية تُستعمل في المبرهنة ٤.٥.٥، حيث بُرهن على أن عدد المجموعات الجزئية لمجموعة ذات \(n\) عنصر يساوي عدد المتتاليات الثنائية ذات الطول \(n\)، بوصف تقابل بين المجموعات الجزئية والمتتاليات الثنائية. وأبسط طريقة للعدّ بهذا الأسلوب هي إيجاد تقابل بين المجموعتين؛ فإذا وُجد تقابل بين مجموعتين فإن لهما الحجم نفسه. وتُعرف هذه الحقيقة المهمة بقاعدة التقابل.

ويتناول هذا الفصل ترسانة من قواعد العدّ التي تُبنى بعضها على بعض: قاعدة التقابل، وقاعدة الجداء، وقاعدة الجمع، وقاعدة الجداء المعمَّمة، وقاعدة القسمة، وقاعدة المجموعات الجزئية، وقاعدة المحاسب، ثم مبدأ برج الحمام ومبدأ الشمول والاستبعاد. ويُختم الفصل بالبراهين التوافقية، وهي براهين تُثبت حقائق جبرية بالاعتماد على مبادئ العدّ وحدها.

## محتوى الفصل

- [عدّ شيء بعدّ شيء آخر](/book/mathematics-for-cs/ch15-cardinality-rules/sec-counting-one-thing-by-counting-another)
- [عدّ المتتاليات](/book/mathematics-for-cs/ch15-cardinality-rules/sec-counting-sequences)
- [قاعدة الجداء المعمَّمة](/book/mathematics-for-cs/ch15-cardinality-rules/sec-the-generalized-product-rule)
- [قاعدة القسمة](/book/mathematics-for-cs/ch15-cardinality-rules/sec-the-division-rule)
- [عدّ المجموعات الجزئية](/book/mathematics-for-cs/ch15-cardinality-rules/sec-counting-subsets)
- [المتتاليات مع التكرار](/book/mathematics-for-cs/ch15-cardinality-rules/sec-sequences-with-repetitions)
- [تدريب على العدّ: أيدي البوكر](/book/mathematics-for-cs/ch15-cardinality-rules/sec-counting-practice-poker-hands)
- [مبدأ برج الحمام](/book/mathematics-for-cs/ch15-cardinality-rules/sec-the-pigeonhole-principle)
- [مبدأ الشمول والاستبعاد](/book/mathematics-for-cs/ch15-cardinality-rules/sec-inclusion-exclusion)
- [البراهين التوافقية](/book/mathematics-for-cs/ch15-cardinality-rules/sec-combinatorial-proofs)
- [المراجع](/book/mathematics-for-cs/ch15-cardinality-rules/sec-references)
