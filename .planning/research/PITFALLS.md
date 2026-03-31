# Pitfalls Research

**Domain:** React Web App with GitHub Pages Deployment
**Researched:** 2026-03-31
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Incorrect Base Path Configuration

**What goes wrong:**
App loads but shows blank page or 404 for nested routes. Assets load but JavaScript fails to bootstrap the app. User sees no content despite network requests succeeding.

**Why it happens:**
Vite's `base` option must exactly match the repository name. For a repo at `https://username.github.io/mage/`, the base must be `/mage/` (with trailing slash). Developers often forget the trailing slash, use wrong case, or forget to set it entirely when deploying to a subdirectory.

**How to avoid:**
In `vite.config.js`, set `base` to match your repository name exactly:

```javascript
export default defineConfig({
  base: '/mage/',  // Must match repo name exactly, with leading and trailing slashes
  // ... rest of config
})
```

For user sites (not repo sites), use `base: '/'`.

**Warning signs:**
- Browser console shows: "Failed to load resource: the server responded with a status of 404"
- JavaScript files load with wrong paths (e.g., `/assets/app.js` instead of `/mage/assets/app.js`)
- Blank screen after JS loads

**Phase to address:**
Phase 1: Project Setup — configure Vite base path before writing any components.

---

### Pitfall 2: SPA Routing 404 on Page Refresh

**What goes wrong:**
User refreshes page at `/quiz` or directly navigates to a nested route. GitHub Pages returns 404 because it tries to find a file named `quiz` instead of serving `index.html`.

**Why it happens:**
GitHub Pages defaults to looking for static files. React Router's client-side routing works after the app loads, but the initial server request fails because no `/quiz` file exists.

**How to avoid:**
Create a `_redirects` file in the `public/` folder (Vite will copy it to `dist/`):

```
/* /index.html 200
```

Or configure `vite.config.js` to generate this automatically using `rollupOptions`.

**Warning signs:**
- Direct navigation to `/quiz` or `/results` returns 404
- Page works when navigating internally but fails on refresh
- Browser back/forward navigation breaks

**Phase to address:**
Phase 1: Project Setup — configure routing fallback before implementing routes.

---

### Pitfall 3: Missing or Broken GitHub Actions Workflow

**What goes wrong:**
Deploy fails silently, or old version remains live. Manual deployments work but CI/CD fails. Build succeeds but deployment never triggers.

**Why it happens:**
Incorrect workflow YAML syntax, missing permissions, or workflow not triggered on correct branch. Common issues: `branches: ['main']` vs `branches: ['master']`, missing `id-token: write` permission, or workflow file in wrong location.

**How to avoid:**
Use the official GitHub Actions template:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: ['main']
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: 'pages'
  cancel-in-progress: true
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 'lts/*'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - uses: actions/deploy-pages@v4
```

Place in `.github/workflows/deploy.yml`.

**Warning signs:**
- "Waiting for workflow" never completes
- Workflow shows green but deployment doesn't happen
- GitHub Pages settings show "Build failed"

**Phase to address:**
Phase 1: Project Setup — verify CI/CD workflow before writing application code.

---

### Pitfall 4: Environment Variables Not Prefixed

**What goes wrong:**
App crashes on production build. Console shows "process is not defined". Environment variables work in development but fail in production.

**Why it happens:**
Vite uses `import.meta.env` instead of `process.env`. Developers copy patterns from Create React App which uses `process.env.VARIABLE_NAME`. Vite requires `VITE_` prefix for client-side env vars.

**How to avoid:**
Use Vite's `import.meta.env` with `VITE_` prefix:

```javascript
// WRONG (CRA pattern)
const apiUrl = process.env.REACT_APP_API_URL

