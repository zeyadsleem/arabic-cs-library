const n="go-tour",t="moretypes",e="مزيد من الأنواع: البنى والشرائح والخرائط.",a="p23",o="تمرين: الخرائط",s=[{depth:2,id:"lesson-title",text:"تمرين: الخرائط"}],r=`
  <h2 id="lesson-title">تمرين: الخرائط</h2>
  
  
  <p>
    نفّذ <code>WordCount</code>.  ينبغي أن تُعيد خريطة بأعداد مرات ظهور كل «كلمة» في السلسلة النصية <code>s</code>. تشغّل الدالة <code>wc.Test</code> مجموعة اختبارات على الدالة المقدَّمة، وتطبع النجاح أو الفشل.
  </p>
  

  
  <p>
    قد تجد <a href="https://go.dev/pkg/strings/#Fields" target="_blank" rel="noopener noreferrer">الدالة strings.Fields</a> مفيدة.
  </p>
  

	
		
	

`,c=[{Name:"exercise-maps.go",Content:`package main

import (
	"golang.org/x/tour/wc"
)

func WordCount(s string) map[string]int {
	return map[string]int{"x": 1}
}

func main() {
	wc.Test(WordCount)
}
`}],i=`
  <h2>Exercise: Maps</h2>
  
  
  <p>
    Implement <code>WordCount</code>.  It should return a map of the counts of each “word” in the string <code>s</code>. The <code>wc.Test</code> function runs a test suite against the provided function and prints success or failure.
  </p>
  

  
  <p>
    You might find <a href="https://go.dev/pkg/strings/#Fields" target="_blank" rel="noopener noreferrer">strings.Fields</a> helpful.
  </p>
  

	
		
	

`,d={book:n,chapter:t,chapterTitle:e,slug:"p23",title:o,headings:s,html:r,examples:c,original:i};export{n as book,t as chapter,e as chapterTitle,d as default,c as examples,s as headings,r as html,i as original,a as slug,o as title};
