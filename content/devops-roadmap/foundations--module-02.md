---
title: "الأساسيات - جوهر DevOps"
lang: ar
source: https://devopsroadmap.io/foundations/module-02
---

# الأساسيات - جوهر DevOps

## نظرة عامة على الوحدة {#module-overview}

- تعلّم أساسيات Python وأدوات التطوير الشائعة وأساسيات Git.
- اكتسب أساسيات Linux والأدوات الشائعة ومهارات البرمجة النصية بـ Bash.
- غطِّ أساسيات Docker والحاويات.
- نفّذ المشروع العملي التدريجي HiveBox المرحلة 2.

::: {.tip title="مجالات التركيز"}
البرمجة (40%)، نظام التشغيل (40%)، الحاويات (20%)
:::

## 2.1 البرمجة - أساسيات Python {#21-code---python-fundamentals}

### الجمهور {#21-audience}

**الجمهور المستهدف:** أدوار DevOps وأدوار البرمجيات

### ما تحتاج إلى معرفته {#21-what-you-need-to-know}

- كبداية، تحتاج إلى تعلّم لغة برمجة حقيقية.
- Python بداية جيدة، وهي من أشهر لغات البرمجة اليوم.
- تعلّم الأساسيات مثل أنواع البيانات والتحكّم في التدفّق والحلقات والدوال.
- لكن الفكرة ليست مجرّد تعلّم الصياغة (syntax) بل تبنّي عقلية المطوّر أيضًا (أي لا تكتب شيفرة Python كما تكتب نصوص Bash!).
- ستُغطّى مواضيع أكثر تقدّمًا في الوحدات التالية.

::: {.tip}
إن كنت آتيًا من خلفية تطوير، يمكنك استخدام أي لغة تعرفها. ويظلّ Python أو Golang موصى بهما.
:::

### المصادر {#21-resources}

