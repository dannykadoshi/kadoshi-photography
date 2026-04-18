<div align="center">

# 📸 Kadoshi Photography

### Dark cinematic photography portfolio — built to book clients

[![Live Site](https://img.shields.io/badge/🌐%20View%20Live%20Site-dannykadoshi.github.io/kadoshi--photography-c9a96e?style=for-the-badge&labelColor=0a0a0a)](https://dannykadoshi.github.io/kadoshi-photography/)

</div>

---

## Overview

**Kadoshi Photography** is a professional portfolio website for photographer Danni Kadoshi, based in Co. Wexford, Ireland. Built to convert visitors into clients — dark cinematic aesthetic, smooth animations, filterable gallery, and a working contact/booking form.

Covers seven photography disciplines: **Sports · Weddings · Portraits · Landscapes · Pets · Street · Events**

Available across Ireland and open to travel worldwide.

---

## Features

- **Custom cursor** — gold dot with lag-ring follow effect
- **Animated hero** — staggered text reveals on load
- **Philosophy marquee** — smooth infinite-scroll strip
- **Filterable portfolio** — 7 category tabs, instant filter with fade transition
- **Lightbox** — full-screen image viewer with keyboard navigation (← → Esc)
- **Animated stat counters** — triggered on scroll into view
- **Booking form** — live via Formspree, emails delivered directly to inbox
- **Fully responsive** — mobile hamburger menu, fluid grid at all breakpoints
- **No frameworks** — pure HTML, CSS, and vanilla JS

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | Custom CSS (CSS variables, Grid, Flexbox, animations) |
| Behaviour | Vanilla JavaScript (ES6+, IntersectionObserver, Fetch API) |
| Forms | [Formspree](https://formspree.io) |
| Hosting | GitHub Pages |
| Fonts | Cormorant Garamond · Inter · Space Mono (Google Fonts) |

---

## Design

- **Palette:** Deep black `#0a0a0a` · Warm gold `#c9a96e` · Ivory white `#f5f0e8`
- **Typography:** Cormorant Garamond (serif display) + Inter (body) + Space Mono (labels)
- **Style:** Dark cinematic — editorial magazine meets film noir

---

## Repo Structure

```
kadoshi-photography/
├── index.html        # Single-page site
├── css/
│   └── style.css     # All styles — theme, layout, animations
├── js/
│   └── main.js       # Cursor, scroll reveal, filter, lightbox, form
└── images/           # Drop your photos here (replace placeholders)
```

---

## Adding Your Photos

The gallery uses placeholder tiles. To add real photos:

1. Drop your images into the `images/` folder
2. In `index.html`, replace each `<div class="gallery-placeholder">` block with:

```html
<img src="images/your-photo.jpg" alt="Description of shot">
```

Aim for **3–4 strong images per category** before launching.

---

## Contact Form Setup

The form uses Formspree. The form ID is already configured — submissions go directly to the registered email.

To change the destination email: log in to [formspree.io](https://formspree.io) and update the form settings under the **Kadoshi Photography** project.

---

## Deployment

Hosted on **GitHub Pages** — every push to `main` deploys automatically.

To connect a custom domain:
1. Buy a domain (Namecheap, Porkbun, etc.)
2. In the repo → **Settings → Pages → Custom domain**, enter your domain
3. Add a `CNAME` record at your registrar pointing to `dannykadoshi.github.io`

---

<div align="center">

Built by [Danni Kadoshi](https://dannykadoshi.github.io) · Co. Wexford, Ireland

</div>
