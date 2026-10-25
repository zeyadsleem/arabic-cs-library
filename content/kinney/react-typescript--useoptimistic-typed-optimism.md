---
title: "useOptimistic والتحديثات المتفائلة ذات الأنواع"
lang: ar
source: "https://stevekinney.com/courses/react-typescript/useoptimistic-typed-optimism"
---

يُتيح لك خطّاف `useOptimistic` في React إظهار تغذية راجعة فورية للمستخدمين بينما لا تزال أفعالهم قيد المعالجة على الخادم. فكّر في الأمر كإظهار زر «الإعجاب» وقد نُقر عليه بالفعل بينما لا يزال طلب API قيد الإرسال—يحصل المستخدمون على رضا فوري، وأنت تتعامل مع التعقيدات خلف الكواليس. لكن الأمر هنا: بدون نمذجة مناسبة بـ TypeScript، يمكن أن تتحول التحديثات المتفائلة بسرعة إلى كابوس في تصحيح الأخطاء عندما لا تتطابق ردود الخادم مع افتراضاتك.

لنستكشف كيفية بناء أنماط واجهة مستخدم متفائلة قوية وآمنة من حيث الأنواع، تتعامل برفق مع المسار السعيد، وأخطاء الشبكة، وكل ما بينهما.

## ما هي التحديثات المتفائلة؟

التحديثات المتفائلة (Optimistic Updates) هي نمط في واجهة المستخدم حيث تُظهر فورًا النتيجة المتوقعة لإجراء المستخدم، ثم تُطابِقها مع استجابة الخادم الفعلية بعد ذلك. بدلًا من عرض مؤشر التحميل أثناء انتظار الخادم، تفترض أن الإجراء سينجح وتُحدّث واجهة المستخدم وفقًا لذلك.

إليك سير العمل الأساسي:

1. يقوم المستخدم بإجراء ما (النقر على «إعجاب»، أو إرسال نموذج، أو حذف عنصر)
2. تُحدّث واجهة المستخدم فورًا كأن الإجراء قد نجح
3. يُرسل الطلب إلى الخادم في الخلفية
4. إذا نجح الطلب، تبقى الحالة المتفائلة كما هي
5. إذا فشل الطلب، تُعاد الحالة إلى ما كانت عليه وتُعرض رسالة خطأ

الفكرة الرئيسية هي أن معظم إجراءات المستخدم تنجح في معظم الأوقات. من خلال التحسين للحالة الشائعة، تُنشئ تجربة مستخدم أسرع.

## فهم خطّاف `useOptimistic`

يوفر خطّاف `useOptimistic` في React 19 تجريدًا نظيفًا لهذا النمط. يدير جزأين من الحالة: البيانات الفعلية والنسخة المتفائلة التي قد تختلف مؤقتًا.

```typescript
import { useOptimistic } from 'react';

function MyComponent() {
  const [likes, setLikes] = useState(42);
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (current, optimisticValue) => current + optimisticValue,
  );

  // optimisticLikes shows immediate updates
  // likes shows the confirmed server state
}
```

يأخذ الخطّاف معلمتين:

- **الحالة الحالية (Current state)**: الحالة الفعلية والمؤكدة من الخادم
- **دالة الاختزال (Reducer function)**: كيفية تطبيق التحديثات المتفائلة على تلك الحالة

## إعداد الأنواع للتحديثات المتفائلة

لنُنشئ نظام «إعجاب» بنمذجة مناسبة بـ TypeScript. أولًا، سنُعرّف الأنواع الأساسية:

```typescript
// Base types for our data
type Post = {
  id: string;
  title: string;
  content: string;
  likesCount: number;
  isLikedByUser: boolean;
};

// Actions that can be applied optimistically
type OptimisticLikeAction =
  { type: 'TOGGLE_LIKE'; postId: string } | { type: 'REVERT_LIKE'; postId: string };

// Server response types
type LikeResponse =
  | {
      success: true;
      likesCount: number;
      isLikedByUser: boolean;
    }
  | {
      success: false;
      error: string;
    };
```

لاحظ كيف نمذجنا كلًا من الإجراءات المتفائلة وردود الخادم المحتملة. هذا يمنحنا أمانًا أثناء الترجمة عند التعامل مع سيناريوهات مختلفة.

## بناء خطّاف متفائل آمن من حيث الأنواع

