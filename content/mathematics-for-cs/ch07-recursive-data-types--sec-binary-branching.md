---
title: "التفريع الثنائي"
lang: ar
source: https://courses.csail.mit.edu/6.042/spring18/mcs.pdf
---

# التفريع الثنائي

الأشجار في الأمثلة أعلاه إما ورقة واحدة لا تفريع فيها، وإما فرع ثنائي (باتجاهين) إلى اليسار وإلى اليمين. والسماح بأكثر من فرعين مهمّ في بعض التطبيقات، لكن التفريع الثنائي هو الأكثر شيوعًا، وهو كافٍ لتوضيح كل الأفكار المهمة.

ثمة طرائق كثيرة لتمثيل الأشجار بنية بيانات حاسوبية، أو مجموعة رياضية، لكننا سنتّخذ نهجًا مجرّدًا يمكّننا، في معظم الأمر، من فهم الأشجار الثنائية دون أن نشغل أنفسنا بكيفية تمثيلها.

يمكننا أن نبدأ بافتراض أن لدينا فحسب مجموعة ما \(\mathrm{BBTr}\) من الأشياء التي تمثّل أشجارًا ذات تفريع ثنائي. ومن الخصائص الحاسمة للشجرة ذات التفريع الثنائي كونها ورقة أو لا. ولا بدّ في أي تمثيل من وسيلة لاختبار ذلك، فلا بدّ من محمول ورقة \(\mathrm{leaf?}\) يؤدّي هذه المهمة. أي إن الشجرة ذات التفريع الثنائي \(T \in \mathrm{BBTr}\) تكون ورقة عندما تكون \(\mathrm{leaf?}(T)\) صادقة. ولتكن \(\mathrm{Leaves}\) مجموعة الأوراق:

\[
\mathrm{Leaves} \triangleq \{\, T \in \mathrm{BBTr} \mid \mathrm{leaf?}(T) \,\}.
\]

والأشجار غير الورقية هي المفترض أن تكون أشجارًا لها فرعان أيسر وأيمن فعلًا. ولا بدّ في أي تمثيل للأشجار من وسيلة لاختيار هذين الفرعين، أي لا بدّ من دالّتَي اختيار \(\mathrm{left}\) و\(\mathrm{right}\) تُنتجان الفرعين الأيسر والأيمن لعناصر \(\mathrm{BBTr}\) غير الورقية. ونصوغ ذلك بتعريف

\[
\mathrm{Branching} \triangleq \mathrm{BBTr} \setminus \mathrm{Leaves},
\]

واشتراط وجود دالتين شاملتين

\[
\mathrm{left} : \mathrm{Branching} \to \mathrm{BBTr}, \qquad \mathrm{right} : \mathrm{Branching} \to \mathrm{BBTr}.
\]

إذن، بحسب التعريف، الفرع الأيسر للشجرة \(T\) هو الشجرة \(\mathrm{left}(T)\)، والفرع الأيمن هو \(\mathrm{right}(T)\).

## الأشجار الجزئية

في أشجار البحث المثال الذي بدأنا به، إذا انطلقت من القمة وتبعت مسارًا ما نازلًا، وصلت إلى شجرة جزئية هي أيضًا شجرة بحث. ويمكن وصف أي مسار كهذا بمتتالية الفروع اليسرى واليمنى التي تختارها. فمثلًا في الشجرة الواردة في الشكل ٧.١، المتتالية

\[
(\mathrm{right}, \mathrm{left}, \mathrm{left})
\tag{7.25}
\]

تصف مسارًا طوله ثلاثة يبدأ من الشجرة العليا \(T_{6.8}\) ذات العلامة ٦٫٨. وتُطبَّق دوال الاختيار من اليمين إلى اليسار، فنذهب أولًا إلى \(\mathrm{left}(T_{6.8})\)، وهي الشجرة الجزئية \(T_{\pi}\) ذات العلامة \(\pi\). ثم نأخذ الفرع الأيسر إلى الشجرة الجزئية \(\mathrm{left}(T_{\pi})\)، وهي الشجرة الجزئية \(T_{3}\) ذات العلامة ٣، ثم نأخذ فرعًا أيمنًا أخيرًا لننتهي بالشجرة الجزئية \(\mathrm{right}(T_{3})\) ذات العلامة ٣٫١. أي إن الشجرة الجزئية في نهاية المسار المعطى بالمتتالية (٧.٢٥) هي

