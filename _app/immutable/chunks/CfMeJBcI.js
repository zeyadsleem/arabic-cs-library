const n="go-tour",t="flowcontrol",e="تعليمات التحكم في التدفق: for وif وelse وswitch وتأجيل التنفيذ",d="p5",o="تعليمة if",s=[{depth:2,id:"lesson-title",text:"تعليمة if"}],c=`
  <h2 id="lesson-title">تعليمة if</h2>
  
  
  <p>
    تعليمات <code>if</code> في Go تشبه حلقات <code>for</code> فيها؛ فلا يلزم أن يكون التعبير


    محاطًا بأقواس مستديرة <code>( )</code>، لكن الأقواس المعقوفة <code>{ }</code> مطلوبة.
  </p>
  

	
		
	

`,r=[{Name:"if.go",Content:`package main

import (
	"fmt"
	"math"
)

func sqrt(x float64) string {
	if x < 0 {
		return sqrt(-x) + "i"
	}
	return fmt.Sprint(math.Sqrt(x))
}

func main() {
	fmt.Println(sqrt(2), sqrt(-4))
}
`}],i=`
  <h2>If</h2>
  
  
  <p>
    Go&#39;s <code>if</code> statements are like its <code>for</code> loops; the expression need not be


    surrounded by parentheses <code>( )</code> but the braces <code>{ }</code> are required.
  </p>
  

	
		
	

`,f={book:n,chapter:t,chapterTitle:e,slug:"p5",title:o,headings:s,html:c,examples:r,original:i};export{n as book,t as chapter,e as chapterTitle,f as default,r as examples,s as headings,c as html,i as original,d as slug,o as title};
