const n="go-tour",t="flowcontrol",o="تعليمات التحكم في التدفق: for وif وelse وswitch وتأجيل التنفيذ",a="p11",i="switch بلا شرط",e=[{depth:2,id:"lesson-title",text:"switch بلا شرط"}],c=`
  <h2 id="lesson-title">switch بلا شرط</h2>
  
  
  <p>
    تعليمة switch بلا شرط تعادل <code>switch true</code>.
  </p>
  

  
  <p>
    يمكن أن تكون هذه البنية طريقة واضحة لكتابة سلاسل طويلة من «إذا، فإن، وإلا».
  </p>
  

	
		
	

`,s=[{Name:"switch-with-no-condition.go",Content:`package main

import (
	"fmt"
	"time"
)

func main() {
	t := time.Now()
	switch {
	case t.Hour() < 12:
		fmt.Println("Good morning!")
	case t.Hour() < 17:
		fmt.Println("Good afternoon.")
	default:
		fmt.Println("Good evening.")
	}
}
`}],h=`
  <h2>Switch with no condition</h2>
  
  
  <p>
    Switch without a condition is the same as <code>switch true</code>.
  </p>
  

  
  <p>
    This construct can be a clean way to write long if-then-else chains.
  </p>
  

	
		
	

`,l={book:n,chapter:t,chapterTitle:o,slug:"p11",title:i,headings:e,html:c,examples:s,original:h};export{n as book,t as chapter,o as chapterTitle,l as default,s as examples,e as headings,c as html,h as original,a as slug,i as title};
