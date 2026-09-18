## 2025-05-18 - Top-level App State Changes Trigger Unnecessary Re-renders Across Heavy Motion Sections

**Learning:** In a single-page dashboard app with multiple modal states and form inputs at the top level (`App.tsx`), keystroke updates or modal state toggles cause every child section (`HeroTelemetryCard`, `CompetitorTable`, `SolutionsSection`, etc.) to re-render. These sections contain animated `motion` elements and background images, causing unnecessary DOM reconciliation and animation layout calculations.

**Action:** Wrap presentational sections and modals in `React.memo` and memoize parent callback props with `useCallback` to isolate render scopes.

## 2025-05-19 - AnimatePresence Key-Swapping on Continuous Inputs Causes DOM Node Thrashing

**Learning:** Wrapping rapidly changing state variables (such as range slider numbers like `netSavings` or `annualSavings`) in `AnimatePresence` with `key={value}` forces Framer Motion to unmount, destroy, recreate, and mount new DOM nodes on every mousemove tick (60–120Hz), creating severe main-thread jank and DOM node thrashing during slider dragging.

**Action:** Avoid using `AnimatePresence` with dynamic numeric keys on interactive slider outputs; render the formatted numeric string directly within the element for butter-smooth 60fps slider updates.

## 2025-05-20 - Continuous Motion JS Animations and AnimatePresence Ticks Offload Heavy Work to Main Thread

**Learning:** Using `AnimatePresence` with dynamic keys on interval-based state changes (like live telemetry readouts) causes unnecessary unmounting/re-mounting of DOM nodes on every interval tick. Similarly, continuous infinite loop animations (like scanline sweeps) driven by JS Framer Motion inline styles create continuous main-thread JS frame updates.

**Action:** Render dynamic telemetry values directly in standard HTML elements and replace continuous JS motion loops with GPU-accelerated CSS keyframe animations.
