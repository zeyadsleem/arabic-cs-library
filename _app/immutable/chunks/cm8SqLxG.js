const n="go-tour",t="flowcontrol",e="تعليمات التحكم في التدفق: for وif وelse وswitch وتأجيل التنفيذ",a="p7",o="if وelse",l=[{depth:2,id:"lesson-title",text:"if وelse"}],c=`
  <h2 id="lesson-title">if وelse</h2>
  
  
  <p>
    المتغيرات المُصرَّح عنها داخل التعليمة القصيرة في <code>if</code> متاحة أيضًا داخل أيٍّ


    من كتل <code>else</code>.
  </p>
  

  
  <p>
    (يُرجع كلا استدعاءَي <code>pow</code> نتيجته قبل أن يبدأ استدعاء <code>fmt.Println</code>


    في <code>main</code>.)
  </p>
  

	
		
	

`,s=[{Name:"if-and-else.go",Content:`package main

import (
	"fmt"
	"math"
)

func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		return v
	} else {
		fmt.Printf("%g >= %g\\n", v, lim)
	}
	// can't use v here, though
	return lim
}

func main() {
	fmt.Println(
		pow(3, 2, 10),
		pow(3, 3, 20),
	)
}
`}],i=`
  <h2>If and else</h2>
  
  
  <p>
    Variables declared inside an <code>if</code> short statement are also available inside any


    of the <code>else</code> blocks.
  </p>
  

  
  <p>
    (Both calls to <code>pow</code> return their results before the call to <code>fmt.Println</code>


    in <code>main</code> begins.)
  </p>
  

	
		
	

`,d={book:n,chapter:t,chapterTitle:e,slug:"p7",title:o,headings:l,html:c,examples:s,original:i};export{n as book,t as chapter,e as chapterTitle,d as default,s as examples,l as headings,c as html,i as original,a as slug,o as title};
