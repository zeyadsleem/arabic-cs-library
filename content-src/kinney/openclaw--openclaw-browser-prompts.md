---
title: "OpenClaw Browser Prompts"
lang: "en"
chapter: "openclaw"
slug: "openclaw-browser-prompts"
order: 11
source: "https://stevekinney.com/courses/openclaw/openclaw-browser-prompts"
---

These prompts assume the browser is already set up. If you haven’t turned it on yet, start with [Setting Up and Using the Browser](https://stevekinney.com/courses/openclaw/browser-setup-and-use).

Here is an example prompt that you might consider:

```markdown
Open GitHub Trending at https://github.com/trending.

Find the 10 most interesting repositories related to AI agents, developer tooling, or automation.

For each repository:

- Open its repository page.
- Read its README.
- Check its recent activity and open issues.
- Determine what makes it interesting or technically distinctive.
- Identify potential shortcomings or limitations.

Rank the repositories by how useful they might be for someone building sophisticated AI agent workflows.

Produce a report containing a comparison table, links, and your top three recommendations.

Use the browser to navigate the actual GitHub interface. Don't substitute web search. Explain what you're doing as you navigate, and take screenshots of three interesting discoveries.
```

Here is what a run looks like. The browser panel on the right shows the agent on a repository’s releases page, while the chat on the left holds the comparison table and the top recommendation.

The Control UI chat with a comparison table of three trending repositories and a top recommendation, beside a browser side panel showing a GitHub releases page

Or, here is an even more fun one:

```markdown
You are a senior QA engineer evaluating a web application.

Open https://todomvc.com/examples/react/dist/.

Your task is to explore the application and discover its functionality without being given a test plan.

First, inspect the interface and identify the available features.

Then design and execute a comprehensive exploratory test plan using the browser.

Test:

- Creating tasks
- Editing existing tasks
- Completing and reopening tasks
- Filtering active and completed tasks
- Deleting tasks
- Clearing completed tasks
- Persistence across page reloads
- Keyboard interactions
- Edge cases involving empty input and unusual characters

For each test, record the expected behavior, observed behavior, and pass/fail result.
Capture screenshots of any unexpected behavior.

Finish with a QA report containing:

- Features discovered
- Tests executed
- Bugs or inconsistencies identified
- Reproduction steps for each issue
- Recommendations for improving the application

**Important**: Actually interact with the application using browser tools. Do not infer behavior from the source code or documentation. Never report a test as passing unless you executed it.
```
