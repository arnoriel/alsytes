/**
 * Environment config — reads from Vite env vars (set in .env or Vercel dashboard)
 * Prefix VITE_ is required for Vite to expose vars to the browser bundle.
 *
 * Priority for API key:
 *   1. VITE_GEMINI_API_KEY (env / Vercel) — get free key at ai.google.dev
 *   2. Manual input saved in localStorage (fallback for local dev)
 *
 * Model: gemma-4-31b-it
 *   - 15 RPM, 1500 RPD, unlimited TPM (free tier)
 *   - Uses native Google AI Studio generateContent API (NOT OpenAI-compatible)
 *   - Endpoint: generativelanguage.googleapis.com/v1beta/models/{model}:streamGenerateContent
 */

export const ENV = {
  apiKey: import.meta.env.VITE_GEMINI_API_KEY as string | undefined,
  model: (import.meta.env.VITE_AI_MODEL as string | undefined) ?? 'gemma-4-31b-it',
  /** true if the API key is baked in via env — hide the key input from UI */
  hasEnvKey: Boolean(import.meta.env.VITE_GEMINI_API_KEY),
} as const;
