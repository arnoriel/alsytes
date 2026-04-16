import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, ChevronUp, User, Mail, Shield, Globe, Check } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { signOut } from '../lib/supabase';
import { useLanguage } from './LanguageProvider';
import type { Language } from '../lib/i18n';

interface UserMenuProps {
  collapsed?: boolean;
}

export default function UserMenu({ collapsed = false }: UserMenuProps) {
  const { user } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showLangPanel, setShowLangPanel] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setShowLangPanel(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try { await signOut(); } catch { setLoggingOut(false); }
  };

  if (!user) return null;

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const name = (user.user_metadata?.full_name as string | undefined) ?? user.email ?? 'User';
  const email = user.email ?? '';
  const initials = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
  const provider = user.app_metadata?.provider as string | undefined;

  const Avatar = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const sz = size === 'lg' ? 'w-10 h-10' : size === 'sm' ? 'w-6 h-6' : 'w-8 h-8';
    return (
      <div className={`${sz} rounded-full overflow-hidden flex-shrink-0`} style={{ border: '2px solid #E2DFEF' }}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #7C3AED, #F97316)' }}>
            {initials}
          </div>
        )}
      </div>
    );
  };

  const DropdownContent = () => (
    <>
      {showLangPanel ? (
        <LangPanel
          language={language}
          setLanguage={(l) => { setLanguage(l); setShowLangPanel(false); }}
          onBack={() => setShowLangPanel(false)}
          t={t}
        />
      ) : (
        <>
          <ProfileCard {...{ name, email, initials, avatarUrl, provider, Avatar }} t={t} />
          <LanguageButton t={t} onClick={() => setShowLangPanel(true)} language={language} />
          <LogoutButton loggingOut={loggingOut} onLogout={handleLogout} t={t} />
        </>
      )}
    </>
  );

  if (collapsed) {
    return (
      <div ref={ref} className="relative flex items-center justify-center">
        <button
          onClick={() => { setOpen((o) => !o); setShowLangPanel(false); }}
          title={name}
          className="transition-all hover:scale-110"
        >
          <Avatar size="sm" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: -8, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-0 left-full ml-2 w-56 rounded-2xl overflow-hidden z-50"
              style={{ background: '#fff', border: '1px solid #E2DFEF', boxShadow: '0 8px 32px rgba(60,40,120,0.15)' }}
            >
              <DropdownContent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => { setOpen((o) => !o); setShowLangPanel(false); }}
        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-all"
        style={{ background: open ? '#F8F7FF' : 'transparent' }}
        onMouseEnter={(e) => { if (!open) e.currentTarget.style.background = '#F8F7FF'; }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.background = 'transparent'; }}
      >
        <Avatar />
        <div className="flex-1 min-w-0 text-left">
          <p className="text-xs font-semibold truncate leading-tight" style={{ color: '#14121F' }}>{name}</p>
          <p className="text-[10px] truncate" style={{ color: '#9A96B0' }}>{email}</p>
        </div>
        <ChevronUp
          size={12}
          style={{ color: '#9A96B0', transform: open ? 'rotate(180deg)' : undefined, transition: 'transform 0.2s', flexShrink: 0 }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-0 right-0 mb-2 rounded-2xl overflow-hidden z-50"
            style={{ background: '#fff', border: '1px solid #E2DFEF', boxShadow: '0 8px 32px rgba(60,40,120,0.15)' }}
          >
            <DropdownContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Language Panel ─────────────────────────────────────────────────
function LangPanel({
  language,
  setLanguage,
  onBack,
  t,
}: {
  language: Language;
  setLanguage: (l: Language) => void;
  onBack: () => void;
  t: ReturnType<typeof useLanguage>['t'];
}) {
  const options: { value: Language; flag: string; native: string; sub: string }[] = [
    { value: 'en', flag: '🇺🇸', native: 'English', sub: t.common.english },
    { value: 'id', flag: '🇮🇩', native: 'Indonesia', sub: t.common.indonesian },
  ];

  return (
    <div>
      <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: '#E2DFEF' }}>
        <button
          onClick={onBack}
          className="text-lg leading-none mr-1 hover:opacity-70 transition-opacity"
          style={{ color: '#9A96B0' }}
        >
          ‹
        </button>
        <Globe size={13} style={{ color: '#7C3AED' }} />
        <span className="text-xs font-semibold" style={{ color: '#14121F' }}>{t.common.languageSettings}</span>
      </div>
      <p className="px-4 pt-3 pb-1 text-[10px]" style={{ color: '#9A96B0' }}>{t.common.selectLanguage}</p>
      <div className="flex flex-col pb-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setLanguage(opt.value)}
            className="flex items-center justify-between px-4 py-2.5 transition-colors"
            style={{ color: language === opt.value ? '#7C3AED' : '#4A4660' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#F8F7FF'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = ''; }}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">{opt.flag}</span>
              <div className="text-left">
                <p className="text-xs font-semibold leading-tight">{opt.native}</p>
                <p className="text-[10px]" style={{ color: '#9A96B0' }}>{opt.sub}</p>
              </div>
            </div>
            {language === opt.value && (
              <Check size={13} style={{ color: '#7C3AED', flexShrink: 0 }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function LanguageButton({
  t,
  onClick,
  language,
}: {
  t: ReturnType<typeof useLanguage>['t'];
  onClick: () => void;
  language: Language;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 px-4 py-2.5 border-t transition-colors"
      style={{ borderColor: '#E2DFEF', color: '#4A4660' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = '#F8F7FF'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = ''; }}
    >
      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.18)' }}>
        <Globe size={12} style={{ color: '#7C3AED' }} />
      </div>
      <span className="text-xs font-semibold flex-1 text-left">{t.common.language}</span>
      <span className="text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase" style={{ background: '#F3F2FA', color: '#7C3AED' }}>
        {language === 'en' ? 'EN' : 'ID'}
      </span>
    </button>
  );
}

function ProfileCard({ name, email, provider, Avatar, t }: {
  name: string; email: string; initials: string; avatarUrl?: string; provider?: string;
  Avatar: React.ComponentType<{ size?: 'sm' | 'md' | 'lg' }>;
  t: ReturnType<typeof useLanguage>['t'];
}) {
  return (
    <div className="p-4 border-b" style={{ borderColor: '#E2DFEF' }}>
      <div className="flex items-center gap-3 mb-3">
        <Avatar size="lg" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold truncate" style={{ color: '#14121F' }}>{name}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Mail size={9} style={{ color: '#9A96B0' }} />
            <p className="text-[10px] truncate" style={{ color: '#9A96B0' }}>{email}</p>
          </div>
        </div>
      </div>

      {provider && (
        <div
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg w-fit mb-2"
          style={{ background: '#F8F7FF', border: '1px solid #E2DFEF' }}
        >
          {provider === 'google' ? (
            <svg width="10" height="10" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          ) : (
            <Shield size={10} style={{ color: '#9A96B0' }} />
          )}
          <span className="text-[10px] font-medium capitalize" style={{ color: '#9A96B0' }}>
            via {provider ?? 'email'}
          </span>
        </div>
      )}

      <div className="flex items-center gap-1.5">
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-lg"
          style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.20)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-semibold" style={{ color: '#10B981' }}>{t.common.online}</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ background: '#F8F7FF', border: '1px solid #E2DFEF' }}>
          <User size={9} style={{ color: '#9A96B0' }} />
          <span className="text-[10px] font-medium" style={{ color: '#9A96B0' }}>{t.common.freePlan}</span>
        </div>
      </div>
    </div>
  );
}

function LogoutButton({ loggingOut, onLogout, t }: {
  loggingOut: boolean;
  onLogout: () => void;
  t: ReturnType<typeof useLanguage>['t'];
}) {
  return (
    <button
      onClick={onLogout}
      disabled={loggingOut}
      className="w-full flex items-center gap-2.5 px-4 py-3 transition-colors disabled:opacity-50"
      style={{ color: '#EF4444' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.05)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = ''; }}
    >
      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)' }}>
        <LogOut size={12} style={{ color: '#EF4444' }} />
      </div>
      <span className="text-xs font-semibold">{loggingOut ? t.common.signingOut : t.common.signOut}</span>
    </button>
  );
}