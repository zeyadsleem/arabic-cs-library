const n="go-tour",e="flowcontrol",t="تعليمات التحكم في التدفق: for وif وelse وswitch وتأجيل التنفيذ",p="p8",o="تمرين: الحلقات والدوال",a=[{depth:2,id:"lesson-title",text:"تمرين: الحلقات والدوال"}],r=`
  <h2 id="lesson-title">تمرين: الحلقات والدوال</h2>
  
  
  <p>
    للتجريب بالدوال والحلقات، لننفّذ دالة لحساب الجذر التربيعي: إذا أُعطينا عددًا x، نريد إيجاد العدد z الذي تكون قيمة z² له أقرب ما يمكن إلى x.
  </p>
  

  
  <p>
    تحسب الحواسيب عادةً الجذر التربيعي للعدد x باستخدام حلقة.


    انطلاقًا من قيمة تخمينية ما لـ z، يمكننا تعديل z بناءً على مدى قرب z² من x،


    لنحصل على تخمين أفضل:
  </p>
  

  
  <pre>z -= (z*z - x) / (2*z)</pre>
  

  
  <p>
    يؤدي تكرار هذا التعديل إلى تحسين التخمين أكثر فأكثر


    حتى نصل إلى إجابة قريبة من الجذر التربيعي الفعلي قدر الإمكان.
  </p>
  

  
  <p>
    نفّذ ذلك في <code>func Sqrt</code> المُعطاة.


    يُعدّ العدد 1 تخمينًا أوليًا مناسبًا لـ z، مهما كانت قيمة المُدخل.


    في البداية، كرّر الحساب 10 مرات واطبع كل قيمة لـ z أثناء ذلك.


    لاحظ مدى اقترابك من الإجابة لقيم مختلفة من x (1، 2، 3، ...)


    ومدى سرعة تحسّن التخمين.
  </p>
  

  
  <p>
    تلميح: للتصريح عن قيمة ذات فاصلة عائمة وتهيئتها،


    اكتبها بصيغة الفاصلة العائمة أو استخدم تحويلًا:
  </p>
  

  
  <pre>z := 1.0
z := float64(1)</pre>
  

  
  <p>
    بعد ذلك، غيّر شرط الحلقة بحيث تتوقف بمجرد أن تتوقف القيمة عن


    التغيّر (أو لا تتغيّر إلا بمقدار صغير جدًا).


    لاحظ ما إذا كان ذلك يستغرق أكثر من 10 تكرارات أم أقل.


    جرّب تخمينات أولية أخرى لـ z، مثل x أو x/2.


    ما مدى قرب نتائج دالتك من نتائج <a href="https://go.dev/pkg/math/#Sqrt" target="_blank" rel="noopener noreferrer">math.Sqrt</a> في المكتبة القياسية؟
  </p>
  

  
  <p>
    (<b>ملاحظة:</b> إذا كنت مهتمًا بتفاصيل الخوارزمية، فإن z² − x أعلاه


    هو مقدار ابتعاد z² عن القيمة التي ينبغي أن تكون عليها (x)، والقسمة على 2z هي المشتقة


    لـ z²، لضبط مقدار تعديلنا لـ z وفقًا لمدى سرعة تغيّر z².


    يُسمّى هذا النهج العام <a href="https://en.wikipedia.org/wiki/Newton%27s_method" target="_blank" rel="noopener noreferrer">طريقة نيوتن</a>.


    وهو يعمل جيدًا مع كثير من الدوال، لكنه يعمل جيدًا على نحو خاص مع الجذر التربيعي.)
  </p>
  

	
		
	

`,s=[{Name:"exercise-loops-and-functions.go",Content:`package main

import (
	"fmt"
)

func Sqrt(x float64) float64 {
}

func main() {
	fmt.Println(Sqrt(2))
}
`}],i=`
  <h2>Exercise: Loops and Functions</h2>
  
  
  <p>
    As a way to play with functions and loops, let&#39;s implement a square root function: given a number x, we want to find the number z for which z² is most nearly x.
  </p>
  

  
  <p>
    Computers typically compute the square root of x using a loop.


    Starting with some guess z, we can adjust z based on how close z² is to x,


    producing a better guess:
  </p>
  

  
  <pre>z -= (z*z - x) / (2*z)</pre>
  

  
  <p>
    Repeating this adjustment makes the guess better and better


    until we reach an answer that is as close to the actual square root as can be.
  </p>
  

  
  <p>
    Implement this in the <code>func Sqrt</code> provided.


    A decent starting guess for z is 1, no matter what the input.


    To begin with, repeat the calculation 10 times and print each z along the way.


    See how close you get to the answer for various values of x (1, 2, 3, ...)


    and how quickly the guess improves.
  </p>
  

  
  <p>
    Hint: To declare and initialize a floating point value,


    give it floating point syntax or use a conversion:
  </p>
  

  
  <pre>z := 1.0
z := float64(1)</pre>
  

  
  <p>
    Next, change the loop condition to stop once the value has stopped


    changing (or only changes by a very small amount).


    See if that&#39;s more or fewer than 10 iterations.


    Try other initial guesses for z, like x, or x/2.


    How close are your function&#39;s results to the <a href="https://go.dev/pkg/math/#Sqrt" target="_blank" rel="noopener noreferrer">math.Sqrt</a> in the standard library?
  </p>
  

  
  <p>
    (<b>Note:</b> If you are interested in the details of the algorithm, the z² − x above


    is how far away z² is from where it needs to be (x), and the division by 2z is the derivative


    of z², to scale how much we adjust z by how quickly z² is changing.


    This general approach is called <a href="https://en.wikipedia.org/wiki/Newton%27s_method" target="_blank" rel="noopener noreferrer">Newton&#39;s method</a>.


    It works well for many functions but especially well for square root.)
  </p>
  

	
		
	

`,l={book:n,chapter:e,chapterTitle:t,slug:"p8",title:o,headings:a,html:r,examples:s,original:i};export{n as book,e as chapter,t as chapterTitle,l as default,s as examples,a as headings,r as html,i as original,p as slug,o as title};
