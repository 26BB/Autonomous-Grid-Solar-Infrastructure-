# Bolt's Journal - Critical Learnings

## 2025-02-20 - Unmemoized Page Components and Handlers in Root App
**Learning:** In React apps with stateful top-level components (e.g. `App.tsx` managing input state like `deploymentEmail` or modal open flags), unmemoized child components with heavy Framer Motion animations and DOM nodes will re-render on every single keystroke or state change.
**Action:** Wrap top-level presentation components in `React.memo` and pass callbacks wrapped in `useCallback` to ensure component props remain referentially stable during local state updates.
