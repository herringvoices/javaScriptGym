/**
 * @typedef {Object} FileSpec
 * @property {string} code
 * @property {boolean} [readOnly]
 * @property {boolean} [hidden]
 * @property {boolean} [active]
 */

/**
 * @typedef {Object} CompletionRule
 * @property {"dom" | "predicate"} kind
 * @property {string} [selector]
 * @property {string} [textIncludes]
 * @property {string} [code]
 */

/**
 * @typedef {Object} Challenge
 * @property {string} id
 * @property {string} title
 * @property {"CODE_AND_SEE"} challengeType
 * @property {string[]} standards
 * @property {string} primaryStandard
 * @property {1 | 2 | 3 | 4 | 5} [difficulty]
 * @property {string} description
 * @property {string[]} [userStories]
 * @property {string[]} [acceptanceCriteria]
 * @property {"react" | "vanilla" | "static"} [template]
 * @property {Record<string, FileSpec>} files
 * @property {string} [entry]
 * @property {CompletionRule} [completion] // (Optional) still available if lightweight completion returns later.
 * @property {string[]} [hints]
 * @property {string[]} [tags]
 * @property {ChallengeSandboxPrefs} [sandbox]
 * @property {{ apiSeed?: any, mockNet?: any }} [mock] // Author-only metadata to seed fetch mock.
 * @property {boolean} [isCompleted] // Derived/UI state: whether the user has marked this challenge complete.
 */

/**
 * @typedef {Object} ChallengeSandboxPrefs
 * @property {"preview"|"console"} [defaultPanel] Default right panel to show.
 * @property {boolean} [showRightPanel=true] Whether right panel is visible initially.
 * @property {boolean} [showExplorer=true] Whether file explorer starts open.
 */

/**
 * @typedef {Object} StandardMeta
 * @property {string} id
 * @property {string} title
 * @property {string} short
 * @property {string} bodyMd
 */

export const ChallengeTypes = Object.freeze({
  CODE_AND_SEE: "CODE_AND_SEE",
});

export const ChallengeTemplates = Object.freeze({
  REACT: "react",
  VANILLA: "vanilla",
  STATIC: "static",
});

export const CompletionKinds = Object.freeze({
  DOM: "dom",
  PREDICATE: "predicate",
});

// Tests removed: legacy CODE_AND_TEST / IDENTIFY_VALUE types deprecated.
