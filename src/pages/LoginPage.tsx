import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, AlertTriangle, Globe, Layers, Zap, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../lib/supabase';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen" style={{ background: '#F8F7FF', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      {/* Left decorative panel */}
      <div className="hidden lg:flex flex-col justify-between w-[44%] relative overflow-hidden" style={{ background: '#fff', borderRight: '1px solid #E2DFEF' }}>
        <div
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.12) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)', filter: 'blur(50px)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)', filter: 'blur(50px)', transform: 'translate(-30%, 30%)' }} />

        <div className="flex items-center gap-3 relative z-10 p-12">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}>
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <span className="text-xl font-800" style={{ fontWeight: 800, color: '#14121F' }}>Alsytes</span>
            <p className="text-xs" style={{ color: '#9A96B0' }}>AI Website Builder</p>
          </div>
        </div>

        <div className="relative z-10 px-12">
          <h2 className="text-4xl font-800 leading-tight mb-4" style={{ fontWeight: 800, color: '#14121F' }}>
            Build websites{' '}
            <em
              className="not-italic"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              10x faster
            </em>
            {' '}with AI
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: '#4A4660' }}>
            From premium landing pages to interactive games — just describe it and Alsytes builds it for you.
          </p>

          <div className="flex flex-col gap-3">
            {[
              { icon: Globe, label: 'Landing Pages & Portfolios', color: 'text-violet-600 bg-violet-50 border-violet-100' },
              { icon: Layers, label: 'SaaS Apps & Dashboards', color: 'text-orange-600 bg-orange-50 border-orange-100' },
              { icon: Zap, label: 'Games & Interactive Tools', color: 'text-red-500 bg-red-50 border-red-100' },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className={`flex items-center gap-3 p-3 rounded-xl border ${f.color}`} style={{ background: 'var(--surface-alt, #F3F2FA)' }}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${f.color}`}>
                    <Icon size={14} />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: '#14121F' }}>{f.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-xs relative z-10 px-12 pb-12" style={{ color: '#9A96B0' }}>
          © 2025 Alsytes. Powered by AI.
        </p>
      </div>

      {/* Right: login form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium transition-colors hover:text-violet-600 lg:hidden"
          style={{ color: '#9A96B0' }}
        >
          <ArrowLeft size={15} /> Back
        </button>

        {/* Mobile logo */}
        <div className="flex items-center gap-2.5 mb-8 lg:hidden">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}>
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-xl font-800" style={{ fontWeight: 800 }}>Alsytes</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-sm"
        >
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-800 mb-2" style={{ fontWeight: 800, color: '#14121F' }}>Welcome back</h1>
            <p className="text-sm" style={{ color: '#9A96B0' }}>Sign in to start building with AI</p>
          </div>

          <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #E2DFEF', boxShadow: '0 4px 20px rgba(60,40,120,0.08)' }}>
            {/* Feature icons */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { icon: '🎨', label: 'AI Builder' },
                { icon: '☁️', label: 'Cloud Save' },
                { icon: '🚀', label: 'Deploy' },
              ].map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border" style={{ background: '#F8F7FF', borderColor: '#E2DFEF' }}>
                  <span className="text-xl">{f.icon}</span>
                  <span className="text-xs font-semibold" style={{ color: '#4A4660' }}>{f.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: '#fff',
                border: '1.5px solid #E2DFEF',
                color: '#14121F',
                boxShadow: '0 2px 8px rgba(60,40,120,0.07)',
              }}
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" style={{ color: '#9A96B0' }} />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              {loading ? 'Connecting…' : 'Continue with Google'}
            </button>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center gap-2 p-3 rounded-xl"
                style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.20)' }}
              >
                <AlertTriangle size={13} style={{ color: '#EF4444', flexShrink: 0 }} />
                <p className="text-xs" style={{ color: '#EF4444' }}>{error}</p>
              </motion.div>
            )}

            <p className="text-center text-xs mt-4" style={{ color: '#9A96B0' }}>
              By signing in, you agree to our{' '}
              <span className="cursor-pointer hover:underline" style={{ color: '#7C3AED' }}>Terms of Service</span>
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mt-5 text-xs" style={{ color: '#9A96B0' }}>
            <Sparkles size={11} style={{ color: '#7C3AED' }} />
            <span>Powered by Supabase Auth + Google OAuth</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
