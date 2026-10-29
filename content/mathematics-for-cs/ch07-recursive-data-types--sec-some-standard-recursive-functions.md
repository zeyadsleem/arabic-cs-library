---
title: "بعض الدوال العودية القياسية"
lang: ar
source: https://courses.csail.mit.edu/6.042/spring18/mcs.pdf
---

# بعض الدوال العودية القياسية

**مثال ٧.٣.٢.** دالة العاملي (factorial). تُكتب هذه الدالة غالبًا «\(n!\)»، وستراها كثيرًا في الفصول اللاحقة. وسنستعمل هنا الترميز \(\mathrm{fac}(n)\):

- \(\mathrm{fac}(0) \triangleq 1\).
- \(\mathrm{fac}(n+1) \triangleq (n+1) \cdot \mathrm{fac}(n)\) من أجل \(n \ge 0\).

**مثال ٧.٣.٣.** ترميز المجموع. ليختصر «\(S(n)\)» التعبير «\(\sum_{i=1}^{n} f(i)\)». نستطيع أن نعرّف \(S(n)\) عوديًّا بالقاعدتين:

- \(S(0) \triangleq 0\).
- \(S(n+1) \triangleq f(n+1) + S(n)\) من أجل \(n \ge 0\).
