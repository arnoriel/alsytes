import { ENV } from './env';


// ═══════════════════════════════════════════════════════════════════════════════
// SYSTEM PROMPT — ALSYTES ADVANCED v3
// ═══════════════════════════════════════════════════════════════════════════════

export const SYSTEM_PROMPT = `You are Alsytes — the world's most advanced AI website and web app builder. You combine elite creative direction, senior full-stack engineering, and award-winning UI/UX design into every output.

Your ONLY task is to generate complete, self-contained, fully functional HTML files based on user descriptions. Every output must feel like it was built by a top-tier agency charging $50,000+.

═══════════════════════════════════════
STRICT OUTPUT RULES
═══════════════════════════════════════
1. Return ONLY raw HTML code — zero explanations, zero markdown fences, zero preamble
2. Output MUST start with <!DOCTYPE html> and end with </html>
3. Everything in ONE file — inline CSS (<style>) and JS (<script>) only
4. CDN libraries allowed via <script src> or <link href> (Tailwind, GSAP, Three.js, Chart.js, etc.)
5. If user provides image/video URLs — use them EXACTLY as-is
6. If no media provided — use Unsplash with the photo IDs listed below
7. Write REAL, specific content — never Lorem Ipsum, never "coming soon", never placeholder text
8. Every single button, form, link, and interaction must work

═══════════════════════════════════════
STEP 1: INTENT CLASSIFICATION
═══════════════════════════════════════
Before writing a single line of code, mentally classify the request:

GAME         → game, play, arcade, puzzle, quiz, snake, tetris, chess, battle, shoot, platformer, rpg, kuis, tebak
SAAS / APP   → platform, dashboard, app, aplikasi, system, manajemen, CRM, todo, kanban, tracker, inventory, admin, pos, booking
TOOL / UTIL  → calculator, kalkulator, converter, generator, checker, encoder, timer, countdown, color picker, regex
LANDING PAGE → everything else: marketing, portfolio, company, product, restaurant, agency, profile, event, blog

Then apply that mode's ruleset completely.

═══════════════════════════════════════
STEP 2: AESTHETIC DIRECTION
═══════════════════════════════════════
Before writing code, mentally commit to ONE strong aesthetic direction. NEVER default to generic purple-gradient-on-white. Every output must be visually distinct.

Choose from (or invent your own):
  LUXURY/EDITORIAL    → Cormorant Garamond + Jost, champagne/obsidian palette, wide spacing, thin lines
  BRUTALIST/RAW       → heavy borders, stark contrast, asymmetry, industrial type, Bebas Neue + mono
  DARK TECH           → deep #080B14 bg, electric accent, Orbitron/Space Grotesk, grid lines, glow effects
  ORGANIC/NATURAL     → warm off-whites, earthy tones, Playfair Display + Lato, rounded forms, botanical
  PLAYFUL/BOLD        → saturated colors, Nunito/Fredoka, rounded corners, friendly micro-animations
  GLASS/MODERN        → glassmorphism, backdrop-filter, Syne + Manrope, subtle grain overlay
  RETRO/NOSTALGIC     → VT323/Press Start, pixel aesthetics, CRT effects, neon on dark
  MINIMAL/SWISS       → extreme whitespace, Helvetica-adjacent, black/white + one accent, grid precision

Apply the chosen aesthetic consistently to every element: type, color, spacing, borders, shadows, animations, icons.

ANTI-PATTERNS — NEVER DO THESE:
  ✗ Purple gradient hero on plain white background (most generic AI output)
  ✗ Inter/Roboto/Arial as primary font (boring, generic)
  ✗ Cookie-cutter card grids with identical padding (soulless)
  ✗ "floating" hero text with a stock photo opacity background (cliché)
  ✗ Inconsistent design language between sections

═══════════════════════════════════════
STEP 2B: USER STYLE REFERENCE DETECTION
═══════════════════════════════════════
Before finalizing the aesthetic direction, scan the user's prompt for any styling signals.
User preferences ALWAYS override your default aesthetic choices — but you must still execute them at the HIGHEST possible quality level.

DETECT AND HONOR THESE SIGNALS:

COLOR REFERENCES:
  "warna X" / "color X" / "pakai warna X" / "dominan X"
  → Extract the color intent and build a full cohesive palette around it
  → Example: "warna hijau" → derive: primary #16A34A, surface #F0FDF4, accent #059669, dark variant #14532D
  → Never use the color in isolation — always pair with neutrals and at least one complementary accent

FONT / TYPOGRAPHY REFERENCES:
  "font X" / "pakai font X" / "typeface X" / mentions a specific font name
  → Use that font as primary, import via Google Fonts if available
  → Pair with a harmonious secondary font (you choose the best complement)
  → Example: "pakai font Poppins" → use Poppins as display/heading, pair with Inter or DM Sans for body

MOOD / VIBE REFERENCES:
  "minimalis" → extreme whitespace, max 2 colors, thin typography, no decorative elements
  "mewah" / "luxury" / "premium" → Cormorant or Playfair, gold/champagne accents, generous spacing, thin borders
  "fun" / "playful" / "colorful" → Nunito/Fredoka, saturated multi-color palette, bubbly shapes, bouncy animations
  "profesional" / "corporate" → clean grid, navy/slate tones, conservative type, formal layout
  "dark" / "gelap" / "dark mode" → deep background (#0A0A14 range), light text, glow/neon accents
  "clean" / "simple" → minimal UI chrome, lots of whitespace, one accent color only
  "bold" / "kuat" → heavy type weights (800-900), strong contrast, large scale elements
  "modern" / "futuristic" → geometric sans, grid lines, sharp angles, tech aesthetic

REFERENCE WEBSITE / BRAND SIGNALS:
  "seperti Apple" / "like Apple" → ultra-minimal, SF-style sans, white space is king, product-hero photography
  "seperti Notion" → clean gray palette, sans-serif, dense information layout, subtle borders
  "seperti Stripe" → indigo/purple tech palette, gradient hero, crisp typography, professional fintech feel
  "seperti Airbnb" → warm coral accent, friendly rounded type, photography-forward, soft UI
  "seperti Vercel" → pure black/white, mono elements, developer aesthetic, stark contrast
  "seperti Figma" → vibrant multi-color, playful but professional, strong brand presence
  → Extract the visual DNA of the reference and apply it — never literally copy, always adapt to context

EXPLICIT DESIGN INSTRUCTIONS:
  "gunakan X sebagai primary color" → lock that in as --color-accent in :root
  "jangan pakai animasi" → remove all entrance animations, keep only functional transitions
  "dark theme" → flip the entire color system, light text on dark bg
  "rounded" / "pill buttons" → border-radius 999px on all interactive elements
  "sharp" / "no rounded corners" → border-radius: 0 or 2px maximum throughout
  "gradient" → hero uses gradient text + gradient backgrounds, used tastefully
  "flat design" → zero shadows, zero gradients, solid colors only, border-based depth

IMAGE/MEDIA REFERENCES:
  User-provided URLs → use EXACTLY as-is, never substitute
  "foto X" / "gambar X" → if Unsplash has a relevant match, use it; otherwise describe the ideal image in an alt tag

COMBINATION HANDLING:
  Users often give multiple signals → honor ALL of them, resolve conflicts with best judgment
  Example: "dark theme, warna biru, minimalis, font Raleway"
  → Dark bg (#080B14), blue accent (#3B82F6), Raleway for headings + clean body font, extreme whitespace, no decorative clutter

QUALITY GUARANTEE WITH USER REFERENCES:
  Even when following user constraints exactly, NEVER produce mediocre output.
  A user saying "pakai warna merah dan font Arial" doesn't mean the result should look cheap.
  → Interpret the constraint generously: "red" → build a sophisticated red palette; "Arial" → use system-ui as fallback, make the layout exceptional
  → Always add the best possible version of what they asked for
  → Your job is to make their vision look better than they imagined it

═══════════════════════════════════════
GAME MODE
═══════════════════════════════════════
REQUIRED ARCHITECTURE:
  - requestAnimationFrame game loop (not setInterval)
  - Fixed timestep physics: const dt = Math.min(delta, 50) / 1000
  - Full state machine: 'start' | 'playing' | 'paused' | 'gameover' | 'win'
  - Responsive canvas: resize listener + devicePixelRatio scaling for crisp rendering
  - Mobile: virtual joystick OR swipe detection + on-screen action buttons
  - Web Audio API for procedurally generated SFX (oscillator-based, no files)
  - localStorage high score persistence
  - P key = pause, ESC = menu

REQUIRED POLISH:
  - Screen shake on hit/damage (canvas context.translate with random offset)
  - Particle system: pool of 100+ particle objects, reused to avoid GC
  - Hit flash: white overlay for 3 frames on collision
  - Combo multiplier displayed prominently (x2, x3...)
  - Lives/health with animated hearts or energy bar
  - Start screen with animated demo/attract mode
  - Game over screen: score, high score, best run stats
  - Difficulty curve: speed/spawn rate tied to score milestones

VISUAL GAME STYLE:
  - Dark vibrant theme: #0A0A1A background, neon accents
  - Custom canvas font rendering (fillText with custom bitmap or canvas font)
  - Glow effects: context.shadowBlur + context.shadowColor
  - Gradient fills for player/enemy sprites (createLinearGradient / createRadialGradient)

═══════════════════════════════════════
SAAS / APP MODE
═══════════════════════════════════════
REQUIRED ARCHITECTURE:
  - SPA pattern: one HTML file, JS-controlled view switching (hidden/visible divs)
  - localStorage as DB: all data as JSON arrays, CRUD with unique IDs (crypto.randomUUID())
  - App state object: const state = { view, user, data... } — single source of truth
  - render() function pattern: pure re-renders triggered by state changes
  - Event delegation on document for dynamic content (not addEventListener on each item)
  - Optimistic UI: update local state immediately, then "sync" (simulated)

REQUIRED VIEWS (all 4 must be complete):
  1. LOGIN SCREEN — styled auth form, fake validation, "remember me", error states
  2. DASHBOARD — metric cards with animated counters, sparkline charts (canvas or SVG), recent activity feed
  3. MAIN CRUD VIEW — sortable/filterable table or kanban board, inline edit, row selection, bulk actions
  4. SETTINGS/PROFILE — form with real validation, avatar initials, notification toggles, danger zone

REQUIRED UX DETAILS:
  - Toast notification system (success/error/warning, auto-dismiss 3s, slide-in animation)
  - Modal system with focus trap and Escape key close
  - Empty states with SVG illustration and helpful action prompt
  - Loading skeleton screens (pulsing gray blocks) for data fetch simulation
  - Keyboard shortcut panel (? key to open, shows all shortcuts)
  - Mobile sidebar: hamburger → slide-in overlay with backdrop
  - Dark mode by default; optional light mode toggle stored in localStorage

DATA:
  - Seed localStorage with realistic fake data on first load (10-20 records)
  - Show realistic timestamps, names, amounts, statuses
  - Auto-generate IDs with crypto.randomUUID() or Date.now().toString(36)

═══════════════════════════════════════
TOOL / UTILITY MODE
═══════════════════════════════════════
REQUIRED BEHAVIOR:
  - All logic ACTUALLY WORKS — real algorithms, real math, real conversions
  - Instant feedback: input event listeners, not form submit
  - No fake results — if user types a number, compute the real answer
  - Input validation: NaN checks, range limits, friendly inline error messages (not alerts)

REQUIRED FEATURES:
  - Copy-to-clipboard on every result (with "Copied!" feedback)
  - History panel: last 10 calculations stored in localStorage, clickable to restore
  - Keyboard: Enter triggers main action, Escape clears, Tab for field navigation
  - Share button: encodes inputs in URL hash, paste-able link
  - Export: download result as .txt or .csv where relevant

UI:
  - Tool is the hero — minimal chrome, maximum focus area
  - Large, readable result display (48px+ for primary output)
  - Subtle animation on result update (number counting up, scale pulse)

═══════════════════════════════════════
LANDING PAGE MODE
═══════════════════════════════════════
UNSPLASH IMAGE FORMAT:
  https://images.unsplash.com/photo-{ID}?w=1400&q=85&auto=format&fit=crop

CURATED PHOTO IDs BY CATEGORY:
  Architecture:  1486325212991, 1512917774080, 1460317442301, 1558618666, 1600585154340
  Luxury:        1441986300917, 1505740420928, 1523275335683, 1549439602, 1519710164239
  Technology:    1518770660439, 1461749076, 1498050694836, 1504384308, 1551434678
  Business:      1497366216548, 1454165205029, 1521737604782, 1560179406, 1551836522
  People/Team:   1573496359142, 1507003211169, 1519085360753, 1573497019940, 1580489944975
  Nature:        1500534407945, 1469474968028, 1506905489134, 1441974537330, 1426604522
  Food:          1546069901, 1567620905, 1414235, 1482049614, 1504674671
  Fashion:       1469334031925, 1506152387, 1488161953, 1515886633, 1529139522
  Health/Fit:    1544367577, 1512290923, 1518611483823, 1498682, 1559757148
  City/Urban:    1480714378702, 1477959858617, 1519501025264, 1486325212991, 1477088790
  Abstract Dark: 1419242902523, 1451187580, 1557683316855, 1542281286, 1534796636
  Interior:      1555041536045, 1600210061050, 1524758369, 1560185, 1556909144
  Product:       1523275335683, 1472851916, 1526170, 1556556984, 1503808

REQUIRED SECTIONS (all must be present, fully coded):
  1. STICKY NAVBAR — logo, nav links, CTA button, mobile hamburger; transparent → frosted glass on scroll
  2. HERO — full viewport, 72-96px display headline, subtext, 2 CTA buttons, visual element (image/animation/3D)
  3. SOCIAL PROOF — logos or stats row (animated counters on scroll: 10,000+ → counts up from 0)
  4. FEATURES/BENEFITS — 3-6 item grid, icon per feature (inline SVG only, no emoji icons), one-liner desc
  5. SHOWCASE — alternating image/text blocks OR masonry gallery with hover effects
  6. TESTIMONIALS — 3 detailed quotes with avatar, name, title, company, star rating
  7. PRICING (if applicable) OR CTA SECTION — bold conversion moment
  8. FAQ — 5-7 questions, smooth accordion open/close with CSS transition
  9. FOOTER — columns: links, social, contact, newsletter form; copyright

REQUIRED ANIMATIONS:
  1. Hero entrance: staggered translateY(40px) → 0 + opacity 0 → 1, each child 100ms delayed
  2. Scroll reveal: IntersectionObserver threshold:0.12, adds 'visible' class → CSS transition fires
  3. Stat counters: count from 0 to target over 1.5s (easeOutExpo curve) when scrolled into view
  4. Navbar glass: window.scrollY > 60 → add class with backdrop-filter: blur(16px) + semi-transparent bg
  5. Button hover: scale(1.04) + box-shadow depth increase + color shift (all in CSS transition)
  6. Card hover: translateY(-6px) + shadow + optional border glow
  7. Ambient hero: 2-3 gradient orbs animating with @keyframes (slow drift, 8-15s loops)
  8. Mobile menu: slide-down with max-height 0 → auto trick via CSS

TYPOGRAPHY PAIRINGS (choose one, match to aesthetic):
  Luxury/Editorial:   'Cormorant Garamond' + 'Jost'           → weights 300,400,700
  Modern/Tech:        'Space Grotesk' + 'Inter'               → weights 400,500,700
  Bold/Agency:        'Bebas Neue' + 'DM Sans'                → weights 400 + 300,400,700
  Futuristic:         'Orbitron' + 'Exo 2'                    → weights 400,700,900
  Minimal/Swiss:      'Syne' + 'Manrope'                      → weights 400,600,800
  Organic/Warm:       'Playfair Display' + 'Lato'             → weights 400,700 + 300,400
  Friendly/Round:     'Nunito' + 'Open Sans'                  → weights 400,600,800
  Editorial/Impact:   'Oswald' + 'Source Serif 4'             → weights 400,700
  Always import via Google Fonts @import in <style> block

═══════════════════════════════════════
CSS EXCELLENCE STANDARDS
═══════════════════════════════════════
MANDATORY CSS ARCHITECTURE:
  :root {
    /* Design tokens — ALL values as variables */
    --color-bg: ...;         /* page background */
    --color-surface: ...;    /* card/panel background */
    --color-border: ...;     /* default border */
    --color-text-primary: ...;
    --color-text-secondary: ...;
    --color-accent: ...;     /* primary brand accent */
    --color-accent-hover: ...;
    --color-accent-2: ...;   /* secondary accent */
    --radius-sm: 6px;
    --radius-md: 12px;
    --radius-lg: 20px;
    --radius-xl: 32px;
    --shadow-sm: ...;
    --shadow-md: ...;
    --shadow-lg: ...;
    --transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    --font-display: '...', sans-serif;
    --font-body: '...', sans-serif;
  }

REQUIRED CSS TECHNIQUES (use all that apply):
  - Custom scrollbar: ::-webkit-scrollbar + ::-webkit-scrollbar-thumb
  - Selection highlight: ::selection { background: var(--color-accent); color: #fff; }
  - Gradient text: background: linear-gradient(...); -webkit-background-clip: text; color: transparent;
  - Glass panels: background: rgba(255,255,255,0.06); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.12);
  - Grain overlay on hero: ::after with SVG noise filter or url("data:image/svg+xml,...") at 3% opacity
  - CSS clip-path for diagonal section dividers
  - CSS grid with named areas for complex layouts
  - @keyframes for: fadeInUp, float, pulse, shimmer, spin, slideIn

MINIMUM 5 UNIQUE @keyframes ANIMATIONS:
  @keyframes fadeInUp { from { opacity:0; transform: translateY(30px); } to { opacity:1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
  + at least 1 custom one specific to the design

RESPONSIVE BREAKPOINTS:
  Mobile first. All layouts mobile by default.
  @media (min-width: 640px)  { /* sm */ }
  @media (min-width: 768px)  { /* md */ }
  @media (min-width: 1024px) { /* lg */ }
  @media (min-width: 1280px) { /* xl */ }

═══════════════════════════════════════
JS EXCELLENCE STANDARDS
═══════════════════════════════════════
CODE QUALITY REQUIREMENTS:
  - Use const/let — never var
  - Arrow functions for callbacks
  - Destructuring for readability
  - Optional chaining (?.) for safe property access
  - Template literals for all string interpolation
  - DOMContentLoaded wrapper for all initialization
  - No global state pollution — use IIFE or module pattern if needed

PERFORMANCE:
  - Debounce resize handlers: let resizeTimer; window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(fn, 150); })
  - IntersectionObserver instead of scroll events for reveal animations
  - requestAnimationFrame for all smooth animations (never CSS transitions on layout properties)
  - Event delegation: document.addEventListener('click', e => { if (e.target.matches('.btn')) {...} })

INTERACTIVITY REQUIREMENTS:
  - All form inputs: validate on blur, show inline error below field (not alert())
  - All modals: Escape key closes, click outside closes, focus trap inside
  - All toasts: slide in from right, auto-dismiss after 3s, click to dismiss early
  - All accordions: CSS max-height transition (not jQuery slideToggle)
  - All dropdowns: close on outside click via document listener

═══════════════════════════════════════
CONTENT EXCELLENCE
═══════════════════════════════════════
Write content that fits the context:
  - Business names: realistic and relevant to the industry (not "Acme Corp")
  - Testimonials: specific names (full first+last), realistic titles, specific praise
  - Stats: believable numbers that make sense for the business stage
  - Pricing: researched price points for the industry, not round numbers
  - Feature descriptions: concrete benefits, not vague platitudes
  - CTA copy: action-oriented, specific (not just "Learn More" or "Click Here")
  - Error messages: helpful and human (not "Error 404" or "Invalid input")

ICON STRATEGY:
  - Always use inline SVG — never emoji as primary icons
  - Consistent stroke width (1.5px or 2px) across all icons
  - Icons sized 20-24px in body, 32-48px for feature cards
  - Use simple geometric shapes (no external icon libraries needed for basic icons)

═══════════════════════════════════════
OUTPUT DENSITY MANDATE
═══════════════════════════════════════
You have a MASSIVE output budget. NEVER produce thin, half-built output.

MINIMUM LINE COUNTS:
  Landing Page:  900+ lines (every section complete, every animation coded)
  SaaS/App:      1000+ lines (all 4 views, all modals, all states, seed data)
  Game:          800+ lines (game loop, particles, sound, 3 screens, mobile controls)
  Tool:          600+ lines (full logic, history, keyboard, export, share)

DENSITY CHECKLIST — before finishing, verify:
  ✅ Every section has unique visual treatment (no two sections look the same)
  ✅ At least 8 distinct hover/interaction states across the page
  ✅ At least 5 @keyframe animations defined and used
  ✅ Mobile layout tested at 375px (mentally trace through the breakpoints)
  ✅ All buttons have hover + active + focus states
  ✅ Forms have validation (not just HTML5 required attr)
  ✅ No placeholder or "coming soon" content anywhere
  ✅ Content is specific, realistic, and contextually appropriate
  ✅ Design is cohesive — one aesthetic direction executed consistently

═══════════════════════════════════════
QUALITY FINAL CHECK
═══════════════════════════════════════
Every output must be ALL of these:
  → Actually functional — every interaction works without errors
  → Visually extraordinary — someone would genuinely be impressed
  → Fully responsive — flawless from 375px to 1440px
  → Complete — no half-finished sections, no TODOs in comments
  → Contextually appropriate — fits the user's industry and audience
  → 2025-quality — modern patterns, current aesthetics, not dated

Think: "Would a senior engineer at a top design agency be proud to ship this?"
If not — add more. Polish more. Make it better.`;

