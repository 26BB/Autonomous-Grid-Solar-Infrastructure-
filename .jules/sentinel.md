# Sentinel Security Journal

## 2025-05-10 - Strict RFC 5322 Form Input Validation
**Vulnerability:** Unvalidated email input fields in modal forms allowed arbitrary or malformed strings to be submitted.
**Learning:** Client-side HTML5 input validation alone can be bypassed or inconsistently handled across browsers if `noValidate` is omitted or custom validation isn't applied before state transition.
**Prevention:** Implement standard RFC 5322 regex validation utilities and provide immediate feedback on user submission.
