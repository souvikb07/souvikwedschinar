// Souvik & Chinar — Wedding Invitation Web Application
// Implements the 5-stage flow: Gate -> Preloader -> Tap-to-open Cover -> Intro Film -> Main Invitation

let content = null;
let isPageRevealed = false;

// Helper: load content.json
const DEFAULT_CONTENT = {
  "slug": "souvik-and-chinar",
  "meta": {
    "title": "Souvik & Chinar | Wedding Invitation",
    "description": "The Wedding of Souvik Banerjee & Chinar Sharma, 9 December 2026. Tap to open the invitation.",
    "ogImage": "./assets/gate-cover.jpg?v=3",
    "noindex": true
  },
  "gate": {
    "line": "With the blessings of our families, we joyfully invite you to celebrate the wedding of",
    "names": "Souvik & Chinar",
    "date": "Wednesday, 09 December 2026",
    "button": "Open the invitation",
    "foot": "Crafted with love for Souvik & Chinar"
  },
  "preloader": {
    "monogram": ["S", "&", "C"],
    "names": "Souvik & Chinar",
    "hint": "Preparing the celebration"
  },
  "media": {
    "gateCover": "./assets/gate-cover.jpg?v=3",
    "introCover": "./assets/intro-cover.jpg",
    "ganesha": "./assets/ganesha-icon.svg"
  },
  "hero": {
    "mantra": "॥ श्री गणेशाय नमः ॥",
    "shloka": [
      "विघ्न हरण मंगल करण, श्री गणपति जी महाराज ।",
      "प्रथम निमंत्रण आपको, पूरण कीजै काज ॥"
    ],
    "eyebrow": "A Heartfelt Invitation",
    "hosts": "Mrs. Rina & Dev Das Banerjee",
    "hostsSub": "",
    "residence": "Indirapuram, Ghaziabad, Uttar Pradesh",
    "request": "request the pleasure of your gracious presence on the auspicious occasion of the Wedding Ceremony of their beloved son",
    "groom": "Souvik Banerjee",
    "groomElders": "",
    "joiner": "with",
    "bride": "Chinar Sharma",
    "brideElders": "D/o Late Mr. Ajay Pal Sharma & Simmy Sharma",
    "closingLine": "Join us as we celebrate our love and begin a lifetime together."
  },
  "scratch": {
    "eyebrow": "On",
    "day": "Wednesday",
    "date": "09 Dec 2026",
    "hint": "Scratch to reveal",
    "gate": "Scratch the card to open"
  },
  "countdown": {
    "eyebrow": "Counting down to",
    "title": "The journey to forever",
    "target": "2026-12-09T20:00:00+05:30",
    "labels": ["Days", "Hours", "Mins", "Secs"]
  },
  "photos": {
    "title": "A few favourite moments",
    "items": [
      { "src": "./assets/photo-1.jpg", "cap": "Where it all began", "rot": -1.17 },
      { "src": "./assets/photo-2.jpg", "cap": "Some moments become memories", "rot": 2.8 },
      { "src": "./assets/photo-3.jpg", "cap": "Smile says it all", "rot": -1.73 },
      { "src": "./assets/photo-4.jpg", "cap": "An evening out", "rot": 2.27 },
      { "src": "./assets/photo-5.jpg", "cap": "Now forever", "rot": -1.37 }
    ]
  },
  "events": {
    "eyebrow": "Save these dates",
    "title": "The Celebrations",
    "lead": "Two functions in Ghaziabad.",
    "items": [
      {
        "id": "engagement",
        "name": "Engagement",
        "date": "06 December 2026",
        "day": "Sunday",
        "time": "1:00 PM onwards",
        "venue": "Sri Mahal Banquet and Resort",
        "place": "Sector 1, Vaishali, Ghaziabad",
        "map": "https://maps.app.goo.gl/4bbKDK2Ty7uevoS57",
        "dress": "Indo-western / Cocktail",
        "art": "./assets/ev-engagement.jpg?v=4",
        "rsvpLine": "06 December · Vaishali, Ghaziabad"
      },
      {
        "id": "wedding",
        "name": "The Wedding",
        "date": "09 December 2026",
        "day": "Wednesday",
        "time": "8:00 PM onwards",
        "schedule": "Barat: 8:00 PM · Dinner: 8:00 PM · Auspicious Phere",
        "venue": "ROYAL AMBIENCE PARTY LAWN 2",
        "place": "Vasundhara Indirapuram Highway, CISF Road, Ghaziabad",
        "map": "https://maps.app.goo.gl/8PwiRfFpS6UhWu6Y9",
        "dress": "Traditional and royal ethnic",
        "art": "./assets/ev-wedding.jpg?v=3",
        "rsvpLine": "09 December · Indirapuram, Ghaziabad",
        "headline": true
      }
    ]
  },
  "directions": {
    "title": "Directions",
    "lead": "Venues in Vaishali & Indirapuram, Ghaziabad.",
    "items": [
      {
        "city": "Ghaziabad",
        "name": "Sri Mahal Banquet and Resort",
        "place": "Sector 1, Vaishali, Ghaziabad (near Radisson Blu)",
        "when": "Engagement",
        "dates": "Sunday, 06 December 2026",
        "map": "https://maps.app.goo.gl/4bbKDK2Ty7uevoS57"
      },
      {
        "city": "Ghaziabad",
        "name": "ROYAL AMBIENCE PARTY LAWN 2",
        "place": "Vasundhara Indirapuram Highway, CISF Road, Ghaziabad (U.P.)",
        "when": "The Wedding",
        "dates": "Wednesday, 09 December 2026",
        "map": "https://maps.app.goo.gl/8PwiRfFpS6UhWu6Y9"
      }
    ]
  },
  "rsvp": {
    "eyebrow": "We'd love to hear from you",
    "title": "RSVP",
    "lead": "Please let us know if you can celebrate this special day with us.",
    "leadEdit": "Change whatever you need to, then save it.",
    "join": {
      "q": "Will you be celebrating with us?",
      "yes": "We'll be there 🎉",
      "no": "With regrets, can't make it"
    },
    "fields": {
      "name": "Your name",
      "namePh": "Full name",
      "nameErr": "Please tell us your name.",
      "phone": "Phone",
      "phoneOpt": "(optional)",
      "phonePh": "+91",
      "guests": "How many of you?",
      "guestsDefault": 2,
      "guestsMin": 1,
      "guestsMax": 10
    },
    "functions": {
      "q": "Which functions?",
      "sub": "Tick everything you will be at."
    },
    "familyRsvp": {
      "title": "R.S.V.P.",
      "names": "Ramesh Chand Sharma · Mahesh Sharma · Naresh Sharma\nJitender Sharma & Kartik Sharma"
    },
    "submit": "Send it over",
    "submitting": "Sending…",
    "save": "Save my reply",
    "saving": "Saving…",
    "cancelEdit": "Keep it as it was",
    "done": {
      "title": "Thank you, {first}",
      "comingOne": "Coming, just you",
      "comingMany": "Coming, {n} of you",
      "notComing": "Not able to make it",
      "edit": "Change my reply"
    },
    "call": {
      "title": "A Cordial Invitation From",
      "subtitle": "Mrs. Simmy Sharma (W/o Late Mr. Ajay Pal Sharma)\n104, Sunlight Residency Tower-3, Defence Enclave Sector-44, Noida",
      "people": [
        { "name": "Mrs. Simmy Sharma", "tel": "+919354857574", "display": "+91 9354857574" },
        { "name": "Jitendra Sharma", "tel": "+919811764980", "display": "+91 9811764980" },
        { "name": "Kartik Sharma", "tel": "+9198773251579", "display": "+91 98773251579" }
      ]
    }
  },
  "footer": {
    "messages": [
      "Hand in hand, we begin a lifetime of love. Join us in making its first moments unforgettable.",
      "Share in our joy, dance into the evening, and bless the life we’ll build together."
    ],
    "regards": "With love",
    "names": [
      { "name": "Souvik" },
      { "name": "Chinar" }
    ],
    "hashtag": "#SouvikWedsChinar",
    "credit": {
      "for": "Handcrafted by",
      "who": "GEMINI ✨",
      "by": null,
      "note": "(while Souvik & Chinar take all the credit)",
      "cta": null
    }
  }
};

