---
title: "الطرفية المدمجة (The Integrated Terminal)"
---

الطرفية المدمجة (built-in terminal) واضحة إلى حد ما، لكن دعنا ننظر إلى بعض الطرق التي يمكن بها أخذها إلى «المستوى التالي» (Next Level™)، كما يقولون.

> **الطريقة السريعة**
>
> ضغط `Cmd+Backtick` أو `Ctrl-Backtick` يفتح الطرفية المدمجة.

## إنشاء terminaux متعدّدة وإدارتها

تشغيل terminaux متعدّدة في آن واحد ضروري غالبًا للتطوير Modern. قد تحتاج إلى terminal واحد لتشغيل خادم محلي وآخر للتدقيق أو الاختبار. في Visual Studio Code، فتح terminaux جديدة بسيط بقدر النقر على زر الزائد (`+`) في الزاوية العلوية اليمنى من لوحة الطرفية. كل terminal جديدة تعمل في مثيلها الخاص، مرئية في قائمة منسدلة تتيح لك التبديل between them effortlessly.

لإغلاق terminal لم تعد بحاجة إليها، انقر على أيقونة سلة المهملات أو استخدم قائمة السياق بزر الفأرة الأيمن على تبويب terminal. التبديل between terminaux مسألة selecting the desired session from the dropdown، ويمكنك إعادة تسميتها للوضوح عبر double-clicking the terminal tab label. This quick access to multiple environments ensures you’re never stuck halting one process just to start another.

> **terminaux متعدّدة بسهولة**
>
> إن كنت تحتاج غالبًا إلى same set of terminals (مثل server، build watcher، test watcher)، ففكّر في scripting a quick Terminal Task to launch them all in one go. It’s like calling your personal pit crew to get everything running at once.

## ملفات تعريف الطرفية (Terminal Profiles)

يمكنك التبديل بين ملفات تعريف صدفة (shell profiles) مختلفة—bash، zsh، PowerShell، WSL، وغيرها. لضبط these profiles، افتح لوحة الأوامر (`Ctrl+Shift+P` أو `Cmd+Shift+P` على macOS) وابحث عن `Terminal: Select Default Profile`. A list of detected shells appears، مما يتيح لك choosing your favorite.

لمزيد من التحكم، اذهب إلى إعداداتك (انقر أيقونة الترس في أسفل اليسار، then `Settings`) وابحث عن `Terminal > Integrated > Profiles`. From there، يمكنك defining custom profiles with specific paths، environment variables، and command line arguments. Whether you’re doing cross-platform work or jumping between Node.js and Python projects، these profiles can be a lifesaver.

## تقسيم الطرفيات (Splitting Terminals)

Sometimes، you want to keep multiple terminals in view simultaneously. Splitting your terminal lets you see two or more sessions side-by-side (or stacked) within the same panel. Here’s how to do it:

- Click the split icon in the terminal panel’s toolbar to create a new split terminal.
- Alternatively، right-click an existing terminal tab and select `Split` from the context menu.
- You can choose to split either horizontally or vertically by toggling the layout icon near the top-right corner of the terminal window.

This capability is perfect for quickly comparing logs from a client and server، or running two parallel processes without shuffling between tabs.

## تخصيص الطرفية (Terminal Customization)

Visual Studio Code provides plenty of ways to fine-tune the terminal’s appearance. Beyond merely adjusting the font face and size (in `Terminal > Integrated: Font Family` and `Font Size`)، you can also tweak colors، cursor styles، and even the blinking behavior. For instance، you could set up a neon green cursor or a more subdued theme to match your editor.

In your settings JSON file (or through the GUI)، look for `terminal.integrated.*` options. You’ll see properties like `terminal.integrated.cursorStyle`، `terminal.integrated.cursorBlinking`، and various color customizations under `workbench.colorCustomizations`. Feel free to experiment to achieve the style that makes you most productive—just don’t make the colors so flashy that you feel like you’re coding at a rave.

## المهام والطرفية (Tasks and the Terminal)

> **سنتحدث more about tasks in a little bit**
>
> You can take a sneak peek [here](https://stevekinney.com/courses/visual-studio-code/vscode-tasks)، if you’re so inclined.

Visual Studio Code tasks often run directly in the integrated terminal by default. This includes build tasks، test tasks، lint tasks، and more. Tasks let you automate repetitive workflows، and the integrated terminal provides a convenient، visible way to see your scripts in action. If you’ve set up multiple terminals، you can even watch a task run in one while you continue manual commands in another.

If you’re looking to orchestrate a set of tasks، define a `tasks.json` file in your project’s `.vscode` folder. You can specify commands، shell types، and environment variables، all of which execute in the integrated terminal. This combination simplifies your workflow—fewer alt-tabbing around، more coding.

## تكامل الصدفة (Shell Integration)

The integrated terminal can auto-inject environment variables or track certain command events، depending on your shell and the extensions you’ve installed. For instance، Visual Studio Code’s Remote—WSL extension seamlessly detects your WSL distribution and mirrors your development environment from Windows into Linux. You might also use environment variable injection to pass credentials or configuration details without manually re-exporting them every time.

> **Sharing isn’t always caring.**
>
> Be cautious when passing sensitive environment variables. While it’s convenient، always ensure you’re not inadvertently exposing secrets in public repos or recorded terminal sessions.

## البحث داخل الطرفية (Searching Within the Terminal)

Long terminal sessions can accumulate a lot of output—logs، debugging info، and more. Searching within the terminal is straightforward:

- Click the magnifying glass icon (Find) in the terminal toolbar، or press `Ctrl+F` (on Windows/Linux) or `Cmd+F` (on macOS) while the terminal is focused.
- Type your query to highlight matches in the terminal output.

## تركيز الطرفية النشطة (Focusing the Active Terminal)

**Pro-Tip**: `Ctrl-Backtick` will open or close the integrated terminal. Theoretically `Cmd-Down` will focus it، but only if you have accessibility mode turned on. You can add a keybinding that will focus the terminal if it’s already created.

```json
[
  {
    "key": "ctrl+`",
    "command": "workbench.action.terminal.focus",
    "when": "terminalHasBeenCreated && terminalProcessSupported"
  }
]
```

Obviously، you can choose any keybinding that pleases you.

## استمرارية جلسة الطرفية (Terminal Session Persistence)

While the integrated terminal closes with VS Code، you can maintain long-running processes by using a terminal multiplexer such as tmux or screen within the terminal itself. Running a multiplexer ensures that your sessions continue in the background even if you restart VS Code، preserving your workflows and processes.

> **Keep Your Sessions Alive**
>
> Use `tmux` or `screen` to persist terminal sessions and avoid disruptions in your long-running tasks.