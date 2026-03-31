# Feature Landscape

**Domain:** Quiz/Personality Test Website
**Project:** Mage Archetype Quiz (法师流派测算)
**Researched:** 2026-03-31

## Executive Summary

This research categorizes features for a personality quiz website that determines users' mage archetype (27 types from 9 questions across 3 dimensions). The core flow is: Landing Page -> Quiz (9 questions) -> Result Page. Based on the existing implementation and industry patterns, features are classified as table stakes (essential), differentiators (competitive advantage), or anti-features (deliberately excluded).

## Table Stakes

Features users expect. Missing = product feels incomplete or untrustworthy.

| Feature | Why Expected | Complexity | Implementation Notes |
|---------|--------------|------------|----------------------|
| **Clear value proposition** | Users need to understand what the quiz does in <3 seconds | Low | Already implemented: "九道选择题，揭示你与哪个魔法位面产生共鸣" |
| **Progress indicator** | Quiz fatigue is real; users need to know how much effort remains | Low | Already implemented: progress bar (第 X 问 / 9) |
| **Question navigation** | Users may want to revisit previous questions | Low | Already implemented: previous/next buttons with disabled states |
| **Single-select per question** | Prevents ambiguous results | Low | Already implemented: 3 options per question |
| **Result calculation** | Deterministic algorithm mapping answers to archetypes | Low | Already implemented: tally by dimension (src/met/cst) |
| **Result display** | Clear presentation of quiz outcome | Low | Already implemented: archetype name, rune, description, example |
| **Restart functionality** | Users may want to retake after seeing results | Low | Already implemented: "重新测算" button |
| **Responsive design** | Mobile users are significant portion of traffic | Medium | Already implemented via Tailwind responsive classes |
| **Dark theme appropriate for genre** | Magic/fantasy theme demands atmosphere | Low | Already implemented: dark bg (#0a0a0b) with gold accents |

## Differentiators

Features that set product apart. Not expected, but valued when present.

| Feature | Value Proposition | Complexity | Implementation Notes |
|---------|-------------------|------------|----------------------|
| **Visual rune symbols** | Creates memorable brand identity; each archetype has unique symbol | Low | Already implemented: 27 unique runes (⟁, ◎, ⊕, etc.) |
| **Three-dimensional scoring** | More nuanced results than single-axis quizzes | Low | Already implemented: 力量来源/施法方式/代价 = 3×3×3 = 27 types |
| **Detailed archetype descriptions** | Users share results because they're personally meaningful | Low | Already implemented: Each archetype has 100+ character description |
| **Example character references** | Helps users understand archetype; enables social proof | Low | Already implemented: "典型形象：哈利波特、D伏地魔" etc. |
| **Scoring breakdown** | Users interested in how their answers map to dimensions | Low | Already implemented: stat cards showing 来源/方式/代价 breakdown |
| **Animated entrance effects** | Creates sense of magic/discovery | Low | Already implemented: fadeSlideIn animation, runeGlow animation |
| **Particle effects on landing** | Enhances atmosphere without heavy performance cost | Low | Already implemented: floating particles (CSS-only) |
| **Hover states on interactive elements** | Provides feedback; feels polished | Low | Already implemented: option-btn, glow-border hover effects |
| **Archetype gallery on landing** | Shows depth of quiz; teases results | Low | Already implemented: rune grid (12 of 27 shown) |

## Anti-Features

Features to explicitly NOT build. These are either out of scope or actively harmful.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **User accounts/authentication** | Adds friction; personality quizzes should be frictionless | Keep anonymous; no login required |
| **Save results to server** | Adds backend complexity; not required by product | Use URL hash or client-side only |
| **Social media sharing buttons** | Adds complexity; users copy-paste manually if they want | Provide clear text they can copy |
| **Leaderboards/rankings** | Personality quizzes aren't competitive; contradicts "your unique type" | Keep focus on individual discovery |
| **Email collection** | Premature for MVP; reduces conversion | Defer to future phase if needed |
| **Ads/ monetization** | Breaks immersion of magic experience | Keep clean; consider optional donation later |
| **Multi-language support** | Adds i18n complexity; Chinese is appropriate for this content | Defer; single language focus |
| **Timed questions** | Adds stress; contradicts contemplative magic theme | No timer; let users ponder |
| **Sound effects** | Can be intrusive; may annoy users in public | Optional, default off (future enhancement) |
| **Account deletion features** | No user data stored; nothing to delete | N/A - no backend |

## Feature Dependencies

```
Landing Page (Entry)
    │
    ├── CTA Button → Quiz Page
    │
    └── Rune Grid (teaser) → Result Page

Quiz Page (9 Questions)
    │
    ├── Progress Bar
    ├── Question Display (one at a time)
    ├── Previous/Next Navigation
    └── Submit (on last question) → Result Page

Result Page
    │
    ├── Archetype Name + Rune
    ├── Detailed Description
    ├── Dimension Breakdown (Source/Method/Cost)
    ├── Example Character References
    └── Restart Button → Quiz Page (start over)
```

## MVP Recommendation

Prioritize in this order:

### Must Have (Ship Immediately)
1. Clear value proposition on landing
2. 9-question quiz with progress tracking
3. Result calculation (27 archetypes)
4. Result display with name, rune, description
5. Restart functionality

### Should Have (Polish)
1. Rune symbols for each archetype
2. Dimension breakdown display
3. Animated entrance effects
4. Responsive mobile design
5. Particle effects (landing)

### Can Defer (Future Phases)
- Archetype gallery preview
- Example character references (already done in current data)
- Social sharing (manual copy)
- Multiple result pages for borderline cases
- "Related archetypes" suggestions

## Sources

- **Existing implementation analysis**: `mage_archetype_quiz_v3.html` (quiz logic), `mage_landing_v1.html` (landing page)
- **Industry patterns**: General knowledge of personality quiz UX best practices (progress indicators, single-select, frictionless flow)
- **Note**: Web search tools were unavailable; analysis based on existing code and UX best practices for quiz applications.
