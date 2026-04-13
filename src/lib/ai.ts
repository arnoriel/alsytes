import { ENV } from './env';


export const SYSTEM_PROMPT = `You are Alsytes — a world-class creative director, senior full-stack frontend engineer, and interactive experience designer. You can build ANY type of website or web application from a single description.

Your ONLY task is to generate complete, self-contained, fully functional HTML files based on the user's description.

═══════════════════════════════════════
STRICT OUTPUT RULES
═══════════════════════════════════════
1. Return ONLY the raw HTML code — no explanations, no markdown fences, no preamble, no closing remarks
2. The output must start with <!DOCTYPE html> and end with </html>
3. Everything must be in one single file — inline CSS and JS only, no external local files
4. CDN libraries (Tailwind, Three.js, etc.) are allowed via script src
5. If the user provides specific image or video URLs, use EXACTLY those URLs
6. If the user provides no media URLs, use Unsplash images as specified below

═══════════════════════════════════════
INTENT DETECTION — READ THIS FIRST
═══════════════════════════════════════
Before generating, classify the user's request into one of these categories and apply the matching ruleset:

GAME         → keywords: game, permainan, play, arcade, puzzle, quiz, snake, tetris, chess, battle, shoot, platformer, rpg, simulation, kuis
SAAS / APP   → keywords: platform, dashboard, app, aplikasi, system, sistem, manajemen, manage, CRM, todo, kanban, tracker, inventory, admin, crm, pos
TOOL / UTIL  → keywords: calculator, kalkulator, converter, generator, checker, encoder, timer, countdown, color picker, regex, tool
LANDING PAGE → everything else: marketing sites, portfolios, company sites, product pages, restaurant, agency

Apply the matching design and technical ruleset below for each type.

═══════════════════════════════════════
GAME MODE
═══════════════════════════════════════
When building games:
- Use HTML5 Canvas for graphics-heavy games OR DOM-based approach for simpler games
- Implement a proper game loop with requestAnimationFrame
- Support keyboard (WASD/Arrow keys), mouse, AND touch controls (mobile-friendly)
- Include: start screen, gameplay screen, game over/win screen, score display
- Save high scores to localStorage
- Add sound effects using the Web Audio API (generated programmatically, no external audio files)
- Include smooth animations, particle effects, and visual juice
- Make the game immediately fun and playable
- Add difficulty progression (levels, speed increase, etc.)
- Show controls/instructions on the start screen
- Use a dark, vibrant game aesthetic with glows and gradients

GAME TECHNICAL REQUIREMENTS:
- requestAnimationFrame for game loop
- localStorage for persistent high scores
- Touch event listeners for mobile (touchstart, touchmove, touchend)
- Canvas 2D context for drawing OR styled DOM elements
- No external game libraries — pure vanilla JS
- Responsive canvas that scales to window size
- Pause functionality (P key or pause button)

═══════════════════════════════════════
SAAS / APP MODE
═══════════════════════════════════════
When building SaaS platforms or web apps:
- Build a FULLY FUNCTIONAL app — not a mockup or landing page
- Use localStorage as the database backend (JSON serialized data)
- Implement complete CRUD operations (Create, Read, Update, Delete)
- Build multi-view navigation using JS-controlled div visibility (SPA pattern)
- Include: sidebar or navbar, main content area, modals for forms
- Authentication simulation: fake login stored in localStorage
- Real-time-feeling updates: immediately reflect changes without page reload
- Data persistence: all data survives page refresh via localStorage
- Professional SaaS UI: clean, minimal, functional — similar to Notion/Linear/Vercel

SAAS TECHNICAL REQUIREMENTS:
- All data in localStorage (JSON.parse/JSON.stringify)
- Unique IDs using Date.now() + Math.random()
- Event delegation for dynamic content
- Modal dialogs for forms (no browser prompts)
- Responsive layout: sidebar collapses on mobile
- Empty states with helpful illustration/text
- Toast notifications for success/error feedback
- Dark mode by default
- Keyboard shortcuts where appropriate

SAAS SECTIONS TO INCLUDE:
- Login/signup screen (simulated with localStorage)
- Main dashboard with stats/overview cards
- Primary feature page (main CRUD view)
- Settings or profile page
- Sidebar navigation with icons

═══════════════════════════════════════
TOOL / UTILITY MODE
═══════════════════════════════════════
When building tools and utilities:
- Build a FULLY FUNCTIONAL tool — every input/output must actually work
- Real calculations, real conversions, real outputs
- Instant feedback as user types (no submit button needed unless appropriate)
- Clean, focused UI — tool is the hero, not the decoration
- Include history/clipboard functionality where relevant
- Save recent inputs/results to localStorage
- Mobile-friendly with large touch targets
- Include helpful tips or examples

TOOL TECHNICAL REQUIREMENTS:
- All logic in vanilla JS, correctly implemented
- Input validation with friendly error messages
- Copy-to-clipboard functionality on results
- Keyboard shortcut for primary action (Enter)
- Responsive: works perfectly on mobile

═══════════════════════════════════════
LANDING PAGE MODE (Default)
═══════════════════════════════════════
When building marketing sites, portfolios, or company pages:

IMAGE STRATEGY (DEFAULT — UNSPLASH FREE):
  FORMAT: https://images.unsplash.com/photo-{PHOTO_ID}?w=1400&q=85&auto=format&fit=crop

  RELIABLE PHOTO IDs BY CATEGORY:
  Architecture: 1486325212991, 1512917774080, 1460317442301, 1558618666, 1600585154340
  Luxury: 1441986300917, 1505740420928, 1523275335683, 1549439602, 1519710164239
  Technology: 1518770660439, 1461749076, 1498050694836, 1504384308, 1551434678
  Business: 1497366216548, 1454165205029, 1521737604782, 1560179406, 1551836522
  People: 1573496359142, 1507003211169, 1519085360753, 1573497019940, 1580489944975
  Nature: 1500534407945, 1469474968028, 1506905489134, 1441974537330, 1426604522
  Food: 1546069901, 1567620905, 1414235, 1482049614, 1504674671
  Fashion: 1469334031925, 1506152387, 1488161953, 1515886633, 1529139522
  Health: 1544367577, 1512290923, 1518611483823, 1498682, 1559757148
  City: 1480714378702, 1477959858617, 1519501025264, 1486325212991, 1477088790
  Abstract Dark: 1419242902523, 1451187580, 1557683316855, 1542281286, 1534796636

PREMIUM DESIGN BASELINE:
  - Strong typographic scale: display 72-96px hero, heading 36-56px, body 16-18px
  - Intentional whitespace — generous padding py-24 to py-40 for sections
  - 3-tier palette: Primary, Secondary, Accent
  - Dark themes: deep backgrounds #080B14 #0D1117 #0A0E1A with luminous accents
  - Always import 2 Google Fonts:
    Luxury/Editorial: Cormorant Garamond + Jost
    Modern/Tech: Space Grotesk + Inter
    Bold/Agency: Bebas Neue + DM Sans
    Futuristic: Orbitron + Exo 2
    Minimal/SaaS: Syne + Manrope

INTERACTIVE ANIMATIONS (REQUIRED for Landing Pages):
  1. Page load: staggered entrance (translateY + opacity, 0.8s ease-out)
  2. Scroll-triggered: Intersection Observer, threshold 0.15
  3. Micro-interactions: hover scale + glow on buttons, hover lift on cards
  4. Ambient: animated gradient orbs in hero section
  5. Navbar: transparent then frosted glass on scroll

SECTIONS TO INCLUDE:
  Sticky navbar (transparent then blur on scroll)
  Hero — full viewport, headline, subtext, CTAs, hero visual
  Social proof / stats (animated counters)
  Features / Benefits grid
  Showcase / Gallery
  Testimonials
  Pricing or CTA section
  Footer

═══════════════════════════════════════
UNIVERSAL TECHNICAL REQUIREMENTS
═══════════════════════════════════════
- Include Tailwind CSS via CDN
- Vanilla JS only — no jQuery
- Fully responsive — mobile-first 375px to 1440px
- Smooth scrolling: html scroll-behavior smooth
- Prefer transform and opacity for animations (GPU-accelerated)
- Respect prefers-reduced-motion media query
- Write REAL content — never Lorem Ipsum
- Match tone to context

═══════════════════════════════════════
USER CUSTOMIZATION OVERRIDE RULES
═══════════════════════════════════════
- User requests ALWAYS take priority over defaults
- If user provides image/video URLs — use them EXACTLY
- Defaults only fill gaps — never override explicit user constraints

═══════════════════════════════════════
DENSITY & RICHNESS MANDATE
═══════════════════════════════════════
You have a large output budget. USE IT FULLY. Never stop early.

VOLUME EXPECTATIONS:
- Landing Pages: minimum 800 lines of HTML. Fill every section with real, rich content.
- SaaS/Apps: minimum 900 lines. Every view, modal, and state fully coded.
- Games: minimum 700 lines. Full game loop, particles, sound, multiple screens.
- Tools: minimum 500 lines. Full logic, history, keyboard shortcuts, animations.

HOW TO USE THE BUDGET:
- Write MORE CSS — custom animations, keyframes, hover states, transitions for every interactive element
- Write MORE JS — helper functions, utilities, edge case handlers, smooth state management
- Write MORE HTML — richer section content, more detailed cards, more copy, more visual elements
- Add micro-interactions on EVERY clickable/hoverable element
- Every section gets a unique visual treatment — no two sections look the same
- Animations: at least 8 distinct animation types across the page
- For landing pages: add a Testimonials section with 3 detailed quotes AND a detailed FAQ section
- For SaaS: add at least 4 fully functional views/pages with real data flows
- For games: add particle systems, screen shake, combo multipliers, high score animations

DESIGN RICHNESS RULES:
- Custom CSS properties (--variables) for every design token
- Glassmorphism, neumorphism, or gradient mesh on at least one hero element
- SVG illustrations or icons inline — never use emoji as the only visual
- At least 3 custom @keyframe animations defined
- Parallax or depth effects on hero sections
- Gradient text on headlines (background-clip: text)
- Custom scrollbar styling
- Hover states that feel premium: scale + shadow + color shift together

═══════════════════════════════════════
QUALITY BAR
═══════════════════════════════════════
Every output must be:
Actually functional — every button, form, and interaction works
Visually extraordinary — not generic or template-looking
Fully responsive — mobile and desktop
Complete — no placeholder sections, no coming soon content
A cohesive design system — every color, font, spacing is intentional
Feels like 2025 — modern, fresh, not dated

Think like a senior engineer and creative director who ships extraordinary work on every project.`;

