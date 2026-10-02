const n="go-tour",t="flowcontrol",e="تعليمات التحكم في التدفق: for وif وelse وswitch وتأجيل التنفيذ",r="p6",o="if مع تعليمة قصيرة",c=[{depth:2,id:"lesson-title",text:"if مع تعليمة قصيرة"}],i=`
  <h2 id="lesson-title">if مع تعليمة قصيرة</h2>
  
  
  <p>
    مثل <code>for</code>، يمكن أن تبدأ تعليمة <code>if</code> بتعليمة قصيرة تُنفَّذ قبل الشرط.
  </p>
  

  
  <p>
    لا تبقى المتغيرات المُصرَّح عنها بواسطة هذه التعليمة ضمن النطاق إلا حتى نهاية <code>if</code>.
  </p>
  

  
  <p>
    (جرّب استخدام <code>v</code> في تعليمة <code>return</code> الأخيرة.)
  </p>
  

	
		
	

`,s=[{Name:"if-with-a-short-statement.go",Content:`package main

import (
	"fmt"
	"math"
)

func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		return v
	}
	return lim
}

func main() {
	fmt.Println(
		pow(3, 2, 10),
		pow(3, 3, 20),
	)
}
`}],a=`
  <h2>If with a short statement</h2>
  
  
  <p>
    Like <code>for</code>, the <code>if</code> statement can start with a short statement to execute before the condition.
  </p>
  

  
  <p>
    Variables declared by the statement are only in scope until the end of the <code>if</code>.
  </p>
  

  
  <p>
    (Try using <code>v</code> in the last <code>return</code> statement.)
  </p>
  

	
		
	

`,d={book:n,chapter:t,chapterTitle:e,slug:"p6",title:o,headings:c,html:i,examples:s,original:a};export{n as book,t as chapter,e as chapterTitle,d as default,s as examples,c as headings,i as html,a as original,r as slug,o as title};
