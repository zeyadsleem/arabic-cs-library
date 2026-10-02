const e="go-tour",n="methods",o="التوابع والواجهات",i="p25",t="تمرين: الصور",c=[{depth:2,id:"lesson-title",text:"تمرين: الصور"}],a=`
  <h2 id="lesson-title">تمرين: الصور</h2>
  
  
  <p>
    أتتذكّر <a href="/arabic-cs-library/book/go-tour/moretypes/p18/">مولّد الصور</a> الذي كتبته سابقًا؟ لنكتب واحدًا آخر، لكنه سيُرجع هذه المرة تنفيذًا للواجهة <code>image.Image</code> بدلًا من شريحة بيانات.
  </p>
  

  
  <p>
    عرّف نوع <code>Image</code> خاصًا بك، ونفّذ <a href="https://go.dev/pkg/image/#Image" target="_blank" rel="noopener noreferrer">التوابع اللازمة</a>، واستدعِ <code>pic.ShowImage</code>.
  </p>
  

  
  <p>
    <code>Bounds</code> ينبغي أن يُرجع قيمة من النوع <code>image.Rectangle</code>، مثل <code>image.Rect(0, 0, w, h)</code>.
  </p>
  

  
  <p>
    <code>ColorModel</code> ينبغي أن يُرجع القيمة <code>color.RGBAModel</code>.
  </p>
  

  
  <p>
    <code>At</code> ينبغي أن يُرجع لونًا؛ تقابل القيمة <code>v</code> في مولّد الصور السابق القيمة <code>color.RGBA{v, v, 255, 255}</code> في هذا المولّد.
  </p>
  

	
		
	

`,r=[{Name:"exercise-images.go",Content:`package main

import "golang.org/x/tour/pic"

type Image struct{}

func main() {
	m := Image{}
	pic.ShowImage(m)
}
`}],d=`
  <h2>Exercise: Images</h2>
  
  
  <p>
    Remember the <a href="/arabic-cs-library/book/go-tour/moretypes/p18/">picture generator</a> you wrote earlier? Let&#39;s write another one, but this time it will return an implementation of <code>image.Image</code> instead of a slice of data.
  </p>
  

  
  <p>
    Define your own <code>Image</code> type, implement <a href="https://go.dev/pkg/image/#Image" target="_blank" rel="noopener noreferrer">the necessary methods</a>, and call <code>pic.ShowImage</code>.
  </p>
  

  
  <p>
    <code>Bounds</code> should return a <code>image.Rectangle</code>, like <code>image.Rect(0, 0, w, h)</code>.
  </p>
  

  
  <p>
    <code>ColorModel</code> should return <code>color.RGBAModel</code>.
  </p>
  

  
  <p>
    <code>At</code> should return a color; the value <code>v</code> in the last picture generator corresponds to <code>color.RGBA{v, v, 255, 255}</code> in this one.
  </p>
  

	
		
	

`,p={book:e,chapter:n,chapterTitle:o,slug:"p25",title:t,headings:c,html:a,examples:r,original:d};export{e as book,n as chapter,o as chapterTitle,p as default,r as examples,c as headings,a as html,d as original,i as slug,t as title};