// CORRECT (Vite pattern)
const apiUrl = import.meta.env.VITE_API_URL
```

Define in `.env` or `.env.production`:

```
VITE_API_URL=https://api.example.com
```

Note: Only variables prefixed with `VITE_` are exposed to client. Other env vars stay server-side.

**Warning signs:**
- "process is not defined" error in production build
- App works in dev (`npm run dev`) but crashes in production
- Environment variables undefined in production console

**Phase to address:**
Phase 1: Project Setup — establish environment variable patterns early.

---

### Pitfall 5: Forgetting to Update base in package.json homepage

**What goes wrong:**
When using `gh-pages` npm package or older deployment methods, links and assets point to wrong location.

**Why it happens:**
Two places control base path: `vite.config.js` base option and `package.json` homepage field. They must match. The `homepage` field is used by some tools and npm packages for generating correct URLs.

**How to avoid:**
Set both:

```javascript
// vite.config.js
export default defineConfig({
  base: '/mage/',
})
```

```json
// package.json
{
  "homepage": "https://username.github.io/mage"
}
```

**Warning signs:**
- Some links work, others don't
- Asset paths in HTML point to root instead of subdirectory
- Third-party packages generate wrong URLs

**Phase to address:**
Phase 1: Project Setup — configure both vite.config.js and package.json.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Skip TypeScript | Faster initial setup | Runtime errors, harder refactoring | Never for production apps |
| Inline all CSS | No setup required | Unmaintainable at scale, style conflicts | Only for single-page prototypes |
| Skip CI/CD | Simpler initial workflow | Manual deployment errors, no rollback | Never for production |
| Hardcode paths | Works immediately | Breaks on different base paths | Never |
| Skip error boundaries | Saves 15 minutes | Entire app crashes on one component error | Never |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| GitHub Pages | Not enabling "GitHub Actions" in settings | Use Actions workflow, not branch deployment |
| React Router | Not adding fallback for SPA routing | Add `_redirects` file in public/ |
| Vite | Not setting base for subdirectory repos | Set `base: '/repo-name/'` in vite.config.js |
| Images/Assets | Using relative paths | Use absolute paths from base or import statements |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Large bundle size | Slow initial load, high bandwidth | Use code splitting, lazy load routes | At scale (> 1MB JS) |
| Unoptimized images | Slow LCP, large data transfer | Use WebP, lazy load images | With many/large images |
| No caching headers | Repeated full downloads | Configure asset hashing in Vite | Always (production) |

**Note:** For this project's expected scale (small personal project), these traps are unlikely to cause issues. Standard Vite defaults are sufficient.

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|-------------|
| Exposing API keys in Vite env vars | Anyone can see keys in browser console | Use server-side proxy, never expose secrets in `VITE_` vars |
| Not setting CSP headers | XSS vulnerabilities | GitHub Pages doesn't allow custom CSP, but validate all inputs |
| Including .env in repo | Secrets committed publicly | Add `.env*` to `.gitignore` |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| No loading state | App appears broken during build | Add skeleton loaders or loading indicators |
| No error boundary | Single bug crashes entire app | Wrap routes in ErrorBoundary component |
| No fallback for missing assets | Broken images/icons | Provide fallback or alt text |
| No offline support | App fails without internet | Add basic service worker (PWA) if needed |

---

## "Looks Done But Isn't" Checklist

- [ ] **Base Path:** Configured in both vite.config.js AND package.json homepage
- [ ] **_redirects File:** Present in public/ for SPA routing fallback
- [ ] **GitHub Actions:** Workflow exists, runs on push, deploys successfully
- [ ] **Environment Variables:** Using `import.meta.env.VITE_` not `process.env`
- [ ] **Build Verified:** Ran `npm run build` and tested locally with `npm run preview`
- [ ] **Direct URL Test:** Manually visited nested route (e.g., /quiz) to verify 404 handling
- [ ] **Asset Paths:** Inspected network tab to verify JavaScript loads from correct path

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Wrong base path | LOW | Fix vite.config.js base, rebuild, redeploy |
| SPA 404 | LOW | Add _redirects file, rebuild, redeploy |
| Broken workflow | MEDIUM | Check workflow YAML syntax, verify branch name matches |
| Wrong env vars | LOW | Rename to VITE_ prefix, rebuild, redeploy |
| Secrets exposed | HIGH | Rotate secrets immediately, check git history |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Incorrect base path | Phase 1: Project Setup | Test with `npm run preview` and visit nested routes |
| SPA routing 404 | Phase 1: Project Setup | Create _redirects, verify /quiz route works on refresh |
| Broken GitHub Actions | Phase 1: Project Setup | Run workflow manually, verify "Pages deployed" message |
| Environment variables | Phase 1: Project Setup | Build and check browser console for errors |
| package.json homepage | Phase 1: Project Setup | Verify links in deployed site work correctly |

---

## Sources

- Vite Official Documentation: Deploying a Static Site (https://vite.dev/guide/static-deploy)
- GitHub Pages Documentation (https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- Community discussions: React Router GitHub Pages SPA routing issues
- Known issues: Vite base path configuration mismatches

---
*Pitfalls research for: React Web App with GitHub Pages Deployment*
*Researched: 2026-03-31*
