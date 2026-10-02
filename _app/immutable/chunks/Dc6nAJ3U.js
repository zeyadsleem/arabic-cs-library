const n="go-tour",e="generics",t="البرمجة العامة",o="index",s="معاملات الأنواع",a=[{depth:2,id:"lesson-title",text:"معاملات الأنواع"}],c=`
  <h2 id="lesson-title">معاملات الأنواع</h2>
  
  
  <p>
    يمكن كتابة دوال Go لتعمل على أنواع متعددة باستخدام معاملات الأنواع. وتظهر


    معاملات الأنواع الخاصة بالدالة بين قوسين مربعين، قبل


    وسائط الدالة.
  </p>
  

  
  <pre>func Index[T comparable](s []T, x T) int</pre>
  

  
  <p>
    يعني هذا التصريح أن <code>s</code> شريحة من أي نوع <code>T</code> يستوفي


    القيد المضمّن <code>comparable</code>. و<code>x</code> أيضًا قيمة من النوع نفسه.
  </p>
  

  
  <p>
    <code>comparable</code> قيد مفيد يتيح استخدام العاملين <code>==</code> و


    <code>!=</code> على قيم النوع. في هذا المثال، نستخدمه لمقارنة


    قيمة بجميع عناصر الشريحة حتى نجد تطابقًا. تعمل دالة <code>Index</code> هذه


    مع أي نوع يدعم المقارنة.
  </p>
  

	
		
	

`,i=[{Name:"index.go",Content:`package main

import "fmt"

// Index returns the index of x in s, or -1 if not found.
func Index[T comparable](s []T, x T) int {
	for i, v := range s {
		// v and x are type T, which has the comparable
		// constraint, so we can use == here.
		if v == x {
			return i
		}
	}
	return -1
}

func main() {
	// Index works on a slice of ints
	si := []int{10, 20, 15, -10}
	fmt.Println(Index(si, 15))

	// Index also works on a slice of strings
	ss := []string{"foo", "bar", "baz"}
	fmt.Println(Index(ss, "hello"))
}
`}],r=`
  <h2>Type parameters</h2>
  
  
  <p>
    Go functions can be written to work on multiple types using type parameters. The


    type parameters of a function appear between brackets, before the function&#39;s


    arguments.
  </p>
  

  
  <pre>func Index[T comparable](s []T, x T) int</pre>
  

  
  <p>
    This declaration means that <code>s</code> is a slice of any type <code>T</code> that fulfills the


    built-in constraint <code>comparable</code>. <code>x</code> is also a value of the same type.
  </p>
  

  
  <p>
    <code>comparable</code> is a useful constraint that makes it possible to use the <code>==</code> and


    <code>!=</code> operators on values of the type. In this example, we use it to compare a


    value to all slice elements until a match is found. This <code>Index</code> function works


    for any type that supports comparison.
  </p>
  

	
		
	

`,d={book:n,chapter:e,chapterTitle:t,slug:o,title:s,headings:a,html:c,examples:i,original:r};export{n as book,e as chapter,t as chapterTitle,d as default,i as examples,a as headings,c as html,r as original,o as slug,s as title};
