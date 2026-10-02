const n="go-tour",e="concurrency",o="التزامن",t="index",r="مسارات التنفيذ الخفيفة (Goroutines)",c=[{depth:2,id:"lesson-title",text:"مسارات التنفيذ الخفيفة (Goroutines)"}],s=`
  <h2 id="lesson-title">مسارات التنفيذ الخفيفة (Goroutines)</h2>
  
  
  <p>
    يُعدّ <i>مسار التنفيذ الخفيف</i> خيط تنفيذ خفيفًا تديره بيئة تشغيل Go.
  </p>
  

  
  <pre>go f(x, y, z)</pre>
  

  
  <p>
    يبدأ مسار تنفيذ خفيفًا جديدًا يشغّل
  </p>
  

  
  <pre>f(x, y, z)</pre>
  

  
  <p>
    يجري تقييم <code>f</code> و<code>x</code> و<code>y</code> و<code>z</code> في مسار التنفيذ الخفيف الحالي، ويجري تنفيذ <code>f</code> في مسار التنفيذ الخفيف الجديد.
  </p>
  

  
  <p>
    تعمل مسارات التنفيذ الخفيفة في فضاء العناوين نفسه، لذا يجب مزامنة الوصول إلى الذاكرة المشتركة. توفر حزمة <a href="https://go.dev/pkg/sync/" target="_blank" rel="noopener noreferrer"><code>sync</code></a> بدائيات مفيدة، مع أنك لن تحتاج إليها كثيرًا في Go لوجود بدائيات أخرى. (انظر الشريحة التالية.)
  </p>
  

	
		
	

`,i=[{Name:"goroutines.go",Content:`package main

import (
	"fmt"
	"time"
)

func say(s string) {
	for i := 0; i < 5; i++ {
		time.Sleep(100 * time.Millisecond)
		fmt.Println(s)
	}
}

func main() {
	go say("world")
	say("hello")
}
`}],p=`
  <h2>Goroutines</h2>
  
  
  <p>
    A <i>goroutine</i> is a lightweight thread managed by the Go runtime.
  </p>
  

  
  <pre>go f(x, y, z)</pre>
  

  
  <p>
    starts a new goroutine running
  </p>
  

  
  <pre>f(x, y, z)</pre>
  

  
  <p>
    The evaluation of <code>f</code>, <code>x</code>, <code>y</code>, and <code>z</code> happens in the current goroutine and the execution of <code>f</code> happens in the new goroutine.
  </p>
  

  
  <p>
    Goroutines run in the same address space, so access to shared memory must be synchronized. The <a href="https://go.dev/pkg/sync/" target="_blank" rel="noopener noreferrer"><code>sync</code></a> package provides useful primitives, although you won&#39;t need them much in Go as there are other primitives. (See the next slide.)
  </p>
  

	
		
	

`,d={book:n,chapter:e,chapterTitle:o,slug:t,title:r,headings:c,html:s,examples:i,original:p};export{n as book,e as chapter,o as chapterTitle,d as default,i as examples,c as headings,s as html,p as original,t as slug,r as title};
