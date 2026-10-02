const n="go-tour",t="flowcontrol",e="تعليمات التحكم في التدفق: for وif وelse وswitch وتأجيل التنفيذ",r="p10",o="ترتيب التقييم في switch",a=[{depth:2,id:"lesson-title",text:"ترتيب التقييم في switch"}],s=`
  <h2 id="lesson-title">ترتيب التقييم في switch</h2>
  
  
  <p>
    تُقيَّم حالات switch من الأعلى إلى الأسفل، ويتوقف التقييم عندما تتحقق إحدى الحالات.
  </p>
  

  
  <p>
    (على سبيل المثال،
  </p>
  

  
  <pre>switch i {
case 0:
case f():
}</pre>
  

  
  <p>
    لا تستدعي هذه التعليمة <code>f</code> إذا كان <code>i==0</code>.)
  </p>
  

  
  <p>
    <b>ملاحظة:</b> يبدو الوقت في ساحة تجارب Go دائمًا وكأنه يبدأ عند


    2009-11-10 23:00:00 UTC، وهي قيمة يُترك اكتشاف دلالتها


    تمرينًا للقارئ.
  </p>
  

	
		
	

`,c=[{Name:"switch-evaluation-order.go",Content:`package main

import (
	"fmt"
	"time"
)

func main() {
	fmt.Println("When's Saturday?")
	today := time.Now().Weekday()
	switch time.Saturday {
	case today + 0:
		fmt.Println("Today.")
	case today + 1:
		fmt.Println("Tomorrow.")
	case today + 2:
		fmt.Println("In two days.")
	default:
		fmt.Println("Too far away.")
	}
}
`}],i=`
  <h2>Switch evaluation order</h2>
  
  
  <p>
    Switch cases evaluate cases from top to bottom, stopping when a case succeeds.
  </p>
  

  
  <p>
    (For example,
  </p>
  

  
  <pre>switch i {
case 0:
case f():
}</pre>
  

  
  <p>
    does not call <code>f</code> if <code>i==0</code>.)
  </p>
  

  
  <p>
    <b>Note:</b> Time in the Go playground always appears to start at


    2009-11-10 23:00:00 UTC, a value whose significance is left as an


    exercise for the reader.
  </p>
  

	
		
	

`,p={book:n,chapter:t,chapterTitle:e,slug:"p10",title:o,headings:a,html:s,examples:c,original:i};export{n as book,t as chapter,e as chapterTitle,p as default,c as examples,a as headings,s as html,i as original,r as slug,o as title};
