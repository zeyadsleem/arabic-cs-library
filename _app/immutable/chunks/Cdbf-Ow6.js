const n="go-tour",t="methods",e="التوابع والواجهات",p="p11",a="قيم الواجهات",i=[{depth:2,id:"lesson-title",text:"قيم الواجهات"}],o=`
  <h2 id="lesson-title">قيم الواجهات</h2>
  
  
  <p>
    داخليًا، يمكن تصوّر قيم الواجهات بوصفها زوجًا يتكوّن من قيمة و


    نوع فعلي:
  </p>
  

  
  <pre>(value, type)</pre>
  

  
  <p>
    تحتوي قيمة الواجهة على قيمة من نوع فعلي محدّد كامن فيها.
  </p>
  

  
  <p>
    يؤدي استدعاء تابع على قيمة واجهة إلى تنفيذ التابع الذي يحمل الاسم نفسه على


    نوعها الكامن.
  </p>
  

	
		
	

`,c=[{Name:"interface-values.go",Content:`package main

import (
	"fmt"
	"math"
)

type I interface {
	M()
}

type T struct {
	S string
}

func (t *T) M() {
	fmt.Println(t.S)
}

type F float64

func (f F) M() {
	fmt.Println(f)
}

func main() {
	var i I

	i = &T{"Hello"}
	describe(i)
	i.M()

	i = F(math.Pi)
	describe(i)
	i.M()
}

func describe(i I) {
	fmt.Printf("(%v, %T)\\n", i, i)
}
`}],s=`
  <h2>Interface values</h2>
  
  
  <p>
    Under the hood, interface values can be thought of as a tuple of a value and a


    concrete type:
  </p>
  

  
  <pre>(value, type)</pre>
  

  
  <p>
    An interface value holds a value of a specific underlying concrete type.
  </p>
  

  
  <p>
    Calling a method on an interface value executes the method of the same name on


    its underlying type.
  </p>
  

	
		
	

`,l={book:n,chapter:t,chapterTitle:e,slug:"p11",title:a,headings:i,html:o,examples:c,original:s};export{n as book,t as chapter,e as chapterTitle,l as default,c as examples,i as headings,o as html,s as original,p as slug,a as title};