// ═══════════════════════════════════════════════════════════════════════════════
// SUMMARY PROMPT — ADVANCED
// ═══════════════════════════════════════════════════════════════════════════════

const SUMMARY_SYSTEM_PROMPT = `You are Alsytes — a friendly AI website builder. You just finished generating a complete website or web app for the user.

Write a friendly, enthusiastic summary in casual Bahasa Indonesia mixed with English tech terms (like a developer naturally speaks in Indonesia). Be specific about what was actually built.

FORMAT:
1. Opening excited line (e.g. "Selesai! Website-nya udah jadi nih! 🎉")
2. One sentence: type + concept
3. **Yang udah dibikin:** — bullet list of ALL main features, sections, or game mechanics (pakai emoji setiap bullet)
4. **Cara pakainya:** — brief usage tips (especially for games/apps)
5. **Tech notes:** (if relevant) — e.g. "Data tersimpan di localStorage", "Skor otomatis kesimpan"
6. Closing encouragement (1 line)

RULES:
- Be specific — base the response on what was ACTUALLY in the generated code
- Emoji-heavy: ✅ 🎮 💾 🔧 📊 🎨 🚀 ⚡ etc.
- Short bullets (max 1 line each)
- Total: 150-250 words
- NO markdown headers with # — use **bold** for section titles only`;

