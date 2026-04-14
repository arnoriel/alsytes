import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Sparkles, Globe, Gamepad2, LayoutDashboard, Wrench,
  Zap, Shield, Star, LogIn, Check,
  Loader2, X, Code2, Palette, Rocket, Brain
} from 'lucide-react';
import { useAuth } from '../components/AuthProvider';
import { signInWithGoogle } from '../lib/supabase';
import TopUpModal, { CREDIT_PACKAGES, type CreditPackage } from '../components/TopUpModal';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [topUpPackage, setTopUpPackage] = useState<CreditPackage | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // If user just logged in and there's a pending prompt, redirect to home with it
  useEffect(() => {
    if (user && !loading) {
      const savedPrompt = sessionStorage.getItem('alsytes_pending_prompt');
      if (savedPrompt) {
        sessionStorage.removeItem('alsytes_pending_prompt');
        navigate('/home', { state: { autoPrompt: savedPrompt } });
      }
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContinue = () => {
    if (!prompt.trim()) return;
    if (user) {
      navigate('/home', { state: { autoPrompt: prompt.trim() } });
    } else {
      setPendingPrompt(prompt.trim());
      sessionStorage.setItem('alsytes_pending_prompt', prompt.trim());
      setShowAuthModal(true);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setAuthLoading(true);
      setAuthError('');
      await signInWithGoogle();
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Login failed. Please try again.');
      setAuthLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleContinue();
  };

  const openTopUp = (pkg?: CreditPackage) => {
    setTopUpPackage(pkg ?? null);
    setTopUpOpen(true);
  };

  const FEATURES = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      desc: 'Advanced AI understands your vision and builds exactly what you need — no coding required.',
      color: 'bg-violet-50 border-violet-100 text-violet-600',
    },
    {
      icon: Zap,
      title: 'Instant Generation',
      desc: 'From concept to fully functional website in seconds. Not hours, not days — seconds.',
      color: 'bg-orange-50 border-orange-100 text-orange-600',
    },
    {
      icon: Code2,
      title: 'Clean Code Output',
      desc: 'Every site comes with production-ready, self-contained HTML you can deploy anywhere.',
      color: 'bg-blue-50 border-blue-100 text-blue-600',
    },
    {
      icon: Palette,
      title: 'Beautiful by Default',
      desc: 'Every generated site features premium design with animations, gradients, and modern layouts.',
      color: 'bg-pink-50 border-pink-100 text-pink-600',
    },
    {
      icon: Rocket,
      title: 'One-Click Deploy',
      desc: 'Publish your website instantly with a unique URL — share with anyone, no setup needed.',
      color: 'bg-emerald-50 border-emerald-100 text-emerald-600',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      desc: 'Your projects are private by default. Share only what you choose, when you choose.',
      color: 'bg-amber-50 border-amber-100 text-amber-600',
    },
  ];

  const WEBSITE_TYPES = [
    { icon: Globe, label: 'Landing Pages', desc: 'Marketing & company sites', color: 'text-violet-600 bg-violet-50 border-violet-100' },
    { icon: Gamepad2, label: 'Games', desc: 'Arcade, puzzle, quiz, platformer', color: 'text-orange-600 bg-orange-50 border-orange-100' },
    { icon: LayoutDashboard, label: 'Blogs & Articles', desc: 'Personal blogs, news articles', color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { icon: Wrench, label: 'Tools & Utils', desc: 'Calculator, converter, gen', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  ];

  const TESTIMONIALS = [
    { name: 'Rani Dewi', role: 'Startup Founder', text: 'Alsytes helped me build my company landing page in 30 seconds. I was blown away.', avatar: 'RD' },
    { name: 'Budi Santoso', role: 'Freelance Designer', text: 'I use Alsytes to prototype ideas for clients. The output quality is honestly incredible.', avatar: 'BS' },
    { name: 'Siti Rahma', role: 'Product Manager', text: 'Created a working kanban board for my team without writing a single line of code.', avatar: 'SR' },
  ];

  const STATS = [
    { value: '50K+', label: 'Websites Created' },
    { value: '< 30s', label: 'Average Generation' },
    { value: '4.9★', label: 'User Rating' },
    { value: '99.9%', label: 'Uptime' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#F8F7FF', fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#14121F' }}>
      {/* ── Navbar ─────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.90)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(226,223,239,0.8)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}
            >
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="font-display text-xl font-800" style={{ fontWeight: 800, color: '#14121F' }}>
              Alsytes
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium" style={{ color: '#4A4660' }}>
            <a href="#features" className="hover:text-violet-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-violet-600 transition-colors">How it Works</a>
            <a href="#examples" className="hover:text-violet-600 transition-colors">Examples</a>
            <a href="#pricing" className="hover:text-violet-600 transition-colors">Pricing</a>
          </div>

          {/* Auth action */}
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: '#E2DFEF', borderTopColor: '#7C3AED' }} />
            ) : user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/home')}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}
                >
                  Dashboard <ArrowRight size={14} />
                </button>
                <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#E2DFEF]">
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white" style={{ background: '#7C3AED' }}>
                      {(user.user_metadata?.full_name as string || user.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: '#14121F', color: '#fff' }}
              >
                <LogIn size={14} />
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero Section ───────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Base gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(249,115,22,0.08) 50%, rgba(239,68,68,0.10) 100%)',
            }}
          />
          {/* Animated orbs */}
          <div
            className="absolute animate-orb-1"
            style={{
              width: 600, height: 600,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 70%)',
              top: '-15%', left: '-10%',
              filter: 'blur(60px)',
            }}
          />
          <div
            className="absolute animate-orb-2"
            style={{
              width: 500, height: 500,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)',
              top: '20%', right: '-10%',
              filter: 'blur(60px)',
            }}
          />
          <div
            className="absolute animate-orb-3"
            style={{
              width: 400, height: 400,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)',
              bottom: '10%', left: '30%',
              filter: 'blur(60px)',
            }}
          />
          {/* Dot grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.15) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              opacity: 0.6,
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">

          {/* Big title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-800 leading-tight mb-4"
            style={{ fontWeight: 800 }}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 30%, #F97316 70%, #EF4444 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Alsytes
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl font-medium mb-2"
            style={{ color: '#4A4660' }}
          >
            Describe it. Watch it come alive.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base mb-10"
            style={{ color: '#9A96B0' }}
          >
            Build stunning websites, games, apps, and tools with a single prompt.
          </motion.p>

          {/* Prompt Input */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="max-w-2xl mx-auto"
          >
            <div
              className="relative flex items-center rounded-2xl overflow-hidden"
              style={{
                background: '#fff',
                border: '1.5px solid rgba(124,58,237,0.25)',
                boxShadow: '0 8px 40px rgba(124,58,237,0.15), 0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex-1 flex items-center px-5 py-4">
                <Sparkles size={18} style={{ color: '#7C3AED', flexShrink: 0, marginRight: 12 }} />
                <input
                  ref={inputRef}
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="What Website you want to Create today?"
                  className="flex-1 bg-transparent outline-none text-base font-medium"
                  style={{ color: '#14121F', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                />
              </div>
              <button
                onClick={handleContinue}
                className="m-2 flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
                style={{
                  background: prompt.trim()
                    ? 'linear-gradient(135deg, #7C3AED, #F97316)'
                    : '#9A96B0',
                  boxShadow: prompt.trim() ? '0 4px 14px rgba(124,58,237,0.35)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                Continue <ArrowRight size={15} />
              </button>
            </div>

            {/* Suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {[
                'Landing page startup fintech',
                'Game Snake modern',
                'Portofolio fotografer',
                'Todo app minimalis',
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => setPrompt(s)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105"
                  style={{
                    background: 'rgba(124,58,237,0.07)',
                    border: '1px solid rgba(124,58,237,0.18)',
                    color: '#7C3AED',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center gap-3 mt-8"
          >
            <div className="flex -space-x-2">
              {['RD','BS','SR','AF','MK'].map((initials, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: ['#7C3AED','#F97316','#EF4444','#3B82F6','#10B981'][i], zIndex: 5 - i }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs" style={{ color: '#9A96B0' }}>Trusted by 50,000+ creators</p>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="text-xs font-medium" style={{ color: '#9A96B0' }}>Discover more</p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
            style={{ borderColor: '#E2DFEF' }}
          >
            <div className="w-1 h-2 rounded-full" style={{ background: '#9A96B0' }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats Section ──────────────────────────────────────── */}
      <section className="py-16 border-y" style={{ background: '#fff', borderColor: '#E2DFEF' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <p
                  className="text-3xl sm:text-4xl font-800 mb-1"
                  style={{
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #7C3AED, #F97316)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-sm font-medium" style={{ color: '#9A96B0' }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Website Types ──────────────────────────────────────── */}
      <section id="examples" className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span
              className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(249,115,22,0.10)', border: '1px solid rgba(249,115,22,0.25)', color: '#F97316' }}
            >
              What You Can Build
            </span>
            <h2 className="text-3xl sm:text-4xl font-800 mb-4" style={{ fontWeight: 800 }}>
              Any website. Any idea.{' '}
              <span style={{
                background: 'linear-gradient(135deg, #7C3AED, #F97316)',
                backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                Instantly.
              </span>
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#4A4660' }}>
              From landing pages to full games — Alsytes handles every type of web project with precision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WEBSITE_TYPES.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-2xl border transition-all cursor-pointer hover:-translate-y-1"
                  style={{ background: '#fff', borderColor: '#E2DFEF', boxShadow: '0 2px 8px rgba(60,40,120,0.05)' }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 ${t.color}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base text-gray-800 font-700 mb-1" style={{ fontWeight: 700 }}>{t.label}</h3>
                  <p className="text-sm" style={{ color: '#9A96B0' }}>{t.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6" style={{ background: '#fff' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span
              className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.20)', color: '#7C3AED' }}
            >
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-800" style={{ fontWeight: 800 }}>
              Three steps. That's it.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-14 left-1/6 right-1/6 h-0.5" style={{ background: 'linear-gradient(90deg, #7C3AED, #F97316, #EF4444)', opacity: 0.25 }} />

            {[
              { step: '01', title: 'Describe Your Vision', desc: 'Type what you want to build in plain language. Be as detailed or as brief as you like.', color: '#7C3AED' },
              { step: '02', title: 'AI Builds It', desc: 'Alsytes analyzes your request and generates a complete, functional website in seconds.', color: '#F97316' },
              { step: '03', title: 'Edit & Deploy', desc: 'Fine-tune with AI-powered edits, then publish with one click to your own URL.', color: '#EF4444' },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center p-8 rounded-2xl border"
                style={{ background: '#F8F7FF', borderColor: '#E2DFEF' }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-800 text-white mb-5"
                  style={{ background: step.color, fontWeight: 800 }}
                >
                  {step.step}
                </div>
                <h3 className="text-lg font-700 mb-2" style={{ fontWeight: 700 }}>{step.title}</h3>
                <p className="text-sm" style={{ color: '#4A4660', lineHeight: 1.7 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ──────────────────────────────────────── */}
      <section id="features" className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span
              className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.20)', color: '#EF4444' }}
            >
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-800 mb-4" style={{ fontWeight: 800 }}>
              Everything you need.{' '}
              <span style={{
                background: 'linear-gradient(135deg, #EF4444, #F97316)',
                backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                Nothing you don't.
              </span>
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#4A4660' }}>
              Alsytes packs everything a modern web creator needs into one beautifully simple platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="p-6 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-lg"
                  style={{ background: '#fff', borderColor: '#E2DFEF' }}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-4 ${f.color}`}>
                    <Icon size={18} />
                  </div>
                  <h3 className="text-base font-700 mb-2" style={{ fontWeight: 700 }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#4A4660' }}>{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6" style={{ background: '#fff' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-800 mb-2" style={{ fontWeight: 800 }}>
              Loved by creators
            </h2>
            <p className="text-base" style={{ color: '#9A96B0' }}>Join thousands building their ideas with Alsytes</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border"
                style={{ background: '#F8F7FF', borderColor: '#E2DFEF' }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map((s) => <Star key={s} size={13} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#4A4660' }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-600" style={{ fontWeight: 600 }}>{t.name}</p>
                    <p className="text-xs" style={{ color: '#9A96B0' }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────── */}
      <section id="pricing" className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-4"
          >
            <span
              className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.25)', color: '#10B981' }}
            >
              Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-800 mb-3" style={{ fontWeight: 800 }}>
              Bayar sesuai yang kamu butuhkan
            </h2>
            <p className="text-base mb-10" style={{ color: '#9A96B0' }}>
              Mulai gratis 3 credits setiap bulan. Top up kapan saja, tanpa langganan.
            </p>
          </motion.div>

          {/* Free monthly badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-8"
          >
            <div
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(249,115,22,0.06))',
                border: '1.5px solid rgba(124,58,237,0.22)',
                color: '#7C3AED',
              }}
            >
              <Sparkles size={14} />
              Semua user dapat <strong>3 Credits GRATIS</strong> setiap bulan — otomatis reset tiap tanggal 1
            </div>
          </motion.div>

          {/* Package cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CREDIT_PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-3xl overflow-hidden flex flex-col"
                style={{
                  background: pkg.highlight
                    ? 'linear-gradient(160deg, #7C3AED 0%, #9333EA 50%, #C026D3 100%)'
                    : '#fff',
                  border: pkg.highlight ? 'none' : '1.5px solid #E2DFEF',
                  boxShadow: pkg.highlight
                    ? '0 20px 60px rgba(124,58,237,0.30)'
                    : '0 4px 16px rgba(60,40,120,0.06)',
                }}
              >
                {/* Popular badge */}
                {pkg.badge && (
                  <div
                    className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold"
                    style={{
                      background: pkg.highlight ? 'rgba(255,255,255,0.22)' : pkg.badgeColor,
                      color: pkg.highlight ? '#fff' : '#fff',
                    }}
                  >
                    {pkg.badge}
                  </div>
                )}

                <div className="p-7 flex flex-col flex-1">
                  {/* Credits count */}
                  <div
                    className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center mb-5"
                    style={{
                      background: pkg.highlight ? 'rgba(255,255,255,0.18)' : 'rgba(124,58,237,0.08)',
                      border: pkg.highlight ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(124,58,237,0.18)',
                    }}
                  >
                    <span
                      className="text-2xl font-black leading-none"
                      style={{ color: pkg.highlight ? '#fff' : '#7C3AED' }}
                    >
                      {pkg.credits}
                    </span>
                    <span
                      className="text-[9px] font-semibold uppercase tracking-wide"
                      style={{ color: pkg.highlight ? 'rgba(255,255,255,0.7)' : '#9A96B0' }}
                    >
                      credit{pkg.credits > 1 ? 's' : ''}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ color: pkg.highlight ? '#fff' : '#14121F' }}
                  >
                    {pkg.name}
                  </h3>

                  <p
                    className="text-sm mb-4"
                    style={{ color: pkg.highlight ? 'rgba(255,255,255,0.70)' : '#9A96B0' }}
                  >
                    {pkg.target}
                  </p>

                  {/* Price */}
                  <div className="mb-5">
                    <p
                      className="text-3xl font-black"
                      style={{ color: pkg.highlight ? '#fff' : '#14121F' }}
                    >
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(pkg.price)}
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: pkg.highlight ? 'rgba(255,255,255,0.55)' : '#B0ACCC' }}
                    >
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(pkg.pricePerCredit)} per credit
                    </p>
                  </div>

                  {/* Features */}
                  <div className="flex flex-col gap-2.5 mb-7 flex-1">
                    {[
                      `${pkg.credits} website generation${pkg.credits > 1 ? 's' : ''}`,
                      'AI editing gratis (tanpa batas)',
                      'One-click deploy',
                      'Credits tidak kadaluarsa',
                    ].map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-sm">
                        <Check
                          size={14}
                          className="flex-shrink-0"
                          style={{ color: pkg.highlight ? 'rgba(255,255,255,0.85)' : '#10B981' }}
                        />
                        <span style={{ color: pkg.highlight ? 'rgba(255,255,255,0.85)' : '#4A4660' }}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => openTopUp(pkg)}
                    className="w-full py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
                    style={{
                      background: pkg.highlight ? '#fff' : 'linear-gradient(135deg, #7C3AED, #F97316)',
                      color: pkg.highlight ? '#7C3AED' : '#fff',
                      boxShadow: pkg.highlight
                        ? '0 4px 16px rgba(0,0,0,0.15)'
                        : '0 4px 16px rgba(124,58,237,0.25)',
                    }}
                  >
                    <Zap size={14} fill={pkg.highlight ? '#7C3AED' : '#fff'} />
                    Beli Paket {pkg.name}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm mt-8"
            style={{ color: '#9A96B0' }}
          >
            Butuh lebih banyak credits?{' '}
            <button
              onClick={() => openTopUp()}
              className="font-semibold hover:underline"
              style={{ color: '#7C3AED' }}
            >
              Hubungi kami
            </button>{' '}
            untuk paket custom.
          </motion.p>
        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 40%, #F97316 80%, #EF4444 100%)',
            }}
          >
            {/* Decorative orbs */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
            />
            <div
              className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15"
              style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
            />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-800 text-white mb-4" style={{ fontWeight: 800 }}>
                Ready to build something amazing?
              </h2>
              <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.80)' }}>
                Join 50,000+ creators who ship faster with Alsytes.
              </p>
              <button
                onClick={() => user ? navigate('/home') : setShowAuthModal(true)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-700 transition-all hover:scale-105 active:scale-95"
                style={{ background: '#fff', color: '#7C3AED', fontWeight: 700, boxShadow: '0 8px 30px rgba(0,0,0,0.20)' }}
              >
                Start Building Free <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="py-10 border-t px-4 sm:px-6" style={{ background: '#fff', borderColor: '#E2DFEF' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}
            >
              <Sparkles size={12} className="text-white" />
            </div>
            <span className="font-700 text-gray-800 text-base" style={{ fontWeight: 700 }}>Alsytes</span>
          </div>
          <p className="text-sm" style={{ color: '#9A96B0' }}>
            © 2025 Alsytes. AI-powered website builder.
          </p>
          <div className="flex items-center gap-5 text-sm" style={{ color: '#9A96B0' }}>
            <a href="#" className="hover:text-violet-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-violet-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-violet-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* ── TopUp Modal ────────────────────────────────────────── */}
      <TopUpModal
        open={topUpOpen}
        onClose={() => { setTopUpOpen(false); setTopUpPackage(null); }}
        preselectedPackage={topUpPackage}
      />

      {/* ── Auth Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showAuthModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(20,18,31,0.50)', backdropFilter: 'blur(8px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowAuthModal(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-sm rounded-3xl p-8 relative"
              style={{ background: '#fff', boxShadow: '0 24px 80px rgba(124,58,237,0.25)' }}
            >
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 p-2 rounded-xl transition-colors"
                style={{ color: '#9A96B0' }}
              >
                <X size={18} />
              </button>

              {/* Modal header */}
              <div className="text-center mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}
                >
                  <Sparkles size={22} className="text-white" />
                </div>
                <h2 className="text-xl font-800 mb-1" style={{ fontWeight: 800 }}>Sign in to continue</h2>
                <p className="text-sm" style={{ color: '#9A96B0' }}>
                  {pendingPrompt ? `Your prompt "${pendingPrompt.slice(0, 40)}…" will run right after` : 'Create an account to start building'}
                </p>
              </div>

              {/* Pending prompt preview */}
              {pendingPrompt && (
                <div
                  className="mb-5 px-4 py-3 rounded-xl text-sm flex items-start gap-2"
                  style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.18)', color: '#4A4660' }}
                >
                  <Sparkles size={13} style={{ color: '#7C3AED', flexShrink: 0, marginTop: 1 }} />
                  <span className="line-clamp-2">{pendingPrompt}</span>
                </div>
              )}

              {/* Google login */}
              <button
                onClick={handleGoogleLogin}
                disabled={authLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                style={{
                  background: '#fff',
                  border: '1.5px solid #E2DFEF',
                  color: '#14121F',
                  boxShadow: '0 2px 8px rgba(60,40,120,0.07)',
                }}
              >
                {authLoading ? (
                  <Loader2 size={18} className="animate-spin" style={{ color: '#9A96B0' }} />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                )}
                {authLoading ? 'Connecting…' : 'Continue with Google'}
              </button>

              {authError && (
                <p className="mt-3 text-xs text-center" style={{ color: '#EF4444' }}>{authError}</p>
              )}

              <p className="text-center text-xs mt-4" style={{ color: '#9A96B0' }}>
                By signing in, you agree to our{' '}
                <span className="cursor-pointer hover:underline" style={{ color: '#7C3AED' }}>Terms of Service</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
