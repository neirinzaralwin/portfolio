/**
 * Tiny event bus so above-the-fold animations wait for the preloader
 * curtain instead of playing underneath it.
 */
let done = false;
const queue: Array<() => void> = [];

export function onIntroDone(cb: () => void) {
  if (done) {
    cb();
    return () => {};
  }
  queue.push(cb);
  return () => {
    const i = queue.indexOf(cb);
    if (i > -1) queue.splice(i, 1);
  };
}

export function markIntroDone() {
  if (done) return;
  done = true;
  queue.splice(0).forEach((cb) => cb());
}
