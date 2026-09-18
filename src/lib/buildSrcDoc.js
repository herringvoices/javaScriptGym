import { parse as parseJavaScript } from 'acorn';
import { parse as parseHtml } from 'parse5';
import MagicString from 'magic-string';
import { createRuntimeProtocol } from './runtimeProtocol.js';
import { installConsoleBridge } from './consoleBridge.js';

export function normalizePath(path) {
  const parts = [];
  for (const part of String(path).replace(/\\/g, '/').split('/')) {
    if (part === '..') parts.pop();
    else if (part && part !== '.') parts.push(part);
  }
  return '/' + parts.join('/');
}

// Also serialized for computed import() expressions in the preview.
function resolveImport(specifier, from, paths, prefix) {
  if (typeof specifier !== 'string') specifier = String(specifier);
  if (/^[a-z][a-z\d+.-]*:/i.test(specifier) || specifier.startsWith('//')) return specifier;
  const parts = [];
  const path = specifier.startsWith('.') ? from.slice(0, from.lastIndexOf('/') + 1) + specifier : specifier;
  for (const part of path.split('/')) {
    if (part === '..') parts.pop();
    else if (part && part !== '.') parts.push(part);
  }
  let resolved = '/' + parts.join('/');
  if (!paths.includes(resolved) && paths.includes(resolved + '.js')) resolved += '.js';
  return prefix + resolved.split('/').map(encodeURIComponent).join('/');
}

function walk(node, visit) {
  visit(node);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach(child => { if (child?.type) walk(child, visit); });
    else if (value?.type) walk(value, visit);
  }
}

const dataUrl = code => `data:text/javascript;charset=utf-8,${encodeURIComponent(code)}`;
const scriptJson = value => JSON.stringify(value).replace(/</g, '\\u003c');
const escapeAttribute = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

