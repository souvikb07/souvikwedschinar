# Wedding Invitation Website — Full Recreation Brief

> Hand this file (plus the `screenshots/` folder and `content.json`) to Claude Code / Codex and say:
> **"Build this website exactly as specified in WEDDING_INVITE_BUILD_BRIEF.md. Match the screenshots pixel-for-pixel where possible. Use content.json for all text so I can personalise it."**

Reference site (studied in full): `https://invifest.in/invitation/anoushka-ishan` → `https://invifest.in/anoushka-ishan`
Theme: **"Flying Into Forever"** — a soft, blush-pink, hand-cut-paper world with clouds, gold stars, falling petals and a little olive-green paper helicopter (the groom is an Army Captain/pilot, the bride is an advocate).

---

## 0. TL;DR for the AI builder

- Mobile-first, single-column invitation, **max content width 500px**, centred on desktop with decorative sky filling the sides.
- 5 stages in this order:
  1. **Gate / share page** (`/invitation/<slug>`) — blurred cover backdrop + white card + "Open the invitation" button.
  2. **Preloader** — small paper card "I & A", a helicopter flying along a dashed track with a % counter, "Preparing for take-off".
  3. **Tap-to-open cover** — full-screen illustrated image ("tap to open" pinned paper label + paper helicopter).
  4. **Intro film** — full-screen ~10s MP4 plays (with "Skip" pill), then cross-fades out; background music starts.
  5. **Main invitation** — Ganesha + shloka → host card with names → "On" **scratch card** reveals the date → after reveal, the rest of the page animates in (countdown, photo clothesline carousel, 4 event cards, directions, RSVP form with fun bets, call buttons, closing card, footer credit).
- Persistent layers on main page: dotted gold "dust", parallax paper clouds, twinkling stars, bobbing hearts, falling petals, 2 helicopters flying across, **music toggle** (bottom-right), **"Scroll" cue pill** (bottom-centre).
- Stack recommendation: **Vite + React** (original is React/Vite) or plain HTML/CSS/vanilla JS. No CSS framework needed. All styling is custom CSS using the tokens below.

---

## 1. Tech & file structure

```
/ (Vite + React, or static)
├─ index.html                      # loads Google Fonts + app
├─ src/
│  ├─ content.json                 # ALL text/data (see content.json)
│  ├─ styles.css                   # tokens + all component CSS
│  ├─ App.jsx                      # stage machine: preloader → cover → film → page
│  ├─ components/
│  │  ├─ Gate.jsx                  # optional separate share page (/invitation)
│  │  ├─ Preloader.jsx
│  │  ├─ Cover.jsx, Film.jsx
│  │  ├─ Sky.jsx (clouds/stars/hearts), FrontClouds.jsx, Petals.jsx, Helicopters.jsx
│  │  ├─ Hero.jsx (Ganesha, mantra, host card, names)
│  │  ├─ ScratchCard.jsx
│  │  ├─ Countdown.jsx, PhotoLine.jsx, Events.jsx, Directions.jsx
│  │  ├─ Rsvp.jsx, CallUs.jsx, Footer.jsx
│  │  └─ MusicButton.jsx, ScrollCue.jsx
└─ public/assets/                  # images, mp4, mp3, fonts (YOU must supply — see §11)
```

Google Fonts link (main invitation):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Italianno&family=Tiro+Devanagari+Hindi&display=swap" rel="stylesheet">
```
Gate page additionally uses: `Playfair Display (400,600, italic 400)`, `Tenor Sans`, `Noto Serif Devanagari`.

Custom (non-Google) script fonts used by the original — **licensed fonts, buy or substitute**:
- **"Avenue de Madison"** → the big calligraphic couple names ("Adv Anoushka / Capt Ishan"). Free-ish substitutes: *Great Vibes*, *Pinyon Script*, *Alex Brush*, *Parisienne* (closest feel: **Great Vibes** at slightly larger size, or *Playball* for the bold brush look).
- **"Signatra"** → the hashtag "#FlyingIntoForever". Substitute: *Mrs Saint Delafield*, *Allura*, or *Great Vibes*.

---

## 2. Design tokens (use exactly)

```css
:root{
  color-scheme: only light;
  --blush:#f9e2dc; --blush-mid:#f3cfc7; --blush-deep:#e9b9b0; --rose-deep:#dda096;
  --champagne:#f8eddd; --card:#fffdf8; --card-edge:#efdfc8;
  --ink:#48292b; --ink-mid:#6f4a45; --ink-soft:#8d655c;
  --gold:#c69239; --gold-light:#e0c285; --gold-deep:#9a7127; --gold-shade:#9d7a24; /* --gold-soft intentionally undefined, see §7.1 */
  --maroon:#711423;
  --olive:#7e8f5e; --olive-shade:#64744a; --olive-deep:#4f5f3c;
  --cloud:#fffaf3; --cloud-shade:#ecd7cd;
  --rose:#eeb6b6; --rose-shade:#d99a9a;
  --lift-1: 0 2px 4px -1px rgba(78,50,48,.18), 0 8px 16px -6px rgba(78,50,48,.2);
  --lift-2: 0 3px 6px -1px rgba(78,50,48,.2), 0 16px 30px -12px rgba(78,50,48,.28);
  --font-name: "Avenue de Madison", "Segoe Script", "Brush Script MT", cursive;   /* couple names */
  --font-hash: "Signatra", "Avenue de Madison", cursive;                           /* hashtag */
  --font-soft: "Italianno", "Cormorant Garamond", cursive;                         /* soft script leads */
  --font-body: "Cormorant Garamond", Georgia, "Times New Roman", serif;            /* body */
  --font-caps: "Cinzel", Georgia, serif;                                           /* small caps headings */
  --font-deva: "Tiro Devanagari Hindi", "Cormorant Garamond", serif;               /* Sanskrit */
}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html{-webkit-text-size-adjust:100%;scroll-snap-type:y proximity}
html,body{background:var(--blush)}
body{min-height:100svh;font-family:var(--font-body);font-size:16px;line-height:1.55;color:var(--ink);overflow-x:clip}
body.locked{overflow:hidden;height:100svh}   /* while preloader/cover/film are showing */
img{display:block} button{font:inherit;color:inherit}
```
Gold hairline colour used everywhere for borders: `rgba(184,145,47,.45)` (strong) / `rgba(184,145,47,.18–.2)` (faint).
Shadow ink colour: `rgba(78,50,48, a)` (`#4e3230` + alpha).

