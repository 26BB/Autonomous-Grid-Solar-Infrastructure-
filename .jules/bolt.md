## 2025-05-18 - Top-level App State Changes Trigger Unnecessary Re-renders Across Heavy Motion Sections

**Learning:** In a single-page dashboard app with multiple modal states and form inputs at the top level (`App.tsx`), keystroke updates or modal state toggles cause every child section (`HeroTelemetryCard`, `CompetitorTable`, `SolutionsSection`, etc.) to re-render. These sections contain animated `motion` elements and background images, causing unnecessary DOM reconciliation and animation layout calculations.

**Action:** Wrap presentational sections and modals in `React.memo` and memoize parent callback props with `useCallback` to isolate render scopes.
