const d="ocaml-manual",t="ch32",n="مكتبة unix: نداءات نظام Unix",e="index",o="مكتبة unix: نداءات نظام Unix",c=[],r=`<h1>الفصل 32: مكتبة unix: نداءات نظام Unix</h1>
<p>تتيح مكتبة <code>unix</code> لبرامج OCaml استعمال كثير من نداءات نظام Unix ودوال المكتبة المتصلة بالنظام. ويصف هذا الفصل بإيجاز الدوال التي توفّرها. وارجع إلى القسمين 2 و3 من دليل Unix لمزيد من التفاصيل عن سلوك هذه الدوال.</p>
<ul>
<li>
<p>الوحدة <code>Unix</code>: نداءات نظام Unix</p>
</li>
<li>
<p>الوحدة <code>UnixLabels</code>: نداءات نظام Unix الموسومة</p>
</li>
</ul>
<p>لا توفّر جميع صيغ Unix كل الدوال. وإذا لم تكن بعض الدوال متاحة، فإنها ترفع <code>Invalid_arg</code> عند استدعائها.</p>
<p>ويجب ربط البرامج التي تستعمل مكتبة <code>unix</code> على النحو التالي:</p>
<pre><code class="language-text">        ocamlc other options -I +unix unix.cma other files
        ocamlopt other options  -I +unix unix.cmxa other files
</code></pre>
<p>ولااستعمال مكتبة <code>unix</code> استعمالًا تفاعليًا، افعل ما يلي:</p>
<pre><code class="language-text">        ocamlmktop -o mytop -I +unix unix.cma
        ./mytop
</code></pre>
<p>أو (إذا كان الربط الدينامي لمكتبات C مدعومًا على منصّتك) ابدأ <code>ocaml</code> واكتب</p>
<pre><code class="language-ocaml"># #directory <span class="hljs-string">&quot;+unix&quot;</span>;;

# #load <span class="hljs-string">&quot;unix.cma&quot;</span>;;
</code></pre>
<blockquote>
<p>Windows: تطبيق Cygwin من OCaml ينفّذ تنفيذًا كاملًا جميع دوال وحدة Unix. أما تطبيقات Win32 الأصلية فتنفّذ مجموعة جزئية منها. وفي ما يلي قائمة بالدوال التي لا تنفّذها تطبيقات Win32، أو التي تنفّذها تنفيذًا جزئيًا فقط. أما الدوال غير المذكورة فمنفَّذة تنفيذًا كاملًا وتتصرّف كما ورد سابقًا في هذا الفصل.</p>
</blockquote>
<table>
<thead>
<tr>
<th><strong>الدوال</strong></th>
<th><strong>التعليق</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><code>fork</code></td>
<td>غير منفَّذة، استعمل <code>create_process</code> أو الخيوط</td>
</tr>
<tr>
<td><code>wait</code></td>
<td>غير منفَّذة، استعمل <code>waitpid</code></td>
</tr>
<tr>
<td><code>waitpid</code></td>
<td>لا تستطيع الانتظار إلا لعملية ذات معرّف معطى، لا لأي عملية فرعية</td>
</tr>
<tr>
<td><code>getppid</code></td>
<td>غير منفَّذة (لا معنى لها في Windows)</td>
</tr>
<tr>
<td><code>nice</code></td>
<td>غير منفَّذة</td>
</tr>
<tr>
<td><code>truncate</code>، <code>ftruncate</code></td>
<td>منفَّذة (منذ 4.10.0)</td>
</tr>
<tr>
<td><code>link</code></td>
<td>منفَّذة (منذ 3.02)</td>
</tr>
<tr>
<td><code>fchmod</code></td>
<td>غير منفَّذة</td>
</tr>
<tr>
<td><code>chown</code>، <code>fchown</code></td>
<td>غير منفَّذة (لا معنى لها في نظام ملفات DOS)</td>
</tr>
<tr>
<td><code>umask</code></td>
<td>غير منفَّذة</td>
</tr>
<tr>
<td><code>access</code></td>
<td>لا يمكن اختبار إذن التنفيذ <code>X_OK</code>، بل تُختبر إذن القراءة بدلًا منه</td>
</tr>
<tr>
<td><code>chroot</code></td>
<td>غير منفَّذة</td>
</tr>
<tr>
<td><code>mkfifo</code></td>
<td>غير منفَّذة</td>
</tr>
<tr>
<td><code>symlink</code>، <code>readlink</code></td>
<td>منفَّذة (منذ 4.03.0)</td>
</tr>
<tr>
<td><code>kill</code></td>
<td>منفَّذة تنفيذًا جزئيًا (منذ 4.00.0): لا تُنفَّذ إلا الإشارة <code>sigkill</code></td>
</tr>
<tr>
<td><code>sigprocmask</code>، <code>sigpending</code>، <code>sigsuspend</code></td>
<td>غير منفَّذة (لا إشارات بين العمليات في Windows)</td>
</tr>
<tr>
<td><code>pause</code></td>
<td>غير منفَّذة (لا إشارات بين العمليات في Windows)</td>
</tr>
<tr>
<td><code>alarm</code></td>
<td>غير منفَّذة</td>
</tr>
<tr>
<td><code>times</code></td>
<td>منفَّذة تنفيذًا جزئيًا، ولن تُبلِغ عن أزمنة العمليات الفرعية</td>
</tr>
<tr>
<td><code>getitimer</code>، <code>setitimer</code></td>
<td>غير منفَّذة</td>
</tr>
<tr>
<td><code>getuid</code>، <code>geteuid</code>، <code>getgid</code>، <code>getegid</code></td>
<td>تعيد دائمًا 1</td>
</tr>
<tr>
<td><code>setuid</code>، <code>setgid</code>، <code>setgroups</code>، <code>initgroups</code></td>
<td>غير منفَّذة</td>
</tr>
<tr>
<td><code>getgroups</code></td>
<td>تعيد دائمًا <code>[1]</code> (منذ 2.00)</td>
</tr>
<tr>
<td><code>getpwnam</code>، <code>getpwuid</code></td>
<td>ترفع دائمًا <code>Not_found</code></td>
</tr>
<tr>
<td><code>getgrnam</code>، <code>getgrgid</code></td>
<td>ترفع دائمًا <code>Not_found</code></td>
</tr>
<tr>
<td>النوع <code>socket_domain</code></td>
<td><code>PF_INET</code> مدعوم دعمًا كاملًا؛ و<code>PF_INET6</code> مدعوم دعمًا كاملًا (منذ 4.01.0)؛ و<code>PF_UNIX</code> مدعوم منذ 4.14.0، لكنه لا يعمل إلا في Windows 10 1803 وما بعده.</td>
</tr>
<tr>
<td><code>establish_server</code></td>
<td>غير منفَّذة؛ استعمل الخيوط</td>
</tr>
<tr>
<td>دوال الطرفية (<code>tc*</code>)</td>
<td>غير منفَّذة</td>
</tr>
<tr>
<td><code>setsid</code></td>
<td>غير منفَّذة</td>
</tr>
</tbody>
</table>
`,i={book:d,chapter:t,chapterTitle:n,slug:e,title:o,headings:c,html:r};export{d as book,t as chapter,n as chapterTitle,i as default,c as headings,r as html,e as slug,o as title};
