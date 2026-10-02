const n="go-tour",t="generics",e="البرمجة العامة",l="p2",s="الأنواع العامة",i=[{depth:2,id:"lesson-title",text:"الأنواع العامة"}],o=`
  <h2 id="lesson-title">الأنواع العامة</h2>
  
  
  <p>
    إلى جانب الدوال العامة، تدعم Go أيضًا الأنواع العامة. يمكن


    جعل النوع ذا معامل نوع، وهو ما قد يفيد في تنفيذ


    بُنى بيانات عامة.
  </p>
  

  
  <p>
    يوضّح هذا المثال تصريحًا بسيطًا عن نوع لقائمة مرتبطة أحادية


    تحتفظ بقيم من أي نوع.
  </p>
  

  
  <p>
    كتمرين، أضف بعض الوظائف إلى هذا التنفيذ للقائمة.
  </p>
  

	
		
	

`,a=[{Name:"list.go",Content:`package main

// List represents a singly-linked list that holds
// values of any type.
type List[T any] struct {
	next *List[T]
	val  T
}

func main() {
}
`}],p=`
  <h2>Generic types</h2>
  
  
  <p>
    In addition to generic functions, Go also supports generic types. A type can


    be parameterized with a type parameter, which could be useful for implementing


    generic data structures.
  </p>
  

  
  <p>
    This example demonstrates a simple type declaration for a singly-linked list


    holding any type of value.
  </p>
  

  
  <p>
    As an exercise, add some functionality to this list implementation.
  </p>
  

	
		
	

`,c={book:n,chapter:t,chapterTitle:e,slug:"p2",title:s,headings:i,html:o,examples:a,original:p};export{n as book,t as chapter,e as chapterTitle,c as default,a as examples,i as headings,o as html,p as original,l as slug,s as title};
