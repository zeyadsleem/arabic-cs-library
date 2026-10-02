import { base } from '$app/paths';

/** @param {'run' | 'format'} action @param {string} body @param {AbortSignal} signal @param {(phase: 'loading' | 'running') => void} [onPhase] @returns {Promise<Record<string, string>>} */
function evaluate(action, body, signal, onPhase) {
  if (!body.trim()) return Promise.reject(new Error('اكتب برنامجاً أولاً.'));
  signal.throwIfAborted();
  return new Promise((resolve, reject) => {
    const worker = new Worker(`${base}/go-browser/runner.js?v=compressed-1`);
    const cleanup = () => { worker.terminate(); signal.removeEventListener('abort', abort); clearTimeout(timer); };
    const abort = () => { cleanup(); reject(new DOMException('Execution cancelled', 'AbortError')); };
    let timer = setTimeout(() => { cleanup(); reject(new Error('انتهت مهلة تحميل محرك Go. تحقق من الاتصال ثم حاول مجدداً.')); }, 90_000);
    onPhase?.('loading');
    signal.addEventListener('abort', abort, { once: true });
    worker.onerror = () => { cleanup(); reject(new Error('تعذّر تحميل محرّك Go المحلي. أعد تحميل الصفحة ثم حاول مجدداً.')); };
    worker.onmessage = ({ data }) => {
      if (data?.ready === true) {
        clearTimeout(timer);
        timer = setTimeout(() => { cleanup(); reject(new Error('تجاوز البرنامج مهلة التنفيذ داخل المتصفح.')); }, 15_000);
        onPhase?.('running');
        return;
      }
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

/** @param {string} body @param {AbortSignal} signal @param {(phase: 'loading' | 'running') => void} [onPhase] @returns {Promise<{errors: string, events: Array<{message: string, kind: string}>, exitCode: number}>} */
export async function runInBrowser(body, signal, onPhase) {
  const result = await evaluate('run', body, signal, onPhase);
  return {
    errors: result.errors || '',
    events: [{ message: result.output || '', kind: 'stdout' }, { message: result.stderr || '', kind: 'stderr' }].filter((event) => event.message),
    exitCode: result.errors ? 1 : 0
  };
}

/** @param {string} body @param {AbortSignal} signal @param {(phase: 'loading' | 'running') => void} [onPhase] @returns {Promise<string>} */
export async function formatInBrowser(body, signal, onPhase) {
  const result = await evaluate('format', body, signal, onPhase);
  if (result.error) throw new Error(result.error);
  if (typeof result.body !== 'string') throw new Error('استجابة التنسيق غير صالحة.');
  return result.body;
}
