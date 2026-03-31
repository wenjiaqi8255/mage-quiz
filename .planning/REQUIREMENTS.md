# Requirements: Mage - 法师流派测算

**Defined:** 2026-03-31
**Core Value:** 让用户在 9 道选择题后发现自己属于 27 种法师原型中的哪一种，获得个性化的结果展示和角色故事。

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Project Setup

- [ ] **SETUP-01**: Initialize Vite + React + TypeScript project
- [ ] **SETUP-02**: Configure Tailwind CSS with custom theme matching original design
- [ ] **SETUP-03**: Set up HashRouter for GitHub Pages SPA compatibility
- [ ] **SETUP-04**: Add `_redirects` file for SPA routing
- [ ] **SETUP-05**: Configure vite.config.js base path to `/mage/`
- [ ] **SETUP-06**: Set up GitHub Actions workflow for CI/CD

### Data Layer

- [ ] **DATA-01**: Create archetypes.ts with 27法师原型 data
- [ ] **DATA-02**: Create questions.ts with 9道选择题 data
- [ ] **DATA-03**: Implement QuizContext for state management
- [ ] **DATA-04**: Implement calculateResult utility function

### Core Pages

- [ ] **LAND-01**: Landing Page with hero section, CTA button
- [ ] **LAND-02**: Rune display section with hover effects
- [ ] **LAND-03**: Feature cards section (3 cards)
- [ ] **LAND-04**: Footer section
- [ ] **QUIZ-01**: Quiz page with progress bar
- [ ] **QUIZ-02**: Question display with 3 options per question
- [ ] **QUIZ-03**: Navigation (previous/next) buttons
- [ ] **QUIZ-04**: Answer selection state management
- [ ] **RES-01**: Result page with archetype symbol, name, description
- [ ] **RES-02**: Display scoring breakdown (来源/方式/代价)
- [ ] **RES-03**: Restart button functionality

### Polish

- [ ] **POLY-01**: Add particle animation effects
- [ ] **POLY-02**: Add fade-in animations for page transitions
- [ ] **POLY-03**: Ensure responsive design for mobile/tablet/desktop
- [ ] **POLY-04**: Dark theme consistency throughout

### Deployment

- [ ] **DEPL-01**: GitHub Pages deployment configuration
- [ ] **DEPL-02**: GitHub Actions CI/CD workflow functional

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Features

- **SHARE-01**: Result sharing functionality (copy link)
- **GALLERY-01**: Archetype gallery showing all 27 types

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Backend server | All computation client-side, no data persistence needed |
| User accounts/auth | Not required for simple quiz app |
| Social sharing (OAuth) | Manual copy link sufficient for v1 |
| Multi-language support | 仅简体中文，简化开发 |
| Timed questions | Not part of original design |
| Leaderboard | Not in original requirements |
| Sound effects | Not in original design |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SETUP-01 | Phase 1 | Pending |
| SETUP-02 | Phase 1 | Pending |
| SETUP-03 | Phase 1 | Pending |
| SETUP-04 | Phase 1 | Pending |
| SETUP-05 | Phase 1 | Pending |
| SETUP-06 | Phase 1 | Pending |
| DATA-01 | Phase 2 | Pending |
| DATA-02 | Phase 2 | Pending |
| DATA-03 | Phase 2 | Pending |
| DATA-04 | Phase 2 | Pending |
| LAND-01 | Phase 3 | Pending |
| LAND-02 | Phase 3 | Pending |
| LAND-03 | Phase 3 | Pending |
| LAND-04 | Phase 3 | Pending |
| QUIZ-01 | Phase 3 | Pending |
| QUIZ-02 | Phase 3 | Pending |
| QUIZ-03 | Phase 3 | Pending |
| QUIZ-04 | Phase 3 | Pending |
| RES-01 | Phase 3 | Pending |
| RES-02 | Phase 3 | Pending |
| RES-03 | Phase 3 | Pending |
| POLY-01 | Phase 4 | Pending |
| POLY-02 | Phase 4 | Pending |
| POLY-03 | Phase 4 | Pending |
| POLY-04 | Phase 4 | Pending |
| DEPL-01 | Phase 5 | Pending |
| DEPL-02 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 26 total
- Mapped to phases: 26
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-31*
*Last updated: 2026-03-31 after initial definition*