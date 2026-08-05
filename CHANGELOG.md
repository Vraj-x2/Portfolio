# Changelog

Tracking fixes applied from `AUDIT.md`, one concern per commit.

## Unreleased

- **Favicon link** (AUDIT.md #2, Blocker): added `<link rel="icon">` in `<head>` — `assets/images/favicon.ico` existed but was never linked, so the subpath deploy (`/Portfolio/`) never picked it up implicitly.
- **Responsive layout + mobile nav** (AUDIT.md #1, Blocker): added `assets/css/responsive.css` with breakpoints at 768px/480px — nav collapses to a hamburger menu (`assets/js/mobileNav.js`), hero/about/contact stack to single column, expertise grid collapses 4→2→1 columns. No visual screenshots captured (Claude-in-Chrome extension not connected this session) — recommend a manual pass at 375/768/1440px before merging.
