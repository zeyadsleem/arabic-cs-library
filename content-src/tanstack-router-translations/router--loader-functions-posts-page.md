---
title: "دوالّ التحميل: صفحة المنشورات"
---

## ماذا سنتعلّم؟

في الدرس السابق مرّرنا إلى الموجّه سياقًا (context) مشتركًا يحمل `user` و`login` و`logout`، ولم نستعمل هذا السياق بعد في جلب أيّ بيانات. في هذا الدرس نبدأ الجلب: نضيف إلى مسار `/posts` دالّةَ تحميل (loader) تجلب قائمة المنشورات قبل أن يُصيَّر المكوّن، ثم نعرض ما جلبته في الصفحة.

ويمرّ الدرس بأربع خطوات: نتعرّف على دالّة التحميل وما تستقبله وما لا تستقبله، ثم على `beforeLoad` ودورها في إعادة التوجيه وفي بناء سياق خاصّ بالمسار، ثم نكتب طبقة بيانات صغيرة فوق واجهة `dummyjson` الوهمية، وأخيرًا نربطها بمسار `/posts` ونقرأ ناتجها في المكوّن بالخُطّاف `Route.useLoaderData()`.

## لماذا دالّة تحميل لا `useEffect`؟

في React جرت العادة أن تجلب البيانات داخل المكوّن بأثرٍ (`useEffect`) يعمل بعد التصيير. وTanStack Router يعطيك موضعًا أفضل: الخيار `loader` في تعريف المسار، وهو دالّة تُستدعى قبل التصيير وتعيد ما يحتاجه المسار من بيانات.

وقد ذكر المؤلف ثلاث فوائد لهذا الموضع:

1. البيانات تُطلب في أقرب وقت ممكن، فتكون جاهزة عند أول تصيير بدل أن تنتظر أثرًا يعمل بعد الرسم.
2. يمكن تحميلها مسبقًا (preloading) قبل أن تزور المسار أصلًا؛ وللموضوع درس لاحق.
3. تُخزَّن افتراضيًا في الذاكرة المؤقتة (cache)، ويمكنك التحكّم في سلوك هذه الذاكرة، ولذلك درس لاحق أيضًا.

## ما تستقبله دالّة التحميل وما لا تستقبله

تستقبل دالّة التحميل كائنًا واحدًا فيه ثلاث معلومات:

- `context`: سياق الموجّه، وفيه ما مرّرته من مسار الجذر وما تضيفه المسارات الأعلى.
- `params`: معاملات المسار (params) المقروءة من العنوان، مثل `postId` في `/posts/$postId`.
- معلومات عن المسار نفسه، من نوعه ومساره.

أما معاملات البحث (search params) فلا تصل إلى الدالّة. لو فكّكت الكائن وكتبت `search` لما وجدت له أثرًا. وسبب ذلك مؤجَّل إلى درس الترقيم، حيث نرى أنّه متعلّق بمفتاح الذاكرة المؤقتة وبالخيار `loaderDeps`.

## قبل التحميل: `beforeLoad`

إلى جانب `loader` يقبل تعريف المسار دالّةً أخرى اسمها `beforeLoad`، تعمل قبله. وللمؤلف فيها استعمالان:

- **إعادة التوجيه قبل كلّ شيء.** قد تحتاج، قبل تصيير المسار وقبل تحميل أيّ بيانات، إلى نقل المستخدم إلى مسار آخر؛ مثلًا زائرٌ لم يسجّل الدخول تريده أن يذهب إلى صفحة الدخول بدل أن يرى صفحة محميّة. و`beforeLoad` هو الموضع الطبيعي لهذا الفحص.
- **بناء سياق خاصّ بالمسار.** ما تعيده الدالّة من كائن يصير سياقًا لهذا المسار ولأبنائه، لا للتطبيق كلّه. وهذا امتدادٌ لما شرحناه في درس السياق: سياق الجذر متاح في كلّ مكان، وسياق المسار متاح له ولأبنائه فقط.

وسنرى الاستعمال الثاني عمليًّا بعد قليل، حين نضع دالّة `getPosts` في سياق مسار `/posts`.

## طبقة البيانات: `src/data/posts.ts`

قبل الربط نحتاج بيانات. يستعمل المؤلف واجهة `dummyjson` الوهمية التي تعيد منشورات وتعليقات جاهزة، ويكتب لها ملفًّا واحدًا في `src/data/posts.ts` فيه الأنواع (types) والدوالّ.

### الأنواع

```ts
type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};
type PostComment = {
  id: number;
  body: string;
  postId: number;
  userId: number;
};

type PostsResponse = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
};
type PostCommentsResponse = {
  comments: PostComment[];
  total: number;
  skip: number;
  limit: number;
};
```

