/** Capture the screenshots declared in `scripts/lib/tanstack-shots.mjs`.
 *
 * For each book the runner checks out every lesson's branch in the cloned course
 * repository, keeps one Vite dev server per book, follows the shot's actions, and
 * writes `static/images/<book>/<lesson>--<shot>.png`. It is a local authoring
 * tool: the PNG files are committed, the cloned repositories are not.
 *
 * Usage:
 *   node scripts/capture-tanstack.mjs [--book tanstack-router] [--only <lesson-key>]
 *                                     [--repos <dir>] [--keep-server]
 */
import { execFileSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import { createDummyJsonHandler, createRandomWordHandler } from './lib/tanstack-fixtures.mjs';
import { SHOT_SPECS, screenshotDirectory } from './lib/tanstack-shots.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arguments_ = process.argv.slice(2);
const valueOf = (flag) => {
  const index = arguments_.indexOf(flag);
  return index === -1 ? undefined : arguments_[index + 1];
};
const bookFilter = valueOf('--book');
const lessonFilter = valueOf('--only');
const reposRoot = valueOf('--repos') ?? process.env.TANSTACK_REPOS ?? '/tmp/opencode/tanstack-repos';
const keepServer = arguments_.includes('--keep-server');

/** Poll the dev server until it answers or the timeout expires.
 * @param {string} url @param {number} timeout
 */
const waitForServer = async (url, timeout = 120000) => {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`dev server did not answer on ${url} within ${timeout / 1000}s`);
};

/** Keep one Vite server per book, reusing one that is already listening.
 * @param {string} repository @param {number} port @param {string} logFile
 * @returns {Promise<import('node:child_process').ChildProcess | null>}
 */
const startServer = async (repository, port, logFile) => {
  const url = `http://localhost:${port}/`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      console.log(`server: reusing http://localhost:${port}/`);
      return null;
    }
  } catch {
    // Not running: start it below.
  }
  const binary = path.join(repository, 'node_modules', '.bin', 'vite');
  if (!fs.existsSync(binary)) throw new Error(`missing Vite in ${repository}; run npm ci there first`);
  const log = fs.openSync(logFile, 'a');
  const child = spawn(binary, ['--port', String(port), '--strictPort'], {
    cwd: repository,
    stdio: ['ignore', log, log],
  });
  await waitForServer(url);
  console.log(`server: started http://localhost:${port}/ (log ${logFile})`);
  return child;
};

/** Run one declared action against the page.
 * @param {import('@playwright/test').Page} page
 * @param {import('./lib/tanstack-shots.mjs').ShotAction} action
 */
const runAction = async (page, action) => {
  const locator = (selector) => page.locator(selector).first();
  if ('fill' in action) return locator(action.fill).fill(action.value);
  if ('click' in action) return locator(action.click).click({ timeout: 15000 });
  if ('hover' in action) return locator(action.hover).hover({ timeout: 15000 });
  if ('check' in action) return locator(action.check).check({ timeout: 15000 });
  if ('blur' in action) return locator(action.blur).evaluate((element) => element.blur());
  if ('select' in action) return locator(action.select).selectOption(action.value);
  if ('press' in action) return locator(action.press).press(action.key);
  if ('wait' in action) return page.waitForTimeout(action.wait);
  if ('waitFor' in action) return locator(action.waitFor).waitFor({ state: 'visible', timeout: 15000 });
  throw new Error(`unknown shot action: ${JSON.stringify(action)}`);
};

/** Whether two branches differ in the Vite configuration, which forces a restart.
 * @param {string} repository @param {string} from @param {string} to
 * @returns {boolean}
 */
const viteConfigChanged = (repository, from, to) => {
  try {
    const output = execFileSync(
      'git',
      ['-C', repository, 'diff', '--name-only', from, to, '--', 'vite.config.ts'],
      { encoding: 'utf8' }
    );
    return output.trim().length > 0;
  } catch {
    return false;
  }
};

/** Put the working tree on a lesson's branch and prove it landed there.
 *
 * The lesson screenshot is only worth publishing when the running app is the
 * lesson's own code, so the checkout is done against `origin/<branch>` (a remote
 * ref that always exists once the repository is cloned) and the resulting `HEAD`
 * is compared with the commit that ref points at. A silent failure would publish
 * the previous lesson's screen under the wrong name.
 *
 * @param {string} repository @param {string} branch
 * @returns {string} the commit the working tree is on
 */
const checkoutBranch = (repository, branch) => {
  const expected = execFileSync('git', ['-C', repository, 'rev-parse', `origin/${branch}`], {
    encoding: 'utf8',
  }).trim();
  execFileSync('git', ['-C', repository, 'checkout', '-q', '--detach', `origin/${branch}`], {
    stdio: ['ignore', 'ignore', 'inherit'],
  });
  const head = execFileSync('git', ['-C', repository, 'rev-parse', 'HEAD'], {
    encoding: 'utf8',
  }).trim();
  if (head !== expected) throw new Error(`checkout of ${branch} landed on ${head}, expected ${expected}`);
  return head;
};

