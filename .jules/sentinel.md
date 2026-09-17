# Sentinel Security Learnings

## 2026-09-16 - Email Input Validation on Download Brief Handlers
- **Learning:** Form submissions requesting PDF brief generation or sensitive reporting package dispatches should enforce strict `isValidEmail` check before opening modal or initiating downstream data assembly, alongside `sanitizeInput` sanitization.
- **Action:** Validate `isValidEmail` and provide inline error feedback in UI before dispatching modal handler events.