async function loadContent() {
  try {
    const res = await fetch("./src/content.json");
    if (res.ok) {
      content = await res.json();
      return;
    }
  } catch (err) {
    console.warn("fetch content.json failed (e.g. file:// URL), falling back to embedded content:", err);
  }
  content = DEFAULT_CONTENT;
}

// ----------------------------------------------------
// STAGE 1: GATE / SHARE LANDING PAGE
// ----------------------------------------------------
function renderGate() {
  const gateEl = document.getElementById('stage-gate');
  if (!gateEl || !content) return;

  const { gate, media } = content;
  
  // 12 Petals alternating gold flower & rose petal
  const petalDefs = [
    { l: '6%', s: 22, d: 19, del: -4, dx: 34, o: 0.20, b: false },
    { l: '17%', s: 15, d: 26, del: -12, dx: -28, o: 0.14, b: true },
    { l: '28%', s: 26, d: 22, del: -7, dx: 46, o: 0.17, b: false },
    { l: '39%', s: 18, d: 30, del: -18, dx: -36, o: 0.13, b: true },
    { l: '50%', s: 23, d: 24, del: -2, dx: 26, o: 0.19, b: false },
    { l: '61%', s: 16, d: 28, del: -15, dx: -22, o: 0.15, b: true },
    { l: '72%', s: 25, d: 21, del: -9, dx: 40, o: 0.20, b: false },
    { l: '83%', s: 17, d: 27, del: -21, dx: -30, o: 0.13, b: true },
    { l: '93%', s: 20, d: 23, del: -5, dx: 30, o: 0.18, b: false },
    { l: '12%', s: 14, d: 33, del: -25, dx: -18, o: 0.12, b: true },
    { l: '45%', s: 28, d: 18, del: -11, dx: 52, o: 0.16, b: false },
    { l: '66%', s: 14, d: 31, del: -29, dx: -24, o: 0.12, b: true }
  ];

  const goldFlowerSvg = `<svg viewBox="0 0 24 24" width="100%" height="100%"><g fill="#c99a27"><ellipse cx="12" cy="5.4" rx="3" ry="5.1"/><ellipse cx="12" cy="18.6" rx="3" ry="5.1"/><ellipse cx="5.4" cy="12" rx="5.1" ry="3"/><ellipse cx="18.6" cy="12" rx="5.1" ry="3"/><ellipse cx="7.3" cy="7.3" rx="4.5" ry="2.7" transform="rotate(45 7.3 7.3)"/><ellipse cx="16.7" cy="16.7" rx="4.5" ry="2.7" transform="rotate(45 16.7 16.7)"/><ellipse cx="16.7" cy="7.3" rx="4.5" ry="2.7" transform="rotate(-45 16.7 7.3)"/><ellipse cx="7.3" cy="16.7" rx="4.5" ry="2.7" transform="rotate(-45 7.3 16.7)"/><circle cx="12" cy="12" r="2.9" fill="#9e771c"/></g></svg>`;
  const rosePetalSvg = `<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 1.5C6.5 5.5 3.5 11 3.5 16.2c0 3.6 3.8 6.3 8.5 6.3s8.5-2.7 8.5-6.3C20.5 11 17.5 5.5 12 1.5z" fill="#97b692"/><path d="M12 4.5c-1.6 4.4-2.4 9.4-2.4 14.5" stroke="#6f9169" stroke-width="1.2" fill="none"/></svg>`;

  const petalsHtml = petalDefs.map(p => `
    <span class="xg-petal" style="left:${p.l}; width:${p.s}px; height:${p.s}px; animation-duration:${p.d}s; animation-delay:${p.del}s; --dx:${p.dx}px; --o:${p.o};">
      ${p.b ? rosePetalSvg : goldFlowerSvg}
    </span>
  `).join('');

  gateEl.innerHTML = `
    <div class="xg-bg" style="background-image:url(${media.gateCover})"></div>
    <div class="xg-petals">${petalsHtml}</div>
    <section class="xg-card">
      <img class="xg-cover" src="${media.gateCover}" alt="Souvik & Chinar Wedding">
      <div class="xg-body">
        <p class="xg-line">${gate.line}</p>
        <h1 class="xg-names">${gate.names}</h1>
        <p class="xg-date">${gate.date}</p>
        <button class="xg-btn" id="gate-open-btn">${gate.button}</button>
        <p class="xg-foot">${gate.foot}</p>
      </div>
    </section>
  `;

  document.getElementById('gate-open-btn').addEventListener('click', () => {
    // Start background music immediately within this user click gesture
    startBackgroundMusic();

    // Direct transition from Gate page to Main Invitation page
    gateEl.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    gateEl.style.opacity = '0';
    setTimeout(() => {
      gateEl.style.display = 'none';
      showMainPage();
    }, 550);
  });
}

// ----------------------------------------------------
// STAGE 2: PRELOADER
// ----------------------------------------------------
function startPreloader() {
  const preEl = document.getElementById('stage-preloader');
  if (!preEl || !content) return;
  preEl.style.display = 'flex';
  document.body.classList.add('locked');

  const { preloader, media, photos, events } = content;
  
  // Helicopter SVG for preloader track
  const heliSvg = `
    <svg viewBox="0 0 164 60" width="44" height="20">
      <g>
        <path d="M42 38 L30 46 L10 46" stroke="#4f5f3c" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M12 42 L12 50 M24 38 L24 50 M8 50 L46 50" stroke="#4f5f3c" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <!-- Tail Boom -->
        <path d="M50 28 L14 26 L12 20" stroke="#64744a" stroke-width="5" fill="none" stroke-linecap="round"/>
        <!-- Body -->
        <path d="M42 16 C60 16 94 18 100 28 C104 35 98 44 80 44 C56 44 42 38 42 16 Z" fill="#7e8f5e"/>
        <!-- Window -->
        <path d="M78 20 C88 20 95 24 96 28 C96 32 90 32 80 32 Z" fill="#fffdf8" opacity="0.9"/>
        <!-- Mast & Main Rotor -->
        <path d="M68 16 L68 10" stroke="#4f5f3c" stroke-width="3"/>
        <line x1="28" y1="10" x2="108" y2="10" stroke="#4f5f3c" stroke-width="2.5" stroke-linecap="round"/>
      </g>
    </svg>
  `;

  preEl.innerHTML = `
    <div class="pre-card">
      <div class="sec-orn"><i></i><b>◆</b><i></i></div>
      <div class="pre-mono">${preloader.monogram[0]} <i>${preloader.monogram[1]}</i> ${preloader.monogram[2]}</div>
      <div class="pre-names">${preloader.names}</div>
      <div class="pre-track">
        <div class="pre-path"></div>
        <div class="pre-fill" id="pre-fill" style="--p: 0;"></div>
        <div class="pre-heli" id="pre-heli" style="--p: 0;">${heliSvg}</div>
      </div>
      <div class="pre-hint">${preloader.hint}</div>
      <div class="pre-pct" id="pre-pct">0%</div>
    </div>
  `;

  // Assets to preload
  const assetsToPreload = [
    media.gateCover,
    media.introCover,
    media.ganesha,
    ...(photos?.items ? photos.items.map(p => p.src) : []),
    ...events.items.map(e => e.art)
  ];

  let loadedCount = 0;
  const total = assetsToPreload.length;
  const startTime = Date.now();

  function updateProgress(p) {
    const fillEl = document.getElementById('pre-fill');
    const heliEl = document.getElementById('pre-heli');
    const pctEl = document.getElementById('pre-pct');
    if (fillEl) fillEl.style.setProperty('--p', p);
    if (heliEl) heliEl.style.setProperty('--p', p);
    if (pctEl) pctEl.textContent = `${Math.round(p * 100)}%`;
  }

  function finishPreloader() {
    updateProgress(1);
    setTimeout(() => {
      preEl.classList.add('is-leaving');
      setTimeout(() => {
        preEl.style.display = 'none';
        showCover();
      }, 550);
    }, 400);
  }

  assetsToPreload.forEach(src => {
    const img = new Image();
    const onDone = () => {
      loadedCount++;
      const currentPct = Math.min(0.99, loadedCount / total);
      updateProgress(currentPct);
      if (loadedCount >= total) {
        const elapsed = Date.now() - startTime;
        const delay = Math.max(0, 750 - elapsed);
        setTimeout(finishPreloader, delay);
      }
    };
    img.onload = onDone;
    img.onerror = onDone;
    img.src = src;
  });

  // Safety hard timeout (15s)
  setTimeout(() => {
    if (preEl.style.display !== 'none') {
      finishPreloader();
    }
  }, 15000);
}

