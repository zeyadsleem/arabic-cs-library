const n="go-tour",t="moretypes",e="مزيد من الأنواع: البنى والشرائح والخرائط.",i="p19",o="الخرائط",a=[{depth:2,id:"lesson-title",text:"الخرائط"}],s=`
  <h2 id="lesson-title">الخرائط</h2>
  
  
  <p>
    تربط الخريطة المفاتيح بالقيم.
  </p>
  

  
  <p>
    القيمة الصفرية للخريطة هي <code>nil</code>.


    لا تحتوي خريطة <code>nil</code> على مفاتيح، ولا يمكن إضافة مفاتيح إليها.
  </p>
  

  
  <p>
    تُعيد الدالة <code>make</code> خريطة من النوع المعطى،


    مهيّأة وجاهزة للاستخدام.
  </p>
  

	
		
	

`,p=[{Name:"maps.go",Content:`package main

import "fmt"

type Vertex struct {
	Lat, Long float64
}

var m map[string]Vertex

func main() {
	m = make(map[string]Vertex)
	m["Bell Labs"] = Vertex{
		40.68433, -74.39967,
	}
	fmt.Println(m["Bell Labs"])
}
`}],c=`
  <h2>Maps</h2>
  
  
  <p>
    A map maps keys to values.
  </p>
  

  
  <p>
    The zero value of a map is <code>nil</code>.


    A <code>nil</code> map has no keys, nor can keys be added.
  </p>
  

  
  <p>
    The <code>make</code> function returns a map of the given type,


    initialized and ready for use.
  </p>
  

	
		
	

`,l={book:n,chapter:t,chapterTitle:e,slug:"p19",title:o,headings:a,html:s,examples:p,original:c};export{n as book,t as chapter,e as chapterTitle,l as default,p as examples,a as headings,s as html,c as original,i as slug,o as title};
