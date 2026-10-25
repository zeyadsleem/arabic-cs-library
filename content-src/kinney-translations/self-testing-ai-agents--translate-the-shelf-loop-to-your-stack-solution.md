---
title: "الحل: نقل حلقة Shelf إلى مكدّسك التقني"
---

هذا المختبر ليس فيه شيفرة مشحونة. فيه *عملية* مشحونة — تنشئ ملف `LOOP_TRANSLATION.md` يضع لكل حلقة تغذية راجعة في Shelf ما يقابلها في مكدّسك التقني. والمُخرَج ملكك.

لكن «ضع لكل حلقة ما يقابلها في مكدّسك» من نوع التعليمات التي تُنتج إما شيئًا بالغ النفع وإما جدولًا مليئًا بالكلام المرسل، حسب ما إذا كنت قد رأيت مثالًا جيدًا. فإليك ترجمة مكتملة لمكدّس افتراضي من Next.js وPrisma وJest، يتبعها معايير الحكم لتقييم أي ترجمة — بما فيها ترجمتك.

## جولة على التجربة المتوقعة

### الترجمة المثال

تخيّل أنك تنقل حلقات Shelf إلى تطبيق Next.js 16 مع Prisma، وJest لاختبارات الوحدة، وPlaywright لاختبارات المتصفح، وGitHub Actions للتكامل المستمر. وهكذا يبدو ملف `LOOP_TRANSLATION.md` مكتملًا:

