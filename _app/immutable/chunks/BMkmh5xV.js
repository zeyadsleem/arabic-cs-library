const s="how-to-write-go-code",n="testing",e="الاختبار",o="index",t="الاختبار",a=[],c=`<p>لدى Go إطار اختبار خفيف الوزن يتكوّن من الأمر <code>go test</code> وحزمة <code>testing</code>.</p>
<p>تكتب الاختبار بأنشئ ملفًا ينتهي اسمه بـ <code>_test.go</code> يحتوي دوال اسمها <code>TestXXX</code> وتوقيعها <code>func (t *testing.T)</code>. ويشغّل إطار الاختبار كل دالة من هذه الدوال؛ فإذا استدعت الدالة دالة فشل مثل <code>t.Error</code> أو <code>t.Fail</code>، عُدَّ الاختبار فاشلًا.</p>
<p>أضف اختبارًا إلى حزمة <code>morestrings</code> بأنشئ الملف <code>$HOME/hello/morestrings/reverse_test.go</code> الذي يحتوي شيفرة Go التالية:</p>
<pre><code class="language-go"><span class="hljs-keyword">package</span> morestrings

<span class="hljs-keyword">import</span> <span class="hljs-string">&quot;testing&quot;</span>

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">TestReverseRunes</span><span class="hljs-params">(t *testing.T)</span></span> {
    cases := []<span class="hljs-keyword">struct</span> {
        in, want <span class="hljs-type">string</span>
    }{
        {<span class="hljs-string">&quot;Hello, world&quot;</span>, <span class="hljs-string">&quot;dlrow ,olleH&quot;</span>},
        {<span class="hljs-string">&quot;Hello, 世界&quot;</span>, <span class="hljs-string">&quot;界世 ,olleH&quot;</span>},
        {<span class="hljs-string">&quot;&quot;</span>, <span class="hljs-string">&quot;&quot;</span>},
    }
    <span class="hljs-keyword">for</span> _, c := <span class="hljs-keyword">range</span> cases {
        got := ReverseRunes(c.in)
        <span class="hljs-keyword">if</span> got != c.want {
            t.Errorf(<span class="hljs-string">&quot;ReverseRunes(%q) == %q, want %q&quot;</span>, c.in, got, c.want)
        }
    }
}
</code></pre>
<p>ثم شغّل الاختبار بـ <code>go test</code>:</p>
<pre><code class="language-text">$ cd $HOME/hello/morestrings
$ go test
PASS
ok  	example/user/hello/morestrings 0.165s
$
</code></pre>
<p>وشغّل <code>go help test</code> وانظر توثيق حزمة <code>testing</code> لمزيد من التفاصيل.</p>
`,l={book:s,chapter:n,chapterTitle:e,slug:o,title:t,headings:a,html:c};export{s as book,n as chapter,e as chapterTitle,l as default,a as headings,c as html,o as slug,t as title};
