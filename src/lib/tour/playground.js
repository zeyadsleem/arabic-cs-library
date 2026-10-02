const endpoint = 'https://play.golang.org';

/** @param {string} action @param {string} body @param {AbortSignal} signal @param {string} service @returns {Promise<unknown>} */
async function request(action, body, signal, service) {
  if (!body.trim()) throw new Error('اكتب برنامجاً أولاً.');
  if (new TextEncoder().encode(body).length > 100_000) throw new Error('الشيفرة أكبر من الحد المسموح (100 كيلوبايت).');
  const services = service === endpoint ? [endpoint] : [service, endpoint];
  for (const origin of services) {
    let response;
    try {
      response = await fetch(`${origin}/${action}`, {
        method: 'POST', body: new URLSearchParams({ body, version: '2' }), signal
      });
    } catch (error) {
      if (signal.aborted) throw error;
      throw new Error('تعذّر الوصول إلى خدمة تشغيل Go. تحقّق من الاتصال بالشبكة، أو شغّل الموقع محلياً لاستخدام بوابة التشغيل بدلاً من الاتصال المباشر.', { cause: error });
    }
    // Static hosts have no gateway. Keep compatibility with existing static builds.
    if (origin !== endpoint && [404, 405].includes(response.status)) continue;
    if (!response.ok) {
      let message = `تعذّر الاتصال بخدمة Go (${response.status}). حاول مجدداً.`;
      try {
        const result = await response.json();
        if (isRecord(result) && typeof result.Error === 'string') message = result.Error;
      } catch (error) {
        console.warn('Go service returned a non-JSON error', error);
      }
      throw new Error(message);
    }
    return response.json();
  }
  throw new Error('لا تتوفر خدمة تشغيل Go على هذا الموقع.');
}

/** @param {unknown} value @returns {value is Record<string, unknown>} */
function isRecord(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }

/** @param {Array<{Name: string, Content: string}>} files @returns {string} */
export function programBody(files) {
  if (files.length === 1) return files[0].Content;
  return files.map((file) => `-- ${file.Name} --\n${file.Content}\n`).join('');
}

/** @param {string} body @param {AbortSignal} signal @param {string} [service] @returns {Promise<{errors: string, events: Array<{message: string, kind: string}>, exitCode: number}>} */
export async function compile(body, signal, service = endpoint) {
  const result = await request('compile', body, signal, service);
  if (!isRecord(result) || typeof result.Errors !== 'string' ||
      (result.Events !== null && !Array.isArray(result.Events))) {
    throw new Error('وصلت استجابة غير متوقعة من خدمة التشغيل.');
  }
  const events = Array.isArray(result.Events) ? result.Events : [];
  if (!events.every((event) => isRecord(event) && typeof event.Message === 'string' && typeof event.Kind === 'string')) {
    throw new Error('تعذّر قراءة مخرجات البرنامج.');
  }
  return {
    errors: result.Errors,
    events: events.map((event) => ({ message: event.Message, kind: event.Kind })),
    exitCode: typeof result.Status === 'number' ? result.Status : 0
  };
}

/** @param {string} body @param {AbortSignal} signal @param {string} [service] @returns {Promise<string>} */
export async function format(body, signal, service = endpoint) {
  const result = await request('fmt', body, signal, service);
  if (!isRecord(result) || typeof result.Error !== 'string' || typeof result.Body !== 'string') {
    throw new Error('وصلت استجابة غير متوقعة من خدمة التنسيق.');
  }
  if (result.Error) throw new Error(result.Error);
  return result.Body;
}

/** @param {string} message @returns {Array<{type: 'text' | 'image', value: string}>} */
export function outputParts(message) {
  const parts = [];
  const image = /^(?:\x00\x00)?IMAGE:([A-Za-z0-9+/=]+)(?:\n|$)/gm;
  let offset = 0;
  for (const match of message.matchAll(image)) {
    if (match.index > offset) parts.push({ type: 'text', value: message.slice(offset, match.index) });
    parts.push({ type: 'image', value: `data:image/png;base64,${match[1]}` });
    offset = match.index + match[0].length;
  }
  if (offset < message.length) parts.push({ type: 'text', value: message.slice(offset) });
  return parts;
}