// ----------------------------------------------------
// STAGE 3: TAP-TO-OPEN COVER
// ----------------------------------------------------
function showCover() {
  const coverEl = document.getElementById('stage-cover');
  if (!coverEl || !content) return;
  coverEl.style.display = 'block';

  const { media } = content;
  coverEl.innerHTML = `
    <img src="${media.introCover}" alt="Souvik & Chinar — Tap to Open" draggable="false">
  `;
  coverEl.setAttribute('role', 'button');
  coverEl.setAttribute('tabindex', '0');
  coverEl.setAttribute('aria-label', 'Tap to open invitation');

  const onOpen = () => {
    coverEl.classList.add('is-leaving');
    setTimeout(() => {
      coverEl.style.display = 'none';
      playFilm();
    }, 550);
  };

  coverEl.addEventListener('click', onOpen, { once: true });
  coverEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  }, { once: true });
}

// ----------------------------------------------------
// STAGE 4: INTRO FILM
// ----------------------------------------------------
function playFilm() {
  const filmEl = document.getElementById('stage-film');
  if (!filmEl || !content) return;
  filmEl.style.display = 'block';
  requestAnimationFrame(() => filmEl.classList.add('is-on'));

  const { media } = content;
  const heliSvg = `
    <svg viewBox="0 0 164 60" width="100%" height="100%">
      <g>
        <path d="M42 38 L30 46 L10 46" stroke="#4f5f3c" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <path d="M12 42 L12 52 M24 38 L24 52 M6 52 L48 52" stroke="#4f5f3c" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M50 28 L14 26 L12 20" stroke="#64744a" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M42 16 C60 16 94 18 100 28 C104 35 98 44 80 44 C56 44 42 38 42 16 Z" fill="#7e8f5e"/>
        <path d="M78 20 C88 20 95 24 96 28 C96 32 90 32 80 32 Z" fill="#fffdf8" opacity="0.9"/>
        <path d="M68 16 L68 9" stroke="#4f5f3c" stroke-width="3.5"/>
        <line class="pw-rotor" x1="20" y1="9" x2="116" y2="9" stroke="#4f5f3c" stroke-width="3" stroke-linecap="round"/>
      </g>
    </svg>
  `;

  filmEl.innerHTML = `
    <div class="film-scene">
      <img class="film-bg" src="${media.introCover}" alt="Wedding Film Animation">
      <div class="film-heli-actor">${heliSvg}</div>
      <button class="film-skip" id="film-skip-btn">Skip</button>
    </div>
  `;

  let filmEnded = false;
  const endFilm = () => {
    if (filmEnded) return;
    filmEnded = true;

    // After 1150ms crossfade
    filmEl.classList.add('is-out');
    showMainPage();

    setTimeout(() => {
      filmEl.style.display = 'none';
    }, 1150);
  };

  document.getElementById('film-skip-btn').addEventListener('click', endFilm);

  // Play ~9.5s animation then auto transition
  setTimeout(endFilm, 9500);
}

// ----------------------------------------------------
// STAGE 5: MAIN INVITATION PAGE
// ----------------------------------------------------
function showMainPage() {
  const pageEl = document.getElementById('stage-page');
  if (!pageEl || !content) return;
  pageEl.style.display = 'block';
  document.body.classList.remove('locked');

  // Render background decorative layers
  renderSkyLayers();
  
  // Render hero & scratch card
  renderHeroAndScratch();

  // Setup persistent UI controls
  setupScrollCue();
  setupMusicControls();
}