```markdown
# Loop Translation: Next.js + Prisma + Jest

## Agent instructions

- **Shelf:** `CLAUDE.md` in the repo root. Covers route protection, testing rules,
  locator hierarchy, database seeding, and forbidden patterns.
- **This stack:** `CLAUDE.md` in the repo root. Same idea. Covers API route
  authentication (check `getServerSession` in every `/api/*` handler), testing
  rules (Jest unit + Playwright browser), and forbidden patterns (no `any` in
  production code, no `getByTestId` when a role locator exists).
- **Exact path:** `CLAUDE.md`
- **Command:** N/A (read by agent, not executed)

## Unit and integration tests

- **Shelf:** Vitest, test files colocated as `<name>.test.ts`, run with
  `npm run test:unit`.
- **This stack:** Jest, test files colocated as `<name>.test.ts` under `__tests__/`
  directories, run with `npm test`.
- **Exact path:** `jest.config.ts`, `src/**/__tests__/*.test.ts`
- **Command:** `npm test`

## Browser-level verification

- **Shelf:** Playwright, specs in `tests/`, config in
  `playwright.config.ts`, run with `npm run test`.
- **This stack:** Playwright, specs in `e2e/`, config in `playwright.config.ts`,
  run with `npx playwright test`.
- **Exact path:** `playwright.config.ts`, `e2e/*.spec.ts`
- **Command:** `npx playwright test`

## Auth bootstrap

- **Shelf:** `tests/authentication.setup.ts` drives the login form once,
  saves storage state to `playwright/.authentication/user.json`. All authenticated
  specs inherit it via `storageState`.
- **This stack:** `e2e/global-setup.ts` calls the Auth.js `/api/auth/callback`
  endpoint directly to create a session, saves the cookies to
  `e2e/.auth/storage-state.json`. Playwright config references it in
  `use.storageState`.
- **Exact path:** `e2e/global-setup.ts`, `e2e/.auth/storage-state.json`
- **Command:** Runs automatically as part of `npx playwright test`

## Deterministic data reset

- **Shelf:** `resetShelfContent` in `tests/helpers/seed.ts`, built from
  `tests/data/*.json` and small server utilities like `createUser` and
  `createBook`. Resets books and ratings without touching users.
- **This stack:** `prisma/seed.ts` with a `resetTestData` function that truncates
  the `Book`, `Review`, and `Shelf` tables. Called via a test-only API route
  `/api/testing/reset` gated on `NODE_ENV=test`. User table untouched.
- **Exact path:** `prisma/seed.ts`, `src/app/api/testing/reset/route.ts`
- **Command:** `curl -X POST http://localhost:3000/api/testing/reset`

## Runtime probes

- **Shelf:** `tests/performance.spec.ts` checks runtime metrics.
  `scripts/check-performance-budgets.mjs` checks bundle size.
- **This stack:** No runtime probes yet. Lighthouse CI in the CI pipeline checks
  performance scores but there are no Playwright-based runtime assertions.
- **Exact path:** `.lighthouserc.js` (exists), runtime probe spec (missing)
- **Command:** `npx lhci autorun`

## Failure dossier artifacts

- **Completed Shelf loop:** after the dossier lab, `scripts/summarize-failure-dossier.ts`
  reads `playwright-report/report.json` and generates
  `playwright-report/dossier.md` with error, screenshot path, trace path, and
  reproduction command for every failing test.
- **This stack:** No dossier. Playwright HTML report exists but there's no structured
  summary an agent can read without opening a browser.
- **Exact path:** Missing. Proposed: `scripts/dossier.ts`
- **Command:** Missing. Proposed: `npm run dossier`

## Static layer

- **Shelf:** ESLint with custom rules banning `waitForTimeout`, raw `page.locator`,
  `waitForLoadState('networkidle')`, and reading `userId` from the request body.
  TypeScript strict mode. Knip for dead code. Prettier for formatting.
- **This stack:** ESLint with `@next/eslint-plugin-next`. TypeScript strict mode.
  Prettier. No custom lint rules for test patterns. No dead-code detection.
- **Exact path:** `eslint.config.mjs`, `tsconfig.json`
- **Command:** `npm run lint && npx tsc --noEmit`

## CI workflow

- **Shelf:** `.github/workflows/main.yml` runs typecheck, lint, Knip, unit tests,
  and Playwright on every PR.
- **This stack:** `.github/workflows/ci.yml` runs lint, type check, Jest, and
  Playwright. No dead-code check.
- **Exact path:** `.github/workflows/main.yml`
- **Command:** `npm run lint && npx tsc --noEmit && npm test && npx playwright test`

## Post-deploy smoke checks

- **Shelf:** `tests/smoke/post-deploy.spec.ts` with `playwright.smoke.config.ts`.
  Reads `SMOKE_BASE_URL` from env. `docs/post-deploy-playbook.md` documents
  rollback triggers.
- **This stack:** No post-deploy smoke. Vercel preview deployments exist but nothing
  tests them automatically.
- **Exact path:** Missing. Proposed: `e2e/smoke/post-deploy.spec.ts`,
  `playwright.smoke.config.ts`
- **Command:** Missing. Proposed:
  `SMOKE_BASE_URL=https://preview.example.com npx playwright test --config=playwright.smoke.config.ts`

## Review loop

- **Shelf:** `docs/review-loop-playbook.md` defines blocking/judgment/noise
  categories. `.cursor/BUGBOT.md` instructs Bugbot. Rule of three escalation.
- **This stack:** No written review policy. Copilot review is enabled but has no
  repository-specific instructions.
- **Exact path:** Missing. Proposed: `docs/review-loop-playbook.md`,
  `.github/copilot-instructions.md`
- **Command:** N/A (process, not executable)

## Weakest loop

**Failure dossier artifacts.** When a Playwright test fails in CI, the HTML report
uploads but nobody reads it because it requires opening a browser. There's no
structured summary an agent (or a human in a hurry) can scan in plain text. This
means every CI failure requires manual investigation to even understand _what_
failed, let alone _why_.

## First concrete improvement

Add `scripts/dossier.ts` that reads `playwright-report/report.json`, extracts the
failing test name, error message, screenshot path, and trace path, and writes a
`playwright-report/dossier.md`. Add `"dossier": "tsx scripts/dossier.ts"` to
`package.json`. Update the CI workflow to run `npm run dossier` after a failed
Playwright step and upload the dossier as an artifact alongside the HTML report.
```

هذا هو الشكل. في كل صف أربعة أجزاء: ما يفعله Shelf، وما يفعله المكدّس المستهدف، والمسار الدقيق، والأمر. وحيث يغيب شيء، يقول الصف «مفقود» ويقترح الملف أو الأمر المحدد الذي يسدّ الفجوة.

### ما يجعل هذا المثال مفيدًا

ليس المقصود تفاصيل Next.js — فتلك مجرد وسيلة. المقصود هو *الانضباط* في كتابة مسارات وأوامر دقيقة بدلًا من مفاهيم. «نستخدم Jest» ليست ترجمة. أما «`npm test` يشغّل `jest.config.ts` الذي يلتقط `src/**/__tests__/*.test.ts`» فهي ترجمة. والفرق أن النسخة الثانية شيء يستطيع الوكيل تنفيذه فعلًا.

تحديد الحلقة الأضعف هو الجزء الذي يتخطّاه معظم الناس، وهو الجزء الأكثر قيمة. فتسمية الحلقة الأضعف هي تسمية أول ما يجب إصلاحه. وإن لم تجعلك الترجمة غير مرتاح قليلًا بشأن فجوة محددة واحدة، فالأرجح أنك مررت عليها مرور الكرام.

## معايير الحكم

تكون ترجمتك جيدة عندما:

- **لكل حلقة في Shelf صف مقابل.** ليس «لا نحتاج تلك» — كل حلقة تحصل على صف، حتى لو قال الصف «مفقود. المقترح: …»
- **تظهر المسارات والأوامر الدقيقة في كل صف.** فإن قال صف «نستخدم ESLint» دون أن يقول أي ملف إعداد أو أي أمر، فليست ترجمة — بل انطباع.
- **الحلقات الغائبة صريحة لا مخفية.** «لا فحص دخان بعد النشر» عبارة مفيدة. أما الصمت في الموضوع فليس كذلك.
- **الحلقة الأضعف محددة ومسمّاة.** ليس «يمكننا تحسين عدة أشياء». حلقة واحدة. الأضعف. مسمّاة.
- **أول تحسين ملموس محدد بما يكفي لتنفيذه.** «أضف اختبارًا أفضل» عبارة لا يمكن تنفيذها. أما «أضف `scripts/dossier.ts` الذي يقرأ تقرير Playwright بصيغة JSON وينتج ملخّصًا نصيًا بسيطًا» فهي قابلة للتنفيذ.
- **أمر واحد على الأقل جرى تشغيله.** تشغيل `npm test` ورؤيته ينجح دليل حياة. أما عدم تشغيل أي شيء فخيال معماري.

والترجمة *ليست* جيدة حين تكون جدولًا متماثلًا تقول كل خلية فيه «الشيء نفسه». فإن كان مكدّسك يفعل فعلًا كل ما يفعله Shelf، فإما أنك محظوظ وإما أنك لا تنظر بترقّب كافٍ.

## قراءات إضافية

- [مختبر: انقل حلقة Shelf إلى مكدّسك التقني](https://stevekinney.com/courses/self-testing-ai-agents/lab-translate-the-shelf-loop-to-your-stack)
- [نقل حلقة Shelf إلى مكدّس آخر](https://stevekinney.com/courses/self-testing-ai-agents/porting-the-shelf-loop-to-another-stack)
