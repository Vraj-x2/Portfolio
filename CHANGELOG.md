# Changelog

Tracking fixes applied from `AUDIT.md`, one concern per commit.

## Unreleased

- **Optimized hero/about image** (AUDIT.md #5, High): `professional-headshot.jpg` was actually PNG data (1024×1024, 656 KB) saved with a `.jpg` extension, displayed at 240×240. Re-encoded as a true JPEG at 480×480 (2x retina) via .NET `System.Drawing` (no ImageMagick/PIL available in this environment) — now 20.7 KB. Added explicit `width`/`height`/`loading="lazy"` to the `<img>` tag to prevent layout shift. Same file is also used as the OG/Twitter preview image; crop/framing unchanged, just far lighter.
- **Icon-only controls now have accessible names** (AUDIT.md #4, High): added `aria-label` to the theme-toggle button and the LinkedIn/GitHub social links (previously icon-only, no discernible name for screen readers); marked their decorative `<i>` icons `aria-hidden="true"`.
- **Light-theme contrast fixes** (AUDIT.md #3, Blocker): `contact-footer.css` had zero `.light-theme` rules, so `.contact-info p` (#e0e0e0) and `.contact-form label` (#cccccc) rendered near-white text on a near-white background in light mode, and form inputs kept a dark box. Added `.light-theme` overrides for contact copy, labels, inputs/placeholders, and social icons.
- **Favicon link** (AUDIT.md #2, Blocker): added `<link rel="icon">` in `<head>` — `assets/images/favicon.ico` existed but was never linked, so the subpath deploy (`/Portfolio/`) never picked it up implicitly.
- **Responsive layout + mobile nav** (AUDIT.md #1, Blocker): added `assets/css/responsive.css` with breakpoints at 768px/480px — nav collapses to a hamburger menu (`assets/js/mobileNav.js`), hero/about/contact stack to single column, expertise grid collapses 4→2→1 columns. No visual screenshots captured (Claude-in-Chrome extension not connected this session) — recommend a manual pass at 375/768/1440px before merging.
