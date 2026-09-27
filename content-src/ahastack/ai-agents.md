---
title: "حزمة AHA للوكلاء الذكيين"
lang: en
---

Most code today gets written with an AI agent in the loop. Agents know React very well. They know htmx a bit less, htmx 4 even less, and they tend to reach for a JSON API and a `fetch()` call out of habit.

So I wrote down the rules of the stack in a format agents can read. It’s a skill: a Markdown file with the mental model, the Astro specifics, the htmx 4 attributes and how they differ from htmx 2, the htmx/Alpine split, and the patterns from the [demos](https://demo.ahastack.dev).

You can read it here: [https://ahastack.dev/skill.md](https://ahastack.dev/skill.md)

## Install it

[Section titled “Install it”](#install-it)

If you use the Skills CLI (works with Cursor, Claude Code, Codex, and others):

Terminal window

```sh
npx skills add flaviocopes/ahastack.dev@aha-stack
```

Or copy the file by hand into your agent’s skills folder:

Terminal window

```sh
mkdir -p .cursor/skills/aha-stack
curl -o .cursor/skills/aha-stack/SKILL.md https://ahastack.dev/skill.md
```

For Claude Code use `.claude/skills/aha-stack/SKILL.md`. For Codex use `.agents/skills/aha-stack/SKILL.md`.

Once installed, the agent loads it when you mention htmx, Alpine, or the AHA stack.

## Or add it to AGENTS.md

[Section titled “Or add it to AGENTS.md”](#or-add-it-to-agentsmd)

If you’d rather not install anything, paste this into your project’s `AGENTS.md` (or `CLAUDE.md`). It’s the short version.

```markdown
## Stack

This is an AHA stack app: Astro (output: 'server') + htmx 4 + Alpine.js 3.
Full rules: https://ahastack.dev/skill.md

- The server owns the state. Endpoints return HTML fragments, never JSON.
- Fragments are `.astro` files under `src/pages/api/` with `export const partial = true`.
- htmx for anything that talks to the server. Alpine for UI-only state (open, editing, hover).
- One `.astro` component renders a piece of UI both on page load and inside an htmx response.
- htmx 4: attributes do not inherit (use `:inherited`), 4xx/5xx responses are swapped,
  oob-only responses skip the main swap, events are `htmx:after:request` style.
- Alpine directives need an `x-data` ancestor. Never keep app data in `x-data`.
- Read-modify-write goes in one SQL statement (`UPDATE ... RETURNING`).
- Astro 7 collapses newlines between text and inline tags. Keep such paragraphs on one line.
```

The [demo project](https://github.com/flaviocopes/ahastack.dev/tree/main/demo) has an `AGENTS.md` you can look at as an example.

## Why a skill and not a longer AGENTS.md

[Section titled “Why a skill and not a longer AGENTS.md”](#why-a-skill-and-not-a-longer-agentsmd)

`AGENTS.md` loads on every turn. A skill loads only when it’s relevant. The skill is about 250 lines. That’s a lot to carry around when you’re fixing a CSS bug.

The snippet above is the part worth loading every time. The skill is the part worth loading when the agent is about to write an htmx endpoint.

## Agents that browse the site

[Section titled “Agents that browse the site”](#agents-that-browse-the-site)

There’s also an [llms.txt](https://ahastack.dev/llms.txt) at the site root. It’s a map of the site for agents: the skill first, then the docs pages and the demos with a line on each. An agent that lands on ahastack.dev and knows the convention finds the skill on its own.

## Keeping it current

[Section titled “Keeping it current”](#keeping-it-current)

The skill lives in the [site repository](https://github.com/flaviocopes/ahastack.dev/blob/main/skills/aha-stack/SKILL.md). When htmx or Astro change something that matters, the skill changes with them. If you installed it with the Skills CLI, `npx skills update` pulls the new version.