\[
\mathrm{right}\bigl(\mathrm{left}(\mathrm{left}(T_{6.8}))\bigr) = T_{3.1}.
\]

وبصيغة أعمّ، لتكن \(\overrightarrow{P}\) متتالية منتهية من دوال الاختيار، ولتكن \(T \in \mathrm{BBTr}\). الترميز المستعمل للشجرة الجزئية في نهاية المسار الموصوف بـ\(\overrightarrow{P}\) هو \(\mathrm{subtree}_T(\overrightarrow{P})\). فمثلًا رأينا للتوّ أن

\[
\mathrm{subtree}_{T_{6.8}}\bigl((\mathrm{right}, \mathrm{left}, \mathrm{left})\bigr) = T_{3.1}.
\]

ولاحظ أنه إذا حاول المسار \(\overrightarrow{P}\) أن يمضي بعد ورقة من أوراق \(T\)، فلن توجد شجرة جزئية في نهايته. فمثلًا \(\mathrm{subtree}_{T_{6.8}}(\mathrm{left}, \mathrm{right}, \mathrm{right})\) غير معرَّف، لأن \(\mathrm{subtree}_{T_{6.8}}(\mathrm{right}, \mathrm{right})\) ورقة تحمل العلامة ٩ ولا فرع أيسر لها.

وثمة دقيقة تقنية يجدر التنبيه إليها لأنها قد تُشوّش. فحين يتحدث الناس عن الأشجار، يعنون عادةً بنية الشجرة كلها على النحو الوارد في الشكلين ٧.١ و٧.٢ أعلاه. وليس هذا معنى «الشجرة» في هذا القسم. فالشجرة هنا ليست إلا نقطة واحدة، أي عقدة واحدة، هي العقدة «الجذر» في الأعلى. أما بقية العقد تحت الجذر فهي في ذاتها أشجار تُسمّى الأشجار الجزئية للشجرة.

ولصياغة ذلك رسميًّا، سنعطي تعريفًا لـ\(\mathrm{subtree}_T(\overrightarrow{P})\) بالاستقراء على طول المسار. وسنستعمل الترميز \(f \cdot \overrightarrow{P}\) للمتتالية التي تبدأ بـ\(f\) ويتبعها العناصر المتتالية في \(\overrightarrow{P}\). فمثلًا، إذا كانت \(\overrightarrow{P}\) هي المتتالية ذات الطول ثلاثة في (٧.٢٥)، فإن \(\mathrm{right} \cdot \overrightarrow{P}\) هي المتتالية ذات الطول أربعة

\[
(\mathrm{right}, \mathrm{right}, \mathrm{left}, \mathrm{left}).
\]

وكذلك الأمر في \(\overrightarrow{P} \cdot f\)، فمثلًا تكون \(\overrightarrow{P} \cdot \mathrm{right}\) هي المتتالية ذات الطول أربعة

\[
(\mathrm{right}, \mathrm{left}, \mathrm{left}, \mathrm{right}).
\]

**تعريف ٧.٦.١.** ستُعرَّف الشجرة \(\mathrm{subtree}_T(\overrightarrow{P}) \in \mathrm{BBTr}\) بالاستقراء على طول المتتالية \(\overrightarrow{P}\):

- الحالة الأساسية: (\(\overrightarrow{P} = \lambda\)). عندئذٍ \(\mathrm{subtree}_T(\overrightarrow{P}) \triangleq T\).
- حالة المُنشئ: (\(\overrightarrow{P} = f \cdot \overrightarrow{Q}\)). إذا كانت \(\mathrm{subtree}_T(\overrightarrow{Q})\) معرَّفة وتساوي شجرة في \(\mathrm{Branching}\)، فإن

\[
\mathrm{subtree}_T(\overrightarrow{P}) \triangleq f\bigl(\mathrm{subtree}_T(\overrightarrow{Q})\bigr).
\]

وإلا فإن \(\mathrm{subtree}_T(\overrightarrow{P})\) غير معرَّفة.[^altcase]

ولتكن \(\mathrm{Subtrs}(T)\) كل الأشجار التي يمكن الوصول إليها باتباع مسارات تبدأ من \(T\). وبتعبير أدقّ:

