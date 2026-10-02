const n="go-tour",t="moretypes",o="مزيد من الأنواع: البنى والشرائح والخرائط.",c="p14",s="شرائح من الشرائح",e=[{depth:2,id:"lesson-title",text:"شرائح من الشرائح"}],i=`
  <h2 id="lesson-title">شرائح من الشرائح</h2>
  
  
  <p>
    يمكن أن تحتوي الشرائح على أي نوع، بما في ذلك شرائح أخرى.
  </p>
  

	
		
	

`,r=[{Name:"slices-of-slice.go",Content:`package main

import (
	"fmt"
	"strings"
)

func main() {
	// Create a tic-tac-toe board.
	board := [][]string{
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
	}

	// The players take turns.
	board[0][0] = "X"
	board[2][2] = "O"
	board[1][2] = "X"
	board[1][0] = "O"
	board[0][2] = "X"

	for i := 0; i < len(board); i++ {
		fmt.Printf("%s\\n", strings.Join(board[i], " "))
	}
}
`}],a=`
  <h2>Slices of slices</h2>
  
  
  <p>
    Slices can contain any type, including other slices.
  </p>
  

	
		
	

`,l={book:n,chapter:t,chapterTitle:o,slug:"p14",title:s,headings:e,html:i,examples:r,original:a};export{n as book,t as chapter,o as chapterTitle,l as default,r as examples,e as headings,i as html,a as original,c as slug,s as title};