- [تعلّم Python - Codecademy](https://www.codecademy.com/learn/learn-python): تعلّم تفاعلي خطوة بخطوة لاكتساب المعرفة الأساسية بـ Python (الدورة مخصّصة لـ Python 2، لكن لا بأس).
- [مسار Python - Exercism](https://exercism.org/tracks/python): أكثر من 130 تمرينًا مجمَّعة في 16 مفهومًا من Python مع تحليل للشيفرة (أكمل `تمرين التعلّم` (Learning Exercise) فقط).

## 2.2 البرمجة - أدوات التطوير الشائعة {#22-code---common-development-tools}

### الجمهور {#22-audience}

**الجمهور المستهدف:** أدوار DevOps وأدوار البرمجيات

### ما تحتاج إلى معرفته {#22-what-you-need-to-know}

شكل توضيحي: حلقة DevOps.

- حين تكتب الشيفرة، فأنت لا تستخدم محرّر نصوص فحسب بل محرّر شيفرة (وربما بيئة تطوير متكاملة IDE أيضًا).
- أدوات التطوير ترفع الإنتاجية، وتُبسّط عملية التطوير، وترفع جودة الشيفرة.
- من الميزات الشائعة في أدوات التطوير تمييز الصياغة (syntax highlighting)، وإكمال الشيفرة، والتنقّل في الشيفرة، وتصحيح الأخطاء (debugging).
- عبر خارطة الطريق هذه، ستكتسب مزيدًا من الأدوات التي تساعدك في عملك اليومي.

### المصادر {#22-resources}

- [Visual Studio Code](https://code.visualstudio.com/): محرّر الشيفرة الرئيسي الذي سيُستخدم في خارطة الطريق هذه.
- [البدء مع Python في VS Code](https://code.visualstudio.com/docs/python/python-tutorial): كيفية استخدام VS Code كأداة تطوير لـ Python.
- [إضافة Python لـ Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-python.python): إضافة VS Code توفّر ميزات أساسية لـ Python مثل الإكمال التلقائي وفحص الصياغة، إلخ.

## 2.3 البرمجة - أساسيات Git {#23-code---git-basics}

### الجمهور {#23-audience}

**الجمهور المستهدف:** أدوار DevOps وأدوار البرمجيات

### ما تحتاج إلى معرفته {#23-what-you-need-to-know}

- حين تنشئ الشيفرة، تحتاج إلى تخزينها في مكان آمن باستخدام نظام إدارة الشيفرة المصدرية (Source Code Management, SCM).
- من أنظمة SCM المعروفة [Git](https://git-scm.com/)، وهو مستخدم على نطاق واسع الآن عبر منصّات كثيرة مثل GitHub وGitLab.
- تحتاج إلى فهم أساسيات Git مثل المستودع (repository) والفرع (branch) والسحب (pull) والدفع (push) والالتزام (commit) وغيرها، لأنك ستستخدمها كل يوم تقريبًا.
- لا يقتصر فهم Git على التطوير فقط، بل تعتمد عليه أيضًا مسارات عمل كثيرة كمصدر حقيقة وحيد (Source of Truth) مثل `GitOps` (وسيُغطّى ذلك في الوحدات التالية).

### المصادر {#23-resources}

- [Git، الدليل المبسّط](https://rogerdudler.github.io/git-guide/): دليل مرئي خطوة بخطوة للبدء مع Git.
- [ورقة مرجعية لأوامر Git](https://rogerdudler.github.io/git-guide/files/git_cheat_sheet.pdf): مرجع سريع لأوامر Git.
- [إتقان Git - Atlassian](https://www.atlassian.com/git): دليل مفصّل لـ Git مع كثير من الدروس والنصائح.

## 2.4 نظام التشغيل - أساسيات Linux {#24-operating-system---linux-fundamentals}

### الجمهور {#24-audience}

**الجمهور المستهدف:** أدوار DevOps وأدوار البرمجيات

### ما تحتاج إلى معرفته {#24-what-you-need-to-know}

- في عالم الخوادم، يسيطر Linux على السوق. لذا من الضروري تعلّم نظام Linux واستخدامه كمهندس DevOps.
- وكمهندس DevOps، من غير المرجّح أن تنجح دون معرفة جيدة بـ Linux.
- لـ Linux عائلتان رئيسيتان: Debian/Ubuntu وRed Hat/CentOS، ومن الأفضل الالتزام بإحداهما في البداية.
- ابدأ باستخدام توزيعة Linux سهلة الاستخدام مثل [Ubuntu](https://ubuntu.com/) على حاسوبك المحمول/المكتبي.
- فرغم أنه لا يزال ممكنًا للمستخدم إنجاز الكثير باستخدام الواجهة الرسومية (UI)، فإنّ `الطرفية صديقتك`!
- كنقطة بداية، تحتاج على الأقل إلى معرفة `بنية الأدلّة` (Directory Structure) و`الأذونات` (Permissions) و`عمليات سطر الأوامر` (Command Line Operations).

### المصادر {#24-resources}

- [مقدمة في Linux - LinuxFoundationX](https://www.edx.org/learn/linux/the-linux-foundation-introduction-to-linux): نقطة بداية جيدة للتعوّد على نظام Linux (روّج لهذه الدورة Linus Torvalds، مؤسّس نواة Linux).
- [مقدمة في Linux - الفصول 1-6 - freeCodeCamp](https://www.freecodecamp.org/news/introduction-to-linux/): مصدر ممتاز لتعلّم كل أساسيات Linux.

## 2.5 نظام التشغيل - الأدوات والأوامر الشائعة {#25-operating-system---common-tools-and-commands}

### الجمهور {#25-audience}

**الجمهور المستهدف:** أدوار DevOps وأدوار البرمجيات

### ما تحتاج إلى معرفته {#25-what-you-need-to-know}

- كما ذُكر، الطرفية صديقتك! تكمن قوة Linux في الطرفية، وعليك أن تعتاد عليها لأنك ستستخدمها يوميًّا.
- تعرّف على أداة الواجهة الرسومية (GUI) للنظام الذي لديك، مثل Ubuntu.
- توجد أدوات قليلة تحتاج إلى إتقانها مثل `echo` و`vim` و`grep` و`find` و`top` و`cut` و`sort` و`uniq` و`less` و`head` و`tail`.
- لست بحاجة إلى حفظ كل الأدوات أو معاملاتها (args)، فكّر فحسب "أي أداة قد تساعدني في فعل ذلك؟" ثم يمكنك دائمًا قراءة توثيقها.

### المصادر {#25-resources}

- [مقدمة في Linux - الفصل 7 - freeCodeCamp](https://www.freecodecamp.org/news/introduction-to-linux/#chapter-7-command-line-operations): يركّز هذا الفصل على عمليات سطر الأوامر وأكثر الأدوات شيوعًا.
- [أكثر من 50 أمرًا في Linux يجب أن تعرفها - DigitalOcean](https://www.digitalocean.com/community/tutorials/linux-commands): أهم أوامر Linux التي ينبغي أن يعرفها الجميع (لكن دون حفظها!).
- [20 أمرًا في Linux ينبغي أن يعرفها كل مسؤول نظام - Opensource.com](https://opensource.com/article/17/7/20-sysadmin-commands): مقال آخر عن أدوات سطر أوامر (CLI) مفيدة.

## 2.6 نظام التشغيل - أساسيات البرمجة النصية بـ Bash {#26-operating-system---bash-scripting-basics}

### الجمهور {#26-audience}

**الجمهور المستهدف:** أدوار DevOps وأدوار البرمجيات

### ما تحتاج إلى معرفته {#26-what-you-need-to-know}

- الآن تعرف عشرات من أوامر CLI الفردية، لكن Linux يتيح لك أتمتة مهام كثيرة بمجرّد ربط سلسلة من الأوامر معًا.
- في نصوص الصدفة (shell scripts) يمكنك استخدام كل أوامر CLI بالإضافة إلى صياغة مشابهة للغة برمجة من أجل شروط if والحلقات وغيرها من المساعدات.
- وحتى لو كنت تعرف لغة برمجة مثل Python، فستظلّ بحاجة إلى نصوص الصدفة وستستخدمها كثيرًا.
- توجد صدفات (shells) كثيرة، ولكل منها صياغة مختلفة قليلًا، لكن `Bash` من أكثرها شيوعًا.

### المصادر {#26-resources}

- [مسار Bash - Exercism](https://exercism.org/tracks/bash): أكثر من 90 تمرينًا بمستويات مختلفة (أكمل المهام السهلة والمتوسطة فقط).
- [درس البرمجة النصية بـ Bash – نص صدفة Linux وسطر الأوامر للمبتدئين - freeCodeCamp](https://www.freecodecamp.org/news/bash-scripting-tutorial-linux-shell-script-and-command-line-for-beginners/): دليل جيد ومنظَّم للبدء بالبرمجة النصية بـ Bash.
- [كيف تكتب نصًا بـ Bash - درس مبسّط للبرمجة النصية بـ Bash - DataCamp](https://www.datacamp.com/tutorial/how-to-write-bash-script-tutorial): دليل بدء مبسّط مع ذكاء اصطناعي مدمج لشرح الشيفرة.

## 2.7 الحاويات - أساسيات Docker {#27-containers---docker-fundamentals}

### الجمهور {#27-audience}

**الجمهور المستهدف:** أدوار DevOps وأدوار البرمجيات

### ما تحتاج إلى معرفته {#27-what-you-need-to-know}

- يمكن تتبّع ثورة الحاويات إلى تقديم Docker في عام 2013 حين ظهر Docker لأول مرة في PyCon.
- أصبح تبنّي الحاويات سائدًا منذ فترة، بل إنّ [الحاويات هي القاعدة الجديدة](https://www.cncf.io/reports/cncf-annual-survey-2022/)!
- وهذا يعني أنّ تحويل تطبيقك إلى حاوية (containerization) ليس خيارًا، بل ضرورة من اليوم الأول!
- أولًا، تحتاج إلى فهم لماذا اخترعت الحاويات وما المشكلات التي تحلّها هذه التقنية.
- وتحتاج أيضًا إلى فهم العلاقة بين الحاويات وKubernetes (وسيُغطّى ذلك في الوحدات التالية).
- لم يعد Docker الأداة الوحيدة للحاويات اليوم، لكننا سنلتزم به في خارطة الطريق هذه.
- من المهم فهم الفرق بين Dockerfile وصورة Docker (Docker image) وحاوية Docker (Docker container).

شكل توضيحي: العلاقة بين النظام والحاويات والشيفرة.

### المصادر {#27-resources}

- [دليل البدء - Docker Docs](https://docs.docker.com/get-started/): دليل البدء الرسمي لـ Docker.
- [تعلّم Docker في ساعتين - KodeKloud](https://www.youtube.com/watch?v=zJ6WbK9zFpI): دورة مكثّفة تغطّي نظرة عامة كاملة على كل أساسيات Docker.

## 2.8 الحاويات - أساسيات واجهة أوامر Docker (Docker CLI) {#28-containers---docker-cli-basics}

### الجمهور {#28-audience}

**الجمهور المستهدف:** أدوار DevOps وأدوار البرمجيات

### ما تحتاج إلى معرفته {#28-what-you-need-to-know}

- توجد واجهات رسومية (GUIs) قليلة لـ Docker، لكنك مهندس DevOps، فاعتد على واجهة أوامر Docker (Docker CLI)!
- تحتاج إلى معرفة كيفية إنشاء حاويات Docker وتشغيلها وإيقافها وحذفها من واجهة الأوامر.
- لن نغطّي Docker Compose في خارطة الطريق هذه لأنّ Kubernetes سيكون محور تركيزنا كمنصّة تنسيق (orchestration). لكن إن احتجت إلى استخدام Docker Compose، فاستخدم الإصدار V2، المدمج الآن في واجهة أوامر Docker `docker compose`.

### المصادر {#28-resources}

- [استخدام سطر أوامر Docker - Docker Docs](https://docs.docker.com/engine/reference/commandline/cli/): التوثيق الرسمي لواجهة أوامر Docker (Docker CLI). إنه مفيد ومباشر جدًّا.
- [ورقة مرجعية لسطر الأوامر - Docker Docs](https://docs.docker.com/get-started/docker_cheatsheet.pdf): ورقة مرجعية من صفحة واحدة لأوامر Docker CLI.
- [21 أمرًا أساسيًّا ينبغي أن يعرفها كل مستخدم لـ Docker - Linux Handbook](https://linuxhandbook.com/essential-docker-commands/): قائمة جيدة أخرى بأوامر Docker CLI الشائعة.

## الاختبار {#quiz}

## التطبيق العملي {#hands-on}

اتبع التعليمات في [المرحلة 2 من مشروع HiveBox](/book/devops-roadmap/projects/hivebox#phase-2).

## أسئلة المقابلات {#interview-questions}

راجع أسئلة المقابلات المتعلّقة بـ [الوحدة 2](/book/devops-roadmap/interview/common-questions#module-2).
