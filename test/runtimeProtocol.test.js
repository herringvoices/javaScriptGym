import test from 'node:test';
import assert from 'node:assert/strict';
import { createRuntimeProtocol, isRuntimeMessage } from '../src/lib/runtimeProtocol.js';

const url = 'jsgym-runtime://fixture/main.js';
const protocol = createRuntimeProtocol({ sources: { [url]: { file: '/main.js', lineCount: 20 } } });
test('V8 and Firefox/WebKit stacks preserve all known frames and unknown frames', () => {
  for (const stack of [`Error: broken\n    at fail (${url}:4:7)\n    at ${url}:10:2\n    at https://external.test/lib.js:3:1`, `fail@${url}:4:7\n@${url}:10:2\nf@https://external.test/lib.js:3:1`]) {
    const frames = protocol.frames(stack);
    assert.deepEqual(frames.map(frame => frame.loc), [{ file: '/main.js', line: 4, column: 7 }, { file: '/main.js', line: 10, column: 2 }, null]);
  }
});
test('unknown, missing and generated locations never become student locations', () => {
  assert.equal(protocol.location('about:srcdoc', 500, 4), null);
  assert.equal(protocol.location(url, 0, 1), null);
  assert.equal(protocol.location(url, 21, 1), null);
  assert.deepEqual(protocol.location(url, 4, 0), { file: '/main.js', line: 4, column: null });
  assert.equal(protocol.error(null).loc, null);
  assert.equal(protocol.error(0).message, '0');
});
test('runtime messages must come from the current frame and current run', () => {
  const source = {};
  const event = { source, data: { source: 'sandbox-console', version: 1, runId: 'new', args: [] } };
  assert.equal(isRuntimeMessage(event, source, 'new'), true);
  assert.equal(isRuntimeMessage(event, {}, 'new'), false);
  assert.equal(isRuntimeMessage(event, source, 'old'), false);
  assert.equal(isRuntimeMessage(event, null, 'new'), false);
  assert.equal(isRuntimeMessage({ ...event, data: { ...event.data, version: 2 } }, source, 'new'), false);
});
