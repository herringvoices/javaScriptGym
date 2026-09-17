import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { isRuntimeMessage } from '../lib/runtimeProtocol.js';

export default function useRuntimeConsole(files, iframeRef) {
  const [run, setRun] = useState(null);
  const activeRun = useRef(null);
  const [logs, setLogs] = useState([]);
  const [navigation, setNavigation] = useState(null);
  const stale = useMemo(() => Boolean(run && (
    Object.keys(run.files).length !== Object.keys(files).length ||
    Object.entries(run.files).some(([path, file]) => files[path]?.code !== file.code)
  )), [run, files]);

  // Listen before the iframe can execute, including when its panel first mounts.
  useLayoutEffect(() => {
    function receive(event) {
      if (!isRuntimeMessage(event, iframeRef.current?.contentWindow, activeRun.current?.id)) return;
      setLogs(previous => [...previous, event.data].slice(-1000));
    }
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, [iframeRef]);

  const beginRun = useCallback(() => {
    const next = { id: crypto.randomUUID(), files };
    activeRun.current = next;
    setRun(next);
    setLogs([]);
    setNavigation(null);
    return next.id;
  }, [files]);
  const clear = useCallback(() => {
    activeRun.current = null;
    setRun(null);
    setLogs([]);
    setNavigation(null);
  }, []);
  const reportBuildError = useCallback(error => {
    setLogs([{ type: 'runtime-error', args: [], error: { name: 'Preview build failed', message: error.message, frames: [], loc: null } }]);
  }, []);
  const reveal = useCallback(loc => {
    if (stale || !loc || !files[loc.file] || files[loc.file].hidden || !Number.isInteger(loc.line) || loc.line < 1) return;
    setNavigation({ ...loc, requestId: crypto.randomUUID() });
  }, [files, stale]);
  return { runId: run?.id, beginRun, clear, reportBuildError,
    navigation: stale ? null : navigation,
    consoleProps: { logs, stale, onRevealLocation: reveal, files } };
}
