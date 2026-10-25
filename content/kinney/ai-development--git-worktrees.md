---
title: "أشجار عمل Git"
lang: ar
source: "https://stevekinney.com/courses/ai-development/git-worktrees"
---

تتيح [أشجار عمل Git](https://git-scm.com/docs/git-worktree) لمستودع واحد أن يملك عدة أدلة عمل مُستخرَجة عند فروع مختلفة. وهي مفيدة مع الوكلاء لأن الوكلاء يُنتجون تغييرات في الملفات، وتغييرات الملفات تحتاج إلى عزل.

## لماذا تساعد أشجار العمل

استخدم أشجار العمل عندما:

- تريد تشغيل تجربتين لوكيلين بالتوازي.
- يجب ألّا يلمس وكيل سحابي أو وكيل سطر أوامر شجرة عملك الرئيسية.
- تحتاج فرعًا نظيفًا للمراجعة بينما يستمر العمل المحلي في مكان آخر.
- تريد مقارنة مسارَي تنفيذ دون استخدام stash.

## الأوامر الأساسية

```bash
git worktree add ../project-feature feature/agent-experiment
git worktree list
git worktree remove ../project-feature
```

شغّل الوكيل من داخل شجرة العمل:

```bash
cd ../project-feature
claude
```

أو:

```bash
agent
```

## انضباط المراجعة

تعزل شجرة العمل الملفات. لكنها لا تُثبت الصحّة. قبل دمج العمل القادم من أي فرع أنشأه وكيل:

```bash
git status --short
git diff
bun run lint
bun run test:unit
```

استخدم أشجار العمل لجعل العمل المتوازي قابلًا للمراجعة، لا لتجنّب المراجعة.
