---
title: "Installing OpenClaw"
lang: "en"
chapter: "openclaw"
slug: "installation"
order: 1
source: "https://stevekinney.com/courses/openclaw/installation"
---

You can download the application from the [OpenClaw website](https://openclaw.ai/).

![The OpenClaw website's quick start section showing desktop app downloads for macOS, Windows, and Linux](/images/kinney/d2abd39dc09da6c7.webp)

Alternatively, you can run this from the command line:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

If we hop over to the desktop application, we’ll see something that looks like this.

![The OpenClaw welcome screen](/images/kinney/cc47dcdedf03c4b6.webp)

You can use the application to install OpenClaw onto your computer or connect to a remote OpenClaw gateway. For our purposes, we’ll install it locally on this machine.

![The onboarding screen asking where the assistant should live, with the On this Mac option selected](/images/kinney/d2b15d0313ca9cdd.webp)

It will then go ahead and get itself all installed and configured.

![The onboarding screen installing OpenClaw and starting the Gateway background service](/images/kinney/e4d145566addc97e.webp)

You can go ahead and let it cook—it’ll take a bit before it’s ready. It’s also installing the CLI and the background agent so that OpenClaw will continue working even when you’ve closed the application—as long as your computer is running.

Once that’s rocking and rolling, you can go through the process of connecting it to our model provider of choice.

![The Connect your AI screen listing Claude Code, Codex, LM Studio, and Ollama](/images/kinney/fe7767d628080b96.webp)

And once you’ve done that—you should be ready to rock and roll.

![The OpenClaw chat window reporting that inference is ready](/images/kinney/14bd9330549ca47f.webp)

My advice at this point is to run `openclaw doctor` or `openclaw doctor --fix` to have it audit your setup and make any adjustments.
