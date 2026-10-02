const n="go-tour",t="moretypes",e="مزيد من الأنواع: البنى والشرائح والخرائط.",s="p17",o="التكرار على النطاق، تتمّة",p=[{depth:2,id:"lesson-title",text:"التكرار على النطاق، تتمّة"}],r=`
  <h2 id="lesson-title">التكرار على النطاق، تتمّة</h2>
  
  
  <p>
    يمكنك تجاهل الفهرس أو القيمة بالإسناد إلى <code>_</code>.
  </p>
  

  
  <pre>for i, _ := range pow
for _, value := range pow</pre>
  

  
  <p>
    إذا كنت تريد الفهرس فقط، فيمكنك حذف المتغيّر الثاني.
  </p>
  

  
  <pre>for i := range pow</pre>
  

	
		
	

`,a=[{Name:"range-continued.go",Content:`package main

import "fmt"

func main() {
	pow := make([]int, 10)
	for i := range pow {
		pow[i] = 1 << uint(i) // == 2**i
	}
	for _, value := range pow {
		fmt.Printf("%d\\n", value)
	}
}
`}],i=`
  <h2>Range continued</h2>
  
  
  <p>
    You can skip the index or value by assigning to <code>_</code>.
  </p>
  

  
  <pre>for i, _ := range pow
for _, value := range pow</pre>
  

  
  <p>
    If you only want the index, you can omit the second variable.
  </p>
  

  
  <pre>for i := range pow</pre>
  

	
		
	

`,c={book:n,chapter:t,chapterTitle:e,slug:"p17",title:o,headings:p,html:r,examples:a,original:i};export{n as book,t as chapter,e as chapterTitle,c as default,a as examples,p as headings,r as html,i as original,s as slug,o as title};