/** Each run has a fresh document but stable source identities within its workspace. */
export function buildSrcDoc({ files, entry, workspaceId = 'workspace', runId = 'standalone' }) {
  entry = normalizePath(entry);
  const namespace = String(workspaceId || 'workspace').split(':').filter(Boolean).map(encodeURIComponent).join('/');
  const prefix = `jsgym-module://modules/${namespace}`;
  const paths = Object.keys(files).filter(path => /\.(m?js)$/i.test(path) && !path.startsWith('/__'));
  const sources = {};
  const aliases = {};
  const imports = {};
  const cache = new Map();
  const resolve = (specifier, from) => resolveImport(specifier, from, paths, prefix);

  function compile(code, file, module, inlineRange = null, identity = file) {
    const cacheKey = `${identity}:${module}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey);
    const original = inlineRange ? files[file].code : code;
    const transformed = new MagicString(original);
    const offset = inlineRange?.start || 0;
    if (inlineRange) {
      transformed.remove(0, inlineRange.start);
      transformed.remove(inlineRange.end, original.length);
    }
    if (module) {
      let ast;
      try { ast = parseJavaScript(code, { ecmaVersion: 'latest', sourceType: 'module' }); }
      catch { /* Let the browser produce the actual SyntaxError and location. */ }
      if (ast) walk(ast, node => {
        if (['ImportDeclaration', 'ExportNamedDeclaration', 'ExportAllDeclaration'].includes(node.type) && node.source) {
          transformed.overwrite(offset + node.source.start, offset + node.source.end, JSON.stringify(resolve(node.source.value, file)));
        }
        if (node.type === 'ImportExpression') {
          if (node.source.type === 'Literal' && typeof node.source.value === 'string') {
            transformed.overwrite(offset + node.source.start, offset + node.source.end, JSON.stringify(resolve(node.source.value, file)));
          } else {
            transformed.appendLeft(offset + node.source.start, 'globalThis.__jsgymResolve((');
            transformed.appendRight(offset + node.source.end, `),${JSON.stringify(file)})`);
          }
        }
      });
    }
    const encodedPath = identity.split('/').map(encodeURIComponent).join('/');
    const url = `jsgym-runtime://generated/${namespace}${encodedPath}${module ? '' : '?classic'}`;
    const source = `jsgym://student/${namespace}${file.split('/').map(encodeURIComponent).join('/')}`;
    const map = transformed.generateMap({ source, includeContent: true, hires: true });
    const decoded = transformed.generateDecodedMap({ source, hires: true });
    const compiled = `${transformed.toString()}\n//# sourceURL=${url}\n//# sourceMappingURL=${map.toUrl()}`;
    const transport = dataUrl(compiled);
    sources[url] = { file, mappings: decoded.mappings, lineCount: original.split('\n').length };
    aliases[transport] = url;
    cache.set(cacheKey, transport);
    return transport;
  }

  for (const path of paths) imports[resolve(path, '/')] = compile(files[path].code, path, true);
  // Older saved workspaces may still contain adapter-injected helper imports.
  // Helpers already execute once, as classic scripts, before any student code.
  for (const path of ['/__bridge__.js', '/__mocks__/fetch.js']) {
    if (files[path]) imports[resolve(path, '/')] = dataUrl('export {};');
  }

  const isHtml = /\.html?$/i.test(entry);
  const html = isHtml ? files[entry]?.code || '' : '<!doctype html><html><head><meta charset="utf-8"><title>Preview</title></head><body><div id="app"></div></body></html>';
  const document = parseHtml(html, { sourceCodeLocationInfo: true });
  const output = new MagicString(html);
  let headOffset = 0;
  let bodyEnd = html.length;
  let inlineIndex = 0;
  function visit(node) {
    const loc = node.sourceCodeLocation;
    const attrs = Object.fromEntries((node.attrs || []).map(attr => [attr.name, attr.value]));
    if (node.tagName === 'head' && loc?.startTag) headOffset = loc.startTag.endOffset;
    if (node.tagName === 'body' && loc?.endTag) bodyEnd = loc.endTag.startOffset;
    if (node.tagName === 'script' && loc?.startTag) {
      const type = (attrs.type || '').trim().toLowerCase();
      const module = type === 'module';
      const executable = module || !type || /^(?:text|application)\/(?:java|ecma)script$/.test(type);
      if (executable) {
        let transport;
        if (attrs.src) {
          const path = normalizePath(attrs.src.startsWith('/') ? attrs.src : entry.slice(0, entry.lastIndexOf('/') + 1) + attrs.src);
          if (!/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(attrs.src) && files[path]) {
            transport = ['/__bridge__.js', '/__mocks__/fetch.js'].includes(path) ? dataUrl('') : compile(files[path].code, path, module);
          }
        } else if (loc.endTag) {
          const start = loc.startTag.endOffset;
          const end = loc.endTag.startOffset;
          transport = compile(html.slice(start, end), entry, module, { start, end }, `${entry}/inline-${++inlineIndex}.js`);
        }
        if (transport) {
          // Keep async/defer/nomodule and other author attributes.
          const kept = (node.attrs || []).filter(attr => !['src', 'integrity', 'crossorigin'].includes(attr.name));
          const attributes = kept.map(attr => ` ${attr.name}="${escapeAttribute(attr.value)}"`).join('');
          output.overwrite(loc.startOffset, loc.endOffset, `<script${attributes} crossorigin="anonymous" src="${escapeAttribute(transport)}"></script>`);
        }
      }
    }
    if (node.tagName === 'link' && attrs.rel?.toLowerCase() === 'stylesheet' && attrs.href && loc) {
      const path = normalizePath(attrs.href.startsWith('/') ? attrs.href : entry.slice(0, entry.lastIndexOf('/') + 1) + attrs.href);
      if (files[path]) output.overwrite(loc.startOffset, loc.endOffset, `<style>${files[path].code.replace(/<\/style/gi, '<\\/style')}</style>`);
    }
    (node.childNodes || []).forEach(visit);
  }
  visit(document);
  if (!isHtml) {
    const transport = compile(files[entry]?.code || '', entry, true);
    const styles = Object.entries(files).filter(([path]) => path.endsWith('.css')).map(([, file]) => `<style>${file.code.replace(/<\/style/gi, '<\\/style')}</style>`).join('');
    output.appendLeft(bodyEnd, `${styles}<script type="module" src="${escapeAttribute(transport)}"></script>`);
  }
  const config = scriptJson({ runId, sources, aliases });
  const hook = `(${installConsoleBridge.toString()})(${config},${createRuntimeProtocol.toString()});\n` +
    `globalThis.__jsgymResolve=(specifier,from)=>(${resolveImport.toString()})(specifier,from,${scriptJson(paths)},${scriptJson(prefix)});\n//# sourceURL=jsgym-internal://console.js`;
  // Helpers are separate resources too: no HTML offsets enter student stacks.
  const extras = [
    `<script src="${escapeAttribute(dataUrl(hook))}"></script>`,
    ...['/__bridge__.js', '/__mocks__/fetch.js'].filter(path => files[path]).map(path => `<script src="${escapeAttribute(dataUrl(files[path].code + `\n//# sourceURL=jsgym-internal:/${path}`))}"></script>`),
    `<script type="importmap">${scriptJson({ imports })}</script>`,
  ].join('\n');
  output.appendLeft(headOffset, extras);
  return output.toString();
}

export default buildSrcDoc;
