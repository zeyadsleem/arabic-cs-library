const n="go-tour",t="basics",o="الحزم والمتغيرات والدوال",r="p15",e="الثوابت",s=[{depth:2,id:"lesson-title",text:"الثوابت"}],c=`
  <h2 id="lesson-title">الثوابت</h2>
  
  
  <p>
    يُصرّح بالثوابت كما يُصرّح بالمتغيرات، لكن باستخدام الكلمة المحجوزة <code>const</code>.
  </p>
  

  
  <p>
    يمكن أن تكون الثوابت قيمًا لمحارف أو سلاسل نصية أو قيمًا منطقية أو عددية.
  </p>
  

  
  <p>
    لا يمكن التصريح بالثوابت باستخدام صيغة <code>:=</code>.
  </p>
  

	
		
	

`,a=[{Name:"constants.go",Content:`package main

import "fmt"

const Pi = 3.14

func main() {
	const World = "世界"
	fmt.Println("Hello", World)
	fmt.Println("Happy", Pi, "Day")

	const Truth = true
	fmt.Println("Go rules?", Truth)
}
`}],l=`
  <h2>Constants</h2>
  
  
  <p>
    Constants are declared like variables, but with the <code>const</code> keyword.
  </p>
  

  
  <p>
    Constants can be character, string, boolean, or numeric values.
  </p>
  

  
  <p>
    Constants cannot be declared using the <code>:=</code> syntax.
  </p>
  

	
		
	

`,i={book:n,chapter:t,chapterTitle:o,slug:"p15",title:e,headings:s,html:c,examples:a,original:l};export{n as book,t as chapter,o as chapterTitle,i as default,a as examples,s as headings,c as html,l as original,r as slug,e as title};
