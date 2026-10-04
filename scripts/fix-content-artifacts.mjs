import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import MarkdownIt from 'markdown-it';
import { fileURLToPath } from 'node:url';
import { outsideCode } from './lib/content-markup.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Explicit corrections reviewed against the English context. Never delete
// arbitrary foreign letters: proper names and all code remain untouched.
const corrections = {
  '500-lines/pedometer--index.md': [['فع��', 'فالطريقة']],
  'crypto-101/stream-ciphers--index.md': [['المشفَّر��', 'المشفَّرة']],
  'aosabook/v1-audacity--index.md': [['«من副产品»', '«ناتج ثانوي»']],
  'aosabook/v1-cmake--index.md': [['قرَّر разработُ نظامَ بناء جديدًا', 'قررنا تطوير نظام بناء جديد']],
  'aosabook/v1-jitsi--index.md': [['وسنحرص على 因此 أن يبدأ', 'ولذلك سنحرص على أن يبدأ'], ['.этому عندما', '. وعندما']],
  'aosabook/v1-packaging--index.md': [['وكذلك أنَّ这么做 يخرق', 'وكذلك فإنَّ هذا يخرق']],
  'aosabook/v1-sendmail--index.md': [['العادية来表示', 'العادية لتمثيل'], ['متناثرة في各处 من نظام الملفات', 'متناثرة في أماكن متفرقة من نظام الملفات']],
  'aosabook/v1-socialcalc--index.md': [['ي告诉', 'يخبر']],
  'aosabook/v1-telepathy--index.md': [['بدلًا من体系和 واجهات إضافية', 'بدلًا من إنشاء واجهات إضافية']],
  'aosabook/v1-wesnoth--index.md': [['بما في ذلك内容量 الكبير القابلُ', 'بما في ذلك الحجم الكبير من المحتوى القابلُ']],
  'aosabook/v2-freertos--index.md': [['الأساسيات是如何 يعمل أي نظام تشغيل', 'أساسيات كيفية عمل أي نظام تشغيل']],
  'aosabook/v2-gdb--index.md': [['تستغرق数年 لإتمامها', 'تستغرق سنوات لإتمامها']],
  'aosabook/v2-ghc--index.md': [['дело يعود', 'الأمر يعود']],
  'aosabook/v2-git--index.md': [['تاريخ الملف一路ًا صعودًا', 'تاريخ الملف صعودًا']],
  'aosabook/v2-mailman--index.md': [['وهناك副作用 آخر', 'وهناك أثر جانبي آخر']],
  'aosabook/v2-matplotlib--index.md': [['以便 أن تتمكّل', 'حتى يتمكّن'], ['لكنّ صحة الصور ظلّ需要进行 التحقّق يدويًا', 'لكنّ صحة الصور ظلّت بحاجة إلى التحقّق اليدوي']],
  'open-data-structures/13_Data_Structures_Integers--index.md': [['略微ًا', 'قليلاً']],
  'open-data-structures/14_External_Memory_Searchin--index.md': [['هي之于', 'هي بالنسبة إلى']],
  'open-data-structures/9_Red_Black_Trees--index.md': [['أبسطскольку لا', 'أبسط لأنه لا']],
  'introtcs/lec_00_1_math_background--index.md': [[String.raw`$u\) _جيرًا واردًا_`, '$u$ _جارًا واردًا_']],
  'introtcs/lec_07_other_models--index.md': [[String.raw`^* \، تكون`, '^*$، تكون']],
  'introtcs/lec_14_PvsNP--index.md': [[String.raw`\[$\mathbf{P}\neq \mathbf{NP}$\]`, String.raw`[$\mathbf{P}\neq \mathbf{NP}$]`], [String.raw`\[ نظيره الجبري \]`, '[ نظيره الجبري ]']],
  'introtcs/lec_19_cryptography--index.md': [['$X_$', '$X$_']],
  'ocaml-cs3110/interp--index.md': [['### 10.3.8. اكتمل مفسّر SimPL![#](#the-simpl-interpreter-is-done)', '### 10.3.8. اكتمل مفسّر SimPL {#the-simpl-interpreter-is-done}']],
  'discrete-math/ch_sequences--secseq-induction.md': [['وفضلا��', 'وفضلاً عن ذلك']],
  'discrete-math/ch_sequences--secseq-polynomial.md': [['ومت��لية', 'ومتتالية']]
};
for (const filename of fs.readdirSync(path.join(root, 'content/network-security'))) {
  if (filename.endsWith('.md')) corrections[`network-security/${filename}`] = [['\uf0c1', '↗']];
}

let changed = 0;
const parser = new MarkdownIt({ html: true });
function code(text) {
  const values = [];
  function visit(tokens) {
    for (const token of tokens) {
      if (['fence', 'code_block', 'code_inline'].includes(token.type)) values.push({ type: token.type, info: token.info, text: token.content });
      if (token.children) visit(token.children);
    }
  }
  visit(parser.parse(text, {}));
  return values;
}
for (const [relative, pairs] of Object.entries(corrections)) {
  const file = path.join(root, 'content', relative);
  const before = fs.readFileSync(file, 'utf8');
  const after = outsideCode(before, (text) => pairs.reduce((result, [from, to]) => result.split(from).join(to), text));
  assert.deepEqual(code(after), code(before), `Code changed in ${relative}`);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
    console.log(`Corrected ${relative}`);
  }
}
console.log(`${changed} source files corrected; code preserved.`);
