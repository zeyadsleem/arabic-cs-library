const n="go-tour",e="moretypes",t="مزيد من الأنواع: البنى والشرائح والخرائط.",r="p13",a="إنشاء شريحة باستخدام make",c=[{depth:2,id:"lesson-title",text:"إنشاء شريحة باستخدام make"}],i=`
  <h2 id="lesson-title">إنشاء شريحة باستخدام make</h2>
  
  
  <p>
    يمكن إنشاء الشرائح باستخدام الدالة المدمجة <code>make</code>؛


    وهذه هي طريقة إنشاء مصفوفات ذات حجم ديناميكي.
  </p>
  

  
  <p>
    تخصّص الدالة <code>make</code> ذاكرة لمصفوفة مهيّأة بقيم صفرية


    وتُعيد شريحة تشير إلى تلك المصفوفة:
  </p>
  

  
  <pre>a := make([]int, 5)  // len(a)=5</pre>
  

  
  <p>
    لتحديد السعة، مرّر وسيطًا ثالثًا إلى <code>make</code>:
  </p>
  

  
  <pre>b := make([]int, 0, 5) // len(b)=0, cap(b)=5

b = b[:cap(b)] // len(b)=5, cap(b)=5
b = b[1:]      // len(b)=4, cap(b)=4</pre>
  

	
		
	

`,p=[{Name:"making-slices.go",Content:`package main

import "fmt"

func main() {
	a := make([]int, 5)
	printSlice("a", a)

	b := make([]int, 0, 5)
	printSlice("b", b)

	c := b[:2]
	printSlice("c", c)

	d := c[2:5]
	printSlice("d", d)
}

func printSlice(s string, x []int) {
	fmt.Printf("%s len=%d cap=%d %v\\n",
		s, len(x), cap(x), x)
}
`}],o=`
  <h2>Creating a slice with make</h2>
  
  
  <p>
    Slices can be created with the built-in <code>make</code> function;


    this is how you create dynamically-sized arrays.
  </p>
  

  
  <p>
    The <code>make</code> function allocates a zeroed array


    and returns a slice that refers to that array:
  </p>
  

  
  <pre>a := make([]int, 5)  // len(a)=5</pre>
  

  
  <p>
    To specify a capacity, pass a third argument to <code>make</code>:
  </p>
  

  
  <pre>b := make([]int, 0, 5) // len(b)=0, cap(b)=5

b = b[:cap(b)] // len(b)=5, cap(b)=5
b = b[1:]      // len(b)=4, cap(b)=4</pre>
  

	
		
	

`,s={book:n,chapter:e,chapterTitle:t,slug:"p13",title:a,headings:c,html:i,examples:p,original:o};export{n as book,e as chapter,t as chapterTitle,s as default,p as examples,c as headings,i as html,o as original,r as slug,a as title};
