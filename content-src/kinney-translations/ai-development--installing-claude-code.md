---
title: "التثبيت والتهيئة"
---

[Claude Code](https://code.claude.com/docs/en/overview) هي أداة التطوير الوكيلية من [Anthropic](https://www.anthropic.com/). وهي تعمل في الطرفية وبيئات التطوير المتكاملة وأسطح سطح المكتب والويب وسياقات الأتمتة.

مسار التثبيت الأساسي الحالي هو المثبّت الأصلي (native installer). فلا تُعلّم npm كمسار التثبيت الافتراضي للمستخدمين الجدد.

## المثبّت الأصلي

على macOS و Linux:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

على Windows PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

يدعم المثبّت الأصلي التحديثات التلقائية وقنوات الإصدار. وهذا هو السبب الرئيسي لتفضيله على التثبيت عبر مديري الحزم عند معظم المطوّرين.

## مديرو الحزم

[Homebrew](https://brew.sh/) و[WinGet](https://learn.microsoft.com/windows/package-manager/winget/) بديلان مدعومان:

```bash
brew install --cask claude-code
```

```powershell
winget install Anthropic.ClaudeCode
```

والمقايضة هي سلوك التحديث. فتثبيت Homebrew و WinGet لا يستخدم مسار التحديث التلقائي المدمج في Claude Code، لذا يتولّى مدير الحزم مسؤولية التحديثات.

## Windows و WSL

يدعم Claude Code التثبيت الأصلي على Windows. ولا يزال Windows Subsystem for Linux مفيدًا عندما يكون المستودع وسلسلة الأدوات موجّهين إلى Linux. فاختر البيئة التي تناسب المشروع، لا البيئة التي تجعل التثبيت يبدو أقصر.

## تحقّق من الإعداد

شغّل:

```bash
claude --version
claude doctor
```

يفحص `claude doctor` مشكلات البيئة والمصادقة الشائعة. فاستخدمه قبل تشخيص فشل خاص بمستودع بعينه.

## قنوات الإصدار

يدعم Claude Code قناتَي stable و latest عبر إعدادات مثل `autoUpdatesChannel`. ولأغراض التعليم وتهيئة الفريق، فضّل stable إلا إذا كان درس ما يعتمد صراحة على ميزة جديدة من قناة latest.
