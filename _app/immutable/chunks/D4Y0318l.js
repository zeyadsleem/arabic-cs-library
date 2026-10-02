const n="go-tour",e="moretypes",o="مزيد من الأنواع: البنى والشرائح والخرائط.",l="p18",t="تمرين: الشرائح",c=[{depth:2,id:"lesson-title",text:"تمرين: الشرائح"}],d=`
  <h2 id="lesson-title">تمرين: الشرائح</h2>
  
  
  <p>
    نفّذ <code>Pic</code>. ينبغي أن تُعيد شريحة طولها <code>dy</code>، كل عنصر فيها شريحة من <code>dx</code> عدد صحيح غير موقّع بحجم 8 بت. عندما تشغّل البرنامج، سيعرض صورتك، مفسّرًا الأعداد الصحيحة على أنها قيم تدرّج رمادي (حسنًا، تدرّج أزرق).
  </p>
  

  
  <p>
    اختيار الصورة متروك لك. من الدوال المثيرة للاهتمام <code>(x+y)/2</code>، و<code>x*y</code>، و<code>x^y</code>.
  </p>
  

  
  <p>
    (تحتاج إلى استخدام حلقة لتخصيص ذاكرة لكل <code>[]uint8</code> داخل <code>[][]uint8</code>.)
  </p>
  

  
  <p>
    (استخدم <code>uint8(intValue)</code> للتحويل بين الأنواع.)
  </p>
  

	
		
	

`,i=[{Name:"exercise-slices.go",Content:`package main

import "golang.org/x/tour/pic"

func Pic(dx, dy int) [][]uint8 {
}

func main() {
	pic.Show(Pic)
}
`}],s=`
  <h2>Exercise: Slices</h2>
  
  
  <p>
    Implement <code>Pic</code>. It should return a slice of length <code>dy</code>, each element of which is a slice of <code>dx</code> 8-bit unsigned integers. When you run the program, it will display your picture, interpreting the integers as grayscale (well, bluescale) values.
  </p>
  

  
  <p>
    The choice of image is up to you. Interesting functions include <code>(x+y)/2</code>, <code>x*y</code>, and <code>x^y</code>.
  </p>
  

  
  <p>
    (You need to use a loop to allocate each <code>[]uint8</code> inside the <code>[][]uint8</code>.)
  </p>
  

  
  <p>
    (Use <code>uint8(intValue)</code> to convert between types.)
  </p>
  

	
		
	

`,p={book:n,chapter:e,chapterTitle:o,slug:"p18",title:t,headings:c,html:d,examples:i,original:s};export{n as book,e as chapter,o as chapterTitle,p as default,i as examples,c as headings,d as html,s as original,l as slug,t as title};
