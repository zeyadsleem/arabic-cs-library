---
title: "Lab"
lang: "en"
chapter: "self-testing-ai-agents"
slug: "lab-add-cross-browser-coverage"
order: 83
source: "https://stevekinney.com/courses/self-testing-ai-agents/lab-add-cross-browser-coverage"
---

This lab takes the abstract advice and turns it into an actual Playwright layout the agent can run without melting the fast loop.

> **Prerequisite**
>
> Complete [Cross-Browser Validation Without Burning the Dev Loop](https://stevekinney.com/courses/self-testing-ai-agents/cross-browser-validation-without-burning-the-dev-loop) first. This lab assumes you are deliberately *not* putting the full suite on every browser.

## The task

Add Firefox and WebKit coverage to a tagged smoke subset in Shelf while keeping Chromium as the default local and pull-request browser.

## Step 1: add browser projects

Update `playwright.config.ts` in Shelf so it defines projects for:

- Chromium
- Firefox
- WebKit

Keep Chromium as the default project you run most often.

The lesson’s **The Playwright projects that split the work** section in [Cross-Browser Validation Without Burning the Dev Loop](https://stevekinney.com/courses/self-testing-ai-agents/cross-browser-validation-without-burning-the-dev-loop) has a complete multi-project configuration block for Shelf. On the current starter, the smallest practical version is:

- `chromium` for your normal local loop
- `firefox-smoke` for the tagged public smoke subset
- `webkit-smoke` for the tagged public smoke subset

If you’ve already built `setup` and `authenticated` projects in the earlier auth labs, keep those in Chromium too. The key trick is that the default `test` script explicitly runs only the fast Chromium project, so Firefox and WebKit stay out of the everyday loop.

Before you can actually *run* the new projects locally, install the alternate browsers Playwright did not pull down when you set up the fast loop:

```bash
npx playwright install --with-deps firefox webkit
```

The lesson’s **Install the extra browsers first** callout explains why this is required (Playwright defaults to Chromium-only). Do this once per machine; CI runners will need it too — the nightly workflow you build in the next lab should run the same line before the test step for that reason.

## Step 2: tag the smoke subset

Pick a small set of tests and tag them for cross-browser execution.

Good candidates:

- the starter `tests/smoke.spec.ts`
- the public `tests/playground.spec.ts` file if you built it in the locator lab
- one form flow
- one modal or drawer interaction

The lesson’s **Tag the right tests, not all the tests** section shows the Playwright tag syntax — `test('...', { tag: '@cross-browser' }, async ({ page }) => {...})` — and the matching `--grep @cross-browser` CLI invocation. Use that pattern directly. The simplest current Shelf shape is to tag the tests in `tests/smoke.spec.ts` and let the Firefox and WebKit projects match only that tagged subset.

## Step 3: add focused commands

Expose commands like these:

```json
{
  "scripts": {
    "test": "playwright test --project=chromium",
    "test:cross-browser": "playwright test --grep @cross-browser --project=chromium --project=firefox-smoke --project=webkit-smoke"
  }
}
```

The exact script names can vary. The split should not.

## Step 4: keep the artifacts browser-specific

If your Playwright config or CI job uploads traces and screenshots, make sure the browser name is visible in the artifact path or job name.

You want failures to read like this:

- Firefox failed on the login smoke test
- WebKit failed on the modal focus smoke test

Not this:

- some browser failed somewhere, good luck

## Step 5: verify the split

Run both commands:

- the default Chromium loop
- the cross-browser smoke loop

Then intentionally break something that one alternate browser is likely to care about:

- a focus-management assertion
- a layout-sensitive selector
- a form-control behavior

You are not trying to produce a fake “Safari bug.” You are checking that the workflow can make a browser-specific failure legible.

## Acceptance criteria

- Shelf defines Chromium, Firefox, and WebKit Playwright projects
- Chromium remains the default fast browser command
- A tagged smoke subset exists for cross-browser coverage
- A named command runs the cross-browser smoke subset across all three browser projects
- Browser-specific artifacts or job names make failures easy to distinguish
- The default Chromium command still works without pulling the full multi-browser matrix into every run

## Troubleshooting

- If the cross-browser set is slow, cut the test list before you optimize the infrastructure.
- If the same test is flaky in every browser, you do not have a browser problem. You have a waiting or determinism problem.
- If WebKit behaves differently, treat that as signal first. You can decide later whether it is a product bug, a browser quirk, or a test assumption.

## Stretch goals

- Run the cross-browser smoke subset only on pull requests touching UI paths.
- Add one browser-specific reproduction command to `CLAUDE.md`.
- Store a short note in the repository listing which routes have earned cross-browser smoke coverage and why.

## The one thing to remember

The win here is not “we run more browsers.” The win is “we run the right browsers against the right tests without making the fast loop unusable.”

## Additional Reading

- [Solution](https://stevekinney.com/courses/self-testing-ai-agents/add-cross-browser-coverage-solution)
- [Cross-Browser Validation Without Burning the Dev Loop](https://stevekinney.com/courses/self-testing-ai-agents/cross-browser-validation-without-burning-the-dev-loop)
- [Nightly Verification Loops](https://stevekinney.com/courses/self-testing-ai-agents/nightly-verification-loops)