### Reusable primitives
**`.paper` — torn-paper card** (used for nearly every card):
```css
.paper{position:relative;
  background:linear-gradient(180deg,#fffdf8 0%,var(--card) 42%,#fdf4e8 100%);
  clip-path:polygon(0% 1.2%,8% .4%,17% 1.1%,26% .3%,36% 1.1%,47% .2%,58% 1.1%,69% .3%,80% 1.2%,90% .4%,97% 1.1%,100% .5%,99.5% 12%,100% 26%,99.4% 41%,100% 57%,99.6% 72%,100% 87%,99.4% 99.4%,92% 100%,82% 99.1%,71% 99.8%,60% 99%,48% 99.8%,37% 99%,26% 99.8%,15% 99.1%,6% 99.8%,.5% 99.2%,.8% 86%,0% 71%,.6% 55%,0% 39%,.6% 24%,0% 12%);
  filter:drop-shadow(0 1px 2px rgba(78,50,48,.2)) drop-shadow(0 10px 18px rgba(78,50,48,.18));}
```
**`.ruled` — double gold inner frame** (add alongside `.paper`):
```css
.ruled::before{content:"";position:absolute;inset:11px;border:1px solid rgba(184,145,47,.45);pointer-events:none}
.ruled::after {content:"";position:absolute;inset:16px;border:1px solid rgba(184,145,47,.18);pointer-events:none}
```
**Section header `.sec`** = ornament + optional eyebrow + optional title + optional lead:
```html
<header class="sec">
  <span class="sec-orn"><i></i><b>◆</b><i></i></span>   <!-- gold fading line, tiny diamond, line -->
  <span class="sec-eyebrow">Counting down to</span>      <!-- Cinzel 600, .72–.86rem, ls .24em, uppercase, --ink-mid -->
  <h2 class="sec-h">The flight to forever</h2>           <!-- Cinzel 600, clamp(1.32rem,6.2vw,1.7rem), ls .06em, --ink -->
  <p class="sec-lead">Four functions over three days…</p><!-- Italianno, clamp(1.5rem,7vw,1.85rem), --ink-mid -->
</header>
```
```css
.sec{text-align:center;margin-bottom:clamp(1.2rem,5vw,1.7rem)}
.sec-orn{display:flex;align-items:center;justify-content:center;gap:.55rem;margin:0 auto .9rem;width:min(230px,66%);color:var(--gold)}
.sec-orn i{flex:1;height:1px;background:linear-gradient(to right,rgba(184,145,47,0),var(--gold))}
.sec-orn i+i{background:linear-gradient(to left,rgba(184,145,47,0),var(--gold))}
.sec-orn b{font-size:.52rem;font-weight:400;line-height:1}
.sec-eyebrow{display:block;font-family:var(--font-caps);font-weight:600;font-size:clamp(.72rem,3.5vw,.86rem);letter-spacing:.24em;text-transform:uppercase;color:var(--ink-mid);padding-left:.26em}
.sec-h{margin-top:.55rem;font-family:var(--font-caps);font-weight:600;font-size:clamp(1.32rem,6.2vw,1.7rem);line-height:1.28;letter-spacing:.06em;color:var(--ink)}
.sec-h--big{font-size:clamp(1.9rem,9vw,2.45rem);letter-spacing:.08em;line-height:1.15}
.sec-lead{margin:.55rem auto 0;max-width:26rem;font-family:var(--font-soft);font-size:clamp(1.5rem,7vw,1.85rem);line-height:1.15;color:var(--ink-mid)}
```
Note: Cinzel renders lowercase as small caps — headings like "The flight to forever" are written in sentence case and appear as THE FLIGHT TO FOREVER with larger initials.

Apply `text-wrap:balance` to headings, leads, venue lines, footer messages, RSVP headings/questions.

---

## 3. Stage 1 — Gate / share page (`/invitation/<slug>`)  — see `screenshots/01-gate-landing.jpg`

Purpose: pretty link-preview landing page that sends you to the real invite.

Structure:
```html
<main class="xg">
  <div class="xg-bg" style="background-image:url(gate-cover.webp)"></div>   <!-- blurred backdrop -->
  <div class="xg-petals">… 12 falling gold flowers / rose petals …</div>
  <section class="xg-card">
    <img class="xg-cover" src="gate-cover.webp" alt="">                        <!-- 4:3 illustration -->
    <div class="xg-body">
      <p class="xg-line">With the blessings of our families, we warmly invite you to the wedding of</p>
      <h1 class="xg-names">Anoushka &amp; Ishan</h1>
      <p class="xg-date">Sunday, 22 November 2026</p>
      <a class="xg-btn" href="/anoushka-ishan">Open the invitation</a>
      <p class="xg-foot">Crafted with love by Invifest</p>   <!-- replace with your own credit -->
    </div>
  </section>
</main>
```
CSS (exact):
```css
.xg{color:#2c2a29;background:#fdfbf7;display:grid;place-items:center;min-height:100dvh;padding:1.25rem;font-family:"Cormorant Garamond","Noto Serif Devanagari",Georgia,serif;position:relative;overflow:hidden}
.xg-bg{position:absolute;inset:-10%;background-position:50%;background-size:cover;filter:blur(28px) saturate(1.1);opacity:.45}
.xg::after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(80% 60% at 50% 100%,#8a4f4c2e,#0000 70%)}
.xg-petals{position:absolute;inset:0;z-index:3;pointer-events:none;overflow:hidden}
.xg-petal{position:absolute;top:-12%;opacity:0;background:url(GOLD_FLOWER_SVG) 50%/contain no-repeat;animation:xgFall linear infinite}
.xg-petal-b{background-image:url(ROSE_PETAL_SVG)}
@keyframes xgFall{0%{opacity:0;top:-12%;transform:translate(0) rotate(0)}9%,86%{opacity:var(--o)}to{transform:translateX(var(--dx)) rotate(400deg);opacity:0;top:112%}}
.xg-card{position:relative;z-index:2;width:min(100%,420px);overflow:hidden;background:#ffffffeb;border:1px solid #d4af3773;border-radius:1.75rem;box-shadow:0 30px 80px -30px #2c1e1673;animation:xgIn .6s cubic-bezier(.23,1,.32,1) both}
@keyframes xgIn{0%{opacity:0;transform:translateY(12px) scale(.98)}}
.xg-cover{width:100%;aspect-ratio:4/3;object-fit:cover;display:block}
.xg-body{text-align:center;padding:1.6rem 1.5rem 1.4rem}
.xg-line{color:#5a5552;max-width:30ch;margin:0 auto .9rem;font-size:1.05rem;font-style:italic;line-height:1.5}
.xg-names{color:#2c2a29;font-family:"Playfair Display","Cormorant Garamond",serif;font-size:clamp(1.9rem,7.5vw,2.5rem);font-weight:400;line-height:1.15;letter-spacing:-.01em}
.xg-date{margin-top:.5rem;font-family:"Tenor Sans",sans-serif;font-size:.78rem;letter-spacing:.22em;text-transform:uppercase;color:#8a4f4c}
.xg-btn{display:block;margin:1.4rem auto 0;padding:1rem 1.5rem;border-radius:999px;background:#8a4f4c;color:#fff;font-family:"Tenor Sans",sans-serif;font-size:.85rem;letter-spacing:.2em;text-transform:uppercase;text-decoration:none;box-shadow:0 10px 28px -10px #8a4f4cb3;transition:transform .16s cubic-bezier(.23,1,.32,1)}
.xg-btn:active{transform:scale(.97)}
.xg-foot{color:#8c8480;margin-top:1.1rem;font-size:.8rem}
@media (prefers-reduced-motion:reduce){.xg-petals{display:none}.xg-card{animation:none}}
```
Petal spans (12, alternating `.xg-petal` gold flower and `.xg-petal-b` rose petal), inline style per span — left %, size, duration, delay, `--dx`, `--o`:
```
6%  22px 19s -4s  34px .20 | 17% 15px 26s -12s -28px .14 (b) | 28% 26px 22s -7s 46px .17 | 39% 18px 30s -18s -36px .13 (b)
50% 23px 24s -2s  26px .19 | 61% 16px 28s -15s -22px .15 (b) | 72% 25px 21s -9s 40px .20 | 83% 17px 27s -21s -30px .13 (b)
93% 20px 23s -5s  30px .18 | 12% 14px 33s -25s -18px .12 (b) | 45% 28px 18s -11s 52px .16 | 66% 14px 31s -29s -24px .12 (b)
```
Gold flower SVG (8 ellipse petals `#c9a227`, centre circle `#a8801a`, viewBox 24): ellipses at (12,5.4 rx3 ry5.1), (12,18.6), (5.4,12 rx5.1 ry3), (18.6,12), and four diagonals rx4.5 ry2.7 rotated ±45° at (7.3,7.3),(16.7,16.7),(16.7,7.3),(7.3,16.7); centre r=2.9.
Rose petal SVG: `M12 1.5C6.5 5.5 3.5 11 3.5 16.2c0 3.6 3.8 6.3 8.5 6.3s8.5-2.7 8.5-6.3C20.5 11 17.5 5.5 12 1.5z` fill `#c98f88` + vein `M12 4.5c-1.6 4.4-2.4 9.4-2.4 14.5` stroke `#a86a63` 1px.

