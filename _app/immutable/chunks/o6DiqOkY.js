const e="go-tour",n="concurrency",o="التزامن",p="p8",t="تمرين: الأشجار الثنائية المتكافئة",c=[{depth:2,id:"lesson-title",text:"تمرين: الأشجار الثنائية المتكافئة"}],r=`
  <h2 id="lesson-title">تمرين: الأشجار الثنائية المتكافئة</h2>
  
  
  <p>
    <b>1.</b> نفّذ الدالة <code>Walk</code>.
  </p>
  

  
  <p>
    <b>2.</b> اختبر الدالة <code>Walk</code>.
  </p>
  

  
  <p>
    تنشئ الدالة <code>tree.New(k)</code> شجرة ثنائية ذات بنية عشوائية (لكنها مرتبة دائمًا) تحتوي على القيم <code>k</code>، <code>2k</code>، <code>3k</code>، ...، <code>10k</code>.
  </p>
  

  
  <p>
    أنشئ قناة جديدة <code>ch</code> وابدأ اجتياز الشجرة:
  </p>
  

  
  <pre>go Walk(tree.New(1), ch)</pre>
  

  
  <p>
    ثم اقرأ 10 قيم من القناة واطبعها. ينبغي أن تكون الأعداد 1، 2، 3، ...، 10.
  </p>
  

  
  <p>
    <b>3.</b> نفّذ الدالة <code>Same</code> باستخدام <code>Walk</code> لتحديد ما إذا كانت <code>t1</code> و<code>t2</code> تخزّنان القيم نفسها.
  </p>
  

  
  <p>
    <b>4.</b> اختبر الدالة <code>Same</code>.
  </p>
  

  
  <p>
    <code>Same(tree.New(1), tree.New(1))</code> ينبغي أن تُرجع القيمة «صحيح»، و<code>Same(tree.New(1), tree.New(2))</code> ينبغي أن تُرجع القيمة «خطأ».
  </p>
  

  
  <p>
    يمكن العثور على توثيق <code>Tree</code> في <a href="https://godoc.org/golang.org/x/tour/tree#Tree" target="_blank" rel="noopener noreferrer">هذا الموضع</a>.
  </p>
  

	
		
	

`,d=[{Name:"exercise-equivalent-binary-trees.go",Content:`package main

import "golang.org/x/tour/tree"

// Walk walks the tree t sending all values
// from the tree to the channel ch.
func Walk(t *tree.Tree, ch chan int)

// Same determines whether the trees
// t1 and t2 contain the same values.
func Same(t1, t2 *tree.Tree) bool

func main() {
}
`}],a=`
  <h2>Exercise: Equivalent Binary Trees</h2>
  
  
  <p>
    <b>1.</b> Implement the <code>Walk</code> function.
  </p>
  

  
  <p>
    <b>2.</b> Test the <code>Walk</code> function.
  </p>
  

  
  <p>
    The function <code>tree.New(k)</code> constructs a randomly-structured (but always sorted) binary tree holding the values <code>k</code>, <code>2k</code>, <code>3k</code>, ..., <code>10k</code>.
  </p>
  

  
  <p>
    Create a new channel <code>ch</code> and kick off the walker:
  </p>
  

  
  <pre>go Walk(tree.New(1), ch)</pre>
  

  
  <p>
    Then read and print 10 values from the channel. It should be the numbers 1, 2, 3, ..., 10.
  </p>
  

  
  <p>
    <b>3.</b> Implement the <code>Same</code> function using <code>Walk</code> to determine whether <code>t1</code> and <code>t2</code> store the same values.
  </p>
  

  
  <p>
    <b>4.</b> Test the <code>Same</code> function.
  </p>
  

  
  <p>
    <code>Same(tree.New(1), tree.New(1))</code> should return true, and <code>Same(tree.New(1), tree.New(2))</code> should return false.
  </p>
  

  
  <p>
    The documentation for <code>Tree</code> can be found <a href="https://godoc.org/golang.org/x/tour/tree#Tree" target="_blank" rel="noopener noreferrer">here</a>.
  </p>
  

	
		
	

`,l={book:e,chapter:n,chapterTitle:o,slug:"p8",title:t,headings:c,html:r,examples:d,original:a};export{e as book,n as chapter,o as chapterTitle,l as default,d as examples,c as headings,r as html,a as original,p as slug,t as title};