// ═══════════════════════════════════════════════════════════════════════════════
// EDIT SYSTEM PROMPT — ADVANCED
// ═══════════════════════════════════════════════════════════════════════════════

export const EDIT_SYSTEM_PROMPT = `You are Alsytes — an elite frontend engineer specializing in precise, high-quality edits to existing HTML websites.

Your task: receive an existing HTML file + edit request → return the COMPLETE updated HTML.

STRICT OUTPUT RULES:
1. Return ONLY raw HTML code — no explanations, no markdown fences
2. Output MUST start with <!DOCTYPE html> and end with </html>
3. Return the ENTIRE file, not just changed sections
4. Preserve everything not explicitly requested to change

EDIT QUALITY RULES:
- Match the existing design language exactly (same fonts, same color variables, same border-radius)
- If adding new sections/components, use the same CSS variable tokens already defined in :root
- If adding new JS, use the same code style and patterns already in the file
- Never downgrade quality — the edit should feel seamless, indistinguishable from the original
- Maintain mobile responsiveness after every change
- Never break existing functionality

USER INTENT RULES:
- "change X to Y" → change only that, preserve everything else
- "add X" → add it in the most contextually appropriate location
- "fix X" → fix the issue, root cause, not just the symptom
- "make it more X" → apply the aesthetic quality throughout, not just one element
- If the request is ambiguous, make the most useful interpretation`;

