import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, Menu, Wand2, Gamepad2, LayoutDashboard, Wrench,
  Sparkles, MessageSquare, ClipboardList, ArrowRight, ArrowLeft,
  Check, ChevronRight,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import PromptInput from '../components/PromptInput';
import GenerationPanel from '../components/GenerationPanel';
import CreditModal from '../components/CreditModal';
import CreditBadge from '../components/CreditBadge';
import type { Website, GenerationStatus } from '../types';
import { storage } from '../lib/storage';
import { generateWebsite, generateWebsiteSummary, extractWebsiteName } from '../lib/ai';
import { useAuth } from '../components/AuthProvider';
import { useLanguage } from '../components/LanguageProvider';

export type SummaryStatus = 'idle' | 'generating' | 'done';
type HomeMode = 'select' | 'prompt' | 'form';

// ── Form wizard types ─────────────────────────────────────────────
type WebsiteCategory =
  | 'landing-page'
  | 'portfolio'
  | 'game'
  | 'tool'
  | 'ecommerce'
  | 'blog'
  | 'other';

interface FormData {
  category: WebsiteCategory | '';
  [key: string]: string;
}

const CATEGORY_OPTIONS: { value: WebsiteCategory; label: string; icon: React.ElementType; desc: string; color: string }[] = [
  { value: 'landing-page', label: 'Landing Page', icon: Globe, desc: 'Marketing or company site', color: 'text-violet-600 bg-violet-50 border-violet-100' },
  { value: 'portfolio', label: 'Portfolio', icon: Sparkles, desc: 'Showcase your work', color: 'text-blue-600 bg-blue-50 border-blue-100' },
  { value: 'game', label: 'Game', icon: Gamepad2, desc: 'Arcade, puzzle, quiz, RPG', color: 'text-orange-600 bg-orange-50 border-orange-100' },
  { value: 'tool', label: 'Tool / Utility', icon: Wrench, desc: 'Calculator, converter, gen', color: 'text-amber-600 bg-amber-50 border-amber-100' },
  { value: 'ecommerce', label: 'E-commerce', icon: ChevronRight, desc: 'Shop, product listing', color: 'text-pink-600 bg-pink-50 border-pink-100' },
  { value: 'blog', label: 'Blog / Article', icon: MessageSquare, desc: 'Content & writing site', color: 'text-cyan-600 bg-cyan-50 border-cyan-100' },
  { value: 'other', label: 'Other', icon: Wand2, desc: 'Something unique', color: 'text-slate-600 bg-slate-50 border-slate-200' },
];

