---
title: "حاويات التطوير الجاهزة في Visual Studio Code"
lang: ar
source: "https://stevekinney.com/courses/visual-studio-code/prebuilt-dev-containers-in-vscode"
---

يوفّر Visual Studio Code والمجتمع مجموعة غنية من تعريفات حاويات التطوير الجاهزة. وهي مفيدة للغاية للإعداد السريع لبيئات تطوير شائعة دون كتابة `devcontainer.json` من الصفر.

## الوصول إلى التعريفات الجاهزة

عندما تستخدم الأمر “Dev Containers: Add Dev Container Configuration Files…“، سيعرض عليك Visual Studio Code قائمة من التعريفات المعرّفة مسبقًا. ويُجلب ذلك من [مستودع vscode-dev-containers على GitHub](https://github.com/devcontainers/templates).

**مثال: استخدام تعريف Python جاهز:**

1. افتح مجلد مشروعك في Visual Studio Code.
2. افتح لوحة الأوامر واختر “Dev Containers: Add Dev Container Configuration Files…“.
3. اختر “Python 3”.
4. يُنشئ Visual Studio Code مجلد `.devcontainer` يضمّ ملف `devcontainer.json` مهيّأً مسبقًا لتطوير Python.
5. افتح المجلد في حاوية تطوير (كما هو موضّح في القسم التالي).

**تخصيص التعريفات الجاهزة:**

التعريفات الجاهزة نقاط انطلاق ممتازة. ويمكنك تخصيصها أكثر بتعديل ملف `devcontainer.json` المُولَّد — بإضافة مزيد من الإضافات، وتخصيص الإعدادات، وتحويل المنافذ، وإضافة `postCreateCommand`، وغير ذلك، لتفصيل البيئة على مقاس احتياجات مشروعك.

## العمل مع حاويات التطوير: سير عمل تطويرك اليومي

ما إن تُعدّ حاوية تطوير، لنستكشف كيف تعمل معها بفاعلية.

### فتح مجلد في حاوية: الاتصال ببيئتك

ما إن يصبح لديك مجلد `.devcontainer` في مشروعك، حتى يتعرّف عليه Visual Studio Code ويعرض عليك خيارات للعمل داخل حاوية التطوير.

**فتح مجلد في حاوية تطوير:**

- **الخيار 1 (مُوصى به): Reopen in Container** افتح مجلد مشروعك في Visual Studio Code (والملف يشمل مجلد `.devcontainer`). ويكتشف Visual Studio Code إعداد حاوية التطوير ويعرض إشعارًا: “Dev Container: Folder contains a Dev Container configuration file.” فانقر “Reopen in Container.” وسيبني Visual Studio Code حاوية التطوير (عند الحاجة) ويشغّلها. وما إن تصبح جاهزة، يعيد التحميل ويعرض “(Dev Container)” في أسفل اليسار.
  1. افتح مجلد مشروعك في Visual Studio Code (والمجلد يضمّ مجلد `.devcontainer`).
  2. يكتشف Visual Studio Code إعداد حاوية التطوير ويعرض إشعارًا: “Dev Container: Folder contains a Dev Container configuration file.”
  3. انقر “Reopen in Container.”
  4. سيبني Visual Studio Code حاوية التطوير (عند الحاجة) ويشغّلها. وما إن تصبح جاهزة، يعيد التحميل ويعرض “(Dev Container)” في أسفل اليسار.
- **الخيار 2: لوحة الأوامر — “Dev Containers: Reopen in Container”** افتح مجلد مشروعك. وافتح لوحة الأوامر واختر “Dev Containers: Reopen in Container.” ثم اتبع العملية نفسها كما في الخيار 1.
  1. افتح مجلد مشروعك.
  2. افتح لوحة الأوامر واختر “Dev Containers: Reopen in Container.”
  3. اتبع العملية نفسها كما في الخيار 1.
- **الخيار 3: Remote Explorer (اختياري)** يعرض أيضًا عرض Remote Explorer (المتاح عبر أيقونة Remote في شريط النشاط) حاويات التطوير المتاحة. لكن “Reopen in Container” أكثر مباشرة عمومًا.

**ماذا يحدث عندما تختار “Reopen in Container”؟**

- **بناء الحاوية (عند الحاجة):**
يُطلق Visual Studio Code عملية بناء Docker إذا كانت الصورة المحدّدة (أو Dockerfile) بحاجة إلى بناء. وتظهر سجلات البناء في لوحة Output، وتكون عمليات إعادة الفتح اللاحقة أسرع بفضل التخزين المؤقت في Docker.
- **بدء الحاوية:**
يبدأ Docker تشغيل الحاوية وفقًا للإعدادات.
- **اتصال Visual Studio Code:**
يتّصل Visual Studio Code بالحاوية قيد التشغيل.
- **تثبيت مساحة العمل:**
يُثبَّت مجلد مشروعك بـ**ربط مباشر** (bind mount) في الحاوية عند `workspaceFolder` (والافتراضي `/workspace`)، بما يضمن تزامن التغييرات بين المضيف والحاوية.
- **تثبيت الإضافات (داخل الحاوية):**
تُثبَّت الإضافات المدرَجة في `devcontainer.json` تلقائيًا داخل الحاوية.
- **تطبيق الإعدادات (داخل الحاوية):**
تُطبَّق الإعدادات المعرّفة في `devcontainer.json` داخل بيئة الحاوية.

### بناء الحاويات وإعادة بنائها: تحديث بيئتك

تحتاج أحيانًا إلى تعديل إعدادات حاوية التطوير. وفي هذه الحالات، أعد بناء الحاوية.

**بناء حاوية تطوير أو إعادة بنائها:**

- **الخيار 1: لوحة الأوامر — “Dev Containers: Rebuild Container”** تأكّد من أنك متّصل بحاوية التطوير. وافتح لوحة الأوامر واختر “Dev Containers: Rebuild Container.” فيعيد Visual Studio Code بناء صورة الحاوية استنادًا إلى Dockerfile المحدَّث أو مواصفة الصورة، ثم يعيد تشغيل الحاوية.
  1. تأكّد من أنك متّصل بحاوية التطوير.
  2. افتح لوحة الأوامر واختر “Dev Containers: Rebuild Container.”
  3. يعيد Visual Studio Code بناء صورة الحاوية استنادًا إلى Dockerfile المحدَّث أو مواصفة الصورة، ثم يعيد تشغيل الحاوية.
- **الخيار 2: لوحة الأوامر — “Dev Containers: Rebuild and Reopen in Container”** يشبه الخيار السابق، لكنه يعيد فتح مشروعك تلقائيًا في الحاوية المُعاد بناؤها حديثًا.
  1. يشبه الخيار السابق، لكنه يعيد فتح مشروعك تلقائيًا في الحاوية المُعاد بناؤها حديثًا.
- **متى تعيد البناء:** تغييرات في `Dockerfile` (إضافة برمجيات، أو تحديث اعتمادات، أو تغيير الصورة الأساسية). وتغييرات في `devcontainer.json` (الانتقال إلى صورة أساسية مختلفة أو Dockerfile مختلف). وتحديثات البرمجيات يدويًا داخل الحاوية (مع أن الأفضل تعريفها في Dockerfile).
  - تغييرات في `Dockerfile` (إضافة برمجيات، أو تحديث اعتمادات، أو تغيير الصورة الأساسية).
  - تغييرات في `devcontainer.json` (الانتقال إلى صورة أساسية مختلفة أو Dockerfile مختلف).
  - تحديثات البرمجيات يدويًا داخل الحاوية (مع أن الأفضل تعريفها في Dockerfile).

### الوصول إلى الطرفية: بوابتك إلى الحاوية

تعمل الطرفية المدمجة في Visual Studio Code *داخل* حاوية التطوير.

**الوصول إلى طرفية حاوية التطوير:**

- **الخيار 1: الطرفية المدمجة في Visual Studio Code** تأكّد من أنك متّصل بحاوية التطوير. وافتح الطرفية المدمجة (Ctrl+` أو Cmd+`). ويُظهر لك موجّه الطرفية أنك داخل الحاوية (باستخدام الأوامر المهيّأة في صورة حاويتك أو في `devcontainer.json`).
  1. تأكّد من أنك متّصل بحاوية التطوير.
  2. افتح الطرفية المدمجة (Ctrl+` أو Cmd+`).
  3. يوضّح لك موجّه الطرفية أنك داخل الحاوية (باستخدام الطرفية المهيّأة في صورة حاويتك أو في `devcontainer.json`).

**الاستخدام:**

- **تنفيذ الأوامر:** شغّل أوامر مثل سكربتات البناء، أو الاختبارات، أو إدارة الاعتمادات مباشرة داخل الحاوية.
- **تثبيت برمجيات مؤقّت:** ثبّت حزمًا (عبر apt أو npm أو pip أو غيرها) عند الحاجة، لكن التغييرات لن تستمر بعد إعادة التشغيل ما لم تُضَف إلى Dockerfile.
- **التنقيح وحلّ المشكلات:** استخدم الطرفية لفحص السجلات وتشخيص مشكلات الحاوية.

### تثبيت الإضافات: تعزيز بيئة تطويرك المحوَسة

تتيح لك حاويات التطوير تثبيت إضافات Visual Studio Code مباشرة داخل الحاوية.

**تثبيت الإضافات داخل حاوية التطوير:**

- **التثبيت التلقائي:**
أدرج الإضافات الأساسية في خاصية `extensions` في `devcontainer.json` لتُثبَّت تلقائيًا عند بدء الحاوية.
- **التثبيت اليدوي:** تأكّد من أنك متّصل بحاوية التطوير. وافتح عرض Extensions (`Ctrl+Shift+X` أو `Cmd+Shift+X`). وابحث عن قسم “Dev Container: [Container Name] - Installed” وثبّت الإضافات هناك.
  1. تأكّد من أنك متّصل بحاوية التطوير.
  2. افتح عرض Extensions (`Ctrl+Shift+X` أو `Cmd+Shift+X`).
  3. ابحث عن قسم “Dev Container: [Container Name] - Installed” وثبّت الإضافات هناك.

**الفوائد:**

- تضمن الاتساق بين أعضاء الفريق.
- تقلّل الفوضى على جهازك المضيف.
- تتيح إعدادات خاصة بكل مشروع.

### مشاركة مساحات العمل: تطوير محوَس تعاوني

تضمن مشاركة إعداد حاوية التطوير عبر التحكّم في الإصدارات أن يستخدم كل عضو في الفريق البيئة نفسها.

**كيف تشارك:**

- **التحكّم في الإصدارات:**
أودِع مجلد `.devcontainer` (بما يشمل `devcontainer.json` واختياريًا `Dockerfile` أو `docker-compose.yml`) في Git.
- **استنساخ الفريق:**
عندما يستنسخ أعضاء الفريق المستودع ويفتحونه في Visual Studio Code مع إضافة Remote - Containers، سيُطلب منهم “Reopen in Container” وسيحصلون على البيئة نفسها.

**الفوائد:**

- الاتساق بين أعضاء الفريق.
- سجل إصدارات لتغييرات الإعدادات.
- تهيئة مبسّطة لأعضاء الفريق الجدد.

## تخصيص حاويات التطوير: تفصيل بيئتك على مقاسك

توفّر حاويات التطوير خيارات تخصيص واسعة.

### ملفات Dockerfile: تحكّم دقيق

للتخصيص المتقدّم، استخدم Dockerfile.

**استخدام ملفات Dockerfile:**

1. أنشئ `Dockerfile` داخل مجلد `.devcontainer`.
2. في `devcontainer.json`، استبدل خاصية `image` بـ`dockerFile` وحدّد مسار Dockerfile: <code><span class="line"><span>{</span></span>
<span class="line"><span> "dockerFile"</span><span>: </span><span>"</span><span>Dockerfile</span><span>"</span></span>
<span class="line"><span>}</span></span></code> استخدم مسارًا نسبيًا إذا لم يكن Dockerfile في المجلد نفسه.

**أمثلة:**

- **تثبيت برمجيات:** <code><span class="line"><span>FROM</span><span> mcr.microsoft.com/devcontainers/javascript-node:18</span></span>
<span class="line"><span>RUN</span><span> apt-get update && apt-get install -y --no-install-recommends \</span></span>
<span class="line"><span> graphicsmagick</span></span></code>
- **ضبط الإعدادات:** <code><span class="line"><span>FROM</span><span> mcr.microsoft.com/devcontainers/python:3.10</span></span>
<span class="line"><span>RUN</span><span> echo </span><span>"en_US.UTF-8 UTF-8"</span><span> >> /etc/locale.gen && locale-gen</span></span>
<span class="line"><span>ENV</span><span> LANG en_US.UTF-8</span></span>
<span class="line"><span>ENV</span><span> LANGUAGE en_US:en</span></span>
<span class="line"><span>ENV</span><span> LC_ALL en_US.UTF-8</span></span></code>
- **إعداد الخدمات:** <code><span class="line"><span>FROM</span><span> mcr.microsoft.com/devcontainers/go:1.20</span></span>
<span class="line"><span>RUN</span><span> apt-get update && apt-get install -y --no-install-recommends \</span></span>
<span class="line"><span> postgresql-client</span></span></code>

**أفضل الممارسات:**

- استخدم صورة أساسية موثوقة.
- حسّن الطبقات من أجل التخزين المؤقت.
- أبقِ Dockerfile بسيطًا.
- ثبّت إصدارات الاعتمادات لضمان قابلية إعادة الإنتاج.

### ملفات dotfiles: تخصيص بيئتك

ثبّت ملفات dotfiles من مضيفك لتخصيص حاويتك.

**استخدام ملفات dotfiles:**

1. أضف خاصية `dotfiles` في `devcontainer.json`: <code><span class="line"><span>{</span></span>
<span class="line"><span> "dotfiles"</span><span>: {</span></span>
<span class="line"><span> "repository"</span><span>: </span><span>"</span><span>https://github.com/your-username/dotfiles</span><span>"</span><span>,</span></span>
<span class="line"><span> "targetPath"</span><span>: </span><span>"</span><span>~</span><span>"</span><span>,</span></span>
<span class="line"><span> "installCommand"</span><span>: </span><span>"</span><span>install.sh</span><span>"</span></span>
<span class="line"><span> }</span></span>
<span class="line"><span>}</span></span></code> **repository:** عنوان URL لمستودع dotfiles لديك. و**targetPath:** المسار داخل الحاوية (والافتراضي `~`). و**installCommand:** سكربت يُنفَّذ بعد الاستنساخ.
  - **repository:** عنوان URL لمستودع dotfiles لديك.
  - **targetPath:** المسار داخل الحاوية (والافتراضي `~`).
  - **installCommand:** سكربت يُنفَّذ بعد الاستنساخ.
2. نظّم مستودع dotfiles لديك بملفات مثل `.bashrc` و`.gitconfig` وسكربت `install.sh`: <code>dotfiles-repository/
├── .bashrc
├── .gitconfig
├── .vimrc
└── install.sh</code>
3. **مثال على `install.sh`:** <code><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span>ln</span><span> -sf</span><span> "</span><span>$DOTFILES_REPOSITORY</span><span>/.bashrc</span><span>"</span><span> "</span><span>$HOME</span><span>/.bashrc</span><span>"</span></span>
<span class="line"><span>ln</span><span> -sf</span><span> "</span><span>$DOTFILES_REPOSITORY</span><span>/.gitconfig</span><span>"</span><span> "</span><span>$HOME</span><span>/.gitconfig</span><span>"</span></span>
<span class="line"><span>ln</span><span> -sf</span><span> "</span><span>$DOTFILES_REPOSITORY</span><span>/.vimrc</span><span>"</span><span> "</span><span>$HOME</span><span>/.vimrc</span><span>"</span></span>
<span class="line"><span>echo</span><span> "</span><span>Dotfiles installation complete!</span><span>"</span></span></code>

**الفوائد:**

- تخصّص بيئة الحاوية.
- تضمن الاتساق بين الأنظمة.
- تُخضع إعداداتك للتحكّم في الإصدارات.
- تمكّن قابلية النقل.

### قدرات متقدّمة

**عمليات التثبيت المباشر (Bind Mounts):**

- ثبّت أدلة المضيف داخل الحاوية.
- عرّفها في `devcontainer.json` باستخدام خاصية `mounts`: <code><span class="line"><span>{</span></span>
<span class="line"><span> "mounts"</span><span>: [</span></span>
<span class="line"><span> "</span><span>source=${localWorkspaceFolder}/data,target=/container/data,type=bind,consistency=cached</span><span>"</span></span>
<span class="line"><span> ]</span></span>
<span class="line"><span>}</span></span></code> **source:** مسار المضيف. و**target:** مسار الحاوية. و**type:** يُضبط على `bind`. و**consistency:** اختياري (مثل `cached`).
  - **source:** مسار المضيف.
  - **target:** مسار الحاوية.
  - **type:** يُضبط على `bind`.
  - **consistency:** اختياري (مثل `cached`).

**تحويل المنافذ:**

- استخدم خاصية `forwardPorts` لتحويل منافذ الحاوية إلى المضيف.
- يمكن لـ Visual Studio Code أن يكتشف المنافذ المحوَّلة تلقائيًا ويعرض تحويلها.

**Docker Compose:**

- عرّف بيئات متعدّدة الحاويات بملف `docker-compose.yml`.
- عدّل `devcontainer.json` لاستخدام `dockerComposeFile`، وحدّد `service` و`workspaceFolder`: <code><span class="line"><span>{</span></span>
<span class="line"><span> "dockerComposeFile"</span><span>: </span><span>"</span><span>docker-compose.yml</span><span>"</span><span>,</span></span>
<span class="line"><span> "service"</span><span>: </span><span>"</span><span>app</span><span>"</span><span>,</span></span>
<span class="line"><span> "workspaceFolder"</span><span>: </span><span>"</span><span>/app</span><span>"</span></span>
<span class="line"><span>}</span></span></code>
- **مثال على `docker-compose.yml`:** <code><span class="line"><span>version</span><span>: </span><span>'</span><span>3.8</span><span>'</span></span>
<span class="line"><span>services</span><span>:</span></span>
<span class="line"><span> app</span><span>:</span></span>
<span class="line"><span> build</span><span>:</span></span>
<span class="line"><span> context</span><span>: </span><span>./app</span></span>
<span class="line"><span> dockerfile</span><span>: </span><span>Dockerfile</span></span>
<span class="line"><span> ports</span><span>:</span></span>
<span class="line"><span> - </span><span>'</span><span>3000:3000</span><span>'</span></span>
<span class="line"><span> volumes</span><span>:</span></span>
<span class="line"><span> - </span><span>./app:/app</span></span>
<span class="line"><span> db</span><span>:</span></span>
<span class="line"><span> image</span><span>: </span><span>postgres:14</span></span>
<span class="line"><span> environment</span><span>:</span></span>
<span class="line"><span> POSTGRES_USER</span><span>: </span><span>devuser</span></span>
<span class="line"><span> POSTGRES_PASSWORD</span><span>: </span><span>devpassword</span></span>
<span class="line"><span> ports</span><span>:</span></span>
<span class="line"><span> - </span><span>'</span><span>5432:5432</span><span>'</span></span>
<span class="line"><span> volumes</span><span>:</span></span>
<span class="line"><span> - </span><span>db_data:/var/lib/postgresql/data</span></span>
<span class="line"><span>volumes</span><span>:</span></span>
<span class="line"><span> db_data</span><span>:</span></span></code>

**التكامل مع GitHub Codespaces:**

- إذا كان المشروع يضمّ مجلد `.devcontainer`، فيستخدمه Codespaces لإنشاء بيئة سحابية.
- **الفوائد:** وصول سحابي، وبيئات مهيّأة مسبقًا، وانتقالات سلسة من المحلي إلى السحابة.

## حلّ المشكلات وأفضل الممارسات

### مشكلات شائعة

- **أخطاء بناء الحاوية:** راجع سجلات البناء. وافحص صيغة Dockerfile، والشبكة، وحدود الموارد، وحدود المعدّل (rate limits). وأعد البناء بذاكرة مؤقتة نظيفة عند الحاجة.
  - راجع سجلات البناء.
  - افحص صيغة Dockerfile، والشبكة، وحدود الموارد، وحدود المعدّل.
  - أعد البناء بذاكرة مؤقتة نظيفة عند الحاجة.
- **فشل بدء الحاوية:** افحص سجلات الحاوية. وتحقّق من تخصيص الموارد وتعارضات المنافذ. وافحص مشكلات Dockerfile أو الصورة.
  - افحص سجلات الحاوية.
  - تحقّق من تخصيص الموارد وتعارضات المنافذ.
  - افحص مشكلات Dockerfile أو الصورة.
- **مشكلات تثبيت الإضافات:** تأكّد من اتصال الحاوية بالإنترنت. وتحقّق من توافق الإضافات. وأعد تشغيل Visual Studio Code أو أعد تحميل الحاوية.
  - تأكّد من اتصال الحاوية بالإنترنت.
  - تحقّق من توافق الإضافات.
  - أعد تشغيل Visual Studio Code أو أعد تحميل الحاوية.
- **مشكلات الأداء:** زد موارد Docker Desktop. وحسّن طبقات Dockerfile وحجم الصورة الأساسية. وفكّر في استخدام وحدات تخزين Docker بدلًا من عمليات التثبيت المباشر. وقلّل الإضافات المثبّتة.
  - زد موارد Docker Desktop.
  - حسّن طبقات Dockerfile وحجم الصورة الأساسية.
  - فكّر في استخدام وحدات تخزين Docker بدلًا من عمليات التثبيت المباشر.
  - قلّل الإضافات المثبّتة.

### تحسين الأداء

- خصّص موارد CPU وذاكرة كافية في Docker Desktop.
- حسّن ملفات Dockerfile من أجل التخزين المؤقت وتقليل حجم الصورة.
- استخدم وحدات تخزين Docker حيث يكون ذلك مفيدًا.
- ثبّت الإضافات الأساسية فقط.
- قلّل العمليات الخلفية.
- اختر صورًا أساسية فعّالة.
- اضبط التخزين المؤقت في Visual Studio Code على النحو الأمثل.

### اعتبارات أمنية {#security-considerations}

- **أمن صورة الحاوية:** استخدم صورًا أساسية موثوقة وافحصها بحثًا عن الثغرات. وقلّل حجم الصورة. وحدّث الصور والاعتمادات بانتظام.
  - استخدم صورًا أساسية موثوقة وافحصها بحثًا عن الثغرات.
  - قلّل حجم الصورة.
  - حدّث الصور والاعتمادات بانتظام.
- **أمن الشبكة:** حوّل المنافذ الضرورية فقط. وافهم شبكات الحاويات. وأدر الأسرار بأمان (باستخدام متغيّرات البيئة).
  - حوّل المنافذ الضرورية فقط.
  - افهم شبكات الحاويات.
  - أدر الأسرار بأمان (باستخدام متغيّرات البيئة).
- **الوصول إلى المضيف:** اتبع مبادئ الامتياز الأقل لعمليات التثبيت المباشر. واستخدم عمليات تثبيت للقراءة فقط عند الإمكان.
  - اتبع مبادئ الامتياز الأقل لعمليات التثبيت المباشر.
  - استخدم عمليات تثبيت للقراءة فقط عند الإمكان.
- **أذونات المستخدم:** شغّل الحاويات بوصفك مستخدمًا غير جذر. وفكّر في استخدام نطاقات مستخدمي Docker لعزل إضافي.
  - شغّل الحاويات بوصفك مستخدمًا غير جذر.
  - فكّر في استخدام نطاقات مستخدمي Docker لعزل إضافي.

## أمثلة واقعية: حاويات التطوير في العمل

### بيئة تطوير Node.js

إعداد بيئة Node.js بحزم npm وإعدادات محدّدة لتطبيق ويب.

`devcontainer.json`:

```json
{
  "name": "Node.js Web App",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:18",
  "extensions": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode", "ms-vscode.js-debug-nodejs"],
  "settings": {
    "terminal.integrated.shell.linux": "/bin/bash",
    "editor.formatOnSave": true
  },
  "forwardPorts": [3000],
  "postCreateCommand": "npm install"
}
```

- يستخدم صورة Node.js 18.
- يثبّت ESLint وPrettier ومُنقّحًا.
- يضبط الطرفية على bash مع تمكين التنسيق عند الحفظ.
- يحوّل المنفذ 3000.
- يشغّل `npm install` بعد إنشاء الحاوية.