/** Wait until the port stops answering, so a restarted server can bind it.
 * @param {number} port @param {number} timeout
 */
const waitForPortFree = async (port, timeout = 20000) => {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    try {
      await fetch(`http://localhost:${port}/`);
    } catch {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
};

const main = async () => {
  const failures = [];
  let captured = 0;
  const servers = [];

  for (const [bookId, spec] of Object.entries(SHOT_SPECS)) {
    if (bookFilter && bookFilter !== bookId) continue;
    const repository = path.join(reposRoot, bookId);
    if (!fs.existsSync(repository)) {
      failures.push(`${bookId}: repository missing at ${repository}`);
      continue;
    }
    const bundleFile = path.join(root, 'content-src', bookId, 'lesson-code.json');
    const bundle = JSON.parse(fs.readFileSync(bundleFile, 'utf8'));
    /** @type {Map<string, string | null>} */
    const branches = new Map(bundle.lessons.map((lesson) => [lesson.key, lesson.branch]));
    const output = screenshotDirectory(root, bookId);
    fs.mkdirSync(output, { recursive: true });

    let server = await startServer(repository, spec.port, `/tmp/opencode/vite-${bookId}.log`);
    if (server) servers.push(server);
    /** The branch the running server was started on. */
    let serverBranch = null;

    const browser = await chromium.launch();
    const page = await browser.newPage({
      viewport: { width: 1280, height: 720 },
      colorScheme: spec.colorScheme ?? 'light',
    });
    const pageErrors = [];
    page.on('pageerror', (error) => pageErrors.push(String(error)));
    /** Per-shot response delay, so a pending-state lesson can hold its spinner. */
    const responseDelay = { current: 0 };
    await page.route('https://dummyjson.com/**', createDummyJsonHandler({ delay: () => responseDelay.current }));
    await page.route(
      'https://random-words-api.kushcreates.com/**',
      createRandomWordHandler({ delay: () => responseDelay.current })
    );

    for (const lesson of spec.lessons) {
      if (lessonFilter && lesson.key !== lessonFilter) continue;
      if (!lesson.shots.length) continue;
      const branch = branches.get(lesson.key);
      if (!branch) {
        console.warn(`${lesson.key}: no code branch, skipped`);
        continue;
      }
      if (serverBranch && viteConfigChanged(repository, serverBranch, branch)) {
        console.log(`server: restarting for ${branch} (vite.config.ts changed)`);
        if (server) server.kill('SIGTERM');
        await waitForPortFree(spec.port);
        server = await startServer(repository, spec.port, `/tmp/opencode/vite-${bookId}.log`);
        if (server) servers.push(server);
      }
      try {
        const commit = checkoutBranch(repository, branch);
        serverBranch = branch;
        console.log(`checkout: ${branch} @ ${commit.slice(0, 7)}`);
      } catch (error) {
        const message = `${lesson.key}: checkout of ${branch} failed: ${error.message}`;
        console.error(`FAIL ${message}`);
        failures.push(message);
        continue;
      }
      pageErrors.length = 0;
      // Let Vite pick up the branch switch before the first navigation.
      await new Promise((resolve) => setTimeout(resolve, 800));

      for (const shot of lesson.shots) {
        const file = path.join(output, `${lesson.key}--${shot.name}.png`);
        responseDelay.current = shot.delay ?? 0;
        let lastError = null;
        for (let attempt = 1; attempt <= 2; attempt += 1) {
          try {
            if (attempt === 1) {
              await page.goto(`http://localhost:${spec.port}${shot.path}`, {
                waitUntil: 'domcontentloaded',
                timeout: 60000,
              });
            } else {
              await page.goto(`http://localhost:${spec.port}${shot.path}`, {
                waitUntil: 'domcontentloaded',
                timeout: 60000,
              });
            }
            await page.waitForTimeout(shot.settle ?? 900);
            for (const action of shot.actions ?? []) await runAction(page, action);
            await page.screenshot({ path: file, fullPage: Boolean(shot.fullPage) });
            captured += 1;
            lastError = null;
            console.log(`SHOT ${bookId}/${lesson.key}--${shot.name} ${shot.path}`);
            break;
          } catch (error) {
            lastError = error;
          }
        }
        if (lastError) {
          const message = lastError.message.split('\n')[0];
          failures.push(`${lesson.key}--${shot.name}: ${message}`);
          console.error(`FAIL ${lesson.key}--${shot.name}: ${message}`);
        }
      }
      if (pageErrors.length) {
        console.warn(`${lesson.key}: page error(s): ${pageErrors.slice(0, 2).join(' | ')}`);
      }
    }

    await browser.close();
  }

  if (!keepServer) {
    for (const server of servers) server.kill('SIGTERM');
  } else if (servers.length) {
    for (const server of servers) server.unref();
    console.log('servers kept running (--keep-server)');
  }

  console.log(`\n${captured} screenshot(s) captured, ${failures.length} failed`);
  for (const failure of failures) console.error(`- ${failure}`);
  if (failures.length) process.exit(1);
};

await main();