const FORM_STEPS: Record<WebsiteCategory, { key: string; question: string; placeholder: string; type: 'text' | 'select'; options?: string[] }[]> = {
  'landing-page': [
    { key: 'brand', question: 'What is your brand/company name?', placeholder: 'e.g. AcmeCorp, Startup X...', type: 'text' },
    { key: 'product', question: 'What product or service do you offer?', placeholder: 'e.g. AI-powered analytics for e-commerce...', type: 'text' },
    { key: 'audience', question: 'Who is your target audience?', placeholder: 'e.g. Small business owners, developers, designers...', type: 'text' },
    { key: 'style', question: 'What visual style do you prefer?', placeholder: 'e.g. Dark & techy, light & minimal, bold & colorful...', type: 'text' },
    { key: 'cta', question: 'What is your main call-to-action?', placeholder: 'e.g. Sign up free, Book a demo, Download now...', type: 'text' },
  ],
  'portfolio': [
    { key: 'name', question: 'What is your name?', placeholder: 'e.g. Andi Pratama, Jane Doe...', type: 'text' },
    { key: 'profession', question: 'What is your profession?', placeholder: 'e.g. UI/UX Designer, Full-Stack Developer, Photographer...', type: 'text' },
    { key: 'skills', question: 'What are your main skills or services?', placeholder: 'e.g. Figma, React, branding, portrait photography...', type: 'text' },
    { key: 'style', question: 'What aesthetic vibe do you want?', placeholder: 'e.g. Minimal & elegant, dark & dramatic, colorful & playful...', type: 'text' },
    { key: 'contact', question: 'How should visitors contact you?', placeholder: 'e.g. Email form, WhatsApp, LinkedIn...', type: 'text' },
  ],
  'game': [
    { key: 'gameType', question: 'What type of game do you want?', placeholder: 'e.g. Snake, Tetris, quiz, platformer, RPG, puzzle...', type: 'text' },
    { key: 'theme', question: 'What is the game theme or story?', placeholder: 'e.g. Space shooter, jungle adventure, Indonesian culture quiz...', type: 'text' },
    { key: 'mechanics', question: 'Describe the core gameplay mechanics', placeholder: 'e.g. Avoid obstacles, collect coins, answer questions before time runs out...', type: 'text' },
    { key: 'style', question: 'What visual style?', placeholder: 'e.g. Dark neon cyberpunk, cute pixel art, retro arcade...', type: 'text' },
    { key: 'features', question: 'Any special features?', placeholder: 'e.g. High score leaderboard, level progression, power-ups, multiplayer mode...', type: 'text' },
  ],
  'tool': [
    { key: 'toolName', question: 'What is the tool called?', placeholder: 'e.g. BMI Calculator, Color Palette Generator...', type: 'text' },
    { key: 'purpose', question: 'What does it calculate or convert?', placeholder: 'e.g. Calculates body mass index and suggests diet plans...', type: 'text' },
    { key: 'inputs', question: 'What inputs does the user provide?', placeholder: 'e.g. Weight in kg, height in cm, age, gender...', type: 'text' },
    { key: 'outputs', question: 'What should the output show?', placeholder: 'e.g. BMI value, category (underweight/normal/obese), chart...', type: 'text' },
    { key: 'style', question: 'What style do you prefer?', placeholder: 'e.g. Clean white medical, dark techy, colorful fun...', type: 'text' },
  ],
  'ecommerce': [
    { key: 'storeName', question: 'What is your store name?', placeholder: 'e.g. Batik Nusantara, TechGear Store...', type: 'text' },
    { key: 'product', question: 'What do you sell?', placeholder: 'e.g. Handmade batik clothing, tech accessories, artisan coffee...', type: 'text' },
    { key: 'products', question: 'List a few sample products', placeholder: 'e.g. Classic Javanese Batik Shirt $45, Batik Scarf $20...', type: 'text' },
    { key: 'audience', question: 'Who are your customers?', placeholder: 'e.g. Tourists, fashion enthusiasts, professional women 25-45...', type: 'text' },
    { key: 'style', question: 'What visual style?', placeholder: 'e.g. Luxury boutique, minimalist modern, bold & vibrant...', type: 'text' },
  ],
  'blog': [
    { key: 'blogName', question: 'What is your blog name?', placeholder: 'e.g. Tech Bites, The Wandering Chef...', type: 'text' },
    { key: 'niche', question: 'What topic do you write about?', placeholder: 'e.g. Web development tutorials, travel stories, Indonesian recipes...', type: 'text' },
    { key: 'author', question: "What is the author's name and bio?", placeholder: 'e.g. Budi Santoso, a senior dev with 10 years experience...', type: 'text' },
    { key: 'posts', question: 'Describe 3 sample blog posts', placeholder: 'e.g. "Getting started with React", "Best React hooks 2025", "React vs Vue"...', type: 'text' },
    { key: 'style', question: 'What aesthetic do you want?', placeholder: 'e.g. Editorial magazine, minimal code blog, warm personal journal...', type: 'text' },
  ],
  'other': [
    { key: 'description', question: 'Describe what you want to build', placeholder: "Tell me everything — what it does, who it's for, and what it looks like...", type: 'text' },
    { key: 'features', question: 'What are the key features?', placeholder: 'List the most important functionality...', type: 'text' },
    { key: 'style', question: 'What visual style do you want?', placeholder: 'e.g. Dark and minimal, vibrant and playful, luxury and elegant...', type: 'text' },
  ],
};

