# Sentinel Security Journal

## 2026-09-16 - Email Input Validation on Download Brief Handlers
- **Learning:** Form submissions requesting PDF brief generation or sensitive reporting package dispatches should enforce strict `isValidEmail` check before opening modal or initiating downstream data assembly, alongside `sanitizeInput` sanitization.
- **Action:** Validate `isValidEmail` and provide inline error feedback in UI before dispatching modal handler events.

## 2026-09-15 - Security Input Validation & Sanitization Coverage
**Vulnerability:** Lack of automated unit test coverage for `isValidEmail` and `sanitizeInput` utilities allowed potential edge-case validation/sanitization bypasses to go undetected during refactoring.
**Learning:** Shared security utilities in `src/utils/security.ts` are relied upon across multiple user input forms (`ContactPortalModal`, `ModelerScreen`, `ProposalPackageModal`). Without dedicated unit tests, changes to input sanitization rules could introduce XSS vulnerabilities or validation bypasses.
**Prevention:** Always maintain unit tests for all security validation and sanitization functions in `src/utils/security.test.ts` covering boundary conditions, maximum length constraints, and HTML/XSS character escaping.