// Traditional Indian Celebration Sky & Floral Shower (Pushpa Vrishti)
function renderSkyLayers() {
  const skyBack = document.getElementById('pw-sky-back');
  const petalsLayer = document.getElementById('pw-petals');

  // 1. Traditional Sage Green Ambient Backdrop & Hanging Garlands
  if (skyBack) {
    // Hanging Marigold & Pearl Garlands with Brass Jhumkas (Top left & right outer margins)
    const makeGarlandSvg = (isLeft) => `
      <svg viewBox="0 0 120 280" width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <radialGradient id="gendaGrad_${isLeft ? 'l' : 'r'}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFD147"/>
            <stop offset="60%" stop-color="#F59E0B"/>
            <stop offset="100%" stop-color="#B45309"/>
          </radialGradient>
          <linearGradient id="goldJhumka_${isLeft ? 'l' : 'r'}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDE68A"/>
            <stop offset="50%" stop-color="#D97706"/>
            <stop offset="100%" stop-color="#92400E"/>
          </linearGradient>
        </defs>
        <!-- Garland Thread -->
        <path d="${isLeft ? 'M28 0 Q34 110 38 198' : 'M92 0 Q86 110 82 198'}" stroke="#C69539" stroke-width="1.2" stroke-dasharray="3 3" fill="none" opacity="0.65"/>
        
        <!-- Marigold Blossoms and Jasmine Pearls -->
        <circle cx="${isLeft ? 29 : 91}" cy="22" r="8.5" fill="url(#gendaGrad_${isLeft ? 'l' : 'r'})"/>
        <circle cx="${isLeft ? 30 : 90}" cy="48" r="6.8" fill="#FFFDF5" stroke="#E5D9B8" stroke-width="0.8"/>
        <circle cx="${isLeft ? 32 : 88}" cy="74" r="9.2" fill="url(#gendaGrad_${isLeft ? 'l' : 'r'})"/>
        <circle cx="${isLeft ? 34 : 86}" cy="100" r="7.2" fill="#FFFDF5" stroke="#E5D9B8" stroke-width="0.8"/>
        <circle cx="${isLeft ? 35 : 85}" cy="128" r="9.8" fill="url(#gendaGrad_${isLeft ? 'l' : 'r'})"/>
        <circle cx="${isLeft ? 37 : 83}" cy="156" r="7.4" fill="#FFFDF5" stroke="#E5D9B8" stroke-width="0.8"/>
        <circle cx="${isLeft ? 38 : 82}" cy="184" r="10.2" fill="url(#gendaGrad_${isLeft ? 'l' : 'r'})"/>
        
        <!-- Hanging Brass Jhumka Bell at bottom -->
        <g transform="translate(${isLeft ? 38 : 82}, 208)">
          <path d="M-8 6 C-8 0, 8 0, 8 6 C9 12, -9 12, -8 6 Z" fill="url(#goldJhumka_${isLeft ? 'l' : 'r'})"/>
          <line x1="0" y1="0" x2="0" y2="6" stroke="#92400E" stroke-width="1.5"/>
          <circle cx="-5" cy="14" r="1.5" fill="#FDE68A"/>
          <circle cx="0" cy="15" r="1.8" fill="#FDE68A"/>
          <circle cx="5" cy="14" r="1.5" fill="#FDE68A"/>
        </g>
      </svg>
    `;

    // Organic Sage Mist Clouds (Watercolor wash, replacing cartoon puffy clouds)
    const mistHtml = `
      <div class="pw-mist m1"></div>
      <div class="pw-mist m2"></div>
      <div class="pw-mist m3"></div>
      <div class="pw-mist m4"></div>
    `;

    // Hanging Toran Garlands in margins
    const garlandsHtml = `
      <div class="pw-garland gl">${makeGarlandSvg(true)}</div>
      <div class="pw-garland gr">${makeGarlandSvg(false)}</div>
    `;

    // Twinkling Gold Festive Motes (Diya / Star sparkles)
    const starPath = "M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z";
    const starDefs = [
      { t: '7%', l: '12%', s: 11, d: 0 },
      { t: '20%', r: '10%', s: 9, d: 1.2 },
      { t: '38%', l: '7%', s: 10, d: 2.1 },
      { t: '54%', r: '8%', s: 11, d: 0.8 },
      { t: '72%', l: '14%', s: 9, d: 1.7 },
      { b: '10%', r: '15%', s: 11, d: 2.8 },
      { b: '26%', l: '9%', s: 8, d: 0.4 },
      { b: '45%', r: '7%', s: 10, d: 2.3 }
    ];

    const starsHtml = starDefs.map(s => `
      <div class="pw-star" style="top:${s.t || 'auto'}; bottom:${s.b || 'auto'}; left:${s.l || 'auto'}; right:${s.r || 'auto'}; width:${s.s}px; height:${s.s}px; animation-delay:${s.d}s;">
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <path d="${starPath}" fill="#C69539"/>
        </svg>
      </div>
    `).join('');

    skyBack.innerHTML = mistHtml + garlandsHtml + starsHtml;
  }

  // 2. Traditional Indian Floral Shower (Pushpa Vrishti: Genda phool, Orchids, Tulips, Jasmine, Sage leaves)
  if (petalsLayer) {
    const flowerGenerators = [
      // 0: Genda Phool Blossom (Full Marigold in Gold & Saffron)
      () => `
        <svg viewBox="0 0 32 32" width="100%" height="100%">
          <g transform="translate(16, 16)">
            <g fill="#E88219">
              <circle cx="0" cy="-11" r="4.2"/>
              <circle cx="7.8" cy="-7.8" r="4.2"/>
              <circle cx="11" cy="0" r="4.2"/>
              <circle cx="7.8" cy="7.8" r="4.2"/>
              <circle cx="0" cy="11" r="4.2"/>
              <circle cx="-7.8" cy="7.8" r="4.2"/>
              <circle cx="-11" cy="0" r="4.2"/>
              <circle cx="-7.8" cy="-7.8" r="4.2"/>
            </g>
            <g fill="#F5B722">
              <circle cx="0" cy="-7.5" r="3.6"/>
              <circle cx="5.3" cy="-5.3" r="3.6"/>
              <circle cx="7.5" cy="0" r="3.6"/>
              <circle cx="5.3" cy="5.3" r="3.6"/>
              <circle cx="0" cy="7.5" r="3.6"/>
              <circle cx="-5.3" cy="5.3" r="3.6"/>
              <circle cx="-7.5" cy="0" r="3.6"/>
              <circle cx="-5.3" cy="-5.3" r="3.6"/>
            </g>
            <circle cx="0" cy="0" r="3.4" fill="#FFD24D"/>
            <circle cx="0" cy="0" r="1.8" fill="#B8590C"/>
          </g>
        </svg>
      `,
      // 1: Genda Petal (Marigold Curved Petal)
      () => `
        <svg viewBox="0 0 20 28" width="100%" height="100%">
          <path d="M10 2 C16 7, 18 14, 16 22 C14 26, 6 26, 4 22 C2 14, 4 7, 10 2 Z" fill="#F59E0B"/>
          <path d="M10 6 C13 11, 15 16, 14 21 C13 24, 7 24, 6 21 C5 16, 7 11, 10 6 Z" fill="#FCD34D" opacity="0.9"/>
          <path d="M10 21 L10 27" stroke="#B45309" stroke-width="1.2" stroke-linecap="round"/>
        </svg>
      `,
      // 2: Royal Orchid Petal (Blush Rose & Cream with Magenta Vein)
      () => `
        <svg viewBox="0 0 24 30" width="100%" height="100%">
          <path d="M12 2 C19 6, 23 13, 21 21 C19 27, 5 27, 3 21 C1 13, 5 6, 12 2 Z" fill="#FDF2F4"/>
          <path d="M12 6 C16 10, 19 15, 18 21 C17 25, 7 25, 6 21 C5 15, 8 10, 12 6 Z" fill="#F9A8D4" opacity="0.75"/>
          <path d="M12 8 Q11.5 16 12 24" stroke="#BE185D" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.6"/>
          <circle cx="12" cy="22" r="1.2" fill="#D97706"/>
        </svg>
      `,
      // 3: Tulip / Rose Petal (Soft Peach & Coral)
      () => `
        <svg viewBox="0 0 22 26" width="100%" height="100%">
          <path d="M11 2 C17 5, 21 11, 20 18 C19 24, 13 25, 11 25 C9 25, 3 24, 2 18 C1 11, 5 5, 11 2 Z" fill="#FECDD3"/>
          <path d="M11 5 C15 8, 18 13, 17 18 C16 22, 12 23, 11 23 C10 23, 6 22, 5 18 C4 13, 7 8, 11 5 Z" fill="#FB7185" opacity="0.6"/>
        </svg>
      `,
      // 4: Jasmine / Mogra Flower (Pure White & Gold Indian Jasmine)
      () => `
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <g transform="translate(12, 12)">
            <g fill="#FFFDF8" stroke="#E5DEC9" stroke-width="0.5">
              <ellipse cx="0" cy="-6" rx="2.6" ry="4.2"/>
              <ellipse cx="5.7" cy="-1.8" rx="4.2" ry="2.6" transform="rotate(18 5.7 -1.8)"/>
              <ellipse cx="3.5" cy="4.8" rx="4.2" ry="2.6" transform="rotate(72 3.5 4.8)"/>
              <ellipse cx="-3.5" cy="4.8" rx="4.2" ry="2.6" transform="rotate(-72 -3.5 4.8)"/>
              <ellipse cx="-5.7" cy="-1.8" rx="4.2" ry="2.6" transform="rotate(-18 -5.7 -1.8)"/>
            </g>
            <circle cx="0" cy="0" r="1.6" fill="#FDE047"/>
            <circle cx="0" cy="0" r="0.8" fill="#65A30D"/>
          </g>
        </svg>
      `,
      // 5: Silvery-Sage Eucalyptus Leaf
      () => `
        <svg viewBox="0 0 20 28" width="100%" height="100%">
          <path d="M10 2 C16 7, 18 16, 15 23 C13 27, 7 27, 5 23 C2 16, 4 7, 10 2 Z" fill="#84A98C"/>
          <path d="M10 4 L10 24" stroke="#52796F" stroke-width="1" stroke-linecap="round"/>
          <path d="M10 10 Q13 12 14 13 M10 15 Q13 17 14 18 M10 12 Q7 14 6 15" stroke="#52796F" stroke-width="0.8" fill="none" opacity="0.7"/>
        </svg>
      `
    ];

    let flowersHtml = '';
    const totalFlowers = 22;

    for (let i = 0; i < totalFlowers; i++) {
      const typeIdx = i % flowerGenerators.length;
      const svgContent = flowerGenerators[typeIdx]();
      const left = 2.5 + (i * 4.45 % 93);
      const isBlossom = typeIdx === 0;
      const size = isBlossom ? (20 + (i % 3) * 3) : (13 + (i % 4) * 2.5);
      const duration = 12 + (i % 6) * 2.2;
      const delay = -(i * 1.75 % 15);
      const sway = (i % 2 === 0 ? 1 : -1) * (20 + (i % 4) * 9);
      const spin = (i % 2 === 0 ? 1 : -1) * (180 + i * 25);
      const flipY = (i % 2 === 0 ? 360 : -360);
      const flipX = (i % 3 === 0 ? 180 : 0);
      const op = 0.52 + (i % 3) * 0.14;

      flowersHtml += `
        <div class="pw-flower f-${typeIdx}" style="
          left:${left}%;
          width:${size}px;
          height:${size * (isBlossom ? 1 : 1.3)}px;
          animation-duration:${duration}s;
          animation-delay:${delay}s;
          --sway:${sway}px;
          --spin:${spin}deg;
          --flipY:${flipY}deg;
          --flipX:${flipX}deg;
          --op:${op};
        ">
          ${svgContent}
        </div>
      `;
    }

    petalsLayer.innerHTML = flowersHtml;
  }
}

