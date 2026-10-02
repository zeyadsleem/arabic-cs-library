const n="go-tour",t="methods",e="التوابع والواجهات",c="p10",i="تُنفَّذ الواجهات ضمنيًا",o=[{depth:2,id:"lesson-title",text:"تُنفَّذ الواجهات ضمنيًا"}],s=`
  <h2 id="lesson-title">تُنفَّذ الواجهات ضمنيًا</h2>
  
  
  <p>
    ينفّذ النوع واجهةً بتنفيذ توابعها.


    لا يوجد تصريح صريح بنيّة التنفيذ، ولا كلمة محجوزة بمعنى &#34;ينفّذ&#34;.
  </p>
  

  
  <p>
    تفصل الواجهات الضمنية تعريف الواجهة عن


    تنفيذها، مما يتيح وجود التنفيذ في أي حزمة دون ترتيب مسبق.
  </p>
  

	
		
	

`,a=[{Name:"interfaces-are-satisfied-implicitly.go",Content:`package main

import "fmt"

type I interface {
	M()
}

type T struct {
	S string
}

// This method means type T implements the interface I,
// but we don't need to explicitly declare that it does so.
func (t T) M() {
	fmt.Println(t.S)
}

func main() {
	var i I = T{"hello"}
	i.M()
}
`}],p=`
  <h2>Interfaces are implemented implicitly</h2>
  
  
  <p>
    A type implements an interface by implementing its methods.


    There is no explicit declaration of intent, no &#34;implements&#34; keyword.
  </p>
  

  
  <p>
    Implicit interfaces decouple the definition of an interface from its


    implementation, which could then appear in any package without prearrangement.
  </p>
  

	
		
	

`,l={book:n,chapter:t,chapterTitle:e,slug:"p10",title:i,headings:o,html:s,examples:a,original:p};export{n as book,t as chapter,e as chapterTitle,l as default,a as examples,o as headings,s as html,p as original,c as slug,i as title};
