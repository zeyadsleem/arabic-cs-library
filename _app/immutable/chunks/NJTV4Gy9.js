const e="go-tour",n="methods",t="التوابع والواجهات",i="p16",o="التبديل حسب النوع",c=[{depth:2,id:"lesson-title",text:"التبديل حسب النوع"}],s=`
  <h2 id="lesson-title">التبديل حسب النوع</h2>
  
  
  <p>
    إن <i>التبديل حسب النوع</i> بنية تتيح إجراء عدة تأكيدات للنوع بالتتابع.
  </p>
  

  
  <p>
    يشبه التبديل حسب النوع تعليمة التبديل العادية، لكن الحالات في التبديل حسب النوع


    تحدّد أنواعًا (لا قيمًا)، وتُقارَن تلك القيم مع


    نوع القيمة التي تحتوي عليها قيمة الواجهة المعطاة.
  </p>
  

  
  <pre>switch v := i.(type) {
case T:
    // here v has type T
case S:
    // here v has type S
default:
    // no match; here v has the same type as i
}</pre>
  

  
  <p>
    للتصريح في التبديل حسب النوع الصيغة نفسها التي لتأكيد النوع <code>i.(T)</code>،


    لكن يُستبدَل النوع المحدّد <code>T</code> بالكلمة المحجوزة <code>type</code>.
  </p>
  

  
  <p>
    تختبر تعليمة التبديل هذه ما إذا كانت قيمة الواجهة <code>i</code>


    تحتوي على قيمة من النوع <code>T</code> أو <code>S</code>.


    في كلٍّ من الحالتين <code>T</code> و<code>S</code>، سيكون المتغيّر <code>v</code> من النوع


    <code>T</code> أو <code>S</code> على الترتيب، وسيحتوي على القيمة التي تحتوي عليها <code>i</code>.


    في الحالة الافتراضية (عندما لا يوجد تطابق)، يكون المتغيّر <code>v</code>


    من نوع الواجهة نفسه ويحمل القيمة نفسها التي تحملها <code>i</code>.
  </p>
  

	
		
	

`,a=[{Name:"type-switches.go",Content:`package main

import "fmt"

func do(i interface{}) {
	switch v := i.(type) {
	case int:
		fmt.Printf("Twice %v is %v\\n", v, v*2)
	case string:
		fmt.Printf("%q is %v bytes long\\n", v, len(v))
	default:
		fmt.Printf("I don't know about type %T!\\n", v)
	}
}

func main() {
	do(21)
	do("hello")
	do(true)
}
`}],d=`
  <h2>Type switches</h2>
  
  
  <p>
    A <i>type switch</i> is a construct that permits several type assertions in series.
  </p>
  

  
  <p>
    A type switch is like a regular switch statement, but the cases in a type


    switch specify types (not values), and those values are compared against


    the type of the value held by the given interface value.
  </p>
  

  
  <pre>switch v := i.(type) {
case T:
    // here v has type T
case S:
    // here v has type S
default:
    // no match; here v has the same type as i
}</pre>
  

  
  <p>
    The declaration in a type switch has the same syntax as a type assertion <code>i.(T)</code>,


    but the specific type <code>T</code> is replaced with the keyword <code>type</code>.
  </p>
  

  
  <p>
    This switch statement tests whether the interface value <code>i</code>


    holds a value of type <code>T</code> or <code>S</code>.


    In each of the <code>T</code> and <code>S</code> cases, the variable <code>v</code> will be of type


    <code>T</code> or <code>S</code> respectively and hold the value held by <code>i</code>.


    In the default case (where there is no match), the variable <code>v</code> is


    of the same interface type and value as <code>i</code>.
  </p>
  

	
		
	

`,h={book:e,chapter:n,chapterTitle:t,slug:"p16",title:o,headings:c,html:s,examples:a,original:d};export{e as book,n as chapter,t as chapterTitle,h as default,a as examples,c as headings,s as html,d as original,i as slug,o as title};
