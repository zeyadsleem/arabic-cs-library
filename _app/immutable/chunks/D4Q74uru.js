const n="go-tour",t="basics",e="الحزم والمتغيرات والدوال",c="p12",i="القيم الصفرية",o=[{depth:2,id:"lesson-title",text:"القيم الصفرية"}],l=`
  <h2 id="lesson-title">القيم الصفرية</h2>
  
  
  <p>
    تُمنح المتغيرات المصرّح بها دون قيمة ابتدائية صريحة


    <i>قيمتها الصفرية</i>.
  </p>
  

  
  <p>
    القيمة الصفرية هي:
  </p>
  

  <ul>
  
    <li><code>0</code> للأنواع العددية،</li>
  
    <li><code>false</code> للنوع المنطقي، و</li>
  
    <li><code>&#34;&#34;</code> (السلسلة النصية الفارغة) للسلاسل النصية.</li>
  
  </ul>

	
		
	

`,s=[{Name:"zero.go",Content:`package main

import "fmt"

func main() {
	var i int
	var f float64
	var b bool
	var s string
	fmt.Printf("%v %v %v %q\\n", i, f, b, s)
}
`}],a=`
  <h2>Zero values</h2>
  
  
  <p>
    Variables declared without an explicit initial value are given their


    <i>zero value</i>.
  </p>
  

  
  <p>
    The zero value is:
  </p>
  

  <ul>
  
    <li><code>0</code> for numeric types,</li>
  
    <li><code>false</code> for the boolean type, and</li>
  
    <li><code>&#34;&#34;</code> (the empty string) for strings.</li>
  
  </ul>

	
		
	

`,r={book:n,chapter:t,chapterTitle:e,slug:"p12",title:i,headings:o,html:l,examples:s,original:a};export{n as book,t as chapter,e as chapterTitle,r as default,s as examples,o as headings,l as html,a as original,c as slug,i as title};
