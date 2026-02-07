// Aggregate and export a single list for higher-order array method practice
import { filterChallenges } from './filter.js';
import { mapChallenges } from './map.js';
import { findChallenges } from './find.js';
import { chainedChallenges } from './chained.js';
import { forEachChallenges } from './forEach.js';

// Simple concatenation then optional shuffle or ordering could be applied.
// Keep grouped by method for progressive learning.
export const challenges = [
  ...filterChallenges,
  ...mapChallenges,
  ...findChallenges,
  ...chainedChallenges
  ,...forEachChallenges
];