function buildPromptFromForm(formData: FormData, category: WebsiteCategory): string {
  const steps = FORM_STEPS[category];
  const parts: string[] = [];
  const catLabel = CATEGORY_OPTIONS.find((c) => c.value === category)?.label ?? category;
  parts.push(`Build a complete, fully functional ${catLabel} with these specifications:`);
  for (const step of steps) {
    const val = formData[step.key];
    if (val?.trim()) {
      parts.push(`- ${step.question.replace('?', '')}: ${val.trim()}`);
    }
  }
  parts.push('Make it visually stunning, fully responsive, and production-ready.');
  return parts.join('\n');
}

// ── Idea cards for Free Prompt mode ──────────────────────────────
const IDEA_CARDS = [
  { emoji: '🚀', label: 'Landing Page', prompt: 'Landing page untuk startup Company dengan dark theme elegan, hero section dengan animasi, pricing table, dan testimonials', color: 'rgba(124,58,237,0.06)', border: 'rgba(124,58,237,0.15)', accent: '#7C3AED' },
  { emoji: '🎮', label: 'Arcade Game', prompt: 'Buat game Snake classic versi modern — dark neon aesthetic, high score tersimpan, level progression, dan animasi smooth', color: 'rgba(249,115,22,0.06)', border: 'rgba(249,115,22,0.18)', accent: '#F97316' },
  { emoji: '📊', label: 'Blog & Article', prompt: 'Blog serta isi isi article personal dengan aesthetic modern, layout yang rapi, dan fitur search & filter', color: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.18)', accent: '#10B981' },
  { emoji: '🎨', label: 'Portfolio', prompt: 'Portfolio fotografer profesional dengan aesthetic film noir hitam putih, galeri masonry, smooth hover effects, dan contact form', color: 'rgba(59,130,246,0.06)', border: 'rgba(59,130,246,0.18)', accent: '#3B82F6' },
  { emoji: '🛠️', label: 'Utility Tool', prompt: 'Kalkulator BMI + kalori harian — input berat/tinggi/usia, hasil instant dengan chart, dan history 10 terakhir tersimpan', color: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.18)', accent: '#F59E0B' },
  { emoji: '🛒', label: 'E-commerce', prompt: 'Toko online boutique fashion lokal — product grid dengan filter kategori, detail produk, keranjang belanja, dan checkout flow', color: 'rgba(236,72,153,0.06)', border: 'rgba(236,72,153,0.18)', accent: '#EC4899' },
];

