---
title: "خطّافات Git مع Lefthook"
---

إن كنت قد جرّبت رقصة خطّافات git من قبل، فأنت تعرف كيف تسير عادةً: ثبّت [Husky](https://typicode.github.io/husky/)، وثبّت [lint-staged](https://github.com/lint-staged/lint-staged)، واربط سكربت صدفة `.husky/pre-commit` ينادي سكربتًا في `package.json` ينادي lint-staged الذي ينادي المُدقّق الفعلي. ثلاث حزم، وسطحا إعداد، وسكربت صدفة واحد، وخطّاف `prepare` يلصق كل ذلك معًا.

إنه يعمل. وقد شحنته في كثير من المشاريع. لكن في كل مرة أُعِدّه أفكّر: هذا قدر كبير من الالتفاف مقابل «شغّل ESLint على الملفات التي أنا على وشك الالتزام بها».

![الخطّاف الأيسر](/images/kinney/f2923a060096d8f6.webp)

[Lefthook](https://github.com/evilmartians/lefthook) هو الأداة التي جعلتني أكفّ عن ذلك التفكير. إنه ملف ثنائي واحد (مكتوب بـ Go، ويُوزّع عبر npm إن أردت) يستبدل Husky *و*lint-staged في ملف إعداد واحد. ملف YAML واحد. بلا سكربتات صدفة. بلا خطّاف `prepare`. بلا حزمة ثانية تدير تصفية الملفات المرحّلة—فـ Lefthook يتولّى ذلك أصلًا بخياري `glob` و`run`.

أغطّيه مبكرًا في اليوم لأن بقية الورشة تفترض أن لديك طبقة خطّافات تعمل. تشحن نسخة Shelf الأولية إعداد lefthook، ومختبر الطبقة الثابتة لاحقًا في اليوم يفترض أن هذا ما تربطه. إن كان Husky مربوطًا بالفعل في مشروعك وكنت راضيًا عنه، فلا بأس — المفاهيم أدناه تنتقل إليه مباشرة. لكن إن كنت تبدأ من جديد، فـ Lefthook هو ما سأمدّ يدي إليه الآن.

## التثبيت

```bash
npm install --save-dev lefthook
npx lefthook install
```

هذا كل شيء. `lefthook install` يكتب سكربتات الخطّافات في `.git/hooks/` كي تنطلق عند أحداث دورة الحياة الصحيحة. لا حاجة إلى سكربت `prepare`—وإن كان يمكنك إضافته إن أردت تثبيتًا تلقائيًا عندما يشغّل زملاؤك `npm install`.

```json
{
  "scripts": {
    "prepare": "lefthook install"
  }
}
```

في npm، [`prepare`](https://docs.npmjs.com/cli/v11/using-npm/scripts/) سكربت دورة حياة خاص. يعمل عند `npm install` محليًا وقبل `npm pack` أو `npm publish`. في هذه الحالة يعني ذلك «بعد تثبيت الاعتماديات، تأكّد أن Lefthook يكتب ملفات خطّافات Git في `.git/hooks/` مرة أخرى». أنت لا تستدعي `prepare` يدويًا هنا. يرى npm اسم السكربت فيشغّله في النقاط الصحيحة من دورة حياة الحزمة.

> **لماذا `prepare` اختياري**
>
> أمر `install` في Lefthook عديم الأثر عند التكرار. تشغيله مرتين لا يفعل شيئًا ضارًا. إن كان فريقك كله يعرف أنه يشغّل `npx lefthook install` بعد الاستنساخ، فيمكنك تخطّي خطّاف `prepare` تمامًا. أضيفه من العادة لأن هناك دائمًا من ينسى.

## ملف الإعداد

يقرأ Lefthook ملف `lefthook.yml` في جذر مستودعك. إليك إعدادًا أدنى يغطّي الأرضية نفسها التي تغطّيها تركيبة Husky + lint-staged:

```yaml
pre-commit:
  parallel: true
  commands:
    lint:
      glob: '*.{ts,tsx,svelte}'
      run: npx eslint --fix --max-warnings=0 {staged_files}
    format:
      glob: '*.{ts,tsx,svelte,json,md,yml,yaml}'
      run: npx prettier --write {staged_files}
```

`{staged_files}` متغيّر في Lefthook يتمدّد إلى قائمة الملفات المرحّلة المطابقة لـ `glob`. هذا هو بديل lint-staged: يصفّي Lefthook الملفات المرحّلة لك، ويمرّرها كوسائط، ويعيد ترحيل أي تغييرات صُحّحت تلقائيًا.

المُعلَم `parallel: true` يشغّل `lint` و`format` معًا. وإن فشل أحدهما، يُحجب الالتزام.

> **`commands:` مقابل `jobs:`**
>
> يدعم Lefthook أيضًا مفتاح `jobs:` الأحدث (بصيغة قائمة) وقد تراه في وثائق Lefthook وأمثلتها الحالية. كل من `commands:` و`jobs:` صالح ومدعوم؛ ويستخدم هذا الدرس `commands:` لأن المفاتيح الفرعية المسمّاة (`lint:`، `format:`) أسهل قراءة. اختر نمطًا واحدًا لكل مستودع والتزم به.

## إضافة خطّاف pre-push

بعض الفحوص بطيئة جدًا على pre-commit ومهمة جدًا بحيث لا تُتخطّى كليًا. وهنا مكان pre-push.

```yaml
pre-push:
  commands:
    checks:
      run: npm run pre-push
```

الملف نفسه، وحدث دورة حياة مختلف. في نسخة Shelf المكتملة ذات الطبقة الثابتة، يربط `npm run pre-push` البوابات المحلية الأبطأ: فحص الأنواع، و[knip](https://knip.dev/)، ومجموعة اختبارات الوحدة. إن فشل أي منها، يُحجب الدفع وترى الناتج هناك في الطرفية.

القاعدة التي أستخدمها: يستغرق pre-commit أقل من عشر ثوانٍ، ويستغرق pre-push أقل من دقيقتين. وكل ما هو أبطأ مكانه CI.

## فحص الأسرار في الخطّاف

هذا هو ما يهمّني أكثر. أضف [Gitleaks](https://github.com/gitleaks/gitleaks) إلى خطّاف pre-commit كي لا تغادر بيانات الاعتماد جهازك أبدًا:

```yaml
pre-commit:
  parallel: true
  commands:
    lint:
      glob: '*.{ts,tsx,svelte}'
      run: npx eslint --fix --max-warnings=0 {staged_files}
    format:
      glob: '*.{ts,tsx,svelte,json,md,yml,yaml}'
      run: npx prettier --write {staged_files}
    secrets:
      run: gitleaks git --staged --no-banner
```

إن وجد Gitleaks مفتاح API أو رمزًا مكتوبًا صراحةً في الفرق المرحّل، يُحجب الالتزام. لا ينبغي لأي وكيل ولا أي إنسان أن يودع أسرارًا، وهذا الخطّاف يجعل فعل ذلك بالخطأ صعبًا آليًا. بعض الفرق تلفّ الفحص المرحّل في مساعد صغير بصدفة أو TypeScript للوضوح — ويغطّي درس [فحص الأسرار باستخدام Gitleaks](https://stevekinney.com/courses/self-testing-ai-agents/secret-scanning-with-gitleaks) ذلك النمط والاستدعاء الدقيق الذي تستخدمه مع نسختك من Gitleaks.

سأتعمّق في Gitleaks في درس [فحص الأسرار باستخدام Gitleaks](https://stevekinney.com/courses/self-testing-ai-agents/secret-scanning-with-gitleaks). الآن، اعرف فقط أن مكانه pre-commit.

## لماذا يهمّ ملف واحد

ما يعجبني في Lefthook أن إعداد الخطّافات كله يعيش في مكان واحد. عندما يسأل عضو جديد في الفريق «ما الذي يعمل عند الالتزام؟»، يكون الجواب «اقرأ `lefthook.yml`». وعندما يحتاج الوكيل إلى معرفة البوابات التي عليه عبورها، يمكنك توجيه قواعد الوكيل إلى ملف واحد.

قارن هذا بإعداد Husky + lint-staged: الخطّاف في `.husky/pre-commit`، وتصفية الملفات المرحّلة في مفتاح `lint-staged` داخل `package.json` (أو `.lintstagedrc`)، والأوامر الفعلية في `scripts` داخل `package.json`. ثلاثة ملفات، وثلاث صيغ. يجمع Lefthook كل ذلك في ملف YAML واحد بتسلسل واضح: حدث دورة الحياة ← اسم الأمر ← ما يُشغَّل.

هذا ليس انتقاصًا من Husky. فـ Husky موثوق، ومجرّب في المعارك، ويستخدمه نصف منظومة JavaScript. إن كنت تستخدمه بالفعل، فلا سبب للهجرة. لكن إن كنت تُعِدّ مشروعًا جديدًا وتريد أجزاء متحركة أقل، فـ Lefthook هو الأداة الأبسط.

## أحداث دورة الحياة التي يدعمها Lefthook

يتّصل Lefthook بكل [خطّاف Git](https://git-scm.com/docs/githooks) يدعمه Git. وتلك التي أستخدمها فعلًا:

- **`pre-commit`:** lint، والتنسيق، وفحص الأسرار. الملفات المرحّلة فقط. أقل من عشر ثوانٍ.
- **`commit-msg`:** التحقّق من صيغة رسالة الالتزام، إن كان ذلك يهمّك. أنا لا يهمّني غالبًا، لكن بعض الفرق تهتم.
- **`pre-push`:** فحص الأنواع، وفحص الشيفرة الميتة، واختبارات الوحدة. الفحوص الأبطأ قليلًا لكنها تبقى محلية.
- **`post-merge`:** تشغيل `npm install` تلقائيًا بعد السحب كي تبقى الاعتماديات متزامنة. هذا الحدث أقلّ تقديرًا مما يستحق.
- **`post-checkout`:** الفكرة نفسها—أعِد تثبيت الاعتماديات عند الانتقال بين فروع قد تكون ملفات قفلها مختلفة.

يمكنك *بالفعل* الاتّصال بـ `pre-rebase` و`post-rewrite` وعشرة غيرها. لم أحتج إلى ذلك قط. وإن راودتك الرغبة في وضع منطق داخل `pre-rebase`، فأنت على الأرجح تحلّ مشكلة عملية بأداة تقنية.

## تخطّي الخطّافات

كما هو الحال مع Husky: `git commit --no-verify` يتخطّى الخطّاف. وتنطبق القواعد نفسها: استخدمه في الطوارئ الحقيقية، لا كردّ فعل تلقائي. إن بدأ الفريق يمدّ يده إلى `--no-verify` بانتظام، فالخطّاف صارم أكثر من اللازم. اضبطه. لا تصارع الفريق.

بالنسبة للوكلاء، القاعدة أبسط:

```markdown
## Git hooks

- Never use `--no-verify` when committing. If a hook is failing, fix
  the code the hook is complaining about, not the hook.
- The pre-commit hook completes in under 10 seconds. If you see commits
  taking longer, report it.
```

هذه التعليمات مكانها في تعليمات وكيلك، سواء كان ذلك الملف `AGENTS.md` أو `CLAUDE.md` أو `.cursor/rules`، لكن إن أردت حدًّا تنفيذيًا فعليًا، فاستخدم نظام الخطّافات أو الأذونات في الوكيل. ويختلف التنفيذ اختلافًا كبيرًا بين الأدوات.

## إيقاف `--no-verify`

الهدف هنا بسيط: إن حاول وكيل تشغيل `git commit --no-verify`، فاحجب الأمر وأخبره أن يصلح الخطّاف الفاشل بدلًا من ذلك.

### Claude

[خطّافات Claude Code](https://docs.claude.com/en/docs/claude-code/hooks) هي الخيار الأنظف لأن خطّاف `PreToolUse` يستطيع فحص أمر Bash كاملًا *قبل* تشغيله وإرجاع `permissionDecision: "deny"`.

أضف الخطّاف إلى `.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/block-no-verify.mjs\""
          }
        ]
      }
    ]
  }
}
```

ثم افحص أمر الصدفة المعلّق. التعبير `fs.readFileSync(0, 'utf8')` الغريب قليلًا لا يقرأ ملف مشروع من القرص. في عمليات Unix، واصف الملف `0` هو الإدخال القياسي، ويرسل Claude Code حمولة الخطّاف بصيغة JSON إلى هناك في خطّافات الأوامر:

```javascript
import fs from 'node:fs';

const input = JSON.parse(fs.readFileSync(0, 'utf8'));
const command = input.tool_input?.command ?? '';

if (!/(^|\s)--no-verify(\s|$)/.test(command)) {
  process.exit(0);
}

process.stdout.write(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason:
        'Never bypass Git hooks with --no-verify. Fix the failing hook instead.',
    },
  }),
);

process.exit(0);
```

لأن الخطّاف يرى سلسلة الأمر كاملة، فهو يلتقط `--no-verify` حتى عندما لا يكون المُعلَم الأول.

### Cursor

ما تزال أذونات CLI في [Cursor](https://www.cursor.com/) تعيش في `.cursor/cli.json`، لكن الأذونات ليست الأداة المناسبة لسياسة ضيّقة من نوع «احجب فقط `git commit --no-verify`». لذلك استخدم نظام [Hooks](https://cursor.com/docs/hooks) الأصلي في Cursor. بحسب واجهة Cursor Hooks الحالية، يستطيع خطّاف `beforeShellExecution` فحص أمر الصدفة كاملًا ورفضه قبل أن يصل إلى الطرفية.

أنشئ ملف `.cursor/hooks.json` في جذر مشروعك:

```json
{
  "version": 1,
  "hooks": {
    "beforeShellExecution": [
      {
        "command": "python3 .cursor/hooks/block-no-verify.py",
        "matcher": "git",
        "failClosed": true
      }
    ]
  }
}
```

المُطابِق مجرّد مرشّح سريع. وما يزال سكربت الخطّاف بحاجة إلى فحص الأمر كي تبقى أوامر Git للقراءة فقط وأوامر الصدفة غير المتعلّقة تعمل. يستخدم هذا المثال Python 3 لأن `shlex` أنسب من تخمين اقتباسات الصدفة بتعبير نمطي:

```python
#!/usr/bin/env python3
import json
import shlex
import sys

GIT_GLOBAL_OPTIONS_WITH_VALUES = {
    "-C",
    "-c",
    "--config-env",
    "--exec-path",
    "--git-dir",
    "--namespace",
    "--work-tree",
}

COMMIT_OPTIONS_WITH_VALUES = {
    "-C",
    "-F",
    "-S",
    "-c",
    "-m",
    "-t",
    "--author",
    "--cleanup",
    "--date",
    "--file",
    "--fixup",
    "--message",
    "--pathspec-from-file",
    "--reedit-message",
    "--reuse-message",
    "--squash",
    "--template",
    "--trailer",
}

def respond(permission, message=None):
    response = {"permission": permission}
    if message:
        response["user_message"] = "Agent blocked from bypassing pre-commit hooks."
        response["agent_message"] = message
    print(json.dumps(response))

def split_shell_words(command):
    lexer = shlex.shlex(command, posix=True, punctuation_chars=";&|")
    lexer.whitespace_split = True
    return list(lexer)

def command_segments(words):
    segments = []
    current = []

    for word in words:
        if word in {"&&", "||", ";", "|", "&"}:
            if current:
                segments.append(current)
                current = []
        else:
            current.append(word)

    if current:
        segments.append(current)

    return segments

def without_environment_prefix(words):
    while words and "=" in words[0] and not words[0].startswith("-"):
        words = words[1:]

    if not words or words[0] != "env":
        return words

    words = words[1:]
    while words:
        if words[0] in {"-u", "--unset", "-C", "--chdir"}:
            words = words[2:]
        elif words[0].startswith("-"):
            words = words[1:]
        elif "=" in words[0]:
            words = words[1:]
        else:
            break

    return words

def option_takes_value(option, options_with_values):
    return option in options_with_values or any(
        option.startswith(f"{known_option}=") for known_option in options_with_values
    )

def git_subcommand_index(words):
    if not words or words[0] != "git":
        return None

    index = 1
    while index < len(words):
        word = words[index]
        if not word.startswith("-"):
            return index

        if word in GIT_GLOBAL_OPTIONS_WITH_VALUES and "=" not in word:
            index += 2
        else:
            index += 1

    return None

def has_no_verify(args):
    index = 0
    while index < len(args):
        word = args[index]

        if word == "--":
            return False

        if word == "-n" or word.startswith("--no-verify"):
            return True

        if option_takes_value(word, COMMIT_OPTIONS_WITH_VALUES) and "=" not in word:
            index += 2
        else:
            index += 1

    return False

def blocks_hook_bypass(words):
    words = without_environment_prefix(words)
    subcommand_index = git_subcommand_index(words)
    if subcommand_index is None or words[subcommand_index] != "commit":
        return False

    return has_no_verify(words[subcommand_index + 1 :])

try:
    payload = json.load(sys.stdin)
    command = payload["command"]
    words = split_shell_words(command)
except Exception:
    respond("deny", "Cursor could not evaluate the pending command, so the hook failed closed.")
    raise SystemExit(0)

if any(blocks_hook_bypass(segment) for segment in command_segments(words)):
    respond(
        "deny",
        "Do not use --no-verify or -n. Run a standard git commit and fix hook failures instead.",
    )
else:
    respond("allow")
```

لأن `failClosed` قيمته `true`، يحجب Cursor الأمر المطابق إن انهار السكربت، أو أعاد JSON غير صالح، أو تعذّر تنفيذه. هذا ما تريده في خطّاف سياسة، لكنه يعني أيضًا أن `python3` يجب أن يكون متاحًا حيثما شغّل Cursor الخطّاف.

هذا يُبقي مهام Git العامة للقراءة فقط مثل `git status` و`git diff` متاحة، ويحجب في الوقت نفسه التخطّي الذي يهمّك فعلًا، بما في ذلك `git commit --no-verify` و`git commit -n` والصيغ الشائعة مثل `git -C path commit --no-verify`.

### Codex

تستطيع [خطّافات Codex](https://developers.openai.com/codex/hooks) اعتراض `Bash` في `PreToolUse`، وهذا يجعلها الأداة الصحيحة لسياسة على مستوى المُعلَم كهذه. [`prefix_rule`](https://developers.openai.com/codex/rules) رائع لسياسة خارج الصندوق الرملي مبنية على البادئة، لكن `--no-verify` قد يظهر لاحقًا في قائمة الوسائط، فالخطّاف هو الحل الدقيق.

فعّل الخطّافات في `.codex/config.toml`:

```toml
[features]
codex_hooks = true
```

ثم سجّل خطّاف `PreToolUse` في `.codex/hooks.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "node \"$(git rev-parse --show-toplevel)/.codex/hooks/block-no-verify.mjs\"",
            "statusMessage": "Checking for --no-verify"
          }
        ]
      }
    ]
  }
}
```

وافحص `tool_input.command` قبل تشغيل أمر الصدفة. والأمر نفسه هنا: `0` يعني الإدخال القياسي، وهو حيث يسلّم Codex حمولة حدث الخطّاف في خطّافات الأوامر:

```javascript
import fs from 'node:fs';

const input = JSON.parse(fs.readFileSync(0, 'utf8'));
const command = input.tool_input?.command ?? '';

if (!/(^|\s)--no-verify(\s|$)/.test(command)) {
  process.exit(0);
}

process.stdout.write(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: 'Do not use --no-verify. Fix the failing hook instead.',
    },
  }),
);

process.exit(0);
```

إن أردت سياسة Codex أوسع، فاستخدم ملف `.rules` لمنع `git commit` خارج الصندوق الرملي كليًا، واحتفظ بالخطّافات للحالة الأدق «التقط هذا المُعلَم في أي موضع من الأمر».

## الشيء الوحيد الذي يجب تذكّره

يستبدل Lefthook Husky وlint-staged بملف YAML واحد. ملف واحد، وأداة واحدة، وكل أحداث دورة الحياة. pre-commit للأشياء السريعة—lint والتنسيق وفحص الأسرار. وpre-push للأشياء المتوسطة—فحص الأنواع والشيفرة الميتة والاختبارات. وكل ما عدا ذلك يذهب إلى CI. الخطّاف الذي لا يشغّله أحد أسوأ من الخطّاف الأبطأ الذي ما يزال يلتقط الأشياء، فاحرص على أن يبقى سريعًا وأن يبقى محدود النطاق.

## قراءات إضافية

- [lint والأنواع كدرابزين](https://stevekinney.com/courses/self-testing-ai-agents/lint-and-types-as-guardrails)
- [فحص الأسرار باستخدام Gitleaks](https://stevekinney.com/courses/self-testing-ai-agents/secret-scanning-with-gitleaks)
