# Architecture Research

**Domain:** React Web App with GitHub Pages Deployment
**Project:** Mage Archetype Quiz (法师流派测算)
**Researched:** 2026-03-31
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      React Application                        │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ LandingPage  │  │  QuizPage    │  │ ResultPage   │       │
│  │ (Entry)      │  │  (9 questions)│ │ (Archetype)  │       │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │
│         │                 │                 │                │
├─────────┴─────────────────┴─────────────────┴────────────────┤
│                      Shared Components                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Layout     │  │   RuneCard   │  │ ProgressBar  │       │
│  │  (Wrapper)   │  │  (Display)   │  │  (Quiz UI)   │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
├─────────────────────────────────────────────────────────────┤
│                    State & Data Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ QuizContext  │  │ ArchetypeDB  │  │ ThemeContext │       │
│  │ (State)      │  │ (Static Data)│ │ (Dark Theme) │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
├─────────────────────────────────────────────────────────────┤
│                   Infrastructure Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  ReactRouter │  │   Vite       │  │ GitHub Pages │       │
│  │  (Routing)   │  │  (Build)     │  │ (Hosting)    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **LandingPage** | Entry point, display value proposition, show archetype teaser grid | React component with animations |
| **QuizPage** | Display questions one at a time, track progress, collect answers | React component + QuizContext |
| **ResultPage** | Calculate and display archetype result based on answers | React component + calculation logic |
| **QuizContext** | Manage quiz state (current question, answers, navigation) | React Context API |
| **ArchetypeDB** | Store 27 archetype definitions (name, rune, description, dimensions) | TypeScript data file |
| **Layout** | Apply consistent dark theme, animations, responsive wrapper | React component wrapper |

## Recommended Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Layout.tsx       # App wrapper with theme/animations
│   ├── Header.tsx       # Navigation header (optional)
│   ├── RuneCard.tsx     # Display archetype rune symbol
│   ├── ProgressBar.tsx # Quiz progress indicator
│   ├── OptionButton.tsx # Quiz answer option button
│   └── AnimatedWrapper.tsx # Fade/slide animations
├── pages/               # Route-level components
│   ├── LandingPage.tsx # Entry page with CTA
│   ├── QuizPage.tsx    # Quiz interaction
│   └── ResultPage.tsx  # Archetype result display
├── context/             # React Context providers
│   ├── QuizContext.tsx # Quiz state management
│   └── ThemeContext.tsx # Dark theme constants
├── data/                # Static data
│   ├── archetypes.ts   # 27 archetype definitions
│   └── questions.ts    # 9 quiz questions with options
├── hooks/               # Custom React hooks
│   ├── useQuiz.ts      # Quiz logic hook
│   └── useArchetype.ts # Result calculation hook
├── styles/              # Global styles
│   ├── index.css       # Tailwind + custom CSS
│   └── animations.css  # Animation keyframes
├── utils/               # Helper functions
│   ├── calculate.ts    # Archetype calculation logic
│   └── constants.ts    # Theme colors, config values
├── App.tsx             # Root component with Router
├── main.tsx            # Entry point
└── vite-env.d.ts       # Vite type declarations
```

### Structure Rationale

- **`pages/`**: Route-level components that match the three main views (Landing, Quiz, Result)
- **`components/`**: Reusable UI pieces (RuneCard, ProgressBar, etc.) used across pages
- **`context/`**: Global state management - QuizContext for quiz flow, ThemeContext for theme constants
- **`data/`**: Static content separated from logic - 27 archetypes and 9 questions as TypeScript data files
- **`hooks/`**: Custom hooks encapsulate reusable logic (calculation, quiz navigation)
- **`utils/`**: Pure functions for calculations and constants - no React dependencies

## Architectural Patterns

### Pattern 1: Client-Side Quiz Flow

**What:** Quiz state managed entirely in browser with React Context
**When to use:** No server-side storage needed, deterministic results
**Trade-offs:**
- Pros: Fast navigation, no network latency, no backend required
- Cons: Results lost on page refresh (acceptable for this use case)

**Example:**
```typescript
// QuizContext.tsx
interface QuizState {
  currentQuestion: number;
  answers: Record<number, number>; // questionId -> selectedOption
  isComplete: boolean;
}

const calculateResult = (answers: Record<number, number>): Archetype => {
  // Count dimension preferences
  const scores = { src: 0, met: 0, cst: 0 };
  Object.entries(answers).forEach(([qId, optId]) => {
    const dimension = questions[parseInt(qId)].dimension;
    scores[dimension] += 1;
  });
  // Map to archetype (27 types from 3×3×3)
  return archetypes.find(a =>
    a.source === dominantScore.src &&
    a.method === dominantScore.met &&
    a.cost === dominantScore.cst
  );
};
```

### Pattern 2: Static Data Architecture

**What:** All content (archetypes, questions) stored as TypeScript data files
**When to use:** Content doesn't change frequently, no CMS needed
**Trade-offs:**
- Pros: Simple deployment, no API calls, type safety with TypeScript
- Cons: Content updates require code changes

**Example:**
```typescript
// data/archetypes.ts
export const archetypes: Archetype[] = [
  {
    id: 'src1-met1-cst1',
    name: '星耀预言家',
    rune: '⟁',
    source: 'src',
    method: 'met',
    cost: 'cst',
    description: '...',
    examples: ['哈利波特', '邓布利多']
  },
  // ... 26 more
];
```

### Pattern 3: SPA Routing with Hash History

**What:** Use React Router with hash-based routing for GitHub Pages compatibility
**When to use:** Hosting on GitHub Pages (no server-side routing control)
**Trade-offs:**
- Pros: Works on any static host, no server config needed
- Cons: URLs contain # symbol, slightly less clean

**Example:**
```typescript
// App.tsx
import { HashRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </HashRouter>
  );
}
```

## Data Flow

### Request Flow

```
[User Lands on Page]
    ↓
