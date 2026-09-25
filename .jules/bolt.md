## 2025-05-18 - Top-level App State Changes Trigger Unnecessary Re-renders Across Heavy Motion Sections

**Learning:** In a single-page dashboard app with multiple modal states and form inputs at the top level (`App.tsx`), keystroke updates or modal state toggles cause every child section (`HeroTelemetryCard`, `CompetitorTable`, `SolutionsSection`, etc.) to re-render. These sections contain animated `motion` elements and background images, causing unnecessary DOM reconciliation and animation layout calculations.

**Action:** Wrap presentational sections and modals in `React.memo` and memoize parent callback props with `useCallback` to isolate render scopes.

## 2025-05-19 - AnimatePresence Key-Swapping on Continuous Inputs Causes DOM Node Thrashing

**Learning:** Wrapping rapidly changing state variables (such as range slider numbers like `netSavings` or `annualSavings`) in `AnimatePresence` with `key={value}` forces Framer Motion to unmount, destroy, recreate, and mount new DOM nodes on every mousemove tick (60–120Hz), creating severe main-thread jank and DOM node thrashing during slider dragging.

**Action:** Avoid using `AnimatePresence` with dynamic numeric keys on interactive slider outputs; render the formatted numeric string directly within the element for butter-smooth 60fps slider updates.

## 2025-05-20 - Continuous Motion JS Animations and AnimatePresence Ticks Offload Heavy Work to Main Thread

**Learning:** Using `AnimatePresence` with dynamic keys on interval-based state changes (like live telemetry readouts) causes unnecessary unmounting/re-mounting of DOM nodes on every interval tick. Similarly, continuous infinite loop animations (like scanline sweeps) driven by JS Framer Motion inline styles create continuous main-thread JS frame updates.

**Action:** Render dynamic telemetry values directly in standard HTML elements and replace continuous JS motion loops with GPU-accelerated CSS keyframe animations.

## 2025-05-21 - Un-promoted Continuous CSS Keyframes and Broad Property Transitions Cause Main-Thread Paint & Layout Churn

**Learning:** Continuous 60fps CSS keyframe animations (like HUD scanlines and radar sweeps) without `will-change: transform` cause main-thread paint invalidation on every frame. Additionally, applying `transition-all` to elements whose `width` is updated continuously at 60–120Hz during slider dragging forces browser style tracking overhead across all CSS properties.

**Action:** Add `will-change: transform` to continuous HUD keyframe classes to promote them to GPU compositor layers, and isolate dynamic bar width transitions using `transition-[width]`.

## 2025-05-22 - Callback Memoization for Native DOM Elements and State-Dependent Handlers Adds Overhead Without Performance Gain

**Learning:** Wrapping event handlers in `useCallback` when passed directly to native HTML elements (like `<button>`) or when the handler depends on rapidly changing input state does not prevent re-renders. Native DOM elements do not check prop equality, and state dependencies cause `useCallback` to invalidate on every keystroke anyway, adding hook tracking overhead without rendering benefits.

**Action:** Only wrap callback functions in `useCallback` when passing them as props to memoized custom components (`React.memo`), and ensure their dependency array does not invalidate on every user input event.

## 2025-05-23 - Co-locating Form Email State in Heavy Interactive Calculator Screens Prevents Keystroke Reconciliation Churn

**Learning:** Declaring form input state (`emailInput`) at the root level of a large interactive screen component (`ModelerScreen.tsx`) causes every keystroke in a bottom CTA form to trigger full VDOM diffing and re-renders across all child sections (financial modelers, comparative benchmark cards, qualification checklists, and motion elements).

**Action:** Isolate input form state into a dedicated memoized sub-component (`BoardBriefForm`) and pass a memoized `useCallback` handler to isolate keystroke re-renders strictly to the form element.

## 2025-05-24 - Dynamic State Dependencies in Callbacks Defeat Child Component Memoization During High-Frequency Events

**Learning:** Passing a `useCallback` handler with dynamic state dependencies (like `miles`, `spend`, `calculations`) to a memoized child component (`BoardBriefForm`) invalidates the callback reference on every 60–120Hz range slider drag tick. This causes the child component to bypass `React.memo` and re-render every frame during interactive slider adjustments.

**Action:** Maintain a `useRef` holding current model state to keep the callback reference strictly stable (`deps: []`) when passed to memoized child components, preserving full `React.memo` render isolation during high-frequency input events.

## 2025-05-25 - Extracting Unchanging Static UI Subtrees into React.memo Components Prevents VDOM Re-diffing During High-Frequency Events

**Learning:** In interactive screens containing range sliders or real-time inputs (`ModelerScreen.tsx`), state updates triggered at 60–120Hz cause the parent component to re-render. Unmemoized static subtrees (such as hero headers, badge rows, and 100+ line qualification matrices) are re-created and diffed in the VDOM on every single frame, creating unnecessary main-thread overhead.

**Action:** Extract static UI subtrees into separate sub-components wrapped in `React.memo` (and pass stable props if needed) so React skips VDOM creation and reconciliation for static subtrees during high-frequency user interactions.