لنُنشئ خطّافًا قابلاً لإعادة الاستخدام يُغلّف منطق «الإعجاب» المتفائل:

```typescript
import { useOptimistic, useCallback, useState } from 'react';

function useOptimisticLikes(posts: Post[]) {
  const [error, setError] = useState<string | null>(null);

  const [optimisticPosts, addOptimisticAction] = useOptimistic(
    posts,
    (currentPosts, action: OptimisticLikeAction) => {
      return currentPosts.map((post) => {
        if (post.id !== action.postId) return post;

        switch (action.type) {
          case 'TOGGLE_LIKE':
            return {
              ...post,
              isLikedByUser: !post.isLikedByUser,
              likesCount: post.isLikedByUser ? post.likesCount - 1 : post.likesCount + 1,
            };

          case 'REVERT_LIKE':
            // This handles server failures by reverting optimistic changes
            return {
              ...post,
              isLikedByUser: !post.isLikedByUser,
              likesCount: post.isLikedByUser ? post.likesCount - 1 : post.likesCount + 1,
            };

          default:
            // TypeScript will error if we miss any action types
            const _exhaustive: never = action;
            return post;
        }
      });
    },
  );

  const toggleLike = useCallback(
    async (postId: string) => {
      setError(null);

      // Apply optimistic update immediately
      addOptimisticAction({ type: 'TOGGLE_LIKE', postId });

      try {
        const response = await fetch(`/api/posts/${postId}/like`, {
          method: 'POST',
        });

        const result: LikeResponse = await response.json();

        if (!result.success) {
          // Revert optimistic update on server error
          addOptimisticAction({ type: 'REVERT_LIKE', postId });
          setError(result.error);
        }

        // If successful, the server data will eventually update the posts array,
        // and useOptimistic will reconcile automatically
      } catch (networkError) {
        // Revert on network failure
        addOptimisticAction({ type: 'REVERT_LIKE', postId });
        setError('Network error. Please try again.');
      }
    },
    [addOptimisticAction],
  );

  return {
    posts: optimisticPosts,
    toggleLike,
    error,
  };
}
```

## التعامل مع حالة متفائلة معقّدة

بالنسبة للسيناريوهات الأكثر تعقيدًا، قد تحتاج إلى نمذجة أنواع متعددة من التحديثات المتفائلة. لنوسّع مثالنا ليتعامل مع التعليقات:

```typescript
type Comment = {
  id: string;
  postId: string;
  content: string;
  author: string;
  timestamp: Date;
};

type OptimisticCommentAction =
  | { type: 'ADD_COMMENT'; comment: Omit<Comment, 'id'> & { tempId: string } }
  | { type: 'REMOVE_OPTIMISTIC_COMMENT'; tempId: string }
  | { type: 'CONFIRM_COMMENT'; tempId: string; actualId: string };

// Extended post type with comments
type PostWithComments = Post & {
  comments: Comment[];
};
```

الفكرة الرئيسية هنا: نستخدم `tempId` للتعليقات المتفائلة و`actualId` بمجرد تأكيد الخادم لها. يتيح لنا هذا تتبّع التعليقات المؤكدة مقابل تلك قيد الانتظار:

