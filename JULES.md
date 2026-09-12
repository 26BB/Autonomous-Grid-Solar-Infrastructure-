# 🤖 Jules Agent Instructions & Repository Context — AeroDock Systems

Welcome to **AeroDock Systems** (`26BB/Autonomous-Grid-Solar-Infrastructure-`). This document provides architectural context, verification commands, and operational boundaries for Google Jules autonomous agents (**Bolt ⚡**, **Sentinel 🛡️**, and CI Fixers).

---

## 🏗️ 1. Architecture & Tech Stack

* **System Overview:** AeroDock Systems is an autonomous aerial intelligence and 3-year Total Cost of Ownership (TCO) grant modeler for solar farms and electric utility grids.
* **Core Framework:** React 19, TypeScript 5.8, Vite 6, Tailwind CSS v4, Motion (`motion/react` v12).
* **AI & Intelligence:** `@google/genai` SDK for grant proposal synthesis and automated grid risk inspection.
* **Backend Utilities:** Express.js lightweight server harness (`express`).
* **Design Language:** Google Stitch industrial clean tech aesthetic (high-contrast technical telemetry, interactive solar irradiance mapping, and financial grant modelers).

---

## ⚡ 2. Verification Commands

Before proposing or merging any pull request, Jules agents **MUST** run and pass both checks:

```bash
# 1. Type & Static Checking
npm run lint

# 2. Production Build Verification
npm run build
```

* **Pass Criteria:** Both `npm run lint` (`tsc --noEmit`) and `npm run build` must complete with **0 errors and 0 warnings**.
* **Zero Type Regressions:** No new `@ts-ignore` or `any` type casts allowed.

---

## 🎯 3. Role-Specific Directives

### For Bolt ⚡ (Performance Agent)
1. **Dynamic Mathematical Modeler:** Ensure the 3-Year TCO Grant Modeler calculations execute with zero UI lag on dynamic slider interactions.
2. **Motion / Animation Profiling:** Ensure `motion` transitions use hardware-accelerated transforms (`transform`, `opacity`) without triggering layout thrashing.
3. **Bundle Chunking:** Code-split heavy visualization modules and AI response generation views.
4. **Asset Efficiency:** Optimize drone inspection SVGs, aerial telemetry charts, and grid layout maps.

### For Sentinel 🛡️ (Security Agent)
1. **API Key Guardrails:** Ensure `GEMINI_API_KEY` and Google GenAI credentials are never exposed to client-side bundles; use environment variables (`process.env` / `import.meta.env`) with server proxying.
2. **Input Validation:** Sanitize user inputs into the AI grant prompt synthesizer to mitigate prompt injection and malformed JSON responses.
3. **Dependency Audits:** Continuously audit dependencies (`@google/genai`, `express`, `motion`) for known CVEs.
4. **Safe Error Boundaries:** Prevent crashes if the Google GenAI API returns rate-limit (429) or quota errors; provide graceful fallback UI states.

---


## 🛑 4.1 Strict Autonomous PR & Branch Guardrails (CRITICAL)

To prevent merge collision stampedes and broken builds:
1. **Consolidated Daily Squad Runs**: Bolt ⚡, Sentinel 🛡️, and CI Fixer MUST execute sequentially in a **single session on a single branch**. Never spawn parallel agents that touch overlapping files. Submit **only ONE consolidated Pull Request per day**.
2. **Never Open Draft PRs**: All pull requests must be opened as **Ready for Review** (never Draft), so automated pipelines and auto-merge can process them immediately.
3. **Always Rebase on `origin/main`**: Before creating a pull request, fetch and rebase on the latest `origin/main`. If conflicts exist, resolve them cleanly before pushing.
4. **Zero Conflict Markers**: Never push unresolved git conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) or stray branch names into source files.
5. **Mandatory Pre-PR Verification**: You MUST run `npm run lint` and `npm run build` locally before pushing. If either fails or produces errors/warnings, **ABORT** and do not open a pull request.

## 🛑 4. Strict Guardrails (DO NOT TOUCH)

* **Documentation:** Do not delete or alter strategic grant documentation inside [`/docs`](./docs) or the portfolio narrative in `README.md`.
* **Deployment Configs:** Do not modify `vercel.json` or `netlify.toml` unless explicitly fixing a build/routing error.
* **UI Aesthetic:** Preserve the dark technical industrial aesthetic (charcoal bases, solar amber `#F59E0B`, electric cyan `#06B6D4`, and telemetry emerald `#10B981`).

---

## 📝 5. Pull Request Standards

* **Branch Naming:** `perf/tco-optimization` or `sec/token-sanitization`.
* **PR Description:** Include a concise summary of:
  1. What was improved or hardened.
  2. Proof of `npm run lint` and `npm run build` passing.
  3. Metric comparison (e.g. bundle size reduction, latency drop, or vulnerability remediation).

---

## 🌅 6. Daily Morning Routine (Scheduled Run)

When triggered on your scheduled morning task:
1. **Read & Align**: Review this document and adhere to all strict guardrails.
2. **Execute Verification**: Run `npm run lint` (`tsc --noEmit`) and `npm run build`. Confirm health baseline.
3. **Dual-Agent Review**:
   - **Bolt ⚡ (Performance)**: Check for bundle bloat, expensive re-renders in TCO calculations, and unoptimized motion transitions.
   - **Sentinel 🛡️ (Security)**: Verify secret isolation (no exposed API keys), check dependency advisories, and ensure graceful error boundaries.
4. **Surgical MVP Fixes**: If any tests fail or low-risk optimizations/security cleanups are detected, implement safe fixes (keep diff < 100 lines).
5. **Re-Verify**: Confirm both `npm run lint` and `npm run build` pass with 0 errors and 0 warnings.
6. **Log & Document**: Append an entry to [`docs/AUTONOMOUS_MAINTENANCE_LOG.md`](./docs/AUTONOMOUS_MAINTENANCE_LOG.md).
7. **Open PR**: Create a clean Pull Request titled `chore(maintenance): morning health squad [YYYY-MM-DD]` for human review.