// ── Component ─────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, credits, consumeCredit } = useAuth();
  const { t } = useLanguage();

  const [creditModalOpen, setCreditModalOpen] = useState(false);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [activeId, setActiveId] = useState<string | undefined>();
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [streamedCode, setStreamedCode] = useState('');
  const [currentWebsite, setCurrentWebsite] = useState<Website | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [summaryMessage, setSummaryMessage] = useState('');
  const [summaryStatus, setSummaryStatus] = useState<SummaryStatus>('idle');
  const [mode, setMode] = useState<HomeMode>('select');
  const [suggestedPrompt, setSuggestedPrompt] = useState('');

  // Form wizard state
  const [formData, setFormData] = useState<FormData>({ category: '' });
  const [formStep, setFormStep] = useState(0);

  // Auto-run prompt from landing page
  useEffect(() => {
    const autoPrompt = (location.state as { autoPrompt?: string } | null)?.autoPrompt;
    if (autoPrompt) {
      window.history.replaceState({}, '', '/home');
      handleGenerate(autoPrompt, '');
    }
  }, []);

  useEffect(() => {
    storage.getAll().then(setWebsites);
  }, []);

  const refreshWebsites = useCallback(async () => {
    const all = await storage.getAll();
    setWebsites(all);
  }, []);

  const handleGenerate = useCallback(async (prompt: string, apiKey: string) => {
    // ── Credit guard ─────────────────────────────────────────────
    if (credits !== null && credits <= 0) {
      setCreditModalOpen(true);
      return;
    }

    setMode('prompt');
    setStatus('thinking');
    setStreamedCode('');
    setCurrentWebsite(null);
    setErrorMessage('');
    setSummaryMessage('');
    setSummaryStatus('idle');

    const id = storage.generateId();
    const name = extractWebsiteName(prompt);

    const newSite: Website = {
      id, name, prompt, source_code: '', created_at: new Date().toISOString(),
    };

    await storage.save(newSite);
    setActiveId(id);
    setCurrentWebsite(newSite);
    await refreshWebsites();

    let accumulatedCode = '';

    await generateWebsite(apiKey, prompt, {
      onChunk: (chunk) => {
        accumulatedCode += chunk;
        setStreamedCode(accumulatedCode);
        setStatus('streaming');
      },
      onDone: async (fullCode) => {
        await storage.update(id, { source_code: fullCode });
        const updatedSite = { ...newSite, source_code: fullCode };
        setCurrentWebsite(updatedSite);
        setStreamedCode(fullCode);
        setStatus('done');
        await refreshWebsites();

        // ── Deduct 1 credit on successful website creation ────────
        await consumeCredit();

        setSummaryStatus('generating');
        let summaryAcc = '';
        await generateWebsiteSummary(apiKey, prompt, fullCode, {
          onChunk: (chunk) => { summaryAcc += chunk; setSummaryMessage(summaryAcc); },
          onDone: (full) => { setSummaryMessage(full); setSummaryStatus('done'); },
          onError: () => setSummaryStatus('done'),
        });
      },
      onError: async (err) => {
        setErrorMessage(err);
        setStatus('error');
        await storage.delete(id);
        await refreshWebsites();
      },
    });
  }, [refreshWebsites, credits, consumeCredit]);

  const handleFormSubmit = () => {
    if (!formData.category) return;
    const prompt = buildPromptFromForm(formData, formData.category as WebsiteCategory);
    setMode('prompt');
    handleGenerate(prompt, '');
  };

  const handlePreview = (id: string) => navigate(`/websites/${id}/preview`);

  const handleDelete = async (id: string) => {
    if (activeId === id) {
      setActiveId(undefined);
      setStatus('idle');
      setStreamedCode('');
      setCurrentWebsite(null);
      setSummaryMessage('');
      setSummaryStatus('idle');
    }
    await refreshWebsites();
  };

  const resetToSelect = () => {
    if (status !== 'idle') return;
    setMode('select');
    setFormData({ category: '' });
    setFormStep(0);
    setSuggestedPrompt('');
  };

  const handleIdeaCard = (prompt: string) => {
    setSuggestedPrompt(prompt);
  };

  const selectedCategory = formData.category as WebsiteCategory;
  const currentSteps = selectedCategory ? FORM_STEPS[selectedCategory] : [];
  const currentStepData = currentSteps[formStep];
  const totalSteps = currentSteps.length;
  const userName = (user?.user_metadata?.full_name as string | undefined)?.split(' ')[0] ?? 'there';

  const CAPABILITIES = [
    { icon: Globe, label: t.home.capLandingPages, desc: t.home.capLandingDesc, color: 'text-violet-600 bg-violet-50 border-violet-100' },
    { icon: Gamepad2, label: t.home.capGames, desc: t.home.capGamesDesc, color: 'text-orange-600 bg-orange-50 border-orange-100' },
    { icon: LayoutDashboard, label: t.home.capBlog, desc: t.home.capBlogDesc, color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { icon: Wrench, label: t.home.capTools, desc: t.home.capToolsDesc, color: 'text-amber-600 bg-amber-50 border-amber-100' },
  ];

  // Whether we're in the idle free-prompt centered view
  const isPromptIdle = mode === 'prompt' && status === 'idle';
  // Whether AI is actively working
  const isGenerating = status !== 'idle';

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F8F7FF', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <Sidebar
        websites={websites}
        activeId={activeId}
        onSelect={(id) => { setActiveId(id); handlePreview(id); }}
        onPreview={handlePreview}
        onDelete={handleDelete}
        onRefresh={refreshWebsites}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header
          className="flex items-center justify-between px-4 md:px-6 py-3 flex-shrink-0"
          style={{
            background: 'rgba(255,255,255,0.90)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #E2DFEF',
          }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-1.5 rounded-lg transition-colors"
              style={{ color: '#9A96B0' }}
            >
              <Menu size={18} />
            </button>

            <button onClick={resetToSelect} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}
              >
                <Sparkles size={13} className="text-white" />
              </div>
              <div>
                <h1 className="text-base leading-none" style={{ fontWeight: 800, color: '#14121F' }}>Alsytes</h1>
                <p className="text-xs mt-0.5 hidden sm:block" style={{ color: '#9A96B0' }}>AI Website Builder</p>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <CreditBadge credits={credits} onClick={() => credits === 0 ? setCreditModalOpen(true) : undefined} />
            <span
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.20)', color: '#10B981' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t.common.poweredByAI}
            </span>
          </div>
        </header>

        {/* Main body */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">

            {/* ── Mode Select ── */}
            {mode === 'select' && status === 'idle' && (
              <motion.div
                key="select"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center justify-center min-h-full px-4 md:px-6 py-10 text-center"
              >
                <div className="max-w-2xl w-full">
                  {/* Hero greeting */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                    style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.18)', color: '#7C3AED' }}
                  >
                    <Sparkles size={11} />
                    {t.home.heyReady.replace('{name}', userName)}
                  </div>

                  <h2 className="text-3xl md:text-4xl leading-tight mb-3" style={{ fontWeight: 800, color: '#14121F' }}>
                    {t.home.howDoYouWant}{' '}
                    <em
                      className="not-italic"
                      style={{
                        background: 'linear-gradient(135deg, #7C3AED, #F97316)',
                        backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {t.home.create}
                    </em>
                  </h2>
                  <p className="text-sm mb-10" style={{ color: '#9A96B0', lineHeight: 1.7 }}>
                    {t.home.choosePrefMethod}
                  </p>

                  {/* Two options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setMode('prompt')}
                      className="p-6 rounded-2xl border text-left transition-all"
                      style={{ background: '#fff', borderColor: '#E2DFEF', boxShadow: '0 2px 12px rgba(60,40,120,0.06)' }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: 'rgba(124,58,237,0.10)', border: '1px solid rgba(124,58,237,0.20)' }}
                      >
                        <MessageSquare size={20} style={{ color: '#7C3AED' }} />
                      </div>
                      <h3 className="text-base mb-1.5" style={{ fontWeight: 700, color: '#14121F' }}>{t.home.freePromptTitle}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#9A96B0' }}>
                        {t.home.freePromptDesc}
                      </p>
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#7C3AED' }}>
                        {t.home.freePromptStart} <ArrowRight size={12} />
                      </div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setMode('form')}
                      className="p-6 rounded-2xl border text-left transition-all"
                      style={{ background: '#fff', borderColor: '#E2DFEF', boxShadow: '0 2px 12px rgba(60,40,120,0.06)' }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: 'rgba(249,115,22,0.10)', border: '1px solid rgba(249,115,22,0.22)' }}
                      >
                        <ClipboardList size={20} style={{ color: '#F97316' }} />
                      </div>
                      <h3 className="text-base mb-1.5" style={{ fontWeight: 700, color: '#14121F' }}>{t.home.guidedFormTitle}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#9A96B0' }}>
                        {t.home.guidedFormDesc}
                      </p>
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#F97316' }}>
                        {t.home.guidedFormStart} <ArrowRight size={12} />
                      </div>
                    </motion.button>
                  </div>

                  {/* Capabilities */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {CAPABILITIES.map((f, i) => {
                      const Icon = f.icon;
                      return (
                        <motion.div
                          key={f.label}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 + i * 0.07 }}
                          className="p-4 rounded-2xl border text-left"
                          style={{ background: '#fff', borderColor: '#E2DFEF' }}
                        >
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center border mb-3 ${f.color}`}>
                            <Icon size={15} />
                          </div>
                          <p className="text-sm font-semibold" style={{ color: '#14121F' }}>{f.label}</p>
                          <p className="text-xs mt-0.5 leading-snug" style={{ color: '#9A96B0' }}>{f.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Form Wizard ── */}
            {mode === 'form' && status === 'idle' && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center min-h-full px-4 md:px-6 py-8"
              >
                <div className="max-w-xl w-full">
                  <button
                    onClick={() => {
                      if (formStep > 0) { setFormStep((s) => s - 1); }
                      else if (formData.category) { setFormData({ category: '' }); setFormStep(0); }
                      else { setMode('select'); }
                    }}
                    className="flex items-center gap-2 text-sm font-medium mb-6 hover:opacity-70 transition-opacity"
                    style={{ color: '#9A96B0' }}
                  >
                    <ArrowLeft size={15} /> {t.common.back}
                  </button>

                  {!formData.category ? (
                    <div>
                      <h2 className="text-2xl mb-1" style={{ fontWeight: 800, color: '#14121F' }}>
                        {t.home.whatToBuild}
                      </h2>
                      <p className="text-sm mb-6" style={{ color: '#9A96B0' }}>{t.home.chooseType}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {CATEGORY_OPTIONS.map((cat) => {
                          const Icon = cat.icon;
                          return (
                            <motion.button
                              key={cat.value}
                              whileHover={{ scale: 1.03, y: -2 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => { setFormData({ category: cat.value }); setFormStep(0); }}
                              className="p-4 rounded-2xl border text-left transition-all"
                              style={{ background: '#fff', borderColor: '#E2DFEF' }}
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-3 ${cat.color}`}>
                                <Icon size={16} />
                              </div>
                              <p className="text-sm font-semibold" style={{ color: '#14121F' }}>{cat.label}</p>
                              <p className="text-xs mt-0.5" style={{ color: '#9A96B0' }}>{cat.desc}</p>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* Progress */}
                      <div className="flex items-center gap-2 mb-6">
                        {currentSteps.map((_, i) => (
                          <div
                            key={i}
                            className="h-1.5 flex-1 rounded-full transition-all duration-300"
                            style={{ background: i <= formStep ? '#7C3AED' : '#E2DFEF' }}
                          />
                        ))}
                      </div>

                      <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                        style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.18)', color: '#7C3AED' }}
                      >
                        {CATEGORY_OPTIONS.find((c) => c.value === formData.category)?.label} · {t.home.stepOf.replace('{step}', String(formStep + 1)).replace('{total}', String(totalSteps))}
                      </div>

                      <h2 className="text-2xl mb-1" style={{ fontWeight: 800, color: '#14121F' }}>
                        {currentStepData?.question}
                      </h2>
                      <p className="text-sm mb-6" style={{ color: '#9A96B0' }}>
                        {t.home.beSpecific}
                      </p>

                      <textarea
                        autoFocus
                        value={formData[currentStepData?.key] ?? ''}
                        onChange={(e) => setFormData((d) => ({ ...d, [currentStepData?.key]: e.target.value }))}
                        placeholder={currentStepData?.placeholder}
                        rows={4}
                        className="w-full rounded-2xl p-4 text-sm outline-none resize-none transition-all"
                        style={{
                          background: '#fff',
                          border: '1.5px solid #E2DFEF',
                          color: '#14121F',
                          fontFamily: 'Plus Jakarta Sans, sans-serif',
                          boxShadow: '0 2px 8px rgba(60,40,120,0.05)',
                        }}
                        onFocus={(e) => { e.target.style.borderColor = '#7C3AED'; }}
                        onBlur={(e) => { e.target.style.borderColor = '#E2DFEF'; }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                            if (formStep < totalSteps - 1) setFormStep((s) => s + 1);
                            else handleFormSubmit();
                          }
                        }}
                      />

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs" style={{ color: '#9A96B0' }}>{t.home.tipCtrlEnter}</span>
                        {formStep < totalSteps - 1 ? (
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setFormStep((s) => s + 1)}
                            disabled={!formData[currentStepData?.key]?.trim()}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40"
                            style={{ background: 'linear-gradient(135deg, #7C3AED, #9333EA)' }}
                          >
                            {t.common.next} <ArrowRight size={14} />
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleFormSubmit}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                            style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}
                          >
                            <Wand2 size={14} />
                            {t.home.generateWebsite}
                          </motion.button>
                        )}
                      </div>

                      {formStep > 0 && (
                        <div className="mt-6 flex flex-col gap-2">
                          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#9A96B0' }}>{t.home.yourAnswers}</p>
                          {currentSteps.slice(0, formStep).map((step) => (
                            formData[step.key] ? (
                              <div
                                key={step.key}
                                className="flex items-start gap-2 text-xs p-3 rounded-xl"
                                style={{ background: '#F8F7FF', border: '1px solid #E2DFEF' }}
                              >
                                <Check size={12} className="mt-0.5 flex-shrink-0" style={{ color: '#10B981' }} />
                                <div>
                                  <span className="font-semibold" style={{ color: '#14121F' }}>{step.question.replace('?', '')}:</span>{' '}
                                  <span style={{ color: '#4A4660' }}>{formData[step.key]}</span>
                                </div>
                              </div>
                            ) : null
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── Free Prompt Centered (idle) ── */}
            {isPromptIdle && (
              <motion.div
                key="prompt-idle"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center min-h-full px-4 md:px-6 py-10"
              >
                <div className="max-w-2xl w-full flex flex-col gap-6">
                  {/* Heading */}
                  <div className="text-center">
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                      style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.18)', color: '#7C3AED' }}
                    >
                      <Sparkles size={11} />
                      {t.home.freePromptTitle}
                    </div>
                    <h2 className="text-2xl md:text-3xl leading-tight" style={{ fontWeight: 800, color: '#14121F' }}>
                      {t.home.describeYour}{' '}
                      <em
                        className="not-italic"
                        style={{
                          background: 'linear-gradient(135deg, #7C3AED, #F97316)',
                          backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {t.home.website}
                      </em>
                    </h2>
                    <p className="text-sm mt-2" style={{ color: '#9A96B0' }}>
                      {t.home.typeAnything}
                    </p>
                  </div>

                  {/* Centered PromptInput */}
                  <PromptInput
                    onSubmit={handleGenerate}
                    status={status}
                    suggestedPrompt={suggestedPrompt}
                    onSuggestedPromptConsumed={() => setSuggestedPrompt('')}
                  />

                  {/* Idea cards */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#9A96B0' }}>
                      ✦ Prompt Ideas
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                      {IDEA_CARDS.map((card) => (
                        <motion.button
                          key={card.label}
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleIdeaCard(card.prompt)}
                          className="p-3.5 rounded-xl border text-left transition-all"
                          style={{
                            background: card.color,
                            borderColor: card.border,
                          }}
                        >
                          <span className="text-lg leading-none block mb-1.5">{card.emoji}</span>
                          <p className="text-xs font-semibold" style={{ color: '#14121F' }}>{card.label}</p>
                          <p className="text-[10px] mt-0.5 leading-snug line-clamp-2" style={{ color: '#9A96B0' }}>
                            {card.prompt.slice(0, 60)}…
                          </p>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Back link */}
                  <button
                    onClick={() => setMode('select')}
                    className="flex items-center gap-1.5 text-xs font-medium mx-auto hover:opacity-70 transition-opacity"
                    style={{ color: '#9A96B0' }}
                  >
                    <ArrowLeft size={12} /> Back to options
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Generation Panel (active) ── */}
            {isGenerating && (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-4xl mx-auto px-4 md:px-6 py-5 md:py-6 flex flex-col gap-4"
              >
                <GenerationPanel
                  status={status}
                  streamedCode={streamedCode}
                  currentWebsite={currentWebsite}
                  onPreview={handlePreview}
                  errorMessage={errorMessage}
                  summaryMessage={summaryMessage}
                  summaryStatus={summaryStatus}
                  userName={userName}
                />
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* Bottom input — hidden, user re-prompts from main area */}
        {false && (
          <div
            className="flex-shrink-0 px-3 md:px-6 py-3 md:py-4"
            style={{
              borderTop: '1px solid #E2DFEF',
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="max-w-4xl mx-auto">
              <PromptInput onSubmit={handleGenerate} status={status} />
            </div>
          </div>
        )}
      </div>

      {/* ── Credit empty modal ── */}
      <CreditModal open={creditModalOpen} onClose={() => setCreditModalOpen(false)} />
    </div>
  );
}