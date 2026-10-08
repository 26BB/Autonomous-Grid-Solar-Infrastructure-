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

## 2025-05-25 - Extracting Large Static JSX Blocks in Interactive Screens into Memoized Subcomponents Prevents High-Frequency VDOM Diffing

**Learning:** Rendering large static markup blocks (such as complex matrix/checklist cards with multiple icons and buttons) directly inside interactive components (`ModelerScreen.tsx`) causes React to recreate and diff all those static VDOM nodes on every single 60–120Hz slider movement tick.

**Action:** Extract large static JSX blocks into dedicated `React.memo` subcomponents (`GrantQualificationMatrix`), passing only stable callback props to isolate them completely from slider state updates during interactive dragging.

## 2025-05-26 - Primitive Prop Memoization in Subcomponents Prevents Unnecessary Re-evaluations

**Learning:** Extracting large comparative visualization sections (such as 3-year cost benchmarks with multiple motion cards and lists) into memoized subcomponents (`CostBenchmarkSection`) with primitive numeric/boolean props cleanly modularizes the component tree and allows React to skip re-renders whenever step thresholds don't alter calculation outputs.

**Action:** Pass primitive numbers/booleans rather than large composite calculation objects to memoized subcomponents so `React.memo`'s default shallow comparison works cleanly and reliably.

## 2025-05-27 - Sub-Card Component Granularity Prevents Unnecessary Child Re-renders During Single-Slider Adjustments

**Learning:** When a composite parent component (such as `CostBenchmarkSection` or `ModelerScreen`) contains multiple distinct visual cards, moving a single range slider (such as line mileage) causes all cards in the section to re-render—even cards whose inputs (like legacy helicopter spend) depend solely on annual spend and remain completely unchanged.

**Action:** Break multi-card sections into fine-grained `React.memo` subcomponents (`HelicopterCostCard`, `ManualUavCostCard`, `ModelerHeader`, `ExecutiveBoardBriefSection`), enabling `React.memo` shallow comparison to skip re-rendering cards whose specific props haven't changed during single-slider dragging.

## 2025-05-28 - Isolating Interactive Calculator Yield Displays into Memoized Subcomponents Eliminates Right-Column VDOM Reconciliation

**Learning:** Rendering complex financial yield metrics and proposal lock CTA buttons directly inside an interactive calculator workspace component (`ModelerScreen.tsx`) causes React to re-evaluate and diff the entire right-column card tree on every 60–120Hz slider movement tick—even when slider movements within step thresholds produce identical primitive yield outputs.

**Action:** Extract right-column yield display cards into dedicated `React.memo` subcomponents (`YieldMetricsCard`), passing primitive calculation values and stable `useCallback` handlers backed by `modelDataRef` (`deps: []`) to eliminate unnecessary VDOM diffing during slider dragging.

## 2025-05-29 - Extracting Embedded Calculator Subcomponents and Stabilizing Action Callbacks Prevents Unnecessary Re-evaluations

**Learning:** Declaring static section headings and dynamic yield cards directly in `EmbeddedCalculator.tsx` caused static VDOM nodes to be re-evaluated on every range slider drag tick (60–120Hz), while action callbacks with state dependencies (`[sizeText, annualSavings]`) were re-allocated every frame.

**Action:** Extract static headers into `EmbeddedCalculatorHeader` (`React.memo`) and yield displays into `EmbeddedYieldCard` (`React.memo`), backing modal action callbacks with `calcDataRef` (`deps: []`) to preserve callback reference stability during high-frequency slider dragging.
