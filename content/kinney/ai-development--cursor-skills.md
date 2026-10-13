---
title: "Cursor Skills"
lang: en
source: "https://stevekinney.com/courses/ai-development/cursor-skills"
---

[Cursor Skills](https://cursor.com/docs/skills) package reusable agent behavior.
Use a skill when a workflow needs more than a short rule: steps, examples,
scripts, references, or assets.

## Folder Shape

A project skill can live under `.cursor/skills`:

```
.cursor/
  skills/
    release-check/
      SKILL.md
      scripts/
      references/
      assets/
```

Cursor also understands skills in `.agents/skills`, `.claude/skills`, and `.codex/skills`. That compatibility matters when a repository uses more than one
agent.

## Minimal Skill

```markdown
---
name: release-check
description: Verify package release readiness before publishing.
---

Read the package manifest, changelog, generated exports, and test commands.
Run the documented verification commands. Stop and report the exact blocker if a
command fails.
```

Keep the entrypoint short. Put long examples in `references/`, reusable commands
in `scripts/`, and visual or binary inputs in `assets/`.

## Rules Versus Skills

Use Rules for constraints:

```
Always add regression tests for bug fixes.
```

Use Skills for procedures:

```
Run the release readiness process and produce the shipping checklist.
```

If the instruction has phases, files to inspect, and a completion signal, it is
probably a skill.

## Skill Hygiene

Skills are executable context. Treat them like source code:

- Keep them versioned.
- Keep them small enough to review.
- Remove stale commands when the repository changes.
- Make verification commands explicit.
- Avoid copying vendor documentation that will drift.

The agent should be able to run the workflow from the filesystem, not from a
memory of a past chat.
