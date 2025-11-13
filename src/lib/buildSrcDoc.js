// Build an iframe srcdoc string from a simple virtual FS.
// Goals (v1):
// - Support vanilla challenges with HTML entry (preferred)
// - Inject console bridge to bubble logs/errors to the parent window
// - Inline mock/bridge scripts if present (/__mocks__/fetch.js and /__bridge__.js)
// - Rewrite <script src> and <link rel="stylesheet" href> for known files to inline content
// - If entry is a JS file, provide a minimal HTML shell and run it as a module

/**
 * @typedef {{ code: string, readOnly?: boolean, hidden?: boolean, active?: boolean }} FileSpec
 * @param {{ files: Record<string, FileSpec>, entry: string }} opts
 */
export function buildSrcDoc({ files, entry }) {
	const fileFor = (p) => files[p]?.code ?? null;

	const getScriptInline = (code, type) => `<script ${type ? `type="${type}"` : ""}>\n${code}\n</script>`;
	const getStyleInline = (code) => `<style>\n${code}\n</style>`;

	const withSourceURL = (code, path) => {
		if (!path) return code;
		return `${code}\n//# sourceURL=${path}`;
	};

	const bridgeCode = fileFor("/__bridge__.js");
	const mockFetchCode = fileFor("/__mocks__/fetch.js");

	const consoleHook = `
		(function(){
			const ORIG = { log: console.log, warn: console.warn, error: console.error };
			function safe(v){ try { return typeof v === 'string' ? v : JSON.stringify(v); } catch { return String(v); } }
			function parseLocFromStack(stack){
				try{
					const lines = String(stack||'').split('\\n');
					for (let i=0;i<lines.length;i++){
						const L = lines[i];
						if (!L) continue;
						if (L.includes('sandbox-console') || L.includes('consoleHook')) continue;
						const m = L.match(/\\(?:(.*?):(\\d+):(\\d+)\\)|\\s(.*?):(\\d+):(\\d+)/);
						if (m){
							const file = m[1] || m[4] || '';
							const line = Number(m[2] || m[5] || 0);
							const column = Number(m[3] || m[6] || 0);
							return { file, line, column };
						}
					}
				} catch {}
				return null;
			}
			function currentLoc(){ try { throw new Error(); } catch(e){ return parseLocFromStack(e && e.stack); } }
			function post(type, args, loc){
				try { parent.postMessage({ source: 'sandbox-console', type, args: Array.from(args).map(safe), loc: loc || currentLoc() }, '*'); } catch {}
			}
			console.log = function(){ post('log', arguments); return ORIG.log.apply(console, arguments); };
			console.warn = function(){ post('warn', arguments); return ORIG.warn.apply(console, arguments); };
			console.error = function(){ post('error', arguments); return ORIG.error.apply(console, arguments); };
			window.addEventListener('error', function(e){
				const loc = { file: e && e.filename, line: e && e.lineno, column: e && e.colno };
				post('runtime-error', [e && e.message ? e.message : String(e)], loc);
			});
			window.addEventListener('unhandledrejection', function(e){
				const msg = (e && e.reason && e.reason.message) || String((e && e.reason) || e);
				const loc = (e && e.reason && e.reason.stack) ? parseLocFromStack(e.reason.stack) : null;
				post('runtime-error', [msg], loc);
			});
		})();
	`;

	// Inject console hook, then globals bridge, then fetch mock.
	// Use classic scripts for bridge/mock so they execute immediately during parse,
	// ensuring the mock fetch is active before any classic app scripts run.
		const headExtras = [
			getScriptInline(consoleHook, undefined),
			bridgeCode ? getScriptInline(withSourceURL(bridgeCode, '/__bridge__.js'), undefined) : '',
			mockFetchCode ? getScriptInline(withSourceURL(mockFetchCode, '/__mocks__/fetch.js'), undefined) : '',
		].filter(Boolean).join('\n');

	const rewriteHtml = (html) => {
		// Inline known JS files
			html = html.replace(/<script([^>]*?)src=["']([^"']+)["']([^>]*)><\s*\/script>/gi, (m, pre, src, post) => {
			// normalize to absolute-like path used in challenge files
			let path = src.startsWith('/') ? src : ('/' + src.replace(/^\.\/?/, ''));
			const spec = files[path];
			if (!spec || typeof spec.code !== 'string') return m;
			const typeMatch = /type=["']([^"']+)["']/i.exec(pre + ' ' + post);
			const type = typeMatch ? typeMatch[1] : 'module';
				return getScriptInline(withSourceURL(spec.code, path), type);
		});

		// Inline known CSS files
		html = html.replace(/<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi, (m, href) => {
			let path = href.startsWith('/') ? href : ('/' + href.replace(/^\.\/?/, ''));
			const spec = files[path];
			if (!spec || typeof spec.code !== 'string') return m;
			return getStyleInline(spec.code);
		});

		// Inject head extras after <head> open if present, else at top of body
		if (/<head[^>]*>/i.test(html)) {
			return html.replace(/<head[^>]*>/i, (tag) => tag + '\n' + headExtras + '\n');
		}
		if (/<body[^>]*>/i.test(html)) {
			return html.replace(/<body[^>]*>/i, (tag) => tag + '\n' + headExtras + '\n');
		}
		return headExtras + html;
	};

	if (/\.html?$/i.test(entry)) {
		const html = fileFor(entry) ?? '<!doctype html><html><head><meta charset="utf-8"><title>Preview</title></head><body></body></html>';
		return rewriteHtml(html);
	}

	// JS entry: minimal shell
		const js = withSourceURL(fileFor(entry) ?? '', entry);
	const styles = Object.entries(files)
		.filter(([p]) => p.endsWith('.css'))
		.map(([, s]) => getStyleInline(s.code))
		.join('\n');
	const html = `<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Preview</title>
			${headExtras}
			${styles}
		</head>
		<body>
			<div id="app"></div>
			${getScriptInline(js, 'module')}
		</body>
	</html>`;
	return html;
}

export default buildSrcDoc;
