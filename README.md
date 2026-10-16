# رِقّة | RAQA

Arabic RTL hospitality website for Tabuk, built with PHP 8.2+, semantic HTML, CSS and vanilla JavaScript. No database, framework, build step, paid API, or server-side inquiry storage.

## Start locally

From this folder run `php -S localhost:8000`, then visit http://localhost:8000. If using the portable runtime downloaded during implementation, run `.\.tools\php\php.exe -S localhost:8000` in PowerShell. The `.tools` folder is local tooling only and is excluded from Git and deployment.

## Required before launch

Edit `config.php`:

- `RAQA_WHATSAPP`: configured to the official `966507413106`. Every booking link and the inquiry form use this number centrally.
- `RAQA_SITE_URL`: the verified production HTTPS URL, without a trailing slash; include any hosting subdirectory. Canonical URLs and Open Graph images are emitted only after this is set.
- `RAQA_PHONE`: configured to `+966507413106`. `RAQA_INSTAGRAM`, `RAQA_TIKTOK`, `RAQA_FACEBOOK`, `RAQA_SNAPCHAT`, and `RAQA_X`: add verified HTTPS account URLs later. All five footer icons are present; missing destinations remain inactive and labelled unavailable, never invented links.
- Run `php scripts/build-sitemap.php` after configuring the domain. It generates the five absolute sitemap URLs and updates robots.txt. The supplied sitemap is intentionally empty until a real domain exists.

## Hosting / cPanel / Hostinger

See [docs/HOSTINGER.md](docs/HOSTINGER.md) for GitHub connection, PHP settings, automatic deployment, and manual fallback steps. Deployment is deferred at the owner's request until the domain and hosting plan are supplied. `python scripts/package-release.py` creates a deployment-only ZIP in `dist/`.

Select PHP 8.2 or higher. Upload the five root page files, `config.php`, `includes/`, `data/`, `assets/`, `.htaccess`, `.user.ini`, `robots.txt`, and the generated `sitemap.xml` into your site's public directory (usually `public_html`). Do not upload `.git`, `.tools`, `tests`, or `scripts`. Use HTTPS. PHP includes use relative directory-safe paths; public links support a subdirectory installation. Apache overrides provide basic response headers, directory-listing protection, and asset caching. `.user.ini` disables browser-facing PHP errors on compatible CGI/FPM hosts; confirm this setting in your hosting panel. Keep server error logs outside the public directory.

## Content and images

- Product names, descriptions, IDs and images: `data/products.php` (exactly three pieces).
- Gallery image order and dimensions: `data/gallery.php`.
- Page text: the respective root PHP page. Navigation and footer: `includes/header.php` and `includes/footer.php`.
- Logo: `assets/images/branding/raqa-logo.png`, copied from the supplied original without redrawing it.
- Three isolated product PNGs and seven ballroom PNGs are preserved, alongside full-resolution and 640px WebP derivatives. Original Downloads assets are untouched.
- `scripts/prepare-assets.py` can rebuild derivatives with Pillow; update its source directory if necessary. When adding a gallery image, provide `.webp` and `-640.webp` versions, then add its actual dimensions to the central data list. Do not use customer-event claims for staged images. The gallery explicitly identifies AI-generated visual concepts.
- Styles: `assets/css/style.css`. Behavior: `assets/js/main.js`. Arabic fonts are self-hosted in `assets/fonts`; system Arabic fonts provide a fallback.

## Hero video and promotional film

The supplied 10-second, 1920×1080 MP4 is installed at assets/videos/hero-desktop.mp4 (3.61 MB), enabling the muted looping hero background on desktop and mobile. The original Downloads file is unchanged. No transcoding was performed. Original ballroom images remain the fallback for reduced motion, Data Saver, and video loading failures. A dedicated portrait video and the full promotional film are still missing; the film section explicitly says coming soon.

Add optimized files at these paths (or edit the paths in config):

1. `assets/videos/hero-desktop.mp4`: an 8–10 second muted H.264 loop, around 1280px wide, fast-start MP4.
2. `assets/videos/hero-mobile.mp4`: an art-directed portrait version of that segment. Preserve the products when cropping.
3. `assets/videos/raqa-full-film.mp4`: the full promotional film, loaded only through its native, user-operated controls.

The hero file is attached by JavaScript only when reduced motion and Data Saver are off. Autoplay failures preserve the poster and expose a play control. A visible pause button is available. No-JavaScript visitors see the poster. Full-film playback uses `preload="none"` and never autoplays. Supply captions for spoken content if the future film contains speech.

FFmpeg was not available and no conversion was performed. Once the three original clips are supplied, normalize and concatenate them in their intended order. Example for same-orientation sources (adjust dimensions to preserve the composition):

```sh
ffmpeg -i clip-1.mp4 -i clip-2.mp4 -i clip-3.mp4 -filter_complex "[0:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30,setpts=PTS-STARTPTS[v0];[1:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30,setpts=PTS-STARTPTS[v1];[2:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30,setpts=PTS-STARTPTS[v2];[v0][v1][v2]concat=n=3:v=1:a=0[v]" -map "[v]" -c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p -movflags +faststart assets/videos/raqa-full-film.mp4
ffmpeg -i clip-1.mp4 -t 10 -an -vf "scale=1280:-2" -c:v libx264 -crf 26 -preset medium -pix_fmt yuv420p -movflags +faststart assets/videos/hero-desktop.mp4
```

These examples intentionally omit audio. Review original sound before deciding whether to retain it in the full film. A portrait hero needs a separately reviewed crop or dedicated source, not an automatic crop that cuts off products.

## QA and performance

Run `Get-ChildItem -Recurse -Filter *.php | Where-Object { $_.FullName -notmatch '\\.tools\\' } | ForEach-Object { php -l $_.FullName }` in PowerShell, and `node --check assets/js/main.js`.

Images have dimensions, responsive sources and lazy loading except key introductory imagery. Gallery dialogs use native modal focus behavior, Escape, RTL arrow keys, touch swipes and focus restoration. Mobile navigation supports Escape and outside dismissal. No inquiries are stored in cookies, browser storage or a database.

Actual verification results are recorded in `tests/QA.md`. Real-device Safari/Android testing and production Lighthouse scores must be evaluated on the deployed host; they are not implied by local checks.
