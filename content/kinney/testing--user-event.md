---
title: "FireEvent vs UserEvent in Testing"
lang: en
source: "https://stevekinney.com/courses/testing/user-event"
---

`fireEvent` is useful for—umm—firing events, but generally speaking there is more to a user interaction than just one event. [Consider the list of events](https://stevekinney.com/courses/testing/fire-event-events) that `fireEvent` supports. that `fireEvent` supports. Let’s look at an over-simplified list of what happens when a user types into an `input` field:

- The user might click to focus on the field (`click`, `focus`).
- They might press a key (`keydown`, `keypress`).
- They’ll probably release that key (`keyup`).
- That’ll trigger a `change` event on the input field.

That’s not even all of it. But, you get the point. The idea is that we want to simulate what an actual user will do as opposed to getting too in the weeds about the events that the browser is firing on our behalf.

In *most* cases, you’ll want to prefer using [`@testing-library/user-event`](https://www.npmjs.com/package/@testing-library/user-event) over the built-in `fireEvent`.

Let’s take it for a spin with that `counter.test.ts` file that we were looking at earlier:

```typescript
test('it should increment with the "Increment" button is pressed', () => {
  render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  fireEvent.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});
```

## Using `userEvent`

Our first attempt might be something like this:

```typescript
test('it should increment with the "Increment" button is pressed', () => {
  const user = userEvent.setup();
  render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});
```

This test will fail. But, why?

The problem is that `user.click()` returns a `Promise`, so we need to make our test function `async`. Luckily, that’s an easy problem to solve:

```typescript
test('it should increment with the "Increment" button is pressed', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});
```

## Additional Hype for `user-event`

You might not be totally sold on `user-event` just yet, but it comes with a bunch of other goodies that would be otherwise hard to emulate by hand. For example, let’s say you wanted to emulate a user pressing and holding the left shift key:

```typescript
const user = userEvent.setup();

await user.keyboard('[<ShiftLeft>]'); // Press Shift (without releasing it)
await user.click(element); // Perform a click with `shiftKey: true`
```

(**Source**: [`user-event` documentation](https://testing-library.com/docs/user-event/setup#starting-a-session-per-setup))

> **Accident Counter with User Event**
>
> You can take a look at a sollution for the Accident Counter example [using user event](https://stevekinney.com/courses/testing/accident-counter-with-user-event).