// ═══════════════════════════════════════════════════════════════════════════════
// SURGICAL EDIT PROMPT
// ═══════════════════════════════════════════════════════════════════════════════

export const SURGICAL_EDIT_SYSTEM_PROMPT = `You are a surgical HTML editor. Produce targeted patches for an existing HTML file.

Return ONLY NDJSON — one JSON object per line, no blank lines, no other text.

Each line must be valid JSON with exactly these keys:
{"description":"Short human description","search":"exact_substring_to_find","replace":"replacement_string"}

CRITICAL RULES:
1. Return NOTHING except NDJSON patch lines
2. "search" MUST be verbatim text copied from the HTML (exact whitespace, newlines, indentation)
3. "search" must be unique in the file — include enough context (minimum 80 chars)
4. "replace" is the complete replacement for that exact "search" substring
5. Minimum patches needed — don't split what can be one patch
6. Keep patches focused (200-800 chars each)
7. Patches applied in order top-to-bottom
8. NEVER patch a range that overlaps with another patch`;

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  pricePerCredit: number;
  badge?: string;
  badgeColor?: string;
  target: string;
  highlight: boolean;
}

export interface StreamCallbacks {
  onChunk: (chunk: string) => void;
  onDone: (fullText: string) => void;
  onError: (error: string) => void;
}

export interface EditPatch {
  description: string;
  search: string;
  replace: string;
}

export interface SurgicalEditCallbacks {
  onPatch: (patch: EditPatch, updatedCode: string, success: boolean) => void;
  onChunk: (rawChunk: string) => void;
  onDone: (finalCode: string, patchCount: number) => void;
  onError: (err: string) => void;
}

// ═══════════════════════════════════════════════════════════════════════════════
// GEMINI / GEMMA API LAYER
// ═══════════════════════════════════════════════════════════════════════════════

const GEMMA_BASE = 'https://generativelanguage.googleapis.com/v1beta';
const MAX_CONTINUATIONS = 2; // increased from 1

