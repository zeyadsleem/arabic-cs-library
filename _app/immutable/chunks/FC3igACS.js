const n="go-tour",t="flowcontrol",e="تعليمات التحكم في التدفق: for وif وelse وswitch وتأجيل التنفيذ",c="p12",o="تأجيل التنفيذ",l=[{depth:2,id:"lesson-title",text:"تأجيل التنفيذ"}],r=`
  <h2 id="lesson-title">تأجيل التنفيذ</h2>
  
  
  <p>
    تؤجّل تعليمة تأجيل التنفيذ تنفيذ دالة حتى تعود


    الدالة المحيطة بها.
  </p>
  

  
  <p>
    تُقيَّم وسائط الاستدعاء المؤجَّل فورًا، لكن استدعاء الدالة


    لا يُنفَّذ حتى تعود الدالة المحيطة به.
  </p>
  

	
		
	

`,s=[{Name:"defer.go",Content:`package main

import "fmt"

func main() {
	defer fmt.Println("world")

	fmt.Println("hello")
}
`}],i=`
  <h2>Defer</h2>
  
  
  <p>
    A defer statement defers the execution of a function until the surrounding


    function returns.
  </p>
  

  
  <p>
    The deferred call&#39;s arguments are evaluated immediately, but the function call


    is not executed until the surrounding function returns.
  </p>
  

	
		
	

`,u={book:n,chapter:t,chapterTitle:e,slug:"p12",title:o,headings:l,html:r,examples:s,original:i};export{n as book,t as chapter,e as chapterTitle,u as default,s as examples,l as headings,r as html,i as original,c as slug,o as title};
