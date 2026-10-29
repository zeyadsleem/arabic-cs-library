---
title: "خصائص الأشجار العودية"
lang: ar
source: https://courses.csail.mit.edu/6.042/spring18/mcs.pdf
---

# خصائص الأشجار العودية

بالتعريف العودي للأشجار، نستطيع أن نعرّف عوديًّا بعض الدوال الأساسية المهمة على الأشجار. ونبدأ بتعريف عودي للحجم.

**تعريف ٧.٦.١٢.** نعرّف دالة \(\mathrm{recsize} : \mathrm{RecTr} \to \Z^{+}\): بالاستقراء على تعريف \(\mathrm{RecTr}\):

- الحالة الأساسية: (\(T \in \mathrm{Leaves}\)).

\[
\mathrm{recsize}(T) \triangleq 1.
\]

- حالة المُنشئ: (\(T \in \mathrm{Branching}\)).

\[
\mathrm{recsize}(T) \triangleq 1 + \mathrm{recsize}\bigl(\mathrm{left}(T)\bigr) + \mathrm{recsize}\bigl(\mathrm{right}(T)\bigr).
\]

وبرهان بسيط بالاستقراء البنيوي يؤكد أن تعريف \(\mathrm{recsize}\) صحيح، أي:

**لمّة ٧.٦.١٣.** \(\mathrm{recsize}(T) = \mathrm{size}(T)\) لكل \(T \in \mathrm{RecTr}\).

**البرهان.** البرهان بالاستقراء البنيوي على تعريف \(\mathrm{RecTr}\).

- **الحالة الأساسية:** (\(T \in \mathrm{Leaves}\)). بحسب النتيجة ٧.٦.٣، \(\mathrm{Subtrs}(T) = \{T\}\)، إذن

\[
\mathrm{recsize}(T) \triangleq 1 = \card{\mathrm{Subtrs}(T)} = \mathrm{size}(T).
\]

- **حالة المُنشئ:** (\(T \in \mathrm{Branching}\)). لدينا بفرضية الاستقراء

\[
\mathrm{size}\bigl(f(T)\bigr) = \mathrm{recsize}\bigl(f(T)\bigr) \qquad \bigl(f \in \{\mathrm{left}, \mathrm{right}\}\bigr)
\tag{7.33}
\]

من أجل \(f \in \{\mathrm{left}, \mathrm{right}\}\). ولدينا من (٧.٢٧) أن

\[
\mathrm{Subtrs}(T) = \{T\} \cup \mathrm{Subtrs}\bigl(\mathrm{left}(T)\bigr) \cup \mathrm{Subtrs}\bigl(\mathrm{right}(T)\bigr)
\]

لكل \(T \in \mathrm{BBTr}\). والآن إذا كانت \(T \in \mathrm{RecTr}\)، كانت هذه المجموعات الثلاث منفصلة، إذن

\[
\mathrm{size}(T) = 1 + \mathrm{size}\bigl(\mathrm{left}(T)\bigr) + \mathrm{size}\bigl(\mathrm{right}(T)\bigr).
\tag{7.34}
\]

وعندئذٍ لدينا

\[
\begin{aligned}
\mathrm{size}(T) &= 1 + \mathrm{recsize}\bigl(\mathrm{left}(T)\bigr) + \mathrm{recsize}\bigl(\mathrm{right}(T)\bigr) && (7.33),\ (7.34) \\
&= \mathrm{recsize}(T) && (7.6.12).
\end{aligned}
\]

\(\blacksquare\)

وبالمثل، فإن عمق الشجرة العودية هو طول أطول مسار فيها. والتعريف الرسمي هو:

\[
\mathrm{depth}(T) \triangleq \max\bigl\{\, \card{\overrightarrow{P}} \mid \mathrm{subtree}_T(\overrightarrow{P}) \in \mathrm{Leaves} \,\bigr\}.
\tag{7.35}
\]

وها هو التعريف العودي:

**تعريف ٧.٦.١٤.**

- الحالة الأساسية: (\(T \in \mathrm{Leaves}\)).

\[
\mathrm{recdepth}(T) \triangleq 0.
\]

- حالة المُنشئ: (\(T \in \mathrm{Branching}\)).

\[
\mathrm{recdepth}(T) \triangleq 1 + \max\bigl\{\mathrm{recdepth}\bigl(\mathrm{left}(T)\bigr),\ \mathrm{recdepth}\bigl(\mathrm{right}(T)\bigr)\bigr\}.
\]

ومرة أخرى، يتبع مباشرةً بالاستقراء البنيوي (المسألة ٧.٤٤) أن

**لمّة ٧.٦.١٥.**

\[
\mathrm{recdepth}(T) = \mathrm{depth}(T).
\tag{7.36}
\]
