# Portfolio Audit — 2026-08-04

## Repo map

- **Type:** static site. No `package.json`, no build tool, no bundler, no linter config, no framework.
- **Stack:** vanilla HTML/CSS/JS. Hosted on GitHub Pages at `https://vraj-x2.github.io/Portfolio/`.
- **Entry:** `index.html` — single page, sections as anchors: `#about`, `#expertise`, `#projects`, `#contact`. No router, no other routes/pages.
- **CSS** (`assets/css/`, loaded in this order): `base.css`, `layout.css`, `components.css`, `sections.css`, `animations.css`, `contact-footer.css`. No `@media` query anywhere in any file.
- **JS** (`assets/js/`, loaded in this order): `smoothScroll.js`, `animations.js`, `typingEffect.js`, `themeToggle.js`, `contactForm.js`, `loadProjects.js`. All global scope, no modules, no bundler.
- **Data:** `assets/data/projects.json` — 7 projects, fetched client-side by `loadProjects.js`.
- **Assets:** resume PDF, headshot image, favicon.
- **Dev server:** `python3 -m http.server` (per README). No npm scripts exist.
- **Build:** none — deployed as-is.
- **Lint:** none configured.

## Build / lint run

No build step and no linter exist in this repo (no `package.json`, no `.eslintrc`, no CI config). Ran the closest equivalent checks instead:

```
node --check assets/js/*.js   → all 6 files pass, no syntax errors
node -e "JSON.parse(...)" on projects.json → valid JSON
```

No errors or warnings produced. **If you want real lint/build gates going forward, that's a Phase-2 candidate** (e.g. add `eslint` + `stylelint` + `html-validate` as dev dependencies) — flagged below as Medium.

## Dev server / route check

Only one route (`/index.html`). Served locally and probed reachability of all external resources referenced by the page:

| Resource | Status |
|---|---|
| Google Fonts CSS | 200 |
| FontAwesome CDN CSS | 200 |
| github.com/Vraj-x2/capstone-frontend | 200 |
| github.com/Vraj-x2/expiry-tracker | 200 |
| api.vrajcloud.dev (demo link) | 200 |
| expiry.vrajcloud.dev (demo link) | 200 |
| github.com/Vraj-x2 | 200 |
| linkedin.com/in/vraj20 | 999 (LinkedIn blocks non-browser requests — inconclusive, not a real signal of breakage) |

**Note:** the Claude-in-Chrome browser extension was not connected in this session, so live console/network capture and visual responsive screenshots could not be taken. Findings below on JS console errors, dead DOM refs, and responsive layout come from static code reading (cross-referencing HTML element IDs/classes against JS and CSS), not a live run. Recommend a quick manual eyeball pass in Phase 2 to confirm before/after each fix.

---

## Findings

### Blocker

1. **No responsive design anywhere — mobile layout is broken.** `file: assets/css/*.css` (grepped, zero `@media` rules in any of the 6 CSS files).
   - `layout.css:136` `.intro-grid` is a fixed 2-column grid (`1.1fr 0.9fr`) with no stacking breakpoint → hero text + visual card get crushed side-by-side at 375px.
   - `layout.css:15` nav is a single-row flex with logo + 4 links and **no hamburger/mobile menu at all** → nav overflows/wraps badly under ~500px.
   - `sections.css:29` `.about-content` is `display:flex` (row) with a fixed `240px` circular image (`sections.css:40`) and no `flex-wrap` → text column gets squeezed illegibly on mobile; `body{overflow-x:hidden}` (`base.css:66`) hides the overflow instead of fixing it, so content is silently clipped.
   - `sections.css:61` `.expertise-container` is a fixed 4-column grid at every width → unreadable at 375px and cramped at 768px.
   - `sections.css:106` `.contact-container` is a fixed 2-column flex row → info + form squeezed at mobile widths.
   - **Fix:** add breakpoints (≈768px, ≈480px) to stack `.intro-grid`, `.about-content`, `.contact-container` into single columns, collapse `.expertise-container` to 2 then 1 columns, and add a real mobile nav (hamburger + slide-in menu, or a wrapped/scrollable nav).

2. **No favicon actually shows up.** `index.html` head has zero `<link rel="icon">` tag, even though `assets/images/favicon.ico` exists on disk.
   - Because the site is served from a subpath (`/Portfolio/`), the browser's implicit `/favicon.ico` root lookup **will not** find it — the tab shows a generic icon.
   - **Fix:** add `<link rel="icon" href="assets/images/favicon.ico">` to `<head>`.

3. **Light theme: several text elements are unreadable (invisible-on-white).** `assets/css/contact-footer.css` has **zero** `.light-theme` overrides in the entire file, while `contact-footer.css` loads last (highest cascade priority on tie).
   - `contact-footer.css:6` `.contact-info p { color: #e0e0e0; }` — same specificity as `.light-theme p` (`base.css:171`, `#444`) but loads later → wins in light mode too. Result: the "Open to junior Java, Android..." paragraph in Contact renders near-white text on a near-white background.
   - `contact-footer.css:36` `.contact-form label { color: #cccccc; }` — no light-theme override → labels (Name/Email/Subject/Message) are light-gray-on-white, failing contrast in light mode.
   - `contact-footer.css:46` form inputs keep `background: rgba(50,50,50,0.8)` (dark box) even in light theme — jarring dark islands floating in an otherwise light page, and inconsistent with the rest of the light-theme redesign.
   - **Fix:** add `.light-theme` overrides for `.contact-info p`, `.contact-form label`, and `.contact-form input/textarea` background+text color.

### High

