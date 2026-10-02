const n="go-tour",t="flowcontrol",o="تعليمات التحكم في التدفق: for وif وelse وswitch وتأجيل التنفيذ",r="p2",s="حلقة for — متابعة",e=[{depth:2,id:"lesson-title",text:"حلقة for — متابعة"}],i=`
  <h2 id="lesson-title">حلقة for — متابعة</h2>
  
  
  <p>
    تعليمة التهيئة والتعليمة اللاحقة اختياريتان.
  </p>
  

	
		
	

`,c=[{Name:"for-continued.go",Content:`package main

import "fmt"

func main() {
	sum := 1
	for ; sum < 1000; {
		sum += sum
	}
	fmt.Println(sum)
}
`}],l=`
  <h2>For continued</h2>
  
  
  <p>
    The init and post statements are optional.
  </p>
  

	
		
	

`,a={book:n,chapter:t,chapterTitle:o,slug:"p2",title:s,headings:e,html:i,examples:c,original:l};export{n as book,t as chapter,o as chapterTitle,a as default,c as examples,e as headings,i as html,l as original,r as slug,s as title};
