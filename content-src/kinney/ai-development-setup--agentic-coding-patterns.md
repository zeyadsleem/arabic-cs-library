---
title: "Agentic Coding Patterns"
lang: "en"
chapter: "ai-development-setup"
slug: "agentic-coding-patterns"
order: 24
source: "https://stevekinney.com/courses/ai-development-setup/agentic-coding-patterns"
---

By this point in the course, you’ve seen most of the pieces: skills, subagents, hooks, loops, worktrees. A *pattern* is a known-good way of putting those pieces together to solve a problem that keeps coming up. “Have a second agent review the diff without seeing the conversation” is a pattern. So is “never let a quality measure move backwards.”

I keep a library of about seventy patterns, and most are variations on a much smaller set of ideas. These fifteen are the ones I’d keep if I could only keep fifteen. I picked them with three questions: how common and expensive is the failure it prevents, how cheap is it to adopt, and does it make the other patterns work better?

Every pattern also says when *not* to use it, which is the half I wish more write-ups included. A pattern applied to the wrong problem doesn’t just fail to help. It adds ceremony, burns tokens, and gives you false confidence.

## The four problems

The patterns group by the problem they solve.

| Problem | Patterns |
| --- | --- |
| [Proving it works](https://stevekinney.com/courses/ai-development-setup/patterns-for-proving-it-works) | Verification loop, test-driven agent loop, test ratchet, mutation gate, fresh-context reviewer |
| [Deciding what to build](https://stevekinney.com/courses/ai-development-setup/patterns-for-deciding-what-to-build) | Research, plan, implement; interview to spec; fault localization first |
| [Keeping context useful](https://stevekinney.com/courses/ai-development-setup/patterns-for-keeping-context-useful) | Instructions as a testing contract, progress file, compound engineering |
| [Running unattended work](https://stevekinney.com/courses/ai-development-setup/patterns-for-running-unattended-work) | Ralph loop, circuit breaker, human-gated autonomy, parallel worktree swarm |

If you only read one of these pages, read the first. In my experience, the most common failure is an agent saying it’s done when it isn’t, and that group is the defense.

## How these relate to the rest of the course

Most of these patterns get a deeper treatment elsewhere in the course, and each pattern links to it when you want the configuration, the failure modes, and the worked example.

A pattern also isn’t a mechanism. “Test ratchet” is an idea. Whether you enforce it with a permission rule, a [hook](https://stevekinney.com/courses/ai-development-setup/hooks), or a CI check is a separate decision, and [The Enforcement Ladder](https://stevekinney.com/courses/ai-development-setup/the-enforcement-ladder) covers that choice. A pattern can live in a [skill](https://stevekinney.com/courses/ai-development-setup/skills), a [subagent](https://stevekinney.com/courses/ai-development-setup/subagents), or a script, and [Exemplar Skills](https://stevekinney.com/courses/ai-development-setup/exemplar-skills) and [Exemplar Subagents](https://stevekinney.com/courses/ai-development-setup/exemplar-subagents) show concrete versions of several of them.

Don’t adopt all fifteen at once. Pick the one for the failure you hit most often this week, and add the next when you hit the next failure.