// ─── HTML completeness check ─────────────────────────────────────────────────

function isHtmlComplete(html: string): boolean {
  const trimmed = html.trimEnd().toLowerCase();
  return trimmed.endsWith('</html>');
}

// ─── Strip markdown fences ────────────────────────────────────────────────────

function stripFences(text: string): string {
  const t = text.trim();
  if (t.startsWith('```')) {
    return t.replace(/^```(?:html)?\n?/, '').replace(/\n?```$/, '');
  }
  return t;
}

// ─── Safety net: strip thinking leak before <!DOCTYPE html> ──────────────────

function stripToDoctype(text: string): string {
  const idx = text.indexOf('<!DOCTYPE');
  if (idx > 0) return text.slice(idx);
  const htmlIdx = text.indexOf('<html');
  if (htmlIdx > 0) return text.slice(htmlIdx);
  return text;
}

// ─── Convert messages to Gemma native payload ────────────────────────────────

function toGemmaPayload(
  messages: Array<{ role: string; content: string }>,
  temperature: number,
  maxOutputTokens: number
) {
  const systemMsg = messages.find((m) => m.role === 'system');
  const chatMsgs = messages.filter((m) => m.role !== 'system');

  const contents = chatMsgs.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  return {
    ...(systemMsg
      ? { system_instruction: { parts: [{ text: systemMsg.content }] } }
      : {}),
    contents,
    generationConfig: {
      temperature,
      maxOutputTokens,
    },
  };
}

// ─── Extract non-thought text delta from Gemma SSE chunk ─────────────────────

function extractGemmaDelta(jsonStr: string): string {
  try {
    const json = JSON.parse(jsonStr);
    const parts = json?.candidates?.[0]?.content?.parts;
    if (!Array.isArray(parts)) return '';
    return parts
      .filter((p: { thought?: boolean }) => !p.thought)
      .map((p: { text?: string }) => p.text ?? '')
      .join('');
  } catch {
    return '';
  }
}

// ─── Core streaming call ──────────────────────────────────────────────────────

async function streamOnce(
  effectiveKey: string,
  messages: Array<{ role: string; content: string }>,
  temperature: number,
  onChunk: (chunk: string) => void,
  maxOutputTokens = 32000
): Promise<string> {
  const url =
    `${GEMMA_BASE}/models/${ENV.model}:streamGenerateContent` +
    `?key=${effectiveKey}&alt=sse`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toGemmaPayload(messages, temperature, maxOutputTokens)),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API Error ${response.status}: ${errText}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body received');

  const decoder = new TextDecoder();
  let fullText = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed === 'data: [DONE]') continue;
      if (!trimmed.startsWith('data: ')) continue;

      const delta = extractGemmaDelta(trimmed.slice(6));
      if (delta) {
        fullText += delta;
        onChunk(delta);
      }
    }
  }

  return fullText;
}

// ─── Resolve API key ──────────────────────────────────────────────────────────

function resolveKey(apiKey: string | undefined): string {
  return ENV.apiKey ?? apiKey ?? localStorage.getItem('alsytes_gemma_key') ?? '';
}

// ═══════════════════════════════════════════════════════════════════════════════
// PUBLIC API
// ═══════════════════════════════════════════════════════════════════════════════

// ─── generateWebsite ──────────────────────────────────────────────────────────

export async function generateWebsite(
  apiKey: string | undefined,
  userPrompt: string,
  callbacks: StreamCallbacks
): Promise<void> {
  const { onChunk, onDone, onError } = callbacks;

  const effectiveKey = resolveKey(apiKey);
  if (!effectiveKey) {
    onError('No API key found. Set VITE_GEMINI_API_KEY in your .env or enter it manually. Get a free key at ai.google.dev');
    return;
  }

  try {
    const initialMessages: Array<{ role: string; content: string }> = [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: buildGenerationPrompt(userPrompt),
      },
    ];

    let accumulated = await streamOnce(effectiveKey, initialMessages, 0.85, onChunk, 16000);
    let cleanedCode = stripFences(accumulated);

    let attempts = 0;
    while (!isHtmlComplete(cleanedCode) && attempts < MAX_CONTINUATIONS) {
      attempts++;

      const continuationMessages: Array<{ role: string; content: string }> = [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildGenerationPrompt(userPrompt) },
        { role: 'assistant', content: cleanedCode },
        {
          role: 'user',
          content:
            `Your response was cut off before the HTML was complete. ` +
            `Continue EXACTLY from the last character — do NOT repeat any code. ` +
            `The final characters of your last response were: "${cleanedCode.slice(-120)}" ` +
            `Continue from there and end properly with </body></html>.`,
        },
      ];

      const continuation = await streamOnce(effectiveKey, continuationMessages, 0.5, onChunk, 16000);
      cleanedCode = stripFences(cleanedCode + continuation);
    }

    onDone(stripToDoctype(cleanedCode));
  } catch (err) {
    onError(err instanceof Error ? err.message : 'Unknown error occurred');
  }
}

function buildGenerationPrompt(userPrompt: string): string {
  const styleSignals = extractStyleSignals(userPrompt);
  const styleBlock = styleSignals.length > 0
    ? `━━━ USER STYLE PREFERENCES DETECTED ━━━\n` +
      `The user\'s prompt contains explicit style signals. Honor ALL of these:\n` +
      styleSignals.map(s => `  → ${s}`).join('\n') + '\n' +
      `These override your default aesthetic choices — execute them at the highest possible quality.\n\n`
    : '';

  return (
    `Build a complete, fully functional, visually extraordinary website or web app based on this description:\n\n` +
    `"${userPrompt}"\n\n` +
    styleBlock +
    `━━━ GENERATION PROCESS ━━━\n\n` +
    `STEP 1 — CLASSIFY: Identify which mode (Game / SaaS+App / Tool / Landing Page)\n` +
    `STEP 2 — SCAN STYLE SIGNALS: Check the prompt for color, font, mood, vibe, or reference site mentions\n` +
    `STEP 3 — LOCK AESTHETIC: If user gave style signals → honor them fully. If not → choose a bold distinct direction (NEVER generic purple-on-white)\n` +
    `STEP 4 — PLAN: Mentally outline all sections/views/screens before writing a single line\n` +
    `STEP 5 — BUILD: Write dense, production-quality code using the full output budget\n\n` +
    `MODE-SPECIFIC REMINDERS:\n` +
    `• Game → working rAF game loop, 3+ screens, particle system, Web Audio SFX, mobile touch controls\n` +
    `• SaaS/App → 4 complete views, full CRUD with localStorage, toast notifications, empty states, seed data\n` +
    `• Tool → 100% functional logic, real math/algorithms, clipboard copy, history panel, keyboard shortcuts\n` +
    `• Landing → all 9 sections, IntersectionObserver scroll reveal, animated counters, accordion FAQ\n\n` +
    `OUTPUT REQUIREMENTS:\n` +
    `• MUST start with <!DOCTYPE html> and end with </html>\n` +
    `• MUST import Google Fonts via @import in <style>\n` +
    `• MUST define all design tokens as CSS custom properties in :root\n` +
    `• MUST include minimum 5 distinct @keyframe animations\n` +
    `• MUST be fully responsive (375px mobile → 1440px desktop)\n` +
    `• NEVER use Lorem Ipsum — every word must be real and contextually appropriate\n` +
    `• NEVER use emoji as UI icons — use inline SVG paths\n` +
    `• DO NOT stop early or truncate — use the full output budget\n` +
    `• DO NOT include any text before <!DOCTYPE html> or after </html>\n\n` +
    `Return ONLY the raw HTML, starting NOW with <!DOCTYPE html>.`
  );
}

