const n="go-tour",e="methods",t="التوابع والواجهات",p="p17",r="أنواع التمثيل النصي",o=[{depth:2,id:"lesson-title",text:"أنواع التمثيل النصي"}],a=`
  <h2 id="lesson-title">أنواع التمثيل النصي</h2>
  
  
  <p>
    من أكثر الواجهات انتشارًا واجهة <a href="https://go.dev/pkg/fmt/#Stringer" target="_blank" rel="noopener noreferrer"><code>Stringer</code></a> التي تعرّفها حزمة <a href="https://go.dev/pkg/fmt/" target="_blank" rel="noopener noreferrer"><code>fmt</code></a>.
  </p>
  

  
  <pre>type Stringer interface {
    String() string
}</pre>
  

  
  <p>
    النوع الذي ينفّذ <code>Stringer</code> هو نوع يمكنه وصف نفسه بسلسلة نصية. تبحث حزمة <code>fmt</code>


    (وحزم كثيرة غيرها) عن هذه الواجهة لطباعة القيم.
  </p>
  

	
		
	

`,s=[{Name:"stringer.go",Content:`package main

import "fmt"

type Person struct {
	Name string
	Age  int
}

func (p Person) String() string {
	return fmt.Sprintf("%v (%v years)", p.Name, p.Age)
}

func main() {
	a := Person{"Arthur Dent", 42}
	z := Person{"Zaphod Beeblebrox", 9001}
	fmt.Println(a, z)
}
`}],i=`
  <h2>Stringers</h2>
  
  
  <p>
    One of the most ubiquitous interfaces is <a href="https://go.dev/pkg/fmt/#Stringer" target="_blank" rel="noopener noreferrer"><code>Stringer</code></a> defined by the <a href="https://go.dev/pkg/fmt/" target="_blank" rel="noopener noreferrer"><code>fmt</code></a> package.
  </p>
  

  
  <pre>type Stringer interface {
    String() string
}</pre>
  

  
  <p>
    A <code>Stringer</code> is a type that can describe itself as a string. The <code>fmt</code> package


    (and many others) look for this interface to print values.
  </p>
  

	
		
	

`,g={book:n,chapter:e,chapterTitle:t,slug:"p17",title:r,headings:o,html:a,examples:s,original:i};export{n as book,e as chapter,t as chapterTitle,g as default,s as examples,o as headings,a as html,i as original,p as slug,r as title};
