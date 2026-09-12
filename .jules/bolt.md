 bolt/memoize-modeler-screen-subcomponents-18212683154379650630
# Bolt's Performance Journal - AeroDock Systems

## 2025-05-20 - Modeler Screen Component Decomposition & Memoization
**Learning:** Large interactive screens with high-frequency inputs (such as range sliders and text input fields) in `ModelerScreen.tsx` trigger full component tree re-renders across all sub-sections (3-Year Cumulative Cost Benchmark, Qualification Matrix, Executive Brief Deck Generator) on every slider move or keystroke if kept inside a single monolithic component.
**Action:** Extract heavy, independent sub-sections (Benchmark Section, Qualification Matrix, Executive Brief Form) into `React.memo` wrapped sub-components. Pass primitive props or memoized calculations to prevent unnecessary virtual DOM diffing and re-renders during high-frequency slider drag events.
=======
## 2025-05-18 - Top-level App State Changes Trigger Unnecessary Re-renders Across Heavy Motion Sections

**Learning:** In a single-page dashboard app with multiple modal states and form inputs at the top level (`App.tsx`), keystroke updates or modal state toggles cause every child section (`HeroTelemetryCard`, `CompetitorTable`, `SolutionsSection`, etc.) to re-render. These sections contain animated `motion` elements and background images, causing unnecessary DOM reconciliation and animation layout calculations.

**Action:** Wrap presentational sections and modals in `React.memo` and memoize parent callback props with `useCallback` to isolate render scopes.
main
