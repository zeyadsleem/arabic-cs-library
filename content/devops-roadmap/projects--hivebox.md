---
title: "مشروع من البداية إلى النهاية: HiveBox"
lang: ar
source: https://devopsroadmap.io/projects/hivebox
---

# مشروع من البداية إلى النهاية: HiveBox

يحبّ الجميع تقريبًا العسل، ونحن في [DevOps Hive](https://devopshive.com/) نحبّه أيضًا ونُقدّر دور النحل في كوكبنا! لأنّ [النحل أساسي للناس والكوكب](https://www.unep.org/news-and-stories/story/why-bees-are-essential-people-and-planet). ولهذا السبب، سيكون مشروعنا العملي الرئيسي في خارطة الطريق هذه من أجل النحل!

في هذا المشروع العملي المتكامل من البداية إلى النهاية، سنوظّف التقنية والبرمجيات مفتوحة المصدر لبناء واجهة برمجية (API) لتتبّع بيانات المستشعرات البيئية من [openSenseMap](https://opensensemap.org/)، وهي منصّة لبيانات المستشعرات المفتوحة يمكن للجميع المشاركة فيها.

في هذا المشروع، ستغطّي موضوعات كثيرة:

- إنتاج البرمجيات.
- التخطيط الرشيق.
- ضمان الجودة وبوابات الجودة.
- الشيفرة والبرمجة.
- نظام التشغيل.
- حاويات Docker.
- Kubernetes والسحابة.
- القابلية للملاحظة والمراقبة.
- التكامل/التسليم/النشر المستمر.
- الأتمتة والبنية التحتية كشيفرة.

::: {.tip}
إن كنت تبحث عن خارطة الطريق الكاملة، بما فيها هذا المشروع، فعُد إلى [صفحة البدء](/book/devops-roadmap/getting-started/index).
:::

---

## المقاربة

يتبع هذا المشروع العقلية الديناميكية بأسلوب MVP ذاتها المستخدمة في [خارطة الطريق](/book/devops-roadmap/getting-started/index)، والتي تهدف إلى تغطية دورة حياة تطوير البرمجيات (SDLC) كاملة. وهذا يعني أنّ كل مرحلة من مراحل هذا المشروع ستغطّي جميع جوانب مجالات DevOps، مثل التخطيط والبرمجة والحاويات والاختبار والتكامل المستمر والتسليم المستمر والبنية التحتية وغيرها.

يعمل هذا المشروع على أفضل وجه في وضع `الاقتران` (Pairing)، حيث يكون لديك شخص آخر يساعدك متى تعثّرت (مثل موجّه أو ما شابه). لكن إن لم يتوفر ذلك، فعُد دائمًا إلى `الوحدة ذات الصلة` (Related Module) حيث تجد تفاصيل أكثر قد تساعدك في المشروع.

**نصائح**

- تجنّب الصور النمطية عن نفسك! عليك أن تفكّر بطريقة مختلفة هذه المرة!
- قُلها `لا` أكثر للأمور الأخرى أثناء تنفيذ المشروع. حتى الأمور الجيدة، أي ابقَ مركّزًا!
- تذكّر أنّ الحياة كلها مقايضات! [يمكنك فعل أي شيء إن توقّفت عن محاولة فعل كل شيء](https://www.oliveremberton.com/p/you-can-do-anything-if-you-stop-trying).

::: {.note}
تُعالَج كل مرحلة من هذا المشروع تدريجيًّا كجزء من وحدات خارطة الطريق. لكنها أيضًا **مستقلّة**، ويمكنك العمل عليها إن كانت لديك المعرفة المطلوبة لكل مرحلة.
:::

::: {.warning}
تذكّر أنّ الهدف هو تنفيذ المشروع وتعلّم أفضل الممارسات الصناعية في مجال DevOps!
فمجرد تطبيق هذا المشروع دون فهم المشكلات المراد حلّها لن يساعدك على أن تصبح مهندس DevOps!
:::

## الهدف

شكل توضيحي: معمارية HiveBox. يهدف هذا المشروع إلى بناء نظام حقيقي من الشيفرة إلى البنية التحتية وكل ما بينهما، على مراحل متكرّرة.

هدف هذا المشروع هو بناء واجهة برمجية RESTful قابلة للتوسّع حول [openSenseMap](https://opensensemap.org/)، لكن مخصّصة لمساعدة مربّي النحل في أعمالهم. وينبغي أن يكون ناتج الواجهة بصيغة JSON. ستبدأ بتنفيذ أساسي ثم توسّع النظام كاملًا ليتعامل مع آلاف الطلبات في الثانية. لكن تذكّر دائمًا أنّ لكل قرار كلفة.

**Happy DevOpsing**

---

## المرحلة 1 {#phase-1}

وحدة خارطة الطريق: [مرحبًا بك في عالم DevOps](/book/devops-roadmap/foundations/module-01)

### 1.1 الانطلاق

- افهم دورك في هذا المشروع وكيف تعمل مع الفرق الأخرى (افترض أنك في فريق ولا تتصرّف كما لو كنت تعمل منفردًا!).
- راجع معلوماتك عن إدارة مشاريع البرمجيات (تلميح: [ما هي إدارة المشاريع الرشيقة؟](https://www.apm.org.uk/resources/find-a-resource/agile-project-management/)).
- حدّد منهجية أجايل التي ستستخدمها، مثل Scrum أو Kanban أو Scrumban (يُوصى بـ Kanban لهذا المشروع).
- تجنّب [تضخّم النطاق](https://www.pmi.org/learning/library/top-five-causes-scope-creep-6675)! **اجعله يعمل، ثم اجعله صحيحًا، ثم اجعله سريعًا**!
- لا تنسَ! أنت [مدير نفسك](https://handbook.gitlab.com/handbook/leadership/#managers-of-one)!

### 1.2 التحضير

- [أنشئ حساب GitHub](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github) (إن لم يكن لديك واحد)، ثم [اعمل تفريعًا (fork) لمستودع HiveBox على GitHub](https://github.com/DevOpsHiveHQ/devops-hands-on-project-hivebox/fork) وابدأ من هناك.
- [أنشئ لوحة مشروع GitHub](https://docs.github.com/en/issues/planning-and-tracking-with-projects/creating-projects/creating-a-project) لهذا المستودع (استخدم قالب `Kanban`).
- ينبغي تقديم كل مرحلة كطلب سحب (pull request) مقابل الفرع `main`. لا تدفع (push) مباشرة إلى الفرع الرئيسي!
- وثّق أثناء العمل. افترض دائمًا أنّ شخصًا آخر سيقرأ مشروعك في أي مرحلة.
- يمكنك الحصول على معرّفات senseBox من موقع [openSenseMap](https://opensensemap.org/). استخدم 3 معرّفات senseBox قريبة من بعضها (يمكنك استخدام ما يلي [5eba5fbad46fb8001b799786](https://opensensemap.org/explore/5eba5fbad46fb8001b799786) و[5c21ff8f919bf8001adf2488](https://opensensemap.org/explore/5c21ff8f919bf8001adf2488) و[5ade1acf223bd80019a1011c](https://opensensemap.org/explore/5ade1acf223bd80019a1011c)). انسخ المعرّفات فقط، فستحتاجها في الخطوات التالية.

---

## المرحلة 2 {#phase-2}

وحدة خارطة الطريق: [الأساسيات - جوهر DevOps](/book/devops-roadmap/foundations/module-02)

### 2.1 الأدوات

- Git
- VS Code
- Docker

### 2.2 الشيفرة

- نفّذ متطلّبات الشيفرة في تفريع مستودع GitHub الخاص بمشروعك (الذي أنشأته في المرحلة 1).

**المتطلّبات:**

- كإصدار أوّلي لتطبيق HiveBox، استخدم [الإصدار الدلالي](https://semver.org/) `v0.0.1`.
- أنشئ دالة تطبع إصدار التطبيق الحالي. ولا تحتاج إلا لطباعة الإصدار ثم الخروج.

### 2.3 الحاويات

- أنشئ `Dockerfile` للمشروع.
- ابنِ صورة Docker وشغّلها محليًّا.

### 2.4 الاختبار

- محليًّا، شغّل حاوية التطبيق وتأكّد من أنها تُرجع القيمة الصحيحة.
- تأكّد من توفير توثيق حول كيفية اختبار التطبيق.

---

## المرحلة 3 {#phase-3}

وحدة خارطة الطريق: [الانطلاق - إرساء القاعدة](/book/devops-roadmap/foundations/module-03)

### 3.1 الأدوات

- [Hadolint](https://github.com/hadolint/hadolint) **و** [إضافة hadolint لـ VS Code](https://marketplace.visualstudio.com/items?itemName=exiasr.hadolint)
- [Pylint](https://pypi.org/project/pylint/) **و** [إضافة Pylint لـ VS Code](https://marketplace.visualstudio.com/items?itemName=ms-python.pylint)

### 3.2 الشيفرة

- استخدم [الالتزامات التقليدية](https://www.conventionalcommits.org/en/v1.0.0/) لالتزامات Git.
- تعرّف على [واجهة openSenseMap البرمجية](https://docs.opensensemap.org/).
- نفّذ متطلّبات الشيفرة (تلميح: [البدء السريع مع Flask](https://flask.palletsprojects.com/en/2.3.x/quickstart/) أو [FastAPI](https://fastapi.tiangolo.com/tutorial/first-steps/)).
- اكتب اختبارات وحدة لجميع نقاط النهاية (endpoints).

**المتطلّبات:**

**الإصدار:**
- نقطة النهاية: `/version`
- المعاملات: بلا معاملات.
- المتطلّبات:
  - تُرجع إصدار التطبيق المنشور.

**درجة الحرارة:**
- نقطة النهاية: `/temperature`
- المعاملات: بلا معاملات.
- المتطلّبات:
  - تُرجع متوسط درجة الحرارة الحالي استنادًا إلى بيانات جميع صناديق senseBox.
  - تأكّد من أنّ البيانات لا يزيد عمرها على ساعة واحدة.

### 3.3 الحاويات

- طبّق أفضل الممارسات الخاصة بالحاويات (تلميح: [أفضل ممارسات Docker](https://tech.aabouzaid.com/2021/09/docker-best-practices-workshop-presentation.html)).

### 3.4 التكامل المستمر

- أنشئ سير عمل GitHub Actions للتكامل المستمر (CI).
- أضف خطوة لفحص الشيفرة وDockerfile.
- أضف خطوة لبناء صورة Docker.
- أضف خطوة لاختبارات الوحدة.
- أعدّ [إجراء GitHub لبطاقة تقييم OpenSSF](https://securityscorecards.dev/#using-the-github-action) وأصلح أي مشكلات يُبلغ عنها.

### 3.5 الاختبار

- في خط أنابيب CI، استدعِ نقطة النهاية `/version` وتأكّد من أنها تُرجع القيمة الصحيحة.

---

## المرحلة 4 {#phase-4}

وحدة خارطة الطريق: [التوسّع - بناء القشرة](/book/devops-roadmap/foundations/module-04)

### 4.1 الأدوات

- Kind
- Kubectl

### 4.2 الشيفرة

- نفّذ متطلّبات الشيفرة.
- اكتب اختبار تكامل (تلميح: [3 طرق لاختبار واجهتك البرمجية بلغة Python](https://opensource.com/article/21/9/unit-test-python)).

**المتطلّبات:**

**عام:**
- ينبغي أن يكون صندوق senseBox قابلًا للضبط عبر متغيّرات البيئة (env vars).

**المقاييس:**
- نقطة النهاية: `/metrics`
- المعاملات: بلا معاملات.
- المتطلّبات:
  - تُرجع مقاييس Prometheus الافتراضية الخاصة بالتطبيق.

**درجة الحرارة:**
- نقطة النهاية: `/temperature`
- المعاملات: بلا معاملات.
- المتطلّبات:
  - أضف حقل "status" استنادًا إلى قيمة متوسط درجة الحرارة.
    - أقل من 10: بارد جدًّا
    - بين 11-36: جيد
    - أكثر من 37: حار جدًّا

### 4.3 الحاويات

- أنشئ إعداد KIND ليعمل مع Ingress-Nginx.
- أنشئ ملفات Kubernetes الأساسية (manifests) لنشر التطبيق.

### 4.4 التكامل المستمر

- شغّل اختبارات تكامل الشيفرة.
- شغّل SonarQube لجودة الشيفرة والأمن والتحليل الساكن (تلميح: استخدم إجراء [فحص بوابة الجودة في SonarQube](https://github.com/marketplace/actions/sonarqube-quality-gate-check)، وفكّر أيضًا في [Semgrep](https://github.com/semgrep/semgrep)).
- شغّل Terrascan لاكتشاف حالات الضبط الخاطئ والثغرات في ملفات Kubernetes (تلميح: [إجراء Terrascan على GitHub](https://github.com/marketplace/actions/terrascan-iac-scanner)).
- طبّق أفضل الممارسات في CI (تلميح: [أفضل الممارسات عند تبنّي التكامل المستمر](https://github.com/resources/articles/devops/continuous-integration#best-practices-when-adopting-continuous-integration)).

### 4.5 التسليم المستمر

- أنشئ سير عمل GitHub Actions للتسليم المستمر (CD).
- أضف خطوة للإصدار عبر دفع صورة Docker ذات إصدار إلى سجل الحاويات (تلميح: [استخدم سجل حاويات GitHub](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)).

---

## المرحلة 5 {#phase-5}

وحدة خارطة الطريق: [التحوّل - إتمام البنية](/book/devops-roadmap/foundations/module-05)

### 5.1 الأدوات

- Kind
- Kubectl

### 5.2 الشيفرة

- نفّذ متطلّبات الشيفرة.

**المتطلّبات:**

**عام:**
- **التخزين المؤقّت (Cache):**
  - أضف طبقة تخزين مؤقّت باستخدام المشروع المتوافق مع Redis وهو [Valkey](https://github.com/valkey-io/valkey).
  - اضبط دورة التخزين المؤقّت على 5 دقائق. وأثناء كل دورة، ينبغي أن يُحدّث التطبيق الذاكرة المؤقّتة بأحدث نسخة من البيانات.
- **المخزن (Store):**
  - أضف طبقة تخزين باستخدام المشروع المتوافق مع S3 وهو [MinIO](https://min.io/).
  - اضبط دورة التخزين على 5 دقائق. وأثناء كل دورة، ينبغي أن يخزّن التطبيق نسخة أخرى من البيانات.

**درجة الحرارة:**
- نقطة النهاية: `/temperature`
- المعاملات: بلا معاملات.
- المتطلّبات:
  - ينبغي أن يقرأ التطبيق البيانات من الذاكرة المؤقّتة ما لم تكن البيانات المخزّنة مؤقّتًا قديمة، وفي هذه الحالة ينبغي أن يُحدّث الذاكرة المؤقّتة أولًا.

**التخزين المؤقّت:**
- نقطة النهاية: `/cache`
- المعاملات: بلا معاملات.
- المتطلّبات:
  - عند استدعاء نقطة النهاية هذه، ينبغي أن تُحدّث البيانات المخزّنة مؤقّتًا مباشرةً على Valkey (خارج الدورة).

**المخزن:**
- نقطة النهاية: `/store`
- المعاملات: بلا معاملات.
- المتطلّبات:
  - عند استدعاء نقطة النهاية هذه، ينبغي أن تخزّن نسخة جديدة من البيانات مباشرةً على MinIO (خارج الدورة).

**المقاييس:**
- نقطة النهاية: `/metrics`
- المعاملات: بلا معاملات.
- المتطلّبات:
  - وسّع مقاييس Prometheus بإضافة مقاييس مخصّصة استنادًا إلى منطق الشيفرة.

**Readyz:**
- نقطة النهاية: `/readyz`
- المعاملات: بلا معاملات.
- المتطلّبات:
  - تُرجع HTTP 200 إلا في الحالات التالية:
    - %50 + 1 من صناديق senseBox المضبوطة غير قابلة للوصول.
    - أو إن كان المحتوى **المخزّن مؤقّتًا** أقدم من دورتين (أي أنّ البيانات المخزّنة مؤقّتًا قديمة وأنّ شيئًا ما لا يعمل كما هو متوقّع).
    - أو إن كان المحتوى **المخزّن** أقدم من دورتين (أي أنّ البيانات المخزّنة قديمة وأنّ شيئًا ما لا يعمل كما هو متوقّع).

### 5.3 الحاويات

- أنشئ مخطط Helm للتطبيق (تلميح: [قائمة Helm الرائعة](https://github.com/cdwv/awesome-helm)).
- أنشئ ملفات Kustomize لموارد البنية التحتية مثل KeyVal (تلميح: [قائمة Kustomize الرائعة](https://github.com/DevOpsHiveHQ/awesome-kustomize)).
- راجع أفضل ممارسات أمان Kubernetes (تلميح: [أفضل ممارسات أمان Kubernetes مع نصائح لاختبار CKS](https://tech.aabouzaid.com/2022/07/kubernetes-security-best-practices-with-tips-for-the-cks-exam.html)).
- اضبط ملف تطبيق Kubernetes لاستخدام `/readyz` كمسبار الجاهزية (readiness probe).

### 5.4 البنية التحتية كشيفرة

- انشر وكيل Grafana لجمع السجلات والمقاييس (تلميح: أنشئ حساب [Grafana Cloud](https://grafana.com/products/cloud/) مجانيًا لاستخدام Loki وGrafana).
- أنشئ عنقود Kubernetes باستخدام Terraform IaC (تلميح: استخدم الطبقة المجانية من أي مزوّد سحابي أو استخدم محاكيًا محليًّا مثل [Floci](https://github.com/floci-io/floci)).

### 5.5 التكامل المستمر

- أنشئ اختبارًا من البداية إلى النهاية (تلميح: [Venom، مجموعة اختبارات تصريحية](https://github.com/ovh/venom)).
- شغّل عنقود KIND، وانشر التطبيق والبنية التحتية، ثم شغّل اختبار البداية إلى النهاية.

### 5.6 التسليم المستمر

- طبّق أفضل الممارسات في CD.

---

## المرحلة 6 {#phase-6}

وحدة خارطة الطريق: [التحسين - واصل التحسّن](/book/devops-roadmap/foundations/module-06)

هذه المرحلة عبارة عن تحسينات حرّة يحدّدها المستخدم، أي أنّ التحسينات قد تتعلّق بأي جزء من المشروع.

في ما يلي بعض الاقتراحات الموصى بها بشدّة:

- انشر التطبيق بأسلوب GitOps التصريحي باستخدام [Argo CD](https://argo-cd.readthedocs.io/en/stable/getting_started/).
- استعدّ للإنتاج بإعداد DNS ([ExternalDNS](https://kubernetes-sigs.github.io/external-dns/)) والشهادات ([Cert-Manager](https://cert-manager.io/)).
- أتمت تحديثات الاعتماديات باستخدام [Dependabot](https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide).
- انقل جميع الخدمات الخارجية (مثل Grafana.com وTerraform Cloud) إلى عنقود Kubernetes باستخدام حلول مفتوحة المصدر.

وفي ما يلي بعض الاقتراحات الإضافية:

- أعدّ [Kyverno](https://kyverno.io/) للسياسة كشيفرة (Policy as Code).
- ابنِ عناقيد Kubernetes متعدّدة البيئات (Dev وStage وProd) باستخدام Terraform وKustomize.
- استخدم [TestKube](https://testkube.io/) لتنفيذ اختبارات أفضل.
- طوّر Kubernetes Operator للتعامل مع عمليات التطبيق (تلميح: [مقدّمة إلى Kubernetes Operators](https://tech.aabouzaid.com/2020/03/introduction-to-kubernetes-operators-presentation.html)).

---

## المرحلة 7 {#phase-7}

وحدة خارطة الطريق: [مشروع التخرّج](/book/devops-roadmap/foundations/module-07)

في هذه المرحلة، ستصمّم وتنفّذ مشروعك الخاص على غرار مشروع HiveBox، لكن بفكرة وحزمة تقنيات تختارها أنت. اطّلع على صفحة [مشروع التخرّج](/book/devops-roadmap/foundations/module-07) لمزيد من التفاصيل.
