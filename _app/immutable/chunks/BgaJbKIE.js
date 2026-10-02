const n="go-tour",t="concurrency",e="التزامن",a="p6",c="الاختيار الافتراضي",o=[{depth:2,id:"lesson-title",text:"الاختيار الافتراضي"}],i=`
  <h2 id="lesson-title">الاختيار الافتراضي</h2>
  
  
  <p>
    تُنفّذ حالة <code>default</code> في <code>select</code> إذا لم تكن أي حالة أخرى جاهزة.
  </p>
  

  
  <p>
    استخدم حالة <code>default</code> لمحاولة الإرسال أو الاستقبال دون التوقف انتظارًا:
  </p>
  

  
  <pre>select {
case i := &lt;-c:
    // use i
default:
    // receiving from c would block
}</pre>
  

	
		
	

`,s=[{Name:"default-selection.go",Content:`package main

import (
	"fmt"
	"time"
)

func main() {
	start := time.Now()
	tick := time.Tick(100 * time.Millisecond)
	boom := time.After(500 * time.Millisecond)
	elapsed := func() time.Duration {
		return time.Since(start).Round(time.Millisecond)
	}
	for {
		select {
		case <-tick:
			fmt.Printf("[%6s] tick.\\n", elapsed())
		case <-boom:
			fmt.Printf("[%6s] BOOM!\\n", elapsed())
			return
		default:
			fmt.Printf("[%6s]     .\\n", elapsed())
			time.Sleep(50 * time.Millisecond)
		}
	}
}
`}],l=`
  <h2>Default Selection</h2>
  
  
  <p>
    The <code>default</code> case in a <code>select</code> is run if no other case is ready.
  </p>
  

  
  <p>
    Use a <code>default</code> case to try a send or receive without blocking:
  </p>
  

  
  <pre>select {
case i := &lt;-c:
    // use i
default:
    // receiving from c would block
}</pre>
  

	
		
	

`,d={book:n,chapter:t,chapterTitle:e,slug:"p6",title:c,headings:o,html:i,examples:s,original:l};export{n as book,t as chapter,e as chapterTitle,d as default,s as examples,o as headings,i as html,l as original,a as slug,c as title};