**تعريف ٧.٦.٢.** لأي شجرة \(T \in \mathrm{BBTr}\)، حيث \(\overrightarrow{P}\) متتالية اختيار ما،

\[
\mathrm{Subtrs}(T) \triangleq \{\, S \in \mathrm{BBTr} \mid S = \mathrm{subtree}_T(\overrightarrow{P}) \,\}.
\]

والأشجار الجزئية الفعلية \(\mathrm{PropSubtrs}(T)\) هي الأشجار الجزئية الواقعة فعلًا «تحت» \(T\)، أي تلك التي تُوصَل إليها بمتتالية اختيار غير فارغة:

\[
\mathrm{PropSubtrs}(T) \triangleq \{\, S \in \mathrm{BBTr} \mid S = \mathrm{subtree}_T(\overrightarrow{P}),\ \overrightarrow{P} \neq \lambda \,\}.
\]

إذن لدينا بالتعريف

\[
\mathrm{Subtrs}(T) = \mathrm{PropSubtrs}(T) \cup \{T\}.
\tag{7.26}
\]

وثمة حقيقتان بديهيتان عن المسارات والأشجار الجزئية قد نعدّهما مسلَّمتين، لكن يجدر النصّ عليهما صراحةً. الأولى أن الشجرة الجزئية الفعلية للشجرة \(T\) يجب أن تكون شجرة جزئية في شجرتها الجزئية اليسرى أو شجرتها الجزئية اليمنى:

**نتيجة ٧.٦.٣.** من أجل \(T \in \mathrm{Leaves}\)، \(\mathrm{PropSubtrs}(T) = \varnothing\). ومن أجل \(T \in \mathrm{Branching}\)،

\[
\mathrm{PropSubtrs}(T) = \mathrm{Subtrs}\bigl(\mathrm{left}(T)\bigr) \cup \mathrm{Subtrs}\bigl(\mathrm{right}(T)\bigr).
\]

ولذلك

\[
\mathrm{Subtrs}(T) = \{T\} \cup \mathrm{Subtrs}\bigl(\mathrm{left}(T)\bigr) \cup \mathrm{Subtrs}\bigl(\mathrm{right}(T)\bigr).
\tag{7.27}
\]

تتبع النتيجة ٧.٦.٣ من أن الخطوة الأولى في المسار، إذا ذهبت إلى شجرة جزئية، كان بقية المسار في تلك الشجرة الجزئية.

والحقيقة البديهية الثانية أن الشجرة الجزئية لشجرة جزئية شجرة جزئية:

**نتيجة ٧.٦.٤.** إذا كان \(S \in \mathrm{PropSubtrs}(T)\) و\(R \in \mathrm{Subtrs}(S)\)، فإن \(R \in \mathrm{PropSubtrs}(T)\).

تتبع النتيجة ٧.٦.٤ من أنه إذا كان \(\overrightarrow{P}\) مسارًا في \(T\) إلى شجرة جزئية \(S\) منها، وكان \(\overrightarrow{Q}\) مسارًا في \(S\) إلى شجرة جزئية \(R\) منها، كما في الشكل ٧.٣، فإن الوصل \(\overrightarrow{Q} \cdot \overrightarrow{P}\) مسار من \(T\) إلى \(R\).[^order]

*الشكل ٧.٣: شجرة جزئية \(S\) للشجرة \(T\) وشجرة جزئية \(R\) للشجرة \(S\). ينزل المسار \(\overrightarrow{P}\) من \(T\) إلى \(S\)، ثم ينزل المسار \(\overrightarrow{Q}\) من \(S\) إلى \(R\).*

[^altcase]: كان يمكن أن تكون حالة المُنشئ بدلًا من ذلك: (\(\overrightarrow{P} = \overrightarrow{Q} \cdot f\)). إذا كانت \(T \in \mathrm{Branching}\)، فإن \(\mathrm{subtree}_T(\overrightarrow{P}) \triangleq \mathrm{subtree}_{f(T)}(\overrightarrow{Q})\).

[^order]: تُطبَّق متتاليات المسارات من اليمين إلى اليسار، لذا كان \(\overrightarrow{Q} \cdot \overrightarrow{P}\) هو المسار الذي يبدأ بـ\(\overrightarrow{P}\) ثم يتبع \(\overrightarrow{Q}\).
