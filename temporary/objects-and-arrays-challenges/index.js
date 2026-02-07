// Aggregate and export a single list
import { bracket } from './bracket.js';
import { nested } from './nested.js';
import { arrays } from './arrays.js';
import { arraysOfObjects } from './arraysOfObjects.js';
import { updateDelete } from './updateDelete.js';

// Interleave modules for mixed practice
function interleave(...lists) {
  const max = Math.max(...lists.map(l => l.length));
  const out = [];
  for (let i = 0; i < max; i++) {
    for (const list of lists) {
      if (i < list.length) out.push(list[i]);
    }
  }
  return out;
}

export const challenges = interleave(
  bracket,
  nested,
  arrays,
  arraysOfObjects,
  updateDelete
);
