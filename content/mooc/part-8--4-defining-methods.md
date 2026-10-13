---
title: "تعريف الدوال (Methods)"
lang: ar
source: "https://programming-26.mooc.fi/part-8/4-defining-methods"
---

<text-box variant='learningObjectives' name="أهداف التعلم">

بعد هذا القسم

- ستعرف كيف تعمل دوال الأصناف
- ستكون قادراً على كتابة دوال جديدة في أصنافك الخاصة
- ستفهم مفاهيم التغليف (encapsulation) والعميل (client) في البرمجة كائنية التوجه

</text-box>

الأصناف التي تحتوي فقط على سمات بيانات ليست مختلفة جداً عن القواميس (dictionaries). أدناه ستجد طريقتين لنمذجة حساب بنكي، أولاً بتعريف صنف، ثم باستخدام قاموس.

```python
# مثال 1: حساب بنكي بتعريف صنف
class BankAccount:

    def __init__(self, account_number: str, owner: str, balance: float, annual_interest: float):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance
        self.annual_interest = annual_interest

peters_account = BankAccount("12345-678", "Peter Python", 1500.0, 0.015)
```

```python
# مثال 2: حساب بنكي بقاموس
peters_account = {"account_number": "12345-678", "owner": "Peter Python", "balance": 1500.0, "annual_interest": 0.015}
```

مع القاموس، التنفيذ أقصر وأكثر مباشرة. لكن مع الصنف، الهيكل أكثر "تماسكاً"، لذا يمكننا توقع أن جميع كائنات `BankAccount` متشابهة هيكلياً. الصنف أيضاً له اسم. يُشار إلى صنف `BankAccount` عند إنشاء حساب بنكي جديد، ونوع الكائن هو `BankAccount`، وليس `dict`.

ميزة مهمة أخرى للأصناف هي أنها، بالإضافة إلى البيانات، يمكن أن تحتوي على وظائف. أحد المبادئ التوجيهية للبرمجة كائنية التوجه هو أن الكائن يستخدم للوصول إلى كل من البيانات المرفقة بالكائن والوظائف لمعالجة تلك البيانات.

## الدوال في الأصناف

الدالة (method) هي برنامج فرعي أو دالة مرتبطة بصنف محدد. عادةً ما تؤثر الدالة على كائن واحد فقط. يتم تعريف الدالة داخل تعريف الصنف، ويمكنها الوصول...
