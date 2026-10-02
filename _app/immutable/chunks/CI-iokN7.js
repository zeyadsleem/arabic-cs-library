const n="go-tour",t="moretypes",e="مزيد من الأنواع: البنى والشرائح والخرائط.",i="p4",o="مؤشرات إلى البنى",c=[{depth:2,id:"lesson-title",text:"مؤشرات إلى البنى"}],s=`
  <h2 id="lesson-title">مؤشرات إلى البنى</h2>
  
  
  <p>
    يمكن الوصول إلى حقول البنية من خلال مؤشر إلى البنية.
  </p>
  

  
  <p>
    للوصول إلى الحقل <code>X</code> في بنية عندما يكون لدينا مؤشر إلى البنية <code>p</code>، يمكننا


    كتابة <code>(*p).X</code>.


    لكن هذه الصياغة مرهقة، لذا تسمح لنا اللغة بدلًا من ذلك بأن


    نكتب <code>p.X</code> فقط، دون فكّ الإشارة صراحةً.
  </p>
  

	
		
	

`,p=[{Name:"struct-pointers.go",Content:`package main

import "fmt"

type Vertex struct {
	X int
	Y int
}

func main() {
	v := Vertex{1, 2}
	p := &v
	p.X = 1e9
	fmt.Println(v)
}
`}],r=`
  <h2>Pointers to structs</h2>
  
  
  <p>
    Struct fields can be accessed through a struct pointer.
  </p>
  

  
  <p>
    To access the field <code>X</code> of a struct when we have the struct pointer <code>p</code> we could


    write <code>(*p).X</code>.


    However, that notation is cumbersome, so the language permits us instead to


    write just <code>p.X</code>, without the explicit dereference.
  </p>
  

	
		
	

`,d={book:n,chapter:t,chapterTitle:e,slug:"p4",title:o,headings:c,html:s,examples:p,original:r};export{n as book,t as chapter,e as chapterTitle,d as default,p as examples,c as headings,s as html,r as original,i as slug,o as title};