SEO/meta on the gate: title "Anoushka & Ishan | Wedding Invitation", description "The Wedding, 22 November 2026, The Ryan Farms, Kapashera, New Delhi. Tap to open the invitation.", og:image (1200×630 jpg), `robots: noindex, nofollow` (keeps the invite private).

---

## 4. Stage 2 — Preloader

Full-screen overlay (z 60) while images/video/music preload.
```css
.pre{position:fixed;inset:0;z-index:60;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem 1.4rem;
  background:radial-gradient(120% 60% at 50% 8%,#fdf5e9,#fdf5e900 60%),linear-gradient(180deg,var(--champagne) 0%,#f2cfc4 52%,#dfa197 100%)}
.pre-card{position:relative;width:min(330px,84vw);padding:2.1rem 1.5rem 1.9rem;text-align:center;background:var(--card);box-shadow:0 2px 5px #4e323029,0 26px 50px -22px #4e323073}
.pre-card::before{content:"";position:absolute;inset:9px;border:1px solid rgba(184,145,47,.5)}
.pre-card::after{content:"";position:absolute;inset:14px;border:1px solid rgba(184,145,47,.2)}
.pre-mono{font-family:var(--font-caps);font-weight:500;font-size:2.4rem;line-height:1;color:var(--maroon);letter-spacing:.04em}
.pre-mono i{font-style:normal;color:var(--gold)}
.pre-names{margin-top:.9rem;font-family:var(--font-caps);font-weight:500;font-size:clamp(.74rem,3.4vw,.86rem);letter-spacing:.24em;text-transform:uppercase}
.pre-track{position:relative;width:100%;height:34px;margin-top:1.4rem}
.pre-path{position:absolute;left:30px;right:30px;top:22px;height:2px;border-radius:2px;background:repeating-linear-gradient(to right,rgba(141,101,92,.45) 0 7px,transparent 7px 14px)}
.pre-fill{position:absolute;left:30px;top:22px;height:2px;border-radius:2px;width:calc((100% - 60px) * var(--p,0));background:linear-gradient(to right,var(--gold-light),var(--gold));transition:width .35s ease}
.pre-heli{position:absolute;top:0;left:calc(30px + (100% - 60px) * var(--p,0));margin-left:-22px;transition:left .35s ease;filter:drop-shadow(0 3px 4px rgba(78,50,48,.3))}
.pre-hint{margin-top:1rem;font-family:var(--font-caps);font-weight:500;font-size:.6rem;letter-spacing:.26em;text-transform:uppercase;color:var(--ink-soft)}
.pre-pct{margin-top:.3rem;font-family:var(--font-caps);font-weight:500;font-size:.74rem;letter-spacing:.16em;color:var(--gold-deep)}
```
Markup: `.sec-orn` → `.pre-mono` "I <i>&</i> A" (groom initial first, then bride) → `.pre-names` "Anoushka & Ishan" → track (path + gold fill + small side-view helicopter SVG ~44px wide) → "Preparing for take-off" → "NN%".
Logic: preload every image + the MP4 + MP3 (`canplaythrough`/`loadeddata`/`error` all count as done). `%` = loaded/total, capped at 99 until done, then 100. Minimum display 750 ms; hard timeout 15 000 ms → proceed anyway.

## 5. Stage 3 — Tap-to-open cover — `screenshots/02-tap-to-open-cover.jpg`
```css
.cover,.film{position:fixed;inset:0;background:#f0c3b8;overflow:hidden}
.cover{z-index:40;cursor:pointer;transition:opacity .55s ease}
.cover.is-leaving{opacity:0;pointer-events:none}
.cover img,.film video{width:100%;height:100%;object-fit:cover;object-position:38% 50%;user-select:none}
```
A single full-bleed illustration (`intro-cover.webp`): pink paper sky, paper clouds, gold stars, green paper helicopter; a torn-paper label pinned with a gold pin reading "♥ tap to open ♥" (Playfair-style serif, brown `#6b4a2b`) — **the label is baked into the image**, and it's the first frame of the film so the transition is seamless. Whole cover is a `role="button"` (Enter/Space also open).

