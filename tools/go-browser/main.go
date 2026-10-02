package main

import (
	"bytes"
	"context"
	"fmt"
	"go/format"
	"reflect"
	"syscall/js"
	"time"

	"github.com/traefik/yaegi/interp"
	"github.com/traefik/yaegi/stdlib"
	"golang.org/x/tour/tree"
)

func run(_ js.Value, args []js.Value) (result any) {
	var stdout, stderr bytes.Buffer
	defer func() {
		if recovered := recover(); recovered != nil {
			result = map[string]any{"errors": fmt.Sprint(recovered), "output": stdout.String(), "stderr": stderr.String()}
		}
	}()
	if len(args) != 1 {
		return map[string]any{"errors": "Expected one Go source file", "output": "", "stderr": ""}
	}
	i := interp.New(interp.Options{Stdout: &stdout, Stderr: &stderr})
	if err := i.Use(stdlib.Symbols); err != nil {
		return map[string]any{"errors": err.Error(), "output": "", "stderr": ""}
	}
	if err := i.Use(interp.Exports{
		"golang.org/x/tour/tree/tree": {
			"Tree": reflect.ValueOf((*tree.Tree)(nil)),
			"New":  reflect.ValueOf(tree.New),
		},
	}); err != nil {
		return map[string]any{"errors": err.Error(), "output": "", "stderr": ""}
	}
	// The remaining Tour helper packages are interpreted so stdout and image
	// markers are captured by the interpreter rather than the Wasm host.
	for _, helper := range helpers {
		if _, err := i.Eval(helper); err != nil {
			return map[string]any{"errors": err.Error(), "output": "", "stderr": ""}
		}
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_, err := i.EvalWithContext(ctx, args[0].String())
	message := ""
	if err != nil {
		message = err.Error()
	}
	return map[string]any{"errors": message, "output": stdout.String(), "stderr": stderr.String()}
}

func formatCode(_ js.Value, args []js.Value) any {
	if len(args) != 1 {
		return map[string]any{"error": "Expected one Go source file", "body": ""}
	}
	formatted, err := format.Source([]byte(args[0].String()))
	if err != nil {
		return map[string]any{"error": err.Error(), "body": ""}
	}
	return map[string]any{"error": "", "body": string(formatted)}
}

func main() {
	js.Global().Set("tourGo", map[string]any{
		"run":    js.FuncOf(run),
		"format": js.FuncOf(formatCode),
	})
	select {}
}
