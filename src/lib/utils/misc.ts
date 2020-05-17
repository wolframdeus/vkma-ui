/**
 * Shallowly compares 2 objects
 * @param {L} left
 * @param {R} right
 * @returns {boolean}
 */
export function shallowEqual<L extends Record<any, any>,
  R extends Record<any, any>>(left: L, right: R): boolean {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);

  if (leftKeys.length !== rightKeys.length) {
    return false;
  }
  return leftKeys.every(k => {
    return rightKeys.includes(k) && left[k] === right[k];
  });
}
