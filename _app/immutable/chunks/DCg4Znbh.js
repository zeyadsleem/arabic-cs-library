const n="go-tour",t="flowcontrol",e="تعليمات التحكم في التدفق: for وif وelse وswitch وتأجيل التنفيذ",i="p13",o="تكديس عمليات تأجيل التنفيذ",r=[{depth:2,id:"lesson-title",text:"تكديس عمليات تأجيل التنفيذ"}],a=`
  <h2 id="lesson-title">تكديس عمليات تأجيل التنفيذ</h2>
  
  
  <p>
    تُدفَع استدعاءات الدوال المؤجَّلة إلى مكدّس. وعندما تعود دالة،


    تُنفَّذ استدعاءاتها المؤجَّلة بترتيب «الداخل أخيرًا يخرج أولًا».
  </p>
  

  
  <p>
    لمعرفة المزيد عن تعليمات تأجيل التنفيذ، اقرأ


    <a href="https://go.dev/blog/defer-panic-and-recover" target="_blank" rel="noopener noreferrer">هذه التدوينة</a>.
  </p>
  

	
		
	

`,s=[{Name:"defer-multi.go",Content:`package main

import "fmt"

func main() {
	fmt.Println("counting")

	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
	}

	fmt.Println("done")
}
`}],l=`
  <h2>Stacking defers</h2>
  
  
  <p>
    Deferred function calls are pushed onto a stack. When a function returns, its


    deferred calls are executed in last-in-first-out order.
  </p>
  

  
  <p>
    To learn more about defer statements read this


    <a href="https://go.dev/blog/defer-panic-and-recover" target="_blank" rel="noopener noreferrer">blog post</a>.
  </p>
  

	
		
	

`,c={book:n,chapter:t,chapterTitle:e,slug:"p13",title:o,headings:r,html:a,examples:s,original:l};export{n as book,t as chapter,e as chapterTitle,c as default,s as examples,r as headings,a as html,l as original,i as slug,o as title};
