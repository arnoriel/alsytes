import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Key, Wand2, ChevronDown } from 'lucide-react';
import type { GenerationStatus } from '../types';
import { ENV } from '../lib/env';

const PROMPT_SUGGESTIONS = [
  'Landing page untuk startup fintech dengan tema gelap elegan, warna biru elektrik & emas, animasi particles di hero, fitur grid bento, dan pricing table',
  'Website restaurant fine dining mewah dengan tema Japandi, warna cream & charcoal, hero full-screen, dan menu grid yang elegan',
  'Portfolio fotografer dengan aesthetic film noir hitam putih, galeri masonry, smooth hover, dan kontak form minimalis',
  'Buat game Snake classic tapi versi modern — dark neon aesthetic, dengan high score yang tersimpan, level progression, dan sound effects',
  'Game puzzle sliding tile 4x4 dengan timer, move counter, high score leaderboard, tema dark cyberpunk',
  'Quiz game "Tebak Ibukota Negara" — 20 pertanyaan random, timer per soal, skor akhir, dan animasi yang satisfying',
  'Buat aplikasi Todo List / Task Manager seperti Notion tapi lebih simple — ada categories, priority level, due date, filter/search',
  'Platform CRM sederhana untuk freelancer — manage clients, projects, invoice tracker. Dashboard dengan stats dan tabel data',
  'Kanban board seperti Trello — drag and drop tasks antar kolom (Backlog, In Progress, Done), add/edit/delete cards',
  'Kalkulator BMI + kalkulator kalori harian dengan hasil yang langsung muncul, history 10 terakhir tersimpan',
  'Color palette generator — input hex/RGB, generate complementary/analogous/triadic colors, copy to clipboard',
];

interface PromptInputProps {
  onSubmit: (prompt: string, apiKey: string) => void;
  status: GenerationStatus;
}

export default function PromptInput({ onSubmit, status }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const [apiKey, setApiKey] = useState(
    () => ENV.apiKey ?? localStorage.getItem('alsytes_api_key') ?? ''
  );
  const [showApiInput] = useState(!ENV.hasEnvKey && !localStorage.getItem('alsytes_api_key'));
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isGenerating = status === 'thinking' || status === 'streaming';

  useEffect(() => {
    if (apiKey) localStorage.setItem('alsytes_api_key', apiKey);
  }, [apiKey]);

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && !isGenerating) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!prompt.trim() || isGenerating) return;
    if (!apiKey.trim() && !ENV.hasEnvKey) return;
    onSubmit(prompt.trim(), apiKey.trim());
    setPrompt('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const applySuggestion = (s: string) => {
    setPrompt(s);
    setShowSuggestions(false);
    textareaRef.current?.focus();
    setTimeout(autoResize, 10);
  };

  const canSubmit = prompt.trim() && (apiKey.trim() || ENV.hasEnvKey) && !isGenerating;

  return (
    <div className="flex flex-col gap-2.5 w-full">
      {/* API Key */}
      <AnimatePresence>
        {showApiInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl"
              style={{ background: '#fff', border: '1px solid #E2DFEF', boxShadow: '0 1px 4px rgba(60,40,120,0.06)' }}
            >
              <Key size={13} style={{ color: '#9A96B0', flexShrink: 0 }} />
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="OpenRouter API Key (sk-or-...)"
                className="flex-1 bg-transparent text-sm outline-none min-w-0"
                style={{ color: '#14121F', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              />
              {apiKey && (
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium" style={{ color: '#10B981' }}>Saved</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main input */}
      <div
        className="relative rounded-2xl transition-all"
        style={{
          background: '#fff',
          border: showSuggestions ? '1.5px solid rgba(124,58,237,0.40)' : '1.5px solid #E2DFEF',
          boxShadow: showSuggestions
            ? '0 0 0 3px rgba(124,58,237,0.10)'
            : '0 2px 12px rgba(60,40,120,0.06)',
        }}
      >
        {/* Top toolbar */}
        <div className="flex items-center justify-between px-3.5 md:px-4 pt-3 pb-1.5">
          <div className="flex items-center gap-2">
            <Wand2 size={13} style={{ color: '#7C3AED' }} />
            <span className="text-xs font-semibold" style={{ color: '#4A4660' }}>Describe your website</span>
          </div>
          <button
            onClick={() => setShowSuggestions((s) => !s)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
            style={
              showSuggestions
                ? { background: '#7C3AED', color: '#fff' }
                : { background: '#F8F7FF', color: '#4A4660', border: '1px solid #E2DFEF' }
            }
          >
            <Sparkles size={10} />
            <span className="hidden sm:inline">Ideas</span>
            <ChevronDown size={10} style={{ transform: showSuggestions ? 'rotate(180deg)' : undefined, transition: 'transform 0.2s' }} />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => { setPrompt(e.target.value); autoResize(); }}
          onKeyDown={handleKeyDown}
          disabled={isGenerating}
          placeholder="Deskripsikan apa yang mau dibikin — landing page, game, SaaS app, tool, atau apapun..."
          rows={3}
          className="w-full bg-transparent text-sm leading-relaxed px-3.5 md:px-4 py-2 resize-none outline-none disabled:opacity-50"
          style={{
            minHeight: 80,
            maxHeight: 200,
            color: '#14121F',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}
        />

        {/* Bottom toolbar */}
        <div className="flex items-center justify-between px-3.5 md:px-4 py-2.5 border-t" style={{ borderColor: '#E2DFEF' }}>
          <div className="flex items-center gap-2">
            {prompt.length > 0 && (
              <span className="text-xs font-mono" style={{ color: '#9A96B0' }}>{prompt.length} chars</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs hidden sm:block" style={{ color: '#9A96B0' }}>Ctrl+↵</span>
            <motion.button
              whileHover={{ scale: canSubmit ? 1.02 : 1 }}
              whileTap={{ scale: canSubmit ? 0.97 : 1 }}
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="flex items-center gap-2 px-3.5 md:px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={
                canSubmit
                  ? {
                      background: 'linear-gradient(135deg, #7C3AED, #9333EA)',
                      color: '#fff',
                      boxShadow: '0 4px 14px rgba(124,58,237,0.30)',
                    }
                  : {
                      background: '#F8F7FF',
                      color: '#9A96B0',
                      border: '1px solid #E2DFEF',
                      cursor: 'not-allowed',
                    }
              }
            >
              {isGenerating ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />
                  <span className="hidden sm:inline">Generating…</span>
                </>
              ) : (
                <>
                  <Send size={13} />
                  Generate
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Suggestions panel */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: '#fff',
              border: '1px solid #E2DFEF',
              boxShadow: '0 8px 32px rgba(60,40,120,0.10)',
            }}
          >
            <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: '#E2DFEF' }}>
              <Sparkles size={12} style={{ color: '#7C3AED' }} />
              <p className="text-xs font-700 uppercase tracking-wider" style={{ fontWeight: 700, color: '#14121F' }}>
                Prompt Ideas
              </p>
            </div>
            <div className="flex flex-col divide-y max-h-64 overflow-y-auto" style={{ borderColor: '#E2DFEF' }}>
              {PROMPT_SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => applySuggestion(s)}
                  className="w-full text-left px-4 py-3 text-xs leading-relaxed transition-colors group"
                  style={{ color: '#4A4660' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#F8F7FF'; e.currentTarget.style.color = '#14121F'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = ''; e.currentTarget.style.color = '#4A4660'; }}
                >
                  <span className="font-bold mr-2" style={{ color: '#7C3AED' }}>→</span>
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