4. **Icon-only controls have no accessible name.** `index.html:69` theme-toggle button contains only `<i class="fas fa-moon">`/`<i class="fas fa-sun">`, no `aria-label`. Same for social links `index.html:288-293` (LinkedIn/GitHub — icon only, no visible text or `aria-label`).
   - Screen readers announce these as blank or as the icon font glyph — not usable non-visually.
   - **Fix:** add `aria-label="Toggle theme"` to the theme button, `aria-label="LinkedIn"` / `"GitHub"` to the social links.

5. **Unoptimized, mislabeled hero image.** `assets/images/professional-headshot.jpg` is actually **PNG data** (confirmed via `file`) saved with a `.jpg` extension, 1024×1024, **656 KB**. Used at 240×240 display size (`sections.css:40`) and as the og:image/twitter:image.
   - No `width`/`height` attributes on the `<img>` (`index.html:166`) → contributes to layout shift (CLS) while it loads.
   - No `loading="lazy"` (it's above the fold via About, less critical, but still worth setting deliberately).
   - **Fix:** re-export as an actual optimized JPEG/WebP at ~480×480 (2x for retina), add explicit `width="240" height="240"`.

6. **Stray/dead code: rotating "dynamic stat" feature never runs.** `assets/js/animations.js:14-54` looks for `#stat-dynamic-number` / `#stat-dynamic-label`, which **do not exist** in current `index.html` (the hero now uses static `.stat-number`/`.stat-label` markup, `index.html:141-153`). The function no-ops via an early `return`, but:
   - `assets/css/components.css:496-505` (`#stat-dynamic-number`, `#stat-dynamic-label`, `.stat-fade`) is dead CSS supporting it.
   - ~55 lines of JS + ~10 lines of CSS that never execute — confusing for future maintenance, easy to think it's live.
   - **Fix:** delete the dead JS block and the dead CSS rules, or wire it back up if the rotating-stat feature was intentionally cut and might return.

7. **No sitemap.xml / robots.txt.** Not present anywhere in repo. Minor for a 1-page site but easy, standard SEO hygiene, and GitHub Pages serves whatever's in the repo root for free.
   - **Fix:** add a minimal `sitemap.xml` (one URL) and `robots.txt` (`Allow: /`, pointing at the sitemap).

### Medium

8. **Stale contact email mismatch.** `README.md:35` lists `vrajcontractor20@gmail.com`; the live site (`index.html:275`) and your actual account context show `vrajcontractor205@gmail.com`. One of these is wrong.
   - **Fix:** confirm the correct address and make README match the site (or vice versa).

9. **`contactForm.js` does more than its name says.** `assets/js/contactForm.js` defines `backToTop()` and the `DOMContentLoaded` bootstrapper that also calls `typingEffect()` and `themeToggle()` from other files — it's the de facto app entry point despite being named for one feature.
   - Not a bug, but confusing: someone editing "the contact form" won't expect to find the back-to-top button and the whole app init sequence there.
   - **Fix (optional/organizational):** rename to something like `main.js`, or split the back-to-top + bootstrap code into its own file.

10. **Theme choice doesn't persist.** `assets/js/themeToggle.js` toggles `.light-theme` on `<body>` but never reads/writes `localStorage` → every reload resets to dark, even if the visitor just chose light.
    - **Fix:** persist the choice in `localStorage` and apply it before first paint (or accept as a known limitation).

11. **Empty `.project-actions` div leaves a dead gap on 4 of 7 project cards.** `assets/js/loadProjects.js:22-25` — projects without `link` or `demo` (Blackjack, DevMatch, Retail System, UPC Collector — 4 of 7 in `assets/data/projects.json`) render an empty `<div class="project-actions">` that still gets `margin-top: 1.5rem` (`components.css:205`), leaving a slightly awkward blank strip at the bottom of those cards instead of collapsing.
    - **Fix:** either add real links for these 4 (if repos are public/deployed), or conditionally omit the wrapping div in JS when neither `link` nor `demo` exists.

12. **Footer links don't smooth-scroll like nav links do.** `assets/js/smoothScroll.js:2` only binds `.nav-links a`; the footer's identical anchor links (`index.html:333-336`) jump instantly instead of smooth-scrolling — a minor UX inconsistency between two visually-similar link groups.
    - **Fix:** broaden the selector to cover both, e.g. `.nav-links a, .footer-links a`.

13. **No lint/format tooling at all.** No ESLint/Stylelint/HTML validator config exists, so nothing catches accidental syntax slips before they ship (this audit had to fall back to `node --check`).
    - **Fix (optional):** add a lightweight `package.json` with `eslint` + `stylelint` + `html-validate` as dev-only dependencies and an npm script, without introducing a bundler/build step.

### Low

14. **Uncommitted binary diff sitting in working tree.** `git status` shows `assets/docs/Vraj_Contractor_Resume.pdf` modified but unstaged. Not touching it — flagging only so it's not accidentally lost or accidentally committed as part of an unrelated fix commit.

15. **`push.bat` auto-generates commit messages like "Auto push on <timestamp>".** Not a code bug, just a workflow note: bypasses your own commit-message hygiene. Up to you whether that's intentional for quick pushes.

16. **`git commit`/history convention question:** none — skipped, out of scope for a code audit.

---

## Summary

- **Blockers: 3** (no responsive design, missing favicon link, light-theme text-contrast failures)
- **High: 4** (icon-only a11y, oversized/mislabeled image, dead rotating-stat code, missing sitemap/robots)
- **Medium: 6** (email mismatch, file-naming/organization, theme persistence, empty action-div gap, footer smooth-scroll inconsistency, no lint tooling)
- **Low: 3** (uncommitted PDF diff, auto-commit script note, n/a)

Nothing fixed yet. Tell me which numbers to tackle and in what order for Phase 2.