// ----------------------------------------------------
// HERO & SCRATCH CARD
// ----------------------------------------------------
function renderHeroAndScratch() {
  const container = document.getElementById('hero-and-scratch-container');
  if (!container || !content) return;

  const { hero, scratch, media } = content;

  container.innerHTML = `
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-ganesha">
        <img src="${media.ganesha}" alt="Shree Ganesha">
      </div>
      <p class="hero-mantra">${hero.mantra}</p>
      <p class="hero-shloka">${hero.shloka[0]}<br>${hero.shloka[1]}</p>

      <header class="sec">
        <span class="sec-orn"><i></i><b>◆</b><i></i></span>
        <span class="sec-eyebrow">${hero.eyebrow}</span>
      </header>

      <!-- Host Card (Groom Info & Name First) -->
      <article class="paper ruled card-a">
        <div class="hero-hosts">
          ${hero.hosts}
          ${hero.hostsSub ? `<span class="hero-hosts-sub">${hero.hostsSub}</span>` : ''}
        </div>
        <em class="hero-req">${hero.request}</em>

        <div class="hero-names">
          <div class="hero-person">
            <span class="hero-name">${hero.groom}</span>
            ${hero.groomElders ? `<div class="hero-person-elders">${hero.groomElders}</div>` : ''}
          </div>
          <span class="hero-joiner">${hero.joiner}</span>
          <div class="hero-person">
            <span class="hero-name">${hero.bride}</span>
            ${hero.brideElders ? `<div class="hero-person-elders">${hero.brideElders}</div>` : ''}
          </div>
        </div>

        ${(!hero.brideElders && hero.elderLine) ? `<div class="hero-elders">${hero.elderLine}</div>` : ''}
      </article>

      <p class="hero-close">${hero.closingLine}</p>
    </section>

    <!-- Scratch Card Section (Date Reveal) -->
    <section class="std">
      <header class="sec">
        <span class="sec-orn"><i></i><b>◆</b><i></i></span>
        <span class="sec-eyebrow">${scratch.eyebrow}</span>
      </header>

      <div class="paper card-b">
        <div class="sc-wrap" id="scratch-wrap">
          <div class="sc-under">
            <span class="sc-day">${scratch.day}</span>
            <span class="sc-date">${scratch.date}</span>
          </div>
          <canvas class="sc-canvas" id="scratch-canvas"></canvas>
          <div class="sc-cue" id="scratch-cue">
            <svg viewBox="0 0 28 36" width="30" height="38">
              <path d="M14 6 C14 3 17 3 17 7 L17 18 L19 18 C21 18 23 20 23 23 L22 30 C21 34 17 35 12 35 C7 35 4 32 4 28 L4 22 C4 19 6 18 8 18 L10 18 L10 14 C10 10 14 10 14 6 Z" fill="#8d655c" opacity="0.8"/>
            </svg>
          </div>
          <div class="sc-shine" id="scratch-shine"></div>
          <div class="sc-hint">${scratch.hint}</div>
        </div>
      </div>

      <div class="inv-gate" id="inv-gate-pill" role="status">
        ${scratch.gate}
      </div>
    </section>
  `;

  initScratchCard();
}

// Scratch card interactive canvas logic
function initScratchCard() {
  const wrap = document.getElementById('scratch-wrap');
  const canvas = document.getElementById('scratch-canvas');
  if (!wrap || !canvas) return;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const dpr = window.devicePixelRatio || 1;

  let width = wrap.clientWidth;
  let height = wrap.clientHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  // Paint Champagne Sage foil with gold glitter speckles
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#e5ede3');
  grad.addColorStop(0.5, '#d4e5d2');
  grad.addColorStop(1, '#dfeade');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Glitter speckles
  ctx.fillStyle = 'rgba(198, 149, 57, 0.55)';
  for (let i = 0; i < 220; i++) {
    const gx = Math.random() * width;
    const gy = Math.random() * height;
    const gr = 0.6 + Math.random() * 0.9;
    ctx.beginPath();
    ctx.arc(gx, gy, gr, 0, Math.PI * 2);
    ctx.fill();
  }

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealCard();
    return;
  }

  let isDrawing = false;
  let lastPos = null;
  let totalDistance = 0;
  let moveCount = 0;
  let isRevealed = false;

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left,
      y: (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top
    };
  }

  function eraseCircle(x, y) {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    const rad = 34;
    const radial = ctx.createRadialGradient(x, y, 0, x, y, rad);
    radial.addColorStop(0, 'rgba(0, 0, 0, 1)');
    radial.addColorStop(0.65, 'rgba(0, 0, 0, 0.85)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radial;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function interpolateErase(p1, p2) {
    const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    const step = 8;
    const count = Math.ceil(dist / step);
    for (let i = 0; i <= count; i++) {
      const t = count === 0 ? 0 : i / count;
      const x = p1.x + (p2.x - p1.x) * t;
      const y = p1.y + (p2.y - p1.y) * t;
      eraseCircle(x, y);
    }
  }

  function checkClearPercentage() {
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let clearPixels = 0;
      let totalSampled = 0;
      // Sample every 16th pixel
      for (let i = 3; i < data.length; i += 64) {
        totalSampled++;
        if (data[i] < 128) {
          clearPixels++;
        }
      }
      return clearPixels / totalSampled;
    } catch (e) {
      return 0;
    }
  }

  function onStart(e) {
    isDrawing = true;
    lastPos = getPos(e);
    wrap.classList.add('is-touched');
    eraseCircle(lastPos.x, lastPos.y);
  }

  function onMove(e) {
    if (!isDrawing || isRevealed) return;
    const pos = getPos(e);
    const d = Math.hypot(pos.x - lastPos.x, pos.y - lastPos.y);
    totalDistance += d;

    interpolateErase(lastPos, pos);
    lastPos = pos;
    moveCount++;

    // Check conditions: > 75% width distance or sample alpha every 3rd move
    if (totalDistance > width * 0.75 || (moveCount % 3 === 0 && checkClearPercentage() > 0.12)) {
      revealCard();
    }
  }

  function onEnd() {
    isDrawing = false;
  }

  function revealCard() {
    if (isRevealed) return;
    isRevealed = true;
    isPageRevealed = true;

    // Trigger petal burst
    triggerPetalBurst(wrap);

    // Animate wrap & underlayer
    wrap.classList.add('is-open');
    canvas.style.transition = 'opacity 0.4s ease';
    canvas.style.opacity = '0';
    setTimeout(() => {
      if (canvas.parentNode) canvas.remove();
    }, 400);

    // Hide gate pill
    const gatePill = document.getElementById('inv-gate-pill');
    if (gatePill) {
      gatePill.style.transition = 'opacity 0.4s ease';
      gatePill.style.opacity = '0';
      setTimeout(() => gatePill.style.display = 'none', 400);
    }

    // Mount rest of page
    mountRestOfPage();
  }

  canvas.addEventListener('pointerdown', (e) => {
    canvas.setPointerCapture(e.pointerId);
    onStart(e);
  });
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onEnd);
  canvas.addEventListener('pointercancel', onEnd);
}

// 14 colorful petal burst on scratch reveal (Sage, Jasmine, Gold)
function triggerPetalBurst(container) {
  const colors = ['#b8d5b4', '#d6e8d2', '#c69539', '#fafbf8', '#728c64'];
  for (let p = 0; p < 14; p++) {
    const angle = (p / 14) * 2 * Math.PI;
    const x = Math.round(Math.cos(angle) * (38 + (p % 4) * 16));
    const y = Math.round(Math.sin(angle) * (30 + (p % 3) * 14)) - 20;
    const rot = (p % 2 === 1 ? -1 : 1) * (90 + 21 * p);
    const color = colors[p % colors.length];
    const delay = (p % 6) * 0.045;

    const span = document.createElement('span');
    span.className = 'burst-petal';
    span.style.background = color;
    span.style.setProperty('--bx', `${x}px`);
    span.style.setProperty('--by', `${y}px`);
    span.style.setProperty('--brot', `${rot}deg`);
    span.style.animationDelay = `${delay}s`;

    container.appendChild(span);
    setTimeout(() => span.remove(), 1400);
  }
}

