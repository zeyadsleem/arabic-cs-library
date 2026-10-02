const n="go-tour",t="basics",s="الحزم والمتغيرات والدوال",r="p6",e="نتائج متعددة",o=[{depth:2,id:"lesson-title",text:"نتائج متعددة"}],c=`
  <h2 id="lesson-title">نتائج متعددة</h2>
  
  
  <p>
    يمكن للدالة إرجاع أي عدد من النتائج.
  </p>
  

  
  <p>
    تُرجع الدالة <code>swap</code> سلسلتين نصيتين.
  </p>
  

	
		
	

`,i=[{Name:"multiple-results.go",Content:`package main

import "fmt"

func swap(x, y string) (string, string) {
	return y, x
}

func main() {
	a, b := swap("hello", "world")
	fmt.Println(a, b)
}
`}],l=`
  <h2>Multiple results</h2>
  
  
  <p>
    A function can return any number of results.
  </p>
  

  
  <p>
    The <code>swap</code> function returns two strings.
  </p>
  

	
		
	

`,a={book:n,chapter:t,chapterTitle:s,slug:"p6",title:e,headings:o,html:c,examples:i,original:l};export{n as book,t as chapter,s as chapterTitle,a as default,i as examples,o as headings,c as html,l as original,r as slug,e as title};
