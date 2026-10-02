const n="go-tour",e="basics",t="الحزم والمتغيرات والدوال",s="p14",o="استنتاج النوع",i=[{depth:2,id:"lesson-title",text:"استنتاج النوع"}],c=`
  <h2 id="lesson-title">استنتاج النوع</h2>
  
  
  <p>
    عند التصريح بمتغير دون تحديد نوع صريح (سواء باستخدام صيغة <code>:=</code> أو صيغة التعبير <code>var =</code>)، يُستنتج نوع المتغير من القيمة على الجانب الأيمن.
  </p>
  

  
  <p>
    عندما يكون للجانب الأيمن من التصريح نوع محدد، يكون المتغير الجديد من النوع نفسه:
  </p>
  

  
  <pre>var i int
j := i // j is an int</pre>
  

  
  <p>
    لكن عندما يحتوي الجانب الأيمن على ثابت عددي غير محدد النوع، فقد يكون المتغير الجديد من النوع <code>int</code> أو <code>float64</code> أو <code>complex128</code> بحسب دقة الثابت:
  </p>
  

  
  <pre>i := 42           // int
f := 3.142        // float64
g := 0.867 &#43; 0.5i // complex128</pre>
  

  
  <p>
    جرّب تغيير القيمة الابتدائية للمتغير <code>v</code> في شيفرة المثال ولاحظ كيف يتأثر نوعه.
  </p>
  

	
		
	

`,a=[{Name:"type-inference.go",Content:`package main

import "fmt"

func main() {
	v := 42 // change me!
	fmt.Printf("v is of type %T\\n", v)
}
`}],p=`
  <h2>Type inference</h2>
  
  
  <p>
    When declaring a variable without specifying an explicit type (either by using the <code>:=</code> syntax or <code>var =</code> expression syntax), the variable&#39;s type is inferred from the value on the right hand side.
  </p>
  

  
  <p>
    When the right hand side of the declaration is typed, the new variable is of that same type:
  </p>
  

  
  <pre>var i int
j := i // j is an int</pre>
  

  
  <p>
    But when the right hand side contains an untyped numeric constant, the new variable may be an <code>int</code>, <code>float64</code>, or <code>complex128</code> depending on the precision of the constant:
  </p>
  

  
  <pre>i := 42           // int
f := 3.142        // float64
g := 0.867 &#43; 0.5i // complex128</pre>
  

  
  <p>
    Try changing the initial value of <code>v</code> in the example code and observe how its type is affected.
  </p>
  

	
		
	

`,d={book:n,chapter:e,chapterTitle:t,slug:"p14",title:o,headings:i,html:c,examples:a,original:p};export{n as book,e as chapter,t as chapterTitle,d as default,a as examples,i as headings,c as html,p as original,s as slug,o as title};
