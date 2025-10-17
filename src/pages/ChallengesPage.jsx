import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChallengeCard from "../components/ChallengeCard";
import ChallengeFilters from "../components/ChallengeFilters";
import Markdown from "../components/Markdown";
import Modal from "../components/Modal";
import StandardsBadges from "../components/StandardsBadges";
import MasteryModal from "../components/MasteryModal";
import challenges from "../data/challenges";
import standards, { standardOrder } from "../data/standards";
import useLocalStorage from "../hooks/useLocalStorage";
import Callout from "../components/Callout";
import { filterByUnlock, isStandardUnlocked, loadMastered, currentUnlockIndex } from "../lib/mastery";

const difficultyOptions = [
  { value: 1, label: "★ Novice" },
  { value: 2, label: "★★ Intermediate" },
  { value: 3, label: "★★★ Advanced" },
  { value: 4, label: "★★★★ Expert" },     // new
  { value: 5, label: "★★★★★ Capstone" },   // new
];

const getCategoryLabel = (standardId) => {
  const standard = standards[standardId];
  if (!standard) return standardId;
  const [strand, focus] = standard.title.split("·").map((part) => part.trim());
  return focus ?? strand;
};

export default function ChallengesPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [hideCompleted, setHideCompleted] = useState(false);
  // Mastery preferences and modal
  const [respectOrder, setRespectOrder] = useLocalStorage("prefs:respectOrder", true);
  const [showLocked, setShowLocked] = useLocalStorage("prefs:showLocked", false);
  const [masteryOpen, setMasteryOpen] = useState(false);
  const [unlockToast, setUnlockToast] = useState(null); // { label, until }
  const prevUnlockRef = useRef(null);

  // Track completed challenges (array of challenge ids) in localStorage
  const [completedIds, setCompletedIds] = useLocalStorage("completedChallenges", []);

  const isChallengeCompleted = useCallback((id) => completedIds.includes(id), [completedIds]);
  const markCompleted = (id) => {
    setCompletedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };
  const unmarkCompleted = (id) => {
    setCompletedIds((prev) => prev.filter((cId) => cId !== id));
  };

  const categoryOptions = useMemo(() => {
    const allCategories = new Set();
    challenges.forEach((challenge) => {
      const standardId = challenge.primaryStandard || challenge.standards?.[0];
      if (!standardId) return;
      const label = getCategoryLabel(standardId);
      if (label) {
        allCategories.add(label);
      }
    });
    return Array.from(allCategories)
      .sort()
      .map((label) => ({ value: label, label }));
  }, []);

  const filteredChallenges = useMemo(() => {
    const mastered = loadMastered();
    let list = challenges
      .map((c) => ({ ...c, isCompleted: isChallengeCompleted(c.id) }))
      .filter((challenge) => {
        const matchesCategory = !selectedCategory ||
          getCategoryLabel(challenge.primaryStandard || challenge.standards?.[0]) === selectedCategory;
        const matchesDifficulty =
          !selectedDifficulty || challenge.difficulty === selectedDifficulty;
        const matchesCompletion = !hideCompleted || !challenge.isCompleted;
        return matchesCategory && matchesDifficulty && matchesCompletion;
      });
    if (respectOrder) {
      list = filterByUnlock(list, mastered, { showLocked });
    }
    return list;
  }, [selectedCategory, selectedDifficulty, hideCompleted, isChallengeCompleted, respectOrder, showLocked]);

  const handleRandom = () => {
    if (!filteredChallenges.length) return;
    const randomIndex = Math.floor(Math.random() * filteredChallenges.length);
    const randomChallenge = filteredChallenges[randomIndex];
    setSelectedChallenge(randomChallenge);
  };

  const openChallenge = (challenge) => {
    setSelectedChallenge({ ...challenge, isCompleted: isChallengeCompleted(challenge.id) });
  };

  const closeModal = () => setSelectedChallenge(null);

  const startChallenge = (challenge) => {
    navigate(`/challenge/${challenge.id}`);
    setSelectedChallenge(null);
  };

  // Auto-dismiss success toast
  useEffect(() => {
    if (!unlockToast) return;
    const t = setTimeout(() => setUnlockToast(null), 4000);
    return () => clearTimeout(t);
  }, [unlockToast]);

  const masteredForRender = loadMastered();

  return (
    <section className="space-y-8">
      {unlockToast ? (
        <Callout type="tip" title="Progress unlocked!">
          <p>
            Nice! Challenges for <span className="font-semibold">{unlockToast.label}</span> are now unlocked.
          </p>
        </Callout>
      ) : null}
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-brand-300">Practice Playground</p>
        <h1 className="text-3xl font-semibold text-white">Challenges</h1>
        <p className="max-w-2xl text-sm text-slate-300">
          Filter by standard category or difficulty, preview ticket details, and then launch the
          challenge runner when you are ready to build.
        </p>
      </header>

      {/* Mastery controls */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <button
          type="button"
          className="inline-flex items-center rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
          onClick={() => {
            const before = currentUnlockIndex(loadMastered());
            prevUnlockRef.current = before;
            setMasteryOpen(true);
          }}
        >
          Standards I Know
        </button>
        <label className="ml-2 inline-flex items-center gap-2 text-sm text-slate-200">
          <input
            type="checkbox"
            className="h-4 w-4 accent-brand-500"
            checked={Boolean(respectOrder)}
            onChange={(e) => setRespectOrder(Boolean(e.target.checked))}
          />
          Respect mastery order
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-slate-200">
          <input
            type="checkbox"
            className="h-4 w-4 accent-brand-500"
            checked={Boolean(showLocked)}
            onChange={(e) => setShowLocked(Boolean(e.target.checked))}
            disabled={!respectOrder}
          />
          Show locked
        </label>
      </div>

      <ChallengeFilters
        categories={categoryOptions}
        difficulties={difficultyOptions}
        selectedCategory={selectedCategory}
        selectedDifficulty={selectedDifficulty}
        onCategoryChange={setSelectedCategory}
        onDifficultyChange={setSelectedDifficulty}
        onRandom={handleRandom}
        isRandomDisabled={!filteredChallenges.length}
        hideCompleted={hideCompleted}
        onHideCompletedChange={setHideCompleted}
      />

      {filteredChallenges.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredChallenges.map((challenge) => {
            const std = challenge.primaryStandard || challenge.standards?.[0];
            const locked = respectOrder ? !isStandardUnlocked(std, masteredForRender) && !challenge.isCompleted : false;
            return (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                onSelect={openChallenge}
                isLocked={locked}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/60 p-8 text-center">
          <p className="text-lg font-semibold text-white">No challenges found</p>
          <p className="mt-2 text-sm text-slate-300">
            Adjust the filters or clear them to see all available practice prompts.
          </p>
        </div>
      )}

      <Modal
        isOpen={Boolean(selectedChallenge)}
        onClose={closeModal}
        title={selectedChallenge?.title}
      >
        {selectedChallenge ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-300">
                {selectedChallenge.challengeType.replaceAll("_", " ")}
              </span>
              {selectedChallenge.isCompleted ? (
                <span className="rounded-full bg-emerald-600/20 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-600/40">
                  Completed
                </span>
              ) : null}
              <span className="text-sm text-slate-300">
                Difficulty:{" "}
                {"★".repeat(selectedChallenge.difficulty ?? 0) || "-"}
              </span>
            </div>

            <StandardsBadges standards={selectedChallenge.standards} />

            <Markdown className="mt-2 text-sm text-slate-100">
              {selectedChallenge.description}
            </Markdown>

            {selectedChallenge.userStories?.length ? (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                  User Stories
                </h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                  {selectedChallenge.userStories.map((story) => (
                    <li key={story}>{story}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {selectedChallenge.acceptanceCriteria?.length ? (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                  Acceptance Criteria
                </h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                  {selectedChallenge.acceptanceCriteria.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {selectedChallenge.hints?.length ? (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                  Hints
                </h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                  {selectedChallenge.hints.map((hint) => (
                    <li key={hint}>{hint}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="flex flex-wrap justify-end gap-3 pt-2">
              {selectedChallenge.isCompleted ? (
                <button
                  type="button"
                  onClick={() => {
                    unmarkCompleted(selectedChallenge.id);
                    setSelectedChallenge((prev) => prev ? { ...prev, isCompleted: false } : prev);
                  }}
                  className="inline-flex items-center rounded-full border border-emerald-500/40 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                >
                  Mark incomplete
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    markCompleted(selectedChallenge.id);
                    setSelectedChallenge((prev) => prev ? { ...prev, isCompleted: true } : prev);
                  }}
                  className="inline-flex items-center rounded-full border border-emerald-500/40 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                >
                  Mark complete
                </button>
              )}
              <button
                type="button"
                onClick={() => startChallenge(selectedChallenge)}
                className="inline-flex items-center rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
              >
                Start challenge
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex items-center rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
              >
                Keep browsing
              </button>
            </div>
          </div>
        ) : null}
      </Modal>

      <MasteryModal
        open={masteryOpen}
        onClose={() => {
          setMasteryOpen(false);
          const after = currentUnlockIndex(loadMastered());
          const before = prevUnlockRef.current;
          if (typeof before === "number" && after > before) {
            const id = standardOrder[after];
            const meta = standards[id];
            const label = meta?.title?.split("·")[1]?.trim() || meta?.title || id;
            setUnlockToast({ label, until: Date.now() + 4000 });
          }
        }}
      />
    </section>
  );
}