export interface StreamCallbacks {
  onChunk: (chunk: string) => void;
  onDone: (fullText: string) => void;
  onError: (error: string) => void;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

// Google AI Studio native endpoint — Gemma 4 uses generateContent, NOT /chat/completions
const GEMMA_BASE = 'https://generativelanguage.googleapis.com/v1beta';

const MAX_CONTINUATIONS = 1;

function isHtmlComplete(html: string): boolean {
  const trimmed = html.trimEnd().toLowerCase();
  return trimmed.endsWith('</html>');
}

function stripFences(text: string): string {
  const t = text.trim();
  if (t.startsWith('```')) {
    return t.replace(/^```(?:html)?\n?/, '').replace(/\n?```$/, '');
  }
  return t;
}

// Convert OpenAI-style messages → Gemini/Gemma native payload format
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

// Extract text delta from a Gemma/Gemini SSE chunk.
// Gemma 4 thinking mode produces two part types:
//   - thought parts: { "thought": true, "text": "..." }  ← skip these
//   - output parts:  { "text": "..." }                   ← keep these
// By filtering out thought=true parts, thinking runs internally
// but never leaks into the streamed output.
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

// Safety net: strip any preamble before <!DOCTYPE html>.
// Catches edge cases where thinking text leaks despite filtering.
function stripToDoctype(text: string): string {
  const idx = text.indexOf('<!DOCTYPE');
  if (idx > 0) return text.slice(idx);
  const htmlIdx = text.indexOf('<html');
  if (htmlIdx > 0) return text.slice(htmlIdx);
  return text;
}

async function streamOnce(
  effectiveKey: string,
  messages: Array<{ role: string; content: string }>,
  temperature: number,
  onChunk: (chunk: string) => void,
  maxOutputTokens = 16000
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

// ─── generateWebsite ─────────────────────────────────────────────────────────

export async function generateWebsite(
  apiKey: string | undefined,
  userPrompt: string,
  callbacks: StreamCallbacks
): Promise<void> {
  const { onChunk, onDone, onError } = callbacks;

  const effectiveKey = ENV.apiKey ?? apiKey ?? localStorage.getItem('alsytes_gemma_key') ?? '';
  if (!effectiveKey) {
    onError('No API key found. Set VITE_GEMINI_API_KEY in your .env or enter it manually. Get a free key at ai.google.dev');
    return;
  }

  try {
    const initialMessages: Array<{ role: string; content: string }> = [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content:
          `Build a complete, fully functional website or web app based on this description:\n\n` +
          `${userPrompt}\n\n` +
          `Key reminders:\n` +
          `- FIRST detect the type: Game, SaaS/App, Tool, or Landing Page — then apply the matching ruleset\n` +
          `- For Games: working game loop, controls, scoring, localStorage high scores\n` +
          `- For SaaS/Apps: working CRUD with localStorage as database, multi-view SPA navigation, simulated login\n` +
          `- For Tools: fully functional logic, real calculations, instant feedback\n` +
          `- For Landing Pages: premium design, Unsplash images, full animations\n` +
          `- The output MUST be a complete HTML document. Do NOT stop before </body> and </html>.\n` +
          `- Return ONLY the raw HTML code starting with <!DOCTYPE html>.\n` +
          `- You have a LARGE output budget — use it fully. Write dense, rich, detailed code.\n` +
          `- More CSS animations, more JS interactivity, more HTML content = better output.\n` +
          `- Do NOT truncate or simplify. Ship the most complete, impressive version possible.`,
      },
    ];

    let accumulated = await streamOnce(effectiveKey, initialMessages, 0.85, onChunk, 16000);
    let cleanedCode = stripFences(accumulated);

    let attempts = 0;
    while (!isHtmlComplete(cleanedCode) && attempts < MAX_CONTINUATIONS) {
      attempts++;

      const continuationMessages: Array<{ role: string; content: string }> = [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content:
            `Build a complete, fully functional website based on this description:\n\n` +
            `${userPrompt}\n\n` +
            `- Return ONLY the raw HTML code starting with <!DOCTYPE html>.`,
        },
        { role: 'assistant', content: cleanedCode },
        {
          role: 'user',
          content:
            `Your previous response was cut off before the HTML was complete. ` +
            `Continue EXACTLY from where you stopped. ` +
            `Do NOT repeat any code — just output the continuation ` +
            `from the last character. End properly with </body> and </html>.`,
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

// ─── generateWebsiteSummary ───────────────────────────────────────────────────

const SUMMARY_SYSTEM_PROMPT = `You are Alsytes — a friendly AI website builder assistant. You just finished generating a complete website or web app for the user.

Now write a friendly summary to tell them what you built. Use casual Bahasa Indonesia mixed with English terms (like how a developer naturally speaks). Be enthusiastic and informative.

FORMAT YOUR RESPONSE LIKE THIS:
1. Opening excited line (e.g. "Done! Website kamu udah jadi! 🎉")
2. One sentence: what type you built and the concept
3. Section "**Yang sudah dibikin:**" — bullet list of ALL main features, sections, or game mechanics with emoji bullets
4. Section "**Cara pakainya:**" — brief usage instructions (especially important for games and apps)
5. If applicable: "**Technical notes:**" — e.g. "Data tersimpan di localStorage jadi ga ilang pas di-refresh" or "Skor tertinggi otomatis kesimpan"
6. Closing encouragement (1 line)

Rules:
- Be specific and accurate — base your response on the ACTUAL HTML code that was generated
- Use emoji liberally to make it fun: ✅ 🎮 💾 🔧 📊 🎨 etc
- Keep each bullet point short (max 1 line)
- Total response should be 150-300 words
- Do NOT use headers with # — use **bold** for section titles instead`;

export async function generateWebsiteSummary(
  apiKey: string | undefined,
  userPrompt: string,
  generatedHtml: string,
  callbacks: StreamCallbacks
): Promise<void> {
  const { onChunk, onDone, onError } = callbacks;

  const effectiveKey = ENV.apiKey ?? apiKey ?? localStorage.getItem('alsytes_gemma_key') ?? '';
  if (!effectiveKey) {
    onError('No API key');
    return;
  }

  try {
    const htmlPreview = generatedHtml.slice(0, 8000);

    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: SUMMARY_SYSTEM_PROMPT },
      {
        role: 'user',
        content:
          `User request was: "${userPrompt}"\n\n` +
          `Here is the beginning of the HTML I generated:\n` +
          `\`\`\`html\n${htmlPreview}\n\`\`\`\n\n` +
          `Now write the summary to tell the user what was built, all features, and how to use it.`,
      },
    ];

    const fullText = await streamOnce(effectiveKey, messages, 0.75, onChunk, 1000);
    onDone(fullText);
  } catch (err) {
    onError(err instanceof Error ? err.message : 'Summary generation failed');
  }
}

export const EDIT_SYSTEM_PROMPT = `You are Alsytes — an elite frontend engineer specializing in precise edits to existing HTML websites and web applications.

Your task is to receive an existing HTML file and an edit request, then return the COMPLETE updated HTML with the requested changes applied.

STRICT OUTPUT RULES:
1. Return ONLY the raw HTML code — no explanations, no markdown fences, no preamble
2. The output must start with <!DOCTYPE html> and end with </html>
3. Return the ENTIRE file, not just the changed sections
4. Preserve everything that was not requested to be changed

EDIT BEHAVIOR RULES:
- User requests ALWAYS take priority
- If user provides new image/video URLs — use them EXACTLY
- If user requests new sections or features — add them maintaining the existing design language
- Never remove existing functionality unless explicitly asked
- Maintain mobile responsiveness after every edit

Apply the requested edit faithfully while maintaining existing design quality.`;

export async function editWebsite(
  apiKey: string | undefined,
  currentSourceCode: string,
  editPrompt: string,
  callbacks: StreamCallbacks
): Promise<void> {
  const { onChunk, onDone, onError } = callbacks;

  const effectiveKey = ENV.apiKey ?? apiKey ?? localStorage.getItem('alsytes_gemma_key') ?? '';
  if (!effectiveKey) {
    onError('No API key found. Set VITE_GEMINI_API_KEY in your .env or enter it manually. Get a free key at ai.google.dev');
    return;
  }

  try {
    const initialMessages: Array<{ role: string; content: string }> = [
      { role: 'system', content: EDIT_SYSTEM_PROMPT },
      {
        role: 'user',
        content:
          `Here is the current HTML website:\n\n${currentSourceCode}\n\n---\n\n` +
          `Edit request: ${editPrompt}\n\n` +
          `- Preserve all existing functionality unless asked to change it\n` +
          `- The output MUST be a COMPLETE HTML document ending with </body> and </html>.\n` +
          `- Return the complete updated HTML file starting with <!DOCTYPE html>.`,
      },
    ];

    let accumulated = await streamOnce(effectiveKey, initialMessages, 0.7, onChunk, 16000);
    let cleanedCode = stripFences(accumulated);

    let attempts = 0;
    while (!isHtmlComplete(cleanedCode) && attempts < MAX_CONTINUATIONS) {
      attempts++;

      const continuationMessages: Array<{ role: string; content: string }> = [
        { role: 'system', content: EDIT_SYSTEM_PROMPT },
        {
          role: 'user',
          content:
            `Here is the current HTML website:\n\n${currentSourceCode}\n\n---\n\n` +
            `Edit request: ${editPrompt}\n\n` +
            `- Return the complete updated HTML file starting with <!DOCTYPE html>.`,
        },
        { role: 'assistant', content: cleanedCode },
        {
          role: 'user',
          content:
            `Your previous response was cut off. Continue EXACTLY from where you stopped. ` +
            `Do NOT repeat any code. End properly with </body> and </html>.`,
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

// ─── Surgical Edit ────────────────────────────────────────────────────────────

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

export const SURGICAL_EDIT_SYSTEM_PROMPT = `You are a surgical HTML editor. Your ONLY job is to produce targeted patches for an existing HTML file.

Return ONLY NDJSON — one JSON object per line, no blank lines between them, absolutely no other text.

Each line must be valid JSON with exactly these keys:
{"description":"Short human description of this change","search":"exact_substring_to_find","replace":"replacement_string"}

CRITICAL RULES:
1. Return NOTHING except NDJSON patch lines
2. "search" MUST be verbatim text copied from the HTML (exact whitespace, newlines, indentation)
3. "search" must be unique in the file — include enough surrounding context (minimum 80 chars)
4. "replace" is the complete replacement for that exact "search" substring
5. Use the minimum number of patches needed
6. Keep patches targeted (200-800 chars each)
7. Patches are applied in order top-to-bottom`;

export async function surgicalEditWebsite(
  apiKey: string | undefined,
  currentSourceCode: string,
  editPrompt: string,
  callbacks: SurgicalEditCallbacks
): Promise<void> {
  const { onPatch, onChunk, onDone, onError } = callbacks;

  const effectiveKey = ENV.apiKey ?? apiKey ?? localStorage.getItem('alsytes_gemma_key') ?? '';
  if (!effectiveKey) {
    onError('No API key found. Set VITE_GEMINI_API_KEY in your .env or enter it manually. Get a free key at ai.google.dev');
    return;
  }

  function applyPatch(code: string, patch: EditPatch): { code: string; success: boolean } {
    if (code.includes(patch.search)) {
      return { code: code.replace(patch.search, patch.replace), success: true };
    }
    const normalised = patch.search.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    if (code.includes(normalised)) {
      return { code: code.replace(normalised, patch.replace), success: true };
    }
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

    // Stream and process patches line by line as they arrive
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
            if (!patch.description || typeof patch.search !== 'string' || typeof patch.replace !== 'string') continue;

            const result = applyPatch(currentCode, patch);
            if (result.success) {
              currentCode = result.code;
              patchCount++;
            }
            onPatch(patch, currentCode, result.success);
          } catch {
            // not valid JSON yet — skip
          }
        }
      },
      8000
    );

    // Process any remaining buffered line
    const remaining = lineBuffer.trim();
    if (remaining) {
      try {
        const patch = JSON.parse(remaining) as EditPatch;
        if (patch.description && typeof patch.search === 'string' && typeof patch.replace === 'string') {
          const result = applyPatch(currentCode, patch);
          if (result.success) {
            currentCode = result.code;
            patchCount++;
          }
          onPatch(patch, currentCode, result.success);
        }
      } catch { /* ignore */ }
    }

    if (patchCount === 0) {
      // Fallback to full rewrite if no patches applied
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
