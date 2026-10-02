const n="go-tour",e="moretypes",t="مزيد من الأنواع: البنى والشرائح والخرائط.",o="index",p="المؤشرات",i=[{depth:2,id:"lesson-title",text:"المؤشرات"}],r=`
  <h2 id="lesson-title">المؤشرات</h2>
  
  
  <p>
    تحتوي Go على مؤشرات.


    يحتفظ المؤشر بعنوان قيمة في الذاكرة.
  </p>
  

  
  <p>
    النوع <code>*T</code> هو مؤشر إلى قيمة من النوع <code>T</code>. قيمته الصفرية هي <code>nil</code>.
  </p>
  

  
  <pre>var p *int</pre>
  

  
  <p>
    يولّد العامل <code>&amp;</code> مؤشرًا إلى المعامل الذي يعمل عليه.
  </p>
  

  
  <pre>i := 42
p = &amp;i</pre>
  

  
  <p>
    يدلّ العامل <code>*</code> على القيمة التي يشير إليها المؤشر.
  </p>
  

  
  <pre>fmt.Println(*p) // read i through the pointer p
*p = 21         // set i through the pointer p</pre>
  

  
  <p>
    يُعرف هذا باسم &#34;فكّ الإشارة&#34; أو &#34;الوصول غير المباشر&#34;.
  </p>
  

  
  <p>
    بخلاف C، لا تحتوي Go على عمليات حسابية على المؤشرات.
  </p>
  

	
		
	

`,s=[{Name:"pointers.go",Content:`package main

import "fmt"

func main() {
	i, j := 42, 2701

	p := &i         // point to i
	fmt.Println(*p) // read i through the pointer
	*p = 21         // set i through the pointer
	fmt.Println(i)  // see the new value of i

	p = &j         // point to j
	*p = *p / 37   // divide j through the pointer
	fmt.Println(j) // see the new value of j
}
`}],h=`
  <h2>Pointers</h2>
  
  
  <p>
    Go has pointers.


    A pointer holds the memory address of a value.
  </p>
  

  
  <p>
    The type <code>*T</code> is a pointer to a <code>T</code> value. Its zero value is <code>nil</code>.
  </p>
  

  
  <pre>var p *int</pre>
  

  
  <p>
    The <code>&amp;</code> operator generates a pointer to its operand.
  </p>
  

  
  <pre>i := 42
p = &amp;i</pre>
  

  
  <p>
    The <code>*</code> operator denotes the pointer&#39;s underlying value.
  </p>
  

  
  <pre>fmt.Println(*p) // read i through the pointer p
*p = 21         // set i through the pointer p</pre>
  

  
  <p>
    This is known as &#34;dereferencing&#34; or &#34;indirecting&#34;.
  </p>
  

  
  <p>
    Unlike C, Go has no pointer arithmetic.
  </p>
  

	
		
	

`,a={book:n,chapter:e,chapterTitle:t,slug:o,title:p,headings:i,html:r,examples:s,original:h};export{n as book,e as chapter,t as chapterTitle,a as default,s as examples,i as headings,r as html,h as original,o as slug,p as title};
