# Robert Owusu — Portfolio (v2, multi-page)

A multi-page, interactive portfolio. Dark-first design with a light/dark toggle,
an animated hero photo slideshow, a command palette (press Ctrl/Cmd + K), smooth
page-transition animations, scroll reveals, animated skill bars, an image lightbox,
and a booking page ready for Calendly/Cal.com. Plain HTML/CSS/JS — no build step.

## Pages

- `index.html` — Home (hero slideshow + quick links)
- `bio.html` — Bio
- `research.html` — Research Experience
- `professional.html` — Professional Experience
- `projects.html` — Projects
- `conferences.html` — Conferences
- `publications.html` — Publications (empty "coming soon" state, ready to fill)
- `skills.html` — Skills (animated bars — edit the `data-level` numbers)
- `leadership.html` — Leadership & Volunteering
- `extra.html` — Extraneous Experience (judging, competitions)
- `international.html` — International Exposure
- `contact.html` — Book an appointment

Shared files: `assets/style.css`, `assets/app.js`, and images in `assets/img/`.

## Run locally

```bash
cd site
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy (free)

- **Netlify:** drag the whole folder onto https://app.netlify.com/drop
- **Vercel:** run `vercel` inside the folder
- **GitHub Pages:** push to a repo, enable Pages from the root

## Key things you'll want to personalize

1. **Booking link** — open `contact.html`, find the "Schedule a call" button, and
   replace `https://calendly.com/` with your real Calendly or Cal.com link.
   (Create a free account at calendly.com or cal.com — takes 5 minutes.)
2. **Skill levels** — in `skills.html`, change the `data-level="90"` numbers (0–100)
   and the "Advanced / Proficient / Growing" labels to match your own assessment.
3. **Publications** — when you have papers, replace the "coming soon" block in
   `publications.html` with entries.
4. **Conference names/dates** — `conferences.html` uses Optica/Denver plus generic
   entries; add real names and dates.
5. **Photos** — studio portraits are in `assets/img/` as `portrait_*.jpg` and
   `speaking_optica.jpg`. Swap any image by replacing the file or changing the `src`.

## Features reference

- **Theme toggle** — the sun/moon button (top right). Choice is remembered.
- **Command palette** — press Ctrl/Cmd + K anywhere, or click the search icon, to
  jump to any page. Type to filter, arrows to move, Enter to open.
- **Hero slideshow** — auto-advances; click the dots to jump. Edit the slides in
  `index.html` (the `.slide` blocks).
- **Lightbox** — click most images to view them full-screen.
- **Add a new page** — copy an existing page file, edit its content, then add it to
  two places in `assets/app.js` (the `PAGES` array for the command palette) and to
  the nav list. The nav is generated per-page; easiest is to copy the `<header>`
  block from an existing page.

## Notes

- Some images (leadership, awards, volunteering strips) are the original collages
  from your portfolio doc. Swap in single clean photos anytime by replacing files
  in `assets/img/`.
- Copy on each page is a starting point written from your material — read through and
  adjust the wording to sound like you.
