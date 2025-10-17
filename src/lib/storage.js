export const loadSaved = (id) => JSON.parse(localStorage.getItem(`playground:${id}:files`) || "{}");
export const saveFile = (id, path, code) => {
  const k = `playground:${id}:files`;
  const cur = JSON.parse(localStorage.getItem(k) || "{}");
  cur[path] = { code };
  localStorage.setItem(k, JSON.stringify(cur));
};
export const resetSaved = (id) => localStorage.removeItem(`playground:${id}:files`);
