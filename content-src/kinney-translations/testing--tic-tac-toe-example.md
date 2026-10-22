---
title: "بناء لعبة Tic Tac Toe باستخدام Vitest"
---

## بناء لعبة Tic Tac Toe باستخدام التطوير المدفوع بالاختبارات مع Vitest

**جدول المحتويات**

1. [المقدمة](#introduction)
2. [المتطلبات المسبقة](#prerequisites)
3. [تهيئة المشروع](#project-setup)
4. [فهم التطوير المدفوع بالاختبارات](#understanding-test-driven-development)
5. [تهيئة Vitest](#setting-up-vitest)
6. [تصميم منطق اللعبة](#designing-the-game-logic)
7. [تنفيذ منطق اللعبة بالتطوير المدفوع بالاختبارات](#implementing-the-game-logic-with-tdd) [1. إنشاء لوحة اللعبة](#creating-the-game-board) [2. وضع نقلة](#placing-a-move) [3. التحقق من فائز](#checking-for-a-winner) [4. التحقق من التعادل](#checking-for-a-draw)
  - [1. إنشاء لوحة اللعبة](#creating-the-game-board)
  - [2. وضع نقلة](#placing-a-move)
  - [3. التحقق من فائز](#checking-for-a-winner)
  - [4. التحقق من التعادل](#checking-for-a-draw)
8. [بناء واجهة المستخدم](#building-the-user-interface)
9. [اختبار واجهة المستخدم](#testing-the-user-interface)
10. [الخلاصة](#conclusion)
11. [تمارين إضافية](#additional-exercises)

---

### المقدمة

في هذا الدليل سنبني لعبة **Tic Tac Toe** الكلاسيكية باستخدام **التطوير المدفوع بالاختبارات (TDD)** مع **Vitest**، إطار اختبار JavaScript سريع وحديث. سنبدأ بتطوير منطق اللعبة عبر اختبارات الوحدات ثم ننشئ واجهة مستخدم بسيطة باستخدام JavaScript العادية، بما يضمن اختبار واجهتنا وعملها بشكل صحيح.

**الأهداف:**

- تعلّم كيفية تطبيق مبادئ التطوير المدفوع بالاختبارات لبناء لعبة.
- فهم كيفية كتابة اختبارات الوحدات باستخدام Vitest.
- تطوير منطق لعبة Tic Tac Toe وواجهة المستخدم.
- كتابة اختبارات لمنطق اللعبة ولتفاعلات واجهة المستخدم معًا.

### المتطلبات المسبقة

- معرفة أساسية بـ JavaScript (صيغة ES6+).
- إلمام بـ Node.js وnpm.
- فهم مفاهيم اختبار الوحدات.
- Node.js وnpm مثبّتان على جهازك.

### تهيئة المشروع

1. **أنشئ دليلًا جديدًا** <code><span class="line"><span style="color:#82AAFF;font-style:italic">mkdir</span><span style="color:#ECC48D"> tic-tac-toe-tdd</span></span>
<span class="line"><span style="color:#C5E478;font-style:italic">cd</span><span style="color:#ECC48D"> tic-tac-toe-tdd</span></span></code>
2. **هيّئ npm** <code><span class="line"><span style="color:#82AAFF;font-style:italic">npm</span><span style="color:#ECC48D"> init</span><span style="color:#82AAFF"> -y</span></span></code>
3. **ثبّت Vitest** <code><span class="line"><span style="color:#82AAFF;font-style:italic">npm</span><span style="color:#ECC48D"> install</span><span style="color:#82AAFF"> --save-dev</span><span style="color:#ECC48D"> vitest</span></span></code>
4. **جهّز بنية المشروع** <code><span class="line"><span style="color:#D6DEEB">tic</span><span style="color:#C792EA">-</span><span style="color:#D6DEEB">tac</span><span style="color:#C792EA">-</span><span style="color:#D6DEEB">toe</span><span style="color:#C792EA">-</span><span style="color:#D6DEEB">tdd</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">├── package</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">json</span></span>
<span class="line"><span style="color:#D6DEEB">├── vitest</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">config</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">├── src</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB">│ ├── game</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">│ ├── ui</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB">│ └── index</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">html</span></span>
<span class="line"><span style="color:#D6DEEB">└── tests</span><span style="color:#C792EA">/</span></span>
<span class="line"><span style="color:#D6DEEB"> ├── game</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">test</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span>
<span class="line"><span style="color:#D6DEEB"> └── ui</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#FAF39F;font-style:italic">test</span><span style="color:#C792EA;font-style:italic">.</span><span style="color:#BAEBE2">js</span></span></code> `src/`: يحتوي على الشيفرة المصدرية لمنطق اللعبة وواجهة المستخدم. `tests/`: يحتوي على ملفات الاختبار.
  - `src/`: يحتوي على الشيفرة المصدرية لمنطق اللعبة وواجهة المستخدم.
  - `tests/`: يحتوي على ملفات الاختبار.

### فهم التطوير المدفوع بالاختبارات

**التطوير المدفوع بالاختبارات (TDD)** مقاربة لتطوير البرمجيات تقوم فيها بما يلي:

1. **اكتب اختبارًا**: اكتب اختبارًا للجزء التالي من الوظائف.
2. **شغّل الاختبار وشاهده يفشل**: يضمن أن الاختبار يكتشف غياب الوظيفة.
3. **اكتب أقل شيفرة تجعل الاختبار ينجح**: نفّذ شيفرة كافية فقط لجعل الاختبار ينجح.
4. **أعد الهيكلة**: حسّن الشيفرة مع إبقاء الاختبارات ناجحة.
5. **كرّر**: تابع مع الوظيفة التالية.

غالبًا ما تُسمّى هذه الدورة **الأحمر-الأخضر-إعادة الهيكلة** (Red-Green-Refactor).

### تهيئة Vitest

أضف سكربت اختبار إلى `package.json`:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

أنشئ ملف `vitest.config.js` (اختياري للتهيئات البسيطة):

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
  },
});
```

### تصميم منطق اللعبة

قبل أن نبدأ البرمجة، لنرسم منطق اللعبة:

- لوحة اللعبة شبكة 3x3.
- يتناوب اللاعبون وضع علامتهم (X أو O) على اللوحة.
- تتحقق اللعبة من وجود فائز بعد كل نقلة.
- يفوز اللاعب إذا كانت لديه ثلاث من علاماته في صف أو عمود أو قطر.
- تنتهي اللعبة بالتعادل إذا امتلأت كل الخانات دون فائز.

### تنفيذ منطق اللعبة بالتطوير المدفوع بالاختبارات

#### إنشاء لوحة اللعبة

##### الخطوة 1: اكتب الاختبار (الأحمر)

أنشئ `tests/game.test.js`:

```javascript
// tests/game.test.js
import { describe, it, expect } from 'vitest';
import { createGame } from '../src/game';

describe('Tic Tac Toe Game Logic', () => {
  it('initializes a 3x3 game board', () => {
    const game = createGame();
    expect(game.board).toEqual([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
  });

  it('starts with player X', () => {
    const game = createGame();
    expect(game.currentPlayer).toBe('X');
  });
});
```

**الشرح:**

- نختبر أن `createGame` تهيّئ لوحة 3x3 فارغة.
- نختبر أن اللعبة تبدأ باللاعب «X».

##### الخطوة 2: شغّل الاختبار وشاهده يفشل

شغّل الاختبار:

```bash
npm test
```

ستحصل على خطأ: `createGame` غير معرّفة.

##### الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (الأخضر)

نفّذ `createGame` في `src/game.js`:

```javascript
// src/game.js
export function createGame() {
  return {
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    currentPlayer: 'X',
  };
}
```

##### الخطوة 4: شغّل الاختبار مرة أخرى

شغّل الاختبار:

```bash
npm test
```

ينبغي أن تنجح الاختبارات الآن.

##### الخطوة 5: أعد الهيكلة (إن لزم)

شيفرتنا بسيطة؛ لا حاجة إلى إعادة هيكلة.

#### وضع نقلة

نحتاج إلى تنفيذ دالة تضع نقلة على اللوحة.

##### الخطوة 1: اكتب الاختبار (الأحمر)

أضف إلى `tests/game.test.js`:

```javascript
describe('placeMove', () => {
  it("places the current player's mark on the board", () => {
    const game = createGame();
    game.placeMove(0, 0); // Top-left corner
    expect(game.board[0][0]).toBe('X');
  });

  it('switches to the next player after a move', () => {
    const game = createGame();
    game.placeMove(0, 0);
    expect(game.currentPlayer).toBe('O');
  });

  it('does not allow placing a move on an occupied spot', () => {
    const game = createGame();
    game.placeMove(0, 0);
    expect(() => game.placeMove(0, 0)).toThrow('Spot already taken');
  });
});
```

**الشرح:**

- نختبر أن علامة اللاعب الحالي تُوضع على اللوحة.
- نختبر أن اللاعب يتبدّل بعد النقلة.
- نختبر أن وضع نقلة على خانة مشغولة يرمي خطأً.

##### الخطوة 2: شغّل الاختبار وشاهده يفشل

شغّل الاختبار:

```bash
npm test
```

تحدث أخطاء لأن `placeMove` غير معرّفة.

##### الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (الأخضر)

حدّث `src/game.js`:

```javascript
export function createGame() {
  return {
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    currentPlayer: 'X',
    placeMove(row, col) {
      if (this.board[row][col] !== '') {
        throw new Error('Spot already taken');
      }
      this.board[row][col] = this.currentPlayer;
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    },
  };
}
```

##### الخطوة 4: شغّل الاختبار مرة أخرى

شغّل الاختبار:

```bash
npm test
```

ينبغي أن تنجح كل الاختبارات.

##### الخطوة 5: أعد الهيكلة

فكّر في فصل منطق تبديل اللاعب.

#### التحقق من فائز

نحتاج إلى تنفيذ تابع للتحقق من وجود فائز.

##### الخطوة 1: اكتب الاختبار (الأحمر)

أضف إلى `tests/game.test.js`:

```javascript
describe('checkWinner', () => {
  it('detects a winning row', () => {
    const game = createGame();
    game.board = [
      ['X', 'X', 'X'],
      ['', '', ''],
      ['', '', ''],
    ];
    expect(game.checkWinner()).toBe('X');
  });

  it('detects a winning column', () => {
    const game = createGame();
    game.board = [
      ['O', '', ''],
      ['O', '', ''],
      ['O', '', ''],
    ];
    expect(game.checkWinner()).toBe('O');
  });

  it('detects a winning diagonal', () => {
    const game = createGame();
    game.board = [
      ['X', '', ''],
      ['', 'X', ''],
      ['', '', 'X'],
    ];
    expect(game.checkWinner()).toBe('X');
  });

  it('returns null if there is no winner', () => {
    const game = createGame();
    expect(game.checkWinner()).toBeNull();
  });
});
```

##### الخطوة 2: شغّل الاختبار وشاهده يفشل

شغّل الاختبار:

```bash
npm test
```

خطأ: `checkWinner` غير معرّفة.

##### الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (الأخضر)

حدّث `src/game.js`:

```javascript
export function createGame() {
  return {
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    currentPlayer: 'X',
    placeMove(row, col) {
      if (this.board[row][col] !== '') {
        throw new Error('Spot already taken');
      }
      this.board[row][col] = this.currentPlayer;
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    },
    checkWinner() {
      const b = this.board;
      const lines = [
        // Rows
        [b[0][0], b[0][1], b[0][2]],
        [b[1][0], b[1][1], b[1][2]],
        [b[2][0], b[2][1], b[2][2]],
        // Columns
        [b[0][0], b[1][0], b[2][0]],
        [b[0][1], b[1][1], b[2][1]],
        [b[0][2], b[1][2], b[2][2]],
        // Diagonals
        [b[0][0], b[1][1], b[2][2]],
        [b[0][2], b[1][1], b[2][0]],
      ];

      for (let line of lines) {
        if (line[0] && line[0] === line[1] && line[1] === line[2]) {
          return line[0];
        }
      }
      return null;
    },
  };
}
```

##### الخطوة 4: شغّل الاختبار مرة أخرى

شغّل الاختبار:

```bash
npm test
```

ينبغي أن تنجح كل الاختبارات.

##### الخطوة 5: أعد الهيكلة

فكّر في نقل مصفوفة `lines` خارج الدالة إن لزم.

#### التحقق من التعادل

نحتاج إلى التحقق من انتهاء اللعبة بالتعادل.

##### الخطوة 1: اكتب الاختبار (الأحمر)

أضف إلى `tests/game.test.js`:

```javascript
describe('isDraw', () => {
  it('returns true when the board is full and there is no winner', () => {
    const game = createGame();
    game.board = [
      ['X', 'O', 'X'],
      ['X', 'O', 'O'],
      ['O', 'X', 'X'],
    ];
    expect(game.isDraw()).toBe(true);
  });

  it('returns false when the board is not full', () => {
    const game = createGame();
    game.board = [
      ['X', 'O', ''],
      ['X', '', 'O'],
      ['O', 'X', 'X'],
    ];
    expect(game.isDraw()).toBe(false);
  });

  it('returns false when there is a winner', () => {
    const game = createGame();
    game.board = [
      ['X', 'X', 'X'],
      ['O', 'O', ''],
      ['', '', ''],
    ];
    expect(game.isDraw()).toBe(false);
  });
});
```

##### الخطوة 2: شغّل الاختبار وشاهده يفشل

شغّل الاختبار:

```bash
npm test
```

خطأ: `isDraw` غير معرّفة.

##### الخطوة 3: اكتب أقل شيفرة تجعل الاختبار ينجح (الأخضر)

حدّث `src/game.js`:

```javascript
export function createGame() {
  return {
    // … previous code …
    isDraw() {
      if (this.checkWinner()) {
        return false;
      }
      for (let row of this.board) {
        if (row.includes('')) {
          return false;
        }
      }
      return true;
    },
  };
}
```

##### الخطوة 4: شغّل الاختبار مرة أخرى

شغّل الاختبار:

```bash
npm test
```

ينبغي أن تنجح كل الاختبارات.

##### الخطوة 5: أعد الهيكلة

لا حاجة إلى إعادة هيكلة فورية.

---

في هذه المرحلة، نكون قد نفّذنا منطق اللعبة الأساسي باستخدام التطوير المدفوع بالاختبارات.

### بناء واجهة المستخدم

الآن سننشئ واجهة مستخدم بسيطة باستخدام HTML وJavaScript.

#### إنشاء `index.html`

```html
<!-- src/index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Tic Tac Toe</title>
    <style>
      .board {
        display: grid;
        grid-template-columns: repeat(3, 100px);
        grid-gap: 5px;
      }
      .cell {
        width: 100px;
        height: 100px;
        font-size: 2em;
        text-align: center;
        line-height: 100px;
        border: 1px solid #000;
        cursor: pointer;
      }
      .disabled {
        pointer-events: none;
        background-color: #f0f0f0;
      }
      #message {
        margin-top: 20px;
        font-size: 1.2em;
      }
    </style>
  </head>
  <body>
    <h1>Tic Tac Toe</h1>
    <div class="board" id="board"></div>
    <div id="message"></div>
    <button id="reset">Reset Game</button>
    <script src="ui.js"></script>
  </body>
</html>
```

#### إنشاء `ui.js`

سنكتب شيفرة واجهة المستخدم بينما نكتب اختباراتها.

### اختبار واجهة المستخدم

سنستخدم **Vitest** مع **Testing Library** لاختبار واجهتنا.

#### تهيئة Testing Library

ثبّت الاعتمادات:

```bash
npm install --save-dev jsdom @testing-library/dom @testing-library/user-event @testing-library/jest-dom
```

حدّث `vitest.config.js`:

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setupTests.js',
  },
});
```

أنشئ `tests/setupTests.js`:

```javascript
import '@testing-library/jest-dom';
```

#### كتابة اختبارات واجهة المستخدم

أنشئ `tests/ui.test.js`:

```javascript
// tests/ui.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf8');

describe('Tic Tac Toe UI', () => {
  beforeEach(() => {
    document.body.innerHTML = html;
    require('../src/ui.js');
  });

  it('renders a 3x3 grid', () => {
    const cells = document.querySelectorAll('.cell');
    expect(cells.length).toBe(9);
  });

  it('allows players to take turns placing marks', async () => {
    const user = userEvent.setup();
    const cells = screen.getAllByRole('button');

    await user.click(cells[0]); // Player X
    expect(cells[0]).toHaveTextContent('X');

    await user.click(cells[1]); // Player O
    expect(cells[1]).toHaveTextContent('O');

    await user.click(cells[2]); // Player X
    expect(cells[2]).toHaveTextContent('X');
  });

  it('declares a winner when a player wins', async () => {
    const user = userEvent.setup();
    const cells = screen.getAllByRole('button');
    const message = screen.getByText('', { selector: '#message' });

    await user.click(cells[0]); // X
    await user.click(cells[3]); // O
    await user.click(cells[1]); // X
    await user.click(cells[4]); // O
    await user.click(cells[2]); // X wins

    expect(message).toHaveTextContent('Player X wins!');
  });

  it('declares a draw when the game ends without a winner', async () => {
    const user = userEvent.setup();
    const cells = screen.getAllByRole('button');
    const message = screen.getByText('', { selector: '#message' });

    // Fill the board to a draw
    const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
    for (let index of moves) {
      await user.click(cells[index]);
    }

    expect(message).toHaveTextContent("It's a draw!");
  });
});
```

#### تنفيذ شيفرة واجهة المستخدم لنجاح الاختبارات

حدّث `src/ui.js`:

```javascript
import { createGame } from './game.js';

const game = createGame();
const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset');

// Create cells
for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 3; col++) {
    const cell = document.createElement('button');
    cell.classList.add('cell');
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.setAttribute('aria-label', `Cell ${row},${col}`);
    boardElement.appendChild(cell);
  }
}

function updateBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    cell.textContent = game.board[row][col];
  });
}

function handleClick(event) {
  const cell = event.target;
  const row = cell.dataset.row;
  const col = cell.dataset.col;
  try {
    game.placeMove(row, col);
    updateBoard();
    const winner = game.checkWinner();
    if (winner) {
      messageElement.textContent = `Player ${winner} wins!`;
      disableBoard();
    } else if (game.isDraw()) {
      messageElement.textContent = "It's a draw!";
      disableBoard();
    }
  } catch (error) {
    // Ignore errors for occupied spots
  }
}

function disableBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.disabled = true;
    cell.classList.add('disabled');
  });
}

function resetGame() {
  game.board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  game.currentPlayer = 'X';
  messageElement.textContent = '';
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.disabled = false;
    cell.classList.remove('disabled');
    cell.textContent = '';
  });
}

const cells = document.querySelectorAll('.cell');
cells.forEach((cell) => {
  cell.addEventListener('click', handleClick);
});

resetButton.addEventListener('click', resetGame);
```

#### تشغيل الاختبارات

شغّل الاختبارات:

```bash
npm test
```

ينبغي أن تنجح كل الاختبارات إن كانت شيفرة واجهة المستخدم تنفّذ منطق اللعبة بشكل صحيح.

---

### الخلاصة

باتباع مبادئ التطوير المدفوع بالاختبارات، بنينا لعبة Tic Tac Toe فعّالة بمنطق لعبة وواجهة مستخدم معًا. كتبنا اختبارات وحدات لمنطق اللعبة واستخدمنا Testing Library لاختبار تفاعلات واجهة المستخدم، بما يضمن أن تطبيقنا موثوق ويتصرف كما هو متوقع.

**الخلاصات الرئيسية:**

- **سير عمل TDD:** كتابة الاختبارات أولًا تساعد في تعريف السلوك المتوقع وتؤدي إلى شيفرة أفضل تصميمًا.
- **Vitest للاختبار:** يوفر Vitest تجربة اختبار سريعة وحديثة لتطبيقات JavaScript.
- **Testing Library:** يتيح لنا استخدام Testing Library كتابة اختبارات تشبه طريقة تفاعل المستخدمين مع تطبيقنا.

### تمارين إضافية

لتعزيز لعبتك Tic Tac Toe ومهاراتك في الاختبار أكثر، فكّر في تنفيذ المزايا التالية:

1. **خصم ذكي** نفّذ لاعبًا آليًا يضع نقلات ضد اللاعب البشري. اكتب اختبارات لضمان أن الذكاء الاصطناعي يضع نقلات صحيحة.
  - نفّذ لاعبًا آليًا يضع نقلات ضد اللاعب البشري.
  - اكتب اختبارات لضمان أن الذكاء الاصطناعي يضع نقلات صحيحة.
2. **تتبّع النقاط** احتفظ بعدد الانتصارات لكل لاعب. اكتب اختبارات للتحقق من تحديث النقاط بشكل صحيح.
  - احتفظ بعدد الانتصارات لكل لاعب.
  - اكتب اختبارات للتحقق من تحديث النقاط بشكل صحيح.
3. **واجهة محسّنة** حسّن واجهة المستخدم بتنسيقات ورسوم متحركة أفضل. اضمن إمكانية الوصول باستخدام أدوار ARIA وتسميات مناسبة.
  - حسّن واجهة المستخدم بتنسيقات ورسوم متحركة أفضل.
  - اضمن إمكانية الوصول باستخدام أدوار ARIA وتسميات مناسبة.
4. **وظيفة التراجع** اسمح للاعبين بالتراجع عن نقلتهم الأخيرة. اكتب اختبارات لضمان إعادة حالة اللعبة بشكل صحيح.
  - اسمح للاعبين بالتراجع عن نقلتهم الأخيرة.
  - اكتب اختبارات لضمان إعادة حالة اللعبة بشكل صحيح.
5. **لعب جماعي عبر الإنترنت** نفّذ وظيفة لعب جماعي شبكية. اكتب اختبارات تكامل لمحاكاة عدة لاعبين.
  - نفّذ وظيفة لعب جماعي شبكية.
  - اكتب اختبارات تكامل لمحاكاة عدة لاعبين.
6. **تصميم متجاوب** اجعل اللعبة متجاوبة وقابلة للعب على أجهزة مختلفة. اختبر عناصر واجهة المستخدم على أحجام شاشات متنوعة.
  - اجعل اللعبة متجاوبة وقابلة للعب على أجهزة مختلفة.
  - اختبر عناصر واجهة المستخدم على أحجام شاشات متنوعة.
7. **لوحة المتصدرين** أضف لوحة متصدرين لعرض نقاط أفضل اللاعبين. اكتب اختبارات لضمان تخزين النقاط واسترجاعها بشكل صحيح.
  - أضف لوحة متصدرين لعرض نقاط أفضل اللاعبين.
  - اكتب اختبارات لضمان تخزين النقاط واسترجاعها بشكل صحيح.
8. **تحليل تغطية الاختبارات** ادمج تقارير تغطية الشيفرة مع Vitest. حلّل تقرير التغطية لتحديد مسارات الشيفرة غير المختبَرة.
  - ادمج تقارير تغطية الشيفرة مع Vitest.
  - حلّل تقرير التغطية لتحديد مسارات الشيفرة غير المختبَرة.
