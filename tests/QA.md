# Verification — 16 October 2026

## Latest release checks

- 80 PHP-rendered page/viewport combinations passed at 320, 360, 375, 390, 430, 600, 760, 761, 768, 800, 850, 900, 1024, 1280, 1440 and 1920 pixels. Checked both document/body scrolling and element bounds, with fonts loaded.
- Fixed the root cause of the heart overflow: its rotated box inherited a 1.85 line height. It now has explicit one-em dimensions, unit line height and safe inset; removed the clipping workaround. Modal width uses its available containing width instead of `100vw`. Grid children can shrink and footer icons wrap.
- All five pages have WhatsApp links to `966507413106` and five social icons. No invented social URLs; unconfigured icons are non-link elements with unavailable labels.
- Booking form is enabled with the official number. Arabic message encoding and whitespace validation passed with outbound navigation intercepted; no message sent.
- Mobile menu, gallery filtering, modal navigation/width, Escape/focus restoration and reduced-motion fallback passed.
- All 15 PHP files pass syntax validation. JavaScript syntax passes.
- Deployment-only ZIP generated; Git metadata, local runtimes, tests/results, ZIP files and common secret/key files are excluded from version control.
- Hostinger deployment intentionally deferred by owner. The owner supplied ahmedgalal2020/Raqa and explicitly approved uploading to that public repository. Hostinger deployment remains deferred.

Earlier results below describe previous versions and are retained as history. Use `python tests/render-pages.py` and `node tests/release-check.cjs` for current offline QA; `node tests/browser-check.cjs` checks a running local PHP server.

## Passed

- PHP 8.4.26 syntax validation on all 14 PHP files.
- JavaScript syntax validation (`node --check assets/js/main.js`).
- All five pages rendered using the actual PHP templates through PHP CLI.
- Chrome/Playwright checks on those rendered pages at 360, 375, 390, 430, 768, 1024 and 1440px: 35 page/viewport combinations, no horizontal overflow, correct RTL, no failed loaded image sources.
- Mobile menu open/close and Escape behavior.
- Gallery product filtering (exactly three), modal opening, RTL arrow navigation, Escape closing and focus restoration.
- Empty WhatsApp configuration disables form submission and returns no fabricated WhatsApp URL.
- Booking form whitespace-only city rejection and URL-encoded Arabic message, including ampersands. A synthetic number was injected only into an ignored offline test fixture; the outbound URL was intercepted, no message was sent, and production configuration stayed empty.
- Reduced-motion smooth-scroll override.
- Browser run reported no page JavaScript errors.

The narrow-screen check found and fixed overflow from the decorative heart. The gallery's initially empty modal image is intentionally excluded from broken-source checks until opened.

## Limits

- These browser checks use PHP-generated HTML opened as local files. HTTP preview access was blocked by the execution environment. Starting the HTTP server outside the sandbox could not be approved because the automatic approval reviewer hit an account usage limit. HTTP headers, hosting behavior and live HTTP navigation remain unverified.
- No supplied videos: actual video decode, autoplay, audio, mobile crop and full-film runtime could not be verified. Poster fallback is present. FFmpeg was unavailable; no video processing was claimed or performed.
- No physical iPhone/Safari or Android test and no production Lighthouse measurement.
- Production WhatsApp account, phone and social destinations are not configured; delivery to a real account was not tested.
- Touch swipe logic is implemented but not physically tested.

## Reproduce

`tests/browser-check.cjs` targets a normal PHP server on localhost:8000. This environment's portable-runtime alternative is `tests/render-pages.py`, followed by `node tests/offline-check.cjs`. These scripts use this machine's bundled Playwright and installed Chrome paths; adjust paths elsewhere. Generated HTML, screenshot files and JSON results stay under ignored `tests/results/` and are not deployment content.

## Hero video update
The supplied 10-second 1920×1080 MP4 was copied into the configured hero path. Chrome successfully decoded and autoplayed it muted. The pause button paused playback; switching to reduced motion removed the source. The loop attribute is enabled. Full-film and physical-device playback remain untested.
