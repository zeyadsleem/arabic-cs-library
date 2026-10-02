const n="go-tour",e="concurrency",t="التزامن",s="p3",c="القنوات ذات التخزين المؤقت",o=[{depth:2,id:"lesson-title",text:"القنوات ذات التخزين المؤقت"}],a=`
  <h2 id="lesson-title">القنوات ذات التخزين المؤقت</h2>
  
  
  <p>
    يمكن أن تكون القنوات <i>ذات تخزين مؤقت</i>.  مرّر طول المخزن المؤقت بوصفه الوسيط الثاني إلى <code>make</code> لتهيئة قناة ذات تخزين مؤقت:
  </p>
  

  
  <pre>ch := make(chan int, 100)</pre>
  

  
  <p>
    تتوقف عمليات الإرسال إلى قناة ذات تخزين مؤقت انتظارًا فقط عندما يكون المخزن المؤقت ممتلئًا. وتتوقف عمليات الاستقبال انتظارًا عندما يكون المخزن المؤقت فارغًا.
  </p>
  

  
  <p>
    عدّل المثال لتتجاوز سعة المخزن المؤقت وانظر ماذا يحدث.
  </p>
  

	
		
	

`,h=[{Name:"buffered-channels.go",Content:`package main

import "fmt"

func main() {
	ch := make(chan int, 2)
	ch <- 1
	ch <- 2
	fmt.Println(<-ch)
	fmt.Println(<-ch)
}
`}],i=`
  <h2>Buffered Channels</h2>
  
  
  <p>
    Channels can be <i>buffered</i>.  Provide the buffer length as the second argument to <code>make</code> to initialize a buffered channel:
  </p>
  

  
  <pre>ch := make(chan int, 100)</pre>
  

  
  <p>
    Sends to a buffered channel block only when the buffer is full. Receives block when the buffer is empty.
  </p>
  

  
  <p>
    Modify the example to overfill the buffer and see what happens.
  </p>
  

	
		
	

`,l={book:n,chapter:e,chapterTitle:t,slug:"p3",title:c,headings:o,html:a,examples:h,original:i};export{n as book,e as chapter,t as chapterTitle,l as default,h as examples,o as headings,a as html,i as original,s as slug,c as title};