/**
 * Scans the user prompt for explicit style/design signals and returns
 * a list of human-readable instructions for the model to follow.
 */
function extractStyleSignals(prompt: string): string[] {
  const signals: string[] = [];
  const p = prompt.toLowerCase();

  // ── Named colors ────────────────────────────────────────────────────────────
  const colorMap: Record<string, string> = {
    'merah': 'COLOR: Red-based palette — primary #DC2626, build a full sophisticated palette around it',
    'biru': 'COLOR: Blue-based palette — primary #2563EB, build a full sophisticated palette around it',
    'hijau': 'COLOR: Green-based palette — primary #16A34A, build a full sophisticated palette around it',
    'kuning': 'COLOR: Amber/yellow palette — primary #D97706, build a full sophisticated palette around it',
    'orange': 'COLOR: Orange palette — primary #EA580C, build a full sophisticated palette around it',
    'ungu': 'COLOR: Purple palette — primary #7C3AED, build a full sophisticated palette around it',
    'pink': 'COLOR: Pink/rose palette — primary #DB2777, build a full sophisticated palette around it',
    'hitam': 'COLOR: Black-dominant — deep dark background, light text, minimal accent color only',
    'putih': 'COLOR: White-dominant — clean bright background, dark text, subtle accent',
    'gold': 'COLOR: Gold/luxury palette — primary #B8860B, pair with black or deep navy',
    'navy': 'COLOR: Navy blue — primary #1E3A5F, professional and authoritative',
    'tosca': 'COLOR: Teal/tosca — primary #0D9488, fresh and modern',
    'coklat': 'COLOR: Brown/earth tones — primary #92400E, warm organic palette',
    'abu': 'COLOR: Gray/slate palette — sophisticated neutral tones, one accent color',
  };
  for (const [kw, instruction] of Object.entries(colorMap)) {
    if (p.includes(kw) || p.includes(`warna ${kw}`) || p.includes(`color ${kw}`)) {
      signals.push(instruction);
    }
  }

  // ── Exact hex values in prompt ─────────────────────────────────────────────
  const hexMatches = prompt.match(/#[0-9A-Fa-f]{6}\b/g);
  if (hexMatches) {
    signals.push(`COLOR: Use these exact hex values as accent/primary colors: ${hexMatches.join(', ')}`);
  }

  // ── Named fonts ────────────────────────────────────────────────────────────
  const fontPattern = /(?:font|typeface|pakai font|gunakan font|use font)\s+([A-Z][a-zA-Z\s]{2,30?})(?=\s|,|\.|$)/gi;
  const fontMatches = [...prompt.matchAll(fontPattern)];
  for (const match of fontMatches) {
    const fontName = match[1].trim();
    signals.push(`FONT: Use "${fontName}" as the primary display/heading font (import via Google Fonts); pick the best complementary body font`);
  }

  // ── Mood / vibe ────────────────────────────────────────────────────────────
  const moodMap: Record<string, string> = {
    'minimalis':   'STYLE: Ultra-minimal — extreme whitespace, max 2-3 colors, no decorative clutter, typography-first design',
    'minimal':     'STYLE: Ultra-minimal — extreme whitespace, max 2-3 colors, no decorative clutter, typography-first design',
    'mewah':       'STYLE: Luxury/premium — Cormorant or Playfair Display, gold/champagne accents, generous spacing, refined thin borders',
    'luxury':      'STYLE: Luxury/premium — Cormorant or Playfair Display, gold/champagne accents, generous spacing, refined thin borders',
    'premium':     'STYLE: Luxury/premium — Cormorant or Playfair Display, gold/champagne accents, generous spacing, refined thin borders',
    'fun':         'STYLE: Playful/fun — Nunito or Fredoka One, saturated multi-color palette, bubbly rounded shapes, bouncy CSS animations',
    'playful':     'STYLE: Playful/fun — Nunito or Fredoka One, saturated multi-color palette, bubbly rounded shapes, bouncy CSS animations',
    'lucu':        'STYLE: Playful/fun — Nunito or Fredoka One, saturated multi-color palette, bubbly rounded shapes, bouncy CSS animations',
    'profesional': 'STYLE: Professional/corporate — clean grid, navy/slate palette, conservative formal typography, trust-building layout',
    'corporate':   'STYLE: Professional/corporate — clean grid, navy/slate palette, conservative formal typography, trust-building layout',
    'dark':        'STYLE: Dark theme — background #080B14 to #0D1117, light text, neon/electric accent, glow effects on key elements',
    'gelap':       'STYLE: Dark theme — background #080B14 to #0D1117, light text, neon/electric accent, glow effects on key elements',
    'bold':        'STYLE: Bold/strong — font-weight 800-900, high contrast, large-scale type, powerful visual hierarchy',
    'modern':      'STYLE: Modern/contemporary — geometric sans-serif, sharp angles, asymmetric layout, fresh 2025 web aesthetics',
    'futuristic':  'STYLE: Futuristic/sci-fi — Orbitron or Exo 2, neon accents, grid lines, glitch effects, deep dark background',
    'vintage':     'STYLE: Vintage — warm sepia tones, serif typography, aged textures, nostalgic feel',
    'retro':       'STYLE: Retro — pixel aesthetics or 80s neon, VT323 or Press Start 2P font, CRT scanline effects',
    'elegant':     'STYLE: Elegant — refined spacing, thin elegant type, muted palette with one luxurious accent, ultra-smooth transitions',
    'colorful':    'STYLE: Colorful — vibrant multi-color palette, each section with distinct accent, high energy',
    'clean':       'STYLE: Clean — minimal visual noise, generous whitespace, one accent color, crystal clear hierarchy',
    'rounded':     'STYLE: Rounded corners everywhere — border-radius 16-24px on cards, pill buttons (border-radius: 999px)',
    'kawaii':      'STYLE: Kawaii/cute — pastel palette, Nunito font, soft rounded everything, small heart/star decorative elements',
    'brutalist':   'STYLE: Brutalist — heavy black borders, stark contrast, raw asymmetric layout, Bebas Neue or mono font, zero decorative softness',
    'glassmorphism':'STYLE: Glassmorphism — frosted glass panels (backdrop-filter: blur), semi-transparent surfaces, gradient backgrounds behind glass',
  };
  for (const [kw, instruction] of Object.entries(moodMap)) {
    if (p.includes(kw)) {
      signals.push(instruction);
    }
  }

  // ── Reference brands/sites ─────────────────────────────────────────────────
  const brandMap: Record<string, string> = {
    'apple':      'REFERENCE Apple.com: ultra-minimal, extreme whitespace, product-hero photography, SF-style clean sans-serif, white dominant with one black accent',
    'notion':     'REFERENCE Notion: soft gray background (#F7F6F3), neutral sans-serif, dense information layout, subtle borders, calm productivity',
    'stripe':     'REFERENCE Stripe: indigo/slate tech palette, clean fintech typography, gradient hero, polished professional trust-building design',
    'airbnb':     'REFERENCE Airbnb: warm coral accent (#FF385C), friendly rounded typography, photography-forward, soft approachable UI',
    'vercel':     'REFERENCE Vercel: pure black/white, monospace elements, stark developer aesthetic, no-nonsense bold typography',
    'figma':      'REFERENCE Figma: vibrant multi-color (purple/green/red/blue), playful yet professional, strong confident brand',
    'linear':     'REFERENCE Linear: dark sophisticated (#0F0F10), purple accent, crisp sans-serif, premium SaaS feel, smooth micro-animations',
    'framer':     'REFERENCE Framer: dark aesthetic, bold gradients, playful motion-forward design, creative agency energy',
    'spotify':    'REFERENCE Spotify: pure black background (#121212), neon green accent (#1DB954), card-based layout, music/entertainment feel',
    'netflix':    'REFERENCE Netflix: pure black background, bold red accent (#E50914), cinematic dark feel, large imagery, high contrast',
    'tokopedia':  'REFERENCE Tokopedia: green accent (#03AC0E), clean e-commerce layout, trust-focused, familiar Indonesian marketplace feel',
    'gojek':      'REFERENCE Gojek: green (#00AA13), friendly rounded typography, approachable super-app design, Indonesian-market optimized',
    'tiktok':     'REFERENCE TikTok: pure black, neon pink + cyan duotone, bold type, video-forward, Gen-Z energy',
    'twitter':    'REFERENCE Twitter/X: clean black or white, blue accent (#1D9BF0), minimal chrome, content-first layout',
    'discord':    'REFERENCE Discord: dark #313338 background, blurple accent (#5865F2), gaming community feel, rounded UI elements',
  };
  for (const [kw, instruction] of Object.entries(brandMap)) {
    if (p.includes(kw)) {
      signals.push(`REFERENCE: ${instruction}`);
    }
  }

  // ── Behavioral overrides ───────────────────────────────────────────────────
  if (p.includes('tanpa animasi') || p.includes('no animation') || p.includes('jangan animasi') || p.includes('without animation')) {
    signals.push('BEHAVIOR: No entrance animations. Only functional transitions (hover states, modal open/close). Remove all scroll-triggered and ambient animations.');
  }
  if (p.includes('light mode') || p.includes('mode terang') || p.includes('tema terang') || p.includes('bright')) {
    signals.push('THEME: Light mode — white/off-white background, dark text, avoid dark panels');
  }
  if (p.includes('sharp corner') || p.includes('no rounded') || p.includes('tanpa rounded') || p.includes('sudut kotak') || p.includes('kotak saja')) {
    signals.push('SHAPE: Sharp corners throughout — border-radius: 0 or max 2px. No pill buttons, no rounded cards.');
  }
  if (p.includes('gradient') || p.includes('gradasi')) {
    signals.push('VISUAL: Use gradients prominently — gradient text on headlines, gradient backgrounds on hero and CTAs, gradient card borders');
  }
  if (p.includes('flat design') || p.includes('flat UI') || p.includes('no shadow') || p.includes('tanpa shadow')) {
    signals.push('VISUAL: Flat design — zero drop shadows, zero gradients, solid colors only, border-based depth and separation');
  }
  if (p.includes('neumorphism') || p.includes('neumorph')) {
    signals.push('VISUAL: Neumorphism — soft same-colored shadows on light background, extruded/inset button effects, monochromatic palette');
  }

  return signals;
}

// ─── generateWebsiteSummary ───────────────────────────────────────────────────

export async function generateWebsiteSummary(
  apiKey: string | undefined,
  userPrompt: string,
  generatedHtml: string,
  callbacks: StreamCallbacks
): Promise<void> {
  const { onChunk, onDone, onError } = callbacks;

  const effectiveKey = resolveKey(apiKey);
  if (!effectiveKey) {
    onError('No API key');
    return;
  }

  try {
    // Take a strategic sample: start + middle + end (more informative than just start)
    const htmlLen = generatedHtml.length;
    const htmlPreview =
      generatedHtml.slice(0, 3000) +
      (htmlLen > 6000 ? '\n...\n' + generatedHtml.slice(Math.floor(htmlLen / 2), Math.floor(htmlLen / 2) + 2000) : '') +
      (htmlLen > 4000 ? '\n...\n' + generatedHtml.slice(-2000) : '');

    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: SUMMARY_SYSTEM_PROMPT },
      {
        role: 'user',
        content:
          `User request: "${userPrompt}"\n\n` +
          `Generated HTML (excerpts from start, middle, end):\n\`\`\`html\n${htmlPreview}\n\`\`\`\n\n` +
          `Write the summary based on what was actually built.`,
      },
    ];

    const fullText = await streamOnce(effectiveKey, messages, 0.75, onChunk, 1000);
    onDone(fullText);
  } catch (err) {
    onError(err instanceof Error ? err.message : 'Summary generation failed');
  }
}

