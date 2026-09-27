const e="how-to-write-go-code",o="your-first-program",n="برنامجك الأول",s="index",l="برنامجك الأول",a=[{depth:2,id:"استيراد-الحزم-من-وحدتك",text:"استيراد الحزم من وحدتك"},{depth:2,id:"استيراد-الحزم-من-وحدات-بعيدة",text:"استيراد الحزم من وحدات بعيدة"}],c=`<p>لتصريف برنامج بسيط وتشغيله، اختر أولًا مسار وحدة (سنستعمل <code>example/user/hello</code>) وأنشئ ملف <code>go.mod</code> يعلنه:</p>
<pre><code class="language-text">$ mkdir hello # Alternatively, clone it if it already exists in version control.
$ cd hello
$ go mod init example/user/hello
go: creating new go.mod: module example/user/hello
$ cat go.mod
module example/user/hello

go 1.16
$
</code></pre>
<p>يجب أن تكون الجملة الأولى في أي ملف مصدر لـ Go هي <code>package name</code>. والأوامر القابلة للتنفيذ يجب أن تستعمل <code>package main</code> دائمًا.</p>
<p>بعد ذلك، أنشئ ملفًا باسم <code>hello.go</code> داخل ذلك المجلد يحتوي شيفرة Go التالية:</p>
<pre><code class="language-go"><span class="hljs-keyword">package</span> main

<span class="hljs-keyword">import</span> <span class="hljs-string">&quot;fmt&quot;</span>

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span> {
    fmt.Println(<span class="hljs-string">&quot;Hello, world.&quot;</span>)
}
</code></pre>
<p>والآن تستطيع بناء ذلك البرنامج وتثبيته بأداة <code>go</code>:</p>
<pre><code class="language-text">$ go install example/user/hello
$
</code></pre>
<p>يبني هذا الأمر أمر <code>hello</code> ويُنتج ملفًا تنفيذيًا، ثم يثبّته في <code>$HOME/go/bin/hello</code> (أو على ويندوز في <code>%USERPROFILE%\\go\\bin\\hello.exe</code>).</p>
<p>يتحكّم في مجلد التثبيت متغيّرا البيئة <code>GOPATH</code> و<code>GOBIN</code>. فإن ضُبط <code>GOBIN</code>، ثُبِّتت الملفات التنفيذية في ذلك المجلد. وإن ضُبط <code>GOPATH</code>، ثُبِّتت في المجلد الفرعي <code>bin</code> داخل أول مجلد في قائمة <code>GOPATH</code>. وإلا فثُبِّتت في المجلد <code>bin</code> داخل <code>GOPATH</code> الافتراضي (<code>$HOME/go</code> أو <code>%USERPROFILE%\\go</code>).</p>
<p>ويمكنك استعمال أمر <code>go env</code> لضبط القيمة الافتراضية لمتغيّر بيئة بصورة محمولة، بحيث تسري على أوامر <code>go</code> اللاحقة:</p>
<pre><code class="language-text">$ go env -w GOBIN=/somewhere/else/bin
$
</code></pre>
<p>ولإلغاء ضبط متغيّر سبق ضبطه بـ <code>go env -w</code>، استعمل <code>go env -u</code>:</p>
<pre><code class="language-text">$ go env -u GOBIN
$
</code></pre>
<p>وتعمل أوامر مثل <code>go install</code> في سياق الوحدة الحاوية لمجلد العمل الحالي. فإن لم يكن مجلد العمل داخل وحدة <code>example/user/hello</code>، فقد يفشل <code>go install</code>.</p>
<p>وللراحة، تقبل أوامر <code>go</code> مسارات نسبةً إلى مجلد العمل، وتقع افتراضيًا على الحزمة الموجودة في مجلد العمل الحالي إن لم يُعطَ أي مسار آخر. فمن داخل مجلد العمل الخاص بنا، الأوامر التالية كلّها متكافئة:</p>
<pre><code class="language-text">$ go install example/user/hello
</code></pre>
<pre><code class="language-text">$ go install .
</code></pre>
<pre><code class="language-text">$ go install
</code></pre>
<p>ولنشغّل البرنامج الآن للتأكد من عمله. ولتيسير إضافي، سنضيف مجلد التثبيت إلى <code>PATH</code> كي يكون تشغيل الملفات التنفيذية سهلًا:</p>
<pre><code class="language-text"># Windows users should consult /wiki/SettingGOPATH
# for setting %PATH%.
$ export PATH=$PATH:$(dirname $(go list -f &#x27;{{.Target}}&#x27; .))
$ hello
Hello, world.
$
</code></pre>
<p>وإن كنت تستعمل نظام تحكّم بالإصدارات، فهذه وقت مناسب لتهيئة مستودع، وإضافة الملفات، وتنفيذ أول تغيير لك. وهذه الخطوة اختيارية أيضًا: فأنت لا تحتاج إلى نظام تحكّم بالإصدارات كي تكتب شيفرة Go.</p>
<pre><code class="language-text">$ git init
Initialized empty Git repository in /home/user/hello/.git/
$ git add go.mod hello.go
$ git commit -m &quot;initial commit&quot;
[master (root-commit) 0b4507d] initial commit
 1 file changed, 7 insertion(+)
 create mode 100644 go.mod hello.go
$
</code></pre>
<p>يحدّد أمر <code>go</code> المستودع الحاوي لمسار وحدة معيّن بطلب عنوان HTTPS مقابل وقراءة بيانات وصفية مضمّنة في استجابة HTML (راجع <code>go help importpath</code>). وكثير من خدمات الاستضافة توفّر تلك البيانات الوصفية أصلًا للمستودعات التي تحوي شيفرة Go، ف السبب فإن أسهل طريقة تجعل وحدتك متاحة للاستعمال من غيرك هي عادةً أن تجعل مسار وحدة مطابقًا لعنوان URL الخاص بالمستودع.</p>
<h2 id="استيراد-الحزم-من-وحدتك">استيراد الحزم من وحدتك</h2>
<p>لنكتب حزمة <code>morestrings</code> ونستعملها من برنامج <code>hello</code>. أولًا، أنشئ مجلدًا للحزمة باسم <code>$HOME/hello/morestrings</code>، ثم ملفًا باسم <code>reverse.go</code> في ذلك المجلد بالمحتويات التالية:</p>
<pre><code class="language-go"><span class="hljs-comment">// Package morestrings implements additional functions to manipulate UTF-8</span>
<span class="hljs-comment">// encoded strings, beyond what is provided in the standard &quot;strings&quot; package.</span>
<span class="hljs-keyword">package</span> morestrings

<span class="hljs-comment">// ReverseRunes returns its argument string reversed rune-wise left to right.</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">ReverseRunes</span><span class="hljs-params">(s <span class="hljs-type">string</span>)</span></span> <span class="hljs-type">string</span> {
    r := []<span class="hljs-type">rune</span>(s)
    <span class="hljs-keyword">for</span> i, j := <span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(r)<span class="hljs-number">-1</span>; i &lt; <span class="hljs-built_in">len</span>(r)/<span class="hljs-number">2</span>; i, j = i+<span class="hljs-number">1</span>, j<span class="hljs-number">-1</span> {
        r[i], r[j] = r[j], r[i]
    }
    <span class="hljs-keyword">return</span> <span class="hljs-type">string</span>(r)
}
</code></pre>
<p>ولأن دالتنا <code>ReverseRunes</code> تبدأ بحرف كبير، فهي مصدَّرة، ويمكن استعمالها في الحزم الأخرى التي تستورد حزمة <code>morestrings</code>.</p>
<p>ولنختبر أن الحزمة تُصرَّف بـ <code>go build</code>:</p>
<pre><code class="language-text">$ cd $HOME/hello/morestrings
$ go build
$
</code></pre>
<p>ولن يُنتج ذلك ملفًا. بل يحفظ الحزمة المُصرَّفة في مخزن البناء المحلي.</p>
<p>وبعد التأكد من بناء حزمة <code>morestrings</code>، فلنستعملها من برنامج <code>hello</code>. وللعمل ذلك، عدّل ملف <code>$HOME/hello/hello.go</code> الأصلي ليستعمل حزمة <code>morestrings</code>:</p>
<pre><code class="language-go"><span class="hljs-keyword">package</span> main

<span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;example/user/hello/morestrings&quot;</span>
)

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span> {
    fmt.Println(morestrings.ReverseRunes(<span class="hljs-string">&quot;!oG ,olleH&quot;</span>))
}
</code></pre>
<p>ثم ثبّت برنامج <code>hello</code>:</p>
<pre><code class="language-text">$ go install example/user/hello
</code></pre>
<p>وحين تشغّل النسخة الجديدة من البرنامج، ينبغي أن ترى رسالة جديدة معكوسة:</p>
<pre><code class="language-text">$ hello
Hello, Go!
</code></pre>
<h2 id="استيراد-الحزم-من-وحدات-بعيدة">استيراد الحزم من وحدات بعيدة</h2>
<p>يستطيع مسار الاستيراد أن يصف كيفية الحصول على شيفرة مصدر الحزمة باستعمال نظام تحكّم بالإصدارات مثل Git أو Mercurial. وتستعمل الأداة <code>go</code> هذه الخاصية لجلب الحزم تلقائيًا من المستودعات البعيدة. فمثلًا، لاستعمال <code>github.com/google/go-cmp/cmp</code> في برنامجك:</p>
<pre><code class="language-go"><span class="hljs-keyword">package</span> main

<span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;example/user/hello/morestrings&quot;</span>
    <span class="hljs-string">&quot;github.com/google/go-cmp/cmp&quot;</span>
)

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span> {
    fmt.Println(morestrings.ReverseRunes(<span class="hljs-string">&quot;!oG ,olleH&quot;</span>))
    fmt.Println(cmp.Diff(<span class="hljs-string">&quot;Hello World&quot;</span>, <span class="hljs-string">&quot;Hello Go&quot;</span>))
}
</code></pre>
<p>والآن وقد صار لديك اعتماد على وحدة خارجية، عليك تنزيل تلك الوحدة وتسجيل إصداراتها في ملف <code>go.mod</code>. ويضيف الأمر <code>go mod tidy</code> متطلّبات الوحدات الناقصة للحزم المستوردة، ويزيل المتطلّبات الخاصة بالوحدات التي لم تعد مستعملة.</p>
<pre><code class="language-text">$ go mod tidy
go: finding module for package github.com/google/go-cmp/cmp
go: found github.com/google/go-cmp/cmp in github.com/google/go-cmp v0.5.4
$ go install example/user/hello
$ hello
Hello, Go!
  string(
-     &quot;Hello World&quot;,
+     &quot;Hello Go&quot;,
  )
$ cat go.mod
module example/user/hello

go 1.16

require github.com/google/go-cmp v0.5.4
$
</code></pre>
<p>تُنزَّل اعتماديات الوحدات تلقائيًا إلى المجلد الفرعي <code>pkg/mod</code> داخل المجلد الذي يشير إليه متغيّر البيئة <code>GOPATH</code>. وتُشارَك المحتويات المنزَّلة لإصدار معيّن من وحدة بين كل الوحدات الأخرى التي تطلب <code>require</code> ذلك الإصدار، ولذلك يضع أمر <code>go</code> علامة على تلك الملفات والمجلدات بأنها للقراءة فقط. ولإزالة كل الوحدات المنزَّلة، مرِّر الراية <code>-modcache</code> إلى <code>go clean</code>:</p>
<pre><code class="language-text">$ go clean -modcache
$
</code></pre>
`,p={book:e,chapter:o,chapterTitle:n,slug:s,title:l,headings:a,html:c};export{e as book,o as chapter,n as chapterTitle,p as default,a as headings,c as html,s as slug,l as title};