الفكرة بسيطة: `Post` هو شكل المنشور كما تعيده الواجهة، وفيه `id` و`title` و`body` و`userId`؛ و`PostComment` شكل التعليق، وفيه `postId` الذي يربطه بمنشوره. والنوعان `PostsResponse` و`PostCommentsResponse` يغلّفان القائمة بمعلومات الترقيم: `total` و`skip` و`limit`. وقد اقتصر المؤلف على هذه الحقول وترك بقية ما تعيده الواجهة، لأنّها وحدها ما سيستعمله التطبيق.

### دوالّ الجلب

```ts
export async function getPosts(page = 1) {
  const res = await fetch(
    `https://dummyjson.com/posts?limit=10&skip=${page * 10}`
  );
  if (res.ok) {
    return (await res.json()) as PostsResponse;
  } else {
    throw new Error("Failed to fetch posts");
  }
}
export async function getPost(id: number) {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  if (res.ok) {
    return (await res.json()) as Post;
  } else {
    throw new Error("Failed to fetch post");
  }
}
export async function getPostComments(id: number) {
  const res = await fetch(`https://dummyjson.com/posts/${id}/comments`);
  if (res.ok) {
    return (await res.json()) as PostCommentsResponse;
  } else {
    throw new Error("Failed to fetch post comments");
  }
}
```

ثلاث دوالّ، كلّها تعمل بالطريقة نفسها: ترسل طلبًا بـ`fetch`، فإن كانت الاستجابة سليمة (`res.ok`) أعادت الناتج بعد تحويله من `JSON`، وإلّا رمت خطأً.

- `getPosts(page = 1)` تجلب صفحة من المنشورات: تثبّت الحجم بـ`limit=10` وتحسب نقطة البداية بـ`skip`. وفي هذا الفرع حُسب التخطّي بـ`page * 10`، فالصفحة الأولى تتخطّى أوّل عشرة منشورات؛ وسيُصحَّح ذلك في درس الترقيم إلى `(page - 1) * 10`.
- `getPost(id)` تجلب منشورًا واحدًا بمعرّفه.
- `getPostComments(id)` تجلب تعليقات منشور واحد.

## ربط المسار بالبيانات

الآن ننتقل إلى `src/routes/posts.index.tsx`، وهو مسار `/posts`. نستورد `getPosts`، ونضعها في سياق المسار عبر `beforeLoad`، ثم نستدعيها في `loader`:

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { getPosts } from "../data/posts";

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      getPosts: getPosts,
    };
  },
  loader: async ({ context }) => {
    const { getPosts } = context;
    const posts = await getPosts();
    return {
      posts: posts.posts,
    };
  },
});
```

ونقرأ التعريف بندًا بندًا:

- `beforeLoad` تعيد كائنًا فيه `getPosts`، فتصير الدالّة متاحة في `context` لهذا المسار ولأيّ مسار ابنٍ تحته. وليس لهذا التمرير كبير فائدة في مثالنا الصغير، لكنه النمط الذي تتبعه حين تشترك مسارات عدّة في دوالّ واحدة: تُعرَّف مرّةً وتُمرَّر عبر السياق.
- `loader` دالّة غير متزامنة (async) تفكّك `context` وتأخذ منه `getPosts`، ثم تنتظر نتيجتها. لاحظ أنّ الدالّة لا تستقبل أيّ وسيط هنا: لا `params` ولا `search`، لأنّ الصفحة تعرض الصفحة الأولى وحدها في هذا الدرس.
- الدالّة `getPosts` تعيد كائنًا فيه `posts` ومعلومات الترقيم، لكنّ الـloader لا يعيده كلّه: يعيد `{ posts: posts.posts }`، أي المصفوفة وحدها. وهذا اختيار مقصود: المكوّن لا يحتاج `total` ولا `skip` ولا `limit`، فلا داعي لحملها في بيانات التحميل.

وأثناء الكتابة ظهر خطأ في TypeScript سببه فاصلة ناقصة في الكائن المُعاد، وبعد إضافتها قبِل الملفّ.

## عرض المنشورات في المكوّن

بقي أن نقرأ البيانات في المكوّن. يعطيك المسار خُطّافًا مخصّصًا هو `Route.useLoaderData()` يعيد ما أعاده الـloader بأنواعه: `posts` هنا `Post[]`، فتحصل على الإكمال التلقائي وتحقّق الأنواع من دون تعريفٍ يدوي.

