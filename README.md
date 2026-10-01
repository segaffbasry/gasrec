# Gasrec: homepage demo

A private redesign of the [gasrec.co.uk](https://www.gasrec.co.uk/) homepage, built as a Regen Digital prospect demo.
Next.js 16 (App Router, static), GSAP + Lenis. Homepage only: every other link keeps its live gasrec.co.uk URL, but
clicks are cancelled so nothing leaves the page.

```bash
npm install
npm run dev        # http://127.0.0.1:3027
npm run build
```

## References

| Site | What was taken |
| --- | --- |
| [airfieldlacaminera.com](https://airfieldlacaminera.com/) (main) | Header (outlined MENU block, centred logo, solid CTA), hero with thumbnail strip, centred intro, photo/panel checkerboard, two-column feature, photo + panel pair, centre-weighted gallery, stacked card slider, events row, contact panels over a photo. Block buttons with the hairline arrow cell. Easing: `cubic-bezier(.625,.05,0,1)` for moves, `(.125,.425,.27,1)` for hovers. |
| [wysscenter.ch](https://wysscenter.ch/) | Opening statement with highlighted phrases, full-bleed photo band with CTA, portrait + quote card, tag chips on news cards. |
| [gaslogltd.com](https://www.gaslogltd.com/) | Stacked full-width photo bands (uppercase title, one line, ringed arrow) linking to each section of the site. |

## Brand

- Palette from the live Squarespace theme: blue `#005EA3`, navy `#185381`, green `#2F7F53`, white. Ink `#0D2A45` and paper `#EEF3F8` are steps of the navy. `#7CC576` is the "rec" green from the vehicle livery, used only in the logo and small highlights on dark grounds.
- Fonts: Manrope (headings) and Poppins (text), the live site's own pair, via `next/font/google`.
- Logo: the live site only publishes a white PNG. `scripts/logo.py` traces it with potracer and splits it into `gas` and `rec` paths (`lib/logo.ts`, `public/brand/logo.svg`).

## Content

All copy is in `lib/content.ts`, verbatim from the homepage plus the pages it links to (What we do, Stations, About gas, Knowledge Zone, Our team, the blog JSON). No em or en dashes. Photography comes from the Squarespace CDN through `npm run media` (`scripts/media.sh`); originals are cached in `_scrape/`, which is git-ignored.

## Demo rules

- `noindex, nofollow` in the layout metadata; no sitemap.
- PostHog EU snippet in `lib/posthog.ts` (`NEXT_PUBLIC_POSTHOG_KEY`, with a fallback literal): pageview, pageleave, autocapture, session recording, `site` + UTM registration, `scroll_depth` at 25/50/75/100. Surveys are off.
- No Regen branding or added UI.
- The film plays inline: the poster button swaps in the YouTube player (youtube-nocookie).
