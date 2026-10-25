---
title: "استخدام المزيّنات (Decorators) للسياق"
lang: ar
source: "https://stevekinney.com/courses/storybook/decorators"
---

تتيح لك المزيّنات (decorators) تغليف المكوّن في قصتك بمكوّن آخر. وهذا مفيد في جملة من الحالات.

- أنت تستخدم React ومكوّنك يتوقع أن يُغلَّف في [مزوّد سياق](https://react.dev/learn/passing-data-deeply-with-context#step-3-provide-the-context).
- تريد تغليف مكوّن ابن داخل مكوّن أب (مثلًا: أنت تصيّر مكوّن عنصر قائمة، لكنك تريد تغليف كل منها في مكوّن القائمة).
- تريد إضافة بعض العلامات الإضافية (markup) حول المكوّن نفسه. و[التوثيق الرسمي يستخدم مثال إضافة بعض الهامش](https://storybook.js.org/docs/writing-stories/decorators#wrap-stories-with-extra-markup) حول المكوّن.

وإضافة إلى ذلك، يستخدم [`@storybook/addons-themes`](https://storybook.js.org/addons/@storybook/addon-themes/) المزيّنات لتطبيق السمات على قصصك.

## إعادة تهيئة منطقة النص لدينا

لنتخيل أن لدينا قائمة مهام تعتمد على Context API.

يمكننا إضافة ما يلي إلى قصتنا أو إلى الميتا (meta):

```typescript
const meta = {
  title: 'Components/TaskList',
  component: TaskList,
  decorators: [
    (Story) => (
      <TaskListProvider
        tasks={[
          { id: '1', title: 'Task 1', completed: false },
          { id: '2', title: 'Task 2', completed: true },
        ]}
      >
        <Story />
      </TaskListProvider>
    ),
  ],
} as Meta<typeof TaskList>;
```
