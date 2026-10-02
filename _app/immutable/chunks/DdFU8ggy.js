const n="go-tour",t="moretypes",e="مزيد من الأنواع: البنى والشرائح والخرائط.",p="p5",s="القيم الحرفية للبنى",o=[{depth:2,id:"lesson-title",text:"القيم الحرفية للبنى"}],a=`
  <h2 id="lesson-title">القيم الحرفية للبنى</h2>
  
  
  <p>
    تدلّ القيمة الحرفية للبنية على قيمة بنية خُصّصت لها ذاكرة حديثًا، وذلك بسرد قيم حقولها.
  </p>
  

  
  <p>
    يمكنك سرد مجموعة جزئية فقط من الحقول باستخدام الصياغة <code>Name:</code>. (ولا يهمّ ترتيب الحقول المسمّاة.)
  </p>
  

  
  <p>
    تُعيد البادئة الخاصة <code>&amp;</code> مؤشرًا إلى قيمة البنية.
  </p>
  

	
		
	

`,r=[{Name:"struct-literals.go",Content:`package main

import "fmt"

type Vertex struct {
	X, Y int
}

var (
	v1 = Vertex{1, 2}  // has type Vertex
	v2 = Vertex{X: 1}  // Y:0 is implicit
	v3 = Vertex{}      // X:0 and Y:0
	p  = &Vertex{1, 2} // has type *Vertex
)

func main() {
	fmt.Println(v1, p, v2, v3)
}
`}],i=`
  <h2>Struct Literals</h2>
  
  
  <p>
    A struct literal denotes a newly allocated struct value by listing the values of its fields.
  </p>
  

  
  <p>
    You can list just a subset of fields by using the <code>Name:</code> syntax. (And the order of named fields is irrelevant.)
  </p>
  

  
  <p>
    The special prefix <code>&amp;</code> returns a pointer to the struct value.
  </p>
  

	
		
	

`,c={book:n,chapter:t,chapterTitle:e,slug:"p5",title:s,headings:o,html:a,examples:r,original:i};export{n as book,t as chapter,e as chapterTitle,c as default,r as examples,o as headings,a as html,i as original,p as slug,s as title};
