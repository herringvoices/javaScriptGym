// Utilities for linear mastery-based unlocking of challenges
import { standardOrder } from "../data/standards";

const STORAGE_KEY = "practiceTool.masteredStandards";

function safeGet() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function safeSet(arr) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(arr ?? []));
  } catch {
    // ignore write errors
  }
}

export function loadMastered() {
  return new Set(safeGet());
}

export function saveMastered(masteredSet) {
  const arr = Array.from(masteredSet || []);
  safeSet(arr);
}

function getIndex(standardId) {
  return standardOrder.indexOf(standardId);
}

// Returns the index of the first not-mastered standard in standardOrder,
// treating "overview" as implicitly mastered so that the first real standard
// becomes the initial current target. If all are mastered, returns the final index.
export function currentUnlockIndex(masteredSet = loadMastered()) {
  for (let i = 0; i < standardOrder.length; i++) {
    const id = standardOrder[i];
    if (id === "overview") continue; // overview always unlocked
    if (!masteredSet.has(id)) return i;
  }
  return Math.max(standardOrder.length - 1, 0);
}

export function isStandardUnlocked(standardId, masteredSet = loadMastered()) {
  if (!standardId || standardId === "overview") return true;
  const idx = getIndex(standardId);
  if (idx === -1) return true; // unknown standards are treated as unlocked
  return idx <= currentUnlockIndex(masteredSet);
}

// Filter challenges based on unlocks. If options.showLocked is true, returns the
// original list. Completed challenges are always included regardless of lock.
export function filterByUnlock(challenges, masteredSet = loadMastered(), options = {}) {
  const { showLocked = false } = options || {};
  if (showLocked) return challenges;
  return challenges.filter((challenge) => {
    if (challenge?.isCompleted) return true;
    const std = challenge?.primaryStandard || challenge?.standards?.[0];
    return isStandardUnlocked(std, masteredSet);
  });
}

export { STORAGE_KEY as MASTERED_STORAGE_KEY };
