---
title: "زاحف ويب بكوروتينات asyncio"
lang: ar
source: https://aosabook.org/en/500L/crawler.html
---

_إيه. جيسي جيريو ديفيس مهندس أولى في MongoDB في نيويورك. كتب Motor، وهو مُشغّل MongoDB غير المتزامن لـ Python، وهو المطوّر الرئيسي لمشغّل C الخاص بـ MongoDB وعضو في فريق PyMongo. يساهم في asyncio وTornado. يكتب على [http://emptysqa.re](http://emptysqa.re)._

_غيدو فان روسوم هو مُنشئ Python، إحدى لغات البرمجة الرئيسية على الويب وخارجه. يشار إليه في مجتمع Python بالحرف BDFL (الحاكم المستبدل الخيّر مدى الحياة)، وهو لقب مأخوذ مباشرة من مشهد في مونتي بايثون.  موطن غيدو على الويب هو [http://www.python.org/~guido/](http://www.python.org/~guido/)._

## مقدمة

يُركّز علم الحاسوب الكلاسيكي على الخوارزميات (algorithms) الكفؤة التي تُنجز الحسابات في أسرع وقت ممكن. لكن كثيراً من البرامج المتصلة بالشبكة لا تقضي وقتها في الحساب، بل في الإبقاء على اتصالات كثيرة مفتوحة إما بطيئة أو نادرة الأحداث. وتقدّم هذه البرامج تحدياً مختلفاً تماماً: انتظار عدد هائل من أحداث الشبكة بكفاءة. والمقاربة المعاصرة لهذه المشكلة هي الإدخال/الإخراج غير المتزامن (asynchronous I/O)، أو «غير المتزامن» (async).

يقدّم هذا الفصل زاحف ويب بسيطاً. والزاحف تطبيق غير متزامن نموذجي لأنه ينتظر استجابات كثيرة لكنه يقوم بحساب قليل. وكلما زاد عدد الصفحات التي يستطيع جلبها دفعة واحدة، زاد سرعته في الإنجاز. وإن خصّص خيطاً (thread) لكل طلب جارٍ، فمع ارتفاع عدد الطلبات المتزامنة سينفد من الذاكرة أو من موارد أخرى متعلقة بالخيوط قبل أن ينفد من المقابس (sockets). وهو يتجنّب الحاجة إلى الخيوط باستخدام الإدخال/الإخراج غير المتزامن.

نقدّم المثال على ثلاث مراحل. أولاً، نعرض حلقة أحداث (event loop) غير متزامنة ونرسم زاحفاً يستخدم الحلقة مع دوال استدعاء (callbacks): وهو فعّال جداً، لكن توسيعه إلى مشكلات أكثر تعقيداً سيؤدي إلى شيفرة متشابكة (spaghetti) غير قابلة للإدارة. ثانياً، بالتالي، نبيّن أن الكوروتينات (coroutines) في Python فعّالة وقابلة للتوسّع معاً. وننفّذ كوروتينات بسيطة في Python باستخدام دوال المولّدات (generators). وفي المرحلة الثالثة، نستخدم الكوروتينات الكاملة المزايا من مكتبة «asyncio» القياسية في Python[^16]، وننسّق بينها باستخدام طابور (queue) غير متزامن.

## المهمة

يجد زاحف الويب جميع صفحات موقع ما وينزّلها، ربما لأرشفتها أو لفهرستها. ابتداءً من عنوان URL جذر، يجلب كل صفحة، ويحللها بحثاً عن روابط إلى صفحات لم تُرَ من قبل، ويضيف هذه الروابط إلى طابور. ويتوقف حين يجلب صفحة لا تحتوي على روابط جديدة ويصبح الطابور فارغاً.

ويمكننا تسريع هذه العملية بتنزيل صفحات كثيرة في وقت واحد. فحين يعثر الزاحف على روابط جديدة، يطلق عمليات جلب متزامنة للصفحات الجديدة عبر مقابس منفصلة. ويحلل الاستجابات فور وصولها، مضيفاً الروابط الجديدة إلى الطابور. وقد تأتي نقطة يتناقص عندها العائد فيضرّ الإفراط في التزامن بالأداء، لذلك نحدّ من عدد الطلبات المتزامنة، ونترك بقية الروابط في الطابور حتى تكتمل بعض الطلبات الجارية.

## النهج التقليدي

كيف نجعل الزاحف متزامناً؟ تقليدياً ننشئ مجموعة خيوط (thread pool). ويكون لكل خيط مسؤولية تنزيل صفحة واحدة في كل مرة عبر مقبس. فمثلاً، لتنزيل صفحة من `xkcd.com`:

```python
def fetch(url):
    sock = socket.socket()
    sock.connect(('xkcd.com', 80))
    request = 'GET {} HTTP/1.0\r\nHost: xkcd.com\r\n\r\n'.format(url)
    sock.send(request.encode('ascii'))
    response = b''
    chunk = sock.recv(4096)
    while chunk:
        response += chunk
        chunk = sock.recv(4096)
    
    # Page is now downloaded.
    links = parse_links(response)
    q.add(links)
```

افتراضياً، تكون عمليات المقبس *حاجبة* (blocking): فحين يستدعي الخيط تابعاً مثل `connect` أو `recv`، يتوقف حتى تكتمل العملية.[^15] ولكي ننزّل صفحات كثيرة دفعة واحدة، نحتاج إلى خيوط كثيرة. ويقلّل التطبيق المتطوّر تكلفة إنشاء الخيوط بالاحتفاظ بخيوط خاملة في مجموعة خيوط، ثم استئجارها لإعادة استخدامها في المهام اللاحقة؛ وهو يفعل الشيء نفسه مع المقابس في مجموعة اتصالات.

ومع ذلك، الخيوط باهظة، وأنظمة التشغيل تفرض مجموعة متنوعة من الحدود الصارمة على عدد الخيوط التي قد تكون لعملية أو مستخدم أو آلة. وعلى نظام جيسي، يكلّف خيط Python نحو 50 كيلوبايت من الذاكرة، وإنشاء عشرات الآلاف من الخيوط يسبب أعطالاً. فإذا وسّعنا إلى عشرات الآلاف من العمليات المتزامنة على مقابس متزامنة، نفدنا من الخيوط قبل أن ننفد من المقابس. فالحمل الزائد لكل خيط أو حدود النظام على الخيوط هي عنق الزجاجة.

وفي مقاله المؤثر «مشكلة C10K»[^8]، يشرح دان كيجل قيود تعدد الخيوط بالنسبة التزامن الإدخال/الإخراج. ويبدأ بقوله:

> حان وقت لخوادم الويب أن تتعامل مع عشرة آلاف عميل في وقت واحد، أليس كذلك؟ فبعد كل شيء، صار الويب مكاناً كبيراً.

ابتكر كيجل مصطلح «C10K» عام 1999. عشرة آلاف اتصال تبدو رقماً صغيراً الآن، لكن المشكلة لم تتغيّر إلا في الحجم لا في النوع. فقد كان استخدام خيط لكل اتصال لتحقيق C10K غير عملي. أما الآن فالحد أعلى بمراتب كثير. وبالفعل، سيعمل زاحف الويب التجريبي لدينا بخيوط تماماً. لكن في التطبيقات فائقة الحجم، وبمئات الآلاف من الاتصالات، يبقى الحد قائماً: هناك حد تتجاوزه معظم الأنظمة فتظل قادرة على إنشاء المقابس لكنها نفدت من الخيوط. كيف نتغلب على ذلك؟

## غير المتزامن

تؤدي أطر الإدخال/الإخراج غير المتزامن عمليات متزامنة في خيط واحد باستخدام
مقابس *غير حاجبة* (non-blocking). وفي زاحفنا غير المتزامن، نجعل المقبس غير حاجب
قبل أن نبدأ الاتصال بالخادم:

```python
sock = socket.socket()
sock.setblocking(False)
try:
    sock.connect(('xkcd.com', 80))
except BlockingIOError:
    pass
```

وللأسف، يقذف المقبس غير الحاجب استثناءً من `connect`، حتى حين يعمل بصورة طبيعية. وتكرار هذا الاستثناء يعكس السلوك المُزعج للدالة C الأساسية، التي تضبط `errno` على `EINPROGRESS` لتخبرك أنها بدأت.

 ويحتاج زاحفنا الآن إلى وسيلة لمعرفة متى يُنشأ الاتصال، ليتمكن من إرسال طلب HTTP. ويمكننا ببساطة أن نواصل المحاولة في حلقة محكمة:

```python
request = 'GET {} HTTP/1.0\r\nHost: xkcd.com\r\n\r\n'.format(url)
encoded = request.encode('ascii')

while True:
    try:
        sock.send(encoded)
        break  # Done.
    except OSError as e:
        pass

print('sent')
```

وليس هذا الأسلوب يهدر الكهرباء فحسب، بل إنه لا يستطيع الانتظار بكفاءة لأحداث على مقابس *متعددة*. وفي الزمن القديم، كان حل BSD Unix لهذه المشكلة هو `select`، وهي دالة C تنتظر حدوث حدث على مقبس غير حاجب أو على مصفوفة صغيرة منها. أما اليوم فإن الطلب على تطبيقات إنترنت ذات أعداد هائلة من الاتصالات قد أدّى إلى بدائل مثل `poll`، ثم `kqueue` في BSD و`epoll` في Linux. وهذه الواجهات تشبه `select`، لكنها تعمل جيداً مع أعداد هائلة من الاتصالات.

ويستخدم `DefaultSelector` في Python 3.4 أفضل دالة شبيهة بـ `select` المتاحة على نظامك. وللتسجيل للحصول على إشعارات عن الإدخال/الإخراج الشبكي، ننشئ مقبساً غير حاجب ونسجله لدى المحدِّد الافتراضي:

```python
from selectors import DefaultSelector, EVENT_WRITE

selector = DefaultSelector()

sock = socket.socket()
sock.setblocking(False)
try:
    sock.connect(('xkcd.com', 80))
except BlockingIOError:
    pass

def connected():
    selector.unregister(sock.fileno())
    print('connected!')

selector.register(sock.fileno(), EVENT_WRITE, connected)
```

نهمل الخطأ الزائف ونستدعي `selector.register`، ممرِّرين واصف ملف المقبس وثابتاً يعبّر عن الحدث الذي ننتظره. ولِكي يصلك إشعار عند إنشاء الاتصال، نمرّر `EVENT_WRITE`: أي أننا نريد أن نعرف متى يصبح المقبس «قابلاً للكتابة». ونمرّر أيضاً دالة Python هي `connected` لتُنفَّذ عند وقوع ذلك الحدث. وتُعرف هذه الدالة بـ*دالة استدعاء* (callback).

نعالج إشعارات الإدخال/الإخراج فور وصولها من المحدِّد، في حلقة:

```python
def loop():
    while True:
        events = selector.select()
        for event_key, event_mask in events:
            callback = event_key.data
            callback()
```

تُخزَّن دالة الاستدعاء `connected` في `event_key.data`، ونسترجعها وننفّذها ما إن يتصل المقبس غير الحاجب.

على خلاف حلقتنا سريعة الدوران أعلاه، فإن الاستدعاء إلى `select` هنا يتوقف منتظراً أحداث الإدخال/الإخراج التالية. ثم تشغّل الحلقة دوال الاستدعاء التي تنتظر هذه الأحداث. وتبقى العمليات التي لم تكتمل معلّقة حتى دورات مستقبلية من حلقة الأحداث.

ماذا أثبتنا حتى الآن؟ بيّنا كيف نبدأ عملية وننفّذ دالة استدعاء عندما تصبح العملية جاهزة. وإطار غير متزامن (async *framework*) يبني على الخاصيتين اللتين أظهرناهما — المقابس غير الحاجبة وحلقة الأحداث — لتشغيل عمليات متزامنة في خيط واحد.

لقد بلغنا هنا «التزامن» (concurrency)، لكن ليس ما يُسمى تقليدياً «التوازي» (parallelism). أي أننا بنينا نظاماً صغيراً يقوم بإدخال/إخراج متداخل. وهو قادر على بدء عمليات جديدة بينما عمليات أخرى جارية. لكنه لا يستغل فعلياً عدة أنوية لتنفيذ الحساب بالتوازي. لكن هذا النظام مصمَّم لمشكلات مقيّدة بالإدخال/الإخراج، لا بمشكلات مقيّدة بالمعالج.[^14]

فحلقة الأحداث لدينا فعّالة في الإدخال/الإخراج المتزامن لأنها لا تكرّس موارد خيوط لكل اتصال. لكن قبل أن ننتقل، من المهم تصحيح سوء فهم شائع بأن غير المتزامن *أسرع* من تعدد الخيوط. فكثيراً ما لا يكون الأمر كذلك — بل إن حلقة أحداث مثل حلقتنا في Python أبطأ باعتدال من تعدد الخيوط في خدمة عدد قليل من الاتصالات النشطة جداً. وفي بيئة تشغيل بلا قفل تفسير عام، لأداء الخيوط أن تكون أفضل في هذا النوع من الأحمال. أما ما يناسبه الإدخال/الإخراج غير المتزامن فهو التطبيقات التي لها اتصالات كثيرة بطيئة أو خاملة بأحداث نادرة.[^11]<latex>[^bayer]</latex>

## البرمجة باستخدام دوال الاستدعاء

مع إطار العمل غير المتزامن الصغير جداً الذي بنيناه حتى الآن، كيف نبني زاحف ويب؟ فحتى جالب عنوان URL بسيط يكون كتابته مكلفاً.

نبدأ بمجموعتين عامتين من عناوين URL التي لم نجلبها بعد، والعناوين التي رأيناها:

```python
urls_todo = set(['/'])
seen_urls = set(['/'])
```

تتضمّن مجموعة `seen_urls` مجموعة `urls_todo` إضافةً إلى العناوين المكتملة. وتُهيَّأ المجموعتان بعنوان URL الجذر "/".

سيتطلب جلب صفحة سلسلة من دوال الاستدعاء. فدالة الاستدعاء `connected` تُطلق عند اتصال مقبس، وترسل طلب GET إلى الخادم. لكن عليها بعد ذلك أن تنتظر استجابة، فتسجّل دالة استدعاء أخرى. فإذا لم تستطع قراءة الاستجابة كاملةً عندما تُطلق تلك الدالة، فإنها تسجّل من جديد، وهكذا دواليك.

لنجمع دوال الاستدعاء هذه في كائن `Fetcher`. فهو يحتاج إلى عنوان URL وكائن مقبس، ومكانً لتجميع بايتات الاستجابة:

```python
class Fetcher:
    def __init__(self, url):
        self.response = b''  # Empty array of bytes.
        self.url = url
        self.sock = None
```

ونبدأ باستدعاء `Fetcher.fetch`:

```python
    # Method on Fetcher class.
    def fetch(self):
        self.sock = socket.socket()
        self.sock.setblocking(False)
        try:
            self.sock.connect(('xkcd.com', 80))
        except BlockingIOError:
            pass
            
        # Register next callback.
        selector.register(self.sock.fileno(),
                          EVENT_WRITE,
                          self.connected)
```

يبدأ تابع `fetch` بالاتصال بمقبس. لكن لاحظ أن التابع يعود قبل إنشاء الاتصال. ويجب أن يعيد التحكم إلى حلقة الأحداث لينتظر الاتصال. ولنفهم لماذا، تخيّل لو كان تطبيقنا بالكامل منظَّماً على هذا النحو:

```python
# Begin fetching http://xkcd.com/353/
fetcher = Fetcher('/353/')
fetcher.fetch()

while True:
    events = selector.select()
    for event_key, event_mask in events:
        callback = event_key.data
        callback(event_key, event_mask)
```

تُعالَج كل إشعارات الأحداث في حلقة الأحداث حين تستدعي `select`. لذا يجب على `fetch` أن يسلّم التحكم إلى حلقة الأحداث، ليعرف البرنامج متى قد اتصل المقبس. وعندئذٍ فقط تشغّل الحلقة دالة الاستدعاء `connected` التي سُجِّلت في نهاية `fetch` أعلاه.

وهذا هو تنفيذ `connected`:

```python
    # Method on Fetcher class.
    def connected(self, key, mask):
        print('connected!')
        selector.unregister(key.fd)
        request = 'GET {} HTTP/1.0\r\nHost: xkcd.com\r\n\r\n'.format(self.url)
        self.sock.send(request.encode('ascii'))
        
        # Register the next callback.
        selector.register(key.fd,
                          EVENT_READ,
                          self.read_response)
```

يرسل هذا التابع طلب GET. ويفحص تطبيق حقيقي قيمة الإرجاع من `send` تحسباً لتعذّر إرسال الرسالة كاملةً دفعة واحدة. لكن طلبنا صغير وتطبيقنا بسيط. فيستدعي `send` ببساطة، ثم ينتظر استجابة. وهو بالطبع ملزم بتسجيل دالة استدعاء أخرى والتخلص من التحكم إلى حلقة الأحداث. وتُعالج دالة الاستدعاء التالية والأخيرة، وهي `read_response`، رد الخادم:

```python
    # Method on Fetcher class.
    def read_response(self, key, mask):
        global stopped

        chunk = self.sock.recv(4096)  # 4k chunk size.
        if chunk:
            self.response += chunk
        else:
            selector.unregister(key.fd)  # Done reading.
            links = self.parse_links()
            
            # Python set-logic:
            for link in links.difference(seen_urls):
                urls_todo.add(link)
                Fetcher(link).fetch()  # <- New Fetcher.

            seen_urls.update(links)
            urls_todo.remove(self.url)
            if not urls_todo:
                stopped = True
```

تُنفَّذ دالة الاستدعاء في كل مرة يرى فيها المحدِّد أن المقبس «قابل للقراءة»، وهو ما قد يعني أمرين: أن المقبس فيه بيانات أو أنه مغلق.

وتطلب دالة الاستدعاء من المقبس ما يصل إلى أربعة كيلوبايتات من البيانات. فإن كان المتوفر أقل، احتوى `chunk` على البيانات المتاحة كلها. وإن كان أكثر، كان `chunk` بطول أربعة كيلوبايتات ويبقى المقبس قابلاً للقراءة، فتشغّل حلقة الأحداث دالة الاستدعاء هذه من جديد في الدورة التالية. وحين تكتمل الاستجابة، يكون الخادم قد أغلق المقبس ويكون `chunk` فارغاً.

ويعيد تابع `parse_links`، غير المُعرَض المعروض هنا، مجموعة من عناوين URL. ونبدأ جالباً جديداً لكل عنوان URL جديد، دون حد للتزامن. ولاحظ خاصية طيّفة في البرمجة غير المتزامنة باستخدام دوال الاستدعاء: لا نحتاج إلى كائن مزامنة (mutex) حول التغييرات في البيانات المشتركة، مثل حين نضيف روابط إلى `seen_urls`. فلا يوجد مهام متعددة استباقية، ولذلك لا يمكن مقاطعتنا عند نقاط عشوائية في شيفرتنا.

ونضيف متغيراً عاماً اسمه `stopped` ونستخدمه للتحكم في الحلقة:

```python
stopped = False

def loop():
    while not stopped:
        events = selector.select()
        for event_key, event_mask in events:
            callback = event_key.data
            callback()
```

ما إن تُنزَّل كل الصفحات يتوقف الجالب حلقة الأحداث العامة ويخرج البرنامج.

ويُظهر هذا المثال مشكلة غير المتزامن بوضوح: شيفرة متشابكة (spaghetti). فنحن بحاجة إلى وسيلة للتعبير عن سلسلة من الحسابات وعمليات الإدخال/الإخراج، ولجدولة عدة سلاسل من هذا النوع من العمليات لتعمل في وقت واحد. لكن من دون خيوط، لا يمكن جمع سلسلة من العمليات في دالة واحدة: فمتى تبدأ الدالة عملية إدخال/إخراج، فإنها تحفظ صراحةً أي حالة ستحتاجها في المستقبل ثم تعود. وأنت مسؤول عن التفكير في شيفرة حفظ الحالة هذه وكتابتها.

ولنشرح ما نقصده بذلك. لننظر في كم كان جلب عنوان URL على خيط بمقبس حاجب تقليدي بسيطاً:

```python
# Blocking version.
def fetch(url):
    sock = socket.socket()
    sock.connect(('xkcd.com', 80))
    request = 'GET {} HTTP/1.0\r\nHost: xkcd.com\r\n\r\n'.format(url)
    sock.send(request.encode('ascii'))
    response = b''
    chunk = sock.recv(4096)
    while chunk:
        response += chunk
        chunk = sock.recv(4096)
    
    # Page is now downloaded.
    links = parse_links(response)
    q.add(links)
```

ما الحالة التي تتذكرها هذه الدالة بين عملية مقبس والتي تليها؟ لديها المقبس وعنوان URL و`response` المتراكم.  تستخدم الدالة التي تعمل على خيط خصائص أساسية من لغة البرمجة لتخزين هذه الحالة المؤقتة في متغيّرات محلية، على مكدسها. ولدى الدالة أيضاً «استمرار» (continuation) — أي الشيفرة التي تزمع بتنفيذها بعد اكتمال الإدخال/الإخراج. وبيئة التشغيل تتذكر الاستمرار بتخزين مؤشر تعليمات الخيط. ولا تحتاج إلى التفكير في استعادة هذه المتغيّرات المحلية والاستمرار بعد الإدخال/الإخراج. فهو مبني في اللغة.

لكن مع إطار غير متزامن قائم على دوال الاستدعاء، لم تعد هذه الخصائص اللغوية نافعة. فأثناء انتظار الإدخال/الإخراج، يجب على الدالة أن تحفظ حالتها صراحةً، لأن الدالة تعود وتفقد إطار مكدسها قبل اكتمال الإدخال/الإخراج. وبدلاً من المتغيّرات المحلية، يخزّن مثالنا القائم على دوال الاستدعاء `sock` و`response` كسمتين لكائن `self`، أي نسخة Fetcher. وبدلاً من مؤشر التعليمات، يخزّن استمراره بتسجيل دوالتي الاستدعاء `connected` و`read_response`. ومع ازدياد ميزات التطبيق، يزداد تعقيد الحالة التي نحفظها يدوياً عبر دوال الاستدعاء. وتجعل هذه الأعمال الورقية الثقيلة المبرمج عرضة للصداع النصفي.

والأسوأ من ذلك، ماذا يحدث إذا ألقت دالة استدعاء استثناءً، قبل أن تجدول دالة الاستدعاء التالية في السلسلة؟ لنفترض أننا لم نُحسن تنفيذ تابع `parse_links` وأنه ألقى استثناءً أثناء تحليل some HTML:

```
Traceback (most recent call last):
  File "loop-with-callbacks.py", line 111, in <module>
    loop()
  File "loop-with-callbacks.py", line 106, in loop
    callback(event_key, event_mask)
  File "loop-with-callbacks.py", line 51, in read_response
    links = self.parse_links()
  File "loop-with-callbacks.py", line 67, in parse_links
    raise Exception('parse error')
Exception: parse error
```

لا يُظهر أثر المكدس سوى أن حلقة الأحداث كانت تشغّل دالة استدعاء. ونحن لا نتذكر ما أدى إلى الخطأ. السلسلة مقطوعة من الطرفين: نسينا إلى أين كنا ذاهبون ومن أين أتينا. وهذه الفقدة للسياق تُسمّى «تمزيق المكدس» (stack ripping)، وفي حالات كثيرة تربك المحقق. كما يمنعنا تمزيق المكدس من تثبيت معالج استثناءات لسلسلة من دوال الاستدعاء، بالطريقة التي يلفّ بها كتلة «try / except» تحيط باستدعاء دالة وشجرة أحفادها.[^7]

فحتى إلى جانب النقاش الطويل حول الكفاءة النسبية بين تعدد الخيوط وغير المتزامن، هناك نقاش آخر حول أيهما أكثر عرضة للخطأ: فالخيوط عرضة لتسابق البيانات (data races) إن أخطأنا في مزامنتها، أما دوال الاستدعاء فمعطّبة التصحيح بسبب تمزيق المكدس.

## الكوروتينات

نغريكم بوعد. فمن الممكن كتابة شيفرة غير متزامنة تجمع بين كفاءة دوال الاستدعاء والمظهر الكلاسيكي الجميل للبرمجة متعددة الخيوط. ويُتحقق هذا المزيج بنمط يُسمّى «الكوروتينات» (coroutines). وباستخدام مكتبة asyncio القياسية في Python 3.4 وحزمة اسمها «aiohttp»، يصبح جلب عنوان URL داخل كوروتين أمراً مباشراً جداً[^10]:

```python
    @asyncio.coroutine
    def fetch(self, url):
        response = yield from self.session.get(url)
        body = yield from response.read()
```

وهو قابل للتوسّع أيضاً. فمقارنةً بـ 50 كيلوبايت من الذاكرة لكل خيط والحدود الصارمة التي يفرضها نظام التشغيل على الخيوط، لا يستهلك كوروتين Python سوى 3 كيلوبايتات تقريباً من الذاكرة على نظام جيسي. ويستطيع Python بسهولة بدء مئات الآلاف من الكوروتينات.

ومفهوم الكوروتين، الذي يعود إلى أيام علم الحاسوب الأولى، بسيط: هو روتين فرعي يمكن إيقافه واستئنافه. في حين تُدار الخيوط مهام متعددة استباقياً بواسطة نظام التشغيل، فإن الكوروتينات تُدار مهام متعددة تعاونياً: فهي تختار متى تتوقف، وأي كوروتين يُشغَّل تالياً.

وهناك تطبيقات كثيرة للكوروتينات؛ حتى في Python هناك عدة منها. فالكوروتينات في مكتبة «asyncio» القياسية في Python 3.4 مبنية على المولّدات (generators) وصنف Future وتعبير «yield from».ابتداءً من Python 3.5، أصبحت الكوروتينات ميزة أصلية في اللغة نفسها[^17]؛ غير أن فهم الكوروتينات كما نُفِّذت أول مرة في Python 3.4 باستخدام تسهيلات اللغة الموجودة مسبقاً هو الأساس لمعالجة كوروتينات Python 3.5 الأصلية.

ولكي نشرح كوروتينات Python 3.4 القائمة على المولّدات، سنخوض في عرض للمولّدات (generators) وكيفية استخدامها كوروتينات في asyncio، ونثق أنك ستستمتع بقراءتها كما استمتعنا بكتبتها. وبعد أن نشرح الكوروتينات القائمة على المولّدات، سنستخدمها في زاحف الويب غير المتزامن لدينا.

## كيف تعمل مولّدات Python

قبل أن تفهم مولّدات Python، عليك أن تفهم كيف تعمل دوال Python العادية. فعادةً، حين تستدعي دالة Python روتيناً فرعياً، يحتفظ الروتين الفرعي بالتحكم حتى يعود أو يطرح استثناء. ثم يعود التحكم إلى المستدعي:

```python
>>> def foo():
...     bar()
...
>>> def bar():
...     pass
```

مفسّر Python القياسي مكتوب بلغة C. وتُسمّى دالة C التي تنفّذ دالة Python، باسم طموح، `PyEval_EvalFrameEx`. وهي تأخذ كائن إطار مكدس Python وتقيّم شيفرة بايت Python في سياق ذلك الإطار. وهذه شيفرة البايت الخاصة بـ `foo`:

```python
>>> import dis
>>> dis.dis(foo)
  2           0 LOAD_GLOBAL              0 (bar)
              3 CALL_FUNCTION            0 (0 positional, 0 keyword pair)
              6 POP_TOP
              7 LOAD_CONST               0 (None)
             10 RETURN_VALUE
```

تحمّل الدالة `foo` القيمة `bar` على مكدسها وتستدعيها، ثم تُخرج قيمة إرجاعها من المكدس، وتحمّل `None` على المكدس، وتعيد `None`.

وحين تصادف `PyEval_EvalFrameEx` شيفرة البايت `CALL_FUNCTION`، فإنها تنشئ إطار مكدس Python جديداً وتستدعي نفسها بشكل متكرر: أي أنها تنادي `PyEval_EvalFrameEx` بشكل متكرر مع الإطار الجديد، الذي يُستخدم لتنفيذ `bar`.

ومن المهم جداً أن نفهم أن إطارات مكدس Python تُخصَّص في ذاكرة الكومة (heap)! فمفسّر Python برنامج C عادي، لذا إطارات مكدسه إطارات مكدس عادية. لكن إطارات مكدس *Python* التي يتعامل معها تقع في الكومة. ومن بين المفاجآت الأخرى أن هذا يعني أن إطار مكدس Python قد يبقى بعد انتهاء استدعاء دالته. ولرؤية ذلك تفاعلياً، احفظ الإطار الحالي من داخل `bar`:

```python
>>> import inspect
>>> frame = None
>>> def foo():
...     bar()
...
>>> def bar():
...     global frame
...     frame = inspect.currentframe()
...
>>> foo()
>>> # The frame was executing the code for 'bar'.
>>> frame.f_code.co_name
'bar'
>>> # Its back pointer refers to the frame for 'foo'.
>>> caller_frame = frame.f_back
>>> caller_frame.f_code.co_name
'foo'
```

\aosafigure[240pt]/images/500-lines/crawler-0-function_calls.webp{استدعاءات الدوال}{500l.crawler.functioncalls}

لقد استُؤنفت المسرح الآن لمولّدات Python التي تستخدم القطع البناءية نفسها — كائنات الشيفرة وإطارات المكدس — ببراعة استثنائية.

وهذه دالة مولّد:

```python
>>> def gen_fn():
...     result = yield 1
...     print('result of yield: {}'.format(result))
...     result2 = yield 2
...     print('result of 2nd yield: {}'.format(result2))
...     return 'done'
...     
```

وحين يترجم Python `gen_fn` إلى شيفرة بايت، يرى عبارة `yield` ويعلم أن `gen_fn` دالة مولّد لا دالة عادية. ويضبط رايةً لتذكر هذه الحقيقة:

```python
>>> # The generator flag is bit position 5.
>>> generator_bit = 1 << 5
>>> bool(gen_fn.__code__.co_flags & generator_bit)
True
```

وحين تستدعي دالة مولّد، يرى Python راية المولّد، ولا ينفّذ الدالة فعلياً. وبدلاً من ذلك ينشئ مولّداً:

```python
>>> gen = gen_fn()
>>> type(gen)
<class 'generator'>
```

ويغلّف مولّد Python إطار مكدس إضافةً إلى مرجع إلى شيفرة ما، وهي جسم `gen_fn`:

```python
>>> gen.gi_code.co_name
'gen_fn'
```

كل المولّدات الناتجة من استدعاءات `gen_fn` تشير إلى هذه الشيفرة نفسها. لكن لكل منها إطار مكدس خاص به. وهذا الإطار ليس على أي مكدس فعلي، بل يجلس في ذاكرة الكومة بانتظار الاستخدام:

\aosafigure[240pt]/images/500-lines/crawler-1-generator.webp{المولّدات}{500l.crawler.generators}

وللإطار مؤشر «آخر تعليمة»، أي التعليمة التي نفّذها آخر مرة. وفي البداية يكون مؤشر آخر تعليمة يساوي -1، ما يعني أن المولّد لم يبدأ بعد:

```python
>>> gen.gi_frame.f_lasti
-1
```

وحين نستدعي `send`، يصل المولّد إلى أول `yield` ويتوقف. وقيمة إرجاع `send` هي 1، لأن هذا ما يمرره `gen` إلى تعبير `yield`:

```python
>>> gen.send(None)
1
```

أصبح مؤشر تعليمات المولّد الآن على بعد 3 بايتات من البداية، في منتصف الطريق ضمن الـ 56 بايتاً من شيفرة Python المُصرَّفة:

```python
>>> gen.gi_frame.f_lasti
3
>>> len(gen.gi_code.co_code)
56
```

ويمكن استئناف المولّد في أي وقت ومن أي دالة، لأن إطار مكدسه ليس على المكدس فعلياً: بل على الكومة. وموضعه في تسلسل الاستدعاءات غير ثابت، ولا يلزمه الالتزام بترتيب التنفيذ «آخر داخل، أول خارج» كما تفعل الدوال العادية. إنه مُحرَّر، يطوف حرةً كسحابة.

ويمكننا إرسال القيمة "hello" إلى المولّد فتصبح نتيجة تعبير `yield`، ويستمر المولّد حتى يُنزِل 2:

```python
>>> gen.send('hello')
result of yield: hello
2
```

وأصبح إطار مكدسه يحتوي الآن على المتغير المحلي `result`:

```python
>>> gen.gi_frame.f_locals
{'result': 'hello'}
```

أما المولّدات الأخرى المنشأة من `gen_fn` فستكون لها إطارات مكدس ومتغيّرات محلية خاصة بها.

وحين نستدعي `send` من جديد، يستمر المولّد من `yield` الثاني وينتهي بإثارة الاستثناء الخاص `StopIteration`:

```python
>>> gen.send('goodbye')
result of 2nd yield: goodbye
Traceback (most recent call last):
  File "<input>", line 1, in <module>
StopIteration: done
```

وللاستثناء قيمة، وهي قيمة إرجاع المولّد: السلسلة `"done"`.

## بناء الكوروتينات باستخدام المولّدات

إذن يستطيع المولّد أن يتوقف، وأن يُستأنف بقيمة، ولديه قيمة إرجاع. يبدو وكأنه أساس جيد لنبني عليه نموذج برمجة غير متزامنة، بلا دوال استدعاء متشابكة! نريد بناء «كوروتين»: روتين يُجدول تعاونياً مع روتينات أخرى في البرنامج. وستكون كوروتيناتنا نسخة مبسّطة من الموجودة في مكتبة «asyncio» القياسية في Python. وكما في asyncio، سنستخدم المولّدات والأشياء المستقبلية (futures) وتعبير «yield from».

نحتاج أولاً إلى وسيلة لتمثيل نتيجة مستقبلية تنتظرها كوروتين. إليك نسخة مُجرَّدة:

```python
class Future:
    def __init__(self):
        self.result = None
        self._callbacks = []

    def add_done_callback(self, fn):
        self._callbacks.append(fn)

    def set_result(self, result):
        self.result = result
        for fn in self._callbacks:
            fn(self)
```

يكون المستقبل في البداية «معلَّقاً». ويصبح «محلولاً» باستدعاء `set_result`.[^12]

ولنكيّف جالبنا ليستخدم الأشياء المستقبلية والكوروتينات. فقد كتبنا `fetch` بدالة استدعاء:

```python
class Fetcher:
    def fetch(self):
        self.sock = socket.socket()
        self.sock.setblocking(False)
        try:
            self.sock.connect(('xkcd.com', 80))
        except BlockingIOError:
            pass
        selector.register(self.sock.fileno(),
                          EVENT_WRITE,
                          self.connected)

    def connected(self, key, mask):
        print('connected!')
        # And so on....
```

يبدأ تابع `fetch` بالاتصال بمقبس، ثم يسجّل دالة الاستدعاء `connected` لتُنفَّذ عندما يصبح المقبس جاهزاً. والآن يمكننا دمج هاتين الخطوتين في كوروتين واحد:

```python
    def fetch(self):
        sock = socket.socket()
        sock.setblocking(False)
        try:
            sock.connect(('xkcd.com', 80))
        except BlockingIOError:
            pass

        f = Future()

        def on_connected():
            f.set_result(None)

        selector.register(sock.fileno(),
                          EVENT_WRITE,
                          on_connected)
        yield f
        selector.unregister(sock.fileno())
        print('connected!')
```

أصبح `fetch` الآن دالة مولّد لا دالة عادية، لأنها تحتوي عبارة `yield`. وننشئ شيئاً مستقبلياً معلَّقاً، ثم نُنزّله لنوقف `fetch` حتى يصبح المقبس جاهزاً. أمّا الدالة الداخلية `on_connected` فتُحلّ الشيء المستقبلي.

لكن حين يُحلّ الشيء المستقبلي، ما الذي يستأنف المولّد؟ نحتاج إلى *مُشغِّل* (driver) للكوروتين. ولنسمّه «مهمة» (task):

```python
class Task:
    def __init__(self, coro):
        self.coro = coro
        f = Future()
        f.set_result(None)
        self.step(f)

    def step(self, future):
        try:
            next_future = self.coro.send(future.result)
        except StopIteration:
            return

        next_future.add_done_callback(self.step)

# Begin fetching http://xkcd.com/353/
fetcher = Fetcher('/353/')
Task(fetcher.fetch())

loop()
```

تبدأ المهمةُ مولّد `fetch` بإرسال `None` إليه. ثم يعمل `fetch` حتى يُنزّل شيئاً مستقبلياً، تلتقطه المهمة باسم `next_future`. وحانما يتصل المقبس، تشغّل حلقة الأحداث دالة الاستدعاء `on_connected`، التي تُحلّ الشيء المستقبلي، الذي يستدعي `step`، التي تستأنف `fetch`.

## تجزئة الكوروتينات باستخدام `yield from`

ما إن يتصل المقبس، نرسل طلب HTTP GET ونقرأ استجابة الخادم. ولم تعد هذه الخطوات مشرّقة بين دوال الاستدعاء؛ نجمعها في دالة المولّد نفسها:

```python
    def fetch(self):
        # ... connection logic from above, then:
        sock.send(request.encode('ascii'))

        while True:
            f = Future()

            def on_readable():
                f.set_result(sock.recv(4096))

            selector.register(sock.fileno(),
                              EVENT_READ,
                              on_readable)
            chunk = yield f
            selector.unregister(sock.fileno())
            if chunk:
                self.response += chunk
            else:
                # Done reading.
                break
```

هذه الشيفرة، التي تقرأ رسالة كاملة من مقبس، تبدو مفيدة على نطاق عام. فكيف يمكننا تجزئتها من `fetch` إلى روتين فرعي؟ والآن يدخل على المسرح تعبير `yield from` المحتفى به في Python 3. فهو يتيح لمولّد أن *يفوّض* (delegate) العمل لمولّد آخر.

ولكي نرى كيف، لنعد إلى مثال المولّد البسيط:

```python
>>> def gen_fn():
...     result = yield 1
...     print('result of yield: {}'.format(result))
...     result2 = yield 2
...     print('result of 2nd yield: {}'.format(result2))
...     return 'done'
...     
```

ولكي نستدعي هذا المولّد من مولّد آخر، نفوّض إليه بـ `yield from` (yield from):

```python
>>> # Generator function:
>>> def caller_fn():
...     gen = gen_fn()
...     rv = yield from gen
...     print('return value of yield-from: {}'
...           .format(rv))
...
>>> # Make a generator from the
>>> # generator function.
>>> caller = caller_fn()
```

يتصرف المولّد `caller` وكأنه `gen` نفسه، المولّد الذي يفوّض إليه:

```python
>>> caller.send(None)
1
>>> caller.gi_frame.f_lasti
15
>>> caller.send('hello')
result of yield: hello
2
>>> caller.gi_frame.f_lasti  # Hasn't advanced.
15
>>> caller.send('goodbye')
result of 2nd yield: goodbye
return value of yield-from: done
Traceback (most recent call last):
  File "<input>", line 1, in <module>
StopIteration
```

وحين يُنزِل `caller` من `gen`، لا يتقدم `caller`. ولاحظ أن مؤشر تعليماته يبقى عند 15، موضع عبارة `yield from` فيه، حتى بينما يتقدم المولّد الداخلي `gen` من عبارة `yield` إلى التي تليها.[^13] ومن منظورنا خارج `caller`، لا يمكننا تمييز ما إذا كانت القيم التي يُنزِلها تأتي من `caller` أم من المولّد الذي يفوّض إليه. ومن داخل `gen`، لا يمكننا تمييز ما إذا كانت القيم تُرسَل من `caller` أم من خارجه. وتعبير `yield from` هو قناة بلا احتكاك، تتدفق عبرها القيم إلى `gen` وخارجه حتى يكتمل `gen`.

ويمكن للكوروتين أن يفوّض عملاً إلى كوروتين فرعي بـ `yield from` ويستقبل نتيجة ذلك العمل. ولاحظ في الأعلى أن `caller` طبع "return value of yield-from: done". وحين اكتمل `gen`، أصبحت قيمته المُرجَعة هي قيمة تعبير `yield from` في `caller`:

```python
    rv = yield from gen
```

وفيما سبق، حين انتقدنا البرمجة غير المتزامنة القائمة على دوال الاستدعاء، كان أشدّ اعتراضاتنا على «تمزيق المكدس» (stack ripping): فحين تلقّي دالة استدعاء استثناءً، يكون أثر المكدس عديم الفائدة عادةً. فهو يُظهر فقط أن حلقة الأحداث كانت تشغّل دالة الاستدعاء، لا *سبب* ذلك. فكيف تصير الأمور مع الكوروتينات؟

```python
>>> def gen_fn():
...     raise Exception('my error')
>>> caller = caller_fn()
>>> caller.send(None)
Traceback (most recent call last):
  File "<input>", line 1, in <module>
  File "<input>", line 3, in caller_fn
  File "<input>", line 2, in gen_fn
Exception: my error
```

هذا أكثر فائدة بكثير! فأثر المكدس يُظهر أن `caller_fn` كان يفوّض إلى `gen_fn` حين أُلقي الخطأ. وهو أكثر طمأنةً أيضاً، يمكننا أن نلفّ الاستدعاء إلى كوروتين فرعي في معالج استثناءات، تماماً كما نفعل مع الروتينات الفرعية العادية:

```python
>>> def gen_fn():
...     yield 1
...     raise Exception('uh oh')
...
>>> def caller_fn():
...     try:
...         yield from gen_fn()
...     except Exception as exc:
...         print('caught {}'.format(exc))
...
>>> caller = caller_fn()
>>> caller.send(None)
1
>>> caller.send('hello')
caught uh oh
```

إذن نجزّئ المنطق بكوروتينات فرعية تماماً كما نفعل بالروتينات الفرعية العادية. ولنتجزّئ بعض الكوروتينات الفرعية المفيدة من جالبنا. نكتب كوروتين `read` لاستقبال مقطع واحد:

```python
def read(sock):
    f = Future()

    def on_readable():
        f.set_result(sock.recv(4096))

    selector.register(sock.fileno(), EVENT_READ, on_readable)
    chunk = yield f  # Read one chunk.
    selector.unregister(sock.fileno())
    return chunk
```

ونبني على `read` عبر كوروتين `read_all` يستقبل رسالة كاملة:

```python
def read_all(sock):
    response = []
    # Read whole response.
    chunk = yield from read(sock)
    while chunk:
        response.append(chunk)
        chunk = yield from read(sock)

    return b''.join(response)
```

فإن حدّقت العين بالطريقة الصحيحة، تختفي تعبيرات `yield from` وتبدو هذه كدوال تقليدية تقوم بإدخال/إخراج حاجب. لكن في الواقع `read` و`read_all` كوروتينات. والتنازل من `read` يوقف `read_all` حتى يكتمل الإدخال/الإخراج. وأثناء توقف `read_all`، تقوم حلقة أحداث asyncio بأعمال أخرى وتنتظر أحداث إدخال/إخراج أخرى؛ ويُستأنف `read_all` بنتيجة `read` في الدورة التالية من الحلقة ما إن يصبح حدثه جاهزاً.

وعند جذر المكدس، يستدعي `fetch` الدالة `read_all`:

```python
class Fetcher:
    def fetch(self):
		 # ... connection logic from above, then:
        sock.send(request.encode('ascii'))
        self.response = yield from read_all(sock)
```

ولحسن الحظ، لا يحتاج صنف Task إلى أي تعديل. فهو يشغّل كوروتين `fetch` الخارجي كما كان تماماً من قبل:

```python
Task(fetcher.fetch())
loop()
```

وحين يُنزّل `read` شيئاً مستقبلياً، تستقبله المهمة عبر قناة تعبيرات `yield from`، تماماً كما لو أن الشيء المستقبلي أُنزِل مباشرةً من `fetch`. وحين تحلّ الحلقة شيئاً مستقبلياً، ترسل المهمة نتيجته إلى `fetch`، وتستقبل `read` القيمة، تماماً كما لو أن المهمة تشغّل `read` مباشرة:

\aosafigure[240pt]/images/500-lines/crawler-2-yield_from.webp{التنازل من}{500l.crawler.yieldfrom}

ولإتقان تنفيذنا للكوروتينات، نُحسن تفصيلاً واحداً: فشيفرتنا تستخدم `yield` حين تنتظر شيئاً مستقبلياً، لكنها تستخدم `yield from` حين تفوّض إلى كوروتين فرعي. والأدقّ أن نستخدم `yield from` كلما توقّفت كوروتين. وعندها لا تحتاج الكوروتين إلى الانشغال بنوع الشيء الذي تنتظره.

ونستفيد من التطابق العميق في Python بين المولّدات والمُكرَّرات (iterators). فتقديم المولّد، من منظور المستدعي، هو نفسه تقديم مُكرَّر. ولذلك نجعل صنف Future قابلاً للتكرار بتنفيذ تابع خاص:

```python
    # Method on Future class.
    def __iter__(self):
        # Tell Task to resume me here.
        yield self
        return self.result
```

تابع `__iter__` في الشيء المستقبلي هو كوروتين يُنزّل الشيء المستقبلي نفسه. والآن حين نستبدل شيفرة كهذه:

```python
# f is a Future.
yield f
```

... بهذه:

```python
# f is a Future.
yield from f
```

... تكون النتيجة واحدة! فالمهمة المُشغِّلة تستقبل الشيء المستقبلي من استدعائها لـ `send`، وحين يُحلّ الشيء المستقبلي ترسل النتيجة الجديدة عائداً إلى الكوروتين.

فما فائدة استخدام `yield from` في كل مكان؟ ولماذا هذا أفضل من انتظار الأشياء المستقبلية بـ `yield` وتفويض العمل إلى الكوروتينات الفرعية بـ `yield from`؟ إنه أفضل لأن أصبح بإمكان تابع الآن أن يغيّر تنفيذه بحرية دون التأثير في المستدعي: فقد يكون تابعاً عادياً يعيد شيئاً مستقبلياً سيُحلّ إلى قيمة، وقد يكون كوروتين يحتوي تعبيرات `yield from` ويُعيد قيمة. وفي الحالتين، لا يحتاج المستدعي سوى أن يفوّض إلى التابع بـ `yield from` لينتظر النتيجة.

أيها القارئ الكريم، لقد بلغنا نهاية عرضنا الممتع للكوروتينات في asyncio. فقد تبيّصنا في آليات المولّدات، ورسمنا تنفيذاً مبسطاً للأشياء المستقبلية والمهام. وبيّنا كيف يحقق asyncio أفضل ما في العالمين: إدخال/إخراج متزامن أكثر كفاءة من الخيوط وأوضح من دوال الاستدعاء. وبطبيعة الحال، فإن asyncio الحقيقي أكثر تعقيداً بكثير من رسمنا هذا. فالإطار الحقيقي يعالج الإدخال/الإخراج بلا نسخ، والجدولة العادلة، ومعالجة الاستثناءات، ووفرة من الميزات الأخرى.

وللمستخدم الذي يستعمل asyncio، تكون البرمجة بالكوروتينات أبسط بكثير مما رأيته هنا. فنحن في الشيفرة أعلاه طبّقنا الكوروتينات من مبادئها الأولى، فرأيت دوال الاستدعاء والمهام والأشياء المستقبلية. بل ورأيت حتى المقابس غير الحاجبة والاستدعاء إلى ``select``. لكن حين يحين وقت بناء تطبيق باستخدام asyncio، لا يظهر أيٌّ من هذا في شيفرتك. وكما وعدناك، تستطيع الآن جلب عنوان URL بأناقة:

```python
    @asyncio.coroutine
    def fetch(self, url):
        response = yield from self.session.get(url)
        body = yield from response.read()
```

وراضياً بهذا العرض، نعود إلى مهمتنا الأصلية: كتابة زاحف ويب غير متزامن باستخدام asyncio.

## تنسيق الكوروتينات

بدأنا بوصف كيف نريد أن يعمل زاحفنا. والآن حان وقت تنفيذه بكوروتينات asyncio.

سيبدأ زاحفنا بجلب الصفحة الأولى، وتحليل روابطها، وإضافتها إلى طابور. وبعد ذلك ينتشر عبر الموقع فيجلب الصفحات في وقت واحد. لكن — من أجل الحدّ من الحمل على العميل والخادم — نريد أقصى عدد من العمال يعمل، لا أكثر. فمتى أتمّ عامل جلب صفحة، عليه أن يسحب الرابط التالي من الطابور فوراً. وسنمرّ بفترات لا يكفي فيها العمل، فيتعطّل بعض العمال. لكن حين يصطدم عامل بصفحة غنية بروابط جديدة، ينمو الطابور فجأة وينبغي أن يستيقظ أي عمال متوقّفون وينشغلوا بالعمل. وأخيراً، يجب أن ينتهي برنامجنا بمجرد انتهاء عمله.

وتخيّل لو كان العمال خيوطاً. فكيف نعبّر عن خوارزمية الزاحف؟ يمكننا استخدام طابور متزامن[^5] من مكتبة Python القياسية. فمع كل عنصر يوضع في الطابور يزيد الطابور عدّاد «المهام» لديه. وتستدعي خيوط العمال `task_done` بعد إتمام العمل على عنصر ما. ويتحيّب الخيط الرئيسي على `Queue.join` حتى يقابل كل عنصر وُضع في الطابور استدعاء `task_done`، ثم يخرج.

وتستخدم الكوروتينات النمط نفسه تماماً مع طابور asyncio! أولاً نستورده[^6]:

```python
try:
    from asyncio import JoinableQueue as Queue
except ImportError:
    # In Python 3.5, asyncio.JoinableQueue is
    # merged into Queue.
    from asyncio import Queue
```

ونجمع الحالة المشتركة للعمال في صنف زاحف، ونكتب المنطق الرئيسي في تابعه `crawl`. ونشغّل `crawl` في كوروتين ونشغّل حلقة أحداث asyncio حتى ينتهي `crawl`:

```python
loop = asyncio.get_event_loop()

crawler = crawling.Crawler('http://xkcd.com',
                           max_redirect=10)

loop.run_until_complete(crawler.crawl())
```

يبدأ الزاحف بعنوان URL جذر و`max_redirect`، وهو عدد عمليات إعادة التوجيه التي هو مستعداً لاتباعها لجلب أي عنوان URL بعينه. وهو يضع الزوج `(URL, max_redirect)` في الطابور. (ولأسباب ذلك، ابقَ معنا.)

```python
class Crawler:
    def __init__(self, root_url, max_redirect):
        self.max_tasks = 10
        self.max_redirect = max_redirect
        self.q = Queue()
        self.seen_urls = set()
        
        # aiohttp's ClientSession does connection pooling and
        # HTTP keep-alives for us.
        self.session = aiohttp.ClientSession(loop=loop)
        
        # Put (URL, max_redirect) in the queue.
        self.q.put((root_url, self.max_redirect))
```

أصبح عدد المهام غير المنتهية في الطابور هو واحد الآن. وفي شيفرتنا الرئيسية نطلق حلقة الأحداث وتابع `crawl`:

```python
loop.run_until_complete(crawler.crawl())
```

تطلق الكوروتين `crawl` العمال. فهي كخيط رئيسي: تتوقف عند `join` حتى تنتهي كل المهام، بينما يعمل العمال في الخلفية.

```python
    @asyncio.coroutine
    def crawl(self):
        """Run the crawler until all work is done."""
        workers = [asyncio.Task(self.work())
                   for _ in range(self.max_tasks)]

        # When all work is done, exit.
        yield from self.q.join()
        for w in workers:
            w.cancel()
```

لو كانوا العمال خيوطاً، ربما لم نرغب في تشغيلهم جميعاً دفعة واحدة. ولتجنّب إنشاء خيوط باهظة قبل التأكد من الضرورة، تنمو مجموعة الخيوط عادةً عند الطلب. لكن الكوروتينات رخيصة، فنكتفي ببساطة ببدء أقصى عدد مسموح به.

ومن اللافت كيف نوقف الزاحف. فحين يُحلّ المستقبل `join`، تكون مهام العمال حيّة لكن معلّقة:

```
ERROR:asyncio:Task was destroyed but it is pending!
```

وكيف يعمل `cancel`؟ للمولّدات ميزة لم نعرضها عليك بعد. تستطيع أن تُلقي استثناءً داخل مولّد من الخارج:

```python
>>> gen = gen_fn()
>>> gen.send(None)  # Start the generator as usual.
1
>>> gen.throw(Exception('error'))
Traceback (most recent call last):
  File "<input>", line 3, in <module>
  File "<input>", line 2, in gen_fn
Exception: error
```

يُستأنف المولّد بواسطة `throw`، لكنه الآن يطرح استثناءً. فإذا لم تلتقطه أي شيفرة في مكدس استدعاءات المولّد، فإن الاستثناء يطفو عائداً إلى الأعلى. ولإلغاء الكوروتين الخاصة بمهمة ما:

```python
    # Method of Task class.
    def cancel(self):
        self.coro.throw(CancelledError)
```

أينما كان المولّد متوقفاً، عند عبارة `yield from` ما، فإنه يستأنف ويطرح استثناءً. ونحن نتعامل مع الإلغاء في تابع `step` الخاص بالمهمة:

```python
    # Method of Task class.
    def step(self, future):
        try:
            next_future = self.coro.send(future.result)
        except CancelledError:
            self.cancelled = True
            return
        except StopIteration:
            return

        next_future.add_done_callback(self.step)
```

والآن تعرف المهمة أنها أُلغيت، فحين تُدمَّر لا تصرخ في وجه نور الزوال.

وما إن تلغي `crawl` العمال، فإنها تخرج. وترى حلقة الأحداث أن الكوروتين اكتملت (وسنرى كيف لاحقاً)، فترد هي الأخرى:

```python
loop.run_until_complete(crawler.crawl())
```

يجمع تابع `crawl` كل ما يجب أن تفعله الكوروتين الرئيسية. أما كوروتينات العمال فهي التي تأخذ عناوين URL من الطابور وتجلبها وتحللها وتبحث عن روابط جديدة. وكل عامل يشغّل كوروتين `work` بشكل مستقل:

```python
    @asyncio.coroutine
    def work(self):
        while True:
            url, max_redirect = yield from self.q.get()

            # Download page and add new links to self.q.
            yield from self.fetch(url, max_redirect)
            self.q.task_done()
```

يرى Python أن هذه الشيفرة تحتوي تعبيرات `yield from` فيترجمها إلى دالة مولّد.فكرة في في `crawl`، حين تستدعي الكوروتين الرئيسية `self.work` عشر مرات، لا تنفّذ هذه الشيفرة فعلاً: إنها لا تنشئ سوى عشرة كائنات مولّد تحيل إلى هذه الشيفرة. وتغلّف كلاً منها في مهمة. وتتلقى المهمة كل شيء مستقبلي يُنزّله المولّد، وتشغّل المولّد باستدعاء `send` مع نتيجة كل شيء مستقبلي عند حلّه. ولأن للمولّدات إطارات مكدس خاصة بها، فإنها تعمل باستقلال، ولكل منها متغيّرات محلية ومؤشرات تعليمات خاصة.

وينسّق العامل مع زملائه عبر الطابور. فهو ينتظر عناوين URL جديدة عبر:

```python
    url, max_redirect = yield from self.q.get()
```

وتابع `get` في الطابور هو نفسه كوروتين: يتوقف حتى يضع أحدهم عنصراً في الطابور، ثم يستأنف ويعيد العنصر.

ولنلاحظ بالمصادفة أن هذا هو المكان الذي سيتوقف عنده العامل في نهاية الزحف، حين تلغيه الكوروتين الرئيسية. فمن منظور الكوروتين، تنتهي جولته الأخيرة حول الحلقة حين يطرح `yield from` استثناء `CancelledError`.

وحين يجلب عامل صفحة، يحلل روابطها ويضع الجديدة في الطابور، ثم يستدعي `task_done` لخفض العدّاد. وفي نهاية المطاف، يجلب عامل صفحة جرت جلب عناوين URL الخاصة بها كلها من قبل، ولا يتبقى في الطابور أي عمل. لذلك فإن استدعاء `task_done` من هذا العامل يخفض العدّاد إلى الصفر. عندئذٍ يُستأنف `crawl` الذي كان ينتظر تابع `join` الخاص بالطابور، فينهي عمله.

وعدنا بأن نشرح لماذا تكون عناصر الطابور أزواجاً، مثل:

```python
# URL to fetch, and the number of redirects left.
('http://xkcd.com/353', 10)
```

لعناوين URL الجديدة تتبقى عشرة إعادة توجيه. وجلب عنوان URL هذا ينتج إعادة توجيه إلى موقع جديد بشرطة مائلة في آخره. فنخفض عدد عمليات إعادة التوجيه المتبقية، ونضع الموقع التالي في الطابور:

```python
# URL with a trailing slash. Nine redirects left.
('http://xkcd.com/353/', 9)
```

كانت حزمة `aiohttp` التي نستخدمها تتبع عمليات إعادة التوجيه افتراضياً وتسعّرنا الاستجابة النهائية. لكننا نطلب منها ألا تفعل ذلك، نتعامل مع عمليات إعادة التوجيه داخل الزاحف، حتى يتمكّن من دمج مسارات إعادة التوجيه المؤدية إلى الوجهة نفسها: فإذا كنا قد رأينا عنوان URL هذا من قبل، فهو في ``self.seen_urls`` وقد بدأنا هذا المسار بالفعل من نقطة دخول أخرى:

\aosafigure[240pt]/images/500-lines/crawler-3-redirects.webp{إعادة التوجيه}{500l.crawler.redirects}

فيجلب الزاحف "foo" ويرى أنه يُعيد التوجيه إلى "baz"، فيضيف "baz" إلى
الطابور وإلى ``seen_urls``. وإذا كانت الصفحة التالية التي يجلبها هي "bar"، وهي
أيضاً تُعيد التوجيه إلى "baz"، فإن الجالب لن يضع "baz" في الطابور مرة أخرى. وإذا كانت
الاستجابة صفحة لا إعادة توجيه، فإن `fetch` يحللها بحثاً عن روابط
ويضع الجديدة في الطابور.

```python
    @asyncio.coroutine
    def fetch(self, url, max_redirect):
        # Handle redirects ourselves.
        response = yield from self.session.get(
            url, allow_redirects=False)

        try:
            if is_redirect(response):
                if max_redirect > 0:
                    next_url = response.headers['location']
                    if next_url in self.seen_urls:
                        # We have been down this path before.
                        return
    
                    # Remember we have seen this URL.
                    self.seen_urls.add(next_url)
                    
                    # Follow the redirect. One less redirect remains.
                    self.q.put_nowait((next_url, max_redirect - 1))
    	     else:
    	         links = yield from self.parse_links(response)
    	         # Python set-logic:
    	         for link in links.difference(self.seen_urls):
                    self.q.put_nowait((link, self.max_redirect))
                self.seen_urls.update(links)
        finally:
            # Return connection to pool.
            yield from response.release()
```

لو كانت هذه شيفرة متعددة الخيوط، لكانت سيئة التصرف مع حالات التسابق. فمثلاً، يفحص العامل إن كان رابط ما موجوداً في `seen_urls`، فإن لم يكن يضعه في الطابور ويضيفه إلى `seen_urls`. ولو قُاطع بين العمليتين، لأمكن لعامل آخر أن يحلل الرابط نفسه من صفحة مختلفة، يلاحظ أيضاً أنه ليس في `seen_urls`، ويضيفه إلى الطابور أيضاً. عندها يصبح الرابط نفسه في الطابور مرتين، مما يؤدي — في أحسن الأحوال — إلى عمل مكرر وإحصاءات خاطئة.

غير أن الكوروتين لا يكون عرضة للمقاطعة إلا عند تعبيرات `yield from`. وهذا فرق جوهري يجعل شيفرة الكوروتينات أقل عرضة للتسابق بكثير من الشيفرة متعددة الخيوط: فشيفرة تعدد الخيوط ملزمة بدخول قسم حرج (critical section) صراحةً عبر التقاط قفل، وإلا فإنها قابلة للمقاطعة. أما كوروتين Python فهو غير قابل للمقاطعة افتراضياً، ولا يتنازل عن التحكم إلا حين ينزّل صراحةً.

ولم نعد بحاجة إلى صنف جالب كما كان لدينا في البرنامج القائم على دوال الاستدعاء. فقد كان ذلك الصنف حلاً مؤقتاً لنقص في دوال الاستدعاء: فهي تحتاج إلى مكان ما لتخزين الحالة أثناء انتظار الإدخال/الإخراج، لأن متغيّراتها المحلية لا تبقى محفوظة بين الاستدعاءات. لكن كوروتين `fetch` يستطيع تخزين حالته في متغيّرات محلية كما تفعل الدالة العادية، فلا حاجة بعدئذٍ إلى صنف.

وحين ينتهي `fetch` من معالجة استجابة الخادم، يعود إلى المستدعي وهو `work`. ويستدعي تابع `work` الدالة `task_done` على الطابور، ثم يأخذ عنوان URL التالي من الطابور ليجلبه.

وحين يضع `fetch` روابط جديدة في الطابور، يزيد عدد المهام غير المنتهية ويُبقي الكوروتين الرئيسية، المنتظرة عند `q.join`، متوقفة. لكن إذا لم تكن هناك روابط لم تُرَ من قبل وكان هذا آخر عنوان URL في الطابور، فإن عدد المهام غير المنتهية يسقط إلى الصفر حين يستدعي `work` الدالة `task_done`. وهذا الحدث يُستأنف `join` وتكتمل الكوروتين الرئيسية.

وشيفرة الطابور التي تنسّق العمال والكوروتين الرئيسية هي كما يلي[^9]:

```python
class Queue:
    def __init__(self):
        self._join_future = Future()
        self._unfinished_tasks = 0
        # ... other initialization ...
    
    def put_nowait(self, item):
        self._unfinished_tasks += 1
        # ... store the item ...

    def task_done(self):
        self._unfinished_tasks -= 1
        if self._unfinished_tasks == 0:
            self._join_future.set_result(None)

    @asyncio.coroutine
    def join(self):
        if self._unfinished_tasks > 0:
            yield from self._join_future
```

وتُنزّل الكوروتين الرئيسية `crawl` من `join`. فحين يخفض آخر عامل عدد المهام غير المنتهية إلى الصفر، فإنه يشير إلى `crawl` بأن يستأنف وأن ينهي عمله.

فالرحلة شبه منتهية. فقد بدأ برنامجنا باستدعاء `crawl`:

```python
loop.run_until_complete(self.crawler.crawl())
```

وكيف ينتهي البرنامج؟ ولأن `crawl` دالة مولّد، فإن استدعاءها يعيد مولّداً. ولتشغيل هذا المولّد، يغلّفه asyncio في مهمة:

```python
class EventLoop:
    def run_until_complete(self, coro):
        """Run until the coroutine is done."""
        task = Task(coro)
        task.add_done_callback(stop_callback)
        try:
            self.run_forever()
        except StopError:
            pass

class StopError(BaseException):
    """Raised to stop the event loop."""

def stop_callback(future):
    raise StopError
```

وحين تكتمل المهمة، فإنها تطرح `StopError `، وتستخدمها الحلقة كإشارة إلى أنها بلغت الاكتمال الطبيعي.

لكن ما هذا؟ ألأن للمهمة توابع اسمها `add_done_callback` و`result`؟ قد تظن أن المهمة تشبه المستقبل. حدسك صحيح. ويجب أن نعترف بتفصيل عن صنف Task أخفيناه عنك: المهمة هي مستقبل.

```python
class Task(Future):
    """A coroutine wrapped in a Future."""
```

عادةً ما يُحلّ المستقبل بأن يستدعيه شخص آخر فيستدعي `set_result`. لكن المهمة تحلّ *نفسها* حين تتوقف كوروتينها. وتذكّر من استكشافنا السابق لمولّدات Python أن المولّد، حين يعود، يطرح الاستثناء الخاص `StopIteration`:

```python
    # Method of class Task.
    def step(self, future):
        try:
            next_future = self.coro.send(future.result)
        except CancelledError:
            self.cancelled = True
            return
        except StopIteration as exc:

            # Task resolves itself with coro's return
            # value.
            self.set_result(exc.value)
            return

        next_future.add_done_callback(self.step)
```

إذن حين تستدعي حلقة الأحداث `task.add_done_callback(stop_callback)`، فإنها تستعد للتوقف بواسطة المهمة. وهذا هو `run_until_complete` مرة أخرى:

```python
    # Method of event loop.
    def run_until_complete(self, coro):
        task = Task(coro)
        task.add_done_callback(stop_callback)
        try:
            self.run_forever()
        except StopError:
            pass
```

وحين تلتقط المهمة `StopIteration` وتحلّ نفسها، تطرح دالة الاستدعاء `StopError` من داخل الحلقة. تتوقف الحلقة ويُفكّ مكدس الاستدعاءات حتى `run_until_complete`. يكون برنامجنا قد انتهى.

## الخاتمة

كثيراً مما تكون البرامج الحديثة مقيّدة بالإدخال/الإخراج بدل أن تكون مقيّدة بالمعالج. وبهذه البرامج، تكون خيوط Python أسوأ الخيارات من كل وجه:

وإن حدّقت العين بحيث تذوب تعبيرات `yield from`، بدت الكوروتين كخيط يقوم بإدخال/إخراج حاجب تقليدي. بل يمكننا حتى تنسيق الكوروتينات بأنماط كلاسيكية من البرمجة متعددة الخيوط. ولا حاجة لإعادة الاختراع. وعليه، مقارنةً بدوال الاستدعاء، تُعد الكوروتينات أسلوباً جاذباً للمبرمج المعتاد على تعدد الخيوط.

لكن حين نفتح أعيننا ونركّز على تعبيرات `yield from`، نرى أنها تحدّد المواضع التي تتنازل فيها الكوروتين عن التحكم وتسمح للآخرين بالعمل. وبخلاف الخيوط، تُظهر الكوروتينات أين يمكن أن تُقاطَع شيفرتنا وأين لا يمكن. وفي مقاله المضيء «Unyielding»[^4]، يكتب غليف ليفكوفيتز: «الخيوط تجعل التفكير المحلي صعباً، والتفكير المحلي ربما أهم شيء في هندسة البرمجيات». أما التنازل الصريح فيجعل من الممكن أن «تفهم سلوك (وعليه، صحة) روتين بفحص الروتين نفسه بدل فحص النظام بأكمله».

كُتب هذا الفصل خلال عصر نهضة في تاريخ Python وغير المتزامن. فقد أُطلقت الكوروتينات القائمة على المولّدات، التي تعلمت للتو اختراعها، في وحدة «asyncio» مع Python 3.4 في مارس 2014. وفي سبتمبر 2015، أُطلق Python 3.5 بكوروتينات مبنية في اللغة نفسها. وتُصرَّح هذه الكوروتينات الأصلية بالصياغة الجديدة «async def»، وبدلاً من «yield from» تستخدم الكلمة المفتاحية الجديدة «await» (انتظار) للتفويض إلى كوروتين أو للانتظار مستقبل.

ورغم هذه الإنجازات، تبقى الأفكار الجوهرية كما هي. فستكون كوروتينات Python الأصلية الجديدة متميزة نحوياً عن المولّدات لكنها تعمل على نحو متشابه جداً؛ بل إنها ستشارك تنفيماً واحداً داخل مفسّر Python. وستستمر المهمة والمستقبل وحلقة الأحداث في أدوارها في asyncio.

والآن بعد أن عرفت كيف تعمل كوروتينات asyncio، يمكنك أن تنسى التفاصيل في الغالب. فالآلية مخبّأة خلف واجهة أنيقة. لكن إتقانك للأساسيات يتيح لك البرمجة على نحو صحيح وفعّال في بيئات غير المتزامن الحديثة.

[^4]: https://glyph.twistedmatrix.com/2014/02/unyielding.html

[^5]: https://docs.python.org/3/library/queue.html

[^6]: https://docs.python.org/3/library/asyncio-sync.html

[^7]: لحلّ معقّد لهذه المشكلة، انظر [http://www.tornadoweb.org/en/stable/stack_context.html](http://www.tornadoweb.org/en/stable/stack_context.html)

[^8]: http://www.kegel.com/c10k.html

[^9]: يستخدم تنفيذ `asyncio.Queue` الفعلي حدث `asyncio.Event` بدلاً من المستقبل الظاهر هنا. والفرق أن الحدث يمكن إعادة تعيينه، بينما لا يمكن للمستقبل أن ينتقل من المحلول إلى المعلّق.

[^10]: مزخرف `@asyncio.coroutine` ليس سحرياً. فإذا زيّن دالة مولّد ولم يُضبط متغيّر البيئة `PYTHONASYNCIODEBUG`، فإن المزخرف لا يفعل عملياً شيئاً. فهو يكتفي بضبط سمة `_is_coroutine` لراحة أجزاء أخرى من الإطار. ومن الممكن استعمال asyncio مع مولّدات خالية دون أي زخرفة بـ `@asyncio.coroutine`.

<latex>
[^11]: يورد جيسي دواعي استخدام غير المتزامن وعوارضه في «ما هو Async، وكيف يعمل، ومتى ينبغي أن أستعمله؟»، المتاح على pyvideo.org.
[^bayer]: قارن مايك باير إنتاجية asyncio وتعدد الخيوط لأحمال عمل مختلفة في «البايثون غير المتزامن وقواعد البيانات»: http://techspot.zzzeek.org/2015/02/15/asynchronous-python-and-databases/
</latex>

[^11]: يورد جيسي دواعي استخدام غير المتزامن وعوارضه في ["ما هو Async، وكيف يعمل، ومتى ينبغي أن أستعمله؟":](http://pyvideo.org/video/2565/what-is-async-how-does-it-work-and-when-should). وقارن مايك باير إنتاجية asyncio وتعدد الخيوط لأحمال عمل مختلفة في ["البايثون غير المتزامن وقواعد البيانات":](http://techspot.zzzeek.org/2015/02/15/asynchronous-python-and-databases/)


[^12]: لهذا المستقبل عيوب كثيرة. فمثلاً، ما إن يُحلّ هذا المستقبل، ينبغي أن تستأنف الكوروتين التي تُنزّله فوراً بدل التوقف، لكن شيفرتنا لا تفعل ذلك. انظر صنف Future في asyncio للحصول على تنفيذ كامل.

[^13]: وفي الحقيقة هذه هي بالضبط طريقة عمل «yield from» في CPython. فالدالة تزيد مؤشر تعليماتها قبل تنفيذ كل عبارة. لكن بعد أن ينفّذ المولّد الخارجي «yield from»، يطرح واحداً من مؤشر تعليماته ليبقى مثبَّتاً عند عبارة «yield from». ثم يتنازل إلى *مستدعيه*. وتتكرر الدورة حتى يطرح المولّد الداخلي `StopIteration`، وعندها يسمح المولّد الخارجي لنفسه أخيراً بأن يتقدم إلى التعليمة التالية.

[^14]: يمنع قفل التفسير العام في Python تشغيل شيفرة Python بالتوازي داخل عملية واحدة أصلاً. فتوازين الخوارزميات المقيّدة بالمعالج في Python يتطلب عمليات متعددة، أو كتابة الأجزاء المتوازية من الشيفرة بلغة C. لكن هذا موضوع ليوم آخر.

[^15]: حتى الاستدعاءات إلى `send` يمكن أن تكون حاجبة، إن كان المتلقّي بطيئاً في الإقرار بالرسائل المعلّقة وامتلأ مخزن.buffer البيانات الصادرة في النظام.


[^16]: قدّم غيدو مكتبة asyncio القياسية، المسمّاة آنذاك «Tulip»، في [PyCon 2013](http://pyvideo.org/video/1667/keynote).

<latex>
[^16]: قدّم غيدو مكتبة asyncio القياسية، المسمّاة آنذاك «Tulip»، في PyCon 2013.
</latex>

[^17]: الكوروتينات المدمجة في Python 3.5 موصوفة في [PEP 492](https://www.python.org/dev/peps/pep-0492/) «الكوروتينات بصياغة async و await».