## 6. Stage 4 — Intro film
- On tap: unlock audio by playing the `<audio id="bg-music">` muted then pausing/resetting (iOS autoplay trick); `video.play()` (fallback: muted play; if that fails → skip).
- `.film{z-index:45;opacity:0;transition:opacity .45s}` → `.is-on{opacity:1}`; cover gets `.is-leaving`.
- ~10 s MP4 (`playsinline`, `preload=auto`): helicopter flies through clouds dropping rose petals; the bride (advocate's gown & bands, holding a file) stands on paper stairs; groom joins.
- **Skip pill** bottom-right: `padding:.55rem 1.15rem; Cinzel 500 .64rem; ls .2em; uppercase; color #fff; background #28141675; border 1px solid rgba(255,255,255,.45); border-radius 999px; right 1.1rem; bottom calc(1.4rem + safe-area)`.
- On `ended` / `error` / Skip / safety timeout 14 500 ms → mark done; after **1 150 ms** the film container gets `.is-out` (`opacity 0; transition 1.15s cubic-bezier(.4,0,.2,1)`) while the main page mounts underneath with `pageIn` fade (1.1s).
- When the page is shown: `bgMusic.volume = .8; play()` (looping track — original uses "Aaj Sajeya" / Kudmayi; pick your own song).
- Remove `body.locked` once the page is visible.

---

## 7. Stage 5 — Main invitation page

### 7.1 Page shell & background layers (z-order bottom→top)
```css
.page{position:relative;min-height:100svh;overflow-x:clip;animation:pageIn 1.1s ease;
  background:
   radial-gradient(130% 52% at 50% 0%,#fdf4ea,#fdf4ea00 62%),
   radial-gradient(80% 34% at 10% 26%,#fce9e0,#fce9e000 60%),
   radial-gradient(84% 38% at 92% 58%,#f6d2c8,#f6d2c800 62%),
   linear-gradient(180deg,var(--blush) 0%,var(--blush-mid) 44%,var(--blush-deep) 76%,var(--rose-deep) 100%);}
@keyframes pageIn{from{opacity:0}to{opacity:1}}
.page-inner{position:relative;z-index:1;padding:clamp(2.2rem,9vw,4rem) 1.15rem clamp(3rem,12vw,5rem)}
```
Note how the gradient darkens from cream-blush at the top to dusty rose at the bottom of the long page.

1. **Gold dust** (z0, fixed): `.pw-dust{position:fixed;inset:0;opacity:.45;background-image:radial-gradient(circle,rgba(184,145,47,.8) 0 1.1px,transparent 1.6px),radial-gradient(circle,rgba(184,145,47,.45) 0 .9px,transparent 1.4px);background-size:148px 176px,97px 121px;background-position:0 0,46px 63px}`
2. **Back sky** `.pw-sky` (z0, fixed, overflow hidden) containing:
   - 7 paper clouds `.pw-c` (`position:absolute; max-width:290px`), depth classes: `.far{opacity:.62;filter:drop-shadow(0 7px 9px rgba(78,50,48,.2))}`, `.mid{opacity:.78;drop-shadow(0 12px 15px ….24)}`, `.near{opacity:.92;drop-shadow(0 20px 24px ….3)}`. Positions:
     far `top:6%;left:-8%;width:46%` · far `top:30%;right:-10%;width:52%` · mid `top:15%;right:2%;width:38%` · mid `top:58%;left:-6%;width:44%` · near `top:44%;right:-4%;width:34%` · near `bottom:6%;left:2%;width:40%` · far `bottom:26%;right:4%;width:30%`.
   - Cloud SVG (viewBox `0 0 110 56`): the same cloud path drawn 3×: shade copy `translate(0,3)` fill `--cloud-shade`, main fill `--cloud`, then a white dashed stitch outline `stroke:#fff; stroke-width:1.1; stroke-opacity:.75; stroke-dasharray:7 9` (gives the "hand-cut paper" look). Use 3 puffy cloud path variants, e.g. `M16 41 Q14 30 26 27 Q28 16 40 17 Q46 6 58 10 Q70 4 78 14 Q92 13 94 26 Q104 30 99 40 Q95 48 82 47 L28 48 Q16 49 16 41 Z` (and two similar).
   - 6 four-point gold stars `.pw-star` (path `M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z`, shadow copy offset 1.4px in `--gold-shade`, top in `--gold-soft`): `top11% left18% 13px d0s · top24% right16% 10px 1.2s · top46% left9% 9px 2.4s · top68% right12% 12px .7s · bottom14% left24% 8px 1.9s · bottom34% right22% 11px 3.1s`. Animation `twinkle 4.5s ease-in-out infinite` (`0%,100%{opacity:.5;transform:scale(.88) rotate(-6deg)} 50%{opacity:1;scale(1.06) rotate(6deg)}`). Quirk: in the original, `--gold-soft` is never defined, so the star's top layer falls back to black — that's why the stars look like small dark sparkles in the screenshots. To match exactly, leave `fill="var(--gold-soft)"` undefined (renders black); for gold stars, define `--gold-soft:#d9b25a`.
   - 3 small pink hearts `.pw-heart` (rose fill + rose-shade offset): `top19% right26% 15px .4s · top55% left15% 12px 2.1s · bottom20% right30% 13px 1.4s`, animation `bob 6s` (`translateY(0) rotate(-7deg)` ↔ `translateY(-9px) rotate(7deg)`).
3. **Content** `.page-inner` (z1).
4. **Front clouds** `.pw-sky.pw-sky--front` (z2): 3 big clouds poking in from the edges: `top16% left-24% w30%`, `top54% right-25% w32%`, `bottom11% left-23% w29%`; `opacity:.92;max-width:250px;filter:drop-shadow(0 22px 26px rgba(78,50,48,.28))`.
5. **Helicopters** `.pw-heli-layer` (z3, fixed):
   - Side-view olive helicopter SVG (viewBox `0 0 164 60`): tail boom, tail rotor (`.pw-tailrotor`, X-shaped strokes, `rotorBlur .34s`), body (olive with olive-shade offset), cream cockpit window, 3 olive-deep side windows, skids, mast, main rotor (`.pw-rotor`: two flat ellipses rx 38, `rotorBlur .5s` → `opacity .72↔1, scaleX 1↔.97`). Optional petal trail (5 small ellipses in `#e88ba3,#f2b8c6,#fffaf3,#e79aae,#e8c07a`, `trailDrift 3.6s`).
   - `.pw-heli{position:absolute;width:clamp(104px,31vw,156px)}` + `drop-shadow(0 10px 14px rgba(78,50,48,.28))`
   - `.h1{top:41%;left:-38%;animation:fly1 27s linear infinite}` — flies left→right with gentle bobbing:
     `0%{translate(0) rotate(-2deg);opacity:0} 8%{opacity:1} 25%{translate(45vw,-14px) rotate(2.5deg)} 50%{translate(90vw,10px) rotate(-2deg)} 75%{translate(120vw,-10px) rotate(2deg)} 92%{opacity:1} 100%{translate(165vw,4px) rotate(-1deg);opacity:0}`
   - `.h2` (with petal trail) `top:13%;left:104%;width:clamp(72px,22vw,110px);opacity:.66;filter:saturate(.8);animation:fly2 46s linear infinite 13s` — mirrored (`scaleX(-1)`), flies right→left: `translate(-62vw,9px)` @40%, `(-118vw,-8px)` @70%, `(-158vw,4px)` @100%, opacity .58.
6. **Falling petals** `.pw-petals` (z4, fixed): 12 `<i>` blobs, `border-radius:62% 38% 55% 45%; top:-6%`, `animation: fall linear infinite` → `from{translate3d(0,-10vh,0) rotate(0)} to{translate3d(var(--sway),112vh,0) rotate(var(--spin))}`. Generate: for i=0..11: `left = (i*13.5) % 100 %` (≈0,13.5,27,25.5,39,52.5,51,64.5,78,76.5,90,7.5), `width = 7 + (i%4)*2.5 px`, `height = width*1.35`, colour cycle `#f2b8c6,#e79aae,#fbf3ec,#f6d3c6,#e8c07a`, `opacity = .2 + (i%3)*.09`, `duration = 13 + (i%5)*3.5 s`, `delay = -(i*2.3 % 14) s`, `--sway = ±(16 + (i%3)*10)px` alternating sign, `--spin = ±(220 + i*40)deg` alternating.
7. **Music button** `.mu-btn` (z6) fixed bottom-right `right:.9rem;bottom:calc(.9rem + safe-area)`, 44×44 circle, `background:var(--card); border:1px solid rgba(184,145,47,.45); box-shadow:0 2px 4px #4e32302e,0 10px 20px -8px #4e323061`. Icon: speaker `M11 5 6 9H2v6h4l5 4z` + two sound waves when playing, or an "×" (`M22 9l-6 6`,`M16 9l6 6`) when paused. Toggles `#bg-music`. aria-label "Pause music"/"Play music".
8. **Scroll cue** `.dn-cue` (z6) fixed bottom-centre pill: tiny mouse outline (gold-deep) with animated wheel (`dn-tap 2.1s`) + "SCROLL" (Cinzel 600 .7rem ls .24em `--ink-soft`). Same card/border/shadow as music button. Hidden (`opacity 0`) while body is locked, while the user is actively scrolling (shown again 900ms after last scroll), and within 120px of the page bottom. Click → `scrollBy(0, innerHeight*.85, smooth)`.

All content sections are `max-width:500px; margin:0 auto; text-align:center`. Top gap between sections: `.std,.cd,.pl` → `clamp(2.6rem,11vw,4.2rem)`; `.ev,.vn,.rs` → `clamp(3rem,13vw,5rem)`; footer `clamp(3rem,12vw,4.6rem)`.

### 7.2 Hero — `screenshots/03-main-scroll-1.jpg`
Order:
1. **Ganesha line-art icon** (maroon, transparent webp, 760×1031 source) `width:clamp(74px,22vw,100px)`, centred, `filter:drop-shadow(0 4px 6px rgba(123,28,44,.25))`.
2. `॥ श्री गणेशाय नमः ॥` — Tiro Devanagari Hindi, `clamp(.95rem,4.2vw,1.08rem)`, maroon.
3. Shloka (2 lines, `<br>` between):
   `वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।` / `निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥` — `clamp(.82rem,3.6vw,.94rem)`, line-height 1.65, `--ink-mid`.
4. Section header: ornament + eyebrow **"A cordial invitation"**.
5. **Host card** `.paper.ruled.card-a` (padding `clamp(1.9rem,7.5vw,2.8rem) clamp(1.3rem,6vw,2.2rem)`):
   - Host line: "Mrs Ragini & Gp Capt Aniruddh Kumar" — Cormorant 600, `clamp(1.05rem,4.7vw,1.26rem)`, `--ink` (use `&nbsp;` inside titles so they never break).
   - `<em>` below it: "request the honour of your presence at the wedding of their beloved daughter" — italic 500, `clamp(1rem,4.4vw,1.12rem)`, `--ink-mid`.
   - `<h1>` names block (margins `clamp(1.2rem,5vw,1.7rem) 0 clamp(1rem,4.4vw,1.4rem)`):
     - "Adv Anoushka" — `--font-name`, `clamp(2.1rem,11vw,3.05rem)`, line-height 1.02, maroon.
     - "with" — Italianno, `clamp(1.7rem,8vw,2.1rem)`, `--gold-deep`.
     - "Capt Ishan" — same as first name.
   - Elder line: "(S/o Mrs Kalpana & Col Prashant Chandewar)" — Cormorant 500, `font-size:clamp(.6rem,calc(5.1vw - 3.9px),1.12rem)`, `white-space:nowrap`, `--ink-mid`.
6. Below card: "Please join us in celebrating love & happiness" — Italianno `clamp(1.6rem,7.4vw,2rem)`, `--ink-mid`, margin-top `clamp(1.2rem,5vw,1.7rem)`.

### 7.3 Scratch card "On" (date reveal)
- Section header with eyebrow **"On"**.
- `.paper.card-b` (padding `clamp(1.1rem,4.6vw,1.5rem)`, mt 1.1rem) contains `.sc-wrap{position:relative;overflow:hidden;touch-action:pan-y}`:
  - Under layer `.sc-under` (flex column centred, gap .55rem, padding `clamp(1.4rem,6vw,2rem) .6rem`):
    - "Sunday" — Cinzel 700, `clamp(1.02rem,4.6vw,1.22rem)`, ls .2em, uppercase.
    - "22 Nov 2026" — Cinzel 600, `clamp(1.85rem,9.4vw,2.6rem)`, ls .055em, line-height 1.18.
  - `<canvas class="sc-canvas">` absolutely covering it (DPR-scaled). **Paint the foil**: a soft blush/rose-gold gradient (≈ `#f3d3c8 → #ecc4b8 → #f2d6cc`) sprinkled with tiny gold speckles (random 0.6–1.4px dots in `rgba(201,162,39,.35–.7)`), matching the screenshot (pinkish foil with gold glitter).
  - `.sc-cue` — a hand/finger SVG icon, at `top:50%;left:22%`, `opacity:.55`, animation `cueSweep 3.4s` (sweeps right 150% and back, rotating -8°↔8°).
  - `.sc-shine` — diagonal white sheen sweeping across (`linear-gradient(105deg,transparent 38%,rgba(255,255,255,.55) 50%,transparent 62%); background-size:260% 100%; animation: shine 3.4s` from `130% 0` to `-60% 0`).
  - `.sc-hint` "Scratch to reveal" — Cinzel 500 .6rem ls .22em, uppercase, opacity .6, bottom-centre `.5rem`.
- Below the card: `.inv-gate` pill **"Scratch the card to open"** (Cinzel 500 .64rem ls .2em uppercase; `padding:.58rem 1.3rem; border:1px solid rgba(184,145,47,.42); border-radius:999px; background:#fffbf4b8`) with `gateBreathe 2.6s` (opacity .72↔1, translateY 0↔-2px). Page content ends here until revealed (page is only ~1 viewport tall).
- **Scratch logic** (pointer events, `setPointerCapture`):
  - Erase with `globalCompositeOperation="destination-out"`, radial-gradient brush radius **34px** (stops: 0 → rgba(0,0,0,1), .65 → .85, 1 → 0). Interpolate dabs every 8px between pointer positions.
  - On first touch add `.is-touched` → fade out cue + shine.
  - **Reveal when** accumulated drag distance > 75% of canvas width, OR every 3rd move sample alpha (every 16th pixel) and reveal if > 12% is cleared.
  - Reduced-motion users: reveal instantly.
  - On reveal: remove canvas, add `.is-open` → under-layer `revealPop .6s cubic-bezier(.34,1.4,.64,1)` (scale .94→1, fade in) + **petal burst**: 14 tiny petals from centre, for p=0..13: `x = round(cos(p/14·2π)·(38 + (p%4)·16))`, `y = round(sin(p/14·2π)·(30 + (p%3)·14)) − 20`, rotation `(p odd ? −1 : 1)·(90 + 21p)`deg, size 8px (height ×1.3), radius `60% 40% 55% 45%`, colours cycle `#e88ba3,#f3b6c2,#c9a227,#fffaf3,#d97a90`, delay `(p%6)·.045s`; animation `petal 1.25s cubic-bezier(.16,.84,.44,1)` (fade in by 15%, travel to x,y+42px, rotate, fade out).
  - Hide the gate pill, mount the rest of the page (`.rest` with `restIn .8s cubic-bezier(.22,.9,.3,1)`: from opacity 0 / translateY 30px), then **after 1 400 ms smooth-scroll** so the `.rest` top sits 12px from the viewport top (retry with instant scroll after 600ms if the smooth scroll didn't move).

### 7.4 Countdown — `screenshots/04-main-scroll-2.jpg`
- Header: eyebrow **"Counting down to"**, title **"The flight to forever"**.
- `.cd-grid` 4 equal columns, gap `clamp(.4rem,2.4vw,.7rem)`, mt 1.2rem. Each `.cd-chip`: `padding:clamp(.8rem,3.8vw,1.05rem) .2rem; background:linear-gradient(180deg,#fffdf8,var(--card) 60%,#fdf4e8); border:1px solid rgba(184,145,47,.38); border-radius:2px; box-shadow:0 1px 2px #4e323024,0 9px 18px -9px #4e323047`.
  - number: Cinzel 600 `clamp(1.2rem,6.6vw,1.7rem)`, tabular-nums, zero-padded 2 digits (days unpadded if ≥100).
  - label: Cinzel 500 `clamp(.5rem,2.4vw,.58rem)` ls .16em uppercase `--ink-soft` — "Days / Hours / Mins / Secs".
- Target = the **headline event** (The Wedding) → `22 Nov 2026 19:30` local time (parse "7:30 PM"). Tick every 1s. After the date passes show 00s (or hide).

### 7.5 Photo clothesline carousel "A few favourite moments"
- Header: title only, **"A few favourite moments"**.
- `.pl-wrap` relative; a curved **string** SVG across full width behind the photos: `viewBox 0 0 1000 40`, `preserveAspectRatio:none`, path `M0 10 Q250 34 500 22 Q750 10 1000 26`, stroke `--ink-soft`, width 1.8, opacity .5; positioned `top:0;left:-2%;width:104%;height:40px`.
- `.pl-track`: horizontal flex, `column-gap:clamp(.9rem,4vw,1.4rem)`, `padding:22px calc(50% - min(36vw,10rem)) 1.2rem`, `overflow-x:auto`, `scroll-snap-type:x mandatory`, hidden scrollbar, mouse drag-to-scroll (`.is-dragging` disables snap), arrow keys, focusable.
- Each `.pl-shot` (figure): `flex:0 0 min(72vw,20rem); scroll-snap-align:center; scroll-snap-stop:always; transform-origin:50% -12px; transform:rotate(var(--rot)); animation: pl-swing calc(4.4s + var(--i)*.6s) ease-in-out infinite; animation-delay: calc(var(--i) * -.8s)` → gently swings ±1.6° around its base rotation.
  - Wooden **peg** `.pl-peg`: 9×22px at top centre (`top:-14px`), `rotate(-5deg)`, `linear-gradient(180deg,#dcc09a,#b9925e)`, radius 2px, shadow.
  - `.paper.pl-frame` polaroid: padding `8px 8px 6px`, `box-shadow:var(--lift-1)`; img `aspect-ratio:4/5; object-fit:cover; background:#efe2d4`; caption Italianno `clamp(1.25rem,5.4vw,1.5rem)` maroon.
  - Base rotations (`--rot`): −1.17°, 2.8°, −1.73°, 2.27°, −1.37°.
  - 5 photos & captions: "Where it all began", "Some moments become memories", "Smile says it all", "An evening out", "Now forever".
- Prev/next round buttons `.pl-nav` (2.4rem circle, `background:#fffbf4eb; border:1px solid rgba(154,113,39,.45)`, chevron icons) at vertical centre, `left/right: clamp(.4rem,2vw,1rem)`; prev disabled on first (opacity .35); **hidden on touch devices** (`@media (hover:none) and (pointer:coarse)`). Clicking scrolls to the next/previous snap.
- Dots `.pl-dots` below: 6px dots `#4e323038`; active `--gold-deep` scaled 1.35. Update active from scroll position.

### 7.6 "The Celebrations" — event cards — `screenshots/05…07`
- Header: eyebrow **"Save these dates"**, title **"The Celebrations"**, lead auto-generated: **"Four functions over three days, in Gurugram and Delhi."** (count functions in words, count distinct days, list distinct cities = last comma part of `place`, "Delhi" shortened from "New Delhi" in the original lead — just hard-code the lead in content.json).
- `.ev-list` grid, gap `clamp(.9rem,4vw,1.3rem)`. Each `article.paper.ev-card` (padding 9px):
  - `.ev-art` (relative, overflow hidden) — **portrait illustration 2:3** (`aspect-ratio:2/3; object-fit:cover`) — top ~60% is the scene art (paper-craft style on pink), bottom fades to cream.
  - `.ev-scrim` — `linear-gradient(to top,#fffaf3db,#fffaf3ad 26%,#fffaf342 40%,#fffaf300 52%)`.
  - `.ev-over` overlay at bottom, centred, padding `clamp(1rem,5vw,1.5rem) clamp(.9rem,4.2vw,1.3rem)`:
    - `h3` name — Cinzel 700 `clamp(1.28rem,6.2vw,1.62rem)` ls .05em `--ink`
    - `.ev-date` "20 November 2026" — Cormorant italic 700 `clamp(1.14rem,5vw,1.28rem)` maroon
    - `.ev-day` "Friday · 2:30 PM" — Cinzel 700 `clamp(.72rem,3.5vw,.84rem)` ls .14em uppercase
    - `.ev-venue` "Our Residence" (Cormorant 600 `clamp(1.04rem,4.5vw,1.16rem)`) + `<em>` address on next line (normal, 500, .92em)
    - `.ev-dir` pill "Get directions" with map-pin icon: `margin-top:.85rem; padding:.52rem 1.1rem; border-radius:999px; Cinzel 500 clamp(.56rem,2.7vw,.64rem) ls .18em uppercase; background:#fffbf4f0; border:1px solid rgba(184,145,47,.55); shadow`. Opens Google Maps link in new tab.
  - `.ev-foot` below art (cream, padding `clamp(.85rem,3.6vw,1.15rem) clamp(.6rem,3vw,1rem) clamp(.35rem,1.6vw,.5rem)`): "Dress code" (Cinzel 600 `clamp(.72rem,3.3vw,.83rem)` ls .17em uppercase `--gold-deep`) + `<em>` value (Cormorant 600 `clamp(1.04rem,4.6vw,1.18rem)`, normal case, `--ink`).
- The 4 events (see content.json): Mehendi (mehendi ceremony illustration: bride in green lehenga with marigold garlands, banana leaves, brass lamps), Engagement (ring box between two champagne flutes, roses, string lights), Hues Of Haldi (marigold mandap, brass kalash, haldi bowl), The Wedding (pink-and-white floral mandap, helicopter dropping petals).

### 7.7 Directions — `screenshots/08-main-scroll-6.jpg`
- Header: title **"Directions"** with `.sec-h--big`, lead **"Their home in Gurugram, then the farm in Delhi."**
- `.vn-list` grid gap `clamp(.9rem,4vw,1.2rem)`; each `.paper.ruled.vn-card` (padding `clamp(1.6rem,6.6vw,2.2rem) clamp(1.2rem,5.5vw,1.9rem)`):
  - `.vn-city` "Gurugram" — Cinzel 600 `clamp(.62rem,2.9vw,.72rem)` ls .3em uppercase `--gold-deep`
  - `.vn-name` "Our Residence" — Cinzel 600 `clamp(1.08rem,5.1vw,1.38rem)` ls .04em
  - `.vn-place` — Cormorant italic 500 `clamp(1.06rem,4.5vw,1.16rem)` `--ink-mid`
  - `.vn-when` "Mehendi" (Cinzel 500 `clamp(.58rem,2.8vw,.66rem)` ls .2em uppercase `--ink-mid`, mt 1rem) + `<em>` date in `--gold-deep`
  - `.vn-dir` **dark** pill: `margin-top:1.15rem; padding:.7rem 1.4rem; border-radius:999px; font-size:.66rem; background:var(--ink); color:#fff; box-shadow:0 6px 14px -5px #4e32308c`, map-pin icon + "Get directions".

### 7.8 RSVP — `screenshots/08…09`
Header: eyebrow **"One last thing"**, title **"RSVP"**, lead **"A few quick things, and a few fun ones."** (when editing: "Change whatever you need to, then save it.").
`form.rs-form` grid gap `clamp(.9rem,3.8vw,1.2rem)`, `text-align:left`. Each card is `.paper.ruled.rs-card` (padding `clamp(1.3rem,5.4vw,1.8rem) clamp(1.2rem,5vw,1.7rem)`). Headings `.rs-h` Cormorant 600 `clamp(1.14rem,5.1vw,1.32rem)`; questions `.rs-q` Cormorant italic 500 `clamp(1rem,4.3vw,1.1rem)` `--ink-mid`.

Shared button look (`.rs-chip,.rs-pick,.rs-yn-btn`): `background:var(--card); border:1.5px solid rgba(184,145,47,.4); box-shadow:var(--lift-1); transition:background .2s,border-color .2s,transform .16s; :active scale(.975)`. **Selected** `.is-on`: `background:#fbf0dd; border-color:var(--gold)`.

1. **"Will you join us?"** — two full-width pills (`.rs-yn-btn`: min-height 56px, radius 999px, Cinzel 500 `clamp(.68rem,3.1vw,.78rem)` ls .16em uppercase): "Joyfully accept 🎉" (default selected) / "Regrettably decline".
2. **Details card**:
   - label `.rs-lbl` (Cinzel 500 .62rem ls .18em uppercase `--ink-mid`): "Your name" → underline input `.rs-in.rs-in--name` (transparent, `border-bottom:1.5px solid rgba(184,145,47,.45)`, focus → `--gold`, Cormorant 600 `clamp(1.22rem,5.2vw,1.38rem)`, placeholder "Full name" `--ink-soft` @ .55 opacity, min-height 46px). Validation: if empty on submit → border `#b8434a` + "Please tell us your name." (Cormorant 600 .88rem `#b8434a`) and scroll to it.
   - "Phone (optional)" (the "(optional)" is lowercase, normal letter-spacing, .75 opacity) → tel input placeholder "+91".
   - (only if accepting) "How many of you?" → stepper: two 46px circular buttons "−" / "+" (`border:1.5px solid rgba(184,145,47,.5); background:var(--card); Cormorant 600 1.45rem; lift-1; :active scale(.92)`) around the count `b` (Cormorant 600 1.8rem). Default **2**, min 1 (max ~10).
3. (only if accepting) **"Which functions?"** + "Tick everything you will be at." → 4 checkbox chips `.rs-chip` (flex, gap .75rem, min-height 58px, padding .65rem 1rem, **radius 10px**, left-aligned): 19px square tickbox (`border:1.5px solid rgba(184,145,47,.65); radius 3px`; when on: gold fill + white check) + `b` event name (Cormorant 600 `clamp(1.1rem,4.8vw,1.22rem)`) + `em` "20 November · BPTP Terra, Sector 37D, Gurugram" (normal, 500, `clamp(.88rem,3.8vw,.96rem)`, `--ink-mid`).
4. **"Place your bet"** — single-choice pill groups (`.rs-pick`: min-height 50px, radius 999px, Cormorant 600 `clamp(.96rem,4.2vw,1.06rem)`, centred; clicking the selected one deselects). Questions use `.rs-q` and subsequent ones `.rs-q--2` (mt `clamp(1.3rem,5vw,1.7rem)`):
   - "The ring goes into the thali of milk and rose petals. Who finds it first?" → Ishan / Anoushka / Best of three
   - "And who owns the dance floor on the cocktail night?" → Team Bride / Team Groom / The uncles, obviously 🕺
   - "The baraat arrives…" → Sharp on time / Fashionably late / When the band gets tired 🥁
   - "Joota chupai - how does it end?" → Her sisters win / His squad saves the shoes / Settled at ₹51,000
   - note `.rs-note` "Answers settled on the night." (Cinzel 500 .58rem ls .16em uppercase `--ink-soft`).
5. **"A blessing, or some advice"** + "One line you wish someone had told you." → textarea `.rs-area` rows 4 (`border:1.5px solid rgba(184,145,47,.38); radius 3px; padding .75rem .85rem; resize vertical`), placeholder "Say the thing…".
6. Submit `.rs-send` full-width dark pill: `min-height:54px; background:var(--ink); color:#fff; Cinzel 500 .72rem ls .22em uppercase; box-shadow:var(--lift-2)` — "Send it over" (while sending: white spinner + "Sending…"; edit mode: "Save my reply" + underlined italic link "Keep it as it was").
7. **Thank-you state** (replaces the form after submit; persist the reply in `localStorage` so returning guests see it): `.paper.ruled.rs-card.rs-done` centred — animated check-mark SVG (gold ring r24 @ .55 opacity, ink tick drawn with `stroke-dasharray:44` → 0 over .6s), "Thank you, {firstName}" (Cormorant 600 `clamp(1.45rem,6.4vw,1.8rem)`), a short lead line, summary "Coming, 2 of you" / "Coming, just you" / "Not able to make it" + `em` list of chosen events joined with " · ", and a "Change my reply" outline pill.
8. **"Or simply call us"** card `.rs-call` (always visible, centred): 3 pill links `tel:` (`.rs-tel`: min-height 52px, radius 999px, Cormorant 600 `clamp(1.04rem,4.4vw,1.14rem)`, phone icon left, name on line 1 and number in `em` on line 2 at .86em `--ink-mid`, lining numerals).

**RSVP backend (choose one, original posts to Firebase + email):** simplest options — Google Sheets via Apps Script web app, Formspree / FormSubmit, Supabase table, or Firebase Firestore. Payload: `{ coming, name, phone, guests, events[], bets:{ring,dance,baraat,joota}, blessing, submittedAt }`. Support "update" by storing the returned id in localStorage.

### 7.9 Closing card & footer — `screenshots/10-main-scroll-8.jpg`
`.paper.ruled.ft-card` (padding `clamp(1.9rem,8vw,2.9rem) clamp(1.3rem,6vw,2.2rem)`):
- `.sec-orn`
- two `.ft-msg.ft-msg--2` lines (Italianno `clamp(1.6rem,7.4vw,2rem)`, line-height 1.2, `--ink-mid`, mt .8rem):
  "Come celebrate with us as two hearts become one and a new chapter begins." / "Come eat with us, dance with us, and bless us as we begin."
- "With love" — Cinzel 500 .62rem ls .24em uppercase `--ink-soft`, mt `clamp(1.6rem,6.6vw,2.2rem)`.
- Names `.ft-names` — `--font-name`, `clamp(2rem,11.5vw,3.6rem)`, maroon, line-height 1.04, word-spacing .26em: "Adv Anoushka" / "&" (.46em, `--gold-deep`) / "Capt Ishan", each on its own line.
- Hashtag `.ft-hash` "#FlyingIntoForever" — `--font-hash`, `clamp(1.7rem,8vw,2.2rem)`, `--gold-deep`, with short gold gradient hairlines before & after (`width:clamp(14px,5vw,26px)`).

Footer credit under the card (link, column, centred): small rule (max 132px, gold lines + tiny ◆) → "Handcrafted for" (Cormorant italic .7rem `--ink-soft`) → "ANOUSHKA & ISHAN" (Cinzel 600 .95rem ls .12em) → "by INVIFEST" (italic .68rem; brand in Cinzel 600 ls .2em `--gold-deep`) → outline pill "Get one for yourself →" (Cinzel 600 .52rem ls .18em, `border:1px solid rgba(198,146,57,.5)`). **Replace with your own credit or remove** — this is the original vendor's branding.

---

## 8. Behaviour summary (state machine)

```
preloading ──(assets loaded or 15s)──▶ cover (tap) ──▶ film playing ──(ended/skip/error/14.5s)──▶
  [wait 1.15s, crossfade] ──▶ page (music on, body unlocked)
page: gate (scratch) ──(reveal)──▶ rest mounted ──(1.4s)──▶ auto-scroll to countdown
```
- Respect `prefers-reduced-motion`: disable helicopters, petals, cue/shine/burst, swings; reveal scratch instantly; no smooth scroll.
- Optional per-guest links: `?g=<code>` can hide sections or limit functions (the original supports hiding countdown/story/venue/rsvp per guest). Not required.
- Mobile: everything is designed for 360–430px wide phones first; verify at 375×812 and 390×844, then desktop 1280+ (content stays 500px wide, sky decor fills the sides — see screenshots which are from a 1253px-wide desktop window).
- Accessibility: decorative layers `aria-hidden`, Skip link on gate, buttons have aria-labels, `aria-pressed` on toggle chips, `role=status` on the gate pill.

## 9. Content
All copy and data is in **`content.json`** (same folder). Build the UI to read from it so names, dates, events, photos, bets, and contacts can be swapped without code changes.

## 10. Screenshot index (desktop 1253×1350 viewport)
| File | Shows |
|---|---|
| 01-gate-landing.jpg | Share/gate page with blurred backdrop & card |
| 02-tap-to-open-cover.jpg | Full-screen "tap to open" cover (first frame of film) |
| 03-main-scroll-1.jpg | Hero: Ganesha, shloka, host card, names, revealed date card |
| 04-main-scroll-2.jpg | Countdown, photo clothesline, Celebrations header + first card |
| 05-main-scroll-3.jpg | Mehendi card bottom, Engagement card |
| 06-main-scroll-4.jpg | Engagement dress code, Haldi card, Wedding card top |
| 07-main-scroll-5.jpg | Wedding card, Directions cards |
| 08-main-scroll-6.jpg | RSVP: join, details, which functions |
| 09-main-scroll-7.jpg | RSVP: bets, blessing |
| 10-main-scroll-8.jpg | Send button, call-us, closing card, footer credit |

Before scratching, the date card shows a pink foil with gold glitter, a hand cue, "SCRATCH TO REVEAL", and below it the "SCRATCH THE CARD TO OPEN" pill (not in a separate screenshot; described in §7.3). The preloader is described in §4.

## 11. Assets you must supply (the original ones belong to the couple/vendor — make or commission your own)
| Asset | Spec | Notes |
|---|---|---|
| `gate-cover.webp` | ~1200×900 (4:3) | Couple illustration for gate card + blurred bg; also make `og-image.jpg` 1200×630 |
| `intro-cover.webp` | portrait ~1080×1920 | First frame of the film, includes the pinned "tap to open" label |
| `intro-film.mp4` | portrait 1080×1920, ~10s, H.264, small (<6MB) | Paper-craft animation; can be AI-generated (Sora/Veo/Kling/Runway) from the cover still |
| `bg-music.mp3` | looping song, ~128kbps | Your chosen track |
| `ganesha-icon.webp` | transparent, maroon line art, ~760×1031 | |
| `photo-1…5.webp` | 4:5 portrait, ~800×1000 | Your couple photos |
| `ev-mehendi.webp`, `ev-engagement.webp`, `ev-haldi.webp`, `ev-wedding.webp` | 2:3 portrait ~1000×1500 | Paper-craft scene in top ~55%, plain blush/cream lower part for text overlay |
| Fonts | Avenue de Madison, Signatra (licensed) | or the free substitutes in §1 |
| favicon.svg | | small helicopter or monogram |

Art direction for all illustrations: "hand-cut layered paper craft diorama, soft blush pink paper background with subtle texture, cream torn-paper clouds with deckled edges, small gold foil stars, scattered rose/coral/gold paper petals, olive-green paper helicopter, gentle studio lighting, pastel, elegant Indian wedding".

## 12. Acceptance checklist
- [ ] Gate page matches screenshot 01 (blurred bg, rounded white card, maroon-brown pill button, falling gold flowers).
- [ ] Preloader → cover → film → page flow works on iOS Safari and Android Chrome, music starts after the tap.
- [ ] Scratch card erases smoothly with finger and mouse, reveals at ~12% cleared, petal burst + pop, then rest of page fades up and auto-scrolls.
- [ ] Torn-paper cards with double gold rules, fonts and colours match screenshots.
- [ ] Clouds/stars/hearts/petals/helicopters animate and stay behind/in front exactly as layered in §7.1.
- [ ] Countdown live; carousel swipes/drags/snaps with swinging polaroids and dots; arrows hidden on touch.
- [ ] 4 event cards + 2 direction cards with working Maps links.
- [ ] RSVP: accept/decline toggles fields, validation, stepper, multi-select chips, single-select bets, submit → thank-you state persisted in localStorage, edit flow.
- [ ] Music toggle and scroll cue behave as described; reduced-motion respected; Lighthouse mobile ≥ 90 performance (lazy-load event art, compress video).
