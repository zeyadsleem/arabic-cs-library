const n="go-tour",e="concurrency",t="التزامن",h="p2",c="القنوات",o=[{depth:2,id:"lesson-title",text:"القنوات"}],s=`
  <h2 id="lesson-title">القنوات</h2>
  
  
  <p>
    القنوات ممرات ذات نوع محدد يمكنك إرسال القيم واستقبالها عبرها باستخدام عامل القناة، <code>&lt;-</code>.
  </p>
  

  
  <pre>ch &lt;- v    // Send v to channel ch.
v := &lt;-ch  // Receive from ch, and
           // assign value to v.</pre>
  

  
  <p>
    (تتدفق البيانات في اتجاه السهم.)
  </p>
  

  
  <p>
    مثل الخرائط والشرائح، يجب إنشاء القنوات قبل استخدامها:
  </p>
  

  
  <pre>ch := make(chan int)</pre>
  

  
  <p>
    افتراضيًا، تتوقف عمليات الإرسال والاستقبال انتظارًا حتى يصبح الطرف الآخر جاهزًا. يتيح ذلك لمسارات التنفيذ الخفيفة أن تتزامن دون أقفال صريحة أو متغيرات شرطية.
  </p>
  

  
  <p>
    تجمع الشيفرة في المثال الأعداد الموجودة في شريحة، وتوزّع العمل بين مسارَي تنفيذ خفيفين.


    وبمجرد أن يُكمل كلا مسارَي التنفيذ الخفيفين حساباته، تحسب النتيجة النهائية.
  </p>
  

	
		
	

`,a=[{Name:"channels.go",Content:`package main

import "fmt"

func sum(s []int, c chan int) {
	sum := 0
	for _, v := range s {
		sum += v
	}
	c <- sum // send sum to c
}

func main() {
	s := []int{7, 2, 8, -9, 4, 0}

	c := make(chan int)
	go sum(s[:len(s)/2], c)
	go sum(s[len(s)/2:], c)
	x, y := <-c, <-c // receive from c

	fmt.Println(x, y, x+y)
}
`}],i=`
  <h2>Channels</h2>
  
  
  <p>
    Channels are a typed conduit through which you can send and receive values with the channel operator, <code>&lt;-</code>.
  </p>
  

  
  <pre>ch &lt;- v    // Send v to channel ch.
v := &lt;-ch  // Receive from ch, and
           // assign value to v.</pre>
  

  
  <p>
    (The data flows in the direction of the arrow.)
  </p>
  

  
  <p>
    Like maps and slices, channels must be created before use:
  </p>
  

  
  <pre>ch := make(chan int)</pre>
  

  
  <p>
    By default, sends and receives block until the other side is ready. This allows goroutines to synchronize without explicit locks or condition variables.
  </p>
  

  
  <p>
    The example code sums the numbers in a slice, distributing the work between two goroutines.


    Once both goroutines have completed their computation, it calculates the final result.
  </p>
  

	
		
	

`,r={book:n,chapter:e,chapterTitle:t,slug:"p2",title:c,headings:o,html:s,examples:a,original:i};export{n as book,e as chapter,t as chapterTitle,r as default,a as examples,o as headings,s as html,i as original,h as slug,c as title};