```typescript
function useOptimisticComments(postsWithComments: PostWithComments[]) {
  const [optimisticPosts, addOptimisticAction] = useOptimistic(
    postsWithComments,
    (currentPosts, action: OptimisticCommentAction) => {
      switch (action.type) {
        case 'ADD_COMMENT': {
          return currentPosts.map((post) =>
            post.id === action.comment.postId
              ? {
                  ...post,
                  comments: [
                    ...post.comments,
                    {
                      id: action.comment.tempId, // Use tempId until confirmed
                      ...action.comment,
                    } as Comment,
                  ],
                }
              : post,
          );
        }

        case 'REMOVE_OPTIMISTIC_COMMENT': {
          return currentPosts.map((post) => ({
            ...post,
            comments: post.comments.filter((comment) => comment.id !== action.tempId),
          }));
        }

        case 'CONFIRM_COMMENT': {
          return currentPosts.map((post) => ({
            ...post,
            comments: post.comments.map((comment) =>
              comment.id === action.tempId ? { ...comment, id: action.actualId } : comment,
            ),
          }));
        }
      }
    },
  );

  const addComment = useCallback(
    async (postId: string, content: string, author: string) => {
      const tempId = `temp-${Date.now()}-${Math.random()}`;

      // Optimistically add the comment
      addOptimisticAction({
        type: 'ADD_COMMENT',
        comment: {
          postId,
          content,
          author,
          timestamp: new Date(),
          tempId,
        },
      });

      try {
        const response = await fetch(`/api/posts/${postId}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, author }),
        });

        if (response.ok) {
          const { id } = await response.json();
          // Convert the temporary comment to a real one
          addOptimisticAction({
            type: 'CONFIRM_COMMENT',
            tempId,
            actualId: id,
          });
        } else {
          throw new Error('Failed to post comment');
        }
      } catch (error) {
        // Remove the failed optimistic comment
        addOptimisticAction({
          type: 'REMOVE_OPTIMISTIC_COMMENT',
          tempId,
        });
      }
    },
    [addOptimisticAction],
  );

  return { posts: optimisticPosts, addComment };
}
```

## المطابقة مع حالة الخادم

أحد أصعب جوانب التحديثات المتفائلة هو التعامل مع المطابقة عندما تتغير حالة الخادم. تحتاج إلى توخي الحذر بشأن كيفية دمج الحالة المتفائلة مع بيانات الخادم الجديدة.

إليك نمط للتعامل مع هذا باستخدام React Query أو SWR:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function PostsWithOptimisticUpdates() {
  const queryClient = useQueryClient();

  // Server state
  const { data: serverPosts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  // Optimistic state built on top of server state
  const { posts: optimisticPosts, toggleLike } = useOptimisticLikes(serverPosts);

  const likeMutation = useMutation({
    mutationFn: (postId: string) => likePost(postId),
    onSuccess: () => {
      // Refetch to ensure we have the latest server state
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return (
    <div>
      {optimisticPosts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          onLike={() => toggleLike(post.id)}
        />
      ))}
    </div>
  );
}
```

> **نصيحة**
>
> عند تحديث بيانات الخادم، يُطابِق `useOptimistic` تلقائيًا عن طريق تطبيق أي إجراءات متفائلة معلّقة على حالة الخادم الجديدة. وهذا يعني أن تحديثاتك المتفائلة «تلتصق» حتى تُلغى صراحةً.

## أنماط معالجة الأخطاء

تتطلب التحديثات المتفائلة القوية معالجة مدروسة للأخطاء. إليك بعض الأنماط التي تعمل جيدًا:

### التدهور الرشيق

```typescript
function useResilientOptimisticUpdates<T, A>(
  serverState: T,
  reducer: (state: T, action: A) => T,
  options: {
    onError?: (error: Error, action: A) => void;
    maxRetries?: number;
  } = {},
) {
  const [optimisticState, addOptimisticAction] = useOptimistic(serverState, reducer);
  const [errors, setErrors] = useState<Map<string, Error>>(new Map());

  const performOptimisticAction = useCallback(
    async (
      action: A,
      apiCall: () => Promise<void>,
      actionId: string = Math.random().toString(),
    ) => {
      // Clear any previous errors for this action
      setErrors((prev) => {
        const next = new Map(prev);
        next.delete(actionId);
        return next;
      });

      // Apply optimistic update
      addOptimisticAction(action);

      try {
        await apiCall();
      } catch (error) {
        // Store the error and revert the action
        setErrors((prev) => new Map(prev).set(actionId, error as Error));
        options.onError?.(error as Error, action);

        // You might apply a revert action here depending on your setup
      }
    },
    [addOptimisticAction, options],
  );

  return {
    state: optimisticState,
    performOptimisticAction,
    errors,
    hasErrors: errors.size > 0,
  };
}
```

### منطق إعادة المحاولة

بالنسبة للإجراءات الحرجة، قد ترغب في إعادة المحاولة تلقائيًا:

```typescript
async function withRetry<T>(operation: () => Promise<T>, maxRetries = 3, delay = 1000): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries) break;

      // Exponential backoff
      await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, attempt)));
    }
  }

  throw lastError!;
}
```

## اختبار التحديثات المتفائلة

يتطلب اختبار السلوك المتفائل محاكاة سيناريوهات النجاح والفشل:

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

