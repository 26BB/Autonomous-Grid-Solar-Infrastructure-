# Sentinel Security Learnings

## 2026-09-16 - Email Input Validation on Download Brief Handlers
- **Learning:** Form submissions requesting PDF brief generation or sensitive reporting package dispatches should enforce strict `isValidEmail` check before opening modal or initiating downstream data assembly, alongside `sanitizeInput` sanitization.
- **Action:** Validate `isValidEmail` and provide inline error feedback in UI before dispatching modal handler events.

## 2026-09-17 - HTML-Escaped Email Sanitization & RFC 5322 Character Preservation
**Vulnerability:** When forms sanitized email inputs with `sanitizeInput` prior to `isValidEmail`, HTML-escaped entities (`&#x27;`, `&amp;`) broke RFC 5321 regex matching for valid RFC 5322 emails containing apostrophes or ampersands.
**Learning:** `sanitizeInput` must retain full HTML entity escaping (`&`, `'`) to prevent XSS entity injection or attribute breakout, while `isValidEmail` should safely unescape HTML entities before evaluating email regex so pre-sanitized emails validate correctly.
**Prevention:** Always unescape HTML entities inside email syntax validators when input sanitization precedes validation in UI pipelines.