[LandingPage] → [View archetype teaser / Click "开始测算"]
    ↓
[QuizPage] → [User selects option] → [QuizContext updates answer]
    ↓
[ProgressBar] → [Next question or Submit]
    ↓
[ResultPage] → [calculateResult(answers)] → [Display archetype]
```

### State Management

```
[QuizContext]
    ↓ (provides)
[QuizPage] ← [currentQuestion, answers, selectAnswer()]
    ↓
[ResultPage] ← [final answers for calculation]
```

### Key Data Flows

1. **Quiz Navigation Flow:** User selects answer -> `selectAnswer(questionId, optionId)` updates Context -> if last question, navigate to Result -> otherwise, increment `currentQuestion`

2. **Result Calculation Flow:** ResultPage receives answers from Context -> `calculateResult()` tallies dimension scores -> finds matching archetype -> displays name, rune, description, examples

3. **Theme Flow:** Layout component applies dark theme CSS variables -> all child components inherit theme colors (gold, purple accents)

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k users | Single-page React app, all data client-side, simple Vite build |
| 1k-100k users | Add caching headers, consider CDN for static assets |
| 100k+ users | Migrate to edge-hosted solution (Vercel/Cloudflare Pages) |

### Scaling Priorities

1. **First bottleneck:** Bundle size -> Optimize with Vite code splitting
2. **Second bottleneck:** Asset loading -> Lazy load images, optimize fonts

## Anti-Patterns

### Anti-Pattern 1: Storing Answers in URL Query Params

**What people do:** Encode quiz answers in URL like `?q1=0&q2=1&q3=2`
**Why it's wrong:** URL length limits, shareable links expose answers unintentionally
**Do this instead:** Use React Context for in-memory state; only share final result URL if needed

### Anti-Pattern 2: Fetching Static Data from API

**What people do:** Create API endpoint to serve archetypes.json
**Why it's wrong:** Unnecessary network request for static data that never changes
**Do this instead:** Import archetypes.ts directly; Vite bundles it into the JS

### Anti-Pattern 3: Using BrowserRouter on GitHub Pages

**What people do:** Use `BrowserRouter` with `createBrowserHistory`
**Why it's wrong:** GitHub Pages doesn't support SPA routing; 404 on direct page access
**Do this instead:** Use `HashRouter` (react-router-dom) for client-side routing that works on static hosts

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| GitHub Pages | Static file hosting via GitHub Actions | Deploy from `dist/` folder |
| Google Fonts | CDN import in index.html | Noto Serif SC, Cormorant Garamond |
| Tailwind CDN (legacy) | Replace with build-time Tailwind | Already using Tailwind 4.x |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Pages ↔ Context | React Context Provider | QuizContext wraps App |
| Components ↔ Data | Direct import | archetypes.ts, questions.ts |
| Pages ↔ Utils | Function call | calculate.ts for result logic |

## Build Order (Phase Implications)

Given the component dependencies, the recommended build sequence:

1. **Phase 1: Foundation**
   - Set up Vite + React + TypeScript
   - Configure Tailwind CSS
   - Set up HashRouter

2. **Phase 2: Data Layer**
   - Create archetype data file (27 types)
   - Create questions data file (9 questions)
   - Build QuizContext for state

3. **Phase 3: Core Pages**
   - LandingPage with animated entrance
   - QuizPage with question navigation
   - ResultPage with calculation logic

4. **Phase 4: Polish**
   - Add animations (Framer Motion or CSS)
   - Responsive design verification
   - Theme consistency

5. **Phase 5: Deployment**
   - Configure GitHub Actions workflow
   - Deploy and verify

**Dependencies:**
- LandingPage depends on: Layout, archetypes data
- QuizPage depends on: QuizContext, questions data
- ResultPage depends on: QuizContext, archetypes data, calculate utils

## Sources

- **STACK.md** — Technology stack: React 19, Vite 8, React Router 7, Tailwind CSS
- **FEATURES.md** — Feature requirements: Landing, Quiz, Result pages, 27 archetypes
- **React Router documentation** — HashRouter for SPA on static hosts
- **Vite deployment guide** — Build configuration for GitHub Pages

---
*Architecture research for: React Web App with GitHub Pages*
*Researched: 2026-03-31*