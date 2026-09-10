## 2025-02-28 - Preventing Top-Level Component Re-renders on High-Frequency State Updates
**Learning:** In React applications with periodic background state updates (e.g. live telemetry jitter every 2.8s) or interactive sliders, unmemoized inline callbacks in the root `App` component cause heavy static sub-trees like `<Header />` and `<CompetitorTable />` to re-render repeatedly.
**Action:** Always wrap top-level callback props in `useCallback` and wrap static or complex display components in `React.memo` when top-level state updates frequently.
