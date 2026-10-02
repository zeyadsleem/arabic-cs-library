const n="go-tour",t="moretypes",e="مزيد من الأنواع: البنى والشرائح والخرائط.",s="p26",i="تمرين: إغلاق فيبوناتشي",o=[{depth:2,id:"lesson-title",text:"تمرين: إغلاق فيبوناتشي"}],c=`
  <h2 id="lesson-title">تمرين: إغلاق فيبوناتشي</h2>
  
  
  <p>
    لنستمتع قليلًا بالدوال.
  </p>
  

  
  <p>
    نفّذ دالة <code>fibonacci</code> تُعيد دالة (إغلاقًا)


    تُعيد <a href="https://en.wikipedia.org/wiki/Fibonacci_number" target="_blank" rel="noopener noreferrer">أعداد فيبوناتشي</a> المتعاقبة


    (0, 1, 1, 2, 3, 5, ...).
  </p>
  

	
		
	

`,r=[{Name:"exercise-fibonacci-closure.go",Content:`package main

import "fmt"

// fibonacci is a function that returns
// a function that returns an int.
func fibonacci() func() int {
}

func main() {
	f := fibonacci()
	for i := 0; i < 10; i++ {
		fmt.Println(f())
	}
}
`}],a=`
  <h2>Exercise: Fibonacci closure</h2>
  
  
  <p>
    Let&#39;s have some fun with functions.
  </p>
  

  
  <p>
    Implement a <code>fibonacci</code> function that returns a function (a closure) that


    returns successive <a href="https://en.wikipedia.org/wiki/Fibonacci_number" target="_blank" rel="noopener noreferrer">fibonacci numbers</a>


    (0, 1, 1, 2, 3, 5, ...).
  </p>
  

	
		
	

`,f={book:n,chapter:t,chapterTitle:e,slug:"p26",title:i,headings:o,html:c,examples:r,original:a};export{n as book,t as chapter,e as chapterTitle,f as default,r as examples,o as headings,c as html,a as original,s as slug,i as title};