// ----------------------------------------------------
// MOUNT REST OF PAGE (COUNTDOWN, CAROUSEL, EVENTS, DIRECTIONS, RSVP, FOOTER)
// ----------------------------------------------------
function mountRestOfPage() {
  const restEl = document.getElementById('rest-sections');
  if (!restEl || !content) return;
  restEl.style.display = 'block';

  restEl.innerHTML = `
    <!-- Countdown Section -->
    ${renderCountdownHtml()}

    <!-- Celebrations Event Cards -->
    ${renderEventsHtml()}

    <!-- Directions Section -->
    ${renderDirectionsHtml()}

    <!-- RSVP Section -->
    ${renderRsvpHtml()}

    <!-- Closing Card & Footer -->
    ${renderFooterHtml()}
  `;

  // Initialize interactive features
  initCountdown();
  initRsvpForm();

  // Smooth scroll after 1400ms to countdown
  setTimeout(() => {
    const cdEl = document.querySelector('.cd');
    if (cdEl) {
      const topPos = cdEl.getBoundingClientRect().top + window.pageYOffset - 12;
      window.scrollTo({ top: topPos, behavior: 'smooth' });
    }
  }, 1400);
}

// ----------------------------------------------------
// COUNTDOWN COMPONENT
// ----------------------------------------------------
function renderCountdownHtml() {
  const { countdown } = content;
  return `
    <section class="cd">
      <header class="sec">
        <span class="sec-orn"><i></i><b>◆</b><i></i></span>
        <span class="sec-eyebrow">${countdown.eyebrow}</span>
        <h2 class="sec-h">${countdown.title}</h2>
      </header>

      <div class="cd-grid">
        <div class="cd-chip">
          <span class="cd-num" id="cd-days">00</span>
          <span class="cd-lbl">${countdown.labels[0]}</span>
        </div>
        <div class="cd-chip">
          <span class="cd-num" id="cd-hours">00</span>
          <span class="cd-lbl">${countdown.labels[1]}</span>
        </div>
        <div class="cd-chip">
          <span class="cd-num" id="cd-mins">00</span>
          <span class="cd-lbl">${countdown.labels[2]}</span>
        </div>
        <div class="cd-chip">
          <span class="cd-num" id="cd-secs">00</span>
          <span class="cd-lbl">${countdown.labels[3]}</span>
        </div>
      </div>
    </section>
  `;
}

function initCountdown() {
  const targetTime = new Date(content.countdown.target).getTime();

  function tick() {
    const now = Date.now();
    const diff = targetTime - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-mins').textContent = '00';
      document.getElementById('cd-secs').textContent = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    const pad = (n) => String(n).padStart(2, '0');

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    if (daysEl) daysEl.textContent = d >= 100 ? d : pad(d);
    if (hoursEl) hoursEl.textContent = pad(h);
    if (minsEl) minsEl.textContent = pad(m);
    if (secsEl) secsEl.textContent = pad(s);
  }

  tick();
  setInterval(tick, 1000);
}

// ----------------------------------------------------
// PHOTO CLOTHESLINE CAROUSEL
// ----------------------------------------------------
function renderPhotoLineHtml() {
  return '';
}

function initPhotoCarousel() {
  // Photo section removed
}

// ----------------------------------------------------
// CELEBRATIONS EVENT CARDS
// ----------------------------------------------------
function renderEventsHtml() {
  const { events } = content;

  const cardsHtml = events.items.map(ev => {
    const isEng = ev.id === 'engagement';

    if (isEng) {
      return `
    <article class="paper ev-card ev-card--engagement">
      <div class="ev-art ev-art--eng">
        <img class="ev-img" src="${ev.art}" alt="${ev.name}" loading="lazy">
        <div class="ev-eng-over">
          <span class="ev-eng-eyebrow">The Engagement of</span>
          <h3 class="ev-eng-names">Souvik &amp; Chinar</h3>
          <div class="ev-eng-ornament"><i></i>✦<i></i></div>
          <div class="ev-eng-date">${ev.day}, ${ev.date}</div>
          <div class="ev-eng-time">${ev.time}</div>
          <div class="ev-eng-venue">${ev.venue}</div>
          <div class="ev-eng-place">${ev.place}</div>
        </div>
      </div>
      <div class="ev-foot">
        <a class="ev-dir" href="${ev.map}" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          Get directions
        </a>
      </div>
    </article>
      `;
    }

    return `
    <article class="paper ev-card ev-card--wedding">
      <div class="ev-art ev-art--wed">
        <img class="ev-img" src="${ev.art}" alt="${ev.name}" loading="lazy">
        <div class="ev-wed-over">
          <span class="ev-wed-eyebrow">The Wedding Ceremony</span>
          <h3 class="ev-wed-names">Souvik &amp; Chinar</h3>
          <div class="ev-wed-ornament"><i></i>✦<i></i></div>
          <div class="ev-wed-date">${ev.day}, ${ev.date}</div>
          <div class="ev-wed-time">${ev.time}</div>
          ${ev.schedule ? `<div class="ev-wed-sched">${ev.schedule}</div>` : ''}
          <div class="ev-wed-venue">${ev.venue}</div>
          <div class="ev-wed-place">${ev.place}</div>
        </div>
      </div>
      <div class="ev-foot">
        <a class="ev-dir" href="${ev.map}" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          Get directions
        </a>
      </div>
    </article>
    `;
  }).join('');

  return `
    <section class="ev">
      <header class="sec">
        <span class="sec-orn"><i></i><b>◆</b><i></i></span>
        <span class="sec-eyebrow">${events.eyebrow}</span>
        <h2 class="sec-h">${events.title}</h2>
        <p class="sec-lead">${events.lead}</p>
      </header>

      <div class="ev-list">
        ${cardsHtml}
      </div>
    </section>
  `;
}

// ----------------------------------------------------
// DIRECTIONS SECTION
// ----------------------------------------------------
function renderDirectionsHtml() {
  const { directions } = content;

  const cardsHtml = directions.items.map(dir => `
    <article class="paper ruled vn-card">
      <span class="vn-city">${dir.city}</span>
      <h3 class="vn-name">${dir.name}</h3>
      <p class="vn-place">${dir.place}</p>
      <div class="vn-when">
        ${dir.when}
        <em>${dir.dates}</em>
      </div>
      <a class="vn-dir" href="${dir.map}" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        Get directions
      </a>
    </article>
  `).join('');

  return `
    <section class="vn">
      <header class="sec">
        <span class="sec-orn"><i></i><b>◆</b><i></i></span>
        <h2 class="sec-h sec-h--big">${directions.title}</h2>
        <p class="sec-lead">${directions.lead}</p>
      </header>

      <div class="vn-list">
        ${cardsHtml}
      </div>
    </section>
  `;
}

// ----------------------------------------------------
// RSVP SECTION
// ----------------------------------------------------
function renderRsvpHtml() {
  const { rsvp, events } = content;
  const savedReply = localStorage.getItem('cs_wedding_rsvp');
  const existingData = savedReply ? JSON.parse(savedReply) : null;

  return `
    <section class="rs" id="rsvp-section">
      <header class="sec">
        <span class="sec-orn"><i></i><b>◆</b><i></i></span>
        <span class="sec-eyebrow">${rsvp.eyebrow}</span>
        <h2 class="sec-h">${rsvp.title}</h2>
        <p class="sec-lead" id="rs-lead-text">${existingData ? rsvp.leadEdit : rsvp.lead}</p>
      </header>

      <div id="rsvp-container">
        <!-- Injected dynamically by initRsvpForm() based on state -->
      </div>

      ${rsvp.familyRsvp ? `
        <article class="paper ruled rs-card rs-family-card">
          <span class="sec-eyebrow" style="margin-bottom:0.4rem; display:block;">${rsvp.familyRsvp.title}</span>
          <p class="rs-family-names">${rsvp.familyRsvp.names.replace(/\n/g, '<br>')}</p>
        </article>
      ` : ''}

      <!-- A Cordial Invitation From / Or simply call us -->
      <article class="paper ruled rs-card rs-call">
        <h3 class="rs-call-h">${rsvp.call.title}</h3>
        ${rsvp.call.subtitle ? `<p class="rs-call-sub">${rsvp.call.subtitle.replace(/\n/g, '<br>')}</p>` : ''}
        <div class="rs-tels">
          ${rsvp.call.people.map(p => `
            <a class="rs-tel" href="${p.tel.startsWith('tel:') ? p.tel : `tel:${p.tel}`}">
              <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <div class="rs-tel-text">
                <span class="rs-tel-name">${p.name}</span>
                <span class="rs-tel-num">${p.display}</span>
              </div>
            </a>
          `).join('')}
        </div>
      </article>
    </section>
  `;
}

