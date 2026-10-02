const n="go-tour",e="moretypes",t="مزيد من الأنواع: البنى والشرائح والخرائط.",r="p22",o="تعديل الخرائط",p=[{depth:2,id:"lesson-title",text:"تعديل الخرائط"}],c=`
  <h2 id="lesson-title">تعديل الخرائط</h2>
  
  
  <p>
    أدرج عنصرًا في الخريطة <code>m</code> أو حدّثه:
  </p>
  

  
  <pre>m[key] = elem</pre>
  

  
  <p>
    استرجع عنصرًا:
  </p>
  

  
  <pre>elem = m[key]</pre>
  

  
  <p>
    احذف عنصرًا:
  </p>
  

  
  <pre>delete(m, key)</pre>
  

  
  <p>
    تحقّق من وجود مفتاح باستخدام إسناد ذي قيمتين:
  </p>
  

  
  <pre>elem, ok = m[key]</pre>
  

  
  <p>
    إذا كان <code>key</code> موجودًا في <code>m</code>، فإن <code>ok</code> تساوي <code>true</code>. وإن لم يكن موجودًا، فإن <code>ok</code> تساوي <code>false</code>.
  </p>
  

  
  <p>
    إذا لم يكن <code>key</code> موجودًا في الخريطة، فإن <code>elem</code> هي القيمة الصفرية لنوع عناصر الخريطة.
  </p>
  

  
  <p>
    <b>ملاحظة:</b> إذا لم يُصرَّح بعد عن <code>elem</code> أو <code>ok</code>، فيمكنك استخدام صيغة تصريح مختصرة:
  </p>
  

  
  <pre>elem, ok := m[key]</pre>
  

	
		
	

`,m=[{Name:"mutating-maps.go",Content:`package main

import "fmt"

func main() {
	m := make(map[string]int)

	m["Answer"] = 42
	fmt.Println("The value:", m["Answer"])

	m["Answer"] = 48
	fmt.Println("The value:", m["Answer"])

	delete(m, "Answer")
	fmt.Println("The value:", m["Answer"])

	v, ok := m["Answer"]
	fmt.Println("The value:", v, "Present?", ok)
}
`}],d=`
  <h2>Mutating Maps</h2>
  
  
  <p>
    Insert or update an element in map <code>m</code>:
  </p>
  

  
  <pre>m[key] = elem</pre>
  

  
  <p>
    Retrieve an element:
  </p>
  

  
  <pre>elem = m[key]</pre>
  

  
  <p>
    Delete an element:
  </p>
  

  
  <pre>delete(m, key)</pre>
  

  
  <p>
    Test that a key is present with a two-value assignment:
  </p>
  

  
  <pre>elem, ok = m[key]</pre>
  

  
  <p>
    If <code>key</code> is in <code>m</code>, <code>ok</code> is <code>true</code>. If not, <code>ok</code> is <code>false</code>.
  </p>
  

  
  <p>
    If <code>key</code> is not in the map, then <code>elem</code> is the zero value for the map&#39;s element type.
  </p>
  

  
  <p>
    <b>Note:</b> If <code>elem</code> or <code>ok</code> have not yet been declared you could use a short declaration form:
  </p>
  

  
  <pre>elem, ok := m[key]</pre>
  

	
		
	

`,s={book:n,chapter:e,chapterTitle:t,slug:"p22",title:o,headings:p,html:c,examples:m,original:d};export{n as book,e as chapter,t as chapterTitle,s as default,m as examples,p as headings,c as html,d as original,r as slug,o as title};
