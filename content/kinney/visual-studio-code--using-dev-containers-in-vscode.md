---
title: "إعداد حاوية تطوير (Dev Container)"
lang: ar
source: "https://stevekinney.com/courses/visual-studio-code/using-dev-containers-in-vscode"
---

بعد أن فهمنا «لماذا»، لننتقل إلى الجانب العملي ونتعلّم «كيف» نُهيّئ حاويات التطوير (Dev Containers) في Visual Studio Code.

## التثبيت والمتطلّبات المسبقة

قبل أن تبدأ رحلتك مع حاوية التطوير، تأكّد من توفّر المتطلّبات التالية:

### Docker

- **Docker Desktop (موصى به):** على Windows و macOS، يُعدّ Docker Desktop أسهل طريقة لتشغيل Docker. نزّله وثبّته من [https://www.docker.com/products/docker-desktop](https://www.google.com/url?sa=E&source=gmail&q=https://www.docker.com/products/docker-desktop&authuser=1).
- **Docker Engine (Linux):** لتوزيعات Linux، اتبع تعليمات التثبيت الخاصة بتوزيعتك من [https://docs.docker.com/engine/install/](https://www.google.com/url?sa=E&source=gmail&q=https://docs.docker.com/engine/install/&authuser=1).
- **التحقّق من تثبيت Docker:** بعد التثبيت، افتح الطرفية ونفّذ `docker --version` و`docker compose version`. ينبغي أن ترى الإصدارات المثبَّتة مطبوعة. تأكّد من أن Docker يعمل في الخلفية.

#### ملاحظات حول إعداد Docker

- **تخصيص الموارد (Docker Desktop):** تستهلك حاويات Docker موارد النظام. للحصول على أفضل أداء، وخصوصًا مع الحاويات المعقّدة، فكّر في زيادة الموارد المخصّصة لـ Docker Desktop. يمكنك ضبط المعالج والذاكرة ومساحة القرص من إعدادات Docker Desktop.
- **مشاركة الملفات (Docker Desktop على Windows):** تأكّد من مشاركة القرص الذي يحتوي على مجلّد مشروعك مع Docker Desktop. يحدث هذا عادةً أثناء تثبيت Docker Desktop أو عبر إعداداته. يتيح ذلك للحاويات الوصول إلى ملفات مشروعك.

### إضافة Remote - Containers

- افتح Visual Studio Code.
- انتقل إلى عرض الإضافات (Ctrl+Shift+X أو Cmd+Shift+X).
- ابحث عن «Remote - Containers» من Microsoft.
- انقر «Install» لتثبيت الإضافة.

## إنشاء حاوية تطوير

بعد توفير المتطلّبات المسبقة، لنُنشئ أول حاوية تطوير لدينا. قلب حاويات التطوير هو ملف `devcontainer.json`. هذا الملف، الموضوع في مجلّد `.devcontainer` في جذر مشروعك، يعرّف بيئة التطوير المعبّأة داخل حاوية.

1. **افتح مجلّد مشروعك في Visual Studio Code:** افتح المجلّد الجذري لمشروعك في Visual Studio Code. إن لم يكن لديك مشروع بعد، فأنشئ مجلّدًا فارغًا.
2. **افتح لوحة الأوامر:** اضغط Ctrl+Shift+P (أو Cmd+Shift+P على macOS) لفتح لوحة أوامر Visual Studio Code.
3. **ابحث عن «Dev Containers»:** اكتب «Dev Containers» واختر «Dev Containers: Add Dev Container Configuration Files…«.

## اختر تعريف حاوية جاهزًا أو أنشئ من الصفر

- **تعريف جاهز (موصى به للمبتدئين):** يقدّم Visual Studio Code قائمة بتعريفات جاهزة لحاويات التطوير للغات والأطر الشائعة (مثل Node.js وPython و.NET وGo وJava). اختر تعريفًا يطابق حزمة تقنيات مشروعك عن قرب.
- **الإنشاء من «حاوية فارغة»:** إن لم يناسبك أي تعريف جاهز، فاختر «From ‘Empty Container’«. سيُنشئ هذا ملف `devcontainer.json` أساسيًا يمكنك تخصيصه من الصفر.
- **استخدام «Dockerfile»:** إن كان لديك بالفعل ملف Dockerfile لمشروعك أو أردت تحكّمًا كاملًا، فاختر «From Dockerfile». سيُنشئ هذا ملف `devcontainer.json` يشير إلى ملف Dockerfile الموجود لديك.

1. **خصّص `devcontainer.json` (عند الحاجة):** بعد اختيار تعريف، سيُنشئ Visual Studio Code مجلّد `.devcontainer` ويضع ملف `devcontainer.json` داخله. افتح `devcontainer.json` لمراجعة خصائصه وتخصيصها.

### الخصائص الرئيسية في `devcontainer.json`

خاصية **`image`:** تحدّد هذه الخاصية **صورة Docker** التي ستُستخدم أساسًا لحاوية التطوير الخاصة بك.

- **مثال:** `"image": "mcr.microsoft.com/devcontainers/javascript-node:18"` (يستخدم صورة Node.js 18 مبنية مسبقًا من سجل Dev Containers التابع لـ Microsoft).
- **الاستخدام:** يمكنك استخدام صور مبنية مسبقًا من سجلات عامة (مثل Docker Hub و[mcr.microsoft.com](https://www.google.com/search?q=mcr.microsoft.com&authuser=1))، أو صورك المخصّصة. الصور المبنية مسبقًا ملائمة للبيئات الشائعة، بينما توفّر الصور المخصّصة تحكّمًا أكبر وإعدادًا مسبقًا.
- **`dockerFile`:** بدلًا من `image`، يمكنك استخدام `dockerFile` لتحديد مسار **Dockerfile** داخل مشروعك.
- **مثال:** `"dockerFile": "Dockerfile"` (يفترض وجود ملف باسم `Dockerfile` في مجلّد `.devcontainer` نفسه).
- **الاستخدام:** استخدم `dockerFile` عندما تحتاج إلى تخصيص بيئة الحاوية على نطاق واسع بما يتجاوز ما تقدّمه الصور المبنية مسبقًا. تتيح لك ملفات Dockerfile تعريف كل جانب من جوانب صورة الحاوية.

#### `context`

عند استخدام `dockerFile`، تحدّد هذه الخاصية الاختيارية **سياق البناء** لعملية بناء Docker. تكون افتراضيًا في المجلّد نفسه الذي يضمّ `dockerFile`. يمكنك تغييرها عند الحاجة.

#### الإضافات (extensions)

خاصية `extensions` هي **مصفوفة من معرّفات إضافات Visual Studio Code** التي ينبغي تثبيتها تلقائيًا *داخل* حاوية التطوير عند تشغيلها.

```json
"extensions": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode"
]
```

يضمن هذا أن يحصل كل من يستخدم حاوية التطوير على المجموعة نفسها من الإضافات. تجد معرّفات الإضافات في رابط Visual Studio Code Marketplace، أو بالنقر بالزر الأيمن على إضافة في عرض الإضافات واختيار «Copy Extension ID».

#### الإعدادات (settings)

خاصية `settings` هذه هي **كائن JSON** يتيح لك تعريف إعدادات Visual Studio Code التي ستُطبَّق *داخل* حاوية التطوير.

```json
"settings": {
    "terminal.integrated.shell.linux": "/bin/bash",
    "editor.formatOnSave": true
}
```

#### إعادة توجيه المنافذ (Port Fowarding)

خاصية `forwardPorts` هي **مصفوفة منافذ** تريد إعادة توجيهها من الحاوية إلى جهازك المضيف.

على سبيل المثال، `"forwardPorts": [3000, 8080, 5432]` (يعيد توجيه المنافذ 3000 و8080 و5432 من الحاوية إلى مضيفك).

إن كان تطبيقك على الويب يعمل على المنفذ 3000 داخل الحاوية، فإن إعادة توجيه المنفذ 3000 تتيح لك الوصول إليه على `http://localhost:3000` في متصفّح جهازك المضيف.

#### إعدادات أخرى متنوّعة

**`workspaceFolder`:** يحدّد المسار *داخل الحاوية* حيث سيُركَّب مجلّد مشروعك. القيمة الافتراضية هي `/workspace`. لا تحتاج عادةً إلى تغيير هذا.

**`postCreateCommand`:** تتيح لك هذه الخاصية تنفيذ أوامر صدفة (shell) **مرة واحدة بعد إنشاء الحاوية وتشغيلها للمرة الأولى.**

- **مثال:** `"postCreateCommand": "npm install"` (ينفّذ `npm install` بعد إنشاء الحاوية لتثبيت اعتمادات المشروع).
- **الاستخدام:** استخدم هذا لتثبيت اعتمادات خاصة بالمشروع، أو تهيئة قواعد البيانات، أو تنفيذ مهام إعداد أخرى ينبغي أن تعمل مرة واحدة فقط.

**`postStartCommand`:** يشبه `postCreateCommand`، لكن هذا الأمر يعمل **في كل مرة تبدأ فيها حاوية التطوير.** استخدمه بحذر لأن التنفيذ المتكرّر قد يؤثّر في زمن بدء التشغيل. يُستخدم غالبًا لتشغيل خدمات خلفية أو برامج خفية (daemons) تحتاجها بيئة التطوير.

**`remoteUser`:** يحدّد المستخدم الذي تتصل به داخل الحاوية. القيمة الافتراضية هي المستخدم المستخدَم عند بناء الصورة أو تعليمة `USER` في ملف Dockerfile. قد تحتاج إلى تغييره إن كنت بحاجة إلى سياق مستخدم محدّد.

## مثال

```json
{
  "name": "Node.js Development Container",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:18",
  "extensions": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode", "ms-vscode.js-debug-nodejs"],
  "settings": {
    "terminal.integrated.shell.linux": "/bin/bash",
    "editor.formatOnSave": true,
    "eslint.alwaysShowStatus": true
  },
  "forwardPorts": [3000],
  "postCreateCommand": "npm install"
}
```
