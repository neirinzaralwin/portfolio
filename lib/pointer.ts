/** Shared pointer-velocity tracker used by the inertia hover effects. */
let listening = false;
let oldX = 0;
let oldY = 0;

export const pointerDelta = { x: 0, y: 0 };

export function trackPointer() {
  if (listening || typeof window === "undefined") return;
  listening = true;
  window.addEventListener(
    "mousemove",
    (e) => {
      pointerDelta.x = e.clientX - oldX;
      pointerDelta.y = e.clientY - oldY;
      oldX = e.clientX;
      oldY = e.clientY;
    },
    { passive: true }
  );
}
