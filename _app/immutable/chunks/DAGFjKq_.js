const n="go-tour",t="basics",e="الحزم والمتغيرات والدوال",p="p11",o="الأنواع الأساسية",i=[{depth:2,id:"lesson-title",text:"الأنواع الأساسية"}],s=`
  <h2 id="lesson-title">الأنواع الأساسية</h2>
  
  
  <p>
    الأنواع الأساسية في Go هي
  </p>
  

  
  <pre>bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // alias for uint8

rune // alias for int32
     // represents a Unicode code point

float32 float64

complex64 complex128</pre>
  

  
  <p>
    يعرض المثال متغيرات من عدة أنواع،


    ويوضح أيضًا إمكانية &#34;تجميع&#34; تصريحات المتغيرات في كتل،


    كما هو الحال مع تعليمات الاستيراد.
  </p>
  

  
  <p>
    يكون حجم الأنواع <code>int</code> و<code>uint</code> و<code>uintptr</code> عادةً 32 بت على أنظمة 32 بت، و64 بت على أنظمة 64 بت.


    عندما تحتاج إلى قيمة عدد صحيح، ينبغي استخدام <code>int</code> ما لم يكن لديك سبب محدد لاستخدام نوع عدد صحيح ذي حجم محدد أو غير موقّع.
  </p>
  

	
		
	

`,a=[{Name:"basic-types.go",Content:`package main

import (
	"fmt"
	"math/cmplx"
)

var (
	ToBe   bool       = false
	MaxInt uint64     = 1<<64 - 1
	z      complex128 = cmplx.Sqrt(-5 + 12i)
)

func main() {
	fmt.Printf("Type: %T Value: %v\\n", ToBe, ToBe)
	fmt.Printf("Type: %T Value: %v\\n", MaxInt, MaxInt)
	fmt.Printf("Type: %T Value: %v\\n", z, z)
}
`}],c=`
  <h2>Basic types</h2>
  
  
  <p>
    Go&#39;s basic types are
  </p>
  

  
  <pre>bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // alias for uint8

rune // alias for int32
     // represents a Unicode code point

float32 float64

complex64 complex128</pre>
  

  
  <p>
    The example shows variables of several types,


    and also that variable declarations may be &#34;factored&#34; into blocks,


    as with import statements.
  </p>
  

  
  <p>
    The <code>int</code>, <code>uint</code>, and <code>uintptr</code> types are usually 32 bits wide on 32-bit systems and 64 bits wide on 64-bit systems.


    When you need an integer value you should use <code>int</code> unless you have a specific reason to use a sized or unsigned integer type.
  </p>
  

	
		
	

`,l={book:n,chapter:t,chapterTitle:e,slug:"p11",title:o,headings:i,html:s,examples:a,original:c};export{n as book,t as chapter,e as chapterTitle,l as default,a as examples,i as headings,s as html,c as original,p as slug,o as title};
