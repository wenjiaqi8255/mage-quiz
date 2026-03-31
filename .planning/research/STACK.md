# Stack Research

**Domain:** React Web App with GitHub Pages Deployment
**Researched:** 2026-03-31
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| React | 19.x | UI Framework | Standard for modern React development, strong ecosystem support |
| Vite | 8.x | Build Tool | Fast dev server, optimized builds, native ESM - standard for new React projects |
| React Router | 7.x | Routing | Official React routing solution, handles SPA client-side routing |
| TypeScript | 5.x | Type Safety | Recommended for maintainability, catches errors at build time |

### Deployment

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| gh-pages | 6.x | Deployment | Standard npm package for GitHub Pages deployment, handles git-based deployment |
| GitHub Actions | - | CI/CD | Native GitHub solution for automated builds and deployments |

### Styling

| Technology | Purpose | Why Recommended |
|------------|---------|-----------------|
| Tailwind CSS | Utility-first CSS | Existing codebase uses Tailwind, maintains consistency, CDN version already in use |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| framer-motion | latest | Animations | For interactive animations in landing page (fade-in, rune glow effects) |
| clsx / tailwind-merge | latest | Class utility | For conditional Tailwind class composition |

## Installation

```bash
# Create Vite React project (choose TypeScript or JavaScript)
npm create vite@latest mage -- --template react-ts

# Core dependencies
npm install react react-dom react-router-dom

# Styling
npm install -D tailwindcss postcss autoprefixer

# Deployment
npm install -D gh-pages

# Animation (optional, for landing page effects)
npm install framer-motion

# Class utilities
npm install clsx tailwind-merge
```

## GitHub Pages Configuration

### Vite Config (vite.config.ts)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mage/',  // Replace with your repository name
})
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### GitHub Actions Workflow (deploy.yml)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Vite | Create React App (CRA) | Legacy projects only - CRA is deprecated, Vite is standard |
| Vite | Webpack | Complex custom bundling needs |
| gh-pages | GitHub Pages UI settings | Manual deployment, but automation is preferred |
| Tailwind CSS | Styled Components | When CSS-in-JS is preferred |
| React Router | Next.js | When SSR or API routes are needed |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Create React App (CRA) | Deprecated, no longer maintained | Vite (standard) |
| react-scripts | Part of CRA, deprecated | Vite + @vitejs/plugin-react |
| CDN React in production | No build optimization, harder to maintain | Vite build process |
| jQuery | Deprecated for React apps | React + modern alternatives |

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| React 19.x | React Router 7.x | Latest stable combo |
| Vite 8.x | @vitejs/plugin-react 6.x | Official React plugin |
| Tailwind 4.x | Vite 8.x | Latest Tailwind with Vite |
| gh-pages 6.x | Node 18+ | Required for GitHub Actions |

## Stack Patterns by Variant

**If deploying to `username.github.io/repo-name`:**
- Set `base: '/repo-name/'` in vite.config.ts
- Use gh-pages package for deployment

**If deploying to custom domain:**
- Set `base: '/'` in vite.config.ts
- Configure custom domain in GitHub Pages settings

## Sources

- npm registry (verified versions) — Current package versions
- Vite official docs — Build configuration
- gh-pages npm package — Deployment configuration
- GitHub Actions documentation — CI/CD workflow

---
*Stack research for: React Web App with GitHub Pages Deployment*
*Researched: 2026-03-31*