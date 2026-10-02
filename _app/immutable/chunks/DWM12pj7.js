const n="go-tour",t="methods",e="التوابع والواجهات",c="p12",i="قيم الواجهات ذات القيم الكامنة المعدومة",l=[{depth:2,id:"lesson-title",text:"قيم الواجهات ذات القيم الكامنة المعدومة"}],o=`
  <h2 id="lesson-title">قيم الواجهات ذات القيم الكامنة المعدومة</h2>
  
  
  <p>
    إذا كانت القيمة الفعلية داخل الواجهة نفسها معدومة،


    فسيُستدعى التابع بمستقبِل معدوم.
  </p>
  

  
  <p>
    يؤدي هذا في بعض اللغات إلى استثناء مؤشر معدوم،


    لكن من الشائع في غو كتابة توابع تتعامل بسلاسة مع استدعائها


    بمستقبِل معدوم (كما في التابع <code>M</code> في هذا المثال.)
  </p>
  

  
  <p>
    لاحظ أن قيمة الواجهة التي تحتوي على قيمة فعلية معدومة ليست هي نفسها معدومة.
  </p>
  

	
		
	

`,s=[{Name:"interface-values-with-nil.go",Content:`package main

import "fmt"

type I interface {
	M()
}

type T struct {
	S string
}

func (t *T) M() {
	if t == nil {
		fmt.Println("<nil>")
		return
	}
	fmt.Println(t.S)
}

func main() {
	var i I

	var t *T
	i = t
	describe(i)
	i.M()

	i = &T{"hello"}
	describe(i)
	i.M()
}

func describe(i I) {
	fmt.Printf("(%v, %T)\\n", i, i)
}
`}],a=`
  <h2>Interface values with nil underlying values</h2>
  
  
  <p>
    If the concrete value inside the interface itself is nil,


    the method will be called with a nil receiver.
  </p>
  

  
  <p>
    In some languages this would trigger a null pointer exception,


    but in Go it is common to write methods that gracefully handle being called


    with a nil receiver (as with the method <code>M</code> in this example.)
  </p>
  

  
  <p>
    Note that an interface value that holds a nil concrete value is itself non-nil.
  </p>
  

	
		
	

`,r={book:n,chapter:t,chapterTitle:e,slug:"p12",title:i,headings:l,html:o,examples:s,original:a};export{n as book,t as chapter,e as chapterTitle,r as default,s as examples,l as headings,o as html,a as original,c as slug,i as title};