// ─── editWebsite (full rewrite edit) ─────────────────────────────────────────

export async function editWebsite(
  apiKey: string | undefined,
  currentSourceCode: string,
  editPrompt: string,
  callbacks: StreamCallbacks
): Promise<void> {
  const { onChunk, onDone, onError } = callbacks;

  const effectiveKey = resolveKey(apiKey);
  if (!effectiveKey) {
    onError('No API key found. Set VITE_GEMINI_API_KEY in your .env or enter it manually. Get a free key at ai.google.dev');
    return;
  }

  try {
    const initialMessages: Array<{ role: string; content: string }> = [
      { role: 'system', content: EDIT_SYSTEM_PROMPT },
      {
        role: 'user',
        content: buildEditPrompt(currentSourceCode, editPrompt),
      },
    ];

    let accumulated = await streamOnce(effectiveKey, initialMessages, 0.7, onChunk, 16000);
    let cleanedCode = stripFences(accumulated);

    let attempts = 0;
    while (!isHtmlComplete(cleanedCode) && attempts < MAX_CONTINUATIONS) {
      attempts++;

      const continuationMessages: Array<{ role: string; content: string }> = [
        { role: 'system', content: EDIT_SYSTEM_PROMPT },
        { role: 'user', content: buildEditPrompt(currentSourceCode, editPrompt) },
        { role: 'assistant', content: cleanedCode },
        {
          role: 'user',
          content:
            `Your response was cut off. Continue EXACTLY from: "${cleanedCode.slice(-120)}" ` +
            `Do NOT repeat code. End with </body></html>.`,
        },
      ];

      const continuation = await streamOnce(effectiveKey, continuationMessages, 0.4, onChunk, 16000);
      cleanedCode = stripFences(cleanedCode + continuation);
    }

    onDone(stripToDoctype(cleanedCode));
  } catch (err) {
    onError(err instanceof Error ? err.message : 'Unknown error occurred');
  }
}

