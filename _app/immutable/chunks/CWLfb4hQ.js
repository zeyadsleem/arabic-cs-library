const n="go-tour",t="concurrency",e="التزامن",l="p5",c="الاختيار (select)",o=[{depth:2,id:"lesson-title",text:"الاختيار (select)"}],i=`
  <h2 id="lesson-title">الاختيار (select)</h2>
  
  
  <p>
    تتيح تعليمة <code>select</code> لمسار تنفيذ خفيف انتظار عمليات اتصال متعددة.
  </p>
  

  
  <p>
    تتوقف <code>select</code> انتظارًا حتى يصبح تنفيذ إحدى حالاتها ممكنًا، ثم تنفّذ تلك الحالة.  وتختار حالة عشوائيًا إذا كانت عدة حالات جاهزة.
  </p>
  

	
		
	

`,s=[{Name:"select.go",Content:`package main

import "fmt"

func fibonacci(c, quit chan int) {
	x, y := 0, 1
	for {
		select {
		case c <- x:
			x, y = y, x+y
		case <-quit:
			fmt.Println("quit")
			return
		}
	}
}

func main() {
	c := make(chan int)
	quit := make(chan int)
	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println(<-c)
		}
		quit <- 0
	}()
	fibonacci(c, quit)
}
`}],a=`
  <h2>Select</h2>
  
  
  <p>
    The <code>select</code> statement lets a goroutine wait on multiple communication operations.
  </p>
  

  
  <p>
    A <code>select</code> blocks until one of its cases can run, then it executes that case.  It chooses one at random if multiple are ready.
  </p>
  

	
		
	

`,u={book:n,chapter:t,chapterTitle:e,slug:"p5",title:c,headings:o,html:i,examples:s,original:a};export{n as book,t as chapter,e as chapterTitle,u as default,s as examples,o as headings,i as html,a as original,l as slug,c as title};