function initRsvpForm() {
  const container = document.getElementById('rsvp-container');
  if (!container || !content) return;

  const { rsvp, events } = content;
  const savedReply = localStorage.getItem('cs_wedding_rsvp');
  let formData = savedReply ? JSON.parse(savedReply) : {
    coming: true,
    name: '',
    phone: '',
    guests: rsvp.fields.guestsDefault,
    functions: events.items.map(e => e.id), // default all checked
    bets: {},
    blessing: '',
    isSubmitted: false
  };

  // If already submitted and not editing, show Thank-You state
  if (formData.isSubmitted && !window.__isRsvpEditing) {
    showRsvpDone(formData);
    return;
  }

  showRsvpForm();

  function showRsvpForm() {
    const isYes = formData.coming;

    container.innerHTML = `
      <form class="rs-form" id="rs-actual-form" novalidate>
        <!-- Will you be celebrating with us? -->
        <article class="paper ruled rs-card">
          <h3 class="rs-h">${rsvp.join.q}</h3>
          <div class="rs-yn-grid">
            <button type="button" class="rs-yn-btn ${isYes ? 'is-on' : ''}" id="btn-join-yes">${rsvp.join.yes}</button>
            <button type="button" class="rs-yn-btn ${!isYes ? 'is-on' : ''}" id="btn-join-no">${rsvp.join.no}</button>
          </div>
        </article>

        <!-- Details Card -->
        <article class="paper ruled rs-card" id="rs-details-card">
          <label class="rs-lbl" for="rs-name-input">${rsvp.fields.name}</label>
          <input class="rs-in" id="rs-name-input" type="text" placeholder="${rsvp.fields.namePh}" value="${formData.name}">
          <span class="rs-err-msg" id="rs-name-err" style="display:none;">${rsvp.fields.nameErr}</span>

          <label class="rs-lbl" for="rs-phone-input">${rsvp.fields.phone} <em>${rsvp.fields.phoneOpt}</em></label>
          <input class="rs-in" id="rs-phone-input" type="tel" placeholder="${rsvp.fields.phonePh}" value="${formData.phone}">

          <!-- Stepper: only if accepting -->
          <div id="rs-stepper-wrap" style="${isYes ? 'display:block' : 'display:none'}">
            <label class="rs-lbl">${rsvp.fields.guests}</label>
            <div class="rs-stepper">
              <button type="button" class="rs-step-btn" id="rs-minus-btn">−</button>
              <span class="rs-step-val" id="rs-guests-val">${formData.guests}</span>
              <button type="button" class="rs-step-btn" id="rs-plus-btn">+</button>
            </div>
          </div>
        </article>

        <!-- Which functions? (Only if accepting) -->
        <div id="rs-functions-wrap" style="${isYes ? 'display:block' : 'display:none'}">
          <article class="paper ruled rs-card">
            <h3 class="rs-h">${rsvp.functions.q}</h3>
            <p class="rs-q">${rsvp.functions.sub}</p>
            <div class="rs-chips">
              ${events.items.map(ev => {
                const checked = formData.functions.includes(ev.id);
                return `
                  <div class="rs-chip ${checked ? 'is-on' : ''}" data-ev-id="${ev.id}">
                    <div class="rs-box">
                      <svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <div class="rs-chip-text">
                      <b>${ev.name}</b>
                      <em>${ev.rsvpLine}</em>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </article>
        </div>

        ${rsvp.bets ? `
        <!-- Place your bet -->
        <article class="paper ruled rs-card">
          <h3 class="rs-h">${rsvp.bets.title}</h3>
          ${rsvp.bets.items.map((bet, bIdx) => `
            <p class="rs-q ${bIdx > 0 ? 'rs-q--2' : ''}">${bet.q}</p>
            <div class="rs-picks" data-bet-key="${bet.key}">
              ${bet.options.map(opt => `
                <button type="button" class="rs-pick ${formData.bets[bet.key] === opt ? 'is-on' : ''}" data-opt="${opt}">${opt}</button>
              `).join('')}
            </div>
          `).join('')}
          <div class="rs-note">${rsvp.bets.note}</div>
        </article>
        ` : ''}

        ${rsvp.blessing ? `
        <!-- Blessing / Advice -->
        <article class="paper ruled rs-card">
          <h3 class="rs-h">${rsvp.blessing.q}</h3>
          <p class="rs-q">${rsvp.blessing.sub}</p>
          <textarea class="rs-area" id="rs-blessing-area" rows="4" placeholder="${rsvp.blessing.ph}">${formData.blessing}</textarea>
        </article>
        ` : ''}

        <!-- Submit Button -->
        <button type="submit" class="rs-send" id="rs-submit-btn">
          <span id="rs-send-text">${window.__isRsvpEditing ? rsvp.save : rsvp.submit}</span>
        </button>
      </form>
    `;

    // Hook up Join Yes/No buttons
    const btnYes = document.getElementById('btn-join-yes');
    const btnNo = document.getElementById('btn-join-no');
    const stepperWrap = document.getElementById('rs-stepper-wrap');
    const funcWrap = document.getElementById('rs-functions-wrap');

    btnYes.addEventListener('click', () => {
      formData.coming = true;
      btnYes.classList.add('is-on');
      btnNo.classList.remove('is-on');
      stepperWrap.style.display = 'block';
      funcWrap.style.display = 'block';
    });

    btnNo.addEventListener('click', () => {
      formData.coming = false;
      btnNo.classList.add('is-on');
      btnYes.classList.remove('is-on');
      stepperWrap.style.display = 'none';
      funcWrap.style.display = 'none';
    });

    // Stepper logic
    const minusBtn = document.getElementById('rs-minus-btn');
    const plusBtn = document.getElementById('rs-plus-btn');
    const guestsVal = document.getElementById('rs-guests-val');

    minusBtn.addEventListener('click', () => {
      if (formData.guests > rsvp.fields.guestsMin) {
        formData.guests--;
        guestsVal.textContent = formData.guests;
      }
    });

    plusBtn.addEventListener('click', () => {
      if (formData.guests < rsvp.fields.guestsMax) {
        formData.guests++;
        guestsVal.textContent = formData.guests;
      }
    });

    // Functions checkboxes
    document.querySelectorAll('.rs-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const id = chip.getAttribute('data-ev-id');
        if (formData.functions.includes(id)) {
          formData.functions = formData.functions.filter(f => f !== id);
          chip.classList.remove('is-on');
        } else {
          formData.functions.push(id);
          chip.classList.add('is-on');
        }
      });
    });

    // Bets selection pills (single choice, deselectable)
    document.querySelectorAll('.rs-picks').forEach(group => {
      const key = group.getAttribute('data-bet-key');
      group.querySelectorAll('.rs-pick').forEach(btn => {
        btn.addEventListener('click', () => {
          const opt = btn.getAttribute('data-opt');
          if (formData.bets[key] === opt) {
            delete formData.bets[key];
            btn.classList.remove('is-on');
          } else {
            formData.bets[key] = opt;
            group.querySelectorAll('.rs-pick').forEach(b => b.classList.remove('is-on'));
            btn.classList.add('is-on');
          }
        });
      });
    });

    // Form submission & validation
    const form = document.getElementById('rs-actual-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('rs-name-input');
      const nameErr = document.getElementById('rs-name-err');
      const nameVal = nameInput.value.trim();

      if (!nameVal) {
        nameInput.classList.add('is-err');
        nameErr.style.display = 'block';
        nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        nameInput.focus();
        return;
      }

      nameInput.classList.remove('is-err');
      nameErr.style.display = 'none';

      formData.name = nameVal;
      formData.phone = document.getElementById('rs-phone-input').value.trim();
      formData.blessing = document.getElementById('rs-blessing-area')?.value.trim() || '';
      formData.isSubmitted = true;
      formData.submittedAt = new Date().toISOString();

      // Show spinner
      const submitBtn = document.getElementById('rs-submit-btn');
      submitBtn.innerHTML = `<span class="rs-spinner"></span> <span>${rsvp.submitting}</span>`;
      submitBtn.disabled = true;

      // Simulate save to local & backend
      setTimeout(() => {
        localStorage.setItem('cs_wedding_rsvp', JSON.stringify(formData));
        window.__isRsvpEditing = false;
        showRsvpDone(formData);
      }, 700);
    });
  }

  function showRsvpDone(data) {
    const firstName = data.name.split(' ')[0] || data.name;
    let comingText = '';
    if (!data.coming) {
      comingText = rsvp.done.notComing;
    } else if (data.guests === 1) {
      comingText = rsvp.done.comingOne;
    } else {
      comingText = rsvp.done.comingMany.replace('{n}', data.guests);
    }

    const chosenEvents = data.coming ? events.items
      .filter(ev => data.functions.includes(ev.id))
      .map(ev => ev.name)
      .join(' · ') : '';

    container.innerHTML = `
      <article class="paper ruled rs-card rs-done">
        <svg class="rs-check" viewBox="0 0 54 54">
          <circle cx="27" cy="27" r="24"/>
          <path d="M16 28 L23 35 L38 20"/>
        </svg>
        <h3 class="rs-done-title">${rsvp.done.title.replace('{first}', firstName)}</h3>
        <p class="rs-done-lead">We have received your lovely response!</p>
        <div class="rs-done-summary">
          <strong>${comingText}</strong>
          ${chosenEvents ? `<em>${chosenEvents}</em>` : ''}
        </div>
        <button type="button" class="rs-edit-btn" id="rs-edit-reply-btn">${rsvp.done.edit}</button>
      </article>
    `;

    document.getElementById('rs-edit-reply-btn').addEventListener('click', () => {
      window.__isRsvpEditing = true;
      initRsvpForm();
    });
  }
}

// ----------------------------------------------------
// CLOSING CARD & FOOTER
// ----------------------------------------------------
function renderFooterHtml() {
  const { footer } = content;

  // Auspicious Golden Marigold emblem for closing card
  const floralBadgeSvg = `
    <svg viewBox="0 0 28 28" width="30" height="30">
      <g transform="translate(14, 14)">
        <g fill="#D97706">
          <ellipse cx="0" cy="-7.5" rx="3.2" ry="5.2"/>
          <ellipse cx="6.5" cy="-3.8" rx="3.2" ry="5.2" transform="rotate(30 6.5 -3.8)"/>
          <ellipse cx="6.5" cy="3.8" rx="3.2" ry="5.2" transform="rotate(60 6.5 3.8)"/>
          <ellipse cx="0" cy="7.5" rx="3.2" ry="5.2"/>
          <ellipse cx="-6.5" cy="3.8" rx="3.2" ry="5.2" transform="rotate(-60 -6.5 3.8)"/>
          <ellipse cx="-6.5" cy="-3.8" rx="3.2" ry="5.2" transform="rotate(-30 -6.5 -3.8)"/>
        </g>
        <circle cx="0" cy="0" r="3.8" fill="#F59E0B"/>
        <circle cx="0" cy="0" r="1.8" fill="#FDE68A"/>
      </g>
    </svg>
  `;

  return `
    <!-- Closing Card -->
    <article class="paper ruled ft-card">
      <div class="sec-orn"><i></i><b>◆</b><i></i></div>
      <div class="ft-floral-badge">${floralBadgeSvg}</div>
      <p class="ft-msg">${footer.messages[0]}</p>
      <p class="ft-msg">${footer.messages[1]}</p>

      <div class="ft-regards">${footer.regards}</div>

      <!-- Bride Name First! -->
      <div class="ft-names">
        <span>${footer.names[0].name}</span>
        <span class="ft-names-amp">&</span>
        <span>${footer.names[1].name}</span>
      </div>

      <div class="ft-hash">
        <i></i>
        <span>${footer.hashtag}</span>
        <i></i>
      </div>
    </article>

    <!-- Footer Credit -->
    <footer class="ft-credit">
      <div class="ft-credit-rule"><i></i><b>◆</b><i></i></div>
      ${footer.credit.for ? `<span class="ft-credit-for">${footer.credit.for}</span>` : ''}
      ${footer.credit.who ? `<span class="ft-credit-who">${footer.credit.who}</span>` : ''}
      ${footer.credit.by ? `<span class="ft-credit-by">by <b>${footer.credit.by}</b></span>` : ''}
      ${footer.credit.note ? `<span class="ft-credit-note">${footer.credit.note}</span>` : ''}
    </footer>
  `;
}

// ----------------------------------------------------
// UI CONTROLS: SCROLL CUE
// ----------------------------------------------------
function setupScrollCue() {
  const cue = document.getElementById('scroll-cue');
  if (!cue) return;

  let scrollTimeout = null;

  window.addEventListener('scroll', () => {
    if (!isPageRevealed) return;
    // Hide while user is actively scrolling
    cue.classList.add('is-hidden');
    clearTimeout(scrollTimeout);

    // Also hide if within 120px of bottom
    const distFromBottom = document.documentElement.scrollHeight - (window.innerHeight + window.pageYOffset);
    if (distFromBottom < 120) {
      return;
    }

    // Show again 900ms after last scroll
    scrollTimeout = setTimeout(() => {
      if (document.documentElement.scrollHeight - (window.innerHeight + window.pageYOffset) >= 120) {
        cue.classList.remove('is-hidden');
      }
    }, 900);
  }, { passive: true });

  cue.addEventListener('click', () => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
  });
}

// ----------------------------------------------------
// BACKGROUND MUSIC CONTROLS (LOOPING WEDDING THEME)
// ----------------------------------------------------
function startBackgroundMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;
  audio.loop = true;
  audio.volume = 0.85;

  // Guarantee loop continues seamlessly across browsers
  audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    audio.play().catch(err => console.warn(err));
  });

  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(err => {
      console.warn("Audio autoplay blocked by browser policy, waiting for interaction:", err);
    });
  }
}

function setupMusicControls() {
  const audio = document.getElementById('bg-music');
  const btn = document.getElementById('music-btn');
  if (!btn || !audio) return;

  btn.style.display = 'grid';

  const iconPlay = `
    <svg viewBox="0 0 24 24" width="22" height="22">
      <path d="M11 5L6 9H2v6h4l5 4V5z"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/>
    </svg>
  `;

  const iconMute = `
    <svg viewBox="0 0 24 24" width="22" height="22">
      <path d="M11 5L6 9H2v6h4l5 4V5z"/>
      <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `;

  function updateIcon() {
    if (audio.paused) {
      btn.innerHTML = iconMute;
      btn.setAttribute('aria-label', 'Play music');
      btn.classList.add('is-paused');
    } else {
      btn.innerHTML = iconPlay;
      btn.setAttribute('aria-label', 'Pause music');
      btn.classList.remove('is-paused');
    }
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (audio.paused) {
      audio.play().catch(e => console.warn(e));
    } else {
      audio.pause();
    }
    updateIcon();
  });

  audio.addEventListener('play', updateIcon);
  audio.addEventListener('pause', updateIcon);

  // If visited via direct link and audio not playing yet, start on first user tap
  if (audio.paused) {
    const playOnFirstTap = () => {
      if (audio.paused) {
        startBackgroundMusic();
      }
      document.removeEventListener('click', playOnFirstTap);
      document.removeEventListener('touchstart', playOnFirstTap);
    };
    document.addEventListener('click', playOnFirstTap);
    document.addEventListener('touchstart', playOnFirstTap, { passive: true });
  }

  updateIcon();
}

// ----------------------------------------------------
// INITIALIZATION
// ----------------------------------------------------
window.addEventListener('DOMContentLoaded', async () => {
  await loadContent();
  if (!content) return;

  // Check query params: if ?invite or #invite, skip gate; otherwise show gate landing page
  const urlParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash;

  if (urlParams.get('stage') === 'invite' || hash === '#invite') {
    const gateEl = document.getElementById('stage-gate');
    if (gateEl) gateEl.style.display = 'none';
    showMainPage();
  } else {
    renderGate();
  }
});
