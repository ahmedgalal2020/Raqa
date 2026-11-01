# Hostinger deployment

## Project settings

- Application: custom PHP website (not Node.js, WordPress, or Website Builder).
- PHP: 8.5.12 or newer stable release; Windows development package: 8.5.12-1.
- Repository: [`ahmedgalal2020/Raqa`](https://github.com/ahmedgalal2020/Raqa), visibility **Public**, explicitly approved by the owner.
- Deployment branch: `main`.
- Repository project root: `/` (the folder containing `index.php`).
- Hostinger destination: `public_html`, or the specific domain's document root.
- Build command: none. Package installation: none. Database: none.
- Required production setting: set `RAQA_SITE_URL` to your actual HTTPS domain in `config.php`, then run `php scripts/build-sitemap.php` locally and commit the generated sitemap and robots files.
- WhatsApp is configured as `966507413106`.

## Connect through GitHub

1. Sign in to Hostinger, open **Websites**, and select the correct website's **Dashboard**. Confirm the domain before deploying. Back up any existing site first; deployment can overwrite its files.
2. Select **Advanced → Git**, then **Connect with GitHub**.
3. Authorize the Hostinger GitHub integration for **only `Raqa`** when GitHub offers repository selection. Use the repository visibility approved by the owner.
4. Select `Raqa`, branch `main`, and the appropriate destination directory, normally `public_html`. Deploy and wait for the completed status.
5. In the Git overview, enable **Auto-deployment**. Future pushes to `main` will deploy. Use **All deployments** to verify the commit ID and outcome. **Redeploy** triggers a manual update.
6. Enable HTTPS in the domain's hosting settings, select PHP 8.5 with patch version 8.5.12 or newer, visit all five pages, check video and gallery behavior, and click a WhatsApp link to confirm the official number. Check that `/.git/config`, `/tests/`, `/scripts/`, and `/config.php` return forbidden/not-found responses rather than file contents.

No build workflow, GitHub token, SSH password, or webhook secret is required in this source tree for Hostinger's OAuth integration. The `.htaccess` excludes development/source directories from web access while PHP can still include its components. Confirm Apache/LiteSpeed overrides are active on your hosting plan.

## If Git or auto-deployment is unavailable

- First confirm the website is a custom PHP/HTML site on Web or Cloud hosting. Hostinger AI Builder sites do not support this Git integration. Do not purchase or change plans without deciding which hosting product you want.
- If your panel only supports manual Git deployment, connect the same repository and branch, and click **Redeploy** after each push.
- If your account exposes the older Git screen instead of OAuth, follow the private repository/deploy-key instructions shown in your panel. Add only Hostinger's **public** deploy key to GitHub → repository Settings → Deploy keys, with read-only access; never commit a private key. Use its Auto Deployment instructions only if the panel actually provides that feature.
- If there is no Git feature, run `python scripts/package-release.py`, upload the resulting `dist/raqa-hostinger.zip` using Hostinger File Manager, and extract its contents into the chosen document root. It contains only deployable files. Future releases require repeating that upload, or enabling the supported Git integration through Hostinger support.

## Status and references

The owner explicitly deferred deployment until the domain and hosting plan are supplied. Automatic deployment is **not configured or verified**. This is a deployment-ready source project, not a claim that a site is already live.

Official current guide: https://www.hostinger.com/support/1583302-how-to-deploy-a-git-repository-in-hostinger/

Current OAuth guide: https://www.hostinger.com/changelog/github-oauth-setup-for-git-deployments

## PHP security update — 1 November 2026

PHP 8.5.12 is the current stable release. It fixes CVE-2026-109618 and CVE-2026-109619. Windows package 8.5.12-1 additionally updates Brotli to 1.2.1. The runtime still reports 8.5.12; the -1 suffix identifies the package rebuild.

Changing this repository does not upgrade Hostinger's PHP runtime. Select PHP 8.5 in the hosting PHP configuration and verify the actual patch is at least 8.5.12 with the provider. If 8.5 is unavailable, request it; 8.4.27 contains the critical October fixes as a temporary fallback. Restart all PHP workers after updating and check all five pages. Do not leave a public phpinfo page online.

Follow PHP's 23 October advisory: set `session.upload_progress.enabled=0` in the server php.ini or FPM pool before request parsing, then restart all workers. Do not rely on application ini_set() or FPM .user.ini for this mitigation. This website does not need session upload progress. An updated runtime remains essential.

Official sources: https://www.php.net/index.php and https://www.php.net/downloads.php

No previous site compromise or remediation is documented in the repository history reviewed for this update. A runtime upgrade does not establish that an already compromised server has been cleaned.
