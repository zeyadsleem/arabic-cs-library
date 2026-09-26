---
title: "نظام تكامل مستمر"
lang: ar
source: https://aosabook.org/en/500L/ci.html
---

_ماليني داس مهندسة برمجيات شغوفة بالتطوير السريع (لكن بأمان!) وبحلّ المسائل العابرة للتخصصات. عملت في موزيلا كمهندسة أدوات، وهي الآن تصقل مهاراتها في تويتش. تابعِ ماليني على [تويتر](https://twitter.com/malinidas) أو على [مدونتها](http://malinidas.com/)._

## ما هو نظام التكامل المستمر؟

عند تطوير البرمجيات، نريد أن نتمكّن من التحقّق من أن ميزاتنا الجديدة أو إصلاحاتنا للأخطاء آمنة وتعمل كما هو متوقّع. ونفعل ذلك بتشغيل اختبارات ضد شيفرتنا. وأحياناً ما يقوم المطوّرون بتشغيل الاختبارات محلياً للتحقّق من أن تغييراتهم آمنة، لكن قد لا يملك المطوّرون الوقت لاختبار شيفرتهم على كل نظام تعمل عليه برمجياتهم. وإضافةً إلى ذلك، ومع إضافة المزيد والمزيد من الاختبارات، يصبح الوقت اللازم لتشغيلها - حتى محلياً فحسب - أقلّ قابلية للاستمرار. ولهذا وُجدت أنظمة التكامل المستمر.

أنظمة التكامل المستمر (CI) هي أنظمة مخصَّصة لاختبار الشيفرة الجديدة. وعند إجراء commit على مستودع الشيفرة، يكون من مسؤولية نظام التكامل المستمر التحقّق من أن هذا الـ commit لن يكسر أي اختبارات. وللقيام بذلك، يجب أن يكون النظام قادراً على جلب التغييرات الجديدة، وتشغيل الاختبارات، والإبلاغ عن نتائجه. وكأي نظام آخر، ينبغي أن يكون مقاوماً الأعطال. وهذا يعني أن إذا أخفق أي جزء من النظام، فيجب أن يتمكّن من التعافي والمتابعة من تلك النقطة.

ينبغي أيضاً أن يتعامل نظام الاختبارات هذا مع الحمل (load) جيداً، حتى نتمكّن من الحصول على نتائج الاختبارات في وقت معقول في حال أُجري الـ commits أسرع مما يمكن تشغيل الاختبارات فيه. يمكننا تحقيق ذلك بتوزيع جهد الاختبار وتوازيه. وسيُظهر هذا المشروع نظام تكامل مستمر موزّعاً صغيراً وأساسياً، مصمَّماً بحيث يسهل توسيعه.

## قيود المشروع وملاحظاته

يستخدم هذا المشروع Git بوصفه مستودعاً للشيفرة التي يلزم اختبارها. ولن تُستخدم سوى استدعاءات إدارة شيفرة المصدر القياسية، فإن كنت غير مألوف بـ Git لكنك مألوف بأنظمة إدارة إصدارات أخرى (VCS) مثل svn أو Mercurial، فما زال بإمكانك المتابعة.

نظراً لقيود طول الشيفرة وقيود unittest، بسّطتُ اكتشاف الاختبارات. سنشغّل *فقط* الاختبارات الموجودة في مجلد باسم `tests` داخل المستودع.

تراقب أنظمة التكامل المستمر مستودعاً رئيسياً (master) يكون مستضافاً عادةً على خادم ويب، لا محلياً على أنظمة ملفات التكامل المستمر. وفي حالة مثالنا، سنستخدم مستودعاً محلياً بدلاً من مستودع بعيد.

لا يلزم أن تعمل أنظمة التكامل المستمر وفق جدول زمني ثابت ومنتظم. ويمكنك أيضاً أن تجعلها تعمل كل بضع commits أو لكل commit. وفي حالة مثالنا، سيعمل نظام التكامل المستمر دورياً. وهذا يعني أنه إذا كان معدّاً للتحقّق من التغييرات كل خمس ثوانٍ، فسيشغّل الاختبارات ضد أحدث commit أُجري بعد انقضاء الخمس ثوانٍ. ولن يختبر كل commit أُجري خلال تلك الفترة، بل أحدث واحد فقط.

صُمِّم نظام التكامل المستمر هذا للتحقّق دورياً من التغييرات في مستودع. وفي أنظمة التكامل المستمر الواقعية، يمكنك أيضاً أن يتلقّى مراقب المستودع إشعاراً من مستودع مستضاف. فمثلاً تقدّم Github «خطّافات ما بعد الـ commit» (post-commit hooks) التي ترسل إشعارات إلى عنوان. وبهذا النموذج، يُستدعى مراقب المستودع من خادم الويب المستضاف على ذلك العنوان للاستجابة لذلك الإشعار. ولأن نمذجة هذا محلياً أمر معقّد، فإننا نستخدم نموذج المراقب، حيث يتحقّق مراقب المستودع من التغييرات بدلاً من أن يُبلَّغ بها.

ولأنظمة التكامل المستمر أيضاً جانب للإبلاغ، حيث يبلّغ مشغّل الاختبارات (test runner) عن نتائجه إلى مكوّن يتيحها للناس ليروها، ربما في صفحة ويب. ولتبسيط الأمر، يجمع هذا المشروع نتائج الاختبارات ويخزّنها في ملفات في نظام الملفات المحلي لعملية المرسِل (dispatcher).

لاحظ أن البنية التي يستخدمها نظام التكامل المستمر هذا ليست سوى احتمال من بين احتمالات كثيرة. وقد اختير هذا النهج لتبسيط دراسة الحالة هذه إلى ثلاثة مكوّنات رئيسية.

## مقدّمة

يتكوّن الهيكل الأساسي لنظام تكامل مستمر من ثلاثة مكوّنات: مراقب، ومرسِل لمهام الاختبار، ومشغّل اختبارات. يراقب المراقب المستودع. وحين يلاحظ أن commit قد أُجري، يُشعر المرسِل. يبحث المرسِل بعدئذٍ عن مشغّل اختبارات ويعطيه رقم الـ commit ليختبره.

هناك طرق كثيرة لهندسة نظام تكامل مستمر. يمكننا أن يكون المراقب والمرسِل والمشغّل العملية نفسها على آلة واحدة. وهذا النمط محدود جداً إذ لا توجد معالجة للحمل، فإذا أُضيف إلى المستودع تغييرات أكثر مما يستطيع نظام التكامل المستمر استيعابه، فسيتراكم متأخر كبير. كما أن هذا النمط غير متسامح مع الأعطال على الإطلاق؛ فإذا تعطّلت الحاسوب الذي يعمل عليه أو حدث انقطاع في التيار الكهربائي، فلا توجد أنظمة احتياطية، ولن تعمل أي اختبارات. والنظام المثالي هو الذي يستطيع التعامل مع أكبر عدد من مهام الاختبار المطلوبة، وسيبذل قصارى جهده للتعويض عند تعطّل الآلات.

لبناء نظام تكامل مستمر متسامح مع الأعطال وقادر على تحمّل الحمل، في هذا المشروع، يصبح كل واحد من هذه المكوّنات عملية مستقلة به. وهذا يتيح لكل عملية أن تكون مستقلة عن غيرها، ويتيح لنا تشغيل نسخ متعددة من كل عملية. وهذا مفيد حين يكون لديك أكثر من مهمة اختبار يجب تشغيلها في الوقت نفسه. يمكننا عندئذٍ أن نشغّل عدة مشغّلات اختبار على التوازي، مما يتيح لنا تشغيل أكبر عدد من المهام حسب الحاجة، ويمنعنا من تراكم متأخر من الاختبارات في طابور الانتظار.

في هذا المشروع، لا تعمل هذه المكوّنات كعمليات منفصلة فحسب، بل إنها تتواصل أيضاً عبر المقابس (sockets)، مما يتيح لنا تشغيل كل عملية على آلة شبكية منفصلة. ويُسنَد عنوان مضيف/منفذ فريد لكل مكوّن، ويمكن لكل عملية أن تتواصل مع غيرها عبر إرسال رسائل على العناوين المسندة.

سيسمح هذا التصميم لنا بالتعامل مع أعطال الأجهزة أثناء حدوثها، عبر تفعيل بنية موزّعة. يمكننا أن يعمل المراقب على آلة، ومرسِل مهام الاختبار على أخرى، ومشغّلو الاختبارات على ثالثة، وكلها يتواصل بعضها مع بعض عبر الشبكة. وإذا تعطّلت أيّ من هذه الآلات، يمكننا جدولة آلة جديدة لتعمل على الشبكة، فيصبح النظام آمناً من الأعطال (fail-safe).

لا يشمل هذا المشروع شيفرة الاستعادة التلقائية، لأن ذلك يعتمد على بنية نظامك الموزّع، لكن في العالم الواقعي تُشغَّل أنظمة التكامل المستمر في بيئة موزّعة من هذا النوع حتى تتيّح لها ازدواجية في التحوّل (failover redundancy)، أي يمكننا التراجع إلى آلة احتياطية إذا أصبحت إحدى الآلات التي كانت تعمل عليها عملية معطّلة.

ولأغراض هذا المشروع، ستُشغَّل كل واحدة من هذه العمليات محلياً ويدوياً على منافذ محلية متمايزة.

### ملفات هذا المشروع

يحتوي هذا المشروع على ملفات Python لكل واحد من هذه المكوّنات: مراقب المستودع \newline (`repo_observer.py`)، ومرسِل مهام الاختبار (`dispatcher.py`)، ومشغّل الاختبارات \newline (`test_runner.py`). وتتواصل هذه العمليات الثلاث مع بعضها باستخدام المقابس، ولأن شيفرة نقل المعلومات مشتركة بين جميعها، فهناك ملف `helpers.py` يحتوي عليها، فتستورد كل عملية دالة `communicate` من هناك بدلاً من تكرارها في الملف.

وهناك أيضاً ملفات سكربتات bash تستخدمها هذه العمليات. وتُستخدم هذه الملفات لتنفيذ أوامر bash وgit بطريقة أسهل من استخدام وحدات نظام التشغيل في Python باستمرار مثل `os` و`subprocess`.

وأخيراً، هناك مجلد `tests` يحتوي على اختبارَين نموذجيَين سيشغّلهما نظام التكامل المستمر. سيجح أحد الاختبارين ويفشل الآخر.

### التهيئة الأولية

بينما هذا نظام التكامل المستمر جاهز للعمل في نظام موزّع، فلنبدأ بتشغيل كل شيء محلياً على حاسوب واحد حتى نفهم كيف يعمل نظام التكامل المستمر من دون أن نضيف مخاطر مواجهة مشكلات متعلّقة بالشبكة. وإن رغبت في تشغيله في بيئة موزّعة، فيمكنك تشغيل كل مكوّن على آلة مستقلة.

تعمل أنظمة التكامل المستمر بتشغيل الاختبارات عبر كشف التغييرات في مستودع شيفرة، ولذلك، حتى نبدأ، سنحتاج إلى تهيئة المستودع الذي سيراقبه نظام التكامل المستمر.

لنسمِّه `test_repo`:

```bash
$ mkdir test_repo 
$ cd test_repo 
$ git init
```

سيكون هذا مستودعنا الرئيسي. هنا يودع المطورون شيفرتهم، لذا ينبغي أن يسحب نظام التكامل المستمر هذا المستودع ويفحص وجود commits، ثم يشغّل الاختبارات. والأمر الذي يفحص وجود commits جديدة هو مراقب المستودع.

يعمل مراقب المستودع عبر فحص الـ commits، ولذلك نحتاج إلى commit واحد على الأقل في المستودع الرئيسي. لنُنفّذ commit لاختباراتنا النموذجية حتى يتوفّر لدينا اختبارات نشغّلها.

انسخ مجلد `tests` من قاعدة الشيفرة هذه إلى `test_repo` ونفّذ له commit:

```bash
$ cp -r /this/directory/tests /path/to/test_repo/ 
$ cd /path/to/test\_repo 
$ git add tests/ 
$ git commit -m ”add tests”
```

الآن لديك commit في المستودع الرئيسي.

سيحتاج مكوّن مراقب المستودع إلى نسخته الخاصة من الشيفرة، حتى يتمكّن من كشف متى أُجري commit جديد. لننشئ نسخة من مستودعنا الرئيسي ونسمّيها `test_repo_clone_obs`:

```bash
$ git clone /path/to/test_repo test_repo_clone_obs
```


وسيحتاج مشغّل الاختبارات أيضاً إلى نسخته الخاصة من الشيفرة، حتى يتمكّن من إجراء checkout للمستودع عند commit معيّن وتشغيل الاختبارات. لننشئ نسخة أخرى من مستودعنا الرئيسي ونسمّيها `test_repo_clone_runner`:

```bash
$ git clone /path/to/test_repo test_repo_clone_runner
```

## المكوّنات

### مراقب المستودع (`repo_observer.py`)

يراقب مراقب المستودع مستودعاً ويشعر المرسِل عند رؤية commit جديد. ولكي يعمل مع جميع أنظمة إدارة الإصدارات (إذ ليس في كل أنظمة إدارة الإصدارات أنظمة إشعار مدمجة)، كُتب مراقب المستودع هذا بحيث يفحص المستودع دورياً بحثاً عن commits جديدة بدلاً من الاعتماد على نظام إدارة الإصدارات ليُشعره بأن تغييرات قد جرت.

سيستطلع المراقب المستودع دورياً، وحين يرى تغييراً سيخبر المرسِل بأحدث معرّف commit ليجري عليه الاختبارات. ويبحث المراقب عن commits جديدة عبر إيجاد معرّف الـ commit الحالي في مستودعه، ثم تحديث المستودع، وأخيراً إيجاد أحدث معرّف commit والمقارنة بينهما. ولأغراض هذا المثال، لن يوجّه المراقب إلا الاختبارات ضد أحدث commit. وهذا يعني أنه إذا أُجري commitان بين فحصين دوريين، فسيلتزم المراقب بتشغيل الاختبارات ضد أحدث commit فقط. عادةً ما يكتشف نظام التكامل المستمر كل الـ commits منذ آخر commit اختُبر، ويوجّه مشغّلو اختبارات لكل commit جديد، لكنني عدّلت هذا الافتراض من أجل البساطة.

يجب أن يعرف المراقب أي مستودع يراقبه. وقد أنشأنا سابقاً نسخة من مستودعنا في `/path/to/test_repo_clone_obs`. وسيستخدم المراقب هذه النسخة لكشف التغييرات. ولكي يتمكّن مراقب المستودع من استخدام هذه النسخة، نمرّر له المسار عند استدعاء ملف `repo_observer.py`. وسيستخدم مراقب المستودع هذه النسخة للسحب من المستودع الرئيسي.

يجب أن نمرّر للمراقب أيضاً عنوان المرسِل، ليتمكّن المراقب من إرسال الرسائل إليه. حين تبدأ مراقب المستودع، يمكنك تمرير عنوان خادم المرسِل باستخدام وسطر الأمر `--dispatcher-server`. وإن لم تمرّره، فسيفترض العنوان الافتراضي `localhost:8888`.

```python 
def poll():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dispatcher-server",
                        help="dispatcher host:port, " \
                        "by default it uses localhost:8888",
                        default="localhost:8888",
                        action="store")
    parser.add_argument("repo", metavar="REPO", type=str,
                        help="path to the repository this will observe")
    args = parser.parse_args()
    dispatcher_host, dispatcher_port = args.dispatcher_server.split(":")
```

وبعد استدعاء ملف مراقب المستودع، يبدأ الدالة `poll()`. وهذه الدالة تحلّل وسائط سطر الأمر، ثم تشغّل حلقة `while` لا نهائية. وتُستخدم حلقة `while` لفحص المستودع دورياً بحثاً عن تغييرات. وأول ما تفعله هو استدعاء سكربت Bash المسمّى `update_repo.sh` [^bash].

[^bash]: استُخدم Bash لأننا بحاجة إلى التحقّق من وجود الملفات، وإنشاء الملفات، واستخدام Git، وسكربت الصدفة هو أنسب طريقة وأبسطها لتحقيق ذلك. وبدلاً من ذلك، تتوفّر حزم Python عابرة للمنصات يمكنك استخدامها؛ فمثلاً يمكن استخدام الوحدة المدمجة `os` في Python للوصول إلى نظام الملفات، ويمكن استخدام GitPython للوصول إلى Git، لكنهما ينفّذان الأفعال بطريقة أكثر استدارة.

```python
    while True:
        try:
            # call the bash script that will update the repo and check
            # for changes. If there's a change, it will drop a .commit_id file
            # with the latest commit in the current working directory
            subprocess.check_output(["./update_repo.sh", args.repo])
        except subprocess.CalledProcessError as e:
            raise Exception("Could not update and check repository. " +
                            "Reason: %s" % e.output)
```

يُستخدم ملف `update_repo.sh` لتحديد أي commits جديدة وإعلام مراقب المستودع بها. وهو يفعل ذلك بتسجيل معرّف الـ commit الذي نعلمه حالياً، ثم سحب المستودع، ثم فحص أحدث معرّف commit. فإن تطابقا، فلا قد جرت،따라 لا يحتاج مراقب المستودع إلى فعل شيء، أما إذا اختلف معرّف الـ commit، فنعلم أن commit جديداً قد أُجري. وفي هذه الحالة، سينشئ `update_repo.sh` ملفاً اسمه `.commit_id` يُخزَّن فيه أحدث معرّف commit.

إليك تفصيل `update_repo.sh` خطوةً بخطوة. أولاً، يسحب السكربت ملف `run_or_fail.sh`، الذي يوفّر دالة المساعدة `run_or_fail` المستخدَمة في جميع سكربتات الصدفة لدينا. وتُستخدم هذه الدالة لتشغيل الأمر المُعطى، أو الفشل برسالة الخطأ المُعطاة.

```bash 
#!/bin/bash

source run_or_fail.sh 
```

بعد ذلك، يحاول السكربت إزالة ملف باسم `.commit_id`. وبما أن `updaterepo.sh` يُستدعى إلى ما لا نهاية من ملف `repo_observer.py`، فإن كنا كنا نعرف مسبقاً بوجود commit جديد سابقاً، فقد أُنشئ `.commit_id`، لكنه يحمل commit سبق أن اختبرناه. لذلك نريد إزالة ذلك الملف وإنشاء ملف جديد فقط عند العثور على commit جديد.

```bash
bash rm -f .commit_id 
```

وبعد إزالة الملف (إن كان موجوداً)، يتحقّق من أن المستودع الذي نراقبه موجود، ثم يعيد ضبطه إلى أحدث commit، تحسّباً لأي شيء جعله خارج التزامن.

```bash
run_or_fail "Repository folder not found!" pushd $1 1> /dev/null
run_or_fail "Could not reset git" git reset --hard HEAD
```

ثم يستدعي `git log` ويحلّل المخرجات، بحثاً عن أحدث معرّف commit.

```bash
COMMIT=$(run_or_fail "Could not call 'git log' on repository" git log -n1)
if [ $? != 0 ]; then
  echo "Could not call 'git log' on repository"
  exit 1
fi
COMMIT_ID=`echo $COMMIT | awk '{ print $2 }'`
```

ثم يسحب المستودع، فيحصل على أي تغييرات حديثة، ثم يأخذ أحدث معرّف commit.

```bash
run_or_fail "Could not pull from repository" git pull
COMMIT=$(run_or_fail "Could not call 'git log' on repository" git log -n1)
if [ $? != 0 ]; then
  echo "Could not call 'git log' on repository"
  exit 1
fi
NEW_COMMIT_ID=`echo $COMMIT | awk '{ print $2 }'`
```

وأخيراً، إذا لم يطابق معرّف الـ commit المعرّف السابق، فنعرف لدينا commits جديدة ought to نتحقّق منها، ولذلك يخزّن السكربت أحدث معرّف commit في ملف `.commit_id`.

```bash
# if the id changed, then write it to a file
if [ $NEW_COMMIT_ID != $COMMIT_ID ]; then
  popd 1> /dev/null
  echo $NEW_COMMIT_ID > .commit_id
fi
```

وحين ينتهي `update_repo.sh` من العمل في `repo_observer.py`، يفحص مراقب المستودع وجود ملف `.commit_id`. فإن كان الملف موجوداً، فنعرف لدينا commit جديد، وعلينا إبلاغ المرسِل كي يبدأ الاختبارات. وسيتحقّق مراقب المستودع من حالة خادم المرسِل عبر الاتصال به وإرسال طلب `status`، للتأكّد من عدم وجود مشاكل معه، ومن أنه جاهز لاستقبال التعليمات.

```python
        if os.path.isfile(".commit_id"):
            try:
                response = helpers.communicate(dispatcher_host,
                                               int(dispatcher_port),
                                               "status")
            except socket.error as e:
                raise Exception("Could not communicate with dispatcher server: %s" % e)
```

 فإن استجاب بـ `OK`، فإن مراقب المستودع يفتح ملف `.commit_id`، ويقرأ أحدث معرّف commit ويرسل ذلك المعرّف إلى المرسِل، باستخدام طلب `dispatch:<commit ID>`. ثم ينام خمس ثوانٍ ويعيد العملية. وسنحاول مرة أخرى بعد خمس ثوانٍ أيضاً إن حدث خطأ ما في الطريق.

```python
            if response == "OK":
                commit = ""
                with open(".commit_id", "r") as f:
                    commit = f.readline()
                response = helpers.communicate(dispatcher_host,
                                               int(dispatcher_port),
                                               "dispatch:%s" % commit)
                if response != "OK":
                    raise Exception("Could not dispatch the test: %s" %
                    response)
                print "dispatched!"
            else:
                raise Exception("Could not dispatch the test: %s" %
                response)
        time.sleep(5)
```

وسيكرر مراقب المستودع هذه العملية إلى الأبد، حتى تقتل العملية عبر \newline `KeyboardInterrupt` (Ctrl+c)، أو عبر إرسال إشارة قتل إليها.

### المرسِل (`dispatcher.py`)

المرسِل خدمة منفصلة تُستخدم لتفويض مهام الاختبار. يستمع على منفذ للطلبات الواردة من مشغّلي الاختبارات ومن مراقب المستودع. وهو يتيح لمشغّلي الاختبارات أن يسجّلوا أنفسهم، وحين يُعطى معرّف commit من مراقب المستودع، يوجّه مشغّل اختبار ضد الـ commit الجديد. كما أنه يتعامل بسلاسة مع أي مشاكل في مشغّلي الاختبارات، ويعيد توزيع معرّف الـ commit على مشغّل اختبارات جديد إذا حدث خطأ ما.

حين يُنفَّذ `dispatch.py`، تُستدعى الدالة `serve`. وهي أولاً تحلّل الوسائط التي تتيح لك تحديد مضيف المرسِل ومنفذه:

```python
def serve():
    parser = argparse.ArgumentParser()
    parser.add_argument("--host",
                        help="dispatcher's host, by default it uses localhost",
                        default="localhost",
                        action="store")
    parser.add_argument("--port",
                        help="dispatcher's port, by default it uses 8888",
                        default=8888,
                        action="store")
    args = parser.parse_args()
```

وهذا يشغّل خادم المرسِل، وخيطين آخرين. يشغّل أحد الخيطين الدالة `runner_checker`، ويشغّل الآخر الدالة `redistribute`.

```python
    server = ThreadingTCPServer((args.host, int(args.port)), DispatcherHandler)
    print `serving on %s:%s` % (args.host, int(args.port))

    ...

    runner_heartbeat = threading.Thread(target=runner_checker, args=(server,))
    redistributor = threading.Thread(target=redistribute, args=(server,))
    try:
        runner_heartbeat.start()
        redistributor.start()
        # Activate the server; this will keep running until you
        # interrupt the program with Ctrl+C or Cmd+C
        server.serve_forever()
    except (KeyboardInterrupt, Exception):
        # if any exception occurs, kill the thread
        server.dead = True
        runner_heartbeat.join()
        redistributor.join()

```

تستطلع الدالة `runner_checker` كل مشغّل اختبار مسجَّل دورياً للتأكّد من أنه ما زال يستجيب. فإن أصبح أحدها غير مستجيب، فسيُزال ذلك المشغّل من المجموعة (pool) وسيُوجَّه معرّف الـ commit الخاص به إلى المشغّل المتاح التالي. وستسجّل الدالة معرّف الـ commit في المتغيّر `pending_commits`.

```python
    def runner_checker(server):
        def manage_commit_lists(runner):
            for commit, assigned_runner in server.dispatched_commits.iteritems():
                if assigned_runner == runner:
                    del server.dispatched_commits[commit]
                    server.pending_commits.append(commit)
                    break
            server.runners.remove(runner)
        while not server.dead:
            time.sleep(1)
            for runner in server.runners:
                s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                try:
                    response = helpers.communicate(runner["host"],
                                                   int(runner["port"]),
                                                   "ping")
                    if response != "pong":
                        print "removing runner %s" % runner
                        manage_commit_lists(runner)
                except socket.error as e:
                    manage_commit_lists(runner)
```

تُستخدم الدالة `redistribute` لتوجيه معرّفات الـ commits المسجَّلة في `pending_commits`. وحين تعمل `redistribute`، فإنها تفحص ما إذا كانت هناك معرّفات commits في `pending_commits`. فإن وُجدت، تستدعي الدالة `dispatch_tests` بمعرّف الـ commit.

```python
    def redistribute(server):
        while not server.dead:
            for commit in server.pending_commits:
                print "running redistribute"
                print server.pending_commits
                dispatch_tests(server, commit)
                time.sleep(5)
```

تُستخدم الدالة `dispatch_tests` للعثور على مشغّل اختبار متاح من مجموعة المشغّلين المسجّلين. فإن وُجد أحدهم، فسيرسل إليه رسالة `runtest` تحمل معرّف الـ commit. وإن لم يكن أي منهم متاحاً حالياً، فستنتظر ثانيتين وتعيد هذه العملية. وبعد التوجيه، تسجّل أي معرّف commit يجري اختباره بواسطة أي مشغّل اختبار في المتغيّر `dispatched_commits`. وإذا كان معرّف الـ commit موجوداً في المتغيّر `pending_commits`، فإن `dispatch_tests` ستزيله لأنه أُعيد توجيهه بنجاح.

```python
def dispatch_tests(server, commit_id):
    # NOTE: usually we don't run this forever
    while True:
        print "trying to dispatch to runners"
        for runner in server.runners:
            response = helpers.communicate(runner["host"],
                                           int(runner["port"]),
                                           "runtest:%s" % commit_id)
            if response == "OK":
                print "adding id %s" % commit_id
                server.dispatched_commits[commit_id] = runner
                if commit_id in server.pending_commits:
                    server.pending_commits.remove(commit_id)
                return
        time.sleep(2)
```

يستخدم خادم المرسِل وحدة `SocketServer`، وهي خادم بسيط جداً جزء من المكتبة القياسية. وهناك أربعة أنواع أساسية من الخوادم في وحدة `SocketServer`: `TCP` و`UDP` و`UnixStreamServer` و`UnixDatagramServer`. وسنستخدم خادم مقابس مبني على TCP حتى نتمكّن من ضمان تدفّقات بيانات متّصلة ومرتّبة بين الخوادم، إذ لا يضمن UDP ذلك.

لا يستطيع خادم `TCPServer` الافتراضي الذي توفّره `SocketServer` التعامل مع أكثر من طلب في الوقت نفسه، لذلك لا يستطيع التعامل مع الحالة التي يكون فيها المرسِل يتحدث إلى اتصال ما، لنقل من مشغّل اختبار، ثم يأتي اتصال جديد، لنقل من مراقب المستودع. وإذا حدث ذلك، لاضطر مراقب المستودع إلى انتظار انتهاء الاتصال الأول وانفصاله قبل أن يُخدَم. وهذا ليس مثالياً لحالتنا، إذ يجب أن يكون خادم المرسِل قادراً على التواصل مباشرةً وسريعاً مع جميع مشغّلي الاختبارات ومراقب المستودع.

كي يتعامل خادم المرسِل مع الاتصالات المتزامنة، فهو يستخدم الصنف المخصّص `ThreadingTCPServer` \newline، الذي يضيف قدرة الخيوط (threading) إلى `SocketServer` الافتراضي. وهذا يعني أن في كل مرة يستقبل فيها المرسِل طلب اتصال، فإنه يشغّل عملية جديدة خصيصاً لذلك الاتصال. ويتيح ذلك للمرسِل التعامل مع طلبات متعددة في الوقت نفسه.

```python
class ThreadingTCPServer(SocketServer.ThreadingMixIn, SocketServer.TCPServer):
    runners = [] # Keeps track of test runner pool
    dead = False # Indicate to other threads that we are no longer running
    dispatched_commits = {} # Keeps track of commits we dispatched
    pending_commits = [] # Keeps track of commits we have yet to dispatch
```

يعمل خادم المرسِل عبر تعريف معالِجات لكل طلب. وقد عُرِّف هذا بالصنف `DispatcherHandler` الذي يرث من `BaseRequestHandler` في `SocketServer`. ولا يحتاج هذا الصنف الأساسي إلّا أن نعرّف دالة `handle`، التي ستُستدعى كلما طُلب اتصال. ودالة `handle` المعرَّفة في `DispatcherHandler` هي معالِجنا المخصّص، وسيتم استدعاؤها عند كل اتصال. فهي تنظر في طلب الاتصال الوارد (حيث `self.request` يحمل معلومات الطلب)، وتستخرج الأمر المطلوب منها.

```python
class DispatcherHandler(SocketServer.BaseRequestHandler):
    """
    The RequestHandler class for our dispatcher.
    This will dispatch test runners against the incoming commit
    and handle their requests and test results
    """
    command_re = re.compile(r"(\w+)(:.+)*")
    BUF_SIZE = 1024
    def handle(self):
        self.data = self.request.recv(self.BUF_SIZE).strip()
        command_groups = self.command_re.match(self.data)
        if not command_groups:
            self.request.sendall("Invalid command")
            return
        command = command_groups.group(1)
```

وهو يتعامل مع أربعة أوامر: `status` و`register` و`dispatch` و`results`. ويُستخدم `status` للتحقّق مما إذا كان خادم المرسِل يعمل.

```python
        if command == "status":
            print "in status"
            self.request.sendall("OK")
```

وحتى يفعل المرسِل شيئاً مفيداً، يلزمه أن يكون لديه مشغّل اختبار واحد مسجَّل على الأقل. فعند استدعاء الأمر register على زوج مضيف:منفذ، فإنه يخزّن معلومات المشغّل في قائمة (الكائن runners المرتبط بكائن `ThreadingTCPServer`) ليتمكّن من التواصل مع المشغّل لاحقاً، حين يحتاج إلى إعطائه معرّف commit ليجري عليه الاختبارات.

```python
        elif command == "register":
            # Add this test runner to our pool
            print "register"
            address = command_groups.group(2)
            host, port = re.findall(r":(\w*)", address)
            runner = {"host": host, "port":port}
            self.server.runners.append(runner)
            self.request.sendall("OK")
```

ويستخدم مراقب المستودع الأمر `dispatch` لتوجيه مشغّل اختبار ضد commit. وصيغة هذا الأمر هي `dispatch:<commit ID>`. ويستخرج المرسِل معرّف الـ commit من هذه الرسالة ويرسله إلى مشغّل الاختبار.

```python
        elif command == "dispatch":
            print "going to dispatch"
            commit_id = command_groups.group(2)[1:]
            if not self.server.runners:
                self.request.sendall("No runners are registered")
            else:
                # The coordinator can trust us to dispatch the test
                self.request.sendall("OK")
                dispatch_tests(self.server, commit_id)
```

ويستخدم مشغّل الاختبار الأمر `results` للإبلاغ عن نتائج جولة اختبار منتهية. وصيغة هذا الأمر هي `results:<commit ID>:<length of results data in bytes>:<results>`. ويُستخدم `<commit ID>` لتحديد معرّف الـ commit الذي جُرّيت عليه الاختبارات. ويُستخدم `<length of results data in bytes>` لمعرفة حجم المخزن المؤقت (buffer) اللازم لبيانات النتائج. وأخيراً، يحمل `<results>` مخرجات النتائج الفعلية.

```python
        elif command == "results":
            print "got test results"
            results = command_groups.group(2)[1:]
            results = results.split(":")
            commit_id = results[0]
            length_msg = int(results[1])
            # 3 is the number of ":" in the sent command
            remaining_buffer = self.BUF_SIZE - \
                (len(command) + len(commit_id) + len(results[1]) + 3)
            if length_msg > remaining_buffer:
                self.data += self.request.recv(length_msg - remaining_buffer).strip()
            del self.server.dispatched_commits[commit_id]
            if not os.path.exists("test_results"):
                os.makedirs("test_results")
            with open("test_results/%s" % commit_id, "w") as f:
                data = self.data.split(":")[3:]
                data = "\n".join(data)
                f.write(data)
            self.request.sendall("OK")
```

### مشغّل الاختبارات (`test_runner.py`)

مشغّل الاختبارات مسؤول عن تشغيل الاختبارات ضد معرّف commit معيّن والإبلاغ عن النتائج. وهو يتواصل فقط مع خادم المرسِل، المسؤول عن إعطائه معرّفات الـ commits التي يجري عليها الاختبارات، والمسؤول عن تلقّي نتائج الاختبارات.

حين يُستدعى ملف `test_runner.py`، فإنه يستدعي الدالة `serve` التي تشغّل خادم مشغّل الاختبارات، وتبدأ أيضاً خيطاً لتشغيل الدالة `dispatcher_checker`. ولأن عملية بدء التشغيل هذه مشابهة جداً لتلك الموصوفة في `repo_observer.py` و`dispatcher.py`، فإننا نتخطّى الوصف هنا.

تستطلع الدالة `dispatcher_checker` خادم المرسِل كل خمس ثوانٍ للتأكّد من أنه ما زال يعمل. وهذا مهم لإدارة الموارد. فإذا تعطّل المرسِل، فإن مشغّل الاختبارات سيتوقّف عن العمل، إذ لن يكون قادراً على إنجاز أي عمل ذي معنى في غياب مرسِل يعطيه عملاً أو يبلّغه بالنتائج.

```python
    def dispatcher_checker(server):
        while not server.dead:
            time.sleep(5)
            if (time.time() - server.last_communication) > 10:
                try:
                    response = helpers.communicate(
                                       server.dispatcher_server["host"],
                                       int(server.dispatcher_server["port"]),
                                       "status")
                    if response != "OK":
                        print "Dispatcher is no longer functional"
                        server.shutdown()
                        return
                except socket.error as e:
                    print "Can't communicate with dispatcher: %s" % e
                    server.shutdown()
                    return
```

مشغّل الاختبارات هو `ThreadingTCPServer`، مثل خادم المرسِل. وهو يحتاج إلى الخيوط (threading) لأن المرسِل ليس سيعطيه معرّف commit ليشغّله فحسب، بل سيستطلعه دورياً للتحقّق من أنه ما زال يعمل أثناء تشغيله للاختبارات.

```python
class ThreadingTCPServer(SocketServer.ThreadingMixIn, SocketServer.TCPServer):
    dispatcher_server = None # Holds the dispatcher server host/port information
    last_communication = None # Keeps track of last communication from dispatcher
    busy = False # Status flag
    dead = False # Status flag
```

يبدأ تدفّق التواصل بطلب المرسِل من المشغّل أن يقبل معرّف commit ليشغّله. فإن كان مشغّل الاختبارات مستعداً لتشغيل المهمة، فإنه يستجيب بإيصال إلى خادم المرسِل، الذي يغلق عندئذٍ الاتصال. وكي يتمكّن خادم مشغّل الاختبارات من تشغيل الاختبارات وقبول المزيد من الطلبات من المرسِل معاً، فإنه يبدأ مهمة الاختبار المطلوبة في خيط جديد.

وهذا يعني أنه حين يقدّم خادم المرسِل طلباً (وهو هنا ping) ويتوقّع استجابة، فإن ذلك سيجري في خيط منفصل، بينما يكون مشغّل الاختبارات مشغولاً بتشغيل الاختبارات في خيطه الخاص. ويتيح هذا لخادم مشغّل الاختبارات التعامل مع مهام متعددة في الوقت نفسه. وبدلاً من هذا التصميم الخيطي، من الممكن أن يحتفظ خادم المرسِل باتصال مع كل مشغّل اختبار، لكن ذلك سيزيد احتياجات خادم المرسِل من الذاكرة، ويعرّضه لمشاكل الشبكة، مثل الاتصالات المنقطعة عن قصد.

يستجيب خادم مشغّل الاختبارات لرسالتين من المرسِل. الأولى هي `ping`، التي يستخدمها خادم المرسِل للتحقّق من أن المشغّل ما زال نشطاً.

```python
class TestHandler(SocketServer.BaseRequestHandler):
    ...

    def handle(self):
        ....
        if command == "ping":
            print "pinged"
            self.server.last_communication = time.time()
            self.request.sendall("pong")
```

والثانية هي `runtest`، التي تقبل رسائل من الشكل `runtest:<commit ID>`، وتُستخدم لبدء الاختبارات على الـ commit المعطى. وحين تُستدعى `runtest`، سيفحص مشغّل الاختبارات ما إذا كان يشغّل اختباراً بالفعل، فإن كان كذلك فسيعيد استجابة `BUSY` إلى المرسِل. وإن كان متاحاً، فسيستجيب للخادم برسالة `OK`، ويضبط حالته على «مشغول» ويشغّل دالته `run_tests`.

```python
        elif command == "runtest":
            print "got runtest command: am I busy? %s" % self.server.busy
            if self.server.busy:
                self.request.sendall("BUSY")
            else:
                self.request.sendall("OK")
                print "running"
                commit_id = command_groups.group(2)[1:]
                self.server.busy = True
                self.run_tests(commit_id,
                               self.server.repo_folder)
                self.server.busy = False

```

تستدعي هذه الدالة سكربت الصدفة `test_runner_script.sh`، الذي يحدّث المستودع إلى معرّف الـ commit المعطى. وبمجرد عودة السكربت، إن كان قد نجح في تحديث المستودع، نشغّل الاختبارات باستخدام unittest ونجمع النتائج في ملف. وحين تنتهي الاختبارات من التشغيل، يقرأ مشغّل الاختبارات ملف النتائج ويرسله في رسالة نتائج إلى المرسِل.

```python
    def run_tests(self, commit_id, repo_folder):
        # update repo
        output = subprocess.check_output(["./test_runner_script.sh",
                                        repo_folder, commit_id])
        print output
        # run the tests
        test_folder = os.path.join(repo_folder, "tests")
        suite = unittest.TestLoader().discover(test_folder)
        result_file = open("results", "w")
        unittest.TextTestRunner(result_file).run(suite)
        result_file.close()
        result_file = open("results", "r")
        # give the dispatcher the results
        output = result_file.read()
        helpers.communicate(self.server.dispatcher_server["host"],
                            int(self.server.dispatcher_server["port"]),
                            "results:%s:%s:%s" % (commit_id, len(output), output))
```

وها هو `test_runner_script.sh`:

```bash
#!/bin/bash
REPO=$1
COMMIT=$2
source run_or_fail.sh
run_or_fail "Repository folder not found" pushd "$REPO" 1> /dev/null
run_or_fail "Could not clean repository" git clean -d -f -x
run_or_fail "Could not call git pull" git pull
run_or_fail "Could not update to given commit hash" git reset --hard "$COMMIT"
```

كي تشغّل `test_runner.py`، عليك توجيهه إلى نسخة من المستودع ليجري الاختبارات عليها. وفي هذه الحالة، يمكنك استخدام النسخة `/path/to/test_repo test_repo_clone_runner` التي أنشأناها سابقاً كوسيط. وافتراضياً، سيشغّل `test_runner.py` خادمه الخاص على localhost باستخدام منفذ في النطاق 8900-9000، وسيحاول الاتصال بخادم المرسِل على `localhost:8888`. ويمكنك تمرير وسائط اختيارية لتغيير هذه القيم. تُستخدم الوسائط `--host` و`--port` لتحديد عنوان معيّن ليشتغل عليه خادم مشغّل الاختبارات، وتحدد الوسيط `--dispatcher-server` عنوان المرسِل.

### مخطّط تدفّق التحكّم

يشكل \aosafigref{500l.ci.controlflow} مخطّطاً عاماً لهذا النظام. يفترض هذا المخطّط أن الملفات الثلاثة \newline (`repo_observer.py` و`dispatcher.py` و`test_runner.py`) تعمل بالفعل، ويصف الإجراءات التي تتّخذها كل عملية عند إجراء commit جديد.

\aosafigure[360pt]/images/500-lines/ci-0-diagram.webp{تدفّق التحكّم}{500l.ci.controlflow}

### تشغيل الشيفرة

يمكننا تشغيل نظام التكامل المستمر البسيط هذا محلياً، باستخدام ثلاث أصداف طرفية مختلفة لكل عملية. نبدأ بالمرسِل أولاً، وهو يعمل على المنفذ 8888:

```bash
$ python dispatcher.py
```

وفي صدفة جديدة، نشغّل مشغّل الاختبارات (حتى يسجّل نفسه لدى المرسِل):

```bash
$ python test_runner.py <path/to/test_repo_clone_runner>
```

سينسّب مشغّل الاختبارات لنفسه منفذاً خاصاً به، في النطاق 8900-9000. ويمكنك تشغيل أكبر عدد من مشغّلي الاختبارات تشاء.

وأخيراً، في صدفة جديدة أخرى، لنشغّل مراقب المستودع:

```bash
$ python repo_observer.py --dispatcher-server=localhost:8888 <path/to/repo_clone_obs>
```

والآن بعد أن جهّزنا كل شيء، لنُطلق بعض الاختبارات! وللقيام بذلك، سنحتاج إلى إجراء commit جديد. انتقل إلى مستودعك الرئيسي وأحدث تغييراً عشوائياً:

```bash
$ cd /path/to/test_repo
$ touch new_file
$ git add new_file
$ git commit -m"new file" new_file
```

عندئذٍ سيدرك `repo_observer.py` أن هناك commit جديداً وسيُشعر المرسِل. ويمكنك رؤية المخرجات في أصدفتيهما Respectively، فيتمكّن من مراقبتهما. ومتى تلقّى المرسِل نتائج الاختبارات، خزّنها في مجلد `test_results/` في قاعدة الشيفرة هذه، باستخدام معرّف الـ commit كاسم للملف.

## معالجة الأخطاء

يتضمّن نظام التكامل المستمر هذا بعض المعالجة البسيطة للأخطاء.

إذا قتلت عملية `test_runner.py`، فسيكتشف `dispatcher.py` أن المشغّل لم يعد متاحاً وسيزيله من المجموعة.

يمكنك أيضاً قتل مشغّل الاختبارات، لتحاكي تعطّل آلة أو فشل شبكة. وإن فعلت ذلك، سيدرك المرسِل أن المشغّل تعطّل، وسيعطي المهمة إلى مشغّل اختبار آخر إن كان أحدها متاحاً في المجموعة، أو سينتظر مشغّل اختبارات جديداً ليسجّل نفسه في المجموعة.

إذا قتلت المرسِل، فسيدرك مراقب المستودع أنه تعطّل ويرفع استثناء. وسيلاحظ مشغّلو الاختبارات ذلك أيضاً وسيتوقّفون.

## الخلاصة

بن فصل المسؤوليات إلى عمليات مستقلة، تمكّنّا من بناء الأساسيات لنظام تكامل مستمر موزّع. ومع تواصل العمليات بعضها مع بعض عبر طلبات المقابس، تمكّنّا من توزيع النظام على عدة آلات، مما يساعد على جعل نظامنا أكثر موثوقية وقابلية للتوسّع.

ولأن نظام التكامل المستمر بسيط الآن، يمكنك توسيعه بنفسك ليصبح أكثر وظيفة بكثير. وإليك بعض الاقتراحات للتحسينات:

### تشغيل الاختبارات لكل commit

يفحص النظام الحالي دورياً ما إذا كانت هناك commits جديدة، وسيشغّل أحدث commit. ينبغي تحسين هذا لاختبار كل commit. وللقيام بذلك، يمكنك تعديل الفاحص الدوري ليوجّه جولات اختبار لكل commit في السجل بين آخر commit اختُبر وأحدث commit.

### مشغّلو اختبارات أذكى

إذا اكتشف مشغّل الاختبارات أن المرسِل لا يستجيب، فإن يتوقّف عن التشغيل. ويحدث هذا حتى عندما يكون مشغّل الاختبارات في منتصف تشغيل الاختبارات! سيكون أفضل لو انتظر مشغّل الاختباراتلمدة من زمن (أو إلى الأبد، إن لم تكن تهتم بإدارة الموارد) كي يعود المرسِل إلى العمل. وفي هذه الحالة، إذا تعطّل المرسِل بينما يكون مشغّل الاختبارات يشغّل اختباراً بنشاط، فبدلاً من التوقّف سيُكمل الاختبار وينتظر عودة المرسِل إلى العمل، ثم يبلّغه بالنتائج. وسيؤدي هذا إلى ضمان أننا لا نُهدر أي جهد بذله مشغّل الاختبارات، وأننا لن نشغّل الاختبارات إلا مرة واحدة لكل commit.

### تقارير حقيقية

في نظام تكامل مستمر حقيقي، تُبلَّغ نتائج الاختبارات إلى خدمة إبلاغ تجمع النتائج، وتنشرها في مكان ما ليتبناها الناس، وتُشعر قائمة بالأطراف المهتمة عند حدوث فشل أو حدث بارز آخر. ويمكنك توسيع نظام التكامل المستمر البسيط لدينا بإنشاء عملية جديدة تتلقّى النتائج المُبلَّغ عنها، بدلاً من أن يجمعها المرسِل. ويمكن أن تكون هذه العملية الجديدة خادم ويب (أو يمكنها الاتصال بخادم ويب) ينشر النتائج على الإنترنت، وقد يستخدم خادم بريد لتنبيه المشتركين بأي فشل في الاختبارات.

### مدير مشغّلي الاختبارات

حالياً، عليك تشغيل ملف `test_runner.py` يدوياً لبدء مشغّل اختبارات. وبدلاً من ذلك، يمكنك إنشاء عملية مدير لمشغّلي الاختبارات تقيّم الحمل الحالي لطلبات الاختبار من المرسِل وتوسّع عدد مشغّلي الاختبارات النشطين تبعاً لذلك. وستتلقّى هذه العملية رسائل `runtest` وتبدأ عملية مشغّل اختبارات لكل طلب، وتقتل العمليات غير المستخدمة حين ينخفض الحمل.

وباستخدام هذه الاقتراحات، يمكنك جعل نظام التكامل المستمر البسيط هذا أكثر متانة وتسامحاً مع الأعطال، ويمكنك دمجه مع أنظمة أخرى، مثل مُبلِّغ اختبارات مستند إلى الويب.

وإن رغبت في رؤية المستوى من المرونة الذي يمكن أن تبلغه أنظمة التكامل المستمر، فإنني أنصح بالنظر في [Jenkins](https://github.com/aosabook/500lines/blob/master/<http://jenkins-ci.org/>)، وهو نظام تكامل مستمر مفتوح المصدر شديد المتانة مكتوب في Java. فهو يوفّر لك نظام تكامل مستمر أساسياً يمكنك توسيعه باستخدام الإضافات. ويمكنك أيضاً الوصول إلى شيفرته المصدريّة [عبر GitHub](https://github.com/aosabook/500lines/blob/master/<https://github.com/jenkinsci/jenkins/>). ومشروع آخر مُوصى به هو [Travis CI](https://github.com/aosabook/500lines/blob/master/<https://travis-ci.org/>)، وهو مكتوب في Ruby وشيفرته المصدريّة متاحة أيضاً [عبر GitHub](https://github.com/aosabook/500lines/blob/master/<https://github.com/travis-ci/travis-ci>).

كان هذا تمريناً على فهم كيفية عمل أنظمة التكامل المستمر، وكيف تبني واحدة بنفسك. وينبغي أن يكون لديك الآن فهم أكثر رسوخاً لما يلزم لجعل نظام موزّع موثوق، ويمكنك الآن استخدام هذه المعرفة لتطوير حلول أكثر تعقيداً.
