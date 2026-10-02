package main

// Tour-compatible helpers executed inside Yaegi, preserving captured output.
var helpers = []string{
	`package pic
import ("encoding/base64"; "image"; "image/png"; "bytes"; "fmt")
func ShowImage(m image.Image) {
 var buf bytes.Buffer
 if err := png.Encode(&buf, m); err != nil { panic(err) }
 fmt.Println("IMAGE:" + base64.StdEncoding.EncodeToString(buf.Bytes()))
}
func Show(f func(int,int) [][]uint8) {
 const dx,dy = 256,256
 data := f(dx,dy)
 m := image.NewNRGBA(image.Rect(0,0,dx,dy))
 for y:=0;y<dy;y++ { for x:=0;x<dx;x++ { v:=data[y][x]; j:=y*m.Stride+x*4; m.Pix[j]=v;m.Pix[j+1]=v;m.Pix[j+2]=255;m.Pix[j+3]=255 } }
 ShowImage(m)
}`,
	`package wc
import ("fmt"; "strings"; "reflect")
func Test(f func(string) map[string]int) {
 for _,s := range []string{"I am learning Go!", "The quick brown fox jumped over the lazy dog.", "I ate a donut. Then I ate another donut.", "A man a plan a canal panama."} {
 want:=map[string]int{};for _,w:=range strings.Fields(s){want[w]++}
 got:=f(s);if !reflect.DeepEqual(got,want){fmt.Printf("FAIL: %q\ngot: %v\nwant: %v\n",s,got,want);return};fmt.Printf("PASS: %q\n",s)
 }
}`,
	`package reader
import ("fmt"; "io")
func Validate(r io.Reader) {
 b:=make([]byte,1024)
 for j:=0;j<100;j++ { n,err:=r.Read(b);if n<1 || n>len(b) || err!=nil {fmt.Printf("FAIL: Read returned n=%d err=%v\n",n,err);return};for _,c:=range b[:n]{if c!='A'{fmt.Printf("FAIL: expected A, got %q\n",c);return}} }
 fmt.Println("OK!")
}`,
}
