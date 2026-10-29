---
title: "العلامات العددية"
lang: ar
source: https://courses.csail.mit.edu/6.042/spring18/mcs.pdf
---

# العلامات العددية

وصفنا الفكرة الأساسية لأشجار البحث في بداية هذا القسم، واستعملناها لبيان سبب أهمية الصلة بين حجم الشجرة وعمقها.

وسنعرّف الآن أشجار البحث تعريفًا رسميًّا نوعَ بيانات عوديًّا. وسيتيح لنا ذلك تعريف دوال البحث عوديًّا والتحقق من خصائصها بالاستقراء البنيوي.

لأشجار البحث علامة عددية على كل شجرة جزئية. ويعني هذا، بصيغة مجرّدة، وجود دالة شاملة

\[
\mathrm{num} : \mathrm{BBTr} \to \R.
\]

ولتكن \(\min(T)\) أصغر علامة في \(T\)، وكذلك \(\max(T)\). وبتعبير أدقّ:

**تعريف ٧.٦.٢٣.**

\[
\mathrm{nums}(T) \triangleq \{\, \mathrm{num}(S) \mid S \in \mathrm{Subtrs}(T) \,\},
\tag{7.42}
\]

\[
\min(T) \triangleq \min \mathrm{nums}(T),
\tag{7.43}
\]

\[
\max(T) \triangleq \max \mathrm{nums}(T).
\tag{7.44}
\]

ويكون للقيمتين \(\min\) و\(\max\) وجود في أي شجرة منتهية \(T\).

**تعريف ٧.٦.٢٤.** تُعرَّف **أشجار البحث** \(T \in \mathrm{BBTr}\) عوديًّا كما يلي:

- الحالة الأساسية: (\(T \in \mathrm{Leaves}\)). \(T\) شجرة بحث.
- حالة المُنشئ: (\(T \in \mathrm{Branching}\)). إذا كانت \(\mathrm{left}(T)\) و\(\mathrm{right}(T)\) كلتاهما شجرتَي بحث، وكان

\[
\max\bigl(\mathrm{left}(T)\bigr) < \mathrm{num}(T) < \min\bigl(\mathrm{right}(T)\bigr),
\]

فإن \(T\) شجرة بحث.

وبما أن أشجار البحث لا يمكن، بحسب تعريفها، أن يكون فيها أشجار جزئية تحمل العلامة نفسها، فهي لا تتشارك أشجارًا جزئية. إذن كل شجرة بحث هي شجرة عودية في \(\mathrm{RecTr}\).

ويمكن الآن وصف الإجراء البسيط لإيجاد عدد في شجرة بحث، الذي شرحناه في بداية هذا القسم، بدالة عودية هي \(\mathrm{srch}\). فلأي شجرة بحث \(T\) وعدد \(r\)، ستكون قيمة \(\mathrm{srch}(T,r)\) هي المسار في \(T\) المؤدّي إلى \(r\)، بافتراض أن \(r\) تظهر في \(T\). وإلا كانت القيمة مسارًا إلى ورقة يتبعه \(\mathrm{fail}\).

**تعريف ٧.٦.٢٥.** لتكن \(\mathcal{S}\) صنف أشجار البحث. تُعرَّف الدالة

\[
\mathrm{srch} : \mathcal{S} \times \R \to \{\mathrm{left}, \mathrm{right}\}^{*} \cup \bigl(\{\mathrm{fail}\} \times \{\mathrm{left}, \mathrm{right}\}^{*}\bigr)
\]

كما يلي:

إذا كان \(r = \mathrm{num}(T)\)، فإن

\[
\mathrm{srch}(T,r) \triangleq \lambda.
\]

وإذا كان \(r \neq \mathrm{num}(T)\)، عُرِّفت \(\mathrm{srch}(T,r)\) عوديًّا على التعريف ٧.٦.٢٤ لشجرة البحث:

- الحالة الأساسية: (\(T \in \mathrm{Leaves}\)).

\[
\mathrm{srch}(T,r) \triangleq \mathrm{fail}.
\]

- حالة المُنشئ: (\(T \in \mathrm{Branching}\)).

\[
\mathrm{srch}(T,r) \triangleq
\begin{cases}
\mathrm{srch}\bigl(\mathrm{left}(T), r\bigr) \cdot \mathrm{left}, & r < \mathrm{num}(T),\\[2pt]
\mathrm{srch}\bigl(\mathrm{right}(T), r\bigr) \cdot \mathrm{right}, & r > \mathrm{num}(T).
\end{cases}
\]

ونستطيع الآن أن نبرهن بدقّة أن إجراء \(\mathrm{srch}\) يعطي الجواب الصحيح دائمًا.

**مبرهنة ٧.٦.٢٦.** إذا كان \(r \in \mathrm{nums}(T)\)، فإن \(\mathrm{srch}(T,r)\) متتالية من دوال الاختيار، و

\[
\mathrm{num}\bigl(\mathrm{subtree}_T(\mathrm{srch}(T,r))\bigr) = r.
\]

وإلا فإن \(\mathrm{srch}(T,r)\) متتالية على الصورة \(\mathrm{fail} \cdot \overrightarrow{P}\) من أجل متتالية ما \(\overrightarrow{P}\).

يمكن برهان المبرهنة ٧.٦.٢٦ باستقراء بنيوي مباشر على التعريف العودي ٧.٦.٢٤ لشجرة البحث، وسنتركه تمرينًا.[^srchproof]

[^srchproof]: في هذه المرحلة المبكّرة من التمرّن على الاستقراء البنيوي، ينبغي أن يكون البرهان الكامل في المتن، وسنضمّه حين تسنح الفرصة.
