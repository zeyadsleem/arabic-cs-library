const n="go-tour",e="basics",t="الحزم والمتغيرات والدوال",d="p3",o="الأسماء المصدّرة",a=[{depth:2,id:"lesson-title",text:"الأسماء المصدّرة"}],c=`
  <h2 id="lesson-title">الأسماء المصدّرة</h2>
  
  
  <p>
    في Go، يكون الاسم مصدّرًا إذا بدأ بحرف كبير.


    على سبيل المثال، يُعدّ <code>Pizza</code> اسمًا مصدّرًا، وكذلك <code>Pi</code>، الذي يُصدَّر من


    الحزمة <code>math</code>.
  </p>
  

  
  <p>
    <code>pizza</code> و<code>pi</code> لا يبدآن بحرف كبير، لذا فهما غير مصدّرين.
  </p>
  

  
  <p>
    عند استيراد حزمة، يمكنك الإشارة إلى أسمائها المصدّرة فقط.


    لا يمكن الوصول إلى أي أسماء &#34;غير مصدّرة&#34; من خارج الحزمة.
  </p>
  

  
  <p>
    شغّل الشيفرة. لاحظ رسالة الخطأ.
  </p>
  

  
  <p>
    لإصلاح الخطأ، غيّر الاسم <code>math.pi</code> إلى <code>math.Pi</code> وجرّب مرة أخرى.
  </p>
  

	
		
	

`,p=[{Name:"exported-names.go",Content:`package main

import (
	"fmt"
	"math"
)

func main() {
	fmt.Println(math.pi)
}
`}],i=`
  <h2>Exported names</h2>
  
  
  <p>
    In Go, a name is exported if it begins with a capital letter.


    For example, <code>Pizza</code> is an exported name, as is <code>Pi</code>, which is exported from


    the <code>math</code> package.
  </p>
  

  
  <p>
    <code>pizza</code> and <code>pi</code> do not start with a capital letter, so they are not exported.
  </p>
  

  
  <p>
    When importing a package, you can refer only to its exported names.


    Any &#34;unexported&#34; names are not accessible from outside the package.
  </p>
  

  
  <p>
    Run the code. Notice the error message.
  </p>
  

  
  <p>
    To fix the error, rename <code>math.pi</code> to <code>math.Pi</code> and try it again.
  </p>
  

	
		
	

`,s={book:n,chapter:e,chapterTitle:t,slug:"p3",title:o,headings:a,html:c,examples:p,original:i};export{n as book,e as chapter,t as chapterTitle,s as default,p as examples,a as headings,c as html,i as original,d as slug,o as title};
