// This function is also embedded in the preview. Keep it self-contained.
export function createRuntimeProtocol({ sources = {}, aliases = {} } = {}) {
  function location(url, line, column) {
    const source = sources[aliases[url] || url];
    if (!source || !Number.isInteger(line) || line < 1) return null;
    const segments = source.mappings?.[line - 1];
    let originalLine = line - 1;
    let originalColumn = Number.isInteger(column) && column > 0 ? column - 1 : null;
    if (source.mappings) {
      if (!segments?.length) return null;
      let segment = null;
      for (const candidate of segments) {
        if (candidate[0] > (originalColumn ?? 0)) break;
        segment = candidate;
      }
      if (!segment || segment.length < 4) return null;
      originalLine = segment[2];
      originalColumn = originalColumn === null ? null : segment[3];
    }
    if (originalLine >= source.lineCount) return null;
    return { file: source.file, line: originalLine + 1, column: originalColumn === null ? null : originalColumn + 1 };
  }

  function frames(stack) {
    return String(stack || '').split('\n').flatMap(raw => {
      // V8: at fn (url:line:col), at url:line:col. Firefox/WebKit: fn@url:line:col.
      const text = raw.trim();
      let name = '';
      let address = text;
      if (text.startsWith('at ')) {
        address = text.slice(3);
        const paren = address.indexOf(' (');
        if (paren >= 0 && address.endsWith(')')) {
          name = address.slice(0, paren);
          address = address.slice(paren + 2, -1);
        }
      } else if (text.includes('@')) {
        const at = text.indexOf('@');
        name = text.slice(0, at);
        address = text.slice(at + 1);
      } else return [];
      const match = /^(.*):(\d+):(\d+)$/.exec(address);
      if (!match) return [];
      const loc = location(match[1], Number(match[2]), Number(match[3]));
      return [{ name, loc, raw }];
    });
  }

  function error(reason, fallback = {}) {
    const stack = typeof reason?.stack === 'string' ? reason.stack : '';
    const parsed = frames(stack);
    const loc = parsed.find(frame => frame.loc)?.loc || location(fallback.file, fallback.line, fallback.column);
    const fallbackMessage = fallback.message || String(reason);
    const match = /^(?:Uncaught\s+)?(\w*Error):\s*(.*)$/s.exec(fallbackMessage);
    return {
      name: typeof reason?.name === 'string' ? reason.name : match?.[1] || 'Error',
      message: typeof reason?.message === 'string' ? reason.message : match?.[2] || fallbackMessage,
      stack,
      frames: parsed,
      loc,
    };
  }
  return { location, frames, error };
}

export function isRuntimeMessage(event, frameWindow, runId) {
  const data = event?.data;
  return Boolean(frameWindow && event.source === frameWindow && data?.source === 'sandbox-console' &&
    data.version === 1 && data.runId === runId && Array.isArray(data.args));
}