```tsx
function RouteComponent() {
  const { posts } = Route.useLoaderData();
  return (
    <div>
      Hello "/posts/"! <br />
      {posts.map((post) => (
        <div key={post.id}>
          <Link
            to={`/posts/$postId`}
            params={{ postId: String(post.id) }}
            className="underline font-bold text-lg"
          >
            {post.title}
          </Link>
        </div>
      ))}
      <br />
      <Link
        to="/posts/$postId"
        params={{
          postId: "434",
        }}
      >
        Go to Post
      </Link>
      <Link
        to="/posts/$postId"
        params={(prev) => ({ ...prev, postId: "34435" })}
      >
        Go to Post
      </Link>
    </div>
  );
}
```

وفي المكوّن أربعة أمور تستحقّ الوقوف:

- `Route.useLoaderData()` يعيد الكائن `{ posts }`، ومنه نفكّك `posts`.
- `posts.map` تبني عنصرًا لكلّ منشور، والمفتاح `key={post.id}` يثبّت هويّة العنصر في React.
- كلّ عنوان ملفوف بـ`Link` يشير إلى `/posts/$postId`، ويُمرَّر المعرّف في `params` بعد تحويله إلى نصّ بـ`String(post.id)`، لأنّ معاملات المسار نصوص دائمًا.
- `className` يضيف التسطير والخطّ العريض، وهو مجرّد تنسيق من `Tailwind`.

ويبقى في أسفل الملفّ رابطا `Go to Post` من درس التنقّل السابق، لم يُحذفا. والنقر على أيّ منشور ينقل إلى المسار `/posts/$postId` بمعرّف المنشور، حيث يعرض المسار المعرّف وحده؛ أمّا تحميل المنشور المفرد فمؤجَّل إلى درس لاحق، وهو ما ختم به المؤلف الفيديو. وقد ظهر بعد الحفظ خطأٌ في المتصفّح لم يلبث أن زال بتحديث الصفحة، ثم ظهرت القائمة كاملة.

## النتيجة

صار مسار `/posts` يجلب بياناته قبل التصيير: يمرّ `beforeLoad` فيضع `getPosts` في السياق، ثم يستدعيها الـloader ويعيد المصفوفة، فيجد المكوّن القائمة جاهزة عند أول رسم. ولم يبقَ في المكوّن أثرٌ (`useEffect`) ولا حالة انتظار تصنعها بنفسك؛ كلّ ذلك انتقل إلى طبقة المسار.

واللقطة التالية من فرع الدرس، وفيها القائمة كاملة تحت عنوان الصفحة: عشرة عناوين، كلٌّ منها رابط إلى صفحة منشوره، وأسفلها رابطان إضافيان من درس سابق:

![صفحة المنشورات في التطبيق: عنوان الصفحة ثم عشرة عناوين منشورات مسطّرة، وأسفلها رابطان إضافيان إلى صفحة المنشور](/images/tanstack-router/router--loader-functions-posts-page--posts.png)

## جرّب بنفسك

1. أضف `console.log(posts)` داخل الـloader قبل `return` وراقب في الطرفية شكل الكائن الكامل الذي تعيده `getPosts`، ثم قارنه بما يعيده الـloader.
2. اعرض حقلًا آخر من المنشور في القائمة، مثل `body` أو `userId`، ولاحظ أنّ TypeScript يعرف نوعه ويعرضه في الإكمال التلقائي.
3. احذف `beforeLoad` واستورد `getPosts` مباشرةً في أعلى الملفّ ثم استدعها داخل الـloader. ستعمل الصفحة نفسها؛ والفرق أنّ الدالّة لم تعد في سياق المسار، فلا يراها أيّ مسار ابن.
4. غيّر `page` الافتراضية في `getPosts` إلى `2` وأعد التحميل: ستنتقل القائمة إلى العشرة التالية، وهذا أوّل تلامسٍ مع الترقيم الذي يأتي في الدرس القادم.

## المراجع

- [فيديو الدرس: دوالّ التحميل — صفحة المنشورات](https://www.youtube.com/watch?v=8_sGz4DHwIA&t=7730s)
- [شيفرة الدرس: فرع `loaders-1` في مستودع الدورة](https://github.com/alialaa/tanstack-router-course/tree/loaders-1)
- [توثيق تحميل البيانات (Loader) في TanStack Router](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading)
- [توثيق سياق المسار (Context) في TanStack Router](https://tanstack.com/router/latest/docs/framework/react/guide/router-context)

---

> هذا الدرس شرحٌ عربيٌّ مُعاد صياغته عن درس «دوالّ التحميل: صفحة المنشورات» في دورة TanStack Router التي يقدّمها علي علاء؛ والشيفرة فيه من فرع `loaders-1` للمستودع الأصلي، وما زاده المترجم من شرحٍ أو توضيحٍ لا يُنسب إلى المؤلف، والروابط تشير إلى المصدر الرسمي.
