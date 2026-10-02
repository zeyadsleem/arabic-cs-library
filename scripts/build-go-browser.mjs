import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'static/go-browser');
await fs.mkdir(output, { recursive: true });
execFileSync('go', ['build', '-trimpath', '-ldflags=-s -w', '-o', path.join(output, 'interpreter.wasm'), '.'], {
  cwd: path.join(root, 'tools/go-browser'), stdio: 'inherit', env: { ...process.env, GOOS: 'js', GOARCH: 'wasm' }
});
const goroot = execFileSync('go', ['env', 'GOROOT'], { encoding: 'utf8' }).trim();
await fs.copyFile(path.join(goroot, 'lib/wasm/wasm_exec.js'), path.join(output, 'wasm_exec.js'));
await fs.copyFile(path.join(root, 'tools/go-browser/GO-LICENSE.txt'), path.join(output, 'GO-LICENSE.txt'));
for (const [module, name] of [['github.com/traefik/yaegi', 'YAEGI-LICENSE.txt'], ['golang.org/x/tour', 'TOUR-LICENSE.txt']]) {
  const directory = execFileSync('go', ['list', '-m', '-f', '{{.Dir}}', module], {
    cwd: path.join(root, 'tools/go-browser'), encoding: 'utf8'
  }).trim();
  await fs.copyFile(path.join(directory, 'LICENSE'), path.join(output, name));
}
await fs.writeFile(path.join(output, 'NOTICE.txt'),
  'Browser Go runtime uses Yaegi v0.16.1 (Apache-2.0), Go (BSD-3-Clause), and golang.org/x/tour v0.1.0 (BSD-3-Clause).\n' +
  'Inspired by LiveCodes go-wasm integration. The local wrapper is implemented in tools/go-browser.\n' +
  'Tour pic, wc and reader helpers are adapted for captured interpreter output; tree is the original package.\n');
console.log('Browser Go interpreter and formatter built.');
