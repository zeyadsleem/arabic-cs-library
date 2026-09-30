---
title: "Introduction"
lang: ar
source: https://aosabook.org/en/v2/intro2.html
---

معمارية تطبيقات المصادر المفتوحة (المجلد الثاني)مقدمة

# معمارية تطبيقات المصادر المفتوحة (المجلد الثاني) مقدمة

Amy Brown وGreg Wilson

إذا استمتعت بهذه الكتب، فقد يعجبك أيضًا [التصميم البرمجي بالأمثلة في بايثون (Software Design by Example in Python)](https://third-bit.com/sdxpy/) و[التصميم البرمجي بالأمثلة في جافاسكربت (Software Design by Example in JavaScript)](https://third-bit.com/sdxjs/).

في مقدّمة الجزء الأول من هذه السلسلة، كتبنا:

> تتشارك عمارة المباني مع معمارية البرمجيات في الكثير، غير أن بينهما فرقًا حاسمًا واحدًا. فبينما يدرس المهندسون المعماريون آلاف المباني في تكوينهم وطول حياتهم المهنية، لا يعرف معظم مطوّري البرمجيات عن قرب إلا حفنة من البرامج الكبيرة&hellip; والنتيجة أنهم يكرّرون أخطاء بعضهم بعضًا بدلًا من أن يبني بعضهم على نجاحات بعضهم&hellip; وهذا الكتاب هو محاولةنا لتغيير ذلك.

في العام الذي مضى منذ صدور ذلك الكتاب، عمل أكثر من اثنتين وعشرين شخصًا بجدّ على إنشاء الجزء التالي الذي بين يديك الآن. وقد فعلوا ذلك لأنهم يؤمنون، كما نؤمن، بأن التصميم البرمجي يمكن تعليمه ويجب أن يُعلَّم بالأمثلة&mdash; وأن أفضل طريقة لتعلّم التفكير كخبير هي دراسة كيف يفكّر الخبراء. ومن خوادم الويب والمترجّمين، مرورًا بأنظمة إدارة السجلات الصحية، وصولًا إلى البنية التحتية التي تستخدمها Mozilla لإطلاق Firefox، هناك دروس في كل مكان حولنا. ونأمل أن نتمكن، بجمع بعضها معًا في هذا الكتاب، من مساعدتك على أن تصبح مطوّرًا أفضل.

&mdash; Amy Brown وGreg Wilson

## المساهمون

*Andrew Alexeev ([nginx](https://aosabook.org/en/v2//book/aosabook/v2-nginx/))*: Andrew هو أحد المؤسّسين لشركة Nginx, Inc.&mdash; الشركة التي تقف خلف nginx. وقبل انضمامه إلى Nginx, Inc. في مطلع عام 2011، عمل Andrew في صناعة الإنترنت وفي شتّى أقسام تقنيات المعلومات والاتصالات (ICT) في الشركات الكبرى. ويحمل Andrew دبلومًا في الهندسة الإلكترونية من جامعة سانت بطرسبرغ للهندسة الكهربائية، وماجستير إدارة الأعمال التنفيذية (executive MBA) من Antwerp Management School.

*Chris AtLee ([Firefox Release Engineering](https://aosabook.org/en/v2//book/aosabook/v2-ffreleng/))*: يحبّ Chris عمله في إدارة مهندسي الإصدار (Release Engineers) في Mozilla. ويحمل درجة البكالوريوس (BMath) في علوم الحاسوب من جامعة ووترلو. وتجد تأمّلاته على الإنترنت في [http://atlee.ca](http://atlee.ca).

*Michael Bayer ([SQLAlchemy](https://aosabook.org/en/v2//book/aosabook/v2-sqlalchemy/))*: يعمل Michael Bayer مع البرمجيات مفتوحة المصدر وقواعد البيانات منذ منتصف التسعينيات. وهو اليوم نشط في مجتمع Python، ويجهد لنشر الممارسات البرمجية الجيدة على جمهور يتّسع باستمرار. تابع Mike على Twitter باسم `@zzzeek`.

*Lukas Blakk ([Firefox Release Engineering](https://aosabook.org/en/v2//book/aosabook/v2-ffreleng/))*: تخرّج Lukas من Seneca College في تورونتو بدرجة بكالوريوس في تطوير البرمجيات عام 2009، لكنه بدأ العمل مع فريق هندسة الإصدار في Mozilla وهو بعد طالب، بفضل دورات *Topics in Open Source* التي يقدّمها Dave Humphrey ([http://vocamus.net/dave/](http://vocamus.net/dave/)). ويمكن متابعة مغامرات Lukas Blakk مع المصادر المفتوحة على مدونتها في [http://lukasblakk.com](http://lukasblakk.com).

*Amy Brown (تحرير)*: عملت Amy في صناعة البرمجيات عشر سنوات قبل أن تترك العمل لتؤسس مشروعًا مستقلًّا في التحرير وإنتاج الكتب. وهي تحمل درجة في الرياضيات من جامعة ووترلو لم تُوظَّف على نحو كافٍ. ويمكن العثور عليها على الإنترنت في [http://www.amyrbrown.ca/](http://www.amyrbrown.ca/).

*Michael Droettboom ([matplotlib](https://aosabook.org/en/v2//book/aosabook/v2-matplotlib/))*: يعمل Michael Droettboom في STScI على تطوير برمجيات علمية ومعايرة لتلسكوبَي هابل وجيمس ويب الفضائيين. وهو يعمل على مشروع matplotlib منذ عام 2007.

*Elizabeth Flanagan ([Yocto](https://aosabook.org/en/v2//book/aosabook/v2-yocto/))*: تعمل Elizabeth Flanagan في مركز تقنيات المصدر المفتوح (Open Source Technologies Center) بشركة Intel Corp بوصفها مهندسة البناء والإصدار في مشروع Yocto. وهي المسؤولة (maintainer) عن Yocto Autobuilder، وتساهم في مشروع Yocto وفي OE-Core. وتقيم في بورتلاند بولاية أوريغون، ويمكن العثور عليها على الإنترنت في [http://www.hacklikeagirl.com](http://www.hacklikeagirl.com).

*Jeff Hardy ([The Dynamic Language Runtime and the Iron Languages](https://aosabook.org/en/v2//book/aosabook/v2-ironlang/))*: بدأ Jeff البرمجة في الثانوية، وأدى ذلك إلى نيله درجة بكالوريوس في هندسة البرمجيات من جامعة ألبرتا، وإلى موقعه الحالي في كتابة شيفرة بايثون لـ Amazon.com في سياتل. وهو أيضًا يقود تطوير IronPython منذ عام 2010. ويمكنك العثور على مزيد من المعلومات عنه في [http://jdhardy.ca](http://jdhardy.ca).

*Sumana Harihareswara ([MediaWiki](https://aosabook.org/en/v2//book/aosabook/v2-mediawiki/))*: تدير Sumana مجتمع MediaWiki بوصفها منسّقة التطوير التطوعية في مؤسسة Wikimedia Foundation. وقد عملت سابقًا مع مشاريع GNOME وEmpathy وTelepathy وMiro وAltLaw. وهي عضو في المجلس الاستشاري لمبادرة Ada، التي تدعم النساء في التقنية والثقافة المفتوحتين. وتقيم في مدينة نيويورك. وموقعها الشخصي هو [http://www.harihareswara.net/](http://www.harihareswara.net/).

*Tim Hunt ([Moodle](https://aosabook.org/en/v2//book/aosabook/v2-moodle/))*: بدأ Tim Hunt حياته عالم رياضيات، فنال درجة الدكتوراه في الديناميكا غير الخطية من جامعة كامبريدج، قبل أن يقرّر أن يقضي حياته في شيء أقلّ غرابة قليلًا. وهو يعمل اليوم مطوّر برمجيات أولًا (Leading Software Developer) في الجامعة المفتوحة (Open University) في ميلتون كينز بالمملكة المتحدة، حيث يعمل على نظُم التعلّم والتدريس التي تستند إلى Moodle. ومنذ عام 2006 وهو المسؤول عن وحدة الاختبارات (quiz module) في Moodle وعن شيفرة بنك الأسئلة، وهو دور لا يزال يستمتع به. ومن عام 2008 إلى 2009 أمضى Tim سنة في أستراليا يعمل في مكاتب Moodle HQ. ويدوّن على مدونته في [http://tjhunt.blogspot.com](http://tjhunt.blogspot.com)، ويمكن العثور عليه على Twitter باسم `@tim_hunt`.

*John Hunter ([matplotlib](https://aosabook.org/en/v2//book/aosabook/v2-matplotlib/))*: John Hunter محلّل كمّي (Quantitative Analyst) في TradeLink Securities. وقد نال درجة الدكتوراه في علم الأعصاب من جامعة شيكاغو لأعمال نمذجة تجريبية ورقمية تتناول التزامن، وأكمل عمله على عمليات التزامن بصفته باحثًا بعد الدكتوراه في طب الأعصاب، حيث عمل على الصرع. وفي عام 2005 ترك الأوساط الأكاديمية للعمل في التمويل الكمّي. وهو مبرمج بايثون شغوف ومُحاضِر في الحوسبة العلمية باستخدام بايثون، وهو المؤلف الأصلي والمطوّر الرئيسي لمجموعة التصوّر العلمي matplotlib.

*Luis Ib&aacute;&ntilde;ez ([ITK](https://aosabook.org/en/v2//book/aosabook/v2-itk/))*: عمل Luis اثنتي عشرة سنة على تطوير Insight Toolkit (ITK)، وهي مكتبة برمجيات مفتوحة المصدر لتحليل الصور الطبية. وهو من الداعمين القويين للإتاحة المفتوحة (open access) ولإحياء التحقّق من قابلية إعادة الإنتاج (reproducibility) في النشر العلمي. ويقدّم Luis منذ عام 2007 دورةً في ممارسات البرمجيات مفتوحة المصدر (Open Source Software Practices) في معهد Rensselaer للتقنية.

*Mike Kamermans ([Processing.js](https://aosabook.org/en/v2//book/aosabook/v2-pjs/))*: بدأ Mike Kamermans حياته المهنية في علوم الحاسوب برسبه في مادة «Computer Science» التقنية، ثم انتقل في الحال إلى نيل درجة الماجستير في الذكاء الاصطناعي بدلًا من ذلك. وهو يبرمج منذ عام 1998 كي لا يضطر إلى البرمجة، مع تركيزه على منح الناس الأدوات التي يحتاجونها لإنجاز المهام التي عليهم إنجازها. وقد ركّز على أمور كثيرة أخرى أيضًا، منها تأليف كتاب عن قواعد اللغة اليابانية، وكتابة شرح مفصّل للرياضيات الكامنة وراء منحنيات B&eacute;zier. وصفحته الرئيسية، قليلًا الاستخدام، في [http://pomax.nihongoresources.com](http://pomax.nihongoresources.com).

*Luke Kanies ([Puppet](https://aosabook.org/en/v2//book/aosabook/v2-puppet/))*: أسّس Luke شركتَي Puppet وPuppet Labs عام 2005 مدفوعًا بالخوف واليأس، بهدف إنتاج أدوات تشغيل أفضل وتغيير الطريقة التي نُدير بها أنظمتنا. وهو ينشر ويتحدّث عن عمله في إدارة أنظمة Unix منذ عام 1997، مع التركيز على التطوير منذ عام 2001. وقد طوّر ونشر أدوات إدارة النظام (sysadmin) بسيطة متعددة، وأسهم في منتجات راسخة مثل Cfengine، وقدّم عروضًا عن Puppet وأدوات أخرى في أنحاء العالم، منها في OSCON وLISA وLinux.Conf.au وFOSS.in. وكان عمله مع Puppet جزءًا مهمًّا من DevOps ومن تحقيق وعد الحوسبة السحابية.

*Brad King ([ITK](https://aosabook.org/en/v2//book/aosabook/v2-itk/))*: انضم Brad King إلى Kitware بوصفه عضوًا مؤسِّسًا في مجموعة Software Process. ونال درجة الدكتوراه في علوم الحاسوب من معهد Rensselaer للتقنية. وهو أحد المطوّرين الأصليين في Insight Toolkit (ITK)، وهي مكتبة برمجيات مفتوحة المصدر لتحليل الصور الطبية. وفي Kitware يتركّز عمل الدكتور King على الأساليب والأدوات اللازمة لتطوير البرمجيات مفتوحة المصدر. وهو مطوّر أساسي في CMake، وقدّم إسهامات في مشاريع برمجيات مفتوحة المصدر عديدة، منها VTK وParaView.

*Simon Marlow ([The Glasgow Haskell Compiler](https://aosabook.org/en/v2//book/aosabook/v2-ghc/))*: Simon Marlow مطوّر في مختبر Cambridge في Microsoft Research، وقد أمضى أربعة عشر عامًا في البحث والتطوير باستخدام Haskell. وهو أحد المطوّرين الرئيسيين في مترجم Glasgow Haskell Compiler، وهو المسؤول — بين أمور أخرى — عن نظام التشغيل الخاص به (runtime system). ومؤخرًا كان تركيز Simon الرئيسي على توفير دعم ممتاز للبرمجة المتزامنة والمتوازية باستخدام Haskell. ويمكن التواصل مع Simon عبر `@simonmar` على Twitter، أو +Simon Marlow على Google+.

*Kate Matsudaira ([Scalable Web Architecture and Distributed Systems](https://aosabook.org/en/v2//book/aosabook/v2-distsys/))*: عملت Kate Matsudaira كنائبة رئيس الهندسة ومديرة تقنية (VP Engineering/CTO) في عدة شركات تقنية ناشئة، منها حاليًا Decide، وسابقًا SEOmoz وDelve Networks (التي استحوذت عليها Limelight). وقبل دخولها عالم الشركات الناشئة أمضت وقتًا بوصفها مهندسة برمجيات وقائدة تقنية ومديرًا في Amazon وMicrosoft. وKate صاحبة معرفة وخبرة عملية مباشرة في بناء أنظمة ويب موزّعة واسعة النطاق، والبيانات الضخمة (big data)، والحوسبة السحابية، والقيادة التقنية. وتحمل Kate درجة بكالوريوس في علوم الحاسوب من Harvey Mudd College، وقد أتمّت دراسات عليا في جامعة واشنطن في مجالَي الأعمال وعلوم الحاسوب (ماجستير). ويمكنك قراءة المزيد على مدونتها وموقعها [http://katemats.com](http://katemats.com).

*Jessica McKellar ([Twisted](https://aosabook.org/en/v2//book/aosabook/v2-twisted/))*: Jessica McKellar مهندسة برمجيات من بوسطن بولاية ماساتشوستس. وهي المسؤولة (maintainer) عن Twisted، وعضو في مؤسسة Python Software Foundation، ومنظّمة لمجموعة مستخدمي Python في بوسطن. ويمكن العثور عليها على الإنترنت في [http://jesstess.com](http://jesstess.com).

*John O'Duinn ([Firefox Release Engineering](https://aosabook.org/en/v2//book/aosabook/v2-ffreleng/))*: يقود John O'Duinn مجموعة هندسة الإصدار في Mozilla منذ مايو 2007. وخلال هذه الفترة قاد عملًا يهدف إلى تبسيط آليات إصدار Mozilla وتحسين إنتاجية المطوّرين&mdash; مع القيام بذلك كلّه أيضًا تحسينًا لحياة مهندسي الإصدار. وانضم John إلى هندسة الإصدار قبل 19 عامًا حين أصدر برمجيات أعادت طرح خلل (bug) كان قد أُصلح في إصدار سابق. ومدونته في [http://oduinn.com/](http://oduinn.com/).

*Guillaume Paumier ([MediaWiki](https://aosabook.org/en/v2//book/aosabook/v2-mediawiki/))*: Guillaume Paumier مدير الاتصالات التقنية (Technical Communications Manager) في مؤسسة Wikimedia Foundation، وهي المؤسسة غير الربحية التي تقف خلف Wikipedia وMediaWiki. وهو مصوّر ومحرّر في Wikipedia منذ عام 2005، ومؤلف دليلٍ لـ Wikipedia باللغة الفرنسية. كما يحمل درجة الهندسة في الفيزياء ودرجة الدكتوراه في الأنظمة الدقيقة (microsystems) للعلوم الحيوية. وصفحته على الإنترنت في [http://guillaumepaumier.com](http://guillaumepaumier.com).

*Benjamin Peterson ([PyPy](https://aosabook.org/en/v2//book/aosabook/v2-pypy/))*: يساهم Benjamin في CPython وPyPy وكذلك في عدة مكتبات بايثون. وهو مهتمٌّ عمومًا بالمترجّمين (compilers) والمفسّرين (interpreters)، ولا سيما الخاصة باللغات الديناميكية. وخارج البرمجة، يستمتع بالموسيقى (الكلارينيت، والبيانو، والتأليف)، والرياضيات المجرّدة، والأدب الألماني، والطعام الرائع. وموقعه هو [http://benjamin-peterson.org](http://benjamin-peterson.org).

*Simon Peyton Jones ([The Glasgow Haskell Compiler](https://aosabook.org/en/v2//book/aosabook/v2-ghc/))*: Simon Peyton Jones باحث في Microsoft Research Cambridge، وقد كان قبل ذلك أستاذ علوم الحاسوب في جامعة غلاسكو. وإلهامًا من أناقة البرمجة الوظيفية الخالصة (purely functional programming) حين كان طالبًا، أمضى Simon قرابة ثلاثين عامًا من البحث في متابعة تلك الفكرة ليرى إلى أين تقود. وHaskell هو أول ما أنجب، ولا يزال يمثّل المنصّة التي تقوم عليها كثير من أبحاثه. [http://research.microsoft.com/~simonpj](http://research.microsoft.com/~simonpj)

*Susan Potter ([Git](https://aosabook.org/en/v2//book/aosabook/v2-git/))*: Susan Potter مطوّرة برمجيات متعدّدة اللغات، تميل بطبعها إلى التشكيك. وهي تصمّم وتطوّر وتنشر خدمات وتطبيقات تداول موزّعة منذ عام 1996، وقد انتقلت مؤخرًا إلى بناء أنظمة متعددة المستأجرين (multi-tenant) لشركات البرمجيات. وهي مستخدمة متحمّسة (power user) لـ Git وLinux وVim. ويمكنك متابعتها وهي تنشر على Twitter أفكارًا عشوائية عن Erlang وHaskell وScala و(بالطبع) Git باسم `@SusanPotter`.

*Eric Raymond ([GPSD](https://aosabook.org/en/v2//book/aosabook/v2-gpsd/))*: Eric S. Raymond عالم أنثروبولوجيا جوّال وفيلسوف مشاغب. وقد كتب بعض الشيفرة أيضًا. وإن لم تكن تضحك حتى الآن، فلماذا تقرأ هذا الكتاب؟

*Jennifer Ruttan ([OSCAR](https://aosabook.org/en/v2//book/aosabook/v2-oscar/))*: تعيش Jennifer Ruttan في تورونتو. ومنذ تخرّجها من جامعة تورونتو بدرجة في علوم الحاسوب، وهي تعمل مهندسة برمجيات في شركة Indivica، وهي شركة تكرّس نفسها لتحسين رعاية المرضى عبر استخدام التقنيات الحديثة. تابعها على Twitter باسم `@jenruttan`.

*Stan Shebs ([GDB](https://aosabook.org/en/v2//book/aosabook/v2-gdb/))*: كانت المصادر المفتوحة عمل Stan اليومي منذ عام 1989، حين احتاج زميل في Apple إلى مترجم يولّد شيفرة لآلة افتراضية تجريبية (VM) فكان GCC 1.31 بين يديه. وبعد متابعة منفذ GCC على Mac System 7 الذي لم يُصدَّق غالبًا (كان حالة الضبط في تلك التجربة)، انتقل Stan إلى Cygnus Support حيث صان GDB لصالح FSF وساعد في مشاريع أدوات مضمّنة كثيرة. وبعودته إلى Apple عام 2000 عمل على GCC وGDB لأجل Mac OS X. وبعد قضاء وقت قصير في Mozilla، انتقل إلى CodeSourcery، وهي الآن جزء من Mentor Graphics، حيث يواصل تطوير ميزات جديدة لـ GDB. ويُفسَّر الطابع المحاضَري في أسلوب Stan بكونه حاصلًا على درجة الدكتوراه في علوم الحاسوب من جامعة يوتا.

*Michael Snoyman ([Yesod](https://aosabook.org/en/v2//book/aosabook/v2-yesod/))*: حصل Michael Snoyman على درجة البكالوريوس في الرياضيات من UCLA. وبعد عمله خبيرًا في حسابات التأمين في الولايات المتحدة، انتقل إلى إسرائيل وبدأ مسارًا مهنيًا في تطوير الويب. ولكي ينتج مواقع عالية الأداء ومتينة بسرعة، أنشأ إطار الويب Yesod ومكتباته المرتبطة.

*Jeffrey M. Squyres ([Open MPI](https://aosabook.org/en/v2//book/aosabook/v2-openmpi/))*: يعمل Jeff في قسم خوادم الرفوف (rack servers) في Cisco، وهو ممثل Cisco في هيئة معايير MPI Forum، ومؤلف أحد فصول معيار MPI-2. وهو مطوّر البرمجيات الأساسي في Cisco ضمن مشروع Open MPI مفتوح المصدر. وقد عمل في مجال الحوسبة عالية الأداء (HPC) منذ أيامه الأولى كطالب دراسات عليا في منتصف التسعينيات. وبعد جولات من الخدمة الفعلية في الجيش، حصل على درجة الدكتوراه في علوم الحاسوب والهندسة من جامعة نوتردام عام 2004. وهو يدوّن عن [شبكات الحوسبة عالية الأداء (High Performance Computing Networking)](http://blogs.cisco.com/category/performance/).

*Martin S&uacute;strik ([ZeroMQ](https://aosabook.org/en/v2//book/aosabook/v2-zeromq/))*: Martin S&uacute;strik خبير في مجال الوسائط البرمجية للمراسلة (messaging middleware)، وقد شارك في إنشاء المعيار AMQP وفي تنفيذه المرجعي. وقد شارك في مشاريع مراسلة مختلفة في صناعة التمويل. وهو أحد مؤسسي مشروع &Oslash;MQ، وهو يعمل حاليًا على التكامل بين تقنيات المراسلة وأنظمة التشغيل وحزمة الإنترنت (Internet stack). ويمكن التواصل معه على `sustrik@250bpm.com`، و[http://www.250bpm.com](http://www.250bpm.com)، وعلى Twitter باسم `@sustrik`.

*Christopher Svec ([FreeRTOS](https://aosabook.org/en/v2//book/aosabook/v2-freertos/))*: Chris مهندس برمجيات مضمّنة (embedded)، ويطوّر حاليًا برمجيات ثابتة (firmware) للرقائق اللاسلكية منخفضة الاستهلاك. وفي حياة سابقة كان يصمّم معالجات x86، وهو أمر مفيد أكثر مما تظنّ عند العمل على معالجات غير x86. ويحمل Chris درجتي البكالوريوس والماجستير في الهندسة الكهربائية وهندسة الحاسوب، كلتاهما من جامعة بوردو. ويُقيم في بوسطن مع زوجته وكلب من فصيلة Golden Retriever. ويمكنك العثور عليه على الويب في [http://saidsvec.com](http://saidsvec.com).

*Barry Warsaw ([GNU Mailman](https://aosabook.org/en/v2//book/aosabook/v2-mailman/))*: Barry Warsaw قائد مشروع GNU Mailman. وهو مطوّر أساسي في Python منذ عام 1995، ومدير إصدار لعدة إصدارات من Python. وهو يعمل حاليًا في Canonical بوصفه مهندس برمجيات في فريق «Ubuntu Platform Foundations». ويمكن التواصل معه على `barry@python.org` أو `@pumpichank` على Twitter. وصفحته الرئيسية هي [http://barry.warsaw.us](http://barry.warsaw.us).

*Greg Wilson (تحرير)*: عمل Greg على مدى الخمسة والعشرين سنة الماضية في الحوسبة العلمية عالية الأداء، وتصوّر البيانات، وأمن الحاسوب، وهو مؤلف أو محرّر لعدة كتب في الحوسبة (منها *Beautiful Code* الحائز على جائزة Jolt عام 2008) وكتابَين للأطفال. ونال Greg درجة الدكتوراه في علوم الحاسوب من جامعة إدنبرة عام 1993.

*Armen Zambrano Gasparnian ([Firefox Release Engineering](https://aosabook.org/en/v2//book/aosabook/v2-ffreleng/))*: يعمل Armen في Mozilla منذ عام 2008 بوصفه مهندس إصدار. وقد عمل على الإصدارات، وعلى تحسين البنية التحتية للمطوّرين، وعلى التعريب. ويعمل Armen مع الشباب في Church on the Rock في تورونتو، وقد عمل سنوات مع منظمات مسيحية غير ربحية دولية. ويحمل Armen درجة بكالوريوس في تطوير البرمجيات من Seneca College، وقد درس بضع سنوات في علوم الحاسوب بجامعة مالقة. ويدوّن على مدونته في [http://armenzg.blogspot.com](http://armenzg.blogspot.com).

## شكر وتقدير

نودّ أن نشكر Google على دعمها لعمل Amy Brown في هذا المشروع، وأن نشكر Cat Allman على ترتيبه إياه. ونودّ أيضًا أن نشكر جميع مراجعينا التقنيين:

| Johan Harjono | Justin Sheehy | Nikita Pchelin |
| --- | --- | --- |
| Laurie McDougall Sookraj | Tom Plaskon | Greg Lapouchnian |
| Will Schroeder | Bill Hoffman | Audrey Tang |
| James Crook | Todd Ritchie | Josh McCarthy |
| Andrew Petersen | Pascal Rapicault | Eric Aderhold |
| Jonathan Deber | Trevor Bekolay | Taavi Burns |
| Tina Yee | Colin Morris | Christian Muise |
| David Scannell | Victor Ng | Blake Winton |
| Kim Moir | Simon Stewart | Jonathan Dursi |
| Richard Barry | Ric Holt | Maria Khomenko |
| Erick Dransch | Ian Bull | Ellen Hsiang |

وخصوصًا Tavish Armstrong وTrevor Bekolay، الذين لولا مساعدتهما فوق ما يتطلّبه الواجب لما استغرق إنتاج هذا الكتاب وقتًا أطول بكثير. كما نشكر كل من عرض المراجعة لكن تعذّر عليه ذلك لأسباب مختلفة، وكل من ساعد ودعم إنتاج هذا الكتاب.

كما نشكر James Howe ([http://jameshowephotography.com/](http://jameshowephotography.com/))، الذي تفضّل بأن سمح لنا باستخدام صورته لمبنى Equitable Building في نيويورك في الغلاف.

## المساهمة

عمل عشرات المتطوعين بجدّ على إنشاء هذا الكتاب، لكن ما زال ثمة الكثير مما يجب إنجازه. ويمكنك المساعدة بالإبلاغ عن الأخطاء، أو بالمساعدة في ترجمة المحتوى إلى لغات أخرى، أو بوصف معمارية مشاريع برمجيات مفتوحة المصدر أخرى. فضّل مراسلتنا على `gvwilson@third-bit.com` إن رغبت في المشاركة.
