// Decide which Sandpack bundler to use at runtime.
// Returns an absolute path (like "/sandpack/") when the local vendored bundler should be used,
// or undefined to allow Sandpack to use its default remote bundler.
export function getBundlerURL() {
  const cfg = typeof window !== "undefined" ? window.APP_SETTINGS : undefined;
  // If settings.js provides an explicit boolean, honor it; otherwise prefer local by default.
  // Rationale: local projects and restricted environments benefit from the vendored bundler; hosted prod can
  // explicitly disable via settings.js.
  let useLocal = (cfg && typeof cfg.useLocalBundler === "boolean")
    ? cfg.useLocalBundler
    : true;

  // If we're offline (no internet), prefer the local vendored bundler automatically
  try {
    if (typeof navigator !== "undefined" && navigator && navigator.onLine === false) {
      useLocal = true;
    }
  } catch {
    // ignore: conservative default already set
  }

  if (!useLocal) return undefined;
  return cfg?.bundlerURL || "/sandpack/"; // default path inside public/
}
