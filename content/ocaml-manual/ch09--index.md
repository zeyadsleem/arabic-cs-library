---
title: "البرمجة المتوازية"
lang: ar
source: https://ocaml.org/manual/5.5/
---

# الفصل 9: البرمجة المتوازية

ننظر في هذا الفصل إلى إمكانيات البرمجة المتوازية في OCaml. تُتيح المكتبة القياسية في OCaml بدائيات منخفضة المستوى للبرمجة المتوازية. ونوصي المستخدمين باستعمال مكتبات برمجة متوازية أعلى مستوى مثل [domainslib](https://github.com/ocaml-multicore/domainslib). سيغطي هذا الدرس أولًا البرمجة المتوازية عالية المستوى باستخدام domainslib، ثم البدائيات منخفضة المستوى التي يكشفها المترجم.

تفرّق OCaml بين التزامن والتوازي، وتقدّم آليتين مختلفتين للتعبير عنهما. التزامن هو التنفيذ المتشابك للمهام (القسم 12.24.2)، أما التوازي فهو التنفيذ الآني للمهام. وبوجه خاص، تتراكب المهام المتوازية زمنيًا، بينما قد تتراكب المهام المتزامنة أو لا تتراكب. وقد تُنفَّذ المهام تزامنيًا بأن تسلّم التحكم بعضها إلى بعض. فبينما التزامن آلية لبنية البرامج، فإن التوازي آلية لجعل برامجك أسرع. إذا كنت مهتمًا بآليات البرمجة المتزامنة في OCaml، فراجع القسم 12.24 عن معالجات التأثيرات والفصل 35 عن مكتبة الخيوط.

## 9.1 النطاقات

النطاقات هي وحدات التوازي في OCaml. توفّر الوحدة `Domain` البدائيات اللازمة لإنشاء النطاقات وإدارتها. ويمكن توليد نطاقات جديدة باستعمال الدالة `spawn`.

```ocaml
Domain.spawn (fun _ -> print_endline "I ran in parallel")

I ran in parallel
- : unit Domain.t = <abstr>
```

تنفّذ الدالة `spawn` الحساب المعطى بالتوازي مع النطاق المستدعي.

النطاقات كيانات ثقيلة الوزن. يقابل كل نطاق خيط نظام تشغيل واحد مقابل واحد. ولكل نطاق أيضًا حالته الخاصة بزمن التشغيل، وتشمل بنى محلية للنطاق تُستعمل لتخصيص الذاكرة. ومن ثمّ فإن إنشاءها وتفكيكها مكلف نسبيًا.

***يوصى ألا تولّد البرامج نطاقات أكثر من عدد الأنوية المتاحة***.

سننفّذ في هذا الدرس برامج متوازية، ونشغّلها، ونقيس أداءها. وتعتمد النتائج الملاحظة على عدد الأنوية المتاحة في الجهاز الهدف. كُتب هذا الدرس على حاسوب MacBook Pro بمعالج Intel Core i7 رباعي النوى بتردد 2.3 غيغاهرتز، وله أربع أنوية وثمانية خيوط عتادية. ومن المعقول توقّع أداء يعادل أربعة أضعاف تقريبًا على أربعة نطاقات للبرامج المتوازية التي فيها تنسيق قليل بين النطاقات، وحين لا يكون الجهاز تحت حمل. وفيما يتجاوز أربعة نطاقات، يُرجَّح أن يكون التسريع أقل من خطي. وسنستعمل أيضًا أداة قياس الأداء على سطر الأوامر [hyperfine](https://github.com/sharkdp/hyperfine) لقياس أداء برامجنا.

### 9.1.1 ضمّ النطاقات

سنكتب برنامجًا لحساب عدد فيبوناتشي رقم *n* بالعودية كمثال جارٍ. والبرنامج التتابعي لحساب عدد فيبوناتشي رقم *n* معطى فيما يلي.

```ocaml
(* fib.ml *)
let n = try int_of_string Sys.argv.(1) with _ -> 1

let rec fib n = if n < 2 then n else fib (n - 1) + fib (n - 2)

let main () =
  let r = fib n in
  Printf.printf "fib(%d) = %d\n%!" n r

let _ = main ()
```

يمكن ترجمة البرنامج وقياس أدائه كما يلي:

```text
$ ocamlopt -o fib.exe fib.ml
$ ./fib.exe 42
fib(42) = 267914296
$ hyperfine './fib.exe 42' # Benchmarking
Benchmark 1: ./fib.exe 42
  Time (mean ± sd):     1.193 s ±  0.006 s    [User: 1.186 s, System: 0.003 s]
  Range (min … max):    1.181 s …  1.202 s    10 runs
```

نرى أنه يستغرق نحو 1.2 ثانية لحساب عدد فيبوناتشي الثاني والأربعين.

يمكن ضمّ النطاقات المولَّدة باستعمال الدالة `join` للحصول على نتائجها. وتنتظر الدالة `join` انتهاء النطاق الهدف. ويحسب البرنامج التالي عدد فيبوناتشي رقم *n* مرتين بالتوازي.

```ocaml
(* fib_twice.ml *)
let n = int_of_string Sys.argv.(1)

let rec fib n = if n < 2 then n else fib (n - 1) + fib (n - 2)

let main () =
  let d1 = Domain.spawn (fun _ -> fib n) in
  let d2 = Domain.spawn (fun _ -> fib n) in
  let r1 = Domain.join d1 in
  Printf.printf "fib(%d) = %d\n%!" n r1;
  let r2 = Domain.join d2 in
  Printf.printf "fib(%d) = %d\n%!" n r2

let _ = main ()
```

يولّد البرنامج نطاقين يحسبان عدد فيبوناتشي رقم *n*. وتعيد الدالة `spawn` قيمة من النوع `Domain.t` يمكن ضمّها للحصول على نتيجة الحساب المتوازي. وتحجب الدالة `join` حتى يكتمل الحساب.

```text
$ ocamlopt -o fib_twice.exe fib_twice.ml
$ ./fib_twice.exe 42
fib(42) = 267914296
fib(42) = 267914296
$ hyperfine './fib_twice.exe 42'
Benchmark 1: ./fib_twice.exe 42
  Time (mean ± sd):     1.249 s ±  0.025 s    [User: 2.451 s, System: 0.012 s]
  Range (min … max):    1.221 s …  1.290 s    10 runs
```

كما يرى المرء، فإن حساب عدد فيبوناتشي رقم *n* مرتين يستغرق تقريبًا الزمن نفسه الذي يستغرقه حسابه مرة واحدة، بفضل التوازي.

## 9.2 Domainslib: مكتبة للبرمجة المتوازية المتشعّبة

لنحاول موازاة دالة فيبوناتشي. يمكن تنفيذ النداءين العوديين بالتوازي. غير أن موازاة النداءات العودية على نحو ساذج، بتوليد نطاق لكل نداء، لن تنجح لأنها تولّد نطاقات أكثر من اللازم.

```ocaml
(* fib_par1.ml *)
let n = try int_of_string Sys.argv.(1) with _ -> 1

let rec fib n =
  if n < 2 then n else begin
    let d1 = Domain.spawn (fun _ -> fib (n - 1)) in
    let d2 = Domain.spawn (fun _ -> fib (n - 2)) in
    Domain.join d1 + Domain.join d2
  end

let main () =
  let r = fib n in
  Printf.printf "fib(%d) = %d\n%!" n r

let _ = main ()

fib(1) = 1
val n : int = 1
val fib : int -> int = <fun>
val main : unit -> unit = <fun>
```

```text
$ ocamlopt -o fib_par1.exe fib_par1.ml
$ ./fib_par1.exe 42
Fatal error: exception Failure("failed to allocate domain")
```

لOCaml حدّ أقصى قدره 128 نطاقًا يمكن أن تكون نشطة في الوقت نفسه. ومحاولة توليد نطاقات أكثر ترفع استثناءً. فكيف إذن نستطيع موازاة دالة فيبوناتشي؟

### 9.2.1 موازاة فيبوناتشي باستخدام domainslib

لا توفّر المكتبة القياسية في OCaml إلا بدائيات منخفضة المستوى للبرمجة المتزامنة والمتوازية، وتترك المكتبات عالية المستوى لي تُطوَّر وتُوزَّع خارج توزيعة المترجم الأساسية. و[Domainslib](https://github.com/ocaml-multicore/domainslib) مكتبة من هذا القبيل للبرمجة المتوازية المتشعّبة، التي يجسّدها التوازي المتاح في حساب فيبوناتشي العودي. لنستعمل domainslib لموازاة برنامج فيبوناتشي العودي. ويوصى بتثبيت domainslib باستعمال مدير الحزم [opam](https://opam.ocaml.org/). ويستعمل هذا الدرس domainslib بالإصدار 0.5.0.

توفّر domainslib آلية async/await لتوليد المهام المتوازية وانتظار نتائجها. وفوق هذه الآلية، توفّر domainslib مكرّرات متوازية. ولها في جوهرها تنفيذ فعّال لـ[قوائم انتظار سرقة العمل](https://en.wikipedia.org/wiki/Work_stealing) لتقاسم المهام بكفاءة مع النطاقات الأخرى. ويلي تنفيذ متوازٍ لبرنامج فيبوناتشي:

```text
(* fib_par2.ml *)
let num_domains = int_of_string Sys.argv.(1)
let n = int_of_string Sys.argv.(2)

let rec fib n = if n < 2 then n else fib (n - 1) + fib (n - 2)

module T = Domainslib.Task

let rec fib_par pool n =
  if n > 20 then begin
    let a = T.async pool (fun _ -> fib_par pool (n-1)) in
    let b = T.async pool (fun _ -> fib_par pool (n-2)) in
    T.await pool a + T.await pool b
  end else fib n

let main () =
  let pool = T.setup_pool ~num_domains:(num_domains - 1) () in
  let res = T.run pool (fun _ -> fib_par pool n) in
  T.teardown_pool pool;
  Printf.printf "fib(%d) = %d\n" n res

let _ = main ()
```

يأخذ البرنامج عدد النطاقات ومعطى دالة فيبوناتشي كوسيطين أول وثانٍ على سطر الأوامر على الترتيب.

لنبدأ بالدالة الرئيسية. أولًا نهيّئ بركة نطاقات ستعمل عليها المهام المتوازية المتشعّبة. والنطاق الذي يستدعي الدالة `run` سيشارك أيضًا في تنفيذ المهام المقدَّمة إلى البركة. ونستدعي دالة فيبوناتشي المتوازية `fib_par` داخل الدالة `run`. وأخيرًا نفكّك البركة ونطبع النتيجة.

من أجل مدخلات كبيرة بما يكفي (`n > 20`)، تولّد الدالة `fib_par` النداءين العوديين الأيسر والأيمن لا تزامنيًا في البركة باستعمال الدالة `async`. وتعيد الدالة `async` وعدًا بالنتيجة. ويُحصل على نتيجة حساب لا تزامني بانتظار الوعد باستعمال الدالة `await`. ويحجب نداء الدالة `await` حتى يُنجَز الوعد.

من أجل مدخلات صغيرة، تستدعي الدالة `fib_par` ببساطة دالة فيبوناتشي التتابعية `fib`. ومن المهم التحوّل إلى النمط التتابعي في أحجام المسائل الصغيرة، وإلا فسترحج كلفة الموازاة العمل المتاح.

للبساطة نستعمل `ocamlfind` لترجمة هذا البرنامج. وبوجه عام يُوصى المستخدمين باستعمال [dune](https://github.com/ocaml/dune) لبناء البرامج التي تستعمل مكتبات مثبَّتة عبر [opam](https://opam.ocaml.org/).

```text
$ ocamlfind ocamlopt -package domainslib -linkpkg -o fib_par2.exe fib_par2.ml
$ ./fib_par2.exe 1 42
fib(42) = 267914296
$ hyperfine './fib.exe 42' './fib_par2.exe 2 42' \
            './fib_par2.exe 4 42' './fib_par2.exe 8 42'
Benchmark 1: ./fib.exe 42
  Time (mean ± sd):     1.217 s ±  0.018 s    [User: 1.203 s, System: 0.004 s]
  Range (min … max):    1.202 s …  1.261 s    10 runs

Benchmark 2: ./fib_par2.exe 2 42
  Time (mean ± sd):    628.2 ms ±   2.9 ms    [User: 1243.1 ms, System: 4.9 ms]
  Range (min … max):   625.7 ms … 634.5 ms    10 runs

Benchmark 3: ./fib_par2.exe 4 42
  Time (mean ± sd):    337.6 ms ±  23.4 ms    [User: 1321.8 ms, System: 8.4 ms]
  Range (min … max):   318.5 ms … 377.6 ms    10 runs

Benchmark 4: ./fib_par2.exe 8 42
  Time (mean ± sd):    250.0 ms ±   9.4 ms    [User: 1877.1 ms, System: 12.6 ms]
  Range (min … max):   242.5 ms … 277.3 ms    11 runs

Summary
  './fib_par2.exe 8 42' ran
    1.35 ± 0.11 times faster than './fib_par2.exe 4 42'
    2.51 ± 0.10 times faster than './fib_par2.exe 2 42'
    4.87 ± 0.20 times faster than './fib.exe 42'
```

تُظهر النتائج أنه بثمانية نطاقات يعمل برنامج فيبوناتشي المتوازي أسرع 4.87 مرة من النسخة التتابعية.

### 9.2.2 بنى التكرار المتوازي

تستعمل خوارزميات عددية كثيرة حلقات for. وتوفّر البدائية parallel-for طريقة مباشرة لموازاة مثل هذه الشيفرة. لنأخذ معيار [spectral-norm](https://benchmarksgame-team.pages.debian.net/benchmarksgame/description/spectralnorm.html#spectralnorm) من لعبة معايير لغات الحاسوب ونوازيه. والنسخة التتابعية من البرنامج معطاة فيما يلي.

```ocaml
(* spectralnorm.ml *)
let n = try int_of_string Sys.argv.(1) with _ -> 32

let eval_A i j = 1. /. float((i+j)*(i+j+1)/2+i+1)

let eval_A_times_u u v =
  let n = Array.length v - 1 in
  for i = 0 to  n do
    let vi = ref 0. in
    for j = 0 to n do vi := !vi +. eval_A i j *. u.(j) done;
    v.(i) <- !vi
  done

let eval_At_times_u u v =
  let n = Array.length v - 1 in
  for i = 0 to n do
    let vi = ref 0. in
    for j = 0 to n do vi := !vi +. eval_A j i *. u.(j) done;
    v.(i) <- !vi
  done

let eval_AtA_times_u u v =
  let w = Array.make (Array.length u) 0.0 in
  eval_A_times_u u w; eval_At_times_u w v

let () =
  let u = Array.make n 1.0  and  v = Array.make n 0.0 in
  for _i = 0 to 9 do
    eval_AtA_times_u u v; eval_AtA_times_u v u
  done;

  let vv = ref 0.0  and  vBv = ref 0.0 in
  for i=0 to n-1 do
    vv := !vv +. v.(i) *. v.(i);
    vBv := !vBv +. u.(i) *. v.(i)
  done;
  Printf.printf "%0.9f\n" (sqrt(!vBv /. !vv))
```

لاحظ أن في البرنامج حلقات متشعّبة في `eval_A_times_u` و`eval_At_times_u`. تقرأ كل دورة من جسم الحلقة الخارجية من `u`، لكنها تكتب في مواقع ذاكرة منفصلة في `v`. ومن ثمّ فإن دورات الحلقة الخارجية غير متوقفة بعضها على بعض، ويمكن تنفيذها بالتوازي.

والنسخة المتوازية من المعيار القياسي الطيفي معطاة فيما يلي.

```text
(* spectralnorm_par.ml *)
let num_domains = try int_of_string Sys.argv.(1) with _ -> 1
let n = try int_of_string Sys.argv.(2) with _ -> 32

let eval_A i j = 1. /. float((i+j)*(i+j+1)/2+i+1)

module T = Domainslib.Task

let eval_A_times_u pool u v =
  let n = Array.length v - 1 in
  T.parallel_for pool ~start:0 ~finish:n ~body:(fun i ->
    let vi = ref 0. in
    for j = 0 to n do vi := !vi +. eval_A i j *. u.(j) done;
    v.(i) <- !vi
  )

let eval_At_times_u pool u v =
  let n = Array.length v - 1 in
  T.parallel_for pool ~start:0 ~finish:n ~body:(fun i ->
    let vi = ref 0. in
    for j = 0 to n do vi := !vi +. eval_A j i *. u.(j) done;
    v.(i) <- !vi
  )

let eval_AtA_times_u pool u v =
  let w = Array.make (Array.length u) 0.0 in
  eval_A_times_u pool u w; eval_At_times_u pool w v

let () =
  let pool = T.setup_pool ~num_domains:(num_domains - 1) () in
  let u = Array.make n 1.0  and  v = Array.make n 0.0 in
  T.run pool (fun _ ->
  for _i = 0 to 9 do
    eval_AtA_times_u pool u v; eval_AtA_times_u pool v u
  done);

  let vv = ref 0.0  and  vBv = ref 0.0 in
  for i=0 to n-1 do
    vv := !vv +. v.(i) *. v.(i);
    vBv := !vBv +. u.(i) *. v.(i)
  done;
  T.teardown_pool pool;
  Printf.printf "%0.9f\n" (sqrt(!vBv /. !vv))
```

لاحظ أن الدالة `parallel_for` متماثلة الشكل مع حلقة for في النسخة التتابعية. ولا حاجة إلى أي تغيير آخر سوى الشيفرة النمطية اللازمة لتهيئة البرك وتفكيكها.

```text
$ ocamlopt -o spectralnorm.exe spectralnorm.ml
$ ocamlfind ocamlopt -package domainslib -linkpkg -o spectralnorm_par.exe \
  spectralnorm_par.ml
$ hyperfine './spectralnorm.exe 4096' './spectralnorm_par.exe 2 4096' \
            './spectralnorm_par.exe 4 4096' './spectralnorm_par.exe 8 4096'
Benchmark 1: ./spectralnorm.exe 4096
  Time (mean ± sd):     1.989 s ±  0.013 s    [User: 1.972 s, System: 0.007 s]
  Range (min … max):    1.975 s …  2.018 s    10 runs

Benchmark 2: ./spectralnorm_par.exe 2 4096
  Time (mean ± sd):     1.083 s ±  0.015 s    [User: 2.140 s, System: 0.009 s]
  Range (min … max):    1.064 s …  1.102 s    10 runs

Benchmark 3: ./spectralnorm_par.exe 4 4096
  Time (mean ± sd):    698.7 ms ±  10.3 ms    [User: 2730.8 ms, System: 18.3 ms]
  Range (min … max):   680.9 ms … 721.7 ms    10 runs

Benchmark 4: ./spectralnorm_par.exe 8 4096
  Time (mean ± sd):    921.8 ms ±  52.1 ms    [User: 6711.6 ms, System: 51.0 ms]
  Range (min … max):   838.6 ms … 989.2 ms    10 runs

Summary
  './spectralnorm_par.exe 4 4096' ran
    1.32 ± 0.08 times faster than './spectralnorm_par.exe 8 4096'
    1.55 ± 0.03 times faster than './spectralnorm_par.exe 2 4096'
    2.85 ± 0.05 times faster than './spectralnorm.exe 4096'
```

على جهاز المؤلف، يتوسّع البرنامج توسعًا معقولًا حتى أربعة نطاقات، لكن أداءه يسوء بثمانية نطاقات. تذكّر أن الجهاز له أربع أنوية فيزيائية فقط. وتنقيح مشكلة الأداء هذه وإصلاحها خارج نطاق هذا الدرس.

## 9.3 جمع القمامة المتوازي

من الجوانب المهمة في قابلية التوسّع في برامج OCaml المتوازية قابلية توسّع جامع القمامة (GC). صُمّم جامع القمامة في OCaml ليكون منخفض زمن الاستجابة وجيد قابلية التوسّع المتوازي معًا. ولOCaml جامع قمامة أجيالي له كومة صغرى صغيرة وكومة كبرى كبيرة. تُخصَّص الكائنات الجديدة (حتى حجم معيّن) في الكومة الصغرى. ولكل نطاق ساحة كومة صغرى محلية به تُخصَّص الكائنات الجديدة دون مزامنة مع النطاقات الأخرى. وعندما يستنفد نطاق ساحة كومته الصغرى، يدعو إلى جمع يوقف العالم للكوم الصغرى. وفي مقطع إيقاف العالم، تجمع جميع النطاقات ساحات كومها الصغرى بالتوازي، ناقلةً الناجين إلى الكومة الكبرى.

أما الكومة الكبرى، فيحتفظ كل نطاق ببرك ذاكرة محلية له مقسّمة بالحجم تُخصَّص فيها الكائنات الكبيرة والناجون من الجمع الصغرى. ووجود برك محلية للنطاق يتجنّب المزامنة في معظم تخصيصات الكومة الكبرى. وتُجمَع الكومة الكبرى بخوارزمية تعليم ومسح متزامنة تتضمن وقفات قصيرة قليلة لإيقاف العالم في كل دورة كبرى.

بوجه عام، ينبغي للمستخدمين أن يتوقعوا توسّع جامع القمامة توسّعًا جيدًا مع زيادة عدد النطاقات، مع بقاء زمن الاستجابة منخفضًا. ولمزيد من المعلومات عن تصميم جامع القمامة وتقييمه، ألقِ نظرة على ورقة ICFP 2020 عن [`Retrofitting Parallelism onto OCaml`](https://arxiv.org/abs/2004.11663).

## 9.4 نموذج الذاكرة: الأجزاء السهلة

تُحسّن المعالجات والمترجمات الحديثة البرامج بشراسة. وتسرّع هذه التحسينات البرامج التتابعية دون أن تؤثر فيها من غير ذلك، لكنها تجعل سلوكيات مفاجئة مرئية في البرامج المتوازية. وللإفادة من هذه التحسينات، يتبنّى OCaml *نموذج ذاكرة مرخيًا* يحدّد بدقة أيّ هذه *السلوكيات المرخاة* يجوز للبرامج أن تلاحظها. وبينما يصعب البرمجة ضد هذه النماذج مباشرةً، يوفّر نموذج ذاكرة OCaml وصفات تحافظ على بساطة الاستدلال التتابعي.

أولًا، يجوز تقاسم القيم غير القابلة للتغيير بحرية بين نطاقات متعددة، والوصول إليها بالتوازي. أما بنى البيانات القابلة للتغيير، كخلايا المراجع والمصفوفات وحقول السجلات القابلة للتغيير، فينبغي للمبرمجين تجنّب *تسابقات البيانات*. يُقال إن خلايا المراجع والمصفوفات وحقول السجلات القابلة للتغيير بنى بيانات *غير ذرّية*. ويحدث تسابق البيانات عندما يصل نطاقان في الوقت نفسه إلى موقع ذاكرة غير ذرّي دون *مزامنة*، وكان أحد الوصولين على الأقل كتابةً. ويوفّر OCaml عددًا من طرق إدخال المزامنة، منها المتغيّرات الذرّية (القسم 9.7) والأقفال (القسم 9.5).

والأهم أن **OCaml يوفّر دلالات متسقة تتابعيًا (SC) للبرامج الخالية من تسابقات البيانات (DRF)** — أي أن السلوك الملاحظ لمثل هذه البرامج يمكن تفسيره بتشابك العمليات من نطاقات مختلفة. وتُعرف هذه الخاصية بضمانة DRF-SC. ثمّ إن ضمانة DRF-SC في OCaml نمطية: فإذا كان جزء من برنامج خاليًا من تسابقات البيانات، فإن نموذج ذاكرة OCaml يضمن أن تكون لهذه الأجزاء اتساقية تتابعية رغم وجود تسابقات بيانات في أجزاء أخرى من البرنامج. وحتى في البرامج التي فيها تسابقات بيانات، يوفّر OCaml ضمانات قوية: قد يلاحظ المستخدم سلوكيات غير متسقة تتابعيًا، لكن لا تحدث انهيارات.

لمزيد من التفاصيل عن السلوكيات المرخاة في وجود تسابقات بيانات، ألقِ نظرة على فصل الأجزاء الصعبة من نموذج الذاكرة (الفصل 10).

## 9.5 المزامنة الحاجبة

يجوز للنطاقات أن تؤدّي مزامنة حاجبة بمساعدة وحدات `Mutex` و`Condition` و`Semaphore`. وهذه الوحدات هي نفسها المستعملة لمزامنة الخيوط التي تنشئها مكتبة الخيوط (الفصل 35). وللتوضيح، نشير في بقية هذا الفصل إلى الخيوط التي تنشئها مكتبة الخيوط باسم *الخيوط النظامية*. وينفّذ البرنامج التالي مكدّسًا متزامنًا باستعمال قفل ومتغيّرات شرط.

```ocaml
module Blocking_stack : sig
  type 'a t
  val make : unit -> 'a t
  val push : 'a t -> 'a -> unit
  val pop  : 'a t -> 'a
end = struct
  type 'a t = {
    mutable contents: 'a list;
    mutex : Mutex.t;
    nonempty : Condition.t
  }

  let make () = {
    contents = [];
    mutex = Mutex.create ();
    nonempty = Condition.create ()
  }

  let push r v =
    Mutex.lock r.mutex;
    r.contents <- v::r.contents;
    Condition.signal r.nonempty;
    Mutex.unlock r.mutex

  let pop r =
    Mutex.lock r.mutex;
    let rec loop () =
      match r.contents with
      | [] ->
          Condition.wait r.nonempty r.mutex;
          loop ()
      | x::xs -> r.contents <- xs; x
    in
    let res = loop () in
    Mutex.unlock r.mutex;
    res
end
```

يُنفّذ المكدّس المتزامن بسجل من ثلاثة حقول: حقل قابل للتغيير `contents` يخزّن عناصر المكدّس، و`mutex` للتحكم في الوصول إلى الحقل `contents`، ومتغيّر شرط `nonempty` يُستعمل لإشعار النطاقات المحجوبة التي تنتظر أن يصير المكدّس غير فارغ.

تقفل عملية `push` القفل، وتحدّث الحقل `contents` بقائمة جديدة رأسها العنصر المدَفوع وذيلها القائمة القديمة. ويُشعَر متغيّر الشرط `nonempty` والقفل ممسوك، وذلك لإيقاظ أي نطاقات تنتظر على هذا الشرط. فإن كانت هناك نطاقات منتظرة، أُوقظ أحدها. وإن لم تكن، فلا أثر لعملية `signal`.

تقفل عملية `pop` القفل وتتحقق مما إذا كان المكدّس فارغًا. فإن كان كذلك، ينتظر النطاق المستدعي على متغيّر الشرط `nonempty` باستعمال البدائية `wait`. ويعلّق نداء `wait` تنفيذ النطاق الحالي ويفتح `mutex` ذرّيًا. وحين يُوقَظ هذا النطاق مجددًا (حين يعود نداء `wait`)، يكون ممسكًا بقفل `mutex`. ويحاول النطاق قراءة محتويات المكدّس مجددًا. فإن رأت عملية `pop` أن المكدّس غير فارغ، حدّثت `contents` بذيل القائمة القديمة، وأعادت الرأس.

وإدخال `mutex` للتحكم في الوصول إلى المورد المشترك `contents` يوفّر مزامنة كافية بين نطاقات متعددة تستعمل المكدّس. ومن ثمّ لا تحدث تسابقات بيانات عندما تستعمل نطاقات متعددة المكدّس بالتوازي.

### 9.5.1 التفاعل مع الخيوط النظامية

كيف تتفاعل الخيوط النظامية مع النطاقات؟ تبقى الخيوط النظامية المنشأة على نطاق معيّن مثبَّتة على ذلك النطاق. ولا يُسمح إلا لخيط نظامي واحد في المرة بأن يشغّل شيفرة OCaml على نطاق معيّن. غير أن الخيوط النظامية التابعة لنطاق معيّن يجوز أن تشغّل شيفرة مكتبات C أو شيفرة النظام بالتوازي. والخيوط النظامية التابعة لنطاقات مختلفة يجوز أن تُنفَّذ بالتوازي.

عند استعمال الخيوط النظامية، يُعامَل الخيط المنشأ لتنفيذ الحساب المعطى إلى `Domain.spawn` خيطًا نظاميًا أيضًا. مثلًا، ينشئ البرنامج التالي في المجموع نطاقين (بما فيهما النطاق الأولي)، لكل منهما خيطان نظاميان (بما فيهما الخيط النظامي الأولي لكل نطاق).

```text
(* dom_thr.ml *)
let m = Mutex.create ()
let r = ref None (* protected by m *)

let task () =
  let my_thr_id = Thread.(id (self ())) in
  let my_dom_id :> int = Domain.self () in
  Mutex.lock m;
  begin match !r with
  | None ->
      Printf.printf "Thread %d running on domain %d saw initial write\n%!"
        my_thr_id my_dom_id
  | Some their_thr_id ->
      Printf.printf "Thread %d running on domain %d saw the write by thread %d\n%!"
        my_thr_id my_dom_id their_thr_id;
  end;
  r := Some my_thr_id;
  Mutex.unlock m

let task' () =
  let t = Thread.create task () in
  task ();
  Thread.join t

let main () =
  let d = Domain.spawn task' in
  task' ();
  Domain.join d

let _ = main ()
```

```text
$ ocamlopt -I +threads -I +unix unix.cmxa threads.cmxa -o dom_thr.exe dom_thr.ml
$ ./dom_thr.exe
Thread 1 running on domain 1 saw initial write
Thread 0 running on domain 0 saw the write by thread 1
Thread 2 running on domain 1 saw the write by thread 0
Thread 3 running on domain 0 saw the write by thread 2
```

يستعمل هذا البرنامج خلية مرجع مشتركة محمية بقفل للتواصل بين الخيوط النظامية المختلفة العاملة على نطاقين مختلفين. ومعرّفات الخيوط النظامية تميّز الخيوط النظامية في البرنامج تمييزًا فريدًا. ويحصل النطاق الأولي على معرّف النطاق 0 ومعرّف الخيط 0. ويحصل النطاق المولَّد حديثًا على معرّف النطاق 1.

لاحظ أن جميع الخيوط النظامية التابعة لنطاق معيّن تُضمّ عند ضمّ النطاق. وبوجه خاص، إذا كان مثل هذا الخيط النظامي يشغّل حلقة لا نهائية، فلن يعود ضمّ النطاق أبدًا.

## 9.6 التفاعل مع ارتباطات C

أثناء التنفيذ المتوازي بنطاقات متعددة، يجوز أن تعمل شيفرة C العاملة على نطاق بالتوازي مع أي شيفرة C عاملة على نطاقات أخرى، حتى لو لم يحرّر أيّ منهما «قفل النطاق». وقبل OCaml 5.0، ربما افترضت ارتباطات C أنه إذا لم يُحرَّر قفل زمن تشغيل OCaml، فسيكون من الآمن التلاعب بحالة C العمومية (مثل تهيئة قيمة ساكنة محلية لدالة). وهذا لم يعد صحيحًا في وجود تنفيذ متوازٍ بنطاقات متعددة.

## 9.7 المتغيّرات الذرّية

تُستعمل الأقفال ومتغيّرات الشرط والسمافورات لتنفيذ مزامنة حاجبة بين النطاقات. أما للمزامنة غير الحاجبة، فيوفّر OCaml المتغيّرات `Atomic`. وكما يشير الاسم، لا توفّر المزامنة غير الحاجبة آليات لتعليق النطاقات وإيقاظها. وفي المقابل، غالبًا ما تُترجَم البدائيات المستعملة في المزامنة غير الحاجبة إلى بدائيات ذرّية للقراءة والتعديل والكتابة يوفّرها العتاد. ومثالًا على ذلك، يزيد البرنامج التالي عدّادًا غير ذرّي وعدّادًا ذرّيًا بالتوازي.

```ocaml
(* incr.ml *)
let twice_in_parallel f =
  let d1 = Domain.spawn f in
  let d2 = Domain.spawn f in
  Domain.join d1;
  Domain.join d2

let plain_ref n =
  let r = ref 0 in
  let f () = for _i=1 to n do incr r done in
  twice_in_parallel f;
  Printf.printf "Non-atomic ref count: %d\n" !r

let atomic_ref n =
  let r = Atomic.make 0 in
  let f () = for _i=1 to n do Atomic.incr r done in
  twice_in_parallel f;
  Printf.printf "Atomic ref count: %d\n" (Atomic.get r)

let main () =
  let n = try int_of_string Sys.argv.(1) with _ -> 1 in
  plain_ref n;
  atomic_ref n

let _ = main ()
```

```text
$ ocamlopt -o incr.exe incr.ml
$ ./incr.exe 1_000_000
Non-atomic ref count: 1187193
Atomic ref count: 2000000
```

لاحظ أن النتيجة من استعمال العدّاد غير الذرّي أقل من المتوقع على نحو ساذج. والسبب أن الدالة `incr` غير الذرّية مكافئة لما يلي:

```ocaml
let incr r =
  let curr = !r in
        r := curr + 1
```

لاحظ أن التحميل والتخزين عمليتان منفصلتان، وأن عملية الزيادة ككل لا تُنفَّذ ذرّيًا. فحين ينفّذ نطاقان هذه الشيفرة بالتوازي، قد يقرأ كلاهما القيمة نفسها للعدّاد `curr` ويحدّثها إلى `curr + 1`. ومن ثمّ سيكون الأثر أثر زيادة واحدة بدلًا من زيدتين. وفي المقابل، ينفّذ العدّاد الذرّي التحميل والتخزين ذرّيًا بمساعدة دعم العتاد للذرّية. ويعيد العدّاد الذرّي النتيجة المتوقعة.

يمكن استعمال المتغيّرات الذرّية لمزامنة منخفضة المستوى بين النطاقات. ويستعمل المثال التالي متغيّرًا ذرّيًا لتبادل رسالة بين نطاقين.

```ocaml
let r = Atomic.make None

let sender () = Atomic.set r (Some "Hello")

let rec receiver () =
  match Atomic.get r with
  | None -> Domain.cpu_relax (); receiver ()
  | Some m -> print_endline m

let main () =
  let s = Domain.spawn sender in
  let d = Domain.spawn receiver in
  Domain.join s;
  Domain.join d

let _ = main ()

Hello
val r : string option Atomic.t = <abstr>
val sender : unit -> unit = <fun>
val receiver : unit -> unit = <fun>
val main : unit -> unit = <fun>
```

مع أن المرسل والمستقبل يتنافسان على الوصول إلى `r`، فإن هذا ليس تسابق بيانات، لأن `r` مرجع ذرّي.

### 9.7.1 مكدّس بلا أقفال

تُستعمل وحدة Atomic لتنفيذ بنى بيانات غير حاجبة وبلا أقفال. وينفّذ البرنامج التالي مكدّسًا بلا أقفال.

```ocaml
module Lockfree_stack : sig
  type 'a t
  val make : unit -> 'a t
  val push : 'a t -> 'a -> unit
  val pop  : 'a t -> 'a option
end = struct
  type 'a t = 'a list Atomic.t

  let make () = Atomic.make []

  let rec push r v =
    let s = Atomic.get r in
    if Atomic.compare_and_set r s (v::s) then ()
    else (Domain.cpu_relax (); push r v)

  let rec pop r =
    let s = Atomic.get r in
    match s with
    | [] -> None
    | x::xs ->
        if Atomic.compare_and_set r s xs then Some x
        else (Domain.cpu_relax (); pop r)
end
```

يُمثَّل المكدّس الذرّي بمرجع ذرّي يحمل قائمة. وتستعمل عمليتا `push` و`pop` البدائية `compare_and_set` لمحاولة تحديث المرجع الذرّي ذرّيًا. والتعبير `compare_and_set r seen v` يضبط قيمة `r` على `v` إذا وفقط إذا كانت قيمته الحالية مساوية `seen` فيزيائيًا. والأهم أن المقارنة والتحديث يحدثان ذرّيًا. ويقيّم التعبير إلى `true` إذا نجحت المقارنة (وحدث التحديث)، وإلى `false` خلاف ذلك.

إذا فشل `compare_and_set`، فإن نطاقًا آخر يحاول أيضًا تحديث المرجع الذرّي في الوقت نفسه. وفي هذه الحالة تستدعي عمليتا `push` و`pop` الدالة `Domain.cpu_relax` للتراجع مدة قصيرة تتيح للنطاقات المتنافسة التقدّم قبل إعادة محاولة العملية الفاشلة. ويُسمى هذا التنفيذ للمكدّس بلا أقفال [مكدّس Treiber](https://en.wikipedia.org/wiki/Treiber_stack).

### 9.7.2 حقول السجلات الذرّية

النوع `'a Atomic.t` هو النظير الذرّي لنوع مراجع OCaml، `'a ref`. ومنذ OCaml 5.4، ندعم أيضًا حقول السجلات الذرّية، التي يجب أن تكون قابلة للتغيير، عبر السمة `[@atomic]`.

مثلًا:

```ocaml
type 'a refcounted = {
  value : 'a;
  mutable readers : int [@atomic];
}
```

الحقل `readers` ذرّي، بحيث تكون القراءة والكتابة في هذا الحقل عمليتين ذرّيتين شبيهتين بـ`Atomic.get` و`Atomic.set`. ويمكن إجراء عمليات ذرّية أخرى على هذا الحقل باستعمال عقدة امتداد مدمجة، `%atomic.loc`: فإذا كانت `rc` قيمة من النوع `foo refcounted`، فإن `[%atomic.loc rc.readers]` تعبير من النوع المدمج `foo Atomic.Loc.t`، وهو يتيح العمليات الذرّية المعرّفة في وحدة `Atomic.Loc` من المكتبة القياسية، على غرار العمليات المتاحة للمراجع الذرّية في وحدة `Atomic`:

```ocaml
# let add_reader rc =
    Atomic.Loc.fetch_and_add [%atomic.loc rc.readers] 1;;

val add_reader : 'a refcounted -> int = <fun>

# #show Atomic.Loc;;

module Loc :
  sig
    type 'a t = 'a atomic_loc
    external get : 'a t -> 'a = "%atomic_load_loc"
    val set : 'a t -> 'a -> unit
    external exchange : 'a t -> 'a -> 'a = "%atomic_exchange_loc"
    external compare_and_set : 'a t -> 'a -> 'a -> bool = "%atomic_cas_loc"
    external fetch_and_add : int t -> int -> int = "%atomic_fetch_add_loc"
    val incr : int t -> unit
    val decr : int t -> unit
  end
```

##### قيد

لا يوجد حاليًا نظير لـ`Atomic.make_contended` لحقول السجلات الذرّية. فإن كانت المشاركة الزائفة مشكلة في حقل سجل معيّن، فالنهج الأفضل المدعوم هو استعمال حقل من النوع `Atomic.t`. ونأمل في تنفيذ دعم الحشو عند الطلب لحقول السجلات في المستقبل.

##### ملاحظة حول الأداء

يُمثَّل `[%atomic.loc rc.readers]` داخليًا زوجًا من قيمة السجل وإزاحة حقل. وكلما طُبِّق هذا التعبير مباشرةً على بدائية ذرّية من وحدة `Atomic.Loc`، سيحسّن المترجم إنشاء الزوج فيزيله؛ إذ يمرّر القيمة والإزاحة معاملين منفصلين إلى بدائية أساسية في زمن التشغيل. وفي المقابل، قد يخصّص تخزين موقع ذرّي في بنية بيانات، أو تمريره إلى دالة أخرى غير مُضمَّنة، زوجًا. وعند الشك، يمكنك فحص التمثيل الوسيط `-dcmm` لشيفرتك.
