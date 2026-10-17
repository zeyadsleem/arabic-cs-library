---
title: "استخدام المحمّلات (Loaders) لجلب البيانات"
---

تقدّم المحمّلات (loaders) في Storybook طريقة لتحميل البيانات أو تنفيذ إجراءات *قبل* تصيير القصة بشكل غير متزامن. ويمكن أن يكون هذا مفيدًا بشكل خاص عندما تحتاج إلى جلب بيانات مُحاكاة من API، أو تنفيذ مهام تهيئة، أو التلاعب بالخصائص أو القيم العامة (globals) ديناميكيًا بناءً على عوامل خارجية قبل عرض القصة. وكما في [المعاملات](https://stevekinney.com/courses/storybook/parameters)، يمكن تطبيق المحمّلات عالميًا لتؤثر في كل القصص أو محليًا لتؤثر في قصص بعينها.

## المحمّلات العالمية

تُعرَّف المحمّلات العالمية في `.storybook/preview.ts` وتُنفَّذ لكل قصة في Storybook لديك. وهي مفيدة بشكل خاص لإعداد سياقات على مستوى التطبيق أو جلب بيانات ذات صلة بكل المكوّنات.

لنقل إنك تريد جلب بيانات المستخدم وإتاحتها لكل القصص. قد نضيف شيئًا كهذا إلى `.storybook/preview.ts`:

```typescript
export const loaders = [
	async () => ({
		userData: await fetch('/api/user').then((res) => res.json()),
	}),
];

export const decorators = [
	(Story, context) => (
		<UserContext.Provider value={context.loaded.userData}>
			<Story />
		</UserContext.Provider>
	),
];
```

يجلب هذا المحمّل بيانات المستخدم بشكل غير متزامن ويمنحها لكل القصص عبر `UserContext.Provider`. وتُوصَل البيانات التي يجلبها المحمّل عبر `context.loaded` في المزيّنات أو دوال القصة.

## المحمّلات المحلية

تُعرَّف المحمّلات المحلية داخل القصص الفردية أو ملفات القصص. وتُستخدم لتحميل بيانات أو تنفيذ إجراءات خاصة بقصة واحدة أو بمجموعة قصص في الملف نفسه.

لنقل إن لديك مكوّن `ProfileCard` يحتاج إلى بيانات المستخدم:

```typescript
export default {
  title: 'Example/ProfileCard',
};

export const DefaultProfileCard = () => <ProfileCard />;

DefaultProfileCard.loaders = [
  async () => ({
    profileData: await fetch('/api/profile').then((res) => res.json()),
  }),
];

export const DefaultProfileCardStory = (args, { loaded: { profileData } }) => (
  <ProfileCard {...profileData} />
);
```

يجلب هذا المحمّل بيانات الملف الشخصي لقصة `DefaultProfileCard` وحدها، وتستخدم دالة القصة البيانات المحمَّلة لتصيير مكوّن `ProfileCard` بالبيانات المجلوبة.

## استخدام المحمّلات مع المزيّنات

يمكنك استخدام المحمّلات بالاشتراك مع المزيّنات لتغليف القصص ببيانات أو سياق إضافي يعتمد على تحميل بيانات غير متزامن.

### مثال: تغليف قصة ببيانات محمَّلة

```typescript
const meta = {
  title: 'Components/TaskList',
  component: TaskList,
  loaders: [
    async () => {
      const tasks = await fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
        res.json(),
      );
      return { tasks };
    },
  ],
  decorators: [
    (Story, { loaded }) => (
      <TaskListProvider tasks={loaded.tasks}>
        <Story />
      </TaskListProvider>
    ),
  ],
} as Meta<typeof TaskList>;
```
