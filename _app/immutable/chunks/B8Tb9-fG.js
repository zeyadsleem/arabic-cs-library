const n="go-tour",t="moretypes",e="مزيد من الأنواع: البنى والشرائح والخرائط.",a="p25",o="إغلاقات الدوال",s=[{depth:2,id:"lesson-title",text:"إغلاقات الدوال"}],c=`
  <h2 id="lesson-title">إغلاقات الدوال</h2>
  
  
  <p>
    قد تكون دوال Go إغلاقات. الإغلاق هو قيمة دالة تشير إلى متغيّرات من خارج جسمها. يمكن للدالة الوصول إلى المتغيّرات المشار إليها والإسناد إليها؛ وبهذا المعنى تكون الدالة &#34;مرتبطة&#34; بالمتغيّرات.
  </p>
  

  
  <p>
    على سبيل المثال، تُعيد الدالة <code>adder</code> إغلاقًا. يرتبط كل إغلاق بمتغيّر <code>sum</code> الخاص به.
  </p>
  

	
		
	

`,i=[{Name:"function-closures.go",Content:`package main

import "fmt"

func adder() func(int) int {
	sum := 0
	return func(x int) int {
		sum += x
		return sum
	}
}

func main() {
	pos, neg := adder(), adder()
	for i := 0; i < 10; i++ {
		fmt.Println(
			pos(i),
			neg(-2*i),
		)
	}
}
`}],r=`
  <h2>Function closures</h2>
  
  
  <p>
    Go functions may be closures. A closure is a function value that references variables from outside its body. The function may access and assign to the referenced variables; in this sense the function is &#34;bound&#34; to the variables.
  </p>
  

  
  <p>
    For example, the <code>adder</code> function returns a closure. Each closure is bound to its own <code>sum</code> variable.
  </p>
  

	
		
	

`,u={book:n,chapter:t,chapterTitle:e,slug:"p25",title:o,headings:s,html:c,examples:i,original:r};export{n as book,t as chapter,e as chapterTitle,u as default,i as examples,s as headings,c as html,r as original,a as slug,o as title};
