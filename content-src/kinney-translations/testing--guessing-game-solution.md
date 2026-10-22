---
title: "حل لعبة التخمين"
---

للبدء، نريد أن نتأكد من أننا نستطيع تثبيت القيمة المُعادة من `Math.random()` في مكانها كي نتمكن من الاختبار مقابلها.

```javascript
beforeEach(() => {
  vi.spyOn(Math, 'random').mockReturnValue(0.5);
});
```

نريد أيضًا أن نتأكد من أننا نعيد كل شيء بعد كل اختبار. هذا احترازي في معظمه. لكنه ممارسة جيدة. فلنفعل ذلك.

```javascript
afterEach(() => {
  vi.restoreAllMocks();
});
```

الآن، على الأرجح لن أحتفظ بهذا الاختبار. لكنه، لأغراضنا، يوضّح أن دالتنا تُحاكى بشكل صحيح.

```javascript
it('should have a secret number', () => {
  const game = new Game();
  expect(game.secretNumber).toBeTypeOf('number');
  expect(game.secretNumber).toBe(50); // This is the new part.
});
```

وبما أنه يمكننا الآن الاعتماد باطراد على بقاء الرقم السري ثابتًا، يمكننا اختبار بقية تنفيذنا.

```javascript
it('should return the correct response if the number is too low', () => {
  const game = new Game();
  expect(game.guess(49)).toBe('Too low!');
});

it('should return the correct response if the number is too low', () => {
  const game = new Game();
  expect(game.guess(51)).toBe('Too high!');
});

it('should return the correct response if the number is correct', () => {
  const game = new Game();
  expect(game.guess(50)).toBe('Correct! You guessed the number in 1 attempts.');
});

it('should return the correct response if the number is already guessed', () => {
  const game = new Game();
  game.guess(49);
  expect(game.guess(49)).toBe('You already guessed that number!');
});

it('should return the correct number of guesses made', () => {
  const game = new Game();

  game.guess(49);
  game.guess(51);
  game.guess(50);

  expect(game.guesses.size).toBe(3);
});
```

## مثال مكتمل

هذا هو الملف بأكمله إن أردت رؤية كل شيء في مكان واحد.

```javascript
import { it, expect, describe, vi, beforeEach, afterEach } from 'vitest';
import { Game } from './game';

describe('Game', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return an instance of a game', () => {
    // This is mostly a dummy test.
    const game = new Game();
    expect(game).toBeInstanceOf(Game);
  });

  it('should have a secret number', () => {
    // Thisn't really a useful test.
    // Do I *really* care about the type of the secret number?
    // Do I *really* care about the name of a "private" property?
    const game = new Game();
    expect(game.secretNumber).toBeTypeOf('number');
    expect(game.secretNumber).toBe(50);
  });

  it('should return the correct response if the number is too low', () => {
    const game = new Game();
    expect(game.guess(49)).toBe('Too low!');
  });

  it('should return the correct response if the number is too low', () => {
    const game = new Game();
    expect(game.guess(51)).toBe('Too high!');
  });

  it('should return the correct response if the number is correct', () => {
    const game = new Game();
    expect(game.guess(50)).toBe('Correct! You guessed the number in 1 attempts.');
  });

  it('should return the correct response if the number is already guessed', () => {
    const game = new Game();
    game.guess(49);
    expect(game.guess(49)).toBe('You already guessed that number!');
  });

  it('should return the correct number of guesses made', () => {
    const game = new Game();

    game.guess(49);
    game.guess(51);
    game.guess(50);

    expect(game.guesses.size).toBe(3);
  });
});
```
