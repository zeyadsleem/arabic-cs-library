import { base } from '$app/paths';

/** @param {'run' | 'format'} action @param {string} body @param {AbortSignal} signal @returns {Promise<Record<string, string>>} */
function evaluate(action, body, signal) {
  if (!body.trim()) return Promise.reject(new Error('اكتب برنامجاً أولاً.'));
  signal.throwIfAborted();
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${base}/go-browser/runner.js`);
    const cleanup = () => { worker.terminate(); signal.removeEventListener('abort', abort); clearTimeout(timer); };
    const abort = () => { cleanup(); reject(new DOMException('Execution cancelled', 'AbortError')); };
    const timer = setTimeout(() => { cleanup(); reject(new Error('تجاوز البرنامج مهلة التنفيذ داخل المتصفح.')); }, 20_000);
    signal.addEventListener('abort', abort, { once: true });
    worker.onerror = () => { cleanup(); reject(new Error('تعذّر تحميل محرّك Go المحلي. أعد تحميل الصفحة ثم حاول مجدداً.')); };
    worker.onmessage = ({ data }) => {
      cleanup();
      if (typeof data?.error === 'string') {
        reject(new Error(/fetch|network|load|initialize/i.test(data.error)
          ? 'تعذّر تحميل ملفات محرّك Go المحلي. أعد تحميل الصفحة ثم حاول مجدداً.'
          : data.error));
        return;
      }
      if (!data?.result || typeof data.result !== 'object') { reject(new Error('استجابة محرّك Go غير صالحة.')); return; }
      resolve(data.result);
    };
    worker.postMessage({ action, body });
  });
}

/** @param {string} body @param {AbortSignal} signal @returns {Promise<{errors: string, events: Array<{message: string, kind: string}>, exitCode: number}>} */
export async function runInBrowser(body, signal) {
  const result = await evaluate('run', body, signal);
  return {
    errors: result.errors || '',
    events: [{ message: result.output || '', kind: 'stdout' }, { message: result.stderr || '', kind: 'stderr' }].filter((event) => event.message),
    exitCode: result.errors ? 1 : 0
  };
}

/** @param {string} body @param {AbortSignal} signal @returns {Promise<string>} */
export async function formatInBrowser(body, signal) {
  const result = await evaluate('format', body, signal);
  if (result.error) throw new Error(result.error);
  if (typeof result.body !== 'string') throw new Error('استجابة التنسيق غير صالحة.');
  return result.body;
}
