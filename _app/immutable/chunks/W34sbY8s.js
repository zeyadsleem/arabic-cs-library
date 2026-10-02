const e="go-tour",n="methods",o="التوابع والواجهات",d="p24",t="الصور",a=[{depth:2,id:"lesson-title",text:"الصور"}],r=`
  <h2 id="lesson-title">الصور</h2>
  
  
  <p>
    <a href="https://go.dev/pkg/image/#Image" target="_blank" rel="noopener noreferrer">حزمة الصور</a> تعرّف واجهة <code>Image</code>:
  </p>
  

  
  <pre>package image

type Image interface {
    ColorModel() color.Model
    Bounds() Rectangle
    At(x, y int) color.Color
}</pre>
  

  
  <p>
    <b>ملاحظة</b>: القيمة المُرجَعة <code>Rectangle</code> من التابع <code>Bounds</code> هي في الواقع من النوع


    <a href="https://go.dev/pkg/image/#Rectangle" target="_blank" rel="noopener noreferrer"><code>image.Rectangle</code></a>، لأن


    التصريح موجود داخل حزمة <code>image</code>.
  </p>
  

  
  <p>
    (راجع <a href="https://go.dev/pkg/image/#Image" target="_blank" rel="noopener noreferrer">التوثيق</a> للاطّلاع على جميع التفاصيل.)
  </p>
  

  
  <p>
    النوعان <code>color.Color</code> و<code>color.Model</code> هما أيضًا واجهتان، لكننا سنتجاهل ذلك باستخدام التنفيذين المعرّفين مسبقًا <code>color.RGBA</code> و<code>color.RGBAModel</code>. تحدّد <a href="https://go.dev/pkg/image/color/" target="_blank" rel="noopener noreferrer">حزمة ألوان الصور</a> هذه الواجهات والأنواع.
  </p>
  

	
		
	

`,c=[{Name:"images.go",Content:`package main

import (
	"fmt"
	"image"
)

func main() {
	m := image.NewRGBA(image.Rect(0, 0, 100, 100))
	fmt.Println(m.Bounds())
	fmt.Println(m.At(0, 0).RGBA())
}
`}],l=`
  <h2>Images</h2>
  
  
  <p>
    <a href="https://go.dev/pkg/image/#Image" target="_blank" rel="noopener noreferrer">Package image</a> defines the <code>Image</code> interface:
  </p>
  

  
  <pre>package image

type Image interface {
    ColorModel() color.Model
    Bounds() Rectangle
    At(x, y int) color.Color
}</pre>
  

  
  <p>
    <b>Note</b>: the <code>Rectangle</code> return value of the <code>Bounds</code> method is actually an


    <a href="https://go.dev/pkg/image/#Rectangle" target="_blank" rel="noopener noreferrer"><code>image.Rectangle</code></a>, as the


    declaration is inside package <code>image</code>.
  </p>
  

  
  <p>
    (See <a href="https://go.dev/pkg/image/#Image" target="_blank" rel="noopener noreferrer">the documentation</a> for all the details.)
  </p>
  

  
  <p>
    The <code>color.Color</code> and <code>color.Model</code> types are also interfaces, but we&#39;ll ignore that by using the predefined implementations <code>color.RGBA</code> and <code>color.RGBAModel</code>. These interfaces and types are specified by the <a href="https://go.dev/pkg/image/color/" target="_blank" rel="noopener noreferrer">image/color package</a>.
  </p>
  

	
		
	

`,g={book:e,chapter:n,chapterTitle:o,slug:"p24",title:t,headings:a,html:r,examples:c,original:l};export{e as book,n as chapter,o as chapterTitle,g as default,c as examples,a as headings,r as html,l as original,d as slug,t as title};