describe('OptimisticLikes', () => {
  it('shows immediate feedback on like', async () => {
    const mockLikePost = vi.fn().mockResolvedValue({ success: true });

    render(<PostWithLikes onLike={mockLikePost} initialLikes={5} />);

    const likeButton = screen.getByRole('button', { name: /like/i });

    // Should show optimistic update immediately
    fireEvent.click(likeButton);
    expect(screen.getByText('6 likes')).toBeInTheDocument();

    // Server call should happen
    await waitFor(() => {
      expect(mockLikePost).toHaveBeenCalled();
    });
  });

  it('reverts on server failure', async () => {
    const mockLikePost = vi.fn().mockRejectedValue(new Error('Server error'));

    render(<PostWithLikes onLike={mockLikePost} initialLikes={5} />);

    const likeButton = screen.getByRole('button', { name: /like/i });

    fireEvent.click(likeButton);
    expect(screen.getByText('6 likes')).toBeInTheDocument();

    // Should revert after server failure
    await waitFor(() => {
      expect(screen.getByText('5 likes')).toBeInTheDocument();
    });

    // Should show error message
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

## اعتبارات من العالم الواقعي

عند تنفيذ التحديثات المتفائلة في تطبيقات الإنتاج، ضع هذه الأنماط في الاعتبار:

### حل التضارب

عندما يُعدّل مستخدمون متعددون نفس البيانات في الوقت نفسه، تحتاج إلى استراتيجيات للتعامل مع التضارب:

```typescript
type ConflictResolution = 'server-wins' | 'client-wins' | 'merge' | 'prompt-user';

function resolveOptimisticConflict<T>(
  serverVersion: T,
  optimisticVersion: T,
  strategy: ConflictResolution,
): T {
  switch (strategy) {
    case 'server-wins':
      return serverVersion;

    case 'client-wins':
      return optimisticVersion;

    case 'merge':
      // Custom merge logic based on your data structure
      return { ...serverVersion, ...optimisticVersion };

    case 'prompt-user':
      // Show a UI dialog for manual resolution
      throw new ConflictError(serverVersion, optimisticVersion);

    default:
      const _exhaustive: never = strategy;
      return serverVersion;
  }
}
```

### اعتبارات عرض النطاق الترددي

بالنسبة للمستخدمين على اتصالات بطيئة، فكر في تجميع التحديثات المتفائلة:

```typescript
function useBatchedOptimisticUpdates<T>(
  batchWindow = 500, // ms
) {
  const [pendingActions, setPendingActions] = useState<T[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const addAction = useCallback(
    (action: T) => {
      setPendingActions((prev) => [...prev, action]);

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout to flush batch
      timeoutRef.current = setTimeout(() => {
        flushPendingActions();
      }, batchWindow);
    },
    [batchWindow],
  );

  // Implementation details for flushing...
}
```

### سهولة الوصول

لا تنسَ الإعلان عن تغيّرات الحالة المتفائلة لقارئات الشاشة:

```typescript
function useOptimisticAnnouncements() {
  const announce = useCallback((message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only'; // Screen reader only
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Clean up after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  return { announce };
}
```

## الخاتمة

يمكن للتحديثات المتفائلة باستخدام `useOptimistic` أن تحسّن بشكل كبير الأداء الظاهر، لكنها تتطلب نمذجة مدروسة بـ TypeScript للتعامل مع الحالات الاستثنائية برفق. المبادئ الرئيسية التي يجب تذكّرها:

1. **نمذج إجراءاتك صراحةً** باستخدام اتحادات مميّزة
2. **خطّط للفشل** بآليات التراجع
3. **اختبر المسار السعيد ومسار الفشل** بدقة
4. **فكّر في المطابقة** عند تحديث حالة الخادم
5. **تعامل مع التضاربات** بين الحالة المتفائلة وحالة الخادم

عندما تُنفّذ بحكمة، تُنشئ التحديثات المتفائلة واجهات سريعة الاستجابة بشكل رائع تشعر المستخدمين بأنها فورية، مع الحفاظ على سلامة البيانات خلف الكواليس. تضمن شبكة الأمان من TypeScript اكتشاف الحالات الاستثنائية أثناء الترجمة بدلًا من الإنتاج—لأنّه لا شيء يُفسد تجربة التفاؤل مثل خطأ وقت التشغيل.

تتوسّع الأنماط التي استكشفناها هنا من أزرار «الإعجاب» البسيطة إلى سيناريوهات التحرير التعاوني المعقّدة. ابدأ بالأساسيات، وأضف التعقيد عند الحاجة، وتذكّر دائمًا: التفاؤل رائع، لكن قليلًا من التخطيط المتشائم يقطع شوطًا طويلًا.
