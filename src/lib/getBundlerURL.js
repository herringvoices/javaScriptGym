// Decide which Sandpack bundler to use at runtime.
// Returns an absolute path (like "/sandpack/") when the local vendored bundler should be used,
// or undefined to allow Sandpack to use its default remote bundler.
export function getBundlerURL() {
  const cfg = typeof window !== "undefined" ? window.APP_SETTINGS : undefined;
  // If settings.js provides an explicit boolean, honor it; otherwise fall back to dev mode convenience.
  const useLocal = (cfg && typeof cfg.useLocalBundler === "boolean")
    ? cfg.useLocalBundler
    : (import.meta?.env?.DEV ?? false);

  if (!useLocal) return undefined;
  return cfg?.bundlerURL || "/sandpack/"; // default path inside public/
}
