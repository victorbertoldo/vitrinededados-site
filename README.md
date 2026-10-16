# vitrinededados.com — Vitridata website

Bilingual (English / Português do Brasil) website for **Vitridata · Vitrine de Dados**, an independent data architecture and data engineering consultancy.

Plain static HTML, CSS and a little JavaScript. No framework, no build step, no trackers. Everything that gets published is in [`site/`](site/).

## Structure

```
site/
├── index.html              English home (canonical: /en/) so the bare domain always shows real content
├── en/                     English pages
│   ├── index.html          Home
│   ├── services/           Six service areas
│   ├── how-we-work/        Engagement process and models
│   ├── expertise/          Technologies and reference architecture
│   ├── about/              Company, beliefs, founder
│   ├── contact/            Contact form and direct channels
│   └── privacy/            Privacy policy (LGPD)
├── pt-br/                  Portuguese pages (same structure, localized URLs)
│   ├── index.html, servicos/, como-trabalhamos/, tecnologias/, sobre/, contato/, privacidade/
├── 404.html                Bilingual "page not found"
├── assets/css/site.css     All styles (design tokens at the top)
├── assets/js/site.js       Menu, scroll reveal, contact form
├── assets/fonts/           Self-hosted Sora, Inter, JetBrains Mono (SIL Open Font License)
├── assets/img/             Logo (SVG), icons, Open Graph image
├── sitemap.xml, robots.txt
├── .htaccess               HTTPS, www redirect, 404, caching (GoDaddy / Apache hosting)
└── CNAME, .nojekyll        GitHub Pages
scripts/check_site.py       Link, anchor, hreflang and metadata checks (runs in CI)
docs/strategy.md            Positioning, sitemap, design system and open items
```

| Page | English | Português |
|---|---|---|
| Home | `/en/` | `/pt-br/` |
| Services | `/en/services/` | `/pt-br/servicos/` |
| How we work | `/en/how-we-work/` | `/pt-br/como-trabalhamos/` |
| Expertise | `/en/expertise/` | `/pt-br/tecnologias/` |
| About | `/en/about/` | `/pt-br/sobre/` |
| Contact | `/en/contact/` | `/pt-br/contato/` |
| Privacy | `/en/privacy/` | `/pt-br/privacidade/` |

## Preview locally

```bash
cd site
python3 -m http.server 8000
# open http://localhost:8000/en/
```

Run the checks before publishing:

```bash
python3 scripts/check_site.py site
```

## Editing content

- Each page is a standalone HTML file. Edit the text directly.
- **Always change both languages.** The English page and its Portuguese twin are listed in the table above.
- `site/index.html` is a copy of `site/en/index.html` (only the canonical link differs). If you change the English home, copy the change there too.
- The header and footer are repeated in every page. To change a menu item or footer link, search and replace across `site/`.
- Colors, fonts and spacing are CSS variables at the top of `assets/css/site.css`.
- After adding or renaming a page, update `sitemap.xml`, the `hreflang` links in both language versions, and run the checks.

## Contact form

The form validates input, has a hidden honeypot field against spam bots, and shows accessible error and success messages.

**Today it opens the visitor's email app** with a message to `contato@vitrinededados.com` already filled in. That works everywhere but depends on the visitor having an email app.

`contato@vitrinededados.com` must exist at GoDaddy (a mailbox, or an alias/forward to your own inbox). If you move the website to GitHub Pages, change only the `A` and `www` records: leave the `MX` and email-related `TXT` records as they are, or email stops working.

To deliver messages directly from the page, connect a form service (Formspree, Getform, Basin and similar all accept the same JSON post):

1. Create a form at the service and set the destination email.
2. In **both** `site/en/contact/index.html` and `site/pt-br/contato/index.html`, find the `<form id="contact-form" …>` tag and set:
   - `action="https://formspree.io/f/YOUR_ID"` (replacing the `mailto:` value), remove `enctype="text/plain"`
   - `data-endpoint="https://formspree.io/f/YOUR_ID"`
3. Publish and send a test message from each language.

## Publishing

The domain `vitrinededados.com` stays registered at GoDaddy in both options. The current page is built with GoDaddy Website Builder, which **cannot host custom HTML**, so one of these is needed:

### Option A — GoDaddy web hosting (cPanel)

Requires a GoDaddy Web Hosting (cPanel) plan for the domain.

1. In GoDaddy, open **My Products → Web Hosting → Manage → cPanel Admin**.
2. Open **File Manager → public_html**. Back up and remove the default files there.
3. Upload the **contents** of the `site/` folder (not the folder itself), including the hidden `.htaccess`. Easiest: zip the contents of `site/`, upload the zip, then **Extract**. FTP works too.
4. In cPanel, enable **SSL/TLS Status → AutoSSL** (free certificate) for `vitrinededados.com` and `www.vitrinededados.com`.
5. If the domain still points to Website Builder, in **Domains → DNS** make sure the `A` record for `@` points to the hosting IP shown in cPanel, and `www` is a CNAME to `@`. Then unpublish the Website Builder site.
6. Visit `http://www.vitrinededados.com` and confirm it redirects to `https://vitrinededados.com/`.

To update later, upload the changed files again.

### Option B — GitHub Pages (free), DNS at GoDaddy

1. Merge this branch into `main`.
2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. **Settings → Secrets and variables → Actions → Variables**: add `DEPLOY_GITHUB_PAGES` = `true`. Every push to `main` then checks and deploys `site/`.
4. In GoDaddy **Domains → vitrinededados.com → DNS**, remove the Website Builder records and add:
   - `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www`: `victorbertoldo.github.io`
5. Back in **Settings → Pages**, set the custom domain to `vitrinededados.com` and tick **Enforce HTTPS** once the certificate is issued.

GitHub Pages ignores `.htaccess`; it handles HTTPS, the www redirect and `404.html` itself.

### After launch

- Add both `https://vitrinededados.com/en/` and `/pt-br/` to Google Search Console and submit `https://vitrinededados.com/sitemap.xml`.
- Send a test message through the contact form in both languages.
- Check the site at 360 px width and on a desktop browser.

## URL and language strategy

- English at `/en/`, Portuguese at `/pt-br/`. The switcher in the header goes to the same page in the other language (and keeps the section anchor).
- No automatic redirect by IP or browser language. The bare domain shows the English home with a canonical link to `/en/`; Portuguese is one click away.
- Every page declares `hreflang` for `en-US`, `pt-BR` and `x-default`, and the sitemap repeats them.
- The old GoDaddy site was a single page at `/`, which still works. `.htaccess` also redirects likely old paths (`/contato`, `/contact`, `/pt`).
