---
title: "قاعدة البيانات"
lang: ar
chapter: concepts
slug: database
order: 26
source: https://better-auth.com/docs/concepts/database
---

# قاعدة البيانات (/docs/concepts/database)

تعرّف على محوّلات قواعد البيانات، والترحيلات، والتخزين الثانوي باستخدام Redis، والمخطط الأساسي (user وsession وaccount وverification)، والجداول المخصّصة، وتوسيع المخططات، وتوليد المعرّفات، وخطافات قاعدة البيانات، ومخططات الإضافات.

## المحوّلات

يتصل Better Auth بقاعدة بيانات لتخزين البيانات. ستُستخدم قاعدة البيانات لتخزين بيانات مثل المستخدمين والجلسات وغيرها. كما يمكن للإضافات تعريف جداول قاعدة بيانات خاصة بها لتخزين البيانات.

يمكنك تمرير اتصال قاعدة بيانات إلى Better Auth عبر تمرير مثيل قاعدة بيانات مدعوم في خيارات database. يمكنك التعرّف على المزيد حول محوّلات قواعد البيانات المدعومة في وثائق [Other relational databases](https://better-auth.com/docs/adapters/other-relational-databases).

::: {note}
يعمل Better Auth أيضًا دون أي قاعدة بيانات. لمزيد من التفاصيل، راجع [Stateless Session Management](https://better-auth.com/docs/concepts/session-management#stateless-session-management).
:::

## CLI

يأتي Better Auth مزوّدًا بأداة CLI لإدارة ترحيلات قاعدة البيانات وتوليد المخطط.

### تشغيل الترحيلات

تفحص CLI قاعدة بياناتك وتطالبك بإضافة الجداول المفقودة أو تحديث الجداول الموجودة بأعمدة جديدة. هذا مدعوم فقط لمحوّل Kysely المدمج. بالنسبة إلى المحوّلات الأخرى، يمكنك استخدام الأمر `generate` لإنشاء المخطط ومعالجة الترحيل عبر ORM لديك.
