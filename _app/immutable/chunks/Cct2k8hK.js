const n="go-tour",t="basics",e="الحزم والمتغيرات والدوال",a="index",o="الحزم",c=[{depth:2,id:"lesson-title",text:"الحزم"}],s=`
  <h2 id="lesson-title">الحزم</h2>
  
  
  <p>
    يتكوّن كل برنامج بلغة Go من حزم.
  </p>
  

  
  <p>
    يبدأ تنفيذ البرامج في الحزمة <code>main</code>.
  </p>
  

  
  <p>
    يستخدم هذا البرنامج الحزم ذات مساري الاستيراد <code>&#34;fmt&#34;</code> و<code>&#34;math/rand&#34;</code>.
  </p>
  

  
  <p>
    جرت العادة على أن يكون اسم الحزمة مطابقًا لآخر عنصر في مسار الاستيراد. فعلى سبيل المثال، تتكوّن الحزمة <code>&#34;math/rand&#34;</code> من ملفات تبدأ بالتعليمة <code>package rand</code>.
  </p>
  

	
		
	

`,p=[{Name:"packages.go",Content:`package main

import (
	"fmt"
	"math/rand"
)

func main() {
	fmt.Println("My favorite number is", rand.Intn(10))
}
`}],d=`
  <h2>Packages</h2>
  
  
  <p>
    Every Go program is made up of packages.
  </p>
  

  
  <p>
    Programs start running in package <code>main</code>.
  </p>
  

  
  <p>
    This program is using the packages with import paths <code>&#34;fmt&#34;</code> and <code>&#34;math/rand&#34;</code>.
  </p>
  

  
  <p>
    By convention, the package name is the same as the last element of the import path. For instance, the <code>&#34;math/rand&#34;</code> package comprises files that begin with the statement <code>package rand</code>.
  </p>
  

	
		
	

`,i={book:n,chapter:t,chapterTitle:e,slug:a,title:o,headings:c,html:s,examples:p,original:d};export{n as book,t as chapter,e as chapterTitle,i as default,p as examples,c as headings,s as html,d as original,a as slug,o as title};
