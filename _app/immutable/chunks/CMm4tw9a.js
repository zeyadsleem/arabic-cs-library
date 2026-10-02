const n="go-tour",t="moretypes",e="مزيد من الأنواع: البنى والشرائح والخرائط.",i="p16",o="التكرار على النطاق",a=[{depth:2,id:"lesson-title",text:"التكرار على النطاق"}],r=`
  <h2 id="lesson-title">التكرار على النطاق</h2>
  
  
  <p>
    تمرّ صيغة <code>range</code> من حلقة <code>for</code> على عناصر شريحة أو خريطة.
  </p>
  

  
  <p>
    عند التكرار على نطاق شريحة، تُعاد قيمتان في كل تكرار.


    الأولى هي الفهرس، والثانية نسخة من العنصر الموجود عند ذلك الفهرس.
  </p>
  

	
		
	

`,s=[{Name:"range.go",Content:`package main

import "fmt"

var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
	for i, v := range pow {
		fmt.Printf("2**%d = %d\\n", i, v)
	}
}
`}],c=`
  <h2>Range</h2>
  
  
  <p>
    The <code>range</code> form of the <code>for</code> loop iterates over a slice or map.
  </p>
  

  
  <p>
    When ranging over a slice, two values are returned for each iteration.


    The first is the index, and the second is a copy of the element at that index.
  </p>
  

	
		
	

`,p={book:n,chapter:t,chapterTitle:e,slug:"p16",title:o,headings:a,html:r,examples:s,original:c};export{n as book,t as chapter,e as chapterTitle,p as default,s as examples,a as headings,r as html,c as original,i as slug,o as title};
