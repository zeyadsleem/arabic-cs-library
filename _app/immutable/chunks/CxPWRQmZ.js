const n="hono",s="guides",o="الأدلة",p="faq",a="الأسئلة الشائعة",t=[{depth:2,id:"هل-يوجد-تكوين-renovate-رسمي-لـ-hono",text:"هل يوجد تكوين Renovate رسمي لـ Hono؟"}],e=`<p>هذا الدليل عبارة عن مجموعة من الأسئلة الشائعة (FAQ) حول Hono وكيفية حلها.</p>
<h2 id="هل-يوجد-تكوين-renovate-رسمي-لـ-hono">هل يوجد تكوين Renovate رسمي لـ Hono؟</h2>
<p>لا يحتفظ فريق Hono حاليًا بـ <a href="https://github.com/renovatebot/renovate">Renovate</a> الإعدادات.
لذلك، يُرجى استخدام renovate-config التابع لجهة خارجية كما يلي.</p>
<p>في <code>renovate.json</code> :</p>
<pre><code class="language-json"><span class="hljs-comment">// renovate.json</span>
<span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;$schema&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://docs.renovatebot.com/renovate-schema.json&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;extends&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-string">&quot;github&gt;shinGangan/renovate-config-hono&quot;</span> <span class="hljs-comment">// [!code ++]</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>انظر <a href="https://github.com/shinGangan/renovate-config-hono">renovate-config-hono</a> المستودع لمزيد من التفاصيل.</p>
`,c={book:n,chapter:s,chapterTitle:o,slug:"faq",title:a,headings:t,html:e};export{n as book,s as chapter,o as chapterTitle,c as default,t as headings,e as html,p as slug,a as title};
