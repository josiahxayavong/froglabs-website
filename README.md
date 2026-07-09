# Frog Labs LLC — Company Website

A fully static website for Frog Labs LLC. Plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step. Open `index.html` in a browser and everything works.

## Structure

```
/
├── index.html        Home
├── about.html        About the company
├── blackjack.html    Blackjack app page (features, screenshots, FAQ)
├── privacy.html      Privacy policy (App Store ready)
├── support.html      Support, FAQ, troubleshooting
├── contact.html      Contact info + front-end-only contact form
├── 404.html          Not-found page (GitHub Pages serves this automatically)
├── css/style.css     All styles
├── js/main.js        All scripts (nav, reveal animations, form, transitions)
├── images/           Favicon, Apple touch icon, Open Graph image
├── robots.txt
└── sitemap.xml
```

## Deploying to GitHub Pages (free)

1. Create a new GitHub repository (e.g. `froglabs-website`).
2. Push this folder's contents to the repository root on the `main` branch:
   ```
   git init
   git add .
   git commit -m "Frog Labs website"
   git remote add origin https://github.com/YOUR-USERNAME/froglabs-website.git
   git push -u origin main
   ```
3. In the repository: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)` → Save**.
4. The site goes live at `https://YOUR-USERNAME.github.io/froglabs-website/` within a minute or two.
5. (Optional) Add a custom domain (e.g. `froglabsllc.com`) under **Settings → Pages → Custom domain** and create the DNS records GitHub shows you.

## Placeholders to replace before/after App Store launch

| What | Where |
|---|---|
| App Store URL | Every `appstore-badge` link — search for `TODO: replace href` in `index.html` and `blackjack.html` |
| Real app screenshots | All three phones use real screenshots: `images/blackjack-gameplay.jpg`, `images/statistics.jpg`, `images/basic-strategy.jpg` — swap the files to update them |
| Social media URLs | The three `social-link` anchors in `contact.html` |
| Canonical domain | If you are **not** using `froglabsllc.com`, update the `<link rel="canonical">`, `og:url`, and `og:image` tags in each page, plus `sitemap.xml` and `robots.txt` |

## Notes

- The contact form is front-end only: it validates input, then opens the visitor's own email client with the message prefilled (no backend, nothing stored).
- The privacy policy assumes the app is fully offline with no analytics SDKs. If you ever add analytics or third-party services, update sections 3 and 4.
- Google Fonts (Inter + Sora) is the only external dependency.
