// Embedded in the iframe; do not reference module-level variables.
export function installConsoleBridge(config, createProtocol) {
  const protocol = createProtocol(config);
  function safe(v){
    // Preserve undefined/null explicitly so the UI can render them
    if (v === undefined) return { __type: 'undefined' };
    if (v === null) return { __type: 'null' };

    // Structured, circular-safe serialization for Monaco-friendly console output.
    // We intentionally do NOT JSON.stringify here; the parent UI decides
    // whether to render compact (one-line) or pretty (multi-line).
    const seen = new WeakSet();
    const MAX_DEPTH = 6;

    function serialize(val, depth){
      if (val === undefined) return { __type: 'undefined' };
      if (val === null) return null;
      const t = typeof val;
      if (t === 'string' || t === 'number' || t === 'boolean') return val;
      if (t === 'bigint') return { __type: 'bigint', value: String(val) + 'n' };
      if (t === 'symbol') return { __type: 'symbol', value: String(val) };
      if (t === 'function') return { __type: 'function', name: val.name || 'anonymous' };

      // Objects
      try {
        if (val instanceof Error) {
          return { __type: 'error', name: val.name, message: val.message, stack: val.stack };
        }
        if (val instanceof Date) {
          return { __type: 'date', value: val.toISOString() };
        }
        if (val instanceof RegExp) {
          return { __type: 'regexp', value: String(val) };
        }
        if (val instanceof Map) {
          if (depth >= MAX_DEPTH) return { __type: 'map', truncated: true, size: val.size };
          return { __type: 'map', entries: Array.from(val.entries()).map(([k, vv]) => [serialize(k, depth+1), serialize(vv, depth+1)]) };
        }
        if (val instanceof Set) {
          if (depth >= MAX_DEPTH) return { __type: 'set', truncated: true, size: val.size };
          return { __type: 'set', values: Array.from(val.values()).map((vv) => serialize(vv, depth+1)) };
        }
      } catch { /* Fall through to ordinary object serialization. */ }

      if (t === 'object') {
        if (seen.has(val)) return { __type: 'circular' };
        seen.add(val);
        if (depth >= MAX_DEPTH) return { __type: 'truncated' };

        if (Array.isArray(val)) {
          return val.map((item) => serialize(item, depth+1));
        }

        const out = {};
        for (const key in val) {
          try { out[key] = serialize(val[key], depth+1); } catch { out[key] = { __type: 'unserializable' }; }
        }
        return out;
      }

      try { return String(val); } catch { return { __type: 'unserializable' }; }
    }

    try { return serialize(v, 0); } catch { return { __type: 'unserializable', value: String(v) }; }
  }

  function send(type, args, error = null) {
    const frames = protocol.frames(new Error().stack);
    try {
      parent.postMessage({ source: 'sandbox-console', version: 1, runId: config.runId, type,
        args: Array.from(args).map(safe), error,
        loc: error ? error.loc : frames.find(frame => frame.loc)?.loc || null }, '*');
    } catch { /* An uncloneable value must not stop the student's program. */ }
  }
  for (const type of ['log', 'warn', 'error', 'info', 'debug', 'dir', 'table']) {
    const original = console[type];
    console[type] = function(...args) { send(type, args); return original?.apply(console, args); };
  }
  window.addEventListener('error', event => {
    if (!(event instanceof ErrorEvent)) return;
    const error = protocol.error(event.error, { message: event.message, file: event.filename, line: event.lineno, column: event.colno });
    send('runtime-error', [], error);
  });
  window.addEventListener('unhandledrejection', event => {
    send('runtime-error', [], { ...protocol.error(event.reason), unhandledRejection: true });
  });
}