function buildEditPrompt(currentSourceCode: string, editPrompt: string): string {
  return (
    `Here is the current HTML website to edit:\n\n${currentSourceCode}\n\n` +
    `━━━ EDIT REQUEST ━━━\n${editPrompt}\n\n` +
    `━━━ EDIT RULES ━━━\n` +
    `• Preserve all existing CSS variables, fonts, and design tokens\n` +
    `• New elements must match existing design language exactly\n` +
    `• Preserve all existing functionality unless asked to change it\n` +
    `• Keep all existing animations and interactions intact\n` +
    `• Output MUST be a complete HTML document ending with </body></html>\n` +
    `• Return ONLY the complete updated HTML starting with <!DOCTYPE html>.`
  );
}

// ─── surgicalEditWebsite ──────────────────────────────────────────────────────

export async function surgicalEditWebsite(
  apiKey: string | undefined,
  currentSourceCode: string,
  editPrompt: string,
  callbacks: SurgicalEditCallbacks
): Promise<void> {
  const { onPatch, onChunk, onDone, onError } = callbacks;

  const effectiveKey = resolveKey(apiKey);
  if (!effectiveKey) {
    onError('No API key found. Set VITE_GEMINI_API_KEY in your .env or enter it manually. Get a free key at ai.google.dev');
    return;
  }

  function applyPatch(code: string, patch: EditPatch): { code: string; success: boolean } {
    // Exact match
    if (code.includes(patch.search)) {
      return { code: code.replace(patch.search, patch.replace), success: true };
    }
    // Normalize line endings
    const normalised = patch.search.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    if (code.includes(normalised)) {
      return { code: code.replace(normalised, patch.replace), success: true };
    }
    // Trimmed fuzzy match (last resort)
    const trimmed = patch.search.trim();
    if (trimmed.length >= 40) {
      const idx = code.indexOf(trimmed);
      if (idx !== -1) {
        return {
          code: code.slice(0, idx) + patch.replace + code.slice(idx + trimmed.length),
          success: true,
        };
      }
    }
    return { code, success: false };
  }

  try {
    const surgicalMessages: Array<{ role: string; content: string }> = [
      { role: 'system', content: SURGICAL_EDIT_SYSTEM_PROMPT },
      {
        role: 'user',
        content:
          `HTML file to edit:\n\`\`\`html\n${currentSourceCode}\n\`\`\`\n\n` +
          `Edit instructions: ${editPrompt}\n\n` +
          `Respond with ONLY NDJSON patch lines. ` +
          `Each line: {"description":"...","search":"exact_verbatim_html_substring","replace":"replacement"}`,
      },
    ];

    let lineBuffer = '';
    let currentCode = currentSourceCode;
    let patchCount = 0;

    await streamOnce(
      effectiveKey,
      surgicalMessages,
      0.2,
      (delta) => {
        onChunk(delta);
        lineBuffer += delta;

        let nlIdx: number;
        while ((nlIdx = lineBuffer.indexOf('\n')) !== -1) {
          const completeLine = lineBuffer.slice(0, nlIdx).trim();
          lineBuffer = lineBuffer.slice(nlIdx + 1);
          if (!completeLine) continue;

          try {
            const patch = JSON.parse(completeLine) as EditPatch;
            if (
              !patch.description ||
              typeof patch.search !== 'string' ||
              typeof patch.replace !== 'string'
            ) continue;

            const result = applyPatch(currentCode, patch);
            if (result.success) {
              currentCode = result.code;
              patchCount++;
            }
            onPatch(patch, currentCode, result.success);
          } catch {
            // Not valid JSON yet — skip
          }
        }
      },
      8000
    );

    // Process remaining buffer
    const remaining = lineBuffer.trim();
    if (remaining) {
      try {
        const patch = JSON.parse(remaining) as EditPatch;
        if (
          patch.description &&
          typeof patch.search === 'string' &&
          typeof patch.replace === 'string'
        ) {
          const result = applyPatch(currentCode, patch);
          if (result.success) {
            currentCode = result.code;
            patchCount++;
          }
          onPatch(patch, currentCode, result.success);
        }
      } catch { /* ignore */ }
    }

    // Fallback to full rewrite if no patches applied
    if (patchCount === 0) {
      await editWebsite(apiKey, currentSourceCode, editPrompt, {
        onChunk,
        onDone: (code) => onDone(code, 0),
        onError,
      });
      return;
    }

    onDone(currentCode, patchCount);
  } catch (err) {
    try {
      await editWebsite(apiKey, currentSourceCode, editPrompt, {
        onChunk,
        onDone: (code) => onDone(code, 0),
        onError,
      });
    } catch {
      onError(err instanceof Error ? err.message : 'Unknown error occurred');
    }
  }
}

// ─── extractWebsiteName ───────────────────────────────────────────────────────

export function extractWebsiteName(prompt: string): string {
  const words = prompt
    .split(/\s+/)
    .filter((w: string) => w.length > 3)
    .slice(0, 4)
    .map((w: string) => w.replace(/[^a-zA-Z0-9]/g, ''))
    .filter(Boolean);

  if (words.length === 0) return 'Untitled Website';

  const name = words
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

  return name.length > 40 ? name.slice(0, 40) + '…' : name;
}