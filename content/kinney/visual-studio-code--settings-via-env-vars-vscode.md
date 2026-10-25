---
title: "التحكّم في الإعدادات بمتغيّرات البيئة"
lang: ar
source: "https://stevekinney.com/courses/visual-studio-code/settings-via-env-vars-vscode"
---

تتيح لك متغيّرات البيئة ضبط إعدادات Visual Studio Code ديناميكيًا بناءً على بيئة نظامك. ويفيد ذلك في تكييف الإعدادات مع أنظمة تشغيل مختلفة، أو مراحل تطوير مختلفة (التطوير والتهيئة والإنتاج)، أو تهيئات خاصة بمستخدم معيّن. ويمكنك الإشارة إلى متغيّرات البيئة في `settings.json` باستخدام الصياغة `${env:VARIABLE_NAME}`.

```json
{
	"terminal.integrated.defaultProfile.windows": "${env:WSL_DISTRO_NAME}", // Use WSL distro name as default terminal profile on Windows
```

وتعمل الصياغة في الأساس هكذا:

- `${env:VARIABLE_NAME}`: يشير إلى متغيّر البيئة `VARIABLE_NAME`.
- `${env:VARIABLE_NAME:DEFAULT_VALUE}`: يوفّر قيمة افتراضية (`DEFAULT_VALUE`) إذا لم يُضبط متغيّر البيئة.

ويدعم Visual Studio Code أيضًا هذه المتغيّرات جاهزةً:

- **`VSCODE_FONT_SIZE`:** المثال المستخدم أعلاه لضبط حجم الخط ديناميكيًا.
- **`VSCODE_DISABLE_EXTENSIONS`:** يعطّل كل الإضافات عند تشغيل Visual Studio Code (مفيد في تشخيص المشكلات).
- **`VSCODE_DEV`:** يشغّل Visual Studio Code في وضع التطوير.

## حالات استخدام محتملة

- **إعدادات عابرة للأنظمة:** استخدم متغيّرات البيئة لضبط مسارات أو تهيئات خاصة بنظام تشغيل معيّن في `settings.json`، فيصبح لديك إعدادات قابلة للنقل بين أنظمة تشغيل مختلفة.
- **إعدادات واعية بالبيئة:** عدّل الإعدادات بناءً على بيئة التطوير. فمثلًا قد تستخدم أدوات فحص أو منسّقات مختلفة لبيئتي التطوير والإنتاج.
- **تخصيص خاص بكل مستخدم:** اسمح لمستخدمين مختلفين في الفريق بتهيئات Visual Studio Code مختلفة قليلًا باستخدام متغيّرات بيئة خاصة بكل مستخدم.
