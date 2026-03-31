# Roadmap: Mage - 法师流派测算

**Created:** 2026-03-31
**Mode:** YOLO (auto-approve)
**Granularity:** Coarse
**Phases:** 5

## Overview

| Phase | Name | Goal | Requirements | Success Criteria |
|-------|------|------|--------------|------------------|
| 1 | Setup | Project infrastructure with deployment configuration | SETUP-01 ~ SETUP-06 | 3 criteria |
| 2 | Data Layer | Core quiz data and state management | DATA-01 ~ DATA-04 | 4 criteria |
| 3 | Core Pages | Landing, Quiz, and Result pages | LAND-01 ~ LAND-04, QUIZ-01 ~ QUIZ-04, RES-01 ~ RES-03 | 5 criteria |
| 4 | Polish | Visual enhancements and animations | POLY-01 ~ POLY-04 | 4 criteria |
| 5 | Deployment | GitHub Pages release | DEPL-01 ~ DEPL-02 | 2 criteria |

## Phase 1: Setup

**Goal:** Project infrastructure with deployment configuration

**Requirements:**
- SETUP-01: Initialize Vite + React + TypeScript project
- SETUP-02: Configure Tailwind CSS with custom theme matching original design
- SETUP-03: Set up HashRouter for GitHub Pages SPA compatibility
- SETUP-04: Add `_redirects` file for SPA routing
- SETUP-05: Configure vite.config.js base path to `/mage/`
- SETUP-06: Set up GitHub Actions workflow for CI/CD

**Success Criteria:**
1. `npm run dev` starts Vite dev server without errors
2. `npm run build` produces production build without errors
3. GitHub Actions workflow file exists and is syntactically valid

---

## Phase 2: Data Layer

**Goal:** Core quiz data and state management

**Requirements:**
- DATA-01: Create archetypes.ts with 27法师原型 data
- DATA-02: Create questions.ts with 9道选择题 data
- DATA-03: Implement QuizContext for state management
- DATA-04: Implement calculateResult utility function

**Success Criteria:**
1. archetypes.ts exports array of 27 archetype objects with required fields
2. questions.ts exports array of 9 question objects with 3 options each
3. QuizContext provides currentQuestion, answers, setAnswer, reset functions
4. calculateResult returns correct archetype based on answer scores

---

## Phase 3: Core Pages

**Goal:** Landing, Quiz, and Result pages

**Requirements:**
- LAND-01: Landing Page with hero section, CTA button
- LAND-02: Rune display section with hover effects
- LAND-03: Feature cards section (3 cards)
- LAND-04: Footer section
- QUIZ-01: Quiz page with progress bar
- QUIZ-02: Question display with 3 options per question
- QUIZ-03: Navigation (previous/next) buttons
- QUIZ-04: Answer selection state management
- RES-01: Result page with archetype symbol, name, description
- RES-02: Display scoring breakdown (来源/方式/代价)
- RES-03: Restart button functionality

**Success Criteria:**
1. Landing page displays with CTA button that navigates to quiz
2. Quiz page shows progress indicator and 3 options per question
3. User can select answer and navigate between questions
4. Result page displays archetype symbol, name, and description
5. Restart button resets quiz and returns to landing

---

## Phase 4: Polish

**Goal:** Visual enhancements and animations

**Requirements:**
- POLY-01: Add particle animation effects
- POLY-02: Add fade-in animations for page transitions
- POLY-03: Ensure responsive design for mobile/tablet/desktop
- POLY-04: Dark theme consistency throughout

**Success Criteria:**
1. Particle animation visible on landing page
2. Page transitions have fade-in animation
3. UI renders correctly on mobile (375px), tablet (768px), desktop (1280px)
4. Dark theme consistent across all pages

---

## Phase 5: Deployment

**Goal:** GitHub Pages release

**Requirements:**
- DEPL-01: GitHub Pages deployment configuration
- DEPL-02: GitHub Actions CI/CD workflow functional

**Success Criteria:**
1. GitHub Pages site accessible at deployed URL
2. GitHub Actions workflow runs successfully on main branch push

---

## Phase Dependencies

- Phase 2 depends on Phase 1 (data needs running project)
- Phase 3 depends on Phase 2 (pages need data layer)
- Phase 4 depends on Phase 3 (animations need pages)
- Phase 5 depends on Phase 4 (deployment needs polished code)

---

*Last updated: 2026-03-31 after roadmap creation*