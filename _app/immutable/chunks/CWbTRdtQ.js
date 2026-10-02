const n="go-tour",t="moretypes",e="مزيد من الأنواع: البنى والشرائح والخرائط.",i="p10",s="القيم الافتراضية للشرائح",o=[{depth:2,id:"lesson-title",text:"القيم الافتراضية للشرائح"}],a=`
  <h2 id="lesson-title">القيم الافتراضية للشرائح</h2>
  
  
  <p>
    عند إنشاء شريحة، يمكنك حذف الحدّ الأعلى أو الأدنى لاستخدام قيمتهما الافتراضية بدلًا منهما.
  </p>
  

  
  <p>
    القيمة الافتراضية للحدّ الأدنى هي صفر، وللحدّ الأعلى هي طول الشريحة أو المصفوفة التي تستند إليها.
  </p>
  

  
  <p>
    بالنسبة إلى المصفوفة
  </p>
  

  
  <pre>var a [10]int</pre>
  

  
  <p>
    فإن تعبيرات الشرائح هذه متكافئة:
  </p>
  

  
  <pre>a[0:10]
a[:10]
a[0:]
a[:]</pre>
  

	
		
	

`,r=[{Name:"slice-bounds.go",Content:`package main

import "fmt"

func main() {
	s := []int{2, 3, 5, 7, 11, 13}

	s = s[1:4]
	fmt.Println(s)

	s = s[:2]
	fmt.Println(s)

	s = s[1:]
	fmt.Println(s)
}
`}],p=`
  <h2>Slice defaults</h2>
  
  
  <p>
    When slicing, you may omit the high or low bounds to use their defaults instead.
  </p>
  

  
  <p>
    The default is zero for the low bound and the length of the underlying slice or array for the high bound.
  </p>
  

  
  <p>
    For the array
  </p>
  

  
  <pre>var a [10]int</pre>
  

  
  <p>
    these slice expressions are equivalent:
  </p>
  

  
  <pre>a[0:10]
a[:10]
a[0:]
a[:]</pre>
  

	
		
	

`,l={book:n,chapter:t,chapterTitle:e,slug:"p10",title:s,headings:o,html:a,examples:r,original:p};export{n as book,t as chapter,e as chapterTitle,l as default,r as examples,o as headings,a as html,p as original,i as slug,s as title};
